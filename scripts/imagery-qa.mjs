import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 for(const route of ['','services','about','how-we-work','contact']){
  await page.goto(`http://127.0.0.1:3100/en/${route}${route?'/':''}`);
  const images=page.locator('main img');
  for(const img of await images.all()){
   await img.scrollIntoViewIfNeeded();
   await img.evaluate(async el=>{await el.decode()});
   assert(await img.evaluate(el=>el.naturalWidth>0&&el.alt.length>0));
  }
  if(route==='services'){
   assert.equal(await page.locator('.m-service-photo').count(),6);
   assert.equal(new Set(await page.locator('.m-service-photo').evaluateAll(els=>els.map(e=>e.src))).size,6);
   await page.locator('.m-service-list').screenshot({path:'qa/services-imagery-desktop.png'});
   await page.setViewportSize({width:390,height:844});
   await page.locator('.m-service-list').screenshot({path:'qa/services-imagery-mobile.png'});
   await page.setViewportSize({width:1440,height:1000});
  }
  console.log(`${route||'home'}: all ${await images.count()} images loaded with alt text`);
 }
}finally{await browser.close()}
