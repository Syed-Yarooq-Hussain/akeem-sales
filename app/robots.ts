export const dynamic='force-static';
export default function robots(){return {rules:{userAgent:'*',allow:'/'},sitemap:`${process.env.NEXT_PUBLIC_SITE_URL||'https://blackmeridian-seven.vercel.app'}/sitemap.xml`};}
