# GTA Gaming Hub — World-Class Independent GTA Discovery Platform

> **Domain:** https://gtagaminghub.store  
> **Brand Tagline:** Discover. Compare. Play.  
> **Secondary Tagline:** Your Independent GTA Gaming Discovery Hub

---

## 🎮 Overview

**GTA Gaming Hub** is a premium, high-performance, SEO-engineered affiliate product discovery and comparison platform. Built with semantic HTML5, modern vanilla JavaScript, and a tailored Tailwind CSS design system, it delivers an extraordinary user experience with **zero framework bloat**.

The platform is designed specifically around **Grand Theft Auto VI**, supporting verified editions (Standard, Ultimate, Upgrade pack), the complete franchise catalogue (from 1997's GTA 1 to modern GTA V Enhanced), official Rockstar merchandise, and high-yield gaming peripherals (PS5 NVMe SSDs, DualSense controllers, headsets).

---

## ⚡ Key Highlights & Architecture

* **Static-First Performance:** Pre-rendered HTML for all 38+ canonical routes. Sub-second load times, passing Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1).
* **Zero-Framework Vanilla JS:** Modular ES6/vanilla scripts with zero React/Vue overhead:
  - `theme.js` — Dark/Light theme toggle with zero-flash execution.
  - `navigation.js` — Sticky translucent header, mobile drawer, announcement strip.
  - `search.js` — Instant search modal with keyboard shortcut `Ctrl+K` or `/`.
  - `filters.js` — Multi-facet filtering on platforms, categories, formats, and sorting with URL query sync.
  - `compare.js` — Side-by-side comparison engine (up to 4 products) with sticky preview bar and difference highlighting.
  - `wishlist.js` — Local browser wishlist with badge counters and toast notifications.
  - `affiliate.js` — Secure outbound click handler, telemetry, and safe fallback for missing/pending affiliate links.
  - `analytics.js` — GA4 privacy-respecting event dispatcher.
  - `consent.js` — Accessible GDPR/cookie preference manager.
* **100% Brand & Legal Independence:** Strict adherence to trademark fair use. Uses custom geometric "GG" vector branding and original illustrations. Features prominent FTC/Amazon affiliate disclosures and independence disclaimers.
* **Fact-Checked Integrity:** Explains physical "Code-in-Box" packaging (no disc), avoids publishing speculative PC versions or fake prices, and tracks Amazon India's 2.8% video game commission vs 0% console exclusions.

---

## 📁 Project Directory Structure

```text
GTA6GAMING/
├── index.html                     # Homepage (All Sections A-N)
├── 404.html                       # Custom Branded 404 Error Page
├── sitemap.xml                    # Canonical 38-URL XML Sitemap
├── robots.txt                     # Crawler directives
├── package.json                   # Build and test scripts
│
├── gta-6/                         # GTA 6 Flagship Hub & Subpages
│   ├── index.html                 # Main GTA 6 Hub
│   ├── editions/index.html        # Confirmed Editions Matrix
│   ├── ps5/index.html             # PS5 Experience & Hardware
│   ├── xbox/index.html            # Xbox Series X|S Guide
│   ├── price/index.html           # Price Integrity & Retailers
│   └── buy/index.html             # Safe Buying & Pre-order Guide
│
├── games/                         # Complete Franchise Directory
│   ├── index.html                 # Interactive Games Catalog
│   ├── gta-6/index.html           # GTA 6 Detail Page
│   ├── gta-5/index.html           # GTA V & Online
│   ├── gta-4/index.html           # GTA IV Complete
│   ├── gta-san-andreas/index.html # San Andreas
│   ├── gta-vice-city/index.html   # Vice City
│   ├── gta-3/index.html           # GTA III
│   ├── gta-trilogy/index.html     # Definitive Edition Trilogy
│   ├── gta-chinatown-wars/index.html
│   ├── gta-liberty-city-stories/index.html
│   ├── gta-vice-city-stories/index.html
│   ├── gta-1/index.html           # GTA 1 Original
│   └── gta-2/index.html           # GTA 2
│
├── compare/index.html             # Product Comparison Engine
├── merchandise/index.html         # Official Apparel & Vinyl Merch
├── accessories/index.html         # High-Yield Gaming Peripherals
├── deals/index.html               # Verified Retailer Offers
├── guides/                        # Editorial Guides Hub
│   ├── index.html
│   ├── gta-games-in-order/index.html
│   ├── gta-6-edition-comparison/index.html
│   ├── gta-6-platform-guide/index.html
│   └── gta-6-buying-guide/index.html
├── search/index.html              # Dedicated Search Page
├── wishlist/index.html            # Local Saved Products View
├── about/index.html               # About & Independence Mission
├── contact/index.html             # Contact Form
├── affiliate-disclosure/index.html# FTC & Amazon Disclosure
├── privacy-policy/index.html      # Privacy Policy
├── cookie-policy/index.html       # Cookie Policy
├── terms/index.html               # Terms of Service
├── editorial-policy/index.html    # Fact-Checking Methodology
├── admin/index.html               # Owner Management Dashboard Shell
│
├── data/                          # Central Data Models
│   ├── site-config.json           # Global Brand & Nav Settings
│   ├── products.json              # 84+ Structured Product Records
│   ├── games.json                 # 12 Detailed Game Overviews
│   ├── guides.json                # 4 Rich Buyer Guides
│   ├── affiliate-links.json       # Configurable Affiliate Tags & Links
│   ├── retailers.json             # Retailer Metadata
│   └── types.ts                   # TypeScript Interfaces
│
├── src/
│   ├── css/main.css               # Compiled Production CSS Design System
│   └── js/                        # Modular Client-side Vanilla JS
│
├── scripts/
│   ├── build.js                   # Master Static Site Generator
│   ├── template.js                # Shared Layout Engine & Schema Injector
│   └── components.js              # Reusable 4-Variant Product Card System
│
├── tests/
│   └── test-site.js               # Automated 343-Check QA Test Suite
│
├── docs/                          # Guides & Setup Documentation
│   ├── deployment.md              # Cloudflare Pages, Netlify & Vercel
│   ├── analytics-setup.md         # GA4 Measurement ID & Events Guide
│   ├── search-console-setup.md    # GSC Verification & Sitemap
│   ├── affiliate-setup.md         # Updating Affiliate Tags Guide
│   ├── copyright-checklist.md     # Legal & IP Verification
│   └── seo-checklist.md           # SEO Verification
│
└── dist/                          # Production Build Target Mirror
```

---

## 🚀 Quick Start & Build Commands

### 1. Run Static Site Generator Build
```bash
node scripts/build.js
# or
npm run build
```
This reads your central JSON data and compiles all 38+ HTML pages into both the root directory and the `dist/` production folder.

### 2. Run Automated QA Tests
```bash
node tests/test-site.js
# or
npm test
```
Runs 343 automated tests checking file integrity, `<title>`, meta descriptions, canonical tags, schema JSON-LD, sitemap validity, and zero text errors.

---

## 🛒 Updating Affiliate Links

To add your Amazon Associates India or retailer tracking links:
1. Open [`data/affiliate-links.json`](file:///c:/Users/anoop/OneDrive/Desktop/anoopB/GTA6GAMING/data/affiliate-links.json).
2. Set your tracking tag under `ownerTrackingIds.amazonIndia`.
3. Paste the generated SiteStripe link into the item's `affiliateUrl` field.
4. Run `npm run build`. Every card across the site will update automatically!
