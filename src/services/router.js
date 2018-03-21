import VueRouter from 'vue-router';
Vue.use(VueRouter);

import index from '../components/index/index.vue';
import product from '../components/product/product.vue';

const routes = [
	{ 	
		path: '/', 
		redirect: '/index' 
	},
	{ 
 		path: '/index', 
 		component: index 
 	},
 	{ 
 		path: '/product', 
 		component: product 
 	},
];

export default new VueRouter({
	routes
})