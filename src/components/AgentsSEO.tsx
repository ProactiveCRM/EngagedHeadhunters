import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Executive Recruiters & Headhunters | Expert Staffing Agency | Engaged Headhunters</title>
      <meta 
        name="description" 
        content="Connect with elite executive recruiters and headhunters specializing in C-suite talent acquisition, healthcare staffing, technology recruiting, and professional services placement. 500+ successful placements nationwide." 
      />
      <meta 
        name="keywords" 
        content="executive recruiters, headhunters, staffing agency, talent acquisition, executive search firm, recruiting services, healthcare recruiters, technology headhunters, C-suite placement, recruitment consultants, staffing solutions, workforce solutions, hiring specialists, executive search consultants" 
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.engagedheadhunters.com/agents" />
      <meta property="og:title" content="Expert Executive Recruiters & Headhunters | Engaged Headhunters" />
      <meta 
        property="og:description" 
        content="Award-winning headhunters specializing in executive search and strategic staffing solutions. Connect with James Pemberton, pioneer of AI-powered recruiting." 
      />
      <meta property="og:image" content="https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.engagedheadhunters.com/agents" />
      <meta property="twitter:title" content="Expert Executive Recruiters & Headhunters | Engaged Headhunters" />
      <meta 
        property="twitter:description" 
        content="Award-winning headhunters specializing in executive search and strategic staffing solutions." 
      />
      <meta property="twitter:image" content="https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.engagedheadhunters.com/agents" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default AgentsSEO;