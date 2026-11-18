import {canonicalPages} from '@/lib/services';
import {locales} from '@/lib/i18n';
import {pageUrl,languageAlternates,indexablePage} from '@/lib/seo';
export const dynamic='force-static';
export default function sitemap(){return locales.flatMap(lang=>canonicalPages.filter(indexablePage).map(page=>({url:pageUrl(lang,page),alternates:{languages:languageAlternates(page)}})));}
