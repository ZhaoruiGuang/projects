/**
 * 全局消息订阅及发布
 *
 * ## 使用示例
 *
 * 首先请在下面的 messageNames 数组中配置所需要使用的消息名称：
 *
 *     messageName = [
 *         'updateCart'
 *     ]
 *
 * 然后在其它模块中引入消息中心模块，并调用相应方法：
 *
 *     var messageCenter = require('tools.message-center');
 *
 *     // 消息处理器
 *     var handler = function() {
 *         // 重新获取购物车数据
 *         this.data = cartService.getCartInfo();
 *     };
 *
 *     // 监听消息
 *     messageCenter.onUpdateCart(handler);
 *
 *     // 触发消息
 *     messageCenter.notifyUpdateCart();
 *
 *     // 取消所有对 updateCart 消息的监听
 *     messageCenter.offUpdateCart();
 *
 *     // 只取消之前所注册的监听器
 *     messageCenter.offUpdateCart(handler);
 */

var

// 应用内所支持的所有消息的名称，
// 将以这些消息名称动态创建消息中心的方法
messageNames = [
    'updateUserInfo',//用户信息改变（登录退出）

],

// ID 计数器
count   = 1,
// 随机码，当需要在外部对象中存储数据时，将以该随机码作为属性名称，以免出现冲突
random  = 'r' + Math.random().toFixed(20).substring(2),
// 存储所有监听消息的回调函数，以消息名称分组
records = {},

// 消息订阅与发布的实现
event = {

    /**
     * 订阅消息
     * @param name {String} 所订阅的消息的名称
     * @param callback {Function} 消息被发布时，回调的函数
     */
    on: function(messageName, callback) {
        var id = count++,
            callbackIndexList = records[messageName],
            idIndexList = callback[random];

        if (!callbackIndexList) {
            callbackIndexList = records[messageName] = {};
        }

        if (!idIndexList) {
            idIndexList = callback[random] = {};
        }

        callbackIndexList[id] = callback;
        idIndexList[id] = true;
    },

    /**
     * 解除消息订阅
     * @param name {String} 需要解除订阅的消息的名称，若只提供该参数，则解除对该消息的所有订阅。
     * @param callback {Function} 订阅消息时所提供的回调函数，若提供该参数，则只解除该回调函数的订阅。
     */
    off: function(messageName, callback) {
        var callbackIndexList, idIndexList, id;

        if (!callback) {
            delete records[messageName];
        }
        else {
            callbackIndexList = records[messageName];
            idIndexList = callback[random];

            if (callbackIndexList && idIndexList) {
                for (id in idIndexList) {
                    delete callbackIndexList[id];
                    delete idIndexList[id];
                }
            }
        }
    },

    /**
     * 发布消息
     * @param name {String} 消息名称
     * @param data... {*} 消息相关的数据，将作为参数传给每个回调函数
     */
    notify: function(messageName) {
        var callbackIndexList = records[messageName],
            datas = Array.prototype.slice.call(arguments, 1);
        if (callbackIndexList) {
            for (var id in callbackIndexList) {
                callbackIndexList[id].apply(this, datas);
            }
        }
    }
},

// 消息中心
messageCenter = {};

function messageHandler(name) {
    var funName = name[0].toUpperCase() + name.substring(1);

    messageCenter['on' + funName] = function(callback) {
        event.on(name, callback);
    };

    messageCenter['off' + funName] = function(callback) {
        event.off(name, callback);
    };

    messageCenter['notify' + funName] = function() {
        var params = [name].concat(Array.prototype.slice.call(arguments, 0));
        event.notify.apply(event, params);
    };
}

for (var i = 0, len = messageNames.length; i < len; i++) {
    messageHandler(messageNames[i]);
}

module.exports = messageCenter;
