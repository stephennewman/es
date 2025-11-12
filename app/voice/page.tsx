'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { VoiceMemo } from '@/lib/types';
import BottomNav from '@/components/navigation/BottomNav';
import VoiceMemoList from '@/components/voice/VoiceMemoList';

export default function VoicePage() {
  const [memos, setMemos] = useState<VoiceMemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMemos();
  }, []);

  async function loadMemos() {
    try {
      const { data, error } = await supabase
        .from('voice_memos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemos(data || []);
    } catch (error) {
      console.error('Error loading memos:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMemos = memos.filter((memo) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      memo.title.toLowerCase().includes(query) ||
      memo.cleaned_summary?.toLowerCase().includes(query) ||
      memo.themes.some((theme) => theme.toLowerCase().includes(query))
    );
  });

  // Group memos by theme
  const allThemes = Array.from(
    new Set(memos.flatMap((memo) => memo.themes))
  ).sort();

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4 z-10">
          <h1 className="text-2xl font-bold text-black dark:text-white">Voice Memos</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {memos.length} memo{memos.length !== 1 ? 's' : ''} recorded
          </p>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memos by title, content, or theme..."
            className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
          />
        </div>

        {/* Themes Filter */}
        {allThemes.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
              Common Themes
            </p>
            <div className="flex flex-wrap gap-2">
              {allThemes.slice(0, 10).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSearchQuery(theme)}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Memos List */}
        {loading ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">Loading memos...</p>
          </div>
        ) : filteredMemos.length > 0 ? (
          <div className="px-6 py-6">
            <VoiceMemoList memos={filteredMemos} />
          </div>
        ) : searchQuery ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No memos match "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-sm text-black dark:text-white hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No voice memos yet. Record one from the daily log.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

