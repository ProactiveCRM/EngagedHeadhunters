import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
}

// Route labels for breadcrumb display
const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/contact': 'Contact',
  '/sitemap': 'Sitemap',
  '/services': 'Services',
  '/executive-search': 'Executive Search',
  '/contract-staffing': 'Contract Staffing',
  '/temporary-staffing': 'Temporary Staffing',
  '/healthcare-staffing': 'Healthcare Staffing',
  '/technology-recruiting': 'Technology Recruiting',
  '/finance-recruiting': 'Finance Recruiting',
  '/sales-recruiting': 'Sales Recruiting',
  '/manufacturing-recruiting': 'Manufacturing Recruiting',
  '/careers': 'Careers',
  '/executive-careers': 'Executive',
  '/contract-careers': 'Contract',
  '/remote-careers': 'Remote',
  '/entry-level-careers': 'Entry Level',
  '/healthcare-careers': 'Healthcare',
  '/technology-careers': 'Technology',
  '/finance-careers': 'Finance',
  '/sales-careers': 'Sales',
  '/manufacturing-careers': 'Manufacturing',
  '/book': 'Book',
  '/book/talent': 'Request Talent',
  '/book/career': 'Career Consultation',
  '/agents': 'Agents',
  '/james-pemberton': 'James Pemberton',
  '/alliance': 'Agent Alliance',
  '/for-recruiters': 'For Recruiters',
  '/blog': 'Blog',
  '/case-studies': 'Case Studies',
  '/resources': 'Resources',
  '/salary-guide': 'Salary Guide',
  '/locations': 'Locations',
  '/houston': 'Houston',
  '/niches': 'Niches',
  '/employers': 'For Employers',
  '/candidates': 'For Candidates',
  '/submit-resume': 'Submit Resume',
  '/partners': 'Partners',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
  '/confidentiality-agreement': 'Confidentiality',
  '/auth': 'Sign In',
  '/admin': 'Admin',
  '/admin/dashboard': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/agents': 'Agents',
  '/admin/blog': 'Blog',
  '/admin/subscribers': 'Subscribers',
  '/admin/submissions': 'Submissions',
  '/admin/seo': 'SEO',
  '/admin/directory': 'Directory',
  '/admin/settings': 'Settings',
  '/admin/niches': 'Niches',
  '/admin/locations': 'Locations',
  '/admin/markets': 'Markets',
  '/admin/alliance': 'Alliance',
  '/admin/salary-lookups': 'Salary Lookups',
  '/agent': 'Agent',
  '/agent/dashboard': 'Dashboard',
  '/agent/blog': 'Blog',
  '/agent/prospecting': 'Prospecting',
  '/agent/research': 'Research',
  '/agent/email-templates': 'Email Templates',
};

// Parent route hierarchy
const ROUTE_HIERARCHY: Record<string, string> = {
  // Services pages → /services
  '/executive-search': '/services',
  '/contract-staffing': '/services',
  '/temporary-staffing': '/services',
  '/healthcare-staffing': '/services',
  '/technology-recruiting': '/services',
  '/finance-recruiting': '/services',
  '/sales-recruiting': '/services',
  '/manufacturing-recruiting': '/services',
  // Career pages → /careers
  '/executive-careers': '/careers',
  '/contract-careers': '/careers',
  '/remote-careers': '/careers',
  '/entry-level-careers': '/careers',
  '/healthcare-careers': '/careers',
  '/technology-careers': '/careers',
  '/finance-careers': '/careers',
  '/sales-careers': '/careers',
  '/manufacturing-careers': '/careers',
  // Booking pages → /book
  '/book/talent': '/book',
  '/book/career': '/book',
  // Location pages → /locations
  '/houston': '/locations',
  // Agent pages → /alliance
  '/james-pemberton': '/agents',
  '/for-recruiters': '/agents',
  '/alliance': '/agents',
  // Resources → /resources
  '/blog': '/resources',
  '/case-studies': '/resources',
  '/salary-guide': '/resources',
  // Admin pages
  '/admin/dashboard': '/admin',
  '/admin/users': '/admin',
  '/admin/agents': '/admin',
  '/admin/blog': '/admin',
  '/admin/subscribers': '/admin',
  '/admin/submissions': '/admin',
  '/admin/seo': '/admin',
  '/admin/directory': '/admin',
  '/admin/settings': '/admin',
  '/admin/niches': '/admin',
  '/admin/locations': '/admin',
  '/admin/markets': '/admin',
  '/admin/alliance': '/admin',
  '/admin/salary-lookups': '/admin',
  // Agent dashboard pages
  '/agent/dashboard': '/agent',
  '/agent/blog': '/agent',
  '/agent/prospecting': '/agent',
  '/agent/research': '/agent',
  '/agent/email-templates': '/agent',
};

/**
 * Converts a path segment to a readable label
 */
function segmentToLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Builds the breadcrumb chain for a given path
 */
function buildBreadcrumbChain(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  if (pathname === '/') {
    return items;
  }

  // Check if we have a parent route in hierarchy
  const parentPath = ROUTE_HIERARCHY[pathname];

  if (parentPath && parentPath !== '/') {
    // Recursively build parent chain
    const parentChain = buildBreadcrumbChain(parentPath);
    items.push(...parentChain.slice(1)); // Skip the Home item (already added)
  }

  // Add current page
  const label = ROUTE_LABELS[pathname] || segmentToLabel(pathname.split('/').pop() || '');
  items.push({ label, path: pathname, isCurrentPage: true });

  return items;
}

interface UseBreadcrumbsOptions {
  customItems?: BreadcrumbItem[];
  customLabel?: string;
}

/**
 * Hook to generate breadcrumb navigation items based on current route
 */
export function useBreadcrumbs(options: UseBreadcrumbsOptions = {}): BreadcrumbItem[] {
  const currentPathname = usePathname() || '/';
  const { customItems, customLabel } = options;

  const breadcrumbs = useMemo(() => {
    // If custom items provided, use them
    if (customItems && customItems.length > 0) {
      return customItems;
    }

    const normalizedPathname = currentPathname.replace(/\/$/, '') || '/';
    const items = buildBreadcrumbChain(normalizedPathname);

    // Apply custom label to last item if provided
    if (customLabel && items.length > 0) {
      items[items.length - 1] = {
        ...items[items.length - 1],
        label: customLabel,
      };
    }

    // Mark last item as current page
    if (items.length > 0) {
      items[items.length - 1].isCurrentPage = true;
    }

    return items;
  }, [currentPathname, customItems, customLabel]);

  return breadcrumbs;
}

export { ROUTE_LABELS, ROUTE_HIERARCHY };
