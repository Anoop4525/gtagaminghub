/**
 * Cookie Consent Manager for GTA Gaming Hub
 * Handles GDPR/ePrivacy compliance and informs GA4 consent mode.
 */
(function() {
  const CONSENT_KEY = 'gtagaminghub_cookie_consent';

  function applyConsent(granted) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied'
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;

    const savedPreference = localStorage.getItem(CONSENT_KEY);
    if (!savedPreference) {
      banner.classList.remove('hidden');
    } else {
      applyConsent(savedPreference === 'all');
    }

    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const necessaryOnlyBtn = document.getElementById('cookie-necessary-only');

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => {
        localStorage.setItem(CONSENT_KEY, 'all');
        applyConsent(true);
        banner.classList.add('hidden');
        if (window.showToast) window.showToast('Cookie preferences saved', 'info');
      });
    }

    if (necessaryOnlyBtn) {
      necessaryOnlyBtn.addEventListener('click', () => {
        localStorage.setItem(CONSENT_KEY, 'necessary');
        applyConsent(false);
        banner.classList.add('hidden');
        if (window.showToast) window.showToast('Essential cookies enabled only', 'info');
      });
    }
  });
})();
