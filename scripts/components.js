const { ICONS, affiliateConfig } = require('./template');

function getAffiliateDetails(productId, referenceUrl, defaultRetailer = 'Amazon India') {
  const linkConfig = affiliateConfig.links[productId];
  if (linkConfig) {
    return {
      affiliateUrl: linkConfig.affiliateUrl || '',
      referenceUrl: linkConfig.directOfficialUrl || referenceUrl,
      retailer: linkConfig.primaryRetailer || defaultRetailer,
      status: linkConfig.status,
      buttonLabel: linkConfig.buttonLabel || (linkConfig.affiliateUrl ? 'Check on Retailer' : 'View Official Listing'),
      isApprovedAffiliate: Boolean(linkConfig.affiliateUrl && linkConfig.affiliateUrl.length > 5)
    };
  }
  return {
    affiliateUrl: '',
    referenceUrl: referenceUrl,
    retailer: defaultRetailer,
    status: 'pending_affiliate_tag',
    buttonLabel: 'View Official Listing',
    isApprovedAffiliate: false
  };
}

/**
 * Variant 1 — Featured Product Card (Flagship GTA 6 Editions)
 */
function renderFeaturedCard(product) {
  const aff = getAffiliateDetails(product.id, product.reference_url, product.affiliate_network);
  const isPhysicalBox = product.format?.includes('Physical Code-in-Box');

  return `
  <div class="card card-interactive group" data-product-card data-product-id="${product.id}" data-category="${product.category}" data-platform="${product.platform || ''}" data-format="${product.format || ''}" data-title="${product.title}">
    <!-- Header Badges -->
    <div class="flex items-center justify-between mb-3">
      <span class="badge ${product.edition_type === 'Ultimate' ? 'badge-purple' : 'badge-blue'}">${product.edition_type || 'Edition'}</span>
      <div class="flex items-center gap-1.5">
        <button type="button" class="btn btn-outline btn-sm p-1.5 text-muted hover:text-accent-primary" data-wishlist-toggle data-product-id="${product.id}" data-product-title="${product.title}" aria-label="Save to Wishlist">
          ${ICONS.heart}
        </button>
        <button type="button" class="btn btn-outline btn-sm p-1.5 text-muted hover:text-accent-primary" data-compare-toggle data-product-id="${product.id}" data-product-title="${product.title}" data-product-platform="${product.platform || ''}" data-product-format="${product.format || ''}" data-product-edition="${product.edition_type || ''}" aria-label="Add to Compare">
          ${ICONS.compare}
        </button>
      </div>
    </div>

    <!-- Product Title & Details -->
    <h3 class="text-xl font-bold text-primary mb-2 group-hover:text-accent-primary transition-colors">${product.title}</h3>
    
    <div class="flex flex-wrap items-center gap-2 mb-4 text-xs">
      <span class="bg-surface-elevated text-secondary px-2.5 py-1 rounded border border-subtle font-medium">${product.platform || 'Multi-platform'}</span>
      <span class="bg-surface-elevated text-secondary px-2.5 py-1 rounded border border-subtle font-medium">${product.format || 'Digital'}</span>
      ${product.commission_eligible ? `<span class="text-accent-primary flex items-center gap-1 font-semibold">${ICONS.check} Verified Retailer</span>` : ''}
    </div>

    <!-- Consumer Notice for Code-in-box -->
    ${isPhysicalBox ? `
      <div class="bg-surface-elevated/60 border border-subtle p-3 rounded-lg text-xs text-secondary mb-4 flex items-start gap-2">
        <span class="text-accent-primary mt-0.5">${ICONS.info}</span>
        <div>
          <strong class="text-primary">Important Packaging Notice:</strong> Physical retail box includes a high-speed digital download voucher code (no game disc inside).
        </div>
      </div>
    ` : ''}

    <p class="text-sm text-secondary mb-6 flex-1 leading-relaxed">
      ${product.notes || 'Official publisher verified edition for Grand Theft Auto VI.'}
    </p>

    <!-- Pricing / Retailer Footer -->
    <div class="pt-4 border-t border-subtle flex items-center justify-between gap-3 mt-auto">
      <div>
        <div class="text-[11px] text-muted uppercase tracking-wider">Retailer Listing</div>
        <div class="text-sm font-semibold text-primary">${aff.retailer}</div>
      </div>
      <a href="${aff.affiliateUrl || aff.referenceUrl}" 
         target="_blank" 
         rel="sponsored noopener noreferrer"
         data-affiliate-btn 
         data-product-id="${product.id}"
         data-product-name="${product.title}"
         data-retailer="${aff.retailer}"
         data-affiliate-url="${aff.affiliateUrl}"
         data-reference-url="${aff.referenceUrl}"
         class="btn btn-primary btn-sm">
        ${aff.buttonLabel}
        ${ICONS.external}
      </a>
    </div>
  </div>`;
}

/**
 * Variant 2 — Catalogue Product Card (Franchise, Merch & Accessories)
 */
function renderCatalogueCard(product) {
  const aff = getAffiliateDetails(product.id, product.reference_url, product.affiliate_network);

  return `
  <div class="card card-interactive group" data-product-card data-product-id="${product.id}" data-category="${product.category}" data-platform="${product.platform || ''}" data-format="${product.format || product.merch_type || product.hardware_type || ''}" data-title="${product.title}" data-year="${product.catalogue_number || 0}">
    <div class="flex items-center justify-between mb-3">
      <span class="badge ${product.category === 'official_merch' ? 'badge-purple' : product.category === 'gaming_accessories' ? 'badge-blue' : ''}">${product.subcategory || product.category.replace('_', ' ')}</span>
      <div class="flex items-center gap-1">
        <button type="button" class="btn btn-outline btn-sm p-1.5 text-muted hover:text-accent-primary" data-wishlist-toggle data-product-id="${product.id}" data-product-title="${product.title}" aria-label="Save to Wishlist">
          ${ICONS.heart}
        </button>
        <button type="button" class="btn btn-outline btn-sm p-1.5 text-muted hover:text-accent-primary" data-compare-toggle data-product-id="${product.id}" data-product-title="${product.title}" data-product-platform="${product.platform || ''}" data-product-format="${product.format || ''}" aria-label="Add to Compare">
          ${ICONS.compare}
        </button>
      </div>
    </div>

    <h4 class="text-base font-bold text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">${product.title}</h4>

    <div class="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted">
      ${product.platform ? `<span class="bg-surface-elevated px-2 py-0.5 rounded border border-subtle text-secondary">${product.platform}</span>` : ''}
      ${product.hardware_type || product.merch_type ? `<span class="bg-surface-elevated px-2 py-0.5 rounded border border-subtle text-secondary">${product.hardware_type || product.merch_type}</span>` : ''}
    </div>

    <p class="text-xs text-secondary mb-4 flex-1 line-clamp-3 leading-relaxed">
      ${product.notes || 'Verified product listing in the GTA Gaming Hub catalogue.'}
    </p>

    <div class="pt-3 border-t border-subtle flex items-center justify-between gap-2 mt-auto">
      <span class="text-xs text-muted font-medium">${aff.retailer}</span>
      <a href="${aff.affiliateUrl || aff.referenceUrl}" 
         target="_blank" 
         rel="sponsored noopener noreferrer"
         data-affiliate-btn 
         data-product-id="${product.id}"
         data-product-name="${product.title}"
         data-retailer="${aff.retailer}"
         data-affiliate-url="${aff.affiliateUrl}"
         data-reference-url="${aff.referenceUrl}"
         class="btn btn-secondary btn-sm text-xs">
        ${aff.isApprovedAffiliate ? 'Check on Amazon' : 'View Listing'}
        ${ICONS.external}
      </a>
    </div>
  </div>`;
}

module.exports = {
  renderFeaturedCard,
  renderCatalogueCard,
  getAffiliateDetails
};
