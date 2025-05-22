const form = document.getElementById('galeriaForm');
const archivo = document.getElementById('archivo');
const galeriaImagenes = document.getElementById('galeriaImagenes');
const galeriaVideos = document.getElementById('galeriaVideos');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = archivo.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const tipo = file.type;

  const contenedor = document.createElement('div');
  contenedor.className = 'galeria-item';

  // Botón eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = "Eliminar";
  btnEliminar.onclick = () => contenedor.remove();

  // Recurso visual
  if (tipo.startsWith('image')) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = file.name;
    contenedor.appendChild(img);
    galeriaImagenes.appendChild(contenedor);
  } else if (tipo.startsWith('video')) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    contenedor.appendChild(video);
    galeriaVideos.appendChild(contenedor);
  }

  contenedor.appendChild(btnEliminar);
  form.reset();
});

