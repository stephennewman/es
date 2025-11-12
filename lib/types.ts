// Question types
export type QuestionType = 'likert' | 'multiple_choice' | 'frequency' | 'binary' | 'ranking';

export type Category = 1 | 2 | 3;

export interface Question {
  id: string;
  category: Category;
  type: QuestionType;
  text: string;
  options?: string[];
  scoringKey: Record<string, number>; // maps answer to points (0-100)
}

export interface Scores {
  category1: number;
  category2: number;
  category3: number;
  overall: number;
}

export interface Grades {
  category1: string;
  category2: string;
  category3: string;
  overall: string;
}

export interface Assessment {
  timestamp: number;
  answers: Record<string, string | number>;
  scores: Scores;
  grades: Grades;
}

export interface StorageData {
  version: number;
  assessments: Assessment[];
  currentDraft?: {
    answers: Record<string, string | number>;
    lastUpdated: number;
  };
}

export const CATEGORY_NAMES: Record<Category, string> = {
  1: 'Faith & Identity',
  2: 'Self-Awareness & Self-Regulation',
  3: 'Empathy & Understanding',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  1: 'Spiritual Foundation - Who am I, and by what authority do I live?',
  2: 'Internal Safety - Can I observe and manage my inner world without it controlling me?',
  3: 'Seeing Others Accurately - Can I see my spouse and children as they truly are, not as I need them to be?',
};

// Export daily system types
export * from './daily-types';

