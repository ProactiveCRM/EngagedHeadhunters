import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useAnalytics();

  // Track page views on route change
  useEffect(() => {
    // Small delay to ensure page title is updated
    const timeoutId = setTimeout(() => {
      const search = searchParams.toString();
      const url = search ? `${pathname}?${search}` : pathname;
      trackPageView(url);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams, trackPageView]);

  return <>{children}</>;
};

export default AnalyticsProvider;
