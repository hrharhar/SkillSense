import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, MessageSquare, Lightbulb, ClipboardCheck, Box, ChevronDown, ChevronUp, FileDown, Clock } from 'lucide-react';
import { Result, CategoryScore } from '../../types';
import { getCategoryScores } from '../../utils/scoring';
import { getCategoryFeedback, getOverallAssessment } from '../../utils/assessmentFeedback';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResultsPDFDocument } from '../pdf/ResultsPDFDocument';
import { Button } from '../ui/Button';

interface AssessmentResultsProps {
  result: Result;
  candidateInfo: {
    fullName: string;
    position: string;
  };
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ result, candidateInfo }) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const categoryScores = getCategoryScores(result.answers);
  const averageScore = result.score;

  const chartData = categoryScores.map(({ category, score }) => ({
    subject: category.split(' ')[0],
    fullName: category,
    score: Math.round(score)
  }));

  const getScoreColor = (score: number) => {
    if (score >= 83) return 'text-green-600';
    if (score >= 67) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div className="bg-white rounded-xl shadow-sm p-6 flex-1 mr-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{candidateInfo.fullName}</h1>
              <p className="text-gray-600">{candidateInfo.position}</p>
              {result.timeSpent && (
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Completed in {formatTime(result.timeSpent)}</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>
                {Math.round(averageScore)}%
              </p>
              <p className="text-gray-600">Overall Score</p>
            </div>
          </div>
        </div>
        
        <PDFDownloadLink
          document={<ResultsPDFDocument result={result} candidateInfo={candidateInfo} />}
          fileName={`${candidateInfo.fullName.replace(/\s+/g, '-')}-assessment-results.pdf`}
        >
          {({ loading }) => (
            <Button
              variant="primary"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <FileDown className="w-4 h-4" />
              {loading ? 'Generating PDF...' : 'Export Results'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Assessment</h2>
        <p className="text-gray-600">{getOverallAssessment(averageScore)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="subject"
                  tick={({ payload, x, y, textAnchor, stroke, radius }) => (
                    <g>
                      <text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fill="#666"
                        fontSize={12}
                      >
                        {payload.value}
                      </text>
                    </g>
                  )}
                />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Score']}
                  labelFormatter={(label) => chartData.find(item => item.subject === label)?.fullName || label}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Category Breakdown</h2>
          <div className="space-y-4">
            {categoryScores.map(({ category, score, icon, description, feedback }) => (
              <div
                key={category}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${getScoreColor(score)}`}>{icon}</div>
                    <div>
                      <h3 className="font-semibold">{category}</h3>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                  <p className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-600">{feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};