/**
 * Comparison Engine for GTA Gaming Hub
 * Allows users to compare up to 4 game editions or products side by side.
 */
(function() {
  const STORAGE_KEY = 'gtagaminghub_compare';
  const MAX_COMPARE = 4;

  function getCompareList() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCompareList(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      updateCompareUI();
      window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { count: items.length } }));
    } catch (e) {
      console.error('Could not save compare list', e);
    }
  }

  function updateCompareUI() {
    const items = getCompareList();

    // 1. Update check state on cards
    document.querySelectorAll('[data-compare-toggle]').forEach(btn => {
      const id = btn.getAttribute('data-product-id');
      const isSelected = items.some(item => item.id === id);
      btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      btn.classList.toggle('active', isSelected);
    });

    // 2. Update sticky bar at bottom
    let stickyBar = document.getElementById('compare-sticky-bar');
    if (!stickyBar) {
      stickyBar = document.createElement('div');
      stickyBar.id = 'compare-sticky-bar';
      stickyBar.className = 'compare-sticky-bar';
      document.body.appendChild(stickyBar);
    }

    if (items.length > 0) {
      stickyBar.classList.add('visible');
      const itemsHtml = items.map(item => `
        <span class="inline-flex items-center gap-1 bg-surface-elevated px-2 py-1 rounded text-xs text-primary border border-subtle">
          ${item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
          <button onclick="window.removeFromCompare('${item.id}')" class="text-muted hover:text-accent-primary ml-1" title="Remove">&times;</button>
        </span>
      `).join('');

      stickyBar.innerHTML = `
        <div class="container-custom flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 overflow-x-auto py-1">
            <span class="text-xs font-bold uppercase tracking-wider text-accent-primary">Comparing (${items.length}/${MAX_COMPARE}):</span>
            <div class="flex items-center gap-2">${itemsHtml}</div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button onclick="window.clearCompare()" class="btn btn-outline btn-sm text-xs">Clear</button>
            <a href="/compare/" class="btn btn-primary btn-sm text-xs">View Comparison &rarr;</a>
          </div>
        </div>
      `;
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  window.addToCompare = function(product) {
    if (!product || !product.id) return;
    let items = getCompareList();

    if (items.some(item => item.id === product.id)) {
      window.removeFromCompare(product.id);
      return;
    }

    if (items.length >= MAX_COMPARE) {
      if (window.showToast) {
        window.showToast(`Comparison limit reached (maximum ${MAX_COMPARE} items).`, 'warning');
      }
      return;
    }

    items.push({
      id: product.id,
      title: product.title,
      category: product.category,
      platform: product.platform || '',
      format: product.format || '',
      edition_type: product.edition_type || '',
      reference_url: product.reference_url || '',
      affiliate_url: product.affiliate_url || '',
      commission_rate_estimate: product.commission_rate_estimate || '',
      is_available: product.is_available !== false,
      notes: product.notes || ''
    });

    saveCompareList(items);
    if (window.showToast) window.showToast(`Added to comparison`, 'success');
    if (window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent('add_to_compare', { product_id: product.id, product_name: product.title });
    }
  };

  window.removeFromCompare = function(id) {
    let items = getCompareList();
    items = items.filter(item => item.id !== id);
    saveCompareList(items);
    if (window.showToast) window.showToast(`Removed from comparison`, 'info');
    if (window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent('remove_from_compare', { product_id: id });
    }
  };

  window.clearCompare = function() {
    localStorage.removeItem(STORAGE_KEY);
    updateCompareUI();
    if (window.showToast) window.showToast('Comparison cleared', 'info');
  };

  window.getCompareItems = getCompareList;

  document.addEventListener('DOMContentLoaded', () => {
    updateCompareUI();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-compare-toggle]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const product = {
        id: btn.getAttribute('data-product-id'),
        title: btn.getAttribute('data-product-title') || 'Product',
        category: btn.getAttribute('data-product-category') || '',
        platform: btn.getAttribute('data-product-platform') || '',
        format: btn.getAttribute('data-product-format') || '',
        edition_type: btn.getAttribute('data-product-edition') || '',
        notes: btn.getAttribute('data-product-notes') || ''
      };

      window.addToCompare(product);
    });
  });
})();
