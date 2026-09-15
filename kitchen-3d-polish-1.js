(()=>{
  const body=document.body;
  const topActions=document.querySelector('.topbar .actions');
  const assetPanel=document.querySelector('.asset-panel');
  const assetList=document.getElementById('assetList');
  const shopPanel=document.getElementById('shopPanel');
  const shopGrid=document.getElementById('shopGrid');
  const shopCoins=document.getElementById('shopCoins');
  if(!topActions||!assetPanel||!assetList)return;

  // 1) Life / Decor mode + lighting presets
  const controls=document.createElement('div');controls.className='k13-controls';
  controls.innerHTML=`<button class="k13-mode life" data-k13-mode="life">♡ Life Mode</button><button class="k13-mode active" data-k13-mode="decor">🛠 Decor</button><button class="k13-light active" data-k13-light="day">☀ Day</button><button class="k13-light" data-k13-light="evening">🌇 Evening</button><button class="k13-light" data-k13-light="night">🌙 Night</button>`;
  topActions.prepend(controls);
  function setMode(mode){body.classList.toggle('k13-life',mode==='life');controls.querySelectorAll('[data-k13-mode]').forEach(b=>b.classList.toggle('active',b.dataset.k13Mode===mode));localStorage.setItem('kitchen13Mode',mode)}
  function setLight(v){body.classList.toggle('k13-evening',v==='evening');body.classList.toggle('k13-night',v==='night');controls.querySelectorAll('[data-k13-light]').forEach(b=>b.classList.toggle('active',b.dataset.k13Light===v));localStorage.setItem('kitchen13Light',v)}
  controls.querySelectorAll('[data-k13-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.k13Mode));
  controls.querySelectorAll('[data-k13-light]').forEach(b=>b.onclick=()=>setLight(b.dataset.k13Light));
  setMode(localStorage.getItem('kitchen13Mode')||'decor');setLight(localStorage.getItem('kitchen13Light')||'day');

  // 2) Search + type filter for independent elements
  const searchWrap=document.createElement('div');searchWrap.className='k13-search-wrap';
  searchWrap.innerHTML=`<input class="k13-search" placeholder="搜索家具 / 电器…"><div class="k13-filter-row"><button class="k13-filter active" data-k13-filter="all">全部</button><button class="k13-filter" data-k13-filter="appliance">电器</button><button class="k13-filter" data-k13-filter="cabinet">柜体</button><button class="k13-filter" data-k13-filter="furniture">家具</button><button class="k13-filter" data-k13-filter="decor">装饰</button><button class="k13-filter" data-k13-filter="lighting">灯光</button></div>`;
  const sub=assetPanel.querySelector('.panel-sub');(sub||assetPanel.firstElementChild)?.insertAdjacentElement('afterend',searchWrap);
  let assetFilter='all';const search=searchWrap.querySelector('.k13-search');
  function applyAssetFilter(){const q=(search.value||'').trim().toLowerCase();assetList.querySelectorAll('.asset-item').forEach(item=>{const txt=item.textContent.toLowerCase();let ok=!q||txt.includes(q);if(ok&&assetFilter!=='all')ok=txt.includes(assetFilter==='cabinet'?'cabinet':assetFilter==='appliance'?'appliance':assetFilter==='furniture'?'furniture':assetFilter==='decor'?'decor':'lighting');item.classList.toggle('k13-hidden',!ok)})}
  search.addEventListener('input',applyAssetFilter);searchWrap.querySelectorAll('[data-k13-filter]').forEach(b=>b.onclick=()=>{assetFilter=b.dataset.k13Filter;searchWrap.querySelectorAll('[data-k13-filter]').forEach(x=>x.classList.toggle('active',x===b));applyAssetFilter()});
  new MutationObserver(applyAssetFilter).observe(assetList,{childList:true,subtree:true});

  // 3) Save/status pill and edit hint
  const status=document.createElement('div');status.className='k13-status';status.innerHTML='<span class="k13-dot"></span><span>自动保存开启 · 家具与小家电位置会保留</span>';document.querySelector('.workarea')?.appendChild(status);
  const hint=document.createElement('div');hint.className='k13-hint';hint.textContent='Tip：先选物件 → Move / Rotate；小家电可 Store 回 Inventory';document.querySelector('.workarea')?.appendChild(hint);

  // 4) Shop quality-of-life: search and affordability feedback
  if(shopPanel&&shopGrid){const toolbar=document.createElement('div');toolbar.className='k13-shop-toolbar';toolbar.innerHTML='<input class="k13-shop-search" placeholder="搜索 Air Fryer / Blender / Coffee…">';shopGrid.parentElement.insertBefore(toolbar,shopGrid);const shopSearch=toolbar.querySelector('input');
    function polishShop(){const q=(shopSearch.value||'').trim().toLowerCase();const coins=Number((shopCoins?.textContent||'0').replace(/[^0-9.-]/g,''))||0;shopGrid.querySelectorAll('.shop-card').forEach(card=>{const text=card.textContent.toLowerCase();card.classList.toggle('k13-match-hide',!!q&&!text.includes(q));const price=Number((card.querySelector('.price')?.textContent||'0').replace(/[^0-9]/g,''))||0;const buy=card.querySelector('[data-buy]');const already=!!buy?.disabled;card.classList.toggle('k13-unaffordable',!already&&price>coins);if(buy&&!already){buy.title=price>coins?`还差 ${price-coins} Coins`:'可以买 ♡'}})}
    shopSearch.addEventListener('input',polishShop);new MutationObserver(polishShop).observe(shopGrid,{childList:true,subtree:true});if(shopCoins)new MutationObserver(polishShop).observe(shopCoins,{childList:true,characterData:true,subtree:true});polishShop();
  }

  // 5) Keyboard shortcuts for faster decorating
  window.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;if(e.key==='1')setMode('life');if(e.key==='2')setMode('decor');if(e.key.toLowerCase()==='l'){const order=['day','evening','night'];const cur=body.classList.contains('k13-night')?'night':body.classList.contains('k13-evening')?'evening':'day';setLight(order[(order.indexOf(cur)+1)%3])}});

  window.KITCHEN_3D_POLISH_13={version:'1.3',setMode,setLight};
})();