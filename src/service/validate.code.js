var api = require('api');

var validateCode = {
    IMG_URL: api.config.rootPath + '/web/member/code',
    PHONE_CODE_URL: '/web/member/telcode',
};

function refreshCode() {
    return validateCode.IMG_URL + '?t='+Math.random();
}

function getPhoneCode(params) {

    return api.post(validateCode.PHONE_CODE_URL, params);
}

module.exports = {
    refreshCode: refreshCode,
    getPhoneCode: getPhoneCode
};
