import { Metadata } from 'next';
import HealthcareCareersClient from '@/components/pages/HealthcareCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Healthcare Careers & Medical Jobs | Engaged Headhunters',
    description: 'Find healthcare careers and medical jobs. Nursing, physician, and healthcare professional opportunities with top employers.',
    keywords: 'healthcare careers, medical jobs, nursing jobs, physician careers, healthcare opportunities',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/healthcare-careers',
    },
    openGraph: {
        title: 'Healthcare Careers & Medical Jobs | Engaged Headhunters',
        description: 'Find your next healthcare opportunity with leading medical organizations.',
        url: 'https://www.engagedheadhunters.com/healthcare-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthcare Careers & Medical Jobs | Engaged Headhunters',
        description: 'Find your next healthcare opportunity with leading medical organizations.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/healthcare-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function HealthcareCareersPage() {
    const content = await getBuilderContent("/healthcare-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <HealthcareCareersClient />;
}

export const revalidate = 1;
