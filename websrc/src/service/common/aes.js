import CryptoJS from 'crypto-js';
import api from 'api';

let nonce = 'p7kyq8sf2btb2zfw';  // 用于解密动态密钥的静态密钥
let basePath = window.PAGE_DATA.basePath || {};
let encryptInfo = window.encryptInfo || {};
export default {
    // 获取 aes 加密用的 v,s
    getKeys(){
        let route = basePath.path + '/sy/ck/' + encryptInfo.k ;
        let result;
        $.ajax({
            method:'get',
            url:route,
            data:{
                k:encryptInfo.k,
            },
            async:false,
            success:function(res){
                result = JSON.parse(res).body;
            },
            error:function(err){
              
            }
        })
        return result;
    },
    // AES 解密
    decAes(str){
        let decryptedData = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(nonce), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedStr;
    },
    // AES 加密
    getAes(str,type){
        let key;
        let res = this.getKeys();
        if(type){
            key = CryptoJS.enc.Utf8.parse(this.decAes(res&&res.s));  // 验签的所有参数排序后的 AES 加密所用的密钥，来自 encryptInfo.s 解密
        }else{
            key = CryptoJS.enc.Utf8.parse(this.decAes(res&&res.v));  // 普通ajax请求的个别参数的 AES 加密所用的密钥，来自 encryptInfo.s 解密
        };
        let aes = CryptoJS.AES.encrypt(str,key,{
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let strAes = aes.toString();
        return strAes;
    },
    // MD5 加密
    getMd5(str){
        let strMd5 = CryptoJS.MD5(str).toString();
        return strMd5;
    },
    // 参数序列化（验签用）
    format(param){
        param.version = '1.0';
        param.k = encryptInfo.k;
        let obj = param;
        for(let i in param){                                            // 去除请求参数里的空参
            if(!param[i]){
                delete param[i];
            }
        };
        let time = Date.parse(new Date())+'';                           // 添加验签参数
        param.t = time;
        param.wrbr5vQF = 'ReH5';
        let str = JSON.stringify(param).split('').sort().join('');      // 参数自然排序
        let mid = this.getMd5(str);                                     // MD5 加密
        let result = this.getAes(mid,true);                             // AES 加密
        obj.sn = result;                                                // 添加sn参数，生成最终格式的请求参数
        return obj;
    }
}

/*
	"pwd", "phone","cardid","cardno"： 有此类字段的参数需要加密(无论大小写)
*/