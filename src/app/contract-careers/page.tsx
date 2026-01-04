import { Metadata } from 'next';
import ContractCareersClient from '@/components/pages/ContractCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Contract Careers & Consulting Opportunities | Engaged Headhunters',
    description: 'Explore contract careers and consulting opportunities. Interim leadership, project-based work, and fractional roles.',
    keywords: 'contract careers, consulting jobs, interim leadership, project work, fractional roles',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/contract-careers',
    },
    openGraph: {
        title: 'Contract Careers & Consulting Opportunities | Engaged Headhunters',
        description: 'Freedom and premium rates with high-paying contract and consulting roles.',
        url: 'https://www.engagedheadhunters.com/contract-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contract Careers & Consulting Opportunities | Engaged Headhunters',
        description: 'Freedom and premium rates with high-paying contract and consulting roles.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/contract-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ContractCareersPage() {
    const content = await getBuilderContent("/contract-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ContractCareersClient />;
}

export const revalidate = 1;
