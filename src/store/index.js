import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import { auth } from './modules/auth.module';
import chat from '@/store/modules/chat';
import notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    chat,
    notification,
  },
});
