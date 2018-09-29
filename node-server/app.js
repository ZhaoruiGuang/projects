var express = require('express');  
var app = express();  
var http  = require('http');
var url = require("url");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

  
app.engine('html', require('ejs').renderFile);  
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
app.use(express.static('assets'));


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

// 守护进程，防止请求错误导致进程退出
process.on('uncaughtException', (reason, p) => {
	console.log(reason)
	console.log('uncaught exception');
	console.log(p)
});

/*
	页面请求转发
*/
app.post('/agent',function(webReq,webRes){
	var options = { 
  		host: '192.168.1.24',   	
  		port: 8888, 
  		path: url.parse(webReq.url).path, 
  		method: 'POST' 
  	}; 
  	var req = http.request(options, function(res) { 
 		res.setEncoding('utf8'); 
 		res.on('data', function (data) { 
 			webRes.send(data);
 		}); 
 		req.on('error', function(err) { 
 			webRes.send(err);
 		}); 
 	});
 	req.end(); 
})

app.listen(80, function() {  
 	console.log('app listen at 80');  
})  