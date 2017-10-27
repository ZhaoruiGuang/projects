var localStorage = window.localStorage;


function setItem(key, value) {
    if (localStorage) { //如果浏览器支持localStorage本地存储的话

        // 添加/编辑localStorage的内容：window.localStorage.setItem(键,值);
        // 设置 key 的值为 字符串 'value'
        localStorage.setItem(key, JSON.stringify(value));
    }
    return value;
}
function getItem(key, defaultValue) {
    var result = null;
    try {
        // 获取名为 key 的值
        var resultStr = localStorage.getItem(key);
        if (resultStr) { //如果 resultStr 存在的话
            //将 resultStr 转换成对象格式赋给 result
            result = JSON.parse(resultStr);
        }
        else {
            // 如果 resultStr 不存在，则 result = defaultValue，并转为字符串赋给 key
            result = defaultValue;
            localStorage.setItem(key, JSON.stringify(result));
        }
    }
    catch (e) {
        result = defaultValue;
        localStorage.setItem(key, JSON.stringify(result));
    }
    return result;
}
function removeItem(key) {
    //清除 key 的值
    localStorage.removeItem(key);
}
function clear() {
    localStorage.clear();
}

module.exports = {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear
};
