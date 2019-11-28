import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/books',
    component: () =>
      import(/* webpackChunkName: "books" */ '../views/Books.vue'),
    children: [
      {
        path: '',
        name: 'books',
        component: () =>
          import(
            /* webpackChunkName: "book-list" */ '../components/books/BookList.vue'
          )
      },
      {
        path: 'add',
        name: 'addBook',
        component: () =>
          import(
            /* webpackChunkName: "book-editor" */ '../components/books/BookEditor.vue'
          )
      },
      {
        path: ':bookId',
        name: 'viewBook',
        component: () =>
          import(/* webpackChunkName: "book" */ '../views/Book.vue')
      },
      {
        path: ':bookId/edit',
        name: 'editBook',
        component: () =>
          import(
            /* webpackChunkName: "book-editor" */ '../components/books/BookEditor.vue'
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
