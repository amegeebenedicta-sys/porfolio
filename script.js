(function () {
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");

  function setNavOpen(open) {
    if (nav) nav.classList.toggle("is-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = !nav || !nav.classList.contains("is-open");
      setNavOpen(open);
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) setNavOpen(false);
      });
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNavOpen(false);
  });

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
