import { Building, Users, Target, Award, MapPin, TrendingUp, CheckCircle, Star, Globe, ArrowRight, Briefcase, DollarSign, BarChart } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Houston = () => {
  const houstonStats = [
    { icon: Building, value: "2,500+", label: "Major Employers", description: "Fortune 500 companies headquartered in Houston" },
    { icon: Users, value: "3.2M", label: "Talent Pool", description: "Professionals in Greater Houston metro area" },
    { icon: Target, value: "Deep", label: "Market Expertise", description: "Comprehensive Houston market knowledge" },
    { icon: Award, value: "Proven", label: "Track Record", description: "Established presence in Houston's executive market" }
  ];

  const industries = [
    {
      name: "Energy & Oil",
      description: "Leading energy capital with major oil & gas companies",
      companies: ["ExxonMobil", "Shell", "BP America", "ConocoPhillips"]
    },
    {
      name: "Healthcare",
      description: "Texas Medical Center - world's largest medical complex",
      companies: ["MD Anderson", "Houston Methodist", "Memorial Hermann", "Texas Children's"]
    },
    {
      name: "Technology",
      description: "Growing tech hub with major corporate relocations",
      companies: ["Microsoft", "Google", "Amazon", "Meta"]
    },
    {
      name: "Manufacturing",
      description: "Industrial manufacturing and petrochemical processing",
      companies: ["Dow Chemical", "LyondellBasell", "Phillips 66", "Chevron Phillips"]
    }
  ];

  const marketInsights = [
    {
      title: "Talent Pool Analysis",
      insights: [
        "3.2M professionals in Greater Houston metropolitan area",
        "65% of executives open to new opportunities",
        "Strong talent pipeline from University of Houston and Rice University",
        "Lower cost of living attracts top talent from coastal markets"
      ]
    },
    {
      title: "Hiring Trends",
      insights: [
        "35% increase in executive searches in energy transition roles",
        "Healthcare leadership demand up 40% post-pandemic",
        "Technology roles growing 25% annually",
        "Average time-to-fill: 32 days (below national average)"
      ]
    },
    {
      title: "Salary Benchmarks", 
      insights: [
        "CEO compensation: $850K - $2.5M+ (Energy sector leads)",
        "CFO compensation: $650K - $1.8M+ (15% above national average)",
        "VP-level roles: $300K - $800K+ depending on industry",
        "Cost of living 8% below national average drives competitive packages"
      ]
    }
  ];

  const teamHighlights = [
    {
      title: "Energy & Oil Expertise",
      description: "Deep knowledge of Houston's energy sector leadership landscape"
    },
    {
      title: "Healthcare Specialization",
      description: "Strong relationships with Texas Medical Center institutions"
    },
    {
      title: "Technology Focus",
      description: "Connections with Houston's growing tech ecosystem"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  #1 Houston Recruiting Agency
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Houston's Premier<br />
                <span className="text-primary">Recruiting Agency</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Leading recruiting agency in Houston, Texas, specializing in executive search and professional staffing 
                across Energy, Healthcare, Technology, and Manufacturing sectors. Deep local market expertise with 
                global recruiting standards.
              </p>
              
              <div className="flex items-center mb-8">
                <MapPin className="text-primary mr-2" size={20} />
                <span className="text-muted-foreground">Serving Greater Houston Metropolitan Area</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                  Start Houston Search
                  <ArrowRight className="ml-2" size={20} />
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                  View Market Report
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=600&h=400" 
                alt="Houston skyline" 
                loading="lazy"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">Expert</div>
                <div className="text-primary-foreground/80">Houston Recruiters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Houston Market Stats */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Houston Market Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              As Houston's leading recruiting agency, we have unparalleled insight into the local talent market, 
              industry dynamics, and hiring trends that drive successful executive placements.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {houstonStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-card to-muted rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-primary mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Industries */}
      <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Houston Industry Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Deep recruiting expertise across Houston's major industries, with established relationships 
              at leading companies and comprehensive understanding of local market dynamics.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-foreground mb-4">{industry.name}</h3>
                <p className="text-muted-foreground mb-6">{industry.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Major Partnerships:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {industry.companies.map((company, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Houston Talent Market Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Exclusive market intelligence and hiring data from Houston's leading recruiting agency, 
              giving you the competitive advantage in talent acquisition.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-muted to-background p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-6">{insight.title}</h3>
                <div className="space-y-4">
                  {insight.insights.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <BarChart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Market Expertise */}
      <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Houston Market Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Our recruiting team combines deep local market knowledge 
              with industry expertise to deliver exceptional talent solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {teamHighlights.map((highlight, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Hire Top Talent in Houston?
          </h2>
          <p className="text-primary-foreground/80 text-xl mb-8 max-w-4xl mx-auto">
            Connect with Houston's premier recruiting agency for a complimentary consultation. 
            Discover how our deep local market expertise and proven track record can accelerate your hiring success.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <MapPin className="text-white mb-2 mx-auto" size={24} />
              <div className="text-white font-semibold">Houston Office</div>
              <div className="text-primary-foreground/80 text-sm">Downtown Financial District</div>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <Globe className="text-white mb-2 mx-auto" size={24} />
              <div className="text-white font-semibold">Local Expertise</div>
              <div className="text-primary-foreground/80 text-sm">Deep Houston Market Knowledge</div>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <Award className="text-white mb-2 mx-auto" size={24} />
              <div className="text-white font-semibold">Proven Results</div>
              <div className="text-primary-foreground/80 text-sm">850+ Houston Placements</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors">
              Schedule Houston Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Download Market Report
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Houston;