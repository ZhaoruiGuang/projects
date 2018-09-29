/*
   封装所有的接口请求行为，保证接口返回数据格式的一致性和简洁性
*/

import axios from 'axios';
import qs from 'qs';

/*
	java 接口返回格式：
	失败：{"header":{"retCode":990100,"retMsg":"请求非法，服务器拒绝请求"}}
	成功：{"header":{"retCode":0,"retMsg":"success"},"body":{...}
	
	请求成功（浏览器 code 值为200 ）时，后台必须有返回数据，否则报错

	封装后的统一简化格式：{code:990100,msg:'请求非法，服务器拒绝请求',body:{}}  code 值：0 成功，其他失败
*/
let env = process.env.NODE_ENV || '';
function api(path, settings) {
	if(env == 'development'){
		path = '/dev' + path;
	};
    settings.url = path;
    let promise = new Promise((resolve,reject)=>{
    	axios(settings)
		.then((res)=>{
//			let data = JSON.parse(res.request.responseText);
//			resolve({
//		  		code:data.header.retCode,
//		  		msg:data.header.retMsg,
//		  		body:data.body || {},
//		  	})
			resolve({body:'success'})
		})
		.catch((err)=>{
	  		reject({
	  			code:500,
	  			msg:'服务器异常',
	  			body:{},
	  		})
		});
    })
    return promise;
}

let methods = ['get','post'];
for(let i in methods){
	api[methods[i]] = (url,data)=>{
        return api( url, {
            method: methods[i],
            data: qs.stringify(data, { allowDots: true }),
        });
    };
}    

export default api;
