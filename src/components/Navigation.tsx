import { Menu, Phone, Building, Users, Briefcase } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Accordion } from '@/components/ui/accordion';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MegaMenuTrigger } from '@/components/navigation/MegaMenuTrigger';
import { MobileNavSection } from '@/components/navigation/MobileNavSection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { megaMenuData, standaloneLinks } from '@/components/navigation/navigationData';
import { useMegaMenu } from '@/hooks/useMegaMenu';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useAnnounce } from '@/hooks/useAnnounce';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevMenuOpenRef = useRef(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Aria-live announcements
  const { announce, LiveRegion } = useAnnounce();

  const {
    activeMenu,
    handleTriggerMouseEnter,
    handleTriggerMouseLeave,
    handleMenuMouseEnter,
    handleMenuMouseLeave,
    handleTriggerKeyDown,
    handleMenuKeyDown,
    registerTrigger,
    registerMenu,
    closeMenu,
  } = useMegaMenu({
    onMenuOpen: (_menuId, menuLabel) => {
      announce(`${menuLabel} menu opened. Use arrow keys to navigate.`);
    },
    onMenuClose: () => {
      announce('Menu closed');
    },
  });

  const closeSheet = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Focus trap for mobile menu
  const { containerRef: focusTrapRef, activate: activateFocusTrap, deactivate: deactivateFocusTrap } = useFocusTrap({
    enabled: isMenuOpen,
    returnFocusOnClose: true,
  });

  // Announce mobile menu state changes and manage focus
  useEffect(() => {
    if (isMenuOpen && !prevMenuOpenRef.current) {
      announce('Navigation menu opened. Use tab to navigate through links.');
      activateFocusTrap();
    } else if (!isMenuOpen && prevMenuOpenRef.current) {
      announce('Navigation menu closed');
      deactivateFocusTrap();
      // Return focus to hamburger button
      hamburgerButtonRef.current?.focus();
    }
    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen, announce, activateFocusTrap, deactivateFocusTrap]);

  // Swipe gesture for mobile sheet
  const { bind: swipeBind } = useSwipeGesture({
    onSwipeRight: closeSheet,
    enabled: isMenuOpen,
    threshold: 50,
  });

  // Map menu IDs to icons for mobile
  const menuIcons = {
    employers: Building,
    candidates: Users,
    recruiters: Briefcase,
  };

  // Check if a route is active
  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SkipNavigation mainContentId="main-content" />
      <LiveRegion />

      <nav
        className="bg-background shadow-lg fixed w-full top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center relative z-[60]">
              <Link href="/" aria-label="Engaged Headhunters Home">
                <img
                  src="/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png"
                  alt="Engaged Headhunters Logo"
                  className="h-20 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-2">
                {/* Mega Menu Triggers */}
                {Object.entries(megaMenuData).map(([key, data]) => (
                  <div key={key} className="relative">
                    <MegaMenuTrigger
                      ref={(el) => registerTrigger(key, el, data.label)}
                      label={data.label}
                      isActive={activeMenu === key}
                      onMouseEnter={() => handleTriggerMouseEnter(key)}
                      onMouseLeave={handleTriggerMouseLeave}
                      onKeyDown={(e) => handleTriggerKeyDown(e, key)}
                    />

                    <MegaMenu
                      ref={(el) => registerMenu(key, el)}
                      data={data}
                      isOpen={activeMenu === key}
                      onClose={closeMenu}
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                      onKeyDown={(e) => handleMenuKeyDown(e, key)}
                    />
                  </div>
                ))}

                {/* Standalone Links */}
                {standaloneLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActiveRoute(link.href) ? 'page' : undefined}
                    className={cn(
                      'text-foreground hover:text-primary px-4 py-3 text-sm font-semibold',
                      'transition-all duration-200 rounded-lg hover:bg-muted',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      'motion-reduce:transition-none',
                      isActiveRoute(link.href) && 'text-primary bg-primary/5'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Book Now CTA */}
                <Link
                  href="/book"
                  className={cn(
                    'bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold',
                    'hover:bg-primary/90 transition-all duration-200 shadow-brand',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'motion-reduce:transition-none'
                  )}
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    ref={hamburgerButtonRef}
                    className={cn(
                      'text-foreground hover:text-primary',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      'p-2 rounded-lg min-h-[48px] min-w-[48px]',
                      'flex items-center justify-center',
                      'active:bg-muted/80 transition-colors',
                      'touch-manipulation'
                    )}
                    aria-label="Open navigation menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav-menu"
                  >
                    <Menu size={24} aria-hidden="true" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[85vw] max-w-sm p-0 flex flex-col"
                  id="mobile-nav-menu"
                  aria-describedby="mobile-nav-description"
                  ref={(el) => {
                    if (focusTrapRef) {
                      focusTrapRef.current = el;
                    }
                  }}
                  {...swipeBind()}
                >
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">
                      Navigation Menu
                    </SheetTitle>
                    <SheetDescription id="mobile-nav-description" className="sr-only">
                      Main site navigation. Use arrow keys or tab to navigate, Enter to select.
                    </SheetDescription>
                    <Link
                      href="/"
                      onClick={closeSheet}
                      aria-label="Engaged Headhunters Home"
                      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg inline-block"
                    >
                      <img
                        src="/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png"
                        alt="Engaged Headhunters Logo"
                        className="h-12 w-auto"
                      />
                    </Link>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto overscroll-contain py-4 [-webkit-overflow-scrolling:touch]">
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(megaMenuData).map(([key, data]) => (
                        <MobileNavSection
                          key={key}
                          id={key}
                          label={data.label}
                          icon={menuIcons[key as keyof typeof menuIcons]}
                          columns={data.columns}
                          featured={data.featured}
                          onItemClick={closeSheet}
                        />
                      ))}
                    </Accordion>

                    {/* Standalone Links */}
                    <nav aria-label="Additional navigation links" className="mt-4 space-y-1 px-2">
                      {standaloneLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeSheet}
                          aria-current={isActiveRoute(link.href) ? 'page' : undefined}
                          className={cn(
                            'flex items-center px-4 py-4 text-base font-semibold',
                            'hover:bg-muted rounded-lg min-h-[56px] transition-colors',
                            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset',
                            'active:bg-muted/80',
                            'motion-reduce:transition-none',
                            'touch-manipulation',
                            isActiveRoute(link.href) && 'text-primary bg-primary/5'
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Fixed Bottom Section with Theme Toggle and CTAs */}
                  <div className="border-t p-4 space-y-3 bg-background safe-area-bottom">
                    {/* Theme Toggle for Mobile */}
                    <div className="flex items-center justify-between px-2 py-2 border-b border-border/50 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    <a
                      href="tel:+17577207173"
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-3 px-4',
                        'border-2 border-primary text-primary rounded-lg font-semibold',
                        'hover:bg-primary/5 transition-colors min-h-[56px]',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        'active:scale-[0.98] active:bg-primary/10',
                        'motion-reduce:active:scale-100',
                        'touch-manipulation'
                      )}
                    >
                      <Phone size={18} aria-hidden="true" />
                      Call Now
                    </a>
                    <Link
                      href="/book"
                      onClick={closeSheet}
                      className={cn(
                        'flex items-center justify-center w-full py-3 px-4',
                        'bg-primary text-primary-foreground rounded-lg font-semibold',
                        'hover:bg-primary/90 transition-colors min-h-[56px]',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        'active:scale-[0.98] active:bg-primary/80',
                        'motion-reduce:active:scale-100',
                        'touch-manipulation'
                      )}
                    >
                      Book Now
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
