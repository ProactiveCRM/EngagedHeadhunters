import { useCallback, useRef } from 'react';

// Cache for already prefetched routes
const prefetchedRoutes = new Set<string>();

// Map of routes to their chunk files
const routeChunks: Record<string, () => Promise<unknown>> = {};

/**
 * Hook for prefetching routes on hover to improve navigation speed
 * 
 * Usage:
 * const { onMouseEnter, onFocus } = usePrefetch('/about');
 * <Link href="/about" onMouseEnter={onMouseEnter} onFocus={onFocus}>About</Link>
 */
export const usePrefetch = (route: string) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prefetch = useCallback(() => {
    // Don't prefetch if already done
    if (prefetchedRoutes.has(route)) return;

    // Find the route chunk
    const chunkLoader = routeChunks[route];
    if (chunkLoader) {
      // Start loading the chunk
      chunkLoader()
        .then(() => {
          prefetchedRoutes.add(route);
        })
        .catch(() => {
          // Silently fail - prefetching is an optimization
        });
    }
  }, [route]);

  const onMouseEnter = useCallback(() => {
    // Add a small delay to avoid prefetching on accidental hovers
    timeoutRef.current = setTimeout(prefetch, 100);
  }, [prefetch]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const onFocus = useCallback(() => {
    prefetch();
  }, [prefetch]);

  return {
    onMouseEnter,
    onMouseLeave,
    onFocus,
  };
};

/**
 * Prefetch multiple routes at once (e.g., on initial page load)
 */
export const prefetchRoutes = (routes: string[]) => {
  routes.forEach((route) => {
    if (!prefetchedRoutes.has(route)) {
      const chunkLoader = routeChunks[route];
      if (chunkLoader) {
        // Use requestIdleCallback if available for better performance
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            chunkLoader().then(() => prefetchedRoutes.add(route));
          });
        } else {
          setTimeout(() => {
            chunkLoader().then(() => prefetchedRoutes.add(route));
          }, 200);
        }
      }
    }
  });
};

export default usePrefetch;
