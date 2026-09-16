const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.6 internal API unavailable');
const {THREE,camera,renderer,orbit,kitchen,assetMap,register,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight,renderAssetList}=api;
document.body.classList.add('k26-ready');

const pass=new THREE.Group();pass.name='KitchenStrictLShape26';kitchen.add(pass);

// --- Strict palette lock ------------------------------------------------------
M.cream.color.set(0xfff7ec);M.cream.roughness=.48;
M.cream2.color.set(0xf3e7d8);M.cream2.roughness=.6;
M.ivory.color.set(0xfffcf5);M.ivory.roughness=.38;
M.wood.color.set(0xbb7547);M.wood2.color.set(0xdda06d);M.woodLight.color.set(0xe6b47f);M.woodDark.color.set(0x744831);
M.brass.color.set(0xb9854d);M.brass.metalness=.78;M.brass.roughness=.24;
[M.cream,M.cream2,M.ivory,M.wood,M.wood2,M.woodLight,M.woodDark,M.brass].forEach(m=>m.needsUpdate=true);

// --- Reference framing: show the L clearly -----------------------------------
const REF26={pos:new THREE.Vector3(10.9,8.55,12.35),target:new THREE.Vector3(-1.05,1.48,-.72),fov:19.5};
function referenceView26(){camera.position.copy(REF26.pos);camera.fov=REF26.fov;camera.updateProjectionMatrix();orbit.target.copy(REF26.target);orbit.update()}
referenceView26();orbit.minDistance=8.8;orbit.maxDistance=19.2;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView26,0));

// --- Real L-shaped peninsula / table -----------------------------------------
const oldPen=assetMap.get('Kitchen Peninsula');if(oldPen) oldPen.visible=false;
const lcounter=new THREE.Group();
const bodyMat=M.cream.clone();bodyMat.color.set(0xfff6e9);bodyMat.roughness=.54;
const panelMat=M.cream2.clone();panelMat.color.set(0xf2e4d3);panelMat.roughness=.62;
const topMat=M.wood2.clone();topMat.color.set(0xdea06c);topMat.roughness=.46;
const longBody=rb(6.35,1.03,1.42,bodyMat,.055);longBody.position.set(-1.72,.515,0);lcounter.add(longBody);
const returnBody=rb(1.48,1.03,3.12,bodyMat,.055);returnBody.position.set(1.0,.515,-.86);lcounter.add(returnBody);
const longTop=rb(6.62,.17,1.72,topMat,.055);longTop.position.set(-1.72,1.12,0);lcounter.add(longTop);
const returnTop=rb(1.78,.17,3.38,topMat,.055);returnTop.position.set(1.0,1.12,-.86);lcounter.add(returnTop);
const cornerTop=rb(1.8,.17,1.74,topMat,.06);cornerTop.position.set(.92,1.12,0);lcounter.add(cornerTop);

// front cabinet panels on the long leg
for(const x of[-3.95,-2.58,-1.2,.15]){
  const outer=rb(1.08,.72,.035,panelMat,.025);outer.position.set(x,.52,.725);lcounter.add(outer);
  const inner=rb(.88,.54,.028,M.cream,.02);inner.position.set(x,.52,.75);lcounter.add(inner);
  const pull=rb(.28,.04,.06,M.brass,.018);pull.position.set(x,.78,.785);lcounter.add(pull);
}
// side panels on the return leg
for(const z of[-2.0,-.72]){
  const outer=rb(1.06,.72,.035,panelMat,.025);outer.rotation.y=Math.PI/2;outer.position.set(1.76,.52,z);lcounter.add(outer);
  const inner=rb(.86,.54,.028,M.cream,.02);inner.rotation.y=Math.PI/2;inner.position.set(1.79,.52,z);lcounter.add(inner);
  const pull=rb(.28,.04,.06,M.brass,.018);pull.rotation.y=Math.PI/2;pull.position.set(1.825,.78,z);lcounter.add(pull);
}
// warm toe kicks and counter edge
const kick1=rb(5.95,.12,.08,M.woodDark,.018);kick1.position.set(-1.7,.08,.73);kick1.material=kick1.material.clone();kick1.material.transparent=true;kick1.material.opacity=.24;lcounter.add(kick1);
const kick2=rb(2.75,.12,.08,M.woodDark,.018);kick2.rotation.y=Math.PI/2;kick2.position.set(1.74,.08,-.9);kick2.material=kick2.material.clone();kick2.material.transparent=true;kick2.material.opacity=.24;lcounter.add(kick2);
const edge1=rb(6.35,.05,.055,M.brass,.015);edge1.position.set(-1.72,1.075,.88);edge1.material=edge1.material.clone();edge1.material.transparent=true;edge1.material.opacity=.28;lcounter.add(edge1);

lcounter.position.set(-.48,0,2.15);kitchen.add(lcounter);register(lcounter,'L-Shape Kitchen Counter 2.6','Furniture','Prepare / Place Appliance');

// --- L counter styling / props -----------------------------------------------
const gingham=api.ginghamMat;
const towel=rb(.42,.62,.028,gingham,.014);towel.position.set(1.35,.55,2.9);pass.add(towel);
const tray=rb(1.26,.07,.62,M.woodLight,.05);tray.position.set(-2.45,1.31,2.18);pass.add(tray);
const vase=cyl(.14,.32,M.ivory,22);vase.position.set(-2.76,1.49,2.18);pass.add(vase);
for(let i=0;i<7;i++){const st=bx(.012,.31,.012,M.green);st.position.set(-2.76+(i-3)*.027,1.73,2.18+(i%3-1)*.03);pass.add(st);const fl=sphere(.052,i%2?M.ivory:M.pink2,10);fl.position.set(st.position.x,1.91+(i%2)*.025,st.position.z);pass.add(fl)}
const bowl=new THREE.Mesh(new THREE.SphereGeometry(.26,24,12,0,Math.PI*2,0,Math.PI/2),M.woodLight);bowl.rotation.x=Math.PI;bowl.scale.y=.42;bowl.position.set(-2.12,1.38,2.18);pass.add(bowl);
for(let i=0;i<6;i++){const f=sphere(.085,i%2?M.orange:M.red,12);f.position.set(-2.12+(i%3-1)*.11,1.47+Math.floor(i/3)*.08,2.18+(i%2-.5)*.11);pass.add(f)}
const mug=rb(.17,.19,.17,M.ivory,.045);mug.position.set(-.45,1.34,2.14);pass.add(mug);const mh=torus(.1,.02,M.ivory,Math.PI*1.5);mh.rotation.y=Math.PI/2;mh.position.set(-.34,1.39,2.14);pass.add(mh);
const cookbook=rb(.55,.68,.045,M.ivory,.025);cookbook.position.set(.88,1.62,1.28);cookbook.rotation.y=-.12;cookbook.rotation.z=-.04;pass.add(cookbook);
const bookBand=rb(.42,.035,.052,M.pink2,.012);bookBand.position.set(.88,1.47,1.33);pass.add(bookBand);

// --- Stools align to the long side of the L ----------------------------------
const stool1=assetMap.get('Gingham Stool 01'),stool2=assetMap.get('Gingham Stool 02');
if(stool1){stool1.position.set(-3.55,0,3.72);stool1.userData.homePos=stool1.position.clone()}
if(stool2){stool2.position.set(-1.72,0,3.72);stool2.userData.homePos=stool2.position.clone()}

// --- Color / detail corrections on hero fixtures -----------------------------
const fridge=assetMap.get('Retro Fridge');if(fridge){
  fridge.traverse(o=>{if(o.material===M.cream||o.material===M.cream2)o.material.needsUpdate=true});
  const trim=rb(1.62,.08,.06,M.brass,.02);trim.position.set(0,3.35,.62);fridge.add(trim);
  const note=rb(.27,.34,.025,M.ivory,.02);note.position.set(-.33,2.24,.69);note.rotation.z=-.05;fridge.add(note);
  const pin=sphere(.035,M.red,10);pin.position.set(-.33,2.39,.72);fridge.add(pin);
}
const hood=assetMap.get('Farmhouse Range Hood 2.2');if(hood){
  const fascia=rb(2.6,.18,1.02,M.wood2,.028);fascia.position.set(0,2.76,.03);hood.add(fascia);
  const trim=rb(2.32,.07,.9,M.brass,.016);trim.position.set(0,2.66,.05);trim.material=trim.material.clone();trim.material.transparent=true;trim.material.opacity=.34;hood.add(trim);
}
const stove=assetMap.get('Large Stove Oven');if(stove){
  const rail=rb(1.5,.055,.085,M.brass,.018);rail.position.set(0,.82,.63);stove.add(rail);
  const pot=cyl(.3,.24,M.cream2,26);pot.position.set(-.42,1.59,-.08);stove.add(pot);const lid=cyl(.25,.04,M.brass,24);lid.position.set(-.42,1.73,-.08);stove.add(lid);
}
const sink=assetMap.get('Farmhouse Sink');if(sink){
  const board=rb(.48,.62,.05,M.woodLight,.05);board.position.set(-.52,1.45,-.22);board.rotation.z=-.1;sink.add(board);
  const cloth=rb(.34,.5,.024,gingham,.012);cloth.position.set(.72,.85,.56);sink.add(cloth);
}

// --- Small reference-faithful backsplash details -----------------------------
for(const [x,y,z] of [[-1.2,1.62,-5.43],[-.72,1.57,-5.44]]){const b=rb(.38,.62,.05,M.woodLight,.05);b.position.set(x,y,z);b.rotation.z=(x+1)*.12;pass.add(b)}
for(let i=0;i<5;i++){const bottle=cyl(.05,.24,i%2?M.cream:M.terracotta,16);bottle.position.set(.02+i*.15,1.36,-4.7);pass.add(bottle);const cap=cyl(.052,.032,M.brass,16);cap.position.set(.02+i*.15,1.5,-4.7);pass.add(cap)}

// --- Light tuned for cream / honey wood / blush ------------------------------
renderer.toneMappingExposure=.99;renderer.domElement.style.filter='saturate(1.04) contrast(1.055) brightness(1.005)';
if(sun){sun.intensity=3.85;sun.color.set(0xffd39d);sun.position.set(-10.8,15.3,10.4)}
if(bounce){bounce.intensity=3.45;bounce.color.set(0xffc38d)}
if(taskLight)taskLight.intensity=2.8;
const softKey=new THREE.SpotLight(0xffcb8e,4.2,18,.58,.78,1.6);softKey.position.set(-7.4,7.5,3.2);softKey.target.position.set(-1.2,.3,.2);pass.add(softKey,softKey.target);

// visual grounding under the L counter
const shadowMat=new THREE.MeshBasicMaterial({color:0x4f392d,transparent:true,opacity:.07,depthWrite:false});
const sh=new THREE.Mesh(new THREE.CircleGeometry(1,42),shadowMat);sh.rotation.x=-Math.PI/2;sh.scale.set(3.65,1.05,1);sh.position.set(-1.75,.076,2.12);pass.add(sh);
const sh2=sh.clone();sh2.scale.set(1.02,1.8,1);sh2.position.set(.55,.076,1.34);pass.add(sh2);

document.querySelector('.k25-fidelity-badge')?.remove();
const badge=document.createElement('div');badge.className='k26-fidelity-badge';badge.textContent='Kitchen 2.6 · Strict L-Shape Accuracy';document.querySelector('.workarea')?.appendChild(badge);
renderAssetList?.();
window.KITCHEN_3D_HIFI_26={version:'2.6',referenceView:referenceView26,group:pass,lCounter:lcounter};