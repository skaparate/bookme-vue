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

Vue.config.productionTip = false;
library.add(fas);

Vue.use(buefy);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
