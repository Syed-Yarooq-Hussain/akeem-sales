export const localeNames = {de:'Deutsch',en:'English',tr:'Türkçe',pl:'Polski',ro:'Română',sq:'Shqip',es:'Español',fr:'Français',el:'Ελληνικά',uk:'Українська',bg:'Български',it:'Italiano'} as const;
export type Locale=keyof typeof localeNames;
export const locales=Object.keys(localeNames) as Locale[];
export function isLocale(value:string):value is Locale{return value in localeNames;}
export function localeFromPath(path:string[]=[]):Locale{return isLocale(path[0]||'')?path[0] as Locale:'en';}
export type Dictionary=Record<string,string>;
export async function getDictionary(lang:Locale):Promise<Dictionary>{if(lang==='en')return {};return (await import(`./locales/${lang}.json`)).default;}
export function translator(dictionary:Dictionary){return (text:string)=>(dictionary[text]||text).replace(/&amp;/g,'&');}
export function translateData<T>(value:T,t:(s:string)=>string):T{
 if(typeof value==='string')return t(value) as T;
 if(Array.isArray(value))return value.map(v=>translateData(v,t)) as T;
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,v])=>[key,key==='slug'?v:translateData(v,t)])) as T;
 return value;
}
