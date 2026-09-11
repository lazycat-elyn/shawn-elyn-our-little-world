(()=>{
'use strict';

const HD_VERSION = 100;
const ELIGIBLE_ROOMS = ['living','kitchen','bedroom','bathroom','study','closet','balcony'];
const ROOM_LABELS = {living:'客厅',kitchen:'厨房',bedroom:'卧室',bathroom:'浴室',study:'书房',closet:'衣帽间',balcony:'阳台'};
const CATEGORY_LABELS = {all:'全部',sofa:'沙发',table:'桌子',chair:'椅子',bed:'床',kitchen:'厨房',storage:'收纳',rug:'地毯',plant:'植物',pet:'宠物',lighting:'灯具',wall:'墙饰',bath:'卫浴',desk:'书房'};
const CATEGORY_ICONS = {all:'▦',sofa:'🛋️',table:'▤',chair:'🪑',bed:'🛏️',kitchen:'🍳',storage:'▥',rug:'▭',plant:'🪴',pet:'🐾',lighting:'💡',wall:'🖼️',bath:'🛁',desk:'🖥️'};
const deepClone = o => JSON.parse(JSON.stringify(o));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const snap=(v,step=1)=>Math.round(v/step)*step;

const CATALOG = [
  {id:'sofa_cream',name:'奶油三人沙发',category:'sofa',rooms:['living'],price:1280,type:'sofa',primary:'#eee4d6',accent:'#91a97d',w:28,h:15,replaceGroup:'mainSofa',hotspotAction:'sit',anchor:[0,5],unique:true},
  {id:'sofa_sage',name:'鼠尾草绿沙发',category:'sofa',rooms:['living'],price:1480,type:'sofa',primary:'#9dac8c',accent:'#f1e7d8',w:28,h:15,replaceGroup:'mainSofa',hotspotAction:'sit',anchor:[0,5],unique:true},
  {id:'coffee_oak',name:'原木茶几',category:'table',rooms:['living'],price:900,type:'table',primary:'#a8784f',accent:'#f4e9dc',w:16,h:10,replaceGroup:'coffeeTable',unique:true},
  {id:'coffee_round',name:'圆形茶几',category:'table',rooms:['living','balcony'],price:820,type:'roundtable',primary:'#a67a55',accent:'#efe4d4',w:13,h:10,replaceGroup:'coffeeTable',unique:true},
  {id:'tv_console_oak',name:'原木电视柜',category:'storage',rooms:['living'],price:1200,type:'tvunit',primary:'#9a6e49',accent:'#efe4d2',w:22,h:12,replaceGroup:'tvConsole',unique:true},
  {id:'side_cabinet',name:'暖木边柜',category:'storage',rooms:['living','bedroom'],price:850,type:'cabinet',primary:'#b08360',accent:'#eadac7',w:14,h:14,repeatable:true,maxPerRoom:2},
  {id:'rug_warm',name:'米色花纹地毯',category:'rug',rooms:['living','bedroom','study','closet'],price:620,type:'rug',primary:'#d8c6ac',accent:'#8f9c7d',w:30,h:18,repeatable:true,collision:false},
  {id:'floor_lamp',name:'木脚落地灯',category:'lighting',rooms:['living','bedroom','study'],price:650,type:'lamp',primary:'#9c7356',accent:'#f3dfb5',w:9,h:17,repeatable:true,maxPerRoom:3,collision:false},
  {id:'plant_monstera',name:'龟背竹盆栽',category:'plant',rooms:ELIGIBLE_ROOMS,price:600,type:'plant',primary:'#6f9463',accent:'#b67855',w:9,h:12,repeatable:true,maxPerRoom:5,collision:false,starterOwned:2},
  {id:'plant_daisy',name:'白花盆栽',category:'plant',rooms:ELIGIBLE_ROOMS,price:520,type:'flowers',primary:'#faf7ee',accent:'#7f9f6c',w:8,h:10,repeatable:true,maxPerRoom:5,collision:false},
  {id:'pet_bed',name:'宠物圆窝',category:'pet',rooms:['living','bedroom','study'],price:480,type:'petbed',primary:'#e9d8bd',accent:'#f1c85e',w:11,h:8,repeatable:true,maxPerRoom:2,collision:false,starterOwned:1},
  {id:'wall_print_home',name:'Home ♡ 墙画',category:'wall',rooms:ELIGIBLE_ROOMS,price:420,type:'wallart',primary:'#f0e6d8',accent:'#785d4f',w:10,h:12,repeatable:true,maxPerRoom:4,collision:false},

  {id:'dining_oak',name:'四人原木餐桌',category:'table',rooms:['kitchen'],price:1100,type:'dining',primary:'#9d704b',accent:'#e8d8c1',w:20,h:14,replaceGroup:'diningTable',hotspotAction:'eat',anchor:[0,6],unique:true},
  {id:'dining_round',name:'圆形双人餐桌',category:'table',rooms:['kitchen'],price:1250,type:'roundtable',primary:'#a87b55',accent:'#e9dcc7',w:16,h:13,replaceGroup:'diningTable',hotspotAction:'eat',anchor:[0,6],unique:true},
  {id:'dining_chair',name:'藤编餐椅',category:'chair',rooms:['kitchen'],price:750,type:'chair',primary:'#ae825b',accent:'#e9ddc9',w:8,h:11,repeatable:true,maxPerRoom:4},
  {id:'island_sage',name:'鼠尾草厨房中岛',category:'kitchen',rooms:['kitchen'],price:1350,type:'island',primary:'#87977e',accent:'#e8dcc8',w:20,h:14,replaceGroup:'kitchenIsland',unique:true},
  {id:'fridge_cream',name:'奶油复古冰箱',category:'kitchen',rooms:['kitchen'],price:1280,type:'fridge',primary:'#eee8dc',accent:'#a98e77',w:12,h:21,replaceGroup:'fridge',hotspotAction:'fridge',anchor:[0,7],unique:true},
  {id:'pendant_pair',name:'双头厨房吊灯',category:'lighting',rooms:['kitchen'],price:620,type:'pendant',primary:'#d8b67d',accent:'#f6e8be',w:15,h:15,repeatable:true,maxPerRoom:2,collision:false},
  {id:'coffee_station',name:'咖啡机收纳台',category:'kitchen',rooms:['kitchen'],price:880,type:'cabinet',primary:'#9c7250',accent:'#d8d0c4',w:14,h:15,repeatable:true,maxPerRoom:2},

  {id:'bed_cream',name:'奶油双人床',category:'bed',rooms:['bedroom'],price:1280,type:'bed',primary:'#e8dfd3',accent:'#879a77',w:27,h:19,replaceGroup:'mainBed',hotspotAction:'sleep',anchor:[0,8],unique:true},
  {id:'bed_green',name:'森林绿双人床',category:'bed',rooms:['bedroom'],price:1450,type:'bed',primary:'#7d9174',accent:'#efe7d8',w:27,h:19,replaceGroup:'mainBed',hotspotAction:'sleep',anchor:[0,8],unique:true},
  {id:'nightstand_oak',name:'原木床头柜',category:'storage',rooms:['bedroom'],price:680,type:'nightstand',primary:'#a77a56',accent:'#eadfce',w:9,h:10,repeatable:true,maxPerRoom:2},
  {id:'bedside_lamp',name:'床头暖光台灯',category:'lighting',rooms:['bedroom'],price:460,type:'tablelamp',primary:'#a1775a',accent:'#f5dfad',w:7,h:10,repeatable:true,maxPerRoom:2,collision:false},
  {id:'wardrobe_oak',name:'双门原木衣柜',category:'storage',rooms:['bedroom','closet'],price:1400,type:'wardrobe',primary:'#a57d5e',accent:'#e8dac4',w:16,h:22,repeatable:true,maxPerRoom:3},
  {id:'bed_bench',name:'床尾软凳',category:'chair',rooms:['bedroom','closet'],price:850,type:'bench',primary:'#d7c7b2',accent:'#85967d',w:16,h:9,repeatable:true,maxPerRoom:2},

  {id:'desk_oak',name:'Elyn 原木书桌',category:'desk',rooms:['study'],price:0,type:'desk',primary:'#a87a52',accent:'#f0e6d6',w:18,h:13,repeatable:true,maxPerRoom:2,hotspotAction:'study',anchor:[0,5],starterOwned:2},
  {id:'desk_white',name:'奶油白书桌',category:'desk',rooms:['study'],price:1320,type:'desk',primary:'#eee9df',accent:'#91a17e',w:18,h:13,repeatable:true,maxPerRoom:2,hotspotAction:'study',anchor:[0,5]},
  {id:'desk_chair',name:'书房软椅',category:'chair',rooms:['study'],price:850,type:'officechair',primary:'#d8cabb',accent:'#8b9d82',w:9,h:12,repeatable:true,maxPerRoom:2,starterOwned:2},
  {id:'bookshelf_oak',name:'高书架',category:'storage',rooms:['study'],price:1100,type:'bookshelf',primary:'#9e7351',accent:'#e8d7bd',w:13,h:22,repeatable:true,maxPerRoom:2},
  {id:'desk_lamp',name:'书桌台灯',category:'lighting',rooms:['study'],price:460,type:'desklamp',primary:'#7d685d',accent:'#f3d98f',w:7,h:10,repeatable:true,maxPerRoom:2,collision:false},

  {id:'vanity_oak',name:'原木洗手台',category:'bath',rooms:['bathroom'],price:1200,type:'vanity',primary:'#9d7656',accent:'#ece6dd',w:17,h:15,replaceGroup:'vanity',hotspotAction:'groom',anchor:[0,6],unique:true},
  {id:'shower_glass',name:'玻璃淋浴间',category:'bath',rooms:['bathroom'],price:1500,type:'shower',primary:'#d6e7e7',accent:'#6c6a64',w:17,h:23,replaceGroup:'shower',hotspotAction:'shower',anchor:[0,7],unique:true},
  {id:'toilet_white',name:'简约马桶',category:'bath',rooms:['bathroom'],price:980,type:'toilet',primary:'#f3eee7',accent:'#c7b9aa',w:10,h:13,replaceGroup:'toilet',unique:true},
  {id:'bath_shelf',name:'浴室收纳架',category:'storage',rooms:['bathroom'],price:850,type:'shelf',primary:'#a27c5c',accent:'#e5d5c4',w:11,h:20,repeatable:true,maxPerRoom:2},
  {id:'bath_mat',name:'雏菊浴室地垫',category:'rug',rooms:['bathroom'],price:620,type:'rug',primary:'#c8d4b8',accent:'#f5eee1',w:17,h:10,repeatable:true,maxPerRoom:2,collision:false},

  {id:'closet_island',name:'衣帽间中岛柜',category:'storage',rooms:['closet'],price:1280,type:'island',primary:'#aa8060',accent:'#e7dbcb',w:19,h:14,replaceGroup:'closetIsland',unique:true},
  {id:'wardrobe_open',name:'开放式衣柜组合',category:'storage',rooms:['closet'],price:1500,type:'openwardrobe',primary:'#a47b5b',accent:'#e8dcc9',w:22,h:23,repeatable:true,maxPerRoom:3},
  {id:'full_mirror',name:'全身镜',category:'wall',rooms:['closet','bedroom'],price:900,type:'mirror',primary:'#dccfbd',accent:'#786b60',w:10,h:22,repeatable:true,maxPerRoom:2,collision:false},
  {id:'closet_bench',name:'衣帽间软凳',category:'chair',rooms:['closet'],price:850,type:'bench',primary:'#dfd2c0',accent:'#889779',w:15,h:9,repeatable:true,maxPerRoom:2},
  {id:'bag_shelf',name:'包包展示架',category:'storage',rooms:['closet'],price:1100,type:'bookshelf',primary:'#9b7254',accent:'#eadcca',w:13,h:20,repeatable:true,maxPerRoom:2},

  {id:'outdoor_sofa',name:'双人户外沙发',category:'sofa',rooms:['balcony'],price:1280,type:'sofa',primary:'#e6dac7',accent:'#8ea07f',w:23,h:14,replaceGroup:'balconySofa',unique:true},
  {id:'rattan_chair',name:'藤编单人椅',category:'chair',rooms:['balcony'],price:980,type:'chair',primary:'#ae8057',accent:'#e7dac8',w:10,h:13,repeatable:true,maxPerRoom:2},
  {id:'balcony_table',name:'阳台圆桌',category:'table',rooms:['balcony'],price:820,type:'roundtable',primary:'#9e7657',accent:'#e9dcc7',w:12,h:10,replaceGroup:'balconyTable',unique:true},
  {id:'planter_box',name:'长条花箱',category:'plant',rooms:['balcony'],price:750,type:'planter',primary:'#759166',accent:'#b0805f',w:18,h:9,repeatable:true,maxPerRoom:5,collision:false},
  {id:'string_lights',name:'暖光串灯',category:'lighting',rooms:['balcony'],price:450,type:'stringlights',primary:'#f0c96a',accent:'#6b584c',w:24,h:10,repeatable:true,maxPerRoom:3,collision:false}
];
const BY_ID = Object.fromEntries(CATALOG.map(x=>[x.id,x]));

const DEFAULT_POS = {
 living:{sofa:[58,58],table:[58,71],storage:[32,57],rug:[58,70],lighting:[75,52],plant:[78,67],pet:[38,75],wall:[37,42]},
 kitchen:{table:[67,66],chair:[65,76],kitchen:[43,54],storage:[83,57],lighting:[60,39],plant:[80,74],rug:[67,72],wall:[78,40]},
 bedroom:{bed:[58,61],storage:[78,54],chair:[58,77],lighting:[74,50],plant:[32,69],rug:[58,72],wall:[57,41]},
 study:{desk:[42,56],chair:[43,69],storage:[76,52],lighting:[62,48],plant:[31,70],rug:[56,72],wall:[55,38]},
 bathroom:{bath:[58,56],storage:[76,53],rug:[57,75],plant:[72,72],lighting:[72,39],wall:[64,38]},
 closet:{storage:[55,55],chair:[58,73],plant:[30,72],rug:[57,73],wall:[77,48],lighting:[74,38]},
 balcony:{sofa:[39,62],chair:[70,62],table:[55,70],plant:[78,70],lighting:[57,42],rug:[55,72],wall:[38,40]}
};

const starterOwned = ()=>{
 const o={};
 CATALOG.forEach(d=>{if(d.starterOwned)o[d.id]=d.starterOwned});
 return o;
};
function blankPlacements(){return Object.fromEntries(ELIGIBLE_ROOMS.map(r=>[r,[]]));}
function blankRoomModes(){return Object.fromEntries(ELIGIBLE_ROOMS.map(r=>[r,'day']));}
function ensureData(){
 if(!state.homeDecor || typeof state.homeDecor!=='object') state.homeDecor={};
 const hd=state.homeDecor;
 hd.version=HD_VERSION;
 hd.owned=Object.assign(starterOwned(),hd.owned||{});
 hd.placements=Object.assign(blankPlacements(),hd.placements||{});
 ELIGIBLE_ROOMS.forEach(r=>{if(!Array.isArray(hd.placements[r]))hd.placements[r]=[]});
 hd.roomMode=Object.assign(blankRoomModes(),hd.roomMode||{});
 hd.hasCustom=!!hd.hasCustom;
 return hd;
}
ensureData();

const editor={open:false,room:'living',category:'all',mode:'shop',selected:null,draft:null,undo:[],drag:null};

function artSvg(d){
 const p=d.primary||'#d8c8b6', a=d.accent||'#8a9b7d';
 const shadow='<ellipse cx="120" cy="142" rx="88" ry="12" fill="rgba(70,45,30,.13)"/>';
 const wrap=body=>`<svg viewBox="0 0 240 160" aria-hidden="true">${shadow}${body}</svg>`;
 switch(d.type){
  case 'sofa': return wrap(`<rect x="45" y="60" width="150" height="54" rx="18" fill="${p}"/><rect x="55" y="43" width="130" height="42" rx="16" fill="${p}"/><rect x="37" y="72" width="24" height="45" rx="11" fill="${p}"/><rect x="179" y="72" width="24" height="45" rx="11" fill="${p}"/><rect x="67" y="55" width="38" height="24" rx="8" fill="${a}"/><rect x="116" y="55" width="38" height="24" rx="8" fill="#f5eee4"/><rect x="58" y="111" width="12" height="20" rx="4" fill="#7b5d47"/><rect x="170" y="111" width="12" height="20" rx="4" fill="#7b5d47"/>`);
  case 'table': return wrap(`<rect x="52" y="66" width="136" height="40" rx="12" fill="${p}"/><rect x="60" y="96" width="12" height="36" rx="4" fill="#765640"/><rect x="168" y="96" width="12" height="36" rx="4" fill="#765640"/><ellipse cx="120" cy="66" rx="68" ry="15" fill="#c69a73"/><circle cx="120" cy="58" r="10" fill="${a}"/><circle cx="112" cy="50" r="6" fill="#f7f0df"/><circle cx="128" cy="50" r="6" fill="#f7f0df"/>`);
  case 'roundtable': return wrap(`<ellipse cx="120" cy="76" rx="64" ry="29" fill="#c69a73"/><ellipse cx="120" cy="70" rx="64" ry="25" fill="${p}"/><rect x="112" y="90" width="16" height="39" rx="5" fill="#7e6049"/><ellipse cx="120" cy="130" rx="35" ry="8" fill="#7e6049"/>`);
  case 'chair': return wrap(`<rect x="82" y="45" width="76" height="58" rx="18" fill="${p}"/><rect x="78" y="88" width="84" height="27" rx="10" fill="${a}"/><rect x="86" y="112" width="10" height="28" rx="4" fill="#755642"/><rect x="144" y="112" width="10" height="28" rx="4" fill="#755642"/>`);
  case 'officechair': return wrap(`<rect x="78" y="42" width="84" height="65" rx="23" fill="${p}"/><rect x="82" y="93" width="76" height="28" rx="12" fill="${a}"/><rect x="116" y="118" width="8" height="19" rx="4" fill="#665b54"/><path d="M120 134 L83 145 M120 134 L157 145 M120 134 L120 150" stroke="#665b54" stroke-width="7" stroke-linecap="round"/>`);
  case 'rug': return wrap(`<rect x="35" y="53" width="170" height="82" rx="24" fill="${p}"/><path d="M52 75 Q83 55 113 75 T188 75 M52 105 Q83 85 113 105 T188 105" fill="none" stroke="${a}" stroke-width="6" opacity=".6"/>`);
  case 'plant': return wrap(`<path d="M120 83 C90 80 72 55 84 36 C105 39 118 55 120 78 C126 48 145 31 166 36 C174 58 154 79 126 84 C102 70 88 82 78 99 C99 103 113 95 120 86" fill="${p}"/><rect x="93" y="91" width="54" height="42" rx="10" fill="${a}"/><rect x="99" y="91" width="42" height="8" rx="4" fill="#d7ab83"/>`);
  case 'flowers': return wrap(`<rect x="98" y="94" width="44" height="37" rx="10" fill="#b98361"/><path d="M120 96 L120 56 M107 96 L99 66 M133 96 L142 68" stroke="#789463" stroke-width="5"/><g fill="${p}" stroke="#ded5c6" stroke-width="1"><circle cx="120" cy="49" r="9"/><circle cx="111" cy="56" r="9"/><circle cx="129" cy="56" r="9"/><circle cx="98" cy="62" r="9"/><circle cx="143" cy="64" r="9"/></g><g fill="#e9c95e"><circle cx="120" cy="53" r="5"/><circle cx="99" cy="64" r="5"/><circle cx="143" cy="66" r="5"/></g>`);
  case 'lamp': return wrap(`<rect x="114" y="63" width="8" height="62" rx="4" fill="${p}"/><path d="M81 65 L159 65 L145 31 L95 31 Z" fill="${a}"/><path d="M120 124 L89 142 M120 124 L151 142 M120 124 L120 147" stroke="#795c49" stroke-width="7" stroke-linecap="round"/>`);
  case 'pendant': return wrap(`<path d="M85 12 V62 M155 12 V62" stroke="#6c5c51" stroke-width="5"/><path d="M56 62 H114 L104 91 H66 Z" fill="${a}"/><path d="M126 62 H184 L174 91 H136 Z" fill="${a}"/><circle cx="85" cy="84" r="10" fill="#f7df91"/><circle cx="155" cy="84" r="10" fill="#f7df91"/>`);
  case 'tablelamp': case 'desklamp': return wrap(`<rect x="116" y="89" width="8" height="31" rx="4" fill="${p}"/><ellipse cx="120" cy="128" rx="30" ry="8" fill="#82644f"/><path d="M82 88 H158 L147 52 H93 Z" fill="${a}"/><circle cx="120" cy="82" r="10" fill="#ffe89a"/>`);
  case 'petbed': return wrap(`<ellipse cx="120" cy="106" rx="70" ry="34" fill="${p}"/><ellipse cx="120" cy="102" rx="48" ry="22" fill="${a}"/><circle cx="120" cy="101" r="7" fill="#fff3d0"/><circle cx="105" cy="91" r="5" fill="#fff3d0"/><circle cx="135" cy="91" r="5" fill="#fff3d0"/>`);
  case 'wallart': return wrap(`<rect x="70" y="31" width="100" height="94" rx="8" fill="#8b6953"/><rect x="80" y="41" width="80" height="74" rx="4" fill="${p}"/><path d="M102 95 C111 74 118 69 119 51 C134 66 136 84 131 99" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/><text x="120" y="108" text-anchor="middle" font-size="12" fill="#765e50">HOME ♡</text>`);
  case 'tvunit': return wrap(`<rect x="55" y="72" width="130" height="52" rx="10" fill="${p}"/><rect x="78" y="27" width="84" height="53" rx="6" fill="#2d3135"/><rect x="86" y="34" width="68" height="39" rx="3" fill="#667d85"/><circle cx="78" cy="98" r="5" fill="${a}"/><circle cx="162" cy="98" r="5" fill="${a}"/>`);
  case 'cabinet': case 'nightstand': return wrap(`<rect x="72" y="57" width="96" height="72" rx="10" fill="${p}"/><rect x="82" y="68" width="76" height="23" rx="5" fill="#d4af8c"/><rect x="82" y="96" width="76" height="23" rx="5" fill="#d4af8c"/><circle cx="120" cy="80" r="4" fill="${a}"/><circle cx="120" cy="108" r="4" fill="${a}"/>`);
  case 'dining': return wrap(`<rect x="46" y="65" width="148" height="46" rx="10" fill="${p}"/><rect x="55" y="103" width="11" height="32" rx="4" fill="#71513e"/><rect x="174" y="103" width="11" height="32" rx="4" fill="#71513e"/><ellipse cx="120" cy="67" rx="18" ry="8" fill="${a}"/><circle cx="95" cy="74" r="9" fill="#f5eee4"/><circle cx="145" cy="74" r="9" fill="#f5eee4"/>`);
  case 'island': return wrap(`<rect x="47" y="48" width="146" height="81" rx="12" fill="${p}"/><rect x="38" y="42" width="164" height="22" rx="9" fill="#eee5d9"/><rect x="63" y="75" width="49" height="42" rx="7" fill="#7f9178"/><rect x="124" y="75" width="49" height="42" rx="7" fill="#7f9178"/>`);
  case 'fridge': return wrap(`<rect x="82" y="23" width="76" height="116" rx="14" fill="${p}"/><line x1="82" y1="79" x2="158" y2="79" stroke="${a}" stroke-width="5"/><rect x="142" y="42" width="5" height="24" rx="3" fill="#9b8778"/><rect x="142" y="92" width="5" height="24" rx="3" fill="#9b8778"/><circle cx="103" cy="48" r="5" fill="#e7b46b"/><circle cx="121" cy="58" r="5" fill="#8ba985"/>`);
  case 'bed': return wrap(`<rect x="39" y="72" width="162" height="55" rx="15" fill="${p}"/><rect x="48" y="36" width="144" height="53" rx="17" fill="#b18a6c"/><rect x="54" y="61" width="58" height="27" rx="12" fill="#f4eee5"/><rect x="128" y="61" width="58" height="27" rx="12" fill="#f4eee5"/><path d="M50 92 H190 V123 H50 Z" fill="${a}" opacity=".85"/>`);
  case 'wardrobe': case 'openwardrobe': return wrap(`<rect x="65" y="22" width="110" height="118" rx="10" fill="${p}"/><line x1="120" y1="29" x2="120" y2="134" stroke="#d1ae8d" stroke-width="4"/><circle cx="111" cy="81" r="4" fill="${a}"/><circle cx="129" cy="81" r="4" fill="${a}"/>${d.type==='openwardrobe'?'<rect x="78" y="38" width="29" height="68" rx="4" fill="#eadfd0"/><rect x="133" y="38" width="29" height="68" rx="4" fill="#eadfd0"/>':''}`);
  case 'bench': return wrap(`<rect x="58" y="78" width="124" height="42" rx="18" fill="${p}"/><rect x="68" y="116" width="10" height="22" rx="4" fill="#795d48"/><rect x="162" y="116" width="10" height="22" rx="4" fill="#795d48"/><path d="M72 90 H168" stroke="${a}" stroke-width="5" opacity=".5"/>`);
  case 'desk': return wrap(`<rect x="43" y="62" width="154" height="31" rx="8" fill="${p}"/><rect x="52" y="90" width="13" height="43" rx="4" fill="#765743"/><rect x="175" y="90" width="13" height="43" rx="4" fill="#765743"/><rect x="91" y="28" width="58" height="39" rx="5" fill="#53656f"/><rect x="113" y="67" width="14" height="9" rx="3" fill="#5f534c"/><circle cx="164" cy="54" r="9" fill="${a}"/>`);
  case 'bookshelf': case 'shelf': return wrap(`<rect x="74" y="21" width="92" height="120" rx="8" fill="${p}"/><path d="M82 54 H158 M82 87 H158 M82 120 H158" stroke="#d3b08c" stroke-width="5"/><rect x="88" y="35" width="9" height="17" fill="#7c9178"/><rect x="102" y="31" width="8" height="21" fill="#c99178"/><rect x="119" y="68" width="11" height="17" fill="#7f879c"/><rect x="136" y="66" width="10" height="19" fill="#cfb276"/>`);
  case 'vanity': return wrap(`<rect x="53" y="82" width="134" height="49" rx="10" fill="${p}"/><ellipse cx="120" cy="52" rx="42" ry="33" fill="#c7d9db" stroke="#8f735d" stroke-width="7"/><rect x="101" y="85" width="38" height="15" rx="8" fill="#f4f0e8"/><path d="M120 83 V70" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`);
  case 'shower': return wrap(`<rect x="69" y="19" width="102" height="122" rx="8" fill="rgba(205,226,229,.45)" stroke="#75898b" stroke-width="5"/><line x1="120" y1="22" x2="120" y2="138" stroke="#75898b" stroke-width="3"/><path d="M92 54 Q120 28 148 54" fill="none" stroke="${a}" stroke-width="5"/><circle cx="120" cy="54" r="8" fill="#70807e"/>`);
  case 'toilet': return wrap(`<rect x="84" y="47" width="72" height="49" rx="12" fill="${p}"/><ellipse cx="120" cy="104" rx="49" ry="27" fill="#f6f1e9" stroke="#c9beb2" stroke-width="5"/><ellipse cx="120" cy="101" rx="29" ry="13" fill="#cadde0"/>`);
  case 'mirror': return wrap(`<rect x="85" y="19" width="70" height="120" rx="34" fill="#cbdcdf" stroke="${p}" stroke-width="9"/><path d="M102 42 L135 75" stroke="#fff" stroke-width="6" opacity=".55"/>`);
  case 'planter': return wrap(`<rect x="45" y="94" width="150" height="35" rx="10" fill="${a}"/><g fill="${p}"><circle cx="70" cy="82" r="22"/><circle cx="105" cy="77" r="25"/><circle cx="140" cy="82" r="22"/><circle cx="172" cy="79" r="20"/></g>`);
  case 'stringlights': return wrap(`<path d="M35 49 Q120 103 205 49" fill="none" stroke="${a}" stroke-width="4"/><g fill="${p}"><circle cx="55" cy="61" r="8"/><circle cx="86" cy="75" r="8"/><circle cx="120" cy="82" r="8"/><circle cx="154" cy="75" r="8"/><circle cx="185" cy="61" r="8"/></g>`);
  default: return wrap(`<rect x="60" y="50" width="120" height="80" rx="18" fill="${p}"/><circle cx="120" cy="90" r="24" fill="${a}"/>`);
 }
}

function itemCountPlaced(room,id,source){return (source.placements[room]||[]).filter(x=>x.itemId===id).length;}
function itemCountPlacedAll(id,source){return Object.values(source.placements||{}).reduce((n,list)=>n+(Array.isArray(list)?list.filter(x=>x.itemId===id).length:0),0);}
function availableCount(room,id,source){return Math.max(0,(source.owned[id]||0)-itemCountPlacedAll(id,source));}
function getDef(id){return BY_ID[id];}
function instanceId(id){return `hd_${id}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;}
function defaultPos(room,def){
 const r=DEFAULT_POS[room]||{}; const p=r[def.category]||r[def.type]||[55,62];
 let same=(editor.draft?.placements?.[room]||[]).filter(x=>x.itemId===def.id).length;
 if(room==='study'&&def.type==='desk') return same===0?[38,55]:[63,55];
 if(room==='study'&&def.type==='officechair') return same===0?[38,68]:[63,68];
 if(room==='kitchen'&&def.type==='chair') return [[59,76],[73,76],[59,57],[73,57]][same%4];
 return [clamp(p[0]+(same%3)*4,18,84),clamp(p[1]+Math.floor(same/3)*4,28,82)];
}
function pushUndo(){
 editor.undo.push(deepClone({placements:editor.draft.placements,roomMode:editor.draft.roomMode}));
 if(editor.undo.length>20) editor.undo.shift();
}
function undo(){
 const u=editor.undo.pop(); if(!u){notify('没有可以撤销的操作');return;}
 editor.draft.placements=u.placements; editor.draft.roomMode=u.roomMode; editor.selected=null; renderEditor();
}
function notify(msg){if(typeof toast==='function')toast(msg);else console.log(msg);}

function placeItem(id){
 const def=getDef(id); if(!def||!def.rooms.includes(editor.room))return;
 const owned=editor.draft.owned[id]||0;
 if(!owned){notify('先购买这个家具');return;}
 const placed=itemCountPlaced(editor.room,id,editor.draft);
 if(itemCountPlacedAll(id,editor.draft)>=owned){notify(def.repeatable?'没有可用数量，可以再买一个':'这个家具已经摆放了');return;}
 if(def.maxPerRoom && placed>=def.maxPerRoom){notify(`这个房间最多放 ${def.maxPerRoom} 个`);return;}
 pushUndo();
 const roomList=editor.draft.placements[editor.room];
 if(def.replaceGroup){
  for(let i=roomList.length-1;i>=0;i--){const od=getDef(roomList[i].itemId);if(od?.replaceGroup===def.replaceGroup)roomList.splice(i,1);}
 }
 const [x,y]=defaultPos(editor.room,def);
 const ins={instanceId:instanceId(id),itemId:id,x,y,rotation:0};
 roomList.push(ins); editor.selected=ins.instanceId; renderEditor();
}
function buyItem(id){
 const def=getDef(id); if(!def)return;
 ensureData();
 const owned=state.homeDecor.owned[id]||0;
 if(def.unique && owned>0){notify('已经拥有这个家具');return;}
 if(state.coins<def.price){notify(`Coins 不够，需要 ${def.price}`);return;}
 state.coins-=def.price;
 state.homeDecor.owned[id]=(state.homeDecor.owned[id]||0)+1;
 editor.draft.owned[id]=(editor.draft.owned[id]||0)+1;
 if(typeof save==='function')save();
 if(typeof renderTaskUI==='function')renderTaskUI();
 notify(`买到 ${def.name} · -${def.price} Coins`);
 renderEditorHeader(); renderCatalog();
}
function removeSelected(){
 const list=editor.draft.placements[editor.room];const idx=list.findIndex(x=>x.instanceId===editor.selected);
 if(idx<0){notify('先选择一个家具');return;}pushUndo();list.splice(idx,1);editor.selected=null;renderEditor();
}
function rotateSelected(){
 const ins=findSelected();if(!ins){notify('先选择一个家具');return;}pushUndo();ins.rotation=((ins.rotation||0)+90)%360;renderStage();
}
function findSelected(){return (editor.draft?.placements?.[editor.room]||[]).find(x=>x.instanceId===editor.selected);}
function selectInstance(id){editor.selected=id;renderStage();}
function toggleDayNight(){pushUndo();editor.draft.roomMode[editor.room]=editor.draft.roomMode[editor.room]==='night'?'day':'night';renderStage();}

function collisionInvalid(test){
 const d=getDef(test.itemId); if(!d||d.collision===false)return false;
 if(test.x<10||test.x>90||test.y<26||test.y>86)return true;
 const list=editor.draft.placements[editor.room]||[];
 for(const o of list){
  if(o.instanceId===test.instanceId)continue;
  const od=getDef(o.itemId); if(!od||od.collision===false)continue;
  if(d.replaceGroup&&od.replaceGroup===d.replaceGroup)continue;
  const dx=Math.abs(test.x-o.x),dy=Math.abs(test.y-o.y);
  const wx=(d.w+od.w)*.23, hy=(d.h+od.h)*.25;
  if(dx<wx&&dy<hy)return true;
 }
 return false;
}
function onFurniturePointerDown(e,ins){
 e.preventDefault();e.stopPropagation();editor.selected=ins.instanceId;pushUndo();
 const stage=document.getElementById('hdStage'); if(!stage)return;
 const start={x:ins.x,y:ins.y};
 editor.drag={id:ins.instanceId,start};
 const move=ev=>{
  const r=stage.getBoundingClientRect();ins.x=snap(clamp((ev.clientX-r.left)/r.width*100,8,92),1);ins.y=snap(clamp((ev.clientY-r.top)/r.height*100,24,88),1);
  const el=stage.querySelector(`[data-hd-instance="${ins.instanceId}"]`);if(el){el.style.left=ins.x+'%';el.style.top=ins.y+'%';el.classList.toggle('invalid',collisionInvalid(ins));}
 };
 const up=()=>{
  window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);
  if(collisionInvalid(ins)){ins.x=start.x;ins.y=start.y;editor.undo.pop();notify('这里会和其他家具重叠');}
  editor.drag=null;renderStage();
 };
 window.addEventListener('pointermove',move);window.addEventListener('pointerup',up,{once:true});
}

function stageItemHtml(ins,life=false){
 const d=getDef(ins.itemId);if(!d)return'';
 const selected=!life&&editor.selected===ins.instanceId;
 return `<div class="hd-furniture ${selected?'selected':''} ${d.replaceGroup?'hd-main-item':''}" data-hd-instance="${ins.instanceId}" data-type="${d.type}" style="left:${ins.x}%;top:${ins.y}%;width:${d.w}%;--rot:${ins.rotation||0}deg;z-index:${Math.round(ins.y)}">${artSvg(d)}${selected?'<span class="hd-select-ring"></span>':''}</div>`;
}
function editorTemplate(){
 return `<section id="homeDecorOverlay" class="hd-overlay">
  <header class="hd-head">
   <div class="hd-brand"><b>Shawn & Elyn</b><span>Home Decor 1.0 · 真正可购买 / 可替换 / 可保存</span></div>
   <div class="hd-room-tabs" id="hdRoomTabs"></div>
   <div class="hd-balance" id="hdBalance"></div>
   <button class="hd-head-btn" id="hdPreviewBtn">👁 预览</button>
   <button class="hd-head-btn hd-close" id="hdCancelBtn">✕</button>
  </header>
  <aside class="hd-left" id="hdLeft"></aside>
  <main class="hd-stage-wrap"><div class="hd-room-name" id="hdRoomName"></div><div class="hd-stage" id="hdStage"></div></main>
  <aside class="hd-right">
   <button id="hdRotate">↻<span>旋转</span></button><button id="hdMove">✥<span>移动</span></button><button id="hdDelete">⌫<span>收起</span></button><button id="hdUndo">↶<span>撤销</span></button><button id="hdDayNight">☼<span>昼夜</span></button>
  </aside>
  <footer class="hd-dock"><div class="hd-mode-tabs"><button data-hd-mode="shop">商店</button><button data-hd-mode="owned">已拥有</button><button data-hd-mode="placed">已摆放</button></div><div class="hd-category-tabs" id="hdCategoryTabs"></div><div class="hd-catalog" id="hdCatalog"></div><div class="hd-dock-actions"><button class="hd-save" id="hdSave">💾 保存方案</button><button id="hdBackLife">返回生活模式</button></div></footer>
 </section>`;
}
function openEditor(room=state.room){
 if(!ELIGIBLE_ROOMS.includes(room)){notify('这个区域暂时不属于家居装修范围');return;}
 ensureData();
 editor.open=true;editor.room=room;editor.category='all';editor.mode='shop';editor.selected=null;editor.undo=[];editor.draft=deepClone(state.homeDecor);
 if(room==='study' && !(editor.draft.placements.study||[]).some(x=>getDef(x.itemId)?.type==='desk')){
  editor.draft.placements.study.push({instanceId:instanceId('desk_oak'),itemId:'desk_oak',x:38,y:55,rotation:0},{instanceId:instanceId('desk_oak'),itemId:'desk_oak',x:63,y:55,rotation:0});
 }
 document.body.classList.add('home-decor-open');
 document.getElementById('homeDecorOverlay')?.remove();
 document.body.insertAdjacentHTML('beforeend',editorTemplate());
 bindEditor();renderEditor();
}
function bindEditor(){
 const ov=document.getElementById('homeDecorOverlay');
 ov.addEventListener('click',e=>e.stopPropagation());ov.addEventListener('pointerdown',e=>e.stopPropagation());
 document.getElementById('hdCancelBtn').onclick=()=>closeEditor(false);
 document.getElementById('hdBackLife').onclick=()=>closeEditor(false);
 document.getElementById('hdSave').onclick=saveEditor;
 document.getElementById('hdRotate').onclick=rotateSelected;
 document.getElementById('hdDelete').onclick=removeSelected;
 document.getElementById('hdUndo').onclick=undo;
 document.getElementById('hdDayNight').onclick=toggleDayNight;
 document.getElementById('hdMove').onclick=()=>notify('直接拖动已摆放家具即可移动');
 document.getElementById('hdPreviewBtn').onclick=()=>document.body.classList.toggle('hd-preview-mode');
}
function closeEditor(saved){
 editor.open=false;editor.draft=null;editor.selected=null;editor.drag=null;
 document.getElementById('homeDecorOverlay')?.remove();
 document.body.classList.remove('home-decor-open','hd-preview-mode');
 if(saved){renderLifeLayer();applyHotspotAnchors();}
}
function saveEditor(){
 editor.draft.hasCustom=true;editor.draft.version=HD_VERSION;
 state.homeDecor=deepClone(editor.draft);
 if(typeof save==='function')save();
 if(typeof renderTaskUI==='function')renderTaskUI();
 closeEditor(true);notify('家居方案已保存 ♡');
}
function switchEditorRoom(room){
 editor.room=room;editor.selected=null;editor.category='all';
 if(room==='study' && !(editor.draft.placements.study||[]).some(x=>getDef(x.itemId)?.type==='desk')){
  editor.draft.placements.study.push({instanceId:instanceId('desk_oak'),itemId:'desk_oak',x:38,y:55,rotation:0},{instanceId:instanceId('desk_oak'),itemId:'desk_oak',x:63,y:55,rotation:0});
 }
 renderEditor();
}
function renderEditor(){renderEditorHeader();renderLeft();renderStage();renderCatalog();}
function renderEditorHeader(){
 const tabs=document.getElementById('hdRoomTabs');if(!tabs)return;
 tabs.innerHTML=ELIGIBLE_ROOMS.map(r=>`<button data-hd-room="${r}" class="${r===editor.room?'active':''}">${ROOM_LABELS[r]}</button>`).join('');
 tabs.querySelectorAll('[data-hd-room]').forEach(b=>b.onclick=()=>switchEditorRoom(b.dataset.hdRoom));
 const info=typeof levelInfo==='function'?levelInfo():{level:1,inLevel:0,need:250};
 document.getElementById('hdBalance').innerHTML=`<b>Lv.${info.level}</b><span>🪙 ${state.coins}</span><span>✨ ${info.inLevel}/${info.need}</span><span>❤️ ${state.love??0}/1000</span>`;
 document.getElementById('hdRoomName').innerHTML=`<b>${ROOM_LABELS[editor.room]}</b><span>拖动家具移动 · 购买后永久进入已拥有</span>`;
}
function roomCategories(){
 const ids=new Set(CATALOG.filter(d=>d.rooms.includes(editor.room)).map(d=>d.category));return ['all',...Object.keys(CATEGORY_LABELS).filter(k=>k!=='all'&&ids.has(k))];
}
function renderLeft(){
 const el=document.getElementById('hdLeft');const groups=[['all','全部'],['plant','植物'],['wall','墙面'],['pet','宠物'],['lighting','灯具']];
 el.innerHTML=`<div class="hd-side-title">装修</div>${groups.filter(([id])=>id==='all'||CATALOG.some(d=>d.rooms.includes(editor.room)&&d.category===id)).map(([id,label])=>`<button data-hd-left="${id}" class="${editor.category===id?'active':''}"><i>${CATEGORY_ICONS[id]}</i><span>${label}</span></button>`).join('')}`;
 el.querySelectorAll('[data-hd-left]').forEach(b=>b.onclick=()=>{editor.category=b.dataset.hdLeft;renderLeft();renderCatalog();});
}
function renderStage(){
 const st=document.getElementById('hdStage');if(!st)return;
 const room=ROOMS[editor.room];st.style.backgroundImage=`url('./assets/scenes/${room.bg}')`;st.classList.toggle('night',editor.draft.roomMode[editor.room]==='night');
 const list=editor.draft.placements[editor.room]||[];
 st.innerHTML=`<div class="hd-stage-shade"></div><div class="hd-gridlines"></div>${list.map(x=>stageItemHtml(x,false)).join('')}${editor.selected?'<div class="hd-selected-tip">拖动移动 · 右侧旋转 / 收起</div>':''}`;
 st.querySelectorAll('[data-hd-instance]').forEach(el=>{
  const ins=list.find(x=>x.instanceId===el.dataset.hdInstance);
  el.onpointerdown=e=>onFurniturePointerDown(e,ins);el.onclick=e=>{e.stopPropagation();selectInstance(ins.instanceId)};
 });
 st.onclick=e=>{if(e.target===st||e.target.classList.contains('hd-stage-shade')||e.target.classList.contains('hd-gridlines')){editor.selected=null;renderStage();}};
}
function renderCatalog(){
 const catTabs=document.getElementById('hdCategoryTabs');if(!catTabs)return;
 const cats=roomCategories();if(!cats.includes(editor.category))editor.category='all';
 catTabs.innerHTML=cats.map(c=>`<button data-hd-cat="${c}" class="${editor.category===c?'active':''}"><i>${CATEGORY_ICONS[c]||'•'}</i>${CATEGORY_LABELS[c]||c}</button>`).join('');
 catTabs.querySelectorAll('[data-hd-cat]').forEach(b=>b.onclick=()=>{editor.category=b.dataset.hdCat;renderCatalog();});
 document.querySelectorAll('[data-hd-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.hdMode===editor.mode);b.onclick=()=>{editor.mode=b.dataset.hdMode;renderCatalog();}});
 let items=CATALOG.filter(d=>d.rooms.includes(editor.room)&&(editor.category==='all'||d.category===editor.category));
 if(editor.mode==='owned')items=items.filter(d=>(editor.draft.owned[d.id]||0)>0);
 if(editor.mode==='placed'){const ids=new Set((editor.draft.placements[editor.room]||[]).map(x=>x.itemId));items=items.filter(d=>ids.has(d.id));}
 const root=document.getElementById('hdCatalog');
 root.innerHTML=items.length?items.map(d=>{
  const owned=editor.draft.owned[d.id]||0, placed=itemCountPlaced(editor.room,d.id,editor.draft), avail=availableCount(editor.room,d.id,editor.draft);
  let action='';
  if(editor.mode==='shop') action=((d.unique||d.price===0)&&owned>0)?`<button disabled>✓ 已拥有</button>`:`<button data-buy="${d.id}">${d.price===0?'免费':'购买 '+d.price+'🪙'}</button>`;
  else if(editor.mode==='owned') action=avail>0?`<button data-place="${d.id}">摆放</button>`:`<button disabled>已全部摆放</button>`;
  else action=`<button data-focus="${d.id}">选择</button>`;
  return `<article class="hd-card"><div class="hd-thumb">${artSvg(d)}</div><div class="hd-card-copy"><b>${d.name}</b><small>${owned?`已拥有 ${owned}`:`${d.price} Coins`} · 已摆 ${placed}</small></div>${action}</article>`;
 }).join(''):`<div class="hd-empty">这里暂时没有家具</div>`;
 root.querySelectorAll('[data-buy]').forEach(b=>b.onclick=e=>{e.stopPropagation();buyItem(b.dataset.buy)});
 root.querySelectorAll('[data-place]').forEach(b=>b.onclick=e=>{e.stopPropagation();placeItem(b.dataset.place)});
 root.querySelectorAll('[data-focus]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ins=(editor.draft.placements[editor.room]||[]).find(x=>x.itemId===b.dataset.focus);if(ins){editor.selected=ins.instanceId;renderStage();}});
}

function ensureEntryButton(){
 const top=document.querySelector('#gameScreen .topbar');if(!top||document.getElementById('homeDecorBtn'))return;
 const b=document.createElement('button');b.id='homeDecorBtn';b.className='iconbtn hd-entry-btn';b.title='全屋装修';b.textContent='🛋️ 装修';
 const task=document.getElementById('taskBookBtn');top.insertBefore(b,task||null);b.onclick=()=>openEditor(state.room);
 updateEntryButton();
}
function updateEntryButton(){const b=document.getElementById('homeDecorBtn');if(!b)return;const ok=ELIGIBLE_ROOMS.includes(state.room);b.disabled=!ok;b.classList.toggle('disabled',!ok);b.title=ok?`${ROOM_LABELS[state.room]} · 家居装修`:'这个区域不开放家居装修';}

function ensureLifeLayer(){
 const sceneEl=document.getElementById('scene');if(!sceneEl)return null;
 let layer=document.getElementById('homeDecorLifeLayer');
 if(!layer){layer=document.createElement('div');layer.id='homeDecorLifeLayer';layer.className='hd-life-layer';sceneEl.appendChild(layer);}return layer;
}
function renderLifeLayer(){
 ensureData();const layer=ensureLifeLayer();if(!layer)return;
 if(!ELIGIBLE_ROOMS.includes(state.room)){layer.innerHTML='';return;}
 const list=state.homeDecor.placements[state.room]||[];
 layer.innerHTML=list.map(x=>stageItemHtml(x,true)).join('');
 layer.classList.toggle('night',state.homeDecor.roomMode[state.room]==='night');
}
function anchorFor(ins,def){const a=def.anchor||[0,0];return [clamp(ins.x+a[0],8,92),clamp(ins.y+a[1],24,88)];}
function applyHotspotAnchors(){
 if(!ELIGIBLE_ROOMS.includes(state.room))return;
 const list=state.homeDecor?.placements?.[state.room]||[];const groups={};
 list.forEach(ins=>{const d=getDef(ins.itemId);if(!d?.hotspotAction)return;(groups[d.hotspotAction] ||= []).push(anchorFor(ins,d));});
 const root=document.getElementById('interactionLayer');if(!root)return;
 const hs=ROOMS[state.room]?.hotspots||[];
 hs.forEach((h,i)=>{const pts=groups[h.action];if(!pts?.length)return;const p=[pts.reduce((s,x)=>s+x[0],0)/pts.length,pts.reduce((s,x)=>s+x[1],0)/pts.length];const btn=root.children[i];if(btn){btn.style.left=p[0]+'%';btn.style.top=p[1]+'%';btn.dataset.decorAnchored='1';}});
}
function isBlockedByDecor(x,y){
 if(!ELIGIBLE_ROOMS.includes(state.room))return false;
 return (state.homeDecor?.placements?.[state.room]||[]).some(ins=>{const d=getDef(ins.itemId);if(!d||d.collision===false)return false;const wx=Math.max(3,d.w*.24),hy=Math.max(2.5,d.h*.24);return Math.abs(x-ins.x)<wx&&Math.abs(y-ins.y)<hy;});
}

function patchExistingGame(){
 try{
  if(typeof renderHotspots==='function'&&!renderHotspots.__hdPatched){const original=renderHotspots;const wrapped=function(){const r=original.apply(this,arguments);queueMicrotask(applyHotspotAnchors);return r;};wrapped.__hdPatched=true;renderHotspots=wrapped;}
  if(typeof enterRoom==='function'&&!enterRoom.__hdPatched){const original=enterRoom;const wrapped=function(){const r=original.apply(this,arguments);queueMicrotask(()=>{renderLifeLayer();updateEntryButton();applyHotspotAnchors();});return r;};wrapped.__hdPatched=true;enterRoom=wrapped;}
  if(typeof moveTo==='function'&&!moveTo.__hdPatched){const original=moveTo;const wrapped=function(x,y){if(isBlockedByDecor(x,y)){notify('这里有家具，换一个位置走 ♡');return;}return original.apply(this,arguments);};wrapped.__hdPatched=true;moveTo=wrapped;}
 }catch(err){console.warn('[Home Decor 1.0] safe patch skipped',err);}
}

function init(){
 ensureData();ensureEntryButton();patchExistingGame();renderLifeLayer();applyHotspotAnchors();
 window.HomeDecor10={open:openEditor,catalog:CATALOG,renderLifeLayer,version:HD_VERSION};
 console.info('[Shawn & Elyn] Home Decor 1.0 ready — additive module, legacy gameplay preserved.');
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
