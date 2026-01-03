import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Sparkles, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useAnalytics from '@/hooks/useAnalytics';

export type ChatContext = 'employer' | 'candidate' | 'general';

interface BookingChatAssistantProps {
  context?: ChatContext;
  className?: string;
  defaultExpanded?: boolean;
}

// Context-aware suggested prompts
const SUGGESTED_PROMPTS: Record<ChatContext, string[]> = {
  employer: [
    'What industries do you specialize in?',
    'How quickly can you fill a position?',
    'What does the hiring process look like?',
    'Do you offer any guarantees?',
  ],
  candidate: [
    'Is my job search confidential?',
    'What salaries can I expect?',
    'How do you match me with opportunities?',
    'What should I bring to the consultation?',
  ],
  general: [
    'What services do you offer?',
    'How does the process work?',
    'Is there a cost for your services?',
    'How can I get started?',
  ],
};

const CONTEXT_HEADERS: Record<ChatContext, { title: string; subtitle: string }> = {
  employer: {
    title: 'Have hiring questions?',
    subtitle: 'Our AI assistant can help with staffing inquiries',
  },
  candidate: {
    title: 'Questions about your career?',
    subtitle: 'Get instant answers about our process',
  },
  general: {
    title: 'Need help?',
    subtitle: 'Ask our AI assistant anything',
  },
};

const BookingChatAssistant = ({
  context = 'general',
  className,
  defaultExpanded = false,
}: BookingChatAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();
  
  const trackChatOpen = (ctx: string) => {
    trackEvent({ category: 'engagement', action: 'chat_opened', label: ctx });
  };
  
  const trackChatMessage = (ctx: string, isAI: boolean = false) => {
    trackEvent({ category: 'engagement', action: isAI ? 'chat_ai_response' : 'chat_user_message', label: ctx });
  };

  const header = CONTEXT_HEADERS[context];
  const prompts = SUGGESTED_PROMPTS[context];

  const handleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (newState) {
      trackChatOpen(context);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    trackChatMessage(context, false);
    
    // Try to trigger the GHL chat widget with the prompt
    // This attempts to interact with GHL's chat API if available
    const ghlChat = (window as unknown as { GHLChat?: { open?: () => void; sendMessage?: (msg: string) => void } }).GHLChat;
    if (ghlChat?.open) {
      ghlChat.open();
      if (ghlChat.sendMessage) {
        ghlChat.sendMessage(prompt);
      }
    }
  };

  const handleOpenChat = () => {
    trackChatOpen(context);
    
    // Try to open the GHL chat widget
    const ghlChat = (window as unknown as { GHLChat?: { open?: () => void } }).GHLChat;
    if (ghlChat?.open) {
      ghlChat.open();
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card overflow-hidden transition-all duration-300',
        isExpanded ? 'shadow-md' : '',
        className
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={handleExpand}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
        aria-expanded={isExpanded}
        aria-controls="chat-assistant-content"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              {header.title}
              <Sparkles className="h-3.5 w-3.5 text-accent" />
            </h3>
            <p className="text-xs text-muted-foreground">{header.subtitle}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* Expandable Content */}
      <div
        id="chat-assistant-content"
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 space-y-4">
          {/* Suggested Prompts */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Common Questions
            </p>
            <div className="space-y-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                    'bg-muted/50 hover:bg-muted text-foreground',
                    'border border-transparent hover:border-primary/20',
                    'flex items-center justify-between gap-2 group',
                    selectedPrompt === prompt && 'bg-primary/10 border-primary/30'
                  )}
                >
                  <span>{prompt}</span>
                  <Send className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Open Full Chat Button */}
          <Button
            onClick={handleOpenChat}
            variant="default"
            className="w-full"
            size="sm"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Button>

          {/* Powered by note */}
          <p className="text-[10px] text-center text-muted-foreground">
            Powered by GoHighLevel AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingChatAssistant;
