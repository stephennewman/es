import { supabase } from './supabase';
import { getRandomPrinciples } from './principles-data';
import { Principle } from './types';

export async function getPersonalizedPrinciples(userId: string): Promise<Principle[]> {
  try {
    // Get user's recent learn responses to identify patterns
    const { data: responses, error } = await supabase
      .from('learn_responses')
      .select(`
        *,
        learn_scenarios (
          tags,
          correct_answer
        )
      `)
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(20);

    if (error) throw error;

    // If not enough data, return random principles
    if (!responses || responses.length < 5) {
      return getRandomPrinciples(3);
    }

    // Analyze patterns
    const incorrectTags: string[] = [];
    responses.forEach((response: any) => {
      if (!response.is_correct && response.learn_scenarios?.tags) {
        incorrectTags.push(...response.learn_scenarios.tags);
      }
    });

    // Count tag frequencies
    const tagCounts: Record<string, number> = {};
    incorrectTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    // Get top weak areas
    const weakAreas = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([tag]) => tag);

    // Try to get AI-generated personalized guidance
    if (weakAreas.length > 0) {
      try {
        const aiPrinciples = await fetchAIGuidance(weakAreas);
        if (aiPrinciples && aiPrinciples.length === 3) {
          return aiPrinciples;
        }
      } catch (err) {
        console.error('AI guidance failed, falling back to random:', err);
      }
    }

    // Fallback to random principles
    return getRandomPrinciples(3);
  } catch (error) {
    console.error('Error getting personalized principles:', error);
    return getRandomPrinciples(3);
  }
}

async function fetchAIGuidance(weakAreas: string[]): Promise<Principle[]> {
  const response = await fetch('/api/daily-guidance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weakAreas }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI guidance');
  }

  const { principles } = await response.json();
  return principles;
}

