# vue-weather

#### 致歉：（2023年4月20日 凌晨 00:10）
非常抱歉，前面一段时间，账号免费接口调用额度用尽，未及时发现并更新，导致期间安装的用户无法正常使用，现已更新。后续如果使用中再次出现不可用情况，可自行到「天气API」官网注册账号，获取 appid 和 appsecret，然后更换源码中接口参数即可。

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
