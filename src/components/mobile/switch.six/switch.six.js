var template = require('./switch.six.html');
var css = require('./switch.six.scss');

var SwitchSix = Vue.extend({
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
module.exports = SwitchSix;