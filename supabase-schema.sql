-- Daily ES Journal System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profile Table
CREATE TABLE IF NOT EXISTS user_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baseline_score INTEGER,
  weak_categories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Entries Table
CREATE TABLE IF NOT EXISTS daily_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL UNIQUE,
  principles JSONB DEFAULT '[]'::jsonb, -- Array of 3 daily principles
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Items Table (tasks, notes, voice memos)
CREATE TABLE IF NOT EXISTS daily_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID REFERENCES daily_entries(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('checkbox', 'dash', 'voice')),
  content TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  item_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Template Items Table (customizable daily template)
CREATE TABLE IF NOT EXISTS template_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('checkbox', 'dash')),
  item_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Voice Memos Table
CREATE TABLE IF NOT EXISTS voice_memos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID REFERENCES daily_entries(id) ON DELETE CASCADE,
  item_id UUID REFERENCES daily_items(id) ON DELETE CASCADE,
  raw_transcript TEXT,
  cleaned_summary TEXT,
  title TEXT NOT NULL,
  themes JSONB DEFAULT '[]'::jsonb, -- Array of theme tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learn Scenarios Table
CREATE TABLE IF NOT EXISTS learn_scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL CHECK (category IN ('self', 'wife', 'toddler', 'teen')),
  situation TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  correct_answer TEXT NOT NULL, -- Letter of correct answer (A, B, C, D)
  feedback JSONB NOT NULL, -- Feedback for each option
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  tags JSONB DEFAULT '[]'::jsonb, -- Tags like 'defensiveness', 'listening', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learn Responses Table (tracks user answers)
CREATE TABLE IF NOT EXISTS learn_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES learn_scenarios(id) ON DELETE CASCADE,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_daily_entries_date ON daily_entries(entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_items_entry ON daily_items(entry_id, item_order);
CREATE INDEX IF NOT EXISTS idx_template_items_user ON template_items(user_id, item_order);
CREATE INDEX IF NOT EXISTS idx_voice_memos_entry ON voice_memos(entry_id);
CREATE INDEX IF NOT EXISTS idx_learn_responses_user ON learn_responses(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_learn_scenarios_category ON learn_scenarios(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_profile_updated_at BEFORE UPDATE ON user_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_entries_updated_at BEFORE UPDATE ON daily_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_items_updated_at BEFORE UPDATE ON daily_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_template_items_updated_at BEFORE UPDATE ON template_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allowing all operations for now - single user app)
CREATE POLICY "Allow all operations" ON user_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON daily_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON daily_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON template_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON voice_memos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON learn_scenarios FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON learn_responses FOR ALL USING (true) WITH CHECK (true);

-- Insert default user profile
INSERT INTO user_profile (baseline_score, weak_categories)
VALUES (59, '["self_awareness", "empathy"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert default template items
INSERT INTO template_items (user_id, content, type, item_order)
SELECT 
  (SELECT id FROM user_profile LIMIT 1),
  content,
  'checkbox',
  item_order
FROM (VALUES
  ('Pray', 1),
  ('Read', 2),
  ('Workout', 3),
  ('Stretch', 4),
  ('Breathe', 5),
  ('Breakfast', 6),
  ('Lunch', 7),
  ('Dinner', 8),
  ('One-on-one with 14yo', 9),
  ('Play with toddlers', 10),
  ('Check-in with wife', 11)
) AS defaults(content, item_order)
ON CONFLICT DO NOTHING;

