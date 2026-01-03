import { Metadata } from 'next';
import CareersClient from '@/components/pages/CareersClient';

export const metadata: Metadata = {
    title: 'Find Your Dream Career | Job Search & Recruitment | Engaged Headhunters',
    description: 'Discover exclusive career opportunities across healthcare, technology, finance, and more. AI-powered job matching and expert career guidance.',
    keywords: 'job search, career opportunities, recruitment agency, healthcare jobs, tech careers, finance roles, executive search',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/careers',
    },
    openGraph: {
        title: 'Find Your Dream Career | Job Search & Recruitment | Engaged Headhunters',
        description: 'Discover exclusive opportunities and advance your career through our AI-powered matching platform.',
        url: 'https://www.engagedheadhunters.com/careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Find Your Dream Career | Job Search & Recruitment | Engaged Headhunters',
        description: 'Discover exclusive opportunities and advance your career through our AI-powered matching platform.',
    },
};

export default function CareersPage() {
    return <CareersClient />;
}
