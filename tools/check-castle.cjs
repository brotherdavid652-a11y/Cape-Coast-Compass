const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
process.chdir(path.resolve(__dirname,'..'));
const data=JSON.parse(fs.readFileSync('attractions.json'));
for(const id of ['cape-coast-castle-museum','kotokuraba-market']){
 const photos=data.find(p=>p.id===id).photos;
 assert.equal(photos.length,4);
 const elements={};
 for(const key of ['.gallery-image','.gallery-caption','.gallery-credit','.gallery-download','[data-previous]','[data-next]'])elements[key]={addEventListener(type,fn){this[type]=fn}};
 const thumbs=photos.map((p,i)=>({dataset:{photoIndex:String(i)},setAttribute(k,v){this[k]=v},addEventListener(type,fn){this[type]=fn}}));
 const gallery={querySelector:key=>elements[key],querySelectorAll:()=>thumbs,addEventListener(){}};
 vm.runInNewContext(fs.readFileSync('market-gallery.js','utf8'),{document:{querySelector:()=>gallery,body:{dataset:{place:id}}},window:{COMPASS_PLACES:data}});
 assert(elements['.gallery-image'].src.includes(id==='cape-coast-castle-museum'?'castle-3-':'market-1-'));
 for(let i=0;i<4;i++){thumbs[i].click();assert.equal(elements['.gallery-image'].alt,photos[i].caption);assert.equal(thumbs[i]['aria-pressed'],'true');assert.equal(elements['.gallery-download'].href,'../'+photos[i].full);for(const file of [photos[i].src,photos[i].full,...photos[i].srcset.split(', ').map(x=>x.split(' ')[0])])assert(fs.existsSync(file),file)}
 elements['[data-next]'].click();assert.equal(thumbs[0]['aria-pressed'],'true');
 elements['[data-previous]'].click();assert.equal(thumbs[3]['aria-pressed'],'true');
 console.log('PASS: '+id+' cover, 4 images, controls, wrapping and asset references');
}
for(const file of ['index.html','attractions.html'])assert(fs.readFileSync(file,'utf8').includes('cape-coast-castle/castle-3-1600.webp'));
console.log('PASS: Image 3 is the castle cover on homepage and directory');
