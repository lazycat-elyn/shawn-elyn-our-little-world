SHAWN & ELYN — MASTER 2.5.4 GITHUB PATCH

WHAT THIS PATCH CHANGES
1. Elyn + Shawn wardrobe sprites: head/hair/face area repaired across 480 outfit pose PNGs.
2. Recipe Book: 40 recipe IDs now point to 40 separate image files under assets/food/recipes40/.
3. Cooking UI: redesigned into Recipe Book + Fridge + Recipe Detail layout matching the approved mockup direction.
4. Fridge: default showcase view now uses a full, stocked 40-ingredient fridge image. The existing drag/rearrange gameplay remains available through "整理食材" mode.
5. Fishing and unrelated systems are not intentionally changed.

INSTALL INTO YOUR GITHUB REPOSITORY
- Extract this ZIP.
- Copy ALL contents inside the extracted folder into shawn-elyn-our-little-world.
- Replace files when Windows asks.
- GitHub Desktop: Commit to main -> Push origin.
- Refresh/reopen StackBlitz from the GitHub repository.

VALIDATION
- app.js: node --check passed.
- 40 recipe image files found and all paths are unique.
- 40 fridge ingredient asset paths retained.
- Elyn outfit poses: 240 PNGs.
- Shawn outfit poses: 240 PNGs.
