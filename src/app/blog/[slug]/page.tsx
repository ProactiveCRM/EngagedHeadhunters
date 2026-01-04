import { Metadata, ResolvingMetadata } from 'next';
import BlogPostClient from '@/components/pages/BlogPostClient';
import { supabase } from '@/integrations/supabase/client';
import { getBuilderContent, mergeBuilderMetadata } from "@/lib/builder-fetch";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    // First try fetching from Builder for metadata
    const urlPath = `/blog/${slug}`;
    const builderPost = await getBuilderContent(urlPath, "blog-post");

    // Fallback to Supabase for SEO metadata
    const { data: post } = await supabase
        .from('blog_posts')
        .select(`
      title,
      excerpt,
      content,
      featured_image,
      slug,
      id
    `)
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .eq('published', true)
        .maybeSingle();

    if (!post) {
        const fallbackMetadata: Metadata = {
            title: 'Article Not Found | Engaged Headhunters',
            description: 'The requested blog article could not be found.',
        };
        return mergeBuilderMetadata(builderPost, fallbackMetadata);
    }

    const title = `${post.title} | Engaged Headhunters Blog`;
    const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');
    const image = post.featured_image || 'https://www.engagedheadhunters.com/og-image.jpg';
    const url = `https://www.engagedheadhunters.com/blog/${post.slug || post.id}`;

    const supabaseMetadata: Metadata = {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            images: [{ url: image }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };

    return mergeBuilderMetadata(builderPost, supabaseMetadata);
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const urlPath = `/blog/${slug}`;

    // Check Builder for individual blog post content
    const content = await getBuilderContent(urlPath, "blog-post");

    if (content) {
        return <RenderBuilderContent content={content} model="blog-post" />;
    }

    return <BlogPostClient />;
}

export const revalidate = 1;
