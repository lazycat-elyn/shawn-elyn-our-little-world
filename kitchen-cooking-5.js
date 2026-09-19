(()=>{
  const VERSION='5.0';
  const FOODS={
    milk:{label:'Milk 牛奶',qty:3},egg:{label:'Eggs 鸡蛋',qty:6},tomato:{label:'Tomato 番茄',qty:4},
    carrot:{label:'Carrot 胡萝卜',qty:4},mushroom:{label:'Mushrooms 蘑菇',qty:5},cheese:{label:'Cheese 芝士',qty:3},
    butter:{label:'Butter 牛油',qty:3},chicken:{label:'Chicken 鸡肉',qty:3},rice:{label:'Rice 米饭',qty:5},
    pasta:{label:'Pasta 意面',qty:4},noodles:{label:'Noodles 拉面',qty:4},potato:{label:'Potato 马铃薯',qty:4},
    curry:{label:'Curry Block 咖喱块',qty:3},soy:{label:'Soy Sauce 酱油',qty:5},oil:{label:'Cooking Oil 食用油',qty:5},
    fries:{label:'Frozen Fries 薯条',qty:4},nuggets:{label:'Nuggets 鸡块',qty:4},leftovers:{label:'Leftovers 剩菜',qty:2}
  };
  const RECIPES={
    fried_rice:{label:'Fried Rice 炒饭',appliance:'Stove',ings:['rice','egg','carrot','soy','oil'],steps:['Chop','Heat','Stir','Season','Plate']},
    creamy_pasta:{label:'Creamy Pasta 奶油意面',appliance:'Stove',ings:['pasta','milk','mushroom','cheese','butter'],steps:['Boil','Chop','Stir','Heat','Plate']},
    omelette:{label:'Omelette 蛋卷',appliance:'Stove',ings:['egg','milk','cheese','butter'],steps:['Mix','Heat','Flip','Season','Plate']},
    tomato_egg:{label:'Tomato & Egg 番茄炒蛋',appliance:'Stove',ings:['egg','tomato','oil'],steps:['Chop','Mix','Heat','Stir','Plate']},
    ramen:{label:'Ramen 拉面',appliance:'Stove',ings:['noodles','egg','mushroom'],steps:['Boil','Add','Timer','Season','Plate']},
    japanese_curry:{label:'Japanese Curry 日式咖喱',appliance:'Stove',ings:['chicken','potato','carrot','curry','rice'],steps:['Chop','Heat','Stir','Timer','Plate']},
    mushroom_soup:{label:'Mushroom Soup 蘑菇汤',appliance:'Stove',ings:['mushroom','milk','butter'],steps:['Chop','Stir','Heat','Blend','Plate']},
    air_fryer_fries:{label:'Air Fryer Fries 气炸薯条',appliance:'Air Fryer',ings:['fries','oil'],steps:['Season','Air Fry','Timer','Plate']},
    air_fryer_nuggets:{label:'Air Fryer Nuggets 气炸鸡块',appliance:'Air Fryer',ings:['nuggets'],steps:['Load','Air Fry','Timer','Plate']}
  };

  let root=null,activeTab='fridge',selectedRecipe='fried_rice',stepIndex=0,taps=0,timer=null;

  function S(){
    if(typeof state==='undefined')return null;
    state.kitchenFoodInventory=state.kitchenFoodInventory&&typeof state.kitchenFoodInventory==='object'?state.kitchenFoodInventory:{};
    for(const [k,v] of Object.entries(FOODS)){
      if(typeof state.kitchenFoodInventory[k]!=='number')state.kitchenFoodInventory[k]=v.qty;
    }
    state.kitchenCounterFood=Array.isArray(state.kitchenCounterFood)?state.kitchenCounterFood:[];
    state.kitchenCookingVersion=VERSION;
    return state;
  }
  function persist(){if(typeof save==='function')save()}
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function counter(){const s=S();return s?s.kitchenCounterFood:[]}
  function have(k){return counter().includes(k)}
  function take(k){
    const s=S();if(!s)return;
    if(have(k)){s.kitchenCounterFood=s.kitchenCounterFood.filter(x=>x!==k)}
    else if((s.kitchenFoodInventory[k]||0)>0)s.kitchenCounterFood.push(k);
    persist();render();
  }
  function canCook(r){const s=S();return !!s&&r.ings.every(k=>have(k)&&(s.kitchenFoodInventory[k]||0)>0)}
  function send3D(action,data={}){window.postMessage({source:'shawn-elyn-parent',type:'kitchen-cooking-action',action,...data},'*')}
  function awardMeal(r){
    const s=S();if(!s)return;
    for(const k of r.ings){
      s.kitchenFoodInventory[k]=Math.max(0,(s.kitchenFoodInventory[k]||0)-1);
      s.kitchenCounterFood=s.kitchenCounterFood.filter(x=>x!==k);
    }
    s.coins=(s.coins||0)+12;
    if(typeof recordEvent==='function')recordEvent('cookMeal',1);
    if(typeof rewardPop==='function')rewardPop(`🍽️ ${r.label} 完成 · +12 Coins`);
    if(typeof toast==='function')toast(`${r.label} 完成 ♡`);
    persist();
  }
  function close(){if(root)root.classList.add('hidden');clearInterval(timer);timer=null}
  function open(tab='fridge'){activeTab=tab;if(!root)build();root.classList.remove('hidden');render();send3D('open-kitchen-ui',{tab})}
  function build(){
    root=document.createElement('div');
    root.id='kitchenCooking5';
    root.className='kc5 hidden';
    root.innerHTML=`<div class="kc5-shell">
      <div class="kc5-head"><div><b>Kitchen 5.0</b><span>Fridge & Cooking System</span></div><button id="kc5Close">✕</button></div>
      <div class="kc5-tabs">
        <button data-tab="fridge">🧊 Fridge</button><button data-tab="recipes">🍳 Recipes</button><button data-tab="appliances">🔥 Appliances</button>
      </div>
      <div id="kc5Body"></div>
    </div>`;
    (document.getElementById('modalRoot')||document.body).appendChild(root);
    root.querySelector('#kc5Close').onclick=close;
    root.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{activeTab=b.dataset.tab;render()});
    root.addEventListener('click',e=>{if(e.target===root)close()});
  }
  function fridgeHTML(){
    const s=S();if(!s)return '';
    const cards=Object.entries(FOODS).map(([k,v])=>`<button class="kc5-food ${have(k)?'on':''}" data-food="${k}">
      <span>${esc(v.label)}</span><small>x${s.kitchenFoodInventory[k]||0}</small><em>${have(k)?'On counter':'Take'}</em>
    </button>`).join('');
    const counterTags=s.kitchenCounterFood.length?s.kitchenCounterFood.map(k=>`<span>${esc(FOODS[k]?.label||k)}</span>`).join(''):'<i>Counter is empty</i>';
    return `<section class="kc5-fridge-view">
      <div class="kc5-fridge-visual">
        <div class="kc5-fridge-title">FRIDGE <span>4°C</span></div>
        <div class="kc5-shelf"><b>Top Shelf</b><span>Milk · Eggs · Tomato</span></div>
        <div class="kc5-shelf"><b>Middle Shelf</b><span>Mushroom · Cheese · Butter · Chicken</span></div>
        <div class="kc5-shelf"><b>Lower Shelf</b><span>Rice · Pasta · Noodles · Vegetables</span></div>
        <div class="kc5-freezer"><b>FREEZER −18°C</b><span>Fries · Nuggets</span></div>
      </div>
      <div><h3>Ingredients</h3><div class="kc5-food-grid">${cards}</div></div>
      <div class="kc5-counter"><b>Counter</b><div>${counterTags}</div><button id="kc5ReturnAll">Return all</button></div>
    </section>`;
  }
  function recipesHTML(){
    const cards=Object.entries(RECIPES).map(([k,r])=>{
      const tags=r.ings.map(i=>`<span class="${have(i)?'ok':'miss'}">${esc(FOODS[i].label.split(' ')[0])}</span>`).join('');
      return `<button class="kc5-recipe ${selectedRecipe===k?'active':''}" data-recipe="${k}"><b>${esc(r.label)}</b><small>${esc(r.appliance)}</small><div>${tags}</div></button>`;
    }).join('');
    const r=RECIPES[selectedRecipe];
    const ready=canCook(r);
    let cook='';
    if(stepIndex>=r.steps.length){
      cook=`<div class="kc5-step done"><span>Finished</span><strong>🍽️ ${esc(r.label)}</strong><p>Meal plated successfully.</p></div><button id="kc5Again">Cook again</button>`;
    }else{
      const step=r.steps[stepIndex],pct=Math.min(100,taps/4*100);
      cook=`<div class="kc5-step"><span>Step ${stepIndex+1} / ${r.steps.length}</span><strong>${esc(step)}</strong><div class="kc5-progress"><i style="width:${pct}%"></i></div><p>${ready?'Ingredients ready.':'Take every missing ingredient from the fridge first.'}</p></div>
      <button id="kc5DoStep" class="primary" ${ready?'':'disabled'}>${['Heat','Boil','Timer','Air Fry'].includes(step)?'Start '+esc(step):'Do '+esc(step)}</button>`;
    }
    return `<section class="kc5-recipes"><div class="kc5-recipe-list">${cards}</div><div class="kc5-cook-panel">${cook}</div></section>`;
  }
  function appliancesHTML(){
    return `<section class="kc5-appliances">
      <button data-app="fridge"><b>🧊 Fridge</b><span>Open doors · temperature · inventory</span></button>
      <button data-app="oven"><b>🔥 Oven</b><span>80–250°C · Bake · Fan · Grill · Timer</span></button>
      <button data-app="stove"><b>🍳 Stove</b><span>4 burners · heat level 0–9</span></button>
      <button data-app="airfryer"><b>🍟 Air Fryer</b><span>80–200°C · Air Fry · Bake · Reheat</span></button>
      <button data-app="microwave"><b>📡 Microwave</b><span>Power · timer · open door</span></button>
      <button data-app="coffee"><b>☕ Coffee Machine</b><span>Espresso · Americano · Latte · Hot Water</span></button>
      <button data-app="kettle"><b>🫖 Kettle</b><span>60–100°C</span></button>
    </section>`;
  }
  function render(){
    if(!root)return;
    root.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===activeTab));
    const body=root.querySelector('#kc5Body');
    body.innerHTML=activeTab==='fridge'?fridgeHTML():activeTab==='recipes'?recipesHTML():appliancesHTML();

    body.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>take(b.dataset.food));
    const ra=body.querySelector('#kc5ReturnAll');if(ra)ra.onclick=()=>{const s=S();s.kitchenCounterFood=[];persist();render()};
    body.querySelectorAll('[data-recipe]').forEach(b=>b.onclick=()=>{selectedRecipe=b.dataset.recipe;stepIndex=0;taps=0;render()});
    const again=body.querySelector('#kc5Again');if(again)again.onclick=()=>{stepIndex=0;taps=0;render()};
    const stepBtn=body.querySelector('#kc5DoStep');
    if(stepBtn)stepBtn.onclick=()=>{
      const r=RECIPES[selectedRecipe],step=r.steps[stepIndex];
      if(['Heat','Boil','Timer','Air Fry'].includes(step)){
        stepBtn.disabled=true;let n=3;stepBtn.textContent=`${step} ${n}s`;
        clearInterval(timer);timer=setInterval(()=>{n--;stepBtn.textContent=`${step} ${n}s`;if(n<=0){clearInterval(timer);timer=null;stepIndex++;taps=0;if(stepIndex>=r.steps.length)awardMeal(r);render()}},1000);
      }else{
        taps++;if(taps>=4){stepIndex++;taps=0;if(stepIndex>=r.steps.length)awardMeal(r)}render();
      }
    };
    body.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>{
      const app=b.dataset.app;send3D('use-appliance',{appliance:app});
      if(typeof toast==='function')toast(`${b.querySelector('b').textContent} · Ready ♡`);
    });
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root&&!root.classList.contains('hidden'))close()});
  window.KITCHEN_COOKING_5={version:VERSION,open,close,render};
})();