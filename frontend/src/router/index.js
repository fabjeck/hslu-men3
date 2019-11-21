import Vue from 'vue';
import VueRouter from 'vue-router';
import Blog from '../views/Blog.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog,
    meta: {
      authOptions: true,
    },
    beforeRouteUpdate(to, from, next) {
      this.loggedIn();
      next();
    },
    children: [
      {
        path: 'createPost',
        name: 'CreatePost',
        component: () => import('../views/CreatePost.vue'),
        meta: {
          authOptions: true,
        },
        // beforeEnter: (to, from, next) => {

        // },
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SignUp.vue'),
    meta: {
      authOptions: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
