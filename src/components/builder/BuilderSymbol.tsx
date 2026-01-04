"use client";

import { useEffect, useState } from "react";
import { getBuilderSymbol } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "./RenderBuilderContent";

interface BuilderSymbolProps {
    model: string;
    fallback: React.ReactNode;
}

/**
 * Fetches and renders a Builder.io symbol with a fallback to a React component.
 * Use this for global elements like Navbar and Footer.
 */
export function BuilderSymbol({ model, fallback }: BuilderSymbolProps) {
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSymbol() {
            try {
                const result = await getBuilderSymbol(model);
                setContent(result);
            } catch (error) {
                console.error(`Error loading Builder symbol ${model}:`, error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSymbol();
    }, [model]);

    // During loading, show the hardcoded fallback to prevent layout shift/empty state
    if (isLoading || !content) {
        return <>{fallback}</>;
    }

    return <RenderBuilderContent content={content} model={model} />;
}
