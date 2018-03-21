<template>
	<div id="header">
		<div class="headerIn">
			<img src="" alt="">
			<span>——</span>
			<ul>
				<li v-for="(el,index) in navList">
					<!-- <a :href="el.href">{{el.name}}</a> -->
					<router-link :to="el.href">{{el.name}}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				navList:[
					{
						name:'首页',
						href:'/',
					},
					{
						name:'产品展示',
						href:'/product',
						// list:[
						// 	{
						// 		name:'纯羊粪有机肥',
						// 		href:'product.html/#/sheep',
						// 	},
						// 	{
						// 		name:'生物有机肥',
						// 		href:'product.html/#/biological',
						// 	},
						// 	{
						// 		name:'菌肥',
						// 		href:'product.html/#/bacteria',
						// 	},
						// 	{
						// 		name:'水溶肥',
						// 		href:'product.html/#/waterSoluble',
						// 	},
						// ],
					},
					{
						name:'知识科普',
						href:'/knowledge',
						list:[],
					},
					{
						name:'关于我们',
						href:'/aboutUs',
						list:[],
					},
					{
						name:'联系我们',
						href:'/contract',
						list:[],
					},
				]
			}
		},
	}
</script>
<style type="text/css" lang="scss">
	@import "../../base/base";

	#header{
		width:100%;
		height: 59px;
		background-image: url(../images/navBg.jpg);
		.headerIn{
			width: 1200px;
			margin:0 auto;
			ul{
				width:700px;
				float:right;
				li{
					display: inline-block;
					width:98px;
					text-align: center;
					float:left;
					margin-left: 40px;
					position: relative;
					&:hover{
						background-image: url(../images/hover.jpg);
						background-repeat: no-repeat;
					}
					a{
						display: block;
						height: 59px;
						line-height: 59px;
						font-size:$font-mid;
						color:$green-yellow;
					}
				}
			}
		}
	}
	@media (max-width: 480px) {
		#header{
			width:100%;
			background:none;
		}
	}
</style>