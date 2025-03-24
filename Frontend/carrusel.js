   // Carrusel
   let currentIndex = 0;
   const slides = document.querySelectorAll('.slide');
   const totalSlides = slides.length;

   function moveSlide(direction) {
     currentIndex += direction;
     if (currentIndex >= totalSlides) currentIndex = 0;
     if (currentIndex < 0) currentIndex = totalSlides - 1;

     const offset = -currentIndex * 100;
     document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
   }

   setInterval(() => {
     moveSlide(1);
   }, 3000);

   // Modal de imagen
   document.querySelectorAll('.img-clickeable').forEach(img => {
     img.addEventListener('click', () => {
       const src = img.getAttribute('src');
       const titulo = img.getAttribute('data-titulo');
       const descripcion = img.getAttribute('data-descripcion');

       document.getElementById('imagenAmpliada').src = src;
       document.getElementById('imagenModalLabel').textContent = titulo;
       document.getElementById('descripcionImagen').textContent = descripcion;

       const modal = new bootstrap.Modal(document.getElementById('imagenModal'));
       modal.show();
     });
   });