(()=>{
'use strict';

/* DAILY ROUTINE 2.0
   Adds real-clock life rhythm on top of Realistic Needs 1.0.
   No rooms, Kitchen, driving, fishing, wardrobe or save systems are replaced.
   Humans get time-aware meal/rest prompts; Dudu and Bubu get species-flavoured ambient routines.
   This layer never teleports characters and never forces sleep/eating. */

const $=(s,r=document)=>r.querySelector(s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const today=()=>new Date().toISOString().slice(0,10);
let lastPetAmbient=0;

function S(){try{return typeof state!=='undefined'?state:null}catch(_){return null}}
function gameVisible(){const g=$('#gameScreen');return !!g&&!g.classList.contains('hidden')}
function hour(){return new Date().getHours()}
function mins(){return new Date().getMinutes()}
function nowMinutes(){return hour()*60+mins()}
function inRange(start,end){const m=nowMinutes();return start<=end?(m>=start&&m<end):(m>=start||m<end)}
function displayName(id){return id==='elyn'?'Elyn':id==='shawn'?'Shawn':id==='dudu'?'Dudu':'Bubu'}
function saySafe(name,text){try{if(typeof say==='function')say(name,text)}catch(_){} }
function toastSafe(text){try{if(typeof toast==='function')toast(text)}catch(_){} }
function saveSafe(){try{if(typeof save==='function')save()}catch(_){} }

function ensureRoutineState(){
 const s=S();if(!s)return null;
 s.dailyRoutine2=s.dailyRoutine2||{date:'',done:{}};
 if(s.dailyRoutine2.date!==today())s.dailyRoutine2={date:today(),done:{}};
 s.dailyRoutine2.done=s.dailyRoutine2.done||{};
 return s.dailyRoutine2;
}

function phase(){
 const h=hour();
 if(h>=5&&h<10)return {key:'morning',icon:'🌅',label:'早晨',hint:'起床 · 早餐 · 洗漱'};
 if(h>=10&&h<14)return {key:'midday',icon:'☀️',label:'中午',hint:'学习 / 工作 · 午餐'};
 if(h>=14&&h<18)return {key:'afternoon',icon:'🌤️',label:'下午',hint:'活动 · 小休'};
 if(h>=18&&h<22)return {key:'evening',icon:'🌇',label:'晚上',hint:'晚餐 · 相处时间'};
 return {key:'night',icon:'🌙',label:'夜晚',hint:'放松 · 洗漱 · 睡眠'};
}

function ensureClockBadge(){
 const box=$('.datebox');if(!box||$('#routine2Clock',box))return;
 const el=document.createElement('small');
 el.id='routine2Clock';
 el.style.cssText='display:block;margin-top:3px;font-size:10px;font-weight:800;opacity:.72;white-space:nowrap';
 box.appendChild(el);
}
function renderClockBadge(){
 ensureClockBadge();
 const el=$('#routine2Clock');if(!el)return;
 const p=phase();el.textContent=`${p.icon} ${p.label} · ${p.hint}`;
}

function once(key,fn){
 const r=ensureRoutineState();if(!r||r.done[key])return;
 r.done[key]=Date.now();fn();saveSafe();
}

function humanRoutine(){
 const s=S();if(!s?.needs)return;
 const id=(s.active==='elyn'||s.active==='shawn')?s.active:'elyn';
 const n=s.needs[id];if(!n)return;
 const name=displayName(id);

 // Breakfast 07:00–10:00: only prompt if they are actually becoming hungry.
 if(inRange(7*60,10*60)&&n.hunger>=45){
   once('breakfast',()=>saySafe(name,'早上啦～有点饿了，等下可以吃早餐 ♡'));
 }
 // Lunch 11:30–14:30.
 if(inRange(11*60+30,14*60+30)&&n.hunger>=55){
   once('lunch',()=>saySafe(name,'差不多午餐时间了，要不要去厨房看看？'));
 }
 // Dinner 18:00–20:30.
 if(inRange(18*60,20*60+30)&&n.hunger>=55){
   once('dinner',()=>saySafe(name,'到晚餐时间啦 ♡ 今天想吃什么？'));
 }
 // Wind-down is gentle; no forced bedtime.
 if(inRange(21*60,23*60+30)&&n.sleepiness>=55){
   once('winddown',()=>saySafe(name,'开始有一点累了，今晚可以早点洗漱休息。'));
 }
 if(inRange(23*60+30,6*60)&&n.sleepiness>=68){
   once('bedtime',()=>saySafe(name,'真的有点困了…想回卧室睡觉 😴'));
 }
}

function petAmbient(){
 const s=S();if(!s?.needs||Date.now()-lastPetAmbient<4*60*1000)return;
 const d=s.needs.dudu,b=s.needs.bubu;if(!d||!b)return;
 let acted=false;
 try{
   // Dudu: more active around morning/evening; settles at night.
   if(inRange(22*60,7*60)&&(d.sleepiness>=45||Math.random()<.55)){
     if(typeof petAction==='function')petAction('dudu','sleep',7200);
     acted=true;
   }else if((inRange(7*60,9*60)||inRange(17*60+30,20*60))&&d.mood<88&&Math.random()<.35){
     if(typeof petAction==='function')petAction('dudu','happy',2600);
     once('duduWalkHint',()=>toastSafe('🐶 Dudu 好像想出去走走'));
     acted=true;
   }

   // Bubu: cats nap often during late morning/afternoon and can be livelier at night.
   if(!acted&&inRange(10*60,17*60)&&(b.sleepiness>=42||Math.random()<.60)){
     if(typeof petAction==='function')petAction('bubu','sleep',7600);
     acted=true;
   }else if(!acted&&inRange(20*60,23*60)&&b.mood>65&&b.sleepiness<72&&Math.random()<.35){
     if(typeof petAction==='function')petAction('bubu','happy',2800);
     acted=true;
   }
 }catch(_){ }
 if(acted)lastPetAmbient=Date.now();
}

function routinePulse(){
 if(!gameVisible())return;
 renderClockBadge();
 humanRoutine();
 petAmbient();
}

function boot(){
 ensureRoutineState();renderClockBadge();routinePulse();
 clearInterval(window.__dailyRoutine2Timer);
 window.__dailyRoutine2Timer=setInterval(routinePulse,60*1000);
 window.DAILY_ROUTINE_2={version:'2.0',phase,run:routinePulse};
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
