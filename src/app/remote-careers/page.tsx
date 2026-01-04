import { Metadata } from 'next';
import RemoteCareersClient from '@/components/pages/RemoteCareersClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Remote Careers & Work From Anywhere | Engaged Headhunters',
    description: 'Find remote careers and work-from-home jobs. High-paying remote opportunities with top global companies.',
    keywords: 'remote careers, work from home jobs, remote opportunities, telecommute jobs, global careers',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/remote-careers',
    },
    openGraph: {
        title: 'Remote Careers & Work From Anywhere | Engaged Headhunters',
        description: 'Work from anywhere with high-paying remote and hybrid career opportunities.',
        url: 'https://www.engagedheadhunters.com/remote-careers',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Remote Careers & Work From Anywhere | Engaged Headhunters',
        description: 'Work from anywhere with high-paying remote and hybrid career opportunities.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/remote-careers");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function RemoteCareersPage() {
    const content = await getBuilderContent("/remote-careers");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <RemoteCareersClient />;
}

export const revalidate = 1;
