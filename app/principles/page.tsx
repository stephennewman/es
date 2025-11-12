'use client';

import { useState } from 'react';
import { principles } from '@/lib/principles-data';
import { PrincipleCategory } from '@/lib/types';
import BottomNav from '@/components/navigation/BottomNav';
import PrincipleCard from '@/components/principles/PrincipleCard';

const categories: { key: PrincipleCategory; label: string }[] = [
  { key: 'decisiveness', label: 'Decisiveness & Action' },
  { key: 'directness', label: 'Directness & Communication' },
  { key: 'leadership', label: 'Leadership & Initiative' },
  { key: 'regulation', label: 'Emotional Regulation' },
  { key: 'vulnerability', label: 'Vulnerability & Failure' },
  { key: 'understanding_her', label: 'Understanding Her' },
  { key: 'parenting', label: 'Parenting Daughters' },
];

export default function PrinciplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<PrincipleCategory | 'all'>('all');

  const filteredPrinciples =
    selectedCategory === 'all'
      ? principles
      : principles.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4 z-10">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Emotional Safety Principles
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Core principles for creating safety in your marriage and family
          </p>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Principles List */}
        <div className="px-6 py-6 space-y-4">
          {filteredPrinciples.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>

        {filteredPrinciples.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No principles found in this category.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

