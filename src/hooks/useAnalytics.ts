// Type declarations for Google Analytics (GA4)
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Analytics event categories for tracking
export type EventCategory = 'engagement' | 'conversion' | 'navigation' | 'form' | 'cta' | 'error';

interface TrackEventOptions {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
}

// Explicit return type to ensure all functions are recognized
interface AnalyticsHookReturn {
  trackPageView: (path: string, title?: string) => void;
  trackEvent: (options: TrackEventOptions) => void;
  trackConversion: (event: ConversionEvent) => void;
  trackCTAClick: (ctaName: string, destination: string) => void;
  trackFormSubmission: (formName: string, success?: boolean) => void;
  trackBookingStart: (bookingType: string, source?: string) => void;
  trackOutboundLink: (url: string, linkText?: string) => void;
  trackNewsletterSignup: (source?: string) => void;
  trackChatOpen: (context: string) => void;
  trackChatMessage: (context: string, isAI?: boolean) => void;
  trackChatConversion: (context: string, action: string) => void;
}

export const useAnalytics = (): AnalyticsHookReturn => {
  const isGtagAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
  };

  const trackPageView = (path: string, title?: string) => {
    if (!isGtagAvailable()) return;
    
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  };

  const trackEvent = ({ category, action, label, value }: TrackEventOptions) => {
    if (!isGtagAvailable()) return;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  const trackConversion = ({ event_name, value, currency = 'USD', transaction_id }: ConversionEvent) => {
    if (!isGtagAvailable()) return;

    window.gtag('event', event_name, {
      value,
      currency,
      transaction_id,
    });
  };

  const trackCTAClick = (ctaName: string, destination: string) => {
    trackEvent({
      category: 'cta',
      action: 'click',
      label: `${ctaName} -> ${destination}`,
    });

    // Also track as conversion for key CTAs
    if (['Request Talent', 'Book Consultation', 'Submit Resume'].includes(ctaName)) {
      trackConversion({
        event_name: 'generate_lead',
        value: ctaName === 'Request Talent' ? 100 : 50,
      });
    }
  };

  const trackFormSubmission = (formName: string, success: boolean = true) => {
    trackEvent({
      category: 'form',
      action: success ? 'submit_success' : 'submit_error',
      label: formName,
    });

    if (success) {
      trackConversion({
        event_name: 'form_submission',
        value: formName === 'contact_form' ? 75 : 25,
      });
    }
  };

  const trackBookingStart = (bookingType: string, source?: string) => {
    trackEvent({
      category: 'conversion',
      action: 'booking_initiated',
      label: `${bookingType}${source ? ` (${source})` : ''}`,
    });

    trackConversion({
      event_name: 'begin_checkout',
      value: 150,
    });
  };

  const trackOutboundLink = (url: string, linkText?: string) => {
    trackEvent({
      category: 'navigation',
      action: 'outbound_click',
      label: linkText ? `${linkText}: ${url}` : url,
    });
  };

  const trackNewsletterSignup = (source?: string) => {
    trackEvent({
      category: 'engagement',
      action: 'newsletter_signup',
      label: source,
    });

    trackConversion({
      event_name: 'sign_up',
      value: 10,
    });
  };

  // Chat-related analytics
  const trackChatOpen = (context: string) => {
    trackEvent({
      category: 'engagement',
      action: 'chat_opened',
      label: context,
    });
  };

  const trackChatMessage = (context: string, isAI: boolean = false) => {
    trackEvent({
      category: 'engagement',
      action: isAI ? 'chat_ai_response' : 'chat_user_message',
      label: context,
    });
  };

  const trackChatConversion = (context: string, action: string) => {
    trackEvent({
      category: 'conversion',
      action: 'chat_conversion',
      label: `${context}: ${action}`,
    });

    trackConversion({
      event_name: 'chat_lead',
      value: 75,
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackConversion,
    trackCTAClick,
    trackFormSubmission,
    trackBookingStart,
    trackOutboundLink,
    trackNewsletterSignup,
    trackChatOpen,
    trackChatMessage,
    trackChatConversion,
  };
};

export default useAnalytics;
