MASTER 2.6.1 — CLEAN BASE SAFE TEST

Purpose:
- Replace the currently corrupted Elyn/Shawn live base sprites with clean, single-piece PNG characters.
- Remove the visible center seams, clipped hair and alpha holes seen in the previous test.

IMPORTANT:
- This is a SAFE TEST build.
- To isolate the corruption problem, all 6 movement states temporarily use the same clean FRONT sprite.
- This means movement direction art is not final yet, but the character itself should stay visually clean.
- Wardrobe outfit sprites are NOT rebuilt in this patch.
- Fishing, Fridge, Recipes, Go Out, Cars, Kitchen, Pets and Tasks are not modified.

Install:
1. Extract this ZIP.
2. Open MASTER261_CLEAN_BASE_SAFE_TEST.
3. Copy the "assets" folder into your local shawn-elyn-our-little-world repository.
4. Replace files when Windows asks.
5. GitHub Desktop Summary: MASTER 2.6.1 clean base safe test
6. Commit to main.
7. Push origin.
8. Refresh StackBlitz.

Test:
- Check Elyn and Shawn in the live room/lake scene.
- Confirm Elyn has full hair on both sides.
- Confirm Shawn has no white center strip.
- Confirm both bodies are solid and clean.
