"use client";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'service' | 'profile';
  image?: string;
  noindex?: boolean;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  children?: React.ReactNode;
}

/**
 * SEOHead component for rendering schema markup and additional meta tags.
 * 
 * Note: In Next.js App Router, primary metadata (title, description, og tags) 
 * should be handled via the `generateMetadata` function or `metadata` export 
 * in page.tsx files. This component is for rendering JSON-LD schema scripts.
 */
export const SEOHead = ({
  children,
}: SEOHeadProps) => {
  // In Next.js App Router, metadata is handled via generateMetadata
  // This component now only renders children (schema scripts)
  return <>{children}</>;
};

export default SEOHead;
