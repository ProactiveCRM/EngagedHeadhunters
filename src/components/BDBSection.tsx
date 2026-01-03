import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const BDBSection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Access to the Build Don\'t Beg methodology fundamentals and core training materials.',
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join our free community of recruiting professionals sharing insights and best practices.',
    },
    {
      icon: Award,
      title: 'Basic Directory Listing',
      description: 'Get listed in our public recruiter directory to increase your visibility.',
    },
    {
      icon: TrendingUp,
      title: 'Foundation for Growth',
      description: 'Build the skills and relationships needed to eventually join The Alliance.',
    },
  ];

  const learningTopics = [
    'Advanced sourcing techniques',
    'Client relationship management',
    'Industry-specific strategies',
    'Technology integration',
    'Performance optimization',
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Benefits */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Program</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start with BDB Authority Builders
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Begin your journey with our free program designed to help you master the fundamentals of authority-based recruiting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:pt-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Free to Join, Valuable from Day One
            </h3>
            <p className="text-muted-foreground mb-4">
              The BDB Authority Builders program is designed for recruiters who are ready to transform their approach but want to start with the fundamentals before committing to a partnership.
            </p>
            <p className="text-muted-foreground mb-8">
              You'll learn the core principles of the Build Don't Beg methodology, connect with other forward-thinking recruiters, and get a taste of what it means to be part of the Engaged Headhunters community.
            </p>

            {/* What You'll Learn Box */}
            <Card className="bg-gradient-to-br from-card to-muted/50 border-border mb-8">
              <CardContent className="p-6">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  What You'll Learn
                </h4>
                <ul className="space-y-3">
                  {learningTopics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand">
                  Join BDB Authority Builders (Free)
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/for-recruiters#methodology" className="flex-1">
                <Button variant="outline" className="w-full">
                  Learn More About The Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BDBSection;
