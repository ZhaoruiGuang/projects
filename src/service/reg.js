var reg = {
    passwordReg: /^(?=.*[A-z])(?=.*\d).{8,16}$/,
    usernameReg: /^\w{6,16}$/,
    validCodeReg: /^[a-zA-Z\d]{4}$/
};
var passwordReg = /^(?=.*[A-z])(?=.*\d).{8,16}$/;
var usernameReg = /^\w{6,16}$/;
var email = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;

function validPass(password) {
    return reg.passwordReg.test(password);
}
function validUsername(username) {
    return reg.usernameReg.test(username);
}
function validCodeReg(validCode) {
    return reg.validCodeReg.test(validCode);
}

module.exports = {
    passwordReg: passwordReg,
    usernameReg: usernameReg,
    validPass: validPass,
    validUsername: validUsername,
    validCodeReg: validCodeReg,
    emial: email
};
