import { SEOHead } from './SEOHead';
import { useNicheSEO, generateServiceSchema, generateBreadcrumbSchema } from '@/hooks/useSEOData';

interface NicheSEOProps {
  nicheId: string;
  customTitle?: string;
  customDescription?: string;
}

export const NicheSEO = ({ nicheId, customTitle, customDescription }: NicheSEOProps) => {
  const { data: niche, isLoading } = useNicheSEO(nicheId);

  if (isLoading || !niche) {
    return null;
  }

  const title = customTitle || niche.metaTitle;
  const description = customDescription || niche.metaDescription;

  const serviceSchema = generateServiceSchema(niche);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Niches', url: '/niches' },
    { name: niche.display_name, url: `/niches/${niche.slug}` },
  ]);

  return (
    <SEOHead
      title={title}
      description={description}
      canonical={`/niches/${niche.slug}`}
      type="service"
      keywords={niche.keywords.join(', ')}
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

export default NicheSEO;
