# Hosting & Deployment Guide — GTA Gaming Hub

**Domain:** `https://gtagaminghub.store`  
**Platform Architecture:** Static-First Multi-Page Application (HTML5, Tailwind CSS, Vanilla JS)

---

## 1. Cloudflare Pages Deployment (Recommended)

Cloudflare Pages provides global edge distribution, free automated SSL/TLS certificates, DDoS protection, and instantaneous page load times.

### Step 1: Connect Git Repository
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository (`GTA6GAMING` or `gtagaminghub-store`).

### Step 2: Build Settings
- **Framework preset:** `None` / `Custom`
- **Build command:** `node scripts/build.js`
- **Build output directory:** `dist`
- **Node.js version:** `20.x` or higher

### Step 3: Custom Domain Linking
1. In Cloudflare Pages, navigate to **Custom Domains** > **Set up a domain**.
2. Enter `gtagaminghub.store` and `www.gtagaminghub.store`.
3. Cloudflare will automatically provision DNS CNAME records and SSL certificates.
4. Enable **Always Use HTTPS** and **Automatic HTTPS Rewrites**.

---

## 2. Netlify Deployment

1. Go to [Netlify](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Connect your Git provider.
3. Set build configuration:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Domain management**, add custom domain `gtagaminghub.store`.
5. Netlify will issue a Let's Encrypt SSL certificate automatically.

---

## 3. Vercel Deployment

1. Import project into [Vercel Dashboard](https://vercel.com/dashboard).
2. Set Framework Preset to **Other**.
3. Set Build Command: `node scripts/build.js`
4. Set Output Directory: `dist`
5. Assign domain `gtagaminghub.store` under **Settings** > **Domains**.

---

## 4. DNS Configuration Matrix

If using an external domain registrar (e.g., Hostinger, GoDaddy, Namecheap) pointing to Cloudflare/Netlify:

| Record Type | Host / Name | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A / ALIAS / ANAME** | `@` (root) | Provider IP / DNS target | Auto |
| **CNAME** | `www` | `gtagaminghub.pages.dev` (or Netlify URL) | Auto |
| **TXT** | `@` | Google Search Console verification token | Auto |

---

## 5. Security & Caching Headers

Add a `_headers` file in `public/` or configure on your edge provider:

```http
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
