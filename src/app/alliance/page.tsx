import { Metadata } from 'next';
import AllianceClient from '@/components/pages/AllianceClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Join the Engaged Headhunters Alliance | Keep Your Brand, Gain Our Support',
    description: 'Stay 100% independent while we book qualified appointments on YOUR calendar. Access exclusive job orders, AI-powered tools, and elite recruiter network. Your brand, our support.',
    keywords: 'recruiting alliance, independent recruiter support, recruiter partnership, staffing alliance, keep your brand recruiting, appointment booking for recruiters',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/alliance',
    },
    openGraph: {
        title: 'Join the Engaged Headhunters Alliance | Keep Your Brand, Gain Our Support',
        description: 'Stay 100% independent while we book qualified appointments on YOUR calendar. Your brand, your business—our powerful support.',
        url: 'https://www.engagedheadhunters.com/alliance',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Join the Engaged Headhunters Alliance | Keep Your Brand, Gain Our Support',
        description: 'Stay 100% independent while we book qualified appointments on YOUR calendar.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/alliance");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function AlliancePage() {
    const content = await getBuilderContent("/alliance");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <AllianceClient />;
}

export const revalidate = 1;
