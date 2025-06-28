<template>
    <div class="articles">
        <div v-if="!loading && articles.length > 0" class="grid">
            <div class="card" v-for="article in articles" :key="article.id">
                <img v-if="article.image" :src="article.image" alt="Article Image" class="card-image" />
                <div class="card-content">
                    <h2>{{ article.title }}</h2>
                <p>{{ article.summary }}</p>
                <router-link :to="`/articles/${article._id}`" class="read-more-btn">
        Читати далі
      </router-link>
                    </div>
                    </div>
            </div>
        </div>
   </template>     

<script>
import axios from 'axios';

export default {
    name: 'ArticleList',
    data() {
        return {
            articles: [],
            loading: true
        };
    }, mounted() {
       axios.get('http://localhost:3000/api/articles')
            .then(response => {
                this.articles = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.error('Помилка при завантаженні статей:', error);
                this.loading = false;
            });
    },
};
</script>

<style scoped>
.articles {
   display: flex;
   justify-content: center;
}
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(289px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
}
.card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease;
}
.card:hover {
    transform: translateY(-5px);
}
.card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
}
.card-content {
    padding: 1rem;
}
.card-content h2 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
}
.card-content p {
    font-size: 0.9rem;
    color: #555;
}
.read-more-btn {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  background: #ff3300;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s ease;
}
.read-more-btn:hover {
  background: #b32a00;
}
</style>