import React from 'react';

interface QuestionOptionProps {
  index: number;
  option: string;
  selected: boolean;
  onSelect: () => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  index,
  option,
  selected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
      }`}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 font-semibold ${
          selected
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {index + 1}
      </div>
      <span
        className={`text-lg ${
          selected ? 'text-blue-700' : 'text-gray-800'
        }`}
      >
        {option}
      </span>
    </button>
  );
};