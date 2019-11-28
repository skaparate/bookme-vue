<template>
  <div class="book-single">
    <div class="container">
      <div class="content" v-if="book">
        <h2 class="title">{{ book.title }}</h2>
        <b-taglist attached>
          <b-tag type="is-light">Comments</b-tag>
          <b-tag type="is-info">{{ book.comments.length }}</b-tag>
        </b-taglist>
        <comment-list :comments="book.comments"></comment-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CommentList from '@/components/comments/CommentList.vue';
const { axios } = Vue.config;

export default {
  name: 'Book',
  components: {
    'comment-list': CommentList
  },
  created() {
    const { bookId } = this.$route.params;
    console.debug(`Current book: ${bookId}`);
    axios
      .get(`books/${bookId}`)
      .then(this.onFetch)
      .catch(this.onError);
  },
  methods: {
    onFetch(response) {
      console.debug('Response:', response);
      this.book = response.data;
    },
    onError(error) {
      console.error('Failed to retrieve the book:', error);
      this.$buefy.toast.open({
        message: 'An error ocurred, please try again later',
        timeout: 2000
      });
    }
  },
  data() {
    return {
      book: null
    };
  }
};
</script>
