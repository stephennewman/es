'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ScenarioCategory } from '@/lib/types';
import BottomNav from '@/components/navigation/BottomNav';
import CategorySelector from '@/components/learn/CategorySelector';
import ScenarioCard from '@/components/learn/ScenarioCard';
import { getScenariosByCategory } from '@/lib/scenarios-data';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<ScenarioCategory | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data: profile } = await supabase
      .from('user_profile')
      .select('id')
      .limit(1)
      .single();

    if (profile) {
      setUserId(profile.id);
    }
  }

  async function handleAnswer(scenarioId: string, selectedAnswer: string, isCorrect: boolean) {
    if (!userId) return;

    try {
      await supabase.from('learn_responses').insert({
        user_id: userId,
        scenario_id: scenarioId,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
      });
    } catch (error) {
      console.error('Error saving response:', error);
    }
  }

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-black dark:text-white">Learn</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Practice responding to real situations
            </p>
          </div>

          {/* Category Selection */}
          <div className="px-6 py-8">
            <CategorySelector onSelect={setSelectedCategory} />
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Get scenarios for selected category
  const scenarios = getScenariosByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4 z-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {selectedCategory === 'self' && 'Understanding Yourself'}
            {selectedCategory === 'wife' && 'Understanding Her'}
            {selectedCategory === 'toddler' && 'Parenting Toddlers (2-3)'}
            {selectedCategory === 'teen' && 'Parenting Teen (14)'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {scenarios.length} scenarios available
          </p>
        </div>

        {/* Scenarios */}
        <div className="px-6 py-6 space-y-8">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

