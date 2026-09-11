(()=>{
'use strict';

/* Integrated True 3D Living Room v1
   Test branch only. Keeps the original HUD / tasks / coins / chat / room tabs.
   Only the living-room scene becomes real Three.js 3D. */

const ROOM='living';
let THREE=null;
let mounted=false, booting=false, root=null, canvas=null, renderer=null, world=null, camera=null, raycaster=null, floor=null;
let frame=0, lastTime=0, lastSave=0, yaw=.18, distance=7.7, camHeight=3.45;
let obstacles=[], interactables=[], keys=new Set(), moveTarget=null, avatars={}, pets={}, labels={};
let pointerDown=null;

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const q=s=>document.querySelector(s);
const stateRef=()=>typeof state!=='undefined'?state:null;

function coreSave(){try{if(typeof save==='function')save()}catch(_){} }
function toast3d(t){try{if(typeof toast==='function')toast(t)}catch(_){console.log(t)} }

function ensure3DState(){
  const s=stateRef(); if(!s)return;
  s.true3dLiving=s.true3dLiving||{
    elyn:{x:-1.35,z:2.65},
    shawn:{x:2.35,z:2.25},
    dudu:{x:-3.4,z:2.9},
    bubu:{x:4.1,z:2.7},
    yaw:.18,distance:7.7
  };
  yaw=Number.isFinite(s.true3dLiving.yaw)?s.true3dLiving.yaw:.18;
  distance=Number.isFinite(s.true3dLiving.distance)?s.true3dLiving.distance:7.7;
}

function addObstacle(x,z,w,d,pad=.18,name='furniture'){
  obstacles.push({minX:x-w/2-pad,maxX:x+w/2+pad,minZ:z-d/2-pad,maxZ:z+d/2+pad,name});
}
function addInteraction(name,x,z,radius,action){interactables.push({name,x,z,radius,action});}
function canStand(x,z){
  const r=.32;
  if(x<-7.65+r||x>7.65-r||z<-4.85+r||z>4.75-r)return false;
  for(const o of obstacles){if(x+r>o.minX&&x-r<o.maxX&&z+r>o.minZ&&z-r<o.maxZ)return false;}
  return true;
}

async function loadThree(){
  if(THREE)return THREE;
  const mod=await import('https://unpkg.com/three@0.167.1/build/three.module.js');
  THREE=mod; return THREE;
}

function mat(color,rough=.72,metal=.02){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});}
function physical(color,rough=.7){return new THREE.MeshPhysicalMaterial({color,roughness:rough,sheen:.22,sheenColor:new THREE.Color(0xffeadf)});}
function box(w,h,d,m,pos=[0,0,0],rot=[0,0,0],parent=world){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(...pos);mesh.rotation.set(...rot);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function cyl(r1,r2,h,m,pos=[0,0,0],rot=[0,0,0],parent=world,seg=24){
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),m);mesh.position.set(...pos);mesh.rotation.set(...rot);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function sph(r,m,pos=[0,0,0],scale=[1,1,1],parent=world){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,24,18),m);mesh.position.set(...pos);mesh.scale.set(...scale);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}

function canvasTexture(draw,w=1024,h=1024){
  const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function woodTexture(){
  const t=canvasTexture((g,w,h)=>{g.fillStyle='#a9784f';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=70){g.fillStyle=`rgba(77,42,24,${.10+Math.random()*.08})`;g.fillRect(0,y+64,w,4);for(let k=0;k<9;k++){g.strokeStyle='rgba(255,230,198,.08)';g.beginPath();g.moveTo(0,y+8+k*5);g.bezierCurveTo(w*.35,y+2+k*5,w*.62,y+15+k*4,w,y+7+k*5);g.stroke();}}});t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4.2,2.7);return t;
}
function rugTexture(){return canvasTexture((g,w,h)=>{g.fillStyle='#b9a38d';g.fillRect(0,0,w,h);g.strokeStyle='rgba(81,62,48,.28)';g.lineWidth=10;for(let i=0;i<5;i++)g.strokeRect(30+i*22,30+i*18,w-60-i*44,h-60-i*36);g.strokeStyle='rgba(247,231,211,.52)';g.lineWidth=4;for(let x=70;x<w-60;x+=80){g.beginPath();g.moveTo(x,130);g.lineTo(x+34,170);g.lineTo(x,210);g.lineTo(x-34,170);g.closePath();g.stroke();}},900,600)}
function sunsetTexture(){return canvasTexture((g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#75689b');gr.addColorStop(.28,'#e48f8b');gr.addColorStop(.55,'#f6bb7a');gr.addColorStop(1,'#52627d');g.fillStyle=gr;g.fillRect(0,0,w,h);g.fillStyle='#fff0aa';g.beginPath();g.arc(w*.72,h*.30,54,0,Math.PI*2);g.fill();g.fillStyle='#735e74';g.beginPath();g.moveTo(0,h*.56);for(let x=0;x<=w;x+=120)g.lineTo(x,h*.48+Math.sin(x*.009)*55);g.lineTo(w,h*.69);g.lineTo(0,h*.69);g.fill();g.fillStyle='#56627c';g.fillRect(0,h*.65,w,h*.35);g.fillStyle='rgba(255,206,125,.5)';for(let i=0;i<34;i++)g.fillRect(w*.55+Math.random()*w*.34,h*.69+Math.random()*h*.18,30+Math.random()*90,2+Math.random()*4);},1400,820)}

function buildRoom(){
  obstacles=[];interactables=[];
  world.background=new THREE.Color(0xe8c29e);world.fog=new THREE.Fog(0xc99572,18,34);
  const oak=mat(0xa36d43,.58), darkOak=mat(0x68412c,.62), cream=physical(0xeadfce,.78), sage=physical(0x68755d,.82), white=mat(0xf2e9df,.84), black=mat(0x171515,.34,.12), green=mat(0x4d744d,.86), gold=mat(0xc49b60,.36,.55);
  const floorMat=new THREE.MeshStandardMaterial({map:woodTexture(),roughness:.6,metalness:.02});
  floor=new THREE.Mesh(new THREE.PlaneGeometry(17.5,11),floorMat);floor.rotation.x=-Math.PI/2;floor.position.y=0;floor.receiveShadow=true;floor.userData.floor=true;world.add(floor);
  box(17.5,5.2,.25,white,[0,2.6,-5.48]);box(.25,5.2,11,white,[-8.62,2.6,0]);box(.25,5.2,11,white,[8.62,2.6,0]);
  box(17.5,.15,11,mat(0xe7d4c0,.95),[0,5.25,0]);

  // wide sunset windows
  box(14.4,4.25,.08,new THREE.MeshBasicMaterial({map:sunsetTexture(),toneMapped:false}),[1.0,2.55,-5.64]);
  for(const x of [-6.2,-3.65,-1.1,1.45,4.0,6.55,8.05])box(.10,4.55,.18,darkOak,[x,2.55,-5.46]);
  for(const y of [.35,2.55,4.75])box(14.7,.10,.18,darkOak,[1.0,y,-5.46]);

  // curtains
  const curtain=physical(0xe6cfb6,.92);for(const x of [-6.55,8.15])for(let i=0;i<7;i++)cyl(.105,.14,4.3,curtain,[x+(x<0?i*.10:-i*.10),2.4,-5.25]);

  // staircase and entry zone
  for(let i=0;i<8;i++)box(2.35,.18+i*.18,.62,oak,[-6.6,.10+i*.18,-3.45+i*.55]);
  box(2.0,3.2,.20,darkOak,[-5.55,1.62,-4.9]);
  addObstacle(-6.2,-2.0,2.9,4.2,.08,'stairs');

  // rug
  const rug=new THREE.Mesh(new THREE.PlaneGeometry(7.0,4.7),new THREE.MeshStandardMaterial({map:rugTexture(),roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(1.15,.025,.55);rug.receiveShadow=true;world.add(rug);

  // TV console
  const tvg=new THREE.Group();tvg.position.set(-5.35,0,-1.15);world.add(tvg);box(3.45,.84,.72,oak,[0,.55,0],[0,0,0],tvg);box(3.25,.08,.72,darkOak,[0,.98,0],[0,0,0],tvg);box(3.15,1.95,.13,black,[0,2.06,-.02],[0,0,0],tvg);box(2.92,1.68,.025,mat(0x44545c,.22),[0,2.06,.06],[0,0,0],tvg);for(let x=-1.1;x<=1.1;x+=1.1)box(.82,.30,.04,mat(0x85563b,.7),[x,.57,.38],[0,0,0],tvg);addObstacle(-5.35,-1.15,3.7,1.05,.12,'tv');addInteraction('电视',-4.8,.05,1.25,'tv');

  // L sofa
  const sg=new THREE.Group();sg.position.set(2.85,0,-1.45);world.add(sg);box(5.3,.50,1.55,cream,[0,.48,0],[0,0,0],sg);box(1.65,.50,3.65,cream,[1.95,.48,1.05],[0,0,0],sg);box(5.3,1.25,.34,cream,[0,1.17,-.62],[-.05,0,0],sg);box(.35,1.13,1.62,cream,[-2.50,1.0,0],[0,0,0],sg);box(.35,1.13,3.65,cream,[2.58,1.0,1.05],[0,0,0],sg);
  const cushions=[[-1.55,1.25,-.35,sage],[-.72,1.24,-.35,mat(0x69715a,.8)],[.18,1.28,-.35,white],[1.05,1.24,-.35,sage],[2.12,1.24,.28,mat(0x7f725f,.8)],[2.16,1.24,1.15,sage]];for(const [x,y,z,m] of cushions)box(.72,.68,.20,m,[x,y,z],[-.08,0,(Math.random()-.5)*.08],sg);
  sph(.40,white,[.12,1.36,-.50],[1.08,.82,.38],sg);sph(.14,mat(0xdfa84b,.75),[.12,1.36,-.70],[1,1,.3],sg);
  addObstacle(2.85,-.65,5.75,4.25,.05,'sofa');addInteraction('L 型沙发',.25,-.25,1.35,'sit');

  // coffee table
  const cg=new THREE.Group();cg.position.set(.75,0,1.15);world.add(cg);box(3.15,.20,1.48,oak,[0,.73,0],[0,0,0],cg);for(const [x,z] of [[-1.35,-.55],[1.35,-.55],[-1.35,.55],[1.35,.55]])box(.15,.70,.15,darkOak,[x,.36,z],[0,0,0],cg);box(1.05,.11,.70,mat(0x5c4538,.8),[-.70,.90,.12],[0,0,0],cg);cyl(.17,.20,.34,white,[.65,1.00,-.12],[0,0,0],cg);for(let i=0;i<11;i++)sph(.075,mat(i%2?0xf3eee2:0xe0ae65,.9),[.35+(Math.random()-.5)*.6,1.12,-.05+(Math.random()-.5)*.35],[1,1.45,1],cg);addObstacle(.75,1.15,3.45,1.8,.13,'coffee table');

  // bookcase
  const bg=new THREE.Group();bg.position.set(7.15,0,-1.35);world.add(bg);box(1.72,4.25,.50,darkOak,[0,2.12,0],[0,0,0],bg);for(let y=.34;y<4.0;y+=.78)box(1.54,.08,.66,oak,[0,y,.10],[0,0,0],bg);for(let shelf=0;shelf<5;shelf++){let x=-.56;for(let i=0;i<5;i++){const h=.32+Math.random()*.20;box(.12+Math.random()*.08,h,.28,mat([0x8f5544,0xc1a06c,0x617052,0x63527a][(i+shelf)%4],.8),[x,.57+shelf*.78,.22],[0,0,(Math.random()-.5)*.07],bg);x+=.25;}}
  addObstacle(7.15,-1.35,1.9,1.0,.10,'bookcase');

  // lamp
  cyl(.31,.38,.10,darkOak,[5.6,.06,1.05]);cyl(.055,.07,2.15,gold,[5.6,1.12,1.05]);const shade=new THREE.Mesh(new THREE.ConeGeometry(.56,.76,28,1,true),new THREE.MeshStandardMaterial({color:0xf1ddba,roughness:.7,side:THREE.DoubleSide,emissive:0x7d4f20,emissiveIntensity:.12}));shade.position.set(5.6,2.30,1.05);world.add(shade);addObstacle(5.6,1.05,.7,.7,.08,'lamp');

  // plants
  plant(-3.4,-3.75,.9);plant(6.4,2.25,.72);plant(7.4,3.55,.55);
  // side console + decor
  box(1.9,.78,.75,oak,[-6.65,.45,2.55]);box(1.72,.07,.72,darkOak,[-6.65,.86,2.55]);plant(-6.8,2.35,.42);addObstacle(-6.65,2.55,2.1,1.0,.10,'console');

  // lights
  world.add(new THREE.HemisphereLight(0xffe8d1,0x5a4338,1.45));
  const sun=new THREE.DirectionalLight(0xffbf87,3.2);sun.position.set(-3,7,-4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;world.add(sun);
  const warm=new THREE.PointLight(0xffbd76,28,8,2);warm.position.set(5.6,2.35,1.1);warm.castShadow=true;world.add(warm);
  const fill=new THREE.PointLight(0xffd2ad,18,10,2);fill.position.set(-4.5,3.3,1.8);world.add(fill);

  function plant(x,z,s=.65){const g=new THREE.Group();g.position.set(x,0,z);world.add(g);cyl(.28*s,.36*s,.55*s,mat(0xa46c44,.9),[0,.28*s,0],[0,0,0],g);for(let i=0;i<12;i++){const a=i/12*Math.PI*2,r=.18+Math.random()*.22;sph(.23*s,green,[Math.cos(a)*r*s,.72*s+Math.random()*.55*s,Math.sin(a)*r*s],[.65,1.35,.42],g);}addObstacle(x,z,.75*s,.75*s,.05,'plant');}
}

function makeAvatar(kind){
  const g=new THREE.Group();
  const skin=mat(0xffd8c5,.86), hair=mat(kind==='elyn'?0x30221d:0x241f1d,.82), top=physical(kind==='elyn'?0xf3aab3:0x8db0dc,.72), dark=mat(0x30323a,.78), white=mat(0xf6f2ed,.82);
  sph(.52,skin,[0,1.88,0],[1,1.05,.95],g);
  // hair cap and side volume
  sph(.55,hair,[0,2.04,-.03],[1.03,.92,.98],g);
  if(kind==='elyn'){
    for(let i=0;i<12;i++){const a=(i/11-.5)*2.5;sph(.20,hair,[Math.sin(a)*.50,1.62+Math.cos(a)*.17,-.02+Math.cos(a)*.17],[.85,1.8,.85],g);}
    box(.64,.66,.36,top,[0,1.12,0],[0,0,0],g);box(.76,.34,.42,mat(0x29262c,.82),[0,.74,0],[0,0,0],g);
  }else{
    for(let i=0;i<13;i++){const a=i/13*Math.PI*2;sph(.19,hair,[Math.cos(a)*.43,2.34+Math.sin(a)*.12,Math.sin(a)*.30],[1,1.15,1],g);}
    box(.66,.70,.38,top,[0,1.12,0],[0,0,0],g);box(.68,.45,.40,white,[0,1.13,.22],[0,0,0],g);
    // glasses
    const glass=mat(0x221f1e,.32,.18);cyl(.22,.22,.035,glass,[-.23,1.93,.46],[Math.PI/2,0,0],g,20);cyl(.22,.22,.035,glass,[.23,1.93,.46],[Math.PI/2,0,0],g,20);box(.12,.04,.04,glass,[0,1.93,.47],[0,0,0],g);
  }
  const armL=box(.16,.62,.16,top,[-.44,1.14,0],[0,0,.04],g),armR=box(.16,.62,.16,top,[.44,1.14,0],[0,0,-.04],g);
  const legL=box(.18,.66,.20,dark,[-.19,.35,0],[0,0,0],g),legR=box(.18,.66,.20,dark,[.19,.35,0],[0,0,0],g);
  box(.27,.14,.48,white,[-.19,.03,.10],[0,0,0],g);box(.27,.14,.48,white,[.19,.03,.10],[0,0,0],g);
  // eyes
  sph(.055,mat(0x1d1716,.25),[-.18,1.92,.48],[1,.95,.45],g);sph(.055,mat(0x1d1716,.25),[.18,1.92,.48],[1,.95,.45],g);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.38,.43,36),new THREE.MeshBasicMaterial({color:kind==='elyn'?0xff9db8:0x8dbcf0,transparent:true,opacity:.9,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.015;g.add(ring);ring.visible=false;
  g.userData={armL,armR,legL,legR,ring,walkPhase:0};world.add(g);return g;
}

function makePet(kind){
  const g=new THREE.Group();const fur=mat(kind==='dudu'?0xb36f3e:0x4a4645,.88),light=mat(kind==='dudu'?0xe3aa79:0xf0ebe3,.9),black=mat(0x24201f,.8);
  sph(.34,fur,[0,.36,0],[1.4,.78,.78],g);sph(.25,fur,[.43,.50,0],[.9,1,.95],g);sph(.13,light,[.50,.43,.20],[1,1,.7],g);sph(.045,black,[.54,.55,.21],[1,1,.5],g);sph(.045,black,[.54,.55,-.21],[1,1,.5],g);cyl(.06,.08,.55,fur,[-.40,.48,0],[0,0,-1.0],g);for(const x of [-.25,.18])for(const z of [-.18,.18])box(.08,.30,.08,fur,[x,.16,z],[0,0,0],g);world.add(g);return g;
}

function mountLabels(){
  for(const id of ['elyn','shawn','dudu','bubu']){const e=document.createElement('div');e.className='true3d-name'+((stateRef()?.active===id)?' active':'');e.textContent=id==='elyn'?'Elyn':id==='shawn'?'Shawn':id==='dudu'?'Dudu':'Bubu';root.appendChild(e);labels[id]=e;}
}

function buildActors(){
  ensure3DState();const s=stateRef();avatars.elyn=makeAvatar('elyn');avatars.shawn=makeAvatar('shawn');pets.dudu=makePet('dudu');pets.bubu=makePet('bubu');
  for(const id of ['elyn','shawn']){const p=s.true3dLiving[id];avatars[id].position.set(p.x,0,p.z);}for(const id of ['dudu','bubu']){const p=s.true3dLiving[id];pets[id].position.set(p.x,0,p.z);}mountLabels();
}

function createUI(){
  const badge=document.createElement('div');badge.className='true3d-badge';badge.innerHTML='<i></i> TRUE 3D 客厅 · 只能在地板走';root.appendChild(badge);
  const help=document.createElement('div');help.className='true3d-help';help.textContent='WASD 移动 · 点击地板走过去 · Q/E 转镜头 · 滚轮缩放';root.appendChild(help);
  const controls=document.createElement('div');controls.className='true3d-controls';controls.innerHTML='<button data-cam="left">↶<small>左转</small></button><button data-cam="right">↷<small>右转</small></button><button data-cam="near">＋<small>拉近</small></button><button data-cam="far">－<small>拉远</small></button>';root.appendChild(controls);
  controls.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.cam;if(a==='left')yaw-=.28;if(a==='right')yaw+=.28;if(a==='near')distance=clamp(distance-.7,4.8,10.5);if(a==='far')distance=clamp(distance+.7,4.8,10.5);save3DState();});
  const inter=document.createElement('div');inter.className='true3d-interact';inter.id='true3dInteract';inter.innerHTML='<b></b><button>互动</button>';root.appendChild(inter);inter.querySelector('button').onclick=()=>runNearestInteraction();
  const loading=document.createElement('div');loading.className='true3d-loading';loading.innerHTML='<b>正在进入真正 3D 客厅…</b><span>地板 · 家具碰撞 · 镜头 · 光影</span>';root.appendChild(loading);setTimeout(()=>loading.classList.add('done'),350);
}

async function mount3D(){
  if(mounted||booting||stateRef()?.room!==ROOM||q('#gameScreen')?.classList.contains('hidden'))return;
  booting=true;
  try{
    await loadThree(); if(stateRef()?.room!==ROOM){booting=false;return;}
    ensure3DState();
    const host=q('#scene'); if(!host){booting=false;return;}
    host.classList.add('true3d-living-active');
    root=document.createElement('div');root.id='true3dLivingRoot';canvas=document.createElement('canvas');canvas.id='true3dLivingCanvas';canvas.tabIndex=0;root.appendChild(canvas);host.insertBefore(root,host.firstChild);
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
    world=new THREE.Scene();camera=new THREE.PerspectiveCamera(44,1,.1,80);raycaster=new THREE.Raycaster();buildRoom();buildActors();createUI();resize3D();
    canvas.addEventListener('click',onCanvasClick);canvas.addEventListener('wheel',onWheel,{passive:false});canvas.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};e.stopPropagation()});canvas.addEventListener('pointerup',e=>e.stopPropagation());
    mounted=true;booting=false;lastTime=performance.now();frame=requestAnimationFrame(loop);toast3d('True 3D 客厅已开启 · WASD 走走看');
  }catch(err){booting=false;console.error('[True3D]',err);toast3d('3D 客厅加载失败，已保留原本客厅');unmount3D(false);}
}

function save3DState(){
  const s=stateRef();if(!s||!s.true3dLiving)return;for(const id of ['elyn','shawn'])if(avatars[id]){s.true3dLiving[id].x=+avatars[id].position.x.toFixed(3);s.true3dLiving[id].z=+avatars[id].position.z.toFixed(3);}s.true3dLiving.yaw=yaw;s.true3dLiving.distance=distance;coreSave();
}
function unmount3D(doSave=true){
  if(doSave)save3DState();mounted=false;booting=false;cancelAnimationFrame(frame);keys.clear();moveTarget=null;
  q('#scene')?.classList.remove('true3d-living-active');root?.remove();root=null;canvas=null;labels={};avatars={};pets={};obstacles=[];interactables=[];
  try{renderer?.dispose()}catch(_){}renderer=null;world=null;camera=null;raycaster=null;floor=null;
}

function activeAvatar(){const id=stateRef()?.active==='shawn'?'shawn':'elyn';return avatars[id];}
function moveAvatar(dt){
  const g=activeAvatar();if(!g)return;let vx=0,vz=0;
  const forward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
  if(keys.has('KeyW')){vx+=forward.x;vz+=forward.z}if(keys.has('KeyS')){vx-=forward.x;vz-=forward.z}if(keys.has('KeyA')){vx-=right.x;vz-=right.z}if(keys.has('KeyD')){vx+=right.x;vz+=right.z}
  if(moveTarget){const dx=moveTarget.x-g.position.x,dz=moveTarget.z-g.position.z,d=Math.hypot(dx,dz);if(d<.12)moveTarget=null;else{vx=dx/d;vz=dz/d;}}
  const len=Math.hypot(vx,vz),movingNow=len>.01;if(movingNow){vx/=len;vz/=len;const speed=3.05,step=speed*dt,nx=g.position.x+vx*step,nz=g.position.z+vz*step;if(canStand(nx,g.position.z))g.position.x=nx;if(canStand(g.position.x,nz))g.position.z=nz;g.rotation.y=Math.atan2(vx,vz);}
  const u=g.userData;u.walkPhase+=dt*(movingNow?10:3);const swing=movingNow?Math.sin(u.walkPhase)*.62:Math.sin(u.walkPhase)*.03;u.armL.rotation.x=swing;u.armR.rotation.x=-swing;u.legL.rotation.x=-swing*.72;u.legR.rotation.x=swing*.72;g.position.y=movingNow?Math.abs(Math.sin(u.walkPhase*2))*.025:0;
  for(const id of ['elyn','shawn'])if(avatars[id])avatars[id].userData.ring.visible=(stateRef()?.active===id);
}

function updateCamera(dt){
  const g=activeAvatar();if(!g||!camera)return;const target=new THREE.Vector3(g.position.x,1.2,g.position.z);const desired=new THREE.Vector3(target.x+Math.sin(yaw)*distance,camHeight,target.z+Math.cos(yaw)*distance);const f=1-Math.pow(.001,dt);camera.position.lerp(desired,f);camera.lookAt(target.x,target.y,target.z);
}
function updateLabels(){
  if(!camera||!canvas)return;const r=canvas.getBoundingClientRect();for(const [id,g] of [...Object.entries(avatars),...Object.entries(pets)]){const el=labels[id];if(!el||!g)continue;const v=new THREE.Vector3(g.position.x,id==='elyn'||id==='shawn'?2.55:.95,g.position.z).project(camera);const visible=v.z<1;el.style.display=visible?'block':'none';el.style.left=((v.x*.5+.5)*r.width)+'px';el.style.top=((-v.y*.5+.5)*r.height)+'px';el.classList.toggle('active',stateRef()?.active===id);}}
function nearestInteraction(){const g=activeAvatar();if(!g)return null;let best=null,bd=Infinity;for(const it of interactables){const d=Math.hypot(g.position.x-it.x,g.position.z-it.z);if(d<it.radius&&d<bd){best=it;bd=d;}}return best;}
function updateInteraction(){const it=nearestInteraction(),el=q('#true3dInteract');if(!el)return;el.classList.toggle('show',!!it);if(it)el.querySelector('b').textContent=it.name+' · '+(it.action==='sit'?'坐下':'看电视');}
function runNearestInteraction(){const it=nearestInteraction();if(!it)return;try{if(typeof interact==='function')interact(it.action)}catch(_){}if(it.action==='sit')toast3d('走到沙发旁了 · Sit 动画下一阶段接入');}

function loop(now){
  if(!mounted)return;const dt=Math.min(.04,(now-lastTime)/1000||.016);lastTime=now;resize3D();moveAvatar(dt);updateCamera(dt);updateLabels();updateInteraction();renderer.render(world,camera);if(now-lastSave>1200){lastSave=now;save3DState();}frame=requestAnimationFrame(loop);
}
function resize3D(){if(!renderer||!canvas||!camera)return;const r=q('#scene').getBoundingClientRect(),w=Math.max(1,Math.floor(r.width)),h=Math.max(1,Math.floor(r.height));if(canvas.width!==Math.floor(w*Math.min(devicePixelRatio,2))||canvas.height!==Math.floor(h*Math.min(devicePixelRatio,2))){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}}
function onCanvasClick(e){e.preventDefault();e.stopPropagation();if(pointerDown&&Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)>7)return;const r=canvas.getBoundingClientRect(),m=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));raycaster.setFromCamera(m,camera);const hit=raycaster.intersectObject(floor,false)[0];if(hit){const x=clamp(hit.point.x,-7.5,7.5),z=clamp(hit.point.z,-4.7,4.6);if(canStand(x,z))moveTarget={x,z};else toast3d('这里被家具挡住了');}}
function onWheel(e){e.preventDefault();e.stopPropagation();distance=clamp(distance+Math.sign(e.deltaY)*.55,4.8,10.5);save3DState();}

function inputDown(e){if(!mounted)return;const used=['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE'];if(!used.includes(e.code))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(e.code==='KeyQ')yaw-=.055;else if(e.code==='KeyE')yaw+=.055;else{keys.add(e.code);moveTarget=null;}}
function inputUp(e){if(!mounted)return;if(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE'].includes(e.code)){keys.delete(e.code);e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}}
window.addEventListener('keydown',inputDown,true);window.addEventListener('keyup',inputUp,true);window.addEventListener('resize',()=>{if(mounted)resize3D()});

function patchRoomFlow(){
  try{
    if(typeof enterRoom==='function'&&!enterRoom.__true3dIntegrated){
      const previous=enterRoom;
      const wrapped=function(id,doSave=true){
        if(mounted&&id!==ROOM)unmount3D(true);
        const out=previous.apply(this,arguments);
        if(id===ROOM)setTimeout(mount3D,40);else q('#scene')?.classList.remove('true3d-living-active');
        return out;
      };
      wrapped.__true3dIntegrated=true;enterRoom=wrapped;
    }
  }catch(err){console.warn('[True3D patch room]',err);}
}
function patchShowGame(){
  // If the player was already in living when this script initialized, mount after Continue.
  const btn=q('#continueBtn');btn?.addEventListener('click',()=>setTimeout(()=>{if(stateRef()?.room===ROOM)mount3D()},120));
  const newBtn=q('#newBtn');newBtn?.addEventListener('click',()=>setTimeout(()=>{if(stateRef()?.room===ROOM)mount3D()},120));
}
function init(){
  patchRoomFlow();patchShowGame();
  setTimeout(()=>{if(!q('#gameScreen')?.classList.contains('hidden')&&stateRef()?.room===ROOM)mount3D()},300);
  window.True3DLiving={mount:mount3D,unmount:unmount3D,version:'integrated-v1'};
  console.info('[Shawn & Elyn] Integrated True 3D Living Room ready on test branch.');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
