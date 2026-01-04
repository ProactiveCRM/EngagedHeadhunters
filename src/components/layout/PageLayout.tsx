import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BuilderSymbol } from '@/components/builder/BuilderSymbol';
import StickyCTA from '@/components/StickyCTA';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { BreadcrumbItem } from '@/hooks/useBreadcrumbs';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
  customBreadcrumbLabel?: string;
  showStickyCTA?: boolean;
  className?: string;
  mainClassName?: string;
}

/**
 * Standardized page layout with navigation, breadcrumbs, and footer.
 * Use this for consistent page structure across the site.
 */
const PageLayout = ({
  children,
  showBreadcrumbs = true,
  breadcrumbItems,
  customBreadcrumbLabel,
  showStickyCTA = true,
  className,
  mainClassName,
}: PageLayoutProps) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      <BuilderSymbol
        model="nav"
        fallback={<Navigation />}
      />
      {showStickyCTA && <StickyCTA />}
      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20 flex-shrink-0" aria-hidden="true" />
      {showBreadcrumbs && (
        <PageBreadcrumb
          items={breadcrumbItems}
          customLabel={customBreadcrumbLabel}
        />
      )}
      <main id="main-content" className={cn('flex-1', mainClassName)}>
        {children}
      </main>
      <BuilderSymbol
        model="footer"
        fallback={<Footer />}
      />
    </div>
  );
};

export default PageLayout;
