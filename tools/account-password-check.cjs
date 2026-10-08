// DOM integration checks with mocked Auth/profile responses; no real emails or accounts.
const {JSDOM,VirtualConsole}=require(process.env.ACCOUNT_TEST_JSDOM||'jsdom');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(root+'/account.js','utf8');
async function run({expired=false,failLoad=false,failSave=false}={}){
 const navigationErrors=[],virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>{if(!e.message.startsWith('Not implemented: navigation'))throw e;navigationErrors.push(e.message)});
 const dom=new JSDOM(fs.readFileSync(root+'/account.html','utf8'),{url:'https://cape-coast-compass.pages.dev/account',runScripts:'outside-only',virtualConsole}),w=dom.window;
 const user={id:'00000000-0000-4000-8000-000000000001',email:'test@example.test'},calls=[],state={};
 const client={auth:{getUser:async()=>({data:{user:expired?null:user},error:null}),signOut:async()=>{state.signedOut=true;return{error:null}},onAuthStateChange:f=>{state.authEvent=f;return{data:{subscription:{unsubscribe(){}}}}}},from:table=>({select:()=>({eq:(field,id)=>({maybeSingle:async()=>{calls.push(['read',table,field,id]);return{data:null,error:failLoad?new Error('Unavailable'):null}}})}),upsert:async(data)=>{calls.push(['save',data]);return{error:failSave?new Error('Failed'):null}}})};
 w.eval(source);await w.CapeCompassAccount(client,user);
 assert.equal(w.document.querySelector('#mfa-gate'),null);assert.equal(w.document.querySelector('#sms-code'),null);
 const fields=w.document.querySelector('#profile-fields'),details=w.document.querySelector('#account-details');
 if(expired){assert(details.hidden);assert(fields.disabled);assert.equal(calls.length,0);assert.equal(navigationErrors.length,1,'Signed-out session requests redirect');dom.window.close();return}
 assert.equal(fields.disabled,failLoad);assert.deepEqual(calls[0],['read','customer_profiles','id',user.id]);
 if(failLoad){assert(w.document.querySelector('#auth-error').textContent.includes('could not be loaded'));dom.window.close();return}
 assert.equal(details.hidden,false);assert.equal(w.document.querySelector('.account-security h3').textContent,'Signed in');
 const form=w.document.querySelector('#profile-form');for(const [key,value]of Object.entries({dob_year:'1996',dob_month:'2',dob_day:'12',phone:'+233200000000',gender:'prefer_not_to_say',country:'GH'})){form.elements[key].value=value;form.elements[key].dispatchEvent(new w.Event('change'))}
 form.dispatchEvent(new w.Event('submit',{cancelable:true}));await new Promise(r=>setTimeout(r,0));
 const saved=calls.find(x=>x[0]==='save')[1];assert.equal(saved.id,user.id);assert.equal(saved.date_of_birth,'1996-02-12');assert.equal(saved.address,null);
 assert.equal(w.document.querySelector('#profile-status').textContent,failSave?'':'Your details have been saved.');
 state.authEvent('SIGNED_OUT');assert(details.hidden);assert(fields.disabled);assert.equal(form.elements.phone.value,'');dom.window.close();
}
(async()=>{assert(!/auth\.mfa|aal2|mfa-gate|CapeCompassSmsMfa/.test(source));for(const options of [{},{expired:true},{failLoad:true},{failSave:true}])await run(options);console.log('PASS: no MFA gate; signed-in owner profile load/save; optional address; expired-session fail closed; read/write failures; signed-out profile clearing. Mocked DOM, not live email/login verification.');})().catch(e=>{console.error(e);process.exit(1)});
