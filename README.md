# vue-weather

### 项目说明
- 组件功能
    - 一个基于 vue.js 实现的漂亮易用的天气控件

- 注意事项
    - 本组件默认大小为： 400px * 700px ，实际使用中可以对整个组件使用：transform:scale(0.7) 来控制大小；
	- 本组件在 weather.vue 文件中在线引用了百度CDN的jQuery文件，实际开发中可根据需要决定是否引用，可自行更改源码；
    - 默认支持 ES6 ；
    - 默认支持 CSS3 ；
    - 默认 vue 版本在 2.0 以上。

- 使用示例
    ```
    - demo.vue
    
    <template>
		<div style="width:400px;height:700px;margin:50px;">
			<weather></weather>
		</div>
    </template>
    <script>
        import weather from 'vue-weather';
        export default {
            components: {
                weather,
            }
        }
    </script>
	
	- webpack.config.js（这里只标明组件使用相关的必要配置）
	
	module.exports = {
	    entry: '',
	    output: '',
	    module: {
	        rules: [
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [{
						loader:'file-loader',
						options: {
							name:'[name].[ext]',
							limit:5000,
						}
					}]
				}
	        ]
	    },
	    resolve: {},
	    devServer: {},
	};
	
    ```
- 效果图
![截图](https://p1.ssl.qhimg.com/t01ab05e690021b8347.png)
![截图](https://p3.ssl.qhimg.com/t01edb230cd961d2830.png)
![截图](https://p0.ssl.qhimg.com/t018fff349419ae3d74.png)

- NPM 安装
    - npm/cnpm  install  --save-dev  vue-weather
	
- GitHub 地址
    - https://github.com/ZhaoruiGuang/projects/tree/vue-weather
