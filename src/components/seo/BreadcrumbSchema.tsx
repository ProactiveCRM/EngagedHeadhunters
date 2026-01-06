"use client";

import { usePathname } from 'next/navigation';

const BASE_URL = 'https://www.engagedheadhunters.com';

interface BreadcrumbItem {
  name: string;
  url: string;
  position?: number;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const pathname = usePathname();

  let breadcrumbs: any[] = [];

  if (items && items.length > 0) {
    breadcrumbs = items.map((item, index) => ({
      "@type": "ListItem",
      "position": item.position || index + 1,
      "name": item.name,
      "item": item.url
    }));
  } else if (pathname !== '/') {
    const pathSegments = pathname.split('/').filter(Boolean);
    breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      ...pathSegments.map((segment, index) => {
        const url = `${BASE_URL}/${pathSegments.slice(0, index + 1).join('/')}`;
        const name = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": url
        };
      })
    ];
  }

  if (breadcrumbs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default BreadcrumbSchema;
