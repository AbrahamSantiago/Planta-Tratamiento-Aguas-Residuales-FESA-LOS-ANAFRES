const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Subir
router.post('/', upload.single('archivo'), (req, res) => {
  const { tipo } = req.body;
  const archivo = req.file?.filename;
  const fecha = new Date().toISOString();

  if (!archivo || !tipo) return res.status(400).json({ error: 'Archivo o tipo faltante' });

  db.run(`INSERT INTO galeria (tipo, archivo, fecha) VALUES (?, ?, ?)`,
    [tipo, archivo, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, tipo, archivo, fecha });
    });
});

// Obtener
router.get('/', (req, res) => {
  db.all(`SELECT * FROM galeria ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Eliminar
router.delete('/:id', (req, res) => {
  db.get(`SELECT archivo FROM galeria WHERE id = ?`, [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'No encontrado' });

    const ruta = path.join(__dirname, '../public/uploads', row.archivo);
    fs.unlink(ruta, (err) => {
      if (err && err.code !== 'ENOENT') return res.status(500).json({ error: 'No se pudo eliminar archivo físico' });

      db.run(`DELETE FROM galeria WHERE id = ?`, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
      });
    });
  });
});

module.exports = router;
