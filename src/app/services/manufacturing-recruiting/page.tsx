import { Metadata } from 'next';
import ManufacturingRecruitingClient from '@/components/pages/ManufacturingRecruitingClient';

export const metadata: Metadata = {
    title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
    description: 'Expert manufacturing recruiting services for operations leaders, plant managers, and industrial professionals. We deliver talent that optimizes processes and drives innovation.',
    keywords: 'manufacturing recruiting, industrial staffing, operations management jobs, plant manager recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/manufacturing-recruiting',
    },
    openGraph: {
        title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
        description: 'Operations leaders who optimize processes and drive innovation.',
        url: 'https://www.engagedheadhunters.com/services/manufacturing-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
        description: 'Operations leaders who optimize processes and drive innovation.',
    },
};

export default function ManufacturingRecruitingPage() {
    return <ManufacturingRecruitingClient />;
}
