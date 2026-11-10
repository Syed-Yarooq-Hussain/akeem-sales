import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Site } from '@/components/Site';
import { languages, routes, content, serviceSlugs, url, type Language } from '@/lib/content';
type Props = {params: Promise<{path?:string[]}>};
function resolve(path:string[]=[]){const isLocale=languages.includes(path[0] as Language);const lang:Language=isLocale?path[0] as Language:'en';const page=(isLocale?path.slice(1):path).join('/');return {lang,page};}
export const dynamicParams=false;
export function generateStaticParams(){return [{path:[]},...routes.filter(Boolean).map(p=>({path:p.split('/')})),...languages.flatMap(lang=>routes.map(page=>({path:[lang,...(page?page.split('/'):[])]})))];}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {lang,page}=resolve((await params).path);const d=content[lang];const index=serviceSlugs.indexOf(page.split('/')[1]);const titles:Record<string,string>={'':d.hero.join(' '),about:d.nav[0],expertise:d.nav[1],industries:d.nav[2],'our-approach':d.nav[3],contact:d.connect,insights:d.insights,'privacy-policy':d.privacy};const title=`${index>=0?d.services[index][0]:titles[page]||d.home} | Black Meridian`;const origin='https://black-meridian-atlas.jazzykiwi33.chatgpt.site';return {title,description:index>=0?d.services[index][2]:d.intro,metadataBase:new URL(origin),alternates:{canonical:url(lang,page),languages:Object.fromEntries(languages.map(l=>[l,url(l,page)]))},openGraph:{title,description:d.intro,type:'website',locale:{en:'en_GB',de:'de_DE',fr:'fr_FR',es:'es_ES'}[lang],url:url(lang,page),images:[{url:'/images/architecture.jpg',width:1000,height:667,alt:'Black Meridian'}]},robots:{index:page!=='privacy-policy',follow:true}};}
export default async function Page({params}:Props){const {lang,page}=resolve((await params).path);if(!routes.includes(page))notFound();return <Site lang={lang} page={page}/>}
