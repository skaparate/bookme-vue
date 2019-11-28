<template>
  <div class="book-list">
    <div class="content">
      <div class="level">
        <div class="level-left">
          <h2 class="title">My Books</h2>
        </div>
        <div class="level-right">
          <router-link to="/books/add" class="button is-info">
            <vue-fontawesome icon="plus"></vue-fontawesome> New Book
          </router-link>
        </div>
      </div>
      <p>
        Here You will see the list of books that are already on the library,
        where You can delete each one of them or remove the entire list.
      </p>
      <div class="columns is-multiline">
        <book-list-item
          class="column is-4"
          v-for="book in books"
          v-bind:key="book._id"
          v-bind:book="book"
          v-on:bookRemoved="onBookRemoved"
        >
        </book-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BookListItem from '@/components/books/BookListItem.vue';

const { axios } = Vue.config;

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    };
  },
  created: function() {
    console.debug('BookList created');
    const self = this;
    axios
      .get('books')
      .then(function(response) {
        console.log('Response', response);
        self.books = response.data;
      })
      .catch(function(e) {
        console.error('Failed to retrieve book list:', e);
      });
  },
  components: {
    'book-list-item': BookListItem
  },
  methods: {
    onBookRemoved(id) {
      const list = this.books.filter(i => i._id !== id);
      this.books = list;
    }
  }
};
</script>
