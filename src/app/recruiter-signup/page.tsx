import { Metadata } from 'next';
import RecruiterSignupClient from '@/components/pages/RecruiterSignupClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/recruiter-signup");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function RecruiterSignupPage() {
    const content = await getBuilderContent("/recruiter-signup");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <RecruiterSignupClient />;
}

export const revalidate = 1;
