MASTER 2.6.2 — FORCE CLEAN CHARACTER FIX

WHY 2.6.1 DID NOT WORK
The game code was still loading:
assets/wardrobe_real/outfits/.../<direction>.png
for Elyn and Shawn, so replacing assets/sprites alone could not change the live actors.

WHAT 2.6.2 CHANGES
- app.js now forces live Elyn/Shawn to use assets/sprites_clean_v262/
- index.html also starts with the new uncached clean sprite path
- old wardrobe data, purchases and selected outfit IDs are preserved
- broken wardrobe_real PNGs are temporarily NOT rendered in the live character
- wardrobe thumbnails/preview temporarily show the clean base character while the wardrobe art is rebuilt
- no Fishing/Fridge/Recipe/Go Out/Car/Pet/Task logic is intentionally removed

INSTALL
1. Extract this ZIP.
2. Open MASTER262_FORCE_CLEAN_CHARACTER.
3. Ctrl+A / Ctrl+C.
4. Paste into shawn-elyn-our-little-world.
5. Replace files.
6. GitHub Desktop Summary:
   FORCE clean characters 2.6.2
7. Commit to main.
8. Push origin.
9. Reopen/refresh StackBlitz.

EXPECTED RESULT
The live Elyn and Shawn must now use the clean base PNGs even if an old wardrobe outfit is saved.
