'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to daily journal as the main entry point
    router.push('/daily');
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
    </div>
  );
}
