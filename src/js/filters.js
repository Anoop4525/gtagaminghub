/**
 * Multi-Facet Filter & Sort Controller for GTA Gaming Hub
 * Filters product cards on catalogue pages with live URL query synchronization.
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('catalog-filter-form');
  const catalogGrid = document.getElementById('catalog-product-grid');
  const resetBtn = document.getElementById('reset-filters-btn');
  const countDisplay = document.getElementById('filter-result-count');

  if (!catalogGrid) return;

  function applyFilters() {
    const cards = Array.from(catalogGrid.querySelectorAll('[data-product-card]'));
    if (!cards.length) return;

    // Read current form inputs
    const platformFilter = document.querySelector('select[name="platform"]')?.value || 'all';
    const categoryFilter = document.querySelector('select[name="category"]')?.value || 'all';
    const formatFilter = document.querySelector('select[name="format"]')?.value || 'all';
    const sortOrder = document.querySelector('select[name="sort"]')?.value || 'relevance';
    const searchInput = document.querySelector('input[name="filter-search"]')?.value.toLowerCase().trim() || '';

    let visibleCount = 0;

    cards.forEach(card => {
      const cardPlatform = (card.getAttribute('data-platform') || '').toLowerCase();
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardFormat = (card.getAttribute('data-format') || '').toLowerCase();
      const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();

      let match = true;

      if (platformFilter !== 'all' && !cardPlatform.includes(platformFilter.toLowerCase())) {
        match = false;
      }
      if (categoryFilter !== 'all' && cardCategory !== categoryFilter.toLowerCase()) {
        match = false;
      }
      if (formatFilter !== 'all' && !cardFormat.includes(formatFilter.toLowerCase())) {
        match = false;
      }
      if (searchInput && !cardTitle.includes(searchInput)) {
        match = false;
      }

      if (match) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Sorting
    if (sortOrder !== 'relevance') {
      const sortedCards = cards.filter(c => c.style.display !== 'none').sort((a, b) => {
        const titleA = a.getAttribute('data-title') || '';
        const titleB = b.getAttribute('data-title') || '';
        const yearA = parseInt(a.getAttribute('data-year') || '0', 10);
        const yearB = parseInt(b.getAttribute('data-year') || '0', 10);

        if (sortOrder === 'alpha-asc') return titleA.localeCompare(titleB);
        if (sortOrder === 'alpha-desc') return titleB.localeCompare(titleA);
        if (sortOrder === 'year-desc') return yearB - yearA;
        if (sortOrder === 'year-asc') return yearA - yearB;
        return 0;
      });

      sortedCards.forEach(c => catalogGrid.appendChild(c));
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} verified ${visibleCount === 1 ? 'item' : 'items'}`;
    }

    // Sync query string
    const params = new URLSearchParams();
    if (platformFilter !== 'all') params.set('platform', platformFilter);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (formatFilter !== 'all') params.set('format', formatFilter);
    if (sortOrder !== 'relevance') params.set('sort', sortOrder);
    if (searchInput) params.set('q', searchInput);

    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newQuery);
  }

  // Restore filters from URL params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('platform')) {
    const sel = document.querySelector('select[name="platform"]');
    if (sel) sel.value = urlParams.get('platform');
  }
  if (urlParams.has('category')) {
    const sel = document.querySelector('select[name="category"]');
    if (sel) sel.value = urlParams.get('category');
  }
  if (urlParams.has('format')) {
    const sel = document.querySelector('select[name="format"]');
    if (sel) sel.value = urlParams.get('format');
  }
  if (urlParams.has('sort')) {
    const sel = document.querySelector('select[name="sort"]');
    if (sel) sel.value = urlParams.get('sort');
  }
  if (urlParams.has('q')) {
    const input = document.querySelector('input[name="filter-search"]');
    if (input) input.value = urlParams.get('q');
  }

  filterForm?.addEventListener('change', applyFilters);
  document.querySelector('input[name="filter-search"]')?.addEventListener('input', applyFilters);

  resetBtn?.addEventListener('click', () => {
    filterForm?.reset();
    applyFilters();
  });

  // Initial run
  applyFilters();
});
