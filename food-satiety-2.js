(()=>{
'use strict';

/* FOOD SATIETY 2.0
   Adds meal-size, food-quality and short digestion effects on top of Realistic Needs 1.0.
   Keeps Kitchen / Restaurant / Cafe / Picnic / Date systems intact and does not rewrite app.js.
   Human hunger still follows the realistic clock; different foods now keep Elyn/Shawn satisfied for different lengths of time. */

const PROFILE={
  full:{key:'full',label:'正餐',hunger:42,durationMin:120,rate:0.65,icon:'🍛'},
  medium:{key:'medium',label:'轻食',hunger:30,durationMin:60,rate:0.80,icon:'🥪'},
  snack:{key:'snack',label:'点心',hunger:14,durationMin:20,rate:0.95,icon:'🍰'},
  drink:{key:'drink',label:'饮料',hunger:3,durationMin:0,rate:1.00,icon:'🥤'}
};

const FULL_IDS=new Set(['friedRice','kimchiFriedRice','curryRice','bibimbap','creamPasta','carbonara','aglioOlio','tomatoPasta','macCheese','mushroomRisotto','teriyakiChicken','chickenChop','grilledSalmon','breakfastPlate']);
const MEDIUM_IDS=new Set(['omelette','tomatoEgg','ramen','udon','chickenSoup','tomatoSoup','mushroomSoup','cornSoup','eggSandwich','avocadoToast','frenchToast','pancakes','scrambledEggs']);
const SNACK_IDS=new Set(['fries','nuggets','chickenWings','hashBrowns','cookies','cupcakes','brownies','strawberryCake','crepes']);
const DRINK_IDS=new Set(['coffee','latte','hotChocolate','strawberryMilk']);

const QUALITY={
  PERFECT:{food:1.10,duration:1.10,mood:11,health:2},
  DELICIOUS:{food:1.06,duration:1.06,mood:9,health:1},
  TASTY:{food:1.00,duration:1.00,mood:6,health:1},
  NORMAL:{food:0.90,duration:0.92,mood:3,health:0},
  'NOT TASTY':{food:0.72,duration:0.72,mood:-5,health:-1},
  UNDERCOOKED:{food:0.58,duration:0.58,mood:-6,health:-5},
  BURNT:{food:0.55,duration:0.55,mood:-7,health:-3}
};

function S(){try{return typeof state!=='undefined'?state:null}catch(_){return null}}
function clamp(v,a=0,b=100){return Math.max(a,Math.min(b,v))}
function saveSafe(){try{if(typeof save==='function')save()}catch(_){} }
function toastSafe(t){try{if(typeof toast==='function')toast(t)}catch(_){} }
function nameOf(id){return id==='shawn'?'Shawn':'Elyn'}
function humanIdsFor(together){const me=S()?.active==='shawn'?'shawn':'elyn';return together?[me,me==='elyn'?'shawn':'elyn']:[me]}

function ensure(){
 const s=S();if(!s)return null;
 s.foodSatiety2=s.foodSatiety2||{elyn:null,shawn:null,history:[]};
 if(!Array.isArray(s.foodSatiety2.history))s.foodSatiety2.history=[];
 return s.foodSatiety2;
}

function profileFor(recipeId){
 let recipe=null;
 try{recipe=(typeof RECIPES!=='undefined'&&RECIPES)?RECIPES[recipeId]:null}catch(_){}
 if(DRINK_IDS.has(recipeId)||recipe?.cat==='饮料')return PROFILE.drink;
 if(SNACK_IDS.has(recipeId)||['甜点','烘焙','小吃'].includes(recipe?.cat))return PROFILE.snack;
 if(MEDIUM_IDS.has(recipeId))return PROFILE.medium;
 if(FULL_IDS.has(recipeId))return PROFILE.full;
 if(recipeId==='__custom'){
   const count=Array.isArray(recipe?.customIngredients)?recipe.customIngredients.length:0;
   return count>=3?PROFILE.full:PROFILE.medium;
 }
 if(recipe?.cat==='早餐')return PROFILE.medium;
 return PROFILE.full;
}

function qualityFor(q){return QUALITY[q]||QUALITY.NORMAL}

function setSatiety(id,p,source,quality='NORMAL',overrideDuration=null){
 const s=S(),box=ensure();if(!s?.needs?.[id]||!box)return;
 const q=qualityFor(quality),now=Date.now();
 const mins=overrideDuration==null?Math.round(p.durationMin*q.duration):overrideDuration;
 box[id]=mins>0?{
   tier:p.key,label:p.label,source:source||p.label,startedAt:now,until:now+mins*60000,rate:p.rate
 }:null;
 box.history.unshift({id,source:source||p.label,tier:p.key,quality,time:now});
 box.history=box.history.slice(0,30);
}

function satietyText(id){
 const box=ensure(),x=box?.[id];if(!x||x.until<=Date.now())return '';
 const mins=Math.max(1,Math.ceil((x.until-Date.now())/60000));
 const time=mins>=60?`${Math.floor(mins/60)}h ${mins%60}m`:`${mins}m`;
 const icon=x.tier==='full'?'🍛':x.tier==='medium'?'🥪':'🍰';
 return `${icon} ${x.label}饱足 · ${time}`;
}

function renderBadges(){
 ['elyn','shawn'].forEach(id=>{
   const card=document.querySelector(`[data-needs="${id}"]`);if(!card)return;
   card.querySelector('.satiety2-badge')?.remove();
   const text=satietyText(id);if(!text)return;
   const host=card.querySelector('.needs-name')||card;
   const el=document.createElement('small');el.className='satiety2-badge';el.textContent=text;
   el.style.cssText='display:block;margin-top:2px;font-size:9px;font-weight:800;color:#8b684f;opacity:.86;white-space:nowrap';
   host.appendChild(el);
 });
}

function applyMealEffect(id,p,quality,source){
 const s=S();if(!s?.needs?.[id])return;
 const q=qualityFor(quality),n=s.needs[id];
 const before=n.hunger;
 const hungerDrop=Math.round(p.hunger*q.food);
 const mood=q.mood+(p.key==='drink'?2:0);
 const health=p.key==='drink'?Math.min(0,q.health):q.health;
 try{adjustNeeds(id,{hunger:-hungerDrop,mood,health})}catch(_){
   n.hunger=clamp(n.hunger-hungerDrop);n.mood=clamp(n.mood+mood);n.health=clamp(n.health+health);
 }
 setSatiety(id,p,source,quality);
 if(before<=16&&(p.key==='full'||p.key==='medium')){
   const box=ensure();if(box?.[id])box[id].until+=30*60000;
   toastSafe(`${nameOf(id)} 已经很饱了，吃得有点撑 😵‍💫`);
 }
}

function patchedFinishVisibleEating(mealId,together){
 const s=S();if(!s)return;
 const m=s.preparedMeals?.find(x=>x.id===mealId);if(!m)return;
 const n=together?2:1;
 m.servings-=n;s.dirtyDishes+=n;
 const p=profileFor(m.recipeId);
 humanIdsFor(together).forEach(id=>applyMealEffect(id,p,m.quality,m.label));
 try{recordEvent('eatMeal',1);if(together)recordEvent('eatTogether',1)}catch(_){}
 if(m.servings<=0)s.preparedMeals=s.preparedMeals.filter(x=>x.id!==mealId);
 saveSafe();renderBadges();
 document.querySelectorAll('.food-portion').forEach(x=>{x.textContent='';x.parentElement?.classList.add('dirty')});
 const status=document.querySelector('#diningStatus');
 if(status){
   const effect=p.key==='full'?'正餐会维持更久':p.key==='medium'?'轻食饱足一阵子':p.key==='snack'?'点心只能暂时垫肚子':'饮料不能代替正餐';
   status.innerHTML=`吃完了 · ${m.qualityCn||m.quality} · ${effect} ♡ <button class="mama-btn" id="carryPlate">拿盘子去洗</button> <button class="mama-btn secondary" id="leavePlate">先放桌上</button>`;
   const leave=document.querySelector('#leavePlate');if(leave)leave.onclick=()=>{document.querySelector('.dining-play-overlay')?.remove();toastSafe(`留下 ${n} 个脏盘子`)};
   const carry=document.querySelector('#carryPlate');if(carry)carry.onclick=()=>{try{carryPlatesToSink(n)}catch(_){}};
 }
}

function installEatingPatch(){
 try{finishVisibleEating=patchedFinishVisibleEating}catch(_){window.finishVisibleEating=patchedFinishVisibleEating}
}

function installElapsedPatch(){
 let base=null;try{base=applyNeedsElapsed}catch(_){}
 if(typeof base!=='function'||base.__satiety2)return;
 const wrapped=function(){
   const s=S();if(!s?.needs)return base();
   const before={elyn:s.needs.elyn?.hunger,shawn:s.needs.shawn?.hunger};
   const last=Number.isFinite(s.needsUpdatedAt)?s.needsUpdatedAt:Date.now();
   const now=Date.now();
   base();
   const box=ensure();
   ['elyn','shawn'].forEach(id=>{
     const x=box?.[id],n=s.needs[id];if(!x||!n||!Number.isFinite(before[id]))return;
     if(x.until<=last){box[id]=null;return}
     const delta=n.hunger-before[id];if(delta<=0)return;
     const total=Math.max(1,now-last);
     const active=Math.max(0,Math.min(now,x.until)-last);
     const fraction=clamp(active/total,0,1);
     const avgRate=(1-fraction)+(fraction*(Number.isFinite(x.rate)?x.rate:1));
     n.hunger=clamp(before[id]+delta*avgRate);
     if(x.until<=now)box[id]=null;
   });
 };
 wrapped.__satiety2=true;wrapped.__base=base;
 try{applyNeedsElapsed=wrapped}catch(_){window.applyNeedsElapsed=wrapped}
}

function installOutingPatch(){
 let base=null;try{base=runOutingAction}catch(_){}
 if(typeof base!=='function'||base.__satiety2)return;
 const wrapped=function(place,a){
   const s=S(),me=s?.active==='shawn'?'shawn':'elyn',partner=me==='elyn'?'shawn':'elyn';
   const coinsBefore=s?.coins,needsBefore=JSON.stringify(s?.needs||{});
   const out=base.apply(this,arguments);
   if(!s||((coinsBefore===s.coins)&&(needsBefore===JSON.stringify(s.needs||{}))))return out;
   if(a==='dinner'){setSatiety(me,PROFILE.full,'外出晚餐','TASTY',120);setSatiety(partner,PROFILE.full,'外出晚餐','TASTY',120)}
   else if(a==='meal'){setSatiety(me,PROFILE.full,'套餐','TASTY',95)}
   else if(a==='picnic'){setSatiety(me,PROFILE.medium,'野餐','TASTY',65);setSatiety(partner,PROFILE.medium,'野餐','TASTY',65)}
   else if(a==='cafedate'||a==='dessert'||a==='snack'||a==='popcorn')setSatiety(me,PROFILE.snack,a==='popcorn'?'爆米花':a==='snack'?'零食':'甜点','TASTY',25);
   else if(a==='drink'||a==='quickdrink')setSatiety(me,PROFILE.drink,'饮料','NORMAL',0);
   renderBadges();saveSafe();return out;
 };
 wrapped.__satiety2=true;wrapped.__base=base;
 try{runOutingAction=wrapped}catch(_){window.runOutingAction=wrapped}
}

function boot(){
 ensure();installEatingPatch();installElapsedPatch();installOutingPatch();renderBadges();
 clearInterval(window.__foodSatiety2Timer);
 window.__foodSatiety2Timer=setInterval(renderBadges,15000);
 window.FOOD_SATIETY_2={version:'2.0',profileFor,render:renderBadges,get:id=>ensure()?.[id]||null};
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
