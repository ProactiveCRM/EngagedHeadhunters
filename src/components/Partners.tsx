import {   } from 'next/navigation';
import Link from 'next/link';

const Partners = () => {
  const benefits = [
    {
      emoji: "💰",
      title: "Keep 100% of Your Brand",
      description: "Stay fully independent—your clients, your business, your identity. We're partners, not employers."
    },
    {
      emoji: "📅",
      title: "Appointments Booked For You",
      description: "We book qualified appointments directly on YOUR calendar so you can focus on making placements."
    },
    {
      emoji: "⏱️",
      title: "Complete Autonomy",
      description: "Build your practice your way with full control over your client relationships and schedule."
    },
    {
      emoji: "⭐",
      title: "Elite Support & Resources",
      description: "Access technology, training, market intelligence, and peer networking without giving up your independence."
    }
  ];

  const requirements = [
    "5+ years executive search experience",
    "Proven track record with executive-level placements",
    "Industry specialization or niche expertise",
    "Professional references and client testimonials",
    "Commitment to excellence and ethical practices",
    "Existing client relationships preferred"
  ];

  const perks = [
    { emoji: "🏆", title: "Elite Recognition", value: "Top Partner Network" },
    { emoji: "📈", title: "Growth Support", value: "Business Development" },
    { emoji: "🛡️", title: "Risk Protection", value: "E&O Insurance" },
    { emoji: "👥", title: "Peer Network", value: "Growing Community" }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-muted to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Engaged Headhunters Alliance
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Keep Your Brand.
              <span className="text-primary"> Gain Our Support.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the Engaged Headhunters Alliance and stay 100% independent while we book 
              qualified appointments on YOUR calendar. Access exclusive job orders, technology, 
              and a network of elite recruiters—without giving up your business.
            </p>
            
            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl" role="img" aria-hidden="true">{benefit.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              href="/for-recruiters"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join the Alliance
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Alliance Membership Requirements</h3>
              <div className="space-y-4 mb-8">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-primary">Competitive Earnings</div>
                  <div className="text-muted-foreground">Performance-based compensation</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {perks.map((perk, index) => (
                    <div key={index} className="text-center bg-muted rounded-lg p-4">
                      <span className="text-2xl" role="img" aria-hidden="true">{perk.emoji}</span>
                      <div className="text-sm font-semibold text-foreground mt-1">{perk.title}</div>
                      <div className="text-xs text-muted-foreground">{perk.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
              <div className="text-lg font-bold">Elite</div>
              <div className="text-primary-foreground/80 text-sm">Partners</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
              <p className="text-secondary-foreground/80 text-lg mb-6">
                Join an exclusive network of elite recruiters who consistently place C-suite executives 
                at the world's most prestigious organizations. Your expertise deserves our platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Schedule Discovery Call
                </a>
                <Link 
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">High</div>
                <div className="text-secondary-foreground/80">Partner Retention</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Fast</div>
                <div className="text-secondary-foreground/80">Application Review</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Premium</div>
                <div className="text-secondary-foreground/80">Assignments</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-secondary-foreground/80">Support Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;