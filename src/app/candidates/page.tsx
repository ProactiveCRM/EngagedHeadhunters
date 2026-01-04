import { Metadata } from 'next';
import CandidatesClient from '@/components/pages/CandidatesClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/candidates");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function CandidatesPage() {
    const content = await getBuilderContent("/candidates");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <CandidatesClient />;
}

export const revalidate = 1;
