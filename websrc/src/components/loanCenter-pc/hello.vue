<template>
	<div class="box">
		<h1>hello world</h1>
		<p>{{res}}</p>
	</div>
</template>
<style lang="scss">
	.box{
		height:300px;
		background-color: #DAF69B;
		h1{
			text-align:center;
		}
	}
</style>
<script type="text/javascript">
	export default{
		data:function(){
			return{
				res:'',
			}
		},
		mounted:function(){
			// var url = "/test/public/login";
   //          // 初始化一个 XMLHttpRequest 对象
   //          var xhr = new XMLHttpRequest();
   //          //开始上传
   //          xhr.open("post", url, true);
   //          //在readystatechange事件上绑定一个事件处理函数
   //          xhr.onreadystatechange=callback;

   //          xhr.send();
   //          var _this = this;
   //          function callback(t) {
   //              if(xhr.readyState == 4){
   //                  if(xhr.status == 200){
   //                      console.log(xhr.responseText);
   //                      _this.res = xhr.responseText
   //                  }else{
   //                      console.log('失败')
   //                  }
   //              }else {
   //                  console.log('！！！')
   //              }
   //          }

		}
	}
</script>