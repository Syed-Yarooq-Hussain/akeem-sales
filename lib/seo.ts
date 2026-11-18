import {locales,type Locale} from './i18n';
import {contactEmail} from './services';
export const siteOrigin='https://www.blackmeridian-global.com';
export const indexablePage=(page:string)=>!['privacy-policy','insights'].includes(page);
export function pageUrl(lang:Locale,page=''){return `${siteOrigin}/${lang}/${page}${page?'/':''}`;}
export function languageAlternates(page=''){return {...Object.fromEntries(locales.map(lang=>[lang,pageUrl(lang,page)])),'x-default':pageUrl('en',page)};}
export const organization={'@type':'Organization','@id':`${siteOrigin}/#organization`,name:'Black Meridian',legalName:'Black Meridian Sales & Consulting Ltd',url:siteOrigin,email:contactEmail,telephone:'+49 172 2187353'};
export function siteStructuredData(lang:Locale){return {'@context':'https://schema.org','@graph':[organization,{'@type':'WebSite','@id':`${siteOrigin}/#website`,url:siteOrigin,name:'Black Meridian',inLanguage:locales,publisher:{'@id':organization['@id']}},{'@type':'WebPage','@id':`${pageUrl(lang)}#webpage`,url:pageUrl(lang),name:'Black Meridian',inLanguage:lang,isPartOf:{'@id':`${siteOrigin}/#website`},about:{'@id':organization['@id']}}]};}
