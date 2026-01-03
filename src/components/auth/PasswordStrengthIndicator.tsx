import { Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const requirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const metRequirements = requirements.filter(req => req.test(password));
  const score = metRequirements.length;
  const percentage = (score / requirements.length) * 100;

  const getStrengthLabel = () => {
    if (score <= 1) return 'Very Weak';
    if (score === 2) return 'Weak';
    if (score === 3) return 'Fair';
    if (score === 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (score <= 1) return 'bg-destructive';
    if (score === 2) return 'bg-orange-500';
    if (score === 3) return 'bg-yellow-500';
    if (score === 4) return 'bg-primary';
    return 'bg-green-500';
  };

  const getTextColor = () => {
    if (score <= 1) return 'text-destructive';
    if (score === 2) return 'text-orange-500';
    if (score === 3) return 'text-yellow-600';
    if (score === 4) return 'text-primary';
    return 'text-green-500';
  };

  return (
    <div className="space-y-3 mt-2">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Password strength</span>
          <span className={`font-medium ${getTextColor()}`}>{getStrengthLabel()}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1.5 text-sm">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <li 
              key={index} 
              className={`flex items-center gap-2 ${isMet ? 'text-green-600' : 'text-muted-foreground'}`}
            >
              {isMet ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/50" />
              )}
              {req.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
