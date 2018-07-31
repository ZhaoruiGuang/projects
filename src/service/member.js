var api = require('./api.js');
var sessionService = require('sessionStorageService');
var messageCenter = require('message.center');

/**
 * 登录接口
 * @param  {[type]}
 *         loginName: username, --登录名
 *         pwd: password,  -- 密码
 *         code: validCode, -- 验证码，前台输入
 *         reg_rand: reg_rand  --注册成功后的随机验证码，和code只需出现一个
 * @return {[type]}  promise
 */
function login(data) {
    var deferred = $.Deferred(),
        param = {
            loginName: data.loginName,
            pwd: data.pwd,
            code: data.code,
            reg_rand: data.reg_rand
        };
    api.post('/web/member/login', param)
        .then(function (res) {
            var user = window.PAGE_DATA.userInfo = res.data;
            messageCenter.notifyUpdateUserInfo(user);
            sessionService.setItem('userInfo', user);
            deferred.resolve(res);
        }, function (res) {
            messageCenter.notifyUpdateUserInfo(null);
            window.PAGE_DATA.userInfo = null;
            sessionService.removeItem('userInfo');
            deferred.reject(res);
        });

    return deferred.promise();

}
/**
 * 注销登录
 * @param  {[type]} data ajax: 1 说明为异步退出登录，返回退出结果，如果不穿Ajax:1 则为同步退出登录，直接由服务端重定向
 * @return {[type]}      [description]
 */
function logout(data) {
    var deferred = $.Deferred();
    api.post('/web/member/logout', data)
        .then(function (res) {
            if (window.sessionStorage) {
                messageCenter.notifyUpdateUserInfo(null);
                window.PAGE_DATA.userInfo = null;
                sessionService.removeItem('userInfo');
            }
            deferred.resolve(res);

        }, function (res) {
            messageCenter.notifyUpdateUserInfo(null);
            window.PAGE_DATA.userInfo = null;
            sessionService.removeItem('userInfo');
            deferred.reject(res);
        });

    return deferred.promise();
}
/**
 * 验证字段是否已经存在  --主要校验loginName email phone
 * @param  {[type]} data loginName || email || phone
 * @return {[type]}      [description]
 */
function checkField(data) {
    var deferred = $.Deferred();

    api.post('/web/member/checkfield', data)
        .then(function (res) {
            deferred.resolve(res);
        }, function (res) {
            deferred.reject(res);
        });


    return deferred.promise();
}

/**
 * 注册接口
 * @param
 * loginName: this.loginName, 用户名
 * userName: this.username, 真实姓名
 * pwd: this.password, 密码
 * confirm_password: this.repassword, 确认密码
 * email: this.email, 邮箱--找回密码使用
 * telephone: this.telephone, --手机号码
 * telcode: this.validCode, -- 手机验证码
 * issubmit: 1
 * @return {[type]}  promise
 */
function regisger(data) {
    var deferred = $.Deferred();

    api.post('/web/member/register', data)
        .then(function (res) {
            deferred.resolve(res);
        }, function (res) {
            deferred.reject(res);
        });

    return deferred.promise();
}

/**
 * 验证邮箱是否存在
 * @param  String email
 * @return {[type]}      [description]
 */
function checkEmail(data) {
    var params = {};

    params.email = data.email;

    return api.post('/web/member/tofindpwd', params);

}

/**
 * 找回密码时验证手机验证码
 * @param  String random
 * @param  Number code
 * @return {[type]}  promise
 */
function checkCode(code, random) {
    var params = {
        random: random,
        code: code
    };

    return api.post('/web/member/checkcode', params);

}

/**
 * 修改密码
 * @param  String random
 * @param  String pwd
 * @param  String confirm_pwd
 * @return {[type]}  promise
 */
function resetPwd(pwd, confirm_pwd, random) {
    var params = {
        random: random,
        confirm_pwd: confirm_pwd,
        pwd: pwd
    };

    return api.post('/web/member/resetpwd', params);

}


/**
 * 发送验证码
 * @param  String random
 * @param  String pwd
 * @param  String confirm_pwd
 * @return {[type]}  promise
 */
function sendMessage(random, type) {
    var params = {
        random: random,
        type: type
    };

    return api.post('/web/member/sendmessage', params);

}

module.exports = {
    login: login,
    logout: logout,
    checkField: checkField,
    regisger: regisger,
    checkEmail: checkEmail,
    checkCode: checkCode,
    resetPwd: resetPwd,
    sendMessage: sendMessage
};
