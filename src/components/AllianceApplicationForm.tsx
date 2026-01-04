import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { allianceApplicationSchema, type AllianceApplicationData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Briefcase,
  MessageSquare,
  Loader2,
  Sparkles
} from 'lucide-react';

const SPECIALTY_OPTIONS = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance & Accounting' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'sales', label: 'Sales' },
  { value: 'executive', label: 'Executive Search' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'other', label: 'Other' },
];

const PLACEMENT_VOLUME_OPTIONS = [
  { value: '1-5', label: '1-5 placements' },
  { value: '6-10', label: '6-10 placements' },
  { value: '11-20', label: '11-20 placements' },
  { value: '21-50', label: '21-50 placements' },
  { value: '50+', label: '50+ placements' },
];

const HOW_HEARD_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral from colleague' },
  { value: 'google', label: 'Google Search' },
  { value: 'industry-event', label: 'Industry Event' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'other', label: 'Other' },
];

const STEPS = [
  { id: 1, title: 'Contact Info', icon: User },
  { id: 2, title: 'Experience', icon: Briefcase },
  { id: 3, title: 'Tell Us More', icon: MessageSquare },
];

interface AllianceApplicationFormProps {
  onSuccess?: () => void;
}

const AllianceApplicationForm = ({ onSuccess }: AllianceApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    reset,
  } = useForm<AllianceApplicationData>({
    resolver: zodResolver(allianceApplicationSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      company_name: '',
      location: '',
      years_experience: undefined,
      specialty_niche: '',
      current_placements_year: '',
      why_join: '',
      how_heard: '',
      linkedin_url: '',
      website_url: '',
      honeypot: '',
      tcpa_consent: false,
    },
  });

  const watchedValues = watch();

  // Focus management when step changes
  useEffect(() => {
    const currentStepRef = stepRefs.current[currentStep - 1];
    if (currentStepRef) {
      const firstInput = currentStepRef.querySelector('input, textarea, select');
      if (firstInput instanceof HTMLElement) {
        firstInput.focus();
      }
    }
  }, [currentStep]);

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate: (keyof AllianceApplicationData)[][] = [
      ['full_name', 'email', 'phone', 'company_name', 'location'],
      ['years_experience', 'specialty_niche', 'current_placements_year'],
      ['why_join', 'tcpa_consent'],
    ];

    const fields = fieldsToValidate[step - 1];
    const result = await trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: AllianceApplicationData) => {
    setIsSubmitting(true);

    try {
      // Submit to GHL via edge function
      const { data: ghlResult, error: ghlError } = await supabase.functions.invoke('ghl-submit', {
        body: {
          name: data.full_name,
          email: data.email,
          phone: data.phone,
          company: data.company_name,
          message: data.why_join,
          inquiryType: 'alliance-application',
          source: 'alliance-application-form',
          tcpaConsent: data.tcpa_consent,
          positionDetails: `Specialty: ${data.specialty_niche} | Experience: ${data.years_experience} years | Placements/Year: ${data.current_placements_year}`,
          timeline: data.how_heard ? `How heard: ${data.how_heard}` : undefined,
        },
      });

      if (ghlError) {
        console.error('GHL submission error:', ghlError);
      }

      // Also store directly in alliance_applications table
      const { error: dbError } = await supabase
        .from('alliance_applications')
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          company_name: data.company_name,
          location: data.location,
          years_experience: data.years_experience,
          specialty_niche: data.specialty_niche,
          current_placements_year: data.current_placements_year,
          why_join: data.why_join,
          how_heard: data.how_heard || null,
          linkedin_url: data.linkedin_url || null,
          website_url: data.website_url || null,
          honeypot: data.honeypot || null,
          tcpa_consent: data.tcpa_consent,
          tcpa_timestamp: new Date().toISOString(),
          status: 'new',
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to submit application');
      }

      setIsSubmitted(true);
      reset();
      onSuccess?.();

      toast({
        title: 'Application Submitted!',
        description: 'We\'ll review your application and be in touch within 24 hours.',
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50 duration-500">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Application Submitted!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Thank you for applying to the Engaged Headhunters Alliance. We review all applications personally and will be in touch within 24 hours.
        </p>
        <div className="bg-muted/30 rounded-xl p-6 max-w-md mx-auto">
          <h4 className="font-semibold text-foreground mb-4">What's Next?</h4>
          <ol className="text-left space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">1</span>
              <span>We'll review your application within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">2</span>
              <span>If qualified, we'll schedule a discovery call</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">3</span>
              <span>Discuss partnership terms and onboard you</span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <nav aria-label="Application progress" className="mb-8">
        <ol className="flex items-center justify-center gap-2 md:gap-4">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const StepIcon = step.icon;

            return (
              <li key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : isCompleted
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{step.title}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 ${isCompleted ? 'bg-primary' : 'bg-border'
                      }`}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Honeypot field - hidden from users */}
        <div className="hidden" aria-hidden="true">
          <Input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        {/* Step 1: Contact Info */}
        <div
          ref={(el) => { stepRefs.current[0] = el; }}
          className={currentStep === 1 ? 'space-y-4' : 'hidden'}
          role="group"
          aria-labelledby="step-1-heading"
        >
          <h3 id="step-1-heading" className="sr-only">Contact Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={!!errors.full_name}
                aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                {...register('full_name')}
              />
              {errors.full_name && (
                <p id="full_name-error" className="text-sm text-destructive">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                {...register('phone')}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Company/Brand Name *</Label>
              <Input
                id="company_name"
                type="text"
                placeholder="Your Recruiting Firm"
                autoComplete="organization"
                aria-invalid={!!errors.company_name}
                aria-describedby={errors.company_name ? 'company_name-error' : undefined}
                {...register('company_name')}
              />
              {errors.company_name && (
                <p id="company_name-error" className="text-sm text-destructive">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (City, State) *</Label>
            <Input
              id="location"
              type="text"
              placeholder="Houston, TX"
              autoComplete="address-level2"
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? 'location-error' : undefined}
              {...register('location')}
            />
            {errors.location && (
              <p id="location-error" className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Step 2: Experience */}
        <div
          ref={(el) => { stepRefs.current[1] = el; }}
          className={currentStep === 2 ? 'space-y-4' : 'hidden'}
          role="group"
          aria-labelledby="step-2-heading"
        >
          <h3 id="step-2-heading" className="sr-only">Experience Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Recruiting Experience *</Label>
              <Input
                id="years_experience"
                type="number"
                min={1}
                max={50}
                placeholder="5"
                aria-invalid={!!errors.years_experience}
                aria-describedby={errors.years_experience ? 'years_experience-error' : undefined}
                {...register('years_experience', { valueAsNumber: true })}
              />
              {errors.years_experience && (
                <p id="years_experience-error" className="text-sm text-destructive">
                  {errors.years_experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty_niche">Primary Specialty *</Label>
              <Select
                value={watchedValues.specialty_niche}
                onValueChange={(value) => setValue('specialty_niche', value, { shouldValidate: true })}
              >
                <SelectTrigger
                  id="specialty_niche"
                  aria-invalid={!!errors.specialty_niche}
                  aria-describedby={errors.specialty_niche ? 'specialty_niche-error' : undefined}
                >
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialty_niche && (
                <p id="specialty_niche-error" className="text-sm text-destructive">
                  {errors.specialty_niche.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_placements_year">Approximate Placements Per Year *</Label>
            <Select
              value={watchedValues.current_placements_year}
              onValueChange={(value) => setValue('current_placements_year', value, { shouldValidate: true })}
            >
              <SelectTrigger
                id="current_placements_year"
                aria-invalid={!!errors.current_placements_year}
                aria-describedby={errors.current_placements_year ? 'current_placements_year-error' : undefined}
              >
                <SelectValue placeholder="Select placement volume" />
              </SelectTrigger>
              <SelectContent>
                {PLACEMENT_VOLUME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.current_placements_year && (
              <p id="current_placements_year-error" className="text-sm text-destructive">
                {errors.current_placements_year.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn Profile URL (Optional)</Label>
              <Input
                id="linkedin_url"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                aria-invalid={!!errors.linkedin_url}
                aria-describedby={errors.linkedin_url ? 'linkedin_url-error' : undefined}
                {...register('linkedin_url')}
              />
              {errors.linkedin_url && (
                <p id="linkedin_url-error" className="text-sm text-destructive">
                  {errors.linkedin_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_url">Business Website (Optional)</Label>
              <Input
                id="website_url"
                type="url"
                placeholder="https://yourwebsite.com"
                aria-invalid={!!errors.website_url}
                aria-describedby={errors.website_url ? 'website_url-error' : undefined}
                {...register('website_url')}
              />
              {errors.website_url && (
                <p id="website_url-error" className="text-sm text-destructive">
                  {errors.website_url.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Tell Us More */}
        <div
          ref={(el) => { stepRefs.current[2] = el; }}
          className={currentStep === 3 ? 'space-y-4' : 'hidden'}
          role="group"
          aria-labelledby="step-3-heading"
        >
          <h3 id="step-3-heading" className="sr-only">Tell Us More</h3>

          <div className="space-y-2">
            <Label htmlFor="why_join">Why do you want to join the Alliance? *</Label>
            <Textarea
              id="why_join"
              rows={5}
              placeholder="Tell us about your goals, what challenges you're facing, and how you think the Alliance can help you grow your business..."
              aria-invalid={!!errors.why_join}
              aria-describedby={errors.why_join ? 'why_join-error' : 'why_join-hint'}
              {...register('why_join')}
            />
            <p id="why_join-hint" className="text-sm text-muted-foreground">
              Minimum 50 characters
            </p>
            {errors.why_join && (
              <p id="why_join-error" className="text-sm text-destructive">
                {errors.why_join.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="how_heard">How did you hear about us? (Optional)</Label>
            <Select
              value={watchedValues.how_heard}
              onValueChange={(value) => setValue('how_heard', value)}
            >
              <SelectTrigger id="how_heard">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-start gap-3">
              <Checkbox
                id="tcpa_consent"
                checked={watchedValues.tcpa_consent}
                onCheckedChange={(checked) => setValue('tcpa_consent', checked === true, { shouldValidate: true })}
                aria-describedby={errors.tcpa_consent ? 'tcpa_consent-error' : 'tcpa_consent-description'}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="tcpa_consent"
                  className="text-sm font-normal leading-relaxed cursor-pointer"
                >
                  I consent to receive calls, texts, and emails from Engaged Headhunters regarding my application and partnership opportunities. I understand I can opt out at any time. *
                </Label>
                <p id="tcpa_consent-description" className="text-xs text-muted-foreground">
                  By checking this box, you agree to our{' '}
                  <a href="/privacy-policy" className="underline hover:text-primary">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms-of-service" className="underline hover:text-primary">
                    Terms of Service
                  </a>
                  .
                </p>
                {errors.tcpa_consent && (
                  <p id="tcpa_consent-error" className="text-sm text-destructive">
                    {errors.tcpa_consent.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" variant="cta" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AllianceApplicationForm;
