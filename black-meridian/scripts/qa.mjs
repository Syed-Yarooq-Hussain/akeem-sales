import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3100/en/',{waitUntil:'networkidle'});
await page.locator('img').evaluateAll(els=>els.forEach(e=>e.loading='eager'));await page.waitForFunction(()=>Array.from(document.images).every(e=>e.complete));await page.screenshot({path:'qa/home-desktop.png',fullPage:true});
const results=[];
for(const lang of ['en','de','fr','es']){
 await page.goto(`http://127.0.0.1:3100/${lang}/`,{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),lang);
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('.services article').count(),5);
 await page.locator('.service h3 button').nth(2).click();
 assert.equal(await page.locator('#service-2').isVisible(),true);
 const links=await page.locator('a[href*="wa.me"]').evaluateAll(els=>els.map(el=>el.href));
 assert(links.length>3 && links.every(l=>l.startsWith('https://wa.me/491722187353?text=')));
 await page.locator('img').evaluateAll(els=>els.forEach(e=>e.loading='eager')); await page.waitForFunction(()=>Array.from(document.images).every(e=>e.complete));
 const images=await page.locator('img').evaluateAll(els=>els.map(e=>({src:e.src,ok:e.complete&&e.naturalWidth>0})));
 assert(images.every(i=>i.ok),JSON.stringify(images));
 for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:900});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);assert(!overflow,`Overflow: ${lang}/${width}`);}
 await page.screenshot({path:`qa/home-${lang}-mobile.png`,fullPage:true});
 const menu=page.locator('.menu-toggle');await menu.click();assert(await page.locator('#mobile-menu').isVisible());await page.keyboard.press('Escape');assert(!(await page.locator('#mobile-menu').isVisible()));
 results.push(`${lang}: document language, heading, accordion, WhatsApp links, images, 4 widths, mobile navigation passed`);
 await page.setViewportSize({width:1440,height:1000});
}
await page.goto('http://127.0.0.1:3100/en/expertise/market-expansion/',{waitUntil:'networkidle'});
await page.getByRole('combobox',{name:'Language',exact:true}).selectOption('de');await page.waitForURL('**/de/expertise/market-expansion/');assert.match(await page.locator('h1').innerText(),/Marktexpansion/);
results.push('Language switch preserves the service-detail route');
await page.goto('http://127.0.0.1:3100/en/contact/',{waitUntil:'networkidle'});
const panel=page.locator('.navigator-panel');await panel.getByRole('button',{name:'Continue',exact:true}).click();assert(await panel.getByRole('alert').isVisible());
await panel.getByText('Expand internationally',{exact:true}).click();await panel.getByRole('button',{name:'Continue',exact:true}).click();
await panel.getByText('Europe',{exact:true}).click();await panel.getByRole('button',{name:'Continue',exact:true}).click();
await panel.getByText('11–50 employees',{exact:true}).click();await panel.getByRole('button',{name:'Continue',exact:true}).click();
await panel.getByRole('button',{name:'Continue on WhatsApp',exact:true}).click();assert.equal(await panel.locator('input[name=name]').evaluate(e=>e.validity.valid),false);
await panel.locator('input[name=name]').fill('QA Example');await panel.locator('input[name=company]').fill('Example Company');await panel.locator('input[name=email]').fill('qa@example.com');await panel.locator('textarea').fill('Explore European distribution partners.');await panel.locator('input[type=checkbox]').check();
await page.evaluate(()=>{window.__opened='';window.open=(u)=>{window.__opened=String(u);return null}});
await panel.getByRole('button',{name:'Continue on WhatsApp',exact:true}).click();
const target=await page.evaluate(()=>window.__opened);const wa=new URL(target);assert.equal(wa.hostname,'wa.me');assert.equal(wa.pathname,'/491722187353');for(const text of ['Expand internationally','Europe','11–50 employees','QA Example','qa@example.com','Explore European distribution partners.'])assert(wa.searchParams.get('text').includes(text));
assert(await panel.getByRole('link',{name:'Open WhatsApp again'}).isVisible());results.push('Four-step enquiry: choice validation, required fields, consent, composed WhatsApp message and manual-send state passed');
assert.deepEqual(errors,[]);results.push('No browser runtime errors');
await writeFile('qa/results.json',JSON.stringify(results,null,2));console.log(results.join('\n'));await browser.close();


