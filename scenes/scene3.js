/* SAHNE 3 — VERİ TOPLA (24–44 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 24, end: 44, name: 'Collect data', nameTr: 'Veri topla', concept: 'Every vote is a tally mark', conceptTr: 'Her oy bir çetele çizgisi', render });
})(window.LI = window.LI || {});
