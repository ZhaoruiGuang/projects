<template>
	<div id="content3">
		<div class="titleBox">
			<h3 class="title"><img src="../images/paw.png" alt="">产品展示<a href="product.html">更多>></a></h3>
		</div>
		<div class="productsBox">
			<span v-for="(el,index) in products">
				<a class="imgBox" :href="el.href">
					<img v-if="index == 0" src="../images/sheep1.jpg" alt="">
					<img v-if="index == 1" src="../images/sheep2.jpg" alt="">
					<img v-if="index == 2" src="../images/sw1.jpg" alt="">
					<img v-if="index == 3" src="../images/sw2.jpg" alt="">
					<img v-if="index == 4" src="../images/jun1.jpg" alt="">
					<img v-if="index == 5" src="../images/jun2.jpg" alt="">
					<img v-if="index == 6" src="../images/water1.jpg" alt="">
					<img v-if="index == 7" src="../images/water2.jpg" alt="">
					<div class="meng">{{el.name}}</div>
				</a>
				<p  class="name">
					<a :href="el.href">{{el.name}}</a>
				</p>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				products:[
					{
						name:'纯羊粪有机肥（1）',
						href:'product.html',
					},
					{
						name:'纯羊粪有机肥（2）',
						href:'product.html',
					},
					{
						name:'生物有机肥（1）',
						href:'product.html',
					},
					{
						name:'生物有机肥（2）',
						href:'product.html',
					},
					{
						name:'菌肥（1）',
						href:'product.html',
					},
					{
						name:'菌肥（2）',
						href:'product.html',
					},
					{
						name:'水溶肥（1）',
						href:'product.html',
					},
					{
						name:'水溶肥（2）',
						href:'product.html',
					},
				]
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import "../../base/base";

	#content3{
		width:1600px;
		height: 622px;
		margin:0 auto;
		background-image: url(../images/contentBg3.jpg);
		overflow: hidden;
		.titleBox{
			width: 980px;
			margin:20px auto;
			color:$green-yellow;
			line-height: 54px;
			background-image: url(../images/line.png);
			background-position:0 bottom;
			background-repeat: repeat-x;
			.title{
				font-size: 20px;
				img{
					float:left;
					margin:14px 8px;
				}
				a{
					color:$green-yellow;
					float:right;
					font-size: $font-base;
					font-weight: normal;
					margin-right: 10px;
				}
			}
		}
		.productsBox{
			width: 980px;
			margin:0 auto 30px;
			span{
				display: inline-block;
				width:230px;
				height: 234px;
				background-image: url(../images/productBg.jpg);
				margin-left: 10px;
				margin-bottom: 25px;
				.imgBox{
					position:relative;
					display: block;
					width: 220px;
					height: 170px;
					margin:5px auto;
					img{
						width: 220px;
						height: 170px;
					}
					.meng{
						position: absolute;
						top:0;
						width:100%;
						height: 100%;
						background-color: rgba(0,0,0, 0.6);
						text-align: center;
						line-height: 170px;
						font-size: 24px;
						color:$white;
						display: none;
					}
					&:hover .meng{
						display: block;
					}
				}
				
				.name{
					display: block;
					text-align: center;
					line-height: 46px;
					a{
						color:$green-dark;
					}
				}
			}
		}
	}
</style>