var template = require('./switch.seven.html');
var css = require('./switch.seven.scss');

var SwitchSeven = Vue.extend({
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
module.exports = SwitchSeven;