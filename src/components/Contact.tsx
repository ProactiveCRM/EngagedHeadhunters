import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tcpaConsent, setTcpaConsent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyTitle: '',
    interest: '',
    positionDetails: '',
    timeline: ''
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
          name: `${formData.firstName} ${formData.lastName}`,
          source: 'homepage-contact',
          tcpaConsent: true
        }
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        companyTitle: '',
        interest: '',
        positionDetails: '',
        timeline: ''
      });
      setTcpaConsent(false);

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[hsl(var(--dark-navy))] to-[hsl(var(--dark-navy)/0.9)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="mb-6">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Ready to Get Started?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[hsl(var(--text-on-dark))]">
              Let's Find Your Next Executive Leader
            </h2>
            <p className="text-xl text-[hsl(var(--text-on-dark-muted))] mb-8">
              Whether you need a transformational CEO or want to join our elite network of recruiters, 
              we're here to discuss how Engaged Headhunters can drive your success.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-xl" role="img" aria-hidden="true">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--text-on-dark))]">Call Our Executive Team</div>
                  <a href="tel:+17577207173" className="text-[hsl(var(--text-on-dark-muted))] hover:text-primary transition-colors">(757) 720-7173</a>
                  <div className="text-sm text-[hsl(var(--text-on-dark-muted)/0.8)]">Mon-Fri 8AM-6PM EST</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-xl" role="img" aria-hidden="true">📍</span>
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--text-on-dark))]">Virginia Beach Office</div>
                  <div className="text-[hsl(var(--text-on-dark-muted))]">249 Central Park Ave Suite 300-90</div>
                  <div className="text-sm text-[hsl(var(--text-on-dark-muted)/0.8)]">Virginia Beach, VA 23462</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[hsl(var(--dark-navy)/0.5)] border border-[hsl(var(--text-on-dark)/0.1)] rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--text-on-dark))]">Why Choose Engaged Headhunters?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl" role="img" aria-hidden="true">⏱️</span>
                  <div>
                    <div className="text-lg font-bold text-primary">24hrs</div>
                    <div className="text-sm text-[hsl(var(--text-on-dark-muted))]">Response Time</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl" role="img" aria-hidden="true">🏆</span>
                  <div>
                    <div className="text-lg font-bold text-primary">30 days</div>
                    <div className="text-sm text-[hsl(var(--text-on-dark-muted))]">Avg. Placement</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl" role="img" aria-hidden="true">👥</span>
                  <div>
                    <div className="text-lg font-bold text-primary">98%</div>
                    <div className="text-sm text-[hsl(var(--text-on-dark-muted))]">Success Rate</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl" role="img" aria-hidden="true">📈</span>
                  <div>
                    <div className="text-lg font-bold text-primary">180 days</div>
                    <div className="text-sm text-[hsl(var(--text-on-dark-muted))]">Guarantee</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-2 text-primary-foreground">🔒 Confidential Executive Search</h4>
              <p className="text-primary-foreground/90 text-sm">
                All searches conducted with complete confidentiality and discretion. 
                Board-level approvals and C-suite transitions handled with absolute privacy.
              </p>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Start Your Executive Search</h3>
            <p className="text-muted-foreground mb-6">Complete this form and our team will contact you within 24 hours to discuss your leadership needs.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Email *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company & Title *</label>
                <input 
                  type="text" 
                  value={formData.companyTitle}
                  onChange={(e) => setFormData({...formData, companyTitle: e.target.value})}
                  placeholder="Company Name, Your Title" 
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">I'm interested in... *</label>
                <select 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select your interest</option>
                  <option value="c-suite-search">C-Suite Executive Search (CEO, COO, CFO, CTO)</option>
                  <option value="svp-placement">Senior VP/SVP Placement</option>
                  <option value="board-search">Board of Directors Search</option>
                  <option value="join-as-recruiter">Joining as an Elite Recruiter</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="retained-search">Retained Search Services</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position Details</label>
                <textarea 
                  rows={4} 
                  value={formData.positionDetails}
                  onChange={(e) => setFormData({...formData, positionDetails: e.target.value})}
                  placeholder="Please describe the role, industry, location, and timeline..." 
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timeline *</label>
                <select 
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background" 
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 30 days)</option>
                  <option value="standard">Standard (30-60 days)</option>
                  <option value="strategic">Strategic (60-90 days)</option>
                  <option value="succession">Succession Planning (3-6 months)</option>
                </select>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="tcpa-home"
                  checked={tcpaConsent}
                  onCheckedChange={(checked) => setTcpaConsent(checked as boolean)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <label htmlFor="tcpa-home" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  I agree to receive communications from Engaged Headhunters. By submitting this form, 
                  I consent to be contacted regarding my inquiry and agree to the privacy policy and confidentiality terms.
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Start Executive Search
                    <span className="ml-2" role="img" aria-hidden="true">📨</span>
                  </>
                )}
              </button>
              
              <p className="text-xs text-muted-foreground text-center">
                All information will be handled with complete discretion and confidentiality.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;