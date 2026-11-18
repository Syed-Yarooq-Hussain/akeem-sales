const fs=require('fs');
let s=fs.readFileSync('components/ModernSite.tsx','utf8');
s=s.replace(/<h2>\{t\("Let\\u2019s put your next"\)\}.*?<\/h2>/,'<h2>{t("Let’s put your next move into action.")}</h2>');
s=s.replace(/<h2>\{t\("What does your"\)\}.*?<\/h2>/,'<h2>{t("What does your business need next?")}</h2>');
s=s.replace(/<h1>\{t\("Support that starts"\)\}.*?<\/h1>/,'<h1>{t("Support that starts with your business.")}</h1>');
s=s.replace('<br className="desktop-break"/>','<br className="desktop-break"/>{" "}');
fs.writeFileSync('components/ModernSite.tsx',s);
const path='lib/locales/source.json';const source=JSON.parse(fs.readFileSync(path,'utf8'));for(const x of ['Let’s put your next move into action.','What does your business need next?','Support that starts with your business.'])if(!source.includes(x))source.push(x);fs.writeFileSync(path,JSON.stringify(source,null,2)+'\n');
const de=JSON.parse(fs.readFileSync('lib/locales/de.json','utf8'));Object.assign(de,{
 'Let’s put your next move into action.':'Setzen wir Ihren nächsten Schritt gemeinsam um.',
 'What does your business need next?':'Was braucht Ihr Unternehmen als Nächstes?',
 'Support that starts with your business.':'Unterstützung, die bei Ihrem Unternehmen ansetzt.',
 'Commercial ambition.':'Unternehmerische Ziele.',
 'Practical execution.':'Konsequente Umsetzung.',
 'Six connected capabilities.':'Sechs vernetzte Leistungsbereiche.',
 'FROM AMBITION TO ACTION':'VON ZIELEN ZU ERGEBNISSEN',
 'TALENT MANAGEMENT &amp; BRAND PARTNERSHIPS':'TALENTMANAGEMENT & MARKENPARTNERSCHAFTEN',
 'Specialist delivery for a specific task, campaign or project.':'Fachkundige Umsetzung für eine konkrete Aufgabe, Kampagne oder ein Projekt.',
 'Talent positioning, brand collaborations and campaign coordination.':'Talentpositionierung, Markenkooperationen und Kampagnenkoordination.',
 'From your brief.':'Von Ihrer Aufgabenstellung.',
 'To work in motion.':'Zur konkreten Umsetzung.',
 'Understand':'Verstehen','Scope':'Umfang festlegen','Deliver':'Umsetzen','Review':'Auswerten',
 'Stand out.':'Heben Sie sich ab.','Connect.':'Knüpfen Sie Kontakte.','Make your mark.':'Setzen Sie ein Zeichen.',
 'We don’t stop':'Wir bleiben nicht','at':'bei der','strategy.':'Strategie stehen.',
 'Request a Consultation':'Beratung anfragen','Explore Our Services':'Leistungen entdecken',
 'People. Ideas. Forward motion.':'Menschen. Ideen. Fortschritt.'
});fs.writeFileSync('lib/locales/de.json',JSON.stringify(de,null,2)+'\n');
for(const lang of ['de','tr','pl','ro','sq','es','fr','el','uk','bg','it']){
 const d=JSON.parse(fs.readFileSync(`lib/locales/${lang}.json`,'utf8'));
 console.log(lang, Object.keys(d).filter(k=>k===d[k]&&k.length>35&&k.split(' ').length>4&&!k.startsWith('/')&&!k.startsWith('(')));
}
