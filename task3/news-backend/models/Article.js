const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true },
    summary: {
    type: String,
    required: true },
  image: {
    type: String },
  content: {
    type: String,
    required: true },
    createdAt: {
    type: Date,
    default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);