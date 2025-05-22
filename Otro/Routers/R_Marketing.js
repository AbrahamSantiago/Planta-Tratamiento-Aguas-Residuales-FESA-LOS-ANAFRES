const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Subir imagen/video
router.post('/', upload.single('archivo'), (req, res) => {
  const tipo = req.body.tipo;
  const archivo = req.file.filename;
  const fecha = new Date().toISOString();

  db.run(`INSERT INTO galeria (tipo, archivo, fecha) VALUES (?, ?, ?)`,
    [tipo, archivo, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, tipo, archivo, fecha });
    });
});

// Obtener galería
router.get('/', (req, res) => {
  db.all(`SELECT * FROM galeria`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Eliminar por ID
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM galeria WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
