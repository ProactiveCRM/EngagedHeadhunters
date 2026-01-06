import { Metadata } from 'next';
import ExecutiveSearchClient from '@/components/pages/ExecutiveSearchClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
    description: 'Board-level and C-suite executive recruitment for transformational leadership roles. Our executive search practice delivers visionary leaders who drive extraordinary results.',
    keywords: 'executive search, C-suite recruiting, CEO search, CFO recruiting, executive headhunters, board recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/executive-search',
    },
    openGraph: {
        title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
        description: 'Transformational leadership recruitment for C-suite and board roles.',
        url: 'https://www.engagedheadhunters.com/executive-search',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Search & C-Suite Recruiting | Engaged Headhunters',
        description: 'Transformational leadership recruitment for C-suite and board roles.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/executive-search");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ExecutiveSearchPage() {
    const content = await getBuilderContent("/executive-search");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ExecutiveSearchClient />;
}

export const revalidate = 1;
