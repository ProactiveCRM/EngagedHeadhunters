import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuilderContent } from "@/lib/builder-fetch";
import { supabase } from "@/integrations/supabase/client";
import NichePageClient from "@/components/pages/NichePageClient";

interface PageProps {
    params: Promise<{
        page: string[];
    }>;
}

async function getLocation(slug: string) {
    const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('id', slug)
        .eq('is_active', true)
        .maybeSingle();
    return data;
}

async function getNiche(slug: string) {
    const { data } = await supabase
        .from('niches')
        .select('*')
        .eq('id', slug)
        .eq('is_active', true)
        .maybeSingle();
    return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.page?.join("/") || "");
    const content = await getBuilderContent(urlPath, "page");

    if (content) {
        return {
            title: content.data?.title || "Engaged Headhunters",
            description: content.data?.description,
            openGraph: {
                title: content.data?.title,
                description: content.data?.description,
                images: content.data?.image ? [{ url: content.data.image }] : [],
            },
        };
    }

    // Fallback to location-based metadata if it's a single segment
    if (resolvedParams.page?.length === 1) {
        const location = await getLocation(resolvedParams.page[0]);
        if (location) {
            const title = `${location.display_name} Recruiting & Executive Search | Engaged Headhunters`;
            return {
                title,
                description: location.description || `Expert recruiting and executive search services in ${location.display_name}.`,
            };
        }
    }

    return {};
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.page?.join("/") || "");

    // 1. Try Builder content first
    const content = await getBuilderContent(urlPath, "page");
    if (content) {
        return <RenderBuilderContent content={content} model="page" />;
    }

    // 2. Fallback to location/niche dynamic pages if it's a single segment
    if (resolvedParams.page?.length === 1) {
        const slug = resolvedParams.page[0];
        const location = await getLocation(slug);

        if (location) {
            // We use NichePageClient as a generic template for now, 
            // but we could create a LocationPageClient if needed.
            return <NichePageClient />;
        }

        const niche = await getNiche(slug);
        if (niche) {
            return <NichePageClient />;
        }
    }

    // 3. 404 if nothing found
    notFound();
}

// Ensure results are not cached indefinitely
export const revalidate = 1;
