import { Metadata } from 'next';
import TemporaryStaffingClient from '@/components/pages/TemporaryStaffingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
    description: 'Flexible temporary staffing solutions for peak demand and seasonal needs. Quick access to qualified professionals for short-term assignments.',
    keywords: 'temporary staffing, seasonal staffing, short-term hiring, temp workforce solutions',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/temporary-staffing',
    },
    openGraph: {
        title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
        description: 'Flexible temporary staffing solutions for short-term needs.',
        url: 'https://www.engagedheadhunters.com/temporary-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Temporary Staffing & Seasonal Workforce Solutions | Engaged Headhunters',
        description: 'Flexible temporary staffing solutions for short-term needs.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/temporary-staffing");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function TemporaryStaffingPage() {
    const content = await getBuilderContent("/temporary-staffing");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <TemporaryStaffingClient />;
}

export const revalidate = 1;
