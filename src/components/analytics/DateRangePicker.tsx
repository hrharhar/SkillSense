import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { start: Date; end: Date }) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-3 py-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => onChange({ start: new Date(e.target.value), end: endDate })}
          className="border-none focus:ring-0 text-sm"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => onChange({ start: startDate, end: new Date(e.target.value) })}
          className="border-none focus:ring-0 text-sm"
        />
      </div>
    </div>
  );
};