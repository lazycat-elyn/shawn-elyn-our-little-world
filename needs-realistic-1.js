(()=>{
'use strict';

/* REALISTIC NEEDS 1.0
   Human and pet needs now move on real-life-inspired time scales instead of arcade-fast decay.
   This file is deliberately loaded BEFORE app.js: it snapshots saved needs so app.js cannot apply
   its legacy fast offline decay once on startup. After DOMContentLoaded it restores the snapshot,
   installs the realistic decay function, applies elapsed time once, and leaves all other gameplay intact. */

const KEY='worldRebuild1';
let savedSnapshot=null;
try{
  const raw=localStorage.getItem(KEY);
  if(raw){
    const parsed=JSON.parse(raw);
    if(parsed?.needs && Number.isFinite(parsed?.needsUpdatedAt)){
      savedSnapshot={
        needs:JSON.parse(JSON.stringify(parsed.needs)),
        needsUpdatedAt:parsed.needsUpdatedAt
      };
    }
  }
}catch(_){ }

function clamp(v){return Math.max(0,Math.min(100,v))}
function localHourAt(ms){return new Date(ms).getHours()}

/* Points per real minute.
   Hunger targets roughly meal-to-meal rhythms rather than becoming severe in under an hour.
   Human tiredness rises across a waking day and is a little faster late at night.
   Cleanliness is a daily-scale need. Dogs and cats use slower feeding rhythms and species-specific sleep pressure. */
function humanSleepRate(hour){
  if(hour>=23||hour<6)return 0.085;
  if(hour>=20)return 0.065;
  if(hour>=6&&hour<10)return 0.035;
  return 0.050;
}
function petSleepRate(id,hour){
  const base=id==='bubu'?0.085:0.065;
  return (hour>=22||hour<6)?base*1.15:base;
}

function realisticApplyNeedsElapsed(){
  if(typeof state==='undefined'||!state?.needs)return;
  const now=Date.now();
  const last=Number.isFinite(state.needsUpdatedAt)?state.needsUpdatedAt:now;
  // Simulate at most 8 unattended hours: realistic enough to matter without punishing long absences.
  const mins=Math.min(480,Math.max(0,(now-last)/60000));
  if(mins<=0){state.needsUpdatedAt=now;return}
  const midpoint=last+(now-last)/2;
  const hour=localHourAt(midpoint);

  ['shawn','elyn'].forEach(id=>{
    const n=state.needs[id]; if(!n)return;
    // ~8.4 hunger points/hour: from 30 to "very hungry" takes about 5.5-6 hours.
    n.hunger=clamp(n.hunger+mins*0.14);
    // Waking-day sleep pressure instead of becoming exhausted in roughly an hour.
    n.sleepiness=clamp(n.sleepiness+mins*humanSleepRate(hour));
    // ~1.5 cleanliness points/hour: showering is a daily-scale need.
    if(Number.isFinite(n.cleanliness))n.cleanliness=clamp(n.cleanliness-mins*0.025);
    // Mood/health only suffer after sustained, genuinely severe neglect.
    if(n.hunger>86||n.sleepiness>90)n.mood=clamp(n.mood-mins*0.018);
    if(n.hunger>97||n.sleepiness>98)n.health=clamp(n.health-mins*0.004);
  });

  const dog=state.needs.dudu;
  if(dog){
    // Adult-dog-style rhythm: severe hunger roughly 9-11 hours after a normal starting state.
    dog.hunger=clamp(dog.hunger+mins*0.070);
    dog.sleepiness=clamp(dog.sleepiness+mins*petSleepRate('dudu',hour));
    if(dog.hunger>88||dog.sleepiness>92)dog.mood=clamp(dog.mood-mins*0.014);
    if(dog.hunger>98)dog.health=clamp(dog.health-mins*0.003);
  }

  const cat=state.needs.bubu;
  if(cat){
    // Cats commonly eat smaller meals and sleep more; hunger is slower, sleep pressure slightly faster.
    cat.hunger=clamp(cat.hunger+mins*0.055);
    cat.sleepiness=clamp(cat.sleepiness+mins*petSleepRate('bubu',hour));
    if(cat.hunger>88||cat.sleepiness>92)cat.mood=clamp(cat.mood-mins*0.014);
    if(cat.hunger>98)cat.health=clamp(cat.health-mins*0.003);
  }

  state.needsUpdatedAt=now;
}

window.addEventListener('DOMContentLoaded',()=>{
  if(typeof state==='undefined')return;

  // Undo only the legacy startup need decay; preserve every other state change made by app.js.
  if(savedSnapshot){
    state.needs=JSON.parse(JSON.stringify(savedSnapshot.needs));
    state.needsUpdatedAt=savedSnapshot.needsUpdatedAt;
  }

  // Replace the legacy globally declared function used by the existing 30-second game loop.
  window.applyNeedsElapsed=realisticApplyNeedsElapsed;
  try{applyNeedsElapsed=realisticApplyNeedsElapsed}catch(_){ }
  realisticApplyNeedsElapsed();

  try{renderNeedsUI?.();renderMapHud?.();save?.()}catch(_){ }
  window.REALISTIC_NEEDS_1={
    version:'1.0',
    human:{hungerPerHour:8.4,cleanlinessLossPerHour:1.5},
    dog:{hungerPerHour:4.2},
    cat:{hungerPerHour:3.3},
    offlineCapHours:8
  };
},{once:true});
})();
