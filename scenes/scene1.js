/* SAHNE 1 — GEZİ NEREYE? (0–10 s)  Nokta wonders where the class trip should go.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, outBack, outCubic, lerp, hump } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink, A = LI.Ang;
  const OUT = (t) => 1 - seg(t, 78.0, 78.6);   // everything but the cycle fades at 78 s

  /** opening question, research question and plan */
  function questions(ctx, env, t) {
    const L = KD.L(env), f = F(), Q = L.Q;
    const i = seg(t, 3.4, 4.4) * (1 - seg(t, 9.8, 10.4));
    if (i > 0) {
      f.T(ctx, 'Sınıf gezisi nereye olsun', env.V ? 0 : Q.x, env.V ? -560 : -160, { size: env.V ? 64 : 76, alpha: i, p: seg(t, 3.4, 5.0) });
      f.T(ctx, '?', env.V ? 0 : Q.x, env.V ? -440 : -30, Object.assign({ size: 140 * outBack(seg(t, 5.2, 5.8)), alpha: i }, f.AMB));
    }
    const q = OUT(t);
    const lines = env.V ? ['Soru: Sınıfımız en çok', 'nereye gitmek istiyor?'] : ['Soru: Sınıfımız en çok nereye gitmek istiyor?'];
    lines.forEach((s, k) => { if (t > 10.8) f.T(ctx, s, Q.x, Q.y[k], { size: Q.size, p: seg(t, 10.8 + k * 1.0, 12.6 + k * 1.0), alpha: q, halo: true }); });
    const pa = 1 - seg(t, 24.0, 24.6);
    if (t > 14.8 && pa > 0) f.T(ctx, 'Plan: sınıftaki 20 öğrenciye soralım', Q.x, Q.plan, Object.assign({ size: Q.ps, p: seg(t, 14.8, 16.2), alpha: pa, halo: true }, f.AMB));
  }

  /** the 20 students; each gets an amber ring once it has voted */
  function students(ctx, env, t) {
    const L = KD.L(env), f = F(), a = 1 - seg(t, 44.0, 44.8);
    if (t < 15.2 || a <= 0) return;
    for (let i = 0; i < 20; i++) {
      const [x, y] = f.seat(L, i);
      f.student(ctx, x, y + 3 * Math.sin(t * 2 + i), seg(t, 15.4 + i * 0.05, 15.8 + i * 0.05), a, seg(t, f.tv(i), f.tv(i) + 0.2));
    }
  }

  /** the survey card (17–24.6 s) */
  function card(ctx, env, t) {
    const L = KD.L(env), K = L.K, f = F(), a = seg(t, 17.4, 18.0) * (1 - seg(t, 24.0, 24.6)); if (a <= 0) return;
    const P = [[K.x0, K.y1], [K.x1, K.y1], [K.x1, K.y0], [K.x0, K.y0]];
    Ink.path(ctx, P.concat([P[0]]), { w: 6, p: seg(t, 17.4, 18.4), alpha: a, seed: 31, taper: [0, 0], wob: 0.15 });
    f.T(ctx, 'Anket: Hangisine gitmek istersin?', (K.x0 + K.x1) / 2, K.qy, { size: K.qs, alpha: a, p: seg(t, 18.2, 19.4) });
    f.CATS.forEach((c, k) => {
      const b = seg(t, 19.6 + k * 0.4, 20.1 + k * 0.4) * a; if (b <= 0) return;
      const y = K.oy[k];
      Ink.path(ctx, [[K.ox, y - 17], [K.ox + 34, y - 17], [K.ox + 34, y + 17], [K.ox, y + 17], [K.ox, y - 17]], { w: 4, alpha: b, seed: 40 + k, taper: [0, 0] });
      f.T(ctx, c, K.ox + 56, y + 2, { size: K.qs, alpha: b, align: 'left' });
    });
  }

  /** tally table with live counts (24.3–78 s) */
  function table(ctx, env, t) {
    const L = KD.L(env), TB = L.TB, f = F(), a = seg(t, 24.3, 24.9) * OUT(t); if (a <= 0) return;
    f.T(ctx, 'yer', TB.lx, TB.hy, { size: TB.s, alpha: a, align: 'left' });
    f.T(ctx, 'çetele', TB.tx + 70, TB.hy, { size: TB.s, alpha: a });
    f.T(ctx, 'sayı', TB.nx, TB.hy, { size: TB.s, alpha: a });
    Ink.path(ctx, [[TB.line[0], TB.hy + 30], [TB.line[1], TB.hy + 30]], { w: 4, alpha: 0.8 * a, seed: 60, p: seg(t, 24.3, 25.0), taper: [0.05, 0.05] });
    const hi = seg(t, 56.8, 57.4);
    f.CATS.forEach((c, k) => {
      const y = TB.ry[k];
      f.T(ctx, c, TB.lx, y, Object.assign({ size: TB.s, alpha: a, align: 'left' }, k === 1 && hi > 0 ? f.AMB : {}));
      const n = f.count(k, t);
      if (t > 25.6) f.T(ctx, String(n), TB.nx, y, Object.assign({ size: TB.s + 4 * hi * (k === 1), alpha: a }, k === 1 && hi > 0 ? f.AMB : {}));
    });
    // tally marks: each vote flies from its student to the row, then is drawn
    f.VOTES.forEach((c, i) => {
      const t0 = f.tv(i), s = f.SLOT[i], y = TB.ry[c];
      f.mark(ctx, TB.tx, y, s, seg(t, t0 + f.FLY, t0 + f.FLY + f.DRAW), a);
      const k = seg(t, t0, t0 + f.FLY);
      if (k > 0 && k < 1) {
        const P0 = f.seat(L, i), P1 = f.markEnd(TB.tx, y, s), e = outCubic(k);
        const x = lerp(P0[0], P1[0], e), yy = lerp(P0[1], P1[1], e) - 140 * Math.sin(Math.PI * e);
        Ink.dot(ctx, x, yy, 9, { seed: 70 + i, bleed: 0, color: LI.AMBER_RGB });
      }
    });
    // total row: the check
    const ta = seg(t, 73.2, 73.8) * a;
    if (ta > 0) {
      const s = 'toplam: 4 + 9 + 7 = 20';
      f.T(ctx, s, TB.lx, TB.ty, { size: TB.s, alpha: ta, align: 'left', p: seg(t, 73.2, 74.4) });
      f.tick(ctx, TB.lx + f.width(ctx, s, TB.s) + 24, TB.ty, seg(t, 74.4, 74.9), ta);
    }
  }

  /** bar graph (44.6–78 s) */
  function chart(ctx, env, t) {
    const L = KD.L(env), C = L.CH, f = F(), a = seg(t, 44.6, 45.0) * OUT(t); if (a <= 0) return;
    const right = C.xs[2] + C.bw / 2 + 50, top = C.by - 10.5 * C.u;
    Ink.path(ctx, [[C.ax, top], [C.ax, C.by], [right, C.by]], { w: 6, p: seg(t, 44.8, 45.9), alpha: a, seed: 81, taper: [0.05, 0.05] });
    const ga = seg(t, 45.6, 46.2) * a;
    for (let v = 1; v <= 10; v++) {
      const y = C.by - v * C.u;
      Ink.path(ctx, [[C.ax - 8, y], [C.ax + 8, y]], { w: 3, alpha: 0.7 * ga, seed: 90 + v, taper: [0, 0] });
      if (v % 2 === 0) f.T(ctx, String(v), C.ax - 18, y, { size: 28, alpha: ga, align: 'right' });
    }
    const hi = seg(t, 56.8, 57.4);
    f.CATS.forEach((c, k) => {
      const x = C.xs[k], n = f.TOTAL[k], g = outCubic(seg(t, 46.4 + k * 0.9, 47.6 + k * 0.9)), h = n * C.u * g;
      f.T(ctx, c, x, C.ly, { size: C.ls, alpha: ga });
      if (g <= 0) return;
      const strong = k === 1 ? hi : 0;
      ctx.fillStyle = `rgba(${LI.AMBER_RGB},${(0.3 + 0.4 * strong) * a})`;
      ctx.fillRect(x - C.bw / 2, C.by - h, C.bw, h);
      Ink.path(ctx, [[x - C.bw / 2, C.by], [x - C.bw / 2, C.by - h], [x + C.bw / 2, C.by - h], [x + C.bw / 2, C.by]], { w: 5, alpha: a, seed: 100 + k, taper: [0, 0], wob: 0.05 });
      const va = seg(g, 0.9, 1) * a;
      if (va > 0) f.T(ctx, String(n), x, C.by - h - 34, Object.assign({ size: 44 + 10 * strong, alpha: va }, strong > 0 ? f.AMB : {}));
    });
    if (hi > 0) f.T(ctx, 'en uzun', C.xs[1], C.by - 9 * C.u - 88, Object.assign({ size: 36, alpha: hi * a, p: seg(t, 57.2, 58.2) }, f.AMB));
  }

  /** decision lines (62.6–78 s) */
  function decision(ctx, env, t) {
    const L = KD.L(env), D = L.D, f = F(), a = OUT(t);
    if (t > 62.8) f.T(ctx, 'Karar: Akvaryum’a gidelim', D.x, D.y[0], Object.assign({ size: D.s[0], p: seg(t, 62.8, 64.2), alpha: a, halo: true }, f.AMB));
    if (t > 68.2) f.T(ctx, 'çünkü 20 kişiden 9’u seçti', D.x, D.y[1], { size: D.s[1], p: seg(t, 68.2, 69.6), alpha: a, halo: true });
  }

  /** the research cycle (78–92 s) */
  const STEPS = ['soru sor', 'plan yap', 'veri topla', 'grafik çiz', 'yorumla', 'karar ver'];
  function cycle(ctx, env, t) {
    const L = KD.L(env), Y = L.CY, f = F(); if (t < 78.2) return;
    const C = [Y.x, Y.y];
    f.T(ctx, 'araştırma', C[0], C[1] - 24, { size: Y.s * 0.8, alpha: seg(t, 78.4, 79.0) });
    f.T(ctx, 'döngüsü', C[0], C[1] + 30, { size: Y.s * 0.8, alpha: seg(t, 78.4, 79.0) });
    STEPS.forEach((s, k) => {
      const t0 = 78.6 + k * 0.55, d = 90 - k * 60, P = A.at(C, d, Y.r), b = seg(t, t0, t0 + 0.4);
      if (b > 0) f.T(ctx, s, P[0], P[1], { size: Y.s, alpha: b, halo: true });
      const q = seg(t, t0 + 0.3, t0 + 0.8); if (q <= 0) return;
      const a1 = d - 16, a2 = d - 60 + 16;                // clockwise from word k to k+1
      A.arc(ctx, C, Y.r, a1, a2, { p: q, alpha: 0.9, w: 5, seed: 120 + k });
      if (q >= 1) {
        const E = A.at(C, a2, Y.r), dir = a2 - 90;
        Ink.path(ctx, [A.at(E, dir + 180 + 35, 20), E, A.at(E, dir + 180 - 35, 20)], { w: 5, color: LI.AMBER_RGB, seed: 130 + k, taper: [0, 0] });
      }
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { questions(ctx, env, t); students(ctx, env, t); card(ctx, env, t); chart(ctx, env, t); table(ctx, env, t); decision(ctx, env, t); cycle(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Where to go?', nameTr: 'Gezi nereye?', concept: 'A question to investigate', conceptTr: 'Araştırılacak bir durum', render });
})(window.LI = window.LI || {});
