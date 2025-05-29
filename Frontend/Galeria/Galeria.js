const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const carouselContainer = document.getElementById('carousel-container');
const indicators = carouselContainer.querySelector('.carousel-indicators');
const inner = carouselContainer.querySelector('.carousel-inner');
let imageUrls = [];

// Al hacer clic en el área, abre el selector
dropZone.addEventListener('click', () => fileInput.click());

// Maneja selección de archivos
fileInput.addEventListener('change', e => {
  handleFiles(e.target.files);
});

// Drag & drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('hover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hover');
});
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('hover');
  handleFiles(e.dataTransfer.files);
});

// Filtra imágenes y construye carrusel
function handleFiles(files) {
  Array.from(files)
    .filter(file => file.type.startsWith('image/'))
    .forEach(file => {
      const url = URL.createObjectURL(file);
      imageUrls.push(url);
    });
  buildCarousel();
}

function buildCarousel() {
  // Limpia
  indicators.innerHTML = '';
  inner.innerHTML = '';

  imageUrls.forEach((url, idx) => {
    // Crea indicador
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-bs-target', '#imageCarousel');
    btn.setAttribute('data-bs-slide-to', idx);
    if (idx === 0) btn.classList.add('active');
    indicators.appendChild(btn);

    // Crea slide
    const item = document.createElement('div');
    item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = url;
    img.className = 'd-block w-100';
    item.appendChild(img);
    inner.appendChild(item);
  });

  // Muestra el carrusel si hay al menos una imagen
  if (imageUrls.length > 0) {
    carouselContainer.classList.remove('d-none');
  }
}
