# Google Analytics 4 (GA4) Implementation Guide

**Site:** `https://gtagaminghub.store`  
**Configuration File:** [`src/js/analytics.js`](file:///c:/Users/anoop/OneDrive/Desktop/anoopB/GTA6GAMING/src/js/analytics.js) and [`data/site-config.json`](file:///c:/Users/anoop/OneDrive/Desktop/anoopB/GTA6GAMING/data/site-config.json)

---

## 1. Setup Instructions

1. Log into [Google Analytics](https://analytics.google.com/).
2. Create an Account & Property for **GTA Gaming Hub**.
3. Under **Data Streams**, create a **Web Stream**:
   - Stream URL: `https://gtagaminghub.store`
   - Stream Name: `GTA Gaming Hub Web`
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
5. Open `data/site-config.json` and `src/js/analytics.js`, replace `G-XXXXXXXXXX` with your actual Measurement ID.
6. Run `npm run build` to update all HTML files.

---

## 2. Event Taxonomy & Telemetry

GTA Gaming Hub uses an event pipeline that strictly avoids capturing Personally Identifiable Information (PII) or sensitive tokens:

| Event Name | Trigger Condition | Parameters Collected |
| :--- | :--- | :--- |
| `page_view` | Every page load | `page_path`, `page_title`, `timestamp` |
| `view_item` | Product or Game Detail page view | `product_id`, `product_name`, `category` |
| `affiliate_click` | User clicks an outbound Buy/Check button | `product_id`, `product_name`, `retailer`, `has_affiliate_tag`, `button_position` |
| `search` | User performs a search in the modal | `search_term`, `result_count` |
| `add_to_compare` | User adds an item to comparison | `product_id`, `product_name` |
| `remove_from_compare`| User removes item from comparison | `product_id` |
| `add_to_wishlist` | User saves item to local list | `product_id` |
| `remove_from_wishlist`| User unsaves item from local list | `product_id` |

---

## 3. Distinction: Affiliate Clicks vs. Actual Sales

* **Affiliate Button Clicks (`affiliate_click`):** This records user intent and outbound traffic to Amazon India, PlayStation Store, or Xbox Store.
* **Completed Conversions & Sales:** Google Analytics cannot track sales that occur on external retailer domains (e.g. Amazon.in checkout). You must view actual sales, ordered items, and paid commissions inside your **Amazon Associates Dashboard** or partner affiliate network reports.
