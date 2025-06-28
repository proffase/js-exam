
const Article = require('../models/Article');

function wrapPreInCodeBlocks(text) {
  if (!text) return '';
  return text.replace(/<pre>([\s\S]*?)<\/pre>/g, (match, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code>${escaped}</code></pre>`;
  });
}

async function createArticle(req, res) {
  try {
    const { title, image, summary, content } = req.body;
    const formattedContent = wrapPreInCodeBlocks(content);
    const newArticle = await Article.create({
      title,
      image,
      summary,
      content: formattedContent,
    });
    res.status(201).json({ message: 'Статья создана', article: newArticle });
  } catch (error) {
    console.error('Ошибка при создании статьи:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании статьи' });
  }
}

async function getArticles(req, res) {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении статей' });
  }
}

async function getArticleById(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Ошибка при получении статьи:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении статьи' });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
};