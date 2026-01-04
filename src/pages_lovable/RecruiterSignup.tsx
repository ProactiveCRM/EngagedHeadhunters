import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ArrowLeft, CheckCircle, User, Briefcase, Calendar, Loader2 } from 'lucide-react';

const NICHES = [
  'Healthcare',
  'Technology',
  'Finance',
  'Manufacturing',
  'Sales',
  'Executive',
  'Legal',
  'Engineering',
  'Other'
];

// Generate username from full name
const generateUsername = (fullName: string): string => {
  return fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 30);
};

// Step 1: Account schema
const accountSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Full name is required').max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 2: Profile schema
const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-z0-9-]+$/, 'Username can only contain lowercase letters, numbers, and hyphens'),
  title: z.string().min(2, 'Professional title is required').max(100),
  niche: z.string().min(1, 'Please select a specialty'),
  location: z.string().min(2, 'Location is required').max(100),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Step 3: Booking schema
const bookingSchema = z.object({
  calendlyUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type AccountFormData = z.infer<typeof accountSchema>;
type ProfileFormData = z.infer<typeof profileSchema>;
type BookingFormData = z.infer<typeof bookingSchema>;

const RecruiterSignup = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [accountData, setAccountData] = useState<AccountFormData | null>(null);
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', fullName: '' },
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '', title: '', niche: '', location: '', bio: '' },
  });

  const bookingForm = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { calendlyUrl: '' },
  });

  // Auto-generate username when full name changes
  const handleFullNameChange = (fullName: string) => {
    const generatedUsername = generateUsername(fullName);
    profileForm.setValue('username', generatedUsername);
    setUsernameAvailable(null);
  };

  // Check username availability
  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setIsCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (error) throw error;
      setUsernameAvailable(!data);
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const onAccountSubmit = async (data: AccountFormData) => {
    setAccountData(data);
    handleFullNameChange(data.fullName);
    setStep(2);
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    if (usernameAvailable === false) {
      toast({
        title: "Username taken",
        description: "Please choose a different username.",
        variant: "destructive",
      });
      return;
    }
    setProfileData(data);
    setStep(3);
  };

  const onBookingSubmit = async (data: BookingFormData) => {
    if (!accountData || !profileData) return;

    setIsLoading(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: accountData.email,
        password: accountData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: accountData.fullName,
            username: profileData.username,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: profileData.username,
          full_name: accountData.fullName,
          title: profileData.title,
          niche: profileData.niche,
          location: profileData.location,
          bio: profileData.bio || null,
          calendly_url: data.calendlyUrl || null,
          role: 'agent',
          is_active: true,
          availability_status: 'available',
        });

      if (profileError) throw profileError;

      toast({
        title: "Welcome to Engaged Headhunters!",
        description: "Your account has been created. Check your email to verify your account.",
      });

      router.push('/agent/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Account', icon: User },
    { number: 2, title: 'Profile', icon: Briefcase },
    { number: 3, title: 'Booking', icon: Calendar },
  ];

  return (
    <>
      <Navigation />

      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${step >= s.number
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground'
                    }`}>
                    {step > s.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                    {s.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 ml-4 ${step > s.number ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Account Creation */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                    <FormField
                      control={accountForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormDescription>Must be at least 8 characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg">
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Profile Setup */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Set Up Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile URL</FormLabel>
                          <div className="flex items-center">
                            <span className="text-muted-foreground text-sm mr-2">engagedheadhunters.com/</span>
                            <FormControl>
                              <Input
                                placeholder="john-smith"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                                  field.onChange(value);
                                  checkUsernameAvailability(value);
                                }}
                              />
                            </FormControl>
                          </div>
                          <div className="flex items-center mt-1">
                            {isCheckingUsername && (
                              <span className="text-sm text-muted-foreground">Checking availability...</span>
                            )}
                            {!isCheckingUsername && usernameAvailable === true && (
                              <span className="text-sm text-green-600 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1" /> Available
                              </span>
                            )}
                            {!isCheckingUsername && usernameAvailable === false && (
                              <span className="text-sm text-destructive">Username taken</span>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior Executive Recruiter" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="niche"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Specialty</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your specialty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {NICHES.map((niche) => (
                                <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Houston, TX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Bio (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell clients about your recruiting experience and approach..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>{(field.value?.length || 0)}/500 characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        Continue
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Booking Setup */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Set Up Booking (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...bookingForm}>
                  <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                    <FormField
                      control={bookingForm.control}
                      name="calendlyUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking Calendar URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://calendly.com/your-name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Link to your Calendly, GHL, or other booking calendar. You can add this later.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">What happens next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• You'll receive a verification email</li>
                        <li>• Access your agent dashboard</li>
                        <li>• Your profile will appear on the Agents page</li>
                        <li>• Clients can book appointments directly with you</li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Complete Signup
                            <CheckCircle className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RecruiterSignup;
