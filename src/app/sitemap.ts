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
        '/niches/healthcare',
        '/niches/technology',
        '/niches/finance',
        '/niches/manufacturing',
        '/niches/sales',
        '/services/executive-search',
        '/services/contract-staffing',
        '/services/temporary-staffing',
        '/services/healthcare-staffing',
        '/services/technology-recruiting',
        '/services/finance-recruiting',
        '/services/manufacturing-recruiting',
        '/services/sales-recruiting',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
