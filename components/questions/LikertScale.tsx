'use client';

interface LikertScaleProps {
  questionId: string;
  questionText: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export default function LikertScale({
  questionId,
  questionText,
  value,
  onChange,
}: LikertScaleProps) {
  const options = [
    { value: '1', label: 'Strongly Disagree' },
    { value: '2', label: 'Disagree' },
    { value: '3', label: 'Somewhat Disagree' },
    { value: '4', label: 'Neutral' },
    { value: '5', label: 'Somewhat Agree' },
    { value: '6', label: 'Agree' },
    { value: '7', label: 'Strongly Agree' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
        {questionText}
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <input
              type="radio"
              name={questionId}
              value={option.value}
              checked={String(value) === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-black dark:text-white focus:ring-black dark:focus:ring-white"
            />
            <span className="flex-1 text-gray-700 dark:text-gray-300">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {option.value}
              </span>
              {' - '}
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}



