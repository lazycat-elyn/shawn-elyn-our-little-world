const coreUrl='./kitchen-3d-modular-2.js?v=2200';
const source=await fetch(coreUrl,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`Kitchen core load failed: ${r.status}`);return r.text()});
const marker='renderer.setAnimationLoop(()=>';
if(!source.includes(marker))throw new Error('Kitchen 2.2 bootstrap could not find render loop marker');
const expose=`window.KITCHEN_3D_INTERNAL={THREE,scene,camera,renderer,orbit,transform,kitchen,assets,assetMap,register,rb,bx,cyl,sphere,torus,M,C,ginghamMat,floralMat,sun,bounce,taskLight,toast,renderAssetList,renderShop,renderInventory,select};\n`;
const patched=source.replace(marker,expose+marker);
const blobUrl=URL.createObjectURL(new Blob([patched],{type:'text/javascript'}));
try{
  await import(blobUrl);
  await import('./kitchen-3d-hifi-21.js?v=2200');
  await import('./kitchen-3d-hifi-22.js?v=2200');
}finally{
  URL.revokeObjectURL(blobUrl);
}
