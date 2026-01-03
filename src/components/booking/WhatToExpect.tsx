import { ChevronDown, Clock, Users, FileText, CheckCircle } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ExpectationVariant = 'employer' | 'candidate' | 'general';

interface ExpectationItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const expectations: Record<ExpectationVariant, ExpectationItem[]> = {
  employer: [
    {
      icon: <Clock className="h-5 w-5" />,
      title: '30-Minute Strategy Call',
      description: 'A focused discussion about your hiring needs and timeline',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Meet Your Specialist',
      description: 'Connect with a recruiter specializing in your industry',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Role Analysis',
      description: 'We review your requirements and market positioning',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Next Steps & Timeline',
      description: 'Leave with a clear action plan and expected timeframe',
    },
  ],
  candidate: [
    {
      icon: <Clock className="h-5 w-5" />,
      title: '20-Minute Career Chat',
      description: 'A confidential conversation about your goals',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Industry Insights',
      description: 'Learn about opportunities in your target market',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Resume Review',
      description: 'Quick feedback on positioning and presentation',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Opportunity Matching',
      description: 'We identify roles aligned with your experience',
    },
  ],
  general: [
    {
      icon: <Clock className="h-5 w-5" />,
      title: '15-Minute Discovery Call',
      description: 'A quick call to understand your questions',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Service Overview',
      description: 'Learn how we can help with your specific needs',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Tailored Recommendations',
      description: 'We point you to the right resources or next steps',
    },
  ],
};

interface WhatToExpectProps {
  variant: ExpectationVariant;
  defaultOpen?: boolean;
  className?: string;
}

const WhatToExpect = ({ 
  variant, 
  defaultOpen = false,
  className 
}: WhatToExpectProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const items = expectations[variant];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('rounded-lg border border-border bg-card', className)}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors rounded-lg">
        <span className="font-semibold text-foreground">
          What to Expect on Your Call
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-muted/30"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WhatToExpect;
