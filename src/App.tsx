import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Assessment } from './components/assessment/Assessment';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { Brain } from 'lucide-react';

function AppContent() {
  const location = useLocation();
  const showAdminLogin = location.pathname === '/' && !location.search.includes('started=true');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-10 h-10 text-blue-600 animate-float" />
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  Cognitive Canvas
                </h1>
                <p className="text-sm text-gray-500">Visualize Your Potential</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="neural-bg fixed inset-0 pointer-events-none"></div>

      <main className="relative py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Assessment />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {showAdminLogin && <AdminLogin />}

      <footer className="relative bg-white bg-opacity-90 backdrop-blur-md border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Cognitive Canvas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;