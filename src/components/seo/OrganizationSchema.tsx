const BASE_URL = 'https://www.engagedheadhunters.com';

export const OrganizationSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Engaged Headhunters",
    "url": BASE_URL,
    "logo": `${BASE_URL}/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png`,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-757-720-7173",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "249 Central Park Ave Suite 300-90",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA",
      "postalCode": "23462",
      "addressCountry": "US"
    },
    "description": "Engaged Headhunters is an elite executive search and recruiting firm specializing in leadership placements across healthcare, technology, finance, and manufacturing.",
    "brand": {
      "@type": "Brand",
      "name": "Build Don't Beg (BDB)"
    },
    "founder": {
      "@type": "Person",
      "name": "James Pemberton"
    },
    "foundingDate": "2022"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default OrganizationSchema;