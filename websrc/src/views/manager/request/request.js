var template = require('./request.html');

new Vue({
	el:"#app",
	template:template,
	methods:{
        localReq:function(){
            $.getJSON('http://192.168.1.24:8888/admin/login',function(res){
                console.log(res)
            })
        },
        serverReq:function(){
            // console.log('rrr');
            $.ajax({
                type:'post',
                url : '/agent',
                data:{
                    aaa:'aaa',
                    path:'/admin/login'
                },
                success  : function(data) {
                    console.log('success:'+data)
                },
                error:function(err){
                    console.log('err:'+err)
                }
            });
        }
    }
})