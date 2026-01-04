import { Metadata } from 'next';
import BlogIndexClient from '@/components/pages/BlogIndexClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
    description: 'Stay ahead of recruiting trends with expert insights on executive search, talent acquisition strategies, and leadership development from Engaged Headhunters.',
    keywords: 'recruiting blog, executive search insights, talent acquisition trends, leadership advice, hiring strategies',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/blog',
    },
    openGraph: {
        title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
        description: 'Expert insights on executive search and talent acquisition strategies.',
        url: 'https://www.engagedheadhunters.com/blog',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Search Insights & Intelligence | Engaged Headhunters Blog',
        description: 'Expert insights on executive search and talent acquisition strategies.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/blog");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function BlogPage() {
    const content = await getBuilderContent("/blog");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <BlogIndexClient />;
}

export const revalidate = 1;
