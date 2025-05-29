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


const carouselInner = document.getElementById('carousel-inner');
        const indicatorsContainer = document.getElementById('indicators');
        const galleryContainer = document.getElementById('gallery-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const views = document.querySelectorAll('.view');
        const notification = document.getElementById('notification');
        const backBtn = document.getElementById('back-btn');
        const detailTitle = document.getElementById('detail-title');
        const detailImage = document.getElementById('detail-image');
        const detailDescription = document.getElementById('detail-description');
        const detailLink = document.getElementById('detail-link');
        const detailToggleBtn = document.querySelector('[data-view="detail-view"]');

        // Variables para el carrusel
        let currentIndex = 0;
        let interval;

        // Función para mostrar notificación
        function showNotification(message, isError = false) {
            notification.innerHTML = `<i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
            notification.className = `notification ${isError ? 'error' : ''} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Cambiar entre vistas
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const viewId = button.dataset.view;
                
                // Actualizar botones activos
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Mostrar vista correspondiente
                views.forEach(view => {
                    view.classList.remove('active');
                    if (view.id === viewId) {
                        view.classList.add('active');
                    }
                });
            });
        });

        // Inicializar el carrusel
        function initCarousel() {
            carouselInner.innerHTML = '';
            indicatorsContainer.innerHTML = '';
            
            carouselData.forEach((item, index) => {
                // Crear elemento del carrusel
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                if (index === 0) carouselItem.classList.add('active');
                
                carouselItem.innerHTML = `
                    <img src="${item.url}" alt="${item.title}" class="carousel-img">
                    <div class="carousel-caption">
                        <h3>${item.title}</h3>
                        <p>${item.link ? 'Haz clic para ver detalles' : 'Sin enlace asociado'}</p>
                    </div>
                `;
                
                // Agregar evento de clic para mostrar detalles
                carouselItem.addEventListener('click', () => {
                    if (item.link) {
                        // Mostrar vista de detalles
                        showDetailView(item);
                    } else {
                        showNotification('Esta imagen no tiene enlace asociado', true);
                    }
                });
                
                carouselInner.appendChild(carouselItem);
                
                // Crear indicadores
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.dataset.index = index;
                
                indicator.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
                
                indicatorsContainer.appendChild(indicator);
            });
            
            // Iniciar rotación automática
            startCarousel();
        }

        // Mostrar vista de detalles
        function showDetailView(item) {
            // Actualizar contenido de la vista de detalles
            detailTitle.textContent = item.title;
            detailImage.src = item.url;
            detailImage.alt = item.title;
            detailDescription.textContent = item.description;
            detailLink.href = item.link;
            
            // Ocultar el botón de vista de detalles en el toggle
            detailToggleBtn.style.display = 'flex';
            
            // Cambiar a la vista de detalles
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            detailToggleBtn.classList.add('active');
            
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === 'detail-view') {
                    view.classList.add('active');
                }
            });
        }

        // Botón para regresar
        backBtn.addEventListener('click', () => {
            // Regresar a la vista del carrusel
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-view="carousel-view"]').classList.add('active');
            
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === 'carousel-view') {
                    view.classList.add('active');
                }
            });
        });

        // Actualizar carrusel
        function updateCarousel() {
            const items = document.querySelectorAll('.carousel-item');
            const indicators = document.querySelectorAll('.indicator');
            
            // Ocultar todos los items
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Mostrar item actual
            items[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
            
            // Actualizar posición
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Iniciar rotación automática
        function startCarousel() {
            clearInterval(interval);
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % carouselData.length;
                updateCarousel();
            }, 5000);
        }

        // Eventos de navegación
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
            updateCarousel();
            startCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselData.length;
            updateCarousel();
            startCarousel();
        });

