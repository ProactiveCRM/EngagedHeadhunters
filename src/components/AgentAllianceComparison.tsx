import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Building2, Handshake, ArrowRight } from 'lucide-react';

interface AgentAllianceComparisonProps {
  showCTAs?: boolean;
  className?: string;
}

const AgentAllianceComparison = ({ showCTAs = true, className = '' }: AgentAllianceComparisonProps) => {
  const comparisonData = [
    { feature: 'Your Brand', agent: 'Build under Engaged Headhunters', alliance: 'Keep your own brand' },
    { feature: 'Business Ownership', agent: 'Your business, our brand', alliance: '100% your business' },
    { feature: 'Client Relationships', agent: 'Access our existing clients', alliance: 'Your clients + our job orders' },
    { feature: 'Marketing Support', agent: 'Full EH marketing & branding', alliance: 'Your own marketing' },
  ];

  const sharedBenefits = [
    'Qualified appointments booked on your calendar',
    'Full technology platform & CRM access',
    'Training & ongoing support',
    'Access to exclusive job orders',
    'Elite recruiter network membership',
    'Market intelligence & resources',
  ];

  return (
    <div className={className}>
      {/* Comparison Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* EH Agent Card */}
        <Card className="relative bg-background border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">EH Agent</CardTitle>
            <p className="text-muted-foreground">Build under our established brand</p>
            <span className="inline-block mt-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Entry-Level Investment</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.feature}</div>
                  <div className="text-muted-foreground text-sm">{item.agent}</div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="font-semibold text-foreground mb-2">Best For:</div>
              <p className="text-muted-foreground text-sm">
                Recruiters who want to leverage an established brand and existing client relationships while building their own book of business.
              </p>
            </div>

            {showCTAs && (
              <a 
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-4"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Become an EH Agent
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            )}
          </CardContent>
        </Card>

        {/* Alliance Member Card */}
        <Card className="relative bg-background border-2 border-accent/30 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/60" />
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Alliance Member</CardTitle>
            <p className="text-muted-foreground">Keep your own brand identity</p>
            <span className="inline-block mt-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">Premium Investment</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.feature}</div>
                  <div className="text-muted-foreground text-sm">{item.alliance}</div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="font-semibold text-foreground mb-2">Best For:</div>
              <p className="text-muted-foreground text-sm">
                Established recruiters who want to maintain their brand identity while gaining access to powerful support and resources.
              </p>
            </div>

            {showCTAs && (
              <a 
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-4"
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Join the Alliance
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Shared Benefits Section */}
      <Card className="bg-muted/30 border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-foreground">
            What Both Paths Include
          </CardTitle>
          <p className="text-muted-foreground">
            Regardless of which path you choose, you get access to our core value
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentAllianceComparison;
