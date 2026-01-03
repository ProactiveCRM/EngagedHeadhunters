import { Helmet } from 'react-helmet-async';

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

const BASE_URL = 'https://www.engagedheadhunters.com';
const DEFAULT_IMAGE = `${BASE_URL}/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png`;
const SITE_NAME = 'Engaged Headhunters';
const TWITTER_HANDLE = '@engagedheadhunters';

export const SEOHead = ({
  title,
  description,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  keywords,
  author = 'Engaged Headhunters',
  publishedTime,
  modifiedTime,
  children,
}: SEOHeadProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : BASE_URL;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  // Truncate description to 160 characters for SEO
  const truncatedDescription = description.length > 160 
    ? `${description.substring(0, 157)}...` 
    : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={truncatedDescription} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional SEO */}
      <meta name="geo.region" content="US-VA" />
      <meta name="geo.placename" content="Virginia Beach" />

      {/* Allow additional schema or meta tags */}
      {children}
    </Helmet>
  );
};

export default SEOHead;
