import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'buefy/dist/buefy.css';
import './assets/theme.sass';

const baseApiUri = 'http://localhost:3100/api/';

Vue.config.productionTip = false;
Vue.config.axios = axios.create({
  baseURL: baseApiUri
});

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
