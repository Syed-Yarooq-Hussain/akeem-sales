import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();let results=[];
for(const locale of ['en','de','fr','es']){await page.goto(`http://127.0.0.1:3100/${locale}/`,{waitUntil:'networkidle'});const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({locale,violations:scan.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});}
await page.goto('http://127.0.0.1:3100/en/contact/',{waitUntil:'networkidle'});for(let i=0;i<3;i++){await page.locator('.options label').first().click();await page.locator('.navigator-panel button[type=submit]').click();}const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({locale:'contact-fields',violations:scan.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});await writeFile('qa/accessibility.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));await browser.close();if(results.some(r=>r.violations.length))process.exitCode=1;

