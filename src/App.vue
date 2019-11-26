<template>
  <div id="app">
    <header>
      <main-nav></main-nav>
    </header>
    <router-view />
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
