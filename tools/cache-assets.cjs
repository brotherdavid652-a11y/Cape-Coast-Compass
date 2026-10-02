// Content versions keep returning visitors on the current styles and scripts.
const fs=require('fs'),path=require('path'),crypto=require('crypto');const root=path.resolve(__dirname,'..');
const pages=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'places')).filter(f=>f.endsWith('.html')).map(f=>'places/'+f)];
for(const page of pages){const file=path.join(root,page);const html=fs.readFileSync(file,'utf8').replace(/\b(href|src)="([^"?#]+\.(?:css|js))(?:\?[^"#]*)?"/g,(match,attribute,url)=>{if(/^(https?:|\/\/)/.test(url))return match;const asset=path.resolve(path.dirname(file),url);if(!asset.startsWith(root+path.sep)||!fs.existsSync(asset))return match;const version=crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex').slice(0,12);return `${attribute}="${url}?v=${version}"`});fs.writeFileSync(file,html)}
console.log('Stylesheet and script URLs versioned by content');
