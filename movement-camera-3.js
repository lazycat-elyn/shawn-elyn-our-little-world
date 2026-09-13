(function(){
  'use strict';

  const VERSION='3.0';
  const PRESSED=new Set();
  const VELOCITY={elyn:{x:0,y:0},shawn:{x:0,y:0}};
  const CLICK_TARGET={elyn:null,shawn:null};
  const LAST_DIR={elyn:'down',shawn:'down'};
  const LAST_MOVE_AT={elyn:0,shawn:0};
  const LAST_NET_AT={elyn:0,shawn:0};
  const BOUNDS={xMin:14,xMax:88,yMin:32,yMax:86};
  const WALK_SPEED=12.5;
  const RUN_SPEED=20.5;
  const ACCEL=10.5;
  const STOP_EPS=.16;
  const PROXIMITY_RADIUS=9.5;
  const CAMERA_MAX_X=18;
  const CAMERA_MAX_Y=9;
  const SAVE_INTERVAL=650;
  let lastFrame=0,lastSave=0,lastRoom='',legacyKeyboard=null;
  let cameraX=0,cameraY=0,cameraEnabled=true;
  let proximity=null,controlHud=null,quickMenu=null;

  function safe(fn,fallback){try{return fn()}catch(_){return fallback}}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function dist(a,b){return Math.hypot(a[0]-b[0],a[1]-b[1])}
  function isGameVisible(){const g=document.querySelector('#gameScreen');return !!g&&!g.classList.contains('hidden')}
  function isTyping(){const a=document.activeElement;return !!a&&(['INPUT','TEXTAREA','SELECT'].includes(a.tagName)||a.isContentEditable)}
  function actorPosition(id){return safe(()=>getPos(id),[50,75])}
  function setActorPosition(id,p){safe(()=>setPos(id,p));}
  function activeHuman(){return state.active==='shawn'?'shawn':'elyn'}

  function prefLoad(){
    try{const p=JSON.parse(localStorage.getItem('movementCamera3Prefs')||'{}');cameraEnabled=p.camera!==false}catch(_){cameraEnabled=true}
  }
  function prefSave(){try{localStorage.setItem('movementCamera3Prefs',JSON.stringify({camera:cameraEnabled}))}catch(_){}}

  function normalizeKey(e){return e.key.length===1?e.key.toLowerCase():e.key}
  function onKeyDown(e){
    if(isTyping())return;
    const k=normalizeKey(e);
    if(['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Shift','e'].includes(k)){
      if(k==='e'&&!e.repeat){e.preventDefault();activateNearest();return}
      PRESSED.add(k);
      if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(k))e.preventDefault();
    }
  }
  function onKeyUp(e){PRESSED.delete(normalizeKey(e))}

  function controlsFor(id){
    if(state.playMode==='localCoop'){
      return id==='elyn'?{left:'a',right:'d',up:'w',down:'s'}:{left:'ArrowLeft',right:'ArrowRight',up:'ArrowUp',down:'ArrowDown'};
    }
    if(state.playMode==='room'){
      const mine=state.netRole||activeHuman();
      if(id!==mine)return null;
      return {left:['a','ArrowLeft'],right:['d','ArrowRight'],up:['w','ArrowUp'],down:['s','ArrowDown']};
    }
    if(id!==activeHuman())return null;
    return {left:['a','ArrowLeft'],right:['d','ArrowRight'],up:['w','ArrowUp'],down:['s','ArrowDown']};
  }
  function down(binding){return Array.isArray(binding)?binding.some(k=>PRESSED.has(k)):PRESSED.has(binding)}

  function objectBlockers(id){
    const blocks=[];
    const room=safe(()=>ROOMS[state.room],null);
    if(room&&Array.isArray(room.hotspots))room.hotspots.forEach(h=>{
      if(!h.objectHit||!h.w||!h.h)return;
      blocks.push({type:'rect',x1:h.x-1.2,y1:h.y-1.2,x2:h.x+h.w+1.2,y2:h.y+h.h+1.2});
    });
    const other=id==='elyn'?'shawn':'elyn';
    const op=actorPosition(other);blocks.push({type:'ellipse',x:op[0],y:op[1],rx:4.2,ry:4.8});
    ['dudu','bubu'].forEach(pet=>{const p=actorPosition(pet);blocks.push({type:'ellipse',x:p[0],y:p[1],rx:2.7,ry:2.6})});
    return blocks;
  }
  function collides(id,p){
    if(p[0]<BOUNDS.xMin||p[0]>BOUNDS.xMax||p[1]<BOUNDS.yMin||p[1]>BOUNDS.yMax)return true;
    return objectBlockers(id).some(b=>{
      if(b.type==='rect')return p[0]>b.x1&&p[0]<b.x2&&p[1]>b.y1&&p[1]<b.y2;
      const dx=(p[0]-b.x)/b.rx,dy=(p[1]-b.y)/b.ry;return dx*dx+dy*dy<1;
    });
  }
  function slideMove(id,from,next){
    if(!collides(id,next))return next;
    const xOnly=[next[0],from[1]];if(!collides(id,xOnly))return xOnly;
    const yOnly=[from[0],next[1]];if(!collides(id,yOnly))return yOnly;
    return from;
  }

  function setMovementVisual(id,movingNow,running,dir){
    const el=document.querySelector('#'+id);if(!el)return;
    el.classList.toggle('movement3-moving',movingNow);
    el.classList.toggle('movement3-running',movingNow&&running);
    if(movingNow&&dir){LAST_DIR[id]=dir;safe(()=>setHumanSprite(id,dir));LAST_MOVE_AT[id]=performance.now()}
    else if(performance.now()-LAST_MOVE_AT[id]>90)safe(()=>setHumanSprite(id,'idle'));
  }

  function directionFrom(vx,vy){
    if(Math.abs(vx)>Math.abs(vy))return vx<0?'left':'right';
    return vy<0?'up':'down';
  }

  function sendNetworkMove(id,p,dir,now){
    if(state.playMode!=='room'||state.netRole!==id||typeof netSend!=='function')return;
    if(now-LAST_NET_AT[id]<80)return;
    LAST_NET_AT[id]=now;safe(()=>netSend({type:'move',actor:id,pos:p,dir}));
  }

  function updateActor(id,dt,now){
    const ctl=controlsFor(id);if(!ctl){VELOCITY[id].x=0;VELOCITY[id].y=0;return}
    let ix=0,iy=0;
    if(down(ctl.left))ix-=1;if(down(ctl.right))ix+=1;if(down(ctl.up))iy-=1;if(down(ctl.down))iy+=1;
    const target=CLICK_TARGET[id];
    if(!ix&&!iy&&target){
      const p=actorPosition(id),dx=target[0]-p[0],dy=target[1]-p[1],d=Math.hypot(dx,dy);
      if(d<.7){CLICK_TARGET[id]=null}else{ix=dx/d;iy=dy/d}
    }else if(ix||iy){CLICK_TARGET[id]=null}
    if(ix||iy){const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l}
    const running=PRESSED.has('Shift')&&(ix||iy);
    const speed=running?RUN_SPEED:WALK_SPEED;
    const tvx=ix*speed,tvy=iy*speed*.82;
    const blend=Math.min(1,dt*ACCEL);
    VELOCITY[id].x+=(tvx-VELOCITY[id].x)*blend;
    VELOCITY[id].y+=(tvy-VELOCITY[id].y)*blend;
    if(!ix&&!iy){const damp=Math.max(0,1-dt*11);VELOCITY[id].x*=damp;VELOCITY[id].y*=damp}
    const vx=VELOCITY[id].x,vy=VELOCITY[id].y;
    const movingNow=Math.hypot(vx,vy)>STOP_EPS;
    if(!movingNow){VELOCITY[id].x=VELOCITY[id].y=0;setMovementVisual(id,false,false,null);return}
    const from=actorPosition(id),candidate=[from[0]+vx*dt,from[1]+vy*dt],next=slideMove(id,from,candidate);
    if(next[0]===from[0]&&next[1]===from[1]){VELOCITY[id].x*=.25;VELOCITY[id].y*=.25;CLICK_TARGET[id]=null}
    setActorPosition(id,next);
    const dir=directionFrom(vx,vy);setMovementVisual(id,true,running,dir);sendNetworkMove(id,next,dir,now);
  }

  function updateCamera(dt){
    const scene=document.querySelector('#scene');if(!scene)return;
    if(!cameraEnabled){cameraX+=(0-cameraX)*Math.min(1,dt*7);cameraY+=(0-cameraY)*Math.min(1,dt*7)}
    else{
      const p=actorPosition(activeHuman());
      const desiredX=clamp((50-p[0])*.72,-CAMERA_MAX_X,CAMERA_MAX_X);
      const desiredY=clamp((67-p[1])*.40,-CAMERA_MAX_Y,CAMERA_MAX_Y);
      const k=Math.min(1,dt*4.8);cameraX+=(desiredX-cameraX)*k;cameraY+=(desiredY-cameraY)*k;
    }
    scene.style.setProperty('--m3-cam-x',cameraX.toFixed(2)+'px');
    scene.style.setProperty('--m3-cam-y',cameraY.toFixed(2)+'px');
    scene.classList.toggle('movement3-camera-on',cameraEnabled);
  }

  function nearestCandidate(){
    const id=activeHuman(),p=actorPosition(id),room=safe(()=>ROOMS[state.room],null);let best=null;
    if(room&&Array.isArray(room.hotspots))room.hotspots.forEach(h=>{
      const hp=[h.x+(h.w||0)/2,h.y+(h.h||0)/2],d=dist(p,hp);
      if(d<=PROXIMITY_RADIUS&&(!best||d<best.distance))best={kind:'hotspot',distance:d,x:hp[0],y:hp[1],label:h.label,action:h.action};
    });
    const partner=id==='elyn'?'shawn':'elyn',pp=actorPosition(partner),pd=dist(p,pp);
    if(pd<=7.8&&(!best||pd<best.distance))best={kind:'partner',distance:pd,x:pp[0],y:pp[1]-5,label:partner==='shawn'?'Shawn':'Elyn',id:partner};
    ['dudu','bubu'].forEach(pet=>{const pp2=actorPosition(pet),d=dist(p,pp2);if(d<=6.4&&(!best||d<best.distance))best={kind:'pet',distance:d,x:pp2[0],y:pp2[1]-4,label:pet==='dudu'?'Dudu':'Bubu',id:pet}});
    return best;
  }

  function ensureProximity(){
    if(proximity&&proximity.isConnected)return proximity;
    proximity=document.createElement('button');proximity.id='movement3Proximity';proximity.className='movement3-proximity';proximity.type='button';proximity.hidden=true;proximity.addEventListener('click',e=>{e.stopPropagation();activateNearest()});
    document.querySelector('#scene')?.appendChild(proximity);return proximity;
  }
  function refreshProximity(){
    const b=ensureProximity(),c=nearestCandidate();if(!b)return;
    if(!isGameVisible()||!c){b.hidden=true;b._candidate=null;return}
    b._candidate=c;b.hidden=false;b.style.left=c.x+'%';b.style.top=c.y+'%';
    b.innerHTML=c.kind==='hotspot'?`<span>${c.label}</span><kbd>E</kbd>`:c.kind==='partner'?`<span>♡ ${c.label}</span><kbd>E</kbd>`:`<span>🐾 ${c.label}</span><kbd>E</kbd>`;
  }

  function closeQuickMenu(){quickMenu?.remove();quickMenu=null}
  function openPartnerMenu(c){
    closeQuickMenu();quickMenu=document.createElement('div');quickMenu.className='movement3-quick-menu';quickMenu.innerHTML=`<button data-m3="talk">💬 聊天</button><button data-m3="hug">♡ 抱抱</button>`;
    document.querySelector('#scene')?.appendChild(quickMenu);quickMenu.style.left=c.x+'%';quickMenu.style.top=(c.y+5)+'%';
    quickMenu.querySelector('[data-m3="talk"]').onclick=e=>{e.stopPropagation();safe(()=>{say(activeName(),`和 ${c.label} 聊了一会儿 ♡`);adjustNeeds(state.active,{mood:+4});recordEvent('coupleTalk',1);toast('聊天 ♡')});closeQuickMenu()};
    quickMenu.querySelector('[data-m3="hug"]').onclick=e=>{e.stopPropagation();safe(()=>interact('hug'));closeQuickMenu()};
  }
  function activateNearest(){
    const c=nearestCandidate();if(!c)return;
    CLICK_TARGET[activeHuman()]=null;
    if(c.kind==='hotspot'){safe(()=>interact(c.action));return}
    if(c.kind==='partner'){openPartnerMenu(c);return}
    if(c.kind==='pet'){
      safe(()=>petAction(c.id,'happy',1600));safe(()=>adjustNeeds(c.id,{mood:+5}));safe(()=>toast(`摸摸 ${c.label} ♡`));
    }
  }

  function ensureHud(){
    if(controlHud&&controlHud.isConnected)return;
    controlHud=document.createElement('div');controlHud.id='movement3Hud';controlHud.className='movement3-hud';
    controlHud.innerHTML=`<div><b>自由移动</b><span>WASD / 方向键 · Shift 跑 · E 互动 · 点击也可走</span></div><button id="movement3CameraToggle" type="button">镜头跟随</button>`;
    document.querySelector('#gameScreen')?.appendChild(controlHud);
    controlHud.querySelector('#movement3CameraToggle').onclick=()=>{cameraEnabled=!cameraEnabled;prefSave();updateHud()};updateHud();
  }
  function updateHud(){const b=document.querySelector('#movement3CameraToggle');if(b)b.textContent=cameraEnabled?'镜头跟随 ✓':'镜头跟随 ×'}

  function clickToWalk(e){
    if(!isGameVisible()||e.button!==0)return;
    if(e.target.closest('.hotspot,.movement3-proximity,.movement3-quick-menu,.actor,.pet-sprite,button,input,textarea,select'))return;
    const scene=document.querySelector('#scene');if(!scene)return;
    e.stopImmediatePropagation();e.preventDefault();closeQuickMenu();
    const r=scene.getBoundingClientRect();
    const x=clamp((e.clientX-r.left-cameraX)/r.width*100,BOUNDS.xMin,BOUNDS.xMax);
    const y=clamp((e.clientY-r.top-cameraY)/r.height*100,BOUNDS.yMin,BOUNDS.yMax);
    if(!collides(activeHuman(),[x,y]))CLICK_TARGET[activeHuman()]=[x,y];
  }

  function roomChanged(){
    if(lastRoom===state.room)return;lastRoom=state.room;CLICK_TARGET.elyn=CLICK_TARGET.shawn=null;closeQuickMenu();
    const scene=document.querySelector('#scene');if(scene){scene.classList.add('movement3-enabled');scene.style.setProperty('--m3-cam-x','0px');scene.style.setProperty('--m3-cam-y','0px')}
  }

  function frame(ts){
    if(!lastFrame)lastFrame=ts;const dt=Math.min(.04,(ts-lastFrame)/1000);lastFrame=ts;
    if(isGameVisible()&&!isTyping()){
      updateActor('elyn',dt,ts);updateActor('shawn',dt,ts);updateCamera(dt);refreshProximity();roomChanged();
      if(ts-lastSave>SAVE_INTERVAL&&(Math.hypot(VELOCITY.elyn.x,VELOCITY.elyn.y)>.1||Math.hypot(VELOCITY.shawn.x,VELOCITY.shawn.y)>.1)){lastSave=ts;safe(()=>save())}
    }else{setMovementVisual('elyn',false,false,null);setMovementVisual('shawn',false,false,null)}
    requestAnimationFrame(frame);
  }

  function disableLegacyKeyboard(){
    try{legacyKeyboard=moveKeyboardActor;moveKeyboardActor=function(){}}catch(_){legacyKeyboard=null}
  }

  function init(){
    if(typeof state==='undefined'||typeof ROOMS==='undefined')return;
    prefLoad();disableLegacyKeyboard();ensureHud();ensureProximity();
    const scene=document.querySelector('#scene');if(scene){scene.classList.add('movement3-enabled');scene.addEventListener('click',clickToWalk,true)}
    document.addEventListener('keydown',onKeyDown,true);document.addEventListener('keyup',onKeyUp,true);window.addEventListener('blur',()=>PRESSED.clear());
    requestAnimationFrame(frame);
    window.MOVEMENT_CAMERA_3={version:VERSION,get camera(){return cameraEnabled},toggleCamera(){cameraEnabled=!cameraEnabled;prefSave();updateHud()},nearest:nearestCandidate,legacyKeyboard};
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
