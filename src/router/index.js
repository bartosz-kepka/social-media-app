import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '@/views/Home';
import ChatList from '@/views/chat/ChatList';
import Profile from '@/views/Profile';
import ChatConversation from '@/views/chat/ChatConversation';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'ChatList',
    component: ChatList,
  },
  {
    path: '/chat/:chatId',
    name: 'Chat',
    component: ChatConversation,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated'];
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
    return;
  }
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
    return;
  }
  next();
})

export default router;
