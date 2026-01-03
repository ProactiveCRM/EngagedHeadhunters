import { Metadata } from 'next';
import FinanceCareersClient from '@/components/pages/FinanceCareersClient';

export const metadata: Metadata = {
    title: 'Finance & Accounting Careers | Engaged Headhunters',
    description: 'Discover finance careers and accounting jobs. Banking, financial services, and accounting professional opportunities.',
    keywords: 'finance careers, accounting jobs, banking careers, financial services jobs, CPA opportunities',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/finance-careers',
    },
    openGraph: {
        title: 'Finance & Accounting Careers | Engaged Headhunters',
        description: 'Power your finance career with leading financial institutions.',
        url: 'https://www.engagedheadhunters.com/finance-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Finance & Accounting Careers | Engaged Headhunters',
        description: 'Power your finance career with leading financial institutions.',
    },
};

export default function FinanceCareersPage() {
    return <FinanceCareersClient />;
}
