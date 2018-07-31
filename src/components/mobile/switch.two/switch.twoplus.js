var template = require('./switch.twoplus.html');
var css = require('./switch.twoplus.scss');

var SwitchTwoplus = Vue.extend({
    template: template,
    replace: false,
    data: function () {
        return {
            hello: 'test hello',
            animate:false
        };
    },
    methods:{
    	startAnimation: function() {
            this.animate = true; 
        },
        endAnimation:function(){
            this.animate = false;
        }
    }  
});
module.exports = SwitchTwoplus;