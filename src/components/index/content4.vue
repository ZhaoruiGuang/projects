<template>
	<div id="content4">
		<div class="content4In">
			<span class="list" v-for="(el,index) in list" v-bind:class="'list'+index">
				<div class="titleBox">
					<h3><img src="../images/paw.png" alt="">{{el.title}} <a :href="el.more">更多>></a></h3>
				</div>
				<ul>
					<li v-for="(el2,index2) in el.list">
						<img src="../images/arrowRight.jpg" alt="">
						<a :href="el2.address">{{el2.title}}</a>
						<span>{{el2.time}}</span>
					</li>
				</ul>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				list:[
					{
						title:'资讯中心',
						more:'',
						list:[
							{
								title:'使用没有发酵的羊粪会造成一下后果',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'养殖场羊粪的优点',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'草原羊粪的形成过程',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'生产羊粪有机肥的过程',
								time:'2018-03-07',
								address:'',
							},
						]
					},
					{
						title:'科普知识',
						more:'',
						list:[
							{
								title:'有机肥分类',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'有机肥 ',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'羊粪与牛粪的成分区别是什么',
								time:'2018-03-07',
								address:'',
							},
							{
								title:'羊粪的作用',
								time:'2018-03-07',
								address:'',
							},
						]
					}
				]
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import "../../base/base";

	#content4{
		background-color: $white;
		background-image: url(../images/grass.jpg);
		background-position:0 bottom;
		background-repeat: repeat-x;
		overflow: hidden;
		padding-bottom:120px;
		.content4In{
			width:1000px;
			margin:0 auto;
		}
		.list{
			display: inline-block;
			width:476px;
			&.list1{
				margin-left: 30px;
			}
			.titleBox{
				margin:20px auto;
				color:$green-yellow;
				line-height: 54px;
				background-image: url(../images/line.png);
				background-position:0 bottom;
				background-repeat: repeat-x;
				h3{
					font-size: 20px;
					color:$green-dark;
					img{
						float:left;
						margin:14px 8px;
					}
					a{
						float:right;
						color:$green-base;
						font-size: $font-base;
						font-weight: normal;
						margin-right: 10px;
					}
				}
			}
			ul{
				display: block;
				li{
					display: block;
					font-size: $font-base;
					line-height: 36px;
					img{
						float: left;
						margin:13px 10px 0 5px;
					}
					a{
						color:$green-dark;
					}
					span{
						float: right;
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>