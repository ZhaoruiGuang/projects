var template = require('./switch.two.html');
var css = require('./switch.two.scss');

var SwitchTwo = Vue.extend({
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
module.exports = SwitchTwo;