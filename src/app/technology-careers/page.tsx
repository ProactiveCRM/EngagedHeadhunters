import { Metadata } from 'next';
import TechnologyCareersClient from '@/components/pages/TechnologyCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Technology Careers & IT Jobs | Engaged Headhunters',
    description: 'Explore technology careers and IT jobs. Software engineering, development, and tech professional opportunities.',
    keywords: 'technology careers, IT jobs, software jobs, tech careers, developer opportunities',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/technology-careers',
    },
    openGraph: {
        title: 'Technology Careers & IT Jobs | Engaged Headhunters',
        description: 'Build your future in technology with exclusive opportunities at leading companies.',
        url: 'https://www.engagedheadhunters.com/technology-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technology Careers & IT Jobs | Engaged Headhunters',
        description: 'Build your future in technology with exclusive opportunities at leading companies.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/technology-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function TechnologyCareersPage() {
    const content = await getBuilderContent("/technology-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <TechnologyCareersClient />;
}

export const revalidate = 1;
