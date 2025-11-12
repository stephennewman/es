'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DailyEntry, DailyItem, TemplateItem } from '@/lib/types';
import { getRandomPrinciples } from '@/lib/principles-data';
import { getPersonalizedPrinciples } from '@/lib/ai-guidance';
import BottomNav from '@/components/navigation/BottomNav';
import DailyEntryCard from '@/components/daily/DailyEntryCard';
import VoiceRecordButton from '@/components/daily/VoiceRecordButton';

export default function DailyPage() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Get or create user profile
      const { data: profile } = await supabase
        .from('user_profile')
        .select('id')
        .limit(1)
        .single();

      let currentUserId;
      if (!profile) {
        // Create default profile
        const { data: newProfile } = await supabase
          .from('user_profile')
          .insert({ baseline_score: 59, weak_categories: [] })
          .select('id')
          .single();
        currentUserId = newProfile?.id || null;
        setUserId(currentUserId);
      } else {
        currentUserId = profile.id;
        setUserId(profile.id);
      }

      // Ensure entries for the past week (including today)
      await ensurePastWeekEntries(currentUserId);

      // Load recent entries (last 30 days)
      const { data: entriesData, error } = await supabase
        .from('daily_entries')
        .select('*')
        .order('entry_date', { ascending: false })
        .limit(30);

      if (error) throw error;
      setEntries(entriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function ensurePastWeekEntries(userId: string) {
    if (!userId) return;

    // Generate dates for the past week (today + 6 days back)
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // Get existing entries for these dates
    const { data: existingEntries } = await supabase
      .from('daily_entries')
      .select('entry_date')
      .in('entry_date', dates);

    const existingDates = new Set(existingEntries?.map(e => e.entry_date) || []);

    // Get or create template items once
    const { data: templateItems } = await supabase
      .from('template_items')
      .select('*')
      .eq('user_id', userId)
      .order('item_order');

    // Create missing entries
    for (const date of dates) {
      if (!existingDates.has(date)) {
        try {
          let principles;
          try {
            principles = await getPersonalizedPrinciples(userId);
          } catch (error) {
            principles = getRandomPrinciples(3);
          }

          const { data: newEntry, error: entryError } = await supabase
            .from('daily_entries')
            .insert({
              user_id: userId,
              entry_date: date,
              principles: principles,
            })
            .select()
            .single();

          if (entryError) {
            console.error(`Error creating entry for ${date}:`, entryError);
            continue;
          }

          // Create daily items from template
          if (templateItems && templateItems.length > 0 && newEntry) {
            const dailyItems = templateItems.map((item: TemplateItem, index: number) => ({
              entry_id: newEntry.id,
              type: item.type,
              content: item.content,
              completed: false,
              item_order: index,
            }));

            await supabase.from('daily_items').insert(dailyItems);
          } else if (newEntry && (!templateItems || templateItems.length === 0)) {
            // Create default template only once for the first entry
            if (date === dates[0]) {
              await createDefaultTemplate(userId, newEntry.id);
            }
          }
        } catch (error) {
          console.error(`Error creating entry for ${date}:`, error);
        }
      }
    }
  }

  async function ensureTodayEntry(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    // Check if today's entry exists
    const { data: existing } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('entry_date', today)
      .single();

    if (!existing) {
      // Create today's entry with personalized or random principles
      let principles;
      try {
        principles = await getPersonalizedPrinciples(userId);
      } catch (error) {
        console.error('Error getting personalized principles:', error);
        principles = getRandomPrinciples(3);
      }
      
      const { data: newEntry, error } = await supabase
        .from('daily_entries')
        .insert({
          user_id: userId,
          entry_date: today,
          principles: principles,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating today entry:', error);
        return;
      }

      // Get template items and create daily items from them
      const { data: templateItems } = await supabase
        .from('template_items')
        .select('*')
        .eq('user_id', userId)
        .order('item_order');

      if (templateItems && templateItems.length > 0) {
        const dailyItems = templateItems.map((item: TemplateItem, index: number) => ({
          entry_id: newEntry.id,
          type: item.type,
          content: item.content,
          completed: false,
          item_order: index,
        }));

        await supabase.from('daily_items').insert(dailyItems);
      } else {
        // Create default template if none exists
        await createDefaultTemplate(userId, newEntry.id);
      }
    }
  }

  async function createDefaultTemplate(userId: string, entryId: string) {
    const defaultItems = [
      'Pray',
      'Read',
      'Workout',
      'Stretch',
      'Breathe',
      'Breakfast',
      'Lunch',
      'Dinner',
      'One-on-one with 14yo',
      'Play with toddlers',
      'Check-in with wife',
    ];

    // Create template items
    const templateItems = defaultItems.map((content, index) => ({
      user_id: userId,
      content,
      type: 'checkbox',
      item_order: index,
    }));

    await supabase.from('template_items').insert(templateItems);

    // Create daily items for today
    const dailyItems = defaultItems.map((content, index) => ({
      entry_id: entryId,
      type: 'checkbox',
      content,
      completed: false,
      item_order: index,
    }));

    await supabase.from('daily_items').insert(dailyItems);
  }

  async function refreshEntries() {
    await loadData();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center pb-20">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  const todayEntry = entries.find(e => {
    const today = new Date().toISOString().split('T')[0];
    return e.entry_date === today;
  });

  const formatHeaderDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4 z-10">
          <h1 className="text-2xl font-bold text-black dark:text-white">Daily Log</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {formatHeaderDate()}
          </p>
        </div>

        {/* Entries Feed */}
        <div className="space-y-0">
          {entries.map((entry) => (
            <DailyEntryCard
              key={entry.id}
              entry={entry}
              onUpdate={refreshEntries}
            />
          ))}
        </div>

        {entries.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No entries yet. Pull to refresh to create today's entry.</p>
          </div>
        )}
      </div>

      {/* Voice Record Button (only show for today) */}
      {todayEntry && (
        <VoiceRecordButton 
          entryId={todayEntry.id}
          onRecorded={refreshEntries}
        />
      )}

      <BottomNav />
    </div>
  );
}

