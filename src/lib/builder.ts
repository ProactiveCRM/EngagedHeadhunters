import { builder } from "@builder.io/sdk";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

// During build time on Vercel, the API key might be missing. 
// We provide a placeholder to prevent the SDK from crashing during initialization.
// The actual fetch utilities will check for this placeholder and skip network calls.
const safeApiKey = apiKey || "placeholder-key-for-build";

builder.init(safeApiKey);

export { builder };
export default builder;
