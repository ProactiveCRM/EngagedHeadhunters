import { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Contact Engaged Headhunters - Executive Search & Recruiting Services | Virginia Beach',
    description: 'Contact Engaged Headhunters for executive search, recruiting, and staffing solutions. Located in Virginia Beach, VA. Call (757) 720-7173 for a consultation.',
    keywords: 'contact headhunters, executive recruiting contact, staffing services virginia beach, recruiting agency contact',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/contact',
    },
    openGraph: {
        title: 'Contact Engaged Headhunters | Executive Search & Recruiting',
        description: 'Connect with our executive search specialists to discuss your talent acquisition needs.',
        url: 'https://www.engagedheadhunters.com/contact',
        siteName: 'Engaged Headhunters',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Engaged Headhunters | Executive Search & Recruiting',
        description: 'Connect with our executive search specialists to discuss your talent acquisition needs.',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/contact");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function ContactPage() {
    const content = await getBuilderContent("/contact");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <ContactClient />;
}

export const revalidate = 1;
