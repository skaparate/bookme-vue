<template>
  <div class="book-editor container" v-if="isReady">
    <div class="content">
      <h3 v-if="isEditing">Editing {{ book.title }}</h3>
      <h3 v-if="!isEditing">New Book</h3>
      <form id="book-editor-form" novalidate>
        <b-field>
          <b-input
            type="text"
            icon="heading"
            v-model="book.title"
            placeholder="Mobi-Dick"
          />
        </b-field>
        <b-field>
          <b-input
            type="textarea"
            v-model="book.authors"
            placeholder="Herman Melville"
          ></b-input>
        </b-field>
        <div class="notification is-primary">
          <b-field grouped>
            <b-button
              @click="onSubmit"
              type="is-primary"
              icon-left="save"
              inverted
              >Save</b-button
            >
          </b-field>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
const { axios } = Vue.config;

export default {
  name: 'BookEditor',
  methods: {
    errorHandler(ex) {
      console.error('Request failed:', ex);
      this.$buefy.toast.open({
        message: 'Operation failed. Please try again later',
        timeout: 2000,
        type: 'is-danger'
      });
    },
    updateSuccess(response) {
      const type =
        response.data !== 'update successful' ? 'is-danger' : 'is-success';
      this.$buefy.toast.open({
        message: response.data,
        timeout: 2000,
        type
      });
    },
    createSuccess(response) {
      console.debug('Book create response:', response);
      if (response.data._id) {
        console.info('The book has been added:', response.data._id);
        this.$buefy.toast.open({
          timeout: 2000,
          message: 'Book added',
          type: 'is-success'
        });

        const handle = setTimeout(() => {
          clearTimeout(handle);
          this.$router.push(`/books/${response.data._id}`);
        }, 2000);
      } else {
        this.$buefy.toast.open({
          message: 'Book creation failed',
          timeout: 2000,
          type: 'is-danger'
        });
      }
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.validate()) {
        const data = {
          title: this.book.title,
          authors: this.book.authors.split(',').map(i => {
            const clean = i.trim();
            if (!clean) return undefined;
            return clean;
          })
        };

        if (this.isEditing) {
          axios
            .put(`books/${this.bookId}`, data)
            .then(this.updateSuccess)
            .catch(this.errorHandler);
        } else {
          axios
            .post('books', data)
            .then(this.createSuccess)
            .catch(this.errorHandler);
        }
      }
    },
    validate() {
      this.errors = {
        title: '',
        authors: ''
      };
      let isValid = true;
      if (!this.book.title) {
        this.errors.title = 'The book title is required';
        isValid &= false;
      } else {
        if (this.book.title.length < 3) {
          this.errors.title = 'The title must have at least 3 characters';
          isValid &= false;
        }
      }

      if (this.book.authors) {
        if (this.book.authors.length < 3) {
          this.errors.authors = 'The authors must have at least 3 characters';
          isValid &= false;
        }
      }

      return isValid;
    }
  },
  created() {
    console.debug('Route params:', this.$route.params);
    this.bookId = this.$route.params.bookId;

    if (this.bookId) {
      const self = this;
      axios
        .get(`books/${this.bookId}`)
        .then(function(result) {
          self.book.title = result.data.title;
          self.book.authors = result.data.authors.join(', ');
          self.isEditing = true;
          self.isReady = true;
        })
        .catch(error => {
          console.error('Failed to retrieve book data:', error);
          this.$buefy.toast.open({
            timeout: 2000,
            message: 'The book does not exist'
          });
        });
    } else {
      console.debug('Creating a new book');
      this.isReady = true;
    }
  },
  data() {
    return {
      book: {
        title: '',
        authors: ''
      },
      isEditing: false,
      isReady: false,
      bookId: null,
      errors: {
        title: '',
        authors: ''
      }
    };
  }
};
</script>
