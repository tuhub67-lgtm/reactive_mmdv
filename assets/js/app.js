/* =========================================================
   НАРОДНЫЙ РЕАКТИВ — интерактив
   Калькулятор «спящей» базы + мелкие оживления интерфейса.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Форматирование по-русски: 2 000, 240 000 ---------- */
  var nf = new Intl.NumberFormat("ru-RU");
  function ru(n) {
    return nf.format(Math.round(n));
  }

  /* ---------- Калькулятор ---------- */
  var RETURN_RATE = 0.05; // по практике возвращается 4–7% → берём 5%

  var fields = [
    { range: "cardsRange", num: "cardsNum", min: 200, max: 20000 },
    { range: "checkRange", num: "checkNum", min: 1000, max: 20000 },
    { range: "shareRange", num: "shareNum", min: 0, max: 100 }
  ];

  var out = {
    sleeping: document.getElementById("outSleeping"),
    ret: document.getElementById("outReturn"),
    revenue: document.getElementById("outRevenue")
  };

  function clamp(v, min, max) {
    if (isNaN(v)) return min;
    return Math.min(max, Math.max(min, v));
  }

  /* Подкрашиваем «заполненную» часть слайдера золотом */
  function paintRange(el, min, max) {
    var pct = ((Number(el.value) - min) / (max - min)) * 100;
    el.style.setProperty("--pct", pct + "%");
  }

  function currentValues() {
    return {
      cards: Number(document.getElementById("cardsRange").value),
      check: Number(document.getElementById("checkRange").value),
      share: Number(document.getElementById("shareRange").value)
    };
  }

  function recalc() {
    var v = currentValues();
    var sleeping = v.cards * (v.share / 100);
    var willReturn = sleeping * RETURN_RATE;
    var revenue = willReturn * v.check;

    if (out.sleeping) out.sleeping.textContent = ru(sleeping);
    if (out.ret) out.ret.textContent = ru(willReturn);
    if (out.revenue) out.revenue.textContent = ru(revenue);
  }

  fields.forEach(function (f) {
    var range = document.getElementById(f.range);
    var num = document.getElementById(f.num);
    if (!range || !num) return;

    paintRange(range, f.min, f.max);

    // Слайдер двигают → обновляем число
    range.addEventListener("input", function () {
      num.value = range.value;
      paintRange(range, f.min, f.max);
      recalc();
    });

    // Печатают число → двигаем слайдер (с зажимом в диапазон)
    num.addEventListener("input", function () {
      var raw = parseInt(num.value, 10);
      if (num.value === "" || isNaN(raw)) return; // не мешаем печатать
      var val = clamp(raw, f.min, f.max);
      range.value = val;
      paintRange(range, f.min, f.max);
      recalc();
    });

    // Поле теряет фокус → окончательно нормализуем
    num.addEventListener("blur", function () {
      var val = clamp(parseInt(num.value, 10), f.min, f.max);
      num.value = val;
      range.value = val;
      paintRange(range, f.min, f.max);
      recalc();
    });
  });

  recalc();

  /* ---------- Плавный скролл по якорям ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Появление секций при скролле ---------- */
  var revealSelectors = [
    ".eyebrow", ".section__title", ".fact-card", ".step",
    ".trust", ".calc", ".qa__item", ".tier", ".closing-line",
    ".hero__card", ".final__title", ".final__lead", ".final .btn"
  ];
  var toReveal = document.querySelectorAll(revealSelectors.join(","));

  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    toReveal.forEach(function (el, i) {
      el.classList.add("reveal");
      // лёгкая ступенчатая задержка внутри группы
      el.style.transitionDelay = (i % 3) * 70 + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    toReveal.forEach(function (el) { io.observe(el); });
  }
})();
