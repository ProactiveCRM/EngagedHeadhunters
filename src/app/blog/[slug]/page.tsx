import { Metadata, ResolvingMetadata } from 'next';
import BlogPostClient from '@/components/pages/BlogPostClient';
import { supabase } from '@/integrations/supabase/client';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    // Fetch the blog post for SEO metadata
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
        return {
            title: 'Article Not Found | Engaged Headhunters',
            description: 'The requested blog article could not be found.',
        };
    }

    const title = `${post.title} | Engaged Headhunters Blog`;
    const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');
    const image = post.featured_image || 'https://www.engagedheadhunters.com/og-image.jpg';
    const url = `https://www.engagedheadhunters.com/blog/${post.slug || post.id}`;

    return {
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
}

export default function BlogPostPage() {
    return <BlogPostClient />;
}
