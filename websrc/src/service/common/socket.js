/**
 * [websocket description]
 * @param url {String} 接口的地址，相对根路径
 * @param settings {Object} 请求相关设置
 */
import reconnectWebsocket from '../../lib/reconnect-websocket/reconnectWebsocket.js';

export default {
    getConnect(path,settings){
        let preReg = /^ws:/,
            requestPath;        // 服务器地址
        if (preReg.test(path)) {
            if(settings){
                requestPath = path + '/' + settings;
            }else{
                requestPath = path;
            }
        }else {
            if(settings){
                requestPath = 'ws://' + path + '/' + settings;
            }else{
                requestPath = 'ws://' + path;
            }
        }
        let websocket = new reconnectWebsocket(requestPath); //创建WebSocket对象
        // websocket.onopen = function (evt) {
        //     //已经建立连接
        //     console.log('已连接')
        //     // websocket.send('aaa');
        // };
        // websocket.onclose = function (evt) {
        //     //已经关闭连接
        //      console.log('已关闭');   
        // };
        // websocket.onmessage = function (evt) {
        //     //收到服务器消息，使用evt.data提取
        //     console.log(evt);
        // };
        // websocket.onerror = function (evt) {
        //     //产生异常
        //     console.log('异常');
        // };
        return websocket;
    }
}
/*
    使用示例：
    import webSocket from 'webSocket';
    webSocket.getConnect("ws://43.242.84.27:8081/userCenter", userId).onmessage = function(res){...}
*/