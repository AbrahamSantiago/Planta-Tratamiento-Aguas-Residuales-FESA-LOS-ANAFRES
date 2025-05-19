<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_FILES['archivo_excel']) && $_FILES['archivo_excel']['error'] === UPLOAD_ERR_OK) {
    $archivo = $_FILES['archivo_excel'];
    $nombreOriginal = basename($archivo['name']);
    $rutaDestino = 'uploads/' . $nombreOriginal;

    // Crea el directorio si no existe
    if (!file_exists('uploads')) {
      mkdir('uploads', 0777, true);
    }

    if (move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
      echo "Archivo subido exitosamente: <strong>$nombreOriginal</strong><br>";
      echo "<a href='index.html'>Volver</a>";
    } else {
      echo "Error al mover el archivo.";
    }
  } else {
    echo "No se recibió el archivo correctamente.";
  }
} else {
  echo "Acceso inválido.";
}
?>