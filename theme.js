/* Light/dark toggle. Without this script the site simply follows the
   visitor's system preference; with it, a header button overrides that
   and the choice is remembered in localStorage. */
(function () {
  var root = document.documentElement;

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored; /* runs before first paint — no flash */
  }

  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

    /* keep the icon honest if the system theme changes while in auto */
    try {
      matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", updateButton);
    } catch (e) {}

    updateButton();
  });
})();
