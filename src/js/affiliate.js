/**
 * Affiliate Link System for GTA Gaming Hub
 * Handles secure outbound navigation, event telemetry, and safe fallback states.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const affiliateBtn = e.target.closest('[data-affiliate-btn]');
    if (!affiliateBtn) return;

    const productId = affiliateBtn.getAttribute('data-product-id') || 'unknown';
    const productName = affiliateBtn.getAttribute('data-product-name') || '';
    const retailer = affiliateBtn.getAttribute('data-retailer') || 'Retailer';
    const rawAffiliateUrl = affiliateBtn.getAttribute('data-affiliate-url');
    const referenceUrl = affiliateBtn.getAttribute('data-reference-url');
    const status = affiliateBtn.getAttribute('data-status');

    // 1. Telemetry dispatch
    if (window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent('affiliate_click', {
        product_id: productId,
        product_name: productName,
        retailer: retailer,
        has_affiliate_tag: Boolean(rawAffiliateUrl && rawAffiliateUrl.length > 5),
        button_position: affiliateBtn.getAttribute('data-position') || 'card'
      });
    }

    // 2. Navigation logic
    const targetUrl = (rawAffiliateUrl && rawAffiliateUrl.trim().length > 5) ? rawAffiliateUrl : referenceUrl;

    if (!targetUrl || targetUrl === '#' || targetUrl === '') {
      e.preventDefault();
      if (window.showToast) {
        window.showToast(`Verified purchase link for ${productName || 'this item'} is coming soon.`, 'warning');
      } else {
        alert('Verified purchase link is coming soon.');
      }
      return;
    }

    // Validate safe https protocol
    try {
      const parsed = new URL(targetUrl, window.location.origin);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        e.preventDefault();
        console.error('Invalid link protocol rejected');
        return;
      }
    } catch (err) {
      e.preventDefault();
      return;
    }

    // Inform user if routing through official reference because affiliate approval is pending
    if ((!rawAffiliateUrl || rawAffiliateUrl.trim().length < 5) && referenceUrl) {
      if (window.showToast) {
        window.showToast(`Directing to official ${retailer} reference listing.`, 'info');
      }
    }
  });
});
