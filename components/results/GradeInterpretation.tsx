'use client';

import { getGradeInterpretation } from '@/lib/scoring';

interface GradeInterpretationProps {
  grade: string;
}

export default function GradeInterpretation({ grade }: GradeInterpretationProps) {
  const interpretation = getGradeInterpretation(grade);

  return (
    <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          {interpretation.title}
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {interpretation.description}
        </p>
      </div>

      {interpretation.reality && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
            REALITY CHECK
          </p>
          <p className="text-gray-800 dark:text-gray-200">{interpretation.reality}</p>
        </div>
      )}

      {interpretation.whatThisMeans.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
            What This Score Means:
          </h3>
          <ul className="space-y-2">
            {interpretation.whatThisMeans.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-400 dark:text-gray-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {interpretation.pathForward.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
            Your Path Forward:
          </h3>
          <ul className="space-y-2">
            {interpretation.pathForward.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-black dark:text-white font-bold mt-1">{index + 1}.</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



