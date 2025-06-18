const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all departments
router.get('/', (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single department by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM departments WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(results[0]);
  });
});

// Add a new department
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO departments (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Update a department
router.put('/:id', (req, res) => {
  const { name } = req.body;
  db.query('UPDATE departments SET name = ? WHERE id = ?', [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Department updated' });
  });
});

// Delete a department
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM departments WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Department deleted' });
  });
});

module.exports = router;