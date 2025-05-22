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
document.addEventListener('DOMContentLoaded', () => {
  const imageModal = document.getElementById('imageModal');
  imageModal.addEventListener('show.bs.modal', event => {
    const thumb = event.relatedTarget;                              // miniatura que disparó
    const src   = thumb.getAttribute('data-bs-image');              // ruta real
    const alt   = thumb.getAttribute('alt') || '';
    const modalImg = imageModal.querySelector('#modalImage');
    modalImg.src = src;
    modalImg.alt = alt;
  });
});
