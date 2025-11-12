'use client';

import { getGradeColor, getGradeBgColor } from '@/lib/scoring';

interface ScoreCardProps {
  score: number;
  grade: string;
  title: string;
  subtitle?: string;
}

export default function ScoreCard({ score, grade, title, subtitle }: ScoreCardProps) {
  const gradeColor = getGradeColor(grade);
  const gradeBgColor = getGradeBgColor(grade);

  return (
    <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center">
      <div className="mb-4">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${gradeBgColor} mb-4`}>
          <span className={`text-5xl font-bold ${gradeColor}`}>{grade}</span>
        </div>
        <div className="text-6xl font-bold text-black dark:text-white mb-2">{score}</div>
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">out of 100</div>
      </div>
      <h3 className="text-xl font-semibold text-black dark:text-white mb-1">{title}</h3>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{subtitle}</p>
      )}
    </div>
  );
}



