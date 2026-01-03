import { Brain, MapPin, Award, Users, Target, TrendingUp, Building2, UserCheck, Briefcase, CheckCircle, Star, Globe } from 'lucide-react';

const AudienceValue = () => {
  const clientValue = [
    "AI-powered candidate matching system",
    "Access to passive executive talent",
    "30-day average time-to-fill",
    "180-day placement guarantee",
    "Deep industry expertise across all sectors"
  ];

  const candidateValue = [
    "Exclusive C-suite and VP opportunities",
    "Career advancement consulting",
    "Salary negotiation expertise",
    "Confidential search process",
    "Long-term career partnership"
  ];

  const agentValue = [
    "Proven business model & training",
    "Technology platform & tools",
    "Marketing & lead generation support",
    "Ongoing mentorship program",
    "Unlimited earning potential"
  ];

  const geographicPresence = [
    { region: "Major Metropolitan Areas", count: "50+" },
    { region: "Fortune 500 Headquarters", count: "200+" },
    { region: "Technology Hubs", count: "25+" },
    { region: "Financial Centers", count: "15+" },
    { region: "Healthcare Markets", count: "75+" },
    { region: "Manufacturing Regions", count: "100+" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Technology Advantage */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-full mb-6">
            <Brain className="mr-2" size={20} />
            <span className="font-semibold">AI-Powered Technology Advantage</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Next-Generation Executive Search Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            Our proprietary AI-powered matching system revolutionizes how we identify, evaluate, and connect 
            exceptional talent with transformational opportunities. Experience recruiting efficiency like never before.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">10X</div>
              <div className="text-sm text-muted-foreground">Faster Candidate Identification</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">97%</div>
              <div className="text-sm text-muted-foreground">Accuracy in Skills Matching</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">50%</div>
              <div className="text-sm text-muted-foreground">Reduction in Time-to-Hire</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Geographic Presence */}
        <div className="bg-card rounded-2xl p-12 mb-16 shadow-xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-secondary text-secondary-foreground px-6 py-3 rounded-full mb-6">
              <MapPin className="mr-2" size={20} />
              <span className="font-semibold">Nationwide Market Coverage</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Serving 500+ Markets Nationwide
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Silicon Valley startups to Wall Street institutions, our headhunters and recruiting agents 
              maintain deep relationships in every major business center across America.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {geographicPresence.map((market, index) => (
              <div key={index} className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{market.count}</div>
                <div className="text-xs text-muted-foreground">{market.region}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Propositions by Audience */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* For Companies */}
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Building2 className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">For Companies</h3>
                <p className="text-primary font-semibold">Executive Search Excellence</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">CLIENT SUCCESS METRICS</div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">95%</span>
                <span className="text-sm text-muted-foreground">Placement Success Rate</span>
              </div>
            </div>
            <ul className="space-y-3">
              {clientValue.map((value, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Job Seekers */}
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-secondary/20 p-3 rounded-full mr-4">
                <UserCheck className="text-secondary-foreground" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">For Job Seekers</h3>
                <p className="text-secondary-foreground font-semibold">Career Advancement</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">CANDIDATE SUCCESS METRICS</div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-secondary-foreground">30%</span>
                <span className="text-sm text-muted-foreground">Average Salary Increase</span>
              </div>
            </div>
            <ul className="space-y-3">
              {candidateValue.map((value, index) => (
                <li key={index} className="flex items-start">
                  <Star className="w-5 h-5 text-secondary-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Agents */}
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-accent/20 p-3 rounded-full mr-4">
                <Briefcase className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">For Agents</h3>
                <p className="text-accent font-semibold">Business Opportunity</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">AGENT SUCCESS METRICS</div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-accent">$185K</span>
                <span className="text-sm text-muted-foreground">Average Agent Earnings</span>
              </div>
            </div>
            <ul className="space-y-3">
              {agentValue.map((value, index) => (
                <li key={index} className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceValue;