const AgentsSEO = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Engaged Headhunters",
        "url": "https://www.engagedheadhunters.com",
        "logo": "https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
        "description": "Elite executive recruiters and headhunters specializing in C-suite talent acquisition, healthcare staffing, technology recruiting, and strategic workforce solutions.",
        "areaServed": "US",
        "sameAs": [
          "https://linkedin.com/company/engaged-headhunters"
        ]
      },
      {
        "@type": "Person",
        "name": "James Pemberton",
        "jobTitle": "Founder & CEO - Executive Headhunter",
        "description": "Award-winning executive recruiter with 15+ years of experience in C-suite talent acquisition, healthcare staffing, and technology headhunting. Pioneer of the 'Build Don't Beg' recruiting methodology.",
        "image": "https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
        "url": "https://www.engagedheadhunters.com/agents/james-pemberton",
        "worksFor": {
          "@type": "Organization",
          "name": "Engaged Headhunters"
        },
        "alumniOf": "United States Navy",
        "knowsAbout": [
          "Executive Search",
          "Headhunting",
          "Talent Acquisition",
          "Healthcare Staffing",
          "Technology Recruiting",
          "AI-Powered Recruiting"
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Executive Recruiting & Headhunting Services",
        "provider": {
          "@type": "Organization",
          "name": "Engaged Headhunters"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Recruiting Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Executive Search & C-Suite Recruiting"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare Staffing & Medical Recruiting"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Technology Talent Acquisition"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-Powered Headhunting"
              }
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Engaged Headhunters",
        "image": "https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
        "description": "Premier executive search firm and staffing agency providing headhunting services, talent acquisition, and workforce solutions across healthcare, technology, finance, and professional services.",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "249 Central Park Ave Suite 300-90",
          "addressLocality": "Virginia Beach",
          "addressRegion": "VA",
          "postalCode": "23462",
          "addressCountry": "US"
        },
        "telephone": "+1-757-720-7173",
        "url": "https://www.engagedheadhunters.com/agents"
      }
    ]
  };

  // Metadata is handled via generateMetadata in page.tsx
  // This component only renders schema markup
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default AgentsSEO;