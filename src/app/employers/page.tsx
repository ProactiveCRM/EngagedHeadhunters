import { Metadata } from 'next';
import EmployersClient from '@/components/pages/EmployersClient';

export const metadata: Metadata = {
    title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
    description: 'Fill leadership roles faster with executive search specialists. Industry-focused recruiters deliver qualified candidates in days with placement guarantees. Healthcare, tech, finance expertise.',
    alternates: {
        canonical: 'https://engagedheadhunters.com/employers',
    },
    openGraph: {
        title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
        description: 'Fill leadership roles faster with executive search specialists. Industry-focused recruiters deliver qualified candidates in days with placement guarantees.',
        url: 'https://engagedheadhunters.com/employers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
        description: 'Fill leadership roles faster with executive search specialists.',
    },
};

export default function EmployersPage() {
    return <EmployersClient />;
}
