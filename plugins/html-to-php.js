var gutil   = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var merge   = require('merge');

var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-html-to-php';

/**
 * 设置 pageData 的 script 标签，将其中的假数据替换为 php 的数据获取代码
 *
 * @example
 *     <script class="pagedata" data-name="loginInfo">
 *         window.PAGE_DATA = window.PAGE_DATA || {};
 *         PAGE_DATA.loginInfo = { name: 'biossun', showVCode: false };
 *     </script>
 *
 *     -> to php
 *
 *     <script class="pagedata" data-name="loginInfo">
 *         window.PAGE_DATA = window.PAGE_DATA || {};
 *         PAGE_DATA.loginInfo = $!{loginInfo};
 *     </script>
 */
function setPageDataScript(script) {
    var dataName = script.attr('data-name'),
        leftOperand,
        phpPropName;

    if (dataName) {
        leftOperand = 'PAGE_DATA["' + dataName + '"]';
        phpPropName = dataName;
    }
    else {
        leftOperand = 'PAGE_DATA';
        phpPropName = 'pageData';
    }

    script.text(
        'window.PAGE_DATA = window.PAGE_DATA || {}; ' +
        leftOperand + ' = ' + '<?php echo $' + phpPropName + ' ?>'
    );
}

/**
 * 解析自定义的 include 指令
 *
 * include 指令用于将某一段 HTML 代码替换成 php 的 include 函数表达式，替换结果见下方代码示例。
 *
 * ## 格式
 *
 * include 指令的格式如下：
 *
 *     <!-- #include "path" "params" -->
 *     任意的 HTML 代码
 *     <!-- #end -->
 *
 * ### path
 *
 * path 参数为所包含模板的访问路径，如果路径中包含任何空白字符，则需要使用双引号包裹路径，否则双引号是可选的：
 *
 *     <!-- #include ./header.html -->
 *     <!-- #include "./header.thml" -->
 *
 *     <!-- #include "../base templates/header.html" -->
 *
 * ### params
 *
 * params 参数为需要传入所包含模板中的数据，path 参数与注释符结束标记（既 "-->"）之间的任意非空白文本内容都将视为 params 参数的值。
 *
 * 该参数是可选的，另外如果需要传入空白字符，请使用双引号进行包裹：
 *
 *     <!-- #include "path" "   " -->
 *     任意的 HTML 代码
 *     <!-- #end -->
 *
 * ## 注意
 *
 * include 指令不支持嵌套
 *
 * @example
 *     <!-- #include "path" "params" -->
 *     任意的 HTML 代码
 *     <!-- #end -->
 *
 *     -> to php
 *
 *     <!--$!{include("path", "params")} -->
 */
function parseIncludeDirective(str) {
    while (true) {
        // TODO: 如果 params 中有注释符结束标记 "-->" 将导致匹配失败
        var r_open  = /<!--(?:\s*)#include(\s*"[^"]+"|\s*\S+)?(\s*[\s\S]*?(?!\s))?(?:\s*)-->/g,
            r_close = /<!--(?:\s*)#end(?:\s*)-->/g;

        var openMatchInfo  = r_open.exec(str),
            closeMatchInfo = r_close.exec(str);

        if (!openMatchInfo) {
            break;
        }

        if (!closeMatchInfo) {
            throw {
                message: '没有找到 include 指令所对应的结束指令，既"<!-- #end -->"'
            };
        }

        var path   = (openMatchInfo[1] || '').trim(),
            params = (openMatchInfo[2] || '').trim();

        if (path[0] !== '"') {
            path = '"' + path + '"';
        }

        if (params) {
            params = ', ' + params;
        }

        if (path === '""') {
            throw {
                message: 'include 指令中没有提供所引入文件的路径'
            };
        }

        var replaceContent    = '<!--$!{include(' + path + params + ')}-->',
            replaceBeginIndex = openMatchInfo.index,
            replaceEndIndex   = closeMatchInfo.index + closeMatchInfo[0].length;

        str = str.substring(0, replaceBeginIndex) + replaceContent + str.substring(replaceEndIndex);
    }

    return str;
}

/**
 * 创建错误信息
 *
 * 错误信息与 PluginError 的 options 参数相同（name, message, fileName, lineNumber, stack, showStack, showProperties, plugin）。
 *
 * @param file 文件对象
 * @param errorInfo(?) 异常提示消息
 * @param errorInfo(?) 异常数据
 */
function createError(file, message, errorInfo) {
    errorInfo = errorInfo || {};

    if (typeof message === 'string') {
        errorInfo[message] = message;
    }
    else {
        errorInfo = message || {};
    }

    return new PluginError(merge(errorInfo, {
        plugin: PLUGIN_NAME,
        fileName: file.path
    }));
}

function htmlToPhp() {
    var stream = through.obj(function(file, enc, cb) {
        var str, $, dest, scripts;

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(createError(file, '不支持流对象'));
        }

        str = file.contents.toString('utf8');
        dest = gutil.replaceExtension(file.path, '.php');

        // try {
        //     // 解析自定义的 php 指令
        //     str = parseIncludeDirective(str);
        // }
        // catch (e) {
        //     return cb(createError(file, e));
        // }

        // 将 html 代码解析为 DOM 对象，进行 DOM 层面的后续处理
        $ = cheerio.load(str, {
            decodeEntities: false
        });

        // 处理数据脚本
        scripts = $('script.page-data, script.pagedata, script[data-name]');
        scripts.each(function() { setPageDataScript($(this)); });

        // 生成最终内容
        file.contents = new Buffer($.html());
        file.path = dest;

        cb(null, file);
    });

    return stream;
}

module.exports = htmlToPhp;
