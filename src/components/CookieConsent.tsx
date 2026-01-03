import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'cookie-consent';
const CONSENT_VERSION = '1.0';

type ConsentStatus = 'pending' | 'accepted' | 'declined';

interface ConsentData {
  status: ConsentStatus;
  version: string;
  timestamp: string;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (storedConsent) {
      try {
        const consent: ConsentData = JSON.parse(storedConsent);
        // If version changed, show banner again
        if (consent.version !== CONSENT_VERSION) {
          setShowBanner(true);
        } else if (consent.status === 'accepted') {
          enableAnalytics();
        }
      } catch {
        setShowBanner(true);
      }
    } else {
      // No consent stored, show banner after short delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (status: ConsentStatus) => {
    const consentData: ConsentData = {
      status,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    setShowBanner(false);

    if (status === 'accepted') {
      enableAnalytics();
    }
  };

  const enableAnalytics = () => {
    // GA4 is already loaded but configured with send_page_view: false
    // Now enable it properly by sending the initial page view
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  };

  const handleAccept = () => {
    saveConsent('accepted');
  };

  const handleDecline = () => {
    saveConsent('declined');
    // Disable analytics storage
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-300"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 hidden sm:block">
            <Cookie className="w-8 h-8 text-primary" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h2 id="cookie-consent-title" className="font-semibold text-foreground flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary sm:hidden" />
              We value your privacy
            </h2>
            <p id="cookie-consent-description" className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience and analyze site traffic. 
              By clicking "Accept", you consent to our use of cookies.{' '}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Learn more
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 sm:flex-none"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-none"
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecline}
              className="h-8 w-8 sm:hidden"
              aria-label="Close cookie consent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
