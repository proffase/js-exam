
<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
      <div class="logo">Web Blog</div>
      <div class="titles">
         <h1>Сайт з новинами</h1>
      <p>Користні статті на різні теми</p>
      </div>
      </div>
    </header>

    <main class="main-content">
       <router-view />
      </main>

<footer class="footer">Веб-блог з новинами</footer>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #c8c4c4;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #000;
  color: #fff;
  padding: 5rem 1rem;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

}

.logo {
  position: absolute;
  left: 1rem;
  top: -10px;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 2;
}
.titles {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
}
</style>