/* SAHNE 2 — SORU VE PLAN (10–24 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 24, name: 'Question and plan', nameTr: 'Soru ve plan', concept: 'A research question and a survey', conceptTr: 'Araştırma sorusu ve anket', render });
})(window.LI = window.LI || {});
