"use client";

import React, { useState, useEffect } from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import "./builder-registry";
import "@builder.io/widgets"; // Import standard widgets
import ErrorBoundary from "@/components/ErrorBoundary";

interface BuilderPageProps {
    content: any;
    model: string;
}

export function RenderBuilderContent({ content, model }: BuilderPageProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If content is found or we are in editing mode, render the BuilderComponent
    if (content || builder.editingMode) {
        return (
            <ErrorBoundary>
                {isMounted || builder.editingMode ? (
                    <BuilderComponent content={content} model={model} />
                ) : (
                    null
                )}
            </ErrorBoundary>
        );
    }

    return null;
}
