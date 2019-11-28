<template>
  <div class="comment-list">
    <h4 class="title is-6">Comments</h4>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" v-bind:key="comment._id">
        <comment-item v-bind:comment="comment"></comment-item>
      </li>
    </ul>
    <div class="comment-editor">
      <form id="comment-editor">
        <b-field>
          <b-input
            type="text"
            v-model="user"
            icon="user"
            placeholder="User"
            required
            min="3"
          />
        </b-field>
        <b-field>
          <b-input
            type="textarea"
            v-model="content"
            placeholder="Comment"
            required
            min="3"
          />
        </b-field>
        <div class="notification is-primary">
          <b-field grouped>
            <b-button
              @click="onAddComment"
              type="is-primary"
              icon-left="comment"
              inverted
              >Post</b-button
            >
          </b-field>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Comment from './CommentItem';
const { axios } = Vue.config;

export default {
  name: 'CommentList',
  props: ['comments'],
  components: {
    'comment-item': Comment
  },
  data() {
    return {
      user: '',
      content: ''
    };
  },
  methods: {
    onAddComment(event) {
      event.preventDefault();
      const { bookId } = this.$route.params;
      const payload = {
        user: this.user,
        content: this.content
      };
      axios
        .post(`books/${bookId}`, payload)
        .then(this.onCommentAdded)
        .catch(this.onCommentError);
    },
    onCommentAdded(response) {
      if (response.data._id) {
        this.comments = response.data.comments;
        this.$buefy.toast.open({
          message: 'Comment added',
          type: 'is-success'
        });
      } else {
        this.$buefy.toast.open({
          message: response.data,
          type: 'is-danger'
        });
      }
    },
    onCommentError(error) {
      console.error('Failed to save the comment:', error);
      this.$buefy.toast.open({
        message: 'An error ocurred, please try again later'
      });
    }
  }
};
</script>

<style lang="sass" scoped>
li
    list-style: none
</style>
