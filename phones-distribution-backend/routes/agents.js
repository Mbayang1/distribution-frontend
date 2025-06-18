const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all agents
router.get('/agents', (req, res) => {
  db.query('SELECT * FROM agents', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single agent by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM agents WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Agent not found' });
    res.json(results[0]);
  });
});

// Add a new agent
router.post('/', (req, res) => {
  const { name, department_id } = req.body;
  db.query('INSERT INTO agents (name, department_id) VALUES (?, ?)', [name, department_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, department_id });
  });
});

// Update an agent
router.put('/:id', (req, res) => {
  const { name, department_id } = req.body;
  db.query('UPDATE agents SET name = ?, department_id = ? WHERE id = ?', [name, department_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Agent updated' });
  });
});

// Delete an agent
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM agents WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Agent deleted' });
  });
});

module.exports = router;