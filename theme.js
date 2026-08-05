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
  });
})();
