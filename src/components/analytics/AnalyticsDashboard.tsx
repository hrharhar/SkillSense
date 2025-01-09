import React, { useState } from 'react';
import { TrendChart } from './TrendChart';
import { CategoryMetricsCard } from './CategoryMetricsCard';
import { useAssessmentStore } from '../../store/assessmentStore';
import { generatePerformanceMetrics } from '../../utils/analytics';
import { Button } from '../ui/Button';
import { FileDown, Calendar, Filter, BarChart2 } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { PerformanceComparison } from './PerformanceComparison';
import { CustomReportBuilder } from './CustomReportBuilder';

export const AnalyticsDashboard: React.FC = () => {
  const { results } = useAssessmentStore();
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date()
  });
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  const metrics = generatePerformanceMetrics(results, dateRange);

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Candidate', 'Position', 'Score', 'Categories'],
      ...results.map(result => [
        new Date(result.completedAt).toLocaleDateString(),
        result.userId,
        result.assessmentId,
        result.score,
        Object.values(metrics.categoryMetrics)
          .map(cat => `${cat.name}: ${cat.averageScore}%`)
          .join('; ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cognitive-canvas-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={setDateRange}
          />
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowReportBuilder(true)}
          >
            <BarChart2 className="w-4 h-4" />
            Custom Report
          </Button>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={handleExportCSV}
          >
            <FileDown className="w-4 h-4" />
            Export Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Assessments</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">{metrics.totalAssessments}</p>
              <p className="text-sm text-gray-500 mt-1">
                {metrics.trends[metrics.trends.length - 1]?.totalCandidates || 0} this week
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {metrics.averageScore.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {(metrics.trends[metrics.trends.length - 1]?.averageScore || 0).toFixed(1)}% this week
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Time Period</h3>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Score Trends</h3>
          <TrendChart data={metrics.trends} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Performance Comparison</h3>
          <PerformanceComparison metrics={metrics} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.categoryMetrics.map(categoryMetric => (
          <CategoryMetricsCard
            key={categoryMetric.name}
            metrics={categoryMetric}
          />
        ))}
      </div>

      {showReportBuilder && (
        <CustomReportBuilder
          metrics={metrics}
          onClose={() => setShowReportBuilder(false)}
        />
      )}
    </div>
  );
};