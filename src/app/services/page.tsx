import { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
    title: 'Staffing & Recruiting Services | Executive Search & Staffing Agency | Engaged Headhunters',
    description: 'Comprehensive staffing and recruiting services from executive search to temporary staffing. Healthcare, technology, finance, manufacturing, and sales recruiting specialists.',
    keywords: 'staffing services, recruiting services, executive search, healthcare staffing, technology recruiting, finance recruiting, manufacturing recruiting, sales recruiting, contract staffing, temporary staffing',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services',
    },
    openGraph: {
        title: 'Staffing & Recruiting Services | Engaged Headhunters',
        description: 'Comprehensive staffing and recruiting services from executive search to temporary staffing.',
        url: 'https://www.engagedheadhunters.com/services',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Staffing & Recruiting Services | Engaged Headhunters',
        description: 'Comprehensive staffing and recruiting services.',
    },
};

export default function ServicesPage() {
    return <ServicesClient />;
}
