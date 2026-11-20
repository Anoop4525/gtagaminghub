# Technical SEO & Core Web Vitals Checklist

**Site:** `https://gtagaminghub.store`

---

## 1. Technical SEO Architecture

- [x] **Semantic HTML5:** Native `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` elements on all pages.
- [x] **Unique Meta Titles & Descriptions:** 38+ unique titles and tailored meta descriptions mapped to buyer-intent keywords (*GTA 6 buy India*, *GTA 6 editions*, *GTA 6 PS5*, *GTA games in order*).
- [x] **Strict Canonical URLs:** Self-referencing `<link rel="canonical">` on every page matching `https://gtagaminghub.store/...`.
- [x] **Open Graph & Twitter Cards:** Full OG tags on all pages with title, description, image, and canonical URL.
- [x] **Structured Data (JSON-LD):**
  - `WebSite` & `Organization` schema with search action
  - `BreadcrumbList` schema on internal hubs
  - `Product` & `Offer` schema on verified retail listings
- [x] **Sitemap.xml:** Complete 38-URL sitemap generated at `/sitemap.xml` with `<lastmod>`, `<changefreq>`, and `<priority>`.
- [x] **Robots.txt:** Optimized crawl directives permitting all spiders, disallowing `/admin/` and dynamic search queries.
- [x] **Helpful 404 Page:** Custom branded `/404.html` with direct navigation paths back to high-traffic hubs.

---

## 2. Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** Target < 2.5s (achieved via zero external script bloat, inline SVG logo, and instant static HTML delivery).
- **Interaction to Next Paint (INP):** Target < 200ms (achieved via passive scroll listeners, lightweight vanilla JS event delegation).
- **Cumulative Layout Shift (CLS):** Target < 0.1 (achieved via explicit SVG dimensions, fixed header heights, zero jarring layout shifts).
