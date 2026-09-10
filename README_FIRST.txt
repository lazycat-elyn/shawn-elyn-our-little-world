MASTER 2.9 — LIVE MOVING ROAD

This patch fixes the main Car 2.8 problem: the driving scene is no longer just one static background image.

What moves now:
- perspective road is rendered every frame
- lane markings stream toward the player according to speed
- roadside trees / lamps / flowers / houses move from horizon to foreground
- traffic cars move toward the player and still participate in collision/follow-distance logic
- player Lexus stays in third-person view and shifts/tilts with steering
- distant city image is only a backdrop and has subtle parallax
- road movement stops when speed is 0 and becomes faster when accelerating
- first-person/reverse camera, rules, events, scoring and Parking 2.0 remain

Install:
1. Extract ZIP.
2. Copy app.js and styles.css into shawn-elyn-our-little-world.
3. Replace existing files.
4. GitHub Desktop Summary: MASTER 2.9 live moving road
5. Commit to main.
6. Push origin.
7. Refresh/reopen StackBlitz.

Test:
Hold W / Up or Accel. You should immediately see lane lines and roadside scenery moving toward you.
Steer left/right. The road perspective and player car should shift.
