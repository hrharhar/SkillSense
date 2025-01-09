import React, { useState } from 'react';
import { PerformanceMetrics } from '../../utils/analytics';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

interface CustomReportBuilderProps {
  metrics: PerformanceMetrics;
  onClose: () => void;
}

export const CustomReportBuilder: React.FC<CustomReportBuilderProps> = ({ metrics, onClose }) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const handleExport = () => {
    // Generate custom report based on selected metrics
    const reportData = {
      overview: selectedMetrics.includes('overview') ? {
        totalAssessments: metrics.totalAssessments,
        averageScore: metrics.averageScore
      } : null,
      trends: selectedMetrics.includes('trends') ? metrics.trends : null,
      categories: selectedMetrics.includes('categories') ? metrics.categoryMetrics : null
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `custom-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Custom Report Builder</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes('overview')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMetrics([...selectedMetrics, 'overview']);
                } else {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== 'overview'));
                }
              }}
              className="rounded border-gray-300"
            />
            <span>Overview Statistics</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes('trends')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMetrics([...selectedMetrics, 'trends']);
                } else {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== 'trends'));
                }
              }}
              className="rounded border-gray-300"
            />
            <span>Performance Trends</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes('categories')}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMetrics([...selectedMetrics, 'categories']);
                } else {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== 'categories'));
                }
              }}
              className="rounded border-gray-300"
            />
            <span>Category Analysis</span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={selectedMetrics.length === 0}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};