import {getStore} from '@netlify/blobs';
const reply=(status,data)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export function validate(data){
 const errors=[];
 if(typeof data.name!=='string'||data.name.trim().length<2||data.name.length>200)errors.push('name');
 if(typeof data.email!=='string'||data.email.length>200||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))errors.push('email');
 if(typeof data.phone!=='string'||data.phone.length>200||data.phone.replace(/\D/g,'').length<10)errors.push('phone');
 if(typeof data.postcode!=='string'||data.postcode.length>12||!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(data.postcode.trim()))errors.push('postcode');
 const types=['Brickwork & Masonry','Extensions & Building Work','Property Renovations','Landscaping & Garden Construction','Driveways & Exterior Improvements','Other building enquiry'];
 if(!types.includes(data.type))errors.push('type');
 if(typeof data.description!=='string'||data.description.trim().length<20||data.description.length>5000)errors.push('description');
 for(const k of ['budget','timeframe'])if(data[k]!==undefined&&(typeof data[k]!=='string'||data[k].length>200))errors.push(k);
 if(data.privacy!==true)errors.push('privacy');
 if(typeof data.requestId!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId))errors.push('requestId');
 return errors;
}
export default async function handler(request){
 const enabled=process.env.ENQUIRIES_ENABLED==='true'&&!!process.env.TURNSTILE_SECRET_KEY&&!!process.env.SITE_ORIGIN;
 if(request.method==='GET')return reply(200,{enabled});
 if(request.method!=='POST')return reply(405,{message:'Method not supported.'});
 if(!enabled)return reply(503,{message:'Online enquiries are disabled in this demonstration. Nothing has been stored.'});
 if(request.headers.get('origin')!==process.env.SITE_ORIGIN)return reply(403,{message:'Origin not permitted.'});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,{message:'Send a JSON enquiry.'});
 if(Number(request.headers.get('content-length'))>20000)return reply(413,{message:'Enquiry is too large.'});
 let data;
 try{const raw=await request.text();if(raw.length>20000)return reply(413,{message:'Enquiry is too large.'});data=JSON.parse(raw);if(!data||typeof data!=='object'||Array.isArray(data))throw new Error();}catch{return reply(400,{message:'Invalid enquiry format.'});}
 if(data.website)return reply(400,{message:'The enquiry could not be accepted.'});
 const errors=validate(data);if(errors.length)return reply(422,{message:'Check the required enquiry details.',fields:errors});
 if(typeof data.token!=='string'||data.token.length>2048||!data.token)return reply(422,{message:'Complete the spam-protection check.'});
 try{
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:data.token}),signal:AbortSignal.timeout(8000)});
  if(!verification.ok)return reply(503,{message:'Spam protection is unavailable. Please retry.'});
  const verified=await verification.json();
  if(verified.success!==true||verified.hostname!==new URL(process.env.SITE_ORIGIN).hostname)return reply(422,{message:'Spam verification failed. Please complete the check again.'});
  const store=getStore({name:'woodhall-private-enquiries',consistency:'strong'});
  const recordKey='enquiry/'+data.requestId;
  const existing=await store.get(recordKey,{type:'json'});
  if(existing)return reply(200,{stored:true,reference:existing.reference});
  const reference='WH-'+data.requestId;
  const record={reference,createdAt:new Date().toISOString(),name:data.name.trim(),email:data.email.trim(),phone:data.phone.trim(),postcode:data.postcode.trim().toUpperCase(),type:data.type,description:data.description.trim(),timeframe:data.timeframe?.trim()||'',budget:data.budget?.trim()||'',privacyAcknowledged:true};
  // UUID key makes retries idempotent; no public read endpoint or notification integration.
  await store.setJSON(recordKey,record);
  return reply(201,{stored:true,reference});
 }catch{return reply(503,{message:'Enquiry storage is unavailable. No successful submission can be confirmed.'});}
}
