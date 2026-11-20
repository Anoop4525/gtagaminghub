# Affiliate Setup & Link Management Guide

**Site:** `https://gtagaminghub.store`  
**Configuration File:** [`data/affiliate-links.json`](file:///c:/Users/anoop/OneDrive/Desktop/anoopB/GTA6GAMING/data/affiliate-links.json)

---

## 1. How the Configurable Affiliate System Works

In GTA Gaming Hub, you never need to manually edit raw HTML pages to add or update affiliate links. All affiliate links, button labels, and retailer targets are controlled centrally in `data/affiliate-links.json`.

---

## 2. Step-by-Step: Adding Amazon Associates Links

1. **Log in to Amazon Associates India:** Visit [affiliate-program.amazon.in](https://affiliate-program.amazon.in/).
2. **Find the Target Product:** Locate the verified listing (e.g., *GTA VI Standard Edition PS5* or *PS5 DualSense Controller*).
3. **Generate Tracking Link:** Use Amazon SiteStripe at the top of the page to copy your Short Link or Full Link with your tracking tag (e.g. `tag=yourtag-21`).
4. **Update `data/affiliate-links.json`:**
   ```json
   "gta6-ps5-standard-box": {
     "productId": "gta6-ps5-standard-box",
     "primaryRetailer": "Amazon India",
     "affiliateUrl": "https://www.amazon.in/dp/B0H6X8VNQC?tag=yourtag-21",
     "directOfficialUrl": "https://www.amazon.in/Grand-Theft-Auto-Standard-PlayStation/dp/B0H6X8VNQC",
     "status": "active",
     "commissionCategory": "Video Games (2.8%)",
     "buttonLabel": "Check on Amazon India",
     "fallbackLabel": "View on Amazon"
   }
   ```
5. **Rebuild the Site:**
   ```bash
   npm run build
   ```
   All product cards, comparison views, and detail pages will automatically update with your live affiliate link and `rel="sponsored noopener noreferrer"`.

---

## 3. Commission Rate Awareness for Amazon India

* **Video Games (Physical Box / Code-in-Box):** 2.8%
* **Gaming Consoles (PS5 / Xbox Series X|S):** 0% (Excluded from commission schedule)
* **Gaming Accessories (DualSense, Headsets, M.2 SSDs, Chairs):** 4% – 9% (Highest earning potential)
