import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tcpaConsent, setTcpaConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tcpaConsent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms to submit the form.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('ghl-submit', {
        body: {
          ...formData,
          source: 'contact-page',
          tcpaConsent: true
        }
      });

      if (error) throw error;

      // Redirect to thank you page
      const thankYouType = formData.inquiryType === 'hiring' ? 'employer' : 'contact';
      router.push(`/thank-you/${thankYouType}`);

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Contact <span className="text-accent">Engaged Headhunters</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Connect with our executive search specialists to discuss your talent acquisition needs
                or explore career opportunities with leading organizations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground text-lg">
                    Ready to transform your organization with exceptional leadership talent?
                    Our team is standing by to discuss your executive search needs.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <a href="tel:+17577207173" className="text-muted-foreground hover:text-primary transition-colors">(757) 720-7173</a>
                      <p className="text-sm text-muted-foreground">Mon-Fri 8AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Office</h3>
                      <p className="text-muted-foreground">249 Central Park Ave Suite 300-90</p>
                      <p className="text-muted-foreground">Virginia Beach, VA 23462</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Why Choose Us?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center text-center p-3">
                      <span className="text-3xl mb-2" role="img" aria-hidden="true">⭐</span>
                      <div className="font-semibold text-foreground text-sm">Industry Veterans</div>
                      <div className="text-xs text-muted-foreground">20+ Years Experience</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3">
                      <span className="text-3xl mb-2" role="img" aria-hidden="true">✅</span>
                      <div className="font-semibold text-foreground text-sm">Proven Track Record</div>
                      <div className="text-xs text-muted-foreground">Trusted by Leaders</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3">
                      <span className="text-3xl mb-2" role="img" aria-hidden="true">🤝</span>
                      <div className="font-semibold text-foreground text-sm">Guaranteed Results</div>
                      <div className="text-xs text-muted-foreground">Per-Engagement Terms</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3">
                      <span className="text-3xl mb-2" role="img" aria-hidden="true">⚡</span>
                      <div className="font-semibold text-foreground text-sm">Fast Response</div>
                      <div className="text-xs text-muted-foreground">Same-Day Consult</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Start Your Search Today</CardTitle>
                  <CardDescription>
                    Tell us about your executive search needs and we'll connect you with the right specialist.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="executive-search">Executive Search</SelectItem>
                          <SelectItem value="contract-staffing">Contract Staffing</SelectItem>
                          <SelectItem value="temporary-staffing">Temporary Staffing</SelectItem>
                          <SelectItem value="healthcare-staffing">Healthcare Staffing</SelectItem>
                          <SelectItem value="technology-recruiting">Technology Recruiting</SelectItem>
                          <SelectItem value="candidate-inquiry">I'm a Candidate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your staffing needs, timeline, and any specific requirements..."
                        rows={5}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="tcpa"
                        checked={tcpaConsent}
                        onCheckedChange={(checked) => setTcpaConsent(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="tcpa" className="text-sm text-muted-foreground leading-tight">
                        I agree to receive communications from Engaged Headhunters. By submitting this form,
                        I consent to be contacted regarding my inquiry and agree to the privacy policy.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Visit Our Office
              </h2>
              <p className="text-xl text-muted-foreground">
                Located in Virginia Beach, VA
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.9795464284803!2d-76.1341206!3d36.842965899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ba958409177ae1%3A0xa412731274755c08!2sEngaged%20Headhunters!5e0!3m2!1sen!2sus!4v1765834219468!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Engaged Headhunters Office Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  249 Central Park Ave Suite 300-90, Virginia Beach, VA 23462
                </p>
                <a
                  href="https://maps.google.com/?q=249+Central+Park+Ave+Suite+300-90+Virginia+Beach+VA+23462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
