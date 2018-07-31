var template = require('./switch.sevenplus.html');
var css = require('./switch.sevenplus.scss');

var SwitchSevenplus = Vue.extend({
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
module.exports = SwitchSevenplus;