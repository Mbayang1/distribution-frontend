const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all materials
router.get('/', (req, res) => {
  db.query('SELECT * FROM materials', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single material by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM materials WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Material not found' });
    res.json(results[0]);
  });
});

// Add a new material
router.post('/', (req, res) => {
  const { name, type_id } = req.body; // Adjust field names as needed
  db.query('INSERT INTO materials (name, type_id) VALUES (?, ?)', [name, type_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, type_id });
  });
});

// Update a material
router.put('/:id', (req, res) => {
  const { name, type_id } = req.body; // Adjust field names as needed
  db.query('UPDATE materials SET name = ?, type_id = ? WHERE id = ?', [name, type_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Material updated' });
  });
});

// Delete a material
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM materials WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Material deleted' });
  });
});

module.exports = router;