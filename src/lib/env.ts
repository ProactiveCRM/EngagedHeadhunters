// Trigger fresh deployment build
import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://placeholder.supabase.co"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder-anon-key"),
    NEXT_PUBLIC_BUILDER_API_KEY: z.string().optional().default("placeholder-key-for-build"),
});

const processEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_BUILDER_API_KEY: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
    console.warn(
        "⚠️ Missing or invalid environment variables. Using placeholder values for build:",
        JSON.stringify(parsed.error.format(), null, 2)
    );
}

export const env = parsed.success ? parsed.data : envSchema.parse({});
