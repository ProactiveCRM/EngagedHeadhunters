import { Metadata } from 'next';
import FinanceRecruitingClient from '@/components/pages/FinanceRecruitingClient';

export const metadata: Metadata = {
    title: 'Finance Recruiting & Financial Services Hiring | Engaged Headhunters',
    description: 'Expert finance recruiting services for investment banking, wealth management, and financial leadership roles. We deliver financial professionals who drive growth and manage risk.',
    keywords: 'finance recruiting, financial services staffing, CFO search, investment banking recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/finance-recruiting',
    },
    openGraph: {
        title: 'Finance Recruiting & Financial Services Hiring | Engaged Headhunters',
        description: 'Financial leadership recruitment for investment banking and wealth management.',
        url: 'https://www.engagedheadhunters.com/services/finance-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Finance Recruiting & Financial Services Hiring | Engaged Headhunters',
        description: 'Financial leadership recruitment for investment banking and wealth management.',
    },
};

export default function FinanceRecruitingPage() {
    return <FinanceRecruitingClient />;
}
