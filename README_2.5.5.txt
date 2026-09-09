SHAWN & ELYN — MASTER 2.5.5 CHARACTER SPRITE CLEANUP

Fixes in this patch:
- Elyn: restores the clean original head/face and full side hair from the clean base pose, then adds transparent safety margins so the hair is not cropped by the sprite canvas.
- Shawn: restores the clean original hair/glasses/face region and repairs tiny alpha cracks, then adds transparent safety margins.
- Applies to all 40 Elyn outfits + 40 Shawn outfits, 6 directions each = 480 wardrobe sprites.

This patch intentionally changes ONLY wardrobe sprite assets.
It does NOT change Fishing, Fridge, Recipes, Go Out, Kitchen, Cars, Pets, Tasks, or gameplay code.

INSTALL
1. Extract this ZIP.
2. Open MASTER255_CHARACTER_SPRITE_FIX.
3. Copy its contents into the root of your local shawn-elyn-our-little-world GitHub repository.
4. Choose Replace existing files.
5. GitHub Desktop: Commit to main, then Push origin.
6. Refresh StackBlitz.
