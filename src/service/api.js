/**
 * 封装所有的接口请求行为，保证接口返回数据格式的一致性。
 */

var config = {
    rootPath: ''
};

/**
 * 请求接口
 * @param url {String} 接口的地址，相对根路径
 * @param settings {Object} 请求相关设置
 */
function api(path, settings) {
    var deferred = $.Deferred(),
        protoReg = /^http/,
        requestPath = '';
    if (protoReg.test(path)) {
        requestPath = path;
    }
    else {
        requestPath = config.rootPath + path;
    }
    $.ajax(requestPath, settings).then(
        function(responseData) {
            try {
                if (typeof responseData === 'string') {
                    responseData = $.parseJSON(responseData);
                }
            }
            catch (e) {
                // throw e;
                deferred.reject({
                    code: 0,
                    msg: '服务器异常',
                    data: responseData.data || responseData
                });
            }

            // 接口请求失败

            if (!responseData.code || responseData.code === '0') {
                deferred.reject({
                    code: 0,
                    msg: responseData.msg || responseData.tip,
                    data: responseData.data || responseData
                });
            }

            // 操作成功
            // 如果响应数据是一个 JSON 对象，且包含一个 stateCode 和 data，则使用 data 作为返回结果
            if ( typeof responseData === 'object' && !(responseData instanceof Array) &&
                 responseData.data !== null && responseData.stateCode !== null) {
                deferred.resolve({
                    code: 1,
                    data: responseData.data,
                    msg: responseData.msg
                });

            }
            // 否则将整个响应数据作为返回结果
            else {
                deferred.resolve({
                    code: 1,
                    data: responseData,
                    msg: responseData.msg
                });
            }
        },
        function(responseData) {

            deferred.reject({
                code: 0,
                msg: "服务器异常",
                data: undefined
            });
        }
    );

    return deferred.promise();
}

api.config = config;

$.each( [ "get", "post" ], function( i, method ) {

    api[method] = function( url, data ) {
        return api( url, {
            type: method,
            data: data,
            beforeSend: function (settings) {
                settings.setRequestHeader('X-REQUEST-WITH', 'xmlHttpRequest');
            }
        });
    };

});

module.exports = api;
