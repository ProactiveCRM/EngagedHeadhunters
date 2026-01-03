import { useCallback, useRef, useState, useEffect, ReactNode } from 'react';

interface UseAnnounceOptions {
  politeness?: 'polite' | 'assertive';
  clearDelay?: number;
}

interface UseAnnounceReturn {
  announce: (message: string) => void;
  LiveRegion: () => ReactNode;
}

export const useAnnounce = (options: UseAnnounceOptions = {}): UseAnnounceReturn => {
  const { politeness = 'polite', clearDelay = 1000 } = options;
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announce = useCallback((newMessage: string) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear message first to ensure re-announcement of same message
    setMessage('');
    
    // Set new message after a brief delay to trigger announcement
    requestAnimationFrame(() => {
      setMessage(newMessage);
    });

    // Clear message after delay to prevent stale announcements
    timeoutRef.current = setTimeout(() => {
      setMessage('');
    }, clearDelay);
  }, [clearDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const LiveRegion = (): ReactNode => {
    return (
      <div
        role="status"
        aria-live={politeness}
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
    );
  };

  return { announce, LiveRegion };
};
