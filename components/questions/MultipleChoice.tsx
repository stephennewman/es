'use client';

interface MultipleChoiceProps {
  questionId: string;
  questionText: string;
  options: string[];
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export default function MultipleChoice({
  questionId,
  questionText,
  options,
  value,
  onChange,
}: MultipleChoiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
        {questionText}
      </p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-start space-x-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <input
              type="radio"
              name={questionId}
              value={String(index)}
              checked={String(value) === String(index)}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 mt-1 text-black dark:text-white focus:ring-black dark:focus:ring-white flex-shrink-0"
            />
            <span className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}



