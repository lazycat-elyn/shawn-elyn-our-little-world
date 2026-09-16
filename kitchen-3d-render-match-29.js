const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.9 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,transform,kitchen,assetMap,M,sun,bounce,taskLight}=api;
document.body.classList.add('k29-ready');

// 2.9 targets the approved warm reference render itself: richer mids, controlled highlights,
// stronger material separation and a slightly higher/farther isometric composition.
const oldColorLights=kitchen.getObjectByName('KitchenColorMaster28');
if(oldColorLights) oldColorLights.visible=false;
document.querySelector('.k28-color-badge')?.remove();

const pass=new THREE.Group();pass.name='KitchenRenderMatch29';kitchen.add(pass);

const P={
 cabinet:0xf6e8d3,cabinetShade:0xe5cfb5,ivory:0xfff3df,wall:0xe8d2bf,
 wood:0xc7864e,woodLight:0xd9a064,woodDark:0x75462e,
 brass:0xaa7139,peach:0xdc9489,peachDeep:0xcc7d73,
 sage:0x68745b,terracotta:0xb96d51,dark:0x352b27,
 floor:0xf8ebdd,floorPeach:0xdca18e,grout:0xd6c0ad
};

function distHex(a,b){const A=new THREE.Color(a),B=new THREE.Color(b);return Math.hypot(A.r-B.r,A.g-B.g,A.b-B.b)}
function remap(mat){
 if(!mat?.color)return;
 const h=mat.color.getHex();
 const pairs=[
  [0xfff3e6,P.cabinet],[0xedd9c3,P.cabinetShade],[0xfffaf0,P.ivory],[0xf2dfce,P.wall],
  [0xd19a62,P.wood],[0xe5b47c,P.woodLight],[0x845134,P.woodDark],[0xb68147,P.brass],
  [0xe6a29d,P.peach],[0xd98f89,P.peachDeep],[0x7c8467,P.sage],[0xc77b5e,P.terracotta],[0x44342c,P.dark]
 ];
 let best=null,bestD=9;
 for(const [from,to] of pairs){const d=distHex(h,from);if(d<bestD){bestD=d;best=to}}
 if(best!==null&&bestD<.12)mat.color.setHex(best);
 const now=mat.color.getHex();
 if(distHex(now,P.cabinet)<.08){mat.roughness=.58;mat.metalness=0}
 else if(distHex(now,P.cabinetShade)<.08){mat.roughness=.68;mat.metalness=0}
 else if(distHex(now,P.ivory)<.08){mat.roughness=.46;mat.metalness=0}
 else if(distHex(now,P.wood)<.1||distHex(now,P.woodLight)<.1){mat.roughness=.5;mat.metalness=0}
 else if(distHex(now,P.brass)<.09){mat.roughness=.31;mat.metalness=.68}
 else if(distHex(now,P.peach)<.1||distHex(now,P.peachDeep)<.1){mat.roughness=.84;mat.metalness=0}
 else if(distHex(now,P.sage)<.1){mat.roughness=.86;mat.metalness=0}
 mat.needsUpdate=true;
}

function canvasTexture(w,h,draw,rx=1,ry=1){
 const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const woodTex=canvasTexture(512,256,(x,w,h)=>{
 x.fillStyle='#c88952';x.fillRect(0,0,w,h);
 for(let i=0;i<150;i++){const y=Math.random()*h;x.strokeStyle=`rgba(87,48,30,${.02+Math.random()*.05})`;x.lineWidth=.35+Math.random()*.9;x.beginPath();x.moveTo(0,y);let yy=y;for(let xx=0;xx<=w;xx+=18){yy+=Math.sin((xx+i)*.035)*.55+(Math.random()-.5)*.7;x.lineTo(xx,yy)}x.stroke()}
 for(let i=0;i<24;i++){const y=Math.random()*h;x.strokeStyle='rgba(255,226,185,.075)';x.lineWidth=.7+Math.random();x.beginPath();x.moveTo(0,y);x.lineTo(w,y+(Math.random()-.5)*2);x.stroke()}
},4.2,1.55);
const ginghamTex=canvasTexture(192,192,(x,w,h)=>{
 x.fillStyle='#fff1e5';x.fillRect(0,0,w,h);const s=96;
 x.fillStyle='rgba(218,143,133,.46)';for(const v of[0,s]){x.fillRect(v,0,34,h);x.fillRect(0,v,w,34)}
 x.fillStyle='rgba(194,110,105,.14)';for(const xx of[0,s])for(const yy of[0,s])x.fillRect(xx,yy,34,34);
 x.strokeStyle='rgba(255,255,255,.2)';for(let i=0;i<w;i+=8){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}
},4,3);
const floorTex=canvasTexture(512,512,(x,w,h)=>{
 x.fillStyle='#f8ebdd';x.fillRect(0,0,w,h);const s=96;x.strokeStyle='rgba(183,154,130,.28)';x.lineWidth=2;
 for(let yy=0;yy<h;yy+=s)for(let xx=0;xx<w;xx+=s){x.strokeRect(xx+3,yy+3,s-6,s-6);x.save();x.translate(xx+s,yy+s);x.rotate(Math.PI/4);x.fillStyle='#dca18e';x.fillRect(-9,-9,18,18);x.restore()}
},3.2,2.25);
const floralTex=canvasTexture(512,256,(x,w,h)=>{
 x.fillStyle='#f9eee2';x.fillRect(0,0,w,h);x.strokeStyle='rgba(194,164,140,.26)';x.lineWidth=1;
 for(let xx=0;xx<=w;xx+=64){x.beginPath();x.moveTo(xx,0);x.lineTo(xx,h);x.stroke()}
 for(let yy=0;yy<=h;yy+=64){x.beginPath();x.moveTo(0,yy);x.lineTo(w,yy);x.stroke()}
 for(let yy=32;yy<h;yy+=64)for(let xx=32;xx<w;xx+=64){x.fillStyle='rgba(211,130,122,.67)';for(const [dx,dy] of[[0,-4],[-4,0],[4,0],[0,4]]){x.beginPath();x.ellipse(xx+dx,yy+dy,3.4,5,0,0,Math.PI*2);x.fill()}x.fillStyle='#c99255';x.beginPath();x.arc(xx,yy,2.1,0,Math.PI*2);x.fill()}
},4.1,1.55);
const rugTex=canvasTexture(256,256,(x,w,h)=>{
 x.fillStyle='#f3ddd3';x.fillRect(0,0,w,h);const s=48;
 for(let yy=0;yy<h;yy+=s)for(let xx=0;xx<w;xx+=s){x.fillStyle=((xx+yy)/s)%2?'#d9998f':'#efc9c0';x.fillRect(xx,yy,s,s);x.fillStyle='rgba(255,255,255,.12)';x.fillRect(xx,yy,s,3)}
},5,3);

const master=kitchen.getObjectByName('KitchenReferenceMaster27');
const heroIds=['Reference L Peninsula 2.7','Farmhouse Sink','Large Stove Oven','Farmhouse Range Hood 2.2','Retro Fridge','Upper Cabinet 1','Gingham Stool 01','Gingham Stool 02','Reference Gingham Rug 2.7','Back Base 1','Back Base 2','Back Base 3','Back Base 05','Drawer Cabinet 01','Drawer Cabinet 02','Reference Shelf Left Low','Reference Shelf Left High','Reference Shelf Right Low','Reference Shelf Right High'];
const roots=[master,...heroIds.map(id=>assetMap.get(id))].filter(Boolean);
const seen=new Set();
for(const root of roots)root.traverse(o=>{
 if(!o.material)return;const mats=Array.isArray(o.material)?o.material:[o.material];
 for(const mat of mats){if(seen.has(mat))continue;seen.add(mat);remap(mat);const img=mat.map?.image;
  if(img?.width===192&&img?.height===192){mat.map=ginghamTex;mat.color.set(0xfff6f0);mat.roughness=.9}
  else if(img?.width===256&&img?.height===256){mat.map=rugTex;mat.color.set(0xfff2ed);mat.roughness=.94}
  else if(img?.width===512&&img?.height===512){mat.map=floorTex;mat.color.set(0xfff5ed);mat.roughness=.84}
  else if(img?.width===512&&img?.height===256){const h=mat.color.getHex();if(distHex(h,P.wood)<.18||distHex(h,P.woodLight)<.18){mat.map=woodTex;mat.bumpMap=woodTex;mat.bumpScale=.012}else{mat.map=floralTex;mat.color.set(0xfff7ef);mat.roughness=.92}}
  mat.needsUpdate=true;
 }
});

// Purchased appliances inherit the richer target palette too.
M.cream.color.set(P.cabinet);M.cream2.color.set(P.cabinetShade);M.ivory.color.set(P.ivory);
M.wood.color.set(P.wood);M.wood2.color.set(P.wood);M.woodLight.color.set(P.woodLight);M.woodDark.color.set(P.woodDark);
M.brass.color.set(P.brass);M.pink.color.set(P.peachDeep);M.pink2.color.set(P.peach);M.green.color.set(P.sage);M.terracotta.color.set(P.terracotta);M.dark.color.set(P.dark);
Object.values(M).forEach(m=>{if(m?.isMaterial)m.needsUpdate=true});

// The previous screenshot was blown out. Normalize ALL scene lights first, then add one controlled golden key.
scene.traverse(o=>{
 if(o.isHemisphereLight)o.intensity=.72;
 else if(o.isDirectionalLight)o.intensity=o===sun?1.75:Math.min(o.intensity,.28);
 else if(o.isSpotLight)o.intensity=Math.min(o.intensity,1.15);
 else if(o.isPointLight)o.intensity=Math.min(o.intensity,.48);
});
if(sun){sun.color.set(0xffc98e);sun.intensity=1.75;sun.position.set(-10.5,14.5,8.5);sun.castShadow=true;sun.shadow.bias=-.00015}
if(bounce){bounce.color.set(0xffb97f);bounce.intensity=.42;bounce.position.set(-5.2,4.8,3.4)}
if(taskLight){taskLight.color.set(0xffd3a4);taskLight.intensity=.38}
const key=new THREE.DirectionalLight(0xffd19a,1.1);key.position.set(-7.5,11.5,8.8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-13;key.shadow.camera.right=13;key.shadow.camera.top=12;key.shadow.camera.bottom=-12;pass.add(key);
const fill=new THREE.DirectionalLight(0xfff0df,.2);fill.position.set(8,7,10);pass.add(fill);
const warmCounter=new THREE.PointLight(0xffbd79,.34,4.5,2);warmCounter.position.set(-1.5,2.3,-3.8);pass.add(warmCounter);

scene.background.set(0xe7d3c3);
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=.74;
renderer.domElement.style.filter='saturate(1.045) contrast(1.15) brightness(.94)';
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;

// Match the approved composition: slightly higher, farther, with more right-side floor visible and less oversized foreground counter.
const pen=assetMap.get('Reference L Peninsula 2.7');if(pen){pen.scale.set(.93,1,.94);pen.position.set(-.12,0,-.02);pen.userData.homePos=pen.position.clone();pen.userData.homeRot=pen.rotation.clone()}
const stool1=assetMap.get('Gingham Stool 01'),stool2=assetMap.get('Gingham Stool 02');
if(stool1){stool1.position.set(-3.7,0,3.48);stool1.userData.homePos=stool1.position.clone()}
if(stool2){stool2.position.set(-1.95,0,3.48);stool2.userData.homePos=stool2.position.clone()}
const REF29={pos:new THREE.Vector3(13.15,10.25,15.6),target:new THREE.Vector3(-.85,1.28,-.98),fov:24.2};
function referenceView29(){camera.position.copy(REF29.pos);camera.fov=REF29.fov;camera.updateProjectionMatrix();orbit.target.copy(REF29.target);orbit.update();transform.detach()}
referenceView29();orbit.minDistance=10.2;orbit.maxDistance=22.5;orbit.minPolarAngle=.5;orbit.maxPolarAngle=1.22;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView29,0));document.getElementById('assembledBtn')?.addEventListener('click',()=>setTimeout(referenceView29,20));

// Reference-like grounding beneath the hero fixtures so cream surfaces do not float.
const shadowMat=new THREE.MeshBasicMaterial({color:0x573a2b,transparent:true,opacity:.085,depthWrite:false});
function contact(x,z,sx,sz){const q=new THREE.Mesh(new THREE.CircleGeometry(1,40),shadowMat);q.rotation.x=-Math.PI/2;q.scale.set(sx,sz,1);q.position.set(x,.079,z);pass.add(q)}
contact(6.05,-4.9,.95,.62);contact(.72,-5.0,1.18,.58);contact(-3.3,-5.0,1.05,.55);contact(-2.8,2.15,3.25,.72);contact(-3.7,3.48,.45,.3);contact(-1.95,3.48,.45,.3);

function applyGrade(){
 const night=document.body.classList.contains('k13-night'),evening=document.body.classList.contains('k13-evening');
 if(night){renderer.toneMappingExposure=.52;renderer.domElement.style.filter='saturate(1.0) contrast(1.14) brightness(.82)';key.intensity=.22;fill.intensity=.1;warmCounter.intensity=.62;scene.traverse(o=>{if(o.isPointLight&&o!==warmCounter)o.intensity=Math.min(o.intensity,.85)})}
 else if(evening){renderer.toneMappingExposure=.63;renderer.domElement.style.filter='saturate(1.035) contrast(1.145) brightness(.9)';key.intensity=.48;fill.intensity=.14;warmCounter.intensity=.48}
 else{renderer.toneMappingExposure=.74;renderer.domElement.style.filter='saturate(1.045) contrast(1.15) brightness(.94)';key.intensity=1.1;fill.intensity=.2;warmCounter.intensity=.34}
}
applyGrade();new MutationObserver(applyGrade).observe(document.body,{attributes:true,attributeFilter:['class']});

const badge=document.createElement('div');badge.className='k29-render-badge';badge.textContent='Kitchen 2.9 · Reference Render Match';document.querySelector('.workarea')?.appendChild(badge);
window.KITCHEN_3D_RENDER_29={version:'2.9',palette:P,group:pass,referenceView:referenceView29,applyGrade};
