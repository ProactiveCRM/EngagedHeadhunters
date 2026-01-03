import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/layout/PageLayout';
import CTASection from '../components/CTASection';
import PersonSchema from '@/components/seo/PersonSchema';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { emoji: "⭐", value: "2022", label: "Founded" },
    { emoji: "👥", value: "Multi", label: "Industry Expertise" },
    { emoji: "💼", value: "Nationwide", label: "Coverage" },
    { emoji: "🎯", value: "AI", label: "Powered Sourcing" }
  ];

  const values = [
    {
      emoji: "🎯",
      title: "Precision Matching",
      description: "We don't just fill positions—we architect leadership transformations by precisely matching exceptional executives with organizations poised for greatness."
    },
    {
      emoji: "❤️",
      title: "Relationship Excellence",
      description: "Our success is built on enduring partnerships, not transactions. We invest deeply in understanding both our clients' cultures and our candidates' aspirations."
    },
    {
      emoji: "🏆",
      title: "Results-Driven",
      description: "We measure our success by yours. Every placement is backed by our commitment to delivering measurable impact and long-term value."
    }
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>About Engaged Headhunters - Premier Executive Search & Staffing Agency Since 2022</title>
        <meta name="description" content="Learn about Engaged Headhunters, founded in 2022 in Virginia Beach. Elite executive search and staffing agency with 500+ successful placements, trusted by companies nationwide." />
        <meta name="keywords" content="about engaged headhunters, executive search firm, staffing agency virginia beach, headhunting company, recruiting services" />
        <link rel="canonical" href="https://www.engagedheadhunters.com/about" />
      </Helmet>

      <PersonSchema
        name="James Pemberton"
        jobTitle="Founder & CEO"
        description="A U.S. Navy veteran with 15+ years of experience in recruiting and talent acquisition. Creator of the Build Don't Beg methodology."
        url="https://www.engagedheadhunters.com/about"
        sameAs={['https://www.linkedin.com/in/jamespemberton']}
      />

      <div className="pt-4">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-accent">Engaged Headhunters</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Elite executive search and staffing solutions, connecting exceptional talent 
                with transformational opportunities since 2022.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Founded in Virginia Beach in 2022, Engaged Headhunters began with a revolutionary 
                  premise: that exceptional talent acquisition isn't just about credentials—it's about the 
                  perfect confluence of vision, culture, and transformational potential.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Engaged Difference</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Founded by James Pemberton, Engaged Headhunters brings a unique approach to 
                    executive search and staffing. Our "Build Don't Beg" methodology combines 
                    military precision with innovative recruiting strategies to deliver results 
                    that traditional agencies can't match.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our name, "Engaged Headhunters," reflects our deep commitment to understanding the 
                    nuanced needs of modern organizations and the aspirations of top-tier talent.
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4">What Sets Us Apart</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">"Build Don't Beg" methodology</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">AI-powered candidate matching</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Placement guarantee (terms per engagement)</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Multi-industry expertise</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Nationwide placement network</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">Transparent, results-focused approach</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Track Record
              </h2>
              <p className="text-xl text-muted-foreground">
                Results that speak to our commitment to exceptional outcomes
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <span className="text-3xl mb-4 block" role="img" aria-hidden="true">{stat.emoji}</span>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These principles guide every search, every interaction, and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-8 text-center">
                    <span className="text-4xl mb-6 block" role="img" aria-hidden="true">{value.emoji}</span>
                    <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Leadership
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the founder behind Engaged Headhunters
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl" role="img" aria-hidden="true">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">James Pemberton</h3>
                  <p className="text-primary font-medium mb-4">Founder & CEO</p>
                  <p className="text-muted-foreground leading-relaxed">
                    A U.S. Navy veteran with 15+ years of experience in recruiting and talent acquisition, 
                    James founded Engaged Headhunters to bring military precision and innovative methodology 
                    to executive search. His "Build Don't Beg" approach has revolutionized how companies 
                    attract and secure top talent through strategic, authority-first recruiting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Our Mission
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  "To be the definitive bridge between visionary organizations and exceptional 
                  talent, creating lasting partnerships that drive organizational excellence 
                  and career success nationwide."
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Every search we conduct, every placement we make, and every relationship we build 
                    is guided by this unwavering commitment to excellence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      {/* CTA Section */}
      <CTASection variant="hybrid" showJobsLink={true} />
      </div>
    </PageLayout>
  );
};

export default About;