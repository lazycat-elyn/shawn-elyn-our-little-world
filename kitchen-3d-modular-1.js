import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const stage = document.getElementById('kitchen3dStage');
const previewBtn = document.getElementById('previewBtn');
const editBtn = document.getElementById('editBtn');
const editPanel = document.getElementById('editPanel');
const selectedName = document.getElementById('selectedName');
const modeTitle = document.getElementById('modeTitle');
const modeHint = document.getElementById('modeHint');
const closeEditPanel = document.getElementById('closeEditPanel');
const toastEl = document.getElementById('toast');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3e8db);
scene.fog = new THREE.Fog(0xf3e8db, 24, 42);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 120);
camera.position.set(16, 13.5, 19);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.55, -0.35);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 12;
controls.maxDistance = 36;
controls.maxPolarAngle = Math.PI * 0.47;
controls.minPolarAngle = Math.PI * 0.18;
controls.enablePan = true;
controls.panSpeed = 0.65;

const hemi = new THREE.HemisphereLight(0xfff6e8, 0x7f6b62, 2.25);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffd6a5, 4.2);
sun.position.set(-8, 14, 9);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -18;
sun.shadow.camera.right = 18;
sun.shadow.camera.top = 18;
sun.shadow.camera.bottom = -18;
sun.shadow.bias = -0.0003;
scene.add(sun);

const warmFill = new THREE.PointLight(0xffb76d, 19, 18, 1.8);
warmFill.position.set(0, 5.8, -3.7);
scene.add(warmFill);

const palette = {
  cream: 0xfff9f1,
  cream2: 0xf4eadf,
  warmWhite: 0xfffdf8,
  wood: 0xb87a49,
  woodLight: 0xd69a65,
  woodDark: 0x795038,
  brass: 0xb78745,
  pink: 0xd89a91,
  pinkSoft: 0xf2c9c2,
  metal: 0xb9b9b5,
  darkMetal: 0x3e3c3b,
  glass: 0xcfe8e5,
  green: 0x6f8b58,
  leaf2: 0x8ea86c,
  black: 0x222222,
};

const mat = {
  cream: new THREE.MeshStandardMaterial({ color: palette.cream, roughness: .63, metalness: .02 }),
  cream2: new THREE.MeshStandardMaterial({ color: palette.cream2, roughness: .7 }),
  white: new THREE.MeshStandardMaterial({ color: palette.warmWhite, roughness: .58 }),
  wood: new THREE.MeshStandardMaterial({ color: palette.wood, roughness: .55 }),
  woodLight: new THREE.MeshStandardMaterial({ color: palette.woodLight, roughness: .58 }),
  woodDark: new THREE.MeshStandardMaterial({ color: palette.woodDark, roughness: .62 }),
  brass: new THREE.MeshStandardMaterial({ color: palette.brass, roughness: .28, metalness: .78 }),
  pink: new THREE.MeshStandardMaterial({ color: palette.pink, roughness: .78 }),
  pinkSoft: new THREE.MeshStandardMaterial({ color: palette.pinkSoft, roughness: .85 }),
  metal: new THREE.MeshStandardMaterial({ color: palette.metal, roughness: .35, metalness: .72 }),
  darkMetal: new THREE.MeshStandardMaterial({ color: palette.darkMetal, roughness: .32, metalness: .82 }),
  glass: new THREE.MeshPhysicalMaterial({ color: palette.glass, roughness: .08, transmission: .55, transparent: true, opacity: .5, thickness: .2 }),
  green: new THREE.MeshStandardMaterial({ color: palette.green, roughness: .75 }),
  leaf2: new THREE.MeshStandardMaterial({ color: palette.leaf2, roughness: .78 }),
  black: new THREE.MeshStandardMaterial({ color: palette.black, roughness: .32 }),
};

function rounded(w, h, d, material, radius = .09, segments = 4) {
  const g = new RoundedBoxGeometry(w, h, d, segments, Math.min(radius, w * .22, h * .22, d * .22));
  const m = new THREE.Mesh(g, material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function box(w, h, d, material) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cylinder(r, h, material, radial = 24) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, radial), material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cloneMat(base) { return base.clone(); }

function makeTileTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#fff8ef';
  x.fillRect(0, 0, 256, 256);
  x.strokeStyle = '#eadbcf';
  x.lineWidth = 3;
  const s = 64;
  for (let iy = 0; iy <= 4; iy++) {
    for (let ix = 0; ix <= 4; ix++) {
      x.strokeRect(ix * s, iy * s, s, s);
      if (ix < 4 && iy < 4) {
        x.save();
        x.translate(ix * s + s, iy * s + s);
        x.rotate(Math.PI / 4);
        x.fillStyle = '#e7a59d';
        x.fillRect(-8, -8, 16, 16);
        x.restore();
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4.3, 3.3);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeGinghamTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#fff2e8'; x.fillRect(0, 0, 128, 128);
  x.fillStyle = 'rgba(215,137,132,.46)';
  x.fillRect(0, 0, 32, 128); x.fillRect(64, 0, 32, 128);
  x.fillRect(0, 0, 128, 32); x.fillRect(0, 64, 128, 32);
  x.fillStyle = 'rgba(199,114,111,.36)';
  x.fillRect(0, 0, 32, 32); x.fillRect(64, 64, 32, 32);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 2);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeWoodTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#bc7e4d'; x.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 70; i++) {
    x.strokeStyle = `rgba(95,52,25,${0.025 + Math.random() * .04})`;
    x.lineWidth = 1 + Math.random() * 2;
    x.beginPath();
    const y = Math.random() * 256;
    x.moveTo(0, y);
    for (let xx = 0; xx <= 512; xx += 32) x.lineTo(xx, y + Math.sin(xx * .03 + i) * 3);
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const tileMat = new THREE.MeshStandardMaterial({ map: makeTileTexture(), roughness: .76 });
const ginghamMat = new THREE.MeshStandardMaterial({ map: makeGinghamTexture(), roughness: .88 });
const woodTopMat = new THREE.MeshStandardMaterial({ map: makeWoodTexture(), roughness: .5 });

const kitchen = new THREE.Group();
kitchen.name = 'Kitchen3DModular1';
scene.add(kitchen);

// Floor and room shell.
const floor = box(15.6, .22, 11.2, tileMat);
floor.position.set(0, -.12, -.1);
kitchen.add(floor);

const wallBack = box(15.6, 5.5, .18, mat.cream2);
wallBack.position.set(0, 2.75, -5.55);
kitchen.add(wallBack);

const wallLeftA = box(.18, 5.5, 3.15, mat.cream2);
wallLeftA.position.set(-7.72, 2.75, -3.98);
kitchen.add(wallLeftA);
const wallLeftB = box(.18, 5.5, 3.3, mat.cream2);
wallLeftB.position.set(-7.72, 2.75, 3.95);
kitchen.add(wallLeftB);

// Warm wood wall trim.
const trimBack = box(15.7, .18, .23, mat.woodLight);
trimBack.position.set(0, 5.28, -5.42); kitchen.add(trimBack);
const trimLeft = box(.23, .18, 11.2, mat.woodLight);
trimLeft.position.set(-7.59, 5.28, -.1); kitchen.add(trimLeft);

function backsplash(x, z, w, rotY = 0) {
  const planeMat = new THREE.MeshStandardMaterial({ map: makeTileTexture(), roughness: .72 });
  planeMat.map.repeat.set(3.5, 1.5);
  const p = box(w, 1.65, .06, planeMat);
  p.position.set(x, 1.95, z);
  p.rotation.y = rotY;
  kitchen.add(p);
}
backsplash(0.5, -5.42, 11.8, 0);
backsplash(-7.58, -1.55, 7.1, Math.PI / 2);

function cabinetUnit({x, z, w=1.25, d=.72, h=1.05, rot=0, upper=false}) {
  const g = new THREE.Group();
  const body = rounded(w, h, d, mat.cream, .055, 3);
  g.add(body);
  const inset = rounded(w*.84, h*.74, .035, mat.cream2, .025, 2);
  inset.position.z = d/2 + .022;
  g.add(inset);
  const knob = cylinder(.045, .085, mat.brass, 16);
  knob.rotation.x = Math.PI/2;
  knob.position.set(w*.34, .02, d/2+.08);
  g.add(knob);
  g.position.set(x, upper ? 3.65 : h/2, z);
  g.rotation.y = rot;
  kitchen.add(g);
  return g;
}

function counterTop(x, z, w, d, rot=0) {
  const top = rounded(w, .16, d, woodTopMat, .05, 3);
  top.position.set(x, 1.1, z);
  top.rotation.y = rot;
  kitchen.add(top);
  return top;
}

// Back wall base cabinets, split around stove/fridge.
[-5.1,-3.75,-2.4].forEach(x => cabinetUnit({x,z:-5.0,w:1.25,d:.85}));
[-.1,1.2,2.5,3.8].forEach(x => cabinetUnit({x,z:-5.0,w:1.22,d:.85}));
counterTop(-3.75,-5.0,4.0,.94);
counterTop(1.85,-5.0,4.6,.94);

// Left wall run beneath window.
[-4.0,-2.7,-1.4,.0,1.4].forEach(z => cabinetUnit({x:-7.16,z,w:1.22,d:.82,rot:Math.PI/2}));
counterTop(-7.16,-1.35,6.85,.92,Math.PI/2);

// Upper cabinets.
[-4.65,-3.15,-1.05,2.15,3.65].forEach(x => cabinetUnit({x,z:-5.15,w:1.35,d:.48,h:1.25,upper:true}));

// Open shelves.
function shelf(x,y,z,w,rot=0) {
  const s = rounded(w,.12,.42,mat.wood,.03,2); s.position.set(x,y,z); s.rotation.y=rot; kitchen.add(s);
}
shelf(-5.9,3.45,-5.16,1.2); shelf(-5.9,4.05,-5.16,1.2);
shelf(4.85,3.45,-5.16,1.1); shelf(4.85,4.05,-5.16,1.1);
shelf(-7.54,3.28,-3.55,1.45,Math.PI/2); shelf(-7.54,3.9,-3.55,1.45,Math.PI/2);

function tinyJar(x,y,z,color=0xf8efe6) {
  const g = new THREE.Group();
  const body = cylinder(.13,.27,new THREE.MeshStandardMaterial({color,roughness:.7}),18); body.position.y=.135; g.add(body);
  const lid = cylinder(.14,.055,mat.wood,18); lid.position.y=.3; g.add(lid);
  g.position.set(x,y,z); kitchen.add(g); return g;
}
[-6.2,-5.9,-5.6].forEach((x,i)=>tinyJar(x,3.52,-4.92,i===1?0xf2d4ce:0xf9eee2));
[4.55,4.85,5.15].forEach((x,i)=>tinyJar(x,3.52,-4.92,i===2?0xf2d4ce:0xf9eee2));

// Window over sink.
const outdoor = new THREE.Mesh(new THREE.PlaneGeometry(5.2,3.2), new THREE.MeshBasicMaterial({ color:0xc8d8b2 }));
outdoor.position.set(-7.61,3.18,-1.55); outdoor.rotation.y=Math.PI/2; kitchen.add(outdoor);
const frame = new THREE.Group();
for (const z of [-3.45,.35]) { const v=box(.10,3.55,.10,mat.wood); v.position.set(-7.48,3.15,z); frame.add(v); }
for (const z of [-2.48,-1.55,-.62]) { const v=box(.08,3.25,.08,mat.woodLight); v.position.set(-7.45,3.15,z); frame.add(v); }
const topF=box(.12,.12,3.9,mat.wood); topF.position.set(-7.45,4.86,-1.55); frame.add(topF);
const botF=box(.12,.12,3.9,mat.wood); botF.position.set(-7.45,1.48,-1.55); frame.add(botF);
frame.position.set(0,0,0); kitchen.add(frame);

// Pink gingham valance.
const valance = box(.08,.52,3.9,ginghamMat); valance.position.set(-7.32,4.58,-1.55); valance.rotation.y=Math.PI/2; kitchen.add(valance);

// Sink group - independent interactive object.
const sink = new THREE.Group();
sink.name = 'Farmhouse Sink';
const sinkBowl = rounded(1.55,.62,.95,mat.white,.12,5); sinkBowl.position.y=.86; sink.add(sinkBowl);
const sinkDark = rounded(1.22,.08,.66,cloneMat(mat.glass),.06,4); sinkDark.position.set(0,1.18,0); sink.add(sinkDark);
const faucetStem = cylinder(.055,.75,mat.brass,16); faucetStem.position.set(.5,1.55,-.26); sink.add(faucetStem);
const faucetTop = new THREE.Mesh(new THREE.TorusGeometry(.3,.055,10,22,Math.PI),mat.brass); faucetTop.rotation.z=Math.PI/2; faucetTop.position.set(.5,1.87,-.1); sink.add(faucetTop);
sink.position.set(-7.0,0,-1.75); sink.rotation.y=Math.PI/2; kitchen.add(sink);
markInteractive(sink,'Farmhouse Sink',false,'洗菜 / 洗碗');

// Large stove/oven.
const stove = new THREE.Group(); stove.name='Large Stove Oven';
const stoveBody = rounded(1.9,1.22,.95,mat.metal,.07,4); stoveBody.position.y=.61; stove.add(stoveBody);
const ovenGlassMat = new THREE.MeshStandardMaterial({color:0x2d2825,roughness:.18,metalness:.25,emissive:0x000000,emissiveIntensity:0});
const door = rounded(1.55,.62,.055,ovenGlassMat,.035,3); door.position.set(0,.48,.505); stove.add(door);
const cooktop = rounded(1.82,.08,.9,mat.darkMetal,.035,3); cooktop.position.set(0,1.26,0); stove.add(cooktop);
for (const xx of [-.56,0,.56]) for (const zz of [-.25,.25]) { const ring=new THREE.Mesh(new THREE.TorusGeometry(.17,.025,8,24),mat.black); ring.rotation.x=Math.PI/2; ring.position.set(xx,1.31,zz); stove.add(ring); }
for (let i=0;i<7;i++){const k=cylinder(.055,.08,mat.brass,14);k.rotation.x=Math.PI/2;k.position.set(-.62+i*.205,1.03,.49);stove.add(k);}
stove.position.set(.6,0,-5.0); kitchen.add(stove);
markInteractive(stove,'Large Stove Oven',true,'Cook / Bake / Roast');
stove.userData.useFn=()=>{ovenGlassMat.emissive.setHex(0xff6a24);ovenGlassMat.emissiveIntensity=2.2;toast('烤箱预热中 ♨️');setTimeout(()=>{ovenGlassMat.emissiveIntensity=0},1600)};

// Retro refrigerator.
const fridge = new THREE.Group(); fridge.name='Retro Fridge';
const fridgeBody = rounded(1.65,3.45,1.08,mat.cream,.18,7); fridgeBody.position.y=1.725; fridge.add(fridgeBody);
const freezerLine = box(1.48,.035,1.09,mat.woodLight); freezerLine.position.set(0,1.35,.01); fridge.add(freezerLine);
const handle1=rounded(.07,1.0,.08,mat.brass,.03,3);handle1.position.set(.62,2.35,.58);fridge.add(handle1);
const handle2=rounded(.07,.72,.08,mat.brass,.03,3);handle2.position.set(.62,.8,.58);fridge.add(handle2);
fridge.position.set(5.95,0,-4.92); kitchen.add(fridge);
markInteractive(fridge,'Retro Fridge',true,'Open / Store / Take ingredients');
fridge.userData.useFn=()=>{fridge.rotation.z=.015;toast('打开冰箱 · Fridge Interior 🧊');setTimeout(()=>fridge.rotation.z=0,450)};

// Range hood.
const hood = new THREE.Group();
const hoodTop=box(1.25,1.2,.66,mat.cream2);hoodTop.position.y=4.05;hood.add(hoodTop);
const hoodBase=rounded(2.05,.75,.95,mat.cream,.08,4);hoodBase.position.y=3.25;hood.add(hoodBase);
const woodBand=box(2.08,.14,.98,mat.woodLight);woodBand.position.y=3.0;hood.add(woodBand);
hood.position.set(.6,0,-5.12);kitchen.add(hood);

// Peninsula: independent but visually integrated.
const peninsula = new THREE.Group(); peninsula.name='Kitchen Peninsula';
const penBase=rounded(6.25,1.05,1.48,mat.cream,.07,4); penBase.position.y=.525; peninsula.add(penBase);
const penTop=rounded(6.55,.18,1.7,woodTopMat,.07,4);penTop.position.y=1.12;peninsula.add(penTop);
const penShelf=box(1.1,.82,1.25,mat.woodLight);penShelf.position.set(-2.35,.52,0);peninsula.add(penShelf);
peninsula.position.set(-2.15,0,2.2);kitchen.add(peninsula);
markInteractive(peninsula,'Kitchen Peninsula',true,'Prepare / Place appliance');

// Stools as independent objects.
function makeStool(name,x,z){
  const g=new THREE.Group();g.name=name;
  const seat=cylinder(.42,.16,ginghamMat,28);seat.position.y=.92;g.add(seat);
  for(const sx of [-.24,.24])for(const sz of [-.24,.24]){const leg=box(.08,.88,.08,mat.wood);leg.position.set(sx,.44,sz);g.add(leg);}
  const foot=box(.62,.055,.055,mat.woodDark);foot.position.set(0,.34,.30);g.add(foot);
  g.position.set(x,0,z);kitchen.add(g);markInteractive(g,name,true,'Sit');return g;
}
makeStool('Bar Stool 01',-3.45,3.55);
makeStool('Bar Stool 02',-1.85,3.55);

// Pendant lights over peninsula.
function pendant(x,z){
  const g=new THREE.Group();
  const cord=cylinder(.018,2.25,mat.darkMetal,8);cord.position.y=4.4;g.add(cord);
  const shade=new THREE.Mesh(new THREE.SphereGeometry(.38,24,12,0,Math.PI*2,0,Math.PI*.58),new THREE.MeshStandardMaterial({color:0xfff6e8,roughness:.3,side:THREE.DoubleSide}));
  shade.scale.y=.55;shade.position.y=3.28;g.add(shade);
  const bulb=new THREE.PointLight(0xffc987,5.2,5,1.8);bulb.position.y=3.1;g.add(bulb);
  g.position.set(x,0,z);kitchen.add(g);
}
pendant(-3.05,2.2);pendant(-1.25,2.2);

// Minimal plants, intentionally limited.
function plant(x,y,z,s=.45){
  const g=new THREE.Group();
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(s*.45,s*.55,s*.55,18),new THREE.MeshStandardMaterial({color:0xe7c7a9,roughness:.82}));pot.position.y=s*.28;g.add(pot);
  for(let i=0;i<7;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(s*.28,12,8),i%2?mat.green:mat.leaf2);const a=i/7*Math.PI*2;leaf.scale.set(.55,1.35,.38);leaf.rotation.z=(Math.random()-.5)*.6;leaf.position.set(Math.cos(a)*s*.28,s*.75+Math.random()*s*.35,Math.sin(a)*s*.28);g.add(leaf)}
  g.position.set(x,y,z);kitchen.add(g);return g;
}
plant(-6.55,1.15,-4.72,.36);plant(4.65,1.12,-4.68,.34);plant(-7.05,1.1,.25,.34);

// Gingham runner.
const runner = box(4.3,.035,1.05,ginghamMat);runner.position.set(1.35,.03,-3.65);kitchen.add(runner);

// Small cutting boards and utensil rail for life-sim detail.
for (let i=0;i<3;i++){const board=rounded(.46+i*.08,.72,.07,mat.woodLight,.06,3);board.position.set(-2.3+i*.28,1.62,-5.28);board.rotation.z=(-.12+i*.08);kitchen.add(board)}
const rail=box(2.5,.05,.05,mat.brass);rail.position.set(2.15,2.1,-5.28);kitchen.add(rail);
for(let i=0;i<6;i++){const spoon=box(.06,.55,.04,i%2?mat.wood:mat.brass);spoon.position.set(1.25+i*.34,1.78,-5.24);kitchen.add(spoon)}

// Placement slot hints are invisible until Edit Mode.
const slotMat = new THREE.MeshBasicMaterial({ color:0xf1b0aa, transparent:true, opacity:.0, depthWrite:false });
const slots=[];
function slot(name,x,z,w=.9,d=.65){const s=rounded(w,.025,d,slotMat,.04,2);s.position.set(x,1.22,z);s.userData.slotName=name;kitchen.add(s);slots.push(s);return s;}
slot('Counter Appliance Slot A',2.65,-4.96,.9,.55);
slot('Counter Appliance Slot B',3.75,-4.96,.9,.55);
slot('Peninsula Appliance Slot',-.55,2.2,.9,.65);

const interactables=[];
function markInteractive(root, displayName, movable, actionLabel){
  root.userData.interactive=true;
  root.userData.displayName=displayName;
  root.userData.movable=movable;
  root.userData.actionLabel=actionLabel;
  root.userData.homePos=root.position.clone();
  root.userData.homeRot=root.rotation.clone();
  root.traverse(o=>{o.userData.interactiveRoot=root;});
  interactables.push(root);
}

// Existing items were marked before function declaration; function is hoisted.

let editMode=false;
let selected=null;
let helper=null;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function setMode(next){
  editMode=next==='edit';
  previewBtn.classList.toggle('active',!editMode);
  editBtn.classList.toggle('active',editMode);
  modeTitle.textContent=editMode?'Edit Room':'Preview Mode';
  modeHint.textContent=editMode?'点击物件选择 · 按按钮移动/旋转 · 自动保存':'拖动旋转视角 · 滚轮缩放 · 点击物件查看';
  slots.forEach(s=>s.material.opacity=editMode?.22:0);
  if(!editMode){clearSelection();editPanel.classList.add('hidden')}
}

previewBtn.addEventListener('click',()=>setMode('preview'));
editBtn.addEventListener('click',()=>setMode('edit'));
closeEditPanel.addEventListener('click',()=>{clearSelection();editPanel.classList.add('hidden')});

function pick(event){
  const r=renderer.domElement.getBoundingClientRect();
  pointer.x=((event.clientX-r.left)/r.width)*2-1;
  pointer.y=-((event.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(kitchen.children,true);
  let root=null;
  for(const h of hits){
    let o=h.object;
    while(o && o!==kitchen){if(o.userData?.interactive){root=o;break}if(o.userData?.interactiveRoot){root=o.userData.interactiveRoot;break}o=o.parent}
    if(root)break;
  }
  if(!root)return;
  if(editMode)selectObject(root);else toast(`${root.userData.displayName} · ${root.userData.actionLabel}`);
}
renderer.domElement.addEventListener('pointerdown',pick);

function selectObject(root){
  selected=root;
  if(helper){scene.remove(helper);helper.geometry?.dispose?.()}
  helper=new THREE.BoxHelper(root,0xff9f96);scene.add(helper);
  selectedName.textContent=`${root.userData.displayName}${root.userData.movable?' · 可移动':' · 固定'}`;
  editPanel.classList.remove('hidden');
}
function clearSelection(){selected=null;if(helper){scene.remove(helper);helper.geometry?.dispose?.();helper=null}}

function saveLayout(){
  const data={};
  interactables.filter(x=>x.userData.movable).forEach(x=>{data[x.name]={p:x.position.toArray(),r:[x.rotation.x,x.rotation.y,x.rotation.z]}});
  localStorage.setItem('kitchen3dModular1',JSON.stringify(data));
}
function loadLayout(){
  try{const data=JSON.parse(localStorage.getItem('kitchen3dModular1')||'{}');interactables.forEach(x=>{const d=data[x.name];if(!d)return;x.position.fromArray(d.p);x.rotation.set(...d.r)})}catch(e){console.warn('Kitchen layout restore skipped',e)}
}

function nudge(act){
  if(!selected){toast('先选择一个物件');return}
  if(act==='use'){selected.userData.useFn?.();if(!selected.userData.useFn)toast(`${selected.userData.displayName} · ${selected.userData.actionLabel}`);return}
  if(act==='reset'){
    selected.position.copy(selected.userData.homePos);selected.rotation.copy(selected.userData.homeRot);helper?.update();saveLayout();toast('已恢复这个物件的位置');return;
  }
  if(!selected.userData.movable){toast('这是固定结构，装修模式不能移动');return}
  const step=.28;
  if(act==='left')selected.position.x-=step;
  if(act==='right')selected.position.x+=step;
  if(act==='forward')selected.position.z-=step;
  if(act==='back')selected.position.z+=step;
  if(act==='rotateL')selected.rotation.y+=Math.PI/12;
  if(act==='rotateR')selected.rotation.y-=Math.PI/12;
  helper?.update();saveLayout();
}

document.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>nudge(b.dataset.act)));

window.addEventListener('keydown',e=>{
  if(!editMode||!selected)return;
  if(e.key==='ArrowLeft')nudge('left');
  if(e.key==='ArrowRight')nudge('right');
  if(e.key==='ArrowUp')nudge('forward');
  if(e.key==='ArrowDown')nudge('back');
  if(e.key.toLowerCase()==='r')nudge(e.shiftKey?'rotateL':'rotateR');
});

let toastTimer;
function toast(msg){
  toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),1600);
}

function resize(){
  const w=stage.clientWidth,h=stage.clientHeight;
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize);resize();

loadLayout();

renderer.setAnimationLoop(()=>{
  controls.update();
  helper?.update();
  renderer.render(scene,camera);
});

window.KITCHEN_3D_MODULAR_1={
  version:'1.0',scene,kitchen,interactables,saveLayout,
  getSelected:()=>selected
};
