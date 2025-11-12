'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DailyEntry, DailyItem, Principle, VoiceMemo } from '@/lib/types';
import TemplateItem from './TemplateItem';
import QuickAdd from './QuickAdd';
import VoiceMemoInline from './VoiceMemoInline';

interface DailyEntryCardProps {
  entry: DailyEntry;
  onUpdate: () => void;
}

export default function DailyEntryCard({ entry, onUpdate }: DailyEntryCardProps) {
  const [items, setItems] = useState<DailyItem[]>([]);
  const [voiceMemos, setVoiceMemos] = useState<VoiceMemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadItems();
    loadVoiceMemos();
  }, [entry.id, refreshKey]);

  async function loadItems() {
    try {
      const { data, error } = await supabase
        .from('daily_items')
        .select('*')
        .eq('entry_id', entry.id)
        .order('item_order');

      if (error) throw error;
      setItems(data || []);
      
      // Also reload voice memos when items change (since voice items trigger voice memos)
      loadVoiceMemos();
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadVoiceMemos() {
    try {
      const { data, error } = await supabase
        .from('voice_memos')
        .select('*')
        .eq('entry_id', entry.id)
        .order('created_at');

      if (error) throw error;
      setVoiceMemos(data || []);
    } catch (error) {
      console.error('Error loading voice memos:', error);
    }
  }

  async function toggleItem(itemId: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('daily_items')
        .update({ completed })
        .eq('id', itemId);

      if (error) throw error;
      await loadItems();
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  }

  async function addItem(type: 'checkbox' | 'dash', content: string) {
    try {
      const nextOrder = items.length;
      const { error } = await supabase
        .from('daily_items')
        .insert({
          entry_id: entry.id,
          type,
          content,
          completed: false,
          item_order: nextOrder,
        });

      if (error) throw error;
      await loadItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  async function deleteItem(itemId: string) {
    try {
      const { error } = await supabase
        .from('daily_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  const entryDate = new Date(entry.entry_date);
  const today = new Date();
  const isToday = entryDate.toDateString() === today.toDateString();

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-6 space-y-6">
        {/* Date Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {formatDate(entryDate)}
            </h2>
            {isToday && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Today
              </p>
            )}
          </div>
        </div>

        {/* Daily Principles */}
        {entry.principles && entry.principles.length > 0 && (
          <div className="space-y-2">
            {entry.principles.map((principle: Principle, index: number) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {principle.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Items List */}
        {loading ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading items...</div>
        ) : (
          <div className="space-y-2">
            {items.filter(item => item.type !== 'voice').map((item) => (
              <TemplateItem
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}

        {/* Voice Memos */}
        {voiceMemos.length > 0 && (
          <div className="space-y-2">
            {voiceMemos.map((memo) => (
              <VoiceMemoInline key={memo.id} memo={memo} />
            ))}
          </div>
        )}

        {/* Quick Add (only for today) */}
        {isToday && (
          <QuickAdd onAdd={addItem} />
        )}
      </div>
    </div>
  );
}

