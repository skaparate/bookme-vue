<template>
  <section class="home">
    <div class="hero is-info is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to Book Me
          </h1>
          <h2 class="subtitle">
            Your personal library
          </h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <about></about>
      </div>
    </div>
  </section>
</template>

<script>
import About from './About';

export default {
  name: 'home',
  components: {
    about: About
  }
};
</script>
