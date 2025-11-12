'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLatestAssessment } from '@/lib/storage';
import { Assessment } from '@/lib/types';
import ScoreCard from '@/components/results/ScoreCard';
import CategoryBreakdown from '@/components/results/CategoryBreakdown';
import GradeInterpretation from '@/components/results/GradeInterpretation';
import ActionSteps from '@/components/results/ActionSteps';

export default function ResultsPage() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const latest = getLatestAssessment();
    if (!latest) {
      // No assessment found, redirect to home
      router.push('/');
      return;
    }
    setAssessment(latest);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
      </div>
    );
  }

  if (!assessment) {
    return null;
  }

  const { scores, grades } = assessment;

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            Your Emotional Safety Score
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Completed on {new Date(assessment.timestamp).toLocaleDateString()}
          </p>
        </div>

        {/* Overall Score */}
        <ScoreCard
          score={scores.overall}
          grade={grades.overall}
          title="Overall Emotional Safety Score"
          subtitle="Your composite score across all three categories"
        />

        {/* Grade Interpretation */}
        <GradeInterpretation grade={grades.overall} />

        {/* Category Breakdown */}
        <CategoryBreakdown scores={scores} grades={grades} />

        {/* Action Steps */}
        <ActionSteps scores={scores} />

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.push('/assessment')}
              className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Your results are saved locally in your browser. You can return to view them anytime.
          </p>
        </div>
      </div>
    </div>
  );
}



