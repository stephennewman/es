'use client';

interface ProgressIndicatorProps {
  completionPercentage: number;
  answeredCount: number;
  totalCount: number;
}

export default function ProgressIndicator({
  completionPercentage,
  answeredCount,
  totalCount,
}: ProgressIndicatorProps) {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {answeredCount} / {totalCount} questions
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}



