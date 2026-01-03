import {   } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { useBreadcrumbs, BreadcrumbItem } from '@/hooks/useBreadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface PageBreadcrumbProps {
  items?: BreadcrumbItem[];
  customLabel?: string;
  showOnMobile?: boolean;
  className?: string;
  hideOnHome?: boolean;
}

const PageBreadcrumb = ({
  items: customItems,
  customLabel,
  showOnMobile = true,
  className,
  hideOnHome = true,
}: PageBreadcrumbProps) => {
  const breadcrumbs = useBreadcrumbs({ customItems, customLabel });

  // Don't render on homepage if hideOnHome is true
  if (hideOnHome && breadcrumbs.length <= 1) {
    return null;
  }

  // For SEO schema
  const schemaItems = breadcrumbs.map((item, index) => ({
    name: item.label,
    url: `https://www.engagedheadhunters.com${item.path}`,
    position: index + 1,
  }));

  // Determine which items to show on mobile (first, ellipsis if needed, last 2)
  const shouldCollapse = breadcrumbs.length > 3;
  const collapsedItems = shouldCollapse ? breadcrumbs.slice(1, -2) : [];

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb navigation"
        className={cn(
          'border-b border-border/40 bg-muted/30',
          !showOnMobile && 'hidden md:block',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              {/* Home - always visible */}
              <BreadcrumbItemUI>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Home className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only md:not-sr-only">Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItemUI>

              {breadcrumbs.length > 1 && <BreadcrumbSeparator />}

              {/* Middle items - collapsed on mobile if too many */}
              {shouldCollapse ? (
                <>
                  {/* Show ellipsis dropdown on mobile, full list on desktop */}
                  <BreadcrumbItemUI className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        aria-label="Show more breadcrumbs"
                      >
                        <BreadcrumbEllipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {collapsedItems.map((item) => (
                          <DropdownMenuItem key={item.path} asChild>
                            <Link href={item.path}>{item.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItemUI>
                  <BreadcrumbSeparator className="md:hidden" />

                  {/* Full middle items on desktop */}
                  {collapsedItems.map((item) => (
                    <span key={item.path} className="hidden md:contents">
                      <BreadcrumbItemUI>
                        <BreadcrumbLink asChild>
                          <Link
                            href={item.path}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItemUI>
                      <BreadcrumbSeparator />
                    </span>
                  ))}

                  {/* Parent of current page (always visible) */}
                  {breadcrumbs.length > 2 && (
                    <>
                      <BreadcrumbItemUI>
                        <BreadcrumbLink asChild>
                          <Link
                            href={breadcrumbs[breadcrumbs.length - 2].path}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {breadcrumbs[breadcrumbs.length - 2].label}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItemUI>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </>
              ) : (
                // Show all middle items when not collapsed
                breadcrumbs.slice(1, -1).map((item) => (
                  <span key={item.path} className="contents">
                    <BreadcrumbItemUI>
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.path}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItemUI>
                    <BreadcrumbSeparator />
                  </span>
                ))
              )}

              {/* Current page - always visible */}
              {breadcrumbs.length > 1 && (
                <BreadcrumbItemUI>
                  <BreadcrumbPage className="font-medium text-foreground max-w-[200px] truncate">
                    {breadcrumbs[breadcrumbs.length - 1].label}
                  </BreadcrumbPage>
                </BreadcrumbItemUI>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
    </>
  );
};

export default PageBreadcrumb;
