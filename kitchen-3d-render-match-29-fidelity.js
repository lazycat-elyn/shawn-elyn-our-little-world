const api=window.KITCHEN_3D_INTERNAL;
const render29=window.KITCHEN_3D_RENDER_29;
if(!api) throw new Error('Kitchen 2.9 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,transform,kitchen,assetMap,rb,bx,cyl,sphere,torus}=api;

document.body.classList.add('k291-fidelity-ready');
const previous=kitchen.getObjectByName('KitchenReferenceFidelity291');
if(previous) previous.removeFromParent();
const pass=new THREE.Group();
pass.name='KitchenReferenceFidelity291';
kitchen.add(pass);

const cream=new THREE.MeshStandardMaterial({color:0xead7bd,roughness:.63,metalness:0});
const creamLight=new THREE.MeshStandardMaterial({color:0xf5e8d6,roughness:.56,metalness:0});
const ivory=new THREE.MeshStandardMaterial({color:0xfff4e6,roughness:.5,metalness:0});
const honey=new THREE.MeshStandardMaterial({color:0xb97945,roughness:.56,metalness:0});
const honeyLight=new THREE.MeshStandardMaterial({color:0xd69b63,roughness:.6,metalness:0});
const brass=new THREE.MeshStandardMaterial({color:0x9b693d,roughness:.42,metalness:.58});
const peach=new THREE.MeshStandardMaterial({color:0xd98f84,roughness:.86,metalness:0});
const blush=new THREE.MeshStandardMaterial({color:0xe7ada3,roughness:.9,metalness:0});
const sage=new THREE.MeshStandardMaterial({color:0x6e785e,roughness:.9,metalness:0});
const dark=new THREE.MeshStandardMaterial({color:0x3e332e,roughness:.45,metalness:.12});
const basketMat=new THREE.MeshStandardMaterial({color:0xa9754f,roughness:.92});

function roundedPanel(w,h,d,mat,x,y,z,parent=pass,r=.03){
 const p=rb(w,h,d,mat,r);p.position.set(x,y,z);parent.add(p);return p;
}
function leaf(x,y,z,s=.1,parent=pass){
 const l=sphere(s,sage,12);l.scale.set(.55,1.25,.42);l.position.set(x,y,z);parent.add(l);return l;
}
function tinyPlant(x,y,z,s=.12,parent=pass){
 const pot=cyl(s,s*1.22,cream,18);pot.position.set(x,y+s*.6,z);parent.add(pot);
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const l=leaf(x+Math.cos(a)*s*.66,y+s*1.9,z+Math.sin(a)*s*.62,s*.52,parent);l.rotation.z=Math.cos(a)*.52;l.rotation.x=Math.sin(a)*.18}
}
function jar(x,y,z,s=.1,mat=ivory,parent=pass){
 const j=cyl(s,s*2.05,mat,18);j.position.set(x,y,z);parent.add(j);const lid=cyl(s*1.03,s*.22,brass,16);lid.position.set(x,y+s*1.14,z);parent.add(lid);return j;
}
function frameArt(x,y,z,w,h,accent=peach,parent=pass){
 const back=rb(w,h,.055,honeyLight,.025);back.position.set(x,y,z);parent.add(back);
 const paper=rb(w*.84,h*.82,.026,ivory,.018);paper.position.set(x,y,z+.04);parent.add(paper);
 const stem=bx(.018,h*.34,.018,sage);stem.position.set(x,y-.03,z+.064);parent.add(stem);
 for(const dx of[-.11,0,.11]){const p=sphere(.045,accent,10);p.scale.set(1,.7,.45);p.position.set(x+dx,y+.08+Math.abs(dx)*.3,z+.072);parent.add(p)}
}
function basket(x,y,z,w=.55,h=.3,d=.34,parent=pass){
 const b=rb(w,h,d,basketMat,.05);b.position.set(x,y,z);parent.add(b);
 for(let i=-2;i<=2;i++){const rib=bx(.018,h*.78,d*1.02,honeyLight);rib.position.set(x+i*w*.16,y,z+.01);parent.add(rib)}
 const handle=torus(w*.3,.025,honey,Math.PI);handle.rotation.x=Math.PI/2;handle.rotation.z=Math.PI;handle.position.set(x,y+h*.55,z);parent.add(handle);return b;
}

// Push the hero assets toward the approved reference proportions without touching interaction wiring.
const pen=assetMap.get('Reference L Peninsula 2.7');
if(pen){pen.scale.set(.86,.98,.86);pen.position.set(.12,0,-.04);pen.userData.homePos=pen.position.clone();pen.userData.homeRot=pen.rotation.clone()}
const stool1=assetMap.get('Gingham Stool 01'),stool2=assetMap.get('Gingham Stool 02');
if(stool1){stool1.position.set(-3.62,0,3.18);stool1.scale.set(.94,.94,.94);stool1.userData.homePos=stool1.position.clone()}
if(stool2){stool2.position.set(-1.98,0,3.18);stool2.scale.set(.94,.94,.94);stool2.userData.homePos=stool2.position.clone()}
const sink=assetMap.get('Farmhouse Sink');if(sink){sink.position.set(-3.34,0,-5.02);sink.scale.set(1.04,1.02,1.02);sink.userData.homePos=sink.position.clone()}
const stove=assetMap.get('Large Stove Oven');if(stove){stove.position.set(.72,0,-5.02);stove.scale.set(.98,1,.99);stove.userData.homePos=stove.position.clone()}
const hood=assetMap.get('Farmhouse Range Hood 2.2');if(hood){hood.position.set(.72,0,-5.23);hood.scale.set(.96,1.02,.94);hood.userData.homePos=hood.position.clone()}
const fridge=assetMap.get('Retro Fridge');if(fridge){fridge.position.set(5.82,0,-4.92);fridge.scale.set(.96,1.01,.98);fridge.userData.homePos=fridge.position.clone()}
const p1=assetMap.get('Pendant Light 01'),p2=assetMap.get('Pendant Light 02');
if(p1){p1.position.x=-4.05;p1.position.z=.55;p1.userData.homePos=p1.position.clone()}
if(p2){p2.position.x=-2.43;p2.position.z=.55;p2.userData.homePos=p2.position.clone()}

// Make the core materials read as warm ivory + natural honey oak rather than white + orange.
const heroNames=['Reference L Peninsula 2.7','Farmhouse Sink','Large Stove Oven','Farmhouse Range Hood 2.2','Retro Fridge','Upper Cabinet 1','Gingham Stool 01','Gingham Stool 02','Back Base 1','Back Base 2','Back Base 3','Back Base 05','Drawer Cabinet 01','Drawer Cabinet 02'];
for(const name of heroNames){
 const root=assetMap.get(name);if(!root)continue;
 root.traverse(o=>{if(!o.isMesh||!o.material)return;const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats){
   if(!m?.color)continue;const c=m.color;const h=c.getHSL({h:0,s:0,l:0});
   if(h.l>.78&&h.s<.28){c.set(0xead7bd);m.roughness=Math.max(m.roughness??.5,.55)}
   else if(h.h>.045&&h.h<.12&&h.s>.25&&h.l>.35){c.set(0xb97945);m.roughness=.55;m.metalness=0}
   if(m.metalness>.35&&h.h>.05&&h.h<.15){c.set(0x9b693d);m.roughness=.42;m.metalness=.58}
   m.needsUpdate=true;
 }});
}

// A warmer window surround and curtain pelmet give the left focal point the same visual weight as the reference.
const windowTrim=rb(4.35,.14,.20,creamLight,.025);windowTrim.position.set(-3.35,4.98,-5.16);pass.add(windowTrim);
for(const x of[-5.42,-1.28]){const s=rb(.14,3.35,.18,creamLight,.022);s.position.set(x,3.28,-5.16);pass.add(s)}
const curtainRod=rb(4.08,.045,.055,brass,.012);curtainRod.position.set(-3.35,4.93,-5.05);pass.add(curtainRod);
for(let i=0;i<15;i++){
 const x=-5.08+i*.247;
 const fold=rb(.205,.5,.14,i%2?peach:blush,.045);fold.position.set(x,4.65,-5.00);fold.rotation.z=(i%2?1:-1)*.025;pass.add(fold);
 const scallop=sphere(.11,i%2?peach:blush,12);scallop.scale.set(1,.55,.46);scallop.position.set(x,4.39,-4.98);pass.add(scallop);
}

// Sink styling: flowers, soap, checked towel and small ceramic bottle.
const vase=cyl(.13,.3,ivory,20);vase.position.set(-4.55,1.43,-4.68);pass.add(vase);
for(let i=0;i<7;i++){const x=-4.55+(i-3)*.035;const stem=bx(.012,.35,.012,sage);stem.position.set(x,1.68,-4.68);pass.add(stem);const f=sphere(.055,i%2?peach:ivory,10);f.position.set(x,1.9+(i%2)*.035,-4.68);pass.add(f)}
const soap=rb(.16,.29,.14,creamLight,.045);soap.position.set(-2.25,1.39,-4.69);pass.add(soap);const pump=rb(.15,.025,.03,brass,.01);pump.position.set(-2.25,1.58,-4.69);pass.add(pump);

// More deliberate open-shelf styling.
for(const [x,y,w] of[[-5.74,3.62,1.38],[-5.74,4.32,1.22],[3.85,3.6,1.38],[3.85,4.3,1.18]]){
 const board=rb(w,.095,.38,honey,.022);board.position.set(x,y,-5.08);pass.add(board);
 for(const sx of[-w*.42,w*.42]){const br=rb(.055,.28,.055,brass,.012);br.position.set(x+sx,y-.13,-5.1);pass.add(br)}
}
jar(-6.15,3.86,-4.98,.095,ivory);jar(-5.83,3.86,-4.98,.09,creamLight);tinyPlant(-5.46,3.72,-4.98,.095);
frameArt(-6.0,4.58,-5.05,.45,.55);jar(3.48,3.84,-4.98,.09,creamLight);jar(3.77,3.84,-4.98,.085,ivory);tinyPlant(4.18,3.7,-4.98,.105);
frameArt(4.05,4.58,-5.05,.42,.5,blush);

// Cozy countertop details from the approved board.
for(const [x,h] of[[-.62,.72],[-.27,.58]]){const board=rb(.34,h,.045,honeyLight,.045);board.position.set(x,1.53,-5.36);board.rotation.z=(x+.45)*.15;pass.add(board)}
for(let i=0;i<3;i++)jar(2.75+i*.27,1.42,-4.69,.075,i===1?creamLight:ivory);
const toaster=rb(.62,.36,.4,creamLight,.12);toaster.position.set(4.62,1.39,-4.7);pass.add(toaster);
for(const x of[4.49,4.72]){const slot=rb(.18,.014,.22,dark,.014);slot.position.set(x,1.58,-4.7);pass.add(slot)}
const toasterLever=rb(.035,.16,.035,brass,.01);toasterLever.position.set(4.95,1.42,-4.7);pass.add(toasterLever);

// Rail, utensils and two checked oven mitts near the range.
const rail=rb(2.1,.045,.05,brass,.012);rail.position.set(.72,2.46,-5.1);pass.add(rail);
for(let i=0;i<5;i++){const x=-.05+i*.38;const handle=cyl(.018,.39,i%2?honey:brass,10);handle.position.set(x,2.23,-5.03);pass.add(handle);const head=cyl(.06,.035,i%2?honeyLight:brass,12);head.position.set(x,2.01,-5.03);pass.add(head)}
for(const [x,rot] of[[1.48,.1],[1.72,-.08]]){const mitt=rb(.18,.4,.06,peach,.07);mitt.position.set(x,2.14,-5.01);mitt.rotation.z=rot;pass.add(mitt)}

// Fridge-top basket, greenery and extra magnets/postcards.
basket(5.8,4.02,-4.93,.72,.3,.43);
tinyPlant(6.28,3.9,-4.86,.12);
for(const [x,y,w,h,m] of[[5.52,2.72,.2,.25,peach],[5.94,2.45,.25,.18,ivory],[5.58,2.16,.16,.2,creamLight],[6.04,2.83,.17,.17,blush]]){
 const n=rb(w,h,.025,m,.016);n.position.set(x,y,-4.28);n.rotation.z=(x-y)*.025;pass.add(n);
}

// Peninsula accessories: open baskets, flowers, fruit bowl, mug and side textile.
basket(-4.45,.48,2.72,.54,.3,.34);basket(-3.83,.48,2.72,.5,.28,.32);
const fruitBowl=new THREE.Mesh(new THREE.SphereGeometry(.25,24,12,0,Math.PI*2,0,Math.PI/2),honeyLight);fruitBowl.rotation.x=Math.PI;fruitBowl.scale.y=.43;fruitBowl.position.set(-2.55,1.32,2.02);pass.add(fruitBowl);
for(let i=0;i<6;i++){const f=sphere(.08,i%2?peach:honeyLight,12);f.position.set(-2.55+(i%3-1)*.1,1.42+Math.floor(i/3)*.075,2.02+(i%2-.5)*.1);pass.add(f)}
const mug=rb(.17,.19,.17,ivory,.045);mug.position.set(-1.72,1.31,2.03);pass.add(mug);const mugHandle=torus(.095,.018,ivory,Math.PI*1.5);mugHandle.rotation.y=Math.PI/2;mugHandle.position.set(-1.61,1.36,2.03);pass.add(mugHandle);
const islandVase=cyl(.12,.27,ivory,18);islandVase.position.set(-3.18,1.37,2.02);pass.add(islandVase);
for(let i=0;i<6;i++){const stem=bx(.01,.3,.01,sage);stem.position.set(-3.18+(i-2.5)*.026,1.62,2.02);pass.add(stem);const flower=sphere(.05,i%2?blush:ivory,10);flower.position.set(stem.position.x,1.8+(i%2)*.03,2.02);pass.add(flower)}

// Subtle wall art to fill the empty gaps without turning the kitchen into clutter.
frameArt(-6.72,3.5,-5.13,.5,.66,peach);
frameArt(5.0,3.55,-5.13,.46,.58,blush);

// Grounding: soft contact shadows and window-light patches.
const shadowMat=new THREE.MeshBasicMaterial({color:0x4d3328,transparent:true,opacity:.075,depthWrite:false});
function contact(x,z,sx,sz,op=.075){const mat=shadowMat.clone();mat.opacity=op;const q=new THREE.Mesh(new THREE.CircleGeometry(1,40),mat);q.rotation.x=-Math.PI/2;q.scale.set(sx,sz,1);q.position.set(x,.085,z);pass.add(q)}
contact(5.82,-4.9,.92,.62,.1);contact(.72,-5.0,1.1,.55,.09);contact(-3.34,-5.0,1.02,.54,.08);contact(-2.8,2.05,2.8,.66,.09);contact(-3.62,3.18,.4,.28,.08);contact(-1.98,3.18,.4,.28,.08);
const sunPatchMat=new THREE.MeshBasicMaterial({color:0xffd6a5,transparent:true,opacity:.07,depthWrite:false,blending:THREE.AdditiveBlending});
for(let i=0;i<4;i++){const p=new THREE.Mesh(new THREE.PlaneGeometry(.78,5.1),sunPatchMat.clone());p.rotation.x=-Math.PI/2;p.rotation.z=-.44;p.position.set(-4.25+i*.82,.092,-.55+i*.06);pass.add(p)}
const mullionShadow=new THREE.MeshBasicMaterial({color:0x5d4638,transparent:true,opacity:.025,depthWrite:false});
for(let i=0;i<5;i++){const s=new THREE.Mesh(new THREE.PlaneGeometry(.045,4.7),mullionShadow);s.rotation.x=-Math.PI/2;s.rotation.z=-.44;s.position.set(-4.5+i*.72,.096,-.5);pass.add(s)}

// Re-balance the entire scene after all legacy passes have loaded. No washed-out white stack.
scene.traverse(o=>{
 if(o.isHemisphereLight)o.intensity=Math.min(o.intensity,.55);
 else if(o.isDirectionalLight)o.intensity=Math.min(o.intensity,.78);
 else if(o.isSpotLight)o.intensity=Math.min(o.intensity,.82);
 else if(o.isPointLight)o.intensity=Math.min(o.intensity,.42);
 if(o.isMesh){o.castShadow=true;o.receiveShadow=true}
});
const morningKey=new THREE.DirectionalLight(0xffc98e,1.15);morningKey.position.set(-9.5,12.5,9.8);morningKey.castShadow=true;morningKey.shadow.mapSize.set(2048,2048);morningKey.shadow.camera.left=-12;morningKey.shadow.camera.right=12;morningKey.shadow.camera.top=10;morningKey.shadow.camera.bottom=-10;morningKey.shadow.bias=-.00022;pass.add(morningKey);
const softFill=new THREE.HemisphereLight(0xfff1df,0x8f7567,.52);pass.add(softFill);
const windowGlow=new THREE.SpotLight(0xffd4a3,.76,17,.62,.74,1.65);windowGlow.position.set(-4.1,7.0,-1.8);windowGlow.target.position.set(-1.4,.2,.9);pass.add(windowGlow,windowGlow.target);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.67;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.domElement.style.filter='saturate(1.07) contrast(1.12) brightness(.965)';
scene.background.set(0xdfc9b9);

// Higher / farther 3/4 reference view. Keep OrbitControls active for gameplay and Decor mode.
const REF291={pos:new THREE.Vector3(13.85,11.2,16.9),target:new THREE.Vector3(-.72,1.18,-1.12),fov:23.0};
function referenceView291(){
 camera.position.copy(REF291.pos);camera.fov=REF291.fov;camera.updateProjectionMatrix();orbit.target.copy(REF291.target);orbit.update();transform.detach();
 renderer.toneMappingExposure=.67;renderer.domElement.style.filter='saturate(1.07) contrast(1.12) brightness(.965)';
}
referenceView291();
orbit.minDistance=10.5;orbit.maxDistance=24;orbit.minPolarAngle=.48;orbit.maxPolarAngle=1.2;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView291,20));
document.getElementById('assembledBtn')?.addEventListener('click',()=>setTimeout(referenceView291,30));

// Keep the reference grade when returning from other time-of-day modes.
function enforceDaylight(){
 if(document.body.classList.contains('k13-night')||document.body.classList.contains('k13-evening'))return;
 renderer.toneMappingExposure=.67;renderer.domElement.style.filter='saturate(1.07) contrast(1.12) brightness(.965)';
 morningKey.intensity=1.15;softFill.intensity=.52;windowGlow.intensity=.76;
}
new MutationObserver(()=>setTimeout(enforceDaylight,0)).observe(document.body,{attributes:true,attributeFilter:['class']});

const oldBadge=document.querySelector('.k29-render-badge');if(oldBadge)oldBadge.textContent='Kitchen 2.9 · High-Fidelity Reference Match';
window.KITCHEN_3D_RENDER_291={version:'2.9.1',group:pass,referenceView:referenceView291,enforceDaylight};
