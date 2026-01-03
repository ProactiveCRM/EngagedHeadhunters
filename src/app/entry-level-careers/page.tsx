import { Metadata } from 'next';
import EntryLevelCareersClient from '@/components/pages/EntryLevelCareersClient';

export const metadata: Metadata = {
    title: 'Entry-Level Careers & Graduate Opportunities | Engaged Headhunters',
    description: 'Launch your career with entry-level jobs and graduate opportunities. Training, mentorship, and career growth for new professionals.',
    keywords: 'entry-level careers, graduate jobs, entry-level opportunities, career starters, junior roles',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/entry-level-careers',
    },
    openGraph: {
        title: 'Entry-Level Careers & Graduate Opportunities | Engaged Headhunters',
        description: 'Launch your career journey with entry-level opportunities at top companies.',
        url: 'https://www.engagedheadhunters.com/entry-level-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Entry-Level Careers & Graduate Opportunities | Engaged Headhunters',
        description: 'Launch your career journey with entry-level opportunities at top companies.',
    },
};

export default function EntryLevelCareersPage() {
    return <EntryLevelCareersClient />;
}
