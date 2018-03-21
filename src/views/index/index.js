import temp from './index.html';
import index from 'index';
import router from 'router';

new Vue({
    el:'#index',
    router,
    render:h => h(index)
});