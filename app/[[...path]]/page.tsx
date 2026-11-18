import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ModernSite} from '@/components/ModernSite';
import {routes} from '@/lib/content';
import {canonicalPages,canonicalPage,serviceCatalog} from '@/lib/services';
import {locales,isLocale,localeFromPath,getDictionary,translator} from '@/lib/i18n';
import {siteOrigin,languageAlternates,indexablePage,siteStructuredData,pageUrl,organization} from '@/lib/seo';
const allPages=[...new Set([...routes,...canonicalPages])];
const origin=siteOrigin;
type Props={params:Promise<{path?:string[]}>};
function resolve(path:string[]=[]){return (isLocale(path[0]||'')?path.slice(1):path).join('/');}
export const dynamicParams=false;
export function generateStaticParams(){return [{path:[]},...allPages.filter(Boolean).map(p=>({path:p.split('/')})),...locales.flatMap(lang=>allPages.map(p=>({path:[lang,...(p?p.split('/'):[])]})))];}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const path=(await params).path;const lang=localeFromPath(path);const page=canonicalPage(resolve(path));const t=translator(await getDictionary(lang));
 const service=page.startsWith('services/')?serviceCatalog.find(s=>s.slug===page.split('/')[1]):undefined;
 const titles:Record<string,string>={'':'Sales, Marketing & Business Development Solutions',about:'About Us',services:'Our Services','how-we-work':'How We Work',contact:'Request a Consultation',industries:'Industries',insights:'Insights','privacy-policy':'Privacy Information'};
 const title=t(service?.title||titles[page]||'Services')+' | Black Meridian';
 const descriptions:Record<string,string>={about:'BLACK MERIDIAN Sales & Consulting Ltd supports businesses through sales, marketing, advertising, customer service and business development.',services:'From focused assignments to complete operations. Every engagement starts with a clear scope.','how-we-work':'One project, ongoing management or an outsourced department. Start with the level of support your business needs.',contact:'Tell us what you need. We’ll discuss the scope, the working model and how we can support your business.',industries:'We discuss your market, customers and operating needs before agreeing the right services and scope.'};
 const description=t(service?.intro||descriptions[page]||'Hands-on sales, marketing, advertising and customer service. From individual services to monthly management and complete outsourced departments.');
 const suffix=page+(page?'/':'');const canonical='/'+lang+'/'+suffix;
 return {title,description,metadataBase:new URL(origin),alternates:{canonical,languages:languageAlternates(page)},openGraph:{title,description,siteName:'Black Meridian',type:'website',locale:lang,url:canonical,images:[{url:'/images/business-strategy-v1.webp',alt:'Black Meridian — Sales & Consulting'}]},twitter:{card:'summary_large_image',title,description,images:['/images/business-strategy-v1.webp']},verification:process.env.GOOGLE_SITE_VERIFICATION?{google:process.env.GOOGLE_SITE_VERIFICATION}:undefined,robots:{index:indexablePage(page),follow:true}};
}
export default async function Page({params}:Props){const path=(await params).path;const page=resolve(path);if(!allPages.includes(page))notFound();const lang=localeFromPath(path);const canonical=canonicalPage(page);const dictionary=await getDictionary(lang);const t=translator(dictionary);const service=serviceCatalog.find(s=>canonical===`services/${s.slug}`);const structured=canonical===''?siteStructuredData(lang):service?{'@context':'https://schema.org','@type':'Service',name:t(service.title),description:t(service.intro),url:pageUrl(lang,canonical),provider:organization}:null;return <>{structured&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>}<ModernSite key={lang+'/'+page} page={page} lang={lang} dictionary={dictionary}/></>;}
