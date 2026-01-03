import { Metadata } from 'next';
import ForRecruitersClient from '@/components/pages/ForRecruitersClient';

export const metadata: Metadata = {
    title: 'Partner With Us: EH Agent or Alliance Member | Engaged Headhunters',
    description: 'Join as an EH Agent or Alliance Member. We book qualified appointments on your calendar. AI-powered sourcing, 2-4 extra placements per month, 40% better response rates.',
    keywords: 'recruiting partnership, recruiter franchise, staffing alliance, AI recruiting tools, recruiter methodology, increase placements, recruiting automation, headhunter tools',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/for-recruiters',
    },
    openGraph: {
        title: 'Partner With Us: EH Agent or Alliance Member | Engaged Headhunters',
        description: 'Two paths to grow your recruiting business. Whether you build under our brand or keep your own, we book qualified appointments on your calendar.',
        url: 'https://www.engagedheadhunters.com/for-recruiters',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Partner With Us: EH Agent or Alliance Member | Engaged Headhunters',
        description: 'Two paths to grow your recruiting business.',
    },
};

export default function ForRecruitersPage() {
    return <ForRecruitersClient />;
}
