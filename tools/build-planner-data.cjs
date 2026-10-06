// Derive trip options from the existing directory; keep local service scope explicit.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const existing=JSON.parse(fs.readFileSync(path.join(root,'attractions.json'))),data=JSON.parse(fs.readFileSync(path.join(root,'regions-data.json')));
const records=new Map([...existing,...data.newSites].map(p=>[p.id,p])),options=new Map();
for(const region of data.regions)for(const town of region.towns)for(const site of town.sites){
  if(options.has(site.id))continue;
  const p=records.get(site.id);if(!p)throw Error('Unknown place '+site.id);
  options.set(p.id,{id:p.id,slug:p.slug||p.id,name:p.name,access:p.access||'Confirm current visitor access before planning a visit.',region:region.name,town:town.name,localServiceSupported:existing.some(e=>e.id===p.id&&!e.nearby)});
}
fs.writeFileSync(path.join(root,'planner-data.js'),'window.COMPASS_TRIP_PLACES='+JSON.stringify([...options.values()])+';window.COMPASS_PLACES=window.COMPASS_PLACES||window.COMPASS_TRIP_PLACES;\n');
console.log('Derived '+options.size+' nationwide trip options from the existing directory');
