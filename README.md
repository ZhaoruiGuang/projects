# vue2-share

### 项目说明
- 组件功能
    - 一键分享组件（包括新浪微博、QQ空间、微信二维码等）

- 注意事项
    - 本组件只包含三个第三方图标按钮，不包含外层触发组件显示的分享图标
    - 默认支持 ES6 
    - 默认支持 CSS3 
    - 默认 vue 版本在 2.0 以上
    - 参数说明
        - shareType： 分享类型，数组，默认 ['sina','qzon','wx']
        - shareTitle：分享标题，字符串或数字，默认为空
        - shareUrl：  分享链接，字符串，默认 http://www.zhaoruiguang.cn
        - shareImg：  分享配图src地址，字符串，默认为空
        - shareDirection：组件展示形式（横向transverse或竖向vertical），字符串，默认横向（transverse）
        - shareCodeInterface：微信二维码生成接口，字符串，默认 http://qr.liantu.com/api.php （第三方联图网）

- 使用示例
    ```
    - demo.vue
    
    <template>
        <span class="shareIcon"  v-on:mouseenter="shareState(true)"  v-on:mouseleave="shareState(false)">
            <share v-if="state" :shareType="shareType" :shareDirection="shareDirection"></share>
        </span>
    </template>
    <script>
        import share from 'vue2-share';
        export default {
            components: {
                share
            },
            data(){
                return {
                    state:false,
                    shareType:['sina','qzon','wx'],
                    shareDirection:'transverse', 
                }
            },
            methods:{
                shareState(bl){
                    this.state = bl;
                }
            }
        }
    </script>
    <style type="text/css">
        .shareIcon{
            display:inline-block;
            min-width:16px;
            min-height:13px;
            position:absolute;
            top:100px;
            left:100px;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAMAAACXZR4WAAAAUVBMVEUAAAD39/f4+Ph2dnZmZmZ3d3dsbGxpaWlnZ2eAgIB5eXmYmJiDg4Ourq5qampjY2OPj49gYGBsbGxlZWWCgoKHh4dzc3O1tbWnp6eTk5N6enpNjNvrAAAADnRSTlMABgT8/PDwz8ixeG08OLYDh+cAAABgSURBVAjXXY5XEsAgCAWJ6Q0iqCn3P2hiizPuD7DzBoBCAypUQkRGLx6I4k+0sdVxvM0iRFkoKx1NnxiTYNKD2URyYnen73qXd6wQmCGJwlULrIWEx8yRseEKM2OCGeAFzzUE1+1DPK4AAAAASUVORK5CYII=');
            background-repeat: no-repeat;
            padding-top:20px;
        }
    </style>
    
    ```
- 效果图
![截图](https://p4.ssl.qhimg.com/t01d039ffd9e3531d07.png)
![截图](https://p2.ssl.qhimg.com/t01f7333005068f251e.png)

- NPM 安装
    - npm/cnpm  install  --save-dev  vue2-share
    
- GitHub 地址
    - https://github.com/ZhaoruiGuang
