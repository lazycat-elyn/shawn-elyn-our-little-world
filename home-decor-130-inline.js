(()=>{
'use strict';

const V=130;
const ELIGIBLE=['living','kitchen','bedroom','bathroom','study','closet','balcony'];
const LABELS={living:'客厅',kitchen:'厨房',bedroom:'卧室',bathroom:'浴室',study:'书房',closet:'衣帽间',balcony:'阳台'};
const ICONS={all:'▦',sofa:'🛋️',table:'▤',chair:'🪑',bed:'🛏️',kitchen:'🍳',storage:'▥',rug:'▭',plant:'🪴',pet:'🐾',lighting:'💡',wall:'🖼️',bath:'🛁',desk:'🖥️'};
const ui={active:false,room:null,selected:null,mode:'shop',category:'all',undo:[],placementSnapshot:null,roomModeSnapshot:null,drag:null};
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const clone=o=>JSON.parse(JSON.stringify(o));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const catalog=()=>window.HomeDecor10?.catalog||[];
const def=id=>catalog().find(x=>x.id===id);
const h=()=>typeof state!=='undefined'?(state.homeDecor=state.homeDecor||{}):null;
const roomList=()=>h()?.placements?.[ui.room]||[];
const findIns=id=>roomList().find(x=>x.instanceId===id);
const placedAll=id=>Object.values(h()?.placements||{}).reduce((n,a)=>n+(Array.isArray(a)?a.filter(x=>x.itemId===id).length:0),0);
function toastMsg(msg){if(typeof toast==='function')toast(msg);else console.log(msg)}
function saveGame(){try{if(typeof save==='function')save();if(typeof renderTaskUI==='function')renderTaskUI()}catch(e){console.warn('[HD130] save',e)}}
function removeLegacyOverlay(){q('#homeDecorOverlay')?.remove();document.body.classList.remove('home-decor-open','hd-preview-mode')}
function ensureRoomData(){const home=h();if(!home)return null;home.owned=home.owned||{};home.placements=home.placements||{};home.roomMode=home.roomMode||{};home.customRooms=home.customRooms||{};ELIGIBLE.forEach(r=>{home.placements[r]=Array.isArray(home.placements[r])?home.placements[r]:[];home.roomMode[r]=home.roomMode[r]||'day'});return home}
function refreshRoom(){window.HomeDecor12?.applyLifeRoom?.();requestAnimationFrame(()=>{markSelection();renderHeader();})}
function pushUndo(){const home=ensureRoomData();ui.undo.push({placements:clone(home.placements[ui.room]||[]),roomMode:home.roomMode[ui.room]});if(ui.undo.length>20)ui.undo.shift()}
function markSelection(){qa('#scene .hd-furniture').forEach(el=>{const on=ui.active&&el.dataset.hdInstance===ui.selected;el.classList.toggle('hd-inline-selected',on);if(on){const d=def(findIns(ui.selected)?.itemId);if(d)el.dataset.editName=d.name}else{delete el.dataset.editName}})}
function catsForRoom(){const set=new Set(catalog().filter(d=>d.rooms?.includes(ui.room)).map(d=>d.category));return ['all',...Object.keys(ICONS).filter(k=>k!=='all'&&set.has(k))]}
function modeItems(){const home=ensureRoomData();let arr=catalog().filter(d=>d.rooms?.includes(ui.room));if(ui.category!=='all')arr=arr.filter(d=>d.category===ui.category);if(ui.mode==='owned')arr=arr.filter(d=>(home.owned[d.id]||0)>0);if(ui.mode==='placed'){const ids=new Set((home.placements[ui.room]||[]).map(x=>x.itemId));arr=arr.filter(d=>ids.has(d.id))}return arr}
function availableCount(id){const home=ensureRoomData();return Math.max(0,(home.owned[id]||0)-placedAll(id))}
function cardButton(d){const home=ensureRoomData(),owned=home.owned[d.id]||0,placed=(home.placements[ui.room]||[]).filter(x=>x.itemId===d.id).length;if(ui.mode==='shop'){
  if(d.unique&&owned>0)return '<button disabled>已拥有</button>';
  return `<button data-buy="${d.id}">购买 🪙${d.price}</button>`;
 }
 if(ui.mode==='owned')return `<button data-place="${d.id}" ${availableCount(d.id)<=0?'disabled':''}>${availableCount(d.id)>0?'摆放':'已全部摆放'}</button>`;
 return `<button data-select-type="${d.id}" ${placed<=0?'disabled':''}>选择房内家具</button>`;
}
function renderDock(){const dock=q('#hdInlineDock');if(!dock)return;const cats=catsForRoom();dock.innerHTML=`
 <div class="hdi-tabs"><button data-mode="shop" class="${ui.mode==='shop'?'active':''}">商店</button><button data-mode="owned" class="${ui.mode==='owned'?'active':''}">已拥有</button><button data-mode="placed" class="${ui.mode==='placed'?'active':''}">已摆放</button></div>
 <div class="hdi-cats">${cats.map(c=>`<button data-cat="${c}" class="${ui.category===c?'active':''}"><span>${ICONS[c]||'•'}</span>${c==='all'?'全部':c}</button>`).join('')}</div>
 <div class="hdi-cards">${modeItems().map(d=>`<article class="hdi-card"><div class="hdi-thumb" style="--a:${d.primary||'#e9ddcf'};--b:${d.accent||'#9aae88'}"><span>${ICONS[d.category]||'◆'}</span></div><div><b>${d.name}</b><small>${ui.mode==='shop'?`🪙 ${d.price}`:`拥有 ${ensureRoomData().owned[d.id]||0} · 房内 ${(ensureRoomData().placements[ui.room]||[]).filter(x=>x.itemId===d.id).length}`}</small></div>${cardButton(d)}</article>`).join('')||'<div class="hdi-empty">这个分类暂时没有家具</div>'}</div>`;
}
function renderHeader(){const head=q('#hdInlineHead');if(!head)return;const ins=ui.selected?findIns(ui.selected):null,d=ins?def(ins.itemId):null;head.innerHTML=`<div><b>直接装修 · ${LABELS[ui.room]||ui.room}</b><span>${d?`已选：${d.name} · 直接拖动它`:'直接点击房间里的家具，再拖动、旋转或收起'}</span></div><div class="hdi-head-actions"><button id="hdiCancel">取消</button><button id="hdiSave">✓ 完成装修</button></div>`}
function makeUi(){q('#hdInlineHead')?.remove();q('#hdInlineTools')?.remove();q('#hdInlineDock')?.remove();const game=q('#gameScreen');if(!game)return;game.insertAdjacentHTML('beforeend',`<div id="hdInlineHead" class="hdi-head"></div><div id="hdInlineTools" class="hdi-tools"><button data-action="rotate">↻<span>旋转</span></button><button data-action="delete">⌫<span>收起</span></button><button data-action="undo">↶<span>撤销</span></button><button data-action="daynight">☼<span>昼夜</span></button></div><div id="hdInlineDock" class="hdi-dock"></div>`);renderHeader();renderDock()}
function enter(room){if(ui.active)return;if(!ELIGIBLE.includes(room)){toastMsg('这个区域暂时不能装修');return}removeLegacyOverlay();ensureRoomData();window.HomeDecor12?.activateRoom?.(room);ui.active=true;ui.room=room;ui.selected=null;ui.mode='shop';ui.category='all';ui.undo=[];ui.placementSnapshot=clone(h().placements[room]||[]);ui.roomModeSnapshot=h().roomMode[room];document.body.classList.add('hd-inline-active');window.HomeDecor12?.applyLifeRoom?.();makeUi();setTimeout(()=>{markSelection();renderDock()},30)}
function leave(saveChanges){if(!ui.active)return;const home=ensureRoomData();if(!saveChanges){home.placements[ui.room]=clone(ui.placementSnapshot||[]);home.roomMode[ui.room]=ui.roomModeSnapshot||'day'}else{home.customRooms[ui.room]=true;home.version=V;saveGame()}ui.active=false;ui.drag=null;ui.selected=null;document.body.classList.remove('hd-inline-active');q('#hdInlineHead')?.remove();q('#hdInlineTools')?.remove();q('#hdInlineDock')?.remove();removeLegacyOverlay();window.HomeDecor12?.applyLifeRoom?.();try{if(typeof renderHotspots==='function')renderHotspots()}catch(e){}toastMsg(saveChanges?'装修已保存 ♡':'已取消这次移动')}
function selectInstance(id){if(!findIns(id))return;ui.selected=id;markSelection();renderHeader()}
function buy(id){const d=def(id),home=ensureRoomData();if(!d)return;if(d.unique&&(home.owned[id]||0)>0){toastMsg('已经拥有这个家具');return}if((state.coins||0)<d.price){toastMsg(`Coins 不够，需要 ${d.price}`);return}state.coins-=d.price;home.owned[id]=(home.owned[id]||0)+1;saveGame();renderDock();renderHeader();toastMsg(`买到 ${d.name} · -${d.price} Coins`)}
function place(id){const d=def(id),home=ensureRoomData();if(!d||availableCount(id)<=0){toastMsg('没有可用数量，先购买家具');return}const list=home.placements[ui.room];if(d.maxPerRoom&&list.filter(x=>x.itemId===id).length>=d.maxPerRoom){toastMsg(`这个房间最多放 ${d.maxPerRoom} 个`);return}pushUndo();let x=50,y=64,rotation=0;if(d.replaceGroup){const old=list.find(x=>def(x.itemId)?.replaceGroup===d.replaceGroup);if(old){x=old.x;y=old.y;rotation=old.rotation||0}for(let i=list.length-1;i>=0;i--)if(def(list[i].itemId)?.replaceGroup===d.replaceGroup)list.splice(i,1)}else{const n=list.length;x=clamp(46+(n%4)*7,18,82);y=clamp(58+(n%3)*7,40,82)}const ins={instanceId:`hdi_${id}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`,itemId:id,x,y,rotation};list.push(ins);ui.selected=ins.instanceId;refreshRoom();renderDock();toastMsg(`已放入 ${d.name}，现在直接拖动它`)}
function rotate(){const ins=findIns(ui.selected);if(!ins){toastMsg('先点选一个家具');return}pushUndo();ins.rotation=((ins.rotation||0)+90)%360;refreshRoom()}
function removeSelected(){const list=roomList(),idx=list.findIndex(x=>x.instanceId===ui.selected);if(idx<0){toastMsg('先点选一个家具');return}pushUndo();list.splice(idx,1);ui.selected=null;refreshRoom();renderDock()}
function undo(){const last=ui.undo.pop();if(!last){toastMsg('没有可以撤销的操作');return}h().placements[ui.room]=clone(last.placements);h().roomMode[ui.room]=last.roomMode;ui.selected=null;refreshRoom();renderDock()}
function dayNight(){pushUndo();h().roomMode[ui.room]=h().roomMode[ui.room]==='night'?'day':'night';refreshRoom()}
function startDrag(e,el){const ins=findIns(el.dataset.hdInstance);if(!ins)return;pushUndo();selectInstance(ins.instanceId);const rect=q('#scene').getBoundingClientRect();ui.drag={id:ins.instanceId,rect,pointerId:e.pointerId};try{el.setPointerCapture(e.pointerId)}catch(_){ }e.preventDefault();e.stopImmediatePropagation()}
function moveDrag(e){if(!ui.active||!ui.drag)return;const ins=findIns(ui.drag.id);if(!ins)return;const r=ui.drag.rect;ins.x=clamp(((e.clientX-r.left)/r.width)*100,5,95);ins.y=clamp(((e.clientY-r.top)/r.height)*100,10,92);const el=q(`#scene .hd-furniture[data-hd-instance="${ins.instanceId}"]`);if(el){el.style.left=`${ins.x}%`;el.style.top=`${ins.y}%`;el.style.zIndex=String(Math.round(ins.y)+40)}e.preventDefault();e.stopImmediatePropagation()}
function endDrag(e){if(!ui.active||!ui.drag)return;ui.drag=null;refreshRoom();renderDock();e.preventDefault();e.stopImmediatePropagation()}
function selectFirstType(id){const ins=roomList().find(x=>x.itemId===id);if(ins)selectInstance(ins.instanceId)}

window.addEventListener('click',e=>{
 const entry=e.target.closest?.('#homeDecorBtn');
 if(entry){e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();if(ui.active)leave(true);else enter(state?.room);return}
 if(!ui.active)return;
 const saveBtn=e.target.closest?.('#hdiSave');if(saveBtn){e.preventDefault();e.stopImmediatePropagation();leave(true);return}
 const cancel=e.target.closest?.('#hdiCancel');if(cancel){e.preventDefault();e.stopImmediatePropagation();leave(false);return}
 const mode=e.target.closest?.('[data-mode]');if(mode&&mode.closest('#hdInlineDock')){ui.mode=mode.dataset.mode;renderDock();e.preventDefault();e.stopImmediatePropagation();return}
 const cat=e.target.closest?.('[data-cat]');if(cat&&cat.closest('#hdInlineDock')){ui.category=cat.dataset.cat;renderDock();e.preventDefault();e.stopImmediatePropagation();return}
 const buyBtn=e.target.closest?.('[data-buy]');if(buyBtn){buy(buyBtn.dataset.buy);e.preventDefault();e.stopImmediatePropagation();return}
 const placeBtn=e.target.closest?.('[data-place]');if(placeBtn){place(placeBtn.dataset.place);e.preventDefault();e.stopImmediatePropagation();return}
 const selType=e.target.closest?.('[data-select-type]');if(selType){selectFirstType(selType.dataset.selectType);e.preventDefault();e.stopImmediatePropagation();return}
 const action=e.target.closest?.('#hdInlineTools [data-action]');if(action){({rotate,delete:removeSelected,undo,daynight:dayNight}[action.dataset.action]||(()=>{}))();e.preventDefault();e.stopImmediatePropagation();return}
 const furn=e.target.closest?.('#scene .hd-furniture[data-hd-instance]');if(furn){selectInstance(furn.dataset.hdInstance);e.preventDefault();e.stopImmediatePropagation();return}
 if(e.target.closest?.('#scene')){e.preventDefault();e.stopImmediatePropagation();return}
},true);
window.addEventListener('pointerdown',e=>{if(!ui.active)return;const el=e.target.closest?.('#scene .hd-furniture[data-hd-instance]');if(el)startDrag(e,el);else if(e.target.closest?.('#scene')){e.preventDefault();e.stopImmediatePropagation()}},true);
window.addEventListener('pointermove',moveDrag,true);
window.addEventListener('pointerup',endDrag,true);
window.addEventListener('keydown',e=>{if(!ui.active)return;if(e.key==='Escape'){leave(false);return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){undo();e.preventDefault()}if(e.key==='Delete'){removeSelected();e.preventDefault()}if(e.key.toLowerCase()==='r'){rotate();e.preventDefault()}},true);

function patchEntry(){const b=q('#homeDecorBtn');if(b){b.textContent='🛋️ 装修';b.title='直接在当前房间里移动、购买、替换家具'}}
const mo=new MutationObserver(()=>{patchEntry();if(q('#homeDecorOverlay'))removeLegacyOverlay()});mo.observe(document.documentElement,{childList:true,subtree:true});
function init(){patchEntry();removeLegacyOverlay();window.HomeDecor13={version:V,enter,leave,isActive:()=>ui.active};console.info('[Shawn & Elyn] Home Decor 1.3 inline editor ready — same room, no separate editor page.')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();