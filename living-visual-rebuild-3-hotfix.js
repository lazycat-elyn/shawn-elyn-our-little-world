(()=>{
'use strict';
function wire(root){if(!root||root.__v3isolated)return;root.__v3isolated=true;
  // Let the rebuild handle its own clicks; do not also trigger the old 2D scene click-to-move.
  root.addEventListener('click',e=>e.stopPropagation());
  root.addEventListener('dblclick',e=>e.stopPropagation());
  root.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation()});
}
const scan=()=>wire(document.getElementById('v3LivingRoot'));
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan,{once:true});else scan();
})();