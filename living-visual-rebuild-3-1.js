(()=>{
'use strict';

/* Living Visual Rebuild 3.1
   Additive runtime polish for living-visual-rebuild-3.
   Fixes the sofa interaction so the actor physically approaches and settles instead of teleporting,
   adds short dedicated interaction motion for pets / conversation / TV, and injects cinematic ambience.
   app.js and all protected gameplay systems remain untouched. */

const $=(s,r=document)=>r.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let root=null,world=null,busy=false,seated=null;

const P={
 sofa:{id:'sofa',x:69,y:53,r:11,action:'sit'},
 tv:{id:'tv',x:24,y:46,r:10,action:'tv'},
 shawnChat:{id:'shawnChat',x:73,y:48,r:10,action:'talk'},
 dudu:{id:'dudu',x:78,y:79,r:10,action:'dudu'},
 bubu:{id:'bubu',x:28,y:63,r:10,action:'bubu'}
};

function S(){try{return typeof state!=='undefined'?state:null}catch(_){return null}}
function V(){const s=S();return s?.visualLiving3||null}
function active(){return S()?.active||'elyn'}
function pos(id){return V()?.positions?.[id]||[50,75]}
function actor(id){return root?.querySelector(`[data-v3-actor="${id}"]`)||null}
function img(id){return actor(id)?.querySelector('img')||null}
function saveNow(){try{if(typeof save==='function')save()}catch(_){} }
function toastNow(text){try{if(typeof toast==='function')toast(text)}catch(_){console.log(text)} }
function sayNow(name,text){try{if(typeof say==='function')say(name,text)}catch(_){} }
function setLogicalPos(id,p){const s=S(),v=V();if(!s||!v)return;v.positions=v.positions||{};v.positions[id]=[p[0],p[1]];if(id==='elyn'||id==='shawn'){s.positions=s.positions||{};s.positions.living=s.positions.living||{};s.positions.living[id]=[p[0],p[1]]}}

function installAmbience(){
 if(!world||$('#v371Cinematic',world))return;
 const cinematic=document.createElement('div');
 cinematic.id='v371Cinematic';
 const dust=Array.from({length:13},(_,i)=>`<i class="v371-dust" style="--x:${52+(i*17)%45}%;--y:${18+(i*29)%58}%;--delay:${(-i*.57).toFixed(2)}s"></i>`).join('');
 cinematic.innerHTML=`<div class="v371-window-bloom"></div><div class="v371-ray"></div><div class="v371-floor-warmth"></div>${dust}`;
 world.appendChild(cinematic);
 const fx=document.createElement('div');fx.id='v371FxLayer';world.appendChild(fx);
}

function fx(x,y,symbol='♡',count=3){
 const layer=$('#v371FxLayer',world);if(!layer)return;
 for(let i=0;i<count;i++){
  const n=document.createElement('span');n.className='v371-fx';n.textContent=symbol;
  n.style.left=(x+(i-(count-1)/2)*2.1)+'%';n.style.top=(y-i*1.2)+'%';n.style.animationDelay=(i*.09)+'s';
  layer.appendChild(n);setTimeout(()=>n.remove(),1450);
 }
}

function dispatchMove(x,y){
 if(!world)return;
 standUp(false);
 const r=world.getBoundingClientRect();
 const ev=new MouseEvent('click',{bubbles:true,cancelable:true,clientX:r.left+r.width*x/100,clientY:r.top+r.height*y/100,view:window});
 world.dispatchEvent(ev);
}
function near(a,b,d=1.6){return Math.hypot(a[0]-b[0],a[1]-b[1])<=d}
async function walkTo(target,maxMs=2400){
 const id=active();
 dispatchMove(target[0],target[1]);
 const start=performance.now();
 while(performance.now()-start<maxMs){if(near(pos(id),target,1.9))return true;await sleep(55)}
 return near(pos(id),target,2.8);
}

function setVisualTop(id,x,y){const el=actor(id);if(!el)return;el.style.left=x+'%';el.style.top=y+'%'}
function standUp(saveIt=true){
 if(!seated)return;
 const {id,logical}=seated,el=actor(id),im=img(id);seated=null;
 if(el){el.classList.remove('v371-seated','v371-sit-prep','v371-action');setVisualTop(id,logical[0],logical[1])}
 if(im)im.src=`./assets/sprites/${id}-idle.png`;
 const v=V();if(v&&id==='shawn')v.shawnSitting=false;
 if(saveIt)saveNow();
}

async function sitSequence(){
 const id=active();
 const logical=id==='elyn'?[64,61.5]:[72,61.5];
 const visual=id==='elyn'?[64,55.9]:[72,55.9];
 await walkTo(logical);
 const el=actor(id),im=img(id);if(!el||!im)return;
 el.classList.add('v371-action','v371-sit-prep');
 await sleep(180);
 setLogicalPos(id,logical);
 setVisualTop(id,visual[0],visual[1]);
 await sleep(420);
 im.src=`./assets/sprites/${id}-sit.png`;
 el.classList.remove('v371-sit-prep');el.classList.add('v371-seated');
 const v=V();if(v&&id==='shawn')v.shawnSitting=true;
 seated={id,logical};
 sayNow(id==='elyn'?'Elyn':'Shawn','慢慢坐到沙发上休息 ♡');
 toastNow('坐下 ♡');fx(visual[0],visual[1]-8,'♡',2);saveNow();
}

async function petSequence(pet){
 const id=active();
 const target=pet==='dudu'?[80,86]:[31,72];
 await walkTo(target);
 const el=actor(id),petEl=actor(pet);if(!el||!petEl)return;
 el.classList.add('v371-petting');petEl.classList.add('v371-pet-happy');
 const pp=pos(pet);fx(pp[0],pp[1]-8,'♡',3);
 try{if(typeof adjustNeeds==='function')adjustNeeds(pet,{mood:+8})}catch(_){}
 toastNow(pet==='dudu'?'蹲下来摸摸 Dudu 🐶':'蹲下来摸摸 Bubu 🐱');
 await sleep(1450);el.classList.remove('v371-petting');petEl.classList.remove('v371-pet-happy');saveNow();
}

async function talkSequence(){
 const id=active(),other=id==='elyn'?'shawn':'elyn';
 const target=id==='elyn'?[64,62.5]:[68,64];
 await walkTo(target);
 const a=actor(id),b=actor(other);a?.classList.add('v371-talking');b?.classList.add('v371-talking');
 const op=pos(other);fx(op[0],op[1]-11,'♡',3);
 try{if(typeof recordEvent==='function')recordEvent('coupleTalk',1)}catch(_){}
 sayNow(id==='elyn'?'Elyn':'Shawn','靠近一点聊聊天 ♡');toastNow('两个人面对面聊聊天 ♡');
 await sleep(1350);a?.classList.remove('v371-talking');b?.classList.remove('v371-talking');saveNow();
}

async function tvSequence(){
 await sitSequence();
 const id=active(),el=actor(id);el?.classList.add('v371-watching');
 try{if(typeof interact==='function')interact('tv')}catch(_){toastNow('一起看电视 ♡')}
 await sleep(1250);el?.classList.remove('v371-watching');
}

async function runAction(key){
 if(busy)return;const item=P[key];if(!item)return;
 busy=true;root?.classList.add('v371-busy');
 try{
  if(item.action==='sit')await sitSequence();
  else if(item.action==='tv')await tvSequence();
  else if(item.action==='talk')await talkSequence();
  else if(item.action==='dudu'||item.action==='bubu')await petSequence(item.action);
 }finally{busy=false;root?.classList.remove('v371-busy')}
}

function nearestKey(){
 const p=pos(active());let best=null,dist=Infinity;
 Object.values(P).forEach(i=>{const d=Math.hypot(p[0]-i.x,p[1]-i.y);if(d<dist){dist=d;best=i}});
 return best&&dist<best.r?best.id:null;
}

function replaceInteractButton(){
 const old=$('#v3InteractBtn',root);if(!old||old.dataset.v371==='1')return;
 const b=old.cloneNode(true);b.dataset.v371='1';old.replaceWith(b);
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const k=nearestKey();if(!k){toastNow('走近沙发、电视、Shawn 或宠物再互动');return}runAction(k)});
}

function wire(){
 root=$('#v3LivingRoot');if(!root||root.dataset.v371==='1')return;
 root.dataset.v371='1';world=$('#v3LivingWorld',root);if(!world)return;
 installAmbience();replaceInteractButton();

 // Capture interaction chips before the v3 handler so the old instant sofa teleport never fires.
 root.addEventListener('click',e=>{
  const chip=e.target.closest?.('[data-v3-context]');
  if(chip){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();runAction(chip.dataset.v3Context);return}
  if(seated&&!e.target.closest?.('button,input'))standUp(false);
 },true);

 document.addEventListener('keydown',e=>{
  if(!seated)return;
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))standUp(false);
 },true);

 // Keep the custom interact button if the base rebuild re-renders UI later.
 new MutationObserver(()=>replaceInteractButton()).observe(root,{childList:true,subtree:true});
}

const scan=()=>{const r=$('#v3LivingRoot');if(r)wire()};
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan,{once:true});else scan();
})();
