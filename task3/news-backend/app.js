const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB підключено'))
  .catch(err => console.error('Помилка підключення до MongoDB :', err));

app.use(cors());
app.use(express.json());

app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes); 

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});