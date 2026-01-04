import { Metadata } from 'next';
import TermsOfServiceClient from '@/components/pages/TermsOfServiceClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Terms of Service | Engaged Headhunters',
    description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
    keywords: 'terms of service, legal terms, recruitment agreement, service conditions',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/terms-of-service',
    },
    openGraph: {
        title: 'Terms of Service | Engaged Headhunters',
        description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
        url: 'https://www.engagedheadhunters.com/terms-of-service',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service | Engaged Headhunters',
        description: 'Terms and conditions for using Engaged Headhunters services. Legal agreement for clients and candidates.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/terms-of-service");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function TermsOfServicePage() {
    const content = await getBuilderContent("/terms-of-service");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <TermsOfServiceClient />;
}

export const revalidate = 1;
