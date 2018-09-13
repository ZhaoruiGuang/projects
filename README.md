# drag-verificate-code

### 项目说明
- 组件功能
    - 拖动验证码
- 使用方式
	- 从开始位置，拖动光标到最后，即验证通过（非拼图）
- 注意事项
    -（1）使用时给组件一个宽高固定的父级盒子，因为组件是百分比自适应宽高的
    -（2）默认支持 ES6 
    -（3）默认支持 CSS3 
    -（4）默认 vue 版本在 2.0 以上
    -（5）接受一个回调函数：dragCallBack，参数有：success、fail、reset
- 使用示例
    - <div class="codeWin" style="width:300px;height:40px;">
        <drag-verificate-code v-on:dragCallBack="cb"></drag-verificate-code>
      </div>
