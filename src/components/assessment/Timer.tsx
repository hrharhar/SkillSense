import React, { useEffect, useRef } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const { formattedTime, timeLeft, hasEnded } = useTimer({ 
    duration, 
    onTimeUp 
  });
  
  const isWarning = timeLeft < 300; // Less than 5 minutes
  const isCritical = timeLeft < 60; // Less than 1 minute
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element once
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isWarning && !hasEnded && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore playback errors (e.g., if user hasn't interacted with page yet)
      });
    }
  }, [isWarning, hasEnded]);

  return (
    <div 
      className={`fixed top-20 right-4 bg-white rounded-lg shadow-md px-4 py-3 flex items-center gap-3 transition-all ${
        isCritical ? 'animate-pulse bg-red-50 border border-red-200' : 
        isWarning ? 'bg-yellow-50 border border-yellow-200' : 
        'border border-gray-200'
      }`}
      role="timer"
      aria-live="polite"
    >
      {isCritical ? (
        <AlertTriangle className="w-5 h-5 text-red-500" />
      ) : (
        <Clock className={`w-5 h-5 ${isWarning ? 'text-yellow-500' : 'text-gray-500'}`} />
      )}
      <div>
        <span 
          className={`font-mono text-lg font-medium ${
            isCritical ? 'text-red-600' : 
            isWarning ? 'text-yellow-600' : 
            'text-gray-700'
          }`}
        >
          {formattedTime}
        </span>
        {(isWarning || isCritical) && !hasEnded && (
          <p className={`text-xs ${isCritical ? 'text-red-500' : 'text-yellow-500'}`}>
            {isCritical ? 'Time almost up!' : 'Running out of time'}
          </p>
        )}
      </div>
    </div>
  );
};