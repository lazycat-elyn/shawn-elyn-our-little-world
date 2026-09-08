# Recovery Notes

## What was recovered from the user's Library

The Library contained a project Site record for **Shawn & Elyn · City Home** and a 141 MB handoff ZIP named `Our_Little_World_FULL_Work_Transfer_Pack.zip`.

The handoff pack contained the master GDD, visual direction, home collision plan, character/pet interactions, economy, minigame specs, UI flow, realtime tech notes, roadmap, configuration JSON, Shawn/Elyn reference deck, and four visual references.

Later Work runs also left production art assets for:

- Elyn and Shawn pose sheets
- Momo and Mochi
- six-room apartment atlas
- high-detail kitchen
- empty fridge interior
- refrigerator ingredients
- finished food dishes
- kitchen appliances
- bathroom/couple interaction sheets
- dining chair and later Kitchen milestone art

## What could not be recovered

No Library file contained the old Work cloud directory with the original `src/`, `package.json`, or JavaScript/TypeScript source. The deployed `chatgpt.site` projection itself is not materializable as source code from this chat environment.

Therefore the runtime in this ZIP is reconstructed. The artwork and design data are preserved wherever possible.

## Original preferred stack from the surviving game config

- Game: Phaser 3
- Build: Vite + TypeScript
- Backend later: Supabase
- Deployment: Vercel / Netlify

## Current recovered stack

- HTML
- CSS
- ES Modules / vanilla JavaScript
- Vite for optional dev/build commands
- localStorage for saves

The recovered stack was chosen to make the project immediately portable to StackBlitz and to avoid blocking the user on missing dependencies while Work is limited.


## StackBlitz Lite
This package omits the large original/reference atlases under assets/source. All runtime assets used by the game are included.
