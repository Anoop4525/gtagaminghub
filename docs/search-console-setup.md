# Google Search Console Verification & SEO Monitoring

**Domain:** `https://gtagaminghub.store`  
**Sitemap:** `https://gtagaminghub.store/sitemap.xml`

---

## 1. Domain Verification Workflow

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain Property** and enter: `gtagaminghub.store` (this covers all subdomains, http, and https protocols).
3. Copy the provided TXT record (e.g., `google-site-verification=XXXXXXXXXX`).
4. Go to your DNS provider (Cloudflare / Namecheap / Hostinger) and create a new **TXT record** at `@` with the copied token.
5. Click **Verify** in Search Console.

---

## 2. Submit XML Sitemap

1. In Search Console, select `gtagaminghub.store`.
2. Go to **Index** > **Sitemaps**.
3. Under **Add a new sitemap**, enter: `sitemap.xml` and click **Submit**.
4. Confirm status shows **Success** and 38+ discovered URLs.

---

## 3. Post-Launch Monitoring Routine

* **URL Inspection:** Inspect `https://gtagaminghub.store/gta-6/` and `https://gtagaminghub.store/gta-6/editions/` to request initial indexing.
* **Page Indexing Report:** Ensure no canonical errors or 404s on core product pages.
* **Core Web Vitals:** Verify that Mobile and Desktop URLs pass LCP (< 2.5s), INP (< 200ms), and CLS (< 0.1).
