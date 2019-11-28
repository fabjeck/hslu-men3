import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/scripts/store';

Vue.config.productionTip = false;

new Vue({
  data: () => ({
    globalState: store.state,
  }),
  router,
  render: h => h(App),
}).$mount('#app');
