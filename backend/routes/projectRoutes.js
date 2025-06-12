const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Placeholder routes - implement controllers later
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all projects' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Create project' });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: `Get project ${req.params.id}` });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: `Update project ${req.params.id}` });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Delete project ${req.params.id}` });
});

module.exports = router;
