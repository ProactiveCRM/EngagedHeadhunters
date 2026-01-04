"use client";

import { SEOHead } from './SEOHead';
import { CAREER_SEO_DATA, CAREER_FAQ_DATA } from '@/lib/seoConfig';
import { generateBreadcrumbSchema } from '@/hooks/useSEOData';
import FAQSchema from './FAQSchema';

interface CareerPageSEOProps {
  careerKey: string;
}

export const CareerPageSEO = ({ careerKey }: CareerPageSEOProps) => {
  const seoData = CAREER_SEO_DATA[careerKey];
  const faqData = CAREER_FAQ_DATA[careerKey];

  if (!seoData) {
    return null;
  }

  const jobPostingListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: seoData.title,
    description: seoData.description,
    url: `https://www.engagedheadhunters.com/${careerKey}`,
    itemListElement: [],
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: seoData.title, url: `/${careerKey}` },
  ]);

  return (
    <>
      <SEOHead
        title={`${seoData.title} | Engaged Headhunters`}
        description={seoData.description}
        canonical={`/${careerKey}`}
        type="website"
        keywords={seoData.keywords.join(', ')}
      >
        <script type="application/ld+json">
          {JSON.stringify(jobPostingListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </SEOHead>
      {faqData && faqData.length > 0 && <FAQSchema faqs={faqData} />}
    </>
  );
};

export default CareerPageSEO;
