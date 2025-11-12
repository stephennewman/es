'use client';

import { Scores, Category, CATEGORY_NAMES } from '@/lib/types';
import { getCategoryFeedback } from '@/lib/scoring';

interface ActionStepsProps {
  scores: Scores;
}

export default function ActionSteps({ scores }: ActionStepsProps) {
  const categories: { id: Category; score: number }[] = [
    { id: 1, score: scores.category1 },
    { id: 2, score: scores.category2 },
    { id: 3, score: scores.category3 },
  ];

  // Find the two lowest scoring categories for focused work
  const sortedCategories = [...categories].sort((a, b) => a.score - b.score);
  const focusAreas = sortedCategories.slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Immediate Action Steps
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Focus your energy on your two lowest-scoring categories. Trying to improve everything at
          once leads to improving nothing. Pick these two areas and commit to 90 days of intensive
          work.
        </p>
      </div>

      {focusAreas.map((category, index) => {
        const feedback = getCategoryFeedback(category.id, category.score);
        return (
          <div
            key={category.id}
            className="border-2 border-black dark:border-white rounded-xl p-6 space-y-6"
          >
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                PRIORITY {index + 1}
              </span>
              <h3 className="text-2xl font-bold text-black dark:text-white mt-1">
                {CATEGORY_NAMES[category.id]}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Current Score: {category.score}/100
              </p>
            </div>

            {feedback.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  ✓ Strengths
                </h4>
                <ul className="space-y-1">
                  {feedback.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.growthAreas.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  ⚠ Growth Areas
                </h4>
                <ul className="space-y-1">
                  {feedback.growthAreas.map((area, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4">
                      • {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.nextSteps.length > 0 && (
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">
                  → Next Steps (Start This Week)
                </h4>
                <ul className="space-y-2">
                  {feedback.nextSteps.map((step, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4">
                      {i + 1}. {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h4 className="font-semibold text-black dark:text-white mb-3">When to Retake:</h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>First retake:</strong> 6 months (to measure actual change)</li>
          <li>• <strong>Ongoing:</strong> Every 6-12 months as a practice</li>
          <li>• <strong>With focused work:</strong> Expect 10-15 point improvement in targeted categories</li>
          <li>• <strong>Without focused work:</strong> Expect 0-3 point change (knowledge alone doesn't move the needle)</li>
        </ul>
      </div>
    </div>
  );
}



