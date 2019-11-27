import Vue from 'vue';
import VueRouter from 'vue-router';
import Blog from '../views/Blog.vue';

import Store from '../scripts/Store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog,
    meta: {
      authOptions: true,
    },
    children: [
      {
        path: 'createPost',
        name: 'CreatePost',
        component: () => import('../views/CreatePost.vue'),
        meta: {
          authOptions: true, // Show login / sign in buttons
          showModal: true,
          authOnly: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      authOptions: false,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {
      authOptions: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

// Handle visit of unauthorized routes
router.beforeEach((to, from, next) => ((to.meta.authOnly && !Store.token) ? next('/login') : next()));

export default router;
