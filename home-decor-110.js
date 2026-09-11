(()=>{
'use strict';

const V=110;
const ROOM_LABELS={living:'客厅',kitchen:'厨房',bedroom:'卧室',bathroom:'浴室',study:'书房',closet:'衣帽间',balcony:'阳台'};
const ACTOR_POS={
 living:{elyn:[43,69],shawn:[68,70],bubu:[31,78],dudu:[76,80]},
 kitchen:{elyn:[35,70],shawn:[76,69],bubu:[28,81],dudu:[82,80]},
 bedroom:{elyn:[38,76],shawn:[69,76],bubu:[24,78],dudu:[79,79]},
 bathroom:{elyn:[31,78],shawn:[74,78],bubu:[23,80],dudu:[80,80]},
 study:{elyn:[37,67],shawn:[67,67],bubu:[77,79],dudu:[24,79]},
 closet:{elyn:[40,73],shawn:[70,74],bubu:[26,80],dudu:[80,80]},
 balcony:{elyn:[38,73],shawn:[68,73],bubu:[27,80],dudu:[78,80]}
};
const ROOM_HINTS={
 living:'沙发、茶几、电视柜、地毯和植物都可以真的购买与替换',
 kitchen:'餐桌、餐椅、中岛、冰箱、灯具都保留厨房玩法并可替换',
 bedroom:'床、床头柜、灯具、衣柜与软装都可更换',
 bathroom:'洗手台、淋浴、马桶、收纳与浴室装饰可替换',
 study:'Elyn + Shawn 两张书桌固定保留，家具可分别更换',
 closet:'衣柜、展示柜、中岛、镜子与软凳都可布置',
 balcony:'户外沙发、椅子、圆桌、花箱与串灯都可购买布置'
};

function q(s,r=document){return r.querySelector(s)}
function qa(s,r=document){return [...r.querySelectorAll(s)]}
function currentRoom(ov){return q('[data-hd-room].active',ov)?.dataset.hdRoom||'living'}
function sprite(person){return `./assets/sprites_clean_v262/${person}-idle.png?v=262`}
function petSprite(pet){return `./assets/sprites/${pet}-idle.png`}
function positionStyle(p){return `left:${p[0]}%;top:${p[1]}%`}

function actorMarkup(room){
 const p=ACTOR_POS[room]||ACTOR_POS.living;
 return `<div class="hd110-people" aria-hidden="true">
   <div class="hd110-person elyn" style="${positionStyle(p.elyn)}"><img src="${sprite('elyn')}"><span>😊</span><b>Elyn</b></div>
   <div class="hd110-person shawn" style="${positionStyle(p.shawn)}"><img src="${sprite('shawn')}"><span>😊</span><b>Shawn</b></div>
   <div class="hd110-pet bubu" style="${positionStyle(p.bubu)}"><img src="${petSprite('bubu')}"><span>Bubu</span></div>
   <div class="hd110-pet dudu" style="${positionStyle(p.dudu)}"><img src="${petSprite('dudu')}"><span>Dudu</span></div>
  </div>`;
}

function ensureVisualChrome(ov){
 if(!ov)return;
 const room=currentRoom(ov);ov.dataset.hdVisual='110';ov.dataset.hdRoom=room;
 const stage=q('#hdStage',ov);if(!stage)return;stage.dataset.hdRoom=room;
 const roomName=q('#hdRoomName',ov);if(roomName)roomName.innerHTML=`<b>${ROOM_LABELS[room]}</b><span>${ROOM_HINTS[room]}</span>`;
 let hero=q('.hd110-hero',stage);
 if(!hero){hero=document.createElement('div');hero.className='hd110-hero';stage.prepend(hero)}
 hero.innerHTML=`<div class="hd110-room-chip"><small>HOME DECOR</small><strong>${ROOM_LABELS[room]}</strong><em>真实家具模式</em></div>${actorMarkup(room)}`;
 addSelectionActions(stage);
 improveCards(ov);
 improveHeader(ov);
}

function improveHeader(ov){
 const brand=q('.hd-brand',ov);if(brand)brand.innerHTML='<b>Shawn & Elyn</b><span>Our Little World · 全屋装修</span>';
 const preview=q('#hdPreviewBtn',ov);if(preview)preview.innerHTML='👁 <span>预览</span>';
 const save=q('#hdSave',ov);if(save)save.innerHTML='💾 <span>保存方案</span>';
 const back=q('#hdBackLife',ov);if(back)back.innerHTML='← 返回生活模式';
 const close=q('#hdCancelBtn',ov);if(close)close.setAttribute('aria-label','关闭装修');
}

function improveCards(ov){
 qa('.hd-card',ov).forEach(card=>{
  if(card.dataset.v110==='1')return;card.dataset.v110='1';
  const btn=q(':scope > button',card);const small=q('.hd-card-copy small',card);
  if(small){const t=small.textContent||'';small.innerHTML=t.replace(/(\d[\d,]*) Coins/g,'<strong class="hd110-price">🪙 $1</strong>')}
  if(btn&&btn.dataset.buy){btn.textContent=btn.disabled?'✓ 已拥有':btn.textContent.replace(/^购买\s*/,'购买 · ')+' → 摆放'}
 });
}

function addSelectionActions(stage){
 qa('.hd110-select-actions',stage).forEach(x=>x.remove());
 const selected=q('.hd-furniture.selected',stage);if(!selected)return;
 const box=document.createElement('div');box.className='hd110-select-actions';box.innerHTML='<button data-mini="done">✓</button><button data-mini="rotate">↻</button><button data-mini="remove">×</button>';
 selected.appendChild(box);
 q('[data-mini="done"]',box).onclick=e=>{e.stopPropagation();stage.click()};
 q('[data-mini="rotate"]',box).onclick=e=>{e.stopPropagation();q('#hdRotate')?.click()};
 q('[data-mini="remove"]',box).onclick=e=>{e.stopPropagation();q('#hdDelete')?.click()};
}

function bindAutoPlace(ov){
 if(ov.dataset.autoPlaceBound==='1')return;ov.dataset.autoPlaceBound='1';
 ov.addEventListener('click',e=>{
  const buy=e.target.closest('[data-buy]');
  if(!buy||buy.disabled)return;
  const id=buy.dataset.buy;
  setTimeout(()=>{
   if(!document.body.contains(ov))return;
   q('[data-hd-mode="owned"]',ov)?.click();
   setTimeout(()=>q(`[data-place="${CSS.escape(id)}"]`,ov)?.click(),30);
  },60);
 },true);
}

function refresh(ov){
 if(!ov||!document.body.contains(ov))return;
 ensureVisualChrome(ov);bindAutoPlace(ov);
}

let refreshTimer=0;
function schedule(ov){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>refresh(ov),0)}

const observer=new MutationObserver(muts=>{
 const ov=q('#homeDecorOverlay');
 if(!ov)return;
 if(muts.some(m=>m.target.closest?.('#homeDecorOverlay')||m.addedNodes.length))schedule(ov);
});
observer.observe(document.documentElement,{subtree:true,childList:true});

document.addEventListener('click',e=>{
 const ov=q('#homeDecorOverlay');if(!ov)return;
 if(e.target.closest('[data-hd-room],[data-hd-mode],[data-hd-cat],[data-hd-left],[data-place],[data-focus],#hdRotate,#hdDelete,#hdUndo,#hdDayNight'))schedule(ov);
});

function markEntry(){const b=q('#homeDecorBtn');if(b){b.textContent='🏠 装修';b.title='Home Decor 1.1 · 全屋真实家具装修'}}
function init(){markEntry();const ov=q('#homeDecorOverlay');if(ov)refresh(ov);setTimeout(markEntry,500);if(window.HomeDecor10){window.HomeDecor10.visualVersion=V}console.info('[Shawn & Elyn] Home Decor 1.1 visual rebuild active. Legacy gameplay untouched.');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();