const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

const galeriaRoutes = require('./routes/galeria');
const datosRoutes = require('./routes/datos');
const anunciosRoutes = require('./routes/anuncios');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
app.use('/api/galeria', galeriaRoutes);
app.use('/api/datos', datosRoutes);
app.use('/api/anuncios', anunciosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
