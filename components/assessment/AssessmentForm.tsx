'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { CATEGORY_NAMES } from '@/lib/types';
import {
  calculateScores,
  calculateGrades,
  getCompletionPercentage,
  isAssessmentComplete,
} from '@/lib/scoring';
import { saveDraft, clearDraft, saveAssessment } from '@/lib/storage';
import QuestionRenderer from './QuestionRenderer';
import ProgressIndicator from './ProgressIndicator';

interface AssessmentFormProps {
  initialAnswers?: Record<string, string | number>;
}

export default function AssessmentForm({ initialAnswers = {} }: AssessmentFormProps) {
  const [answers, setAnswers] = useState<Record<string, string | number>>(initialAnswers);
  const [currentCategory, setCurrentCategory] = useState<number>(1);
  const router = useRouter();

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(answers).length > 0) {
        saveDraft(answers);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [answers]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (!isAssessmentComplete(answers)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    // Calculate scores and grades
    const scores = calculateScores(answers);
    const grades = calculateGrades(scores);

    // Save assessment
    const assessment = {
      timestamp: Date.now(),
      answers,
      scores,
      grades,
    };

    saveAssessment(assessment);
    clearDraft();

    // Navigate to results
    router.push('/results');
  };

  const completionPercentage = getCompletionPercentage(answers);
  const answeredCount = Object.keys(answers).length;
  const isComplete = isAssessmentComplete(answers);

  // Group questions by category
  const questionsByCategory = {
    1: questions.filter((q) => q.category === 1),
    2: questions.filter((q) => q.category === 2),
    3: questions.filter((q) => q.category === 3),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ProgressIndicator
        completionPercentage={completionPercentage}
        answeredCount={answeredCount}
        totalCount={questions.length}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Category 1 */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Category 1: {CATEGORY_NAMES[1]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Spiritual Foundation - Who am I, and by what authority do I live?
            </p>
          </div>
          {questionsByCategory[1].map((question, index) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
              questionNumber={index + 1}
            />
          ))}
        </div>

        {/* Category 2 */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Category 2: {CATEGORY_NAMES[2]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Internal Safety - Can I observe and manage my inner world without it controlling me?
            </p>
          </div>
          {questionsByCategory[2].map((question, index) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
              questionNumber={questionsByCategory[1].length + index + 1}
            />
          ))}
        </div>

        {/* Category 3 */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Category 3: {CATEGORY_NAMES[3]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Seeing Others Accurately - Can I see my spouse and children as they truly are?
            </p>
          </div>
          {questionsByCategory[3].map((question, index) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
              questionNumber={
                questionsByCategory[1].length + questionsByCategory[2].length + index + 1
              }
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col items-center space-y-4">
            {!isComplete && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                Please answer all {questions.length} questions before submitting
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {isComplete ? 'Submit Assessment' : `${answeredCount} / ${questions.length} Answered`}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
              Your answers are automatically saved as you progress. You can close this page and
              return later to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



