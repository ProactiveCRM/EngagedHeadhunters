import { SEOHead } from './SEOHead';
import { useBlogPostSEO, generateArticleSchema, generateBreadcrumbSchema } from '@/hooks/useSEOData';

interface BlogPostSEOProps {
  slug: string;
}

export const BlogPostSEO = ({ slug }: BlogPostSEOProps) => {
  const { data: post, isLoading } = useBlogPostSEO(slug);

  if (isLoading || !post) {
    return null;
  }

  const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog?category=${post.category}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <SEOHead
      title={post.title}
      description={description}
      canonical={`/blog/${post.slug}`}
      type="article"
      image={post.featured_image || undefined}
      author={post.author?.full_name || 'Engaged Headhunters'}
      publishedTime={post.created_at}
      modifiedTime={post.updated_at}
      keywords={post.category}
    >
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </SEOHead>
  );
};

export default BlogPostSEO;
