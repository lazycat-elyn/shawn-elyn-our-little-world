import { DEFAULT_FRIDGE_POSITIONS, INGREDIENTS } from './data.js';

const KEY='shawn-elyn-city-home-recovered-v1';

function deepClone(v){ return JSON.parse(JSON.stringify(v)); }

export const DEFAULT_STATE = {
  started:false,
  active:'elyn',
  room:'living',
  roomPositions:{},
  loveLevel:3,
  love:420,
  loveMax:600,
  coins:1280,
  needs:{
    elyn:{hunger:78,energy:84,cleanliness:91,mood:92},
    shawn:{hunger:82,energy:88,cleanliness:89,mood:93}
  },
  fridge:{
    milk:4,orangeJuice:2,berryYogurt:2,plainYogurt:2,butter:3,cheese:3,eggs:8,
    strawberries:3,mushrooms:4,tomatoes:4,carrots:4,onions:4,sauces:5
  },
  fridgePositions:deepClone(DEFAULT_FRIDGE_POSITIONS),
  preparedMeals:[],
  dirtyDishes:0,
  mastery:{},
  lastAction:'Welcome home ♡',
  saveVersion:2
};

export function loadState(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw) return deepClone(DEFAULT_STATE);
    const saved=JSON.parse(raw);
    return {
      ...deepClone(DEFAULT_STATE),
      ...saved,
      needs:{...deepClone(DEFAULT_STATE.needs),...(saved.needs||{})},
      fridge:{...deepClone(DEFAULT_STATE.fridge),...(saved.fridge||{})},
      fridgePositions:{...deepClone(DEFAULT_STATE.fridgePositions),...(saved.fridgePositions||{})},
      mastery:{...(saved.mastery||{})},
      roomPositions:{...(saved.roomPositions||{})}
    };
  }catch(e){
    console.warn('Save could not be loaded',e);
    return deepClone(DEFAULT_STATE);
  }
}

export function saveState(state){
  state.lastSavedAt=new Date().toISOString();
  localStorage.setItem(KEY,JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('game-saved'));
}

export function resetState(){
  localStorage.removeItem(KEY);
  return deepClone(DEFAULT_STATE);
}

export function clampNeed(n){ return Math.max(0,Math.min(100,Math.round(n))); }

export function adjustNeed(state,who,key,amount){
  state.needs[who][key]=clampNeed(state.needs[who][key]+amount);
}

export function addLove(state,amount){
  state.love += amount;
  while(state.love>=state.loveMax){
    state.love-=state.loveMax;
    state.loveLevel++;
    state.loveMax=Math.round(state.loveMax*1.18);
  }
}

export function hasIngredients(state,required){
  return Object.entries(required).every(([id,n])=>(state.fridge[id]||0)>=n);
}

export function missingIngredients(state,required){
  return Object.entries(required)
    .filter(([id,n])=>(state.fridge[id]||0)<n)
    .map(([id,n])=>`${INGREDIENTS[id]?.label||id} ×${n-(state.fridge[id]||0)}`);
}

export function consumeIngredients(state,required){
  Object.entries(required).forEach(([id,n])=>{ state.fridge[id]=Math.max(0,(state.fridge[id]||0)-n); });
}
