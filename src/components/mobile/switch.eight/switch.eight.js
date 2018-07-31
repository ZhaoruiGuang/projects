var template = require('./switch.eight.html');
var css = require('./switch.eight.scss');

var SwitchEight = Vue.extend({
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
        endAnimation: function(){
            this.animate = false;
        }
    }  
});
module.exports = SwitchEight;