/**
 * obj属性需要处理timer和timedown属性，因此obj必须有这两个基础属性
 * timer为计时器，timedown为倒计时总时长
 * @param  {[type]} settings [description]
 * @return {[type]}          [description]
 */
function startTimer(settings) {
    var options = $.extend({
        obj: null,
        endFn: function () {

        },
        eachFn: function () {

        },
        rate: 1000,
        timedown: undefined
    }, settings);
    var obj = options.obj;
    if (obj === null) {
        throw new Error('定时器的obj属性不能为null');
    }
    else {
        obj.timedown = options.timedown ? options.timedown : 60;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            if (obj.timedown === 0) {
                clearInterval(obj.timer);
                options.endFn.call(obj);
                return;
            }
            else {
                obj.timedown--;
                options.eachFn.call(obj);
            }

        }, options.rate);
    }

}

/**
 * 获取请求中的参数
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getParams(url) {

    var pageParams = {};
    if (url) {
        url = url.substr(1);
        paramArr = url.split('&');
        for (var i = 0; i < paramArr.length; i++) {
            var param = paramArr[i].split('='),
                key = param[0],
                value = param[1];
            if (key) {
                if (!pageParams[key]) {
                    pageParams[key] = param[1];
                }
                else {
                    if (typeof pageParams[key] === 'string') {
                        pageParams[key] = [pageParams[key]];
                    }
                    pageParams[key].push(value);
                }
            }
        }
    }
    return pageParams;
}

module.exports = {
    startTimer: startTimer,
    getParams: getParams
};
