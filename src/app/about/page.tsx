import { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/about");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function AboutPage() {
    const content = await getBuilderContent("/about");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <AboutClient />;
}

export const revalidate = 1;
