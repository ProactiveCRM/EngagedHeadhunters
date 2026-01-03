import { Metadata } from 'next';
import ContractStaffingClient from '@/components/pages/ContractStaffingClient';

export const metadata: Metadata = {
    title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
    description: 'Flexible contract staffing solutions for project-based and interim positions. Access specialized contractors for your workforce needs.',
    keywords: 'contract staffing, project-based hiring, interim staffing, contractor recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/contract-staffing',
    },
    openGraph: {
        title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
        description: 'Flexible contract staffing solutions for specialized projects.',
        url: 'https://www.engagedheadhunters.com/services/contract-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
        description: 'Flexible contract staffing solutions for specialized projects.',
    },
};

export default function ContractStaffingPage() {
    return <ContractStaffingClient />;
}
