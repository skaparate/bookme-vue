<template>
  <div class="book-list">
    <BookListItem
      v-for="book in books"
      v-bind:key="book._id"
      v-bind:book="book"
    >
    </BookListItem>
  </div>
</template>

<script>
import axios from 'axios';
import BookListItem from '@/components/BookListItem.vue';

export default {
  name: 'BookList',
  data: function() {
    return {
      books: []
    };
  },
  created: function() {
    console.debug('BookList created');
    const self = this;
    axios
      .get('http://localhost:3100/api/books')
      .then(function(response) {
        console.log('Response', response);
        self.books = response.data;
      })
      .catch(function(e) {
        console.error('Failed to retrieve book list:', e);
      });
  },
  components: {
    BookListItem
  }
};
</script>
