import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/auth/', '/admin/', '/api/'],
            },
            {
                userAgent: ['GPTBot', 'Claude-Web', 'CCBot', 'PerplexityBot'],
                allow: '/',
            }
        ],
        sitemap: 'https://www.engagedheadhunters.com/sitemap.xml',
    };
}
