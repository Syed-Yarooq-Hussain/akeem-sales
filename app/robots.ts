export const dynamic='force-static';
import {siteOrigin} from '@/lib/seo';
export default function robots(){return {rules:{userAgent:'*',allow:'/'},sitemap:`${siteOrigin}/sitemap.xml`};}
