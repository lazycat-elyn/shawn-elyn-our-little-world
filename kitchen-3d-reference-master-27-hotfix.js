const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 2.7 hotfix internal API unavailable');
for(const root of api.assets){root.traverse(o=>{o.userData.assetRoot=root})}
api.renderAssetList?.();
