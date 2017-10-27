var reg = {
    passwordReg: /^(?=.*[A-z])(?=.*\d).{8,16}$/,
};


function validPass(password) {
    return reg.passwordReg.test(password);
}



module.exports = {

    validPass: validPass,
};
