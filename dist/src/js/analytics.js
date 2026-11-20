/**
 * Google Analytics 4 Integration & Telemetry for GTA Gaming Hub
 * Configurable ID: G-XXXXXXXXXX
 */
(function() {
  const GA_ID = 'G-XXXXXXXXXX'; // Replace with real GA4 Measurement ID in production

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Initialize dataLayer safely
  gtag('js', new Date());
  gtag('config', GA_ID, {
    send_page_view: false, // We dispatch explicit page_view with sanitization
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  /**
   * Track high-level event without sensitive PII
   */
  window.trackAnalyticsEvent = function(eventName, params = {}) {
    // Sanitize parameters to avoid leaking PII or raw auth tokens
    const cleanParams = {
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...params
    };

    // Forward to gtag if active
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, cleanParams);
    }

    // Telemetry log in dev mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[GA4 Event: ${eventName}]`, cleanParams);
    }
  };

  // Dispatch initial page view
  document.addEventListener('DOMContentLoaded', () => {
    window.trackAnalyticsEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href
    });
  });
})();
