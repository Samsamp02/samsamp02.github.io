//=====================================
//Handles the toggle of the menu button
//=====================================
const header = document.getElementById('site-header');
const btn = document.getElementById('menu-btn');

btn.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});