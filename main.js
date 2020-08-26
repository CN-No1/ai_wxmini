import Vue from 'vue'
import App from './App'
import uView from './uview-ui';
Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
	...App
})
import HttpInterceptor from '@/common/http.interceptor.js';
import HttpApi from '@/common/http.api.js';
import Utils from '@/common/utils.js';
// Vue.use(HttpInterceptor, app);
// http接口API集中管理引入部分
Vue.use(HttpApi, app);

Vue.use(Utils, app);

app.$mount()
