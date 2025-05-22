const galeriaForm = document.getElementById('galeriaForm');
const archivoInput = document.getElementById('archivo');
const tipoInput = document.getElementById('tipo');
const galeriaImagenes = document.getElementById('galeriaImagenes');
const galeriaVideos = document.getElementById('galeriaVideos');

document.addEventListener('DOMContentLoaded', cargarGaleria);

galeriaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = archivoInput.files[0];
  const tipo = tipoInput.value;

  if (!file || !tipo) return alert('Falta archivo o tipo');

  const formData = new FormData();
  formData.append('archivo', file);
  formData.append('tipo', tipo);

  const res = await fetch('/api/galeria', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const nuevo = await res.json();
    agregarElementoGaleria(nuevo);
    galeriaForm.reset();
  } else {
    alert('Error al subir');
  }
});

async function cargarGaleria() {
  const res = await fetch('/api/galeria');
  const recursos = await res.json();

  recursos.forEach(recurso => {
    agregarElementoGaleria(recurso);
  });
}

function agregarElementoGaleria({ id, tipo, archivo }) {
  const contenedor = document.createElement('div');
  contenedor.className = 'galeria-item';

  const ruta = `/uploads/${archivo}`;

  const btn = document.createElement('button');
  btn.textContent = 'Eliminar';
  btn.onclick = async () => {
    const confirmacion = confirm('¿Eliminar este elemento?');
    if (!confirmacion) return;

    const res = await fetch(`/api/galeria/${id}`, { method: 'DELETE' });
    if (res.ok) contenedor.remove();
    else alert('Error al eliminar');
  };

  if (tipo === 'imagen') {
    const img = document.createElement('img');
    img.src = ruta;
    img.alt = archivo;
    contenedor.appendChild(img);
    galeriaImagenes.appendChild(contenedor);
  } else if (tipo === 'video') {
    const video = document.createElement('video');
    video.src = ruta;
    video.controls = true;
    contenedor.appendChild(video);
    galeriaVideos.appendChild(contenedor);
  }

  contenedor.appendChild(btn);
}

