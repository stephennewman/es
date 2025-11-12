'use client';

import { Scores, Grades, CATEGORY_NAMES } from '@/lib/types';
import { getGradeColor, getGradeBgColor } from '@/lib/scoring';

interface CategoryBreakdownProps {
  scores: Scores;
  grades: Grades;
}

export default function CategoryBreakdown({ scores, grades }: CategoryBreakdownProps) {
  const categories = [
    { id: 1 as const, score: scores.category1, grade: grades.category1 },
    { id: 2 as const, score: scores.category2, grade: grades.category2 },
    { id: 3 as const, score: scores.category3, grade: grades.category3 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black dark:text-white">Category Breakdown</h2>
      <div className="space-y-4">
        {categories.map((cat) => {
          const gradeColor = getGradeColor(cat.grade);
          const gradeBgColor = getGradeBgColor(cat.grade);
          
          return (
            <div
              key={cat.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {CATEGORY_NAMES[cat.id]}
                  </h3>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-black dark:text-white">
                    {cat.score}
                  </span>
                  <span className={`px-4 py-2 rounded-lg font-bold text-xl ${gradeBgColor} ${gradeColor}`}>
                    {cat.grade}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                <div
                  className="bg-black dark:bg-white h-3 rounded-full transition-all"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



