/* Shared layout + Nokta helpers for "Veri Ne Diyor?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          Q: { x: 0, y: [-820, -760], size: 44, plan: -690, ps: 40 },
          G: { x: -140, y: -560, dx: 70, dy: 70 },
          K: { x0: -400, x1: 400, y0: -190, y1: 170, qy: -130, qs: 40, ox: -300, oy: [-40, 40, 120] },
          TB: { lx: -420, tx: -170, nx: 380, hy: -150, ry: [-60, 30, 120], ty: 220, s: 40, line: [-440, 420] },
          CH: { ax: -430, by: -280, xs: [-300, -60, 180], bw: 110, u: 28, ly: -242, ls: 32 },
          D: { x: 60, y: [320, 385], s: [48, 40] },
          CY: { x: 0, y: -260, r: 290, s: 42 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          Q: { x: 60, y: [-400], size: 50, plan: -325, ps: 44 },
          G: { x: -560, y: -170, dx: 70, dy: 72 },
          K: { x0: 110, x1: 760, y0: -240, y1: 130, qy: -170, qs: 44, ox: 210, oy: [-70, 10, 90] },
          TB: { lx: 120, tx: 420, nx: 730, hy: -220, ry: [-130, -40, 50], ty: 150, s: 46, line: [100, 790] },
          CH: { ax: -630, by: 200, xs: [-510, -330, -150], bw: 110, u: 34, ly: 248, ls: 36 },
          D: { x: 450, y: [255, 325], s: [54, 44] },
          CY: { x: 80, y: -60, r: 290, s: 50 },
          nx: -790, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
