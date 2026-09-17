const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.0 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,transform,kitchen,assetMap,rb,bx,cyl,sphere,torus,sun,bounce,taskLight}=api;
document.body.classList.add('k30-ready');

// Kitchen 3.0 — high-fidelity reference match pass.
// This pass is deliberately additive: gameplay, Shop/Bag, Move/Rotate/Store/Use and saved state stay intact.
const old=kitchen.getObjectByName('KitchenReferenceMatch30');
if(old) kitchen.remove(old);
const pass=new THREE.Group();pass.name='KitchenReferenceMatch30';kitchen.add(pass);

const P={
 cream:0xf4e7d4, creamHi:0xfff4e4, creamShade:0xe3ccb0,
 wood:0xc89261, woodLight:0xd9aa78, woodDark:0x79513a,
 brass:0xa97842, peach:0xdd9b91, peachLight:0xf0c7bb,
 sage:0x71805f, dark:0x342d29, tile:0xf7eee3, grout:0xd6c4b3
};
const mat=(color,rough=.65,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
const cream=mat(P.cream,.58),creamHi=mat(P.creamHi,.48),creamShade=mat(P.creamShade,.7);
const wood=mat(P.wood,.54),woodLight=mat(P.woodLight,.57),woodDark=mat(P.woodDark,.66);
const brass=mat(P.brass,.34,.62),peach=mat(P.peach,.84),peachLight=mat(P.peachLight,.9);
const sage=mat(P.sage,.86),dark=mat(P.dark,.36,.34),white=mat(0xfffbf3,.5);
const terracotta=mat(0xbd775c,.8),basketMat=mat(0xb98a5d,.9);
const glass=new THREE.MeshPhysicalMaterial({color:0xe6eee7,roughness:.12,transparent:true,opacity:.34,transmission:.18,depthWrite:false});

function canvasTexture(w,h,draw,rx=1,ry=1){
 const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const ginghamTex=canvasTexture(192,192,(x,w,h)=>{
 x.fillStyle='#fff1e6';x.fillRect(0,0,w,h);
 const s=96;x.fillStyle='rgba(220,145,133,.43)';
 for(const v of[0,s]){x.fillRect(v,0,34,h);x.fillRect(0,v,w,34)}
 x.fillStyle='rgba(197,112,105,.12)';for(const xx of[0,s])for(const yy of[0,s])x.fillRect(xx,yy,34,34);
 x.strokeStyle='rgba(255,255,255,.20)';x.lineWidth=1;for(let i=0;i<w;i+=8){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}
},4,3);
const gingham=new THREE.MeshStandardMaterial({map:ginghamTex,color:0xfff7f1,roughness:.9});
const floralTex=canvasTexture(512,256,(x,w,h)=>{
 x.fillStyle='#f8eee2';x.fillRect(0,0,w,h);x.strokeStyle='rgba(196,167,143,.18)';x.lineWidth=1;
 for(let xx=0;xx<=w;xx+=64){x.beginPath();x.moveTo(xx,0);x.lineTo(xx,h);x.stroke()}
 for(let yy=0;yy<=h;yy+=64){x.beginPath();x.moveTo(0,yy);x.lineTo(w,yy);x.stroke()}
 for(let yy=32;yy<h;yy+=64)for(let xx=32;xx<w;xx+=64){
  x.fillStyle='rgba(215,135,124,.65)';for(const [dx,dy,a] of[[0,-5,0],[-5,0,Math.PI/2],[5,0,Math.PI/2],[0,5,0]]){x.beginPath();x.ellipse(xx+dx,yy+dy,3.5,5.4,a,0,Math.PI*2);x.fill()}
  x.fillStyle='#bf8a4f';x.beginPath();x.arc(xx,yy,2.1,0,Math.PI*2);x.fill();
 }
},4.15,1.58);
const floral=new THREE.MeshStandardMaterial({map:floralTex,color:0xfff8f0,roughness:.92});
const floorTex=canvasTexture(768,768,(x,w,h)=>{
 x.fillStyle='#f8efe5';x.fillRect(0,0,w,h);
 const s=112; x.strokeStyle='rgba(190,165,143,.22)';x.lineWidth=2;
 for(let yy=-s;yy<h+s;yy+=s)for(let xx=-s;xx<w+s;xx+=s){
  const cx=xx+s/2,cy=yy+s/2,r=45;
  x.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;const px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)}x.closePath();x.stroke();
  x.save();x.translate(xx+s,yy+s);x.rotate(Math.PI/4);x.fillStyle='#dda596';x.fillRect(-8,-8,16,16);x.restore();
 }
},3.15,2.15);
const floorMat=new THREE.MeshStandardMaterial({map:floorTex,color:0xfff9f2,roughness:.86});
const rugTex=canvasTexture(384,256,(x,w,h)=>{
 x.fillStyle='#f6e2d8';x.fillRect(0,0,w,h);const sw=38,sh=34;
 for(let yy=0;yy<h;yy+=sh)for(let xx=0;xx<w;xx+=sw){x.fillStyle=((xx/sw+yy/sh)%2)?'#dda096':'#efc7bd';x.fillRect(xx,yy,sw,sh);x.fillStyle='rgba(255,255,255,.24)';x.fillRect(xx,yy,sw,3)}
},6,3);
const rugMat=new THREE.MeshStandardMaterial({map:rugTex,color:0xfff1eb,roughness:.96});

function clear(root){if(!root)return;while(root.children.length)root.remove(root.children[root.children.length-1])}
function setHome(root){if(!root)return;root.userData.homePos=root.position.clone();root.userData.homeRot=root.rotation.clone()}

// --- Palette normalization: remove orange/white cast without replacing interactive roots. ---
const render29=window.KITCHEN_3D_RENDER_29;
const ref27=window.KITCHEN_3D_REFERENCE_27;
const refRoot=ref27?.group;
if(refRoot){
 refRoot.traverse(o=>{
  if(!o.material)return;const ms=Array.isArray(o.material)?o.material:[o.material];
  ms.forEach(m=>{
   if(!m?.color)return;const h=m.color.getHex();
   if(h===0xc7864e||h===0xc88952||h===0xc98a55||h===0xcf925f)m.color.setHex(P.wood);
   else if(h===0xd9a064||h===0xe2ad78)m.color.setHex(P.woodLight);
   else if(h===0xf6e8d3||h===0xfff7eb)m.color.setHex(P.cream);
   else if(h===0xe5cfb5||h===0xf2e3d0)m.color.setHex(P.creamShade);
   else if(h===0xaa7139||h===0xb98345)m.color.setHex(P.brass);
   m.needsUpdate=true;
  });
 });
}

// Replace the visible floor/backsplash with target-matched skins. These are non-interactive visual layers.
const floorSkin=new THREE.Mesh(new THREE.PlaneGeometry(15.68,10.96),floorMat);floorSkin.rotation.x=-Math.PI/2;floorSkin.position.set(0,.084,0);floorSkin.receiveShadow=true;pass.add(floorSkin);
const backSplash=bx(13.08,2.25,.026,floral);backSplash.position.set(.08,2.24,-5.465);backSplash.receiveShadow=true;pass.add(backSplash);

// --- Hero appliance rebuilds ---
const sink=assetMap.get('Farmhouse Sink');
if(sink){
 clear(sink);sink.visible=true;sink.position.set(-3.42,0,-5.01);sink.rotation.set(0,0,0);
 const cab=rb(1.86,1.03,1.02,cream,.045);cab.position.y=.515;sink.add(cab);
 for(const xx of[-.46,.46]){const door=rb(.76,.72,.042,creamShade,.024);door.position.set(xx,.47,.525);sink.add(door);const inner=rb(.59,.55,.022,cream,.018);inner.position.set(xx,.47,.556);sink.add(inner)}
 const apron=rb(1.58,.62,.17,creamHi,.075);apron.position.set(0,.8,.59);sink.add(apron);
 const bowl=rb(1.44,.105,.76,white,.05);bowl.position.set(0,1.145,0);sink.add(bowl);
 const stem=cyl(.052,.56,brass,20);stem.position.set(.48,1.47,-.23);sink.add(stem);
 const neck=torus(.29,.043,brass,Math.PI);neck.rotation.x=Math.PI/2;neck.rotation.z=Math.PI/2;neck.position.set(.48,1.66,.01);sink.add(neck);
 for(const dx of[-.23,.23]){const h=rb(.15,.036,.045,brass,.012);h.position.set(.48+dx,1.4,-.19);sink.add(h)}
 const towel=rb(.4,.6,.024,gingham,.012);towel.position.set(0,.67,.69);sink.add(towel);setHome(sink);
}

const stove=assetMap.get('Large Stove Oven');
if(stove){
 clear(stove);stove.visible=true;stove.position.set(.78,0,-5.0);stove.rotation.set(0,0,0);
 const body=rb(2.1,1.34,1.02,cream,.055);body.position.y=.67;stove.add(body);
 const toe=rb(1.86,.12,.82,creamShade,.03);toe.position.set(0,.08,.05);stove.add(toe);
 const ovenFrame=rb(1.68,.64,.055,brass,.03);ovenFrame.position.set(0,.47,.535);stove.add(ovenFrame);
 const ovenGlass=rb(1.52,.49,.034,new THREE.MeshStandardMaterial({color:0x56463f,roughness:.28,metalness:.18}),.025);ovenGlass.position.set(0,.47,.575);stove.add(ovenGlass);
 const handle=rb(1.55,.065,.09,brass,.02);handle.position.set(0,.88,.62);stove.add(handle);
 const rail=rb(1.84,.22,.06,creamShade,.022);rail.position.set(0,1.105,.55);stove.add(rail);
 for(let i=0;i<6;i++){const k=cyl(.075,.08,brass,20);k.rotation.x=Math.PI/2;k.position.set(-.66+i*.265,1.11,.61);stove.add(k);const cap=cyl(.035,.084,dark,16);cap.rotation.x=Math.PI/2;cap.position.set(-.66+i*.265,1.11,.655);stove.add(cap)}
 const top=rb(2.02,.09,.94,dark,.024);top.position.y=1.39;stove.add(top);
 for(const xx of[-.55,.55])for(const zz of[-.25,.25]){const ring=torus(.19,.025,brass);ring.rotation.x=Math.PI/2;ring.position.set(xx,1.445,zz);stove.add(ring);for(let i=0;i<4;i++){const grate=rb(.4,.025,.028,dark,.007);grate.position.set(xx,1.46,zz);grate.rotation.y=i*Math.PI/4;stove.add(grate)}}
 const pot=cyl(.3,.27,peach,28);pot.position.set(-.42,1.61,-.05);stove.add(pot);const lid=cyl(.25,.04,creamHi,24);lid.position.set(-.42,1.77,-.05);stove.add(lid);const knob=cyl(.045,.08,brass,16);knob.position.set(-.42,1.83,-.05);stove.add(knob);setHome(stove);
}

const hood=assetMap.get('Farmhouse Range Hood 2.2');
if(hood){
 clear(hood);hood.visible=true;hood.position.set(.78,0,-5.23);hood.rotation.set(0,0,0);
 const skirt=new THREE.Mesh(new THREE.CylinderGeometry(1.30,.72,1.52,4),cream);skirt.rotation.y=Math.PI/4;skirt.scale.z=.61;skirt.position.y=3.61;hood.add(skirt);
 const lower=rb(2.5,.18,.98,wood,.028);lower.position.y=2.85;hood.add(lower);
 const brassLip=rb(2.22,.06,.84,brass,.014);brassLip.position.y=2.75;hood.add(brassLip);
 const chimney=rb(1.28,1.42,.65,creamShade,.035);chimney.position.y=4.7;hood.add(chimney);
 const cap=rb(1.5,.12,.76,creamHi,.025);cap.position.y=5.39;hood.add(cap);
 const light=new THREE.PointLight(0xffc98d,.52,2.8,2);light.position.set(0,2.66,.32);hood.add(light);setHome(hood);
}

const fridge=assetMap.get('Retro Fridge');
if(fridge){
 clear(fridge);fridge.visible=true;fridge.position.set(6.05,0,-4.95);fridge.rotation.set(0,0,0);
 const body=rb(1.88,3.76,1.16,cream,.21);body.position.y=1.88;fridge.add(body);
 const topDoor=rb(1.70,2.08,.075,creamHi,.16);topDoor.position.set(0,2.58,.605);fridge.add(topDoor);
 const lowDoor=rb(1.70,1.22,.075,cream,.15);lowDoor.position.set(0,.82,.605);fridge.add(lowDoor);
 const seam=rb(1.62,.046,.08,brass,.015);seam.position.set(0,1.55,.65);fridge.add(seam);
 for(const [yy,hh] of[[2.58,1.02],[.83,.72]]){const h=rb(.072,hh,.09,brass,.023);h.position.set(-.66,yy,.705);fridge.add(h)}
 const notes=[[-.16,2.65,.25,.28,peach],[.28,2.36,.27,.22,creamShade],[-.18,2.14,.22,.27,woodLight],[.3,2.82,.18,.19,peachLight]];
 notes.forEach(([x,y,w,h,m],i)=>{const n=rb(w,h,.018,m,.012);n.position.set(x,y,.685);n.rotation.z=(i-1.5)*.035;fridge.add(n);const pin=sphere(.035,brass,12);pin.position.set(x,y+h*.33,.715);fridge.add(pin)});
 for(const x of[-.57,.57]){const foot=cyl(.075,.1,dark,14);foot.position.set(x,.04,.28);fridge.add(foot)}setHome(fridge);
}

// --- Peninsula: slimmer and less dominant, with the same selectable/usable root. ---
const pen=assetMap.get('Reference L Peninsula 2.7');
if(pen){
 pen.scale.set(.865,1,.89);pen.position.set(-.08,0,-.08);setHome(pen);
}
const s1=assetMap.get('Gingham Stool 01'),s2=assetMap.get('Gingham Stool 02');
if(s1){s1.position.set(-3.78,0,3.34);s1.scale.set(.95,.95,.95);setHome(s1)}
if(s2){s2.position.set(-2.15,0,3.34);s2.scale.set(.95,.95,.95);setHome(s2)}

// --- Runner rug, longer and closer to reference. ---
const oldRug=assetMap.get('Reference Gingham Rug 2.7');if(oldRug)oldRug.visible=false;
const runner=rb(4.45,.035,1.58,rugMat,.026);runner.position.set(.72,.105,-2.72);runner.receiveShadow=true;pass.add(runner);
for(let i=0;i<25;i++)for(const side of[-1,1]){const f=bx(.022,.012,.15,creamShade);f.position.set(-1.35+i*.18,.104,-2.72+side*.84);pass.add(f)}

// --- Reference decor density. ---
function leafCluster(root,x,y,z,s=.12,count=8){for(let i=0;i<count;i++){const a=i/count*Math.PI*2;const leaf=sphere(s*(.7+(i%3)*.08),sage,10);leaf.scale.set(.62,1.25,.48);leaf.position.set(x+Math.cos(a)*s*1.05,y+(i%2)*s*.38,z+Math.sin(a)*s*.78);leaf.rotation.z=Math.cos(a)*.55;root.add(leaf)}}
function plant(root,x,y,z,s=.13,trail=false){const pot=cyl(s,s*1.3,creamShade,18);pot.position.set(x,y+s*.65,z);root.add(pot);leafCluster(root,x,y+s*1.95,z,s,8);if(trail)for(let i=0;i<8;i++){const l=sphere(s*.48,sage,10);l.scale.set(.55,1.2,.42);l.position.set(x+s*.65,y+s*.8-i*s*.62,z);l.rotation.z=.35;root.add(l)}}
function canister(root,x,y,z,s=.11){const b=cyl(s,.25,creamHi,20);b.position.set(x,y+.125,z);root.add(b);const rim=cyl(s*1.02,.025,brass,20);rim.position.set(x,y+.26,z);root.add(rim);const flower=sphere(s*.22,peach,10);flower.scale.set(1,.5,.35);flower.position.set(x,y+.13,z+s*1.01);root.add(flower)}
function frame(root,x,y,z,w=.48,h=.62){const bg=rb(w,h,.035,wood,.018);bg.position.set(x,y,z);root.add(bg);const paper=rb(w*.84,h*.84,.02,creamHi,.012);paper.position.set(x,y,z+.03);root.add(paper);const stem=bx(.025,h*.45,.012,sage);stem.position.set(x,y-.02,z+.047);stem.rotation.z=-.18;root.add(stem);for(const [dx,dy] of[[-.11,.1],[.08,.04],[-.05,-.09]]){const fl=sphere(.055,peach,10);fl.scale.set(1,.7,.35);fl.position.set(x+dx,y+dy,z+.055);root.add(fl)}}
function cuttingBoard(root,x,y,z,w=.38,h=.72){const b=rb(w,h,.055,woodLight,.05);b.position.set(x,y,z);root.add(b);const hole=new THREE.Mesh(new THREE.TorusGeometry(.045,.012,8,14),brass);hole.position.set(x,y+h*.36,z+.035);root.add(hole)}
function bottle(root,x,y,z,c=woodDark,h=.3){const b=cyl(.045,h,c,14);b.position.set(x,y+h/2,z);root.add(b);const neck=cyl(.027,.09,brass,12);neck.position.set(x,y+h+.035,z);root.add(neck)}
function flowers(root,x,y,z){const vase=cyl(.13,.31,creamHi,20);vase.position.set(x,y+.155,z);root.add(vase);for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const stem=bx(.012,.34,.012,sage);stem.position.set(x+Math.cos(a)*.1,y+.46,z+Math.sin(a)*.08);root.add(stem);const f=sphere(.055,i%3===0?peach:creamHi,10);f.position.set(stem.position.x,y+.66+(i%2)*.035,stem.position.z);root.add(f)}}
function basket(root,x,y,z,w=.62){const b=rb(w,.28,.38,basketMat,.045);b.position.set(x,y+.14,z);root.add(b);for(let i=0;i<4;i++){const slat=bx(.025,.25,.39,woodDark);slat.position.set(x-w*.3+i*w*.2,y+.14,z);slat.material=slat.material.clone();slat.material.transparent=true;slat.material.opacity=.34;root.add(slat)}}

// left and right shelf clusters
plant(pass,-6.25,4.18,-5.03,.13,true);frame(pass,-6.2,4.82,-5.18,.5,.63);
canister(pass,-5.95,3.53,-5.04,.105);canister(pass,-5.62,3.53,-5.04,.12);canister(pass,-5.25,3.53,-5.04,.095);
plant(pass,3.65,4.24,-5.04,.12,false);canister(pass,3.44,3.53,-5.03,.11);canister(pass,3.79,3.53,-5.03,.1);canister(pass,4.14,3.53,-5.03,.12);
plant(pass,5.95,3.74,-4.98,.16,true);basket(pass,6.05,3.68,-4.98,.7);

// counter styling around sink/stove
flowers(pass,-4.58,1.22,-4.63);frame(pass,-1.15,1.66,-5.18,.5,.66);
cuttingBoard(pass,-.55,1.55,-5.32,.35,.7);cuttingBoard(pass,-.2,1.49,-5.34,.32,.59);
for(let i=0;i<4;i++)bottle(pass,-.05+i*.15,1.2,-4.66,i%2?terracotta:woodDark,.26+(i%2)*.07);
const utensilCrock=cyl(.15,.34,creamHi,20);utensilCrock.position.set(1.86,1.36,-4.7);pass.add(utensilCrock);
for(let i=0;i<6;i++){const spoon=rb(.035,.48,.035,i%2?wood:brass,.012);spoon.position.set(1.72+i*.055,1.72,-4.7);spoon.rotation.z=(i-2.5)*.08;pass.add(spoon)}

// brass utensil rail and gingham mitts
const rail=rb(2.25,.042,.042,brass,.01);rail.position.set(.82,2.48,-5.4);pass.add(rail);
for(let i=0;i<6;i++){const h=rb(.026,.42,.026,i%2?woodDark:brass,.008);h.position.set(-.22+i*.41,2.23,-5.36);pass.add(h);const head=cyl(.07,.035,i%2?woodLight:brass,12);head.position.set(-.22+i*.41,2.0,-5.36);pass.add(head)}
for(const x of[1.88,2.18]){const mitt=rb(.19,.36,.028,gingham,.035);mitt.position.set(x,2.15,-5.35);mitt.rotation.z=(x-2.03)*.5;pass.add(mitt)}

// toaster to the right of stove
const toaster=rb(.62,.36,.4,cream,.11);toaster.position.set(4.86,1.38,-4.7);pass.add(toaster);
for(const x of[4.72,5.0]){const slot=rb(.2,.016,.22,dark,.018);slot.position.set(x,1.565,-4.7);pass.add(slot)}
const toasterLever=rb(.04,.16,.04,brass,.012);toasterLever.position.set(5.18,1.39,-4.7);pass.add(toasterLever);

// peninsula top: flowers, fruit, mug and side basket/towel read strongly in overview.
flowers(pass,-3.08,1.23,2.04);
const fruitBowl=new THREE.Mesh(new THREE.SphereGeometry(.29,24,12,0,Math.PI*2,0,Math.PI/2),basketMat);fruitBowl.rotation.x=Math.PI;fruitBowl.scale.y=.42;fruitBowl.position.set(-2.38,1.38,2.05);pass.add(fruitBowl);
for(let i=0;i<8;i++){const f=sphere(.085,i%3===0?peach:mat(0xd99351,.72),12);f.position.set(-2.38+(i%3-1)*.11,1.47+Math.floor(i/3)*.075,2.05+(i%2-.5)*.11);pass.add(f)}
const mug=rb(.18,.2,.18,creamHi,.045);mug.position.set(-.92,1.36,2.08);pass.add(mug);const mh=torus(.1,.02,creamHi,Math.PI*1.6);mh.rotation.y=Math.PI/2;mh.position.set(-.8,1.4,2.08);pass.add(mh);

// soft window-grid shadows: visual only, placed just above floor/counters.
const shadowMat=new THREE.MeshBasicMaterial({color:0x6d4b37,transparent:true,opacity:.055,depthWrite:false});
function shadowBar(x,z,w,d,rot=.18){const q=new THREE.Mesh(new THREE.PlaneGeometry(w,d),shadowMat);q.rotation.x=-Math.PI/2;q.rotation.z=rot;q.position.set(x,.112,z);pass.add(q)}
for(let i=0;i<5;i++)shadowBar(-4.7+i*.78,.35,4.5,.055,.16);
for(let i=0;i<5;i++)shadowBar(-3.25,.2+i*.72,.06,4.2,.16);

// Additional contact grounding.
const contactMat=new THREE.MeshBasicMaterial({color:0x563a2c,transparent:true,opacity:.07,depthWrite:false});
function contact(x,z,sx,sz){const q=new THREE.Mesh(new THREE.CircleGeometry(1,36),contactMat);q.rotation.x=-Math.PI/2;q.scale.set(sx,sz,1);q.position.set(x,.109,z);pass.add(q)}
contact(6.05,-4.94,1.05,.65);contact(.78,-5.0,1.25,.58);contact(-3.42,-5.0,1.02,.55);contact(-2.65,2.08,2.9,.64);contact(-3.78,3.34,.42,.28);contact(-2.15,3.34,.42,.28);

// --- Lighting: one clear warm daylight direction with controlled highlights. ---
scene.traverse(o=>{
 if(o.isHemisphereLight)o.intensity=.62;
 else if(o.isDirectionalLight)o.intensity=o===sun?1.42:Math.min(o.intensity,.2);
 else if(o.isSpotLight)o.intensity=Math.min(o.intensity,.72);
 else if(o.isPointLight)o.intensity=Math.min(o.intensity,.34);
});
if(sun){sun.color.set(0xffc88f);sun.intensity=1.42;sun.position.set(-10.8,15.2,8.9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.00018}
if(bounce){bounce.color.set(0xffc197);bounce.intensity=.27;bounce.position.set(-5.2,4.6,3.6)}
if(taskLight){taskLight.color.set(0xffd5af);taskLight.intensity=.24}
if(render29?.group)render29.group.visible=false;
const key=new THREE.DirectionalLight(0xffd3a0,1.05);key.position.set(-8.8,12.8,9.5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-14;key.shadow.camera.right=14;key.shadow.camera.top=13;key.shadow.camera.bottom=-13;pass.add(key);
const soft=new THREE.DirectionalLight(0xfff3e4,.18);soft.position.set(9,8,10);pass.add(soft);
const windowWarm=new THREE.SpotLight(0xffc789,.68,18,.66,.82,1.5);windowWarm.position.set(-4.1,7.2,-2.0);windowWarm.target.position.set(-.2,.2,.5);pass.add(windowWarm,windowWarm.target);

scene.background.set(0xe5d1c0);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.72;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.domElement.style.filter='saturate(1.025) contrast(1.105) brightness(.965)';

// High/far 3/4 composition. Older View handlers run first; ours deliberately wins after them.
const REF30={pos:new THREE.Vector3(13.9,11.25,16.55),target:new THREE.Vector3(-.75,1.2,-1.0),fov:25.0};
function referenceView30(){
 camera.position.copy(REF30.pos);camera.fov=REF30.fov;camera.updateProjectionMatrix();orbit.target.copy(REF30.target);orbit.update();transform.detach();
}
function grade30(){renderer.toneMappingExposure=.72;renderer.domElement.style.filter='saturate(1.025) contrast(1.105) brightness(.965)';key.intensity=1.05;soft.intensity=.18;windowWarm.intensity=.68}
referenceView30();
orbit.minDistance=10.5;orbit.maxDistance=24;orbit.minPolarAngle=.48;orbit.maxPolarAngle=1.2;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(()=>{referenceView30();grade30()},95));
document.getElementById('assembledBtn')?.addEventListener('click',()=>setTimeout(()=>{referenceView30();grade30()},110));

// Replace older visual badges only; gameplay controls are untouched.
['.k27-fidelity-badge','.k28-color-badge','.k29-render-badge'].forEach(s=>document.querySelector(s)?.remove());
const badge=document.createElement('div');badge.className='k29-render-badge k30-render-badge';badge.textContent='Kitchen 3.0 · Reference Match';document.querySelector('.workarea')?.appendChild(badge);

window.KITCHEN_3D_REFERENCE_30={version:'3.0',group:pass,palette:P,referenceView:referenceView30,grade:grade30};
