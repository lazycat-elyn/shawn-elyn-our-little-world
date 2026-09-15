(()=>{
  const scene=document.getElementById('scene');
  const tabs=document.getElementById('roomTabs');
  if(!scene||!tabs)return;

  let frame=null,badge=null,lastRoom='';
  function activeRoom(){return tabs.querySelector('button.active')?.dataset.room||''}
  function ensureFrame(){
    if(frame)return;
    frame=document.createElement('iframe');
    frame.className='k3d-game-frame';
    frame.title='Kitchen 3D Modular Editor';
    frame.src='./kitchen-3d-modular-1-1.html?embed=1';
    frame.allow='fullscreen';
    badge=document.createElement('div');
    badge.className='k3d-game-badge';
    badge.textContent='3D MODULAR KITCHEN · 左边选物件 · 右边 Move / Rotate';
    scene.append(frame,badge);
  }
  function showKitchen3D(){
    ensureFrame();
    scene.classList.add('k3d-game-active');
    frame.style.display='block';
    badge.style.display='block';
  }
  function hideKitchen3D(){
    scene.classList.remove('k3d-game-active');
    if(frame)frame.style.display='none';
    if(badge)badge.style.display='none';
  }
  function sync(){
    const room=activeRoom();
    if(room===lastRoom)return;
    lastRoom=room;
    if(room==='kitchen')showKitchen3D(); else hideKitchen3D();
  }

  tabs.addEventListener('click',()=>setTimeout(sync,0));
  new MutationObserver(sync).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class']});
  setInterval(sync,500);
  setTimeout(sync,50);
  window.KITCHEN_3D_GAME_INTEGRATION={version:'1.0',show:showKitchen3D,hide:hideKitchen3D};
})();