<template>
	<div class="businessContent">
		<h1 class="title">这是一个具体的业务模块</h1>
		<input class="btn" type="button" v-on:click="requestTest" value="点我发送请求" />
	</div>
</template>
<script type="text/javascript">
	import api from 'api';
	export default {
		data(){
			return {

			}
		},
		methods:{
			requestTest(){
				api.post('/hello/test')
				.then(res=>{
					console.log('success')
				},err=>{
					console.log('error')
				})
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.businessContent{
		height: 100%;
		.title{
			text-align: center;
			margin-top: 30px;
		}
		.btn{
			display: block;
			width: 120px;
			height: 38px;
			background-color: #1088f1;
			color:#fff;
			border-radius:5px;
			margin:50px auto;
		}
	}
</style>