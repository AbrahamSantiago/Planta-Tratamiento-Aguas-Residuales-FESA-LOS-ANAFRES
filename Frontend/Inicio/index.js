// js/navbar-hover.js
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.classList.add('hover-color');
    });
    link.addEventListener('mouseout', () => {
      link.classList.remove('hover-color');
    });
  });
});
