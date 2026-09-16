import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.2 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,transform,kitchen,assetMap,register,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight,toast}=api;
const isEmbed=new URLSearchParams(location.search).get('embed')==='1';

// --- Embedded presentation: start as a clean game scene, not an editor -------
if(isEmbed){
  document.body.classList.add('k22-embedded','k13-life');
  window.KITCHEN_3D_POLISH_13?.setMode?.('life');
  transform.detach();
}

function setEdit(on){
  document.body.classList.toggle('k22-edit',on);
  document.body.classList.toggle('k13-life',!on);
  if(!on) transform.detach();
  window.KITCHEN_3D_POLISH_13?.setMode?.(on?'decor':'life');
}

const dock=document.createElement('div');
dock.className='k22-dock';
dock.innerHTML=`<button data-k22="life" class="active">♡ Life</button><button data-k22="edit">🛠 Decor</button><button data-k22="view">🎞 View</button><button data-k22="shop">🛍 Shop</button><button data-k22="bag">📦 Bag</button>`;
document.querySelector('.workarea')?.appendChild(dock);
dock.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  const a=b.dataset.k22;
  if(a==='life'){setEdit(false)}
  if(a==='edit'){setEdit(true)}
  if(a==='view'){referenceView22()}
  if(a==='shop')document.getElementById('shopBtn')?.click();
  if(a==='bag')document.getElementById('inventoryBtn')?.click();
  dock.querySelectorAll('[data-k22="life"],[data-k22="edit"]').forEach(x=>x.classList.toggle('active',(a==='life'&&x.dataset.k22==='life')||(a==='edit'&&x.dataset.k22==='edit')));
});

// --- More photographic stylized PBR response --------------------------------
const pmrem=new THREE.PMREMGenerator(renderer);
const room=new RoomEnvironment();
scene.environment=pmrem.fromScene(room,.05).texture;
room.dispose();pmrem.dispose();
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.02;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
[M.cream,M.cream2,M.ivory,M.wood,M.wood2,M.woodLight,M.woodDark,M.brass,M.metal,M.dark].forEach(m=>{if(!m)return;m.envMapIntensity=m===M.brass||m===M.metal?1.35:.55;m.needsUpdate=true});

// Camera: fill the available game viewport and match the cozy isometric target.
const REF22={pos:new THREE.Vector3(13.1,10.25,15.35),target:new THREE.Vector3(-.55,1.55,-1.0),fov:24.5};
function referenceView22(){
  camera.position.copy(REF22.pos); camera.fov=REF22.fov; camera.updateProjectionMatrix();
  orbit.target.copy(REF22.target); orbit.update();
}
referenceView22();
orbit.minDistance=10.5;orbit.maxDistance=23;

// --- Replace the crude hood with a cleaner farmhouse hood --------------------
const oldHood=assetMap.get('Statement Range Hood');
if(oldHood) oldHood.visible=false;
const hood=new THREE.Group();
const hoodShape=new THREE.Shape();
hoodShape.moveTo(-1.12,-.62);hoodShape.lineTo(1.12,-.62);hoodShape.lineTo(.64,.62);hoodShape.lineTo(-.64,.62);hoodShape.closePath();
const hoodShell=new THREE.Mesh(new THREE.ExtrudeGeometry(hoodShape,{depth:.62,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.045,bevelThickness:.045}),M.cream);
hoodShell.castShadow=hoodShell.receiveShadow=true;hoodShell.position.set(0,3.48,-.32);hood.add(hoodShell);
const chimney=rb(1.16,1.38,.62,M.cream2,.035);chimney.position.set(0,4.65,0);hood.add(chimney);
const hoodBand=rb(2.42,.16,.88,M.woodLight,.025);hoodBand.position.set(0,2.82,0);hood.add(hoodBand);
const hoodLip=rb(2.18,.08,.8,M.brass,.018);hoodLip.position.set(0,2.72,.02);hood.add(hoodLip);
hood.position.set(.55,0,-5.2);kitchen.add(hood);register(hood,'Farmhouse Range Hood 2.2','Appliance','Vent / Light');

// --- Continuous counters: removes the segmented blocky look -----------------
const overlay=new THREE.Group();overlay.name='KitchenVisual22';kitchen.add(overlay);
function counter(x,z,w,d,rot=0){const top=rb(w,.11,d,M.wood2,.028);top.position.set(x,1.145,z);top.rotation.y=rot;overlay.add(top);return top}
counter(-3.75,-5.08,5.1,1.05);counter(3.78,-5.08,3.7,1.05);counter(-7.34,-3.48,3.25,1.02,Math.PI/2);counter(-7.34,-.36,2.1,1.02,Math.PI/2);

// Warm baseboard + subtle grounding shadows.
const kickMat=new THREE.MeshStandardMaterial({color:0x6f4a37,roughness:.8,transparent:true,opacity:.22});
const groundMat=new THREE.MeshBasicMaterial({color:0x5a4438,transparent:true,opacity:.08,depthWrite:false});
function kick(x,z,w,d,rot=0){const k=rb(w,.13,d,kickMat,.02);k.position.set(x,.085,z);k.rotation.y=rot;overlay.add(k)}
kick(-3.6,-5.42,5.6,.12);kick(3.8,-5.42,3.65,.12);kick(-7.66,-2.65,4.9,.12,Math.PI/2);
function ground(x,z,sx,sz){const q=new THREE.Mesh(new THREE.CircleGeometry(1,40),groundMat);q.rotation.x=-Math.PI/2;q.scale.set(sx,sz,1);q.position.set(x,.05,z);overlay.add(q)}
ground(.55,-5.05,1.25,.62);ground(6.15,-4.95,1.05,.62);ground(-2.2,2.25,3.5,.72);

// --- Stove detailing ----------------------------------------------------------
const oldStove=assetMap.get('Large Stove Oven');
if(oldStove){
  const frame=rb(1.72,.72,.055,M.cream,.025);frame.position.set(.55,.52,-4.48);overlay.add(frame);
  const ovenGlass=rb(1.48,.48,.035,M.dark,.02);ovenGlass.position.set(.55,.5,-4.44);overlay.add(ovenGlass);
  const ovenHandle=rb(1.45,.055,.08,M.brass,.02);ovenHandle.position.set(.55,.88,-4.40);overlay.add(ovenHandle);
  for(let i=0;i<6;i++){const k=cyl(.07,.075,M.brass,18);k.rotation.x=Math.PI/2;k.position.set(-.08+i*.255,1.12,-4.43);overlay.add(k)}
  const pot=cyl(.32,.28,M.pink,28);pot.position.set(.55,1.62,-5.02);overlay.add(pot);const lid=cyl(.25,.04,M.brass,24);lid.position.set(.55,1.78,-5.02);overlay.add(lid);
}

// --- Cabinet face trims + stronger brass pulls -------------------------------
for(const a of api.assets){
  if(!/Base|Drawer Cabinet/.test(a.userData.displayName||''))continue;
  const box=new THREE.Box3().setFromObject(a);const size=new THREE.Vector3();box.getSize(size);
  if(size.x<.6||size.y<.5)continue;
  const trim=rb(Math.min(size.x*.7,.82),Math.min(size.y*.52,.52),.018,M.cream2,.015);
  trim.position.copy(a.position);trim.position.y=.54;trim.position.z+=a.rotation.y?0:.49;
  if(Math.abs(a.rotation.y)>1){trim.rotation.y=a.rotation.y;trim.position.x+=a.rotation.y>0?-.48:.48}
  overlay.add(trim);
}

// --- Reference-style wall panel grooves --------------------------------------
const grooveMat=new THREE.MeshBasicMaterial({color:0xc9aa93,transparent:true,opacity:.16});
for(let x=-7.45;x<7.5;x+=.62){const g=bx(.018,2.15,.012,grooveMat);g.position.set(x,4.48,-5.59);overlay.add(g)}
for(let z=-5.15;z<5.1;z+=.62){const g=bx(.012,2.15,.018,grooveMat);g.position.set(-7.9,4.48,z);overlay.add(g)}

// --- More life around the window and shelves ---------------------------------
function miniPlant(x,y,z,s=.13){const g=new THREE.Group();const pot=cyl(s,s*1.25,M.cream2,18);pot.position.y=s*.62;g.add(pot);for(let i=0;i<8;i++){const leaf=sphere(s*.5,M.green,10);leaf.scale.set(.5,1.35,.4);const a=i/8*Math.PI*2;leaf.position.set(Math.cos(a)*s*.65,s*1.85,Math.sin(a)*s*.65);leaf.rotation.z=Math.cos(a)*.55;g.add(leaf)}g.position.set(x,y,z);overlay.add(g)}
miniPlant(-6.45,1.18,-4.72,.12);miniPlant(4.72,1.18,-4.72,.11);miniPlant(6.18,3.65,-4.9,.15);

// small ceramic set on open shelves
for(const [x,y] of [[-6.25,3.55],[-5.85,4.14],[5.05,3.55],[5.42,4.14]]){
  const jar=cyl(.1,.22,M.cream,18);jar.position.set(x,y,-5.08);overlay.add(jar);const lid=cyl(.1,.035,M.woodLight,18);lid.position.set(x,y+.13,-5.08);overlay.add(lid);
}

// Make glass slightly clearer and wood slightly richer.
if(M.glass){M.glass.opacity=.5;M.glass.roughness=.08;M.glass.needsUpdate=true}
if(M.wood2){M.wood2.color.offsetHSL(0,.03,.025);M.wood2.needsUpdate=true}

// Stronger but controlled golden-hour key light.
if(sun){sun.intensity=4.1;sun.color.set(0xffd49a);sun.shadow.bias=-.0002;sun.shadow.normalBias=.022}
if(bounce){bounce.intensity=5.4;bounce.color.set(0xffc085)}
if(taskLight){taskLight.intensity=3.8}

// Life mode should never show transform arrows. Decor mode restores them.
const originalSelect=api.select;
window.addEventListener('pointerdown',()=>{if(!document.body.classList.contains('k22-edit'))transform.detach()},true);
const observer=new MutationObserver(()=>{if(document.body.classList.contains('k13-life')||!document.body.classList.contains('k22-edit'))transform.detach()});
observer.observe(document.body,{attributes:true,attributeFilter:['class']});

window.KITCHEN_3D_HIFI_22={version:'2.2',referenceView:referenceView22,setEdit,group:overlay};
