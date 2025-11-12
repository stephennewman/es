'use client';

import { ScenarioCategory } from '@/lib/types';

interface CategorySelectorProps {
  onSelect: (category: ScenarioCategory) => void;
}

export default function CategorySelector({ onSelect }: CategorySelectorProps) {
  const categories = [
    {
      key: 'self' as ScenarioCategory,
      title: 'Understanding Yourself',
      description: 'Emotional regulation, decisiveness, vulnerability, and self-awareness',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: 'wife' as ScenarioCategory,
      title: 'Understanding Her',
      description: 'How to create emotional safety, listen well, and see your wife clearly',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      key: 'toddler' as ScenarioCategory,
      title: 'Parenting Toddlers',
      description: 'Your 2 and 3-year-old daughters - tantrums, boundaries, and connection',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'teen' as ScenarioCategory,
      title: 'Parenting Teen',
      description: 'Your 14-year-old daughter - boundaries, trust, and staying connected',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Choose a category to practice real-world scenarios
      </p>

      <div className="grid gap-4">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onSelect(category.key)}
            className="flex items-start gap-4 p-6 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-black dark:hover:border-white transition-colors text-left"
          >
            <div className="flex-shrink-0 text-black dark:text-white">
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-black dark:text-white mb-1">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

