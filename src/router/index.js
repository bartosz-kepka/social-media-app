import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '@/views/Home';
import ChatList from '@/views/chat/ChatList';
import Profile from '@/views/Profile';
import Register from '@/views/Register';
import ChatConversation from '@/views/chat/ChatConversation';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'Home'},
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
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const publicRoutes = ['Login', 'Register'];

router.beforeEach((to, from, next) => {
        const isAuthenticated = store.getters['user/isAuthenticated'];

        const toPrivateRoute = !publicRoutes.includes(to.name);

        if (toPrivateRoute && !isAuthenticated) {
            next({name: 'Login'});
            return;
        }

        if (!toPrivateRoute && isAuthenticated) {
            next({name: 'Home'});
            return;
        }
        next();
    }
)

export default router;
