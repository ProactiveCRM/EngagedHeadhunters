import { Metadata } from 'next';
import SalaryGuideClient from '@/components/pages/SalaryGuideClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
    description: 'Access market-accurate executive compensation data and salary benchmarks. Get instant salary estimates for your industry, role, and location.',
    keywords: 'executive salary guide, compensation data, salary benchmarks, executive pay, compensation report, salary calculator',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/salary-guide',
    },
    openGraph: {
        title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
        description: 'Market-accurate salary data and compensation benchmarks for executive and professional roles.',
        url: 'https://www.engagedheadhunters.com/salary-guide',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Executive Salary Guide & Compensation Data | Engaged Headhunters',
        description: 'Market-accurate salary data and compensation benchmarks.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/salary-guide");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function SalaryGuidePage() {
    const content = await getBuilderContent("/salary-guide");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <SalaryGuideClient />;
}

export const revalidate = 1;
