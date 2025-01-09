import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      document.getElementById('adminModal')?.close();
      setPassword('');
      setError('');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="relative">
        <Button
          variant="primary"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => document.getElementById('adminModal')?.showModal()}
        >
          <Lock className="w-4 h-4" />
          Admin Access
        </Button>

        <dialog id="adminModal" className="modal backdrop:bg-gray-800/50 rounded-lg shadow-xl">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    document.getElementById('adminModal')?.close();
                    setPassword('');
                    setError('');
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};