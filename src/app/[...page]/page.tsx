import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuilderContent } from "@/lib/builder-fetch";

interface PageProps {
    params: Promise<{
        page: string[];
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.page?.join("/") || "");
    const content = await getBuilderContent(urlPath, "page");

    if (!content) {
        return {};
    }

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

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.page?.join("/") || "");

    // Fetch the builder content for the current page using the protected utility
    const content = await getBuilderContent(urlPath, "page");

    // If no content is found, and this is a catch-all route, we should 404
    if (!content) {
        notFound();
    }

    return (
        <>
            {/* Render the Builder content */}
            <RenderBuilderContent content={content} model="page" />
        </>
    );
}

// Ensure results are not cached indefinitely
export const revalidate = 1;
