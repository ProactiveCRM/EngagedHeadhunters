import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/auth/', '/admin/', '/api/'],
        },
        sitemap: 'https://www.engagedheadhunters.com/sitemap.xml',
    };
}
