import { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Staffing & Recruiting Services | Executive Search & Staffing Agency | Engaged Headhunters',
    description: 'Comprehensive staffing and recruiting services from executive search to temporary staffing. Healthcare, technology, finance, manufacturing, and sales recruiting specialists.',
    keywords: 'staffing services, recruiting services, executive search, healthcare staffing, technology recruiting, finance recruiting, manufacturing recruiting, sales recruiting, contract staffing, temporary staffing',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services',
    },
    openGraph: {
        title: 'Staffing & Recruiting Services | Engaged Headhunters',
        description: 'Comprehensive staffing and recruiting services from executive search to temporary staffing.',
        url: 'https://www.engagedheadhunters.com/services',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Staffing & Recruiting Services | Engaged Headhunters',
        description: 'Comprehensive staffing and recruiting services.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/services");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ServicesPage() {
    const content = await getBuilderContent("/services");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ServicesClient />;
}

export const revalidate = 1;
