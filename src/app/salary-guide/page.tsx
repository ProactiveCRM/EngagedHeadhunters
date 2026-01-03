import { Metadata } from 'next';
import SalaryGuideClient from '@/components/pages/SalaryGuideClient';

export const metadata: Metadata = {
    title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
    description: 'Access market-accurate executive compensation data and salary benchmarks. Get instant salary estimates for your industry, role, and location.',
    keywords: 'executive salary guide, compensation data, salary benchmarks, executive pay, compensation report, salary calculator',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/salary-guide',
    },
    openGraph: {
        title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
        description: 'Market-accurate salary data and compensation benchmarks for executive and professional roles.',
        url: 'https://www.engagedheadhunters.com/salary-guide',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
        description: 'Market-accurate salary data and compensation benchmarks.',
    },
};

export default function SalaryGuidePage() {
    return <SalaryGuideClient />;
}
