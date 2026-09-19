const K=window.KITCHEN_3D_INTERNAL;
if(!K) throw new Error('Kitchen 5.0 gameplay: KITCHEN_3D_INTERNAL missing');
const {THREE,kitchen,assetMap,rb,bx,cyl,sphere,torus,M,toast}=K;

const state50={
  fridge:{top:false,bottom:false,cutaway:false,temp:4,freezer:-18},
  oven:{open:false,temp:180,timer:30,mode:'Bake'},
  airfryer:{open:false,temp:180,timer:15,mode:'Air Fry'},
  microwave:{open:false,power:7,timer:60},
  stove:{burner:0,level:0},
  coffee:{drink:'Latte'},
  kettle:{temp:100}
};

function post(type,payload={}) {
  if(window.parent!==window) window.parent.postMessage({source:'kitchen3d',type,...payload},'*');
}
function tween(obj,prop,target,duration=260){
  if(!obj)return;
  const start=obj[prop],t0=performance.now();
  function f(t){
    const p=Math.min(1,(t-t0)/duration),q=1-Math.pow(1-p,3);
    obj[prop]=start+(target-start)*q;
    if(p<1)requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
}
function mat(color,rough=.6,metal=0,opts={}) {
  return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,...opts});
}
const FM={
  inside:mat(0xe7e8df,.35),
  shelf:new THREE.MeshStandardMaterial({color:0xd9eaeb,roughness:.12,transparent:true,opacity:.58}),
  white:mat(0xfffbf4,.42),
  blue:mat(0x8ba9bb,.42),
  red:mat(0xc64d43,.55),
  green:mat(0x648956,.7),
  orange:mat(0xe79543,.55),
  yellow:mat(0xe8c55d,.48),
  brown:mat(0x8a5737,.6),
  pink:mat(0xe6a0a2,.52),
  paper:mat(0xeee0c6,.72),
  glass:new THREE.MeshStandardMaterial({color:0xbfd7d8,roughness:.08,transparent:true,opacity:.55})
};

function labelObject(o,label){
  o.userData.k50Label=label;
  o.traverse?.(c=>c.userData.k50Label=label);
  return o;
}

function makeFoodBox(w,h,d,color,label){
  const g=new THREE.Group();
  const b=rb(w,h,d,color,.035);b.position.y=h/2;g.add(b);
  labelObject(g,label);return g;
}
function makeEggCarton(){
  const g=new THREE.Group();
  const tray=rb(.62,.12,.32,FM.paper,.035);tray.position.y=.06;g.add(tray);
  for(let i=0;i<6;i++){const e=sphere(.075,FM.white,14);e.scale.set(.85,1.15,.85);e.position.set(-.2+(i%3)*.2,.15,-.08+Math.floor(i/3)*.16);g.add(e)}
  return labelObject(g,'Eggs 鸡蛋');
}
function makeTomato(){
  const g=new THREE.Group();const t=sphere(.13,FM.red,16);t.scale.y=.9;t.position.y=.13;g.add(t);
  const s=cyl(.025,.07,FM.green,10);s.position.y=.27;g.add(s);return labelObject(g,'Tomato 番茄');
}
function makeCarrot(){
  const g=new THREE.Group();const c=new THREE.Mesh(new THREE.ConeGeometry(.075,.34,16),FM.orange);c.rotation.z=Math.PI/2;c.position.x=.03;c.position.y=.12;g.add(c);
  for(let i=0;i<3;i++){const l=rb(.04,.16,.025,FM.green,.015);l.position.set(.23,.14,(i-1)*.04);l.rotation.z=-.7+(i*.2);g.add(l)}
  return labelObject(g,'Carrot 胡萝卜');
}
function makeMushrooms(){
  const g=new THREE.Group();
  [-.15,0,.15].forEach((x,i)=>{const st=cyl(.035,.13,FM.white,12);st.position.set(x,.065,0);g.add(st);const cap=sphere(.09,FM.brown,14);cap.scale.y=.55;cap.position.set(x,.16,0);g.add(cap)});
  return labelObject(g,'Mushrooms 蘑菇');
}
function makeBottle(color,label){
  const g=new THREE.Group();const b=cyl(.06,.34,color,16);b.position.y=.17;g.add(b);const cap=cyl(.045,.07,FM.red,12);cap.position.y=.375;g.add(cap);return labelObject(g,label);
}

function setupFridge(){
  const fridge=assetMap.get('Retro Fridge');
  if(!fridge||fridge.userData.k50Setup)return null;
  fridge.userData.k50Setup=true;
  const old=fridge.children.slice();
  old.slice(1).forEach(o=>o.visible=false);

  const body=old[0];
  if(body){body.material=body.material.clone();body.material.transparent=true;body.material.opacity=1;body.userData.k50Body=true}

  const interior=new THREE.Group();interior.name='K50 Fridge Interior';
  const back=rb(1.52,3.1,.08,FM.inside,.035);back.position.set(0,1.77,-.43);interior.add(back);
  const left=rb(.08,3.1,.82,FM.inside,.03);left.position.set(-.76,1.77,-.02);interior.add(left);
  const right=left.clone();right.position.x=.76;interior.add(right);
  const top=rb(1.52,.08,.82,FM.inside,.03);top.position.set(0,3.30,-.02);interior.add(top);
  const bottom=top.clone();bottom.position.y=.22;interior.add(bottom);
  [2.65,2.05,1.45,.88].forEach((y,i)=>{const s=rb(1.42,.045,.72,FM.shelf,.018);s.position.set(0,y,-.02);interior.add(s)});
  const freezer=rb(1.38,.52,.68,FM.inside,.05);freezer.position.set(0,.48,-.02);interior.add(freezer);
  fridge.add(interior);

  const makeDoor=(name,y,h)=>{
    const pivot=new THREE.Group();pivot.name=name+' Pivot';pivot.position.set(-.84,y,.57);
    const panel=rb(1.64,h,.10,M.cream,.09);panel.position.set(.82,0,.02);pivot.add(panel);
    const inner=rb(1.48,h*.86,.035,M.cream2,.05);inner.position.set(.82,0,.078);pivot.add(inner);
    const handle=rb(.08,h*.52,.08,M.brass,.025);handle.position.set(1.42,0,.10);pivot.add(handle);
    fridge.add(pivot);return pivot;
  };
  const topDoor=makeDoor('K50 Fridge Top Door',2.42,1.68);
  const bottomDoor=makeDoor('K50 Fridge Bottom Door',.86,1.16);

  const foodLayer=new THREE.Group();foodLayer.name='K50 Fridge Foods';fridge.add(foodLayer);
  const foods=[
    ['milk',makeFoodBox(.22,.44,.22,FM.white,'Milk 牛奶'),[-.48,2.73,-.02]],
    ['eggs',makeEggCarton(),[.18,2.68,-.02]],
    ['tomato',makeTomato(),[.55,2.72,-.02]],
    ['carrot',makeCarrot(),[-.50,2.12,-.02]],
    ['mushroom',makeMushrooms(),[.05,2.10,-.02]],
    ['cheese',makeFoodBox(.28,.18,.22,FM.yellow,'Cheese 芝士'),[.50,2.10,-.02]],
    ['butter',makeFoodBox(.28,.12,.18,FM.yellow,'Butter 牛油'),[-.48,1.52,-.02]],
    ['chicken',makeFoodBox(.46,.16,.28,FM.pink,'Chicken 鸡肉'),[0,1.50,-.02]],
    ['rice',makeFoodBox(.26,.34,.20,FM.paper,'Rice 米饭'),[.50,1.48,-.02]],
    ['pasta',makeFoodBox(.24,.38,.18,FM.orange,'Pasta 意面'),[-.50,.94,-.02]],
    ['noodles',makeFoodBox(.25,.30,.18,FM.red,'Noodles 拉面'),[-.18,.94,-.02]],
    ['soy',makeBottle(FM.brown,'Soy Sauce 酱油'),[.18,.92,-.02]],
    ['oil',makeBottle(FM.yellow,'Cooking Oil 食用油'),[.48,.92,-.02]],
    ['fries',makeFoodBox(.38,.34,.24,FM.yellow,'Frozen Fries 薯条'),[-.33,.36,.17]],
    ['nuggets',makeFoodBox(.38,.34,.24,FM.orange,'Nuggets 鸡块'),[.33,.36,.17]]
  ];
  foods.forEach(([id,o,p])=>{o.name='K50 Food '+id;o.position.set(...p);foodLayer.add(o)});

  fridge.userData.k50={body,interior,topDoor,bottomDoor,foodLayer};
  return fridge;
}

function setFridgeDoor(which,open){
  const fridge=setupFridge();if(!fridge)return;
  const d=which==='top'?fridge.userData.k50.topDoor:fridge.userData.k50.bottomDoor;
  state50.fridge[which]=open;
  tween(d.rotation,'y',open?-Math.PI*.56:0);
  const any=state50.fridge.top||state50.fridge.bottom;
  if(fridge.userData.k50.body){
    const body=fridge.userData.k50.body;
    body.material.opacity=any?0.18:1;
    body.material.depthWrite=!any;
  }
}

function setupOven(){
  const stove=assetMap.get('Large Stove Oven');
  if(!stove||stove.userData.k50Setup)return stove;
  stove.userData.k50Setup=true;
  const pivot=new THREE.Group();pivot.name='K50 Oven Door Pivot';pivot.position.set(0,.18,.58);
  const door=rb(1.72,.78,.08,M.metal,.04);door.position.set(0,.39,0);pivot.add(door);
  const glass=rb(1.38,.45,.035,M.dark,.025);glass.position.set(0,.40,.05);pivot.add(glass);
  const handle=rb(1.25,.08,.08,M.brass,.025);handle.position.set(0,.72,.10);pivot.add(handle);
  stove.add(pivot);stove.userData.k50OvenDoor=pivot;return stove;
}
function setOvenDoor(open){
  const s=setupOven();if(!s)return;state50.oven.open=open;
  tween(s.userData.k50OvenDoor.rotation,'x',open?-Math.PI*.42:0);
}

function applianceAsset(id){
  const a=assetMap.get(id);
  if(!a){toast('这个电器还没购买 / 放进厨房');return null}
  if(a.userData.placed===false||a.visible===false){toast('先从 Inventory 把电器 Place 到台面');return null}
  return a;
}
function setupAirFryer(){
  const a=applianceAsset('airfryer_01');if(!a)return null;
  if(a.userData.k50Drawer)return a;
  const drawer=rb(.46,.24,.38,M.pink,.05);drawer.position.set(0,.18,.34);a.add(drawer);
  const handle=rb(.30,.05,.08,M.woodDark,.025);handle.position.set(0,.18,.57);a.add(handle);
  a.userData.k50Drawer=drawer;a.userData.k50DrawerHandle=handle;return a;
}
function setAirDrawer(open){
  const a=setupAirFryer();if(!a)return;state50.airfryer.open=open;
  const target=open?0.66:0.34;tween(a.userData.k50Drawer.position,'z',target);
  tween(a.userData.k50DrawerHandle.position,'z',open?0.89:0.57);
}
function setupMicrowave(){
  const a=applianceAsset('microwave_01');if(!a)return null;
  if(a.userData.k50Door)return a;
  const pivot=new THREE.Group();pivot.position.set(-.39,.26,.30);a.add(pivot);
  const d=rb(.58,.36,.04,M.dark,.035);d.position.set(.29,0,0);pivot.add(d);a.userData.k50Door=pivot;return a;
}
function setMicrowaveDoor(open){
  const a=setupMicrowave();if(!a)return;state50.microwave.open=open;tween(a.userData.k50Door.rotation,'y',open?-Math.PI*.52:0);
}

setupFridge();setupOven();

const host=document.createElement('div');
host.className='k50-floating';
host.innerHTML=`<button class="k50-main">⚙️ Kitchen 5.0</button><div class="k50-menu hidden">
  <div class="k50-tabs">
    <button data-k50="fridge">🧊 Fridge</button><button data-k50="oven">🔥 Oven</button>
    <button data-k50="airfryer">🍟 Air Fryer</button><button data-k50="microwave">📡 Microwave</button>
    <button data-k50="stove">🍳 Stove</button><button data-k50="coffee">☕ Coffee</button>
    <button data-k50="kettle">🫖 Kettle</button><button data-k50="cook">🥘 Cooking</button>
  </div>
  <div class="k50-detail"></div>
</div>`;
document.querySelector('.workarea')?.appendChild(host);
const main=host.querySelector('.k50-main'),menu=host.querySelector('.k50-menu'),detail=host.querySelector('.k50-detail');
main.onclick=()=>menu.classList.toggle('hidden');

function slider(label,min,max,value,suffix=''){
  return `<label>${label}<b data-val>${value}${suffix}</b><input type="range" min="${min}" max="${max}" value="${value}"></label>`;
}
function render(tab){
  host.querySelectorAll('[data-k50]').forEach(b=>b.classList.toggle('active',b.dataset.k50===tab));
  if(tab==='fridge'){
    detail.innerHTML=`<h3>Fridge</h3><div class="k50-row"><button id="k50Top">${state50.fridge.top?'Close':'Open'} upper</button><button id="k50Bottom">${state50.fridge.bottom?'Close':'Open'} freezer</button></div>
    ${slider('Fridge temperature',1,7,state50.fridge.temp,'°C')}${slider('Freezer temperature',-24,-14,state50.fridge.freezer,'°C')}
    <button class="accent" id="k50Inventory">🥕 Open fridge inventory</button>`;
    const ranges=detail.querySelectorAll('input');const vals=detail.querySelectorAll('[data-val]');
    ranges[0].oninput=e=>{state50.fridge.temp=+e.target.value;vals[0].textContent=e.target.value+'°C'};
    ranges[1].oninput=e=>{state50.fridge.freezer=+e.target.value;vals[1].textContent=e.target.value+'°C'};
    detail.querySelector('#k50Top').onclick=()=>{setFridgeDoor('top',!state50.fridge.top);render('fridge')};
    detail.querySelector('#k50Bottom').onclick=()=>{setFridgeDoor('bottom',!state50.fridge.bottom);render('fridge')};
    detail.querySelector('#k50Inventory').onclick=()=>post('kitchen-cooking-open',{tab:'fridge'});
  } else if(tab==='oven'){
    detail.innerHTML=`<h3>Oven</h3><button id="k50OvenDoor">${state50.oven.open?'Close':'Open'} oven door</button>
    ${slider('Temperature',80,250,state50.oven.temp,'°C')}${slider('Timer',0,180,state50.oven.timer,' min')}
    <select id="k50OvenMode"><option>Bake</option><option>Fan</option><option>Grill</option></select><button class="accent" id="k50OvenStart">Start</button>`;
    const rr=detail.querySelectorAll('input'),vv=detail.querySelectorAll('[data-val]');
    rr[0].oninput=e=>{state50.oven.temp=+e.target.value;vv[0].textContent=e.target.value+'°C'};
    rr[1].oninput=e=>{state50.oven.timer=+e.target.value;vv[1].textContent=e.target.value+' min'};
    detail.querySelector('#k50OvenMode').value=state50.oven.mode;
    detail.querySelector('#k50OvenMode').onchange=e=>state50.oven.mode=e.target.value;
    detail.querySelector('#k50OvenDoor').onclick=()=>{setOvenDoor(!state50.oven.open);render('oven')};
    detail.querySelector('#k50OvenStart').onclick=()=>toast(`Oven ${state50.oven.temp}°C · ${state50.oven.mode} · ${state50.oven.timer} min 🔥`);
  } else if(tab==='airfryer'){
    const owned=!!assetMap.get('airfryer_01');
    detail.innerHTML=`<h3>Air Fryer</h3>${owned?`<button id="k50AirDoor">${state50.airfryer.open?'Push drawer in':'Pull drawer out'}</button>${slider('Temperature',80,200,state50.airfryer.temp,'°C')}${slider('Timer',0,60,state50.airfryer.timer,' min')}<select id="k50AirMode"><option>Air Fry</option><option>Bake</option><option>Reheat</option></select><button class="accent" id="k50AirStart">Start</button>`:'<p>还没购买 Air Fryer。到 Shop 购买后再 Place 到台面。</p>'}`;
    if(owned){
      const rr=detail.querySelectorAll('input'),vv=detail.querySelectorAll('[data-val]');
      rr[0].oninput=e=>{state50.airfryer.temp=+e.target.value;vv[0].textContent=e.target.value+'°C'};
      rr[1].oninput=e=>{state50.airfryer.timer=+e.target.value;vv[1].textContent=e.target.value+' min'};
      detail.querySelector('#k50AirMode').value=state50.airfryer.mode;detail.querySelector('#k50AirMode').onchange=e=>state50.airfryer.mode=e.target.value;
      detail.querySelector('#k50AirDoor').onclick=()=>{setAirDrawer(!state50.airfryer.open);render('airfryer')};
      detail.querySelector('#k50AirStart').onclick=()=>toast(`Air Fryer ${state50.airfryer.temp}°C · ${state50.airfryer.timer} min 🍟`);
    }
  } else if(tab==='microwave'){
    const owned=!!assetMap.get('microwave_01');
    detail.innerHTML=`<h3>Microwave</h3>${owned?`<button id="k50MwDoor">${state50.microwave.open?'Close':'Open'} door</button>${slider('Power',1,10,state50.microwave.power)}${slider('Timer',0,600,state50.microwave.timer,' sec')}<button class="accent" id="k50MwStart">Start</button>`:'<p>还没购买 Microwave。到 Shop 购买后再 Place 到台面。</p>'}`;
    if(owned){
      const rr=detail.querySelectorAll('input'),vv=detail.querySelectorAll('[data-val]');
      rr[0].oninput=e=>{state50.microwave.power=+e.target.value;vv[0].textContent=e.target.value};
      rr[1].oninput=e=>{state50.microwave.timer=+e.target.value;vv[1].textContent=e.target.value+' sec'};
      detail.querySelector('#k50MwDoor').onclick=()=>{setMicrowaveDoor(!state50.microwave.open);render('microwave')};
      detail.querySelector('#k50MwStart').onclick=()=>toast(`Microwave power ${state50.microwave.power} · ${state50.microwave.timer}s`);
    }
  } else if(tab==='stove'){
    detail.innerHTML=`<h3>Stove</h3><select id="k50Burner"><option value="0">Front left</option><option value="1">Front right</option><option value="2">Back left</option><option value="3">Back right</option></select>${slider('Heat level',0,9,state50.stove.level)}<button class="accent" id="k50StoveStart">Apply heat</button>`;
    detail.querySelector('#k50Burner').value=state50.stove.burner;detail.querySelector('#k50Burner').onchange=e=>state50.stove.burner=+e.target.value;
    const rr=detail.querySelector('input'),vv=detail.querySelector('[data-val]');rr.oninput=e=>{state50.stove.level=+e.target.value;vv.textContent=e.target.value};
    detail.querySelector('#k50StoveStart').onclick=()=>toast(`Burner ${state50.stove.burner+1} · Heat ${state50.stove.level}/9 🍳`);
  } else if(tab==='coffee'){
    detail.innerHTML=`<h3>Coffee Machine</h3><select id="k50Drink"><option>Espresso</option><option>Americano</option><option>Latte</option><option>Hot Water</option></select><button class="accent" id="k50Brew">Brew</button>`;
    detail.querySelector('#k50Drink').value=state50.coffee.drink;detail.querySelector('#k50Drink').onchange=e=>state50.coffee.drink=e.target.value;detail.querySelector('#k50Brew').onclick=()=>toast(`${state50.coffee.drink} brewing ☕`);
  } else if(tab==='kettle'){
    detail.innerHTML=`<h3>Kettle</h3>${slider('Water temperature',60,100,state50.kettle.temp,'°C')}<button class="accent" id="k50Boil">Start kettle</button>`;
    const rr=detail.querySelector('input'),vv=detail.querySelector('[data-val]');rr.oninput=e=>{state50.kettle.temp=+e.target.value;vv.textContent=e.target.value+'°C'};detail.querySelector('#k50Boil').onclick=()=>toast(`Heating to ${state50.kettle.temp}°C 🫖`);
  } else if(tab==='cook'){
    detail.innerHTML=`<h3>Cooking System</h3><p>Fridge → Take ingredients → Counter → Recipe → Mini-game → Plate.</p><button class="accent" id="k50Cook">Open recipes</button>`;
    detail.querySelector('#k50Cook').onclick=()=>post('kitchen-cooking-open',{tab:'recipes'});
  }
}
host.querySelectorAll('[data-k50]').forEach(b=>b.onclick=()=>render(b.dataset.k50));
render('fridge');

window.KITCHEN_3D_GAMEPLAY_50={version:'5.0',setupFridge,setFridgeDoor,setupOven,setOvenDoor,render};
console.log('Kitchen 5.0 appliance gameplay loaded');