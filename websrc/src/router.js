import Vue from 'vue';
import Router from 'vue-router';
// import welcome from './components/welcome/welcome.vue';
// import business from './components/business/business.vue';
const welcome = resolve => require(['./components/welcome/welcome.vue'], resolve); 
const business = resolve => require(['./components/business/business.vue'], resolve);
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: welcome
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: welcome
        },
        {
            path: '/business',
            name: 'business',
            component: business
        },
    ]
})
