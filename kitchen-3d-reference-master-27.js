const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.7 internal API unavailable');
const {THREE,camera,renderer,orbit,transform,kitchen,assets,assetMap,register,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight,renderAssetList}=api;
document.body.classList.add('k27-ready');

// 2.7 is a coherent rebuild pass. Earlier visual overlays are hidden so they no longer stack.
['KitchenHighFidelity21','KitchenVisual22','KitchenReferenceFidelity23','KitchenPremiumCozy24','KitchenFinish25','KitchenStrictLShape26'].forEach(n=>{const g=kitchen.getObjectByName(n);if(g)g.visible=false});
['.k21-reference','.k23-fidelity-badge','.k24-fidelity-badge','.k25-fidelity-badge','.k26-fidelity-badge'].forEach(s=>document.querySelector(s)?.remove());
function retire(id){const a=assetMap.get(id);if(!a)return;a.visible=false;const i=assets.indexOf(a);if(i>=0)assets.splice(i,1);assetMap.delete(id)}
function clearRoot(root){if(!root)return;while(root.children.length)root.remove(root.children[root.children.length-1])}
['Kitchen Peninsula','L-Shape Kitchen Counter 2.6','Statement Range Hood','Pink Gingham Runner','Side Base 1','Side Base 2','Side Base 3','Side Base 4','Open Shelf 1','Open Shelf 2','Open Shelf 3','Open Shelf 4','Open Shelf 5','Open Shelf 6','Plant Window','Plant Shelf Left','Plant Fridge Top','Plant Corner'].forEach(retire);

const master=new THREE.Group();master.name='KitchenReferenceMaster27';kitchen.add(master);

// Palette sampled visually from the approved multi-view board: warm cream, honey wood, blush gingham, muted brass.
const cream=new THREE.MeshStandardMaterial({color:0xfff7eb,roughness:.58});
const cream2=new THREE.MeshStandardMaterial({color:0xf2e3d0,roughness:.68});
const ivory=new THREE.MeshStandardMaterial({color:0xfffcf4,roughness:.42});
const wallMat=new THREE.MeshStandardMaterial({color:0xf6e9dc,roughness:.9});
const wood=new THREE.MeshStandardMaterial({color:0xc98a55,roughness:.5});
const woodLight=new THREE.MeshStandardMaterial({color:0xe2ad78,roughness:.55});
const woodDark=new THREE.MeshStandardMaterial({color:0x8a5738,roughness:.62});
const brass=new THREE.MeshStandardMaterial({color:0xb98345,roughness:.25,metalness:.78});
const pink=new THREE.MeshStandardMaterial({color:0xe8a39b,roughness:.78});
const dark=new THREE.MeshStandardMaterial({color:0x3f352f,roughness:.36,metalness:.34});
const green=new THREE.MeshStandardMaterial({color:0x71805b,roughness:.82});
const terracotta=new THREE.MeshStandardMaterial({color:0xc87859,roughness:.75});
const glass=new THREE.MeshPhysicalMaterial({color:0xdce9e3,roughness:.08,transparent:true,opacity:.34,transmission:.24,depthWrite:false});

function makeWoodTex(){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle='#cf925f';x.fillRect(0,0,512,256);for(let i=0;i<90;i++){const y=Math.random()*256;x.strokeStyle=`rgba(103,59,34,${.025+Math.random()*.06})`;x.lineWidth=.45+Math.random();x.beginPath();x.moveTo(0,y);let yy=y;for(let xx=0;xx<=512;xx+=32){yy+=Math.sin((xx+i)*.04)*.8+(Math.random()-.5)*1.1;x.lineTo(xx,yy)}x.stroke()}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.6,1.4);t.colorSpace=THREE.SRGBColorSpace;return t}
const woodTex=makeWoodTex();[wood,woodLight].forEach((m,i)=>{m.map=woodTex;m.bumpMap=woodTex;m.bumpScale=i?.014:.02;m.needsUpdate=true});

function ginghamMat27(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fff5eb';x.fillRect(0,0,128,128);x.fillStyle='rgba(222,139,132,.42)';for(const v of[0,64]){x.fillRect(v,0,30,128);x.fillRect(0,v,128,30)}x.fillStyle='rgba(215,126,120,.18)';for(const xx of[0,64])for(const yy of[0,64])x.fillRect(xx,yy,30,30);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4,3);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.86})}
const gingham=ginghamMat27();

function tileMat27(){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#fffaf1';x.fillRect(0,0,512,512);const s=96;x.strokeStyle='rgba(205,176,151,.18)';x.lineWidth=2;for(let yy=0;yy<512;yy+=s)for(let xx=0;xx<512;xx+=s){x.strokeRect(xx+3,yy+3,s-6,s-6);x.save();x.translate(xx+s,yy+s);x.rotate(Math.PI/4);x.fillStyle='rgba(224,155,145,.58)';x.fillRect(-9,-9,18,18);x.restore()}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3.2,2.25);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.78})}
function floralTile27(){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle='#fff9f1';x.fillRect(0,0,512,256);x.strokeStyle='rgba(211,183,158,.16)';x.lineWidth=1;for(let xx=0;xx<=512;xx+=64){x.beginPath();x.moveTo(xx,0);x.lineTo(xx,256);x.stroke()}for(let yy=0;yy<=256;yy+=64){x.beginPath();x.moveTo(0,yy);x.lineTo(512,yy);x.stroke()}for(let yy=32;yy<256;yy+=64)for(let xx=32;xx<512;xx+=64){x.fillStyle='rgba(226,146,139,.52)';for(const [dx,dy] of[[0,-4],[-4,0],[4,0],[0,4]]){x.beginPath();x.ellipse(xx+dx,yy+dy,3.6,5.2,0,0,Math.PI*2);x.fill()}x.fillStyle='#e7b16f';x.beginPath();x.arc(xx,yy,2.2,0,Math.PI*2);x.fill()}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4.1,1.55);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.88})}

// Reset the visual shell. This also hides the old left-wall window, which was the biggest layout mismatch.
const leftCover=bx(.12,5.4,11.05,wallMat);leftCover.position.set(-7.81,2.72,0);master.add(leftCover);
const backCover=bx(15.7,5.4,.1,wallMat);backCover.position.set(0,2.72,-5.63);master.add(backCover);
const crownB=rb(15.75,.15,.18,woodLight,.025);crownB.position.set(0,5.48,-5.51);master.add(crownB);
const crownL=rb(.18,.15,10.95,woodLight,.025);crownL.position.set(-7.7,5.48,0);master.add(crownL);
const floorSkin=new THREE.Mesh(new THREE.PlaneGeometry(15.7,11.0),tileMat27());floorSkin.rotation.x=-Math.PI/2;floorSkin.position.set(0,.068,0);floorSkin.receiveShadow=true;master.add(floorSkin);
const backsplash=bx(13.1,2.28,.035,floralTile27());backsplash.position.set(.1,2.25,-5.50);master.add(backsplash);

// Approved reference window: centered on the back run, directly over the sink.
const win=new THREE.Group();win.position.set(-3.35,0,-5.42);master.add(win);
const sky=new THREE.Mesh(new THREE.PlaneGeometry(3.75,3.05),new THREE.MeshBasicMaterial({color:0xdfe7c2}));sky.position.set(0,3.28,.012);win.add(sky);
for(let i=0;i<14;i++){const leaf=sphere(.13+Math.random()*.15,green,10);leaf.scale.set(.9,1.1,.5);leaf.position.set(-1.7+Math.random()*3.4,1.9+Math.random()*2.55,.05);leaf.material=leaf.material.clone();leaf.material.transparent=true;leaf.material.opacity=.13+Math.random()*.12;win.add(leaf)}
const outerTop=rb(4.08,.14,.18,woodLight,.025);outerTop.position.set(0,4.86,.11);win.add(outerTop);const outerBot=outerTop.clone();outerBot.position.y=1.69;win.add(outerBot);
for(const xx of[-1.95,1.95]){const side=rb(.14,3.25,.18,woodLight,.025);side.position.set(xx,3.27,.11);win.add(side)}
for(const xx of[-1.25,-.42,.42,1.25]){const mull=rb(.055,3.02,.07,cream,.015);mull.position.set(xx,3.28,.19);win.add(mull)}
for(const yy of[2.45,3.28,4.11]){const mull=rb(3.72,.055,.07,cream,.015);mull.position.set(0,yy,.19);win.add(mull)}
const sill=rb(4.05,.13,.34,woodLight,.03);sill.position.set(0,1.67,.24);win.add(sill);
const rod=rb(4.0,.045,.045,brass,.012);rod.position.set(0,4.96,.24);win.add(rod);
for(let i=0;i<14;i++){const fold=rb(.22,.48,.12,gingham,.04);fold.position.set(-1.72+i*.265,4.68,.27);fold.rotation.z=(i%2?1:-1)*.02;win.add(fold)}
for(let i=0;i<13;i++){const scallop=sphere(.12,gingham,12);scallop.scale.set(1,.55,.48);scallop.position.set(-1.58+i*.265,4.43,.29);win.add(scallop)}

// Cabinet rebuild helpers: use one coherent style instead of stacked passes.
function rebuildBase(id,x,w=1.18,drawers=false){const r=assetMap.get(id);if(!r)return;clearRoot(r);r.visible=true;r.position.set(x,0,-5.05);r.rotation.set(0,0,0);const body=rb(w,1.03,.9,cream,.045);body.position.y=.515;r.add(body);if(drawers){for(let i=0;i<3;i++){const d=rb(w*.84,.23,.045,cream2,.018);d.position.set(0,.77-i*.27,.475);r.add(d);const h=rb(.32,.04,.06,brass,.016);h.position.set(0,.77-i*.27,.515);r.add(h)}}else{const o=rb(w*.82,.72,.045,cream2,.022);o.position.set(0,.52,.475);r.add(o);const inn=rb(w*.66,.56,.028,cream,.018);inn.position.set(0,.52,.506);r.add(inn);const h=rb(.28,.04,.06,brass,.016);h.position.set(0,.78,.535);r.add(h)}const top=rb(w,.14,1.02,wood,.03);top.position.y=1.1;r.add(top);r.userData.homePos=r.position.clone();r.userData.homeRot=r.rotation.clone()}
rebuildBase('Back Base 1',-5.72,1.18,false);rebuildBase('Back Base 2',-4.5,1.18,false);rebuildBase('Back Base 3',-1.85,1.18,false);
const unused=assetMap.get('Back Base 4');if(unused){unused.visible=false;const i=assets.indexOf(unused);if(i>=0)assets.splice(i,1);assetMap.delete('Back Base 4')}
rebuildBase('Drawer Cabinet 01',2.38,1.18,true);rebuildBase('Back Base 05',3.62,1.18,false);rebuildBase('Drawer Cabinet 02',4.86,1.18,true);

// Continuous countertop skins make the back run read as one crafted kitchen.
for(const [x,w] of[[-5.12,2.42],[-1.82,1.25],[3.62,3.78]]){const t=rb(w,.095,1.03,wood,.032);t.position.set(x,1.18,-5.05);master.add(t)}

// Sink is moved from the old left wall to the approved back-window position.
const sink=assetMap.get('Farmhouse Sink');if(sink){clearRoot(sink);sink.visible=true;sink.position.set(-3.3,0,-5.02);sink.rotation.set(0,0,0);const cab=rb(1.72,1.02,1.02,cream,.05);cab.position.y=.51;sink.add(cab);for(const xx of[-.43,.43]){const p=rb(.7,.7,.04,cream2,.025);p.position.set(xx,.47,.52);sink.add(p);const q=rb(.54,.54,.026,cream,.02);q.position.set(xx,.47,.55);sink.add(q);const k=cyl(.035,.06,brass,14);k.rotation.x=Math.PI/2;k.position.set(xx+(xx<0?.18:-.18),.72,.59);sink.add(k)}const apron=rb(1.48,.61,.16,ivory,.08);apron.position.set(0,.78,.58);sink.add(apron);const basin=rb(1.36,.1,.74,ivory,.055);basin.position.set(0,1.14,0);sink.add(basin);const stem=cyl(.052,.61,brass,20);stem.position.set(.5,1.49,-.21);sink.add(stem);const neck=torus(.28,.043,brass,Math.PI);neck.rotation.x=Math.PI/2;neck.rotation.z=Math.PI/2;neck.position.set(.5,1.68,.0);sink.add(neck);for(const dx of[-.24,.24]){const h=rb(.16,.035,.045,brass,.012);h.position.set(.5+dx,1.42,-.18);sink.add(h)}const towel=rb(.38,.56,.025,gingham,.012);towel.position.set(0,.68,.67);sink.add(towel);sink.userData.homePos=sink.position.clone();sink.userData.homeRot=sink.rotation.clone()}

// Large cream range, slightly right of center, matching the board.
const stove=assetMap.get('Large Stove Oven');if(stove){clearRoot(stove);stove.visible=true;stove.position.set(.72,0,-5.02);stove.rotation.set(0,0,0);const body=rb(2.05,1.3,1.0,cream,.06);body.position.y=.65;stove.add(body);const oven=rb(1.62,.58,.045,dark,.028);oven.position.set(0,.46,.53);stove.add(oven);const inner=rb(1.42,.4,.025,new THREE.MeshStandardMaterial({color:0x5b4940,emissive:0xffa05f,emissiveIntensity:.08,roughness:.3}),.02);inner.position.set(0,.46,.558);stove.add(inner);const handle=rb(1.48,.055,.08,brass,.018);handle.position.set(0,.86,.59);stove.add(handle);for(let i=0;i<6;i++){const knob=cyl(.07,.075,brass,18);knob.rotation.x=Math.PI/2;knob.position.set(-.64+i*.255,1.1,.58);stove.add(knob)}const top=rb(1.98,.09,.92,dark,.022);top.position.y=1.35;stove.add(top);for(const xx of[-.53,.53])for(const zz of[-.24,.24]){const ring=torus(.18,.024,dark);ring.rotation.x=Math.PI/2;ring.position.set(xx,1.405,zz);stove.add(ring)}const pot=cyl(.28,.25,pink,26);pot.position.set(-.42,1.56,-.08);stove.add(pot);const lid=cyl(.23,.04,brass,22);lid.position.set(-.42,1.71,-.08);stove.add(lid);stove.userData.homePos=stove.position.clone();stove.userData.homeRot=stove.rotation.clone()}

// Farmhouse hood, rebuilt cleanly and centered on the range.
const hood=assetMap.get('Farmhouse Range Hood 2.2');if(hood){clearRoot(hood);hood.visible=true;hood.position.set(.72,0,-5.24);hood.rotation.set(0,0,0);const skirt=new THREE.Mesh(new THREE.CylinderGeometry(1.18,.68,1.35,4),cream);skirt.rotation.y=Math.PI/4;skirt.scale.z=.62;skirt.position.y=3.6;hood.add(skirt);const chimney=rb(1.2,1.34,.64,cream2,.035);chimney.position.y=4.62;hood.add(chimney);const shelf=rb(2.46,.16,.98,wood,.028);shelf.position.y=2.92;hood.add(shelf);const lip=rb(2.22,.08,.86,brass,.018);lip.position.y=2.8;lip.material=lip.material.clone();lip.material.transparent=true;lip.material.opacity=.42;hood.add(lip);const l=new THREE.PointLight(0xffc985,2.25,2.7,2);l.position.set(0,2.68,.32);hood.add(l);hood.userData.homePos=hood.position.clone();hood.userData.homeRot=hood.rotation.clone()}

// Rounded retro fridge on the far right, with one controlled set of notes/magnets.
const fridge=assetMap.get('Retro Fridge');if(fridge){clearRoot(fridge);fridge.visible=true;fridge.position.set(6.05,0,-4.96);fridge.rotation.set(0,0,0);const body=rb(1.82,3.68,1.12,cream,.2);body.position.y=1.84;fridge.add(body);const upper=rb(1.64,2.02,.07,ivory,.15);upper.position.set(0,2.53,.585);fridge.add(upper);const lower=rb(1.64,1.18,.07,cream2,.14);lower.position.set(0,.78,.585);fridge.add(lower);const seam=rb(1.58,.05,.08,brass,.016);seam.position.set(0,1.52,.63);seam.material=seam.material.clone();seam.material.transparent=true;seam.material.opacity=.42;fridge.add(seam);for(const yy of[2.55,.82]){const h=rb(.07,yy>1?.95:.72,.09,brass,.025);h.position.set(-.64,yy,.68);fridge.add(h)}const notes=[[-.18,2.45,.24,.3,pink], [.23,2.18,.28,.22,ivory],[-.2,1.98,.2,.26,woodLight],[.28,2.65,.18,.2,cream2]];for(const [x,y,w,h,m] of notes){const n=rb(w,h,.02,m,.015);n.position.set(x,y,.66);n.rotation.z=(x+y)*.018;fridge.add(n)}for(const x of[-.55,.55]){const foot=cyl(.07,.09,dark,14);foot.position.set(x,.03,.3);fridge.add(foot)}fridge.userData.homePos=fridge.position.clone();fridge.userData.homeRot=fridge.rotation.clone()}

// One glass cabinet between the window and hood, like the approved board.
function rebuildUpperGlass(id,x){const r=assetMap.get(id);if(!r)return;clearRoot(r);r.visible=true;r.position.set(x,3.86,-5.34);r.rotation.set(0,0,0);const body=rb(1.38,1.55,.58,cream,.045);r.add(body);for(const dx of[-.34,.34]){const door=rb(.58,1.25,.04,glass,.025);door.position.set(dx,0,.315);r.add(door);const v1=bx(.035,1.18,.025,woodLight);v1.position.set(dx,0,.35);r.add(v1);for(const yy of[-.3,.3]){const h=bx(.54,.035,.025,woodLight);h.position.set(dx,yy,.35);r.add(h)}const knob=cyl(.03,.055,brass,12);knob.rotation.x=Math.PI/2;knob.position.set(dx+(dx<0?.2:-.2),0,.39);r.add(knob)}for(let i=0;i<3;i++){const plate=cyl(.15,.018,ivory,22);plate.position.set(-.25,-.5+i*.06,.08);r.add(plate);const cup=rb(.16,.15,.16,ivory,.035);cup.position.set(.28,-.45+i*.28,.09);r.add(cup)}r.userData.homePos=r.position.clone();r.userData.homeRot=r.rotation.clone()}
rebuildUpperGlass('Upper Cabinet 1',-1.08);
['Upper Cabinet 2','Upper Cabinet 3'].forEach(retire);

// Four open shelves, each still independently movable in Decor mode.
function makeShelf(name,x,y,w){const g=new THREE.Group();const board=rb(w,.11,.42,wood,.025);g.add(board);for(const sx of[-w*.43,w*.43]){const br=bx(.075,.36,.075,brass);br.position.set(sx,-.15,-.07);g.add(br)}g.position.set(x,y,-5.33);kitchen.add(g);register(g,name,'Wall Shelf','Decor / Storage');for(let i=0;i<3;i++){const jar=cyl(.105,.23,i===1?cream2:cream,18);jar.position.set(-w*.27+i*w*.27,.17,.02);g.add(jar);const lid=cyl(.108,.032,woodDark,18);lid.position.set(-w*.27+i*w*.27,.3,.02);g.add(lid)}return g}
makeShelf('Reference Shelf Left Low',-5.72,3.42,1.45);makeShelf('Reference Shelf Left High',-5.72,4.12,1.35);makeShelf('Reference Shelf Right Low',3.82,3.42,1.45);makeShelf('Reference Shelf Right High',3.82,4.12,1.25);

// The actual approved L-shaped peninsula: return on the LEFT, long breakfast bar across the front.
const pen=new THREE.Group();pen.name='Reference L Peninsula 2.7';
const longBody=rb(6.3,1.04,1.42,cream,.055);longBody.position.set(-2.7,.52,2.16);pen.add(longBody);
const returnBody=rb(1.48,1.04,6.65,cream,.055);returnBody.position.set(-5.46,.52,-.43);pen.add(returnBody);
const longTop=rb(6.58,.17,1.72,wood,.055);longTop.position.set(-2.7,1.12,2.16);pen.add(longTop);
const returnTop=rb(1.78,.17,6.82,wood,.055);returnTop.position.set(-5.46,1.12,-.43);pen.add(returnTop);
// vertical beadboard / pilasters on the breakfast-bar face
for(let x=-5.4;x<=-.05;x+=.34){const groove=bx(.025,.78,.028,cream2);groove.position.set(x,.52,2.89);pen.add(groove)}
for(const x of[-5.72,.35]){const pil=rb(.16,.92,.08,cream2,.018);pil.position.set(x,.52,2.88);pen.add(pil)}
// small open niche at the left end
const niche=rb(1.1,.68,.05,woodDark,.025);niche.position.set(-5.02,.52,2.9);niche.material=niche.material.clone();niche.material.transparent=true;niche.material.opacity=.16;pen.add(niche);for(const yy of[.32,.68]){const sh=rb(.95,.055,.36,woodLight,.018);sh.position.set(-5.02,yy,2.98);pen.add(sh)}
for(const [x,y] of[[-5.28,.39],[-4.98,.75],[-4.76,.39]]){const j=cyl(.08,.18,cream,16);j.position.set(x,y,3.03);pen.add(j);const lid=cyl(.082,.025,woodDark,16);lid.position.set(x,y+.105,3.03);pen.add(lid)}
// brass rail + towel and basket at the free end
const rail=rb(.62,.045,.055,brass,.012);rail.position.set(.35,.69,2.93);pen.add(rail);const towel=rb(.38,.62,.025,gingham,.012);towel.position.set(.35,.37,2.96);pen.add(towel);
const basket=rb(.56,.34,.2,new THREE.MeshStandardMaterial({color:0xb98759,roughness:.9}),.045);basket.position.set(.35,.48,3.03);basket.rotation.x=.05;pen.add(basket);
kitchen.add(pen);register(pen,'Reference L Peninsula 2.7','Furniture','Prepare / Place Appliance');

// Rebuild stools cleanly and place them exactly along the bar edge.
function rebuildStool(id,x){const s=assetMap.get(id);if(!s)return;clearRoot(s);s.visible=true;s.position.set(x,0,3.48);s.rotation.set(0,0,0);const seat=cyl(.43,.16,gingham,30);seat.position.y=.98;s.add(seat);const rim=torus(.39,.032,wood);rim.rotation.x=Math.PI/2;rim.position.y=.91;s.add(rim);for(const [lx,lz] of[[-.25,-.25],[.25,-.25],[-.25,.25],[.25,.25]]){const leg=cyl(.052,.86,woodDark,16);leg.position.set(lx,.44,lz);leg.rotation.z=lx*.08;s.add(leg);const bead=sphere(.067,woodLight,12);bead.position.set(lx,.72,lz);s.add(bead)}const ring=torus(.29,.022,woodLight);ring.rotation.x=Math.PI/2;ring.position.y=.38;s.add(ring);s.userData.homePos=s.position.clone();s.userData.homeRot=s.rotation.clone()}
rebuildStool('Gingham Stool 01',-3.75);rebuildStool('Gingham Stool 02',-1.9);

// New centered gingham rug in the work triangle.
function rugTexture(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#f8eadf';x.fillRect(0,0,256,256);for(let yy=0;yy<256;yy+=48)for(let xx=0;xx<256;xx+=48){x.fillStyle=((xx+yy)/48)%2?'#e8afa6':'#f7ddd2';x.fillRect(xx,yy,48,48);x.fillStyle='rgba(255,255,255,.2)';x.fillRect(xx,yy,48,4)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(5,3);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.92})}
const rug=rb(3.9,.038,2.15,rugTexture(),.035);rug.position.set(.55,.075,-2.38);kitchen.add(rug);register(rug,'Reference Gingham Rug 2.7','Decor','Move / Store');for(let i=0;i<22;i++)for(const side of[-1,1]){const f=bx(.025,.018,.18,cream2);f.position.set(-1.35+i*.18,.08,-2.38+side*1.15);master.add(f)}

// Pendants rebuilt once, with soft scalloped milk-glass shades.
function rebuildPendant(id,x){const p=assetMap.get(id);if(!p)return;clearRoot(p);p.visible=true;p.position.set(x,0,1.1);p.rotation.set(0,0,0);const cord=cyl(.014,2.0,dark,8);cord.position.y=4.56;p.add(cord);const cap=cyl(.14,.12,brass,18);cap.position.y=3.66;p.add(cap);for(let i=0;i<10;i++){const petal=sphere(.13,ivory,14);const a=i/10*Math.PI*2;petal.scale.set(1.25,.55,.82);petal.position.set(Math.cos(a)*.32,3.42,Math.sin(a)*.32);p.add(petal)}const ring=torus(.37,.022,brass);ring.rotation.x=Math.PI/2;ring.position.y=3.34;p.add(ring);const l=new THREE.PointLight(0xffc77f,3.8,5,1.9);l.position.y=3.24;p.add(l);p.userData.useFn=()=>{l.visible=!l.visible;api.toast(l.visible?'Pendant light on ✨':'Pendant light off')};p.userData.homePos=p.position.clone();p.userData.homeRot=p.rotation.clone()}
rebuildPendant('Pendant Light 01',-3.65);rebuildPendant('Pendant Light 02',-1.65);

// Controlled small details copied from the reference board rather than generic clutter.
function vaseFlowers(x,z){const vase=cyl(.14,.32,ivory,20);vase.position.set(x,1.42,z);master.add(vase);for(let i=0;i<8;i++){const st=bx(.012,.32,.012,green);st.position.set(x+(i-3.5)*.025,1.68,z+(i%3-1)*.03);master.add(st);const fl=sphere(.05,i%2?ivory:pink,10);fl.position.set(st.position.x,1.88+(i%2)*.03,st.position.z);master.add(fl)}}
function fruitBowl(x,z){const bowl=new THREE.Mesh(new THREE.SphereGeometry(.26,24,12,0,Math.PI*2,0,Math.PI/2),woodLight);bowl.rotation.x=Math.PI;bowl.scale.y=.42;bowl.position.set(x,1.36,z);master.add(bowl);for(let i=0;i<7;i++){const f=sphere(.085,i%2?M.orange:M.red,12);f.position.set(x+(i%3-1)*.11,1.45+Math.floor(i/3)*.08,z+(i%2-.5)*.11);master.add(f)}}
vaseFlowers(-2.95,2.08);fruitBowl(-2.25,2.08);
const mug=rb(.17,.19,.17,ivory,.045);mug.position.set(-.85,1.34,2.1);master.add(mug);const mugH=torus(.1,.02,ivory,Math.PI*1.5);mugH.rotation.y=Math.PI/2;mugH.position.set(-.74,1.39,2.1);master.add(mugH);
// cookbook stand on the far-left back counter
const stand=rb(.72,.08,.42,woodLight,.03);stand.position.set(-5.48,1.29,-4.73);master.add(stand);const book=rb(.62,.62,.04,ivory,.022);book.position.set(-5.48,1.62,-4.82);book.rotation.x=-.05;master.add(book);const art=rb(.36,.22,.02,terracotta,.018);art.position.set(-5.48,1.62,-4.79);master.add(art);
// cutting boards and bottles beside the stove
for(const [x,h] of[[-.62,.74],[-.25,.61]]){const b=rb(.36,h,.05,woodLight,.05);b.position.set(x,1.5,-5.42);b.rotation.z=(x+.5)*.18;master.add(b)}
for(let i=0;i<4;i++){const bottle=cyl(.048,.24,i%2?terracotta:woodDark,14);bottle.position.set(-.05+i*.16,1.34,-4.68);master.add(bottle);const cap=cyl(.05,.03,brass,14);cap.position.set(-.05+i*.16,1.48,-4.68);master.add(cap)}
// utensil rail below the hood
const utensilRail=rb(2.35,.045,.045,brass,.012);utensilRail.position.set(.72,2.55,-5.42);master.add(utensilRail);for(let i=0;i<6;i++){const h=cyl(.022,.45,i%2?woodDark:brass,10);h.position.set(-.35+i*.43,2.31,-5.38);master.add(h);const spoon=cyl(.075,.04,i%2?woodLight:brass,12);spoon.position.set(-.35+i*.43,2.07,-5.38);master.add(spoon)}
// simple cream toaster near the fridge
const toaster=rb(.58,.34,.38,cream,.11);toaster.position.set(4.95,1.34,-4.7);master.add(toaster);for(const x of[4.83,5.07]){const slot=rb(.18,.015,.2,dark,.02);slot.position.set(x,1.52,-4.7);master.add(slot)}
// modest greenery: one sill plant, one fridge-top basket/vine, one tiny shelf plant.
function smallPlant(x,y,z,s=.13){const pot=cyl(s,s*1.25,cream2,18);pot.position.set(x,y+s*.62,z);master.add(pot);for(let i=0;i<7;i++){const leaf=sphere(s*.5,green,10);const a=i/7*Math.PI*2;leaf.scale.set(.5,1.2,.4);leaf.position.set(x+Math.cos(a)*s*.65,y+s*1.85,z+Math.sin(a)*s*.65);leaf.rotation.z=Math.cos(a)*.5;master.add(leaf)}}
smallPlant(-4.55,1.72,-5.12,.11);smallPlant(4.15,4.27,-5.05,.11);smallPlant(6.05,3.72,-4.96,.16);
for(let i=0;i<7;i++){const leaf=sphere(.09,green,10);leaf.scale.set(.55,1.2,.4);leaf.position.set(6.68,3.72-i*.25,-4.88);leaf.rotation.z=.35;master.add(leaf)}

// Lighting tuned to the approved golden, soft, non-washed-out reference.
renderer.toneMappingExposure=.96;renderer.domElement.style.filter='saturate(1.035) contrast(1.06) brightness(1.0)';
if(sun){sun.intensity=4.15;sun.color.set(0xffd19a);sun.position.set(-9.5,14.2,9.5)}
if(bounce){bounce.intensity=3.2;bounce.color.set(0xffbd84);bounce.position.set(-4.5,4.8,3.0)}
if(taskLight){taskLight.intensity=2.45;taskLight.color.set(0xffd2a0)}
const windowKey=new THREE.SpotLight(0xffca8b,5.0,20,.62,.74,1.5);windowKey.position.set(-4.0,7.4,-2.3);windowKey.target.position.set(-.4,.25,1.0);master.add(windowKey,windowKey.target);
const softFill=new THREE.DirectionalLight(0xfff4e7,.58);softFill.position.set(8,9,10);master.add(softFill);

// Reference framing now matches the approved Front 3/4 board: window left-back, range center-right, fridge far right, L return + two stools foreground.
const REF27={pos:new THREE.Vector3(11.35,8.65,12.85),target:new THREE.Vector3(-.72,1.46,-1.0),fov:22.4};
function referenceView27(){camera.position.copy(REF27.pos);camera.fov=REF27.fov;camera.updateProjectionMatrix();orbit.target.copy(REF27.target);orbit.update();transform.detach()}
referenceView27();orbit.minDistance=9.1;orbit.maxDistance=20.5;orbit.minPolarAngle=.54;orbit.maxPolarAngle=1.25;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView27,0));document.getElementById('assembledBtn')?.addEventListener('click',()=>setTimeout(referenceView27,20));

// Clean life-mode badge only; previous version badges are removed.
const badge=document.createElement('div');badge.className='k27-fidelity-badge';badge.textContent='Kitchen 2.7 · Reference Master Rebuild';document.querySelector('.workarea')?.appendChild(badge);
renderAssetList?.();
window.KITCHEN_3D_REFERENCE_27={version:'2.7',referenceView:referenceView27,group:master,peninsula:pen};