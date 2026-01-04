import { Metadata } from 'next';
import ContractStaffingClient from '@/components/pages/ContractStaffingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
    description: 'Flexible contract staffing solutions for project-based and interim positions. Access specialized contractors for your workforce needs.',
    keywords: 'contract staffing, project-based hiring, interim staffing, contractor recruitment',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/contract-staffing',
    },
    openGraph: {
        title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
        description: 'Flexible contract staffing solutions for specialized projects.',
        url: 'https://www.engagedheadhunters.com/services/contract-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contract Staffing & Project-Based Hiring | Engaged Headhunters',
        description: 'Flexible contract staffing solutions for specialized projects.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/services/contract-staffing");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ContractStaffingPage() {
    const content = await getBuilderContent("/services/contract-staffing");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ContractStaffingClient />;
}

export const revalidate = 1;
