import { Metadata } from 'next';
import HealthcareStaffingClient from '@/components/pages/HealthcareStaffingClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
    description: 'Specialized healthcare staffing and medical recruiting services. From nursing leadership to hospital administration, we deliver qualified healthcare professionals.',
    keywords: 'healthcare staffing, medical recruiting, nursing recruitment, hospital administration jobs, healthcare IT staffing',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/services/healthcare-staffing',
    },
    openGraph: {
        title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
        description: 'Specialized medical recruiting for nursing leadership and hospital administration.',
        url: 'https://www.engagedheadhunters.com/services/healthcare-staffing',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Healthcare Staffing & Medical Recruiting | Engaged Headhunters',
        description: 'Specialized medical recruiting for nursing leadership and hospital administration.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/services/healthcare-staffing");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function HealthcareStaffingPage() {
    const content = await getBuilderContent("/services/healthcare-staffing");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <HealthcareStaffingClient />;
}

export const revalidate = 1;
