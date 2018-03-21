<template>
	<div>
		<uiHeader></uiHeader>
		<uiBanner></uiBanner>
		<router-view></router-view>
		<uiFooter></uiFooter>
	</div>
</template>
<script type="text/javascript">
	import uiHeader from 'uiHeader';
	import uiFooter from 'uiFooter';
	import uiBanner from 'uiBanner';
	export default{
		components:{
			uiHeader,
			uiFooter,
			uiBanner,
		}
	}
</script>