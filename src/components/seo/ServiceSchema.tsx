const BASE_URL = 'https://www.engagedheadhunters.com';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}

export const ServiceSchema = ({
  name,
  description,
  url,
  provider = "Engaged Headhunters",
  areaServed = "United States",
  serviceType = "Executive Search & Recruiting"
}: ServiceSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url.startsWith('http') ? url : `${BASE_URL}${url}`,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": BASE_URL
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": serviceType
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ServiceSchema;
