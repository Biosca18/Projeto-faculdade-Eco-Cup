document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const body = document.body;
    const page = body.dataset.page; // index, login, cadastro, painel

    const key = `theme-${page}`;
    const savedTheme = localStorage.getItem(key);

    if (savedTheme === "dark") {
        body.classList.add(`dark-theme-${page}`);
        toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        body.classList.toggle(`dark-theme-${page}`);

        if (body.classList.contains(`dark-theme-${page}`)) {
            toggle.textContent = "☀️";
            localStorage.setItem(key, "dark");
        } else {
            toggle.textContent = "🌙";
            localStorage.setItem(key, "light");
        }
    });
});
