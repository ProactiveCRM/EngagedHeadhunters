"use client";
import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isServicePage = pathname.startsWith('/services/');

  const handleRequestTalent = () => {
    if (isServicePage) {
      const bookingSection = document.getElementById('booking-calendar');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMinimized(true);
        return;
      }
    }
    router.push('/contact');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-minimize on mobile when first visible
  useEffect(() => {
    if (isMobile && isVisible) {
      setIsMinimized(true);
    }
  }, [isMobile, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-[calc(100vw-2rem)] sm:w-auto sm:max-w-sm'
      }`}>
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Open contact options"
        >
          <Phone size={20} className="sm:hidden" />
          <Phone size={24} className="hidden sm:block" />
        </button>
      ) : (
        <div className="bg-accent text-accent-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-base sm:text-lg">Ready to Find Top Talent?</h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-accent-foreground/70 hover:text-accent-foreground p-1"
              aria-label="Minimize"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-accent-foreground/90 text-xs sm:text-sm mb-3 sm:mb-4">
            Get 2-4 extra placements per month with our AI-powered recruiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <a
              href="tel:+17577207173"
              className="flex-1 bg-background text-foreground hover:bg-background/90 px-4 py-3 sm:py-2 rounded-md font-semibold text-center text-sm transition-colors"
            >
              Call Now
            </a>
            <button
              onClick={handleRequestTalent}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 sm:py-2 rounded-md font-semibold text-center text-sm transition-colors"
            >
              Request Talent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyCTA;
