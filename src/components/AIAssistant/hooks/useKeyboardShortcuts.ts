import { useEffect } from 'react';

interface KeyboardShortcutProps {
  onSend: () => void;
  onVoiceToggle: () => void;
  onMinimizeToggle: () => void;
  isMinimized: boolean;
}

export function useKeyboardShortcuts({
  onSend,
  onVoiceToggle,
  onMinimizeToggle,
  isMinimized
}: KeyboardShortcutProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts when chat is not minimized
      if (isMinimized) return;

      // Ctrl/Cmd + Enter to send
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        onSend();
      }

      // Ctrl/Cmd + M to toggle voice input
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        onVoiceToggle();
      }

      // Esc to minimize chat
      if (e.key === 'Escape') {
        onMinimizeToggle();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSend, onVoiceToggle, onMinimizeToggle, isMinimized]);
}