'use client';

interface FrequencyScaleProps {
  questionId: string;
  questionText: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export default function FrequencyScale({
  questionId,
  questionText,
  value,
  onChange,
}: FrequencyScaleProps) {
  const options = [
    { value: 'never', label: 'Never' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'often', label: 'Often' },
    { value: 'always', label: 'Always' },
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
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-black dark:text-white focus:ring-black dark:focus:ring-white"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}



