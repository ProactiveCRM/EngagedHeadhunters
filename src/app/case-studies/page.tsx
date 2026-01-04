import { Metadata } from 'next';
import CaseStudiesClient from '@/components/pages/CaseStudiesClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Search Case Studies & Success Stories | Engaged Headhunters',
    description: 'Explore our executive search case studies. See how we help organizations across healthcare, tech, and finance find transformational leadership.',
    keywords: 'executive search case studies, recruiting success stories, healthcare leadership placement, fintech cto recruitment, manufacturing coo search',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/case-studies',
    },
    openGraph: {
        title: 'Executive Search Case Studies & Success Stories | Engaged Headhunters',
        description: 'Proven results that drive success. See how our executive placements have transformed organizations.',
        url: 'https://www.engagedheadhunters.com/case-studies',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Search Case Studies & Success Stories | Engaged Headhunters',
        description: 'Proven results that drive success. See how our executive placements have transformed organizations.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/case-studies");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function CaseStudiesPage() {
    const content = await getBuilderContent("/case-studies");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <CaseStudiesClient />;
}

export const revalidate = 1;
