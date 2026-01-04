import { Metadata } from 'next';
import SalesCareersClient from '@/components/pages/SalesCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
    description: 'Discover sales careers and business development opportunities. Account executive and sales leadership positions.',
    keywords: 'sales careers, sales jobs, account executive opportunities, business development, sales leadership',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/sales-careers',
    },
    openGraph: {
        title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
        description: 'Accelerate your sales career with high-growth companies.',
        url: 'https://www.engagedheadhunters.com/sales-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sales Careers & Revenue Opportunities | Engaged Headhunters',
        description: 'Accelerate your sales career with high-growth companies.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/sales-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function SalesCareersPage() {
    const content = await getBuilderContent("/sales-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <SalesCareersClient />;
}

export const revalidate = 1;
