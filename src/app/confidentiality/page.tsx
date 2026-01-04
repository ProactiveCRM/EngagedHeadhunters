import { Metadata } from 'next';
import ConfidentialityClient from '@/components/pages/ConfidentialityClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
    description: 'Learn about our comprehensive confidentiality standards and data protection measures. We maintain the highest standards of privacy in executive search.',
    keywords: 'confidentiality agreement, data protection, executive search privacy, recruitment security',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/confidentiality',
    },
    openGraph: {
        title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
        description: 'Our commitment to protecting sensitive information for clients and candidates.',
        url: 'https://www.engagedheadhunters.com/confidentiality',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Confidentiality Agreement | Data Protection | Engaged Headhunters',
        description: 'Our commitment to protecting sensitive information for clients and candidates.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/confidentiality");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ConfidentialityPage() {
    const content = await getBuilderContent("/confidentiality");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ConfidentialityClient />;
}

export const revalidate = 1;
