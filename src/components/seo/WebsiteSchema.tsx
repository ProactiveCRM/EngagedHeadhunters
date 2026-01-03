const BASE_URL = 'https://www.engagedheadhunters.com';

interface WebsiteSchemaProps {
  searchUrl?: string;
}

export const WebsiteSchema = ({ searchUrl = `${BASE_URL}/search?q=` }: WebsiteSchemaProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Engaged Headhunters',
    alternateName: 'Engaged Headhunters Executive Search',
    url: BASE_URL,
    description: 'Elite executive search firm connecting top companies with transformational leaders in healthcare, technology, finance, and manufacturing.',
    publisher: {
      '@type': 'Organization',
      name: 'Engaged Headhunters',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png`,
        width: 600,
        height: 60,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.linkedin.com/company/engaged-headhunters',
      'https://twitter.com/engagedheadhunters',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default WebsiteSchema;

