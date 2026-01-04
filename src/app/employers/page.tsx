import { Metadata } from 'next';
import EmployersClient from '@/components/pages/EmployersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
    description: 'Fill leadership roles faster with executive search specialists. Industry-focused recruiters deliver qualified candidates in days with placement guarantees. Healthcare, tech, finance expertise.',
    alternates: {
        canonical: 'https://engagedheadhunters.com/employers',
    },
    openGraph: {
        title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
        description: 'Fill leadership roles faster with executive search specialists. Industry-focused recruiters deliver qualified candidates in days with placement guarantees.',
        url: 'https://engagedheadhunters.com/employers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Recruiting Services for Employers | Engaged Headhunters',
        description: 'Fill leadership roles faster with executive search specialists.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/employers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function EmployersPage() {
    const content = await getBuilderContent("/employers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <EmployersClient />;
}

export const revalidate = 1;
