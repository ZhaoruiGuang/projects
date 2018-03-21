<template>
	<div id="footer">
		<div class="footerIn">
			<span class="words">
				<p>联系人&nbsp;&nbsp;&nbsp;：石泽卫</p>
				<p>联系电话：13313246827</p>
				<p>联系地址：河北省保定市唐县北罗镇西下素村1区128号</p>
			</span>
			<img class="wxCode" src="../images/szw.png" alt="">
		</div>
		<p class="copy">版权所有：©河北绿林伟业农业开发有限公司</p>
	</div>
</template>
<style type="text/css" lang="scss">
	@import "../../base/base";

	#footer{
		width:100%;
		height: 160px;
		background-image: url(../images/footBg.jpg);
		padding-top: 16px;
		position: relative;
		.footerIn{
			width: 600px;
			margin:0 auto;
			.words{
				display: inline-block;
				border-right: 2px solid #fff;
				width:400px;
			}
			.wxCode{
				width: 66px;
				height: 66px;
				margin-left: 50px;
			}
		}
		p{
			font-size: $font-base;
			color:$green-yellow;
			line-height: 26px;
			&.copy{
				display: block;
				text-align: center;
				width: 100%;
				height: 52px;
				font-size: $font-small;
				line-height: 52px;
				position: absolute;
				bottom: 0;
				background-image: url(../images/copyBg.jpg);
			}
		}
	}
</style>
