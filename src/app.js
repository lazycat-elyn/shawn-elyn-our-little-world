import { ROOMS, CHARACTERS, PETS, INGREDIENTS, RECIPES, STEP_LABELS } from './data.js';
import { loadState, saveState, resetState, adjustNeed, addLove, hasIngredients, missingIngredients, consumeIngredients } from './state.js';
import { findPath, isWalkable, nearestWalkable, segmentIsClear } from './navigation.js';

let state=loadState();
let positions={};
let pose={elyn:'idle',shawn:'idle'};
let selectedStartCharacter=state.active||'elyn';
let toastTimer=null;
let actionTimer=null;
let petTimer=null;
let holdMoveTimer=null;
let savePositionTimer=null;
let movement={token:0,raf:null,moving:false,path:[],index:0,onArrive:null,lastTime:0};
const MOVE_SPEED_PX=235;

const DINING_SEATS={
  left:{id:'left',label:'Left chair',approach:[69.5,76],stand:[71,73.5],seat:[72.2,68.8]},
  right:{id:'right',label:'Right chair',approach:[89.5,76],stand:[89,73.5],seat:[89.2,68.8]}
};
let dining={
  busy:false,
  occupancy:{left:null,right:null},
  seated:{elyn:null,shawn:null}
};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const scene=$('#scene');
const modalRoot=$('#modal-root');

function init(){
  buildRoomNav();
  bindStart();
  bindGlobal();
  if(state.started){
    $('#start-screen').classList.add('hidden');
    $('#game').classList.remove('hidden');
    enterRoom(state.room||'living',false);
  }
  renderAll();
  beginPetRoam();
  setInterval(decayNeeds,90000);
}

function bindStart(){
  $$('.choice-card').forEach(btn=>btn.addEventListener('click',()=>{
    selectedStartCharacter=btn.dataset.choose;
    $$('.choice-card').forEach(b=>b.classList.toggle('selected',b===btn));
  }));
  $('#enter-home').addEventListener('click',()=>{
    state.started=true;state.active=selectedStartCharacter;state.room='living';
    saveState(state);
    $('#start-screen').classList.add('hidden');$('#game').classList.remove('hidden');
    enterRoom('living',false);say(activeLabel(),'We’re home ♡ Click anywhere on the floor to move.');
  });
}

function bindGlobal(){
  window.addEventListener('game-saved',showSaved);
  $('#switch-player').addEventListener('click',switchPlayer);
  $('#save-button').addEventListener('click',()=>{persistRoomPositions();saveState(state)});
  $('#phone-button').addEventListener('click',openMenu);
  scene.addEventListener('click',onSceneClick);
  $('#actor-elyn').addEventListener('click',e=>{e.stopPropagation();actorClicked('elyn')});
  $('#actor-shawn').addEventListener('click',e=>{e.stopPropagation();actorClicked('shawn')});
  $('#pet-momo').addEventListener('click',e=>{e.stopPropagation();petClicked('momo')});
  $('#pet-mochi').addEventListener('click',e=>{e.stopPropagation();petClicked('mochi')});
  window.addEventListener('keydown',onKey);
  window.addEventListener('keyup',()=>scheduleIdlePose(120));
  $$('[data-move]').forEach(b=>{
    const stop=()=>{clearInterval(holdMoveTimer);holdMoveTimer=null;scheduleIdlePose(120)};
    b.addEventListener('pointerdown',e=>{e.preventDefault();stop();stepMove(b.dataset.move);holdMoveTimer=setInterval(()=>stepMove(b.dataset.move),85)});
    b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('pointerleave',stop);
  });
}

function buildRoomNav(){
  const nav=$('#room-nav');nav.innerHTML='';
  Object.entries(ROOMS).forEach(([id,r])=>{
    const b=document.createElement('button');b.className='room-btn';b.dataset.room=id;b.innerHTML=`<span>${r.icon}</span>${r.label}`;
    b.addEventListener('click',()=>enterRoom(id));nav.appendChild(b);
  });
}

function enterRoom(room,doSave=true){
  if(!ROOMS[room])return;
  cancelMovement();
  if(state.room&&state.room!==room){
    persistRoomPositions();
    if(state.room==='kitchen')resetDiningRuntime(true);
  }
  state.room=room;const r=ROOMS[room];
  scene.style.backgroundImage=`linear-gradient(rgba(26,18,22,.03),rgba(26,18,22,.06)),url('${r.bg}')`;
  $$('.room-btn').forEach(b=>b.classList.toggle('active',b.dataset.room===room));
  const saved=state.roomPositions?.[room]||{};
  positions={
    elyn:safeSpawn(saved.elyn||r.defaults.elyn,'elyn'),
    shawn:safeSpawn(saved.shawn||r.defaults.shawn,'shawn'),
    momo:safeSpawn(saved.momo||r.defaults.momo,'momo'),
    mochi:safeSpawn(saved.mochi||r.defaults.mochi,'mochi')
  };
  pose.elyn='idle';pose.shawn='idle';
  clearMoveTarget();renderHotspots();renderDiningLayer();renderActors();renderPets();
  say(activeLabel(),`${r.label} ♡ · Movement + Collision 1.0`);
  if(doSave){persistRoomPositions();saveState(state)}
}

function renderHotspots(){
  const root=$('#hotspots');root.innerHTML='';
  ROOMS[state.room].hotspots.forEach(h=>{
    const b=document.createElement('button');b.className='hotspot';b.style.left=h.x+'%';b.style.top=h.y+'%';b.innerHTML=`<span class="hicon">${h.icon}</span>${h.label}`;
    b.addEventListener('click',e=>{e.stopPropagation();useHotspot(h)});root.appendChild(b);
  });
}

function renderAll(){renderHUD();if(!$('#game').classList.contains('hidden')){renderActors();renderPets()}}
function renderHUD(){
  $('#love-level').textContent=state.loveLevel;$('#love-text').textContent=`${state.love} / ${state.loveMax}`;$('#love-bar').style.width=`${Math.min(100,state.love/state.loveMax*100)}%`;
  $('#coins').textContent=state.coins.toLocaleString();$('#active-name').textContent=activeLabel();
  const n=state.needs[state.active];
  $('#needs').innerHTML=[['🍚','hunger'],['⚡','energy'],['✨','cleanliness'],['♡','mood']].map(([i,k])=>`<div class="need ${n[k]<30?'low':''}">${i} ${n[k]}</div>`).join('');
  $('#portrait-img').src=CHARACTERS[state.active].sprites.idle;
}

function renderActors(){
  ['elyn','shawn'].forEach(id=>{
    const el=$(`#actor-${id}`),p=positions[id]||ROOMS[state.room].defaults[id];
    el.style.left=p[0]+'%';el.style.top=p[1]+'%';el.style.zIndex=String(100+Math.round(p[1]));el.classList.toggle('active',state.active===id);
    el.classList.toggle('moving',movement.moving&&state.active===id);
    el.classList.toggle('dining-seated',!!dining.seated[id]);
    el.classList.toggle('dining-facing-table',!!dining.seated[id]);
    el.querySelector('img').src=CHARACTERS[id].sprites[pose[id]]||CHARACTERS[id].sprites.idle;
  });
}
function renderPets(){
  ['momo','mochi'].forEach(id=>{const p=positions[id]||ROOMS[state.room].defaults[id],el=$(`#pet-${id}`);el.style.left=p[0]+'%';el.style.top=p[1]+'%';el.style.zIndex=String(90+Math.round(p[1]));});
}

function activeLabel(){return CHARACTERS[state.active].label}
function partnerId(){return state.active==='elyn'?'shawn':'elyn'}
function partnerLabel(){return CHARACTERS[partnerId()].label}

function onSceneClick(e){
  if(e.target.closest('.hotspot,.actor,.pet'))return;
  if(dining.busy){toast('Finish the current chair action first.');return}
  if(dining.seated[state.active]){toast('Stand up from the dining chair first.');openDiningHub();return}
  const rect=scene.getBoundingClientRect();
  const x=(e.clientX-rect.left)/rect.width*100,y=(e.clientY-rect.top)/rect.height*100;
  moveActiveTo(x,y);
}

function roomNav(){return ROOMS[state.room]?.navigation}
function dynamicObstacles(exclude=state.active){
  const blocks=[];
  ['elyn','shawn'].forEach(id=>{if(id!==exclude&&positions[id])blocks.push({type:'circle',x:positions[id][0],y:positions[id][1],r:3.2,padding:.5,id:`actor-${id}`})});
  ['momo','mochi'].forEach(id=>{if(positions[id])blocks.push({type:'circle',x:positions[id][0],y:positions[id][1],r:2.1,padding:.3,id:`pet-${id}`})});
  return blocks;
}
function safeSpawn(point,id){
  const extra=id==='elyn'||id==='shawn'?[]:[];
  return nearestWalkable(roomNav(),point,extra)||[...point];
}
function persistRoomPositions(){
  if(!state.room||!positions.elyn)return;
  state.roomPositions=state.roomPositions||{};
  state.roomPositions[state.room]=Object.fromEntries(Object.entries(positions).map(([k,v])=>[k,[+v[0].toFixed(2),+v[1].toFixed(2)]]));
}
function schedulePositionSave(){
  clearTimeout(savePositionTimer);savePositionTimer=setTimeout(()=>{persistRoomPositions();saveState(state)},700);
}
function showMoveTarget(point,ok=true){
  const el=$('#move-target');if(!el)return;el.style.left=point[0]+'%';el.style.top=point[1]+'%';el.classList.toggle('blocked',!ok);el.classList.add('show');
  clearTimeout(el._hideTimer);el._hideTimer=setTimeout(()=>el.classList.remove('show'),650);
}
function clearMoveTarget(){const el=$('#move-target');if(el)el.classList.remove('show','blocked')}
function cancelMovement(setIdle=true){
  movement.token++;movement.moving=false;movement.path=[];movement.index=0;movement.onArrive=null;movement.lastTime=0;
  if(movement.raf)cancelAnimationFrame(movement.raf);movement.raf=null;
  if(setIdle&&state.active&&!dining.seated[state.active]){pose[state.active]='idle';renderActors()}
}
function worldPixelDistance(a,b){
  const r=scene.getBoundingClientRect();return Math.hypot((b[0]-a[0])*r.width/100,(b[1]-a[1])*r.height/100);
}
function animatePath(path,onArrive){
  if(!path||path.length<2){if(onArrive)onArrive();return}
  cancelMovement(false);const token=movement.token;movement.moving=true;movement.path=path;movement.index=1;movement.onArrive=onArrive||null;movement.lastTime=0;
  const id=state.active;$('#actor-'+id)?.classList.add('moving');
  const tick=time=>{
    if(token!==movement.token||!movement.moving)return;
    if(!movement.lastTime)movement.lastTime=time;
    let dt=Math.min(.05,(time-movement.lastTime)/1000);movement.lastTime=time;
    let current=positions[id];
    while(dt>0&&movement.index<movement.path.length){
      const target=movement.path[movement.index],distPx=worldPixelDistance(current,target);
      if(distPx<.5){positions[id]=[...target];current=positions[id];movement.index++;continue}
      const travel=MOVE_SPEED_PX*dt;
      const ratio=Math.min(1,travel/distPx);
      const nx=current[0]+(target[0]-current[0])*ratio,ny=current[1]+(target[1]-current[1])*ratio;
      pose[id]=target[0]>=current[0]?'walkRight':'walkLeft';positions[id]=[nx,ny];renderActors();
      if(ratio>=1){movement.index++;dt=Math.max(0,dt-distPx/MOVE_SPEED_PX)}else dt=0;
    }
    if(movement.index>=movement.path.length){
      movement.moving=false;movement.raf=null;pose[id]='idle';renderActors();persistRoomPositions();schedulePositionSave();
      const cb=movement.onArrive;movement.onArrive=null;if(cb)cb();return;
    }
    movement.raf=requestAnimationFrame(tick);
  };
  movement.raf=requestAnimationFrame(tick);
}
function moveActiveTo(x,y,{onArrive=null,ignoreDynamic=false,quiet=false}={}){
  if(!roomNav())return false;
  const start=positions[state.active]||ROOMS[state.room].defaults[state.active];
  const extra=ignoreDynamic?[]:dynamicObstacles(state.active);
  const goal=nearestWalkable(roomNav(),[x,y],extra);
  if(!goal){if(!quiet)toast('That area is not walkable.');showMoveTarget([x,y],false);bumpActor();return false}
  const path=findPath(roomNav(),start,goal,extra);
  if(!path){if(!quiet)toast('No clear route there.');showMoveTarget(goal,false);bumpActor();return false}
  showMoveTarget(goal,true);animatePath(path,onArrive);return true;
}
function bumpActor(){
  const el=$(`#actor-${state.active}`);if(!el)return;el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump');setTimeout(()=>el.classList.remove('bump'),220);
}
function scheduleIdlePose(delay=160){clearTimeout(actionTimer);actionTimer=setTimeout(()=>{if(!movement.moving&&!dining.seated[state.active]){pose[state.active]='idle';renderActors()}},delay)}
function onKey(e){
  if(modalRoot.children.length||$('#game').classList.contains('hidden'))return;
  if(dining.busy)return;
  if(dining.seated[state.active]){
    const moveKeys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','W','a','A','s','S','d','D'];
    if(moveKeys.includes(e.key)){e.preventDefault();toast('Stand up from the dining chair first.');openDiningHub()}
    return;
  }
  const map={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
  if(map[e.key]){e.preventDefault();stepMove(map[e.key])}
}
function stepMove(dir){
  if(!roomNav()||dining.busy)return;
  if(dining.seated[state.active]){toast('Stand up from the dining chair first.');openDiningHub();return}
  cancelMovement(false);
  const p=positions[state.active]||[50,80],dx=dir==='left'?-1.65:dir==='right'?1.65:0,dy=dir==='up'?-1.25:dir==='down'?1.25:0;
  const target=[p[0]+dx,p[1]+dy],extra=dynamicObstacles(state.active);
  if(isWalkable(roomNav(),target,extra)&&segmentIsClear(roomNav(),p,target,extra)){
    positions[state.active]=target;pose[state.active]=dx<0?'walkLeft':dx>0?'walkRight':pose[state.active]==='walkLeft'?'walkLeft':'walkRight';renderActors();scheduleIdlePose();schedulePositionSave();
  }else{bumpActor();scheduleIdlePose(80)}
}
function switchPlayer(){
  if(dining.busy){toast('Finish the chair action first.');return}
  cancelMovement();
  state.active=partnerId();
  if(!dining.seated.elyn)pose.elyn='idle';
  if(!dining.seated.shawn)pose.shawn='idle';
  renderAll();say(activeLabel(),`Now controlling ${activeLabel()} ♡`);persistRoomPositions();saveState(state)
}

function approach(anchor,cb){
  const ok=moveActiveTo(anchor[0],anchor[1],{onArrive:cb,ignoreDynamic:false,quiet:true});
  if(!ok)toast('Cannot reach this interaction point yet.');
}

function useHotspot(h){
  approach(h.anchor,()=>{
    switch(h.action){
      case 'fridge': openFridge();break;case 'cook': openCooking();break;case 'dining':openDiningHub();break;case 'washDishes':openDishwashing();break;
      case 'coffee':makeCoffee();break;case 'sofa':sofaAction();break;case 'tv':simpleAction('Watching TV together…',0,1,4);break;
      case 'study':studyAction();break;case 'pc':simpleAction('Typing at the computer…',-3,10,1);break;case 'read':simpleAction('Reading quietly…',2,0,2);break;
      case 'watchCity':simpleAction('The city lights are beautiful tonight.',2,0,4);break;case 'balconyTalk':coupleAction('Talk',7);break;case 'photo':simpleAction('Photo saved to our little memory ♡',0,0,5);break;
      case 'washFace':bathroomAction('Wash Face',12);break;case 'shower':bathroomAction('Shower',28);break;case 'bath':bathAction();break;case 'skincare':bathroomAction('Skincare',8);break;
      case 'sleep':sleepAction();break;case 'goodnight':coupleAction('Goodnight Hug',14);break;case 'appearance':simpleAction('Looking cute today ♡',0,0,2);break;case 'outfit':toast('Closet outfit expansion can be added next.');break;
      case 'feedPets':feedPets();break;case 'playPets':simpleAction('Playing with Momo and Mochi ♡',-2,0,6);break;
    }
  });
}
function actorClicked(id){
  if(id===state.active){say(activeLabel(),'Where should we go?');return}
  openPartnerMenu();
}
function openPartnerMenu(){
  openModal(`<h2>${partnerLabel()} ♡</h2><p class="modal-sub">Choose a couple interaction.</p><div class="action-grid">
    ${[['Talk','A little conversation','+5 Love'],['Hug','One synchronized moment','+12 Love'],['Pat Head','Gentle head pat','+8 Love'],['Hold Hands','Stay close','+8 Love'],['Give Gift','Costs 20 coins','+20 Love']].map(a=>`<button class="action-card" data-couple="${a[0]}"><b>${a[0]}</b><small>${a[1]} · ${a[2]}</small></button>`).join('')}
  </div>`);
  $$('[data-couple]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.couple;if(a==='Give Gift'&&state.coins<20){toast('Not enough coins.');return}closeModal();if(a==='Give Gift')state.coins-=20;coupleAction(a,{Talk:5,Hug:12,'Pat Head':8,'Hold Hands':8,'Give Gift':20}[a])}));
}
function coupleAction(name,love){
  const p=positions[partnerId()]||[58,72];const side=state.active==='elyn'?-1:1;positions[state.active]=[p[0]+side*6,p[1]+1];pose.elyn='happy';pose.shawn='happy';renderActors();
  addLove(state,love);adjustNeed(state,state.active,'mood',5);adjustNeed(state,partnerId(),'mood',4);
  say(activeLabel(),`${name} with ${partnerLabel()} ♡`);toast(`${name}  +${love} Love EXP`);renderHUD();saveState(state);
  setTimeout(()=>{pose.elyn='idle';pose.shawn='idle';renderActors()},1800);
}
function petClicked(id){
  const pet=PETS[id];openModal(`<h2>${pet.label} 🐾</h2><p class="modal-sub">What do you want to do?</p><div class="action-grid"><button class="action-card" data-petact="pet"><b>Pet</b><small>Gentle physical contact</small></button><button class="action-card" data-petact="call"><b>Come Here</b><small>Call ${pet.label}</small></button><button class="action-card" data-petact="play"><b>Play</b><small>Small mood bonus</small></button></div>`);
  $$('[data-petact]').forEach(b=>b.addEventListener('click',()=>{closeModal();const a=b.dataset.petact;if(a==='call'){const p=positions[state.active];positions[id]=[p[0]+(id==='momo'?7:-7),Math.min(86,p[1]+3)];renderPets();toast(`${pet.label} came over ♡`)}else{addLove(state,a==='pet'?2:3);adjustNeed(state,state.active,'mood',3);toast(`${pet.label} is happy ♡`);renderHUD();saveState(state)}}));
}
function feedPets(){if(state.coins<5){toast('Need 5 coins for pet food.');return}state.coins-=5;addLove(state,3);adjustNeed(state,state.active,'mood',3);toast('Momo & Mochi ate happily ♡');renderHUD();saveState(state)}

function sofaAction(){pose[state.active]='sit';renderActors();adjustNeed(state,state.active,'energy',6);say(activeLabel(),'Sitting on the sofa… cozy ♡');saveState(state);setTimeout(()=>{pose[state.active]='idle';renderActors()},3000)}
function simpleAction(text,energy=0,coins=0,love=0){pose[state.active]='happy';renderActors();adjustNeed(state,state.active,'energy',energy);state.coins+=coins;if(love)addLove(state,love);say(activeLabel(),text);toast(text);renderHUD();saveState(state);setTimeout(()=>{pose[state.active]='idle';renderActors()},1800)}
function studyAction(){pose[state.active]='sit';renderActors();adjustNeed(state,state.active,'energy',-7);state.coins+=15;say(activeLabel(),'Studying… typing notes and using the desk.');toast('+15 coins · Energy -7');renderHUD();saveState(state);setTimeout(()=>{pose[state.active]='idle';renderActors()},3500)}
function bathroomAction(label,clean){pose[state.active]='happy';renderActors();adjustNeed(state,state.active,'cleanliness',clean);adjustNeed(state,state.active,'mood',2);say(activeLabel(),`${label} ♡`);toast(`${label} · Cleanliness +${clean}`);renderHUD();saveState(state);setTimeout(()=>{pose[state.active]='idle';renderActors()},2100)}
function bathAction(){pose[state.active]='sit';positions[state.active]=[38,60];renderActors();adjustNeed(state,state.active,'cleanliness',35);adjustNeed(state,state.active,'energy',8);toast('Relaxing in the bathtub…');say(activeLabel(),'Warm bath time ♡');renderHUD();saveState(state);setTimeout(()=>{pose[state.active]='idle';positions[state.active]=[42,70];renderActors()},4000)}
function sleepAction(){pose[state.active]='sit';renderActors();state.needs[state.active].energy=100;adjustNeed(state,state.active,'mood',6);say(activeLabel(),'Goodnight… zzz ♡');toast('Energy restored');renderHUD();saveState(state);setTimeout(()=>{pose[state.active]='idle';renderActors()},3300)}
function makeCoffee(){const id=state.active;adjustNeed(state,id,'energy',12);state.coins=Math.max(0,state.coins-2);toast('Fresh coffee ☕ Energy +12');say(activeLabel(),'Coffee smells so good.');renderHUD();saveState(state)}

function openFridge(){
  const items=Object.entries(INGREDIENTS).map(([id,it])=>{const p=state.fridgePositions[id]||[50,50];return `<div class="fridge-item" data-fridge-item="${id}" style="left:${p[0]}%;top:${p[1]}%"><img src="${it.img}" alt="${it.label}"></div>`}).join('');
  const stock=()=>Object.entries(INGREDIENTS).map(([id,it])=>`<span>${it.label}</span><span id="stock-${id}">${state.fridge[id]||0}</span>`).join('');
  openModal(`<h2>Our Fridge ♡</h2><p class="modal-sub">Drag food to organize it. Positions are saved automatically.</p><div class="fridge-layout"><div class="fridge-board" id="fridge-board">${items}</div><aside class="fridge-side"><h3>Food Stock</h3><div class="stock-list">${stock()}</div><div class="selected-item" id="selected-fridge"><b>Select an item</b><p class="modal-sub">You can drag items anywhere inside valid fridge bounds.</p></div><button class="small-button secondary" id="restock">Restock basics · 30 coins</button></aside></div>`,true);
  let selected=null,drag=null;
  $$('.fridge-item').forEach(el=>{
    el.addEventListener('pointerdown',e=>{selected=el.dataset.fridgeItem;selectFridgeItem(selected);const board=$('#fridge-board'),r=board.getBoundingClientRect();drag={el,board,r};el.setPointerCapture?.(e.pointerId);e.preventDefault()});
    el.addEventListener('pointermove',e=>{if(!drag||drag.el!==el)return;const r=drag.r;let x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;x=Math.max(13,Math.min(91,x));y=Math.max(14,Math.min(86,y));el.style.left=x+'%';el.style.top=y+'%';state.fridgePositions[el.dataset.fridgeItem]=[+x.toFixed(1),+y.toFixed(1)]});
    el.addEventListener('pointerup',()=>{if(drag){drag=null;saveState(state)}});
    el.addEventListener('click',()=>{selected=el.dataset.fridgeItem;selectFridgeItem(selected)});
  });
  function selectFridgeItem(id){
    $$('.fridge-item').forEach(x=>x.classList.toggle('selected',x.dataset.fridgeItem===id));const it=INGREDIENTS[id];
    $('#selected-fridge').innerHTML=`<b>${it.label}</b><img src="${it.img}" alt=""><p>In fridge: <strong>${state.fridge[id]||0}</strong></p><button id="take-fridge" class="small-button" ${(state.fridge[id]||0)<=0?'disabled':''}>Take / use one</button>`;
    $('#take-fridge')?.addEventListener('click',()=>{if((state.fridge[id]||0)>0){state.fridge[id]--;$('#stock-'+id).textContent=state.fridge[id];toast(`Took ${it.label}.`);selectFridgeItem(id);saveState(state)}})
  }
  $('#restock').addEventListener('click',()=>{if(state.coins<30){toast('Not enough coins.');return}state.coins-=30;Object.keys(state.fridge).forEach(id=>state.fridge[id]=Math.max(state.fridge[id],3));state.fridge.eggs=Math.max(state.fridge.eggs,8);saveState(state);closeModal();renderHUD();toast('Fridge restocked ♡')});
}

function openCooking(){
  const cards=Object.entries(RECIPES).map(([id,r])=>{const missing=missingIngredients(state,r.ingredients);return `<button class="recipe-card ${missing.length?'disabled':''}" data-recipe="${id}"><img src="${r.img}" alt="${r.label}"><b>${r.label}</b><small>${r.difficulty}</small><span class="badge">${missing.length?'Missing: '+missing.join(', '):'Ready to cook'}</span></button>`}).join('');
  openModal(`<h2>Cooking ♡</h2><p class="modal-sub">Easy to understand, difficult to perfect. Heat, timing and actions affect quality.</p><div class="recipe-grid">${cards}</div>`,true);
  $$('.recipe-card').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.recipe,r=RECIPES[id];if(!hasIngredients(state,r.ingredients)){toast('Missing ingredients: '+missingIngredients(state,r.ingredients).join(', '));return}startCooking(id)}));
}

function startCooking(recipeId){
  const recipe=RECIPES[recipeId];consumeIngredients(state,recipe.ingredients);saveState(state);
  let stepIndex=0,scores=[];
  function renderStep(){
    const step=recipe.steps[stepIndex];modalRoot.innerHTML='';
    openModal(`<div class="cook-stage"><div class="cook-header"><img src="${recipe.img}" alt=""><div><h2>${recipe.label}</h2><p class="modal-sub">Step ${stepIndex+1} / ${recipe.steps.length} · ${STEP_LABELS[step]}</p></div></div><div class="step-dots">${recipe.steps.map((_,i)=>`<i class="step-dot ${i<stepIndex?'done':''}"></i>`).join('')}</div><div class="minigame" id="minigame"></div></div>`,true,false);
    runStep(step,score=>{scores.push(score);stepIndex++;if(stepIndex<recipe.steps.length)renderStep();else finishCooking(recipeId,scores)});
  }
  renderStep();
}

function runStep(step,done){
  const root=$('#minigame');
  if(step==='timing')return timingGame(root,done);
  if(step==='stir')return stirGame(root,done);
  if(step==='heat')return heatGame(root,done);
  if(step==='season')return seasonGame(root,done);
  if(step==='plate')return plateGame(root,done);
}
function timingGame(root,done){
  root.innerHTML=`<div><h3>Tap when the marker is in the green zone</h3><div class="timing-track"><span class="timing-sweet"></span><i class="timing-marker"></i></div><button class="primary timing-button" style="padding:12px 28px">CHOP!</button></div>`;
  const marker=root.querySelector('.timing-marker'),btn=root.querySelector('button');let start=performance.now(),raf;
  function frame(t){const phase=((t-start)%1800)/1800;const x=phase<.5?phase*2:(1-phase)*2;marker.style.left=`calc(${x*100}% - 6px)`;raf=requestAnimationFrame(frame)}raf=requestAnimationFrame(frame);
  btn.onclick=()=>{cancelAnimationFrame(raf);const left=parseFloat(marker.style.left)||0;const rect=marker.parentElement.getBoundingClientRect(),m=marker.getBoundingClientRect();const pct=((m.left+m.width/2)-rect.left)/rect.width*100;const d=Math.abs(pct-50);done(Math.max(35,Math.round(100-d*3.1)))};
}
function stirGame(root,done){
  root.innerHTML=`<div><h3>Stir in smooth circles</h3><div class="stir-area" id="stir-area"></div><div class="progress-ring" id="stir-progress">0%</div></div>`;
  const area=$('#stir-area'),label=$('#stir-progress');let lastA=null,total=0,moves=0;
  area.addEventListener('pointermove',e=>{if(e.buttons===0&&e.pointerType==='mouse')return;const r=area.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,a=Math.atan2(e.clientY-cy,e.clientX-cx);if(lastA!==null){let d=a-lastA;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;total+=Math.abs(d);moves++}lastA=a;const pct=Math.min(100,Math.round(total/(Math.PI*5)*100));label.textContent=pct+'%';if(pct>=100){const smooth=Math.min(100,55+moves/2);done(Math.round(smooth))}});
  area.addEventListener('pointerdown',e=>{area.setPointerCapture?.(e.pointerId);lastA=null});
}
function heatGame(root,done){
  root.innerHTML=`<div class="heat-panel"><h3>Balance heat and time</h3><div class="heat-row"><b>Heat</b><input id="heat" type="range" min="1" max="10" value="5"><span id="heatv">5</span></div><div class="heat-row"><b>Time</b><input id="time" type="range" min="1" max="10" value="5"><span id="timev">5</span></div><small>Target is around medium heat with enough cooking time — too low can undercook; too high can burn.</small><button class="primary" id="heat-done" style="padding:12px 24px">Finish cooking</button></div>`;
  const h=$('#heat'),t=$('#time');h.oninput=()=>$('#heatv').textContent=h.value;t.oninput=()=>$('#timev').textContent=t.value;$('#heat-done').onclick=()=>{const hv=+h.value,tv=+t.value;let score=100-Math.abs(hv-6)*12-Math.abs(tv-6)*11;done(Math.max(25,Math.round(score)))};
}
function seasonGame(root,done){
  root.innerHTML=`<div class="season-zone"><h3>Season carefully — stop in the green zone</h3><div class="season-meter"><i id="season-mark"></i></div><button class="primary" id="season-add" style="padding:12px 28px;margin-top:22px">Add seasoning</button><p id="season-text">Tap several times. Don't over-season.</p></div>`;
  let v=10;const mark=$('#season-mark');mark.style.left=v+'%';$('#season-add').onclick=()=>{v+=8+Math.random()*10;mark.style.left=Math.min(96,v)+'%';let score=Math.max(25,100-Math.abs(v-50)*2.4);$('#season-text').textContent=v<42?'Needs a little more…':v>58?'That may be too much!':'Tastes balanced ♡';if(v>=42) setTimeout(()=>done(Math.round(score)),450)};
}
function plateGame(root,done){
  const current=Object.values(RECIPES).find(r=>r.img===RECIPES[Object.keys(RECIPES)[0]]?.img);
  root.innerHTML=`<div><h3>Drag the food onto the centre of the plate</h3><div class="plate-zone" id="plate-zone"><div class="plate-circle"></div><img class="drag-food" id="drag-food" src="${$('.cook-header img').src}" alt="food"></div></div>`;
  const zone=$('#plate-zone'),food=$('#drag-food');let dragging=false;
  food.addEventListener('pointerdown',e=>{dragging=true;food.setPointerCapture?.(e.pointerId)});food.addEventListener('pointermove',e=>{if(!dragging)return;const r=zone.getBoundingClientRect();let x=e.clientX-r.left-food.offsetWidth/2,y=e.clientY-r.top-food.offsetHeight/2;food.style.left=Math.max(0,Math.min(r.width-food.offsetWidth,x))+'px';food.style.top=Math.max(0,Math.min(r.height-food.offsetHeight,y))+'px'});food.addEventListener('pointerup',()=>{dragging=false;const zr=zone.getBoundingClientRect(),fr=food.getBoundingClientRect(),dx=(fr.left+fr.width/2)-(zr.left+zr.width/2),dy=(fr.top+fr.height/2)-(zr.top+zr.height/2),dist=Math.hypot(dx,dy);done(Math.max(35,Math.round(100-dist/2.2)))})
}

function finishCooking(recipeId,scores){
  const recipe=RECIPES[recipeId],avg=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);let quality='GOOD';if(avg>=92)quality='PERFECT';else if(avg>=80)quality='DELICIOUS';else if(avg>=65)quality='GOOD';else if(avg>=50)quality='A LITTLE MESSY';else quality='SLIGHTLY UNDERCOOKED';
  state.preparedMeals.push({id:crypto.randomUUID?.()||String(Date.now()),recipeId,label:recipe.label,img:recipe.img,quality,score:avg,servings:2,createdAt:Date.now()});
  state.mastery[recipeId]=(state.mastery[recipeId]||0)+1;state.coins+=Math.max(4,Math.round(avg/10));adjustNeed(state,state.active,'mood',5);saveState(state);renderHUD();
  modalRoot.innerHTML='';openModal(`<div class="quality-card"><img src="${recipe.img}" alt=""><div class="quality-title">${quality}</div><p>${recipe.label} · ${avg}/100</p><div class="score-row">${scores.map((s,i)=>`<span class="score-pill">${STEP_LABELS[recipe.steps[i]]}: ${s}</span>`).join('')}</div><p>2 servings prepared. The food now persists until you eat it.</p><button class="primary" id="serve-now" style="padding:12px 25px">Serve at Dining Table</button> <button class="small-button secondary" id="close-result">Keep for later</button></div>`,false,false);
  $('#serve-now').onclick=()=>{closeModal();openDiningHub()};$('#close-result').onclick=closeModal;
}

function renderDiningLayer(){
  let layer=$('#dining-physical-layer');
  if(state.room!=='kitchen'){
    layer?.remove();
    return;
  }
  if(!layer){
    layer=document.createElement('div');
    layer.id='dining-physical-layer';
    layer.className='dining-physical-layer';
    layer.innerHTML=`
      <div class="dining-chair-proxy left" data-chair-proxy="left" aria-hidden="true">
        <i class="chair-back"></i><i class="chair-seat"></i><i class="chair-leg leg-a"></i><i class="chair-leg leg-b"></i>
      </div>
      <div class="dining-chair-proxy right" data-chair-proxy="right" aria-hidden="true">
        <i class="chair-back"></i><i class="chair-seat"></i><i class="chair-leg leg-a"></i><i class="chair-leg leg-b"></i>
      </div>
      <div class="dining-table-front-mask" aria-hidden="true"></div>`;
    scene.appendChild(layer);
  }
  syncDiningVisuals();
}
function chairProxy(seatId){return scene.querySelector(`[data-chair-proxy="${seatId}"]`)}
function syncDiningVisuals(){
  if(state.room!=='kitchen')return;
  Object.keys(DINING_SEATS).forEach(seatId=>{
    const chair=chairProxy(seatId);if(!chair)return;
    const occupant=dining.occupancy[seatId];
    chair.classList.toggle('occupied',!!occupant&&!!dining.seated[occupant]);
    chair.classList.toggle('reserved',!!occupant&&!dining.seated[occupant]);
  });
  scene.classList.toggle('dining-in-use',!!dining.seated.elyn||!!dining.seated.shawn);
}
function resetDiningRuntime(silent=false){
  dining.busy=false;
  dining.occupancy.left=null;dining.occupancy.right=null;
  dining.seated.elyn=null;dining.seated.shawn=null;
  ['elyn','shawn'].forEach(id=>{
    const el=$(`#actor-${id}`);
    el?.classList.remove('dining-seated','dining-facing-table','dining-reaching','dining-turning','dining-standing');
    if(!silent)pose[id]='idle';
  });
  scene.classList.remove('dining-in-use');
  scene.querySelectorAll('.dining-chair-proxy').forEach(c=>c.classList.remove('active','pulling','pulled','occupied','reserved','pushing'));
}
function availableSeat(){
  return Object.keys(DINING_SEATS).find(id=>!dining.occupancy[id])||null;
}
function openDiningHub(){
  if(state.room!=='kitchen'){toast('Go to the Kitchen & Dining room first.');return}
  const id=state.active;
  const seatedSeat=dining.seated[id];
  const seatStatus=Object.entries(DINING_SEATS).map(([sid,seat])=>{
    const who=dining.occupancy[sid];
    return `<span class="seat-status ${who?'taken':''}">${seat.label}: ${who?CHARACTERS[who].label:'FREE'}</span>`;
  }).join('');
  const mealButton=state.preparedMeals.length
    ? `<button class="action-card" id="open-meals"><b>🍽️ Choose Meal</b><small>${state.preparedMeals.length} prepared meal${state.preparedMeals.length===1?'':'s'}</small></button>`
    : `<button class="action-card" id="go-cook"><b>🍳 Cook First</b><small>No prepared food yet</small></button>`;
  openModal(`<h2>Dining Sit 2.0 ♡</h2>
    <p class="modal-sub">Physical chair sequence: approach → reach → pull → turn → sit → slide in.</p>
    <div class="seat-status-row">${seatStatus}</div>
    <div class="action-grid" style="margin-top:12px">
      ${seatedSeat
        ? `<button class="action-card" id="stand-dining"><b>↥ Stand Up</b><small>Slide chair back, stand, then push it in neatly</small></button>`
        : `<button class="action-card" id="sit-dining" ${availableSeat()?'':'disabled'}><b>🪑 Sit at Table</b><small>${availableSeat()?'Use the next free chair':'Both chairs are occupied'}</small></button>`}
      ${mealButton}
    </div>
    <p class="debug-note">Tip: switch character after one person sits, then seat the other character. The two chairs have independent occupancy.</p>`);
  $('#sit-dining')?.addEventListener('click',()=>{const seatId=availableSeat();if(!seatId)return;closeModal();seatCharacter(id,seatId)});
  $('#stand-dining')?.addEventListener('click',()=>{closeModal();standFromDining(id)});
  $('#open-meals')?.addEventListener('click',()=>{closeModal();openDining()});
  $('#go-cook')?.addEventListener('click',()=>{closeModal();openCooking()});
}
function seatCharacter(id,seatId,onDone=null){
  if(dining.busy)return;
  if(dining.seated[id]){onDone?.();return}
  if(dining.occupancy[seatId]&&dining.occupancy[seatId]!==id){toast('That chair is occupied.');return}
  const seat=DINING_SEATS[seatId];
  dining.busy=true;dining.occupancy[seatId]=id;syncDiningVisuals();
  const actor=$(`#actor-${id}`),chair=chairProxy(seatId);
  const begin=()=>{
    actor?.classList.add('dining-reaching');
    chair?.classList.add('active','pulling');
    say(CHARACTERS[id].label,'Reaching for the chair…');
    setTimeout(()=>{
      chair?.classList.remove('pulling');chair?.classList.add('pulled');
      positions[id]=[...seat.stand];pose[id]='idle';renderActors();
      actor?.classList.remove('dining-reaching');actor?.classList.add('dining-turning');
      say(CHARACTERS[id].label,'Chair pulled out. Turning to sit…');
    },420);
    setTimeout(()=>{
      positions[id]=[seat.seat[0],seat.seat[1]+1.2];renderActors();
    },720);
    setTimeout(()=>{
      dining.seated[id]=seatId;
      positions[id]=[...seat.seat];pose[id]='sit';
      actor?.classList.remove('dining-turning');actor?.classList.add('dining-seated','dining-facing-table');
      chair?.classList.remove('pulled','reserved');chair?.classList.add('occupied');
      dining.busy=false;syncDiningVisuals();renderActors();persistRoomPositions();saveState(state);
      say(CHARACTERS[id].label,'Seated properly at the dining table ♡');
      toast(`${CHARACTERS[id].label} sat down · ${seat.label}`);
      onDone?.();
    },1120);
  };
  if(id===state.active){
    const ok=moveActiveTo(seat.approach[0],seat.approach[1],{onArrive:begin,quiet:true});
    if(!ok){dining.busy=false;dining.occupancy[seatId]=null;syncDiningVisuals();toast('Cannot reach this chair.');}
  }else{
    positions[id]=[...seat.approach];renderActors();setTimeout(begin,180);
  }
}
function standFromDining(id,onDone=null){
  const seatId=dining.seated[id];if(!seatId||dining.busy)return;
  const seat=DINING_SEATS[seatId],actor=$(`#actor-${id}`),chair=chairProxy(seatId);
  dining.busy=true;
  actor?.classList.add('dining-standing');
  chair?.classList.remove('occupied');chair?.classList.add('active','pulled');
  say(CHARACTERS[id].label,'Sliding the chair back…');
  setTimeout(()=>{
    dining.seated[id]=null;pose[id]='idle';positions[id]=[...seat.stand];
    actor?.classList.remove('dining-seated','dining-facing-table');renderActors();
    say(CHARACTERS[id].label,'Standing up…');
  },480);
  setTimeout(()=>{
    positions[id]=[...seat.approach];renderActors();
    chair?.classList.remove('pulled');chair?.classList.add('pushing');
  },780);
  setTimeout(()=>{
    actor?.classList.remove('dining-standing');
    chair?.classList.remove('active','pushing','reserved');
    dining.occupancy[seatId]=null;dining.busy=false;syncDiningVisuals();
    persistRoomPositions();saveState(state);
    say(CHARACTERS[id].label,'Chair pushed neatly back ♡');
    toast('Dining chair is FREE');
    onDone?.();
  },1160);
}
function openDining(){
  if(!state.preparedMeals.length){
    openModal(`<h2>Dining Table</h2><p class="modal-sub">There is no prepared food yet.</p><button class="primary" id="go-cook" style="padding:12px 24px">Cook something</button><button class="small-button secondary" id="back-sit" style="margin-left:8px">Dining Sit</button>`);
    $('#go-cook').onclick=()=>{closeModal();openCooking()};
    $('#back-sit').onclick=()=>{closeModal();openDiningHub()};
    return
  }
  const cards=state.preparedMeals.map(m=>`<div class="meal-card"><img src="${m.img}" alt=""><div class="grow"><b>${m.label}</b><small>${m.quality} · ${m.servings} serving${m.servings===1?'':'s'}</small></div><button class="small-button" data-eat="${m.id}" data-together="0">Eat</button><button class="small-button secondary" data-eat="${m.id}" data-together="1" ${m.servings<2?'disabled':''}>Eat Together</button></div>`).join('');
  openModal(`<h2>Dinner at Home ♡</h2><p class="modal-sub">Dining Sit 2.0 requires characters to physically sit before eating. Eating animation itself will be upgraded in the next milestone.</p><div class="meal-list">${cards}</div><button class="small-button secondary" id="back-sit" style="margin-top:12px">Back to Dining Sit</button>`);
  $$('[data-eat]').forEach(b=>b.addEventListener('click',()=>eatMeal(b.dataset.eat,b.dataset.together==='1')));
  $('#back-sit').onclick=()=>{closeModal();openDiningHub()};
}
function eatMeal(id,together){
  const m=state.preparedMeals.find(x=>x.id===id);if(!m)return;
  const activeSeated=!!dining.seated[state.active],partnerSeated=!!dining.seated[partnerId()];
  if(!activeSeated){toast('Sit at the dining table first.');closeModal();openDiningHub();return}
  if(together&&!partnerSeated){toast(`Switch to ${partnerLabel()} and seat them first.`);closeModal();openDiningHub();return}
  const portions=together?2:1;if(m.servings<portions)return;
  closeModal();m.servings-=portions;state.dirtyDishes+=portions;adjustNeed(state,state.active,'hunger',35);
  if(together){adjustNeed(state,partnerId(),'hunger',35);addLove(state,6)}
  if(m.servings<=0)state.preparedMeals=state.preparedMeals.filter(x=>x.id!==id);
  say(activeLabel(),`${m.label} — ${m.quality.toLowerCase()} ♡`);
  toast(`${together?'Eating together':'Eating'} · Dirty dishes +${portions}`);
  renderActors();renderHUD();saveState(state);
  setTimeout(()=>{if(dining.seated.elyn)pose.elyn='sit';if(dining.seated.shawn)pose.shawn='sit';renderActors()},3200)
}

function openDishwashing(){
  if(state.dirtyDishes<=0){toast('No dirty dishes right now ♡');return}
  openModal(`<h2>Wash Dishes 🫧</h2><p class="modal-sub">Scrub across the plate until it is clean. ${state.dirtyDishes} dirty dish${state.dirtyDishes===1?'':'es'} remaining.</p><div class="dishwash"><div class="plate-wash" id="plate-wash"><div class="wash-foam" id="wash-foam"></div><div class="sponge" id="sponge"></div></div><b id="wash-progress">0%</b></div>`,false);
  const plate=$('#plate-wash'),sponge=$('#sponge'),foam=$('#wash-foam'),label=$('#wash-progress');let last=null,dist=0;
  plate.addEventListener('pointermove',e=>{if(e.buttons===0&&e.pointerType==='mouse')return;const r=plate.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;sponge.style.left=Math.max(0,Math.min(r.width-65,x-32))+'px';sponge.style.top=Math.max(0,Math.min(r.height-42,y-21))+'px';if(last)dist+=Math.hypot(x-last[0],y-last[1]);last=[x,y];const pct=Math.min(100,Math.round(dist/950*100));label.textContent=pct+'%';foam.style.opacity=pct/100;if(pct>=100){state.dirtyDishes--;saveState(state);toast('One dish is clean ✓');setTimeout(()=>{closeModal();renderHUD();if(state.dirtyDishes>0)openDishwashing()},450)}});plate.addEventListener('pointerdown',e=>{plate.setPointerCapture?.(e.pointerId);last=null});
}

function openMenu(){
  openModal(`<h2>Home Menu</h2><p class="modal-sub">Recovered portable build controls.</p><div class="menu-sheet"><button class="menu-tile" data-menu="fridge"><b>🧊 Fridge</b><small>Organize food</small></button><button class="menu-tile" data-menu="cook"><b>🍳 Recipes</b><small>Cooking minigames</small></button><button class="menu-tile" data-menu="dining"><b>🍽️ Dining Sit</b><small>${state.preparedMeals.length} prepared · physical chairs</small></button><button class="menu-tile" data-menu="save"><b>💾 Save</b><small>Local autosave</small></button><button class="menu-tile" data-menu="reset"><b>↺ Reset</b><small>Start over</small></button></div><p class="debug-note">Movement + Collision 1.0 + Dining Sit 2.0: physical chair occupancy, pull/sit/stand/push sequence, seated movement lock, and two independent dining seats.</p>`);
  $$('[data-menu]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.menu;if(a==='save'){saveState(state);closeModal()}else if(a==='reset'){if(confirm('Reset local game progress?')){state=resetState();location.reload()}}else{closeModal();({fridge:openFridge,cook:openCooking,dining:openDiningHub}[a])()}}));
}

function openModal(html,wide=false,withClose=true){
  modalRoot.innerHTML=`<div class="modal-backdrop"><section class="modal ${wide?'wide':''}">${withClose?'<button class="close-modal" aria-label="Close">×</button>':''}${html}</section></div>`;
  modalRoot.querySelector('.close-modal')?.addEventListener('click',closeModal);
  modalRoot.querySelector('.modal-backdrop')?.addEventListener('click',e=>{if(e.target===e.currentTarget&&withClose)closeModal()});
}
function closeModal(){modalRoot.innerHTML=''}
function say(name,text){$('#dialogue-name').textContent=name;$('#dialogue-text').textContent=text;state.lastAction=text}
function toast(text){const t=$('#toast');t.textContent=text;t.classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.add('hidden'),2200)}
function showSaved(){const el=$('#saved-indicator');el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1100)}
function decayNeeds(){if(!state.started)return;['elyn','shawn'].forEach(id=>{adjustNeed(state,id,'hunger',-1);adjustNeed(state,id,'energy',-1)});renderHUD();saveState(state)}
function beginPetRoam(){clearInterval(petTimer);petTimer=setInterval(()=>{if(!state.started||modalRoot.children.length||movement.moving)return;['momo','mochi'].forEach(id=>{const p=positions[id]||[50,84],candidate=[p[0]+(Math.random()-.5)*10,p[1]+(Math.random()-.5)*5],safe=nearestWalkable(roomNav(),candidate,[]);if(safe&&segmentIsClear(roomNav(),p,safe,[]))positions[id]=safe});renderPets()},3500)}

init();
