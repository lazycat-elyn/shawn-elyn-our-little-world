// Movement + Collision 1.0
// Lightweight grid pathfinding in percentage-based scene coordinates.

const DEFAULT_GRID = 2;
const SAMPLE_STEP = 0.75;

function inBounds(bounds, [x, y]) {
  return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
}

function inRect(point, rect) {
  const [x, y] = point;
  const pad = rect.padding ?? 0;
  return x >= rect.x1 - pad && x <= rect.x2 + pad && y >= rect.y1 - pad && y <= rect.y2 + pad;
}

function inCircle(point, circle) {
  const [x, y] = point;
  const r = (circle.r ?? 0) + (circle.padding ?? 0);
  return Math.hypot(x - circle.x, y - circle.y) <= r;
}

function blockedBy(point, obstacle) {
  return obstacle.type === 'circle' ? inCircle(point, obstacle) : inRect(point, obstacle);
}

export function isWalkable(nav, point, extraObstacles = []) {
  if (!nav || !inBounds(nav.bounds, point)) return false;
  return ![...(nav.obstacles || []), ...extraObstacles].some(o => blockedBy(point, o));
}

export function segmentIsClear(nav, a, b, extraObstacles = []) {
  const distance = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const steps = Math.max(1, Math.ceil(distance / SAMPLE_STEP));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    if (!isWalkable(nav, p, extraObstacles)) return false;
  }
  return true;
}

export function nearestWalkable(nav, target, extraObstacles = []) {
  const clamped = [
    Math.max(nav.bounds.minX, Math.min(nav.bounds.maxX, target[0])),
    Math.max(nav.bounds.minY, Math.min(nav.bounds.maxY, target[1]))
  ];
  if (isWalkable(nav, clamped, extraObstacles)) return clamped;

  for (let radius = 1.5; radius <= 22; radius += 1.5) {
    const samples = Math.max(12, Math.round(radius * 2.4));
    for (let i = 0; i < samples; i++) {
      const angle = (Math.PI * 2 * i) / samples;
      const p = [clamped[0] + Math.cos(angle) * radius, clamped[1] + Math.sin(angle) * radius];
      if (isWalkable(nav, p, extraObstacles)) return p;
    }
  }
  return null;
}

function nodeKey(ix, iy) { return `${ix},${iy}`; }
function parseKey(key) { return key.split(',').map(Number); }

function gridPoint(nav, ix, iy, grid) {
  return [nav.bounds.minX + ix * grid, nav.bounds.minY + iy * grid];
}

function simplifyPath(nav, path, extraObstacles) {
  if (path.length <= 2) return path;
  const out = [path[0]];
  let anchor = 0;
  while (anchor < path.length - 1) {
    let farthest = anchor + 1;
    for (let j = path.length - 1; j > anchor + 1; j--) {
      if (segmentIsClear(nav, path[anchor], path[j], extraObstacles)) {
        farthest = j;
        break;
      }
    }
    out.push(path[farthest]);
    anchor = farthest;
  }
  return out;
}

export function findPath(nav, start, rawGoal, extraObstacles = []) {
  if (!nav) return null;
  const goal = nearestWalkable(nav, rawGoal, extraObstacles);
  const safeStart = nearestWalkable(nav, start, extraObstacles);
  if (!goal || !safeStart) return null;

  if (segmentIsClear(nav, safeStart, goal, extraObstacles)) return [safeStart, goal];

  const grid = nav.grid || DEFAULT_GRID;
  const cols = Math.floor((nav.bounds.maxX - nav.bounds.minX) / grid) + 1;
  const rows = Math.floor((nav.bounds.maxY - nav.bounds.minY) / grid) + 1;

  const nearestGridIndex = p => [
    Math.max(0, Math.min(cols - 1, Math.round((p[0] - nav.bounds.minX) / grid))),
    Math.max(0, Math.min(rows - 1, Math.round((p[1] - nav.bounds.minY) / grid)))
  ];

  let [sx, sy] = nearestGridIndex(safeStart);
  let [gx, gy] = nearestGridIndex(goal);

  // If the snapped cell is blocked, find the nearest valid grid cell.
  const nearestGridCell = (ix, iy) => {
    for (let r = 0; r <= 8; r++) {
      for (let dx = -r; dx <= r; dx++) {
        for (let dy = -r; dy <= r; dy++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const nx = ix + dx, ny = iy + dy;
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          if (isWalkable(nav, gridPoint(nav, nx, ny, grid), extraObstacles)) return [nx, ny];
        }
      }
    }
    return null;
  };

  const sCell = nearestGridCell(sx, sy);
  const gCell = nearestGridCell(gx, gy);
  if (!sCell || !gCell) return null;
  [sx, sy] = sCell; [gx, gy] = gCell;

  const startKey = nodeKey(sx, sy);
  const goalKey = nodeKey(gx, gy);
  const open = [{ key: startKey, f: 0 }];
  const openSet = new Set([startKey]);
  const cameFrom = new Map();
  const gScore = new Map([[startKey, 0]]);
  const dirs = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[1,-1],[-1,1],[-1,-1]
  ];

  let iterations = 0;
  while (open.length && iterations++ < 12000) {
    open.sort((a,b) => a.f - b.f);
    const current = open.shift();
    openSet.delete(current.key);
    if (current.key === goalKey) {
      const keys = [current.key];
      let k = current.key;
      while (cameFrom.has(k)) { k = cameFrom.get(k); keys.push(k); }
      keys.reverse();
      const points = keys.map(key => {
        const [ix, iy] = parseKey(key);
        return gridPoint(nav, ix, iy, grid);
      });
      const full = [safeStart, ...points.slice(1, -1), goal];
      return simplifyPath(nav, full, extraObstacles);
    }

    const [cx, cy] = parseKey(current.key);
    const currentPoint = gridPoint(nav, cx, cy, grid);
    for (const [dx, dy] of dirs) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const nextPoint = gridPoint(nav, nx, ny, grid);
      if (!isWalkable(nav, nextPoint, extraObstacles)) continue;
      if (!segmentIsClear(nav, currentPoint, nextPoint, extraObstacles)) continue;

      const nKey = nodeKey(nx, ny);
      const stepCost = (dx && dy) ? 1.414 : 1;
      const tentative = (gScore.get(current.key) ?? Infinity) + stepCost;
      if (tentative >= (gScore.get(nKey) ?? Infinity)) continue;

      cameFrom.set(nKey, current.key);
      gScore.set(nKey, tentative);
      const h = Math.hypot(gx - nx, gy - ny);
      const f = tentative + h;
      if (!openSet.has(nKey)) {
        open.push({ key: nKey, f });
        openSet.add(nKey);
      } else {
        const existing = open.find(n => n.key === nKey);
        if (existing) existing.f = f;
      }
    }
  }
  return null;
}
