const fs=require('fs'),path=require('path');process.chdir(path.resolve(__dirname,'..'));const files=['index.html','attractions.html','payment.html','partners.html','plan.html',...fs.readdirSync('places').map(x=>'places/'+x)];let links=0;for(const file of files){const text=fs.readFileSync(file,'utf8');for(const match of text.matchAll(/(?:href|src)="([^"]+)"/g)){const target=match[1];if(target.startsWith('#')||target.includes('://'))continue;const resolved=path.resolve(path.dirname(file),target.split('#')[0]);if(!fs.existsSync(resolved))throw Error(`Broken link ${file}: ${target}`);links++}if(text.includes("'''")||text.includes('+planner'))throw Error('Generator artifact '+file)}const data=JSON.parse(fs.readFileSync('attractions.json'));if(data.filter(x=>!x.nearby).length!==22||data.filter(x=>x.nearby).length!==10)throw Error('Directory count');console.log(`Passed: ${files.length} pages, ${links} internal references, 22 city and 10 nearby records`);fs.mkdirSync('dist',{recursive:true});for(const file of [...files,'style.css','trip.js','pickup-location.js','galleries.js','market-gallery.js','attractions.json']){fs.mkdirSync(path.dirname('dist/'+file),{recursive:true});fs.copyFileSync(file,'dist/'+file)}console.log('Static publication files copied to dist/');

// Link publication assets on this volume to avoid duplicating large downloads.
function packageAssets(source,target){
 if(fs.statSync(source).isDirectory()){fs.mkdirSync(target,{recursive:true});for(const item of fs.readdirSync(source))packageAssets(path.join(source,item),path.join(target,item));return;}
 if(/-original\.jpg$|-refined\.png$/.test(source))return;
 if(fs.existsSync(target))fs.unlinkSync(target);
 fs.linkSync(source,target);
}
if(fs.existsSync('assets'))packageAssets('assets','dist/assets');
