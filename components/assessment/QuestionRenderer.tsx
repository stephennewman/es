'use client';

import { Question } from '@/lib/types';
import LikertScale from '../questions/LikertScale';
import MultipleChoice from '../questions/MultipleChoice';
import FrequencyScale from '../questions/FrequencyScale';
import BinaryChoice from '../questions/BinaryChoice';

interface QuestionRendererProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string) => void;
  questionNumber: number;
}

export default function QuestionRenderer({
  question,
  value,
  onChange,
  questionNumber,
}: QuestionRendererProps) {
  return (
    <div className="py-8 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Question {questionNumber}
        </span>
      </div>

      {question.type === 'likert' && (
        <LikertScale
          questionId={question.id}
          questionText={question.text}
          value={value}
          onChange={onChange}
        />
      )}

      {question.type === 'multiple_choice' && question.options && (
        <MultipleChoice
          questionId={question.id}
          questionText={question.text}
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )}

      {question.type === 'frequency' && (
        <FrequencyScale
          questionId={question.id}
          questionText={question.text}
          value={value}
          onChange={onChange}
        />
      )}

      {question.type === 'binary' && question.options && (
        <BinaryChoice
          questionId={question.id}
          questionText={question.text}
          options={question.options}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}



