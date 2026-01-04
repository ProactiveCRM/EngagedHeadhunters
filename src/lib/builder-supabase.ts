import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the latest published blog posts from Supabase.
 */
export async function getLatestBlogPosts(limit: number = 3) {
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching latest blog posts:", error);
        return [];
    }
    return data;
}

/**
 * Fetches active job orders from Supabase.
 */
export async function getActiveJobs(limit: number = 5) {
    const { data, error } = await supabase
        .from("job_orders")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching active jobs:", error);
        return [];
    }
    return data;
}

/**
 * Fetches featured recruiters (directory listings).
 */
export async function getFeaturedRecruiters(limit: number = 4) {
    const { data, error } = await supabase
        .from("directory_listings")
        .select(`
            *,
            profiles:profile_id (*)
        `)
        .eq("is_featured", true)
        .eq("is_visible", true)
        .limit(limit);

    if (error) {
        console.error("Error fetching featured recruiters:", error);
        return [];
    }
    return data;
}
