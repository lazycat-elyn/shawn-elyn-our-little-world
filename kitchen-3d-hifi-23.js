const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.3 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,kitchen,assets,assetMap,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight}=api;
document.body.classList.add('k23-ready');

const polish=new THREE.Group();polish.name='KitchenReferenceFidelity23';kitchen.add(polish);

// --- Reference camera: slightly more orthographic-looking and fuller ----------
const REF23={pos:new THREE.Vector3(12.35,9.55,14.25),target:new THREE.Vector3(-.72,1.55,-1.12),fov:22.2};
function referenceView23(){camera.position.copy(REF23.pos);camera.fov=REF23.fov;camera.updateProjectionMatrix();orbit.target.copy(REF23.target);orbit.update()}
referenceView23();
orbit.minDistance=9.8;orbit.maxDistance=21.5;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView23,0));

// --- Cleaner continuous floor: cream octagonal illusion + tiny blush diamonds -
function floorTexture(){
  const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');
  x.fillStyle='#fff9ef';x.fillRect(0,0,512,512);
  const s=128;x.lineWidth=3;x.strokeStyle='rgba(205,174,151,.22)';
  for(let yy=0;yy<512;yy+=s)for(let xx=0;xx<512;xx+=s){
    x.strokeRect(xx+4,yy+4,s-8,s-8);
    x.save();x.translate(xx+s,yy+s);x.rotate(Math.PI/4);x.fillStyle='rgba(226,157,149,.55)';x.fillRect(-10,-10,20,20);x.restore();
  }
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.25,2.35);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const floorMat=new THREE.MeshStandardMaterial({map:floorTexture(),roughness:.72,color:0xfffdf8});
const floorSkin=new THREE.Mesh(new THREE.PlaneGeometry(15.65,10.95),floorMat);floorSkin.rotation.x=-Math.PI/2;floorSkin.position.set(0,.066,0);floorSkin.receiveShadow=true;polish.add(floorSkin);

// --- Delicate backsplash texture with much smaller motif ----------------------
function backsplashTexture(){
  const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');
  x.fillStyle='#fff8ef';x.fillRect(0,0,c.width,c.height);
  x.strokeStyle='rgba(213,184,163,.18)';x.lineWidth=1.2;
  for(let xx=0;xx<=512;xx+=64){x.beginPath();x.moveTo(xx,0);x.lineTo(xx,256);x.stroke()}
  for(let yy=0;yy<=256;yy+=64){x.beginPath();x.moveTo(0,yy);x.lineTo(512,yy);x.stroke()}
  for(let yy=32;yy<256;yy+=64)for(let xx=32;xx<512;xx+=64){
    x.fillStyle='rgba(229,151,142,.58)';
    for(const [dx,dy] of [[0,-5],[-5,0],[5,0],[0,5]]){x.beginPath();x.ellipse(xx+dx,yy+dy,4.2,6,0,0,Math.PI*2);x.fill()}
    x.fillStyle='rgba(238,190,124,.9)';x.beginPath();x.arc(xx,yy,2.6,0,Math.PI*2);x.fill();
  }
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.2,1.45);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const backMat=new THREE.MeshStandardMaterial({map:backsplashTexture(),roughness:.8,color:0xfffbf5});
const backSkin=new THREE.Mesh(new THREE.PlaneGeometry(13.7,2.18),backMat);backSkin.position.set(.25,2.25,-5.535);polish.add(backSkin);
const leftSkin=new THREE.Mesh(new THREE.PlaneGeometry(5.0,2.18),backMat);leftSkin.rotation.y=Math.PI/2;leftSkin.position.set(-7.885,2.25,-1.9);polish.add(leftSkin);

// --- Window depth, cream trim and soft outside greenery -----------------------
const windowGroup=new THREE.Group();windowGroup.position.set(-7.93,0,-1.8);polish.add(windowGroup);
const outside=new THREE.Mesh(new THREE.PlaneGeometry(5.35,3.25),new THREE.MeshBasicMaterial({color:0xdfe7bf,transparent:true,opacity:.96}));outside.rotation.y=Math.PI/2;outside.position.set(-.01,3.12,0);windowGroup.add(outside);
for(let i=0;i<20;i++){const leaf=sphere(.16+Math.random()*.22,M.green,10);leaf.scale.set(.9,1.1,.55);leaf.position.set(-.06,1.45+Math.random()*3.15,-2.45+Math.random()*5.0);leaf.material=leaf.material.clone();leaf.material.transparent=true;leaf.material.opacity=.18+Math.random()*.18;windowGroup.add(leaf)}
for(const z of[-2.42,-1.2,0,1.2,2.42]){const f=bx(.07,3.42,.09,M.cream);f.position.set(.12,3.08,z);windowGroup.add(f)}
for(const y of[1.42,2.25,3.08,3.91,4.74]){const f=bx(.07,.08,5.0,M.cream);f.position.set(.12,y,0);windowGroup.add(f)}
const sill=rb(.18,.13,5.25,M.woodLight,.025);sill.position.set(.13,1.31,0);windowGroup.add(sill);

// --- Cabinet craftsmanship: raised panels, brass pulls, softer shadows --------
for(const a of assets){
  const name=a.userData.displayName||'';
  if(/Base|Drawer Cabinet/.test(name)){
    const panel=rb(.78,.58,.024,M.cream2,.018);panel.position.set(0,.54,.476);a.add(panel);
    const inset=rb(.64,.44,.022,M.cream,.016);inset.position.set(0,.54,.493);a.add(inset);
    const pull=rb(.27,.038,.055,M.brass,.014);pull.position.set(0,.78,.527);a.add(pull);
  }
  if(/Upper Cabinet/.test(name)){
    const crown=rb(1.16,.09,.58,M.woodLight,.018);crown.position.set(0,.75,0);a.add(crown);
    const baseLip=rb(1.12,.065,.57,M.cream2,.015);baseLip.position.set(0,-.73,0);a.add(baseLip);
  }
}

// Peninsula: paneled front like the reference image.
const pen=assetMap.get('Kitchen Peninsula');
if(pen){for(const xx of[-2.35,-.8,.8,2.35]){const outer=rb(1.22,.74,.035,M.cream2,.02);outer.position.set(xx,.5,.792);pen.add(outer);const inner=rb(1.02,.56,.03,M.cream,.018);inner.position.set(xx,.5,.814);pen.add(inner)}const base=rb(5.95,.12,1.38,M.woodDark,.02);base.position.set(0,.08,0);base.material=base.material.clone();base.material.transparent=true;base.material.opacity=.22;pen.add(base)}

// --- Fridge: warmer cream surface, vintage trim and believable magnets --------
const fridge=assetMap.get('Retro Fridge');
if(fridge){
  const topTrim=rb(1.54,.075,.08,M.brass,.02);topTrim.position.set(0,3.25,.59);fridge.add(topTrim);
  const badge=rb(.38,.12,.028,M.brass,.02);badge.position.set(0,2.94,.598);fridge.add(badge);
  const cardCols=[M.pink2,M.ivory,M.woodLight,M.cream2];
  [[-.38,2.35],[-.05,2.12],[.3,2.42],[-.3,1.92]].forEach(([x,y],i)=>{const c=rb(.24,.3,.025,cardCols[i],.018);c.position.set(x,y,.61);c.rotation.z=(i-1.5)*.05;fridge.add(c)});
  const lowerHighlight=rb(1.48,.035,.04,M.ivory,.015);lowerHighlight.position.set(0,1.43,.61);fridge.add(lowerHighlight);
}

// --- Stove: grate structure, cream front, stronger brass details --------------
const stove=assetMap.get('Large Stove Oven');
if(stove){
  for(const xx of[-.55,.55])for(const zz of[-.24,.24]){
    const grate=new THREE.Group();
    for(const ang of[0,Math.PI/2]){const b=rb(.56,.035,.055,M.dark,.012);b.position.set(xx,1.43,zz);b.rotation.y=ang;grate.add(b)}
    stove.add(grate);
  }
  const creamRail=rb(1.82,.12,.075,M.cream,.018);creamRail.position.set(0,1.01,.56);stove.add(creamRail);
  const brassHandle=rb(1.42,.055,.075,M.brass,.018);brassHandle.position.set(0,.83,.59);stove.add(brassHandle);
}

// --- Farmhouse sink: handles, soap bottle, realistic apron lip ----------------
const sink=assetMap.get('Farmhouse Sink');
if(sink){
  for(const dx of[-.26,.26]){const h=cyl(.055,.15,M.brass,16);h.rotation.z=Math.PI/2;h.position.set(.46+dx,1.35,-.24);sink.add(h);const k=rb(.18,.035,.045,M.brass,.012);k.position.set(.46+dx,1.35,-.24);sink.add(k)}
  const soap=rb(.12,.24,.12,M.ivory,.035);soap.position.set(-.55,1.32,.18);sink.add(soap);const pump=rb(.13,.035,.035,M.brass,.012);pump.position.set(-.52,1.47,.18);sink.add(pump);
  const apronLip=rb(1.5,.08,.16,M.cream,.025);apronLip.position.set(0,1.08,.57);sink.add(apronLip);
}

// --- Softer, more decorative stools ------------------------------------------
for(const id of['Gingham Stool 01','Gingham Stool 02']){
  const s=assetMap.get(id);if(!s)continue;
  const cushion=cyl(.39,.13,api.ginghamMat,32);cushion.position.y=1.035;s.add(cushion);
  const rim=torus(.39,.025,M.woodLight);rim.rotation.x=Math.PI/2;rim.position.y=.955;s.add(rim);
  const bowL=rb(.16,.08,.035,M.pink2,.025),bowR=bowL.clone();bowL.position.set(-.13,.91,.38);bowR.position.set(.13,.91,.38);bowL.rotation.z=.18;bowR.rotation.z=-.18;s.add(bowL,bowR);
}

// --- Pendant lamps: scalloped milk-glass silhouette ---------------------------
for(const id of['Pendant Light 01','Pendant Light 02']){
  const p=assetMap.get(id);if(!p)continue;
  for(let i=0;i<8;i++){const petal=sphere(.12,M.ivory,14);const a=i/8*Math.PI*2;petal.scale.set(1.25,.55,.8);petal.position.set(Math.cos(a)*.31,3.38,Math.sin(a)*.31);p.add(petal)}
  const ring=torus(.35,.022,M.brass);ring.rotation.x=Math.PI/2;ring.position.y=3.31;p.add(ring);
}

// --- Reference-like countertop vignette: flowers, fruit, cup ------------------
function flowerVase(x,z){const g=new THREE.Group();const vase=cyl(.15,.32,M.ivory,20);vase.position.y=.16;g.add(vase);for(let i=0;i<9;i++){const st=bx(.012,.35,.012,M.green);st.position.set((i-4)*.025,.46,(i%3-1)*.025);g.add(st);const f=sphere(.055,i%2?M.ivory:M.pink2,10);f.position.set(st.position.x,.67+(i%3)*.03,st.position.z);g.add(f)}g.position.set(x,1.2,z);polish.add(g)}
flowerVase(-2.62,2.2);
const cup=rb(.18,.2,.18,M.ivory,.045);cup.position.set(-1.45,1.37,2.23);polish.add(cup);const cupHandle=torus(.11,.022,M.ivory,Math.PI*1.55);cupHandle.rotation.y=Math.PI/2;cupHandle.position.set(-1.33,1.43,2.23);polish.add(cupHandle);

// More kitchen life without over-cluttering.
for(let i=0;i<4;i++){const bottle=cyl(.045,.28,i%2?M.woodDark:M.terracotta,14);bottle.position.set(-.2+i*.15,1.35,-4.72);polish.add(bottle);const cap=cyl(.05,.035,M.brass,14);cap.position.set(-.2+i*.15,1.51,-4.72);polish.add(cap)}
for(const [x,y,z] of [[-6.2,3.54,-5.08],[-5.88,4.13,-5.08],[5.05,3.54,-5.08],[5.38,4.12,-5.08]]){const j=cyl(.1,.22,M.cream,18);j.position.set(x,y,z);polish.add(j);const lid=cyl(.105,.035,M.woodLight,18);lid.position.set(x,y+.13,z);polish.add(lid)}

// --- Lighting: stronger sun separation, softer fill, warm practical glow ------
if(sun){sun.intensity=4.65;sun.color.set(0xffd39a);sun.position.set(-10,14.5,9.5);sun.shadow.bias=-.00022;sun.shadow.normalBias=.028}
if(bounce){bounce.intensity=4.7;bounce.color.set(0xffbd83)}
if(taskLight)taskLight.intensity=3.4;
const windowGlow=new THREE.SpotLight(0xffd29a,8.5,21,.7,.62,1.5);windowGlow.position.set(-7.0,7.2,2.2);windowGlow.target.position.set(-1.1,.1,-.6);windowGlow.castShadow=true;windowGlow.shadow.mapSize.set(1024,1024);polish.add(windowGlow,windowGlow.target);
for(const x of[-4.1,-2.8,2.7,4.2]){const l=new THREE.PointLight(0xffca83,1.45,2.8,2);l.position.set(x,2.62,-4.95);polish.add(l)}

// Gentle contact shadows under hero objects.
const contactMat=new THREE.MeshBasicMaterial({color:0x5b4131,transparent:true,opacity:.065,depthWrite:false});
function contact(x,z,sx,sz){const m=new THREE.Mesh(new THREE.CircleGeometry(1,32),contactMat);m.rotation.x=-Math.PI/2;m.scale.set(sx,sz,1);m.position.set(x,.072,z);polish.add(m)}
contact(6.15,-4.95,1.0,.55);contact(.55,-5.03,1.15,.54);contact(-3.55,3.62,.52,.3);contact(-1.82,3.62,.52,.3);

// Tiny badge only in Life Mode so this still feels like a game scene.
const badge=document.createElement('div');badge.className='k23-fidelity-badge';badge.textContent='Kitchen 2.3 · Cozy Reference Fidelity';document.querySelector('.workarea')?.appendChild(badge);

// Keep life mode clean even after selecting an item in Decor mode then exiting.
new MutationObserver(()=>{if(!document.body.classList.contains('k22-edit'))api.transform.detach()}).observe(document.body,{attributes:true,attributeFilter:['class']});

window.KITCHEN_3D_HIFI_23={version:'2.3',referenceView:referenceView23,group:polish};
