var template = require('./switch.zero.html');
var css = require('./switch.zero.scss');

var SwitchZero = Vue.extend({
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
module.exports = SwitchZero;