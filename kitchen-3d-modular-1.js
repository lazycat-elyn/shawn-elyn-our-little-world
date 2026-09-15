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
scene.background = new THREE.Color(0xf3e8dc);
scene.fog = new THREE.Fog(0xf3e8dc, 26, 44);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(15, 12.5, 18.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-0.3, 1.65, -0.5);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 11;
controls.maxDistance = 34;
controls.minPolarAngle = Math.PI * 0.18;
controls.maxPolarAngle = Math.PI * 0.47;
controls.panSpeed = 0.7;

scene.add(new THREE.HemisphereLight(0xfff7e9, 0x8a756a, 2.25));
const sun = new THREE.DirectionalLight(0xffd3a0, 4.4);
sun.position.set(-8, 14, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -18;
sun.shadow.camera.right = 18;
sun.shadow.camera.top = 18;
sun.shadow.camera.bottom = -18;
sun.shadow.bias = -0.00025;
scene.add(sun);
const warmFill = new THREE.PointLight(0xffb267, 17, 17, 1.8);
warmFill.position.set(0, 5.5, -3.2);
scene.add(warmFill);

const C = {
  cream: 0xfff8ef, cream2: 0xf2e7da, white: 0xfffdf8,
  wood: 0xb97847, woodLight: 0xd49b69, woodDark: 0x795038,
  brass: 0xb8894e, pink: 0xd9938d, metal: 0xbfc0bd,
  dark: 0x35322f, green: 0x6f8a58, green2: 0x91a971
};
const M = {
  cream: new THREE.MeshStandardMaterial({ color:C.cream, roughness:.62 }),
  cream2:new THREE.MeshStandardMaterial({ color:C.cream2, roughness:.72 }),
  white:new THREE.MeshStandardMaterial({ color:C.white, roughness:.56 }),
  wood:new THREE.MeshStandardMaterial({ color:C.wood, roughness:.55 }),
  woodLight:new THREE.MeshStandardMaterial({ color:C.woodLight, roughness:.58 }),
  woodDark:new THREE.MeshStandardMaterial({ color:C.woodDark, roughness:.6 }),
  brass:new THREE.MeshStandardMaterial({ color:C.brass, roughness:.28, metalness:.75 }),
  pink:new THREE.MeshStandardMaterial({ color:C.pink, roughness:.8 }),
  metal:new THREE.MeshStandardMaterial({ color:C.metal, roughness:.35, metalness:.72 }),
  dark:new THREE.MeshStandardMaterial({ color:C.dark, roughness:.3, metalness:.55 }),
  green:new THREE.MeshStandardMaterial({ color:C.green, roughness:.8 }),
  green2:new THREE.MeshStandardMaterial({ color:C.green2, roughness:.82 })
};

function rb(w,h,d,mat,r=.07){
  const m = new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(r,w*.2,h*.2,d*.2)),mat);
  m.castShadow = true; m.receiveShadow = true; return m;
}
function bx(w,h,d,mat){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.castShadow=true;m.receiveShadow=true;return m; }
function cyl(r,h,mat,n=24){ const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),mat);m.castShadow=true;m.receiveShadow=true;return m; }

function tileTexture(){
  const c=document.createElement('canvas'); c.width=c.height=256; const x=c.getContext('2d');
  x.fillStyle='#fff8ef';x.fillRect(0,0,256,256);x.strokeStyle='#ead9ce';x.lineWidth=3;
  for(let yy=0;yy<256;yy+=64)for(let xx=0;xx<256;xx+=64){x.strokeRect(xx,yy,64,64);x.save();x.translate(xx+64,yy+64);x.rotate(Math.PI/4);x.fillStyle='#e7a39b';x.fillRect(-7,-7,14,14);x.restore();}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4.5,3.3);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function ginghamTexture(){
  const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fff3ea';x.fillRect(0,0,128,128);x.fillStyle='rgba(216,145,139,.48)';x.fillRect(0,0,32,128);x.fillRect(64,0,32,128);x.fillRect(0,0,128,32);x.fillRect(0,64,128,32);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,2);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const tileMat=new THREE.MeshStandardMaterial({map:tileTexture(),roughness:.8});
const ginghamMat=new THREE.MeshStandardMaterial({map:ginghamTexture(),roughness:.85});

const kitchen = new THREE.Group();
scene.add(kitchen);
const interactables=[];
function mark(root,name,movable,action){
  root.name=name;root.userData.interactive=true;root.userData.displayName=name;root.userData.movable=movable;root.userData.actionLabel=action;root.userData.homePos=root.position.clone();root.userData.homeRot=root.rotation.clone();
  root.traverse(o=>o.userData.interactiveRoot=root);interactables.push(root);return root;
}

// Room shell
const floor=bx(15.8,.2,11.2,tileMat);floor.position.y=-.1;kitchen.add(floor);
const back=bx(15.8,5.45,.18,M.cream2);back.position.set(0,2.72,-5.55);kitchen.add(back);
const leftA=bx(.18,5.45,3.1,M.cream2);leftA.position.set(-7.78,2.72,-4);kitchen.add(leftA);
const leftB=bx(.18,5.45,3.1,M.cream2);leftB.position.set(-7.78,2.72,4);kitchen.add(leftB);
const trim=bx(15.8,.16,.22,M.woodLight);trim.position.set(0,5.28,-5.43);kitchen.add(trim);

function cabinet(x,z,w=1.25,rot=0,upper=false){
  const g=new THREE.Group();const h=upper?1.25:1.02,d=upper?.48:.84;
  const body=rb(w,h,d,M.cream,.05);g.add(body);
  const face=rb(w*.84,h*.72,.035,M.cream2,.025);face.position.z=d/2+.022;g.add(face);
  const knob=cyl(.04,.07,M.brass,14);knob.rotation.x=Math.PI/2;knob.position.set(w*.32,0,d/2+.07);g.add(knob);
  g.position.set(x,upper?3.65:h/2,z);g.rotation.y=rot;kitchen.add(g);return g;
}
function top(x,z,w,d,rot=0){const m=rb(w,.16,d,M.woodLight,.04);m.position.set(x,1.1,z);m.rotation.y=rot;kitchen.add(m);return m;}

[-5.1,-3.75,-2.4].forEach(x=>cabinet(x,-5));
[-.15,1.18,2.5,3.82].forEach(x=>cabinet(x,-5));
top(-3.75,-5,4.0,.95);top(1.85,-5,4.6,.95);
[-4.0,-2.7,-1.4,0,1.4].forEach(z=>cabinet(-7.2,z,1.22,Math.PI/2));
top(-7.2,-1.3,6.9,.93,Math.PI/2);
[-4.6,-3.08,-1.08,2.18,3.72].forEach(x=>cabinet(x,-5.15,1.35,0,true));

function shelf(x,y,z,w,rot=0){const s=rb(w,.11,.4,M.wood,.025);s.position.set(x,y,z);s.rotation.y=rot;kitchen.add(s);return s;}
shelf(-5.9,3.45,-5.15,1.2);shelf(-5.9,4.05,-5.15,1.2);shelf(4.85,3.45,-5.15,1.05);shelf(4.85,4.05,-5.15,1.05);

// Window and valance
const outdoor=new THREE.Mesh(new THREE.PlaneGeometry(5.0,3.15),new THREE.MeshBasicMaterial({color:0xcad9b6}));outdoor.position.set(-7.67,3.15,-1.55);outdoor.rotation.y=Math.PI/2;kitchen.add(outdoor);
[-3.42,.32].forEach(z=>{const v=bx(.1,3.5,.1,M.wood);v.position.set(-7.52,3.15,z);kitchen.add(v)});
[-2.48,-1.55,-.62].forEach(z=>{const v=bx(.07,3.15,.07,M.woodLight);v.position.set(-7.48,3.15,z);kitchen.add(v)});
const valance=bx(.07,.5,3.85,ginghamMat);valance.position.set(-7.3,4.55,-1.55);valance.rotation.y=Math.PI/2;kitchen.add(valance);

// Sink
const sink=new THREE.Group();
const sb=rb(1.55,.62,.96,M.white,.11);sb.position.y=.84;sink.add(sb);
const water=rb(1.2,.055,.65,new THREE.MeshStandardMaterial({color:0xcbe1dd,roughness:.15}),.05);water.position.set(0,1.17,0);sink.add(water);
const stem=cyl(.05,.72,M.brass,16);stem.position.set(.48,1.52,-.25);sink.add(stem);
const arc=new THREE.Mesh(new THREE.TorusGeometry(.28,.045,10,20,Math.PI),M.brass);arc.rotation.z=Math.PI/2;arc.position.set(.48,1.84,-.08);sink.add(arc);
sink.position.set(-7.02,0,-1.72);sink.rotation.y=Math.PI/2;kitchen.add(sink);mark(sink,'Farmhouse Sink',false,'Wash / Fill Water');

// Stove oven
const stove=new THREE.Group();const stoveBody=rb(1.95,1.24,.96,M.metal,.07);stoveBody.position.y=.62;stove.add(stoveBody);
const glassMat=new THREE.MeshStandardMaterial({color:0x2d2927,roughness:.2,metalness:.2,emissive:0x000000});const oven=rb(1.58,.62,.05,glassMat,.03);oven.position.set(0,.48,.5);stove.add(oven);
const cook=rb(1.84,.08,.9,M.dark,.03);cook.position.set(0,1.28,0);stove.add(cook);
for(const xx of [-.56,0,.56])for(const zz of [-.24,.24]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.17,.024,8,24),M.dark);ring.rotation.x=Math.PI/2;ring.position.set(xx,1.33,zz);stove.add(ring)}
for(let i=0;i<7;i++){const k=cyl(.05,.08,M.brass,14);k.rotation.x=Math.PI/2;k.position.set(-.62+i*.205,1.04,.49);stove.add(k)}
stove.position.set(.62,0,-5);kitchen.add(stove);mark(stove,'Large Stove Oven',true,'Cook / Bake / Roast');stove.userData.useFn=()=>{glassMat.emissive.setHex(0xff6a20);glassMat.emissiveIntensity=2;toast('烤箱预热中 ♨️');setTimeout(()=>glassMat.emissiveIntensity=0,1400)};

// Hood
const hood=new THREE.Group();const ht=bx(1.22,1.18,.64,M.cream2);ht.position.y=4.05;hood.add(ht);const hb=rb(2.02,.72,.94,M.cream,.07);hb.position.y=3.25;hood.add(hb);const band=bx(2.05,.13,.97,M.woodLight);band.position.y=3.0;hood.add(band);hood.position.set(.62,0,-5.1);kitchen.add(hood);

// Fridge
const fridge=new THREE.Group();const fb=rb(1.68,3.45,1.08,M.cream,.16);fb.position.y=1.725;fridge.add(fb);const line=bx(1.5,.035,1.09,M.woodLight);line.position.set(0,1.36,.01);fridge.add(line);const h1=rb(.07,1.0,.08,M.brass,.025);h1.position.set(.62,2.32,.58);fridge.add(h1);const h2=rb(.07,.72,.08,M.brass,.025);h2.position.set(.62,.78,.58);fridge.add(h2);fridge.position.set(5.95,0,-4.92);kitchen.add(fridge);mark(fridge,'Retro Fridge',true,'Open / Store / Take ingredients');fridge.userData.useFn=()=>toast('打开冰箱 · Fridge Interior 🧊');

// Peninsula
const peninsula=new THREE.Group();const pb=rb(6.25,1.03,1.48,M.cream,.06);pb.position.y=.515;peninsula.add(pb);const pt=rb(6.55,.18,1.7,M.woodLight,.06);pt.position.y=1.12;peninsula.add(pt);const ps=bx(1.1,.78,1.25,M.wood);ps.position.set(-2.32,.5,0);peninsula.add(ps);peninsula.position.set(-2.15,0,2.2);kitchen.add(peninsula);mark(peninsula,'Kitchen Peninsula',true,'Prepare / Place appliance');

function stool(name,x,z){const g=new THREE.Group();const seat=cyl(.42,.15,ginghamMat,28);seat.position.y=.92;g.add(seat);for(const sx of [-.24,.24])for(const sz of [-.24,.24]){const leg=bx(.08,.88,.08,M.wood);leg.position.set(sx,.44,sz);g.add(leg)}g.position.set(x,0,z);kitchen.add(g);mark(g,name,true,'Sit');return g;}
stool('Bar Stool 01',-3.45,3.55);stool('Bar Stool 02',-1.85,3.55);

function pendant(x,z){const g=new THREE.Group();const cord=cyl(.016,2.15,M.dark,8);cord.position.y=4.38;g.add(cord);const shade=new THREE.Mesh(new THREE.SphereGeometry(.38,20,10,0,Math.PI*2,0,Math.PI*.58),M.cream);shade.scale.y=.56;shade.position.y=3.3;g.add(shade);const light=new THREE.PointLight(0xffc987,4.8,5,1.8);light.position.y=3.1;g.add(light);g.position.set(x,0,z);kitchen.add(g)}
pendant(-3.05,2.2);pendant(-1.25,2.2);

function plant(x,y,z,s=.34){const g=new THREE.Group();const pot=cyl(s*.45,s*.52,new THREE.MeshStandardMaterial({color:0xe3c3a8,roughness:.85}),18);pot.position.y=s*.26;g.add(pot);for(let i=0;i<6;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(s*.27,10,8),i%2?M.green:M.green2);const a=i/6*Math.PI*2;leaf.scale.set(.55,1.2,.38);leaf.position.set(Math.cos(a)*s*.25,s*.72+((i%3)*.08),Math.sin(a)*s*.25);g.add(leaf)}g.position.set(x,y,z);kitchen.add(g)}
plant(-6.55,1.13,-4.7);plant(4.7,1.12,-4.7);plant(-7.05,1.08,.2,.31);

const runner=bx(4.2,.035,1.02,ginghamMat);runner.position.set(1.35,.025,-3.63);kitchen.add(runner);

// Edit-only placement hints
const slots=[];const slotMat=new THREE.MeshBasicMaterial({color:0xf0aaa3,transparent:true,opacity:0,depthWrite:false});
function addSlot(x,z,w=.9,d=.55){const s=rb(w,.025,d,slotMat,.03);s.position.set(x,1.22,z);kitchen.add(s);slots.push(s)}
addSlot(2.55,-4.96);addSlot(3.55,-4.96);addSlot(-.55,2.2,.9,.65);

let editMode=false,selected=null,helper=null;const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function setMode(mode){editMode=mode==='edit';previewBtn.classList.toggle('active',!editMode);editBtn.classList.toggle('active',editMode);modeTitle.textContent=editMode?'Edit Room':'Preview Mode';modeHint.textContent=editMode?'点击物件选择 · Move / Rotate · 自动保存':'拖动旋转视角 · 滚轮缩放 · 点击物件查看';slots.forEach(s=>s.material.opacity=editMode?.22:0);if(!editMode){clearSelection();editPanel.classList.add('hidden')}}
previewBtn.onclick=()=>setMode('preview');editBtn.onclick=()=>setMode('edit');closeEditPanel.onclick=()=>{clearSelection();editPanel.classList.add('hidden')};

function pick(e){const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(kitchen.children,true);let root=null;for(const h of hits){let o=h.object;while(o&&o!==kitchen){if(o.userData.interactive){root=o;break}if(o.userData.interactiveRoot){root=o.userData.interactiveRoot;break}o=o.parent}if(root)break}if(!root)return;if(editMode)select(root);else toast(`${root.userData.displayName} · ${root.userData.actionLabel}`)}
renderer.domElement.addEventListener('pointerdown',pick);
function select(root){selected=root;if(helper){scene.remove(helper);helper.geometry?.dispose?.()}helper=new THREE.BoxHelper(root,0xff9f96);scene.add(helper);selectedName.textContent=`${root.userData.displayName}${root.userData.movable?' · 可移动':' · 固定'}`;editPanel.classList.remove('hidden')}
function clearSelection(){selected=null;if(helper){scene.remove(helper);helper.geometry?.dispose?.();helper=null}}

function save(){const data={};interactables.filter(o=>o.userData.movable).forEach(o=>data[o.name]={p:o.position.toArray(),r:[o.rotation.x,o.rotation.y,o.rotation.z]});localStorage.setItem('kitchen3dModular1',JSON.stringify(data))}
function load(){try{const data=JSON.parse(localStorage.getItem('kitchen3dModular1')||'{}');interactables.forEach(o=>{const d=data[o.name];if(d){o.position.fromArray(d.p);o.rotation.set(...d.r)}})}catch(e){console.warn(e)}}
function act(a){if(!selected){toast('先选择一个物件');return}if(a==='use'){selected.userData.useFn?.();if(!selected.userData.useFn)toast(`${selected.userData.displayName} · ${selected.userData.actionLabel}`);return}if(a==='reset'){selected.position.copy(selected.userData.homePos);selected.rotation.copy(selected.userData.homeRot);helper?.update();save();toast('已恢复位置');return}if(!selected.userData.movable){toast('这是固定结构');return}const s=.28;if(a==='left')selected.position.x-=s;if(a==='right')selected.position.x+=s;if(a==='forward')selected.position.z-=s;if(a==='back')selected.position.z+=s;if(a==='rotateL')selected.rotation.y+=Math.PI/12;if(a==='rotateR')selected.rotation.y-=Math.PI/12;helper?.update();save()}
document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act));
window.addEventListener('keydown',e=>{if(!editMode||!selected)return;if(e.key==='ArrowLeft')act('left');if(e.key==='ArrowRight')act('right');if(e.key==='ArrowUp')act('forward');if(e.key==='ArrowDown')act('back');if(e.key.toLowerCase()==='r')act(e.shiftKey?'rotateL':'rotateR')});

let timer;function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toastEl.classList.remove('show'),1600)}
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();load();
renderer.setAnimationLoop(()=>{controls.update();helper?.update();renderer.render(scene,camera)});
window.KITCHEN_3D_MODULAR_1={version:'1.0',scene,kitchen,interactables,save,getSelected:()=>selected};
