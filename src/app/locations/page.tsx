import { Metadata } from 'next';
import LocationsClient from '@/components/pages/LocationsClient';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

const STATIC_METADATA: Metadata = {
    title: 'Recruiting Service Areas | Local Headhunters Nationwide | Engaged Headhunters',
    description: 'Premier recruiting agency serving major metropolitan areas across the United States. Local market expertise with national recruiting standards.',
    alternates: {
        canonical: 'https://www.engagedheadhunters.com/locations',
    },
};

export async function generateMetadata(): Promise<Metadata> {
    const content = await getBuilderContent("/locations");
    return mergeBuilderMetadata(content, STATIC_METADATA);
}

export default async function LocationsPage() {
    const content = await getBuilderContent("/locations");

    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    return <LocationsClient />;
}

export const revalidate = 1;
