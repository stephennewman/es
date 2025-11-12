'use client';

import { VoiceMemo } from '@/lib/types';

interface VoiceMemoInlineProps {
  memo: VoiceMemo;
}

export default function VoiceMemoInline({ memo }: VoiceMemoInlineProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex-shrink-0 mt-0.5">
        <svg
          className="w-5 h-5 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {memo.title}
        </p>
        {memo.themes && memo.themes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {memo.themes.map((theme, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

