'use client';

import { useState } from 'react';
import { LearnScenario } from '@/lib/types';

interface ScenarioCardProps {
  scenario: LearnScenario;
  onAnswer: (scenarioId: string, selectedAnswer: string, isCorrect: boolean) => void;
}

export default function ScenarioCard({ scenario, onAnswer }: ScenarioCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (letter: string) => {
    if (showFeedback) return; // Already answered

    setSelectedAnswer(letter);
    setShowFeedback(true);
    const isCorrect = letter === scenario.correct_answer;
    onAnswer(scenario.id, letter, isCorrect);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const isCorrect = selectedAnswer === scenario.correct_answer;

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-6">
      {/* Situation */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
          Situation
        </p>
        <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
          {scenario.situation}
        </p>
      </div>

      {/* Options */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-3">
          What do you do?
        </p>
        <div className="space-y-2">
          {scenario.options.map((option) => {
            const isSelected = selectedAnswer === option.letter;
            const isCorrectOption = option.letter === scenario.correct_answer;

            return (
              <button
                key={option.letter}
                onClick={() => handleSelect(option.letter)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showFeedback
                    ? isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : isCorrectOption
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-800 opacity-50'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex gap-3">
                  <span
                    className={`font-bold ${
                      showFeedback && (isSelected || isCorrectOption)
                        ? isCorrectOption
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-500'
                    }`}
                  >
                    {option.letter}.
                  </span>
                  <span
                    className={`flex-1 ${
                      showFeedback && !isSelected && !isCorrectOption
                        ? 'text-gray-500 dark:text-gray-500'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          {isCorrect ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                ✓ Excellent Choice
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                {scenario.feedback.correct}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
                Not quite. Here's why:
              </p>
              <p className="text-sm text-red-800 dark:text-red-200">
                {scenario.feedback.incorrect[selectedAnswer || '']}
              </p>
            </div>
          )}

          {!isCorrect && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                Better Response ({scenario.correct_answer}):
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                {scenario.feedback.correct}
              </p>
            </div>
          )}

          <button
            onClick={handleReset}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

