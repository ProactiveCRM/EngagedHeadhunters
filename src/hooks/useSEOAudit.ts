import { useMemo, useCallback } from 'react';
import { useAdminPageSEO, PageSEOData } from './usePageSEO';
import { SERVICE_SEO_DATA, CAREER_SEO_DATA, LOCATION_SEO_DATA, PAGE_META_DESCRIPTIONS } from '@/lib/seoConfig';
import { detectSchemaType, generateDefaultOrganizationSchema, generateDefaultLocalBusinessSchema, generateDefaultServiceSchema } from '@/lib/schemaValidation';

export interface PageDefinition {
  slug: string;
  label: string;
  path: string;
  category: 'core' | 'services' | 'careers' | 'locations' | 'other';
}

export interface PageAuditResult {
  page: PageDefinition;
  seoData: PageSEOData | null;
  score: number;
  issues: SEOIssue[];
  hasTitle: boolean;
  hasDescription: boolean;
  hasOGImage: boolean;
  hasKeywords: boolean;
  hasStructuredData: boolean;
  structuredDataType: string | null;
  titleLength: number;
  descriptionLength: number;
}

export interface SEOIssue {
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  fix?: string;
}

export interface SEOAuditResult {
  totalPages: number;
  auditedPages: number;
  overallScore: number;
  criticalIssues: number;
  warnings: number;
  optimized: number;
  pages: PageAuditResult[];
  issues: {
    missingTitles: PageAuditResult[];
    missingDescriptions: PageAuditResult[];
    missingOGImages: PageAuditResult[];
    missingKeywords: PageAuditResult[];
    missingStructuredData: PageAuditResult[];
    titleTooLong: PageAuditResult[];
    titleTooShort: PageAuditResult[];
    descriptionTooLong: PageAuditResult[];
    descriptionTooShort: PageAuditResult[];
  };
}

// All auditable pages in the site
export const ALL_PAGES: PageDefinition[] = [
  // Core pages
  { slug: 'home', label: 'Home', path: '/', category: 'core' },
  { slug: 'employers', label: 'Employers', path: '/employers', category: 'core' },
  { slug: 'candidates', label: 'Candidates', path: '/candidates', category: 'core' },
  { slug: 'about', label: 'About', path: '/about', category: 'core' },
  { slug: 'contact', label: 'Contact', path: '/contact', category: 'core' },
  
  // Services pages
  { slug: 'services', label: 'Services Hub', path: '/services', category: 'services' },
  { slug: 'executive-search', label: 'Executive Search', path: '/executive-search', category: 'services' },
  { slug: 'contract-staffing', label: 'Contract Staffing', path: '/contract-staffing', category: 'services' },
  { slug: 'temporary-staffing', label: 'Temporary Staffing', path: '/temporary-staffing', category: 'services' },
  { slug: 'healthcare-staffing', label: 'Healthcare Staffing', path: '/healthcare-staffing', category: 'services' },
  { slug: 'technology-recruiting', label: 'Technology Recruiting', path: '/technology-recruiting', category: 'services' },
  { slug: 'finance-recruiting', label: 'Finance Recruiting', path: '/finance-recruiting', category: 'services' },
  { slug: 'sales-recruiting', label: 'Sales Recruiting', path: '/sales-recruiting', category: 'services' },
  { slug: 'manufacturing-recruiting', label: 'Manufacturing Recruiting', path: '/manufacturing-recruiting', category: 'services' },
  
  // Careers pages
  { slug: 'careers', label: 'Careers Hub', path: '/careers', category: 'careers' },
  { slug: 'healthcare-careers', label: 'Healthcare Careers', path: '/careers/healthcare', category: 'careers' },
  { slug: 'technology-careers', label: 'Technology Careers', path: '/careers/technology', category: 'careers' },
  { slug: 'finance-careers', label: 'Finance Careers', path: '/careers/finance', category: 'careers' },
  { slug: 'sales-careers', label: 'Sales Careers', path: '/careers/sales', category: 'careers' },
  { slug: 'manufacturing-careers', label: 'Manufacturing Careers', path: '/careers/manufacturing', category: 'careers' },
  { slug: 'executive-careers', label: 'Executive Careers', path: '/careers/executive', category: 'careers' },
  { slug: 'contract-careers', label: 'Contract Careers', path: '/careers/contract', category: 'careers' },
  { slug: 'remote-careers', label: 'Remote Careers', path: '/careers/remote', category: 'careers' },
  { slug: 'entry-level-careers', label: 'Entry Level Careers', path: '/careers/entry-level', category: 'careers' },
  
  // Locations
  { slug: 'locations', label: 'Locations Hub', path: '/locations', category: 'locations' },
  { slug: 'houston', label: 'Houston', path: '/houston', category: 'locations' },
  
  // Other pages
  { slug: 'blog', label: 'Blog', path: '/blog', category: 'other' },
  { slug: 'agents', label: 'Agents Directory', path: '/agents', category: 'other' },
  { slug: 'niches', label: 'Niches', path: '/niches', category: 'other' },
  { slug: 'alliance', label: 'Alliance', path: '/alliance', category: 'other' },
  { slug: 'for-recruiters', label: 'For Recruiters', path: '/for-recruiters', category: 'other' },
  { slug: 'book-talent', label: 'Book Talent', path: '/book-talent', category: 'other' },
  { slug: 'book-career', label: 'Book Career', path: '/book-career', category: 'other' },
  { slug: 'submit-resume', label: 'Submit Resume', path: '/submit-resume', category: 'other' },
  { slug: 'salary-guide', label: 'Salary Guide', path: '/salary-guide', category: 'other' },
  { slug: 'resources', label: 'Resources', path: '/resources', category: 'other' },
  { slug: 'partners', label: 'Partners', path: '/partners', category: 'other' },
  { slug: 'case-studies', label: 'Case Studies', path: '/case-studies', category: 'other' },
  { slug: 'privacy-policy', label: 'Privacy Policy', path: '/privacy-policy', category: 'other' },
  { slug: 'terms-of-service', label: 'Terms of Service', path: '/terms-of-service', category: 'other' },
];

function calculatePageScore(seoData: PageSEOData | null, pageCategory: string): { score: number; issues: SEOIssue[]; hasStructuredData: boolean; structuredDataType: string | null } {
  const issues: SEOIssue[] = [];
  let score = 0;
  
  if (!seoData) {
    return { 
      score: 0, 
      issues: [{ type: 'critical', category: 'Missing SEO', message: 'No SEO data configured for this page', fix: 'Add SEO settings' }],
      hasStructuredData: false,
      structuredDataType: null,
    };
  }
  
  const title = seoData.meta_title || '';
  const description = seoData.meta_description || '';
  const ogImage = seoData.og_image || '';
  const keywords = seoData.keywords || [];
  const structuredData = seoData.structured_data;
  
  // Title scoring (25 points max)
  if (title) {
    score += 12;
    if (title.length >= 30 && title.length <= 60) {
      score += 13;
    } else if (title.length < 30) {
      score += 5;
      issues.push({ type: 'warning', category: 'Title', message: `Title too short (${title.length}/30-60 chars)`, fix: 'Expand title' });
    } else if (title.length > 60) {
      score += 5;
      issues.push({ type: 'warning', category: 'Title', message: `Title too long (${title.length}/60 chars max)`, fix: 'Shorten title' });
    }
  } else {
    issues.push({ type: 'critical', category: 'Title', message: 'Missing meta title', fix: 'Add meta title' });
  }
  
  // Description scoring (25 points max)
  if (description) {
    score += 12;
    if (description.length >= 120 && description.length <= 160) {
      score += 13;
    } else if (description.length < 120) {
      score += 5;
      issues.push({ type: 'warning', category: 'Description', message: `Description too short (${description.length}/120-160 chars)`, fix: 'Expand description' });
    } else if (description.length > 160) {
      score += 5;
      issues.push({ type: 'warning', category: 'Description', message: `Description too long (${description.length}/160 chars max)`, fix: 'Shorten description' });
    }
  } else {
    issues.push({ type: 'critical', category: 'Description', message: 'Missing meta description', fix: 'Add meta description' });
  }
  
  // OG Image scoring (15 points max)
  if (ogImage) {
    score += 15;
  } else {
    issues.push({ type: 'warning', category: 'OG Image', message: 'Missing Open Graph image', fix: 'Add OG image' });
  }
  
  // Keywords scoring (10 points max)
  if (keywords.length > 0) {
    score += Math.min(10, keywords.length * 2);
    if (keywords.length < 3) {
      issues.push({ type: 'info', category: 'Keywords', message: `Only ${keywords.length} keyword(s) - recommend 3-5`, fix: 'Add more keywords' });
    }
  } else {
    issues.push({ type: 'warning', category: 'Keywords', message: 'No keywords configured', fix: 'Add keywords' });
  }
  
  // Structured Data scoring (15 points max)
  const schemaType = structuredData ? detectSchemaType(structuredData) : null;
  const hasStructuredData = !!structuredData && !!schemaType;
  
  if (hasStructuredData) {
    score += 15;
  } else {
    // Only flag as issue for key pages
    const keyPageCategories = ['core', 'services', 'locations'];
    if (keyPageCategories.includes(pageCategory)) {
      issues.push({ type: 'info', category: 'Structured Data', message: 'No structured data (JSON-LD) configured', fix: 'Add schema' });
    }
  }
  
  // Robots scoring (5 points max)
  if (seoData.robots && !seoData.robots.includes('noindex')) {
    score += 5;
  }
  
  // Canonical URL scoring (5 points max)
  if (seoData.canonical_url) {
    score += 5;
  } else {
    issues.push({ type: 'info', category: 'Canonical', message: 'No canonical URL set', fix: 'Add canonical URL' });
  }
  
  return { score: Math.min(100, score), issues, hasStructuredData, structuredDataType: schemaType };
}

export function useSEOAudit() {
  const { seoData, loading, refetch, updateSEO, isUpdating } = useAdminPageSEO();
  
  const audit = useMemo((): SEOAuditResult => {
    const seoMap = new Map(seoData.map(s => [s.page_slug, s]));
    
    const pages: PageAuditResult[] = ALL_PAGES.map(page => {
      const seo = seoMap.get(page.slug) || null;
      const { score, issues, hasStructuredData, structuredDataType } = calculatePageScore(seo, page.category);
      
      return {
        page,
        seoData: seo,
        score,
        issues,
        hasTitle: !!(seo?.meta_title),
        hasDescription: !!(seo?.meta_description),
        hasOGImage: !!(seo?.og_image),
        hasKeywords: (seo?.keywords?.length || 0) > 0,
        hasStructuredData,
        structuredDataType,
        titleLength: seo?.meta_title?.length || 0,
        descriptionLength: seo?.meta_description?.length || 0,
      };
    });
    
    const auditedPages = pages.filter(p => p.seoData !== null).length;
    const overallScore = pages.length > 0 
      ? Math.round(pages.reduce((sum, p) => sum + p.score, 0) / pages.length)
      : 0;
    
    const criticalIssues = pages.filter(p => p.issues.some(i => i.type === 'critical')).length;
    const warnings = pages.filter(p => p.issues.some(i => i.type === 'warning') && !p.issues.some(i => i.type === 'critical')).length;
    const optimized = pages.filter(p => p.score >= 80).length;
    
    // Key pages that should have structured data
    const keyPageCategories = ['core', 'services', 'locations'];
    const missingStructuredData = pages.filter(p => 
      keyPageCategories.includes(p.page.category) && !p.hasStructuredData
    );
    
    return {
      totalPages: pages.length,
      auditedPages,
      overallScore,
      criticalIssues,
      warnings,
      optimized,
      pages,
      issues: {
        missingTitles: pages.filter(p => !p.hasTitle),
        missingDescriptions: pages.filter(p => !p.hasDescription),
        missingOGImages: pages.filter(p => !p.hasOGImage),
        missingKeywords: pages.filter(p => !p.hasKeywords),
        missingStructuredData,
        titleTooLong: pages.filter(p => p.titleLength > 60),
        titleTooShort: pages.filter(p => p.hasTitle && p.titleLength < 30),
        descriptionTooLong: pages.filter(p => p.descriptionLength > 160),
        descriptionTooShort: pages.filter(p => p.hasDescription && p.descriptionLength < 120),
      },
    };
  }, [seoData]);
  
  const seedMissingPages = useCallback(async () => {
    const missing = ALL_PAGES.filter(page => !seoData.find(s => s.page_slug === page.slug));
    
    for (const page of missing) {
      // First check PAGE_META_DESCRIPTIONS for optimized content
      const optimizedData = PAGE_META_DESCRIPTIONS[page.slug];
      
      // Fallback to legacy config data if not in PAGE_META_DESCRIPTIONS
      const serviceData = SERVICE_SEO_DATA[page.slug as keyof typeof SERVICE_SEO_DATA];
      const careerData = CAREER_SEO_DATA[page.slug as keyof typeof CAREER_SEO_DATA];
      const locationData = LOCATION_SEO_DATA[page.slug as keyof typeof LOCATION_SEO_DATA];
      const legacyConfigData = serviceData || careerData || locationData;
      
      // Generate default structured data based on page type
      let defaultSchema = null;
      if (page.slug === 'home') {
        defaultSchema = generateDefaultOrganizationSchema();
      } else if (page.category === 'locations') {
        defaultSchema = generateDefaultLocalBusinessSchema(page.label);
      } else if (page.category === 'services') {
        defaultSchema = generateDefaultServiceSchema(page.label);
      }
      
      await updateSEO({
        page_slug: page.slug,
        meta_title: optimizedData?.title || legacyConfigData?.title || `${page.label} | Engaged Headhunters`,
        meta_description: optimizedData?.description || legacyConfigData?.description || null,
        keywords: optimizedData?.keywords || legacyConfigData?.keywords || [],
        robots: 'index, follow',
        structured_data: defaultSchema,
      });
    }
  }, [seoData, updateSEO]);
  
  const bulkUpdateFromConfig = useCallback(async () => {
    for (const page of ALL_PAGES) {
      const serviceData = SERVICE_SEO_DATA[page.slug as keyof typeof SERVICE_SEO_DATA];
      const careerData = CAREER_SEO_DATA[page.slug as keyof typeof CAREER_SEO_DATA];
      const locationData = LOCATION_SEO_DATA[page.slug as keyof typeof LOCATION_SEO_DATA];
      
      const configData = serviceData || careerData || locationData;
      
      if (configData) {
        const existing = seoData.find(s => s.page_slug === page.slug);
        await updateSEO({
          id: existing?.id,
          page_slug: page.slug,
          meta_title: configData.title,
          meta_description: configData.description,
          keywords: configData.keywords,
          robots: 'index, follow',
        });
      }
    }
  }, [seoData, updateSEO]);
  
  const exportReport = useCallback(() => {
    const csvRows = [
      ['Page', 'Score', 'Title', 'Title Length', 'Description', 'Desc Length', 'OG Image', 'Keywords', 'Issues'],
      ...audit.pages.map(p => [
        p.page.label,
        p.score.toString(),
        p.hasTitle ? 'Yes' : 'No',
        p.titleLength.toString(),
        p.hasDescription ? 'Yes' : 'No',
        p.descriptionLength.toString(),
        p.hasOGImage ? 'Yes' : 'No',
        (p.seoData?.keywords?.length || 0).toString(),
        p.issues.map(i => i.message).join('; '),
      ]),
    ];
    
    const csvContent = csvRows.map(row => row.map(cell => `\"${cell}\"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-audit-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [audit]);
  
  return {
    audit,
    loading,
    refetch,
    seedMissingPages,
    bulkUpdateFromConfig,
    exportReport,
    isUpdating,
  };
}
