import { Helmet } from 'react-helmet-async';

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  worksFor?: string;
  sameAs?: string[];
}

const PersonSchema = ({ 
  name, 
  jobTitle, 
  description,
  image,
  url,
  worksFor = "Engaged Headhunters",
  sameAs = []
}: PersonSchemaProps) => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    ...(description && { "description": description }),
    ...(image && { "image": image }),
    ...(url && { "url": url }),
    "worksFor": {
      "@type": "Organization",
      "name": worksFor,
      "url": "https://www.engagedheadhunters.com"
    },
    ...(sameAs.length > 0 && { "sameAs": sameAs })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

export default PersonSchema;
