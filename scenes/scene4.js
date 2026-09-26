/* SAHNE 4 — GRAFİKLE GÖSTER (44–62 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 44, end: 62, name: 'Show it', nameTr: 'Grafikle göster', concept: 'A bar graph compares categories', conceptTr: 'Sütun grafiği kategorileri karşılaştırır', render });
})(window.LI = window.LI || {});
