/* SAHNE 6 — ARAŞTIRMA DÖNGÜSÜ (78–92 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); LI.fireworks(ctx, env, t); }
  LI.registerScene({ id: 6, start: 78, end: 92, name: 'The cycle', nameTr: 'Araştırma döngüsü', concept: 'Question, plan, data, graph, interpret, decide', conceptTr: 'Soru, plan, veri, grafik, yorum, karar', render });
})(window.LI = window.LI || {});
