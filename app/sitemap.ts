import {canonicalPages} from '@/lib/services';
export const dynamic='force-static';
export default function sitemap(){const origin=process.env.NEXT_PUBLIC_SITE_URL||'https://blackmeridian-seven.vercel.app';return canonicalPages.filter(p=>p!=='privacy-policy').map(p=>({url:`${origin}/en/${p}${p?'/':''}`}));}
