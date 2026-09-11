import * as THREE from 'https://unpkg.com/three@0.167.1/build/three.module.js';

const canvas = document.getElementById('game3d');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3c79a);
scene.fog = new THREE.Fog(0xd9ad87, 15, 32);

const camera = new THREE.PerspectiveCamera(43, innerWidth/innerHeight, 0.1, 80);
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const targetPoint = new THREE.Vector3();
let hasTarget = false;
let cameraYaw = 0.02;
let cameraDistance = 7.7;
let cameraHeight = 4.05;

const obstacles = [];
const interactables = [];
const keys = new Set();

const MAT = {
  oak: new THREE.MeshStandardMaterial({color:0xa66f43, roughness:.56, metalness:.02}),
  darkOak: new THREE.MeshStandardMaterial({color:0x6f432b, roughness:.58}),
  cream: new THREE.MeshPhysicalMaterial({color:0xeadfce, roughness:.72, sheen:.16, sheenColor:new THREE.Color(0xfff1dd)}),
  sage: new THREE.MeshPhysicalMaterial({color:0x66735a, roughness:.78, sheen:.22, sheenColor:new THREE.Color(0xdde6d3)}),
  plaid: new THREE.MeshPhysicalMaterial({color:0x6d735a, roughness:.78, sheen:.16}),
  white: new THREE.MeshStandardMaterial({color:0xf5efe7, roughness:.75}),
  black: new THREE.MeshStandardMaterial({color:0x161515, roughness:.35, metalness:.15}),
  glass: new THREE.MeshPhysicalMaterial({color:0xa8d9ea, transmission:.28, transparent:true, opacity:.28, roughness:.08, metalness:.08}),
  green: new THREE.MeshStandardMaterial({color:0x426f45, roughness:.8}),
  green2: new THREE.MeshStandardMaterial({color:0x789566, roughness:.8}),
  gold: new THREE.MeshStandardMaterial({color:0xc69b5e, roughness:.3, metalness:.62}),
  fabricPink: new THREE.MeshPhysicalMaterial({color:0xf1a7ae, roughness:.72, sheen:.45}),
  skin: new THREE.MeshStandardMaterial({color:0xffd7c3, roughness:.8}),
  hair: new THREE.MeshStandardMaterial({color:0x2c201c, roughness:.82}),
  blue: new THREE.MeshPhysicalMaterial({color:0x87a9d5, roughness:.7, sheen:.25}),
  charcoal: new THREE.MeshStandardMaterial({color:0x2d3037, roughness:.72})
};

function mesh(geo, mat, {pos=[0,0,0], rot=[0,0,0], scale=[1,1,1], cast=true, receive=true}={}){
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos); m.rotation.set(...rot); m.scale.set(...scale);
  m.castShadow = cast; m.receiveShadow = receive;
  scene.add(m); return m;
}
function box(w,h,d,mat,pos,rot=[0,0,0], parent=null){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
  m.position.set(...pos);m.rotation.set(...rot);m.castShadow=true;m.receiveShadow=true;
  (parent||scene).add(m);return m;
}
function cyl(r1,r2,h,mat,pos,rot=[0,0,0], parent=null, seg=24){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),mat);m.position.set(...pos);m.rotation.set(...rot);m.castShadow=true;m.receiveShadow=true;(parent||scene).add(m);return m;
}
function sphere(r,mat,pos,scale=[1,1,1],parent=null){
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,28,20),mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;(parent||scene).add(m);return m;
}
function addObstacle(x,z,w,d,pad=.18,name='furniture'){
  obstacles.push({minX:x-w/2-pad,maxX:x+w/2+pad,minZ:z-d/2-pad,maxZ:z+d/2+pad,name});
}
function addInteraction(name, x,z, radius, action){ interactables.push({name,x,z,radius,action}); }

function woodTexture(){
  const c=document.createElement('canvas'); c.width=1024;c.height=1024; const g=c.getContext('2d');
  g.fillStyle='#ad794e';g.fillRect(0,0,c.width,c.height);
  for(let y=0;y<1024;y+=58){
    const tone=145+Math.floor(Math.random()*25);g.fillStyle=`rgb(${tone+25},${tone-20},${tone-50})`;g.fillRect(0,y,1024,56);
    g.fillStyle='rgba(72,37,18,.19)';g.fillRect(0,y+55,1024,3);
    for(let x=0;x<1024;x+=256){g.fillStyle='rgba(255,236,210,.06)';g.fillRect(x+Math.random()*30,y+4,2,45)}
  }
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.2,2.2);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function rugTexture(){
  const c=document.createElement('canvas');c.width=700;c.height=440;const g=c.getContext('2d');
  g.fillStyle='#b7a38e';g.fillRect(0,0,700,440);g.strokeStyle='rgba(85,69,55,.28)';g.lineWidth=5;
  for(let k=0;k<5;k++)g.strokeRect(22+k*15,22+k*12,656-k*30,396-k*24);
  g.strokeStyle='rgba(247,232,213,.45)';g.lineWidth=3;
  for(let x=45;x<660;x+=38){g.beginPath();g.moveTo(x,70);g.lineTo(x+25,100);g.lineTo(x,130);g.lineTo(x-25,100);g.closePath();g.stroke()}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function sunsetTexture(){
  const c=document.createElement('canvas');c.width=1500;c.height=800;const g=c.getContext('2d');
  const grd=g.createLinearGradient(0,0,0,800);grd.addColorStop(0,'#8d71a4');grd.addColorStop(.26,'#e8958c');grd.addColorStop(.55,'#f4bd83');grd.addColorStop(1,'#6f7ca2');g.fillStyle=grd;g.fillRect(0,0,1500,800);
  g.fillStyle='rgba(255,244,180,.95)';g.beginPath();g.arc(1110,250,52,0,Math.PI*2);g.fill();
  g.fillStyle='#755f78';g.beginPath();g.moveTo(0,430);for(let x=0;x<=1500;x+=120)g.lineTo(x,390+Math.sin(x*.008)*75+Math.random()*34);g.lineTo(1500,560);g.lineTo(0,560);g.fill();
  const water=g.createLinearGradient(0,520,0,800);water.addColorStop(0,'#7b7793');water.addColorStop(1,'#414f68');g.fillStyle=water;g.fillRect(0,520,1500,280);
  g.fillStyle='rgba(255,210,126,.5)';for(let i=0;i<26;i++)g.fillRect(900+Math.random()*420,540+Math.random()*210,40+Math.random()*100,2+Math.random()*5);
  g.fillStyle='#3b3c50';for(let i=0;i<55;i++){const w=10+Math.random()*26,h=15+Math.random()*90,x=Math.random()*1500;g.fillRect(x,510-h,w,h)}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}

// Room shell
const floorMat = new THREE.MeshStandardMaterial({map:woodTexture(), roughness:.58, metalness:.02});
mesh(new THREE.PlaneGeometry(18,12),floorMat,{pos:[0,0,0],rot:[-Math.PI/2,0,0],receive:true});
box(18,.18,.28,MAT.white,[0,2.65,-5.88]);
box(.28,5.3,12,MAT.white,[-8.86,2.65,0]);
box(.28,5.3,12,MAT.white,[8.86,2.65,0]);
box(18,.16,12,new THREE.MeshStandardMaterial({color:0xe8d6c2,roughness:.9}),[0,5.28,0]);

// Sunset outside + windows
box(15.2,4.65,.12,new THREE.MeshBasicMaterial({map:sunsetTexture(),toneMapped:false}),[.8,2.55,-6.08]);
for(const x of [-6.8,-3.9,-1,1.9,4.8,7.7]) box(.11,4.9,.18,MAT.darkOak,[x,2.55,-5.86]);
box(15.7,.11,.18,MAT.darkOak,[.55,.22,-5.86]);box(15.7,.11,.18,MAT.darkOak,[.55,4.9,-5.86]);
box(15.7,.11,.18,MAT.darkOak,[.55,2.62,-5.86]);

// Curtains
const curtainMat=new THREE.MeshPhysicalMaterial({color:0xe7cfb5,roughness:.88,sheen:.25});
for(const x of [-7.45,8.1]){
  for(let i=0;i<6;i++)cyl(.12,.16,4.5,curtainMat,[x+i*.12*(x<0?1:-1),2.4,-5.55]);
}

// rug
const rug=new THREE.Mesh(new THREE.PlaneGeometry(6.8,4.6),new THREE.MeshStandardMaterial({map:rugTexture(),roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(1.6,.025,.5);rug.receiveShadow=true;scene.add(rug);

function sofa(){
  const g=new THREE.Group();g.position.set(3.05,.0,-1.6);scene.add(g);
  box(5.4,.48,1.65,MAT.cream,[0,.48,0],undefined,g);
  box(1.65,.48,3.7,MAT.cream,[2.0,.48,1.06],undefined,g);
  box(5.35,1.28,.38,MAT.cream,[0,1.2,-.64],[-.05,0,0],g);
  box(.38,1.15,1.65,MAT.cream,[-2.5,1.0,0],undefined,g);
  box(.38,1.15,3.7,MAT.cream,[2.62,1.0,1.05],undefined,g);
  const cushions=[[-1.65,1.25,-.35,MAT.sage],[-.78,1.28,-.35,MAT.plaid],[.15,1.3,-.35,MAT.white],[1.05,1.26,-.35,MAT.sage],[2.18,1.25,.32,MAT.plaid],[2.2,1.27,1.18,MAT.sage]];
  cushions.forEach(([x,y,z,m])=>{const c=box(.72,.72,.22,m,[x,y,z],[-.08,0,Math.random()*.08-.04],g);c.geometry.translate(0,0,0)});
  sphere(.42,new THREE.MeshPhysicalMaterial({color:0xf2eadf,roughness:.8,sheen:.25}),[.16,1.37,-.48],[1.05,.85,.42],g);
  sphere(.15,new THREE.MeshStandardMaterial({color:0xdfa94f}),[.16,1.37,-.69],[1,1,.35],g);
  addObstacle(3.05,-1.25,5.8,4.1,.05,'sofa');
  addInteraction('L 型沙发',1.0,-.6,1.15,'坐下');
  return g;
}
sofa();

function coffeeTable(){
  const g=new THREE.Group();g.position.set(1.15,0,.85);scene.add(g);
  box(3.3,.22,1.55,MAT.oak,[0,.72,0],undefined,g);
  for(const [x,z] of [[-1.4,-.58],[1.4,-.58],[-1.4,.58],[1.4,.58]]) box(.16,.7,.16,MAT.darkOak,[x,.35,z],undefined,g);
  box(1.1,.12,.72,new THREE.MeshStandardMaterial({color:0x5a4236,roughness:.82}),[-.75,.9,.15],undefined,g);
  box(.9,.1,.64,new THREE.MeshStandardMaterial({color:0xc9ad7c,roughness:.82}),[-.68,.99,.12],undefined,g);
  cyl(.18,.22,.36,new THREE.MeshStandardMaterial({color:0xf0e5d8,roughness:.6}),[.65,1.03,-.12],undefined,g);
  for(let i=0;i<12;i++) sphere(.085,new THREE.MeshStandardMaterial({color:i%2?0xf1eee1:0xe6b369}),[.65+(Math.random()-.5)*.45,1.28,-.12+(Math.random()-.5)*.35],[1,1.6,1],g);
  addObstacle(1.15,.85,3.55,1.85,.16,'coffee table');
  addInteraction('原木茶几',1.15,2.05,1.0,'查看');
}
coffeeTable();

function tvConsole(){
  const g=new THREE.Group();g.position.set(-5.65,0,-1.45);scene.add(g);
  box(3.6,.82,.75,MAT.oak,[0,.55,0],undefined,g);
  box(3.35,.08,.7,MAT.darkOak,[0,.92,0],undefined,g);
  for(let x=-1.2;x<=1.2;x+=1.2) box(.9,.34,.06,new THREE.MeshStandardMaterial({color:0x8f5f3e,roughness:.7}),[x,.56,.39],undefined,g);
  const tv=box(3.25,2.0,.16,MAT.black,[0,2.05,-.08],undefined,g);
  const screen=new THREE.MeshStandardMaterial({color:0x43525c,emissive:0x25323a,emissiveIntensity:.55,roughness:.18});
  box(3.0,1.72,.02,screen,[0,2.05,.02],undefined,g);
  box(.85,.08,.35,MAT.black,[0,1.02,0],undefined,g);
  addObstacle(-5.65,-1.45,3.8,1.0,.12,'tv console');
  addInteraction('电视',-4.8,-.35,1.0,'看电视');
}
tvConsole();

function bookshelf(){
  const g=new THREE.Group();g.position.set(7.75,0,-1.6);scene.add(g);
  box(1.65,4.55,.45,MAT.darkOak,[0,2.25,0],undefined,g);
  for(let y=.35;y<4.35;y+=.8) box(1.5,.08,.62,MAT.oak,[0,y,.12],undefined,g);
  for(let shelf=0;shelf<5;shelf++){
    let x=-.55; for(let i=0;i<5;i++){const w=.12+Math.random()*.09,h=.38+Math.random()*.24;const mat=new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(Math.random(),.28,.34+.25*Math.random()),roughness:.82});box(w,h,.28,mat,[x,h/2+.28+shelf*.8,.13],undefined,g);x+=w+.05}
  }
  addObstacle(7.75,-1.6,1.9,1.0,.08,'bookshelf');
}
bookshelf();

function floorLamp(){
  cyl(.08,.1,2.5,MAT.darkOak,[5.85,1.25,-3.65]);
  cyl(.55,.28,.75,new THREE.MeshStandardMaterial({color:0xf0d8a7,roughness:.62,side:THREE.DoubleSide}),[5.85,2.72,-3.65]);
  const p=new THREE.PointLight(0xffc77f,24,5.5,2);p.position.set(5.85,2.55,-3.65);p.castShadow=true;scene.add(p);
}
floorLamp();

function sideTable(){
  box(1.35,.65,1.15,MAT.oak,[6.1,.45,.25]);box(1.45,.12,1.25,MAT.darkOak,[6.1,.83,.25]);
  addObstacle(6.1,.25,1.55,1.35,.05,'side table');
}
sideTable();

function plant(x,z,s=1){
  const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(s);scene.add(g);
  cyl(.38,.28,.62,new THREE.MeshStandardMaterial({color:0xb9825d,roughness:.75}),[0,.32,0],undefined,g);
  cyl(.06,.08,1.3,new THREE.MeshStandardMaterial({color:0x4d6f3f,roughness:.8}),[0,1.0,0],undefined,g);
  for(let i=0;i<12;i++){
    const a=i/12*Math.PI*2;const y=.78+(i%4)*.28;const leaf=sphere(.32,i%2?MAT.green:MAT.green2,[Math.cos(a)*.32,y,Math.sin(a)*.32],[.55,1.25,.22],g);leaf.rotation.z=-a*.25;
  }
}
plant(-7.8,-3.8,1.15);plant(7.1,2.6,.9);plant(-3.9,-4.15,.7);plant(6.9,-4.5,.75);

// staircase, left rear
for(let i=0;i<7;i++) box(1.9,.18+i*.0,.62,MAT.oak,[-4.05,.14+i*.24,-4.95+i*.45]);
for(let i=0;i<7;i++) box(1.9,.24,.62,MAT.oak,[-4.05,.12+i*.24,-4.95+i*.45]);
box(.11,2.0,.11,MAT.gold,[-4.96,1.4,-3.2]);box(.11,2.0,.11,MAT.gold,[-3.14,1.4,-3.2]);
addObstacle(-4.05,-3.55,2.25,3.0,.06,'stairs');

// doorway and console near stairs
box(1.4,1.0,.55,MAT.oak,[-6.7,.5,-4.35]);box(1.5,.09,.65,MAT.darkOak,[-6.7,1.02,-4.35]);

// ceiling downlights
for(const x of [-6,-3,0,3,6]){const p=new THREE.PointLight(0xffd8a5,5.5,4.5,2);p.position.set(x,4.85,-.2);scene.add(p)}

// lighting
const hemi=new THREE.HemisphereLight(0xffe8d1,0x6b5a52,2.2);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffc685,5.2);sun.position.set(7,10,-7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;sun.shadow.bias=-.0003;scene.add(sun);
const fill=new THREE.DirectionalLight(0x8eb4ff,1.15);fill.position.set(-5,6,5);scene.add(fill);

function eye(parent,x,y,z){
  sphere(.055,MAT.black,[x,y,z],[1,.8,.45],parent);
}
function makeElyn(){
  const g=new THREE.Group();g.position.set(-.8,0,3.15);scene.add(g);
  // body
  sphere(.53,MAT.skin,[0,1.88,0],[1,.98,.92],g);
  sphere(.6,MAT.hair,[0,1.95,.08],[1.08,1.13,.9],g);
  // face patch so hair reads around face
  sphere(.47,MAT.skin,[0,1.86,.38],[.9,.88,.36],g);
  // hair lobes
  for(let i=0;i<10;i++){const a=-1.35+i*.3;sphere(.22,MAT.hair,[Math.sin(a)*.52,1.58-i*.015,-.02+Math.cos(a)*.18],[.9,1.55,.8],g)}
  eye(g,-.16,1.92,.56);eye(g,.16,1.92,.56);
  // body pink cardigan + skirt
  box(.58,.62,.34,MAT.fabricPink,[0,1.12,.02],[0,0,0],g);
  const skirt=new THREE.Mesh(new THREE.CylinderGeometry(.46,.62,.42,24),new THREE.MeshPhysicalMaterial({color:0x25232a,roughness:.72}));skirt.position.set(0,.72,.02);skirt.castShadow=true;g.add(skirt);
  for(const x of [-.17,.17]){cyl(.09,.09,.5,MAT.skin,[x,.34,.02],undefined,g);box(.2,.15,.36,MAT.white,[x,.07,.11],undefined,g)}
  for(const x of [-.38,.38]){cyl(.075,.075,.53,MAT.skin,[x,1.08,.02],[0,0,x<0?-.18:.18],g)}
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(.48,28),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.18,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.012;g.add(shadow);
  g.userData.speed=3.15;return g;
}
const player=makeElyn();

function makeShawn(){
  const g=new THREE.Group();g.position.set(4.25,.38,-.95);g.rotation.y=-.42;scene.add(g);
  sphere(.5,MAT.skin,[0,1.65,0],[1,.95,.9],g);sphere(.57,MAT.hair,[0,1.78,-.02],[1.05,.9,.95],g);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;sphere(.2,MAT.hair,[Math.cos(a)*.38,1.95+Math.sin(a)*.12,.08+Math.sin(a)*.18],[1.1,.75,.7],g)}
  eye(g,-.15,1.68,.48);eye(g,.15,1.68,.48);
  // glasses
  const gm=new THREE.MeshBasicMaterial({color:0x1b1b1b});
  for(const x of [-.15,.15]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.14,.018,8,32),gm);ring.position.set(x,1.69,.51);g.add(ring)}box(.12,.025,.02,gm,[0,1.69,.51],undefined,g);
  box(.58,.62,.34,MAT.blue,[0,1.0,.02],undefined,g);box(.5,.28,.32,MAT.white,[0,1.12,.2],undefined,g);
  for(const x of [-.16,.16]){cyl(.09,.09,.42,MAT.charcoal,[x,.48,.05],undefined,g);box(.2,.12,.32,MAT.white,[x,.23,.14],undefined,g)}
  addInteraction('Shawn',4.25,-.4,1.25,'聊天');return g;
}
makeShawn();

function makePetSprite(path,x,z,w=1.1,h=1.0){
  const tex=new THREE.TextureLoader().load(path);tex.colorSpace=THREE.SRGBColorSpace;
  const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false});const sp=new THREE.Sprite(mat);sp.scale.set(w,h,1);sp.position.set(x,h*.5,z);sp.castShadow=true;scene.add(sp);return sp;
}
makePetSprite('./assets/sprites/dudu-idle.png',5.8,2.6,1.2,1.05);makePetSprite('./assets/sprites/bubu-idle.png',-3.6,.3,1.05,1.0);
addInteraction('Dudu',5.8,2.6,1.0,'摸摸');addInteraction('Bubu',-3.6,.3,1.0,'摸摸');

function collides(x,z){
  const r=.34;if(x<-8.25+r||x>8.25-r||z<-5.35+r||z>5.35-r)return true;
  return obstacles.some(o=>x+r>o.minX&&x-r<o.maxX&&z+r>o.minZ&&z-r<o.maxZ);
}
function tryMove(dx,dz){
  const p=player.position;const nx=p.x+dx,nz=p.z+dz;
  if(!collides(nx,p.z))p.x=nx;if(!collides(p.x,nz))p.z=nz;
}
function moveDirection(dt){
  let ix=0,iz=0;if(keys.has('KeyW')||keys.has('ArrowUp'))iz-=1;if(keys.has('KeyS')||keys.has('ArrowDown'))iz+=1;if(keys.has('KeyA')||keys.has('ArrowLeft'))ix-=1;if(keys.has('KeyD')||keys.has('ArrowRight'))ix+=1;
  if(!ix&&!iz)return false;
  hasTarget=false;const len=Math.hypot(ix,iz)||1;ix/=len;iz/=len;
  const sy=Math.sin(cameraYaw),cy=Math.cos(cameraYaw);const wx=ix*cy+iz*sy,wz=-ix*sy+iz*cy;const speed=player.userData.speed*dt;tryMove(wx*speed,wz*speed);player.rotation.y=Math.atan2(wx,wz);return true;
}
function autoMove(dt){
  if(!hasTarget)return false;const dx=targetPoint.x-player.position.x,dz=targetPoint.z-player.position.z,dist=Math.hypot(dx,dz);if(dist<.16){hasTarget=false;return false}const step=Math.min(player.userData.speed*dt,dist);const ux=dx/dist,uz=dz/dist;const ox=player.position.x,oz=player.position.z;tryMove(ux*step,uz*step);if(Math.abs(player.position.x-ox)<.001&&Math.abs(player.position.z-oz)<.001){hasTarget=false;return false}player.rotation.y=Math.atan2(ux,uz);return true;
}

const floorHit=new THREE.Mesh(new THREE.PlaneGeometry(18,12),new THREE.MeshBasicMaterial({visible:false}));floorHit.rotation.x=-Math.PI/2;floorHit.position.y=.04;scene.add(floorHit);
canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;const r=canvas.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObject(floorHit,false);if(hits.length){const p=hits[0].point;if(!collides(p.x,p.z)){targetPoint.copy(p);hasTarget=true}}
});

addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyQ')cameraYaw-=.16;if(e.code==='KeyE')cameraYaw+=.16;if(e.code==='KeyF')doInteract();});
addEventListener('keyup',e=>keys.delete(e.code));
canvas.addEventListener('wheel',e=>{cameraDistance=THREE.MathUtils.clamp(cameraDistance+e.deltaY*.006,4.6,10.5);e.preventDefault()},{passive:false});
document.getElementById('camLeft').onclick=()=>cameraYaw-=.22;document.getElementById('camRight').onclick=()=>cameraYaw+=.22;document.getElementById('camNear').onclick=()=>cameraDistance=Math.max(4.6,cameraDistance-.7);document.getElementById('camFar').onclick=()=>cameraDistance=Math.min(10.5,cameraDistance+.7);

let nearby=null;const interaction=document.getElementById('interaction'),interactionTitle=document.getElementById('interactionTitle'),statusText=document.getElementById('statusText');
function detectInteraction(){
  nearby=null;let best=999;for(const it of interactables){const d=Math.hypot(player.position.x-it.x,player.position.z-it.z);if(d<it.radius&&d<best){best=d;nearby=it}}
  if(nearby){interaction.classList.remove('hidden');interactionTitle.textContent=`${nearby.name} · ${nearby.action}`;document.getElementById('interactBtn').textContent=`F / ${nearby.action}`}
  else interaction.classList.add('hidden');
}
function doInteract(){
  if(!nearby)return;if(nearby.name.includes('沙发')){statusText.textContent='Elyn 坐到沙发旁了 ♡（正式版会连接专属坐下动画）';player.position.set(1.15,0,-.35);player.rotation.y=Math.PI}
  else if(nearby.name==='电视')statusText.textContent='打开电视 ♡ 这个互动点位于真正的 3D 电视柜前';
  else statusText.textContent=`和 ${nearby.name} ${nearby.action} ♡`;
}
document.getElementById('interactBtn').onclick=doInteract;

function cameraUpdate(dt){
  if(keys.has('KeyQ'))cameraYaw-=dt*.75;if(keys.has('KeyE'))cameraYaw+=dt*.75;
  const desired=new THREE.Vector3(player.position.x+Math.sin(cameraYaw)*cameraDistance,cameraHeight,player.position.z+Math.cos(cameraYaw)*cameraDistance);
  camera.position.lerp(desired,1-Math.exp(-dt*4.8));const look=new THREE.Vector3(player.position.x,1.15,player.position.z-.35);camera.lookAt(look);
}
function animate(){
  requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.035);const moving=moveDirection(dt)||autoMove(dt);
  if(moving)player.position.y=.025+Math.abs(Math.sin(performance.now()*.014))*.035;else player.position.y=THREE.MathUtils.lerp(player.position.y,0,.15);
  cameraUpdate(dt);detectInteraction();renderer.render(scene,camera);
}

function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
addEventListener('resize',resize);

camera.position.set(.2,4.1,10.7);camera.lookAt(player.position.x,1.2,player.position.z);
setTimeout(()=>document.getElementById('loading').classList.add('done'),500);
animate();
