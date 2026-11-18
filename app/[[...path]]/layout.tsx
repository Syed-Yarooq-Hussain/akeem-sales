import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';
import '../globals.css';
import '../modern.css';
import {localeFromPath} from '@/lib/i18n';
import '../languages.css';
export default async function RootLayout({children,params}:{children:React.ReactNode;params:Promise<{path?:string[]}>}){const lang=localeFromPath((await params).path);return <html lang={lang}><body>{children}</body></html>}
