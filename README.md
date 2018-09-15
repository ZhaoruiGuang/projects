# drag-verificate-code

### 项目说明
- 组件功能
    - 拖动验证码
- 使用方式
	- 从开始位置，拖动光标到最后，即验证通过（非拼图）
- 注意事项
    - 使用时给组件一个宽高固定的父级盒子，因为组件是百分比自适应宽高的
    - 默认支持 ES6 
    - 默认支持 CSS3 
    - 默认 vue 版本在 2.0 以上
    - 接受一个回调函数：dragCallBack，参数有：success、fail、reset
- 使用示例
    ```
    <div class="codeWin" style="width:300px;height:40px;">
        <drag-verificate-code v-on:dragCallBack="cb"></drag-verificate-code>
    </div>

    ```
- 效果图
![截图](https://github.com/ZhaoruiGuang/projects/blob/all_images/drag_verificate_code/img1.png)
![截图](https://github.com/ZhaoruiGuang/projects/blob/all_images/drag_verificate_code/img2.png)
- npm 下载
    - 本组件已经发布到 NPM 官网，您也可以通过 npm/cnpm install --save-dev drag-verificate-code 直接下载使用
