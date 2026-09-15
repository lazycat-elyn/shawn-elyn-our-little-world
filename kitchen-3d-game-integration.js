(()=>{
  const scene=document.getElementById('scene');
  const tabs=document.getElementById('roomTabs');
  if(!scene||!tabs)return;

  const PRICE={airfryer_01:650,blender_01:520,microwave_01:780,ricecooker_01:600,coffee_01:900,kettle_01:350,toaster_01:420};
  const LABEL={airfryer_01:'空气炸锅',blender_01:'果汁机',microwave_01:'微波炉',ricecooker_01:'电饭锅',coffee_01:'咖啡机',kettle_01:'热水壶',toaster_01:'烤面包机'};
  let frame=null,badge=null,lastRoom='';

  function activeRoom(){return tabs.querySelector('button.active')?.dataset.room||''}
  function gameData(){
    if(typeof state==='undefined')return null;
    state.kitchenAppliancesOwned=Array.isArray(state.kitchenAppliancesOwned)?state.kitchenAppliancesOwned:[];
    state.kitchenApplianceLayout=state.kitchenApplianceLayout&&typeof state.kitchenApplianceLayout==='object'?state.kitchenApplianceLayout:{};
    return state;
  }
  function sendToKitchen(payload,target){
    const w=target||frame?.contentWindow;
    if(!w)return;
    w.postMessage({source:'shawn-elyn-parent',...payload},'*');
  }
  function sendState(target){
    const s=gameData();
    if(!s)return;
    sendToKitchen({type:'kitchen-appliance-state',coins:s.coins||0,owned:[...s.kitchenAppliancesOwned],layout:{...s.kitchenApplianceLayout}},target);
  }
  function ensureFrame(){
    if(frame)return;
    frame=document.createElement('iframe');
    frame.className='k3d-game-frame';
    frame.title='Kitchen 3D Modular Editor 1.2';
    frame.src='./kitchen-3d-modular-1-2.html?embed=1&v=1201';
    frame.allow='fullscreen';
    frame.addEventListener('load',()=>setTimeout(()=>sendState(frame.contentWindow),100));
    badge=document.createElement('div');
    badge.className='k3d-game-badge';
    badge.textContent='3D MODULAR KITCHEN 1.2 · 🛍️ Shop · 📦 Inventory · 每件物件独立';
    scene.append(frame,badge);
  }
  function showKitchen3D(){ensureFrame();scene.classList.add('k3d-game-active');frame.style.display='block';badge.style.display='block';sendState()}
  function hideKitchen3D(){scene.classList.remove('k3d-game-active');if(frame)frame.style.display='none';if(badge)badge.style.display='none'}
  function sync(){const room=activeRoom();if(room===lastRoom)return;lastRoom=room;if(room==='kitchen')showKitchen3D();else hideKitchen3D()}

  window.addEventListener('message',e=>{
    const d=e.data;
    if(!d||d.source!=='kitchen3d')return;
    const s=gameData();
    if(!s)return;
    if(d.type==='kitchen-appliance-query'){sendState(e.source);return}
    if(d.type==='kitchen-appliance-buy'){
      const id=d.id,cost=PRICE[id];
      if(!cost){sendToKitchen({type:'kitchen-appliance-buy-result',ok:false,id,message:'找不到这个电器'},e.source);return}
      if(s.kitchenAppliancesOwned.includes(id)){sendToKitchen({type:'kitchen-appliance-buy-result',ok:true,id,message:'已经拥有'},e.source);sendState(e.source);return}
      if((s.coins||0)<cost){sendToKitchen({type:'kitchen-appliance-buy-result',ok:false,id,message:`Coins 不够，需要 ${cost}`},e.source);return}
      s.coins-=cost;
      s.kitchenAppliancesOwned.push(id);
      s.kitchenApplianceLayout[id]=s.kitchenApplianceLayout[id]||{placed:false};
      if(typeof save==='function')save();
      if(typeof renderTaskUI==='function')renderTaskUI();
      if(typeof rewardPop==='function')rewardPop(`🛍️ 买到 ${LABEL[id]} · -${cost} Coins`);
      sendToKitchen({type:'kitchen-appliance-buy-result',ok:true,id},e.source);
      sendState(e.source);
      return;
    }
    if(d.type==='kitchen-appliance-layout'){
      if(!s.kitchenAppliancesOwned.includes(d.id)||!d.layout)return;
      s.kitchenApplianceLayout[d.id]={placed:!!d.layout.placed,p:Array.isArray(d.layout.p)?d.layout.p.slice(0,3):undefined,r:Array.isArray(d.layout.r)?d.layout.r.slice(0,3):undefined};
      if(typeof save==='function')save();
      return;
    }
    if(d.type==='kitchen-appliance-use'){
      const id=d.id;
      if(typeof recordEvent==='function')recordEvent('useKitchenAppliance',1);
      if(typeof toast==='function')toast(`${LABEL[id]||'厨房电器'} · 使用中 ♡`);
    }
  });

  tabs.addEventListener('click',()=>setTimeout(sync,0));
  new MutationObserver(sync).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class']});
  setInterval(sync,500);
  setTimeout(sync,50);
  window.KITCHEN_3D_GAME_INTEGRATION={version:'1.2.1',show:showKitchen3D,hide:hideKitchen3D,syncState:sendState};
})();
