"use client";
interface JobPostingSchemaProps {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERN';
  location?: {
    city: string;
    state: string;
    country?: string;
  };
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryUnit?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  industry?: string;
  experienceRequirements?: string;
}

const BASE_URL = 'https://www.engagedheadhunters.com';

export const JobPostingSchema = ({
  title,
  description,
  datePosted,
  validThrough,
  employmentType = 'FULL_TIME',
  location,
  remote = false,
  salaryMin,
  salaryMax,
  salaryUnit = 'YEAR',
  industry,
  experienceRequirements,
}: JobPostingSchemaProps) => {
  const schemaData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Engaged Headhunters',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png`,
    },
    employmentType,
  };

  if (validThrough) {
    schemaData.validThrough = validThrough;
  }

  if (remote) {
    schemaData.jobLocationType = 'TELECOMMUTE';
    schemaData.applicantLocationRequirements = {
      '@type': 'Country',
      name: 'United States',
    };
  }

  if (location) {
    schemaData.jobLocation = {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: location.country || 'US',
      },
    };
  }

  if (salaryMin || salaryMax) {
    schemaData.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        ...(salaryMin && salaryMax
          ? { minValue: salaryMin, maxValue: salaryMax }
          : { value: salaryMin || salaryMax }),
        unitText: salaryUnit,
      },
    };
  }

  if (industry) {
    schemaData.industry = industry;
  }

  if (experienceRequirements) {
    schemaData.experienceRequirements = experienceRequirements;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default JobPostingSchema;
