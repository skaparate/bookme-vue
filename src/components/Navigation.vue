<template>
  <div class="navigation">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Book Me
        </b-navbar-item>
      </template>
      
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>

        <b-navbar-item tag="router-link" :to="{ path: '/books' }">
          My Books
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>
