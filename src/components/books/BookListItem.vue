<template>
  <div class="book-item">
    <div class="card">
      <div class="card-content">
        <h3 class="title">{{ book.title }}</h3>
        <h4 class="subtitle is-6" title="Book authors">
          <span v-if="book.authors.length > 0">By </span
          >{{ book.authors.join(', ') }}
        </h4>
        <b-taglist attached>
          <b-tag type="is-light">Comments</b-tag>
          <b-tag type="is-info">{{ book.commentcount }}</b-tag>
        </b-taglist>
      </div>
      <!-- .card-content -->
      <footer class="card-footer">
        <a
          href="#"
          class="card-footer-item"
          v-on:click="onRemoveClick(book._id, $event)"
          v-bind:data-id="book._id"
        >
          <b-icon pack="fas" icon="trash"></b-icon>
          Delete
        </a>
        <router-link
          class="card-footer-item"
          v-bind:to="`/books/${book._id}/edit`"
        >
          <b-icon icon="edit"></b-icon> Modify
        </router-link>
      </footer>
    </div>
    <b-modal :active.sync="isModalOpen">
      <div class="modal-card">
        <header class="modal-card-head">
          <h4 class="modal-card-title">Eliminar Libro</h4>
        </header>
        <div class="modal-card-body">
          Are You sure?
        </div>
        <footer class="modal-card-foot">
          <button
            class="button is-danger"
            v-on:click="removeBook(book._id, $event)"
          >
            Yes
          </button>
          <button class="button is-info" v-on:click="close($event)">
            No
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue';
const { axios } = Vue.config;

export default {
  name: 'BookListItem',
  props: ['book'],
  data() {
    return {
      isModalOpen: false
    };
  },
  created() {},
  methods: {
    close(event) {
      event.preventDefault();
      this.isModalOpen = false;
    },
    onRemoveClick(id, event) {
      event.preventDefault();
      console.info(`Removing book '${id}'`);
      this.isModalOpen = true;
    },
    removeBook(id, event) {
      event.preventDefault();
      this.isModalOpen = false;
      const self = this;
      axios
        .delete(`books/${id}`)
        .then(function(response) {
          if (response.data !== 'delete successful') {
            console.error('Failed to remove the book');
            self.$buefy.toast.open({
              message: "Couldn't remove the book :(!",
              type: 'is-danger',
              duration: 2000
            });
          } else {
            self.$emit('bookRemoved', id);
            self.$buefy.toast.open({
              message: 'Book removed!',
              type: 'is-success',
              duration: 2000
            });
          }
        })
        .catch(ex => {
          console.error('Failed to remove the book:', ex);
          self.$buefy.toast.open({
            message: "Couldn't remove the book :(!",
            type: 'is-danger',
            duration: 2000
          });
        });
    }
  }
};
</script>
