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

const scene=new THREE.Scene();scene.background=new THREE.Color(0xf4e9de);
const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(15,12.8,18.8);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;stage.appendChild(renderer.domElement);
const orbit=new OrbitControls(camera,renderer.domElement);orbit.target.set(-.4,1.6,-.6);orbit.enableDamping=true;orbit.dampingFactor=.06;orbit.minDistance=10;orbit.maxDistance=34;orbit.maxPolarAngle=Math.PI*.49;
const transform=new TransformControls(camera,renderer.domElement);transform.setTranslationSnap(.2);transform.setRotationSnap(Math.PI/12);scene.add(transform);transform.addEventListener('dragging-changed',e=>orbit.enabled=!e.value);transform.addEventListener('objectChange',()=>{helper?.update();saveLayout()});

scene.add(new THREE.HemisphereLight(0xfff7eb,0x8b7568,2.15));
const sun=new THREE.DirectionalLight(0xffd5a7,4.2);sun.position.set(-9,14,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=18;sun.shadow.camera.bottom=-18;scene.add(sun);
const fill=new THREE.PointLight(0xffb774,15,18,1.7);fill.position.set(1,5,-3);scene.add(fill);

const C={cream:0xfff8ef,cream2:0xf3e7da,white:0xfffdf8,wood:0xb97948,wood2:0xd9a06d,woodDark:0x795038,brass:0xb9894f,pink:0xd9958e,metal:0xbebfbc,dark:0x36322f,green:0x789261};
const M={cream:new THREE.MeshStandardMaterial({color:C.cream,roughness:.62}),cream2:new THREE.MeshStandardMaterial({color:C.cream2,roughness:.72}),white:new THREE.MeshStandardMaterial({color:C.white,roughness:.52}),wood:new THREE.MeshStandardMaterial({color:C.wood,roughness:.54}),wood2:new THREE.MeshStandardMaterial({color:C.wood2,roughness:.58}),woodDark:new THREE.MeshStandardMaterial({color:C.woodDark,roughness:.62}),brass:new THREE.MeshStandardMaterial({color:C.brass,roughness:.3,metalness:.72}),pink:new THREE.MeshStandardMaterial({color:C.pink,roughness:.82}),metal:new THREE.MeshStandardMaterial({color:C.metal,roughness:.38,metalness:.68}),dark:new THREE.MeshStandardMaterial({color:C.dark,roughness:.3,metalness:.52}),green:new THREE.MeshStandardMaterial({color:C.green,roughness:.82})};
function rb(w,h,d,mat,r=.06){const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(r,w*.18,h*.18,d*.18)),mat);m.castShadow=m.receiveShadow=true;return m}
function bx(w,h,d,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.castShadow=m.receiveShadow=true;return m}
function cyl(r,h,mat,n=24){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),mat);m.castShadow=m.receiveShadow=true;return m}
function gingham(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fff3e9';x.fillRect(0,0,128,128);x.fillStyle='rgba(218,145,138,.48)';x.fillRect(0,0,32,128);x.fillRect(64,0,32,128);x.fillRect(0,0,128,32);x.fillRect(0,64,128,32);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,2);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.85})}
const ginghamMat=gingham();

const kitchen=new THREE.Group();scene.add(kitchen);
const assets=[];let selected=null,helper=null,separated=false;
function register(root,name,type,action='Inspect'){root.name=name;root.userData.asset=true;root.userData.displayName=name;root.userData.type=type;root.userData.actionLabel=action;root.userData.homePos=root.position.clone();root.userData.homeRot=root.rotation.clone();root.userData.visibleState=true;root.traverse(o=>o.userData.assetRoot=root);assets.push(root);return root}

// fixed shell only
const floor=bx(15.8,.18,11.2,M.cream2);floor.position.y=-.09;kitchen.add(floor);
const back=bx(15.8,5.4,.16,M.cream2);back.position.set(0,2.7,-5.55);kitchen.add(back);
const leftA=bx(.16,5.4,3.2,M.cream2);leftA.position.set(-7.8,2.7,-4);kitchen.add(leftA);
const leftB=bx(.16,5.4,3.0,M.cream2);leftB.position.set(-7.8,2.7,4.1);kitchen.add(leftB);

function baseCab(name,x,z,w=1.25,rot=0){const g=new THREE.Group();g.add(rb(w,1.02,.84,M.cream,.05));const face=rb(w*.84,.72,.035,M.cream2,.025);face.position.z=.44;g.add(face);const knob=cyl(.04,.07,M.brass,14);knob.rotation.x=Math.PI/2;knob.position.set(w*.31,.02,.49);g.add(knob);const top=rb(w,.15,.94,M.wood2,.035);top.position.y=.58;g.add(top);g.position.set(x,.51,z);g.rotation.y=rot;kitchen.add(g);return register(g,name,'Base Cabinet','Open / Storage')}
function upperCab(name,x,z,w=1.3,rot=0){const g=new THREE.Group();g.add(rb(w,1.25,.48,M.cream,.05));const face=rb(w*.84,.93,.03,M.cream2,.02);face.position.z=.255;g.add(face);const knob=cyl(.035,.06,M.brass,12);knob.rotation.x=Math.PI/2;knob.position.set(w*.31,0,.3);g.add(knob);g.position.set(x,3.65,z);g.rotation.y=rot;kitchen.add(g);return register(g,name,'Upper Cabinet','Open / Storage')}

baseCab('Base Cabinet A',-5.15,-5);baseCab('Base Cabinet B',-3.75,-5);baseCab('Base Cabinet C',-2.35,-5);baseCab('Base Cabinet D',2.25,-5);baseCab('Base Cabinet E',3.65,-5);
baseCab('Side Cabinet A',-7.2,-3.95,1.2,Math.PI/2);baseCab('Side Cabinet B',-7.2,-2.55,1.2,Math.PI/2);baseCab('Side Cabinet C',-7.2,.15,1.2,Math.PI/2);
upperCab('Upper Cabinet A',-4.55,-5.16,1.35);upperCab('Upper Cabinet B',-3.05,-5.16,1.35);upperCab('Upper Cabinet C',2.55,-5.16,1.35);upperCab('Upper Cabinet D',4.0,-5.16,1.35);

function shelf(name,x,y,z,w){const s=rb(w,.11,.4,M.wood,.025);s.position.set(x,y,z);kitchen.add(s);return register(s,name,'Wall Shelf','Decor / Storage')}
shelf('Shelf Left 01',-6.15,3.45,-5.13,1.15);shelf('Shelf Left 02',-6.15,4.05,-5.13,1.15);shelf('Shelf Right 01',4.9,3.45,-5.13,1.05);shelf('Shelf Right 02',4.9,4.05,-5.13,1.05);

// window fixed
const outdoor=new THREE.Mesh(new THREE.PlaneGeometry(5,3.15),new THREE.MeshBasicMaterial({color:0xc9d9b7}));outdoor.position.set(-7.67,3.15,-1.55);outdoor.rotation.y=Math.PI/2;kitchen.add(outdoor);
const frame1=bx(.08,3.5,.08,M.wood);frame1.position.set(-7.52,3.15,-3.42);kitchen.add(frame1);const frame2=frame1.clone();frame2.position.z=.32;kitchen.add(frame2);

// sink
const sink=new THREE.Group();const sb=rb(1.55,.65,.96,M.white,.1);sb.position.y=.86;sink.add(sb);const basin=rb(1.18,.06,.66,new THREE.MeshStandardMaterial({color:0xcbdedc,roughness:.2}),.05);basin.position.set(0,1.2,0);sink.add(basin);const stem=cyl(.05,.72,M.brass,16);stem.position.set(.47,1.5,-.25);sink.add(stem);sink.position.set(-7.02,0,-1.7);sink.rotation.y=Math.PI/2;kitchen.add(sink);register(sink,'Farmhouse Sink','Appliance','Wash / Fill Water');sink.userData.useFn=()=>toast('Wash / Fill Water 💧');

// stove
const stove=new THREE.Group();const stBody=rb(1.98,1.25,.98,M.metal,.07);stBody.position.y=.625;stove.add(stBody);const glass=rb(1.6,.64,.05,M.dark,.03);glass.position.set(0,.47,.51);stove.add(glass);const cook=rb(1.86,.08,.9,M.dark,.03);cook.position.set(0,1.3,0);stove.add(cook);for(const xx of[-.55,0,.55])for(const zz of[-.24,.24]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.17,.024,8,24),M.dark);ring.rotation.x=Math.PI/2;ring.position.set(xx,1.35,zz);stove.add(ring)}stove.position.set(.65,0,-5);kitchen.add(stove);register(stove,'Large Stove Oven','Appliance','Cook / Bake / Roast');stove.userData.useFn=()=>toast('Cook / Bake / Roast ♨️');

// hood
const hood=new THREE.Group();const hb=rb(2.05,.72,.94,M.cream,.07);hb.position.y=3.25;hood.add(hb);const ht=bx(1.22,1.18,.64,M.cream2);ht.position.y=4.05;hood.add(ht);const band=bx(2.08,.13,.97,M.wood2);band.position.y=3.0;hood.add(band);hood.position.set(.65,0,-5.1);kitchen.add(hood);register(hood,'Range Hood','Appliance','Vent / Light');

// fridge
const fridge=new THREE.Group();const fb=rb(1.72,3.48,1.1,M.cream,.16);fb.position.y=1.74;fridge.add(fb);const split=bx(1.5,.035,1.1,M.wood2);split.position.set(0,1.37,.01);fridge.add(split);for(const yy of[2.32,.78]){const h=rb(.07,yy>1?1:.72,.08,M.brass,.025);h.position.set(.62,yy,.59);fridge.add(h)}fridge.position.set(5.95,0,-4.92);kitchen.add(fridge);register(fridge,'Retro Fridge','Appliance','Open / Store / Take ingredients');fridge.userData.useFn=()=>toast('Open Fridge 🧊');

// peninsula
const peninsula=new THREE.Group();const pb=rb(6.25,1.03,1.5,M.cream,.06);pb.position.y=.515;peninsula.add(pb);const pt=rb(6.55,.18,1.72,M.wood2,.06);pt.position.y=1.12;peninsula.add(pt);peninsula.position.set(-2.15,0,2.2);kitchen.add(peninsula);register(peninsula,'Kitchen Peninsula','Furniture','Prepare / Place appliance');

function stool(name,x,z){const g=new THREE.Group();const seat=cyl(.42,.15,ginghamMat,28);seat.position.y=.92;g.add(seat);for(const sx of[-.24,.24])for(const sz of[-.24,.24]){const leg=bx(.08,.88,.08,M.wood);leg.position.set(sx,.44,sz);g.add(leg)}g.position.set(x,0,z);kitchen.add(g);register(g,name,'Furniture','Sit');return g}
stool('Bar Stool 01',-3.45,3.55);stool('Bar Stool 02',-1.85,3.55);

function pendant(name,x,z){const g=new THREE.Group();const cord=cyl(.016,2.1,M.dark,8);cord.position.y=4.4;g.add(cord);const shade=new THREE.Mesh(new THREE.SphereGeometry(.38,20,10,0,Math.PI*2,0,Math.PI*.58),M.cream);shade.scale.y=.56;shade.position.y=3.32;g.add(shade);const l=new THREE.PointLight(0xffc786,5.5,4.5,1.8);l.position.y=3.05;g.add(l);g.position.set(x,0,z);kitchen.add(g);register(g,name,'Lighting','Toggle Light');g.userData.useFn=()=>{l.visible=!l.visible;toast(l.visible?'Light on ✨':'Light off')};return g}
pendant('Pendant Light 01',-2.95,2.2);pendant('Pendant Light 02',-.95,2.2);

// rug
const rug=rb(4.4,.035,1.55,ginghamMat,.02);rug.position.set(.8,.03,-3.55);kitchen.add(rug);register(rug,'Pink Gingham Runner','Decor','Move / Store');

// simple plants as standalone decor
function plant(name,x,z){const g=new THREE.Group();const pot=cyl(.18,.28,M.cream2,18);pot.position.y=.14;g.add(pot);for(let i=0;i<7;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),M.green);leaf.scale.set(.55,1.2,.45);const a=i/7*Math.PI*2;leaf.position.set(Math.cos(a)*.15,.42+Math.sin(i)*.04,Math.sin(a)*.15);leaf.rotation.z=Math.cos(a)*.5;g.add(leaf)}g.position.set(x,0,z);kitchen.add(g);register(g,name,'Decor','Move / Store')}
plant('Plant 01',-6.4,-4.9);plant('Plant 02',4.8,-4.9);

// restore home transforms now that positions are final
assets.forEach(a=>{a.userData.homePos=a.position.clone();a.userData.homeRot=a.rotation.clone()});

const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function select(root){selected=root;transform.detach();if(helper){scene.remove(helper);helper.geometry?.dispose?.()}helper=new THREE.BoxHelper(root,0xff8e84);scene.add(helper);selectedName.textContent=root.userData.displayName;selectedType.textContent=`${root.userData.type} · ${root.userData.actionLabel}`;document.querySelectorAll('.asset-item').forEach(b=>b.classList.toggle('active',b.dataset.asset===root.name));if(!separated){transform.attach(root);transform.setMode(moveMode.classList.contains('active')?'translate':'rotate')}}
renderer.domElement.addEventListener('pointerdown',e=>{if(transform.dragging)return;const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(kitchen.children,true);for(const h of hits){let o=h.object;while(o&&o!==kitchen){if(o.userData.asset){select(o);return}if(o.userData.assetRoot){select(o.userData.assetRoot);return}o=o.parent}}});

function rebuildList(){assetList.innerHTML='';assets.forEach(a=>{const b=document.createElement('button');b.className='asset-item';b.dataset.asset=a.name;b.innerHTML=`<span class="asset-dot"></span><span>${a.userData.displayName}<small>${a.userData.type}</small></span>`;b.onclick=()=>select(a);assetList.appendChild(b)})}
rebuildList();

moveMode.onclick=()=>{moveMode.classList.add('active');rotateMode.classList.remove('active');if(selected&&!separated){transform.attach(selected);transform.setMode('translate')}};
rotateMode.onclick=()=>{rotateMode.classList.add('active');moveMode.classList.remove('active');if(selected&&!separated){transform.attach(selected);transform.setMode('rotate')}};

function saveLayout(){if(separated)return;const data={};assets.forEach(a=>data[a.name]={p:a.position.toArray(),r:[a.rotation.x,a.rotation.y,a.rotation.z],v:a.visible});localStorage.setItem('kitchen3dModular11',JSON.stringify(data))}
function loadLayout(){try{const data=JSON.parse(localStorage.getItem('kitchen3dModular11')||'{}');assets.forEach(a=>{const d=data[a.name];if(!d)return;a.position.fromArray(d.p);a.rotation.set(...d.r);a.visible=d.v!==false})}catch(e){console.warn(e)}}
loadLayout();

function action(act){if(!selected){toast('先从左边选择一个独立物件');return}if(act==='use'){selected.userData.useFn?.();if(!selected.userData.useFn)toast(`${selected.userData.displayName} · ${selected.userData.actionLabel}`);return}if(act==='hide'){selected.visible=!selected.visible;transform.detach();helper.visible=selected.visible;saveLayout();toast(selected.visible?'Show':'Hidden');return}if(act==='reset'){selected.position.copy(selected.userData.homePos);selected.rotation.copy(selected.userData.homeRot);selected.visible=true;helper?.update();saveLayout();toast('已恢复这个物件');return}if(separated){toast('先回 Assembled 才能移动');return}const s=.25;if(act==='left')selected.position.x-=s;if(act==='right')selected.position.x+=s;if(act==='forward')selected.position.z-=s;if(act==='back')selected.position.z+=s;if(act==='rotateL')selected.rotation.y+=Math.PI/12;if(act==='rotateR')selected.rotation.y-=Math.PI/12;helper?.update();saveLayout()}
document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>action(b.dataset.act));

const assembledCache=new Map();
function setSeparate(flag){if(flag===separated)return;separated=flag;assembledBtn.classList.toggle('active',!flag);separateBtn.classList.toggle('active',flag);transform.detach();if(flag){assets.forEach((a,i)=>{assembledCache.set(a,{p:a.position.clone(),r:a.rotation.clone()});const cols=5,row=Math.floor(i/cols),col=i%cols;a.position.set(-6+col*3,0.15+row*.1,-3+row*2.7);a.rotation.set(0,0,0)});toast('Separate View：现在可以清楚看到每个 object 都是独立的')}else{assets.forEach(a=>{const d=assembledCache.get(a);if(d){a.position.copy(d.p);a.rotation.copy(d.r)}});assembledCache.clear();if(selected)transform.attach(selected);toast('回到真实厨房布局')}}
assembledBtn.onclick=()=>setSeparate(false);separateBtn.onclick=()=>setSeparate(true);

window.addEventListener('keydown',e=>{if(!selected)return;if(e.key==='Delete')action('hide');if(e.key==='ArrowLeft')action('left');if(e.key==='ArrowRight')action('right');if(e.key==='ArrowUp')action('forward');if(e.key==='ArrowDown')action('back')});

let timer;function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toastEl.classList.remove('show'),1800)}
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();
renderer.setAnimationLoop(()=>{orbit.update();helper?.update();renderer.render(scene,camera)});