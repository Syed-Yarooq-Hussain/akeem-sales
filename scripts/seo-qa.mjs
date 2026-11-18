import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin='https://www.blackmeridian-global.com';
const xml=fs.readFileSync('out/sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>100);assert.equal(new Set(urls).size,urls.length);
assert(!xml.includes('vercel.app'));assert(!xml.includes('/insights/'));assert(!xml.includes('/privacy-policy/'));
for(const url of urls){assert(url.startsWith(origin+'/'));const path=new URL(url).pathname;const html=fs.readFileSync(`out${path}index.html`,'utf8');assert(html.includes(`rel="canonical" href="${url}"`),url);assert(!/<meta name="robots" content="[^"]*noindex/.test(html),url);assert.equal([...html.matchAll(/rel="alternate" hrefLang=/g)].length,13,url);assert(!html.includes('https://blackmeridian-seven.vercel.app'),url);}
const robots=fs.readFileSync('out/robots.txt','utf8');assert(robots.includes('Allow: /'));assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
for(const lang of ['de','en','tr','pl','ro','sq','es','fr','el','uk','bg','it']){
 const html=fs.readFileSync(`out/${lang}/index.html`,'utf8');const raw=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];assert(raw,lang);const graph=JSON.parse(raw)['@graph'];assert(graph.some(n=>n['@type']==='Organization'&&n.url===origin));
 for(const page of ['insights','privacy-policy']){const text=fs.readFileSync(`out/${lang}/${page}/index.html`,'utf8');assert(/<meta name="robots" content="noindex, follow"/.test(text));}
}
console.log(`SEO export verified: ${urls.length} canonical URLs, 12 languages, hreflang, structured data, robots and excluded empty/legal pages.`);
