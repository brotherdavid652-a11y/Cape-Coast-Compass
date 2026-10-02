const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const origin = 'https://cape-coast-compass.pages.dev';
const places = JSON.parse(fs.readFileSync(path.join(root, 'galleries.js'), 'utf8').replace(/^window\.COMPASS_PLACES\s*=\s*/, '').replace(/;\s*$/, ''));
const escape = text => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
fs.writeFileSync(path.join(root, 'planner-data.js'), 'window.COMPASS_PLACES=' + JSON.stringify(places.filter(p => !p.nearby).map(({id, slug, name, access, nearby}) => ({id, slug, name, access, nearby}))) + ';\n');
const descriptions = {
 'index.html': 'Explore Cape Coast, Ghana: castles, markets, coastal scenery and cultural landmarks. Discover places and build your own proposed city visit with Cape Coast Compass.',
 'attractions.html': 'Discover 22 Cape Coast attractions and 10 nearby destinations. Browse heritage, culture, faith and nature, with photographs and practical access notes.',
 'partners.html': 'Explore the Cape Coast Compass proposal for attraction managers: visitor coordination, transport, admission arrangements and respectful site visits.',
 'payment.html': 'Review your proposed Cape Coast itinerary, preferred date, group size and pickup point. Booking and payment are not currently available.',
 'terms.html': 'Read the Cape Coast Compass Terms of Service, including trip planning, attraction information, photo use and the current service preview.',
 'privacy.html': 'Learn how Cape Coast Compass handles browser trip storage, optional location access, hosting logs and your privacy choices.',
 'refund-policy.html': 'Read the Cape Coast Compass Refund Policy. No bookings or payments are currently accepted; future cancellation terms must be agreed before payment.',
 '404.html': 'This Cape Coast Compass page could not be found. Return to the attraction directory or plan your Cape Coast visit.'
};
const files = [...fs.readdirSync(root).filter(f => f.endsWith('.html')), ...fs.readdirSync(path.join(root, 'places')).filter(f => f.endsWith('.html')).map(f => 'places/' + f)];
const sitemap = [];
for (const file of files) {
 if (file === 'plan.html') continue;
 let html = fs.readFileSync(path.join(root, file), 'utf8');
 const place = places.find(p => file === 'places/' + p.slug + '.html');
 const title = file === 'index.html' ? 'Cape Coast Attractions & Trip Planner | Cape Coast Compass' : html.match(/<title>(.*?)<\/title>/)[1];
 const description = descriptions[file] || `${place.description} ${place.access}`;
 const url = origin + (file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, ''));
 const noindex = ['payment.html', '404.html'].includes(file);
 const photo = place?.photos?.[0]?.src || 'assets/photos/cape-coast-castle/castle-3-1600.webp';
 const json = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': origin + '/#website', name: 'Cape Coast Compass', url: origin + '/', inLanguage: 'en' },
  { '@type': 'WebPage', '@id': url + '#webpage', url, name: title.replace(/&amp;/g, '&'), description, inLanguage: 'en', isPartOf: { '@id': origin + '/#website' } }
 ] };
 if (place) {
  json['@graph'].push({ '@type': 'TouristAttraction', '@id': url + '#place', name: place.name, description: place.description, url, ...(place.photos.length ? {image: origin + '/' + photo} : {}) });
  json['@graph'].push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: 'Attractions', item: origin + '/attractions' }, { '@type': 'ListItem', position: 3, name: place.name, item: url }] });
 }
 if (file === 'attractions.html') json['@graph'].push({ '@type': 'ItemList', name: 'Cape Coast and nearby attractions', itemListElement: places.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: origin + '/places/' + p.slug })) });
 html = html.replace(/<title>.*?<\/title>/, '<title>' + title + '</title>').replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}">`);
 html = html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/g, '');
 const prefix = file.startsWith('places/') ? '../' : '';
 const metadata = `<!-- seo:start --><link rel="canonical" href="${url}"><meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}"><link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml"><meta property="og:type" content="website"><meta property="og:site_name" content="Cape Coast Compass"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/${photo}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${origin}/${photo}"><script type="application/ld+json">${JSON.stringify(json).replace(/</g, '\\u003c')}</script><!-- seo:end -->`;
 html = html.replace('</head>', metadata + '</head>');
 if (!html.includes('class="legal-links"')) html = html.replace('</footer>', `<nav class="legal-links" aria-label="Legal information"><a href="${prefix}terms.html">Terms of Service</a><a href="${prefix}privacy.html">Privacy</a><a href="${prefix}refund-policy.html">Refund Policy</a></nav></footer>`);
 if (file === 'partners.html') html = html.replace(/<script defer[^>]*><\/script>/g, '');
 html = html.replace(/<img\b([^>]*class="gallery-image"[^>]*)>/g, (tag, attributes) => {
  if (!place?.photos[0]?.srcset || attributes.includes('srcset=')) return tag;
  const srcset = place.photos[0].srcset.split(', ').map(s => prefix + s).join(', ');
  return `<img${attributes} srcset="${srcset}" sizes="(max-width:767px) calc(100vw - 40px), (max-width:1320px) 58vw, 740px" fetchpriority="high" decoding="async">`;
 });
 if (file === 'index.html') html = html.replace('sizes="(max-width:767px) 100vw, 50vw"', 'sizes="(max-width:767px) calc(100vw - 40px), (max-width:1320px) 42vw, 540px"');
 html = html.replace(/sizes="\(max-width:767px\) 100vw, 50vw"/g, file === 'index.html' ? 'sizes="(max-width:767px) calc(100vw - 42px), (max-width:1100px) 30vw, 420px"' : 'sizes="(max-width:767px) calc(100vw - 42px), (max-width:1100px) 45vw, 390px"');
 if (file === '404.html') html = html.replace(/href="(?!https?:|#|\/)([^"]+)"/g, 'href="/$1"');
 fs.writeFileSync(path.join(root, file), html);
 if (!noindex) sitemap.push(url);
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.map(url => `<url><loc>${escape(url)}</loc></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`SEO metadata prepared for ${files.length - 1} pages; ${sitemap.length} sitemap URLs`);
