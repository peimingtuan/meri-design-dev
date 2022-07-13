import Vue from 'vue';

import router from './router';
// import store from './store';

import App from './App';

import 'stylus/main';
// import Components from './multiple';
import Components from './multiple2';

Vue.use(Components);

const isProd = process.env.NODE_ENV === 'production';

Vue.config.productionTip = isProd;
// const div = document.createElement('div');
// document.body.appendChild(div);

new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#meriDesign');

// if (module.hot) {
//     module.hot.accept();
// }
