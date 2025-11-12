import { questions } from './questions';
import { Scores, Grades, Category } from './types';

/**
 * Calculate scores for each category and overall based on answers
 */
export function calculateScores(answers: Record<string, string | number>): Scores {
  const categoryScores: Record<Category, number[]> = {
    1: [],
    2: [],
    3: [],
  };

  // Calculate score for each answered question
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined && answer !== null && answer !== '') {
      const score = question.scoringKey[String(answer)];
      if (score !== undefined) {
        categoryScores[question.category].push(score);
      }
    }
  });

  // Calculate average for each category
  const category1 = calculateAverage(categoryScores[1]);
  const category2 = calculateAverage(categoryScores[2]);
  const category3 = calculateAverage(categoryScores[3]);

  // Overall score is the average of all three categories
  const overall = Math.round((category1 + category2 + category3) / 3);

  return {
    category1: Math.round(category1),
    category2: Math.round(category2),
    category3: Math.round(category3),
    overall,
  };
}

/**
 * Convert numerical scores to letter grades
 */
export function calculateGrades(scores: Scores): Grades {
  return {
    category1: getLetterGrade(scores.category1),
    category2: getLetterGrade(scores.category2),
    category3: getLetterGrade(scores.category3),
    overall: getLetterGrade(scores.overall),
  };
}

/**
 * Get letter grade from numerical score
 * A: 90-100
 * B: 80-89
 * C: 70-79
 * D: 60-69
 * F: 0-59
 */
export function getLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Get grade color for UI display
 */
export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A':
      return 'text-green-600 dark:text-green-400';
    case 'B':
      return 'text-blue-600 dark:text-blue-400';
    case 'C':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'D':
      return 'text-orange-600 dark:text-orange-400';
    case 'F':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

/**
 * Get background color for grade badges
 */
export function getGradeBgColor(grade: string): string {
  switch (grade) {
    case 'A':
      return 'bg-green-100 dark:bg-green-900/30';
    case 'B':
      return 'bg-blue-100 dark:bg-blue-900/30';
    case 'C':
      return 'bg-yellow-100 dark:bg-yellow-900/30';
    case 'D':
      return 'bg-orange-100 dark:bg-orange-900/30';
    case 'F':
      return 'bg-red-100 dark:bg-red-900/30';
    default:
      return 'bg-gray-100 dark:bg-gray-900/30';
  }
}

/**
 * Get detailed interpretation text for a grade
 */
export function getGradeInterpretation(grade: string): {
  title: string;
  description: string;
  reality: string;
  whatThisMeans: string[];
  pathForward: string[];
} {
  switch (grade) {
    case 'A':
      return {
        title: 'Elite Emotional Safety',
        description: 'You\'re operating at a level most men aspire to reach.',
        reality: 'Less than 5% of men score in this range initially.',
        whatThisMeans: [
          'Exceptional emotional maturity',
          'Consistently self-aware, empathetic, and growth-oriented',
          'Create profound safety for spouse and children',
          'Model healthy masculinity',
          'Have done significant therapeutic/spiritual work',
        ],
        pathForward: [
          'Sustain this level through ongoing practice and humility',
          'Consider mentoring other men on their journey',
          'Go deeper in specific areas rather than broader',
          'Retake assessment in 6-12 months to track sustaining',
        ],
      };
    case 'B':
      return {
        title: 'Strong Emotional Safety',
        description: 'You\'re operating at a level most men never reach.',
        reality: '10-15% of men score in this range initially.',
        whatThisMeans: [
          'Solid emotional intelligence with consistent application',
          'Good self-awareness, actively working on growth areas',
          'Create reliable safety with occasional ruptures that are quickly repaired',
          'Your wife likely feels generally safe and seen',
          'You\'re mentoring or could mentor other men',
        ],
        pathForward: [
          'The work becomes more nuanced - depth over skills',
          'Address subtle ways you still self-protect or control',
          'Sustain current level while pursuing mastery in 1-2 areas',
          'Goal: Maintain B or move to A in 6-12 months',
        ],
      };
    case 'C':
      return {
        title: 'Developing Emotional Safety',
        description: 'You\'re doing better than most, but there\'s significant room for growth.',
        reality: '20-25% of men score in this range initially.',
        whatThisMeans: [
          'Awareness is present but application is inconsistent',
          'Can do the right thing when focused but default to unhealthy patterns under stress',
          'Your wife experiences you as "sometimes safe"',
          'You know what to do; you don\'t always do it',
          'Risk of plateauing because "things are okay"',
        ],
        pathForward: [
          'Focus on consistency and stress-testing your skills',
          'Address root issues, not just manage symptoms',
          'Pick 2 lowest scoring areas for intensive 90-day focus',
          'Goal: Move to B (80+) in 6-12 months with focused effort',
        ],
      };
    case 'D':
      return {
        title: 'Emerging Emotional Safety',
        description: 'You\'re at the beginning of this journey. Significant change is needed.',
        reality: '25-30% of men score in this range initially.',
        whatThisMeans: [
          'Beginning to develop awareness but still largely reactive',
          'More intellectual understanding than embodied practice',
          'Your wife likely feels unsafe more often than safe',
          'Defensive patterns still dominant',
          'You apologize but repeat the same patterns',
        ],
        pathForward: [
          'Focus is key - don\'t try to improve everything at once',
          'Pick your 2 lowest categories for 90-day intensive work',
          'Consider professional help (counseling or coaching)',
          'Find accountability - you can\'t do this alone',
          'Goal: Move to C (70+) in 6 months with focused effort',
        ],
      };
    case 'F':
      return {
        title: 'Minimal Emotional Safety',
        description: 'This score indicates patterns that are actively harming your marriage. This is a wake-up call.',
        reality: '30-35% of men score in this range initially.',
        whatThisMeans: [
          'Limited self-awareness, high defensiveness, minimal vulnerability or empathy',
          'Likely causing harm even with good intentions',
          'Your wife may feel chronically unsafe',
          'Operating primarily from self-protection',
          'At risk for serious marital crisis if not addressed',
        ],
        pathForward: [
          'CRITICAL: Professional help needed - consider individual counseling immediately',
          'Tell your wife: "I took an assessment and got a failing grade. I want to change. Will you help me?"',
          'Find accountability through a men\'s group or mentor',
          'Commit to 6 months of intensive, focused work on lowest 2 categories',
          'Retake in 6 months to measure actual growth, not just intentions',
        ],
      };
    default:
      return {
        title: 'Not Yet Assessed',
        description: 'Complete the assessment to receive your score.',
        reality: '',
        whatThisMeans: [],
        pathForward: [],
      };
  }
}

/**
 * Get category-specific feedback based on score
 */
export function getCategoryFeedback(
  category: Category,
  score: number
): {
  strengths: string[];
  growthAreas: string[];
  nextSteps: string[];
} {
  const categoryFeedback: Record<
    Category,
    Record<
      string,
      { strengths: string[]; growthAreas: string[]; nextSteps: string[] }
    >
  > = {
    1: {
      // Faith & Identity
      high: {
        strengths: [
          'Your identity is anchored beyond performance',
          'Faith actively shapes your daily responses',
          'You return to center quickly after failure',
        ],
        growthAreas: ['Deepen spiritual practices under extreme stress'],
        nextSteps: [
          'Mentor another man in identity formation',
          'Explore remaining subtle areas of performance-based worth',
        ],
      },
      medium: {
        strengths: [
          'You have spiritual beliefs and some practice',
          'Awareness that identity matters',
        ],
        growthAreas: [
          'Identity still fluctuates based on circumstances',
          'Faith hasn\'t fully translated to embodied responses',
          'Struggle to return to center after wounds',
        ],
        nextSteps: [
          'Establish daily spiritual practice (10-15 minutes)',
          'Read: "The Soul of a Man" by Dan Allender',
          'Identify one man who can speak truth about your identity',
        ],
      },
      low: {
        strengths: ['You\'re beginning to recognize the importance of this foundation'],
        growthAreas: [
          'Identity is primarily performance and approval-based',
          'Limited spiritual grounding',
          'Faith is Sunday belief, not daily practice',
          'Criticism threatens your entire sense of self',
        ],
        nextSteps: [
          'CRITICAL: This is the foundation for everything else',
          'Start with therapy or spiritual direction',
          'Begin asking: "Who am I beyond what I do?"',
          'Practice: Each morning, remind yourself whose you are',
        ],
      },
    },
    2: {
      // Self-Awareness & Self-Regulation
      high: {
        strengths: [
          'Strong emotional literacy and self-awareness',
          'Can pause between stimulus and response',
          'Use healthy tools for self-regulation',
        ],
        growthAreas: ['Maintain skills under extreme stress'],
        nextSteps: [
          'Practice regulation during increasingly difficult situations',
          'Help your children develop these same skills',
        ],
      },
      medium: {
        strengths: [
          'Developing awareness of your emotions',
          'Beginning to identify triggers',
        ],
        growthAreas: [
          'Often reactive, especially under stress',
          'Limited tools for self-soothing beyond distraction',
          'Can\'t always distinguish current emotions from past wounds',
          'Family bears the brunt of your unmanaged state',
        ],
        nextSteps: [
          'Learn the "Name it to Tame it" practice',
          'Develop 2-3 self-regulation tools (breathing, grounding, etc.)',
          'Track your triggers for 30 days',
          'Consider: "The Body Keeps the Score" by Bessel van der Kolk',
        ],
      },
      low: {
        strengths: ['You\'re here, which means you\'re willing to look at this'],
        growthAreas: [
          'Significant blind spots about your emotional state',
          'Highly reactive - your emotions control you',
          'Using avoidance strategies (substances, screens, work)',
          'Your family walks on eggshells around your moods',
        ],
        nextSteps: [
          'CRITICAL: This is likely your highest impact area',
          'Therapy or men\'s group focused on emotional intelligence',
          'Start with basics: Learn to name 5 emotions beyond "fine" and "angry"',
          'Ask your wife to gently point out when you seem dysregulated',
        ],
      },
    },
    3: {
      // Empathy & Understanding
      high: {
        strengths: [
          'See your wife and children clearly',
          'More concerned with understanding than being understood',
          'Can hold space for others\' pain',
        ],
        growthAreas: ['Deepen attunement to subtle emotional needs'],
        nextSteps: [
          'Practice anticipating needs before they\'re expressed',
          'Explore areas where you still make it about you',
        ],
      },
      medium: {
        strengths: [
          'You care about understanding your wife',
          'Some awareness of others\' perspectives',
        ],
        growthAreas: [
          'Get defensive when receiving feedback',
          'Struggle to see beneath surface behaviors',
          'More focused on being understood than understanding',
          'Want to fix rather than hold space for pain',
        ],
        nextSteps: [
          'Practice: Ask your wife one question about her inner world daily',
          'When she\'s upset, pause and ask: "Help me understand"',
          'Read: "The Heart of Man" by John Eldredge',
          'Work on curiosity over defensiveness',
        ],
      },
      low: {
        strengths: ['Acknowledging this gap is the first step'],
        growthAreas: [
          'Significant blind spots about impact on others',
          'Highly defensive to feedback',
          'Don\'t know your wife\'s inner world',
          'See family members as problems to manage, not people to understand',
        ],
        nextSteps: [
          'CRITICAL: Your wife likely feels deeply unseen',
          'Ask her: "What do you wish I understood about you?"',
          'Practice listening without defending for 30 days',
          'Consider couples counseling with empathy focus',
        ],
      },
    },
  };

  const level = score >= 75 ? 'high' : score >= 55 ? 'medium' : 'low';
  return categoryFeedback[category][level];
}

/**
 * Helper function to calculate average of array of numbers
 */
function calculateAverage(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return sum / scores.length;
}

/**
 * Check if assessment is complete (all questions answered)
 */
export function isAssessmentComplete(answers: Record<string, string | number>): boolean {
  return questions.every((q) => {
    const answer = answers[q.id];
    return answer !== undefined && answer !== null && answer !== '';
  });
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(answers: Record<string, string | number>): number {
  const answeredCount = questions.filter((q) => {
    const answer = answers[q.id];
    return answer !== undefined && answer !== null && answer !== '';
  }).length;
  return Math.round((answeredCount / questions.length) * 100);
}



