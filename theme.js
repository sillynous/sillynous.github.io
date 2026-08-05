/* Light/dark toggle. The site is dark by default; a header button
   switches to the light palette and the choice is remembered in
   localStorage. Without this script the site is simply dark. */
(function () {
  var root = document.documentElement;

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored; /* runs before first paint — no flash */
  }

  function current() {
    return root.dataset.theme || "dark"; /* dark is the site's default */
  }

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    header.appendChild(btn);

    function updateButton() {
      var dark = current() === "dark";
      btn.textContent = dark ? "☀︎" : "☾︎"; /* ☀ / ☾ */
      btn.setAttribute("aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode");
    }

    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      updateButton();
    });

    updateButton();

    /* — the header hides while you read, returns when you look up — */
    var lastY = window.scrollY;

    /* — back to top, for long pages — */
    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.textContent = "↑";
    toTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(toTop);
    toTop.addEventListener("click", function () {
      var smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    });

    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 10);
      if (y > lastY + 4 && y > 160) {
        header.classList.add("header-hidden");
      } else if (y < lastY - 2) {
        header.classList.remove("header-hidden");
      }
      toTop.classList.toggle("show", y > 600);
      lastY = y;
    }, { passive: true });
  });
})();
