<template>
	<div id="content2">
		<span class="point aboutUs">
			<span class="pointName pointName1">关于我们</span>
			<a href="">河北源沃农业开发有限公司位于历史悠久的古城保定市唐县，是一家以高新生物技术为核心，有机、生态、绿色、环保为理念，集产品研发、生产销售，物流配送于一体的综合性企业。公司生产环节中的主要原料为当地畜禽废物及页岩、秸秆等，利用高科技发酵技术处理，污染问题，养殖业的可持续发展。并以高新生物技术为核心...</a>
		</span>
		<span class="point culture">
			<span class="pointName pointName2">企业文化</span>
			<a href="javascript:;" class="static">公司以科研单位的技术为依托，绿色环保农业的发展为契机，良好的企业运作环境为平台，本着"诚实守信、科技兴企"的原则，做好科技成果的转化和产品的推广工作，以优秀的产品、良好的服务回报社会。在坚持质量过硬，信誉可靠的原则下，企业在发展过程中坚定的走"品牌"道路。对生产严把质量关，对市场严把信誉关，对客户严把服务关。"</a>
		</span>
		<div class="clearfix"></div>
	</div>
</template>
<style type="text/css" lang="scss" scoped>
	@import "../../base/base";

	#content2{
		width:1600px;
		padding:30px 0;
		margin:0 auto;
		span{
			display: inline-block;
			&.point{
				width:480px;
				float:left;
				background-image: url(../images/contentBg2.jpg);
				overflow: hidden;
				&.aboutUs{
					margin-left: 297px;
					margin-right: 30px;
				}
				.pointName{
					display: inline-block;
					float:left;
					width:67px;
					height: 231px;
					background-image: url(../images/aboutUs.jpg);
					font-size: 20px;
					color:$green-light;
					font-weight: bold;
					padding:14px 24px;
					&.pointName2{
						background-image: url(../images/culture.jpg);
					}
				}
				a{
					display: inline-block;
					width:380px;
					float:left;
					margin-left: 20px;
					font-size: $font-mid;
					color:$green-base;
					line-height: 24px;
					margin-top: 40px;
					&.static{
						cursor:text;
					}
				}
			}
		}
	}
</style>