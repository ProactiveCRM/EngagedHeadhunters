import { Metadata } from 'next';
import TechnologyRecruitingClient from '@/components/pages/TechnologyRecruitingClient';

export const metadata: Metadata = {
    title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
    description: 'Expert technology recruiting services for software engineers, CTOs, data scientists, and IT leaders. We deliver innovative tech professionals for your digital transformation.',
    keywords: 'technology recruiting, IT staffing, software engineer recruitment, CTO search, tech talent acquisition',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/technology-recruiting',
    },
    openGraph: {
        title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
        description: 'Expert technology recruiting for software engineers and IT leaders.',
        url: 'https://www.engagedheadhunters.com/services/technology-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
        description: 'Expert technology recruiting for software engineers and IT leaders.',
    },
};

export default function TechnologyRecruitingPage() {
    return <TechnologyRecruitingClient />;
}
