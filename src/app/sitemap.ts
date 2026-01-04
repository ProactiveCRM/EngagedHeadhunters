import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.engagedheadhunters.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/services',
        '/employers',
        '/candidates',
        '/for-recruiters',
        '/salary-guide',
        '/alliance',
        '/case-studies',
        '/blog',
        '/contact',
        '/submit-resume',
        '/privacy-policy',
        '/terms-of-service',
        '/healthcare-staffing',
        '/technology-recruiting',
        '/finance-recruiting',
        '/manufacturing-recruiting',
        '/executive-search',
        '/contract-staffing',
        '/temporary-staffing',
        '/sales-recruiting',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
