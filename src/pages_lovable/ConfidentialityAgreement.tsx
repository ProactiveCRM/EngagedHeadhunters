import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const ConfidentialityAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Confidentiality <span className="text-accent">Agreement</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Your trust is our foundation. We maintain the highest standards of confidentiality
                in all executive search engagements.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Confidentiality Principles */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Secure Searches</h3>
                  <p className="text-muted-foreground">
                    All search activities are conducted with the utmost discretion to protect both
                    client and candidate privacy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Need-to-Know Basis</h3>
                  <p className="text-muted-foreground">
                    Information is shared only with authorized individuals directly involved
                    in the search process.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Written Agreements</h3>
                  <p className="text-muted-foreground">
                    All parties sign comprehensive confidentiality agreements before
                    any sensitive information is disclosed.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Confidentiality Commitment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At Engaged Headhunters, we understand that executive searches often involve highly
                    sensitive information. Our confidentiality agreement outlines our unwavering commitment
                    to protecting proprietary business information, strategic plans, and personal data
                    throughout the search process.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Information Protection Standards</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Client Information</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        We protect all client-related information including:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Strategic business plans and organizational structures</li>
                        <li>Financial performance and compensation data</li>
                        <li>Market expansion and acquisition plans</li>
                        <li>Technology roadmaps and product development</li>
                        <li>Leadership succession and organizational changes</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Candidate Information</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        Candidate privacy is equally important to us:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Personal and professional background details</li>
                        <li>Current employment status and employer relationships</li>
                        <li>Salary and compensation information</li>
                        <li>Career aspirations and personal circumstances</li>
                        <li>Reference contacts and professional networks</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Security Measures</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Digital Security</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Encrypted email communications and file transfers</li>
                        <li>Secure cloud storage with multi-factor authentication</li>
                        <li>Regular security audits and vulnerability assessments</li>
                        <li>Restricted access controls and user permissions</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Physical Security</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Secure office environments with controlled access</li>
                        <li>Locked filing systems for physical documents</li>
                        <li>Private meeting rooms for confidential discussions</li>
                        <li>Secure disposal of sensitive documents</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Team Training</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Regular confidentiality training for all team members</li>
                        <li>Signed confidentiality agreements with all employees</li>
                        <li>Clear protocols for handling sensitive information</li>
                        <li>Incident response procedures for any security breaches</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Disclosure Protocols</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Client Consent</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        No client information is shared with candidates without explicit written consent.
                        We work closely with clients to determine what information can be disclosed
                        and at what stage of the process.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Candidate Consent</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Candidate profiles and resumes are only shared with clients after obtaining
                        explicit permission from the candidate and confirming mutual interest.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Reference Checks</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Reference checks are conducted only with the candidate's knowledge and consent,
                        and reference providers are informed of the confidential nature of the process.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Duration of Obligations</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our confidentiality obligations extend beyond the completion of any search assignment.
                    We maintain strict confidentiality indefinitely, ensuring that sensitive information
                    remains protected long after our engagement has concluded.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Compliance and Certifications</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Engaged Headhunters maintains compliance with international data protection
                      regulations and industry standards:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>GDPR (General Data Protection Regulation) compliance</li>
                      <li>ISO 27001 information security management standards</li>
                      <li>Professional recruiting industry confidentiality standards</li>
                      <li>Regular third-party security assessments</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Breach Response</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In the unlikely event of a security incident, we have established protocols
                    for immediate response, containment, and notification. All affected parties
                    would be notified promptly, and we would work diligently to minimize any
                    impact while implementing additional safeguards.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Our Security Team</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about our confidentiality practices or to report any security concerns:
                  </p>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground font-medium">Engaged Headhunters</p>
                    <p className="text-muted-foreground">Chief Information Security Officer</p>
                    <p className="text-muted-foreground">Email: security@engagedheadhunters.com</p>
                    <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                    <p className="text-muted-foreground">Emergency Line: +1 (555) 123-9999</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ConfidentialityAgreement;