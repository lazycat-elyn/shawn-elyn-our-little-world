const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.4 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,kitchen,assets,assetMap,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight}=api;
document.body.classList.add('k24-ready');

const premium=new THREE.Group();premium.name='KitchenPremiumCozy24';kitchen.add(premium);

// --- Camera / color: a fuller, softer dollhouse frame -------------------------
const REF24={pos:new THREE.Vector3(11.8,9.15,13.65),target:new THREE.Vector3(-.78,1.5,-1.18),fov:21.1};
function referenceView24(){camera.position.copy(REF24.pos);camera.fov=REF24.fov;camera.updateProjectionMatrix();orbit.target.copy(REF24.target);orbit.update()}
referenceView24();
orbit.minDistance=9.4;orbit.maxDistance=20.5;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView24,0));
renderer.toneMappingExposure=1.06;
renderer.domElement.style.filter='saturate(1.055) contrast(1.025)';

// --- Cream shiplap upper walls: removes flat grey / prototype feeling ----------
const wallMat=new THREE.MeshStandardMaterial({color:0xfff4e8,roughness:.9});
const seamMat=new THREE.MeshBasicMaterial({color:0xcfae96,transparent:true,opacity:.13,depthWrite:false});
const backUpper=new THREE.Mesh(new THREE.PlaneGeometry(15.6,2.72),wallMat);backUpper.position.set(0,4.22,-5.59);premium.add(backUpper);
const leftUpper=new THREE.Mesh(new THREE.PlaneGeometry(10.9,2.72),wallMat);leftUpper.rotation.y=Math.PI/2;leftUpper.position.set(-7.91,4.22,0);premium.add(leftUpper);
for(let x=-7.5;x<=7.5;x+=.52){const s=bx(.012,2.55,.012,seamMat);s.position.set(x,4.2,-5.565);premium.add(s)}
for(let z=-5.1;z<=5.1;z+=.52){const s=bx(.012,2.55,.012,seamMat);s.rotation.y=Math.PI/2;s.position.set(-7.885,4.2,z);premium.add(s)}
const crownBack=rb(15.7,.13,.16,M.woodLight,.02);crownBack.position.set(0,5.5,-5.48);premium.add(crownBack);
const crownLeft=rb(10.9,.13,.16,M.woodLight,.02);crownLeft.rotation.y=Math.PI/2;crownLeft.position.set(-7.8,5.5,0);premium.add(crownLeft);

// --- Window dressing: gingham folds + soft gathered sides --------------------
const gingham=api.ginghamMat;
const curtain=new THREE.Group();curtain.position.set(-7.62,0,-1.8);premium.add(curtain);
for(let i=0;i<12;i++){
  const fold=rb(.13,.48,.31,gingham,.045);fold.position.set(.02,4.77,-2.42+i*.44);fold.rotation.x=(i%2?1:-1)*.05;curtain.add(fold)
}
for(const side of[-1,1]){
  for(let i=0;i<5;i++){
    const drop=rb(.1,1.42,.26,gingham,.035);drop.position.set(.03,4.04,side*(2.22-i*.10));drop.rotation.x=side*.08;drop.rotation.z=(i-2)*.018;curtain.add(drop)
  }
  const tie=torus(.17,.028,M.brass,Math.PI*1.75);tie.rotation.y=Math.PI/2;tie.position.set(.13,3.55,side*1.86);curtain.add(tie)
}

// --- Better vintage fridge detailing -----------------------------------------
const fridge=assetMap.get('Retro Fridge');
if(fridge){
  const sealTop=rb(1.54,.055,.035,M.woodDark,.015);sealTop.position.set(0,1.46,.595);sealTop.material=sealTop.material.clone();sealTop.material.transparent=true;sealTop.material.opacity=.22;fridge.add(sealTop);
  for(const yy of[2.6,.78]){const hinge=cyl(.055,.12,M.brass,16);hinge.rotation.x=Math.PI/2;hinge.position.set(-.73,yy,.59);fridge.add(hinge)}
  const footL=cyl(.08,.09,M.dark,16),footR=footL.clone();footL.position.set(-.55,.02,.35);footR.position.set(.55,.02,.35);fridge.add(footL,footR);
  const logoCanvas=document.createElement('canvas');logoCanvas.width=256;logoCanvas.height=64;const cx=logoCanvas.getContext('2d');cx.clearRect(0,0,256,64);cx.fillStyle='#a77a49';cx.font='600 28px Georgia';cx.textAlign='center';cx.fillText('HOME',128,38);const tex=new THREE.CanvasTexture(logoCanvas);tex.colorSpace=THREE.SRGBColorSpace;const logo=new THREE.Mesh(new THREE.PlaneGeometry(.5,.12),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));logo.position.set(0,2.95,.62);fridge.add(logo)
}

// --- Hood refinement: shelf, plaster lip and practical light ------------------
const hood=assetMap.get('Farmhouse Range Hood 2.2');
if(hood){
  const shelf=rb(2.52,.12,1.0,M.wood2,.025);shelf.position.set(0,2.77,.03);hood.add(shelf);
  const plasterLip=rb(2.25,.11,.84,M.cream2,.022);plasterLip.position.set(0,2.9,.03);hood.add(plasterLip);
  const underside=new THREE.PointLight(0xffc784,2.15,2.8,2);underside.position.set(0,2.58,.38);hood.add(underside)
}

// --- Stove becomes more like an enamel range ---------------------------------
const stove=assetMap.get('Large Stove Oven');
if(stove){
  const lowerPlinth=rb(1.84,.11,.08,M.cream2,.018);lowerPlinth.position.set(0,.13,.58);stove.add(lowerPlinth);
  const innerGlow=new THREE.MeshBasicMaterial({color:0xff9b5a,transparent:true,opacity:.055,depthWrite:false});
  const glow=rb(1.34,.39,.018,innerGlow,.015);glow.position.set(0,.49,.575);stove.add(glow);
  for(const x of[-.72,.72]){const foot=cyl(.055,.08,M.brass,14);foot.position.set(x,.03,.32);stove.add(foot)}
}

// --- Farmhouse sink: basin depth + brass drain -------------------------------
const sink=assetMap.get('Farmhouse Sink');
if(sink){
  const inner=rb(1.16,.055,.58,new THREE.MeshStandardMaterial({color:0xf1eee8,roughness:.34}),.04);inner.position.set(0,1.12,0);sink.add(inner);
  const drain=cyl(.08,.015,M.brass,20);drain.position.set(0,1.16,.03);sink.add(drain);
  const water=new THREE.Mesh(new THREE.PlaneGeometry(.72,.34),new THREE.MeshPhysicalMaterial({color:0xcfe5e6,transparent:true,opacity:.18,roughness:.08,transmission:.35,depthWrite:false}));water.rotation.x=-Math.PI/2;water.position.set(0,1.175,.02);sink.add(water)
}

// --- Turned-looking stool legs + foot rings ----------------------------------
for(const id of['Gingham Stool 01','Gingham Stool 02']){
  const s=assetMap.get(id);if(!s)continue;
  for(const [x,z] of [[-.25,-.25],[.25,-.25],[-.25,.25],[.25,.25]]){
    const leg=cyl(.05,.82,M.woodLight,18);leg.position.set(x,.42,z);leg.rotation.z=x*.08;s.add(leg);
    const bead=sphere(.072,M.wood,14);bead.position.set(x,.72,z);s.add(bead)
  }
  const ring=torus(.29,.022,M.woodLight);ring.rotation.x=Math.PI/2;ring.position.y=.38;s.add(ring)
}

// --- Peninsula edge, wicker basket and towel ---------------------------------
const pen=assetMap.get('Kitchen Peninsula');
if(pen){
  const lip=rb(6.58,.055,.08,M.brass,.018);lip.position.set(0,1.12,.88);lip.material=lip.material.clone();lip.material.transparent=true;lip.material.opacity=.45;pen.add(lip);
  const towel=rb(.44,.62,.025,gingham,.012);towel.position.set(2.45,.55,.805);pen.add(towel)
}
const wickerMat=new THREE.MeshStandardMaterial({color:0xb98859,roughness:.88});
const basket=new THREE.Group();const basketBase=rb(.72,.32,.48,wickerMat,.05);basketBase.position.y=.16;basket.add(basketBase);for(let i=0;i<5;i++){const slat=bx(.025,.28,.5,M.woodLight);slat.position.set(-.28+i*.14,.18,0);basket.add(slat)}basket.position.set(-4.55,.09,2.18);premium.add(basket);

// --- Shelves feel lived-in: stacked plates + cups -----------------------------
function plateStack(x,y,z,n=4){for(let i=0;i<n;i++){const p=cyl(.15,.018,M.ivory,24);p.position.set(x,y+i*.025,z);premium.add(p)}}
for(const p of[[-6.15,3.63,-5.05],[-5.85,4.2,-5.05],[5.15,3.63,-5.05]])plateStack(...p,4);
for(const [x,y,z] of [[-5.7,3.62,-5.02],[5.45,4.18,-5.02],[-6.4,4.18,-5.02]]){
  const cup=rb(.16,.16,.16,M.ivory,.04);cup.position.set(x,y,z);premium.add(cup);const h=torus(.09,.02,M.ivory,Math.PI*1.5);h.rotation.y=Math.PI/2;h.position.set(x+.1,y,z+.01);premium.add(h)
}

// --- Warm ceramic / spice vignette without clutter ----------------------------
for(let i=0;i<5;i++){
  const body=cyl(.052,.24,i%2?M.cream:M.terracotta,16);body.position.set(.02+i*.15,1.35,-4.72);premium.add(body);
  const cap=cyl(.055,.035,M.woodDark,16);cap.position.set(.02+i*.15,1.49,-4.72);premium.add(cap)
}
const breadBoard=rb(.58,.76,.055,M.woodLight,.06);breadBoard.position.set(-.72,1.6,-5.43);breadBoard.rotation.z=-.05;premium.add(breadBoard);const boardHole=torus(.055,.012,M.woodDark);boardHole.position.set(-.72,1.88,-5.38);premium.add(boardHole);

// --- Cinematic sunlight and contact separation --------------------------------
if(sun){sun.intensity=4.25;sun.color.set(0xffd19a);sun.position.set(-11,15,10)}
if(bounce){bounce.intensity=4.25;bounce.color.set(0xffbf88)}
if(taskLight)taskLight.intensity=3.2;
const fill=new THREE.DirectionalLight(0xfff4e6,.72);fill.position.set(8,8,10);premium.add(fill);
const golden=new THREE.SpotLight(0xffc985,5.3,20,.62,.72,1.4);golden.position.set(-7.3,8.2,2.8);golden.target.position.set(-1,.1,-.2);premium.add(golden,golden.target);
const dappleMat=new THREE.MeshBasicMaterial({color:0xffd394,transparent:true,opacity:.055,depthWrite:false});
for(let i=0;i<8;i++){const q=new THREE.Mesh(new THREE.CircleGeometry(.45+Math.random()*.5,28),dappleMat);q.rotation.x=-Math.PI/2;q.scale.y=.55;q.position.set(-5.2+Math.random()*6.5,.073,-2.2+Math.random()*4.7);premium.add(q)}

// Replace previous tiny badge with a quieter version.
document.querySelector('.k23-fidelity-badge')?.remove();
const badge=document.createElement('div');badge.className='k24-fidelity-badge';badge.textContent='Kitchen 2.4 · Premium Cozy Pass';document.querySelector('.workarea')?.appendChild(badge);

window.KITCHEN_3D_HIFI_24={version:'2.4',referenceView:referenceView24,group:premium};
