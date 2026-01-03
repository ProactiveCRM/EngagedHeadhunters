// Schema validation and generation utilities for JSON-LD structured data

import { SEO_CONFIG } from './seoConfig';

export type SchemaType = 'Organization' | 'LocalBusiness' | 'FAQ' | 'Service' | null;

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  description?: string;
  foundingDate?: string;
  founder?: {
    '@type': string;
    name: string;
    jobTitle?: string;
  };
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
  sameAs?: string[];
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image?: string;
  telephone?: string;
  priceRange?: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  areaServed?: string[];
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
  provider?: {
    '@type': string;
    name: string;
    url?: string;
  };
  serviceType?: string;
  category?: string;
  areaServed?: {
    '@type': string;
    name: string;
  }[] | string[];
  offers?: {
    '@type': string;
    availability?: string;
    priceSpecification?: {
      '@type': string;
      priceCurrency: string;
      priceRange?: string;
    };
  };
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: {
      '@type': string;
      name: string;
    }[];
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Validation functions
export function validateOrganizationSchema(data: Partial<OrganizationSchema>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.name?.trim()) errors.push('Organization name is required');
  if (!data.url?.trim()) errors.push('Organization URL is required');
  
  if (data.url && !isValidUrl(data.url)) errors.push('Invalid organization URL format');
  if (data.logo && !isValidUrl(data.logo)) warnings.push('Logo URL may be invalid');
  
  if (data.sameAs?.some(url => url && !isValidUrl(url))) {
    warnings.push('One or more social profile URLs may be invalid');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateLocalBusinessSchema(data: Partial<LocalBusinessSchema>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.name?.trim()) errors.push('Business name is required');
  
  if (data.geo) {
    const { latitude, longitude } = data.geo;
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      errors.push('Latitude must be between -90 and 90');
    }
    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      errors.push('Longitude must be between -180 and 180');
    }
  }

  if (!data.address?.streetAddress) warnings.push('Street address recommended');
  if (!data.telephone) warnings.push('Phone number recommended for local business');

  return { valid: errors.length === 0, errors, warnings };
}

export function validateFAQSchema(items: FAQItem[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!items || items.length === 0) {
    errors.push('At least one FAQ item is required');
    return { valid: false, errors, warnings };
  }

  items.forEach((item, index) => {
    if (!item.question?.trim()) errors.push(`FAQ ${index + 1}: Question is required`);
    if (!item.answer?.trim()) errors.push(`FAQ ${index + 1}: Answer is required`);
  });

  if (items.length < 3) warnings.push('Consider adding at least 3 FAQ items for better SEO');

  return { valid: errors.length === 0, errors, warnings };
}

export function validateServiceSchema(data: Partial<ServiceSchema>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.name?.trim()) errors.push('Service name is required');
  if (!data.serviceType?.trim()) errors.push('Service type is required');
  
  if (data.url && !isValidUrl(data.url)) errors.push('Invalid service URL format');
  if (data.provider?.url && !isValidUrl(data.provider.url)) warnings.push('Provider URL may be invalid');
  
  if (!data.description) warnings.push('Description recommended for better SEO');
  if (!data.areaServed || (Array.isArray(data.areaServed) && data.areaServed.length === 0)) {
    warnings.push('Consider adding areas served');
  }

  return { valid: errors.length === 0, errors, warnings };
}

// URL validation helper
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Default schema generators
export function generateDefaultOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Engaged Headhunters',
    alternateName: 'Engaged Headhunters Staffing & Recruiting',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    description: 'Premier staffing and recruiting agency specializing in executive search, healthcare, technology, and professional placement.',
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'James Pemberton',
      jobTitle: 'Founder & CEO',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '249 Central Park Ave Suite 300-90',
      addressLocality: 'Virginia Beach',
      addressRegion: 'VA',
      postalCode: '23462',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-757-720-7173',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.linkedin.com/company/engaged-headhunters',
      'https://twitter.com/engagedheadhunters',
    ],
  };
}

export function generateDefaultLocalBusinessSchema(locationName?: string): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: locationName ? `Engaged Headhunters - ${locationName}` : 'Engaged Headhunters',
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    telephone: '+1-757-720-7173',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '249 Central Park Ave Suite 300-90',
      addressLocality: 'Virginia Beach',
      addressRegion: 'VA',
      postalCode: '23462',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.8529,
      longitude: -75.978,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: ['Houston', 'Texas', 'United States'],
  };
}

export function generateDefaultFAQSchema(): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What industries does Engaged Headhunters specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in executive search, healthcare staffing, technology recruiting, finance and accounting, manufacturing, and sales recruitment.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the hiring process typically take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The timeline varies by position complexity. Executive searches typically take 4-8 weeks, while other professional placements can be completed in 2-4 weeks.',
        },
      },
    ],
  };
}

export function generateDefaultServiceSchema(serviceName?: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName || 'Recruiting Services',
    description: 'Professional staffing and recruiting services helping businesses find top talent.',
    url: SEO_CONFIG.siteUrl,
    provider: {
      '@type': 'Organization',
      name: 'Engaged Headhunters',
      url: SEO_CONFIG.siteUrl,
    },
    serviceType: 'Staffing and Recruiting',
    category: 'Employment Agency Services',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/OnlineOnly',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        priceRange: 'Contact for quote',
      },
    },
  };
}

// Convert form data to schema
export function buildOrganizationSchema(formData: Record<string, unknown>): OrganizationSchema {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: formData.name as string || '',
    url: formData.url as string || '',
  };

  if (formData.alternateName) schema.alternateName = formData.alternateName as string;
  if (formData.logo) schema.logo = formData.logo as string;
  if (formData.description) schema.description = formData.description as string;
  if (formData.foundingDate) schema.foundingDate = formData.foundingDate as string;

  if (formData.founderName) {
    schema.founder = {
      '@type': 'Person',
      name: formData.founderName as string,
      jobTitle: formData.founderTitle as string,
    };
  }

  if (formData.streetAddress) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: formData.streetAddress as string,
      addressLocality: formData.city as string || '',
      addressRegion: formData.state as string || '',
      postalCode: formData.postalCode as string || '',
      addressCountry: formData.country as string || 'US',
    };
  }

  if (formData.telephone) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      telephone: formData.telephone as string,
      contactType: formData.contactType as string || 'customer service',
    };
  }

  if (formData.socialProfiles && Array.isArray(formData.socialProfiles)) {
    schema.sameAs = formData.socialProfiles.filter((s: string) => s);
  }

  if (formData.includeRating && formData.ratingValue) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: formData.ratingValue as string,
      reviewCount: formData.reviewCount as string || '1',
    };
  }

  return schema;
}

export function buildLocalBusinessSchema(formData: Record<string, unknown>): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: formData.name as string || '',
  };

  if (formData.image) schema.image = formData.image as string;
  if (formData.telephone) schema.telephone = formData.telephone as string;
  if (formData.priceRange) schema.priceRange = formData.priceRange as string;

  if (formData.streetAddress) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: formData.streetAddress as string,
      addressLocality: formData.city as string || '',
      addressRegion: formData.state as string || '',
      postalCode: formData.postalCode as string || '',
      addressCountry: formData.country as string || 'US',
    };
  }

  if (formData.latitude !== undefined && formData.longitude !== undefined) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    };
  }

  if (formData.openDays && Array.isArray(formData.openDays)) {
    schema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: formData.openDays as string[],
        opens: formData.opens as string || '09:00',
        closes: formData.closes as string || '17:00',
      },
    ];
  }

  if (formData.areaServed && Array.isArray(formData.areaServed)) {
    schema.areaServed = formData.areaServed.filter((a: string) => a);
  }

  return schema;
}

export function buildFAQSchema(items: FAQItem[]): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema(formData: Record<string, unknown>): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: formData.name as string || '',
  };

  if (formData.description) schema.description = formData.description as string;
  if (formData.url) schema.url = formData.url as string;
  if (formData.serviceType) schema.serviceType = formData.serviceType as string;
  if (formData.category) schema.category = formData.category as string;

  if (formData.providerName) {
    schema.provider = {
      '@type': 'Organization',
      name: formData.providerName as string,
      url: formData.providerUrl as string || undefined,
    };
  }

  if (formData.areaServed && Array.isArray(formData.areaServed) && formData.areaServed.length > 0) {
    schema.areaServed = (formData.areaServed as string[]).filter(a => a).map(area => ({
      '@type': 'Country',
      name: area,
    }));
  }

  if (formData.includePricing) {
    schema.offers = {
      '@type': 'Offer',
      availability: formData.availability as string || 'https://schema.org/OnlineOnly',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: formData.currency as string || 'USD',
        priceRange: formData.priceRange as string || undefined,
      },
    };
  }

  if (formData.offerings && Array.isArray(formData.offerings) && formData.offerings.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${formData.name} Services`,
      itemListElement: (formData.offerings as string[]).filter(o => o).map(offering => ({
        '@type': 'Offer',
        name: offering,
      })),
    };
  }

  return schema;
}

// Detect schema type from structured data
export function detectSchemaType(data: unknown): SchemaType {
  if (!data || typeof data !== 'object') return null;
  
  // Handle array of schemas - return type of first non-Organization schema for display
  if (Array.isArray(data)) {
    for (const item of data) {
      const type = detectSchemaType(item);
      if (type && type !== 'Organization') return type;
    }
    // If all are Organization, return Organization
    if (data.length > 0) return detectSchemaType(data[0]);
    return null;
  }
  
  const obj = data as Record<string, unknown>;
  const type = obj['@type'] as string;
  
  if (type === 'Organization') return 'Organization';
  if (type === 'EmploymentAgency' || type === 'LocalBusiness') return 'LocalBusiness';
  if (type === 'FAQPage') return 'FAQ';
  if (type === 'Service') return 'Service';
  
  return null;
}

// Get all schema types from data (for array of schemas)
export function getAllSchemaTypes(data: unknown): SchemaType[] {
  if (!data) return [];
  
  if (Array.isArray(data)) {
    return data.map(item => detectSchemaType(item)).filter((t): t is SchemaType => t !== null);
  }
  
  const type = detectSchemaType(data);
  return type ? [type] : [];
}
