const fs=require('fs'),path=require('path'),sharp=require('/private/tmp/two-brothers-release-tools/node_modules/sharp');
process.chdir(path.resolve(__dirname,'..'));
const dir='assets/photos/fosu-lagoon',originals=['IMG_0623.jpg','IMG_0624.JPG'];
const captions=['Fosu Lagoon shoreline framed by palm leaves.','Palm trees and a canoe beside Fosu Lagoon.'];
(async()=>{
 const photos=[];
 for(let i=0;i<2;i++){
  const name='lagoon-'+(i+1),input=`${dir}/${name}-refined.png`,meta=await sharp(input).metadata();
  fs.copyFileSync('/Users/macbook/Desktop/'+originals[i],`${dir}/${name}-original.jpg`);
  for(const width of [480,960,1600])await sharp(input).resize({width}).webp({quality:85}).toFile(`${dir}/${name}-${width}.webp`);
  await sharp(input).resize(meta.width>=meta.height?{width:7680}:{height:7680}).jpeg({quality:85}).toFile(`${dir}/${name}-8k.jpg`);
  photos.push({id:name,src:`${dir}/${name}-1600.webp`,srcset:[480,960,1600].map(w=>`${dir}/${name}-${w}.webp ${w}w`).join(', '),full:`${dir}/${name}-8k.jpg`,width:1600,height:Math.round(meta.height*1600/meta.width),caption:captions[i],credit:'Supplied by the site owner; original photographer not verified',source:originals[i],changes:'Color and brightness refined with built-in imagegen. Existing writing retained. Download upscaled to a 7680-pixel long edge, not native 8K detail.'});
 }
 const data=JSON.parse(fs.readFileSync('attractions.json'));data.find(p=>p.id==='fosu-lagoon').photos=photos;
 fs.writeFileSync('attractions.json',JSON.stringify(data,null,2));fs.writeFileSync('galleries.js','window.COMPASS_PLACES = '+JSON.stringify(data)+';');
 fs.writeFileSync(`${dir}/edit-notes.json`,JSON.stringify({tool:'Built-in imagegen',prompt:'Only modest natural color and brightness adjustments. Preserve composition, actual weather, natural water color, objects and existing writing.',photos},null,2));
 const img=(p,prefix='',thumb=false)=>`<img src="${prefix+(thumb?p.src.replace('1600','480'):p.src)}" ${thumb?'':`srcset="${p.srcset.split(', ').map(x=>prefix+x).join(', ')}" sizes="(max-width:767px) 100vw, 50vw"`} width="${p.width}" height="${p.height}" alt="${p.caption}" loading="lazy" decoding="async">`;
 for(const file of ['index.html','attractions.html']){
  let text=fs.readFileSync(file,'utf8');text=text.replace(/(<a class="photo-link" href="places\/fosu-lagoon.html"[^>]*>)[\s\S]*?(<\/a>)/,`$1${img(photos[0])}$2`);
  text=text.replace(/<p class="photo-credit"><a href="https:\/\/commons.wikimedia.org\/wiki\/File:Fosu_Lagoon\(Aerial_view\).jpg"[\s\S]*?<\/p>/,'<p class="photo-credit">Photo supplied by the site owner; color and brightness refined.</p>');fs.writeFileSync(file,text);
 }
 const file='places/fosu-lagoon.html',p=photos[0];let text=fs.readFileSync(file,'utf8');
 text=text.replace('<script defer src="../trip.js"></script>','<script defer src="../trip.js"></script><script defer src="../market-gallery.js"></script>');
 text=text.replace(/<figure class="place-photograph">[\s\S]*?<\/figure>/,`<section class="market-gallery lagoon-gallery" data-photo-gallery aria-label="Fosu Lagoon photo gallery"><div class="gallery-stage"><img class="gallery-image" src="../${p.src}" width="${p.width}" height="${p.height}" alt="${p.caption}"></div><div class="gallery-navigation"><button type="button" data-previous aria-label="Previous photo">← Previous</button><button type="button" data-next aria-label="Next photo">Next →</button></div><div class="gallery-thumbnails">${photos.map((p,i)=>`<button type="button" data-photo-index="${i}" aria-label="View photo: ${p.caption}" aria-pressed="${i===0}">${img(p,'../',true)}</button>`).join('')}</div><p class="gallery-caption" aria-live="polite">${p.caption}</p><p class="gallery-credit"></p><a class="text-link gallery-download" href="../${p.full}" download>Download 8K upscaled photo ↗</a></section>`);
 fs.writeFileSync(file,text);console.log('Installed both Fosu Lagoon photos, gallery, homepage and directory cover.');
})();
