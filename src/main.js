import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import DisableAutocomplete from 'vue-disable-autocomplete';

import App from './App.vue';
import router from './router';
import store from './store';
import { loadDataFromLocalStorage } from '@/store/load-data';
import i18n from './locales/i18n';
import vuetify from '@/plugins/vuetify';
import { registerFilters } from '@/filters';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://localhost:8180/', {
  autoConnect: false
});

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueVirtualScroller);
Vue.use(DisableAutocomplete);
Vue.use(VueSocketIOExt, socket, { store });

registerFilters();
loadDataFromLocalStorage();

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
