import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Initialize builder with the public key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
    params: Promise<{
        page: string[];
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.page?.join("/") || "");
    const content = await builder
        .get("page", {
            userAttributes: {
                urlPath,
            },
        })
        .toPromise();

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

    // Fetch the builder content for the current page
    const content = await builder
        .get("page", {
            userAttributes: {
                urlPath,
            },
            // Set prerender to false to prevent errors if the key is missing during build
            // or if you want to handle missing content dynamically
            prerender: false,
        })
        .toPromise();

    // If no content is found, and this is a catch-all route, we should 404
    // unless we have another fallback mechanism.
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
