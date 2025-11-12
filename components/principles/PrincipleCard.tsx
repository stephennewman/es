'use client';

import { Principle } from '@/lib/types';

interface PrincipleCardProps {
  principle: Principle;
}

export default function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {principle.title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {principle.description}
      </p>

      {principle.examples && principle.examples.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
            Examples
          </p>
          <ul className="space-y-1">
            {principle.examples.map((example, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-400 pl-4 relative before:content-['•'] before:absolute before:left-0"
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

