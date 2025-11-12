'use client';

import { useState } from 'react';
import { VoiceMemo } from '@/lib/types';

interface VoiceMemoListProps {
  memos: VoiceMemo[];
}

export default function VoiceMemoList({ memos }: VoiceMemoListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className="space-y-4">
      {memos.map((memo) => {
        const isExpanded = expandedId === memo.id;

        return (
          <div
            key={memo.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleExpand(memo.id)}
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {memo.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(memo.created_at)}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Themes */}
              {memo.themes && memo.themes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {memo.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </button>

            {/* Expanded Content */}
            {isExpanded && memo.cleaned_summary && (
              <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {memo.cleaned_summary}
                </p>
                {memo.raw_transcript && memo.raw_transcript !== memo.cleaned_summary && (
                  <details className="mt-4">
                    <summary className="text-xs text-gray-500 dark:text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                      View raw transcript
                    </summary>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                      {memo.raw_transcript}
                    </p>
                  </details>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

