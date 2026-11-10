import { languages, routes, url } from '@/lib/content';
export const dynamic='force-static';
export default function sitemap(){const origin='https://black-meridian-atlas.jazzykiwi33.chatgpt.site';return languages.flatMap(lang=>routes.filter(r=>r!=='privacy-policy').map(page=>({url:origin+url(lang,page),alternates:{languages:Object.fromEntries(languages.map(l=>[l,origin+url(l,page)]))}})));}
