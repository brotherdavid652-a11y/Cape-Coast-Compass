const fs=require('fs'),path=require('path'),sharp=require('/private/tmp/two-brothers-release-tools/node_modules/sharp');
process.chdir(path.resolve(__dirname,'..'));
const input=process.argv[2],id='osabarimba-asafo-art-gallery',dir='assets/photos/'+id;
(async()=>{
 fs.mkdirSync(dir,{recursive:true});fs.copyFileSync('/Users/macbook/Desktop/IMG_0628.WEBP',dir+'/gallery-original.webp');
 await sharp(input).jpeg({quality:95}).toFile(dir+'/gallery-refined.jpg');
 const meta=await sharp(input).metadata();
 for(const width of [480,960,1600])await sharp(input).resize({width}).webp({quality:85}).toFile(`${dir}/gallery-${width}.webp`);
 await sharp(input).resize({width:7680}).jpeg({quality:85}).toFile(dir+'/gallery-8k.jpg');
 const p={id:'asafo-gallery-interior',src:dir+'/gallery-1600.webp',srcset:[480,960,1600].map(w=>`${dir}/gallery-${w}.webp ${w}w`).join(', '),full:dir+'/gallery-8k.jpg',width:1600,height:Math.round(meta.height*1600/meta.width),caption:'Two interior views of Osabarimba Asafo Art Gallery showing Asafo flags and sculptures.',credit:'Supplied by the site owner; original photographer not verified',source:'IMG_0628.WEBP',changes:'Color and brightness refined using built-in imagegen. Original montage layout and caption retained. Download upscaled to a 7680-pixel long edge, not native 8K detail.'};
 const data=JSON.parse(fs.readFileSync('attractions.json'));data.find(x=>x.id===id).photos=[p];fs.writeFileSync('attractions.json',JSON.stringify(data,null,2));fs.writeFileSync('galleries.js','window.COMPASS_PLACES = '+JSON.stringify(data)+';');
 fs.writeFileSync(dir+'/edit-notes.json',JSON.stringify({tool:'Built-in imagegen',prompt:'Only natural color and brightness adjustments with consistent neutral balance across both panels. Preserve artwork, objects, montage layout and original bottom caption exactly.',photo:p},null,2));
 const img=prefix=>`<img src="${prefix+p.src}" srcset="${p.srcset.split(', ').map(x=>prefix+x).join(', ')}" sizes="(max-width:767px) 100vw, 50vw" width="${p.width}" height="${p.height}" alt="${p.caption}" loading="lazy" decoding="async">`;
 let text=fs.readFileSync('attractions.html','utf8');text=text.replace(/<a class="photo-placeholder" href="places\/osabarimba-asafo-art-gallery.html"[^>]*>[\s\S]*?<\/a>/,`<a class="photo-link" href="places/${id}.html" aria-label="Explore Osabarimba Asafo Art Gallery">${img('')}</a>`);fs.writeFileSync('attractions.html',text);
 const file=`places/${id}.html`;text=fs.readFileSync(file,'utf8');text=text.replace(/<div class="photo-placeholder large">[\s\S]*?<\/div>/,`<figure class="place-photograph asafo-photograph">${img('../')}<figcaption>${p.caption}<span class="photo-credit">Photo supplied by the site owner. Color and brightness refined with AI; original artwork and caption retained.</span></figcaption><a class="text-link" href="../${p.full}" download>Download 8K upscaled photo ↗</a></figure>`);fs.writeFileSync(file,text);
 console.log('Added refined Asafo Art Gallery photo and 8K upscaled download.');
})();
