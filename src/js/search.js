/**
 * Instant Search Engine & Modal for GTA Gaming Hub
 * Features Ctrl+K shortcut, real-time index lookup, categorization & suggestions.
 */
(function() {
  let searchIndex = [];
  let isIndexLoaded = false;

  async function loadSearchIndex() {
    if (isIndexLoaded) return;
    try {
      const [productsRes, gamesRes] = await Promise.all([
        fetch('/data/products.json').then(r => r.json()).catch(() => []),
        fetch('/data/games.json').then(r => r.json()).catch(() => [])
      ]);

      const items = [];

      // Map games
      gamesRes.forEach(g => {
        items.push({
          type: 'Game',
          title: g.title,
          subtitle: g.subtitle || g.setting,
          url: `/games/${g.slug}/`,
          keywords: `${g.title} ${g.subtitle} ${g.setting} ${g.supportedPlatforms.join(' ')}`
        });
      });

      // Map products & editions
      productsRes.forEach(p => {
        let url = '/gta-6/editions/';
        if (p.category === 'franchise_games') url = '/games/';
        else if (p.category === 'official_merch') url = '/merchandise/';
        else if (p.category === 'gaming_accessories') url = '/accessories/';

        items.push({
          type: p.category === 'gta6_editions' ? 'GTA 6 Edition' : 
                p.category === 'official_merch' ? 'Merchandise' : 
                p.category === 'gaming_accessories' ? 'Accessory' : 'Product',
          title: p.title,
          subtitle: p.platform || p.format || p.subcategory || '',
          url: url,
          keywords: `${p.title} ${p.category} ${p.subcategory} ${p.platform || ''} ${p.format || ''}`
        });
      });

      searchIndex = items;
      isIndexLoaded = true;
    } catch (e) {
      console.error('Failed to load search index', e);
    }
  }

  function openSearchModal() {
    loadSearchIndex();
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 50);

    if (window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent('search_opened');
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      renderSuggestions();
      return;
    }

    const matches = searchIndex.filter(item => 
      item.keywords.toLowerCase().includes(trimmed)
    ).slice(0, 10);

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-8 text-center text-muted">
          <p class="text-sm">No verified products found matching "<strong>${escapeHtml(query)}</strong>"</p>
          <p class="text-xs mt-2">Try searching for <em>GTA 6</em>, <em>PS5</em>, <em>Ultimate Edition</em>, or <em>DualSense</em>.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="space-y-2 py-2">
        ${matches.map((item, idx) => `
          <a href="${item.url}" class="search-result-item flex items-center justify-between p-3 rounded-lg hover:bg-surface-elevated border border-transparent hover:border-subtle transition" data-index="${idx}">
            <div>
              <div class="text-xs font-semibold text-accent-primary uppercase tracking-wider mb-0.5">${item.type}</div>
              <div class="text-sm font-medium text-primary">${escapeHtml(item.title)}</div>
              ${item.subtitle ? `<div class="text-xs text-secondary mt-0.5">${escapeHtml(item.subtitle)}</div>` : ''}
            </div>
            <span class="text-xs text-muted">&rarr;</span>
          </a>
        `).join('')}
      </div>
    `;

    if (window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent('search', { search_term: trimmed, result_count: matches.length });
    }
  }

  function renderSuggestions() {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const suggestions = ['GTA 6 Editions', 'PlayStation 5', 'Xbox Series X', 'Definitive Edition', 'DualSense', 'Vinyl Soundtrack'];
    resultsContainer.innerHTML = `
      <div class="py-4">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Popular Searches</p>
        <div class="flex flex-wrap gap-2">
          ${suggestions.map(s => `
            <button type="button" class="search-suggestion-btn text-xs bg-surface-elevated text-secondary hover:text-accent-primary hover:border-active border border-subtle px-3 py-1.5 rounded-full transition" data-search="${s}">
              ${s}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Keyboard shortcut Ctrl+K or /
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape') {
        closeSearchModal();
      }
    });

    document.querySelectorAll('[data-open-search]').forEach(btn => {
      btn.addEventListener('click', openSearchModal);
    });

    const closeBtn = document.getElementById('search-modal-close');
    const backdrop = document.getElementById('search-modal-backdrop');
    const input = document.getElementById('search-input');

    if (closeBtn) closeBtn.addEventListener('click', closeSearchModal);
    if (backdrop) backdrop.addEventListener('click', closeSearchModal);

    if (input) {
      input.addEventListener('input', (e) => {
        performSearch(e.target.value);
      });
    }

    document.addEventListener('click', (e) => {
      const suggestionBtn = e.target.closest('.search-suggestion-btn');
      if (suggestionBtn && input) {
        const query = suggestionBtn.getAttribute('data-search');
        input.value = query;
        performSearch(query);
      }
    });

    renderSuggestions();
  });

  window.openSearch = openSearchModal;
})();
