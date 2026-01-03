import { useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GHLCalendarEmbedProps {
  bookingUrl: string;
  source?: string;
  className?: string;
  title?: string;
  minHeight?: string;
}

const GHLCalendarEmbed = ({ 
  bookingUrl, 
  source,
  className = '',
  title = 'Schedule a Consultation',
  minHeight = '600px',
}: GHLCalendarEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Append source tracking if provided
  const embedUrl = source 
    ? `${bookingUrl}?source=${encodeURIComponent(source)}`
    : bookingUrl;

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-muted/30 p-8 text-center',
          className
        )}
        style={{ minHeight }}
        role="alert"
        aria-live="polite"
      >
        <div className="p-3 rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Unable to Load Calendar
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            The booking calendar couldn't be loaded. Please try again or contact us directly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild>
            <a href="tel:+17577207173">Call (757) 720-7173</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn('relative w-full', className)}
      role="region"
      aria-label={title}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/50 rounded-lg"
          style={{ minHeight }}
          aria-busy="true"
          aria-label="Loading calendar"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading calendar...</p>
        </div>
      )}
      <iframe
        src={embedUrl}
        width="100%"
        style={{ minHeight }}
        className={cn(
          'w-full rounded-lg border-0 transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        title={title}
        allow="camera; microphone"
        loading="lazy"
        aria-hidden={isLoading}
      />
    </div>
  );
};

export default GHLCalendarEmbed;
