import { Metadata } from 'next';
import FinanceCareersClient from '@/components/pages/FinanceCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Finance & Accounting Careers | Engaged Headhunters',
    description: 'Discover finance careers and accounting jobs. Banking, financial services, and accounting professional opportunities.',
    keywords: 'finance careers, accounting jobs, banking careers, financial services jobs, CPA opportunities',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/finance-careers',
    },
    openGraph: {
        title: 'Finance & Accounting Careers | Engaged Headhunters',
        description: 'Power your finance career with leading financial institutions.',
        url: 'https://www.engagedheadhunters.com/finance-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Finance & Accounting Careers | Engaged Headhunters',
        description: 'Power your finance career with leading financial institutions.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/finance-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function FinanceCareersPage() {
    const content = await getBuilderContent("/finance-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <FinanceCareersClient />;
}

export const revalidate = 1;
