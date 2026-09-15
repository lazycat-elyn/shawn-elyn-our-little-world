import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const stage=document.getElementById('stage');
const assetList=document.getElementById('assetList');
const selectedName=document.getElementById('selectedName');
const selectedType=document.getElementById('selectedType');
const toastEl=document.getElementById('toast');
const assembledBtn=document.getElementById('assembledBtn');
const separateBtn=document.getElementById('separateBtn');
const moveMode=document.getElementById('moveMode');
const rotateMode=document.getElementById('rotateMode');
const shopBtn=document.getElementById('shopBtn');
const inventoryBtn=document.getElementById('inventoryBtn');
const shopPanel=document.getElementById('shopPanel');
const inventoryPanel=document.getElementById('inventoryPanel');
const shopGrid=document.getElementById('shopGrid');
const inventoryGrid=document.getElementById('inventoryGrid');
const shopCoins=document.getElementById('shopCoins');

const CATALOG=[
  {id:'airfryer_01',name:'Cream Air Fryer',label:'空气炸锅',icon:'🍟',price:650,action:'Air Fry',desc:'薯条、Nuggets、Chicken Wings'},
  {id:'blender_01',name:'Pastel Blender',label:'果汁机',icon:'🥤',price:520,action:'Blend',desc:'果汁、Smoothie、奶昔'},
  {id:'microwave_01',name:'Cream Microwave',label:'微波炉',icon:'🍱',price:780,action:'Heat / Defrost',desc:'加热剩菜、解冻食材'},
  {id:'ricecooker_01',name:'Cozy Rice Cooker',label:'电饭锅',icon:'🍚',price:600,action:'Cook Rice',desc:'白饭、粥、饭类基础'},
  {id:'coffee_01',name:'Home Coffee Machine',label:'咖啡机',icon:'☕',price:900,action:'Brew Coffee',desc:'Coffee、Latte'},
  {id:'kettle_01',name:'Warm Kettle',label:'热水壶',icon:'🫖',price:350,action:'Boil Water',desc:'热水、茶、泡面'},
  {id:'toaster_01',name:'Retro Toaster',label:'烤面包机',icon:'🍞',price:420,action:'Toast Bread',desc:'Toast、Breakfast'}
];
const catalogById=Object.fromEntries(CATALOG.map(x=>[x.id,x]));
let gameState={coins:1280,owned:[],layout:{}};

const scene=new THREE.Scene();scene.background=new THREE.Color(0xf4e9de);
const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(15,12.8,18.8);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;stage.appendChild(renderer.domElement);
const orbit=new OrbitControls(camera,renderer.domElement);orbit.target.set(-.4,1.6,-.6);orbit.enableDamping=true;orbit.dampingFactor=.06;orbit.minDistance=10;orbit.maxDistance=34;orbit.maxPolarAngle=Math.PI*.49;
const transform=new TransformControls(camera,renderer.domElement);transform.setTranslationSnap(.1);transform.setRotationSnap(Math.PI/12);scene.add(transform);transform.addEventListener('dragging-changed',e=>orbit.enabled=!e.value);
transform.addEventListener('objectChange',()=>{if(selected?.userData.countertop)selected.position.y=selected.userData.counterY||1.32;helper?.update();saveSelectedLayout()});

scene.add(new THREE.HemisphereLight(0xfff7eb,0x8b7568,2.15));
const sun=new THREE.DirectionalLight(0xffd5a7,4.2);sun.position.set(-9,14,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=18;sun.shadow.camera.bottom=-18;scene.add(sun);
const fill=new THREE.PointLight(0xffb774,15,18,1.7);fill.position.set(1,5,-3);scene.add(fill);

const C={cream:0xfff8ef,cream2:0xf3e7da,white:0xfffdf8,wood:0xb97948,wood2:0xd9a06d,woodDark:0x795038,brass:0xb9894f,pink:0xd9958e,metal:0xbebfbc,dark:0x36322f,green:0x789261,glass:0xbfd6d7};
const M={cream:new THREE.MeshStandardMaterial({color:C.cream,roughness:.62}),cream2:new THREE.MeshStandardMaterial({color:C.cream2,roughness:.72}),white:new THREE.MeshStandardMaterial({color:C.white,roughness:.52}),wood:new THREE.MeshStandardMaterial({color:C.wood,roughness:.54}),wood2:new THREE.MeshStandardMaterial({color:C.wood2,roughness:.58}),woodDark:new THREE.MeshStandardMaterial({color:C.woodDark,roughness:.62}),brass:new THREE.MeshStandardMaterial({color:C.brass,roughness:.3,metalness:.72}),pink:new THREE.MeshStandardMaterial({color:C.pink,roughness:.82}),metal:new THREE.MeshStandardMaterial({color:C.metal,roughness:.38,metalness:.68}),dark:new THREE.MeshStandardMaterial({color:C.dark,roughness:.3,metalness:.52}),green:new THREE.MeshStandardMaterial({color:C.green,roughness:.82}),glass:new THREE.MeshStandardMaterial({color:C.glass,roughness:.18,transparent:true,opacity:.72})};
function rb(w,h,d,mat,r=.06){const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(r,w*.18,h*.18,d*.18)),mat);m.castShadow=m.receiveShadow=true;return m}
function bx(w,h,d,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.castShadow=m.receiveShadow=true;return m}
function cyl(r,h,mat,n=24){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),mat);m.castShadow=m.receiveShadow=true;return m}
function gingham(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fff3e9';x.fillRect(0,0,128,128);x.fillStyle='rgba(218,145,138,.48)';x.fillRect(0,0,32,128);x.fillRect(64,0,32,128);x.fillRect(0,0,128,32);x.fillRect(0,64,128,32);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,2);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.85})}
const ginghamMat=gingham();

const kitchen=new THREE.Group();scene.add(kitchen);
const assets=[];const assetMap=new Map();let selected=null,helper=null,separated=false;
function register(root,name,type,action='Inspect',opts={}){root.name=name;root.userData.asset=true;root.userData.assetId=opts.id||name;root.userData.displayName=name;root.userData.type=type;root.userData.actionLabel=action;root.userData.storeable=!!opts.storeable;root.userData.countertop=!!opts.countertop;root.userData.counterY=opts.counterY||root.position.y;root.userData.homePos=root.position.clone();root.userData.homeRot=root.rotation.clone();root.userData.placed=opts.placed!==false;root.traverse(o=>o.userData.assetRoot=root);assets.push(root);assetMap.set(root.userData.assetId,root);return root}

const floor=bx(15.8,.18,11.2,M.cream2);floor.position.y=-.09;kitchen.add(floor);
const back=bx(15.8,5.4,.16,M.cream2);back.position.set(0,2.7,-5.55);kitchen.add(back);
const leftA=bx(.16,5.4,3.2,M.cream2);leftA.position.set(-7.8,2.7,-4);kitchen.add(leftA);
const leftB=bx(.16,5.4,3.0,M.cream2);leftB.position.set(-7.8,2.7,4.1);kitchen.add(leftB);

function baseCab(name,x,z,w=1.25,rot=0){const g=new THREE.Group();g.add(rb(w,1.02,.84,M.cream,.05));const face=rb(w*.84,.72,.035,M.cream2,.025);face.position.z=.44;g.add(face);const knob=cyl(.04,.07,M.brass,14);knob.rotation.x=Math.PI/2;knob.position.set(w*.31,.02,.49);g.add(knob);const top=rb(w,.15,.94,M.wood2,.035);top.position.y=.58;g.add(top);g.position.set(x,.51,z);g.rotation.y=rot;kitchen.add(g);return register(g,name,'Base Cabinet','Open / Storage')}
function upperCab(name,x,z,w=1.3,rot=0){const g=new THREE.Group();g.add(rb(w,1.25,.48,M.cream,.05));const face=rb(w*.84,.93,.03,M.cream2,.02);face.position.z=.255;g.add(face);const knob=cyl(.035,.06,M.brass,12);knob.rotation.x=Math.PI/2;knob.position.set(w*.31,0,.3);g.add(knob);g.position.set(x,3.65,z);g.rotation.y=rot;kitchen.add(g);return register(g,name,'Upper Cabinet','Open / Storage')}
baseCab('Base Cabinet A',-5.15,-5);baseCab('Base Cabinet B',-3.75,-5);baseCab('Base Cabinet C',-2.35,-5);baseCab('Base Cabinet D',2.25,-5);baseCab('Base Cabinet E',3.65,-5);baseCab('Side Cabinet A',-7.2,-3.95,1.2,Math.PI/2);baseCab('Side Cabinet B',-7.2,-2.55,1.2,Math.PI/2);baseCab('Side Cabinet C',-7.2,.15,1.2,Math.PI/2);upperCab('Upper Cabinet A',-4.55,-5.16,1.35);upperCab('Upper Cabinet B',-3.05,-5.16,1.35);upperCab('Upper Cabinet C',2.55,-5.16,1.35);upperCab('Upper Cabinet D',4.0,-5.16,1.35);
function shelf(name,x,y,z,w){const s=rb(w,.11,.4,M.wood,.025);s.position.set(x,y,z);kitchen.add(s);return register(s,name,'Wall Shelf','Decor / Storage')}
shelf('Shelf Left 01',-6.15,3.45,-5.13,1.15);shelf('Shelf Left 02',-6.15,4.05,-5.13,1.15);shelf('Shelf Right 01',4.9,3.45,-5.13,1.05);shelf('Shelf Right 02',4.9,4.05,-5.13,1.05);

const outdoor=new THREE.Mesh(new THREE.PlaneGeometry(5,3.15),new THREE.MeshBasicMaterial({color:0xc9d9b7}));outdoor.position.set(-7.67,3.15,-1.55);outdoor.rotation.y=Math.PI/2;kitchen.add(outdoor);
const frame1=bx(.08,3.5,.08,M.wood);frame1.position.set(-7.52,3.15,-3.42);kitchen.add(frame1);const frame2=frame1.clone();frame2.position.z=.32;kitchen.add(frame2);

const sink=new THREE.Group();const sb=rb(1.55,.65,.96,M.white,.1);sb.position.y=.86;sink.add(sb);const basin=rb(1.18,.06,.66,M.glass,.05);basin.position.set(0,1.2,0);sink.add(basin);const stem=cyl(.05,.72,M.brass,16);stem.position.set(.47,1.5,-.25);sink.add(stem);sink.position.set(-7.02,0,-1.7);sink.rotation.y=Math.PI/2;kitchen.add(sink);register(sink,'Farmhouse Sink','Appliance','Wash / Fill Water');sink.userData.useFn=()=>toast('Wash / Fill Water 💧');

const stove=new THREE.Group();const stBody=rb(1.98,1.25,.98,M.metal,.07);stBody.position.y=.625;stove.add(stBody);const glass=rb(1.6,.64,.05,M.dark,.03);glass.position.set(0,.47,.51);stove.add(glass);const cook=rb(1.86,.08,.9,M.dark,.03);cook.position.set(0,1.3,0);stove.add(cook);for(const xx of[-.55,0,.55])for(const zz of[-.24,.24]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.17,.024,8,24),M.dark);ring.rotation.x=Math.PI/2;ring.position.set(xx,1.35,zz);stove.add(ring)}stove.position.set(.65,0,-5);kitchen.add(stove);register(stove,'Large Stove Oven','Appliance','Cook / Bake / Roast');stove.userData.useFn=()=>toast('Cook / Bake / Roast ♨️');

const hood=new THREE.Group();const hb=rb(2.05,.72,.94,M.cream,.07);hb.position.y=3.25;hood.add(hb);const ht=bx(1.22,1.18,.64,M.cream2);ht.position.y=4.05;hood.add(ht);const band=bx(2.08,.13,.97,M.wood2);band.position.y=3.0;hood.add(band);hood.position.set(.65,0,-5.1);kitchen.add(hood);register(hood,'Range Hood','Appliance','Vent / Light');

const fridge=new THREE.Group();const fb=rb(1.72,3.48,1.1,M.cream,.16);fb.position.y=1.74;fridge.add(fb);const split=bx(1.5,.035,1.1,M.wood2);split.position.set(0,1.37,.01);fridge.add(split);for(const yy of[2.32,.78]){const h=rb(.07,yy>1?1:.72,.08,M.brass,.025);h.position.set(.62,yy,.59);fridge.add(h)}fridge.position.set(5.95,0,-4.92);kitchen.add(fridge);register(fridge,'Retro Fridge','Appliance','Open / Store / Take ingredients');fridge.userData.useFn=()=>toast('Open Fridge 🧊');

const peninsula=new THREE.Group();const pb=rb(6.25,1.03,1.5,M.cream,.06);pb.position.y=.515;peninsula.add(pb);const pt=rb(6.55,.18,1.72,M.wood2,.06);pt.position.y=1.12;peninsula.add(pt);peninsula.position.set(-2.15,0,2.2);kitchen.add(peninsula);register(peninsula,'Kitchen Peninsula','Furniture','Prepare / Place appliance');
function stool(name,x,z){const g=new THREE.Group();const seat=cyl(.42,.15,ginghamMat,28);seat.position.y=.92;g.add(seat);for(const sx of[-.24,.24])for(const sz of[-.24,.24]){const leg=bx(.08,.88,.08,M.wood);leg.position.set(sx,.44,sz);g.add(leg)}g.position.set(x,0,z);kitchen.add(g);register(g,name,'Furniture','Sit');return g}
stool('Bar Stool 01',-3.45,3.55);stool('Bar Stool 02',-1.85,3.55);
function pendant(name,x,z){const g=new THREE.Group();const cord=cyl(.016,2.1,M.dark,8);cord.position.y=4.4;g.add(cord);const shade=new THREE.Mesh(new THREE.SphereGeometry(.38,20,10,0,Math.PI*2,0,Math.PI*.58),M.cream);shade.scale.y=.56;shade.position.y=3.32;g.add(shade);const l=new THREE.PointLight(0xffc786,5.5,4.5,1.8);l.position.y=3.05;g.add(l);g.position.set(x,0,z);kitchen.add(g);register(g,name,'Lighting','Toggle Light');g.userData.useFn=()=>{l.visible=!l.visible;toast(l.visible?'Light on ✨':'Light off')};return g}
pendant('Pendant Light 01',-2.95,2.2);pendant('Pendant Light 02',-.95,2.2);
const rug=rb(4.4,.035,1.55,ginghamMat,.02);rug.position.set(.8,.03,-3.55);kitchen.add(rug);register(rug,'Pink Gingham Runner','Decor','Move / Store');
function plant(name,x,z){const g=new THREE.Group();const pot=cyl(.18,.28,M.cream2,18);pot.position.y=.14;g.add(pot);for(let i=0;i<7;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),M.green);leaf.scale.set(.55,1.2,.45);const a=i/7*Math.PI*2;leaf.position.set(Math.cos(a)*.15,.42+Math.sin(i)*.04,Math.sin(a)*.15);leaf.rotation.z=Math.cos(a)*.5;g.add(leaf)}g.position.set(x,0,z);kitchen.add(g);register(g,name,'Decor','Move / Store')}
plant('Plant 01',-6.4,-4.9);plant('Plant 02',4.8,-4.9);

const COUNTER_SLOTS=[new THREE.Vector3(2.35,1.35,-4.72),new THREE.Vector3(3.25,1.35,-4.72),new THREE.Vector3(4.15,1.35,-4.72),new THREE.Vector3(-3.2,1.35,2.2),new THREE.Vector3(-2.1,1.35,2.2),new THREE.Vector3(-1.0,1.35,2.2),new THREE.Vector3(.1,1.35,2.2)];
COUNTER_SLOTS.forEach(v=>{const m=rb(.7,.025,.5,new THREE.MeshBasicMaterial({color:0xf3aaa0,transparent:true,opacity:0}),.03);m.position.copy(v);kitchen.add(m)});

function createAirFryer(){const g=new THREE.Group();const body=rb(.62,.62,.55,M.cream,.13);body.position.y=.31;g.add(body);const face=rb(.48,.34,.03,M.dark,.05);face.position.set(0,.29,.29);g.add(face);const screen=rb(.16,.07,.02,M.glass,.02);screen.position.set(0,.48,.31);g.add(screen);const handle=rb(.3,.06,.08,M.woodDark,.03);handle.position.set(0,.18,.36);g.add(handle);return g}
function createBlender(){const g=new THREE.Group();const base=rb(.42,.25,.42,M.cream,.08);base.position.y=.125;g.add(base);const jar=cyl(.22,.55,M.glass,20);jar.position.y=.55;g.add(jar);const lid=cyl(.24,.06,M.pink,20);lid.position.y=.86;g.add(lid);const knob=cyl(.04,.08,M.brass,14);knob.position.set(.12,.16,.22);knob.rotation.x=Math.PI/2;g.add(knob);return g}
function createMicrowave(){const g=new THREE.Group();const body=rb(.82,.5,.55,M.cream,.08);body.position.y=.25;g.add(body);const door=rb(.54,.34,.025,M.dark,.03);door.position.set(-.08,.25,.29);g.add(door);for(let i=0;i<3;i++){const b=cyl(.035,.025,M.brass,12);b.rotation.x=Math.PI/2;b.position.set(.3,.34-i*.11,.3);g.add(b)}return g}
function createRiceCooker(){const g=new THREE.Group();const body=cyl(.28,.42,M.cream,28);body.position.y=.22;g.add(body);const lid=cyl(.3,.08,M.pink,28);lid.position.y=.47;g.add(lid);const handle=rb(.28,.05,.07,M.woodDark,.03);handle.position.set(0,.56,0);g.add(handle);return g}
function createCoffee(){const g=new THREE.Group();const base=rb(.48,.12,.46,M.dark,.04);base.position.y=.06;g.add(base);const tower=rb(.42,.65,.38,M.cream,.08);tower.position.set(0,.42,-.04);g.add(tower);const head=cyl(.12,.08,M.metal,18);head.rotation.x=Math.PI/2;head.position.set(0,.42,.21);g.add(head);const cup=rb(.16,.15,.16,M.white,.04);cup.position.set(0,.15,.12);g.add(cup);return g}
function createKettle(){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),M.cream);body.scale.y=.82;body.position.y=.28;body.castShadow=true;body.receiveShadow=true;g.add(body);const lid=cyl(.16,.05,M.pink,20);lid.position.y=.52;g.add(lid);const handle=new THREE.Mesh(new THREE.TorusGeometry(.31,.035,10,24,Math.PI*1.25),M.woodDark);handle.rotation.z=Math.PI/2;handle.position.set(-.13,.3,0);g.add(handle);return g}
function createToaster(){const g=new THREE.Group();const body=rb(.58,.34,.38,M.cream,.11);body.position.y=.17;g.add(body);for(const x of[-.13,.13]){const slot=rb(.18,.015,.2,M.dark,.02);slot.position.set(x,.35,0);g.add(slot)}const lever=rb(.04,.18,.04,M.brass,.02);lever.position.set(.34,.2,.05);g.add(lever);return g}
const applianceFactories={airfryer_01:createAirFryer,blender_01:createBlender,microwave_01:createMicrowave,ricecooker_01:createRiceCooker,coffee_01:createCoffee,kettle_01:createKettle,toaster_01:createToaster};

function ensureAppliance(id){if(assetMap.has(id))return assetMap.get(id);const def=catalogById[id];if(!def)return null;const g=applianceFactories[id]();const saved=gameState.layout[id];const slot=COUNTER_SLOTS[Math.max(0,gameState.owned.indexOf(id))%COUNTER_SLOTS.length]||COUNTER_SLOTS[0];g.position.copy(saved?.p?new THREE.Vector3(...saved.p):slot);g.rotation.set(...(saved?.r||[0,0,0]));const placed=saved?.placed===true;g.visible=placed;kitchen.add(g);register(g,def.name,'Purchased Appliance',def.action,{id,storeable:true,countertop:true,counterY:g.position.y,placed});g.userData.useFn=()=>useAppliance(g,id);return g}
function syncOwnedAssets(){gameState.owned.forEach(ensureAppliance);renderAssetList();renderShop();renderInventory()}
function useAppliance(root,id){const def=catalogById[id];if(!root.userData.placed){toast('先从 Inventory 放到厨房');return}const oldScale=root.scale.clone();root.scale.multiplyScalar(1.05);setTimeout(()=>root.scale.copy(oldScale),260);toast(`${def.label} · ${def.action} ✨`);postToParent('kitchen-appliance-use',{id})}

assets.forEach(a=>{a.userData.homePos=a.position.clone();a.userData.homeRot=a.rotation.clone()});
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function select(root){selected=root;transform.detach();if(helper){scene.remove(helper);helper.geometry?.dispose?.()}helper=new THREE.BoxHelper(root,0xff8e84);scene.add(helper);selectedName.textContent=root.userData.displayName;selectedType.textContent=`${root.userData.type} · ${root.userData.actionLabel}${root.userData.storeable&&!root.userData.placed?' · Stored':''}`;document.querySelectorAll('.asset-item').forEach(b=>b.classList.toggle('active',b.dataset.asset===root.userData.assetId));if(!separated&&root.visible&&root.userData.placed!==false){transform.attach(root);transform.setMode(moveMode.classList.contains('active')?'translate':'rotate')}}
renderer.domElement.addEventListener('pointerdown',e=>{if(transform.dragging)return;const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(kitchen.children,true);for(const h of hits){let o=h.object;while(o&&o!==kitchen){if(o.userData.assetRoot){select(o.userData.assetRoot);return}o=o.parent}}});
function renderAssetList(){assetList.innerHTML='';assets.forEach(a=>{if(a.userData.storeable&&!gameState.owned.includes(a.userData.assetId))return;const b=document.createElement('button');b.className=`asset-item${selected===a?' active':''}${a.userData.storeable&&!a.userData.placed?' stored':''}`;b.dataset.asset=a.userData.assetId;b.innerHTML=`<span class="asset-dot"></span><span><b>${a.userData.displayName}</b><small>${a.userData.type}${a.userData.storeable&&!a.userData.placed?' · Stored':''}</small></span>`;b.onclick=()=>select(a);assetList.appendChild(b)})}

moveMode.onclick=()=>{moveMode.classList.add('active');rotateMode.classList.remove('active');if(selected&&!separated)transform.setMode('translate')};
rotateMode.onclick=()=>{rotateMode.classList.add('active');moveMode.classList.remove('active');if(selected&&!separated)transform.setMode('rotate')};
function act(a){if(!selected){toast('先选择一个物件');return}if(a==='use'){selected.userData.useFn?.();if(!selected.userData.useFn)toast(selected.userData.actionLabel);return}if(a==='store'){if(!selected.userData.storeable){toast('这个物件不能收进 Inventory');return}storeAppliance(selected.userData.assetId);return}if(a==='hide'){selected.visible=!selected.visible;transform.detach();helper?.update();toast(selected.visible?'Show':'Hidden');return}if(a==='reset'){selected.position.copy(selected.userData.homePos);selected.rotation.copy(selected.userData.homeRot);helper?.update();saveSelectedLayout();toast('已恢复位置');return}if(selected.userData.storeable&&!selected.userData.placed){toast('先从 Inventory 点 Place');return}const s=.22;if(a==='left')selected.position.x-=s;if(a==='right')selected.position.x+=s;if(a==='forward')selected.position.z-=s;if(a==='back')selected.position.z+=s;if(a==='rotateL')selected.rotation.y+=Math.PI/12;if(a==='rotateR')selected.rotation.y-=Math.PI/12;if(selected.userData.countertop)selected.position.y=selected.userData.counterY;helper?.update();saveSelectedLayout()}
document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act));

function saveSelectedLayout(){if(!selected?.userData.storeable)return;const id=selected.userData.assetId;gameState.layout[id]={placed:!!selected.userData.placed,p:selected.position.toArray(),r:[selected.rotation.x,selected.rotation.y,selected.rotation.z]};postToParent('kitchen-appliance-layout',{id,layout:gameState.layout[id]});fallbackSave()}
function nextFreeSlot(){const used=gameState.owned.filter(id=>gameState.layout[id]?.placed).map(id=>gameState.layout[id]?.p).filter(Boolean);return COUNTER_SLOTS.find(v=>!used.some(p=>Math.hypot(v.x-p[0],v.z-p[2])<.65))||COUNTER_SLOTS[Math.floor(Math.random()*COUNTER_SLOTS.length)]}
function placeAppliance(id){if(!gameState.owned.includes(id)){toast('要先购买');return}const root=ensureAppliance(id);const saved=gameState.layout[id];if(!saved?.placed){const slot=nextFreeSlot();root.position.copy(slot);root.rotation.set(0,0,0)}root.userData.placed=true;root.visible=true;gameState.layout[id]={placed:true,p:root.position.toArray(),r:[root.rotation.x,root.rotation.y,root.rotation.z]};postToParent('kitchen-appliance-layout',{id,layout:gameState.layout[id]});fallbackSave();select(root);renderAssetList();renderInventory();closeDrawers();toast(`${catalogById[id].label} 已放到台面 · 可以 Move / Rotate`) }
function storeAppliance(id){const root=assetMap.get(id);if(!root)return;root.userData.placed=false;root.visible=false;transform.detach();gameState.layout[id]={placed:false,p:root.position.toArray(),r:[root.rotation.x,root.rotation.y,root.rotation.z]};postToParent('kitchen-appliance-layout',{id,layout:gameState.layout[id]});fallbackSave();renderAssetList();renderInventory();select(root);toast(`${catalogById[id].label} 已收进 Inventory`) }

function renderShop(){shopCoins.textContent=gameState.coins;shopGrid.innerHTML=CATALOG.map(d=>{const owned=gameState.owned.includes(d.id);return `<article class="shop-card"><div class="appliance-icon">${d.icon}</div><b>${d.label}<br><span>${d.name}</span></b><p>${d.desc}</p><div class="price">🪙 ${d.price}</div><div class="card-actions"><button data-buy="${d.id}" ${owned?'disabled':''}>${owned?'✓ 已拥有':'购买'}</button>${owned?`<button class="secondary" data-place="${d.id}">Place</button>`:''}</div></article>`}).join('');shopGrid.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buyAppliance(b.dataset.buy));shopGrid.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>placeAppliance(b.dataset.place))}
function renderInventory(){const owned=gameState.owned.map(id=>catalogById[id]).filter(Boolean);inventoryGrid.innerHTML=owned.length?owned.map(d=>{const placed=!!gameState.layout[d.id]?.placed;return `<article class="inventory-card"><div class="appliance-icon">${d.icon}</div><b>${d.label}</b><p>${placed?'已摆放在厨房':'Stored · 等待摆放'}</p><div class="card-actions"><button data-place="${d.id}">${placed?'Select':'Place'}</button>${placed?`<button class="secondary" data-store="${d.id}">Store</button>`:''}</div></article>`}).join(''):'<div class="inventory-card"><b>还没有购买小家电</b><p>打开 Shop 买第一件吧 ♡</p></div>';inventoryGrid.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{const id=b.dataset.place;if(gameState.layout[id]?.placed){closeDrawers();select(ensureAppliance(id))}else placeAppliance(id)});inventoryGrid.querySelectorAll('[data-store]').forEach(b=>b.onclick=()=>storeAppliance(b.dataset.store))}
function buyAppliance(id){const def=catalogById[id];if(!def||gameState.owned.includes(id))return;postToParent('kitchen-appliance-buy',{id,price:def.price});toast(`购买 ${def.label}…`)}
function openDrawer(which){shopPanel.classList.toggle('hidden',which!=='shop');inventoryPanel.classList.toggle('hidden',which!=='inventory');if(which==='shop')renderShop();else renderInventory()}
function closeDrawers(){shopPanel.classList.add('hidden');inventoryPanel.classList.add('hidden')}
shopBtn.onclick=()=>openDrawer('shop');inventoryBtn.onclick=()=>openDrawer('inventory');document.querySelectorAll('[data-close-drawer]').forEach(b=>b.onclick=closeDrawers);

function setSeparated(on){separated=on;assembledBtn.classList.toggle('active',!on);separateBtn.classList.toggle('active',on);transform.detach();if(on){let i=0;assets.filter(a=>a.visible).forEach(a=>{a.userData.tempAssembled=a.position.clone();const col=i%5,row=Math.floor(i/5);a.position.set(-7+col*3.3,.1+Math.min(a.position.y,1.2),-4+row*2.7);i++});camera.position.set(18,15,23);orbit.target.set(0,1,0)}else{assets.forEach(a=>{if(a.userData.tempAssembled){a.position.copy(a.userData.tempAssembled);delete a.userData.tempAssembled}});camera.position.set(15,12.8,18.8);orbit.target.set(-.4,1.6,-.6)}helper?.update()}
assembledBtn.onclick=()=>setSeparated(false);separateBtn.onclick=()=>setSeparated(true);

function postToParent(type,payload={}){if(window.parent!==window){window.parent.postMessage({source:'kitchen3d',type,...payload},'*')}}
window.addEventListener('message',e=>{const d=e.data;if(!d||d.source!=='shawn-elyn-parent')return;if(d.type==='kitchen-appliance-state'){gameState={coins:Number(d.coins)||0,owned:Array.isArray(d.owned)?d.owned:[],layout:d.layout&&typeof d.layout==='object'?d.layout:{}};fallbackSave();syncOwnedAssets();toast('厨房电器资料已同步')}if(d.type==='kitchen-appliance-buy-result'){if(d.ok)toast(`买到了 ${catalogById[d.id]?.label||'电器'} ♡`);else toast(d.message||'购买失败')}});
function fallbackSave(){try{localStorage.setItem('kitchenApplianceShop1Fallback',JSON.stringify(gameState))}catch{}}
function fallbackLoad(){try{const x=JSON.parse(localStorage.getItem('kitchenApplianceShop1Fallback')||'null');if(x)gameState=x}catch{}}
fallbackLoad();
if(window.parent===window){syncOwnedAssets()}else postToParent('kitchen-appliance-query');

let timer;function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toastEl.classList.remove('show'),1700)}
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();renderAssetList();renderShop();renderInventory();
renderer.setAnimationLoop(()=>{orbit.update();helper?.update();renderer.render(scene,camera)});
