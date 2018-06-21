var https = require('https');
var qs = require('querystring');
var express = require('express');
var app = express();
app.listen(8008, function() {
 	console.log('app listen at 8008');
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/src/html');

/*
	页面跳转控制
*/
app.get('/', function(req, res) {
	var page = req.query.page;
	if(!page){
  		res.render('index');
	}else{
		res.render(page);
	}
});


// 获取百度 AI 接口参数：access_token
// 文档地址：http://ai.baidu.com/docs#/Face-Detect-V3/top
var param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': '5Rb1PuwTkztU7mqqWorwkPS7',
    'client_secret': 'k7vgRDOBryKaKG5VRuFWAaxgKjbbZ80h'
});
https.get(
    {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
    },
    function (res) {
        // 在标准输出中查看运行结果
        res.pipe(process.stdout);
    }
);
