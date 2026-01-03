import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = usePathname();
  const { trackPageView } = useAnalytics();

  // Track page views on route change
  useEffect(() => {
    // Small delay to ensure page title is updated
    const timeoutId = setTimeout(() => {
      trackPageView(pathname + location.search);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, location.search, trackPageView]);

  return <>{children}</>;
};

export default AnalyticsProvider;
