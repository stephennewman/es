// Daily ES Journal System Types

export interface UserProfile {
  id: string;
  baseline_score: number | null;
  weak_categories: string[];
  created_at: string;
  updated_at: string;
}

export interface DailyEntry {
  id: string;
  user_id: string;
  entry_date: string; // YYYY-MM-DD
  principles: Principle[];
  created_at: string;
  updated_at: string;
}

export interface DailyItem {
  id: string;
  entry_id: string;
  type: 'checkbox' | 'dash' | 'voice';
  content: string;
  completed: boolean;
  item_order: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateItem {
  id: string;
  user_id: string;
  content: string;
  type: 'checkbox' | 'dash';
  item_order: number;
  created_at: string;
  updated_at: string;
}

export interface VoiceMemo {
  id: string;
  entry_id: string;
  item_id: string;
  raw_transcript: string | null;
  cleaned_summary: string | null;
  title: string;
  themes: string[];
  created_at: string;
}

export interface Principle {
  id: string;
  category: PrincipleCategory;
  title: string;
  description: string;
  examples?: string[];
}

export type PrincipleCategory =
  | 'decisiveness'
  | 'directness'
  | 'leadership'
  | 'regulation'
  | 'vulnerability'
  | 'understanding_her'
  | 'parenting';

export interface LearnScenario {
  id: string;
  category: ScenarioCategory;
  situation: string;
  options: ScenarioOption[];
  correct_answer: string; // 'A', 'B', 'C', 'D'
  feedback: ScenarioFeedback;
  difficulty: 1 | 2 | 3;
  tags: string[];
  created_at: string;
}

export type ScenarioCategory = 'self' | 'wife' | 'toddler' | 'teen';

export interface ScenarioOption {
  letter: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface ScenarioFeedback {
  correct: string; // Why the correct answer is best
  incorrect: Record<string, string>; // Why other answers fall short
}

export interface LearnResponse {
  id: string;
  user_id: string;
  scenario_id: string;
  selected_answer: string;
  is_correct: boolean;
  timestamp: string;
}

// Helper types for display
export interface DailyEntryWithItems extends DailyEntry {
  items: DailyItem[];
  voiceMemos?: VoiceMemo[];
}

export interface UserStats {
  totalResponses: number;
  correctRate: number;
  weakAreas: string[];
  strongAreas: string[];
}

