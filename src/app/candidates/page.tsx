import { Metadata } from 'next';
import CandidatesClient from '@/components/pages/CandidatesClient';

export const metadata: Metadata = {
    title: 'Executive Career Opportunities | Confidential Job Search | Engaged Headhunters',
    description: 'Access leadership opportunities that aren\'t publicly posted. Confidential career search for executives and senior professionals. Free for candidates. Healthcare, tech, finance roles.',
    alternates: {
        canonical: 'https://engagedheadhunters.com/candidates',
    },
    openGraph: {
        title: 'Executive Career Opportunities | Confidential Job Search | Engaged Headhunters',
        description: 'Access leadership opportunities that aren\'t publicly posted. Confidential career search for executives and senior professionals.',
        url: 'https://engagedheadhunters.com/candidates',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Career Opportunities | Confidential Job Search | Engaged Headhunters',
        description: 'Access leadership opportunities that aren\'t publicly posted.',
    },
};

export default function CandidatesPage() {
    return <CandidatesClient />;
}
