import { builder } from "@/lib/builder";
import { Metadata } from "next";

/**
 * Fetches content from Builder.io for a specific path and model.
 */
export async function getBuilderContent(urlPath: string, model: string = "page") {
    // Skip if no real API key is present
    if (!builder.apiKey || builder.apiKey === "placeholder-key-for-build") {
        if (process.env.NODE_ENV === "development") {
            console.warn(`Builder API key is missing. Skipping fetch for ${urlPath}`);
        }
        return null;
    }

    try {
        const content = await builder
            .get(model, {
                userAttributes: {
                    urlPath,
                },
                prerender: false,
            })
            .toPromise();
        return content;
    } catch (error) {
        console.error(`Error fetching Builder content for ${urlPath}:`, error);
        return null;
    }
}

/**
 * Fetches global content from Builder.io (e.g. "navbar", "footer").
 * This allows managing these elements as "symbols" in the Builder dashboard.
 */
export async function getBuilderSymbol(model: string) {
    // Skip if no real API key is present
    if (!builder.apiKey || builder.apiKey === "placeholder-key-for-build") {
        return null;
    }

    try {
        const content = await builder
            .get(model, {
                prerender: false,
            })
            .toPromise();
        return content || null;
    } catch (error) {
        console.error(`Error fetching Builder symbol for ${model}:`, error);
        return null;
    }
}

/**
 * Merges Builder content data into existing metadata.
 */
export function mergeBuilderMetadata(content: any, fallback: Metadata): Metadata {
    if (!content?.data) return fallback;

    const { title, description, image } = content.data;

    return {
        ...fallback,
        title: title || fallback.title,
        description: description || fallback.description,
        openGraph: {
            ...fallback.openGraph,
            title: title || fallback.openGraph?.title,
            description: description || fallback.openGraph?.description,
            images: image ? [{ url: image }] : fallback.openGraph?.images,
        },
        twitter: {
            ...fallback.twitter,
            title: title || fallback.twitter?.title,
            description: description || fallback.twitter?.description,
            images: image ? [image] : fallback.twitter?.images,
        },
    };
}
