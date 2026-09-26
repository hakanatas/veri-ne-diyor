/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Sınıf gezisi nereye olsun?', en: 'Where should the class trip go?',
      note: 'Nokta’nın sınıfı geziye gidecek. Ama nereye? Herkes farklı bir şey söylüyor. Bunu tahminle değil, veriyle bulalım.' },
    { scene: 2, start: 10.6, end: 14.6, tr: 'Önce bir araştırma sorusu soralım', en: 'First, let’s ask a research question',
      note: 'Önce araştırma sorumuzu yazalım: Sınıfımız en çok nereye gitmek istiyor?' },
    { scene: 2, start: 15.0, end: 19.2, tr: 'Plan: sınıftaki 20 öğrenciye soracağız', en: 'Plan: we’ll ask the 20 students in our class',
      note: 'Sonra plan yapalım: Kime soracağız? Sınıfımızdaki 20 öğrencinin hepsine.' },
    { scene: 2, start: 19.6, end: 23.8, tr: 'Anket: üç seçenek, herkes birini seçer', en: 'Survey: three choices, everyone picks one',
      note: 'Bir anket hazırladık: Müze, Akvaryum, Planetaryum. Herkes yalnızca birini seçecek. Bu cevaplar kategorik veridir; sayı değil, isim.' },
    { scene: 3, start: 25.0, end: 31.2, tr: 'Veri toplayalım: her oy bir çetele çizgisi', en: 'Let’s collect data: each vote is a tally mark',
      note: 'Şimdi veri toplayalım. Her öğrencinin oyu, seçtiği yerin satırına bir çetele çizgisi olarak düşüyor.' },
    { scene: 3, start: 31.6, end: 37.8, tr: 'Beşinci çizgi dördünü keser: saymak kolaylaşır', en: 'The fifth mark crosses the four: easier to count',
      note: 'Dört çizgiden sonra beşinci çizgi hepsini çapraz keser. Böylece beşer beşer saymak kolaylaşır.' },
    { scene: 3, start: 38.4, end: 43.6, tr: 'Müze 4, Akvaryum 9, Planetaryum 7', en: 'Museum 4, Aquarium 9, Planetarium 7',
      note: 'Sayalım: Müze 4, Akvaryum 9, Planetaryum 7 oy aldı.' },
    { scene: 4, start: 44.6, end: 50.4, tr: 'Veriyi sütun grafiğiyle gösterelim', en: 'Let’s show the data with a bar graph',
      note: 'Bu veriyi bir sütun grafiğiyle gösterelim. Her yer için bir sütun, sütunun boyu oy sayısı kadar.' },
    { scene: 4, start: 50.8, end: 56.4, tr: 'Sütunlar kategorileri karşılaştırmayı kolaylaştırır', en: 'Bars make it easy to compare categories',
      note: 'Neden sütun grafiği? Çünkü kategorileri yan yana karşılaştırmak bir bakışta kolaylaşıyor.' },
    { scene: 4, start: 56.8, end: 61.6, tr: 'En uzun sütun: Akvaryum', en: 'The tallest bar: Aquarium',
      note: 'En uzun sütun hangisi? Akvaryum, 9 oyla.' },
    { scene: 5, start: 62.6, end: 67.6, tr: 'Karar: Akvaryum’a gidelim', en: 'Decision: let’s go to the aquarium',
      note: 'Veriye dayanarak kararımızı verelim: Akvaryum’a gidelim.' },
    { scene: 5, start: 68.0, end: 72.8, tr: 'Çünkü 20 kişiden 9’u Akvaryum’u seçti', en: 'Because 9 of the 20 chose the aquarium',
      note: 'Gerekçemiz: 20 kişiden 9’u Akvaryum’u seçti; bu, öteki seçeneklerden daha fazla.' },
    { scene: 5, start: 73.2, end: 77.6, tr: 'Kontrol: 4 + 9 + 7 = 20, herkes cevap verdi', en: 'Check: 4 + 9 + 7 = 20, everyone answered',
      note: 'Sonucun soruya cevap verip vermediğini kontrol edelim: 4 artı 9 artı 7, 20. Sınıftaki herkes cevap vermiş; soruya cevap bulduk.' },
    { scene: 6, start: 78.6, end: 84.2, tr: 'Soru, plan, veri, grafik, yorum, karar', en: 'Question, plan, data, graph, interpret, decide',
      note: 'İşte araştırma döngüsü: soru sor, plan yap, veri topla, grafik çiz, yorumla ve karar ver.' },
    { scene: 6, start: 84.6, end: 91.0, tr: 'Veriye dayalı karar verdik!', en: 'We made a decision based on data!',
      note: 'Tahminle değil, veriye dayanarak karar verdik. Sıradaki sorunuzu siz sorun!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
