import { Metadata } from 'next';
import SubmitResumeClient from '@/components/pages/SubmitResumeClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Submit Your Resume | Confidential Career Opportunities | Engaged Headhunters',
    description: 'Submit your resume for confidential career opportunities. Connect with expert recruiters who specialize in executive and professional placement. Access unlisted leadership roles.',
    keywords: 'submit resume, job application, executive search, career opportunities, headhunters, professional placement',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/submit-resume',
    },
    openGraph: {
        title: 'Submit Your Resume | Confidential Career Opportunities | Engaged Headhunters',
        description: 'Submit your resume for exclusive, unlisted leadership opportunities. Confidential career search for executives.',
        url: 'https://www.engagedheadhunters.com/submit-resume',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Submit Your Resume | Confidential Career Opportunities | Engaged Headhunters',
        description: 'Submit your resume for exclusive, unlisted leadership opportunities. Confidential career search for executives.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/submit-resume");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function SubmitResumePage() {
    const content = await getBuilderContent("/submit-resume");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <SubmitResumeClient />;
}

export const revalidate = 1;
