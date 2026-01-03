import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types for SEO data
export interface NicheSEO {
  id: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface AgentSEO {
  id: string;
  username: string;
  full_name: string | null;
  title: string | null;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  niche: string | null;
  specialties: string[] | null;
  years_experience: number | null;
  company: string | null;
  linkedin_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  placements_count: number | null;
}

export interface BlogPostSEO {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string;
  category: string;
  featured_image: string | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
  author: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface TargetMarketSEO {
  id: string;
  display_name: string;
  description: string | null;
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

export interface DirectoryListingSEO {
  id: string;
  listing_title: string | null;
  listing_description: string | null;
  niche: string;
  target_market: string;
  is_featured: boolean | null;
  profile: AgentSEO | null;
}

// SEO keyword mappings for niches
const nicheKeywords: Record<string, string[]> = {
  'healthcare': ['healthcare recruiting', 'medical staffing', 'nurse recruiters', 'physician placement', 'healthcare jobs', 'medical careers'],
  'technology': ['tech recruiting', 'IT staffing', 'software developer jobs', 'engineering recruiters', 'tech talent', 'IT careers'],
  'finance': ['finance recruiting', 'accounting staffing', 'financial services jobs', 'CFO search', 'banking careers', 'finance talent'],
  'manufacturing': ['manufacturing recruiting', 'industrial staffing', 'plant manager jobs', 'operations talent', 'supply chain careers'],
  'sales': ['sales recruiting', 'sales staffing', 'account executive jobs', 'sales leadership', 'revenue talent'],
  'executive': ['executive search', 'C-suite recruiting', 'CEO placement', 'leadership hiring', 'executive talent'],
};

// Transform niche data for SEO
export const transformNicheForSEO = (niche: { id: string; display_name: string; description: string | null; icon: string | null }): NicheSEO => ({
  ...niche,
  slug: niche.id,
  metaTitle: `${niche.display_name} Recruiters & Staffing | Engaged Headhunters`,
  metaDescription: niche.description || `Find top ${niche.display_name.toLowerCase()} recruiters and staffing specialists. Expert talent acquisition for ${niche.display_name.toLowerCase()} industry positions.`,
  keywords: nicheKeywords[niche.id] || [`${niche.display_name.toLowerCase()} recruiting`, `${niche.display_name.toLowerCase()} staffing`],
});

// Transform target market for SEO
export const transformMarketForSEO = (market: { id: string; display_name: string; description: string | null }): TargetMarketSEO => ({
  ...market,
  slug: market.id,
  metaTitle: `Recruiting Services for ${market.display_name} | Engaged Headhunters`,
  metaDescription: market.description || `Expert recruiting and staffing solutions for ${market.display_name.toLowerCase()}. Find top talent or your next career opportunity.`,
});

// Hook to fetch all niches with SEO data
export const useNichesSEO = () => {
  return useQuery({
    queryKey: ['niches-seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('niches')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return (data || []).map(transformNicheForSEO);
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};

// Hook to fetch single niche with SEO data
export const useNicheSEO = (nicheId: string) => {
  return useQuery({
    queryKey: ['niche-seo', nicheId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('niches')
        .select('*')
        .eq('id', nicheId)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return transformNicheForSEO(data);
    },
    enabled: !!nicheId,
    staleTime: 1000 * 60 * 30,
  });
};

// Hook to fetch all target markets with SEO data
export const useMarketsSEO = () => {
  return useQuery({
    queryKey: ['markets-seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('target_markets')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return (data || []).map(transformMarketForSEO);
    },
    staleTime: 1000 * 60 * 30,
  });
};

// Hook to fetch agents with SEO data
export const useAgentsSEO = () => {
  return useQuery({
    queryKey: ['agents-seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'agent')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as AgentSEO[];
    },
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
};

// Hook to fetch single agent with SEO data
export const useAgentSEO = (username: string) => {
  return useQuery({
    queryKey: ['agent-seo', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (error) throw error;
      return data as AgentSEO | null;
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 15,
  });
};

// Hook to fetch published blog posts with SEO data
export const useBlogPostsSEO = () => {
  return useQuery({
    queryKey: ['blog-posts-seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch author profiles
      if (data && data.length > 0) {
        const authorIds = [...new Set(data.map(p => p.author_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', authorIds);

        return data.map(post => ({
          ...post,
          author: profiles?.find(p => p.id === post.author_id) || null,
        })) as BlogPostSEO[];
      }
      
      return [] as BlogPostSEO[];
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

// Hook to fetch single blog post with SEO data
export const useBlogPostSEO = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post-seo', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Fetch author
      const { data: author } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', data.author_id)
        .maybeSingle();

      return {
        ...data,
        author,
      } as BlogPostSEO;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
};

// Hook to fetch directory listings with SEO data
export const useDirectoryListingsSEO = (filters?: { niche?: string; market?: string }) => {
  return useQuery({
    queryKey: ['directory-listings-seo', filters],
    queryFn: async () => {
      let query = supabase
        .from('directory_listings')
        .select(`
          *,
          profiles:profile_id (
            id, username, full_name, title, headline, bio, 
            avatar_url, location, niche, specialties, 
            years_experience, company, rating, reviews_count
          )
        `)
        .eq('is_visible', true)
        .order('is_featured', { ascending: false })
        .order('display_order', { ascending: true });

      if (filters?.niche) {
        query = query.eq('niche', filters.niche);
      }
      if (filters?.market) {
        query = query.eq('target_market', filters.market);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map(listing => ({
        ...listing,
        profile: listing.profiles as AgentSEO | null,
      })) as DirectoryListingSEO[];
    },
    staleTime: 1000 * 60 * 15,
  });
};

// Utility to generate Person schema from agent data
export const generatePersonSchema = (agent: AgentSEO) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: agent.full_name || agent.username,
  jobTitle: agent.title || 'Recruiting Professional',
  description: agent.bio || agent.headline,
  image: agent.avatar_url,
  url: `https://www.engagedheadhunters.com/${agent.username}`,
  worksFor: {
    '@type': 'Organization',
    name: agent.company || 'Engaged Headhunters',
  },
  address: agent.location ? {
    '@type': 'PostalAddress',
    addressLocality: agent.location,
  } : undefined,
  sameAs: agent.linkedin_url ? [agent.linkedin_url] : undefined,
  knowsAbout: agent.specialties || [],
});

// Utility to generate Article schema from blog post
export const generateArticleSchema = (post: BlogPostSEO) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  image: post.featured_image,
  datePublished: post.created_at,
  dateModified: post.updated_at,
  author: {
    '@type': 'Person',
    name: post.author?.full_name || 'Engaged Headhunters',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Engaged Headhunters',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.engagedheadhunters.com/blog/${post.slug}`,
  },
});

// Utility to generate Service schema from niche
export const generateServiceSchema = (niche: NicheSEO) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: `${niche.display_name} Recruiting`,
  name: `${niche.display_name} Staffing & Recruiting Services`,
  description: niche.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'Engaged Headhunters',
    url: 'https://www.engagedheadhunters.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  url: `https://www.engagedheadhunters.com/niches/${niche.slug}`,
});

// Utility to generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://www.engagedheadhunters.com${item.url}`,
  })),
});

// Utility to generate sitemap entries from database
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemapEntries = async (): Promise<SitemapEntry[]> => {
  const entries: SitemapEntry[] = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/employers', changefreq: 'weekly', priority: 0.9 },
    { url: '/candidates', changefreq: 'weekly', priority: 0.9 },
    { url: '/services', changefreq: 'weekly', priority: 0.9 },
    { url: '/agents', changefreq: 'daily', priority: 0.8 },
    { url: '/niches', changefreq: 'weekly', priority: 0.8 },
    { url: '/blog', changefreq: 'daily', priority: 0.8 },
    { url: '/careers', changefreq: 'weekly', priority: 0.8 },
    { url: '/locations', changefreq: 'monthly', priority: 0.7 },
    { url: '/alliance', changefreq: 'monthly', priority: 0.7 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  ];

  // Fetch niches
  const { data: niches } = await supabase.from('niches').select('id');
  niches?.forEach(niche => {
    entries.push({ url: `/niches/${niche.id}`, changefreq: 'weekly', priority: 0.7 });
  });

  // Fetch active agents
  const { data: agents } = await supabase
    .from('profiles')
    .select('username')
    .eq('role', 'agent')
    .eq('is_active', true);
  agents?.forEach(agent => {
    entries.push({ url: `/${agent.username}`, changefreq: 'weekly', priority: 0.6 });
  });

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true);
  posts?.forEach(post => {
    if (post.slug) {
      entries.push({ 
        url: `/blog/${post.slug}`, 
        lastmod: post.updated_at,
        changefreq: 'monthly', 
        priority: 0.6 
      });
    }
  });

  return entries;
};

export default {
  useNichesSEO,
  useNicheSEO,
  useMarketsSEO,
  useAgentsSEO,
  useAgentSEO,
  useBlogPostsSEO,
  useBlogPostSEO,
  useDirectoryListingsSEO,
  generatePersonSchema,
  generateArticleSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateSitemapEntries,
};
