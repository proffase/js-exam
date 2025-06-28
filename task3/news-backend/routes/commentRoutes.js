const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні коментарів' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { articleId, name, message } = req.body;
    const comment = await Comment.create({ articleId, name, message });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при додаванні коментаря' });
  }
});

module.exports = router;