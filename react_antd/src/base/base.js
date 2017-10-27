require('./base.scss');
var api = require('api');
var filter = require('filter');
window.$ = window.jQuery = require('jquery');
var sessionService = require('sessionStorageService');

window.PAGE_DATA = window.PAGE_DATA || {};

var rootPath = window.PAGE_DATA.baseRoot ;

api.config.rootPath = rootPath;

if (window.sessionStorage) {
    window.PAGE_DATA.userInfo = sessionService.getItem('userInfo', null);
}
