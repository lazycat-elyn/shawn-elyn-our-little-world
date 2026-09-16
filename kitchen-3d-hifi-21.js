const api=window.KITCHEN_3D_INTERNAL;
if(!api)throw new Error('Kitchen 2.1 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,kitchen,register,rb,bx,cyl,sphere,torus,M,C,sun,bounce,taskLight,renderAssetList}=api;

// --- Camera + render fidelity -------------------------------------------------
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.toneMappingExposure=1.18;
renderer.shadowMap.enabled=true;
renderer.shadowMap.autoUpdate=true;
if(sun){sun.intensity=5.15;sun.shadow.bias=-0.00015;sun.shadow.normalBias=.025;sun.shadow.mapSize.set(3072,3072)}
if(bounce)bounce.intensity=7.2;
if(taskLight)taskLight.intensity=5.4;
scene.background=new THREE.Color(0xf8eee4);

const REF_CAMERA={pos:new THREE.Vector3(13.9,11.7,16.6),target:new THREE.Vector3(-.55,1.52,-.75),fov:27};
function referenceView(){camera.position.copy(REF_CAMERA.pos);camera.fov=REF_CAMERA.fov;camera.updateProjectionMatrix();orbit.target.copy(REF_CAMERA.target);orbit.update()}
referenceView();
orbit.minDistance=11.2;orbit.maxDistance=27;orbit.minPolarAngle=.52;orbit.maxPolarAngle=1.34;orbit.minAzimuthAngle=-.18;orbit.maxAzimuthAngle=1.18;

// --- Procedural micro-detail materials --------------------------------------
function makeWoodBump(){
 const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');
 x.fillStyle='#8d8d8d';x.fillRect(0,0,c.width,c.height);
 for(let i=0;i<120;i++){
   const y=Math.random()*128,w=.4+Math.random()*1.4;
   x.strokeStyle=`rgba(${95+Math.random()*55|0},${95+Math.random()*55|0},${95+Math.random()*55|0},${.18+Math.random()*.3})`;
   x.lineWidth=w;x.beginPath();x.moveTo(-20,y);let yy=y;
   for(let xx=0;xx<540;xx+=28){yy+=Math.sin((xx+i)*.05)*1.2+(Math.random()-.5)*1.8;x.lineTo(xx,yy)}x.stroke();
 }
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.8,1);return t;
}
const woodBump=makeWoodBump();
[M.wood,M.wood2,M.woodLight,M.woodDark].forEach((m,i)=>{if(!m)return;m.bumpMap=woodBump;m.bumpScale=i===3?.025:.04;m.roughness=Math.min(m.roughness??.6,.53);m.needsUpdate=true});
if(M.cream){M.cream.roughness=.48;M.cream.needsUpdate=true}
if(M.cream2){M.cream2.roughness=.62;M.cream2.needsUpdate=true}
if(M.ivory){M.ivory.roughness=.4;M.ivory.needsUpdate=true}
if(M.brass){M.brass.roughness=.22;M.brass.metalness=.82;M.brass.needsUpdate=true}
if(M.metal){M.metal.roughness=.28;M.metal.metalness=.76;M.metal.needsUpdate=true}

const hi=new THREE.Group();hi.name='KitchenHighFidelity21';kitchen.add(hi);
const softShadowMat=new THREE.MeshBasicMaterial({color:0x5e4637,transparent:true,opacity:.10,depthWrite:false});
function shadowDisc(x,z,rx,rz=.7){const m=new THREE.Mesh(new THREE.CircleGeometry(1,36),softShadowMat);m.rotation.x=-Math.PI/2;m.scale.set(rx,rz,1);m.position.set(x,.045,z);hi.add(m);return m}
shadowDisc(6.1,-4.88,1.08,.62);shadowDisc(-3.55,3.62,.55,.34);shadowDisc(-1.82,3.62,.55,.34);shadowDisc(-2.2,2.25,3.45,.72);

// --- Under-cabinet / practical lighting ------------------------------------
const practicalLights=[];
function addWarmTaskLight(x,y,z,intensity=2.8,distance=3.4){const l=new THREE.PointLight(0xffc983,intensity,distance,2);l.position.set(x,y,z);hi.add(l);practicalLights.push(l);return l}
[-4.35,-2.8,2.6,4.3].forEach(x=>addWarmTaskLight(x,2.72,-5.15,2.7,3.1));
addWarmTaskLight(-7.15,2.65,-1.75,2.25,2.9);

// warm strip glow under wall cabinets
const glowMat=new THREE.MeshBasicMaterial({color:0xffd9a5,transparent:true,opacity:.33,depthWrite:false});
[[-4.15,3.05,-5.11,1.15],[-2.75,3.05,-5.11,1.15],[4.25,3.05,-5.11,1.12]].forEach(([x,y,z,w])=>{const g=bx(w,.025,.11,glowMat);g.position.set(x,y,z);hi.add(g)});

// --- Window depth + sun pattern ---------------------------------------------
const outside=new THREE.Group();outside.position.set(-8.08,0,0);hi.add(outside);
const sky=new THREE.Mesh(new THREE.PlaneGeometry(5.7,3.6),new THREE.MeshBasicMaterial({color:0xdfe8c7,transparent:true,opacity:.82,depthWrite:false}));sky.rotation.y=Math.PI/2;sky.position.set(0,3.15,-1.8);outside.add(sky);
for(let i=0;i<17;i++){
 const r=.18+Math.random()*.38,leaf=sphere(r,M.green,12);leaf.scale.set(.8,1.15,.55);leaf.position.set(-.18,1.3+Math.random()*3.5,-4.4+Math.random()*5.4);leaf.material=leaf.material.clone();leaf.material.transparent=true;leaf.material.opacity=.28+Math.random()*.27;outside.add(leaf)
}
const sunPatchMat=new THREE.MeshBasicMaterial({color:0xffd79b,transparent:true,opacity:.095,depthWrite:false});
for(let row=0;row<3;row++)for(let col=0;col<4;col++){
 const q=new THREE.Mesh(new THREE.PlaneGeometry(1.3,.72),sunPatchMat);q.rotation.x=-Math.PI/2;q.rotation.z=-.36;q.position.set(-3.65+col*1.35,.058,-1.0+row*.86);hi.add(q)
}

// --- Cabinet craftsmanship details -----------------------------------------
const trimMat=M.woodLight;
// toe kicks / base plinths
[[-2.7,-5.48,6.2],[-7.55,-2.55,4.9]].forEach(([x,z,w],i)=>{const p=bx(w,.16,.12,M.woodDark);p.position.set(x,.11,z);if(i===1)p.rotation.y=Math.PI/2;hi.add(p)});
// crown strips beneath upper cabinets / hood zone
[[-4.15,4.53,-5.31,1.44],[-2.75,4.53,-5.31,1.44],[4.25,4.53,-5.31,1.42]].forEach(([x,y,z,w])=>{const t=rb(w,.095,.58,trimMat,.018);t.position.set(x,y,z);hi.add(t)});

// visible stacks inside the glass cabinet
function plateStack(x,y,z,count=5){const g=new THREE.Group();for(let i=0;i<count;i++){const p=cyl(.19,.025,M.ivory,28);p.position.y=i*.035;g.add(p)}g.position.set(x,y,z);hi.add(g);return g}
plateStack(-4.28,3.55,-5.02,5);plateStack(-3.96,3.55,-5.02,4);
for(let i=0;i<3;i++){const cup=rb(.18,.18,.18,M.ivory,.045);cup.position.set(-4.25+i*.28,4.0,-5.00);hi.add(cup);const h=torus(.105,.022,M.ivory,Math.PI*1.45);h.rotation.y=Math.PI/2;h.position.set(-4.14+i*.28,4.0,-4.91);hi.add(h)}

// --- Reference-like countertop styling -------------------------------------
function ceramicJar(x,y,z,s=.12,accent=false){const g=new THREE.Group();const body=cyl(s,s*1.8,accent?M.pink2:M.cream,20);body.position.y=s*.9;g.add(body);const lip=cyl(s*1.04,s*.12,M.brass,20);lip.position.y=s*1.86;g.add(lip);const lid=cyl(s*.9,s*.17,M.woodLight,20);lid.position.y=s*2.02;g.add(lid);g.position.set(x,y,z);hi.add(g);return g}
for(let i=0;i<4;i++)ceramicJar(3.62+i*.31,1.23,-4.72,.105,i===2);
for(let i=0;i<3;i++)ceramicJar(-6.65+i*.34,1.22,-4.7,.11,false);

// spice bottles near cooking zone
for(let i=0;i<5;i++){const g=new THREE.Group();const b=cyl(.055,.24,i%2?M.terracotta:M.woodDark,14);b.position.y=.12;g.add(b);const cap=cyl(.06,.04,M.brass,14);cap.position.y=.26;g.add(cap);g.position.set(-.05+i*.17,1.19,-4.65);hi.add(g)}

// utensil crock + wooden spoons
const crock=new THREE.Group();const crockBody=cyl(.18,.34,M.ivory,22);crockBody.position.y=.17;crock.add(crockBody);
for(let i=0;i<6;i++){const spoon=cyl(.018,.48,M.woodLight,10);spoon.position.set((i-2.5)*.045,.47,(i%2-.5)*.07);spoon.rotation.z=(i-2.5)*.035;crock.add(spoon)}
crock.position.set(1.86,1.18,-4.68);hi.add(crock);

// cookbook stand with two-page look
const bookStand=new THREE.Group();const boardA=rb(.42,.54,.035,M.ivory,.025),boardB=rb(.42,.54,.035,M.ivory,.025);boardA.rotation.y=.22;boardB.rotation.y=-.22;boardA.position.x=-.2;boardB.position.x=.2;bookStand.add(boardA,boardB);const foot=bx(.74,.045,.28,M.woodLight);foot.position.set(0,-.29,.08);bookStand.add(foot);bookStand.position.set(-6.55,1.58,-4.55);bookStand.rotation.y=.15;hi.add(bookStand);

// framed botanical art resting on the backsplash
function tinyFrame(x,y,z,w=.42,h=.55){const g=new THREE.Group();const frame=rb(w,h,.045,M.woodLight,.025);g.add(frame);const art=rb(w*.78,h*.78,.05,M.ivory,.018);art.position.z=.027;g.add(art);const stem=bx(.025,h*.36,.01,M.green);stem.position.set(0,-.02,.06);stem.rotation.z=.15;g.add(stem);for(const sy of[-.1,.08]){const leaf=sphere(.05,M.green,10);leaf.scale.set(.55,1,.3);leaf.position.set(.07,sy,.07);g.add(leaf)}g.position.set(x,y,z);hi.add(g);return g}
tinyFrame(-.82,1.72,-5.46,.38,.54);tinyFrame(5.14,1.72,-5.45,.34,.49);

// gingham tea towel at sink and peninsula
const clothMat=api.ginghamMat;
const sinkCloth=rb(.42,.62,.025,clothMat,.012);sinkCloth.position.set(-6.72,1.03,-1.68);sinkCloth.rotation.y=Math.PI/2;hi.add(sinkCloth);

// fruit / flower tray on peninsula, visually matching the reference
const tray=rb(1.5,.08,.72,M.woodLight,.06);tray.position.set(-2.25,1.31,2.25);hi.add(tray);
const vase=cyl(.16,.36,M.ivory,20);vase.position.set(-2.58,1.53,2.24);hi.add(vase);
for(let i=0;i<9;i++){const stem=bx(.015,.33,.015,M.green);stem.position.set(-2.58+(i-4)*.035,1.77,2.24+(i%3-1)*.035);stem.rotation.z=(i-4)*.04;hi.add(stem);const bloom=sphere(.065,i%2?M.ivory:M.pink2,12);bloom.position.set(stem.position.x,1.94+(i%3)*.035,stem.position.z);hi.add(bloom)}
const fruitBowl=new THREE.Group();const bowl=new THREE.Mesh(new THREE.SphereGeometry(.28,24,12,0,Math.PI*2,0,Math.PI/2),M.woodLight);bowl.rotation.x=Math.PI;bowl.scale.y=.42;fruitBowl.add(bowl);for(let i=0;i<6;i++){const f=sphere(.09,i%2?M.orange:M.red,12);f.position.set((i%3-1)*.12,.1+Math.floor(i/3)*.09,(i%2-.5)*.13);fruitBowl.add(f)}fruitBowl.position.set(-1.98,1.39,2.25);hi.add(fruitBowl);

// rug fringe for a softer textile finish
for(let i=0;i<22;i++)for(const side of[-1,1]){const f=bx(.025,.018,.22,M.cream2);f.position.set(-1.3+i*.2,.055,-3.5+side*.87);f.rotation.y=(i%2?1:-1)*.07;hi.add(f)}

// floating dust in the sun, intentionally subtle
const dustGeo=new THREE.BufferGeometry(),dust=[];for(let i=0;i<90;i++)dust.push(-6+Math.random()*10,.8+Math.random()*4.4,-4.7+Math.random()*7.5);dustGeo.setAttribute('position',new THREE.Float32BufferAttribute(dust,3));
const dustPts=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xffe3b8,size:.025,transparent:true,opacity:.32,depthWrite:false}));hi.add(dustPts);

// actual lighting follows the existing Day / Evening / Night UI
function syncLightMode(){const night=document.body.classList.contains('k13-night'),evening=document.body.classList.contains('k13-evening');
 if(night){renderer.toneMappingExposure=.82;scene.background.set(0x3f4356);sun.intensity=.5;practicalLights.forEach(l=>l.intensity=3.7);if(bounce)bounce.intensity=2.2;if(taskLight)taskLight.intensity=5.5}
 else if(evening){renderer.toneMappingExposure=1.03;scene.background.set(0xe7b996);sun.intensity=2.65;practicalLights.forEach(l=>l.intensity=3.35);if(bounce)bounce.intensity=6.5;if(taskLight)taskLight.intensity=5.3}
 else{renderer.toneMappingExposure=1.18;scene.background.set(0xf8eee4);sun.intensity=5.15;practicalLights.forEach(l=>l.intensity=2.7);if(bounce)bounce.intensity=7.2;if(taskLight)taskLight.intensity=5.4}
}
new MutationObserver(syncLightMode).observe(document.body,{attributes:true,attributeFilter:['class']});syncLightMode();

// reference-camera control
const actions=document.querySelector('.topbar .actions');
if(actions&&!document.getElementById('k21ReferenceView')){const b=document.createElement('button');b.id='k21ReferenceView';b.className='pill k21-reference';b.textContent='🎞 Reference View';b.onclick=referenceView;actions.prepend(b)}

renderAssetList?.();
window.KITCHEN_3D_HIFI_21={version:'2.1',referenceView,group:hi};
