'use client';

import { useState } from 'react';

interface QuickAddProps {
  onAdd: (type: 'checkbox' | 'dash', content: string) => void;
}

export default function QuickAdd({ onAdd }: QuickAddProps) {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'checkbox' | 'dash'>('checkbox');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(type, input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('checkbox')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            type === 'checkbox'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Task
        </button>
        <button
          type="button"
          onClick={() => setType('dash')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            type === 'dash'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Note
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={type === 'checkbox' ? 'Add a task...' : 'Add a note...'}
          className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}

