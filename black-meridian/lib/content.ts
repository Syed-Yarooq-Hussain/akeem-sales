import { en } from './en';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
export type { Copy } from './en';
export const content = {en,de,fr,es};
export const languages = ['en','de','fr','es'] as const;
export type Language = typeof languages[number];
export const serviceSlugs = ['sales-strategy','lead-generation','market-expansion','business-development','business-intelligence'];
export const routes = ['', 'about', 'expertise', ...serviceSlugs.map(s => `expertise/${s}`), 'industries', 'our-approach', 'insights', 'contact', 'privacy-policy'];
export function url(lang: Language, page = '') { return `/${lang}/${page}${page ? '/' : ''}`; }
export function whatsappUrl(message: string) { return `https://wa.me/491722187353?text=${encodeURIComponent(message)}`; }
