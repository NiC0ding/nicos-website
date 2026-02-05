(() => {
  const root = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);

    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
      btn.setAttribute(
        "aria-label",
        isDark ? "Light Mode aktivieren" : "Dark Mode aktivieren"
      );
    }
  }

  function getTheme() {
    return localStorage.getItem("theme") || "light";
  }

  function setTheme(theme) {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }

  function toggleTheme() {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  }

  // 🔹 Script läuft dank defer erst, wenn DOM da ist
  applyTheme(getTheme());

  // 🔹 Button-Listener DIREKT setzen
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#themeToggle");
    if (btn) toggleTheme();
  });

  // 🔹 Tabs/Seiten synchron halten
  window.addEventListener("storage", (e) => {
    if (e.key === "theme") applyTheme(e.newValue || "light");
  });
})();
