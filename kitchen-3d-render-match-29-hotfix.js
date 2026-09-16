const api=window.KITCHEN_3D_INTERNAL;
const render29=window.KITCHEN_3D_RENDER_29;
if(api&&render29){
 const {renderer}=api;
 const forceReferenceLook=()=>{
   renderer.toneMappingExposure=.74;
   renderer.domElement.style.filter='saturate(1.045) contrast(1.15) brightness(.94)';
   render29.group?.traverse(o=>{if(o.isDirectionalLight)o.intensity=o.castShadow?1.1:.2;if(o.isPointLight)o.intensity=.34});
 };
 document.querySelector('[data-k22="view"]')?.addEventListener('click',()=>setTimeout(forceReferenceLook,30));
 document.getElementById('assembledBtn')?.addEventListener('click',()=>setTimeout(forceReferenceLook,40));
 window.KITCHEN_3D_RENDER_29.forceReferenceLook=forceReferenceLook;
}
