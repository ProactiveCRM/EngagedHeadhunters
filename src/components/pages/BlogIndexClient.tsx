"use client";

import { Search, Calendar, User, ArrowRight, TrendingUp, Users, Briefcase, PenLine, Loader2, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { newsletterSchema } from '@/lib/validation';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    category: string;
    slug: string | null;
    featured: boolean | null;
    featured_image: string | null;
    published: boolean | null;
    created_at: string;
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

const BlogIndexClient = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const { user } = useAuth();
    const { toast } = useToast();

    const categories = [
        { slug: 'all', name: 'All Posts', icon: TrendingUp },
        { slug: 'recruiting', name: 'Recruiting', icon: Users },
        { slug: 'branding', name: 'Employer Branding', icon: Briefcase },
        { slug: 'engagement', name: 'Candidate Engagement', icon: User }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select(`
          id,
          title,
          excerpt,
          content,
          category,
          slug,
          featured,
          featured_image,
          published,
          created_at,
          author:profiles!author_id(full_name, avatar_url)
        `)
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = newsletterSchema.safeParse({ email: newsletterEmail });
        if (!validation.success) {
            toast({
                title: 'Invalid email',
                description: validation.error.errors[0]?.message || 'Please enter a valid email',
                variant: 'destructive',
            });
            return;
        }

        setIsSubscribing(true);

        try {
            const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
                body: { email: newsletterEmail, source_page: 'blog' },
            });

            if (error) throw error;

            if (data?.already_subscribed) {
                toast({
                    title: 'Already subscribed',
                    description: "You're already on our newsletter list!",
                });
            } else {
                setIsSubscribed(true);
                toast({
                    title: 'Subscribed!',
                    description: 'Thanks for subscribing to our newsletter.',
                });
            }
            setNewsletterEmail('');
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            toast({
                title: 'Subscription failed',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setIsSubscribing(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        return matchesCategory && matchesSearch;
    });

    const featuredPost = posts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Strip HTML tags for plain text operations
    const stripHtml = (html: string) => {
        if (typeof window === 'undefined') return html;
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const estimateReadTime = (content: string) => {
        const plainText = stripHtml(content);
        const words = plainText.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    // Get plain text excerpt for display
    const getExcerpt = (post: BlogPost) => {
        if (post.excerpt) {
            return stripHtml(post.excerpt);
        }
        return stripHtml(post.content).substring(0, 150) + '...';
    };

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <Navigation />
            <StickyCTA />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-20 bg-primary text-primary-foreground text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                                Executive Search Insights & Intelligence
                            </h1>
                            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto">
                                Industry insights, recruiting strategies, and thought leadership from our team of executive search experts.
                                Stay ahead of trends that impact executive recruitment and organizational leadership.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search and Categories */}
                <section className="py-8 bg-muted/30 border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:w-96 text-left">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => {
                                    const IconComponent = category.icon;
                                    return (
                                        <button
                                            key={category.slug}
                                            onClick={() => setSelectedCategory(category.slug)}
                                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.slug
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-background border hover:bg-muted text-foreground'
                                                }`}
                                        >
                                            <IconComponent className="mr-2" size={16} />
                                            {category.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Loading State */}
                {loading && (
                    <section className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="animate-spin text-primary" size={40} />
                            </div>
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {!loading && posts.length === 0 && (
                    <section className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-bold text-foreground mb-4">No articles published yet</h2>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Check back soon for insights on executive search, talent acquisition, and industry trends.
                                </p>
                                {user && (
                                    <Link
                                        href="/agent/blog"
                                        className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                    >
                                        <PenLine className="mr-2" size={18} />
                                        Write Your First Post
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Post */}
                {!loading && featuredPost && selectedCategory === 'all' && !searchTerm && (
                    <section className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-foreground mb-4">Featured Article</h2>
                            </div>

                            <div className="bg-card text-card-foreground rounded-xl shadow-lg border border-border overflow-hidden text-left">
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div className="p-8">
                                        <div className="flex items-center mb-4">
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mr-3">
                                                Featured
                                            </span>
                                            <span className="text-muted-foreground capitalize">{featuredPost.category}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-foreground mb-4">{featuredPost.title}</h3>
                                        <p className="text-muted-foreground mb-6">{getExcerpt(featuredPost)}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <User className="mr-2" size={16} />
                                                <span className="mr-4">{featuredPost.author?.full_name || 'Anonymous'}</span>
                                                <Calendar className="mr-2" size={16} />
                                                <span className="mr-4">{formatDate(featuredPost.created_at)}</span>
                                                <span>{estimateReadTime(featuredPost.content)}</span>
                                            </div>
                                            <Link
                                                href={`/blog/${featuredPost.slug || featuredPost.id}`}
                                                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
                                            >
                                                Read More
                                                <ArrowRight className="ml-2" size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="lg:p-8">
                                        {featuredPost.featured_image ? (
                                            <img
                                                src={featuredPost.featured_image}
                                                alt={featuredPost.title}
                                                className="w-full h-64 lg:h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className={`w-full h-64 lg:h-full bg-gradient-to-br ${getCategoryGradient(featuredPost.category)} rounded-lg flex items-center justify-center`}>
                                                <span className="text-white/70 text-lg font-medium capitalize">{featuredPost.category.replace('-', ' ')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Blog Posts Grid */}
                {!loading && posts.length > 0 && (
                    <section className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {regularPosts.length > 0 ? (
                                <>
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl font-bold text-foreground mb-4">
                                            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.slug === selectedCategory)?.name} Articles`}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Showing {regularPosts.length} article{regularPosts.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                                        {regularPosts.map((post) => (
                                            <article key={post.id} className="bg-card text-card-foreground rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow text-left">
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                ) : (
                                                    <div className={`w-full h-48 bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center`}>
                                                        <span className="text-white/70 text-sm font-medium capitalize">{post.category.replace('-', ' ')}</span>
                                                    </div>
                                                )}
                                                <div className="p-6">
                                                    <div className="flex items-center mb-3 text-left">
                                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium capitalize">
                                                            {post.category}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-3">{getExcerpt(post)}</p>

                                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                        <div className="flex items-center">
                                                            <User className="mr-1" size={14} />
                                                            <span>{post.author?.full_name || 'Anonymous'}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Calendar className="mr-1" size={14} />
                                                            <span>{formatDate(post.created_at)}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-border">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-muted-foreground">{estimateReadTime(post.content)}</span>
                                                            <Link
                                                                href={`/blog/${post.slug || post.id}`}
                                                                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-sm"
                                                            >
                                                                Read More
                                                                <ArrowRight className="ml-1" size={14} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Newsletter CTA */}
                <section className="py-20 bg-primary text-primary-foreground text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            Stay Ahead of Recruiting Trends
                        </h2>
                        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                            Get weekly insights on executive search, talent acquisition strategies, and industry trends
                            delivered directly to your inbox.
                        </p>

                        {isSubscribed ? (
                            <div className="flex items-center justify-center text-primary-foreground">
                                <CheckCircle className="mr-2" size={24} />
                                <span className="text-lg font-semibold text-white">Thanks for subscribing! Check your inbox.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground border-border"
                                    disabled={isSubscribing}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubscribing}
                                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    {isSubscribing ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        'Subscribe'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogIndexClient;
