import { Metadata } from 'next';
import ExecutiveCareersClient from '@/components/pages/ExecutiveCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
    description: 'Explore executive careers and C-suite opportunities. CEO, CFO, and leadership positions with premier organizations.',
    keywords: 'executive careers, leadership jobs, C-suite opportunities, executive positions, senior leadership',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/executive-careers',
    },
    openGraph: {
        title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
        description: 'Lead at the highest level with our exclusive C-suite and board opportunities.',
        url: 'https://www.engagedheadhunters.com/executive-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Careers & C-Suite Opportunities | Engaged Headhunters',
        description: 'Lead at the highest level with our exclusive C-suite and board opportunities.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/executive-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ExecutiveCareersPage() {
    const content = await getBuilderContent("/executive-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ExecutiveCareersClient />;
}

export const revalidate = 1;
