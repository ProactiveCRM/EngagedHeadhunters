import { Metadata } from 'next';
import HoustonClient from '@/components/pages/HoustonClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Houston Recruiting Agency & Executive Search | Engaged Headhunters',
    description: 'Leading recruiting agency in Houston, Texas, specializing in executive search and professional staffing across Energy, Healthcare, Technology, and Manufacturing sectors.',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/houston',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/houston");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function HoustonPage() {
    const content = await getBuilderContent("/houston");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <HoustonClient />;
}

export const revalidate = 1;
