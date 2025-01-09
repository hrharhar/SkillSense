import React, { useState } from 'react';
import { Search, FileDown, ArrowLeft } from 'lucide-react';
import { Result } from '../../types';
import { Button } from '../ui/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResultsPDFDocument } from '../pdf/ResultsPDFDocument';
import { generateAssessmentInsights } from '../../utils/insights';
import { PerformanceChart } from '../insights/PerformanceChart';
import { CategoryBreakdown } from '../insights/CategoryBreakdown';
import { QuestionList } from '../insights/QuestionList';
import { allQuestions } from '../../data/questions';

interface CandidateResultsProps {
  results: Result[];
}

export const CandidateResults: React.FC<CandidateResultsProps> = ({ results }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Result | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredResults = results.filter(result => 
    result.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    setSelectedCandidate(null);
    setExpandedCategory(null);
  };

  const renderSelectedCandidate = () => {
    if (!selectedCandidate) return null;

    const insights = generateAssessmentInsights(selectedCandidate);
    const getScoreColor = (score: number) => {
      if (score >= 80) return 'text-green-600';
      if (score >= 60) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div className="space-y-8">
        {/* Header with back button, name and export */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Candidates
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.userId}</h2>
                <p className="text-gray-600">{selectedCandidate.assessmentId}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Completed on {new Date(selectedCandidate.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`text-3xl font-bold ${getScoreColor(selectedCandidate.score)}`}>
                  {selectedCandidate.score}%
                </p>
                <p className="text-gray-600">Overall Score</p>
              </div>
              <PDFDownloadLink
                document={
                  <ResultsPDFDocument
                    result={selectedCandidate}
                    candidateInfo={{
                      fullName: selectedCandidate.userId,
                      position: selectedCandidate.assessmentId
                    }}
                  />
                }
                fileName={`${selectedCandidate.userId.replace(/\s+/g, '-')}-assessment-result.pdf`}
              >
                {({ loading }) => (
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    disabled={loading}
                  >
                    <FileDown className="w-4 h-4" />
                    Export Results
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Overall Assessment</h3>
          <p className="text-gray-600">{insights.overallFeedback}</p>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
          <PerformanceChart categories={insights.categories} />
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Category Breakdown</h3>
          {insights.categories.map(category => (
            <CategoryBreakdown
              key={category.name}
              category={category}
              expanded={expandedCategory === category.name}
              onToggle={() => setExpandedCategory(
                expandedCategory === category.name ? null : category.name
              )}
            />
          ))}
        </div>

        {/* Question Analysis */}
        <QuestionList
          questions={allQuestions}
          answers={selectedCandidate.answers}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {!selectedCandidate && (
        <>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResults.map((result) => (
                    <tr
                      key={`${result.userId}-${result.completedAt}`}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedCandidate(result)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{result.assessmentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.score >= 80 ? 'bg-green-100 text-green-800' :
                          result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(result);
                          }}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedCandidate && renderSelectedCandidate()}
    </div>
  );
};