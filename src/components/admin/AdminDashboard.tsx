import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, ArrowLeft, FileDown, LayoutGrid, ClipboardList, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../store/assessmentStore';
import { Button } from '../ui/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AdminResultsPDF } from './AdminResultsPDF';
import { CandidateResults } from './CandidateResults';
import { AnalyticsDashboard } from '../analytics/AnalyticsDashboard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
  const { results, fetchResults } = useAssessmentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'analytics'>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const loadResults = async () => {
      try {
        setIsLoading(true);
        await fetchResults();
      } catch (err) {
        setError('Failed to load results. Please try again later.');
        console.error('Error loading results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [fetchResults]);

  const getAverageScore = () => {
    if (results.length === 0) return 0;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / results.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        </div>
        
        <PDFDownloadLink
          document={<AdminResultsPDF results={results} />}
          fileName="cognitive-canvas-all-results.pdf"
        >
          {({ loading }) => (
            <Button
              variant="primary"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <FileDown className="w-4 h-4" />
              {loading ? 'Generating PDF...' : 'Export All Results'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Overview
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'candidates'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('candidates')}
        >
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Candidate Results
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'analytics'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            Analytics
          </div>
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold">{results.length}</h3>
                  <p className="text-gray-600">Total Assessments Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold">{getAverageScore()}%</h3>
                  <p className="text-gray-600">Average Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Recent Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-4 px-4">Candidate Name</th>
                    <th className="pb-4 px-4">Position</th>
                    <th className="pb-4 px-4">Score</th>
                    <th className="pb-4 px-4">Date</th>
                    <th className="pb-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 5).map((result, index) => (
                    <tr
                      key={result.id || `${result.userId}-${result.completedAt}-${index}`}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">{result.userId}</td>
                      <td className="py-4 px-4">{result.assessmentId}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          result.score >= 80 ? 'bg-green-100 text-green-800' :
                          result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.score}%
                        </span>
                      </td>
                      <td className="py-4 px-4">{new Date(result.completedAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          result.score >= 80 ? 'bg-green-100 text-green-800' :
                          result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.score >= 80 ? 'Excellent' :
                           result.score >= 60 ? 'Good' :
                           'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'candidates' && <CandidateResults results={results} />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  );
};