import { 
  Building2, 
  Users, 
  FileCheck, 
  DollarSign, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PartnerServices = () => {
  const services = [
    {
      icon: Building2,
      title: 'Back Office Solutions',
      provider: 'Elite Business Partners',
      badge: 'Recommended Partner',
      badgeVariant: 'default' as const,
      description: 'Comprehensive employer of record (EOR), payroll, HR administration, and compliance services designed specifically for recruiting professionals.',
      features: [
        'Employer of Record (EOR)',
        'Payroll Processing',
        'HR Administration',
        'Compliance Management'
      ],
    },
    {
      icon: Users,
      title: 'Talent Acquisition Platform',
      provider: 'RecruitmentTech Pro',
      badge: 'Alliance Exclusive',
      badgeVariant: 'secondary' as const,
      description: 'AI-powered sourcing, CRM, and analytics tools that integrate seamlessly with your recruiting workflow.',
      features: [
        'AI Candidate Sourcing',
        'CRM & Pipeline Management',
        'Analytics Dashboard',
        'Mobile Application'
      ],
    },
    {
      icon: FileCheck,
      title: 'Legal & Compliance',
      provider: 'RecruitLegal Partners',
      badge: 'Trusted Partner',
      badgeVariant: 'outline' as const,
      description: 'Specialized legal services for recruiting firms including contract review, compliance audits, and risk management.',
      features: [
        'Contract Templates & Review',
        'Compliance Audits',
        'Legal Consultation',
        'Risk Management'
      ],
    },
    {
      icon: DollarSign,
      title: 'Financial Services',
      provider: 'FinanceForRecruiters',
      badge: 'Preferred Partner',
      badgeVariant: 'outline' as const,
      description: 'Banking, accounting, tax planning, and invoice factoring services tailored for recruiting agencies.',
      features: [
        'Business Banking',
        'Accounting Services',
        'Tax Planning',
        'Invoice Factoring'
      ],
    },
  ];

  const memberBenefits = [
    {
      icon: Star,
      title: 'Exclusive Discounts',
      description: 'Up to 30% off partner services'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 dedicated assistance'
    },
    {
      icon: CheckCircle2,
      title: 'Vetted Partners',
      description: 'All partners carefully screened'
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Services & Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exclusive access to vetted service providers that help you run a more efficient recruiting business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <Badge variant={service.badgeVariant} className="text-xs">
                    {service.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{service.title}</h3>
                <p className="text-sm text-primary mb-3">{service.provider}</p>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Member Benefits Callout */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Alliance Member Benefits</h3>
                  <p className="text-primary-foreground/80">Exclusive perks for all partners</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-end gap-8">
                {memberBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-center lg:text-left">
                    <benefit.icon className="w-5 h-5 text-white/80" />
                    <div>
                      <div className="font-semibold">{benefit.title}</div>
                      <div className="text-sm text-primary-foreground/70">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Affiliate Disclaimer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Some partner links may be affiliate links. We only recommend services we trust and use ourselves.
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View All Partner Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerServices;
