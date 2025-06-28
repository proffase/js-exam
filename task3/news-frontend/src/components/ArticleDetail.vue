<template>
    <div class="article-detail" v-if="article">
       <div class="back-btn-wrapper">
      <router-link to="/" class="back-btn">Назад до списку статей</router-link>
    </div>
<h1>{{ article.title }}</h1>
<img v-if="article.image" :src="article.image" alt="Article Image" />
<div class="content" v-html="article.content"></div>
 <div class="comments-section">
      <h3>Коментарі<span v-if="comments.length" class="comments-count">({{ comments.length }})</span></h3>
      <div v-if="comments.length">
        <div v-for="c in comments" :key="c._id" class="comment">
          <strong>{{ c.name }}</strong>
          <p>{{ c.message }}</p>
        </div>
      </div>
      <div v-else>Коментарі відсутні.</div>

      <form @submit.prevent="addComment">
        <input v-model="commentName" type="text" placeholder="Введіть им'я" required />
        <textarea v-model="commentMessage" placeholder="Введіть повідомлення" required></textarea>
        <button type="submit">Додати</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/nnfx-light.css';


export default {
    name: 'ArticleDetail',
    props: ['id'],
    data() {
        return {
            article: null,
            comments: [],
      commentName: '',
      commentMessage: ''
        };
    },
    mounted() {
        axios.get(`http://localhost:3000/api/articles/${this.id}`)
            .then(response => {
                this.article = response.data;
                this.highlightCode();
            })
            .catch(error => {
                console.error('Помилка при завантаженні статті:', error);
            });
            this.fetchComments();
    },
    watch: {
    article() {
      this.highlightCode();
    }
    },
    methods: {
    async fetchComments() {
      const res = await axios.get(`http://localhost:3000/api/comments/${this.id}`);
      this.comments = res.data;
      this.fetchComments();
    },
    async addComment() {
      if (!this.commentName || !this.commentMessage) return;
      await axios.post('http://localhost:3000/api/comments', {
        articleId: this.id,
        name: this.commentName,
        message: this.commentMessage
      });
      this.commentName = '';
      this.commentMessage = '';
      this.fetchComments();
    },
    highlightCode() {
      this.$nextTick(() => {
        const blocks = this.$el.querySelectorAll('.content pre code');
        blocks.forEach(block => {
          hljs.highlightElement(block);
        });
      });
    }
  }
};
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 20px;
}   
.article-detail {
    max-width: 800px;
    margin: 2rem auto;
   text-align: center;
}
.article-detail img {
    max-width: 100%;
    margin: 1rem 0;
}       
.content {
    text-align: left;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-top: 1rem;
}
.back-btn-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
}
.back-btn {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: #ff2a00;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
}
    .back-btn:hover {
    background-color: #e02400;
}
.comments-section {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #eee;
  text-align: left;
}
.comments-section form {
    width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.comments-section input,
.comments-section textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.comments-section button {
  width: 120px;
  padding: 0.5rem;
  background: #ff3300;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.comments-section .comment {
  margin: 1rem auto 1rem 0;
    padding: 1rem 0rem 1rem 1.5rem;
  width: 87%;
  background: #fffbe6;
  border-radius: 2px;
  text-align: left;
}
.comments-count {
  font-size: 1rem;
  color: #000;
  margin-left: 8px;
  font-weight: bold;
}
</style>