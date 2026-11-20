/**
 * Local Wishlist Manager for GTA Gaming Hub
 * Stores saved products in localStorage without requiring any user registration.
 */
(function() {
  const STORAGE_KEY = 'gtagaminghub_wishlist';

  function getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      updateWishlistCounters();
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { count: items.length } }));
    } catch (e) {
      console.error('Could not save wishlist', e);
    }
  }

  function updateWishlistCounters() {
    const items = getWishlist();
    document.querySelectorAll('.wishlist-counter').forEach(el => {
      el.textContent = items.length;
      if (items.length > 0) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Update heart icons on cards
    document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
      const id = btn.getAttribute('data-product-id');
      const isSaved = items.some(item => item.id === id);
      btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      btn.classList.toggle('active', isSaved);
      
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.style.fill = isSaved ? '#B7FF42' : 'none';
        svg.style.stroke = isSaved ? '#B7FF42' : 'currentColor';
      }
    });
  }

  window.toggleWishlist = function(product) {
    if (!product || !product.id) return;
    let items = getWishlist();
    const index = items.findIndex(item => item.id === product.id);

    if (index > -1) {
      items.splice(index, 1);
      saveWishlist(items);
      if (window.showToast) window.showToast(`Removed from saved list`, 'info');
      if (window.trackAnalyticsEvent) {
        window.trackAnalyticsEvent('remove_from_wishlist', { product_id: product.id });
      }
    } else {
      items.push({
        id: product.id,
        title: product.title,
        category: product.category,
        platform: product.platform || '',
        price: product.price || '',
        url: product.url || window.location.pathname
      });
      saveWishlist(items);
      if (window.showToast) window.showToast(`Added to saved list`, 'success');
      if (window.trackAnalyticsEvent) {
        window.trackAnalyticsEvent('add_to_wishlist', { product_id: product.id });
      }
    }
  };

  window.getWishlistItems = getWishlist;

  window.clearWishlist = function() {
    localStorage.removeItem(STORAGE_KEY);
    updateWishlistCounters();
    if (window.showToast) window.showToast('Saved list cleared', 'info');
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCounters();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-wishlist-toggle]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const product = {
        id: btn.getAttribute('data-product-id'),
        title: btn.getAttribute('data-product-title') || 'Product',
        category: btn.getAttribute('data-product-category') || '',
        platform: btn.getAttribute('data-product-platform') || '',
        url: btn.getAttribute('data-product-url') || window.location.pathname
      };

      window.toggleWishlist(product);
    });
  });
})();
