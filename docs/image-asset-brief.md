# GTA Gaming Hub — Image Asset Brief (Phase 2)

> Companion to [`data/asset-manifest.json`](../data/asset-manifest.json). This is the owner-facing generation + upload guide.
> **Palette locked:** sunset tropical-night — Pink `#FF4FA3`, Orange `#FF914D`, Purple `#945BFF`, Cyan `#53E8F5` on deep `#090714`.

---

## How this works

1. Generate each image below with the paired prompt (any high-quality image generator).
2. **Keep the exact filename.** Drop it at its `FINAL PATH`. Do **not** rename.
3. Cutouts: generate/export a **PNG with true alpha**, verify the background is actually transparent (no checkerboard/white/black baked in), then export an optimized **WebP** at the same name for the site.
4. Until a file exists, the site shows an elegant gradient/vector placeholder — no broken images, no layout shift.
5. When you've uploaded a batch, tell me and I'll wire the asset loader + fallbacks (Phase 3) so each slot renders automatically.

## Hard rules for every image (legal safety)

**Never include:** human faces · recognizable game characters or celebrities · Rockstar / GTA / Take-Two logos or wordmarks · official GTA cover art, key art or screenshots · real console/car brand logos · watermarks · baked-in checkerboard/white/black behind cutouts.
**Allowed:** generic sports cars, faceless silhouettes, tropical architecture, abstract skylines, controllers, chrome/glass objects, geometric motifs.

## Shared style suffix (append to every prompt)

> `Dark tropical-night palette with neon sunset pink #FF4FA3, sunset orange #FF914D, tropical purple #945BFF and electric cyan #53E8F5 accents on deep near-black background. Premium, cinematic, editorial, high detail, clean edges, web-ready. No visible faces, no logos, no copyrighted characters or official GTA artwork, no watermark, no text.`

---

## Recommended generation order (first batch sets the look)

`BRAND-001 logo → HERO-001 composition → HERO-004 controller → HERO-003 car → HERO-002 city → CAT-001..003 platform objects → EDN-001..003 editions → ACC/MERCH sets → GUIDE/GAME tiles → TRUST + CTA`

---

## BRANDING

### BRAND-001 — `logo-main.svg` → `/assets/branding/logo-main.svg`
Header/footer wordmark. *Optional — current vector logo can stay.*
> Minimalist original monogram combining letters "G G H" into a sharp geometric emblem for a gaming brand, plus a clean futuristic "GTA Gaming Hub" wordmark. Must NOT resemble the Grand Theft Auto title lockup. Flat vector, transparent background.

### BRAND-002 — `og-default.webp` (1200×630) → `/assets/shared/og-default.webp`
Social share card.
> Branded social share banner for a premium gaming commerce site, abstract neon city horizon, a glowing geometric monogram, and space for the tagline "Discover. Compare. Play." + [style suffix]

---

## HERO (Homepage, Section B)

### HERO-001 — `hero-composition.webp` (1600×1200, transparent) → `/assets/hero/hero-composition.webp`
> Original premium 3D cutout composition for a gaming-commerce hero: a faceless gamer-inspired silhouette, a glossy futuristic controller, a stylized neon sports-car silhouette, floating glassmorphism commerce cards, and abstract tropical-night city elements, arranged as an energetic layered scene. Transparent background. + [style suffix]

### HERO-002 — `hero-neon-city.webp` (2400×1400, opaque) → `/assets/backgrounds/hero-neon-city.webp`
> Cinematic tropical-night city skyline background with glowing windows, soft pink and cyan gradient haze, geometric depth. Keep the left 55% low-detail and darker so headline text stays legible. No characters, no logos. + [style suffix]

### HERO-003 — `hero-sports-car.webp` (1400×900, transparent) → `/assets/hero/hero-sports-car.webp`
> Sleek premium stylized sports car cutout from a 3/4 rear angle with neon reflections and tropical-night luxury vibe, fully original and not resembling any specific real or in-game car, no driver visible. Transparent background. + [style suffix]

### HERO-004 — `hero-controller.webp` (1200×1200, transparent) → `/assets/hero/hero-controller.webp`
> Premium glossy 3D gaming controller cutout, original design, dark body with neon pink, cyan and violet accent lighting, luxury gaming style, no brand logos. Transparent background. + [style suffix]

---

## CATEGORIES (Homepage Section D + Quick Browse)

> Generate CAT-001..003 as a **consistent trio** (same lighting/scale), then CAT-004..008 as a cohesive icon set.

### CAT-001 — `category-playstation.webp` (800×800, transparent) → `/assets/categories/category-playstation.webp`
> Generic next-gen console with a controller, original industrial design, cyan key light, premium product render, no brand logos. Transparent background. + [style suffix]

### CAT-002 — `category-xbox.webp` (800×800, transparent) → `/assets/categories/category-xbox.webp`
> Generic next-gen console tower with a gamepad, original design, pink and orange rim light, premium product render, no brand logos. Transparent background. + [style suffix]

### CAT-003 — `category-pc.webp` (800×800, transparent) → `/assets/categories/category-pc.webp`
> Generic gaming PC setup — monitor, keyboard and mouse silhouette — violet and cyan glow, premium render, no brand logos. Transparent background. + [style suffix]

### CAT-004..008 — Quick-browse icon set (600×600, transparent)
Generate as one cohesive set, export separately to these names/paths:
- `category-games.webp` → `/assets/categories/` — abstract stacked game-case tiles with neon edges, no cover art.
- `category-editions.webp` → `/assets/categories/` — floating tiered edition panels with glowing badges.
- `category-merch.webp` → `/assets/categories/` — folded tee and cap cluster, no printed logos.
- `category-accessories.webp` → `/assets/categories/` — headset, SSD and controller cluster.
- `category-guides.webp` → `/assets/categories/` — open editorial panel with magnifier and checklist.
> Cohesive set of premium 3D icon-style cutout illustrations for category cards, same scale and lighting. Transparent background. + [style suffix]

---

## EDITIONS (GTA 6 Editions + Homepage Section C)

> One **set of three** floating panels, escalating richness Standard → Ultimate → Upgrade. No GTA cover art or logos.

- **EDN-001** `edition-standard.webp` (1000×1200, transparent) → `/assets/editions/` — luxurious floating product panel, cool cyan accent badge.
- **EDN-002** `edition-ultimate.webp` (1000×1200, transparent) → `/assets/editions/` — premium panel, pink/orange gradient emblem, richer glow.
- **EDN-003** `edition-upgrade.webp` (1000×1200, transparent) → `/assets/editions/` — add-on/license panel, violet accent, upgrade-arrow motif.
> Three premium original "edition" display panels for a gaming site, each a luxurious floating product card with a unique accent color and badge-like energy, without any copyrighted game cover art, logos or box artwork. Transparent background. + [style suffix]

---

## GAME ERA TILES (Games catalogue + detail headers)

> Four reusable **opaque gradient** tiles, mapped by era to the 12 games. No cover art, no title text.
- **GAME-001** `game-tile-modern.webp` (1200×800) → `/assets/games/` — GTA 6, GTA 5, Trilogy — pink/orange gradient + geometric skyline.
- **GAME-002** `game-tile-hd-era.webp` (1200×800) → `/assets/games/` — GTA 4 & episodes — cyan/violet city-at-night, grittier.
- **GAME-003** `game-tile-3d-era.webp` (1200×800) → `/assets/games/` — III, Vice City, San Andreas, Stories — retro-sunset vaporwave, warm, palm silhouettes.
- **GAME-004** `game-tile-2d-era.webp` (1200×800) → `/assets/games/` — GTA 1, GTA 2, Chinatown Wars — top-down grid-map, retro arcade neon.
> Abstract era-themed background tile for a game catalogue card, no cover art and no text, strong gradient and geometric depth. + [style suffix]

---

## MERCHANDISE (900×900, transparent, no printed logos)

- **MERCH-001** `merch-tshirt.webp` → `/assets/merchandise/` — folded premium blank tee, neon studio light.
- **MERCH-002** `merch-cap.webp` → `/assets/merchandise/` — embroidered-style blank cap, 3/4 angle.
- **MERCH-003** `merch-vinyl.webp` → `/assets/merchandise/` — vinyl record half-out of a blank neon sleeve.
- **MERCH-004** `merch-collectible.webp` → `/assets/merchandise/` — abstract keychain + sticker cluster.
> Premium 3D merchandise-style object cutout, original non-branded design. Transparent background. + [style suffix]

---

## ACCESSORIES (900×900, transparent, no brand logos)

- **ACC-001** `accessory-controller.webp` → `/assets/accessories/` — generic wireless controller, pink/cyan rim light.
- **ACC-002** `accessory-headset.webp` → `/assets/accessories/` — over-ear gaming headset, neon ear glow.
- **ACC-003** `accessory-ssd.webp` → `/assets/accessories/` — M.2 NVMe SSD with heatsink, cyan circuitry glow.
- **ACC-004** `accessory-monitor.webp` → `/assets/accessories/` — ultrawide gaming monitor, sunset gradient on screen.
> Premium 3D gaming accessory cutout, luxury dark-neon aesthetic, no brand logos. Transparent background. + [style suffix]

---

## TRUST

### TRUST-001 — `trust-shield.webp` (800×800, transparent) → `/assets/trust/trust-shield.webp`
> Clean premium 3D trust and security illustration: a shield, a check badge, a subtle lock and abstract data layers, cyan and pink highlights. Transparent background. + [style suffix]

---

## GUIDE THUMBNAILS (1200×800, opaque gradient, no text)

- **GUIDE-001** `guide-thumb-buying.webp` → `/assets/guides/` — shopping-decision motif (cart + checklist).
- **GUIDE-002** `guide-thumb-comparison.webp` → `/assets/guides/` — side-by-side comparison columns.
- **GUIDE-003** `guide-thumb-platform.webp` → `/assets/guides/` — dual-console split, pink vs cyan halves.
- **GUIDE-004** `guide-thumb-order.webp` → `/assets/guides/` — timeline / sequence motif.
> Premium editorial-style thumbnail illustration for a buying-guide card, abstract motif, no text. + [style suffix]

---

## CTA

### CTA-001 — `cta-newsletter-object.webp` (900×900, transparent) → `/assets/shared/cta-newsletter-object.webp`
> Small premium 3D cutout object combining abstract mail, signal and gaming-energy motifs for a newsletter section, pink and cyan highlights. Transparent background. + [style suffix]

---

## After upload — validation I'll run (Phase 3)
- Each file exists at its path & is readable
- True alpha on all cutouts (no baked background)
- Dimensions ≈ spec; re-encode oversized files to WebP/AVIF
- Explicit width/height + lazy-load wired so CLS stays ≈ 0
- Placeholder → real image swap with **zero layout change**
- Missing-asset report for anything still pending
