/* SAHNE 5 — KARAR VER (62–78 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 62, end: 78, name: 'Decide', nameTr: 'Karar ver', concept: 'A decision based on data', conceptTr: 'Veriye dayalı karar', render });
})(window.LI = window.LI || {});
