var validator = require('vue.validator');
Vue.use(validator);

function pwdCheck(val) {
    return /^(?=.*[A-z])(?=.*\d).{8,16}$/.test(val);
}

function usernameCheck(val) {
    return /^\w{6,16}$/.test(val);
}

function phoneCheck(val) {
    return /^1[34578]\d{9}$/.test(val);
}

Vue.validator('loginName', {
    check: function (val) {
        return phoneCheck(val) || usernameCheck(val);
    }
});

Vue.validator('selfPassword', {
    check: pwdCheck
});

Vue.validator('eqTo', {
    check: function (val, rule) {
        return val === rule;
    }
});

Vue.validator('email', {
    check: function (val, rule) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
  }
});

Vue.validator('telephone', {
    check: function (val) {
        return /^1[34578]\d{9}$/.test(val);
  }
});

Vue.validator('validCode', {
    check: function (val, rule) {
        if(!rule) {
            rule = 6;
        }
        var reg = new RegExp('^[a-zA-Z0-9]{'+rule+'}$', 'g');
        return reg.test(val);
  }
});

Vue.validator('numberic', {
    check: function (val, rule) {
        if(!rule) {
            rule = 6;
        }
        var reg = new RegExp('^\\d{'+rule+'}$', 'g');
        return reg.test(val);
  }
});
