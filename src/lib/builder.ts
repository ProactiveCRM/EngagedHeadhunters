import { builder } from "@builder.io/sdk";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
        console.warn("NEXT_PUBLIC_BUILDER_API_KEY is not set. Please add it to your .env.local file.");
    }
} else {
    builder.init(apiKey);
}

export default builder;
