import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_BUILDER_API_KEY: z.string().optional().default("placeholder-key-for-build"),
});

const processEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_BUILDER_API_KEY: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
    console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsed.error.format(), null, 2)
    );
    // During build time on Vercel, we might want to warn instead of throw 
    // if some keys are only needed at runtime, but for Supabase it's critical.
}

export const env = parsed.success ? parsed.data : processEnv as z.infer<typeof envSchema>;
