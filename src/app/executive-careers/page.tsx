import { Metadata } from 'next';
import ExecutiveCareersClient from '@/components/pages/ExecutiveCareersClient';

export const metadata: Metadata = {
    title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
    description: 'Explore executive careers and C-suite opportunities. CEO, CFO, and leadership positions with premier organizations.',
    keywords: 'executive careers, leadership jobs, C-suite opportunities, executive positions, senior leadership',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/executive-careers',
    },
    openGraph: {
        title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
        description: 'Lead at the highest level with our exclusive C-suite and board opportunities.',
        url: 'https://www.engagedheadhunters.com/executive-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
        description: 'Lead at the highest level with our exclusive C-suite and board opportunities.',
    },
};

export default function ExecutiveCareersPage() {
    return <ExecutiveCareersClient />;
}
