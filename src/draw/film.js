/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   A class of 20 decides where to go on a trip. Research question →
   plan → survey → tally → frequency → bar graph → decision → check.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  const CATS = ['Müze', 'Akvaryum', 'Planetaryum'];
  /** each student's answer, in reading order (Müze 4, Akvaryum 9, Planetaryum 7) */
  const VOTES = [1, 2, 0, 1, 1, 2, 1, 0, 2, 1, 2, 1, 0, 1, 2, 2, 1, 0, 2, 1];
  const tv = (i) => 25.6 + i * 0.72;           // when student i votes
  const FLY = 0.45, DRAW = 0.25;               // flight time, stroke time
  /** k-th vote of each category (the slot in its tally row) */
  const SLOT = VOTES.map((c, i) => VOTES.slice(0, i).filter((x) => x === c).length);
  /** how many votes category c has received by time t */
  const count = (c, t) => VOTES.reduce((n, v, i) => n + (v === c && t >= tv(i) + FLY ? 1 : 0), 0);
  const TOTAL = [0, 1, 2].map((c) => VOTES.filter((v) => v === c).length);

  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** a student: a small ink dot with eyes; v = 0..1 has voted (amber ring) */
  function student(ctx, x, y, k, a, v) {
    if (k <= 0 || a <= 0) return;
    const r = 17 * outBack(clamp(k));
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.82 * a})`; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(${LI.PAPER_RGB},${a})`;
    [-6, 6].forEach((dx) => { ctx.beginPath(); ctx.arc(x + dx * k, y - 3, 3.4 * k, 0, Math.PI * 2); ctx.fill(); });
    if (v > 0) { ctx.strokeStyle = `rgba(${LI.AMBER_RGB},${v * a})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r + 7, 0, Math.PI * 2); ctx.stroke(); }
  }
  const seat = (L, i) => [L.G.x + (i % 5) * L.G.dx, L.G.y + Math.floor(i / 5) * L.G.dy];

  /** tally mark n of a row starting at x0 (groups of five: four strokes + one across) */
  function markPts(x0, y, n) {
    const g = Math.floor(n / 5), r = n % 5, gx = x0 + g * 90;
    if (r < 4) return [[gx + r * 15, y + 20], [gx + r * 15, y - 20]];
    return [[gx - 10, y + 16], [gx + 55, y - 16]];
  }
  const markEnd = (x0, y, n) => { const p = markPts(x0, y, n); return [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]; };
  function mark(ctx, x0, y, n, p, a) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, markPts(x0, y, n), { w: 6, p, alpha: a, seed: 500 + n * 7 + Math.round(y), taper: [0.1, 0.2], bleed: 0.3 });
  }

  /** a hand-drawn check mark at (x, y) */
  function tick(ctx, x, y, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 401, taper: [0.05, 0.3] });
  }
  /** text width in the brush font */
  function width(ctx, s, size) { ctx.save(); ctx.font = `${size}px "LI Brush", "Comic Sans MS", cursive`; const w = ctx.measureText(s).width; ctx.restore(); return w; }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.TB.tx, L.TB.ry[1]]);
    if (t < 24 && t > 15) KD.look(p, [L.G.x + 140, L.G.y + 100]);
    if (t > 17.6 && t < 24) KD.look(p, [(L.K.x0 + L.K.x1) / 2, L.K.qy]);
    if (t > 44 && t < 62) KD.look(p, [L.CH.xs[1], L.CH.by - 150]);
    if (t > 62 && t < 78) KD.look(p, [L.D.x, L.D.y[0]]);
    if (t > 78 && t < 84) KD.look(p, [L.CY.x, L.CY.y]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(15.2, 16.8); pointing(18.0, 20.4); pointing(46.0, 48.8); pointing(57.0, 60.2); pointing(73.4, 75.6); pointing(79.0, 82.0);
    const think = seg(t, 10.8, 11.2) * (1 - seg(t, 13.6, 13.9));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    if (t > 35.0 && t < 36.4) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(40.4, 42.0); joy(63.4, 65.0); joy(76.0, 77.6);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 22.0, 22.15), hump(t, 33.0, 33.15), hump(t, 52.0, 52.15), hump(t, 67.0, 67.15), hump(t, 81.0, 81.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { CATS, VOTES, TOTAL, tv, FLY, DRAW, SLOT, count, T, AMB, student, seat, markPts, markEnd, mark, tick, width, nokta, base };
})(window.LI = window.LI || {});
