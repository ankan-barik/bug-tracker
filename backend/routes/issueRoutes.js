const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Placeholder routes - implement controllers later
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all issues' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Create issue' });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: `Get issue ${req.params.id}` });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: `Update issue ${req.params.id}` });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Delete issue ${req.params.id}` });
});

module.exports = router;
