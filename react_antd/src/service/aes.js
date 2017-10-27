var CryptoJS = require('crypto-js');

var digMachine = window.PAGE_DATA.digMachine || {};
var dig = digMachine&&digMachine.digMachine;

function getAes(str,timer){
	var key = CryptoJS.enc.Utf8.parse(dig);
    var temp = dig + "," +  str + "," + timer;
    var aes = CryptoJS.AES.encrypt(temp,key,{
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var strAes = aes.toString();

    return strAes;
}

module.exports = {
	getAes:getAes,
}