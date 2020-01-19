# @zhaoruiguang/vue2-calendar

### 项目说明
##### 如果你的项目中没有使用任何 UI 框架，但是又想引入一个单独的日历组件的话，这将是一个很好的选择！
- 组件功能
    - 一个基于vue.js的、引用方式超级简单的日历控件

- 注意事项
    - 组件本身设置相对定位（relative）属性，如不想影响页面文档样式，可给组件包一个父级盒子，并给父级盒子设置绝对定位（absolute）属性
    - 默认支持 ES6 
    - 默认支持 CSS3 
    - 默认 vue 版本在 2.0 以上
    - 四个 props 参数：
        - calendarCommit：回调函数，点击日历"确定"按钮时触发；
        - calendarClose： 回调函数，点击日历"取消"或"清空"按钮时触发；
        - calendarFormat：字符串类型参数，日历格式，值为"yy-mm-dd"或"yy-mm-dd hh:mm:ss"，默认值"yy-mm-dd"；
	- isAbleClean：布尔类型参数，是否显示日历的 ‘清空’按钮，默认显示；
				

- 使用示例
    ```
    - demo.vue
    
    <template>
        <calendar v-if="calendarState" 
                      v-on:calendarCommit="calendarCommit" 
                      v-on:calendarClose="calendarClose"
                      v-bind:calendarFormat="calendarFormat"
        ></calendar>
    </template>
    <script>
        import calendar from '@zhaoruiguang/vue2-calendar';
        export default{
            components:{
                calendar,
            },
            data(){
                return {
                    calendarState:false,
                    calendarFormat:"yy-mm-dd hh:mm:ss",
                }
            },
            methods:{
                calendarCommit(date){                   // 选中日期回调
                    console.log(date)
                },
                calendarClose(){                        // 关闭日历操作：清空、取消、点击日历以外任意区域
                    this.calendarState = false;
                }
            },
        }
    </script>
    
    ```
- 效果图
![截图](https://p3.ssl.qhimg.com/t0109644c553cfa7d99.png)
![截图](https://p4.ssl.qhimg.com/t01c45cd7a65a1fb820.png)

- NPM 安装
    - npm/cnpm install --save-dev @zhaoruiguang/vue2-calendar
    
- GitHub 地址
    - https://github.com/ZhaoruiGuang/projects/tree/vue2-calendar
