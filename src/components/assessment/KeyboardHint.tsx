import React from 'react';

export const KeyboardHint: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="inline-flex items-center gap-3 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm font-sans font-medium">
            1-4
          </kbd>
          <span>Select answer</span>
        </div>
        <div className="w-px h-4 bg-gray-300" />
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm font-sans font-medium">
            Enter
          </kbd>
          <span>Next question</span>
        </div>
      </div>
    </div>
  );
};