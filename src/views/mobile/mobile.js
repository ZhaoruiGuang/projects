var css = require('./mobile.scss');
var uiSwitch = require('ui.switch');
var switchZero = require('switch.zero');
var switchOne = require('switch.one');
var switchTwo = require('switch.two');
var switchTwoplus = require('switch.twoplus');
var switchThree = require('switch.three');
var switchFour = require('switch.four');
var switchFive = require('switch.five');
var switchSix = require('switch.six');
var switchSeven = require('switch.seven');
var switchSevenplus = require('switch.sevenplus');
var switchEight = require('switch.eight');
var switchNine = require('switch.nine');
var fontsizeset = require('fontsizeset');

uiSwitch.createSwitch({
    el: '#container',
    data: {
        switchList: [
            {
                photo: 'photo',
                component: switchZero
            },
            {
                photo: 'photo',
                component: switchOne
            },
            {
                photo: 'photo',
                component: switchTwo
            },
            {
                photo: 'photo',
                component: switchTwoplus
            },
            {
                photo: 'photo',
                component: switchThree
            },
            {
                photo: 'photo',
                component: switchFour
            },
            {
                photo: 'photo',
                component: switchFive
            },
            {
                photo: 'photo',
                component: switchSix
            },
            {
                photo: 'photo',
                component: switchSeven
            },
             {
                photo: 'photo',
                component: switchSevenplus
            },
            {
                photo: 'photo',
                component: switchEight
            },
            {
                photo: 'photo',
                component: switchNine
            }
        ],
    },
    methods: {
        // current 是当前显示的页面，prev 是前一页,即刚翻过去的页面
        afterSwitch: function (current, prev) {
            if(current != prev){
                current.startAnimation();
                prev.endAnimation();
            }
        },
        beforeSwitch: function (data) {

        },
    },
    ready:function(){
        var url = location.href.split('#')[0];
        var params = {
            url: url
        };
        $.getJSON("http://www.redhorsefund.com/web/Weixin/reponse", params,function(res){
            var data = res.data;
            wx.config({
                // debug: true,
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp:data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ['showMenuItems', 'onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){

                wx.checkJsApi({  //判断当前客户端版本是否支持指定的 JS 接口
                    jsApiList: ['showMenuItems', 'onMenuShareTimeline','onMenuShareAppMessage'],
                    success: function (res) {
                        wx.showMenuItems({ //批量显示功能按钮接口
						    menuList: [
								'menuItem:share:appMessage', 	//发送给朋友
								'menuItem:share:timeline' 		//分享到朋友圈
						    ]
						});
                        // 朋友圈
                        wx.onMenuShareTimeline({
                            title: '赤骥追风一号',
                            link: url,
                            imgUrl: 'http://www.redhorsefund.com/public/f2e/redhorse.png',
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                          // 好友
                        wx.onMenuShareAppMessage({
                            title: '赤骥追风一号', // 分享标题
                            desc: '赤骥追风一号私募基金', // 分享描述
                            link: url, // 分享链接
                            imgUrl: 'http://www.redhorsefund.com/public/f2e/redhorse.png', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    }
                });
            });
        })
    }
});
new Vue({
    el:"#box",
    data:{
       rotate:true,
       url:'/public/f2e/song.mp3'
    },
    methods:{
       stop:function(){
            var music = document.getElementById('music');
            var pic = document.getElementById('pic');
            if(this.rotate){
                this.rotate = false;
                music.pause();
            }else{
                this.rotate = true;
                music.play();
            }
       }
    }
})
