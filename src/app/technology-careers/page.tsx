import { Metadata } from 'next';
import TechnologyCareersClient from '@/components/pages/TechnologyCareersClient';

export const metadata: Metadata = {
    title: 'Technology Careers & IT Jobs | Engaged Headhunters',
    description: 'Explore technology careers and IT jobs. Software engineering, development, and tech professional opportunities.',
    keywords: 'technology careers, IT jobs, software jobs, tech careers, developer opportunities',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/technology-careers',
    },
    openGraph: {
        title: 'Technology Careers & IT Jobs | Engaged Headhunters',
        description: 'Build your future in technology with exclusive opportunities at leading companies.',
        url: 'https://www.engagedheadhunters.com/technology-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technology Careers & IT Jobs | Engaged Headhunters',
        description: 'Build your future in technology with exclusive opportunities at leading companies.',
    },
};

export default function TechnologyCareersPage() {
    return <TechnologyCareersClient />;
}
