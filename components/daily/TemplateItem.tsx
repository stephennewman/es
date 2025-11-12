'use client';

import { DailyItem } from '@/lib/types';

interface TemplateItemProps {
  item: DailyItem;
  onToggle: (itemId: string, completed: boolean) => void;
  onDelete: (itemId: string) => void;
}

export default function TemplateItem({ item, onToggle, onDelete }: TemplateItemProps) {
  if (item.type === 'checkbox') {
    return (
      <div className="flex items-start gap-3 group">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={(e) => onToggle(item.id, e.target.checked)}
          className="mt-1 w-4 h-4 text-black dark:text-white border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
        />
        <span
          className={`flex-1 text-sm ${
            item.completed
              ? 'text-gray-400 dark:text-gray-600 line-through'
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {item.content}
        </span>
        <button
          onClick={() => onDelete(item.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          aria-label="Delete item"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  // Dash type (note/reminder)
  return (
    <div className="flex items-start gap-3 group">
      <span className="text-gray-400 dark:text-gray-600 mt-1">—</span>
      <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
        {item.content}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        aria-label="Delete item"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

