(()=>{
'use strict';

/* Home Decor 1.2 room-tab persistence hotfix.
   Save the current room's private editor draft before activating/reopening
   another room, so seeded independent furniture cannot be lost. */

document.addEventListener('click',e=>{
  const roomBtn=e.target.closest?.('#homeDecorOverlay [data-hd-room]');
  if(!roomBtn)return;

  e.preventDefault();
  e.stopImmediatePropagation();

  const target=roomBtn.dataset.hdRoom;
  if(!target)return;

  const overlay=document.getElementById('homeDecorOverlay');
  const saveBtn=overlay?.querySelector('#hdSave');

  // HomeDecor10 saveEditor is synchronous: commit the current private draft
  // before HomeDecor12 seeds/opens the target room.
  if(saveBtn)saveBtn.click();

  setTimeout(()=>{
    window.HomeDecor12?.activateRoom?.(target);
    window.HomeDecor10?.open?.(target);
  },20);
},true);

console.info('[Shawn & Elyn] Home Decor 1.2 room-switch persistence hotfix ready.');
})();
