import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import DisableAutocomplete from 'vue-disable-autocomplete';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueVirtualScroller);
Vue.use(DisableAutocomplete);

if (localStorage.getItem('user')) {
  const user = JSON.parse(localStorage.getItem('user'));
  store.dispatch('user/setUser', user);
}

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
