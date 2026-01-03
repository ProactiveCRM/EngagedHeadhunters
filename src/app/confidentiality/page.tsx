import { Metadata } from 'next';
import ConfidentialityClient from '@/components/pages/ConfidentialityClient';

export const metadata: Metadata = {
    title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
    description: 'Learn about our comprehensive confidentiality standards and data protection measures. We maintain the highest standards of privacy in executive search.',
    keywords: 'confidentiality agreement, data protection, executive search privacy, recruitment security',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/confidentiality',
    },
    openGraph: {
        title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
        description: 'Our commitment to protecting sensitive information for clients and candidates.',
        url: 'https://www.engagedheadhunters.com/confidentiality',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
        description: 'Our commitment to protecting sensitive information for clients and candidates.',
    },
};

export default function ConfidentialityPage() {
    return <ConfidentialityClient />;
}
