const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.2 internal API unavailable');
const {THREE,kitchen,assetMap,register,rb,bx,cyl,sphere,torus,M,ginghamMat}=api;

const old=kitchen.getObjectByName('KitchenModularSplit320');
if(old) old.removeFromParent();
const root=new THREE.Group();
root.name='KitchenModularSplit320';
kitchen.add(root);

function hideAsset(id){
  const a=assetMap.get(id);
  if(!a)return;
  a.visible=false;
  a.userData.hiddenBy320=true;
}
function addAsset(obj,name,type,action){
  kitchen.add(obj);
  return register(obj,name,type,action,{placed:true});
}
function shadow(x,z,sx,sz,op=.075){
  const q=new THREE.Mesh(
    new THREE.PlaneGeometry(sx,sz),
    new THREE.MeshBasicMaterial({color:0x5d4334,transparent:true,opacity:op,depthWrite:false})
  );
  q.rotation.x=-Math.PI/2;
  q.position.set(x,.022,z);
  root.add(q);
}

// Replace old combined/buggy hero assets.
[
  'Kitchen Peninsula',
  'Reference L Peninsula 2.7',
  'Gingham Stool 01',
  'Gingham Stool 02',
  'Large Stove Oven',
  'Statement Range Hood',
  'Farmhouse Range Hood 2.2'
].forEach(hideAsset);

// ---------- PENINSULA / TABLE ----------
function makePeninsula(){
  const g=new THREE.Group();

  const body=rb(5.95,1.00,1.46,M.cream,.05);
  body.position.y=.50;
  g.add(body);

  const top=rb(6.35,.16,1.78,M.wood2,.055);
  top.position.y=1.10;
  g.add(top);

  for(const xx of[-2.05,-.68,.68,2.05]){
    const panel=rb(1.02,.72,.035,M.cream2,.02);
    panel.position.set(xx,.50,.75);
    g.add(panel);
  }

  const endPanel=rb(1.16,.72,.035,M.cream2,.02);
  endPanel.position.set(2.86,.50,0);
  endPanel.rotation.y=Math.PI/2;
  g.add(endPanel);

  const rail=bx(.70,.045,.045,M.brass);
  rail.position.set(2.90,.70,.12);
  rail.rotation.y=Math.PI/2;
  g.add(rail);

  const towel=bx(.38,.66,.035,ginghamMat);
  towel.position.set(2.93,.38,.12);
  towel.rotation.y=Math.PI/2;
  g.add(towel);

  return g;
}
const peninsula=makePeninsula();
peninsula.position.set(-2.18,0,2.28);
addAsset(peninsula,'Modular Peninsula Table','Furniture','Prepare / Place');
shadow(-2.18,2.28,6.5,1.9,.085);

// ---------- CLEAN STOOLS ----------
function makeStool(){
  const g=new THREE.Group();

  const woodSeat=cyl(.33,.07,M.wood,28);
  woodSeat.position.y=.78;
  g.add(woodSeat);

  const cushion=cyl(.29,.11,ginghamMat,28);
  cushion.position.y=.86;
  g.add(cushion);

  const rim=torus(.295,.024,M.wood);
  rim.rotation.x=Math.PI/2;
  rim.position.y=.805;
  g.add(rim);

  for(const [x,z] of [[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]]){
    const leg=bx(.075,.72,.075,M.wood);
    leg.position.set(x,.36,z);
    leg.rotation.z=x*.08;
    leg.rotation.x=z*.035;
    g.add(leg);
  }

  const ring=torus(.225,.019,M.wood);
  ring.rotation.x=Math.PI/2;
  ring.position.y=.29;
  g.add(ring);

  return g;
}
const stool1=makeStool();
stool1.position.set(-3.85,0,3.20);
addAsset(stool1,'Modular Gingham Stool 01','Furniture','Sit');
shadow(-3.85,3.20,.86,.86,.09);

const stool2=makeStool();
stool2.position.set(-2.22,0,3.20);
addAsset(stool2,'Modular Gingham Stool 02','Furniture','Sit');
shadow(-2.22,3.20,.86,.86,.09);

// ---------- STOVE / OVEN ----------
function makeStove(){
  const g=new THREE.Group();

  const body=rb(2.08,1.28,.98,M.metal,.06);
  body.position.y=.64;
  g.add(body);

  const glass=rb(1.55,.56,.035,M.dark,.02);
  glass.position.set(0,.46,.515);
  g.add(glass);

  const handle=bx(.92,.045,.05,M.brass);
  handle.position.set(0,.77,.56);
  g.add(handle);

  const top=rb(1.98,.08,.91,M.dark,.02);
  top.position.y=1.31;
  g.add(top);

  for(const xx of[-.52,.52]){
    for(const zz of[-.22,.22]){
      const ring=torus(.17,.023,M.dark);
      ring.rotation.x=Math.PI/2;
      ring.position.set(xx,1.365,zz);
      g.add(ring);
    }
  }

  for(let i=0;i<6;i++){
    const k=cyl(.07,.075,M.brass,16);
    k.rotation.x=Math.PI/2;
    k.position.set(-.60+i*.24,1.06,.555);
    g.add(k);
  }

  return g;
}
const stove=makeStove();
stove.position.set(.62,0,-5.02);
addAsset(stove,'Modular Stove Oven','Appliance','Cook / Bake / Roast');
shadow(.62,-5.02,2.35,1.35,.10);

// ---------- RANGE HOOD ----------
function makeHood(){
  const g=new THREE.Group();

  const skirt=new THREE.Mesh(new THREE.CylinderGeometry(.94,.61,1.17,4),M.cream);
  skirt.rotation.y=Math.PI/4;
  skirt.scale.z=.72;
  skirt.position.y=.66;
  g.add(skirt);

  const chimney=bx(1.08,1.02,.56,M.cream2);
  chimney.position.y=1.72;
  g.add(chimney);

  const trim=bx(2.05,.12,.92,M.woodLight);
  trim.position.y=.04;
  g.add(trim);

  return g;
}
const hood=makeHood();
hood.position.set(.62,2.92,-5.20);
addAsset(hood,'Modular Range Hood','Appliance','Vent / Light');

// ---------- AIR FRYER ----------
function makeAirFryer(){
  const g=new THREE.Group();

  const body=rb(.62,.62,.55,M.cream,.12);
  body.position.y=.31;
  g.add(body);

  const face=rb(.44,.30,.028,M.dark,.04);
  face.position.set(0,.28,.285);
  g.add(face);

  const screen=rb(.18,.075,.018,M.glass,.018);
  screen.position.set(0,.48,.305);
  g.add(screen);

  const handle=rb(.24,.055,.075,M.woodDark,.025);
  handle.position.set(0,.16,.335);
  g.add(handle);

  return g;
}
const airfryer=makeAirFryer();
airfryer.position.set(-3.35,1.27,2.15);
addAsset(airfryer,'Modular Air Fryer','Appliance','Air Fry');

// ---------- TOASTER ----------
function makeToaster(){
  const g=new THREE.Group();

  const body=rb(.58,.34,.38,M.cream2,.10);
  body.position.y=.17;
  g.add(body);

  for(const x of[-.12,.12]){
    const slot=rb(.17,.014,.20,M.dark,.012);
    slot.position.set(x,.345,0);
    g.add(slot);
  }

  const lever=bx(.03,.13,.03,M.brass);
  lever.position.set(.31,.18,0);
  g.add(lever);

  return g;
}
const toaster=makeToaster();
toaster.position.set(4.58,1.28,-4.70);
addAsset(toaster,'Modular Toaster','Appliance','Toast Bread');

// ---------- PINK COOK POT ----------
function makePot(){
  const g=new THREE.Group();

  const body=cyl(.22,.18,M.pink2,24);
  body.position.y=.09;
  g.add(body);

  const rim=torus(.22,.018,M.cream2);
  rim.rotation.x=Math.PI/2;
  rim.position.y=.18;
  g.add(rim);

  const lid=cyl(.18,.045,M.pink,24);
  lid.position.y=.22;
  g.add(lid);

  const knob=sphere(.035,M.brass,12);
  knob.position.y=.275;
  g.add(knob);

  for(const x of[-.29,.29]){
    const h=bx(.11,.03,.03,M.brass);
    h.position.set(x,.10,0);
    g.add(h);
  }

  return g;
}
const pot=makePot();
pot.position.set(.98,1.37,-5.00);
addAsset(pot,'Modular Pink Cook Pot','Cookware','Cook');

// ---------- FRUIT BASKET ----------
function makeFruitBasket(){
  const g=new THREE.Group();

  const bowl=new THREE.Mesh(
    new THREE.SphereGeometry(.23,24,12,0,Math.PI*2,0,Math.PI/2),
    M.woodLight
  );
  bowl.rotation.x=Math.PI;
  bowl.scale.y=.43;
  g.add(bowl);

  for(let i=0;i<6;i++){
    const f=sphere(.075,i%2?M.orange:M.red,12);
    f.position.set((i%3-1)*.09,.09+Math.floor(i/3)*.075,(i%2-.5)*.08);
    g.add(f);
  }

  return g;
}
const fruit=makeFruitBasket();
fruit.position.set(-2.38,1.27,2.08);
addAsset(fruit,'Modular Fruit Basket','Decor','Inspect');

// ---------- CUTTING BOARDS ----------
function makeBoards(){
  const g=new THREE.Group();

  const a=rb(.34,.70,.05,M.woodLight,.04);
  a.position.set(-.12,.35,0);
  a.rotation.z=-.08;
  g.add(a);

  const b=rb(.28,.55,.05,M.wood2,.04);
  b.position.set(.15,.28,-.02);
  b.rotation.z=.06;
  g.add(b);

  return g;
}
const boards=makeBoards();
boards.position.set(-.42,1.27,-5.34);
addAsset(boards,'Modular Cutting Boards','Cookware','Inspect');

// ---------- SPICE / OIL SET ----------
function makeSpiceSet(){
  const g=new THREE.Group();

  for(let i=0;i<3;i++){
    const j=cyl(.055,.22,i===1?M.cream2:M.woodLight,14);
    j.position.set(-.17+i*.17,.11,0);
    g.add(j);

    const lid=cyl(.043,.035,M.brass,12);
    lid.position.set(-.17+i*.17,.24,0);
    g.add(lid);
  }

  for(let i=0;i<2;i++){
    const b=cyl(.047,.31,M.ivory,14);
    b.position.set(.34+i*.15,.155,0);
    g.add(b);

    const cap=bx(.028,.055,.028,M.woodDark);
    cap.position.set(.34+i*.15,.34,0);
    g.add(cap);
  }

  return g;
}
const spice=makeSpiceSet();
spice.position.set(.05,1.27,-4.67);
addAsset(spice,'Modular Spice & Oil Set','Decor','Inspect');

window.KITCHEN_3D_MODULAR_SPLIT_32={version:'3.2',group:root};
