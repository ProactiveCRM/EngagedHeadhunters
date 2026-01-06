import { builder } from "@builder.io/sdk";
import { env } from "@/lib/env";

const apiKey = env.NEXT_PUBLIC_BUILDER_API_KEY;

// Use the validated API key (could be the placeholder during build)
builder.init(apiKey);

export { builder };
export default builder;
