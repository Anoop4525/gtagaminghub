/**
 * Navigation & Header Interactions for GTA Gaming Hub
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    mobileDrawerClose?.focus();
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('hidden');
    document.body.style.overflow = '';
    mobileMenuBtn?.focus();
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      closeDrawer();
    }
  });

  // 2. Announcement Strip Dismissal
  const announcementBar = document.getElementById('site-announcement');
  const dismissBtn = document.getElementById('dismiss-announcement');
  if (announcementBar && dismissBtn) {
    if (sessionStorage.getItem('announcement_dismissed') === 'true') {
      announcementBar.style.display = 'none';
    }
    dismissBtn.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      sessionStorage.setItem('announcement_dismissed', 'true');
    });
  }

  // 3. Compact Header on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.paddingTop = '0.5rem';
        header.style.paddingBottom = '0.5rem';
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4)';
      } else {
        header.style.paddingTop = '0.85rem';
        header.style.paddingBottom = '0.85rem';
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // 4. Highlight Active Navigation Links
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/index\.html$/, '/');
    if (cleanHref === currentPath || (cleanHref !== '/' && currentPath.startsWith(cleanHref))) {
      link.classList.add('active');
    }
  });
});
