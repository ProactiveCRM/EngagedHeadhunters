"use client";
import { BuilderComponent, builder } from "@builder.io/react";
import "./builder-registry";
import "@builder.io/widgets"; // Import standard widgets

// Initialize builder with the public key
if (!builder.apiKey) {
    builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
}

interface BuilderPageProps {
    content: any;
    model: string;
}

export function RenderBuilderContent({ content, model }: BuilderPageProps) {
    // If content is found or we are in editing mode, render the BuilderComponent
    if (content || builder.editingMode) {
        return <BuilderComponent content={content} model={model} />;
    }

    return null;
}
