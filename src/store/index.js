import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import chat from '@/store/modules/chat';
import notification from '@/store/modules/notification';
import post from '@/store/modules/post';
import settings from '@/store/modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    chat,
    notification,
    post,
    settings,
  },
});
