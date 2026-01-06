import { Metadata } from 'next';
import ManufacturingRecruitingClient from '@/components/pages/ManufacturingRecruitingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
    description: 'Expert manufacturing recruiting services for operations leaders, plant managers, and industrial professionals. We deliver talent that optimizes processes and drives innovation.',
    keywords: 'manufacturing recruiting, industrial staffing, operations management jobs, plant manager recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/manufacturing-recruiting',
    },
    openGraph: {
        title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
        description: 'Operations leaders who optimize processes and drive innovation.',
        url: 'https://www.engagedheadhunters.com/manufacturing-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Manufacturing Recruiting & Industrial Operations Hiring | Engaged Headhunters',
        description: 'Operations leaders who optimize processes and drive innovation.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/manufacturing-recruiting");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ManufacturingRecruitingPage() {
    const content = await getBuilderContent("/manufacturing-recruiting");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ManufacturingRecruitingClient />;
}

export const revalidate = 1;
