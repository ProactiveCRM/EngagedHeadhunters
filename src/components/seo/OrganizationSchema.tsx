import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  includeAggregateRating?: boolean;
}

const OrganizationSchema = ({ includeAggregateRating = true }: OrganizationSchemaProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Engaged Headhunters",
    "alternateName": "Engaged Headhunters Staffing & Recruiting",
    "url": "https://www.engagedheadhunters.com",
    "logo": "https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
    "description": "Elite staffing and recruiting agency connecting exceptional talent with top organizations through executive search, direct hire, and contract staffing solutions.",
    "foundingDate": "2022",
    "founder": {
      "@type": "Person",
      "name": "James Pemberton",
      "jobTitle": "Founder & CEO"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "249 Central Park Ave Suite 300-90",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA",
      "postalCode": "23462",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-757-720-7173",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/engaged-headhunters",
      "https://twitter.com/engagedheadhunters"
    ],
    ...(includeAggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "127",
        "reviewCount": "127"
      }
    })
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "Engaged Headhunters",
    "image": "https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
    "url": "https://www.engagedheadhunters.com",
    "telephone": "+1-757-720-7173",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "249 Central Park Ave Suite 300-90",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA",
      "postalCode": "23462",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.842965899999996,
      "longitude": -76.1341206
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;