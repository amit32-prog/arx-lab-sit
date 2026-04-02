const root = document.documentElement;
const storageKey = 'arx-theme';
const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(storageKey, theme);
  document.querySelectorAll('[data-theme-label]').forEach(el => {
    el.textContent = theme === 'light' ? 'Light' : 'Dark';
  });
};
const savedTheme = localStorage.getItem(storageKey);
if (savedTheme) setTheme(savedTheme);
else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
else setTheme('dark');

document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(next);
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
