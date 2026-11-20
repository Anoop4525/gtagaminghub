const fs = require('fs');
const path = require('path');
const {
  siteConfig,
  products,
  games,
  guides,
  affiliateConfig,
  retailers,
  ICONS,
  renderHtmlDocument
} = require('./template');

const { renderFeaturedCard, renderCatalogueCard } = require('./components');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Helper to write files to both ROOT and DIST for maximum deployment compatibility
function writeHtmlPage(relativeFilePath, htmlContent) {
  const rootTarget = path.join(ROOT_DIR, relativeFilePath);
  const distTarget = path.join(DIST_DIR, relativeFilePath);

  // Ensure directories exist
  fs.mkdirSync(path.dirname(rootTarget), { recursive: true });
  fs.mkdirSync(path.dirname(distTarget), { recursive: true });

  fs.writeFileSync(rootTarget, htmlContent, 'utf8');
  fs.writeFileSync(distTarget, htmlContent, 'utf8');
  console.log(`✓ Built: ${relativeFilePath}`);
}

// Ensure static assets are mirrored to dist
function mirrorAssets() {
  const dirsToMirror = [
    { src: path.join(ROOT_DIR, 'src'), dest: path.join(DIST_DIR, 'src') },
    { src: path.join(ROOT_DIR, 'public'), dest: path.join(DIST_DIR, 'public') },
    { src: path.join(ROOT_DIR, 'data'), dest: path.join(DIST_DIR, 'data') }
  ];

  dirsToMirror.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  });

  // Mirror favicon and robots to dist root
  if (fs.existsSync(path.join(ROOT_DIR, 'public/favicon.svg'))) {
    fs.copyFileSync(path.join(ROOT_DIR, 'public/favicon.svg'), path.join(DIST_DIR, 'favicon.svg'));
    fs.copyFileSync(path.join(ROOT_DIR, 'public/favicon.svg'), path.join(ROOT_DIR, 'favicon.svg'));
  }
  if (fs.existsSync(path.join(ROOT_DIR, 'public/robots.txt'))) {
    fs.copyFileSync(path.join(ROOT_DIR, 'public/robots.txt'), path.join(DIST_DIR, 'robots.txt'));
    fs.copyFileSync(path.join(ROOT_DIR, 'public/robots.txt'), path.join(ROOT_DIR, 'robots.txt'));
  }
}

// -------------------------------------------------------------
// 1. HOMEPAGE GENERATOR
// -------------------------------------------------------------
function buildHomepage() {
  const gta6Products = products.filter(p => p.category === 'gta6_editions');
  const featuredGames = games.slice(0, 6);
  const featuredGuides = guides.slice(0, 3);

  const heroGraphic = `
  <div class="relative w-full max-w-lg mx-auto py-6 flex items-center justify-center">
    <!-- Abstract Vector Cityscape & Hex Grid -->
    <svg viewBox="0 0 500 320" class="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#171E2B" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#080B12" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="neonLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7A5CFF"/>
          <stop offset="50%" stop-color="#39B8FF"/>
          <stop offset="100%" stop-color="#B7FF42"/>
        </linearGradient>
      </defs>
      <!-- Background Map Grid -->
      <path d="M 50,280 L 450,280 M 80,240 L 420,240 M 120,200 L 380,200 M 160,160 L 340,160" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none"/>
      <path d="M 100,280 L 160,160 M 200,280 L 220,160 M 300,280 L 280,160 M 400,280 L 340,160" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none"/>
      
      <!-- Abstract Stylized Buildings -->
      <polygon points="120,280 120,130 160,130 160,280" fill="#101520" stroke="rgba(255,255,255,0.1)"/>
      <polygon points="170,280 170,90 220,70 230,280" fill="#171E2B" stroke="url(#neonLine)" stroke-width="2"/>
      <polygon points="240,280 240,110 290,110 290,280" fill="#101520" stroke="rgba(255,255,255,0.1)"/>
      <polygon points="300,280 300,140 350,140 350,280" fill="#171E2B" stroke="rgba(57,184,255,0.4)"/>
      
      <!-- Horizon Neon Bar -->
      <line x1="50" y1="280" x2="450" y2="280" stroke="url(#neonLine)" stroke-width="3"/>
      
      <!-- Floating Platform Badge -->
      <rect x="180" y="24" width="140" height="34" rx="17" fill="#171E2B" stroke="#B7FF42" stroke-width="1.5"/>
      <text x="250" y="46" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="700" fill="#B7FF42" text-anchor="middle">LEONIDA • VICE CITY</text>
    </svg>
  </div>`;

  const content = `
  <!-- Section A & B: Hero Section -->
  <section class="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-subtle">
    <div class="hero-glow"></div>
    <div class="container-custom relative z-10 text-center">
      <div class="inline-flex items-center gap-2 bg-surface border border-active px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-primary mb-6">
        <span class="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
        Independent Discovery & Affiliate Hub
      </div>
      
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary max-w-4xl mx-auto mb-6">
        THE WORLD OF GTA.<br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-blue to-accent-secondary" style="background: linear-gradient(90deg, #B7FF42, #39B8FF, #7A5CFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ONE DESTINATION.</span>
      </h1>

      <p class="text-base sm:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
        Explore Grand Theft Auto VI, compare verified editions, discover classic GTA titles, and find buying options from trusted retailers.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
        <a href="/gta-6/" class="btn btn-primary btn-lg w-full sm:w-auto">
          Explore GTA 6
          ${ICONS.arrowRight}
        </a>
        <a href="/games/" class="btn btn-secondary btn-lg w-full sm:w-auto">
          Browse All Games
        </a>
      </div>

      ${heroGraphic}
    </div>
  </section>

  <!-- Section C: GTA 6 Spotlight -->
  <section class="py-20 border-b border-subtle bg-secondary/40">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-accent-primary mb-2">Flagship Title</div>
          <h2 class="text-3xl sm:text-4xl font-bold text-primary">GTA 6 Confirmed Editions</h2>
        </div>
        <a href="/gta-6/editions/" class="btn btn-outline btn-sm mt-4 md:mt-0">
          Compare All Editions &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${gta6Products.slice(0, 3).map(p => renderFeaturedCard(p)).join('')}
      </div>
    </div>
  </section>

  <!-- Section D: Shop By Platform -->
  <section class="py-20 border-b border-subtle">
    <div class="container-custom">
      <div class="text-center max-w-xl mx-auto mb-12">
        <div class="text-xs font-bold uppercase tracking-wider text-accent-primary mb-2">Platform Selection</div>
        <h2 class="text-3xl font-bold text-primary mb-3">Shop By Platform</h2>
        <p class="text-sm text-secondary">Browse titles and verified accessories tailored for your gaming ecosystem.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- PlayStation -->
        <a href="/gta-6/ps5/" class="card card-interactive p-8 text-center group">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-blue mb-4 group-hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 11h4M8 9v4M15 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-primary mb-2">PlayStation 5</h3>
          <p class="text-xs text-secondary mb-4">GTA 6 Standard & Ultimate editions, DualSense controllers, and M.2 NVMe SSDs.</p>
          <span class="text-xs font-semibold text-accent-primary">Explore PS5 &rarr;</span>
        </a>

        <!-- Xbox -->
        <a href="/gta-6/xbox/" class="card card-interactive p-8 text-center group">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-primary mb-4 group-hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M7 7l10 10M17 7L7 17"/></svg>
          </div>
          <h3 class="text-xl font-bold text-primary mb-2">Xbox Series X|S</h3>
          <p class="text-xs text-secondary mb-4">Official digital and physical editions, wireless controllers, and backward compatibility titles.</p>
          <span class="text-xs font-semibold text-accent-primary">Explore Xbox &rarr;</span>
        </a>

        <!-- PC -->
        <a href="/games/" class="card card-interactive p-8 text-center group">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-secondary mb-4 group-hover:scale-105 transition-transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3 class="text-xl font-bold text-primary mb-2">PC Gaming</h3>
          <p class="text-xs text-secondary mb-4">GTA V Enhanced/Legacy, GTA IV Complete, Definitive Trilogy, and gaming peripherals.</p>
          <span class="text-xs font-semibold text-accent-primary">Browse PC Games &rarr;</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Section E: Featured GTA Titles -->
  <section class="py-20 border-b border-subtle bg-secondary/30">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-accent-primary mb-2">Franchise History</div>
          <h2 class="text-3xl font-bold text-primary">Iconic GTA Titles</h2>
        </div>
        <a href="/games/" class="btn btn-outline btn-sm mt-4 md:mt-0">
          View Complete Series &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${featuredGames.map(game => `
          <div class="card card-interactive group">
            <div class="flex items-center justify-between mb-3">
              <span class="badge">${game.releaseYear}</span>
              <span class="text-xs text-muted">${game.setting}</span>
            </div>
            <h3 class="text-lg font-bold text-primary mb-1 group-hover:text-accent-primary transition-colors">${game.title}</h3>
            <p class="text-xs text-accent-blue font-medium mb-3">${game.subtitle}</p>
            <p class="text-xs text-secondary line-clamp-3 mb-6 leading-relaxed flex-1">${game.description}</p>
            <div class="pt-4 border-t border-subtle flex items-center justify-between">
              <a href="/games/${game.slug}/" class="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors">
                View Game Details &rarr;
              </a>
              <span class="text-[11px] text-muted">${game.status.includes('Available') ? 'Available' : 'Historical'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section F & G: History & Comparison Preview -->
  <section class="py-20 border-b border-subtle">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-accent-primary mb-2">Decision Engine</div>
          <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Which Edition Should You Choose?</h2>
          <p class="text-sm text-secondary mb-6 leading-relaxed">
            From the baseline single-player story to the deluxe bonus vehicle packs, compare factual differences before spending your money.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <span class="text-accent-primary flex-shrink-0 mt-1">${ICONS.check}</span>
              <div>
                <strong class="text-sm text-primary">Standard Edition:</strong>
                <p class="text-xs text-secondary">Complete single-player campaign and open world. 100% core game content.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-accent-primary flex-shrink-0 mt-1">${ICONS.check}</span>
              <div>
                <strong class="text-sm text-primary">Ultimate Edition:</strong>
                <p class="text-xs text-secondary">Includes digital bonus vehicles, cosmetics, and early customization perks.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-accent-primary flex-shrink-0 mt-1">${ICONS.check}</span>
              <div>
                <strong class="text-sm text-primary">Digital Code-in-Box Notice:</strong>
                <p class="text-xs text-secondary">Physical console retail editions contain digital voucher codes (no disc).</p>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <a href="/compare/" class="btn btn-primary btn-sm">Launch Comparison Matrix</a>
            <a href="/guides/gta-6-edition-comparison/" class="btn btn-outline btn-sm">Read Full Guide</a>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-2xl border border-subtle">
          <h3 class="text-sm font-bold uppercase tracking-wider text-primary mb-4 pb-2 border-b border-subtle">Quick Comparison Snapshot</h3>
          <div class="space-y-3 text-xs">
            <div class="flex justify-between py-2 border-b border-subtle">
              <span class="text-secondary">Core Game Campaign</span>
              <span class="text-accent-primary font-bold">Standard & Ultimate</span>
            </div>
            <div class="flex justify-between py-2 border-b border-subtle">
              <span class="text-secondary">Physical Disc in Box</span>
              <span class="text-muted">None (Digital Voucher Code)</span>
            </div>
            <div class="flex justify-between py-2 border-b border-subtle">
              <span class="text-secondary">Upgrade Available Later?</span>
              <span class="text-accent-primary font-bold">Yes (Digital Add-on)</span>
            </div>
            <div class="flex justify-between py-2 border-b border-subtle">
              <span class="text-secondary">Supported Consoles</span>
              <span class="text-primary font-medium">PS5 & Xbox Series X|S</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-secondary">PC Release Date</span>
              <span class="text-muted">Not Announced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section J: Latest Guides -->
  <section class="py-20 border-b border-subtle bg-secondary/30">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-accent-primary mb-2">Editorial Guides</div>
          <h2 class="text-3xl font-bold text-primary">Verified Buyer Guides</h2>
        </div>
        <a href="/guides/" class="btn btn-outline btn-sm mt-4 md:mt-0">
          All Guides &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${featuredGuides.map(guide => `
          <a href="/guides/${guide.slug}/" class="card card-interactive group">
            <div class="flex items-center justify-between mb-3">
              <span class="badge">${guide.category}</span>
              <span class="text-xs text-muted">${guide.readingTime}</span>
            </div>
            <h3 class="text-base font-bold text-primary mb-2 group-hover:text-accent-primary transition-colors">${guide.title}</h3>
            <p class="text-xs text-secondary line-clamp-3 mb-4 leading-relaxed">${guide.summary}</p>
            <span class="text-xs font-semibold text-accent-primary mt-auto">Read Full Guide &rarr;</span>
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Section K: Trust & Verification Section -->
  <section class="py-16">
    <div class="container-custom">
      <div class="bg-surface border border-subtle rounded-2xl p-8 lg:p-12">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="badge mb-3">Editorial Standards</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-3">Why Rely on GTA Gaming Hub?</h2>
          <p class="text-xs sm:text-sm text-secondary">We believe in transparent, fact-checked gaming commerce without deceptive timers or fake reviews.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div class="space-y-2">
            <div class="w-10 h-10 rounded-xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-primary mx-auto sm:mx-0">
              ${ICONS.shield}
            </div>
            <h3 class="text-base font-bold text-primary">100% Fact-Checked</h3>
            <p class="text-xs text-secondary leading-relaxed">Editions and platforms are cross-verified against official Rockstar, PlayStation, and Xbox documentation.</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 rounded-xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-primary mx-auto sm:mx-0">
              ${ICONS.info}
            </div>
            <h3 class="text-base font-bold text-primary">Transparent Links</h3>
            <p class="text-xs text-secondary leading-relaxed">We clearly distinguish affiliate links from direct official store reference URLs so you always know where you are buying.</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 rounded-xl bg-surface-elevated border border-subtle flex items-center justify-center text-accent-primary mx-auto sm:mx-0">
              ${ICONS.check}
            </div>
            <h3 class="text-base font-bold text-primary">Independent Advice</h3>
            <p class="text-xs text-secondary leading-relaxed">We explain when you should save money with standard editions and provide clear warnings regarding code-in-box deliveries.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section M: Final CTA -->
  <section class="py-20 border-t border-subtle text-center bg-secondary/50">
    <div class="container-custom max-w-2xl">
      <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">FIND YOUR NEXT GTA EXPERIENCE.</h2>
      <p class="text-sm text-secondary mb-8">
        Discover verified editions, explore soundtrack vinyls, and check peripheral compatibility for Leonida.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/gta-6/" class="btn btn-primary btn-lg w-full sm:w-auto">Explore GTA 6 Hub</a>
        <a href="/compare/" class="btn btn-outline btn-lg w-full sm:w-auto">Compare Editions</a>
      </div>
    </div>
  </section>`;

  const html = renderHtmlDocument({
    title: 'Discover, Compare, Play — Independent GTA Product Hub',
    description: siteConfig.description,
    canonicalPath: '/',
    content
  });

  writeHtmlPage('index.html', html);
}

// -------------------------------------------------------------
// 2. GTA 6 FLAGSHIP & SUBPAGES
// -------------------------------------------------------------
function buildGta6Pages() {
  const gta6 = games.find(g => g.slug === 'gta-6');
  const gta6Products = products.filter(p => p.category === 'gta6_editions');

  // Page 2: /gta-6/ (GTA 6 Flagship Hub)
  const gta6HubContent = `
  <section class="py-12 md:py-20 border-b border-subtle relative overflow-hidden">
    <div class="hero-glow"></div>
    <div class="container-custom relative z-10">
      <div class="max-w-3xl">
        <span class="badge mb-4">Flagship Title Hub</span>
        <h1 class="text-4xl sm:text-6xl font-bold text-primary mb-4">GRAND THEFT AUTO VI</h1>
        <p class="text-lg text-accent-primary font-medium mb-6">${gta6.subtitle}</p>
        <p class="text-base text-secondary leading-relaxed mb-8">${gta6.description}</p>
        
        <div class="flex flex-wrap items-center gap-3 text-xs">
          <span class="bg-surface px-3 py-1.5 rounded-lg border border-subtle text-primary font-semibold">Status: Officially Confirmed</span>
          <span class="bg-surface px-3 py-1.5 rounded-lg border border-subtle text-primary font-semibold">Platforms: PS5 • Xbox Series X|S</span>
          <span class="bg-surface px-3 py-1.5 rounded-lg border border-subtle text-primary font-semibold">Location: State of Leonida</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Editions Grid -->
  <section class="py-16 border-b border-subtle">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-2">Officially Confirmed Editions</h2>
          <p class="text-sm text-secondary">Verified physical and digital editions for PlayStation 5 and Xbox Series X|S.</p>
        </div>
        <a href="/gta-6/editions/" class="btn btn-outline btn-sm mt-4 md:mt-0">Compare All Differences &rarr;</a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${gta6Products.map(p => renderFeaturedCard(p)).join('')}
      </div>
    </div>
  </section>

  <!-- Platform Specific Hubs -->
  <section class="py-16 border-b border-subtle bg-secondary/30">
    <div class="container-custom">
      <h2 class="text-2xl font-bold text-primary mb-8 text-center">Platform Experience Guides</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card p-8">
          <h3 class="text-xl font-bold text-primary mb-3">PlayStation 5 Version</h3>
          <p class="text-sm text-secondary mb-6 leading-relaxed">
            Features custom DualSense adaptive trigger recoil resistance, haptic road feedback across Vice City streets, 3D Tempest audio, and high-speed NVMe loading.
          </p>
          <a href="/gta-6/ps5/" class="btn btn-primary btn-sm">Explore PS5 Editions & Hardware &rarr;</a>
        </div>

        <div class="card p-8">
          <h3 class="text-xl font-bold text-primary mb-3">Xbox Series X|S Version</h3>
          <p class="text-sm text-secondary mb-6 leading-relaxed">
            Full support for Xbox Series X (native 4K targets) and Series S, Xbox Wireless Controller mapping, and cloud-synced achievements.
          </p>
          <a href="/gta-6/xbox/" class="btn btn-secondary btn-sm">Explore Xbox Editions & Hardware &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Buyer Notice & FAQ -->
  <section class="py-16">
    <div class="container-custom max-w-4xl">
      <h2 class="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <div class="bg-surface p-5 rounded-xl border border-subtle">
          <h3 class="text-base font-bold text-primary mb-2">Is GTA 6 confirmed for PC?</h3>
          <p class="text-sm text-secondary leading-relaxed">
            As of official announcements from Rockstar Games, GTA 6 is confirmed exclusively for PlayStation 5 and Xbox Series X|S. No official PC release date or pre-order has been announced. Beware of scams offering PC pre-order keys.
          </p>
        </div>

        <div class="bg-surface p-5 rounded-xl border border-subtle">
          <h3 class="text-base font-bold text-primary mb-2">What does 'Physical Code-in-Box' mean?</h3>
          <p class="text-sm text-secondary leading-relaxed">
            Retail boxed copies sold in stores contain a collectible game case and a high-speed digital download voucher code. There is no physical Blu-ray disc inside the box. You will need internet connectivity to redeem and download the game.
          </p>
        </div>

        <div class="bg-surface p-5 rounded-xl border border-subtle">
          <h3 class="text-base font-bold text-primary mb-2">Can I upgrade to the Ultimate Edition later?</h3>
          <p class="text-sm text-secondary leading-relaxed">
            Yes! Rockstar Games has confirmed the 'Ultimate Edition Upgrade' as a digital add-on pack. If you purchase the Standard Edition now, you can upgrade later on the PS Store or Xbox Store without rebuying the game.
          </p>
        </div>
      </div>
    </div>
  </section>`;

  writeHtmlPage('gta-6/index.html', renderHtmlDocument({
    title: 'GTA 6 Hub — Verified Editions, Platforms & Release Info',
    description: 'Complete guide to Grand Theft Auto VI: compare confirmed Standard and Ultimate editions, physical code-in-box details, and PS5/Xbox platform features.',
    canonicalPath: '/gta-6/',
    content: gta6HubContent
  }));

  // Page 3: /gta-6/editions/ (Editions Breakdown)
  const editionsContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-10">
        <a href="/gta-6/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to GTA 6 Hub</a>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">GTA 6 Confirmed Editions</h1>
        <p class="text-base text-secondary leading-relaxed">
          Comprehensive breakdown of all officially confirmed Grand Theft Auto VI editions, packaging differences, and upgrade paths.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        ${gta6Products.map(p => renderFeaturedCard(p)).join('')}
      </div>

      <!-- Comparison Matrix Table -->
      <div class="bg-surface rounded-2xl border border-subtle p-6 lg:p-8 overflow-x-auto">
        <h2 class="text-xl font-bold text-primary mb-6">Edition Comparison Table</h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature / Perk</th>
              <th>Standard Edition</th>
              <th>Ultimate Edition</th>
              <th>Ultimate Upgrade Add-on</th>
            </tr>
          </thead>
          <tbody class="text-sm text-secondary">
            <tr>
              <td class="font-semibold text-primary">Full Story Mode Campaign</td>
              <td class="text-accent-primary font-bold">Included</td>
              <td class="text-accent-primary font-bold">Included</td>
              <td class="text-muted">Requires Base Game</td>
            </tr>
            <tr>
              <td class="font-semibold text-primary">Full Open World Exploration (Leonida)</td>
              <td class="text-accent-primary font-bold">Included</td>
              <td class="text-accent-primary font-bold">Included</td>
              <td class="text-muted">Requires Base Game</td>
            </tr>
            <tr>
              <td class="font-semibold text-primary">Physical Packaging Option</td>
              <td>Code-in-Box Voucher</td>
              <td>Digital Only</td>
              <td>Digital Only</td>
            </tr>
            <tr>
              <td class="font-semibold text-primary">Bonus Vehicle & Weapon Customization</td>
              <td class="text-muted">Not Included</td>
              <td class="text-accent-primary font-bold">Included</td>
              <td class="text-accent-primary font-bold">Included</td>
            </tr>
            <tr>
              <td class="font-semibold text-primary">Eligible Platforms</td>
              <td>PS5, Xbox Series X|S</td>
              <td>PS5, Xbox Series X|S</td>
              <td>PS5, Xbox Series X|S</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>`;

  writeHtmlPage('gta-6/editions/index.html', renderHtmlDocument({
    title: 'GTA 6 Editions Compared — Standard vs Ultimate vs Upgrade',
    description: 'Compare confirmed GTA 6 editions: Standard physical code-in-box, Ultimate digital edition, and post-launch digital upgrade pack.',
    canonicalPath: '/gta-6/editions/',
    content: editionsContent
  }));

  // Page 4: /gta-6/ps5/
  const ps5Content = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-10">
        <a href="/gta-6/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to GTA 6 Hub</a>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">GTA 6 on PlayStation 5</h1>
        <p class="text-base text-secondary leading-relaxed">
          Everything PS5 and PS5 Pro owners need to know about Grand Theft Auto VI: DualSense haptics, NVMe SSD storage requirements, and verified editions.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        ${gta6Products.filter(p => p.platform?.includes('PlayStation 5')).map(p => renderFeaturedCard(p)).join('')}
      </div>

      <div class="bg-surface p-6 rounded-xl border border-subtle">
        <h2 class="text-xl font-bold text-primary mb-4">PS5 Hardware Recommendations</h2>
        <p class="text-sm text-secondary leading-relaxed mb-4">
          GTA 6's massive Leonida open-world map and high-fidelity photogrammetry will require an estimated 150GB+ installation footprint. We strongly recommend upgrading your storage with a high-speed PCIe Gen4 M.2 NVMe SSD.
        </p>
        <a href="/accessories/" class="btn btn-secondary btn-sm">Browse PS5 Compatible SSDs & Peripherals &rarr;</a>
      </div>
    </div>
  </section>`;
  writeHtmlPage('gta-6/ps5/index.html', renderHtmlDocument({
    title: 'GTA 6 PlayStation 5 — Editions, DualSense Features & SSD Guide',
    description: 'Official GTA 6 PlayStation 5 guide: Standard & Ultimate editions, DualSense haptic feedback, 3D audio, and recommended NVMe SSD upgrades.',
    canonicalPath: '/gta-6/ps5/',
    content: ps5Content
  }));

  // Page 5: /gta-6/xbox/
  const xboxContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-10">
        <a href="/gta-6/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to GTA 6 Hub</a>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">GTA 6 on Xbox Series X|S</h1>
        <p class="text-base text-secondary leading-relaxed">
          Verified GTA 6 buying guide for Xbox gamers: Series X vs Series S compatibility, Quick Resume, and official Microsoft Store options.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        ${gta6Products.filter(p => p.platform?.includes('Xbox')).map(p => renderFeaturedCard(p)).join('')}
      </div>
    </div>
  </section>`;
  writeHtmlPage('gta-6/xbox/index.html', renderHtmlDocument({
    title: 'GTA 6 Xbox Series X|S — Editions, Pricing & Performance Guide',
    description: 'Xbox Series X|S guide for GTA 6: verified physical and digital editions, Quick Resume compatibility, and storage requirements.',
    canonicalPath: '/gta-6/xbox/',
    content: xboxContent
  }));

  // Page 6: /gta-6/price/
  const priceContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-4xl">
      <a href="/gta-6/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to GTA 6 Hub</a>
      <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">GTA 6 Price & Retailer Verification</h1>
      <p class="text-base text-secondary leading-relaxed mb-8">
        Transparent pricing information and verified retailer status for Grand Theft Auto VI across India and global markets.
      </p>

      <div class="bg-surface p-6 rounded-xl border border-subtle mb-8 space-y-4">
        <h2 class="text-lg font-bold text-primary">Price Integrity Statement</h2>
        <p class="text-xs text-secondary leading-relaxed">
          At GTA Gaming Hub, we strictly refuse to publish speculative or fabricated prices. Retail pricing varies based on region taxes (GST in India, VAT in Europe) and authorized publisher announcements.
        </p>
        <p class="text-xs text-secondary leading-relaxed">
          When Amazon India or first-party platform storefronts confirm official MSRP, verified live pricing will be reflected automatically.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${gta6Products.slice(0, 4).map(p => renderFeaturedCard(p)).join('')}
      </div>
    </div>
  </section>`;
  writeHtmlPage('gta-6/price/index.html', renderHtmlDocument({
    title: 'GTA 6 Price Guide — Verified Retail Pricing & Editions',
    description: 'Understand GTA 6 pricing across Standard, Ultimate, and Upgrade editions in India (INR) and global storefronts.',
    canonicalPath: '/gta-6/price/',
    content: priceContent
  }));

  // Page 7: /gta-6/buy/
  const buyContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-4xl">
      <a href="/gta-6/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to GTA 6 Hub</a>
      <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">Where to Buy GTA 6 Safely</h1>
      <p class="text-base text-secondary leading-relaxed mb-8">
        A guide to safe, authorized pre-orders and purchases of Grand Theft Auto VI, protecting your consumer rights and avoiding counterfeit keys.
      </p>

      <div class="space-y-6">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-primary mb-2">1. Authorized Retail Stores (Physical Code-in-Box)</h2>
          <p class="text-xs text-secondary leading-relaxed mb-4">
            If you want the collectible display case on your shelf, pre-order through authorized retailers such as Amazon India. Ensure the seller is listed as 'Fulfilled by Amazon' or an official distributor to guarantee an authentic, unredeemed voucher code.
          </p>
          <a href="/gta-6/editions/" class="btn btn-primary btn-sm">View Authorized Editions &rarr;</a>
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-bold text-primary mb-2">2. Direct Digital Stores</h2>
          <p class="text-xs text-secondary leading-relaxed mb-4">
            For instant pre-loading and zero shipping wait time, buy directly on the PlayStation Network Store or Microsoft Xbox Store.
          </p>
        </div>

        <div class="card p-6 border-active">
          <h2 class="text-lg font-bold text-accent-primary mb-2">⚠️ Gray Market Key Reseller Warning</h2>
          <p class="text-xs text-secondary leading-relaxed">
            Avoid third-party auction sites and unverified key marketplaces advertising unrealistically cheap GTA 6 keys. These codes frequently originate from stolen credit cards, carry regional activation bans, or result in permanent account suspensions.
          </p>
        </div>
      </div>
    </div>
  </section>`;
  writeHtmlPage('gta-6/buy/index.html', renderHtmlDocument({
    title: 'Where to Buy GTA 6 Safely — Authorized Retailers & Pre-Order Guide',
    description: 'Learn where to buy GTA 6 safely: compare Amazon India physical pre-orders with PlayStation and Xbox digital stores.',
    canonicalPath: '/gta-6/buy/',
    content: buyContent
  }));
}

// -------------------------------------------------------------
// 3. COMPLETE GAMES DIRECTORY & DETAIL PAGES
// -------------------------------------------------------------
function buildGamesPages() {
  // Page 8: /games/ (All Games Directory with client-side interactive filter & sort)
  const allGamesContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-8">
        <span class="badge mb-3">Complete Series Catalogue</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">All Grand Theft Auto Games</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Explore the complete Grand Theft Auto franchise from 1997's 2D retro origins to GTA V and GTA VI. Use the interactive filters to browse by platform, era, or format.
        </p>
      </div>

      <!-- Filter Controls Form -->
      <form id="catalog-filter-form" class="bg-surface p-5 rounded-xl border border-subtle mb-10" onsubmit="event.preventDefault();">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Platform</label>
            <select name="platform" class="w-full bg-surface-elevated border border-subtle rounded-lg px-3 py-2 text-xs text-primary focus:border-active">
              <option value="all">All Platforms</option>
              <option value="PlayStation">PlayStation (PS5 / PS4 / Classic)</option>
              <option value="Xbox">Xbox (Series X|S / One / 360)</option>
              <option value="PC">PC (Windows / Steam)</option>
              <option value="Mobile">Mobile (iOS / Android)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Era / Category</label>
            <select name="category" class="w-full bg-surface-elevated border border-subtle rounded-lg px-3 py-2 text-xs text-primary focus:border-active">
              <option value="all">All Titles</option>
              <option value="franchise_games">Franchise Games</option>
              <option value="gta6_editions">GTA 6 Editions</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Sort Order</label>
            <select name="sort" class="w-full bg-surface-elevated border border-subtle rounded-lg px-3 py-2 text-xs text-primary focus:border-active">
              <option value="relevance">Recommended / Historical Order</option>
              <option value="year-desc">Newest First</option>
              <option value="year-asc">Oldest / Classic First</option>
              <option value="alpha-asc">Alphabetical (A - Z)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Quick Search</label>
            <input type="text" name="filter-search" placeholder="Filter by title..." class="w-full bg-surface-elevated border border-subtle rounded-lg px-3 py-2 text-xs text-primary focus:border-active" />
          </div>
        </div>

        <div class="flex items-center justify-between text-xs pt-2 border-t border-subtle">
          <span id="filter-result-count" class="text-secondary font-medium">Showing all verified titles</span>
          <button type="button" id="reset-filters-btn" class="text-muted hover:text-accent-primary">Reset Filters</button>
        </div>
      </form>

      <!-- Games Grid -->
      <div id="catalog-product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${games.map(game => `
          <div class="card card-interactive group" data-product-card data-title="${game.title}" data-year="${game.releaseYear}" data-platform="${game.supportedPlatforms.join(' ')}" data-category="franchise_games" data-format="game">
            <div class="flex items-center justify-between mb-3">
              <span class="badge">${game.releaseYear}</span>
              <span class="text-xs text-muted">${game.setting}</span>
            </div>
            <h3 class="text-lg font-bold text-primary mb-1 group-hover:text-accent-primary transition-colors">${game.title}</h3>
            <p class="text-xs text-accent-blue font-medium mb-3">${game.subtitle}</p>
            <p class="text-xs text-secondary line-clamp-3 mb-6 leading-relaxed flex-1">${game.description}</p>
            <div class="pt-4 border-t border-subtle flex items-center justify-between">
              <a href="/games/${game.slug}/" class="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors">
                View Full Details &rarr;
              </a>
              <span class="text-[11px] text-muted">${game.status.includes('Available') ? 'Available' : 'Historical'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  writeHtmlPage('games/index.html', renderHtmlDocument({
    title: 'All GTA Games in Franchise History — Complete Catalogue',
    description: 'Explore every Grand Theft Auto game from 1997 to GTA VI: platforms, settings, storylines, and current availability status.',
    canonicalPath: '/games/',
    content: allGamesContent
  }));

  // Pages 9-19: Individual Game Detail Pages
  games.forEach(game => {
    const gameDetailContent = `
    <article class="py-12 border-b border-subtle">
      <div class="container-custom max-w-4xl">
        <a href="/games/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to All Games</a>
        
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="badge">${game.releaseYear}</span>
          <span class="badge badge-purple">${game.ageRating}</span>
          <span class="text-xs text-muted">Setting: ${game.setting}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-2">${game.title}</h1>
        <p class="text-base sm:text-xl text-accent-blue font-medium mb-6">${game.subtitle}</p>

        <div class="bg-surface p-6 rounded-2xl border border-subtle mb-10 space-y-4">
          <h2 class="text-base font-bold text-primary uppercase tracking-wider text-xs">Overview & Story Synopsis</h2>
          <p class="text-sm text-secondary leading-relaxed">${game.description}</p>
          
          <div class="pt-4 border-t border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <strong class="text-primary">Developer:</strong> <span class="text-secondary">${game.developer}</span>
            </div>
            <div>
              <strong class="text-primary">Publisher:</strong> <span class="text-secondary">${game.publisher}</span>
            </div>
            <div>
              <strong class="text-primary">Protagonist(s):</strong> <span class="text-secondary">${game.protagonists.join(', ')}</span>
            </div>
            <div>
              <strong class="text-primary">Release Date:</strong> <span class="text-secondary">${game.releaseDate}</span>
            </div>
          </div>
        </div>

        <!-- Platform Compatibility -->
        <div class="card p-6 mb-8">
          <h2 class="text-lg font-bold text-primary mb-4">Supported Platforms & Hardware</h2>
          <div class="flex flex-wrap gap-2 mb-4">
            ${game.supportedPlatforms.map(p => `
              <span class="bg-surface-elevated text-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-subtle">${p}</span>
            `).join('')}
          </div>
          ${game.unsupportedPlatforms.length ? `
            <div class="text-xs text-muted">
              <strong>Unsupported or Delisted:</strong> ${game.unsupportedPlatforms.join('; ')}
            </div>
          ` : ''}
        </div>

        <!-- Verified Editions -->
        <div class="card p-6 mb-8">
          <h2 class="text-lg font-bold text-primary mb-4">Verified Editions & Formats</h2>
          <div class="space-y-4">
            ${game.verifiedEditions.map(ed => `
              <div class="p-4 rounded-xl bg-surface-elevated border border-subtle">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-sm font-bold text-primary">${ed.name}</h3>
                  <span class="badge text-[10px]">${ed.format}</span>
                </div>
                <p class="text-xs text-secondary leading-relaxed">${ed.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Buyer Advice & Source Attribution -->
        <div class="bg-secondary p-6 rounded-2xl border border-subtle mb-10 space-y-4">
          <h2 class="text-base font-bold text-primary">Buyer Advice & Compatibility Notice</h2>
          <p class="text-xs text-secondary leading-relaxed">${game.buyerAdvice}</p>
          <div class="pt-4 border-t border-subtle flex items-center justify-between text-xs">
            <span class="text-muted">Source: Rockstar Games Official Archive</span>
            <a href="${game.officialUrl}" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:underline flex items-center gap-1 font-semibold">
              Official Publisher Listing ${ICONS.external}
            </a>
          </div>
        </div>
      </div>
    </article>`;

    writeHtmlPage(`games/${game.slug}/index.html`, renderHtmlDocument({
      title: `${game.title} — Editions, Setting & Buying Guide`,
      description: `${game.title} overview: storyline in ${game.setting}, supported platforms, verified editions, and buyer advice.`,
      canonicalPath: `/games/${game.slug}/`,
      content: gameDetailContent
    }));
  });
}

// -------------------------------------------------------------
// 4. COMPARE, MERCHANDISE, ACCESSORIES & DEALS
// -------------------------------------------------------------
function buildCommerceAndComparePages() {
  // Page 20: /compare/
  const compareContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-8">
        <span class="badge mb-3">Decision Matrix</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">Compare GTA Editions & Products</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Compare up to 4 GTA editions, games, or accessories side-by-side. Factual differences in campaign, format, platform support, and packaging.
        </p>
      </div>

      <!-- Compare Container managed by src/js/compare.js -->
      <div id="compare-matrix-view" class="bg-surface rounded-2xl border border-subtle p-6 lg:p-8 min-h-[400px]">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-subtle">
          <div class="text-xs text-secondary">
            Select items from any card across the site using the <span class="text-accent-primary font-bold">Compare</span> icon to populate this table.
          </div>
          <button onclick="window.clearCompare(); location.reload();" class="btn btn-outline btn-sm text-xs">Clear All</button>
        </div>

        <div id="active-comparison-table-wrapper" class="overflow-x-auto">
          <table class="comparison-table">
            <thead>
              <tr id="compare-table-head">
                <th>Product Metric</th>
                <!-- Populated dynamically via JS -->
              </tr>
            </thead>
            <tbody id="compare-table-body" class="text-sm text-secondary">
              <!-- Populated dynamically via JS -->
            </tbody>
          </table>
        </div>

        <!-- Fallback Static Comparison of GTA 6 Confirmed Editions -->
        <div class="mt-8 pt-8 border-t border-subtle">
          <h3 class="text-base font-bold text-primary mb-4">Official GTA 6 Benchmark Comparison</h3>
          <div class="overflow-x-auto">
            <table class="comparison-table text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Standard Edition (PS5/Xbox)</th>
                  <th>Ultimate Edition (Digital)</th>
                  <th>Ultimate Edition Upgrade</th>
                </tr>
              </thead>
              <tbody class="text-secondary">
                <tr>
                  <td class="font-bold text-primary">Content</td>
                  <td>Base Game (Lucia & Jason story)</td>
                  <td>Base Game + Deluxe bonus cosmetics & perks</td>
                  <td>Add-on pack for Standard owners</td>
                </tr>
                <tr>
                  <td class="font-bold text-primary">Physical Packaging</td>
                  <td>Digital Code-in-Box (No disc)</td>
                  <td>Digital Download Only</td>
                  <td>Digital Add-on</td>
                </tr>
                <tr>
                  <td class="font-bold text-primary">Platform Support</td>
                  <td>PS5, Xbox Series X|S</td>
                  <td>PS5, Xbox Series X|S</td>
                  <td>PS5, Xbox Series X|S</td>
                </tr>
                <tr>
                  <td class="font-bold text-primary">Storage Req.</td>
                  <td>150 GB+ High-Speed NVMe</td>
                  <td>150 GB+ High-Speed NVMe</td>
                  <td>Negligible (License unlock)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  writeHtmlPage('compare/index.html', renderHtmlDocument({
    title: 'Compare GTA Editions & Games — Side-by-Side Matrix',
    description: 'Interactive comparison engine: compare GTA 6 Standard vs Ultimate editions, platform differences, physical packaging, and hardware specs.',
    canonicalPath: '/compare/',
    content: compareContent
  }));

  // Page 21: /merchandise/
  const merchProducts = products.filter(p => p.category === 'official_merch');
  const merchContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-8">
        <span class="badge mb-3">Official Apparel & Collectibles</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">Official GTA 6 Merchandise</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Official Vice City collection from Rockstar Store: Goodtime State tees, canvas totes, embroidered caps, collector lighter, and soundtrack vinyl editions.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${merchProducts.map(p => renderCatalogueCard(p)).join('')}
      </div>
    </div>
  </section>`;

  writeHtmlPage('merchandise/index.html', renderHtmlDocument({
    title: 'Official GTA 6 Merchandise — Apparel, Vinyl & Collectibles',
    description: 'Explore official GTA 6 merchandise: Vice City Goodtime State t-shirts, embroidered caps, Justice soundtrack vinyls, and collectibles.',
    canonicalPath: '/merchandise/',
    content: merchContent
  }));

  // Page 22: /accessories/
  const accessoryProducts = products.filter(p => p.category === 'gaming_accessories');
  const accessoriesContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-8">
        <span class="badge mb-3">Hardware & Peripherals</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">GTA Gaming Accessories</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Optimize your setup for Leonida: high-speed PS5 Gen4 NVMe SSDs, DualSense controllers, spatial audio headsets, and 120Hz displays.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${accessoryProducts.map(p => renderCatalogueCard(p)).join('')}
      </div>
    </div>
  </section>`;

  writeHtmlPage('accessories/index.html', renderHtmlDocument({
    title: 'GTA Gaming Accessories — PS5 SSDs, DualSense & Headsets',
    description: 'Essential gaming accessories for GTA 6: PS5 compatible M.2 NVMe SSDs, DualSense wireless controllers, and gaming headsets.',
    canonicalPath: '/accessories/',
    content: accessoriesContent
  }));

  // Page 23: /deals/
  const dealsContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-8">
        <span class="badge mb-3">Verified Offers</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">Verified Retailer Deals</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Curated price tracking for GTA titles, console accessories, and publisher discounts across authorized storefronts. No fake coupons or expired promo codes.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${products.filter(p => p.commission_eligible).slice(0, 6).map(p => renderFeaturedCard(p)).join('')}
      </div>
    </div>
  </section>`;

  writeHtmlPage('deals/index.html', renderHtmlDocument({
    title: 'Verified GTA Deals — Discounts & Retailer Offers',
    description: 'Track genuine discounts on Grand Theft Auto games, PlayStation & Xbox accessories, and publisher sales from verified retailers.',
    canonicalPath: '/deals/',
    content: dealsContent
  }));
}

// -------------------------------------------------------------
// 5. GUIDES HUB & INDIVIDUAL GUIDES
// -------------------------------------------------------------
function buildGuidesPages() {
  // Page 24: /guides/ (Guides Hub)
  const guidesHubContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="max-w-3xl mb-12">
        <span class="badge mb-3">Editorial Resources</span>
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-3">GTA Buyer Guides & Analysis</h1>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">
          Comprehensive, fact-checked editorial guides designed to help you navigate editions, chronology, hardware compatibility, and safe buying practices.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${guides.map(g => `
          <div class="card p-8 group">
            <div class="flex items-center justify-between mb-3">
              <span class="badge">${g.category}</span>
              <span class="text-xs text-muted">${g.readingTime}</span>
            </div>
            <h2 class="text-xl font-bold text-primary mb-3 group-hover:text-accent-primary transition-colors">
              <a href="/guides/${g.slug}/">${g.title}</a>
            </h2>
            <p class="text-sm text-secondary leading-relaxed mb-6 flex-1">${g.summary}</p>
            <div class="pt-4 border-t border-subtle flex items-center justify-between">
              <span class="text-xs text-muted">Updated: ${g.updatedAt}</span>
              <a href="/guides/${g.slug}/" class="text-xs font-bold text-accent-primary hover:underline">Read Full Guide &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  writeHtmlPage('guides/index.html', renderHtmlDocument({
    title: 'GTA Buyer Guides — Chronology, Editions & Hardware',
    description: 'In-depth GTA guides: chronological story order, GTA 6 editions comparison, PS5 vs Xbox Series X|S hardware guides, and safe purchasing advice.',
    canonicalPath: '/guides/',
    content: guidesHubContent
  }));

  // Pages 25-28: Individual Guides
  guides.forEach(g => {
    const guideContent = `
    <article class="py-12 border-b border-subtle">
      <div class="container-custom max-w-3xl">
        <a href="/guides/" class="text-xs text-accent-primary font-semibold hover:underline mb-3 inline-block">&larr; Back to Guides Hub</a>
        
        <div class="flex items-center gap-2 mb-3">
          <span class="badge">${g.category}</span>
          <span class="text-xs text-muted">${g.readingTime}</span>
          <span class="text-xs text-muted">• Updated ${g.updatedAt}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">${g.title}</h1>
        <p class="text-base text-accent-blue font-medium mb-8 leading-relaxed">${g.summary}</p>

        <div class="space-y-8 text-secondary leading-relaxed">
          ${g.sections.map(s => `
            <section class="space-y-3">
              <h2 class="text-2xl font-bold text-primary">${s.heading}</h2>
              <div class="text-sm text-secondary whitespace-pre-line leading-relaxed">${s.content}</div>
            </section>
          `).join('')}
        </div>

        <div class="mt-12 pt-8 border-t border-subtle flex items-center justify-between text-xs text-muted">
          <span>Published by GTA Gaming Hub Editorial Team</span>
          <a href="/editorial-policy/" class="text-accent-primary hover:underline">Read Editorial Methodology</a>
        </div>
      </div>
    </article>`;

    writeHtmlPage(`guides/${g.slug}/index.html`, renderHtmlDocument({
      title: g.title,
      description: g.summary,
      canonicalPath: `/guides/${g.slug}/`,
      content: guideContent
    }));
  });
}

// -------------------------------------------------------------
// 6. SEARCH, WISHLIST, LEGAL & UTILITY PAGES
// -------------------------------------------------------------
function buildUtilityAndLegalPages() {
  // Page 29: /search/
  const searchPageContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl font-bold text-primary mb-4">Search GTA Gaming Hub</h1>
      <p class="text-sm text-secondary mb-8">Search verified GTA 6 editions, games in the franchise, merchandise, and compatible accessories.</p>

      <div class="relative mb-8">
        <input type="text" id="dedicated-search-input" placeholder="Type game title, platform, or product name..." class="w-full bg-surface border border-subtle focus:border-active rounded-xl p-4 text-primary text-base focus:outline-none" />
      </div>

      <div id="dedicated-search-results" class="space-y-3"></div>
    </div>
  </section>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const input = document.getElementById('dedicated-search-input');
      const results = document.getElementById('dedicated-search-results');
      if (input) {
        input.addEventListener('input', (e) => {
          const val = e.target.value.toLowerCase().trim();
          if (!val) { results.innerHTML = ''; return; }
          // Trigger global search handler
          if (typeof performSearch === 'function') performSearch(val);
        });
      }
    });
  </script>`;

  writeHtmlPage('search/index.html', renderHtmlDocument({
    title: 'Search GTA Products & Editions',
    description: 'Search Grand Theft Auto VI editions, franchise games, official merchandise, and gaming accessories.',
    canonicalPath: '/search/',
    content: searchPageContent
  }));

  // Page 30: /wishlist/
  const wishlistPageContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom">
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-subtle">
        <div>
          <h1 class="text-3xl font-bold text-primary mb-1">Your Saved Products</h1>
          <p class="text-xs text-secondary">Items saved locally on this browser. No account required.</p>
        </div>
        <button onclick="window.clearWishlist(); location.reload();" class="btn btn-outline btn-sm text-xs">Clear Wishlist</button>
      </div>

      <div id="wishlist-items-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Rendered via JS -->
      </div>
      <div id="wishlist-empty-state" class="py-16 text-center text-muted hidden">
        <p class="text-base mb-3">You have not saved any items yet.</p>
        <a href="/gta-6/" class="btn btn-primary btn-sm">Explore GTA 6 Products</a>
      </div>
    </div>
  </section>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const items = window.getWishlistItems ? window.getWishlistItems() : [];
      const container = document.getElementById('wishlist-items-container');
      const empty = document.getElementById('wishlist-empty-state');
      if (!items || items.length === 0) {
        empty?.classList.remove('hidden');
      } else if (container) {
        container.innerHTML = items.map(item => \`
          <div class="card p-5">
            <h3 class="text-base font-bold text-primary mb-2">\${item.title}</h3>
            <p class="text-xs text-secondary mb-4">\${item.platform || item.category || ''}</p>
            <div class="pt-3 border-t border-subtle flex items-center justify-between">
              <a href="\${item.url}" class="text-xs font-semibold text-accent-primary">View Product &rarr;</a>
              <button onclick="window.toggleWishlist({id: '\${item.id}'}); location.reload();" class="text-xs text-muted hover:text-accent-primary">Remove</button>
            </div>
          </div>
        \`).join('');
      }
    });
  </script>`;

  writeHtmlPage('wishlist/index.html', renderHtmlDocument({
    title: 'Saved Products & Wishlist',
    description: 'View your locally saved GTA 6 editions, games, and peripherals.',
    canonicalPath: '/wishlist/',
    content: wishlistPageContent
  }));

  // Page 31: /about/
  const aboutContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-6">About GTA Gaming Hub</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <p>
          <strong>GTA Gaming Hub</strong> (gtagaminghub.store) is an independent product discovery, comparison, and editorial resource dedicated to Grand Theft Auto enthusiasts in India and across the globe.
        </p>
        <h2 class="text-xl font-bold text-primary mt-6">Our Independence</h2>
        <p>
          We are editorially independent. We are not owned, operated, endorsed, or affiliated with Rockstar Games, Take-Two Interactive, Sony PlayStation, or Microsoft Xbox. Product titles and company names belong exclusively to their respective trademark holders.
        </p>
        <h2 class="text-xl font-bold text-primary mt-6">Our Mission</h2>
        <p>
          The gaming e-commerce landscape is plagued by misleading pre-orders, counterfeit PC codes, and fake price countdowns. Our mission is to provide 100% verified release data, transparent packaging disclosures (such as code-in-box notices), and honest edition comparisons.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('about/index.html', renderHtmlDocument({
    title: 'About Us — Independent GTA Discovery Hub',
    description: 'Learn about GTA Gaming Hub: an independent, fact-checked product comparison platform for Grand Theft Auto fans.',
    canonicalPath: '/about/',
    content: aboutContent
  }));

  // Page 32: /contact/
  const contactContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-xl">
      <h1 class="text-3xl font-bold text-primary mb-3">Contact Us</h1>
      <p class="text-sm text-secondary mb-8">Have a question regarding edition verification, retailer corrections, or commercial inquiries?</p>

      <form class="space-y-4" onsubmit="event.preventDefault(); window.showToast('Thank you! Inquiries are processed via contact@gtagaminghub.store', 'success');">
        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Your Name</label>
          <input type="text" required class="w-full bg-surface border border-subtle focus:border-active rounded-lg p-3 text-sm text-primary focus:outline-none" placeholder="Anoop" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Email Address</label>
          <input type="email" required class="w-full bg-surface border border-subtle focus:border-active rounded-lg p-3 text-sm text-primary focus:outline-none" placeholder="name@domain.com" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Inquiry Type</label>
          <select class="w-full bg-surface border border-subtle focus:border-active rounded-lg p-3 text-sm text-primary focus:outline-none">
            <option>Product Data Correction</option>
            <option>Retailer Partnership</option>
            <option>Affiliate Transparency Inquiry</option>
            <option>General Question</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Message</label>
          <textarea required rows="4" class="w-full bg-surface border border-subtle focus:border-active rounded-lg p-3 text-sm text-primary focus:outline-none" placeholder="How can we assist you?"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-full">Send Message</button>
      </form>

      <div class="mt-8 pt-6 border-t border-subtle text-xs text-muted text-center">
        Direct Email: <a href="mailto:${siteConfig.contactEmail}" class="text-accent-primary hover:underline">${siteConfig.contactEmail}</a>
      </div>
    </div>
  </section>`;
  writeHtmlPage('contact/index.html', renderHtmlDocument({
    title: 'Contact GTA Gaming Hub',
    description: 'Get in touch with the GTA Gaming Hub editorial team for factual corrections, affiliate disclosures, or partnerships.',
    canonicalPath: '/contact/',
    content: contactContent
  }));

  // Page 33: /affiliate-disclosure/
  const affiliateDisclosureContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-6">Affiliate Marketing Disclosure</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <div class="bg-surface p-6 rounded-xl border border-active">
          <p class="font-semibold text-primary mb-2">Prominent FTC & Regulatory Notice:</p>
          <p>
            GTA Gaming Hub (gtagaminghub.store) participates in affiliate marketing programs. Some of the outbound retailer links on this site are affiliate links. When you click on an approved affiliate link and make a purchase, we may receive a small commission from the merchant at no additional cost to you.
          </p>
        </div>

        <h2 class="text-xl font-bold text-primary mt-6">Amazon Associates Program</h2>
        <p>
          GTA Gaming Hub is a participant in the Amazon Associates India Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
        </p>

        <h2 class="text-xl font-bold text-primary mt-6">Commission Structure & Disclosures</h2>
        <p>
          Under current retailer commission schedules, commission rates vary by category:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Video Games (Physical Code-in-Box):</strong> Typically 2.8% advertising fee.</li>
          <li><strong>Gaming Consoles (PS5, Xbox Series X|S):</strong> 0% commission (excluded per retailer terms). We list consoles purely for factual hardware completeness.</li>
          <li><strong>Gaming Accessories & Peripherals:</strong> Between 4% and 9% depending on product classification.</li>
        </ul>

        <h2 class="text-xl font-bold text-primary mt-6">Editorial Independence</h2>
        <p>
          Our recommendations and edition rankings are never influenced by affiliate commissions. If a Standard Edition offers better value for the consumer, we explicitly recommend it over premium bundles.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('affiliate-disclosure/index.html', renderHtmlDocument({
    title: 'Affiliate Disclosure & Transparency Statement',
    description: 'Full affiliate transparency disclosure: Amazon Associates participation, commission breakdown, and editorial independence.',
    canonicalPath: '/affiliate-disclosure/',
    content: affiliateDisclosureContent
  }));

  // Page 34: /privacy-policy/
  const privacyContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <p>Last updated: November 2026</p>
        <p>
          GTA Gaming Hub respects your privacy. We operate as a static-first web platform and do not maintain user databases, mandatory account logins, or store payment card information.
        </p>
        <h2 class="text-xl font-bold text-primary">Information Collected Automatically</h2>
        <p>
          When you browse the site, anonymous usage statistics may be gathered via Google Analytics 4 (with IP anonymization active). This helps us understand page visit counts and outbound link interactions.
        </p>
        <h2 class="text-xl font-bold text-primary">Local Storage</h2>
        <p>
          Your theme preferences (dark/light), saved wishlist items, and product comparisons are stored entirely in your local browser storage and never transmitted to our servers.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('privacy-policy/index.html', renderHtmlDocument({
    title: 'Privacy Policy',
    description: 'Privacy policy for GTA Gaming Hub: static-first architecture, local storage data handling, and anonymous telemetry.',
    canonicalPath: '/privacy-policy/',
    content: privacyContent
  }));

  // Page 35: /cookie-policy/
  const cookiePolicyContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl font-bold text-primary mb-6">Cookie Policy</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <p>
          This policy explains how GTA Gaming Hub uses cookies and local storage tokens.
        </p>
        <h2 class="text-xl font-bold text-primary">Essential Cookies</h2>
        <p>
          Required for storing your theme toggle and cookie banner consent status. These cannot be disabled.
        </p>
        <h2 class="text-xl font-bold text-primary">Third-Party Retailer Cookies</h2>
        <p>
          When you click an outbound link to Amazon, PlayStation, or Xbox, those respective merchants may place tracking cookies per their individual privacy policies to credit qualifying affiliate purchases.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('cookie-policy/index.html', renderHtmlDocument({
    title: 'Cookie Policy',
    description: 'Learn about cookie usage on GTA Gaming Hub: essential site preferences and third-party merchant tracking.',
    canonicalPath: '/cookie-policy/',
    content: cookiePolicyContent
  }));

  // Page 36: /terms/
  const termsContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl font-bold text-primary mb-6">Terms & Conditions</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <p>
          By accessing GTA Gaming Hub (gtagaminghub.store), you agree to these Terms and Conditions.
        </p>
        <h2 class="text-xl font-bold text-primary">Informational Purpose Only</h2>
        <p>
          All content is provided for informational and product discovery purposes only. We do not sell video games or process payments directly on this website.
        </p>
        <h2 class="text-xl font-bold text-primary">Merchant Terms & Warranties</h2>
        <p>
          Purchases completed on external retailer platforms (such as Amazon or PlayStation Store) are governed entirely by those respective merchants' terms of sale, delivery policies, and refund guidelines.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('terms/index.html', renderHtmlDocument({
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of GTA Gaming Hub product discovery platform.',
    canonicalPath: '/terms/',
    content: termsContent
  }));

  // Page 37: /editorial-policy/
  const editorialPolicyContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-3xl">
      <h1 class="text-3xl font-bold text-primary mb-6">Editorial & Fact-Checking Policy</h1>
      <div class="space-y-6 text-secondary text-sm leading-relaxed">
        <p>
          At GTA Gaming Hub, accuracy is our fundamental priority. This policy outlines our verification standards.
        </p>
        <h2 class="text-xl font-bold text-primary">Primary Source Verification</h2>
        <p>
          We only confirm editions, release windows, and platform compatibility after verifying direct announcements from Rockstar Games, Take-Two Interactive, Sony PlayStation, or Microsoft Xbox.
        </p>
        <h2 class="text-xl font-bold text-primary">No Rumor Sensationalism</h2>
        <p>
          Unsubstantiated rumors, leaked builds, and unconfirmed PC release dates are never published as confirmed products.
        </p>
      </div>
    </div>
  </section>`;
  writeHtmlPage('editorial-policy/index.html', renderHtmlDocument({
    title: 'Editorial & Fact-Checking Policy',
    description: 'Our commitment to editorial integrity, primary source fact-checking, and non-sensationalized GTA reporting.',
    canonicalPath: '/editorial-policy/',
    content: editorialPolicyContent
  }));

  // Page 38: /admin/ (Owner Dashboard Shell)
  const adminContent = `
  <section class="py-12 border-b border-subtle">
    <div class="container-custom max-w-4xl">
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-subtle">
        <div>
          <span class="badge badge-purple mb-2">Phase A/B Architecture</span>
          <h1 class="text-3xl font-bold text-primary">Owner Management Dashboard</h1>
        </div>
        <span class="text-xs bg-surface-elevated text-secondary px-3 py-1.5 rounded border border-subtle">Static Config Mode</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6">
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Total Catalogue Items</div>
          <div class="text-3xl font-bold text-accent-primary">${products.length}</div>
          <div class="text-[11px] text-secondary mt-1">Stored in data/products.json</div>
        </div>

        <div class="card p-6">
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Configured Affiliate Links</div>
          <div class="text-3xl font-bold text-accent-blue">${Object.keys(affiliateConfig.links).length}</div>
          <div class="text-[11px] text-secondary mt-1">Managed in data/affiliate-links.json</div>
        </div>

        <div class="card p-6">
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Verified Retailers</div>
          <div class="text-3xl font-bold text-accent-secondary">${retailers.length}</div>
          <div class="text-[11px] text-secondary mt-1">Amazon, PSN, Xbox, Rockstar</div>
        </div>
      </div>

      <div class="card p-6 mb-8 space-y-4">
        <h2 class="text-lg font-bold text-primary">How to Update Affiliate Links & Tags</h2>
        <p class="text-xs text-secondary leading-relaxed">
          In this production static-first architecture, affiliate links are updated safely without modifying HTML page templates:
        </p>
        <ol class="list-decimal pl-5 text-xs text-secondary space-y-2">
          <li>Open <code>data/affiliate-links.json</code> in your code editor.</li>
          <li>Set your <code>ownerTrackingIds.amazonIndia</code> (e.g. <code>yourtag-21</code>).</li>
          <li>Paste the generated SiteStripe link into the respective product's <code>affiliateUrl</code> property.</li>
          <li>Run <code>npm run build</code> (or <code>node scripts/build.js</code>) to regenerate all 37+ production pages instantly.</li>
        </ol>
      </div>

      <div class="bg-surface-elevated/40 p-6 rounded-xl border border-subtle text-xs text-muted">
        <strong>Phase B Backend Upgrade Note:</strong> To connect a private password-protected management console with live Supabase or Cloudflare Workers authentication, follow the steps in <code>docs/deployment.md</code>.
      </div>
    </div>
  </section>`;
  writeHtmlPage('admin/index.html', renderHtmlDocument({
    title: 'Owner Management Dashboard (Config Shell)',
    description: 'Owner management dashboard for updating affiliate tags, reviewing catalogue metrics, and verifying source links.',
    canonicalPath: '/admin/',
    content: adminContent
  }));

  // Page 39: /404.html
  const notFoundContent = `
  <section class="py-24 text-center">
    <div class="container-custom max-w-xl">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-surface-elevated border border-active text-accent-primary text-3xl font-bold mb-6">
        404
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-3">Page Not Found</h1>
      <p class="text-sm text-secondary mb-8 leading-relaxed">
        The requested GTA Gaming Hub page does not exist or has been relocated in our verified catalogue.
      </p>
      <div class="flex items-center justify-center gap-4">
        <a href="/" class="btn btn-primary">Return to Homepage</a>
        <a href="/gta-6/" class="btn btn-secondary">Explore GTA 6</a>
      </div>
    </div>
  </section>`;
  writeHtmlPage('404.html', renderHtmlDocument({
    title: '404 — Page Not Found',
    description: 'The requested page was not found on GTA Gaming Hub.',
    canonicalPath: '/404.html',
    content: notFoundContent
  }));
}

// -------------------------------------------------------------
// 7. SITEMAP.XML GENERATOR
// -------------------------------------------------------------
function buildSitemapXml() {
  const allRoutes = [
    '/',
    '/gta-6/',
    '/gta-6/editions/',
    '/gta-6/ps5/',
    '/gta-6/xbox/',
    '/gta-6/price/',
    '/gta-6/buy/',
    '/games/',
    ...games.map(g => `/games/${g.slug}/`),
    '/compare/',
    '/merchandise/',
    '/accessories/',
    '/deals/',
    '/guides/',
    ...guides.map(g => `/guides/${g.slug}/`),
    '/search/',
    '/wishlist/',
    '/about/',
    '/contact/',
    '/affiliate-disclosure/',
    '/privacy-policy/',
    '/cookie-policy/',
    '/terms/',
    '/editorial-policy/'
  ];

  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${siteConfig.baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' || route.startsWith('/gta-6/') ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/gta-6/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'public/sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`✓ Generated sitemap.xml with ${allRoutes.length} canonical URLs.`);
}

// -------------------------------------------------------------
// MAIN BUILD EXECUTION
// -------------------------------------------------------------
function main() {
  console.log('🚀 Starting GTA Gaming Hub Master Production Build...');
  
  // Ensure dist exists
  fs.mkdirSync(DIST_DIR, { recursive: true });

  buildHomepage();
  buildGta6Pages();
  buildGamesPages();
  buildCommerceAndComparePages();
  buildGuidesPages();
  buildUtilityAndLegalPages();
  buildSitemapXml();
  mirrorAssets();

  console.log('🎉 Production build completed successfully!');
}

main();
