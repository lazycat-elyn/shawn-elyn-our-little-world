const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.5 internal API unavailable');
const {THREE,scene,kitchen,assetMap,renderer,M,rb,bx}=api;

const old=kitchen.getObjectByName('KitchenLightingColor350');
if(old) old.removeFromParent();
const pass=new THREE.Group();
pass.name='KitchenLightingColor350';
kitchen.add(pass);

const setMat=(m,hex,rough=null,metal=null)=>{
  if(!m)return;
  if(m.color)m.color.setHex(hex);
  if(rough!==null)m.roughness=rough;
  if(metal!==null)m.metalness=metal;
  m.needsUpdate=true;
};

// -----------------------------------------------------------------------------
// 1) Lock the palette to the reference image: warm ivory + honey oak + brass.
// -----------------------------------------------------------------------------
const P={
  cream:0xf1e2cf,
  cream2:0xe8d4bd,
  ivory:0xfff4e3,
  floor:0xf7eadb,
  wood:0xc48652,
  woodLight:0xd7a16b,
  woodDark:0x744a34,
  brass:0xa66f3f,
  pink:0xe3a096,
  pink2:0xf0c0b6,
  dark:0x3b302b,
  green:0x748060
};

// Core/shared materials used by modular items and the room shell.
setMat(M.cream,P.cream,.64,0);
setMat(M.cream2,P.cream2,.70,0);
setMat(M.ivory,P.floor,.72,0);
setMat(M.wood,P.wood,.58,0);
setMat(M.wood2,P.woodLight,.60,0);
setMat(M.woodLight,0xe0b17d,.62,0);
setMat(M.woodDark,P.woodDark,.65,0);
setMat(M.brass,P.brass,.40,.62);
setMat(M.pink,P.pink,.84,0);
setMat(M.pink2,P.pink2,.88,0);
setMat(M.dark,P.dark,.42,.10);
setMat(M.green,P.green,.90,0);

// The reference-master scene uses its own shared material set.
// Recover those material references from the approved L peninsula / fridge / stove.
const pen=assetMap.get('Reference L Peninsula 2.7');
const fridge=assetMap.get('Retro Fridge');
const stove=assetMap.get('Large Stove Oven');
const sink=assetMap.get('Farmhouse Sink');
const hood=assetMap.get('Farmhouse Range Hood 2.2');

const masterCream=pen?.children?.[0]?.material;
const masterWood=pen?.children?.[2]?.material;
const masterCream2=pen?.children?.[4]?.material;
const masterIvory=fridge?.children?.[1]?.material;
const masterBrass=fridge?.children?.[3]?.material;
const masterDark=stove?.children?.[1]?.material;

setMat(masterCream,P.cream,.63,0);
setMat(masterCream2,P.cream2,.69,0);
setMat(masterIvory,P.ivory,.56,0);
setMat(masterWood,P.wood,.56,0);
setMat(masterBrass,P.brass,.40,.60);
setMat(masterDark,P.dark,.43,.10);

// Explicit hero overrides prevent cream pieces being misclassified as orange wood.
if(hood){
  setMat(hood.children?.[0]?.material,P.cream,.62,0);
  setMat(hood.children?.[1]?.material,P.cream2,.67,0);
  setMat(hood.children?.[2]?.material,P.wood,.56,0);
  setMat(hood.children?.[3]?.material,P.brass,.40,.58);
}
if(fridge){
  setMat(fridge.children?.[0]?.material,P.cream,.61,0);
  setMat(fridge.children?.[1]?.material,P.ivory,.54,0);
  setMat(fridge.children?.[2]?.material,P.cream2,.66,0);
  for(let i=3;i<=5;i++)setMat(fridge.children?.[i]?.material,P.brass,.40,.58);
}
if(stove){
  setMat(stove.children?.[0]?.material,P.cream,.57,.03);
  setMat(stove.children?.[1]?.material,P.dark,.38,.15);
  setMat(stove.children?.[2]?.material,0x54423a,.34,.08);
  setMat(stove.children?.[3]?.material,P.brass,.38,.62);
  for(let i=4;i<10;i++)setMat(stove.children?.[i]?.material,P.brass,.38,.62);
  setMat(stove.children?.[10]?.material,P.dark,.34,.18);
}
if(sink){
  setMat(sink.children?.[0]?.material,P.cream,.63,0);
  // apron / basin stay distinctly ivory
  for(const idx of [7,8])setMat(sink.children?.[idx]?.material,P.ivory,.50,0);
}

// Normalize the backdrop/walls without making them paper-white.
scene.background.set(0xe7d5c6);
renderer.setClearColor?.(0xe7d5c6,1);

// -----------------------------------------------------------------------------
// 2) Stop legacy lights from stacking. Keep only a very soft base, then add one
//    intentional golden key, a soft fill and a window glow.
// -----------------------------------------------------------------------------
scene.traverse(o=>{
  if(o.isHemisphereLight)o.intensity=.16;
  else if(o.isDirectionalLight)o.intensity=.22;
  else if(o.isSpotLight)o.intensity=.14;
  else if(o.isPointLight)o.intensity=.10;
});

const hemi=new THREE.HemisphereLight(0xfff4e5,0xa88370,.62);
pass.add(hemi);

const sun=new THREE.DirectionalLight(0xffc890,1.52);
sun.position.set(-9.5,13.0,8.6);
sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);
sun.shadow.camera.left=-13;
sun.shadow.camera.right=13;
sun.shadow.camera.top=11;
sun.shadow.camera.bottom=-11;
sun.shadow.bias=-.00018;
sun.shadow.normalBias=.025;
pass.add(sun);

const fill=new THREE.PointLight(0xffdfbd,.42,18,2);
fill.position.set(4.8,5.0,7.5);
pass.add(fill);

const windowGlow=new THREE.SpotLight(0xffd19a,1.12,19,.62,.75,1.55);
windowGlow.position.set(-6.2,7.7,3.4);
windowGlow.target.position.set(-1.4,.25,-.8);
windowGlow.castShadow=false;
pass.add(windowGlow,windowGlow.target);

// Warm practical glow around the two pendants, but keep it subtle.
for(const x of[-3.65,-1.65]){
  const l=new THREE.PointLight(0xffd7a6,.34,4.4,2);
  l.position.set(x,3.28,1.10);
  pass.add(l);
}

// -----------------------------------------------------------------------------
// 3) Window-sun patches: soft, angled, visible on floor/counter like the ref.
// -----------------------------------------------------------------------------
const sunMat=new THREE.MeshBasicMaterial({
  color:0xffc982,
  transparent:true,
  opacity:.055,
  depthWrite:false,
  blending:THREE.AdditiveBlending
});
for(let i=0;i<4;i++){
  const p=new THREE.Mesh(new THREE.PlaneGeometry(.72,5.4),sunMat.clone());
  p.rotation.x=-Math.PI/2;
  p.rotation.z=-.52;
  p.position.set(-4.2+i*.78,.096,-.1+i*.07);
  pass.add(p);
}

// Very light mullion shadows so the sunlight reads as coming through a window.
const barMat=new THREE.MeshBasicMaterial({color:0x8a654d,transparent:true,opacity:.025,depthWrite:false});
for(let i=0;i<5;i++){
  const s=new THREE.Mesh(new THREE.PlaneGeometry(.045,4.7),barMat);
  s.rotation.x=-Math.PI/2;
  s.rotation.z=-.52;
  s.position.set(-4.55+i*.72,.098,-.12);
  pass.add(s);
}

// -----------------------------------------------------------------------------
// 4) Final renderer grade: richer, warmer, not washed out and not orange.
// -----------------------------------------------------------------------------
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=.86;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.domElement.style.filter='saturate(1.06) contrast(1.08) brightness(.99)';

// Make every visible mesh read with soft contact/shape shadows.
scene.traverse(o=>{
  if(o.isMesh){
    o.castShadow=true;
    o.receiveShadow=true;
  }
});

window.KITCHEN_3D_LIGHTING_COLOR_35={version:'3.5',group:pass,palette:P};
