const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.createArticle);
router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);

module.exports = router;