const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all types of materials
router.get('/', (req, res) => {
  db.query('SELECT * FROM type_of_materials', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single type of material by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM type_of_materials WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Type of material not found' });
    res.json(results[0]);
  });
});

// Add a new type of material
router.post('/', (req, res) => {
  const { name } = req.body; // Adjust field names as needed
  db.query('INSERT INTO type_of_materials (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Update a type of material
router.put('/:id', (req, res) => {
  const { name } = req.body; // Adjust field names as needed
  db.query('UPDATE type_of_materials SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Type of material updated' });
  });
});

// Delete a type of material
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM type_of_materials WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Type of material deleted' });
  });
});

module.exports = router;