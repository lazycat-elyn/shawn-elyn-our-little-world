export const ROOMS = {
  living: {
    label: 'Living Room', icon: '♡', bg: './assets/backgrounds/living.jpg',
    defaults: { elyn: [73, 86], shawn: [85, 86], momo: [18, 88], mochi: [92, 88] },
    navigation: {
      grid: 2,
      bounds: { minX: 6, maxX: 95, minY: 62, maxY: 91 },
      obstacles: [
        { id:'tv-console', label:'TV console', type:'rect', x1:3, y1:58, x2:26, y2:83, padding:1.2 },
        { id:'coffee-table', label:'Coffee table', type:'rect', x1:31, y1:71, x2:66, y2:84, padding:1.4 },
        { id:'sofa', label:'Sofa', type:'rect', x1:50, y1:55, x2:97, y2:73, padding:1.2 }
      ]
    },
    hotspots: [
      { id:'sofa', label:'Sofa', icon:'🛋️', x:76, y:55, anchor:[77,79], action:'sofa' },
      { id:'tv', label:'Watch TV', icon:'📺', x:12, y:45, anchor:[29,67], action:'tv' }
    ]
  },
  kitchen: {
    label: 'Kitchen & Dining', icon:'🍳', bg:'./assets/backgrounds/kitchen-hq.jpg',
    defaults: { elyn:[54,82], shawn:[64,83], momo:[29,89], mochi:[85,89] },
    navigation: {
      grid: 2,
      bounds: { minX: 5, maxX: 95, minY: 55, maxY: 94 },
      obstacles: [
        { id:'island', label:'Kitchen island', type:'rect', x1:0, y1:41, x2:48, y2:66, padding:1.2 },
        { id:'dining-table', label:'Dining table', type:'rect', x1:70, y1:40, x2:98, y2:68, padding:1.1 },
        { id:'plant', label:'Plant', type:'rect', x1:62, y1:38, x2:68, y2:59, padding:.8 }
      ]
    },
    hotspots: [
      { id:'fridge', label:'Open Fridge', icon:'🧊', x:8, y:28, anchor:[14,70], action:'fridge' },
      { id:'stove', label:'Cook', icon:'🍳', x:42, y:33, anchor:[41,70], action:'cook' },
      { id:'oven', label:'Bake', icon:'🧁', x:36, y:42, anchor:[35,70], action:'cook' },
      { id:'sink', label:'Wash Dishes', icon:'🫧', x:11, y:47, anchor:[12,70], action:'washDishes' },
      { id:'dining', label:'Dining', icon:'🍽️', x:82, y:48, anchor:[79,73], action:'dining' },
      { id:'coffee', label:'Coffee', icon:'☕', x:59, y:35, anchor:[58,68], action:'coffee' }
    ]
  },
  study: {
    label:'Study', icon:'💻', bg:'./assets/backgrounds/study.jpg',
    defaults:{ elyn:[43,83], shawn:[58,84], momo:[74,88], mochi:[17,88] },
    navigation:{
      grid:2,
      bounds:{minX:6,maxX:95,minY:58,maxY:93},
      obstacles:[
        {id:'desk-bank',label:'Desk',type:'rect',x1:18,y1:31,x2:72,y2:58,padding:1.0},
        {id:'chair-left',label:'Desk chair',type:'rect',x1:25,y1:49,x2:40,y2:67,padding:.9},
        {id:'chair-right',label:'Desk chair',type:'rect',x1:48,y1:49,x2:63,y2:67,padding:.9},
        {id:'reading-chair',label:'Reading chair',type:'rect',x1:77,y1:46,x2:95,y2:70,padding:1.0}
      ]
    },
    hotspots:[
      {id:'desk',label:'Study',icon:'📚',x:38,y:42,anchor:[32,72],action:'study'},
      {id:'pc',label:'Use PC',icon:'🖥️',x:57,y:37,anchor:[56,72],action:'pc'},
      {id:'read',label:'Read',icon:'📖',x:84,y:45,anchor:[73,75],action:'read'}
    ]
  },
  balcony: {
    label:'Balcony', icon:'🌆', bg:'./assets/backgrounds/balcony.jpg',
    defaults:{ elyn:[39,83], shawn:[61,84], momo:[82,88], mochi:[20,88] },
    navigation:{
      grid:2,
      bounds:{minX:7,maxX:94,minY:58,maxY:93},
      obstacles:[
        {id:'left-chair',label:'Balcony chair',type:'rect',x1:15,y1:43,x2:35,y2:67,padding:1},
        {id:'right-chair',label:'Balcony chair',type:'rect',x1:51,y1:43,x2:72,y2:67,padding:1},
        {id:'coffee-table',label:'Balcony table',type:'rect',x1:37,y1:54,x2:52,y2:69,padding:1},
        {id:'left-planter',label:'Planter',type:'rect',x1:2,y1:43,x2:14,y2:67,padding:.7},
        {id:'right-planters',label:'Planters',type:'rect',x1:76,y1:46,x2:96,y2:68,padding:.7}
      ]
    },
    hotspots:[
      {id:'city',label:'Watch City',icon:'✨',x:49,y:30,anchor:[45,74],action:'watchCity'},
      {id:'balconyTalk',label:'Talk Together',icon:'💬',x:62,y:51,anchor:[56,75],action:'balconyTalk'},
      {id:'photo',label:'Take Photo',icon:'📷',x:35,y:52,anchor:[31,75],action:'photo'}
    ]
  },
  bathroom: {
    label:'Bathroom', icon:'🛁', bg:'./assets/backgrounds/bathroom.jpg',
    defaults:{ elyn:[43,84], shawn:[59,85], momo:[28,90], mochi:[83,89] },
    navigation:{
      grid:2,
      bounds:{minX:6,maxX:94,minY:58,maxY:94},
      obstacles:[
        {id:'toilet',label:'Toilet',type:'rect',x1:4,y1:43,x2:18,y2:68,padding:1},
        {id:'bathtub',label:'Bathtub',type:'rect',x1:18,y1:36,x2:54,y2:59,padding:1},
        {id:'shower',label:'Shower',type:'rect',x1:55,y1:28,x2:70,y2:60,padding:1},
        {id:'vanity',label:'Vanity',type:'rect',x1:75,y1:42,x2:99,y2:76,padding:1}
      ]
    },
    hotspots:[
      {id:'bathSink',label:'Wash Face',icon:'💧',x:84,y:52,anchor:[71,79],action:'washFace'},
      {id:'shower',label:'Shower',icon:'🚿',x:63,y:34,anchor:[62,65],action:'shower'},
      {id:'bath',label:'Take Bath',icon:'🛁',x:35,y:49,anchor:[38,64],action:'bath'},
      {id:'mirror',label:'Skincare',icon:'🪞',x:87,y:34,anchor:[71,77],action:'skincare'}
    ]
  },
  bedroom: {
    label:'Bedroom', icon:'🌙', bg:'./assets/backgrounds/bedroom.jpg',
    defaults:{ elyn:[40,84], shawn:[60,85], momo:[17,89], mochi:[85,89] },
    navigation:{
      grid:2,
      bounds:{minX:7,maxX:94,minY:60,maxY:94},
      obstacles:[
        {id:'bed',label:'Bed',type:'rect',x1:25,y1:37,x2:73,y2:70,padding:1.3},
        {id:'left-shelf',label:'Shelf',type:'rect',x1:8,y1:26,x2:19,y2:60,padding:.7},
        {id:'window-bench',label:'Window bench',type:'rect',x1:77,y1:42,x2:96,y2:68,padding:.8}
      ]
    },
    hotspots:[
      {id:'bed',label:'Sleep / Rest',icon:'🛏️',x:50,y:49,anchor:[49,76],action:'sleep'},
      {id:'goodnight',label:'Goodnight Hug',icon:'♡',x:64,y:54,anchor:[63,78],action:'goodnight'}
    ]
  },
  closet: {
    label:'Walk-in Closet', icon:'👕', bg:'./assets/backgrounds/closet.jpg',
    defaults:{ elyn:[43,84], shawn:[59,85], momo:[32,90], mochi:[68,90] },
    navigation:{
      grid:2,
      bounds:{minX:7,maxX:93,minY:58,maxY:94},
      obstacles:[
        {id:'left-cabinets',label:'Wardrobe',type:'rect',x1:4,y1:20,x2:23,y2:75,padding:1},
        {id:'right-cabinets',label:'Wardrobe',type:'rect',x1:74,y1:20,x2:97,y2:75,padding:1},
        {id:'bench',label:'Closet bench',type:'rect',x1:34,y1:48,x2:62,y2:69,padding:1},
        {id:'vanity',label:'Vanity',type:'rect',x1:31,y1:27,x2:70,y2:54,padding:.8}
      ]
    },
    hotspots:[
      {id:'closetMirror',label:'Check Appearance',icon:'🪞',x:51,y:34,anchor:[66,71],action:'appearance'},
      {id:'outfit',label:'Outfits',icon:'👚',x:18,y:37,anchor:[28,79],action:'outfit'}
    ]
  },
  pets: {
    label:'Pet Corner', icon:'🐾', bg:'./assets/backgrounds/pet-corner.jpg',
    defaults:{ elyn:[43,84], shawn:[58,85], momo:[37,77], mochi:[64,83] },
    navigation:{
      grid:2,
      bounds:{minX:7,maxX:92,minY:62,maxY:92},
      obstacles:[
        {id:'cat-tower',label:'Cat tower',type:'rect',x1:39,y1:25,x2:72,y2:72,padding:1},
        {id:'pet-bed',label:'Pet bed',type:'rect',x1:72,y1:59,x2:97,y2:86,padding:1},
        {id:'bowls',label:'Pet bowls',type:'rect',x1:7,y1:73,x2:31,y2:92,padding:.7}
      ]
    },
    hotspots:[
      {id:'feedPets',label:'Feed Pets',icon:'🥣',x:24,y:73,anchor:[34,84],action:'feedPets'},
      {id:'playPets',label:'Play',icon:'🧶',x:58,y:55,anchor:[55,82],action:'playPets'}
    ]
  }
};

export const CHARACTERS = {
  elyn: {
    label:'Elyn',
    sprites:{
      idle:'./assets/characters/elyn/idle-front.png',
      side:'./assets/characters/elyn/idle-side.png',
      walkRight:'./assets/characters/elyn/walk-right.png',
      walkLeft:'./assets/characters/elyn/walk-left.png',
      sit:'./assets/characters/elyn/sit.png',
      happy:'./assets/characters/elyn/happy.png'
    }
  },
  shawn: {
    label:'Shawn',
    sprites:{
      idle:'./assets/characters/shawn/idle-front.png',
      side:'./assets/characters/shawn/idle-side.png',
      walkRight:'./assets/characters/shawn/walk-right.png',
      walkLeft:'./assets/characters/shawn/walk-left.png',
      sit:'./assets/characters/shawn/sit.png',
      happy:'./assets/characters/shawn/happy.png'
    }
  }
};

export const PETS = {
  momo:{ label:'Momo', sprite:'./assets/pets/momo.png' },
  mochi:{ label:'Mochi', sprite:'./assets/pets/mochi.png' }
};

export const INGREDIENTS = {
  milk:{label:'Milk',img:'./assets/fridge/milk.png'},
  orangeJuice:{label:'Orange Juice',img:'./assets/fridge/orange-juice.png'},
  berryYogurt:{label:'Berry Yogurt',img:'./assets/fridge/berry-yogurt.png'},
  plainYogurt:{label:'Plain Yogurt',img:'./assets/fridge/plain-yogurt.png'},
  butter:{label:'Butter',img:'./assets/fridge/butter.png'},
  cheese:{label:'Cheese',img:'./assets/fridge/cheese.png'},
  eggs:{label:'Eggs',img:'./assets/fridge/eggs.png'},
  strawberries:{label:'Strawberries',img:'./assets/fridge/strawberries.png'},
  mushrooms:{label:'Mushrooms',img:'./assets/fridge/mushrooms.png'},
  tomatoes:{label:'Tomatoes',img:'./assets/fridge/tomatoes.png'},
  carrots:{label:'Carrots',img:'./assets/fridge/carrots.png'},
  onions:{label:'Onions',img:'./assets/fridge/onions.png'},
  sauces:{label:'Sauces',img:'./assets/fridge/sauces.png'}
};

export const DEFAULT_FRIDGE_POSITIONS = {
  milk:[24,24], orangeJuice:[38,24], berryYogurt:[54,24], plainYogurt:[66,24], butter:[78,25],
  cheese:[26,45], eggs:[43,45], strawberries:[61,45], mushrooms:[77,45],
  tomatoes:[27,66], carrots:[45,68], onions:[62,66], sauces:[84,66]
};

export const RECIPES = {
  friedRice:{
    label:'Fried Rice', img:'./assets/food/fried-rice.png', difficulty:'Medium',
    ingredients:{eggs:1,carrots:1,onions:1,sauces:1}, steps:['timing','season','heat','plate']
  },
  creamPasta:{
    label:'Cream Mushroom Pasta', img:'./assets/food/cream-pasta.png', difficulty:'Medium',
    ingredients:{milk:1,mushrooms:1,cheese:1,butter:1}, steps:['timing','stir','heat','plate']
  },
  omelette:{
    label:'Omelette', img:'./assets/food/omelette.png', difficulty:'Easy',
    ingredients:{eggs:2,milk:1,butter:1}, steps:['stir','heat','timing','plate']
  },
  tomatoEgg:{
    label:'Tomato Egg', img:'./assets/food/tomato-egg.png', difficulty:'Easy',
    ingredients:{eggs:2,tomatoes:1,sauces:1}, steps:['timing','stir','heat','plate']
  },
  ramen:{
    label:'Ramen', img:'./assets/food/ramen.png', difficulty:'Medium',
    ingredients:{eggs:1,mushrooms:1,onions:1}, steps:['heat','timing','season','plate']
  },
  curryRice:{
    label:'Japanese Curry Rice', img:'./assets/food/curry-rice.png', difficulty:'Medium',
    ingredients:{carrots:1,onions:1,butter:1}, steps:['timing','stir','heat','plate']
  },
  mushroomSoup:{
    label:'Mushroom Soup', img:'./assets/food/mushroom-soup.png', difficulty:'Easy',
    ingredients:{milk:1,mushrooms:2,butter:1}, steps:['timing','stir','season','plate']
  },
  fries:{
    label:'Air Fryer Fries', img:'./assets/food/fries.png', difficulty:'Medium',
    ingredients:{sauces:1}, steps:['timing','season','heat','plate']
  },
  cookies:{
    label:'Cookies', img:'./assets/food/cookies.png', difficulty:'Medium',
    ingredients:{eggs:1,butter:1,milk:1}, steps:['stir','timing','heat','plate']
  },
  strawberryCake:{
    label:'Strawberry Cake', img:'./assets/food/strawberry-cake.png', difficulty:'Hard',
    ingredients:{eggs:2,milk:1,butter:1,strawberries:1}, steps:['timing','stir','heat','plate']
  }
};

export const STEP_LABELS = {
  timing:'Prep & Chop', stir:'Mix / Stir', heat:'Heat & Timing', season:'Seasoning', plate:'Plating'
};
