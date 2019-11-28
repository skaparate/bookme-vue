<template>
  <div id="app">
    <header>
      <main-nav></main-nav>
    </header>
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        Developed by <a href="https://nicomv.com/">NicoMV (AKA skaparate)</a>
      </div>
    </footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    'main-nav': Navigation
  }
};
</script>
