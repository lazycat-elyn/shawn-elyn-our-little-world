const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.3 internal API unavailable');
const {THREE,kitchen,assetMap,register,rb,bx,cyl,sphere,torus,M,ginghamMat}=api;

const old=kitchen.getObjectByName('KitchenModularSplit330');
if(old) old.removeFromParent();
const root=new THREE.Group();
root.name='KitchenModularSplit330';
kitchen.add(root);

function hideAsset(id){
  const a=assetMap.get(id);
  if(!a)return;
  a.visible=false;
  a.userData.hiddenBy330=true;
}
function addAsset(obj,name,type,action){
  kitchen.add(obj);
  return register(obj,name,type,action,{placed:true});
}
function shadow(x,z,sx,sz,op=.07){
  const q=new THREE.Mesh(
    new THREE.PlaneGeometry(sx,sz),
    new THREE.MeshBasicMaterial({color:0x5a4235,transparent:true,opacity:op,depthWrite:false})
  );
  q.rotation.x=-Math.PI/2;
  q.position.set(x,.024,z);
  root.add(q);
  return q;
}

// Hide old combined assets that are being replaced by cleaner modular versions.
[
  'Farmhouse Sink',
  'Retro Fridge',
  'Upper Cabinet 1',
  'Upper Cabinet 2',
  'Upper Cabinet 03',
  'Open Shelf 1',
  'Open Shelf 2',
  'Open Shelf 3',
  'Open Shelf 4',
  'Open Shelf 5',
  'Open Shelf 6',
  'Pendant Light 01',
  'Pendant Light 02',
  'Plant Window',
  'Plant Shelf Left',
  'Plant Fridge Top',
  'Plant Corner',
  'Back Base 2',
  'Back Base 3'
].forEach(hideAsset);

// ---------- FARMHOUSE SINK ----------
function makeSink(){
  const g=new THREE.Group();

  const cabinet=rb(1.88,1.00,1.02,M.cream,.05);
  cabinet.position.y=.50;
  g.add(cabinet);

  const apron=rb(1.63,.58,.14,M.ivory,.075);
  apron.position.set(0,.73,.55);
  g.add(apron);

  const basin=rb(1.55,.11,.80,M.ivory,.05);
  basin.position.set(0,1.12,0);
  g.add(basin);

  const inner=rb(1.27,.055,.58,M.cream2,.04);
  inner.position.set(0,1.145,.02);
  g.add(inner);

  const faucetStem=cyl(.05,.56,M.brass,18);
  faucetStem.position.set(.52,1.47,-.28);
  g.add(faucetStem);

  const neck=torus(.29,.04,M.brass,Math.PI);
  neck.rotation.x=Math.PI/2;
  neck.rotation.z=Math.PI/2;
  neck.position.set(.52,1.67,-.04);
  g.add(neck);

  const tap1=cyl(.035,.13,M.brass,14);
  tap1.position.set(.26,1.31,-.25);
  g.add(tap1);
  const tap2=tap1.clone();
  tap2.position.x=.79;
  g.add(tap2);

  const towel=bx(.32,.62,.035,ginghamMat);
  towel.position.set(.50,.72,.58);
  g.add(towel);

  return g;
}
const sink=makeSink();
sink.position.set(-3.68,0,-5.02);
addAsset(sink,'Modular Farmhouse Sink','Appliance','Wash / Fill Water');
shadow(-3.68,-5.02,2.1,1.35,.09);

// ---------- SINK FLOWERS ----------
function makeFlowerVase(){
  const g=new THREE.Group();
  const vase=cyl(.11,.28,M.ivory,18);
  vase.position.y=.14;
  g.add(vase);

  for(let i=0;i<8;i++){
    const x=(i-3.5)*.025;
    const stem=bx(.01,.32,.01,M.green);
    stem.position.set(x,.38,0);
    g.add(stem);

    const bloom=sphere(.045,i%2?M.pink2:M.ivory,10);
    bloom.position.set(x,.56+(i%2)*.025,0);
    g.add(bloom);
  }
  return g;
}
const sinkFlowers=makeFlowerVase();
sinkFlowers.position.set(-5.02,1.24,-4.70);
addAsset(sinkFlowers,'Sink Flower Vase','Decor','Inspect');

function makeSoap(){
  const g=new THREE.Group();
  const body=rb(.14,.25,.12,M.cream2,.04);
  body.position.y=.125;
  g.add(body);
  const neck=cyl(.025,.07,M.brass,10);
  neck.position.y=.29;
  g.add(neck);
  const pump=bx(.12,.025,.025,M.brass);
  pump.position.set(.04,.335,0);
  g.add(pump);
  return g;
}
const soap=makeSoap();
soap.position.set(-2.52,1.24,-4.70);
addAsset(soap,'Sink Soap Dispenser','Decor','Use Soap');

// ---------- RETRO FRIDGE ----------
function makeFridge(){
  const g=new THREE.Group();

  const body=rb(1.82,3.58,1.08,M.cream,.17);
  body.position.y=1.79;
  g.add(body);

  const topDoor=rb(1.67,1.96,.055,M.cream2,.13);
  topDoor.position.set(0,2.55,.55);
  g.add(topDoor);

  const bottomDoor=rb(1.67,1.24,.055,M.cream2,.13);
  bottomDoor.position.set(0,.82,.55);
  g.add(bottomDoor);

  const split=bx(1.55,.045,1.10,M.woodLight);
  split.position.set(0,1.45,0);
  g.add(split);

  const h1=rb(.07,1.00,.07,M.brass,.02);
  h1.position.set(.65,2.46,.62);
  g.add(h1);

  const h2=rb(.07,.72,.07,M.brass,.02);
  h2.position.set(.65,.80,.62);
  g.add(h2);

  // small magnets/postcards remain part of the fridge element
  const colors=[M.pink,M.orange,M.cream2,M.pink2,M.ivory];
  for(let i=0;i<6;i++){
    const note=rb(.15+(i%2)*.05,.16+(i%3)*.04,.018,colors[i%colors.length],.02);
    note.position.set(-.52+(i%3)*.36,2.75-Math.floor(i/3)*.45,.585);
    note.rotation.z=(i-2.5)*.035;
    g.add(note);
  }

  // top wicker basket
  const basket=rb(.72,.28,.40,M.woodLight,.05);
  basket.position.set(0,3.72,0);
  g.add(basket);
  for(let i=-2;i<=2;i++){
    const rib=bx(.018,.21,.42,M.wood);
    rib.position.set(i*.12,3.72,0);
    g.add(rib);
  }

  return g;
}
const fridge=makeFridge();
fridge.position.set(5.78,0,-4.94);
addAsset(fridge,'Modular Retro Fridge','Appliance','Open / Store');
shadow(5.78,-4.94,2.0,1.4,.09);

// ---------- FRIDGE TOP PLANT ----------
function makePlant(){
  const g=new THREE.Group();
  const pot=cyl(.11,.20,M.cream2,18);
  pot.position.y=.10;
  g.add(pot);
  for(let i=0;i<9;i++){
    const a=i/9*Math.PI*2;
    const leaf=sphere(.08,M.green,12);
    leaf.scale.set(.55,1.2,.42);
    leaf.position.set(Math.cos(a)*.10,.27+Math.sin(i)*.02,Math.sin(a)*.10);
    leaf.rotation.z=Math.cos(a)*.5;
    g.add(leaf);
  }
  return g;
}
const fridgePlant=makePlant();
fridgePlant.position.set(6.27,3.88,-4.80);
addAsset(fridgePlant,'Fridge Top Plant','Decor','Inspect');

// ---------- GLASS DISPLAY CABINET ----------
function makeGlassCabinet(){
  const g=new THREE.Group();

  const body=rb(1.95,2.02,.56,M.cream,.04);
  g.add(body);

  const inner=rb(1.70,1.78,.48,M.ivory,.025);
  inner.position.z=.02;
  g.add(inner);

  for(const x of[-.44,.44]){
    const door=rb(.75,1.66,.028,M.glass,.02);
    door.position.set(x,0,.29);
    g.add(door);

    const vbar=bx(.03,1.58,.035,M.woodLight);
    vbar.position.set(x,0,.315);
    g.add(vbar);
  }

  for(const y of[-.54,0,.54]){
    const shelf=bx(1.56,.035,.41,M.woodLight);
    shelf.position.set(0,y,-.01);
    g.add(shelf);
  }

  // stacked plates
  for(const y of[-.50,.03,.56]){
    for(const x of[-.62,-.27,.27,.62]){
      const p=cyl(.115,.025,M.ivory,18);
      p.rotation.x=Math.PI/2;
      p.position.set(x,y,.28);
      g.add(p);
    }
  }

  for(const x of[-.10,.10]){
    const knob=sphere(.035,M.brass,12);
    knob.position.set(x,0,.345);
    g.add(knob);
  }

  return g;
}
const glassCab=makeGlassCabinet();
glassCab.position.set(-.45,4.45,-5.02);
addAsset(glassCab,'Modular Glass Display Cabinet','Cabinet','Open / Storage');

// ---------- OPEN SHELVES ----------
function makeShelf(){
  const g=new THREE.Group();
  const board=rb(1.42,.095,.38,M.wood,.02);
  g.add(board);
  for(const x of[-.58,.58]){
    const bracket=bx(.05,.28,.05,M.brass);
    bracket.position.set(x,-.14,-.02);
    g.add(bracket);
  }
  return g;
}
const shelfL1=makeShelf();
shelfL1.position.set(-6.00,3.52,-5.05);
addAsset(shelfL1,'Left Open Shelf Lower','Wall Shelf','Decor / Storage');

const shelfL2=makeShelf();
shelfL2.position.set(-6.00,4.30,-5.05);
addAsset(shelfL2,'Left Open Shelf Upper','Wall Shelf','Decor / Storage');

const shelfR1=makeShelf();
shelfR1.position.set(3.95,3.52,-5.05);
addAsset(shelfR1,'Right Open Shelf Lower','Wall Shelf','Decor / Storage');

const shelfR2=makeShelf();
shelfR2.position.set(3.95,4.30,-5.05);
addAsset(shelfR2,'Right Open Shelf Upper','Wall Shelf','Decor / Storage');

// ---------- SHELF JARS ----------
function makeJarSet(){
  const g=new THREE.Group();
  for(let i=0;i<3;i++){
    const b=cyl(.085,.24,M.ivory,18);
    b.position.set((i-1)*.25,.12,0);
    g.add(b);
    const lid=cyl(.087,.04,M.brass,16);
    lid.position.set((i-1)*.25,.26,0);
    g.add(lid);
  }
  return g;
}
const leftJars=makeJarSet();
leftJars.position.set(-6.00,3.68,-4.84);
addAsset(leftJars,'Left Shelf Jar Set','Decor','Inspect');

const rightJars=makeJarSet();
rightJars.position.set(3.78,3.68,-4.84);
addAsset(rightJars,'Right Shelf Jar Set','Decor','Inspect');

// ---------- PENDANT LIGHTS ----------
function makePendant(){
  const g=new THREE.Group();

  const cord=cyl(.013,1.95,M.dark,8);
  cord.position.y=.98;
  g.add(cord);

  const cap=cyl(.10,.08,M.brass,18);
  cap.position.y=.02;
  g.add(cap);

  const shade=sphere(.29,M.ivory,20);
  shade.scale.set(1,.62,1);
  shade.position.y=-.28;
  g.add(shade);

  // flower/scallop rim
  for(let i=0;i<10;i++){
    const a=i/10*Math.PI*2;
    const pet=sphere(.10,M.ivory,10);
    pet.scale.set(1,.52,.72);
    pet.position.set(Math.cos(a)*.22,-.37,Math.sin(a)*.22);
    g.add(pet);
  }

  const glow=new THREE.PointLight(0xffd5a2,2.5,4.0,1.9);
  glow.position.y=-.45;
  g.add(glow);

  return g;
}
const pendant1=makePendant();
pendant1.position.set(-4.10,4.90,-.05);
addAsset(pendant1,'Modular Pendant Light 01','Lighting','Toggle Light');

const pendant2=makePendant();
pendant2.position.set(-2.45,4.90,-.05);
addAsset(pendant2,'Modular Pendant Light 02','Lighting','Toggle Light');

// ---------- SMALL WALL ART ----------
function makeArt(){
  const g=new THREE.Group();
  const frame=rb(.44,.56,.05,M.woodLight,.025);
  g.add(frame);
  const paper=rb(.35,.46,.025,M.ivory,.015);
  paper.position.z=.035;
  g.add(paper);
  const stem=bx(.014,.23,.014,M.green);
  stem.position.set(0,-.03,.055);
  g.add(stem);
  for(const p of [[-.07,.04],[.03,.10],[.09,-.01]]){
    const bloom=sphere(.04,M.pink,10);
    bloom.scale.set(1,.65,.4);
    bloom.position.set(p[0],p[1],.065);
    g.add(bloom);
  }
  return g;
}
const wallArt=makeArt();
wallArt.position.set(4.95,3.58,-5.16);
addAsset(wallArt,'Modular Botanical Wall Art','Decor','Inspect');

window.KITCHEN_3D_MODULAR_SPLIT_33={version:'3.3',group:root};
