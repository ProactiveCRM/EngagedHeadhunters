import { Metadata } from 'next';
import SalesRecruitingClient from '@/components/pages/SalesRecruitingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
    description: 'Revenue-driving sales professionals and business development leaders. Our sales recruiting specialists deliver results-oriented professionals who accelerate growth.',
    keywords: 'sales recruiting, business development hiring, sales headhunters, account executive recruiting, sales director search',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/sales-recruiting',
    },
    openGraph: {
        title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
        description: 'Revenue-driving sales professionals and business development leaders.',
        url: 'https://www.engagedheadhunters.com/sales-recruiting',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sales Recruiting & Business Development Hiring | Engaged Headhunters',
        description: 'Revenue-driving sales professionals and business development leaders.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/sales-recruiting");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function SalesRecruitingPage() {
    const content = await getBuilderContent("/sales-recruiting");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <SalesRecruitingClient />;
}

export const revalidate = 1;
