import { Check, Circle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Profile {
  avatar_url?: string | null;
  cover_photo_url?: string | null;
  full_name?: string | null;
  headline?: string | null;
  title?: string | null;
  bio?: string | null;
  niche?: string | null;
  location?: string | null;
  calendly_url?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface ChecklistItem {
  id: string;
  label: string;
  weight: number;
  isComplete: boolean;
  section: string;
}

interface ProfileCompletionChecklistProps {
  profile: Profile;
  onItemClick?: (section: string) => void;
}

const ProfileCompletionChecklist = ({ profile, onItemClick }: ProfileCompletionChecklistProps) => {
  const checklistItems: ChecklistItem[] = [
    {
      id: 'avatar',
      label: 'Profile Photo',
      weight: 15,
      isComplete: !!profile.avatar_url,
      section: 'identity'
    },
    {
      id: 'cover',
      label: 'Cover Photo',
      weight: 10,
      isComplete: !!profile.cover_photo_url,
      section: 'identity'
    },
    {
      id: 'name',
      label: 'Full Name',
      weight: 10,
      isComplete: !!profile.full_name && profile.full_name.length > 0,
      section: 'identity'
    },
    {
      id: 'headline',
      label: 'Professional Headline',
      weight: 10,
      isComplete: !!profile.headline && profile.headline.length > 0,
      section: 'identity'
    },
    {
      id: 'title',
      label: 'Job Title',
      weight: 10,
      isComplete: !!profile.title && profile.title.length > 0,
      section: 'professional'
    },
    {
      id: 'bio',
      label: 'About / Bio',
      weight: 15,
      isComplete: !!profile.bio && profile.bio.length >= 50,
      section: 'about'
    },
    {
      id: 'niche',
      label: 'Specialty / Niche',
      weight: 10,
      isComplete: !!profile.niche,
      section: 'professional'
    },
    {
      id: 'location',
      label: 'Location',
      weight: 5,
      isComplete: !!profile.location && profile.location.length > 0,
      section: 'professional'
    },
    {
      id: 'calendar',
      label: 'Booking Calendar URL',
      weight: 10,
      isComplete: !!profile.calendly_url,
      section: 'contact'
    },
    {
      id: 'contact',
      label: 'Contact Info',
      weight: 5,
      isComplete: !!profile.phone || !!profile.email,
      section: 'contact'
    }
  ];

  const completedWeight = checklistItems
    .filter(item => item.isComplete)
    .reduce((sum, item) => sum + item.weight, 0);

  const getProfileStrength = (percentage: number) => {
    if (percentage === 100) return { label: 'All-Star', color: 'text-green-500' };
    if (percentage >= 75) return { label: 'Expert', color: 'text-primary' };
    if (percentage >= 50) return { label: 'Intermediate', color: 'text-yellow-500' };
    return { label: 'Beginner', color: 'text-muted-foreground' };
  };

  const strength = getProfileStrength(completedWeight);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Profile Completion
          <span className={`text-sm font-medium ${strength.color}`}>
            {strength.label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Circle/Bar */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted/30"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${completedWeight * 1.76} 176`}
                className="text-primary transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {completedWeight}%
            </span>
          </div>
          <div className="flex-1">
            <Progress value={completedWeight} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedWeight === 100 
                ? "Your profile is complete! 🎉" 
                : `Complete your profile to attract more clients`}
            </p>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-1">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                item.isComplete 
                  ? 'text-muted-foreground' 
                  : 'hover:bg-muted/50 text-foreground'
              }`}
            >
              {item.isComplete ? (
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`flex-1 text-sm ${item.isComplete ? 'line-through' : ''}`}>
                {item.label}
              </span>
              {!item.isComplete && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionChecklist;
