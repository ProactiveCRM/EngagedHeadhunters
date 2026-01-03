import { Metadata } from 'next';
import TermsOfServiceClient from '@/components/pages/TermsOfServiceClient';

export const metadata: Metadata = {
    title: 'Terms of Service | Engaged Headhunters',
    description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
    keywords: 'terms of service, legal terms, recruitment agreement, service conditions',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/terms-of-service',
    },
    openGraph: {
        title: 'Terms of Service | Engaged Headhunters',
        description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
        url: 'https://www.engagedheadhunters.com/terms-of-service',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service | Engaged Headhunters',
        description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
    },
};

export default function TermsOfServicePage() {
    return <TermsOfServiceClient />;
}
