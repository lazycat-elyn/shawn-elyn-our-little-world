# HOME DECOR 1.0 — Shawn & Elyn: Our Little World

## Hard rule: additive only
Home Decor is a new module layered on top of the current MASTER 3.3.3 gameplay. It must not delete, rewrite, simplify, or replace working legacy gameplay.

Protected systems include: Fishing, Kitchen/Cooking Mama, fridge interior, custom cooking, dining/eating/washing, Racing, driving/car gameplay, Go Out, supermarket, restaurant/cafe date gameplay, garden, wardrobe/outfits, Needs, Tasks/Coins/EXP/Love, pets, chat, co-op foundation, inventory/supplies, and existing room navigation.

Implementation safety: `app.js` remains untouched by Home Decor 1.0. The feature is loaded through `home-decor-100.js` and `home-decor-100.css` from `index.html`.

## HOME DECOR 1.0 scope
- Real furniture catalog with coin prices.
- Purchases use the existing `state.coins` balance and existing save function.
- Owned furniture persists in the existing `worldRebuild1` save under `state.homeDecor`.
- Shop / Owned / Placed views.
- Drag-to-move, rotate, remove-to-inventory, undo, day/night preview, save.
- Saved furniture renders back in normal life mode.
- Furniture placement can re-anchor existing interaction hotspots for sofa sitting, fridge, dining/eating, bed/sleep, study, bathroom grooming and shower actions.
- Custom furniture adds lightweight destination collision protection without replacing the existing movement engine.

## Rooms in 1.0
Living Room, Kitchen & Dining, Bedroom, Bathroom, Study Room, Wardrobe/Closet, Balcony.

Garage, Garden and Lake stay protected gameplay areas and do not enter Home Decor 1.0.

## Study room requirement
The editor provides two owned starter desks and opens a two-desk layout for Elyn + Shawn if the Study Room has not yet been decorated.

## Kitchen requirement
Kitchen decoration is additive. Existing fridge, cooking, custom cooking, eating and washing gameplay remain in `app.js`; Home Decor only adds purchasable visual furniture and repositions supported interaction anchors when replacements are saved.

## Current architecture
The original room scene image remains the visual base while purchased furniture is rendered as independent DOM/SVG furniture objects above it. This is intentional for 1.0 so legacy gameplay remains intact. Later visual milestones can migrate room shells incrementally without rebuilding the game.
