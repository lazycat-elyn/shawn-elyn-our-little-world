const api=window.KITCHEN_3D_INTERNAL;
if(!api) throw new Error('Kitchen 3.0 internal API unavailable');
const {THREE,kitchen,assetMap,rb,bx,cyl,sphere,torus,camera,orbit}=api;

const old=kitchen.getObjectByName('KitchenReferenceMatch300');
if(old) old.removeFromParent();
const g=new THREE.Group();
g.name='KitchenReferenceMatch300';
kitchen.add(g);

const mat=(c,r=.65,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const cream=mat(0xefe0ca,.62), cream2=mat(0xf8ecdc,.56), ivory=mat(0xfff7ea,.52);
const wood=mat(0xc18452,.56), wood2=mat(0xdda36f,.6), brass=mat(0x9b6b3f,.4,.58);
const peach=mat(0xe2a093,.82), peach2=mat(0xf2c1b3,.88), sage=mat(0x708066,.9), dark=mat(0x45372f,.48,.12);
const white=mat(0xfffbf5,.62), glass=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.12,transmission:.45,transparent:true,opacity:.42});
const wicker=mat(0xa97650,.9), floorMat=mat(0xf6ead9,.9), pinkTile=mat(0xd99a90,.9);

function add(o,p=g){p.add(o);return o}
function box(w,h,d,m,x,y,z,r=.02,p=g){const o=rb(w,h,d,m,r);o.position.set(x,y,z);p.add(o);return o}
function cylinder(rad,h,m,x,y,z,seg=20,p=g){const o=cyl(rad,h,m,seg);o.position.set(x,y,z);p.add(o);return o}
function leaf(x,y,z,s=.1,p=g){const o=sphere(s,sage,12);o.scale.set(.58,1.25,.4);o.position.set(x,y,z);p.add(o);return o}
function flower(x,y,z,s=.05,p=g){for(let i=0;i<6;i++){const a=i*Math.PI/3;const pet=sphere(s,ivory,10);pet.scale.set(1,.55,.35);pet.position.set(x+Math.cos(a)*s*.8,y+Math.sin(a)*s*.8,z);p.add(pet)}const c=sphere(s*.5,peach,10);c.position.set(x,y,z+.01);p.add(c)}
function plant(x,y,z,s=.1,p=g){cylinder(s*.72,s*1.18,cream2,x,y+s*.55,z,16,p);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const l=leaf(x+Math.cos(a)*s*.78,y+s*1.8+(i%2)*s*.18,z+Math.sin(a)*s*.7,s*.55,p);l.rotation.z=Math.cos(a)*.55;l.rotation.x=Math.sin(a)*.25}}
function jar(x,y,z,s=.09,label=true,p=g){cylinder(s,s*2.05,ivory,x,y,z,18,p);cylinder(s*1.03,s*.2,brass,x,y+s*1.15,z,16,p);if(label)box(s*1.1,s*.65,.012,peach2,x,y,z+s+.004,.008,p)}
function basket(x,y,z,w=.56,h=.3,d=.34,p=g){box(w,h,d,wicker,x,y,z,.05,p);for(let i=-2;i<=2;i++)box(.017,h*.8,d*1.01,wood2,x+i*w*.16,y,z+.01,.006,p);const hdl=torus(w*.29,.022,wood,Math.PI);hdl.rotation.x=Math.PI/2;hdl.rotation.z=Math.PI;hdl.position.set(x,y+h*.55,z);p.add(hdl)}
function art(x,y,z,w=.45,h=.58,p=g){box(w,h,.055,wood2,x,y,z,.025,p);box(w*.83,h*.82,.026,ivory,x,y,z+.04,.018,p);box(.015,h*.34,.014,sage,x,y-.03,z+.066,.006,p);for(const dx of[-.1,0,.1]){const q=sphere(.04,dx?peach:sage,10);q.scale.set(1,.72,.4);q.position.set(x+dx,y+.08+Math.abs(dx)*.28,z+.074);p.add(q)}}
function knob(x,y,z,p=g){const q=sphere(.042,brass,12);q.position.set(x,y,z);p.add(q)}

// 1) Full warm wall envelope + beadboard lines
box(14.6,5.85,.16,cream,-.05,2.9,-5.55,.01);
for(let x=-7.2;x<=7.2;x+=.38) box(.018,5.45,.02,cream2,x,2.75,-5.43,.003);
box(14.8,.2,.34,wood2,-.05,5.83,-5.42,.018);

// 2) Backsplash field with pink floral motif, matching the reference rhythm
for(let x=-6.7;x<=5.0;x+=.46){
  for(let y=1.85;y<=3.12;y+=.46){
    const t=box(.43,.43,.018,ivory,x,y,-5.31,.008);
    if((Math.round((x+7)*10)+Math.round(y*10))%2===0){
      const c=sphere(.035,peach,8);c.position.set(x,y,-5.285);c.scale.set(1,.65,.3);g.add(c);
      for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5]){const p=sphere(.022,peach2,8);p.position.set(x+Math.cos(a)*.06,y+Math.sin(a)*.06,-5.282);p.scale.set(1,.55,.25);g.add(p)}
    }
  }
}

// 3) Floor tiles: cream octagon impression + small peach diamonds
for(let x=-6.7;x<=6.7;x+=.78){for(let z=-4.3;z<=5.2;z+=.78){
  const tile=box(.72,.018,.72,floorMat,x,.015,z,.035);tile.rotation.y=Math.PI/4;
}}
for(let x=-6.32;x<=6.3;x+=.78){for(let z=-3.91;z<=4.9;z+=.78){
  const d=box(.14,.022,.14,pinkTile,x,.029,z,.018);d.rotation.y=Math.PI/4;
}}

// 4) Long gingham runner rug
const rugBase=box(5.15,.025,1.55,peach2,1.55,.055,1.38,.05);
for(let i=0;i<18;i++)box(.08,.012,1.48,i%2?peach:ivory,-.94+i*.29,.075,1.38,.005);
for(let i=0;i<6;i++)box(5.05,.012,.06,i%2?peach:ivory,1.55,.079,.68+i*.28,.005);
for(let i=0;i<13;i++){box(.045,.01,.3,wood2,-1.04+i*.43,.067,.52,.002);box(.045,.01,.3,wood2,-1.04+i*.43,.067,2.24,.002)}

// 5) Window mullions + sunny depth panel
box(4.1,3.3,.055,new THREE.MeshBasicMaterial({color:0xfff0b2}),-3.45,3.2,-5.24,.01);
for(const x of[-5.35,-4.72,-4.09,-3.46,-2.83,-2.2,-1.57]) box(.045,3.25,.04,cream2,x,3.2,-5.17,.01);
for(const y of[2.18,3.0,3.82,4.64]) box(3.86,.045,.04,cream2,-3.46,y,-5.16,.01);

// 6) Upper display cabinet with glass doors and stacked dishes
const cab=new THREE.Group();cab.name='ReferenceGlassCabinet300';g.add(cab);
box(2.0,2.1,.58,cream2,-.48,4.46,-5.02,.04,cab);
box(1.72,1.82,.51,ivory,-.48,4.46,-4.72,.025,cab);
for(const x of[-.93,-.03]) box(.72,1.64,.035,glass,x,4.46,-4.42,.02,cab);
box(.055,1.7,.06,wood2,-.48,4.46,-4.39,.008,cab);
for(const yy of[3.95,4.48,5.0]) box(1.56,.045,.44,wood2,-.48,yy,-4.72,.008,cab);
for(const yy of[4.05,4.57,5.08]){for(const xx of[-.88,-.62,-.16,.10]){const plate=cylinder(.13,.035,ivory,xx,yy,-4.46,18,cab);plate.rotation.x=Math.PI/2}}
knob(-.54,4.43,-4.35,cab);knob(-.42,4.43,-4.35,cab);

// 7) Open shelves and shelf decor on both ends
for(const [x,y,w] of[[-6.02,3.52,1.58],[-6.02,4.35,1.58],[3.95,3.52,1.46],[3.95,4.35,1.46]]){
 box(w,.095,.38,wood,x,y,-5.02,.02);for(const sx of[-w*.42,w*.42])box(.05,.28,.05,brass,x+sx,y-.13,-5.06,.008);
}
jar(-6.43,3.82,-4.83,.095);jar(-6.05,3.82,-4.83,.09);jar(-5.68,3.82,-4.83,.09);plant(-6.55,4.45,-4.86,.11);art(-5.91,4.63,-4.88,.42,.5);
jar(3.58,3.82,-4.83,.09);jar(3.92,3.82,-4.83,.09);plant(4.35,3.74,-4.84,.1);jar(3.55,4.62,-4.82,.085);plant(4.16,4.47,-4.83,.1);

// 8) Countertop clutter near sink and range
plant(-5.1,1.38,-4.66,.12);art(-5.92,1.55,-4.66,.48,.6);art(-5.38,1.55,-4.66,.48,.6);
const book=box(.58,.72,.06,ivory,-5.58,1.45,-4.55,.025);book.rotation.y=-.15;
for(let i=0;i<8;i++){const xx=-4.6+(i%4)*.08, yy=1.72+Math.floor(i/4)*.12;box(.012,.34,.012,sage,xx,yy,-4.68,.003);flower(xx,yy+.18,-4.67,.035)}
jar(-1.25,1.45,-4.67,.1);art(-.65,1.56,-4.68,.5,.6);for(const x of[-.15,.16,.45])jar(x,1.44,-4.68,.075);
const utensilCup=cylinder(.14,.34,ivory,1.75,1.42,-4.64,18);for(let i=0;i<6;i++){const h=box(.024,.48,.024,i%2?wood:brass,1.62+i*.05,1.76,-4.64,.006);h.rotation.z=(i-2.5)*.06}

// 9) Hanging brass rail, utensils and gingham oven mitts
box(2.55,.045,.05,brass,1.1,2.47,-5.1,.012);
for(let i=0;i<6;i++){const x=.08+i*.34;cylinder(.018,.35,i%2?wood:brass,x,2.24,-5.03,10);const hd=cylinder(.06,.035,i%2?wood2:brass,x,2.03,-5.03,12);hd.rotation.x=Math.PI/2}
for(const [x,r] of[[1.83,.12],[2.1,-.08]]){const mitt=box(.2,.42,.065,peach,x,2.13,-5.01,.08);mitt.rotation.z=r;for(let i=-1;i<=1;i++)box(.035,.34,.01,ivory,x+i*.06,2.13,-4.972,.004)}

// 10) Toaster and little bottles right of stove
const toaster=box(.62,.36,.4,cream2,4.6,1.42,-4.67,.12);for(const x of[4.47,4.7])box(.17,.015,.22,dark,x,1.605,-4.67,.01);box(.035,.15,.035,brass,4.92,1.43,-4.67,.01);
for(let i=0;i<4;i++){const x=5.16+i*.18;cylinder(.045,.28,i%2?wood2:cream2,x,1.41,-4.66,12);cylinder(.035,.05,brass,x,1.59,-4.66,10)}

// 11) Fridge basket, cascading greenery, magnets and cards
basket(5.78,4.03,-4.73,.75,.31,.42);plant(6.33,3.95,-4.73,.12);
for(let i=0;i<9;i++){const y=3.75-i*.28;const x=6.54+Math.sin(i*.9)*.18;leaf(x,y,-4.55,.085)}
for(const [x,y,w,h,m] of[[5.45,2.9,.18,.24,peach],[5.85,2.62,.24,.18,ivory],[5.55,2.27,.16,.21,cream2],[6.05,2.88,.18,.18,peach2],[6.1,2.15,.16,.22,ivory]]){const n=box(w,h,.025,m,x,y,-4.26,.016);n.rotation.z=(x-y)*.035;knob(x-.05,y+.07,-4.225)}

// 12) Peninsula hero styling: vase, fruit, mug, gingham towel and side basket
const vase=cylinder(.115,.28,ivory,-3.1,1.38,2.0,18);for(let i=0;i<9;i++){const x=-3.1+(i-4)*.025;box(.01,.34,.01,sage,x,1.65,2.0,.003);flower(x,1.83+(i%2)*.025,2.0,.036)}
const bowl=new THREE.Mesh(new THREE.SphereGeometry(.28,24,12,0,Math.PI*2,0,Math.PI/2),wood2);bowl.rotation.x=Math.PI;bowl.scale.y=.43;bowl.position.set(-2.48,1.34,2.0);g.add(bowl);
for(let i=0;i<7;i++){const f=sphere(.085,i%3===0?peach:wood2,12);f.position.set(-2.48+(i%3-1)*.1,1.45+Math.floor(i/3)*.07,2+(i%2-.5)*.09);g.add(f)}
box(.17,.2,.17,ivory,-1.73,1.33,2.02,.045);const mh=torus(.095,.018,ivory,Math.PI*1.55);mh.rotation.y=Math.PI/2;mh.position.set(-1.61,1.37,2.02);g.add(mh);
for(let i=0;i<8;i++)box(.055,.012,.42,i%2?peach:ivory,-1.94+i*.06,1.44,2.28,.005);
basket(-.02,.67,2.62,.55,.34,.34);for(let i=0;i<5;i++){const t=box(.06,.62,.025,i%2?peach:ivory,.36+i*.065,.52,2.3,.01);t.rotation.z=.03}

// 13) Bar stools refinement: warm wood legs + checked round seats
for(const sx of[-3.9,-2.2]){
  cylinder(.31,.12,cream2,sx,1.02,3.2,28);for(let i=0;i<12;i++){const a=i*Math.PI/6;const q=box(.11,.018,.5,i%2?peach:ivory,sx+Math.cos(a)*.07,1.09,3.2+Math.sin(a)*.07,.008);q.rotation.y=a}
  for(const dx of[-.2,.2])for(const dz of[-.2,.2]){const leg=box(.08,.92,.08,wood,sx+dx,.48,3.2+dz,.018);leg.rotation.z=dx*.05}
  box(.62,.06,.06,wood,sx,.42,3.0,.015);box(.62,.06,.06,wood,sx,.42,3.4,.015);
}

// 14) Extra trailing plants at left shelves and peninsula edge
for(let i=0;i<10;i++){const y=3.6-i*.3;leaf(-6.92,y,-4.82,.09)}
plant(-6.7,4.72,-4.86,.13);plant(-6.62,.72,2.52,.11);
for(let i=0;i<7;i++)leaf(-6.45,.52-i*.22,2.58,.075);

// 15) Camera/composition: slightly higher and farther, matching the reference isometric framing.
try{
  camera.position.set(10.8,8.85,12.9);
  if(orbit?.target){orbit.target.set(-.15,2.1,-.55);orbit.update?.()}
  camera.fov=35;camera.updateProjectionMatrix();
}catch(e){}

window.KITCHEN_3D_REFERENCE_MATCH_30={version:'3.0',group:g};
