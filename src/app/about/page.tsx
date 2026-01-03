import { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
    title: 'About Engaged Headhunters - Premier Executive Search & Staffing Agency',
    description: 'Learn about Engaged Headhunters, founded in 2022. Elite executive search and staffing agency with a nationwide presence and AI-powered sourcing.',
    keywords: 'about engaged headhunters, executive search firm, staffing agency, headhunting company, recruiting services',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/about',
    },
    openGraph: {
        title: 'About Engaged Headhunters - Premier Executive Search & Staffing Agency',
        description: 'Elite executive search and staffing solutions, connecting exceptional talent with transformational opportunities since 2022.',
        url: 'https://www.engagedheadhunters.com/about',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Engaged Headhunters - Premier Executive Search & Staffing Agency',
        description: 'Elite executive search and staffing solutions, connecting exceptional talent with transformational opportunities since 2022.',
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
