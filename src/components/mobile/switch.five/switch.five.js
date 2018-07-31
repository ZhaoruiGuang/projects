var template = require('./switch.five.html');
var css = require('./switch.five.scss');

var SwitchFive = Vue.extend({
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
module.exports = SwitchFive;