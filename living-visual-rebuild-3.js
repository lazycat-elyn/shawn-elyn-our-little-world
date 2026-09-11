(()=>{
'use strict';

/* LIVING ROOM VISUAL REBUILD 3
   Goal: match the approved high-detail living-room reference before pursuing free 360° 3D.
   Architecture: high-detail photo/depth hybrid + real floor-only movement, collisions,
   camera framing, occlusion, context interactions, existing game state and HUD systems.
   TEST BRANCH ONLY. app.js is untouched. */

const ROOM='living';
const PHOTO='./assets/scenes/living.jpg';
const q=(s,r=document)=>r.querySelector(s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
let mounted=false,root=null,world=null,contexts=null,floorHint=null;
let moveRAF=0,cameraRAF=0,keys=new Set(),heldDir=null,lastKeyT=0;
let cam={x:0,y:0,scale:1.045,targetX:0,targetY:0,targetScale:1.045};
let actors={};
let lastActive=null;
let positionSaveTimer=0;

const WALK_POLY=[[13,48],[26,44],[38,46],[49,50],[78,49],[91,57],[91,86],[76,91],[29,91],[12,80]];
const BLOCKERS=[
 {x1:0,y1:0,x2:28,y2:61,name:'TV / stairs'},
 {x1:37,y1:36,x2:86,y2:60,name:'sofa'},
 {x1:34,y1:55,x2:62,y2:77,name:'coffee table'},
 {x1:60,y1:63,x2:78,y2:84,name:'ottoman'},
 {x1:82,y1:50,x2:100,y2:82,name:'right side furniture'}
];
const INTERACTIONS=[
 {id:'sofa',x:69,y:53,r:11,label:'坐下',icon:'▰',action:'sit'},
 {id:'tv',x:24,y:46,r:10,label:'看电视',icon:'▣',action:'tv'},
 {id:'shawnChat',x:73,y:48,r:10,label:'和 Shawn 聊天',icon:'💬',action:'talk'},
 {id:'dudu',x:78,y:79,r:10,label:'Dudu 互动',icon:'🐾',action:'dudu'},
 {id:'bubu',x:28,y:63,r:10,label:'Bubu 抚摸',icon:'🐾',action:'bubu'}
];

function S(){try{return state}catch(_){return null}}
function coreSave(){try{if(typeof save==='function')save()}catch(_){} }
function toastV(t){try{if(typeof toast==='function')toast(t)}catch(_){console.log(t)} }
function sayV(name,text){try{if(typeof say==='function')say(name,text)}catch(_){} }

function pointInPoly(x,y,poly=WALK_POLY){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const xi=poly[i][0],yi=poly[i][1],xj=poly[j][0],yj=poly[j][1];const hit=((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi||.0001)+xi);if(hit)inside=!inside}return inside}
function blocked(x,y){return BLOCKERS.some(b=>x>b.x1&&x<b.x2&&y>b.y1&&y<b.y2)}
function canStand(x,y){return pointInPoly(x,y)&&!blocked(x,y)}
function nearestValid(x,y){if(canStand(x,y))return[x,y];for(let r=1;r<=22;r+=1.5){for(let a=0;a<Math.PI*2;a+=Math.PI/12){const nx=x+Math.cos(a)*r,ny=y+Math.sin(a)*r;if(canStand(nx,ny))return[nx,ny]}}return null}

function ensureState(){const s=S();if(!s)return null;s.visualLiving3=s.visualLiving3||{};const v=s.visualLiving3;v.positions=v.positions||{elyn:[42,78],shawn:[72,58],dudu:[78,82],bubu:[29,65]};v.shawnSitting=v.shawnSitting!==false;return v}
function outfitDir(id,dir){const s=S();const outfit=s?.outfits?.[id];if(outfit){const name=dir==='idle'?'idle':dir==='back'?'back':dir;return `./assets/wardrobe_real/outfits/${id}/${outfit}/${name}.png`}return `./assets/sprites_clean_v262/${id}-${dir==='back'?'back':dir}.png?v=262`}
function actorAsset(id,dir='idle'){if(id==='dudu'||id==='bubu')return `./assets/sprites/${id}-${dir==='walk'?'walk':'idle'}.png`;if(id==='shawn'&&ensureState()?.shawnSitting&&S()?.active!=='shawn')return './assets/sprites/shawn-sit.png';return outfitDir(id,dir)}

function actorHTML(id,name,cls){return `<div class="v3-actor ${cls}" data-v3-actor="${id}"><img draggable="false" alt="${name}"><span class="v3-name">${name}</span></div>`}
function mount(){
 if(mounted||S()?.room!==ROOM)return;mounted=true;ensureState();
 document.body.classList.add('v3-living-mode');
 const scene=q('#scene');if(!scene)return;
 root=document.createElement('div');root.id='v3LivingRoot';
 root.innerHTML=`
  <div id="v3LivingWorld">
   <img id="v3BasePhoto" class="v3-photo" src="${PHOTO}" draggable="false" alt="Living Room">
   <div id="v3Warmth"></div><div id="v3Vignette"></div><div id="v3FloorGlow"></div>
   <div id="v3FloorHint"></div>
   ${actorHTML('elyn','Elyn','human')}${actorHTML('shawn','Shawn','human')}${actorHTML('dudu','Dudu','pet')}${actorHTML('bubu','Bubu','pet')}
   <img id="v3OccSofa" class="v3-occluder" src="${PHOTO}" draggable="false">
   <img id="v3OccTable" class="v3-occluder" src="${PHOTO}" draggable="false">
   <img id="v3OccRight" class="v3-occluder" src="${PHOTO}" draggable="false">
   <img id="v3OccLeft" class="v3-occluder" src="${PHOTO}" draggable="false">
   <div id="v3ContextLayer"></div>
  </div>
  <div id="v3Brand"><div class="home">⌂</div><div><b>Shawn & Elyn</b><span>Our Little World ♡</span></div></div>
  <div id="v3Stats"></div>
  <div id="v3ModeBadge">VISUAL REBUILD 3 · 高质感可玩客厅</div>
  <div id="v3Joystick"><div class="stick"></div><button id="v3JoyUp">⌃</button><button id="v3JoyLeft">‹</button><button id="v3JoyRight">›</button><button id="v3JoyDown">⌄</button></div>
  <div id="v3ActionDock"><button class="v3-round-action run" id="v3RunBtn">🏃<em>奔跑</em></button><button class="v3-round-action interact" id="v3InteractBtn">✋<em>互动</em></button></div>
  <div id="v3BottomDock">
    <div id="v3ChatBox"><b id="v3ChatName">Elyn</b><input id="v3ChatInput" maxlength="120" placeholder="说点什么吧…"><button id="v3ChatSend">➤</button></div>
    <button class="v3-dock-btn" id="v3Switch">👥 切换人物</button><button class="v3-dock-btn" id="v3Bag">👜 背包</button><button class="v3-dock-btn" id="v3Phone">📱 手机</button><button class="v3-dock-btn" id="v3Map">🗺 地图</button>
  </div>`;
 scene.appendChild(root);world=q('#v3LivingWorld');contexts=q('#v3ContextLayer');floorHint=q('#v3FloorHint');
 actors={};['elyn','shawn','dudu','bubu'].forEach(id=>{actors[id]=q(`[data-v3-actor="${id}"]`,root)});
 bind();renderAll(true);requestAnimationFrame(cameraLoop);
}
function unmount(){if(!mounted)return;mounted=false;cancelAnimationFrame(moveRAF);cancelAnimationFrame(cameraRAF);root?.remove();root=world=contexts=floorHint=null;document.body.classList.remove('v3-living-mode')}

function bind(){
 root.addEventListener('click',e=>{
  if(e.target.closest('button,input,.v3-context,.v3-actor'))return;
  const r=world.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;const p=nearestValid(x,y);if(!p){toastV('这里不是可以走的地板');return}moveActiveTo(...p);
 });
 q('#v3Switch').onclick=()=>{q('#switchBtn')?.click();const s=S();if(s?.active==='shawn'){const v=ensureState();v.shawnSitting=false;if(v.positions.shawn[1]<56)v.positions.shawn=[72,61]}renderAll()};
 q('#v3Bag').onclick=()=>q('#bagBtn')?.click();q('#v3Phone').onclick=()=>q('#phoneBtn')?.click();q('#v3Map').onclick=()=>q('#mapBtn')?.click();
 q('#v3RunBtn').onclick=()=>toastV('按住 Shift + WASD 可以跑');q('#v3InteractBtn').onclick=runNearestInteraction;
 const send=()=>{const input=q('#v3ChatInput'),text=input.value.trim();if(!text)return;const original=q('#chatInput');if(original){original.value=text;q('#sendChatBtn')?.click()}input.value=''};q('#v3ChatSend').onclick=send;q('#v3ChatInput').addEventListener('keydown',e=>{if(e.key==='Enter')send()});
 const dirMap={v3JoyUp:'up',v3JoyDown:'down',v3JoyLeft:'left',v3JoyRight:'right'};Object.entries(dirMap).forEach(([id,dir])=>{const b=q('#'+id);b.addEventListener('pointerdown',e=>{e.preventDefault();heldDir=dir;b.setPointerCapture?.(e.pointerId)});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>heldDir=null))});
 root.querySelectorAll('.v3-context').forEach(()=>{});
}

function renderContexts(){if(!contexts)return;contexts.innerHTML=INTERACTIONS.map(i=>`<button class="v3-context" data-v3-context="${i.id}" style="left:${i.x}%;top:${i.y}%"><span>${i.icon}</span>${i.label}</button>`).join('');contexts.querySelectorAll('[data-v3-context]').forEach(b=>b.onclick=e=>{e.stopPropagation();const i=INTERACTIONS.find(x=>x.id===b.dataset.v3Context);if(i)doInteraction(i)});}
function actorPos(id){return ensureState()?.positions?.[id]||[50,75]}
function setActorPos(id,p){const v=ensureState();if(!v)return;v.positions[id]=[clamp(p[0],0,100),clamp(p[1],0,100)];if(id==='elyn'||id==='shawn'){const s=S();s.positions=s.positions||{};s.positions.living=s.positions.living||{};s.positions.living[id]=[...v.positions[id]]}}
function dirFor(dx,dy){if(Math.abs(dx)>Math.abs(dy))return dx<0?'left':'right';return dy<0?'back':'down'}
function setActorVisual(id,dir='idle',moving=false){const el=actors[id];if(!el)return;const img=el.querySelector('img');img.src=actorAsset(id,moving?(id==='dudu'||id==='bubu'?'walk':dir):dir);el.classList.toggle('moving',moving)}
function placeActor(id){const el=actors[id];if(!el)return;const [x,y]=actorPos(id);el.style.left=x+'%';el.style.top=y+'%';let z=y>76?92:y>64?69:y>56?53:41;if(id==='shawn'&&ensureState()?.shawnSitting&&S()?.active!=='shawn')z=45;el.style.zIndex=z;const base=id==='elyn'?1.08:id==='shawn'?1.0:id==='dudu'?.82:.78;const depth=clamp(.82+(y-50)*.008,.82,1.14);el.style.transform=`translate(-50%,-100%) scale(${(base*depth).toFixed(3)})`;el.classList.toggle('active',S()?.active===id)}
function renderActors(){const active=S()?.active||'elyn';if(lastActive!==active){lastActive=active;q('#v3ChatName')&&(q('#v3ChatName').textContent=active==='elyn'?'Elyn':'Shawn')}['elyn','shawn','dudu','bubu'].forEach(id=>{if(!actors[id])return;let dir='idle';if(id==='elyn'&&active==='elyn')dir='back';else if(id==='shawn'&&ensureState()?.shawnSitting&&active!=='shawn')dir='idle';setActorVisual(id,dir,false);placeActor(id)})}
function renderStats(){const s=S();const el=q('#v3Stats');if(!s||!el)return;const xp=Number.isFinite(s.xpTotal)?s.xpTotal:0,level=1+Math.floor(xp/250);el.innerHTML=`<span>Lv.${level}</span><span>🪙 ${s.coins||0}</span><span>✨ ${xp%250}/250</span><span class="love">♥ ${s.love||0}/1000</span>`}
function renderNear(){const id=S()?.active||'elyn',[x,y]=actorPos(id);let nearest=null,best=Infinity;for(const i of INTERACTIONS){const d=Math.hypot(x-i.x,y-i.y);if(d<best){best=d;nearest=i}}contexts?.querySelectorAll('.v3-context').forEach(b=>b.classList.toggle('near',nearest&&best<nearest.r&&b.dataset.v3Context===nearest.id));q('#v3InteractBtn')?.classList.toggle('ready',!!nearest&&best<nearest.r)}
function renderAll(first=false){if(!mounted)return;renderContexts();renderActors();renderStats();renderNear();if(first){cam.targetX=0;cam.targetY=0;cam.targetScale=1.045;cam.x=0;cam.y=0;cam.scale=1.045}updateCameraTarget()}

function updateCameraTarget(){if(!mounted)return;const id=S()?.active||'elyn',[x,y]=actorPos(id);cam.targetX=clamp((50-x)*.10,-3.2,3.2);cam.targetY=clamp((68-y)*.045,-1.5,1.3);cam.targetScale=clamp(1.035+(y-58)*.0018,1.035,1.085)}
function cameraLoop(){if(!mounted)return;cam.x=lerp(cam.x,cam.targetX,.065);cam.y=lerp(cam.y,cam.targetY,.065);cam.scale=lerp(cam.scale,cam.targetScale,.055);if(world)world.style.transform=`translate3d(${cam.x}%,${cam.y}%,0) scale(${cam.scale})`;cameraRAF=requestAnimationFrame(cameraLoop)}

function moveActiveTo(tx,ty,speedMul=1){const s=S();if(!s)return;const id=s.active||'elyn';if(id!=='elyn'&&id!=='shawn')return;const start=actorPos(id).slice(),dx=tx-start[0],dy=ty-start[1],dist=Math.hypot(dx,dy);if(dist<.4)return;const dir=dirFor(dx,dy),duration=clamp(dist*42/speedMul,260,1500);const startT=performance.now();cancelAnimationFrame(moveRAF);setActorVisual(id,dir,true);if(floorHint){floorHint.style.left=tx+'%';floorHint.style.top=ty+'%';floorHint.style.opacity=1}function step(now){if(!mounted)return;const t=clamp((now-startT)/duration,0,1),e=1-Math.pow(1-t,3);const nx=lerp(start[0],tx,e),ny=lerp(start[1],ty,e);if(canStand(nx,ny)){setActorPos(id,[nx,ny]);placeActor(id);updateCameraTarget();renderNear()}if(t<1)moveRAF=requestAnimationFrame(step);else{setActorVisual(id,'idle',false);placeActor(id);if(floorHint)floorHint.style.opacity=0;clearTimeout(positionSaveTimer);positionSaveTimer=setTimeout(coreSave,120)}}moveRAF=requestAnimationFrame(step)}
function nudge(dir,run=false){const id=S()?.active||'elyn';if(id!=='elyn'&&id!=='shawn')return;const p=actorPos(id).slice(),step=run?1.45:.82;if(dir==='left')p[0]-=step;if(dir==='right')p[0]+=step;if(dir==='up')p[1]-=step;if(dir==='down')p[1]+=step;if(canStand(...p)){const d=dir==='up'?'back':dir==='down'?'down':dir;setActorVisual(id,d,true);setActorPos(id,p);placeActor(id);updateCameraTarget();renderNear();clearTimeout(positionSaveTimer);positionSaveTimer=setTimeout(()=>{setActorVisual(id,'idle',false);placeActor(id);coreSave()},150)}}

function nearestInteraction(){const id=S()?.active||'elyn',[x,y]=actorPos(id);let nearest=null,best=Infinity;for(const i of INTERACTIONS){const d=Math.hypot(x-i.x,y-i.y);if(d<best){nearest=i;best=d}}return nearest&&best<nearest.r?nearest:null}
function runNearestInteraction(){const i=nearestInteraction();if(!i){toastV('走近沙发、电视或宠物再互动');return}doInteraction(i)}
function doInteraction(i){const s=S();if(!s)return;const active=s.active||'elyn';if(i.action==='sit'){const v=ensureState();const seat=active==='elyn'?[64,56]:[72,56];setActorPos(active,seat);if(active==='shawn')v.shawnSitting=true;const img=actors[active]?.querySelector('img');if(img)img.src=`./assets/sprites/${active}-sit.png`;placeActor(active);sayV(active==='elyn'?'Elyn':'Shawn','坐到沙发上休息 ♡');toastV('坐下 ♡');updateCameraTarget();return}
 if(i.action==='tv'){try{if(typeof interact==='function')interact('tv')}catch(_){toastV('一起看电视 ♡')}return}
 if(i.action==='talk'){try{if(typeof recordEvent==='function')recordEvent('coupleTalk',1)}catch(_){}sayV(active==='elyn'?'Elyn':'Shawn','靠近一点聊聊天 ♡');toastV('和 Shawn 聊天 ♡');return}
 if(i.action==='dudu'||i.action==='bubu'){const pet=i.action;try{if(typeof adjustNeeds==='function')adjustNeeds(pet,{mood:+8})}catch(_){}toastV(pet==='dudu'?'摸摸 Dudu 🐶':'摸摸 Bubu 🐱');return}}

function tickKeyboard(t){if(!mounted){requestAnimationFrame(tickKeyboard);return}const targetTag=document.activeElement?.tagName;if(targetTag==='INPUT'||targetTag==='TEXTAREA'){requestAnimationFrame(tickKeyboard);return}if(t-lastKeyT>34){const run=keys.has('ShiftLeft')||keys.has('ShiftRight');if(keys.has('KeyW')||keys.has('ArrowUp'))nudge('up',run);if(keys.has('KeyS')||keys.has('ArrowDown'))nudge('down',run);if(keys.has('KeyA')||keys.has('ArrowLeft'))nudge('left',run);if(keys.has('KeyD')||keys.has('ArrowRight'))nudge('right',run);if(heldDir)nudge(heldDir,false);lastKeyT=t}requestAnimationFrame(tickKeyboard)}
window.addEventListener('keydown',e=>{if(!mounted)return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault()}if(e.code==='Space'){runNearestInteraction();e.preventDefault()}});
window.addEventListener('keyup',e=>keys.delete(e.code));
requestAnimationFrame(tickKeyboard);

function patchRoom(){try{if(typeof enterRoom==='function'&&!enterRoom.__visualLiving3){const old=enterRoom;const wrapped=function(id){const out=old.apply(this,arguments);setTimeout(()=>{if(S()?.room===ROOM)mount();else unmount()},0);return out};wrapped.__visualLiving3=true;enterRoom=wrapped}}catch(e){console.warn('[Visual Living 3] room patch failed',e)}}
function patchSwitch(){q('#switchBtn')?.addEventListener('click',()=>setTimeout(()=>{if(!mounted)return;const v=ensureState();if(S()?.active==='shawn'){v.shawnSitting=false;if(v.positions.shawn[1]<56)v.positions.shawn=[72,61]}renderActors();renderStats();updateCameraTarget()},0))}
function init(){patchRoom();patchSwitch();if(S()?.room===ROOM&&!q('#gameScreen')?.classList.contains('hidden'))mount();const obs=new MutationObserver(()=>{if(q('#gameScreen')?.classList.contains('hidden'))unmount();else if(S()?.room===ROOM)mount()});const gs=q('#gameScreen');if(gs)obs.observe(gs,{attributes:true,attributeFilter:['class']});setInterval(()=>{if(mounted){renderStats();renderNear();if(lastActive!==S()?.active){const v=ensureState();if(S()?.active==='shawn'){v.shawnSitting=false}renderActors();updateCameraTarget()}}},500);console.info('[Shawn & Elyn] Living Room Visual Rebuild 3 ready on test branch.');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
