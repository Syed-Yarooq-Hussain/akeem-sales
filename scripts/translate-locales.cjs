const fs=require('fs');
const {execFile}=require('child_process');
const {promisify}=require('util');
const run=promisify(execFile);
const source=JSON.parse(fs.readFileSync('lib/locales/source.json','utf8'));
const locales=['de','tr','pl','ro','sq','es','fr','el','uk','bg','it'];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function request(text,lang){
 for(let attempt=0;attempt<5;attempt++){
  try{const url='https://translate.googleapis.com/translate_a/single?'+new URLSearchParams({client:'gtx',sl:'en',tl:lang,dt:'t',q:text});
   const command=`[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new(); $ErrorActionPreference='Stop'; $r=Invoke-RestMethod -TimeoutSec 30 -Uri '${url}'; ConvertTo-Json -InputObject $r -Depth 12 -Compress`;
   const {stdout}=await run('powershell.exe',['-NoProfile','-NonInteractive','-Command',command],{encoding:'utf8',maxBuffer:1024*1024,windowsHide:true});
   const parsed=JSON.parse(stdout.replace(/^\uFEFF/,''));const data=parsed.value||parsed;return data[0].map(x=>x[0]||'').join('');
  }catch(e){if(attempt===4)throw e;await pause(1500*(attempt+1));}
 }
}
async function translate(lang){
 const path=`lib/locales/${lang}.json`;const dict=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):{};
 const needsRepair=s=>s.length>35&&s.split(' ').length>4&&!s.startsWith('/')&&!s.startsWith('(')&&!/^M\d/.test(s)&&dict[s]===s;
 const missing=source.filter(s=>!dict[s]||needsRepair(s));let batches=[],batch=[],length=0;
 for(const s of missing){if(length+s.length>1200&&batch.length){batches.push(batch);batch=[];length=0}batch.push(s);length+=s.length+1}if(batch.length)batches.push(batch);
 for(const group of batches){
  const translated=(await request(group.join('\r\n'),lang)).split(/\r?\n/);
  if(translated.length===group.length){group.forEach((s,i)=>dict[s]=translated[i].trim())}
  else for(const s of group)dict[s]=await request(s,lang);
  for(const s of group)if(needsRepair(s))dict[s]=await request(s,lang);
  fs.writeFileSync(path,JSON.stringify(dict,null,2)+'\n');await pause(120);
 }
 console.log(`${lang}: ${Object.keys(dict).length}/${source.length} translated`);
}
(async()=>{for(let i=0;i<locales.length;i+=2)await Promise.all(locales.slice(i,i+2).map(translate))})().catch(e=>{console.error(e);process.exit(1)});
