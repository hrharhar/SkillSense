import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { UserCircle, Briefcase } from 'lucide-react';

interface CandidateInfoProps {
  onSubmit: (info: { fullName: string; position: string }) => void;
}

export const CandidateInfo: React.FC<CandidateInfoProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fullName, position });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to the Assessment</h2>
          <p className="mt-2 text-gray-600">Please provide your information to begin</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position Applying For
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  placeholder="Enter the position"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg font-medium transition-transform hover:scale-[1.02]"
              disabled={!fullName || !position}
            >
              Start Assessment
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            The assessment consists of 30 questions across various skills.
            Take your time and answer carefully.
          </p>
        </form>
      </div>
    </div>
  );
}