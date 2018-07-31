var template = require('./switch.one.html');
var css = require('./switch.one.scss');

var SwitchOne = Vue.extend({
    template: template,
    
    // replace 决定是否用模板替换挂载元素。如果设为 true（这是默认值），模板将覆盖挂载元素，并合并挂载元素和模板根节点
    // 的 attributes。如果设为 false 模板将覆盖挂载元素的内容，不会替换挂载元素自身。
    replace: false,

    // 私有数据以函数返回值的形式提供，可以避免与其他组件的数据或公共数据发生冲突
    data: function () {
        return {
            hello: 'test hello',
            value:'按钮',
            animate:false
        };
    } ,
    methods:{
        startAnimation: function() {
            this.animate = true;
        },
        endAnimation:function(){
            this.animate = false;
        }
    }
});

module.exports = SwitchOne;
