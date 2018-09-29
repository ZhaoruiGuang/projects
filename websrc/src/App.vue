<template>
    <div id="app">
        <div class="ui-header">这是公共头部</div>
        <div class="ui-container" id="ui-container">
            <div class="ui-aside">
                这是树状菜单区域
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/business">业务逻辑页面</router-link></li>
                </ul>
            </div>
            <div class="ui-content">
                <router-view />
            </div>
        </div>
        <div class="ui-footer">这是公共底部</div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                
            }
        },
        mounted(){
            this.$nextTick(()=>{
                // 页面初始化：监听窗口变化，保持页面高度充满全屏
                function setHeight(){
                    let winHeight = document.getElementById('app').offsetHeight;
                    document.getElementById('ui-container').style.height = winHeight - 120 + 'px';
                };
                setHeight();
                window.onresize = function(){
                    setHeight();
                };
            })
        }
    }
</script>

<style lang="scss">
    /* 基础配置 */
    body,
    ol, ul, li, dl, dt, dd,
    h1, h2, h3, h4, h5, h6, p, pre,
    form, fieldset, legend, input, textarea, select, button,
    blockquote, th, td, hr, article, aside, details,
    figcaption, figure, header, footer, section, hgroup, menu, nav,
    span, div, a {
        margin: 0;
        padding: 0;
        box-sizing:border-box;
    }
    html,body {
        font-size: 14px;
        font-family: Microsoft Yahei,Verdana,Arial,SimSun;
        height: 100%;
        width:100%;
        background-color: #f5f5f5;
    }
    ol, ul, li {
        list-style: none outside none;
    }
    img {
        border: 0;
    }
    input, a, select, button, textarea {
        outline: none;
        &::-moz-focus-inner {
            border-color: transparent!important;
        }
    }
    input[type='button']{
        cursor: pointer;
        border:none;
    }
    /*
        去除  Chrome 浏览器 input 框默认填充时的黄色背景
    */
    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill { 
        -webkit-box-shadow: 0 0 0 1000px white inset; 
    }
    input[type=text]:focus, input[type=password]:focus, textarea:focus {
        -webkit-box-shadow: 0 0 0 1000px white inset; 
    }
    a {
        text-decoration: none;
    }



    /* 具体页面样式 */
    #app{
        height: 100%;
    }
    .ui-header,.ui-footer{
        height: 60px;
        background-color: #191919;
        color:#fff;
        line-height: 60px;
        font-size: 26px;
        text-align: center;
    }
    .ui-aside{
        height: 100%;
        width: 15%;
        background-color: #D0CECE;
        color: #fff;
        font-size: 26px;
        text-align: center;
        padding-top: 50px;
        float: left;
        ul{
            margin-top: 20px;
            font-size: 16px;
            line-height: 30px;
        }
    }
    .ui-content{
        height: 100%;
        width: 85%;
        float: right;
    }
</style>
