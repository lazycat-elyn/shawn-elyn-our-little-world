const coreUrl='./kitchen-3d-modular-2.js?v=3500';
const source=await fetch(coreUrl,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`Kitchen core load failed: ${r.status}`);return r.text()});
const marker='renderer.setAnimationLoop(()=>';
if(!source.includes(marker))throw new Error('Kitchen 2.9 bootstrap could not find render loop marker');
const expose=`window.KITCHEN_3D_INTERNAL={THREE,scene,camera,renderer,orbit,transform,kitchen,assets,assetMap,register,rb,bx,cyl,sphere,torus,M,C,ginghamMat,floralMat,sun,bounce,taskLight,toast,renderAssetList,renderShop,renderInventory,select};\n`;
const patched=source.replace(marker,expose+marker);
const blobUrl=URL.createObjectURL(new Blob([patched],{type:'text/javascript'}));
try{
  await import(blobUrl);
  await import('./kitchen-3d-hifi-21.js?v=2910');
  await import('./kitchen-3d-hifi-22.js?v=2910');
  await import('./kitchen-3d-hifi-23.js?v=2910');
  await import('./kitchen-3d-hifi-24.js?v=2910');
  await import('./kitchen-3d-hifi-25.js?v=2910');
  await import('./kitchen-3d-hifi-26.js?v=2910');
  await import('./kitchen-3d-reference-master-27.js?v=2910');
  await import('./kitchen-3d-reference-master-27-hotfix.js?v=2910');
  await import('./kitchen-3d-color-master-28.js?v=2910');
  await import('./kitchen-3d-render-match-29.js?v=2910');
  await import('./kitchen-3d-render-match-29-hotfix.js?v=2910');
  await import('./kitchen-3d-render-match-29-fidelity.js?v=2910');
  await import('./kitchen-3d-reference-match-30.js?v=3000');
  await import('./kitchen-3d-reference-match-31-fix.js?v=3100');
  await import('./kitchen-3d-reference-match-32-modular.js?v=3200');
  await import('./kitchen-3d-reference-match-33-modular.js?v=3300');
  await import('./kitchen-3d-reference-match-34-hero-rebuild.js?v=3400');
  await import('./kitchen-3d-reference-match-35-lighting-color.js?v=3500');
}finally{
  URL.revokeObjectURL(blobUrl);
}
