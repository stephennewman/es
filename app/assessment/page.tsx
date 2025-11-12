'use client';

import { useEffect, useState } from 'react';
import { getDraft } from '@/lib/storage';
import AssessmentForm from '@/components/assessment/AssessmentForm';

export default function AssessmentPage() {
  const [initialAnswers, setInitialAnswers] = useState<Record<string, string | number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load draft answers if they exist
    const draft = getDraft();
    if (draft) {
      setInitialAnswers(draft);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-gray-600 dark:text-gray-400">Loading assessment...</p>
      </div>
    );
  }

  return <AssessmentForm initialAnswers={initialAnswers} />;
}



