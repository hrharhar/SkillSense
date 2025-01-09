import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  onSelect: (index: number) => void;
  onNext: () => void;
  optionsCount: number;
  isEnabled: boolean;
  hasAnswer: boolean;
}

export const useKeyboardNavigation = ({
  onSelect,
  onNext,
  optionsCount,
  isEnabled,
  hasAnswer
}: UseKeyboardNavigationProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;
    
    const keyNumber = parseInt(event.key);
    if (keyNumber >= 1 && keyNumber <= optionsCount) {
      onSelect(keyNumber - 1);
    }

    if (event.key === 'Enter' && hasAnswer) {
      onNext();
    }
  }, [onSelect, onNext, optionsCount, isEnabled, hasAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};