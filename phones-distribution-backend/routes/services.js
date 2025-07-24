const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all services
router.get('/', (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single service by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM services WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json(results[0]);
  });
});

// Add a new service
router.post('/', (req, res) => {
  const { name } = req.body; // Adjust field names as needed
  db.query('INSERT INTO services (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Update a service
router.put('/:id', (req, res) => {
  const { name } = req.body; // Adjust field names as needed
  db.query('UPDATE services SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Service updated' });
  });
});

// Delete a service
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM services WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Service deleted' });
  });
});

module.exports = router;