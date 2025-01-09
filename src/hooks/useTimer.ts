import { useEffect, useCallback, useRef } from 'react';
import { useTimerStore } from '../store/timerStore';

interface UseTimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
}

export const useTimer = ({ duration, onTimeUp }: UseTimerProps) => {
  const { startTime, timeLeft, hasEnded, initTimer, updateTimer, endTimer } = useTimerStore();
  const timerRef = useRef<NodeJS.Timeout>();

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    // Initialize timer only if it hasn't started yet
    if (!startTime && !hasEnded) {
      initTimer(duration);
    }

    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      updateTimer(duration);

      // Check if time is up
      if (timeLeft <= 0 && !hasEnded) {
        endTimer();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        onTimeUp();
      }
    }, 100); // Update frequently to ensure accuracy

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [duration, onTimeUp, startTime, hasEnded, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    hasEnded
  };
};