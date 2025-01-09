import { create } from 'zustand';

interface TimerState {
  startTime: number | null;
  timeLeft: number;
  hasEnded: boolean;
  initTimer: (duration: number) => void;
  updateTimer: (duration: number) => void;
  endTimer: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  startTime: null,
  timeLeft: 0,
  hasEnded: false,

  initTimer: (duration) => {
    set({
      startTime: Date.now(),
      timeLeft: duration * 60,
      hasEnded: false
    });
  },

  updateTimer: (duration) => {
    const { startTime, hasEnded } = get();
    if (!startTime || hasEnded) return;

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const newTimeLeft = Math.max(0, duration * 60 - elapsedSeconds);
    
    set({ timeLeft: newTimeLeft });
  },

  endTimer: () => {
    set({ hasEnded: true });
  }
}));