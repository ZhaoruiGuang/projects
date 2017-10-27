<template>
 	<div id="commonShare" >
        <div class="allBox" v-on:mouseleave="hide">
            <span class="none" v-on:mouseenter="hide"></span>
            <img class="shareIco" src="./images/share.png" alt="" v-on:mouseenter="show()">
            <div class="shareBox" v-if="showShare"> 
                 <img class="shareImg sina" src="./images/sina.png" alt="" v-on:click="sina">
                 <img class="shareImg qzon" src="./images/qzon.png" alt="" v-on:click="qzon">
            </div>
        </div>
 	</div>
</template>
<script>

    module.exports = Vue.component('ui-share',{
        data:function() {
            return {
                showShare:false,
            }
        },
        props:{
        	shareTitle:{
        		type:[String,Number],
        		default:'外汇通分享',
        	},
        	shareUrl:{
        		type:[String,Number],
        		default:'http://www.forex.com.cn/',
        	},
        },
        methods: {
            sina:function(){
            	 window.open('http://v.t.sina.com.cn/share/share.php?title=' + this.shareTitle + '&url=' + this.shareUrl);
            },
            qzon:function(){
            	window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + this.shareTitle + '&url=' + this.shareUrl);
            },
            show:function(){
                this.showShare = true;
            },
            hide:function(){
                this.showShare = false;
            }
        },
       
    }) 
</script>
<style lang="scss" scoped>
    #commonShare{
        position:relative;
        width:14px;
    }
    .allBox{
        position:absolute;
        width:126px;
        height:65px;
        right:0;
        .none{
            display:inline-block;
            width:104px;
            height:13px;
        }
        .shareIco{
            float:right;
            cursor:pointer;
        }
        .shareBox{
            width:126px;
            height:48px;
            position:relative;
            right:-6px;
            background-image: url('./images/sharBg.png');
            background-size: 126px 48px;
            background-repeat: no-repeat;
            cursor:pointer;
            .shareImg{
                margin-top:17px;
                margin-left:20px;
                cursor:pointer;
                &.qzon{
                    margin-left:26px;
                }
            }
        }
    }
</style>
