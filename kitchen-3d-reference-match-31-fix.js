const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.1 internal API unavailable');
const {THREE,scene,kitchen,camera,renderer,orbit,transform,M,sun,bounce,taskLight,rb,bx,cyl,sphere,torus}=api;

const old=kitchen.getObjectByName('KitchenReferenceFix310');
if(old) old.removeFromParent();
const g=new THREE.Group();
g.name='KitchenReferenceFix310';
kitchen.add(g);

// --- 1. Fix Life-mode editor/helper bug ---
function isDecorMode(){
  const buttons=[...document.querySelectorAll('button')];
  const decor=buttons.find(b=>/decor/i.test((b.textContent||'').trim()));
  return !!decor && decor.classList.contains('active');
}
function syncEditorVisibility(){
  const decor=isDecorMode();
  if(transform) transform.visible=decor;
  scene.traverse(o=>{
    const type=(o.type||'').toLowerCase();
    const name=(o.name||'').toLowerCase();
    const editorLine=
      type==='boxhelper' ||
      type==='transformcontrols' ||
      name.includes('gizmo') ||
      name.includes('helper') ||
      name.includes('selection') ||
      name.includes('outline') ||
      (o.isLine && o.parent===scene);
    if(editorLine) o.visible=decor;
  });
}
document.addEventListener('click',()=>setTimeout(syncEditorVisibility,0),true);
setInterval(syncEditorVisibility,180);
setTimeout(syncEditorVisibility,20);

// --- 2. Remove the accidental giant side-window from the old base scene ---
for(const o of [...kitchen.children]){
  const p=o.position;
  if(p && p.x>-7.92 && p.x<-7.42 && p.y>1.15 && p.z>-4.7 && p.z<1.25){
    o.visible=false;
    o.userData.k31HiddenSideWindow=true;
  }
}

// --- 3. Restore the approved warm ivory / honey wood palette ---
const setMat=(m,color,rough,metal)=>{
  if(!m) return;
  if(m.color) m.color.setHex(color);
  if(rough!=null) m.roughness=rough;
  if(metal!=null) m.metalness=metal;
  m.needsUpdate=true;
};
setMat(M?.cream,0xf3e7d7,.61,0);
setMat(M?.cream2,0xead8c4,.68,0);
setMat(M?.ivory,0xfff7ec,.54,0);
setMat(M?.wood,0xb97a49,.58,0);
setMat(M?.wood2,0xcf925e,.58,0);
setMat(M?.woodLight,0xdda873,.61,0);
setMat(M?.woodDark,0x76503a,.63,0);
setMat(M?.brass,0x9e7045,.42,.6);
setMat(M?.pink,0xe0a097,.84,0);
setMat(M?.pink2,0xf0c4b9,.88,0);

if(renderer) renderer.toneMappingExposure=.90;
if(sun) sun.intensity=2.65;
if(bounce){bounce.intensity=2.2;bounce.color.setHex(0xffd1a4);}
if(taskLight){taskLight.intensity=1.7;taskLight.color.setHex(0xffdfbd);}
scene.traverse(o=>{if(o.isHemisphereLight)o.intensity=1.25;});

// --- 4. Left wall becomes shelves + art + plants, like the reference ---
const mat=(c,r=.65,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const cream=mat(0xf3e7d7,.62), ivory=mat(0xfff7ec,.54), wood=mat(0xc58b58,.58), wood2=mat(0xdda873,.61);
const brass=mat(0x9e7045,.42,.6), peach=mat(0xe4a59a,.86), sage=mat(0x718063,.9), dark=mat(0x47372f,.5,.1);
function box(w,h,d,m,x,y,z,r=.02,p=g){const o=rb(w,h,d,m,r);o.position.set(x,y,z);p.add(o);return o}
function jar(x,y,z,s=.1,p=g){const b=cyl(s,s*2.0,ivory,18);b.position.set(x,y,z);p.add(b);const lid=cyl(s*1.02,s*.2,brass,16);lid.position.set(x,y+s*1.12,z);p.add(lid)}
function leaf(x,y,z,s=.1,p=g){const q=sphere(s,sage,12);q.scale.set(.55,1.2,.42);q.position.set(x,y,z);p.add(q);return q}
function plant(x,y,z,s=.12,p=g){const pot=cyl(s*.72,s*1.15,cream,18);pot.position.set(x,y+s*.55,z);p.add(pot);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const l=leaf(x+Math.cos(a)*s*.7,y+s*1.8,z+Math.sin(a)*s*.65,s*.55,p);l.rotation.z=Math.cos(a)*.45}}
function art(x,y,z,w=.48,h=.62,p=g){
  box(w,h,.055,wood2,x,y,z,.025,p);box(w*.83,h*.82,.025,ivory,x+.035,y,z,.015,p);
  box(.018,h*.33,.014,sage,x+.055,y-.03,z,.004,p);
  for(const dy of[-.08,.04,.14]){const f=sphere(.04,peach,10);f.scale.set(1,.65,.4);f.position.set(x+.08,y+dy,z-.018);p.add(f)}
}
for(const y of[3.55,4.28]){
  box(.38,.095,1.75,wood,-7.68,y,-3.72,.02);
  box(.12,.32,.06,brass,-7.56,y-.15,-4.38,.012);
  box(.12,.32,.06,brass,-7.56,y-.15,-3.06,.012);
}
jar(-7.45,3.83,-4.2,.095);jar(-7.45,3.83,-3.72,.09);jar(-7.45,3.83,-3.25,.09);
plant(-7.44,4.47,-4.15,.13);art(-7.44,4.58,-3.32,.44,.56);

// --- 5. Add soft outdoor greenery behind the real back window ---
const outdoor=g;
for(let i=0;i<26;i++){
  const q=sphere(.10+(i%4)*.018,i%2?sage:mat(0x9aaa73,.92),10);
  q.scale.set(1.3,.8,.32);
  q.position.set(-5.0+(i%7)*.55,2.0+Math.floor(i/7)*.55,-5.305);
  outdoor.add(q);
}

// --- 6. More reference-like lamps and runner finishing ---
for(const [x,z] of [[-4.05,.55],[-2.43,.55]]){
  const cap=cyl(.11,.08,brass,18);cap.position.set(x,4.78,z);g.add(cap);
  const shade=sphere(.31,ivory,20);shade.scale.set(1,.66,1);shade.position.set(x,4.43,z);g.add(shade);
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const pet=sphere(.105,ivory,12);pet.scale.set(1,.55,.7);pet.position.set(x+Math.cos(a)*.24,4.34,z+Math.sin(a)*.24);g.add(pet)}
}
for(let i=0;i<13;i++){
  const f=box(.035,.012,.22,wood2,-.95+i*.42,.083,.55,.004);
  f.rotation.y=(i%2?1:-1)*.08;
}

// --- 7. Subtle contact shadows to ground the scene ---
const shadowMat=new THREE.MeshBasicMaterial({color:0x5a3a2c,transparent:true,opacity:.055,depthWrite:false});
function contact(x,z,sx,sz,op=.055){
  const m=shadowMat.clone();m.opacity=op;
  const q=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),m);
  q.rotation.x=-Math.PI/2;q.position.set(x,.025,z);g.add(q);
}
contact(-2.2,2.35,6.3,1.65,.065);
contact(.65,-5.0,2.2,1.25,.07);
contact(6.0,-4.9,1.9,1.35,.07);

// --- 8. Closer, lower hero camera matching the reference composition ---
try{
  camera.position.set(9.35,7.55,11.55);
  camera.fov=32;
  camera.updateProjectionMatrix();
  if(orbit?.target){orbit.target.set(-.45,2.15,-.7);orbit.update?.();}
}catch(e){}

syncEditorVisibility();
window.KITCHEN_3D_REFERENCE_FIX_31={version:'3.1',group:g};
