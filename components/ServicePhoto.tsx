import {useLocale} from './LocaleProvider';
import '@/app/imagery.css';

const imagery: Record<string, {name:string;alt:string}> = {
  'online-sales': {name:'online-sales',alt:'E-commerce specialist managing online orders alongside packaged products'},
  'offline-sales': {name:'offline-sales',alt:'Face-to-face sales consultation with product samples in a showroom'},
  'marketing-advertising': {name:'marketing',alt:'Creative team planning a campaign with photographs and colour swatches'},
  'sales-support-customer-services': {name:'support',alt:'Customer care specialist assisting a customer through a headset'},
  'business-development-consultancy': {name:'growth',alt:'Business partners reviewing expansion plans beside a city skyline'},
  'talent-management-brand-partnerships': {name:'talent-campaign',alt:'Talent and creative partners reviewing a brand campaign shoot'},
};

export function EditorialPhoto({name,alt,className='',eager=false}:{name:string;alt:string;className?:string;eager?:boolean}){
  const {t}=useLocale();
  return <img className={className} src={`/images/${name}-v1.webp`} srcSet={`/images/${name}-mobile-v1.webp ${name==='talent-campaign'?600:640}w, /images/${name}-v1.webp ${name==='talent-campaign'?1200:1440}w`} sizes={className==='m-service-photo'?'(max-width: 640px) 88vw, 42vw':'88vw'} width={1440} height={960} alt={t(alt)} loading={eager?'eager':'lazy'} decoding="async"/>;
}

export function ServicePhoto({slug,className=''}:{slug:string;className?:string}){
  const photo=imagery[slug];
  if(!photo)return null;
  return <EditorialPhoto {...photo} className={className} eager={className==='m-detail-photo'}/>;
}
