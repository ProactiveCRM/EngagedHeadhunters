import { 
  BookOpen, 
  Video, 
  Download, 
  Users, 
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {   } from 'next/navigation';
import Link from 'next/link';

const ResourcesHub = () => {
  const resources = [
    {
      icon: BookOpen,
      title: 'Industry Insights & Reports',
      badge: 'Updated Weekly',
      description: 'Market trends, salary data, and hiring analytics to keep you ahead of the competition.',
      items: [
        '2025 Recruiting Trends Report',
        'Salary Benchmarking Data',
        'Industry-Specific Insights'
      ],
      action: 'Browse Reports'
    },
    {
      icon: Video,
      title: 'Training & Webinars',
      badge: 'Live Sessions',
      description: 'Expert-led training on advanced sourcing, client development, and closing techniques.',
      items: [
        'Live Weekly Webinars',
        'On-Demand Training Library',
        'Certification Programs'
      ],
      action: 'View Schedule'
    },
    {
      icon: Download,
      title: 'Tools & Templates',
      badge: 'Member Exclusive',
      description: 'Ready-to-use resources including email templates, contracts, and workflow automation.',
      items: [
        'Email Sequence Templates',
        'Contract Templates',
        'SOPs & Checklists'
      ],
      action: 'Download Now'
    },
    {
      icon: Users,
      title: 'Community Forum',
      badge: 'Active Community',
      description: 'Connect with fellow recruiters, share wins, ask questions, and learn from peers.',
      items: [
        'Private Discussion Groups',
        'Mentorship Matching',
        'Success Stories'
      ],
      action: 'Join Community'
    },
  ];

  const featuredContent = [
    {
      icon: FileText,
      title: 'The Future of Executive Search: AI and Human Expertise',
      description: 'How leading headhunters are combining artificial intelligence with relationship-based recruiting for unprecedented results.',
      readTime: '8 min read',
      type: 'article'
    },
    {
      icon: TrendingUp,
      title: 'Success Story: How Sarah Built a 7-Figure Executive Search Practice',
      description: 'From solo recruiter to multi-million dollar firm in just 3 years using the Build Don\'t Beg methodology.',
      readTime: '12 min read',
      type: 'case-study'
    },
  ];

  const upcomingEvents = [
    {
      date: { month: 'Dec', day: '15' },
      title: 'AI-Powered Sourcing Masterclass',
      type: 'Webinar',
      time: '2:00 PM EST'
    },
    {
      date: { month: 'Dec', day: '18' },
      title: 'Executive Search Best Practices',
      type: 'Workshop',
      time: '11:00 AM EST'
    },
    {
      date: { month: 'Dec', day: '22' },
      title: '2025 Recruitment Trends Preview',
      type: 'Panel Discussion',
      time: '1:00 PM EST'
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Knowledge Hub & Resources
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive resources to help you grow your recruiting business and stay ahead of the competition.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant group h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {resource.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{resource.description}</p>

                <ul className="space-y-2 mb-6">
                  {resource.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full mt-auto">
                  {resource.action}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Content + Events */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Content */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Featured Content</h3>
            {featuredContent.map((content, index) => (
              <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <content.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-2">{content.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{content.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {content.readTime}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          {content.type === 'article' ? 'Read Article' : 'Read Case Study'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-lg p-2 text-center min-w-[48px]">
                        <div className="text-xs font-medium uppercase">{event.date.month}</div>
                        <div className="text-xl font-bold">{event.date.day}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 w-4 h-4" />
                View All Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHub;
