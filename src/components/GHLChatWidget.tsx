import { useEffect, useState, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useAnalytics from '@/hooks/useAnalytics';

// GoHighLevel Chat Widget Configuration
// Get your widget ID from: GoHighLevel Dashboard > Sites > Chat Widget > Get Code
const GHL_WIDGET_ID = 'YOUR_GHL_CHAT_WIDGET_ID'; // Replace with your actual widget ID

export type ChatContext = 'employer' | 'candidate' | 'general';
export type ChatPlacement = 'floating' | 'embedded';
export type FloatingPosition = 'bottom-right' | 'bottom-left';

interface GHLChatWidgetProps {
  widgetId?: string;
  placement?: ChatPlacement;
  position?: FloatingPosition;
  context?: ChatContext;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const GHLChatWidget = ({
  widgetId = GHL_WIDGET_ID,
  placement = 'floating',
  position = 'bottom-right',
  context = 'general',
  className,
  onOpen,
  onClose,
}: GHLChatWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { trackEvent } = useAnalytics();
  
  const trackChatOpen = (ctx: string) => {
    trackEvent({ category: 'engagement', action: 'chat_opened', label: ctx });
  };

  // Load the GHL widget script
  useEffect(() => {
    if (widgetId === 'YOUR_GHL_CHAT_WIDGET_ID') {
      console.warn('GHL Chat Widget: Please configure your widget ID');
      setIsLoading(false);
      return;
    }

    const scriptId = 'ghl-chat-widget-script';
    
    // Check if script already exists
    if (document.getElementById(scriptId)) {
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', widgetId);
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      console.error('Failed to load GHL Chat Widget');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [widgetId]);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState) {
      trackChatOpen(context);
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, context, trackChatOpen, onOpen, onClose]);

  // If widget ID is not configured, show placeholder
  if (widgetId === 'YOUR_GHL_CHAT_WIDGET_ID') {
    return placement === 'floating' ? (
      <div 
        className={cn(
          'fixed z-50',
          position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6',
          className
        )}
      >
        <button
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          onClick={() => console.log('Configure GHL Widget ID to enable chat')}
          aria-label="Chat (Configure widget ID)"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    ) : (
      <div className={cn('rounded-xl border border-border bg-card p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Configure widget to enable</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          To enable the chat assistant, configure your GoHighLevel Chat Widget ID.
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return placement === 'floating' ? (
      <div 
        className={cn(
          'fixed z-50',
          position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6',
          className
        )}
      >
        <Skeleton className="w-14 h-14 rounded-full" />
      </div>
    ) : (
      <div className={cn('rounded-xl border border-border bg-card p-6', className)}>
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return null; // Gracefully hide on error
  }

  // For floating placement, the GHL widget handles its own UI
  // We just provide a custom trigger button that matches our design
  if (placement === 'floating') {
    return null; // GHL widget handles floating UI
  }

  // For embedded placement, the widget renders inline
  // The GHL script automatically finds elements with data-ghl-chat attribute
  return (
    <div 
      className={cn('rounded-xl border border-border bg-card overflow-hidden', className)}
      data-ghl-chat="true"
      data-ghl-context={context}
    >
      {/* The GHL widget will inject its UI here */}
      <div id={`ghl-chat-container-${context}`} className="min-h-[400px]" />
    </div>
  );
};

export default GHLChatWidget;
