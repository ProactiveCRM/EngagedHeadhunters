interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}

const ServiceSchema = ({
  name,
  description,
  url,
  provider = "Engaged Headhunters",
  areaServed = "United States",
  serviceType = "Employment Agency"
}: ServiceSchemaProps) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://www.engagedheadhunters.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": serviceType,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
};

export default ServiceSchema;
