import { Metadata } from 'next';
import PrivacyPolicyClient from '@/components/pages/PrivacyPolicyClient';

export const metadata: Metadata = {
    title: 'Privacy Policy | Engaged Headhunters',
    description: 'Learn how Engaged Headhunters protects your personal and professional information. Our commitment to data security and candidate confidentiality.',
    keywords: 'privacy policy, data protection, candidate confidentiality, recruitment privacy',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/privacy-policy',
    },
    openGraph: {
        title: 'Privacy Policy | Engaged Headhunters',
        description: 'Learn how we protect your personal information and candidate data in our executive search services.',
        url: 'https://www.engagedheadhunters.com/privacy-policy',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | Engaged Headhunters',
        description: 'Learn how we protect your personal information and candidate data in our executive search services.',
    },
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />;
}
