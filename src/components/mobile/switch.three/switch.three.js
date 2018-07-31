var template = require('./switch.three.html');
var css = require('./switch.three.scss');

var SwitchThree = Vue.extend({
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
module.exports = SwitchThree;