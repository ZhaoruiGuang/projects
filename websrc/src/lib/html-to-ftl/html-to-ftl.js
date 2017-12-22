import gutil   from 'gulp-util';
import through from'through2';   // through2 是一个对 node 的 transform streams 简单封装
import cheerio from'cheerio';    // 为服务器特别定制的，快速、灵活、实施的jQuery核心实现.
import merge   from'merge';  

let PluginError = gutil.PluginError;

let PLUGIN_NAME = 'gulp-html-to-ftl';

/**
 * 设置 pageData 的 script 标签，将其中的假数据替换为 java Freemarker模板 的数据获取代码
 *
 * @example
 *     <script class="pagedata" data-name="loginInfo">
 *         window.PAGE_DATA = window.PAGE_DATA || {};
 *         PAGE_DATA.loginInfo = { name: 'biossun', showVCode: false };
 *     </script>
 *
 *     -> to java
 *
 *     <script class="pagedata" data-name="loginInfo">
 *         window.PAGE_DATA = window.PAGE_DATA || {};
 *         PAGE_DATA.loginInfo = ${loginInfo};
 *     </script>
 */
function setPageDataScript(script) {
    let dataName = script.attr('data-name'),
        leftOperand,
        javaPropName;

    if (dataName) {
        leftOperand = 'PAGE_DATA["' + dataName + '"]';
        javaPropName = dataName;
    }
    else {
        leftOperand = 'PAGE_DATA';
        javaPropName = 'pageData';
    }

    script.text(
        'window.PAGE_DATA = window.PAGE_DATA || {}; ' + leftOperand + ' = ' + '${' + javaPropName + '}'
    );
}

/**
 * 解析自定义的 include 指令
 *
 * include 指令用于将某一段 include 代码替换成 java Freemarker模板 的 include 函数表达式，替换结果见下方代码示例。
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
 *     <!-- #include "path" -->
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
 *     -> to java
 *
       <#include "path".ftl />
 */
function parseIncludeDirective(str) {
    while (true) {
        // TODO: 如果 params 中有注释符结束标记 "-->" 将导致匹配失败
        let r_open  = /<!--(?:\s*)@include(\s*"[^"]+"|\s*\S+)?(\s*[\s\S]*?(?!\s))?(?:\s*)-->/g;
        let r_close = /<!--(?:\s*)@end(?:\s*)-->/g;

        let openMatchInfo  = r_open.exec(str);
        let closeMatchInfo = r_close.exec(str);

        if (!openMatchInfo) {
            break;
        }

        if (!closeMatchInfo) {
            throw {
                message: '没有找到 include 指令所对应的结束指令，既"<!-- @end -->"'
            };
        }

        let path = (openMatchInfo[1] || '').trim();

        if (path[0] !== '"') {        // 将路径拼成字符串形式
            path = '"' + path + '.ftl"';
        }

        if (path === '""') {
            throw {
                message: 'include 指令中没有提供所引入文件的路径'
            };
        }

        let replaceContent    = '<#include ' + path + ' />';
        let replaceBeginIndex = openMatchInfo.index;
        let replaceEndIndex   = closeMatchInfo.index + closeMatchInfo[0].length;

                    // include 前面的内容保留    include 内的内容被替换   include 之后的内容保留
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

function htmlToFtl() {
    var stream = through.obj(function(file, enc, cb) {
        var str, $, dest, scripts;

        if (file.isNull()) {
            return cb(null, file);
        };

        if (file.isStream()) {
            return cb(createError(file, '不支持流对象'));
        };
        // 修改文件后缀：.html --> .ftl
        str = file.contents.toString('utf8');
        dest = gutil.replaceExtension(file.path, '.ftl');

        // 将 html 代码解析为 DOM 对象，进行 DOM 层面的后续处理
        $ = cheerio.load(str, {
            decodeEntities: false
        });
        // 处理数据脚本
        scripts = $('script.page-data, script.pagedata, script[data-name]');
        scripts.each(function() { setPageDataScript($(this)); });
        
        try {
            // 解析自定义的 java 指令: include
            str = parseIncludeDirective(str);
        }
        catch (e) {
            return cb(createError(file, e));
        };

        // 生成最终内容
        file.contents = new Buffer(str);
        file.path = dest;

        cb(null, file);
    });

    return stream;
}

export default htmlToFtl;
