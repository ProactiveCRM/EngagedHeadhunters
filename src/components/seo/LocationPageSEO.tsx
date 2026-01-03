import { SEOHead } from './SEOHead';
import { LOCATION_SEO_DATA, SEO_CONFIG } from '@/lib/seoConfig';
import { generateBreadcrumbSchema } from '@/hooks/useSEOData';

interface LocationPageSEOProps {
  locationKey: string;
}

export const LocationPageSEO = ({ locationKey }: LocationPageSEOProps) => {
  const seoData = LOCATION_SEO_DATA[locationKey];

  if (!seoData) {
    return null;
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: `Engaged Headhunters - ${seoData.title.split(' ')[0]}`,
    description: seoData.description,
    url: `${SEO_CONFIG.siteUrl}/${locationKey}`,
    telephone: SEO_CONFIG.telephone,
    email: SEO_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoData.title.split(' ')[0],
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seoData.geo.lat,
      longitude: seoData.geo.lng,
    },
    areaServed: {
      '@type': 'City',
      name: seoData.title.split(' ')[0],
    },
    priceRange: '$$',
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: seoData.title.split(' ')[0], url: `/${locationKey}` },
  ]);

  return (
    <SEOHead
      title={seoData.title}
      description={seoData.description}
      canonical={`/${locationKey}`}
      type="website"
      keywords={seoData.keywords.join(', ')}
    >
      <meta name="geo.position" content={`${seoData.geo.lat};${seoData.geo.lng}`} />
      <meta name="geo.placename" content={seoData.title.split(' ')[0]} />
      <meta name="geo.region" content="US-TX" />
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </SEOHead>
  );
};

export default LocationPageSEO;
