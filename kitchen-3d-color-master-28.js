const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.8 internal API unavailable');
const {THREE,scene,renderer,kitchen,assetMap,M,sun,bounce,taskLight}=api;
document.body.classList.add('k28-ready');

const colorPass=new THREE.Group();colorPass.name='KitchenColorMaster28';kitchen.add(colorPass);

// Approved palette: creamy ivory + honey wood + peach gingham + antique brass.
const P={
  cabinet:0xfff3e6,cabinetShade:0xedd9c3,ivory:0xfffaf0,wall:0xf2dfce,
  wood:0xd19a62,woodLight:0xe5b47c,woodDark:0x845134,
  brass:0xb68147,peach:0xe6a29d,peachDeep:0xd98f89,
  sage:0x7c8467,terracotta:0xc77b5e,dark:0x44342c,
  floor:0xfff8ef,floorPeach:0xe6b5aa,grout:0xe2cdbc
};

function hexDist(a,b){const A=new THREE.Color(a),B=new THREE.Color(b);return Math.hypot(A.r-B.r,A.g-B.g,A.b-B.b)}
const remaps=[
  [0xfff7eb,P.cabinet],[0xf2e3d0,P.cabinetShade],[0xfffcf4,P.ivory],[0xf6e9dc,P.wall],
  [0xc98a55,P.wood],[0xe2ad78,P.woodLight],[0x8a5738,P.woodDark],[0xb98345,P.brass],
  [0xe8a39b,P.peach],[0x3f352f,P.dark],[0x71805b,P.sage],[0xc87859,P.terracotta]
];
function remapMaterial(mat){
  if(!mat?.color)return;
  const h=mat.color.getHex();
  let best=null,bestD=1;
  for(const [from,to] of remaps){const d=hexDist(h,from);if(d<bestD){bestD=d;best=to}}
  if(best!==null&&bestD<.055)mat.color.setHex(best);
  const now=mat.color.getHex();
  if(hexDist(now,P.cabinet)<.06){mat.roughness=.52;mat.metalness=0}
  else if(hexDist(now,P.cabinetShade)<.06){mat.roughness=.63;mat.metalness=0}
  else if(hexDist(now,P.ivory)<.06){mat.roughness=.4;mat.metalness=0}
  else if(hexDist(now,P.wood)<.07||hexDist(now,P.woodLight)<.07){mat.roughness=.47;mat.metalness=0}
  else if(hexDist(now,P.brass)<.07){mat.roughness=.28;mat.metalness=.72}
  else if(hexDist(now,P.peach)<.07){mat.roughness=.82;mat.metalness=0}
  else if(hexDist(now,P.sage)<.07){mat.roughness=.84;mat.metalness=0}
  mat.needsUpdate=true;
}

function canvasTexture(w,h,draw,repeatX=1,repeatY=1){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeatX,repeatY);t.colorSpace=THREE.SRGBColorSpace;return t}
const woodTex=canvasTexture(512,256,(x,w,h)=>{x.fillStyle='#d39a62';x.fillRect(0,0,w,h);for(let i=0;i<135;i++){const y=Math.random()*h;x.strokeStyle=`rgba(110,65,39,${.022+Math.random()*.055})`;x.lineWidth=.35+Math.random()*1.05;x.beginPath();x.moveTo(0,y);let yy=y;for(let xx=0;xx<=w;xx+=20){yy+=Math.sin((xx+i)*.038)*.65+(Math.random()-.5)*.9;x.lineTo(xx,yy)}x.stroke()}for(let i=0;i<26;i++){const y=Math.random()*h;x.strokeStyle='rgba(255,230,195,.08)';x.lineWidth=.8+Math.random()*1.2;x.beginPath();x.moveTo(0,y);x.lineTo(w,y+(Math.random()-.5)*3);x.stroke()}},4.4,1.6);
const ginghamTex=canvasTexture(192,192,(x,w,h)=>{x.fillStyle='#fff3e9';x.fillRect(0,0,w,h);const s=96;x.fillStyle='rgba(228,161,154,.40)';for(const v of[0,s]){x.fillRect(v,0,34,h);x.fillRect(0,v,w,34)}x.fillStyle='rgba(208,129,125,.15)';for(const xx of[0,s])for(const yy of[0,s])x.fillRect(xx,yy,34,34);x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=1;for(let i=0;i<w;i+=8){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}},4,3);
const floorTex=canvasTexture(512,512,(x,w,h)=>{x.fillStyle='#fff8ef';x.fillRect(0,0,w,h);const s=96;x.strokeStyle='rgba(203,177,154,.22)';x.lineWidth=2;for(let yy=0;yy<h;yy+=s)for(let xx=0;xx<w;xx+=s){x.strokeRect(xx+3,yy+3,s-6,s-6);x.save();x.translate(xx+s,yy+s);x.rotate(Math.PI/4);x.fillStyle='#e6b5aa';x.fillRect(-9,-9,18,18);x.restore()}},3.2,2.25);
const floralTex=canvasTexture(512,256,(x,w,h)=>{x.fillStyle='#fff8ef';x.fillRect(0,0,w,h);x.strokeStyle='rgba(221,198,177,.22)';x.lineWidth=1;for(let xx=0;xx<=w;xx+=64){x.beginPath();x.moveTo(xx,0);x.lineTo(xx,h);x.stroke()}for(let yy=0;yy<=h;yy+=64){x.beginPath();x.moveTo(0,yy);x.lineTo(w,yy);x.stroke()}for(let yy=32;yy<h;yy+=64)for(let xx=32;xx<w;xx+=64){x.fillStyle='rgba(225,154,148,.60)';for(const [dx,dy] of[[0,-4],[-4,0],[4,0],[0,4]]){x.beginPath();x.ellipse(xx+dx,yy+dy,3.5,5,0,0,Math.PI*2);x.fill()}x.fillStyle='#d8a465';x.beginPath();x.arc(xx,yy,2.1,0,Math.PI*2);x.fill()}},4.1,1.55);
const rugTex=canvasTexture(256,256,(x,w,h)=>{x.fillStyle='#f9e8df';x.fillRect(0,0,w,h);const s=48;for(let yy=0;yy<h;yy+=s)for(let xx=0;xx<w;xx+=s){const odd=((xx+yy)/s)%2;x.fillStyle=odd?'#e4aaa1':'#f4d4cc';x.fillRect(xx,yy,s,s);x.fillStyle='rgba(255,255,255,.16)';x.fillRect(xx,yy,s,3)}for(let i=0;i<800;i++){x.fillStyle=`rgba(120,80,60,${Math.random()*.025})`;x.fillRect(Math.random()*w,Math.random()*h,1,1)}},5,3);

const master=kitchen.getObjectByName('KitchenReferenceMaster27');
const heroIds=['Reference L Peninsula 2.7','Farmhouse Sink','Large Stove Oven','Farmhouse Range Hood 2.2','Retro Fridge','Upper Cabinet 1','Gingham Stool 01','Gingham Stool 02','Reference Gingham Rug 2.7','Back Base 1','Back Base 2','Back Base 3','Back Base 05','Drawer Cabinet 01','Drawer Cabinet 02','Reference Shelf Left Low','Reference Shelf Left High','Reference Shelf Right Low','Reference Shelf Right High'];
const roots=[master,...heroIds.map(id=>assetMap.get(id))].filter(Boolean);
const seen=new Set();
for(const root of roots)root.traverse(o=>{
  if(!o.material)return;
  const mats=Array.isArray(o.material)?o.material:[o.material];
  for(const mat of mats){if(seen.has(mat))continue;seen.add(mat);remapMaterial(mat);
    const img=mat.map?.image;
    if(img?.width===128&&img?.height===128){mat.map=ginghamTex;mat.color.set(0xfff7f2);mat.roughness=.88}
    else if(img?.width===256&&img?.height===256){mat.map=rugTex;mat.color.set(0xfff7f3);mat.roughness=.92}
    else if(img?.width===512&&img?.height===512){mat.map=floorTex;mat.color.set(0xfffbf7);mat.roughness=.8}
    else if(img?.width===512&&img?.height===256){const h=mat.color.getHex();if(hexDist(h,P.wood)<.16||hexDist(h,P.woodLight)<.16){mat.map=woodTex;mat.bumpMap=woodTex;mat.bumpScale=.016}else{mat.map=floralTex;mat.color.set(0xfffbf6);mat.roughness=.9}}
    mat.needsUpdate=true;
  }
});

// Core materials used by movable appliances/props follow the same palette.
M.cream.color.set(P.cabinet);M.cream2.color.set(P.cabinetShade);M.ivory.color.set(P.ivory);
M.wood.color.set(P.wood);M.wood2.color.set(P.wood);M.woodLight.color.set(P.woodLight);M.woodDark.color.set(P.woodDark);
M.brass.color.set(P.brass);M.pink.color.set(P.peachDeep);M.pink2.color.set(P.peach);M.green.color.set(P.sage);M.terracotta.color.set(P.terracotta);M.dark.color.set(P.dark);
M.orange.color.set(0xd88b45);M.red.color.set(0xb85f51);
Object.values(M).forEach(m=>{if(m?.isMaterial)m.needsUpdate=true});

// Warm color separation: no more washed-out white-on-white.
scene.background.set(0xf3e3d7);
renderer.toneMappingExposure=.93;
renderer.domElement.style.filter='saturate(1.075) contrast(1.085) brightness(.995)';
if(sun){sun.color.set(0xffcf98);sun.intensity=4.3;sun.position.set(-9.8,14.4,9.6)}
if(bounce){bounce.color.set(0xffbd86);bounce.intensity=3.35;bounce.position.set(-4.7,4.6,3.2)}
if(taskLight){taskLight.color.set(0xffd8aa);taskLight.intensity=2.55}
const warmFill=new THREE.DirectionalLight(0xffead2,.48);warmFill.position.set(8,9,10);colorPass.add(warmFill);
const counterGlow=[];for(const x of[-4.6,-1.0,3.1]){const l=new THREE.PointLight(0xffc988,.62,3.4,2);l.position.set(x,2.05,-4.65);colorPass.add(l);counterGlow.push(l)}
const peninsulaGlow=new THREE.PointLight(0xffc789,.55,4.2,2);peninsulaGlow.position.set(-2.7,2.1,2.3);colorPass.add(peninsulaGlow);

// Gentle mode-aware grade so evening/night stay cozy instead of turning grey.
function applyGrade(){const night=document.body.classList.contains('k13-night'),evening=document.body.classList.contains('k13-evening');if(night){renderer.toneMappingExposure=.72;renderer.domElement.style.filter='saturate(1.03) contrast(1.09) brightness(.91)';warmFill.intensity=.24;counterGlow.forEach(l=>l.intensity=.95);peninsulaGlow.intensity=.78}else if(evening){renderer.toneMappingExposure=.84;renderer.domElement.style.filter='saturate(1.08) contrast(1.08) brightness(.97)';warmFill.intensity=.38;counterGlow.forEach(l=>l.intensity=.78);peninsulaGlow.intensity=.66}else{renderer.toneMappingExposure=.93;renderer.domElement.style.filter='saturate(1.075) contrast(1.085) brightness(.995)';warmFill.intensity=.48;counterGlow.forEach(l=>l.intensity=.62);peninsulaGlow.intensity=.55}}
applyGrade();new MutationObserver(applyGrade).observe(document.body,{attributes:true,attributeFilter:['class']});

document.querySelector('.k27-fidelity-badge')?.remove();
const badge=document.createElement('div');badge.className='k28-color-badge';badge.textContent='Kitchen 2.8 · Sunlit Cream-Peach Color Master';document.querySelector('.workarea')?.appendChild(badge);
window.KITCHEN_3D_COLOR_28={version:'2.8',palette:P,group:colorPass,applyGrade};
