import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProfileCompletionChecklist from '@/components/agent/ProfileCompletionChecklist';
import AvatarUpload from '@/components/agent/AvatarUpload';
import CoverPhotoUpload from '@/components/agent/CoverPhotoUpload';
import { Navigate,   } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Briefcase, ExternalLink, Eye } from 'lucide-react';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  cover_photo_url: string | null;
  role: string;
  title: string | null;
  headline: string | null;
  niche: string | null;
  location: string | null;
  bio: string | null;
  specialties: string[] | null;
  rating: number;
  reviews_count: number;
  placements_count: number;
  availability_status: string;
  calendly_url: string | null;
  is_active: boolean;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  years_experience: number | null;
  company: string | null;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sectionRefs = {
    identity: useRef<HTMLDivElement>(null),
    professional: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code === 'PGRST116') {
        await createProfile();
      } else if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    try {
      const newProfile = {
        id: user?.id,
        username: user?.email?.split('@')[0] || '',
        full_name: '',
        role: 'agent',
        title: '',
        headline: '',
        niche: '',
        location: '',
        bio: '',
        specialties: [],
        availability_status: 'available',
        is_active: true,
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert([newProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          cover_photo_url: profile.cover_photo_url,
          title: profile.title,
          headline: profile.headline,
          niche: profile.niche,
          location: profile.location,
          bio: profile.bio,
          specialties: profile.specialties,
          availability_status: profile.availability_status,
          calendly_url: profile.calendly_url,
          is_active: profile.is_active,
          phone: profile.phone,
          email: profile.email,
          linkedin_url: profile.linkedin_url,
          website_url: profile.website_url,
          years_experience: profile.years_experience,
          company: profile.company,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been signed out successfully.",
    });
  };

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate href="/auth" replace />;
  }

  if (!profile) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Error loading profile</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-28 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage your professional profile</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {profile.username && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/${profile.username}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Profile
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/agent/blog">Manage Blog</Link>
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* LinkedIn-Style Profile Header Preview */}
            <Card className="overflow-hidden">
              <div className="relative">
                <CoverPhotoUpload
                  currentUrl={profile.cover_photo_url}
                  userId={user.id}
                  onUpload={(url) => setProfile({ ...profile, cover_photo_url: url })}
                />
                <div className="absolute -bottom-16 left-6">
                  <AvatarUpload
                    currentUrl={profile.avatar_url}
                    userId={user.id}
                    onUpload={(url) => setProfile({ ...profile, avatar_url: url })}
                  />
                </div>
              </div>
              <CardContent className="pt-20 pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {profile.full_name || 'Your Name'}
                    </h2>
                    <p className="text-muted-foreground">
                      {profile.headline || profile.title || 'Add a professional headline'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      {profile.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profile.location}
                        </span>
                      )}
                      {profile.company && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {profile.company}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.availability_status === 'available' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {profile.availability_status === 'available' ? 'Open to work' : 'Limited availability'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identity Section */}
            <Card ref={sectionRefs.identity}>
              <CardHeader>
                <CardTitle>Identity</CardTitle>
                <CardDescription>Your name and professional headline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      placeholder="John Smith"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username (URL slug) *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      engagedheadhunters.com/{profile.username || 'your-name'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="Executive Recruiter | Healthcare Specialist | Helping organizations find exceptional talent"
                    value={profile.headline || ''}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Write a short tagline that describes your expertise (max 120 characters)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Details Section */}
            <Card ref={sectionRefs.professional}>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
                <CardDescription>Your role, specialty, and experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="Senior Executive Recruiter"
                      value={profile.title || ''}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Engaged Headhunters"
                      value={profile.company || ''}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="niche">Specialty / Niche *</Label>
                    <Select
                      value={profile.niche || ''}
                      onValueChange={(value) => setProfile({ ...profile, niche: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your niche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Executive">Executive Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years_experience">Years of Experience</Label>
                    <Input
                      id="years_experience"
                      type="number"
                      min="0"
                      placeholder="10"
                      value={profile.years_experience || ''}
                      onChange={(e) => setProfile({ ...profile, years_experience: parseInt(e.target.value) || null })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Houston, TX"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability Status</Label>
                  <Select
                    value={profile.availability_status}
                    onValueChange={(value) => setProfile({ ...profile, availability_status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="booked">Fully Booked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card ref={sectionRefs.about}>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Tell potential clients about your expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share your recruiting philosophy, experience, and what makes you unique. Describe the types of roles and industries you specialize in, and your approach to finding the perfect match for both clients and candidates..."
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={6}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimum 50 characters for a complete profile</span>
                    <span className={profile.bio && profile.bio.length >= 50 ? 'text-green-600' : ''}>
                      {profile.bio?.length || 0} characters
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Links Section */}
            <Card ref={sectionRefs.contact}>
              <CardHeader>
                <CardTitle>Contact & Links</CardTitle>
                <CardDescription>How clients can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Public Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                    <Input
                      id="linkedin_url"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={profile.linkedin_url || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Personal Website</Label>
                    <Input
                      id="website_url"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={profile.website_url || ''}
                      onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calendly_url">Booking Calendar URL *</Label>
                  <Input
                    id="calendly_url"
                    type="url"
                    placeholder="https://calendly.com/your-link"
                    value={profile.calendly_url || ''}
                    onChange={(e) => setProfile({ ...profile, calendly_url: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to your Calendly, Cal.com, or other booking calendar
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button onClick={handleSave} disabled={saving} size="lg">
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>

          {/* Sidebar - Profile Completion */}
          <div className="space-y-6">
            <ProfileCompletionChecklist
              profile={profile}
              onItemClick={scrollToSection}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Visibility</span>
                  <span className={`font-medium ${profile.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {profile.is_active ? 'Public' : 'Hidden'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium capitalize">{profile.availability_status}</span>
                </div>
                {profile.username && (
                  <Button asChild variant="outline" className="w-full mt-4">
                    <a 
                      href={`/${profile.username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Public Profile
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
