import { Building2, Briefcase, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BookingType = 'employer' | 'candidate' | 'general';

interface BookingOption {
  type: BookingType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const bookingOptions: BookingOption[] = [
  {
    type: 'employer',
    icon: <Building2 className="h-8 w-8" />,
    title: "I'm Hiring",
    subtitle: 'Request Talent',
    description: 'Find executive and professional talent for your organization',
  },
  {
    type: 'candidate',
    icon: <Briefcase className="h-8 w-8" />,
    title: "I'm a Candidate",
    subtitle: 'Career Consultation',
    description: 'Confidential career advice and opportunity matching',
  },
  {
    type: 'general',
    icon: <MessageSquare className="h-8 w-8" />,
    title: 'General Inquiry',
    subtitle: 'Learn More',
    description: 'Questions about our services, partnerships, or process',
  },
];

interface BookingTypeSelectorProps {
  selectedType: BookingType | null;
  onSelect: (type: BookingType) => void;
  className?: string;
}

const BookingTypeSelector = ({ 
  selectedType, 
  onSelect,
  className 
}: BookingTypeSelectorProps) => {
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {bookingOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type)}
          className={cn(
            'group relative p-6 rounded-xl border-2 text-left transition-all duration-300',
            'hover:border-primary hover:shadow-brand',
            selectedType === option.type
              ? 'border-primary bg-primary/5 shadow-brand'
              : 'border-border bg-card hover:bg-muted/50'
          )}
        >
          <div
            className={cn(
              'mb-4 inline-flex p-3 rounded-lg transition-colors',
              selectedType === option.type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            )}
          >
            {option.icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {option.title}
          </h3>
          <p className="text-sm font-medium text-primary mb-2">
            {option.subtitle}
          </p>
          <p className="text-sm text-muted-foreground">
            {option.description}
          </p>
          {selectedType === option.type && (
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BookingTypeSelector;
