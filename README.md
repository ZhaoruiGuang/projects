# vue-weather

### 项目说明
- 组件功能
    - 一个基于 vue.js 实现的漂亮易用的天气控件

- 更新说明
	- 本组件在 2020-07-06 进行改版，UI界面更加美观，天气内容更加精简准确

- 注意事项
    - 本组件分为 tag（标签）模式和 card（卡片）模式；
    - 默认支持 ES6 ；
    - 默认支持 CSS3 ；
    - 默认 vue 版本在 2.0 以上；
	- 参数：
		- mode：风格模式，tag：标签模式；card：卡片模式；默认是卡片模式
		- showBgImg：是否显示背景图，主要用于 tag 模式下隐藏背景图使用
		- weatherSuccess：获取天气数据成功（有数据）回调
		- weatherError：获取天气数据失败（接口异常或者无返回数据）回调

- 使用示例
    ```
    - demo.vue
    
   <template>
		<span>
			<weather mode="card" showBgImg="showBgImg" v-on:weatherSuccess="weatherSuccess" v-on:weatherError="weatherError"></weather>
		</span>
   </template>
   
   <script>
		import weather from 'vue-weather';
		export default {
			components: {
				weather,
			},
			methods:{
				weatherSuccess(){
					console.log('get weather success')
				},
				weatherError(){
					console.log('get weather error')
				}
			}
		}
   </script>
	
    ```
- 效果图（分别为标签模式和卡片模式）

![截图](https://p0.ssl.qhimg.com/t01dd1348ebc81f78e9.png)
![截图](https://p3.ssl.qhimg.com/t0153ae433e5d13a3b7.png)

- NPM 安装
    - npm/cnpm  install  --save-dev  vue-weather
	
- GitHub 地址
    - https://github.com/ZhaoruiGuang/projects/tree/vue-weather
