import { Metadata } from 'next';
import SalesCareersClient from '@/components/pages/SalesCareersClient';

export const metadata: Metadata = {
    title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
    description: 'Discover sales careers and business development opportunities. Account executive and sales leadership positions.',
    keywords: 'sales careers, sales jobs, account executive opportunities, business development, sales leadership',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/sales-careers',
    },
    openGraph: {
        title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
        description: 'Accelerate your sales career with high-growth companies.',
        url: 'https://www.engagedheadhunters.com/sales-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
        description: 'Accelerate your sales career with high-growth companies.',
    },
};

export default function SalesCareersPage() {
    return <SalesCareersClient />;
}
