import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '../globals.css';
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{path?:string[]}> }) { const {path=[]}=await params; const lang=['en','de','fr','es'].includes(path[0])?path[0]:'en'; return <html lang={lang}><body>{children}</body></html>; }

