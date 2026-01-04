import { builder } from "@builder.io/sdk";

if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
    // We'll throw an error in development if the key is missing
    // but in production, we might want to handle it more gracefully
    if (process.env.NODE_ENV === "development") {
        console.warn("NEXT_PUBLIC_BUILDER_API_KEY is not set. Please add it to your .env.local file.");
    }
}

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default builder;
