import { Metadata } from 'next';
import TechnologyRecruitingClient from '@/components/pages/TechnologyRecruitingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
    description: 'Expert technology recruiting services for software engineers, CTOs, data scientists, and IT leaders. We deliver innovative tech professionals for your digital transformation.',
    keywords: 'technology recruiting, IT staffing, software engineer recruitment, CTO search, tech talent acquisition',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/technology-recruiting',
    },
    openGraph: {
        title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
        description: 'Expert technology recruiting for software engineers and IT leaders.',
        url: 'https://www.engagedheadhunters.com/technology-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technology Recruiting & IT Talent Acquisition | Engaged Headhunters',
        description: 'Expert technology recruiting for software engineers and IT leaders.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/technology-recruiting");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function TechnologyRecruitingPage() {
    const content = await getBuilderContent("/technology-recruiting");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <TechnologyRecruitingClient />;
}

export const revalidate = 1;
