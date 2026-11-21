# PlayStation Affiliate Candidate Shortlist

> Source: `GTA_Gaming_Hub_200_PS_Amazon_Candidates.xlsx` → structured as [`data/affiliate-candidates.json`](../data/affiliate-candidates.json)
> **Status: PROSPECTING — NOT VERIFIED.** 0 of 200 items confirmed, 0 affiliate links added. The goal is **not** complete.

## What this is (and is not)

- It **is** a prioritized research shortlist of 200 PlayStation-related Amazon India *search candidates*, tiered by potential commission.
- It is **not** verified inventory. Every row has empty `productUrl`, `asin`, and `affiliateUrl`, `verified: false`, and `lastVerified: null`.
- The rate figures are **illustrative category rates** from the source sheet. Amazon India applies per-product exclusions that can override a category rate — including dropping it to **0%**.

> ⚠️ I cannot confirm live ASINs, stock, or current commission eligibility from here — that requires manual checks on Amazon.in / the Associates dashboard against the current fee schedule. Nothing below is a verified listing.

## Priority tiers

| Tier | Rate | Collections | Items | Monetize? |
|---|---|---|---|---|
| **A — Priority** | 7.5% | Gaming bags & luggage, Gaming apparel | 40 | ✅ Yes — lead earners, verify first |
| **B — Strong** | 4.0–4.72% | Books & guides (4.72), Room lighting & decor, Desk organization, Shelves & display (4.25), Furniture, Room textiles & comfort (4.0) | 120 | ✅ Yes |
| **C — Deprioritized** | 2.8% | PS games physical, PS4 games physical | 40 | ⚠️ Caution |

**Why C is caution, not go:** physical PlayStation games (and consoles/electronics) on Amazon India frequently fall into **reduced or 0% exclusion tiers**. Per your rule *"do not publish known 0%-commission products as monetized recommendations,"* treat Tier C as content/SEO value — **do not feature them as earners until each ASIN's eligibility is individually confirmed > 0%.** Any that verify at 0% move to the `excluded` list.

## Recommended verification order
1. **Tier A (40)** — highest return per conversion. Confirm ASIN + eligibility, add affiliate link.
2. **Tier B (120)** — work by sub-rate: 4.72% books → 4.25% décor/office → 4.0% furniture/textiles.
3. **Tier C (40)** — only if an ASIN confirms > 0%; otherwise exclude.

## Per-item verification checklist (before `verified: true`)
For each candidate, from its `searchUrl`:
- [ ] Find the real product detail page → fill `productUrl`
- [ ] Record the exact `asin`
- [ ] Confirm **current availability / in stock**
- [ ] Confirm the **actual Amazon category** (not the candidate guess) and its **current** rate
- [ ] Confirm `asinEligibility` is **not excluded / not 0%**
- [ ] Generate the Associates **Special Link** → fill `affiliateUrl`
- [ ] Use **licensed product imagery** (not AI merch) for real listings
- [ ] Set `verified: true`, stamp `lastVerified` (YYYY-MM-DD)
- Only then may the UI render **"Buy on Amazon"** for that item.

## Rules enforced in the data model
- `productUrl` and `affiliateUrl` are **separate** fields, both `null` until verified.
- No invented tracking IDs, prices, discounts, or ratings anywhere.
- `monetize: "caution"` on all Tier C.
- `excluded: []` — confirmed 0%/ineligible ASINs get moved here with a reason + date.
- `summary.verifiedCount` / `summary.lastVerified` stay at `0` / `null` until real checks happen.

## Integration note
This is deliberately **separate** from `data/products.json` (the live, published catalogue). Candidates graduate into the live catalogue **one at a time, only after `verified: true`** — so nothing unverified can ever render a live affiliate button.
