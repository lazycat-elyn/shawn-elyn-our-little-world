const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.4 internal API unavailable');
const {THREE,scene,kitchen,assetMap,camera,renderer,orbit,transform,M,rb,bx,cyl,sphere,torus}=api;

const old=kitchen.getObjectByName('KitchenHeroRebuild340');
if(old) old.removeFromParent();
const hero=new THREE.Group();
hero.name='KitchenHeroRebuild340';
kitchen.add(hero);

function setVisible(id,on){
  const a=assetMap.get(id);
  if(a) a.visible=on;
  return a;
}
function home(a){
  if(!a)return;
  a.userData.homePos=a.position.clone();
  a.userData.homeRot=a.rotation.clone();
}

// Remove visual overlay passes that were duplicating the approved master scene.
for(const name of ['KitchenReferenceMatch300','KitchenReferenceFix310','KitchenModularSplit320','KitchenModularSplit330']){
  const g=kitchen.getObjectByName(name);
  if(g) g.visible=false;
}

// Hide the crude replacement modules from 3.2 / 3.3.
[
  'Modular Peninsula Table',
  'Modular Gingham Stool 01',
  'Modular Gingham Stool 02',
  'Modular Stove Oven',
  'Modular Range Hood',
  'Modular Farmhouse Sink',
  'Modular Retro Fridge',
  'Modular Glass Display Cabinet',
  'Left Open Shelf Lower',
  'Left Open Shelf Upper',
  'Right Open Shelf Lower',
  'Right Open Shelf Upper',
  'Left Shelf Jar Set',
  'Right Shelf Jar Set',
  'Modular Pendant Light 01',
  'Modular Pendant Light 02',
  'Fridge Top Plant',
  'Sink Flower Vase',
  'Sink Soap Dispenser',
  'Modular Botanical Wall Art',
  'Pink Gingham Runner'
].forEach(id=>setVisible(id,false));

// Restore the polished reference-master assets.
// These are already independent registered elements; we only restore their approved geometry/positions.
const pen=setVisible('Reference L Peninsula 2.7',true);
if(pen){
  pen.scale.set(1,1,1);
  pen.position.set(0,0,0);
  pen.rotation.set(0,0,0);
  home(pen);
}

const stool1=setVisible('Gingham Stool 01',true);
if(stool1){
  stool1.scale.set(1,1,1);
  stool1.position.set(-3.75,0,3.48);
  stool1.rotation.set(0,0,0);
  home(stool1);
}
const stool2=setVisible('Gingham Stool 02',true);
if(stool2){
  stool2.scale.set(1,1,1);
  stool2.position.set(-1.90,0,3.48);
  stool2.rotation.set(0,0,0);
  home(stool2);
}

const sink=setVisible('Farmhouse Sink',true);
if(sink){
  sink.scale.set(1,1,1);
  sink.position.set(-3.30,0,-5.02);
  sink.rotation.set(0,0,0);
  home(sink);
}

const stove=setVisible('Large Stove Oven',true);
if(stove){
  stove.scale.set(1,1,1);
  stove.position.set(.72,0,-5.02);
  stove.rotation.set(0,0,0);
  // Hide the baked-in pot/lid so the pot can stay an independent movable element.
  if(stove.children.length>=2){
    stove.children[stove.children.length-1].visible=false;
    stove.children[stove.children.length-2].visible=false;
  }
  home(stove);
}

const hood=setVisible('Farmhouse Range Hood 2.2',true);
if(hood){
  hood.scale.set(1,1,1);
  hood.position.set(.72,0,-5.24);
  hood.rotation.set(0,0,0);
  home(hood);
}

const fridge=setVisible('Retro Fridge',true);
if(fridge){
  fridge.scale.set(1,1,1);
  fridge.position.set(6.05,0,-4.96);
  fridge.rotation.set(0,0,0);
  home(fridge);
}

const upper=setVisible('Upper Cabinet 1',true);
if(upper){
  upper.scale.set(1,1,1);
  upper.position.set(-1.08,3.86,-5.34);
  upper.rotation.set(0,0,0);
  home(upper);
}

for(const id of ['Reference Shelf Left Low','Reference Shelf Left High','Reference Shelf Right Low','Reference Shelf Right High']){
  setVisible(id,true);
}

const p1=setVisible('Pendant Light 01',true);
if(p1){
  p1.scale.set(1,1,1);
  p1.position.set(-3.65,0,1.10);
  p1.rotation.set(0,0,0);
  home(p1);
}
const p2=setVisible('Pendant Light 02',true);
if(p2){
  p2.scale.set(1,1,1);
  p2.position.set(-1.65,0,1.10);
  p2.rotation.set(0,0,0);
  home(p2);
}

const rug=setVisible('Reference Gingham Rug 2.7',true);
if(rug){
  rug.position.set(.55,.075,-2.38);
  rug.scale.set(1,1,1);
  home(rug);
}

// Keep the useful standalone modular appliances, but place them deliberately.
const air=setVisible('Modular Air Fryer',true);
if(air){
  air.position.set(-4.72,1.27,1.62);
  air.rotation.set(0,Math.PI*.04,0);
  home(air);
}
const toaster=setVisible('Modular Toaster',true);
if(toaster){
  toaster.position.set(4.55,1.28,-4.69);
  toaster.rotation.set(0,0,0);
  home(toaster);
}
const pot=setVisible('Modular Pink Cook Pot',true);
if(pot){
  pot.position.set(.30,1.37,-5.05);
  pot.rotation.set(0,0,0);
  home(pot);
}
const fruit=setVisible('Modular Fruit Basket',true);
if(fruit){
  fruit.position.set(-2.45,1.30,2.15);
  fruit.rotation.set(0,0,0);
  home(fruit);
}
const boards=setVisible('Modular Cutting Boards',true);
if(boards){
  boards.position.set(-.52,1.28,-5.30);
  boards.rotation.set(0,0,0);
  home(boards);
}
const spice=setVisible('Modular Spice & Oil Set',true);
if(spice){
  spice.position.set(2.28,1.28,-4.67);
  spice.rotation.set(0,0,0);
  home(spice);
}

// Add subtle wood grain accents to the approved L-shaped countertop.
// These are visual only and stay inside the hero pass.
const grainMat=new THREE.MeshStandardMaterial({color:0x8f5d37,roughness:.78,transparent:true,opacity:.13});
for(let i=0;i<16;i++){
  const q=bx(6.05,.009,.018,grainMat);
  q.position.set(-2.70,1.215,1.45+i*.09);
  hero.add(q);
}
for(let i=0;i<14;i++){
  const q=bx(.018,.009,6.25,grainMat);
  q.position.set(-6.12+i*.09,1.215,-.43);
  hero.add(q);
}

// Grounding shadows under the L peninsula and stools.
const shadowMat=new THREE.MeshBasicMaterial({color:0x4d3429,transparent:true,opacity:.07,depthWrite:false});
function contact(x,z,sx,sz,op=.07){
  const m=shadowMat.clone();m.opacity=op;
  const q=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),m);
  q.rotation.x=-Math.PI/2;
  q.position.set(x,.022,z);
  hero.add(q);
}
contact(-2.70,2.16,6.55,1.75,.065);
contact(-5.46,-.43,1.85,6.85,.06);
contact(-3.75,3.48,.90,.90,.08);
contact(-1.90,3.48,.90,.90,.08);

// A few high-value countertop details, individually readable but not cluttered.
const ivory=new THREE.MeshStandardMaterial({color:0xfff4e8,roughness:.6});
const brass=new THREE.MeshStandardMaterial({color:0x9f7047,roughness:.42,metalness:.55});
const green=new THREE.MeshStandardMaterial({color:0x748160,roughness:.9});
const pink=new THREE.MeshStandardMaterial({color:0xe5aaa0,roughness:.88});

const vase=cyl(.12,.27,ivory,18);vase.position.set(-3.35,1.39,2.16);hero.add(vase);
for(let i=0;i<7;i++){
  const st=bx(.01,.28,.01,green);st.position.set(-3.35+(i-3)*.026,1.62,2.16+(i%2-.5)*.035);hero.add(st);
  const fl=sphere(.046,i%2?ivory:pink,10);fl.position.set(st.position.x,1.80+(i%2)*.025,st.position.z);hero.add(fl);
}
const mug=rb(.17,.19,.17,ivory,.045);mug.position.set(-1.58,1.31,2.17);hero.add(mug);
const mh=torus(.095,.017,ivory,Math.PI*1.5);mh.rotation.y=Math.PI/2;mh.position.set(-1.47,1.36,2.17);hero.add(mh);

// Stronger composition: kitchen fills the frame like the approved reference.
try{
  camera.position.set(12.0,9.15,14.35);
  camera.fov=24.5;
  camera.updateProjectionMatrix();
  orbit.target.set(-.62,1.72,-1.02);
  orbit.update();
  orbit.minDistance=10;
  orbit.maxDistance=22;
}catch(e){}

// Re-grade the scene after all legacy passes have executed.
scene.traverse(o=>{
  if(o.isHemisphereLight) o.intensity=Math.min(o.intensity,.58);
  else if(o.isDirectionalLight) o.intensity=Math.min(o.intensity,1.18);
  else if(o.isSpotLight) o.intensity=Math.min(o.intensity,.90);
  else if(o.isPointLight) o.intensity=Math.min(o.intensity,.72);
  if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}
});
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=.72;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.domElement.style.filter='saturate(1.08) contrast(1.11) brightness(.955)';
scene.background.set(0xe4d2c3);

// Life mode must never show editor gizmos or selection boxes.
function enforceLifeClean(){
  const edit=document.body.classList.contains('k22-edit');
  if(!edit){
    transform.detach();
    transform.visible=false;
    scene.traverse(o=>{if(o.type==='BoxHelper')o.visible=false;});
  }else{
    transform.visible=true;
  }
}
document.addEventListener('click',()=>setTimeout(enforceLifeClean,0),true);
new MutationObserver(()=>setTimeout(enforceLifeClean,0)).observe(document.body,{attributes:true,attributeFilter:['class']});
setInterval(enforceLifeClean,240);
enforceLifeClean();

window.KITCHEN_3D_HERO_REBUILD_34={version:'3.4',group:hero};
