/* ============================================================
   benatlarge.com
   Two small jobs. Both pages use this file. The page works
   without either one.
   ============================================================ */

/* Mark the document so the develop-in CSS only hides prints when there
   is something here to reveal them again. Set immediately, before paint. */
document.documentElement.classList.add("js");

/* ---- 1. Fit the wordmark so the page edge crops it ---------
   The name is sized so the line lands at OVERRUN times the page width.
   Anything past 100% is cut by the right edge of the page: a real edge
   doing the cutting, not a viewBox.

   Measured rather than hardcoded, because the same font-size gives a
   different line width in Big Shoulders than in the Impact fallback, so
   a fixed value would crop by a different amount depending on what
   loaded. */
(function () {
  var OVERRUN = 1.06; // 106% of the page: the last glyph gets clipped
  var PROBE = 200; // measure at a known size, then scale

  var h1 = document.getElementById("wordmark");
  if (!h1) return;
  var line = h1.querySelector(".wordmark__line");
  if (!line) return;

  function fit() {
    var page = document.documentElement.clientWidth;
    var gutter = h1.getBoundingClientRect().left;
    var available = page - gutter;
    if (available <= 0) return;

    h1.style.fontSize = PROBE + "px";
    var natural = line.getBoundingClientRect().width;
    if (!natural) return;

    h1.style.fontSize = (PROBE * available * OVERRUN) / natural + "px";
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  } else {
    window.addEventListener("load", fit);
  }

  // Refit on resize, but not on every pixel of a drag.
  var t;
  window.addEventListener("resize", function () {
    window.clearTimeout(t);
    t = window.setTimeout(fit, 120);
  });
})();

/* ---- 2. Develop the pictures in as they arrive -------------
   A print comes up in the tray rather than fading in. Each one is
   revealed once and then left alone, no re-triggering on scroll back.

   Covers both .print (the wall) and .frame (dispatch strips), so a
   dispatch added a year from now behaves the same with no changes here.
   The stagger runs across whatever crosses the line together, so it does
   not care how many columns the grid happens to have. */
(function () {
  var pics = [].slice.call(document.querySelectorAll(".print, .frame"));
  if (!pics.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function developAll() {
    pics.forEach(function (p) {
      p.classList.add("is-developed");
    });
  }

  if (reduce || !("IntersectionObserver" in window)) {
    developAll();
    return;
  }

  var seen = new WeakSet();
  var io = new IntersectionObserver(
    function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);

        // A slight stagger between neighbours, so a row does not snap
        // in as one block.
        var delay = Math.min(n, 3) * 110;
        n += 1;

        window.setTimeout(function () {
          entry.target.classList.add("is-developed");
        }, delay);

        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  pics.forEach(function (p) {
    io.observe(p);
  });

  // Safety net: if something goes wrong, nothing stays invisible.
  window.setTimeout(developAll, 4000);
})();
