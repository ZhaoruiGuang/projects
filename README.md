# vue-pagination-s

### 项目说明
- 组件功能
    - 一个简单的、无任何依赖的 vue 分页器组件

- 注意事项
    - 默认支持 ES6 
    - 默认支持 CSS3 
    - 默认 vue 版本在 2.0 以上
    - 参数说明
        - totalPage：  总页数
        - currentPage：当前页码
        - activeColor：页码选中时的颜色

- 使用示例
    ```
    - demo.vue
    
   <template>
   	<div>
   		<pagination :totalPage="totalPage" :currentPage="currentPage" :activeColor="activeColor" v-on:switchPage="switchPage"></pagination>
   	</div>
   </template>

   <script>
   	import pagination from 'vue-pagination-s';
   	export default {
   		components: {
   			pagination
   		},
   		data(){
   			return{
   				totalPage:8,
   				currentPage:1,
   				activeColor:'#4CA6FF',
   			}
   		},
   		methods:{
   			switchPage(page){
   				console.log(page)
   			}
   		}
   	}
   </script>
    
    ```
- 效果图
![截图](https://p0.ssl.qhimg.com/t0194054965f8ed26fb.png)

- NPM 安装
    - npm/cnpm  install  --save-dev  vue-pagination-s
    
- GitHub 地址
    - https://github.com/ZhaoruiGuang/projects/tree/vue-pagination
