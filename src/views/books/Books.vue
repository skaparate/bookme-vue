<template>
  <section class="books container">
    <h2 class="title">My Books</h2>
    <BookList></BookList>
  </section>
</template>

<script>
import BookList from '@/components/BookList.vue';

export default {
  name: 'Books',
  components: {
    BookList
  }
};
</script>
