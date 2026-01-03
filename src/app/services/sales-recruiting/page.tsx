import { Metadata } from 'next';
import SalesRecruitingClient from '@/components/pages/SalesRecruitingClient';

export const metadata: Metadata = {
    title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
    description: 'Revenue-driving sales professionals and business development leaders. Our sales recruiting specialists deliver results-oriented professionals who accelerate growth.',
    keywords: 'sales recruiting, business development hiring, sales headhunters, account executive recruiting, sales director search',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/sales-recruiting',
    },
    openGraph: {
        title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
        description: 'Revenue-driving sales professionals and business development leaders.',
        url: 'https://www.engagedheadhunters.com/services/sales-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
        description: 'Revenue-driving sales professionals and business development leaders.',
    },
};

export default function SalesRecruitingPage() {
    return <SalesRecruitingClient />;
}
