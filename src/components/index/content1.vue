<template>
	<div id="content1">
		<div class="content1Top">
			<span class="titleBox">产品分类</span>
			<a href="product.html/#/sheep" class="products">
				<span class="imgBox imgBox1 cursor"></span>
				<p>纯羊粪有机肥</p>
			</a>
			<a href="product.html/#/biological" class="products">
				<span class="imgBox imgBox2 cursor"></span>
				<p>生物有机肥</p>
			</a>
			<a href="product.html/#/bacteria" class="products">
				<span class="imgBox imgBox3 cursor"></span>
				<p>菌肥</p>
			</a>
			<a href="product.html/#/waterSoluble" class="products">
				<span class="imgBox imgBox4 cursor"></span>
				<p>水溶肥</p>
			</a>
		</div>
		<div class="content1Bottom"></div>
	</div>
</template>
<style type="text/css" lang="scss" scoped>
	@import "../../base/base";

	#content1{
		width:100%;
		background-color: #DBEBD9;
		.content1Top{
			width: 1000px;
			height: 208px;
			margin:0 auto;
			padding:24px 0;
			span,a{
				display: inline-block;
				float:left;
				&.titleBox{
					width:64px;
					height: 144px;
					background-image: url(../images/content1.jpg);
					font-size: $font-large;
					color:$green-light;
					padding:12px 20px 0;
					margin-right: 40px;
				}
				&.products{
					margin:5px 40px 0 0; 
					.imgBox{
						width:111px;
						height: 111px;
						background-position: center;
						overflow: hidden;
						&.imgBox1{
							background-image: url(../images/sheep3.jpg);
						}
						&.imgBox2{
							background-image: url(../images/sw1.jpg);

						}
						&.imgBox3{
							background-image: url(../images/jun3.jpg);

						}
						&.imgBox4{
							background-image: url(../images/water3.jpg);

						}
					}
					p{
						font-size: $font-base;
						color:$green-base;
						line-height: 44px;
						text-align: center;
					}
				}
			}
		}
		.content1Bottom{
			height: 13px;
			background-image: url(../images/contentBg1.jpg);
		}
	}
</style>