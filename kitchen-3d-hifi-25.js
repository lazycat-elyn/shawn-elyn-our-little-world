const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.5 internal API unavailable');
const {THREE,scene,camera,renderer,orbit,kitchen,assets,assetMap,rb,bx,cyl,sphere,torus,M,sun,bounce,taskLight}=api;
document.body.classList.add('k25-ready');

const finish=new THREE.Group();finish.name='KitchenFinish25';kitchen.add(finish);

// Fuller reference framing, closer to the warm isometric target.
const REF25={pos:new THREE.Vector3(11.25,8.85,13.0),target:new THREE.Vector3(-.82,1.48,-1.24),fov:20.2};
function referenceView25(){camera.position.copy(REF25.pos);camera.fov=REF25.fov;camera.updateProjectionMatrix();orbit.target.copy(REF25.target);orbit.update()}
referenceView25();orbit.minDistance=9.1;orbit.maxDistance=19.8;
document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(referenceView25,0));

// Fine wood grain for countertops and shelves.
function woodTexture(){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle='#d69a67';x.fillRect(0,0,512,256);for(let i=0;i<120;i++){const y=Math.random()*256;x.strokeStyle=`rgba(110,62,35,${.035+Math.random()*.07})`;x.lineWidth=.4+Math.random()*1.2;x.beginPath();x.moveTo(0,y);let yy=y;for(let xx=0;xx<=512;xx+=24){yy+=Math.sin((xx+i)*.045)*.65+(Math.random()-.5)*1.1;x.lineTo(xx,yy)}x.stroke()}for(let i=0;i<18;i++){const y=Math.random()*256;x.strokeStyle='rgba(255,235,208,.08)';x.lineWidth=1.4;x.beginPath();x.moveTo(0,y);x.lineTo(512,y+Math.sin(i)*2);x.stroke()}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4.2,1.6);t.colorSpace=THREE.SRGBColorSpace;return t}
const fineWood=woodTexture();
[M.wood,M.wood2,M.woodLight].forEach((m,i)=>{if(!m)return;m.map=fineWood;m.color.set(i===1?0xe0aa78:i===2?0xe7b98b:0xbc7a49);m.roughness=i===1?.46:.55;m.needsUpdate=true});

// Countertop skins with eased front edge and richer grain.
const counterMat=M.wood2.clone();counterMat.map=fineWood;counterMat.bumpMap=fineWood;counterMat.bumpScale=.022;counterMat.needsUpdate=true;
function counterSkin(x,z,w,d,rot=0){const g=rb(w,.105,d,counterMat,.04);g.position.set(x,1.205,z);g.rotation.y=rot;g.castShadow=g.receiveShadow=true;finish.add(g);const edge=rb(w,.055,.065,M.woodDark,.018);edge.position.set(x,1.155,z+(rot?0:d*.49));edge.rotation.y=rot;edge.material=edge.material.clone();edge.material.transparent=true;edge.material.opacity=.3;finish.add(edge)}
counterSkin(-3.72,-5.04,5.12,1.02);counterSkin(3.75,-5.04,3.68,1.02);counterSkin(-7.31,-3.45,3.25,1.0,Math.PI/2);counterSkin(-7.31,-.35,2.05,1.0,Math.PI/2);

// Thicker cabinet fronts, inset panels and refined brass pulls.
for(const a of assets){const n=a.userData.displayName||'';if(/Base|Drawer Cabinet/.test(n)){
  const outer=rb(.84,.64,.045,M.cream2,.025);outer.position.set(0,.53,.493);a.add(outer);
  const inner=rb(.68,.48,.026,M.cream,.02);inner.position.set(0,.53,.528);a.add(inner);
  const bevelTop=rb(.68,.035,.026,M.ivory,.012);bevelTop.position.set(0,.735,.545);a.add(bevelTop);
  const pull=rb(.31,.04,.065,M.brass,.018);pull.position.set(0,.79,.57);a.add(pull);
  for(const sx of[-.37,.37]){const stile=rb(.055,.58,.035,M.cream,.015);stile.position.set(sx,.53,.55);a.add(stile)}
}}

// Better window proportions: narrower mullions, deeper sill, warm frame.
const win=new THREE.Group();win.position.set(-7.7,0,-1.78);finish.add(win);
const frameMat=M.woodLight.clone();frameMat.color.set(0xe3b27f);frameMat.roughness=.56;
const sill=rb(.22,.15,5.22,frameMat,.035);sill.position.set(.02,1.27,0);win.add(sill);
for(const z of[-2.48,-1.24,0,1.24,2.48]){const v=rb(.08,3.34,.085,frameMat,.018);v.position.set(.01,3.08,z);win.add(v)}
for(const y of[1.43,2.26,3.09,3.92,4.75]){const h=rb(.08,.08,5.02,frameMat,.018);h.position.set(.01,y,0);win.add(h)}
const warmGlass=new THREE.MeshPhysicalMaterial({color:0xdfe8d0,transparent:true,opacity:.24,roughness:.08,transmission:.18,depthWrite:false});
const glass=new THREE.Mesh(new THREE.PlaneGeometry(5.0,3.3),warmGlass);glass.rotation.y=Math.PI/2;glass.position.set(-.05,3.09,0);win.add(glass);

// Softer curtain valance and tied side panels.
const gingham=api.ginghamMat;const curtain=new THREE.Group();curtain.position.set(-7.54,0,-1.78);finish.add(curtain);
const rod=cyl(.025,5.35,M.brass,16);rod.rotation.x=Math.PI/2;rod.position.set(.08,5.08,0);curtain.add(rod);
for(let i=0;i<14;i++){const fold=rb(.12,.42,.34,gingham,.045);fold.position.set(.02,4.82,-2.5+i*.385);fold.rotation.x=(i%2?1:-1)*.04;curtain.add(fold)}
for(const side of[-1,1]){for(let i=0;i<6;i++){const d=rb(.09,1.48,.24,gingham,.035);d.position.set(.03,4.02,side*(2.3-i*.09));d.rotation.z=(i-2.5)*.018;curtain.add(d)}const tie=torus(.16,.025,M.brass,Math.PI*1.7);tie.rotation.y=Math.PI/2;tie.position.set(.12,3.5,side*1.88);curtain.add(tie)}

// Pendant redesign: cream scalloped shade + brass cap + visible warm bulb.
for(const id of['Pendant Light 01','Pendant Light 02']){const p=assetMap.get(id);if(!p)continue;
  const cap=cyl(.16,.12,M.brass,20);cap.position.y=3.67;p.add(cap);
  const shade=new THREE.Group();for(let i=0;i<12;i++){const petal=sphere(.13,M.ivory,16);const a=i/12*Math.PI*2;petal.scale.set(1.25,.55,.8);petal.position.set(Math.cos(a)*.34,3.42,Math.sin(a)*.34);shade.add(petal)}p.add(shade);
  const rim=torus(.4,.024,M.brass);rim.rotation.x=Math.PI/2;rim.position.y=3.34;p.add(rim);
  const bulb=sphere(.075,new THREE.MeshStandardMaterial({color:0xffe0aa,emissive:0xffb760,emissiveIntensity:2.2,roughness:.25}),18);bulb.position.y=3.31;p.add(bulb)
}

// Fridge: rounder visual front, soft edge bands, vintage brass accents.
const fridge=assetMap.get('Retro Fridge');if(fridge){
  const upper=rb(1.58,2.02,.075,M.cream,.17);upper.position.set(0,2.48,.585);fridge.add(upper);
  const lower=rb(1.58,1.22,.075,M.cream2,.16);lower.position.set(0,.78,.585);fridge.add(lower);
  const separator=rb(1.54,.045,.082,M.brass,.018);separator.position.set(0,1.53,.625);separator.material=separator.material.clone();separator.material.transparent=true;separator.material.opacity=.48;fridge.add(separator);
  for(const yy of[2.62,.88]){const handle=rb(.07,.8,.09,M.brass,.026);handle.position.set(.64,yy,.68);fridge.add(handle)}
  const toe=rb(1.35,.12,.7,M.woodDark,.035);toe.position.set(0,.08,.1);toe.material=toe.material.clone();toe.material.transparent=true;toe.material.opacity=.28;fridge.add(toe)
}

// Hood/stove integration: deeper hood shadow + cleaner visual rhythm.
const hood=assetMap.get('Farmhouse Range Hood 2.2');if(hood){const lip=rb(2.58,.16,1.02,M.wood2,.025);lip.position.set(0,2.77,.02);hood.add(lip);const shadow=new THREE.PointLight(0xffbd76,2.5,2.8,2);shadow.position.set(0,2.55,.4);hood.add(shadow)}
const stove=assetMap.get('Large Stove Oven');if(stove){const topRail=rb(1.85,.11,.08,M.brass,.018);topRail.position.set(0,1.13,.61);stove.add(topRail);const lowerRail=rb(1.5,.055,.08,M.brass,.018);lowerRail.position.set(0,.26,.61);stove.add(lowerRail)}

// Small cozy props: tea towel, ceramic set, bread basket, flowers.
const towel=rb(.38,.55,.025,gingham,.012);towel.position.set(2.72,.78,-4.47);finish.add(towel);
for(let i=0;i<4;i++){const jar=cyl(.09,.22,M.cream,18);jar.position.set(3.35+i*.26,1.35,-4.73);finish.add(jar);const lid=cyl(.095,.032,M.woodLight,18);lid.position.set(3.35+i*.26,1.49,-4.73);finish.add(lid)}
const basketMat=new THREE.MeshStandardMaterial({color:0xb98759,roughness:.92});const basket=rb(.72,.22,.48,basketMat,.06);basket.position.set(-4.4,1.33,2.2);finish.add(basket);for(let i=0;i<4;i++){const bread=rb(.13,.26,.38,new THREE.MeshStandardMaterial({color:0xd9a56b,roughness:.82}),.07);bread.rotation.z=.25;bread.position.set(-4.58+i*.12,1.54,2.2);finish.add(bread)}
const vase=cyl(.13,.3,M.ivory,20);vase.position.set(-2.7,1.47,2.2);finish.add(vase);for(let i=0;i<7;i++){const st=bx(.012,.3,.012,M.green);st.position.set(-2.7+(i-3)*.027,1.72,2.2+(i%3-1)*.03);finish.add(st);const fl=sphere(.05,i%2?M.ivory:M.pink2,10);fl.position.set(st.position.x,1.9+(i%2)*.025,st.position.z);finish.add(fl)}

// Cinematic light separation without washing out the cream palette.
renderer.toneMappingExposure=1.01;renderer.domElement.style.filter='saturate(1.045) contrast(1.045) brightness(1.005)';
if(sun){sun.intensity=3.95;sun.color.set(0xffd29c);sun.position.set(-10.5,14.8,10.2)}
if(bounce){bounce.intensity=3.75;bounce.color.set(0xffc28c)}
if(taskLight)taskLight.intensity=2.9;
const rim=new THREE.DirectionalLight(0xfff2df,.62);rim.position.set(8,9,9);finish.add(rim);
const windowKey=new THREE.SpotLight(0xffc985,4.7,19,.6,.75,1.5);windowKey.position.set(-7.5,7.8,3.1);windowKey.target.position.set(-1,.2,-.4);windowKey.castShadow=true;windowKey.shadow.mapSize.set(1024,1024);finish.add(windowKey,windowKey.target);

// More visible contact shadows at hero objects.
const sm=new THREE.MeshBasicMaterial({color:0x4e382b,transparent:true,opacity:.075,depthWrite:false});
function contact(x,z,sx,sz){const q=new THREE.Mesh(new THREE.CircleGeometry(1,36),sm);q.rotation.x=-Math.PI/2;q.scale.set(sx,sz,1);q.position.set(x,.075,z);finish.add(q)}
contact(6.15,-4.95,1.08,.62);contact(.55,-5.04,1.18,.58);contact(-2.2,2.25,3.35,.74);contact(-3.55,3.62,.48,.3);contact(-1.82,3.62,.48,.3);

document.querySelector('.k24-fidelity-badge')?.remove();
const badge=document.createElement('div');badge.className='k25-fidelity-badge';badge.textContent='Kitchen 2.5 · Material & Proportion Polish';document.querySelector('.workarea')?.appendChild(badge);
window.KITCHEN_3D_HIFI_25={version:'2.5',referenceView:referenceView25,group:finish};