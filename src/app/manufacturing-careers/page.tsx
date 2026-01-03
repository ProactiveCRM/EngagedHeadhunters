import { Metadata } from 'next';
import ManufacturingCareersClient from '@/components/pages/ManufacturingCareersClient';

export const metadata: Metadata = {
    title: 'Manufacturing Careers & Industrial Jobs | Engaged Headhunters',
    description: 'Find manufacturing careers and industrial jobs. Plant management, engineering, and operations opportunities.',
    keywords: 'manufacturing careers, industrial jobs, plant manager jobs, operations careers, engineering jobs',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/manufacturing-careers',
    },
    openGraph: {
        title: 'Manufacturing Careers & Industrial Jobs | Engaged Headhunters',
        description: 'Build America\'s future with leading manufacturers seeking top talent.',
        url: 'https://www.engagedheadhunters.com/manufacturing-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Manufacturing Careers & Industrial Jobs | Engaged Headhunters',
        description: 'Build America\'s future with leading manufacturers seeking top talent.',
    },
};

export default function ManufacturingCareersPage() {
    return <ManufacturingCareersClient />;
}
