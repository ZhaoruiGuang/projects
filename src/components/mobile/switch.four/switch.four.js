var template = require('./switch.four.html');
var css = require('./switch.four.scss');
var SwitchFour = Vue.extend({
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
module.exports = SwitchFour;