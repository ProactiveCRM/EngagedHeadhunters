import { Metadata } from 'next';
import RecruiterSignupClient from '@/components/pages/RecruiterSignupClient';

export const metadata: Metadata = {
    title: 'Become a Recruiter | Join Engaged Headhunters',
    description: 'Join Engaged Headhunters as a recruiter. Get qualified appointments booked on your calendar, access elite technology, and grow your recruiting business.',
    keywords: 'recruiter signup, join recruiting firm, headhunter opportunities, recruiting platform',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/recruiter-signup',
    },
    openGraph: {
        title: 'Become a Recruiter | Join Engaged Headhunters',
        description: 'Grow your recruiting business with qualified leads and elite sourcing technology.',
        url: 'https://www.engagedheadhunters.com/recruiter-signup',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Become a Recruiter | Join Engaged Headhunters',
        description: 'Grow your recruiting business with qualified leads and elite sourcing technology.',
    },
};

export default function RecruiterSignupPage() {
    return <RecruiterSignupClient />;
}
