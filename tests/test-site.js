const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const REQUIRED_FILES = [
  'index.html',
  'gta-6/index.html',
  'gta-6/editions/index.html',
  'gta-6/ps5/index.html',
  'gta-6/xbox/index.html',
  'gta-6/price/index.html',
  'gta-6/buy/index.html',
  'games/index.html',
  'games/gta-6/index.html',
  'games/gta-5/index.html',
  'games/gta-4/index.html',
  'games/gta-san-andreas/index.html',
  'games/gta-vice-city/index.html',
  'games/gta-3/index.html',
  'games/gta-trilogy/index.html',
  'games/gta-chinatown-wars/index.html',
  'games/gta-liberty-city-stories/index.html',
  'games/gta-vice-city-stories/index.html',
  'games/gta-1/index.html',
  'games/gta-2/index.html',
  'compare/index.html',
  'merchandise/index.html',
  'accessories/index.html',
  'deals/index.html',
  'guides/index.html',
  'guides/gta-games-in-order/index.html',
  'guides/gta-6-edition-comparison/index.html',
  'guides/gta-6-platform-guide/index.html',
  'guides/gta-6-buying-guide/index.html',
  'search/index.html',
  'wishlist/index.html',
  'about/index.html',
  'contact/index.html',
  'affiliate-disclosure/index.html',
  'privacy-policy/index.html',
  'cookie-policy/index.html',
  'terms/index.html',
  'editorial-policy/index.html',
  'admin/index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt'
];

function runTests() {
  console.log('🧪 Starting Automated Quality Assurance Tests for GTA Gaming Hub...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. File existence checks
  console.log('1. Checking file integrity in root and dist/ directories:');
  REQUIRED_FILES.forEach(file => {
    const rootPath = path.join(ROOT_DIR, file);
    const distPath = path.join(DIST_DIR, file);
    assert(fs.existsSync(rootPath), `Root file exists: ${file}`);
    assert(fs.existsSync(distPath), `Dist file exists: ${file}`);
  });

  // 2. SEO & Semantic HTML Validation
  console.log('\n2. Validating SEO Metadata and Schema on HTML pages:');
  const htmlFiles = REQUIRED_FILES.filter(f => f.endsWith('.html'));
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
    assert(content.includes('<title>'), `${file} contains <title> tag`);
    assert(content.includes('<meta name="description"'), `${file} contains meta description`);
    assert(content.includes('<link rel="canonical"'), `${file} contains canonical URL`);
    assert(content.includes('application/ld+json'), `${file} contains structured data JSON-LD`);
    assert(content.includes('gtagaminghub.store'), `${file} contains production domain references`);
    assert(!content.includes('undefined'), `${file} contains no raw 'undefined' text artifacts`);
  });

  // 3. Data Integrity Validation
  console.log('\n3. Validating Catalogue & Affiliate JSON Data:');
  const jsonFiles = [
    'data/site-config.json',
    'data/products.json',
    'data/games.json',
    'data/guides.json',
    'data/affiliate-links.json',
    'data/retailers.json'
  ];
  jsonFiles.forEach(jf => {
    try {
      const parsed = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, jf), 'utf8'));
      assert(Array.isArray(parsed) || typeof parsed === 'object', `Valid JSON structure in ${jf}`);
    } catch (e) {
      assert(false, `JSON parsing error in ${jf}: ${e.message}`);
    }
  });

  // 4. Client-side JS Modules
  console.log('\n4. Validating Vanilla JavaScript Modules:');
  const jsModules = [
    'src/js/toast.js',
    'src/js/analytics.js',
    'src/js/theme.js',
    'src/js/navigation.js',
    'src/js/search.js',
    'src/js/wishlist.js',
    'src/js/compare.js',
    'src/js/affiliate.js',
    'src/js/consent.js',
    'src/js/filters.js'
  ];
  jsModules.forEach(mod => {
    assert(fs.existsSync(path.join(ROOT_DIR, mod)), `JS Module exists: ${mod}`);
  });

  // 5. Sitemap Validation
  console.log('\n5. Validating Sitemap.xml:');
  const sitemapXml = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
  assert(sitemapXml.includes('<urlset'), 'Sitemap has valid urlset root element');
  assert(sitemapXml.includes('https://gtagaminghub.store/'), 'Sitemap has canonical base URL');
  assert(sitemapXml.includes('https://gtagaminghub.store/gta-6/editions/'), 'Sitemap includes GTA 6 editions URL');

  // Summary
  console.log(`\n========================================`);
  console.log(`Total Checks: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL AUTOMATED QUALITY ASSURANCE TESTS PASSED!');
  }
}

runTests();
