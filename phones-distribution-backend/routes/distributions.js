const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all distributions
router.get('/', (req, res) => {
  db.query('SELECT * FROM distributions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single distribution by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM distributions WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(results[0]);
  });
});

// Add a new distribution
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO distributions (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Update a distribution
router.put('/:id', (req, res) => {
  const { name } = req.body;
  db.query('UPDATE distributions SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Distribution updated' });
  });
});

// Delete a distribution
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM distributions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Distribution deleted' });
  });
});

module.exports = router;