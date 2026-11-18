'use client';
import {createContext,useContext,useMemo,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Globe} from 'lucide-react';
import {en} from '@/lib/en';
import {serviceCatalog,collaborationModels} from '@/lib/services';
import {localeNames,locales,translator,translateData,type Locale,type Dictionary} from '@/lib/i18n';
function makeValue(lang:Locale,dictionary:Dictionary){
 const t=translator(dictionary);
 const services=translateData(serviceCatalog,t);
 const href=(page='')=>`/${lang}/${page}${page?'/':''}`;
 const formCopy=translateData({...en,formLabel:'LET’S GET SPECIFIC',formTitle:['Your next move.','Let’s make it happen.'],formIntro:'Tell us what you need and how you would like to work together. We’ll start with a conversation about your priorities.',steps:['Your service','Your market','Your business','Your details'],objective:'Where can we support your business?',objectives:serviceCatalog.map(s=>s.title),message:'Hello Black Meridian, I would like to discuss your services.'},t);
 return {lang,t,href,formCopy,serviceCatalog:services,collaborationModels:translateData(collaborationModels,t),contact:(service='',model='')=>`${href('contact')}?${new URLSearchParams({service,model})}#growth`};
}
const LocaleContext=createContext(makeValue('en',{}));
export function LocaleProvider({lang,dictionary,children}:{lang:Locale;dictionary:Dictionary;children:React.ReactNode}){
 const value=useMemo(()=>makeValue(lang,dictionary),[lang,dictionary]);
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale(){return useContext(LocaleContext);}
export function LanguageSwitcher({page}:{page:string}){
 const {lang,t}=useLocale();const router=useRouter();
 return <label className="m-language-select"><Globe size={16} aria-hidden="true"/><span className="sr-only">{t('Language')}</span><select aria-label={t('Language')} value={lang} onChange={e=>{const next=e.target.value;router.push(`/${next}/${page}${page?'/':''}${window.location.search}${window.location.hash}`);}}>{locales.map(code=><option key={code} value={code} lang={code}>{localeNames[code]}</option>)}</select></label>;
}
