const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  closeMenu();
}));

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); toggle.focus(); } });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) navLinks.forEach((link) => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => navObserver.observe(section));
