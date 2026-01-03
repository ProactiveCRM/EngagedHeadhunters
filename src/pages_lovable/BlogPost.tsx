import { useState, useEffect } from 'react';
import { useParams,  , useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StickyCTA from '../components/StickyCTA';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import { BlogPostSEO } from '@/components/seo';

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  slug: string | null;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
  author: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

const getCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'recruiting':
    case 'recruiting-tips':
      return 'from-primary to-navy';
    case 'branding':
    case 'employer-branding':
    case 'company-culture':
      return 'from-accent to-primary';
    case 'engagement':
    case 'career-advice':
      return 'from-primary/80 to-accent/80';
    case 'industry-insights':
    case 'market-trends':
      return 'from-navy to-primary';
    case 'leadership':
      return 'from-accent/90 to-navy';
    default:
      return 'from-primary to-navy';
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useRouter();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      // Try to find by slug first, then by id
      let { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          content,
          excerpt,
          category,
          slug,
          featured_image,
          created_at,
          updated_at,
          author:profiles!author_id(full_name, avatar_url)
        `)
        .eq('published', true)
        .eq('slug', slug)
        .maybeSingle();

      // If not found by slug, try by id
      if (!data && !error) {
        const { data: dataById, error: errorById } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            excerpt,
            category,
            slug,
            featured_image,
            created_at,
            updated_at,
            author:profiles!author_id(full_name, avatar_url)
          `)
          .eq('published', true)
          .eq('id', slug)
          .maybeSingle();
        
        data = dataById;
        error = errorById;
      }

      if (error) {
        console.error('Error fetching post:', error);
      }

      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-64 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogPostSEO slug={post.slug || post.id} />

      <Navigation />
      <StickyCTA />

      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {post.category.replace('-', ' ')}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center">
                <User className="mr-2" size={18} />
                <span>{post.author?.full_name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" size={18} />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={18} />
                <span>{estimateReadTime(post.content)}</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_image ? (
              <img 
                src={post.featured_image} 
                alt={post.title}
                loading="lazy"
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            ) : (
              <div className={`w-full h-64 md:h-96 bg-gradient-to-br ${getCategoryGradient(post.category)} rounded-xl flex items-center justify-center`}>
                <span className="text-white/70 text-xl font-medium capitalize">{post.category.replace('-', ' ')}</span>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t">
            <SocialShareButtons 
              url={`https://www.engagedheadhunters.com/blog/${post.slug || post.id}`}
              title={post.title}
              description={post.excerpt || post.content.substring(0, 160)}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
              >
                <ArrowLeft className="mr-2" size={16} />
                More Articles
              </Link>
              
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
