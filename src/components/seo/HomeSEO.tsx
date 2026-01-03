import { Helmet } from 'react-helmet-async';
import OrganizationSchema from './OrganizationSchema';

const HomeSEO = () => {
  return (
    <>
      <Helmet>
        <title>Executive Search Firm & Leadership Recruiting | Engaged Headhunters</title>
        <meta 
          name="description" 
          content="Executive search specialists connecting growth-focused organizations with senior leadership talent. Industry-focused recruiters with placement guarantees and confidential search capabilities." 
        />
        <link rel="canonical" href="https://www.engagedheadhunters.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Executive Search Firm & Leadership Recruiting | Engaged Headhunters" />
        <meta property="og:description" content="Executive search specialists connecting growth-focused organizations with senior leadership talent. Healthcare, technology, finance, and manufacturing expertise." />
        <meta property="og:url" content="https://www.engagedheadhunters.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png" />
        <meta property="og:site_name" content="Engaged Headhunters" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Executive Search Firm & Leadership Recruiting | Engaged Headhunters" />
        <meta name="twitter:description" content="Executive search specialists connecting growth-focused organizations with senior leadership talent. Healthcare, technology, finance, and manufacturing expertise." />
        <meta name="twitter:image" content="https://www.engagedheadhunters.com/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Engaged Headhunters" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Houston" />
      </Helmet>
      <OrganizationSchema includeAggregateRating={true} />
    </>
  );
};

export default HomeSEO;
