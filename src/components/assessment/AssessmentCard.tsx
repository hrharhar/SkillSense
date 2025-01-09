import React from 'react';
import { Brain, MessageSquare, Lightbulb, ClipboardCheck, Box, Clock } from 'lucide-react';
import { Assessment } from '../../types';
import { Button } from '../ui/Button';

interface AssessmentCardProps {
  assessment: Assessment;
  onStart: () => void;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  onStart,
}) => {
  const getIcon = () => {
    switch (assessment.type) {
      case 'PROBLEM_SOLVING':
        return <Brain className="w-6 h-6 text-purple-500" />;
      case 'CRITICAL_THINKING':
        return <Lightbulb className="w-6 h-6 text-blue-500" />;
      case 'COMMUNICATION':
        return <MessageSquare className="w-6 h-6 text-green-500" />;
      case 'INSTRUCTIONS':
        return <ClipboardCheck className="w-6 h-6 text-yellow-500" />;
      case 'SPATIAL':
        return <Box className="w-6 h-6 text-red-500" />;
      default:
        return <Brain className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <h3 className="text-lg font-semibold text-gray-800">{assessment.title}</h3>
        </div>
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{assessment.timeLimit} mins</span>
        </div>
      </div>
      
      <p className="mt-3 text-gray-600">{assessment.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {assessment.questions.length} questions
        </div>
        <Button onClick={onStart} variant="primary">
          Start Assessment
        </Button>
      </div>
    </div>
  );
};