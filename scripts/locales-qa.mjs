import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const languages=['de','en','tr','pl','ro','sq','es','fr','el','uk','bg','it'];
const source=JSON.parse(fs.readFileSync('lib/locales/source.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 for(const lang of languages){
  const dict=lang==='en'?{}:JSON.parse(fs.readFileSync(`lib/locales/${lang}.json`,'utf8'));const t=s=>dict[s]||s;
  if(lang!=='en')assert.deepEqual(source.filter(s=>!dict[s]),[],`${lang}: missing translations`);
  const r=await page.goto(`http://127.0.0.1:3100/${lang}/`);assert.equal(r.status(),200);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  assert.equal(await page.locator('.m-language-select option').count(),12);
  assert((await page.locator('h1').innerText()).includes(t('Build demand.')));
  assert((await page.locator('link[rel=canonical]').getAttribute('href')).endsWith(`/${lang}/`));
  assert.equal(await page.locator('link[rel=alternate][hreflang]').count(),13);
  for(const width of [1440,768,390,320]){
   await page.setViewportSize({width,height:950});
   assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${lang}: page overflow at ${width}`);
   const outside=await page.locator('.m-header a,.m-header select,h1,h2,h3,.m-button').evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left < -2)}).map(e=>e.textContent));assert.deepEqual(outside,[],`${lang}: element overflow at ${width}`);
  }
  if(['de','el'].includes(lang)){const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();assert.deepEqual(a.violations.map(v=>v.id),[],lang);for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`qa/${lang}-mobile.png`,fullPage:true});}
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(`http://127.0.0.1:3100/${lang}/services/talent-management-brand-partnerships/?model=monthly#capability-0`);
  assert((await page.locator('h1').innerText()).includes(t('Talent Management & Brand Partnerships')));
  const next=languages[(languages.indexOf(lang)+1)%languages.length];
  await page.locator('.m-language-select select').selectOption(next);
  await page.waitForURL(`**/${next}/services/talent-management-brand-partnerships/?model=monthly#capability-0`);
  await page.waitForFunction(l=>document.documentElement.lang===l,next);
  await page.goto(`http://127.0.0.1:3100/${lang}/contact/?service=talent-management-brand-partnerships&model=monthly#growth`);
  const panel=page.locator('.navigator-panel');await panel.getByRole('radio').nth(5).waitFor();assert(await panel.getByRole('radio').nth(5).isChecked());
  await panel.locator('button[type=submit]').click();await panel.getByRole('radio').nth(1).check();await panel.locator('button[type=submit]').click();await panel.getByRole('radio').nth(1).check();await panel.locator('button[type=submit]').click();
  assert.equal(await panel.locator('select').inputValue(),'monthly');
  await panel.locator('[name=name]').fill('QA Example');await panel.locator('[name=company]').fill('Example Business');await panel.locator('[name=email]').fill('qa@example.com');await panel.locator('[type=checkbox]').check();
  await page.evaluate(()=>{window.__opened='';window.open=u=>{window.__opened=String(u);return null;}});
  await panel.locator('button[type=submit]').click();const link=new URL(await page.evaluate(()=>window.__opened));assert.equal(link.host,'wa.me');assert(link.searchParams.get('text').includes(t('Talent Management & Brand Partnerships')));assert(link.searchParams.get('text').includes(t('Working model')));
  await page.goto(`http://127.0.0.1:3100/${lang}/privacy-policy/`);assert.equal(await page.locator('h1').innerText(),t('Your information. Your choice.'));
  console.log(`${lang}: translations, 4 widths, metadata, switcher, service page, form handoff and privacy passed`);
 }
 assert.deepEqual(errors,[]);console.log('All 12 languages passed; no messages sent.');
}finally{await browser.close()}
