import type { Metadata } from 'next';
import {notFound} from 'next/navigation';
import {ModernSite} from '@/components/ModernSite';
import {languages,routes} from '@/lib/content';
import {canonicalPages,canonicalPage,serviceCatalog} from '@/lib/services';
const allPages=[...new Set([...routes,...canonicalPages])];
const origin=process.env.NEXT_PUBLIC_SITE_URL||'https://blackmeridian-seven.vercel.app';
type Props={params:Promise<{path?:string[]}>};
function resolve(path:string[]=[]){return (languages.some(l=>l===path[0])?path.slice(1):path).join('/');}
export const dynamicParams=false;
export function generateStaticParams(){return [{path:[]},...allPages.filter(Boolean).map(p=>({path:p.split('/')})),...languages.flatMap(lang=>allPages.map(p=>({path:[lang,...(p?p.split('/'):[])]})))];}
export async function generateMetadata({params}:Props):Promise<Metadata>{const page=canonicalPage(resolve((await params).path));const service=page.startsWith('services/')?serviceCatalog.find(s=>s.slug===page.split('/')[1]):undefined;const titles:Record<string,string>={'':'Sales, Marketing & Business Development Solutions',about:'About Us',services:'Our Services','how-we-work':'How We Work',contact:'Request a Consultation',industries:'Industries',insights:'Insights','privacy-policy':'Privacy Information'};const title=`${service?.title||titles[page]||'Services'} | Black Meridian`;const description=service?.intro||'Hands-on sales, marketing, advertising and customer service. From individual services to monthly management and complete outsourced departments.';const canonical=`/en/${page}${page?'/':''}`;return {title,description,metadataBase:new URL(origin),alternates:{canonical},openGraph:{title,description,type:'website',locale:'en_GB',url:canonical},robots:{index:page!=='privacy-policy',follow:true}};}
export default async function Page({params}:Props){const page=resolve((await params).path);if(!allPages.includes(page))notFound();return <ModernSite page={page}/>}
