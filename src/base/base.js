require('./base.scss');
var api = require('api');
window.$ = window.jQuery = require('jquery');
var sessionService = require('sessionStorageService');
window.RH = {};
RH.rootPath = 'http://www.redhorsefund.com';
api.config.rootPath = RH.rootPath;

window.PAGE_DATA = window.PAGE_DATA || {};
if (window.sessionStorage) {
    window.PAGE_DATA.userInfo = sessionService.getItem('userInfo', null);
}
