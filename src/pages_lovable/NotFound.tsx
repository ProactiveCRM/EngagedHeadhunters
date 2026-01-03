import { usePathname,   } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { useAnalytics, type EventCategory } from "@/hooks/useAnalytics";
import { getRouteSuggestions, getPopularRoutes, type RouteSuggestion } from "@/lib/routeSuggestions";

const errorCategory: EventCategory = 'error';

const matchTypeBadge: Record<RouteSuggestion['matchType'], { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  exact: { label: 'Close Match', variant: 'default' },
  similar: { label: 'Similar URL', variant: 'default' },
  category: { label: 'Same Section', variant: 'secondary' },
  keyword: { label: 'Related', variant: 'outline' },
};

const NotFound = () => {
  const location = usePathname();
  const { trackEvent } = useAnalytics();

  // Generate smart suggestions based on the current pathname
  const suggestions = useMemo(() => {
    const smartSuggestions = getRouteSuggestions(pathname);
    return smartSuggestions.length > 0 ? smartSuggestions : getPopularRoutes();
  }, [pathname]);

  const hasSmartSuggestions = useMemo(() => {
    return getRouteSuggestions(pathname).length > 0;
  }, [pathname]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );

    trackEvent({
      category: errorCategory,
      action: '404_page_not_found',
      label: pathname,
    });

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_not_found', {
        page_location: window.location.href,
        page_path: pathname,
        page_referrer: document.referrer,
      });
    }
  }, [pathname, trackEvent]);

  const handleSuggestionClick = (suggestion: RouteSuggestion) => {
    trackEvent({
      category: 'navigation' as EventCategory,
      action: '404_suggestion_clicked',
      label: suggestion.path,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Requested URL */}
        <div className="bg-muted/50 rounded-lg p-4 text-left">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Requested URL:</span>{' '}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs break-all">
              {pathname}
            </code>
          </p>
        </div>

        {/* Smart Suggestions */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              {hasSmartSuggestions ? "Did you mean one of these?" : "Popular pages"}
            </h3>
          </div>
          
          <div className="grid gap-2">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion.path}
                href={suggestion.path}
                onClick={() => handleSuggestionClick(suggestion)}
                className="group flex items-center justify-between p-3 rounded-lg bg-background hover:bg-primary/5 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {suggestion.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {suggestion.path}
                    </span>
                  </div>
                </div>
                {hasSmartSuggestions && (
                  <Badge variant={matchTypeBadge[suggestion.matchType].variant}>
                    {matchTypeBadge[suggestion.matchType].label}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">
              <Search className="w-4 h-4 mr-2" />
              Browse Services
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Footer Help */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help finding something?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{' '}
            or view our{' '}
            <Link href="/sitemap" className="text-primary hover:underline">
              sitemap
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
