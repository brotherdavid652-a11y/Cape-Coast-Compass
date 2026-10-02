const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'places')).filter(f=>f.endsWith('.html')).map(f=>'places/'+f)];
for(const file of files){
 if(file==='plan.html')continue;
 const prefix=file.startsWith('places/')?'../':file==='404.html'?'/':'';
 const mark=`<img class="brand-mark" src="${prefix}assets/brand/compass-mark.svg" width="48" height="48" alt="" decoding="async">`;
 let html=fs.readFileSync(path.join(root,file),'utf8');
 html=html.replace(/<span class="brand-mark"[^>]*>.*?<\/span>/g,mark);
 html=html.replace(/(<footer><a class="brand" href="[^"]+">)Cape Coast Compass(<\/a>)/,`$1${mark}<span>Cape Coast<strong>Compass</strong></span>$2`);
 fs.writeFileSync(path.join(root,file),html);
}
fs.copyFileSync(path.join(root,'assets/brand/compass-mark.svg'),path.join(root,'favicon.svg'));
const css='\n/* Custom coastal compass identity */\n.brand .brand-mark{display:block;width:48px;height:48px;flex:0 0 48px}.brand>span:not(.brand-mark){font-family:Georgia,\'Times New Roman\',serif;font-size:21px;letter-spacing:-.035em;line-height:1.15}.brand strong{font-family:\'Avenir Next\',Avenir,\'Segoe UI\',sans-serif;font-size:11px;font-weight:600;letter-spacing:.22em;line-height:1.5;text-transform:uppercase;margin-top:4px}.brand{gap:12px}footer .brand{width:fit-content}@media(max-width:767px){.brand .brand-mark{width:42px;height:42px;flex-basis:42px}.brand>span:not(.brand-mark){font-size:19px}.brand strong{font-size:10px;letter-spacing:.2em}}\n';
const style=path.join(root,'style.css');if(!fs.readFileSync(style,'utf8').includes('/* Custom coastal compass identity */'))fs.appendFileSync(style,css);
console.log('Custom emblem and wordmark applied to '+(files.length-1)+' pages');
