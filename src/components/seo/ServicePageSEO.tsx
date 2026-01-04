"use client";
import { SEOHead } from './SEOHead';
import { SERVICE_SEO_DATA } from '@/lib/seoConfig';
import { generateBreadcrumbSchema } from '@/hooks/useSEOData';

interface ServicePageSEOProps {
  serviceKey: string;
}

export const ServicePageSEO = ({ serviceKey }: ServicePageSEOProps) => {
  const seoData = SERVICE_SEO_DATA[serviceKey];

  if (!seoData) {
    return null;
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: seoData.title,
    name: seoData.title,
    description: seoData.description,
    provider: {
      '@type': 'Organization',
      name: 'Engaged Headhunters',
      url: 'https://www.engagedheadhunters.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    url: `https://www.engagedheadhunters.com/${serviceKey}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: seoData.title, url: `/${serviceKey}` },
  ]);

  return (
    <SEOHead
      title={seoData.title}
      description={seoData.description}
      canonical={`/${serviceKey}`}
      type="service"
      keywords={seoData.keywords.join(', ')}
    >
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </SEOHead>
  );
};

export default ServicePageSEO;
