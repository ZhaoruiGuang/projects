<template>
    <div id="vueShareContent" v-bind:style="contentStyle">
        <span v-for="(el,index) in shareType" v-bind:class="el" v-on:click="toShare(el)" v-bind:style="{'float':spanFloat}"></span>
        <div class="clearfix"></div>
        <img class="codeImg" v-show="codeImgState" v-bind:src="codeImgUrl" :alt="shareTitle" v-bind:style="codeStyle"> 
    </div>
</template>
<script>
    export default {
        name:'share',
        props:{
            shareType:{                      // 分享类型
                type:Array,
                default:function(){
                    return ['sina','qzon','wx']
                },
            },
        	shareTitle:{                    // 分享标题
        		type:[String,Number],
        		default:'',
        	},
        	shareUrl:{                      // 分享链接
        		type:String,
        		default:'http://www.zhaoruiguang.cn/',
        	},
            shareImg:{                      // 分享配图      
                type:String,
                default:'',
            },
            shareDirection:{                // 分享浮窗相对父级的位置，横向：transverse  竖向：vertical
                type:String,
                default:'transverse',         
            },
            shareCodeInterface:{            // 生成微信二维码接口，默认使用第三方 联图网 的接口
                type:String,
                default:'http://qr.liantu.com/api.php',  
            },
        },
        data:function() {
            return {
                codeImgState:false,
                codeImgUrl:'',
                spanFloat:'left',       // 图标浮动
                contentStyle:{},
                contentStyleVertical:{
                    'width':'48px',
                    'padding':'5px 0',
                },
                contentStyleTransverse:{
                    'width':48 * (Number(this.shareType.length)) + 'px',
                    'padding':'0 5px',
                },
                codeStyle:{},
                codeStyleVertical:{
                    'bottom':'0',
                    'right':'-80px',
                },
                codeStyleTransverse:{
                    'right':'0',
                    'bottom':'-80px',
                },
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                let contentStyle = 'contentStyle'+this.shareDirection.substring(0,1).toUpperCase() + this.shareDirection.substring(1);
                let codeStyle = 'codeStyle'+this.shareDirection.substring(0,1).toUpperCase() + this.shareDirection.substring(1);
                this.contentStyle = this[contentStyle];
                this.codeStyle = this[codeStyle];
                if(this.shareDirection == 'transverse'){
                    this.spanFloat = 'left';
                }else{
                    this.spanFloat = 'none';
                }
            })
        },
        methods:{
            toShare(type){
                this[type]();
            },
            sina:function(){
            	window.open('http://v.t.sina.com.cn/share/share.php?title=' + this.shareTitle + '&url=' + encodeURIComponent(this.shareUrl) + '&pic=' + encodeURIComponent(this.shareImg));
            },
            qzon:function(){
            	window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + this.shareTitle + '&url=' + encodeURIComponent(this.shareUrl) + '&pics=' + encodeURIComponent(this.shareImg));
            },
            wx:function(){
                this.codeImgUrl = this.shareCodeInterface + '?text=' + encodeURIComponent(this.shareUrl);
                setTimeout(()=>{  
                    this.codeImgState = true;
                },300)
            },
        },
       
    } 
</script>
<style scoped>
    #vueShareContent{
        background-color: #f1f1f1;
        border-radius: 5px;
        position: relative;
    }
    #vueShareContent span{
        display: inline-block;
        margin:10px;
        height: 24px;
        cursor: pointer;
    }
    #vueShareContent .sina{
        width: 30px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAMAAADat72NAAAA0lBMVEUAAABlZWVjY2NlZWVnZ2eamppjY2NpaWlycnK5ublnZ2d5eXmhoaGmpqbCwsLR0dGNjY1sbGxubm6EhISTk5Oenp6vr6+zs7PHx8fLy8tiYmJiYmJqamp2dnZ+fn6AgICHh4eXl5e1tbW+vr5lZWWRkZGkpKSqqqrS0tJhYWFiYmKFhYWJiYnNzc1kZGRmZmZhYWFoaGhsbGyEhIR2dnaPj4/h4eGlpaV4eHjq6urc3NzX19fHx8e4uLiwsLCgoKCcnJyKiop/f39+fn50dHRgYGDo1ggPAAAALnRSTlMAtrmvs1+yqp4srJJUSxwFc6mig2dZPTcWD721sJiMh3tjNCR3bE9GCbWAfngKuzj85AAAAXhJREFUKM91Uodug1AM9BtAAqTZu00zuscZSNK9x///Ut8IUiKlJ/F0z2cb+4D2oPpQ8M/6hf7BIcAAL5/2ywfpotptjrLiebfpfPtWk1htaYkQUmzKg2BI1NN4K9W2ZDDLrrs0tBYzogmWXrxtClhkQZnekXXqgR0fHDIjt+XndJZoXRkQ6T4tMlh1qAGjWwjheJNIzqmK3O3pJdgGPlEQpUQz9+4jaaNhdHzaaUyaijOg7ScUNbPfiBG30gvyGAYxo133C5pHMFSXtlCvxCwnpTkacd/ZokJ17GMKkBVPv1gFNiu0a4eRi6WZ0fuOAuGmIC++f8c1ZzCD4R0qMtumN17drz9eM9yQvcHoZ05esjJnN78jegBwamNTAHIz/DgcEp23HumuANTChkLwqFF+q8vEnFGyLpjj1NCLFrgc3Lp2YvcJKpGaDgyZRwxh1RKdkyitb3g/USxEQDs+NdRV63rWmR6FMeso2PP7vX+ucs5Xy/vBdvgPtzssUewu+YcAAAAASUVORK5CYII="); 
    }
    #vueShareContent .qzon{
        width: 25px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAMAAAA4a6b0AAAA/FBMVEUAAABkZGRkZGRnZ2e+vr6zs7NlZWVjY2NmZmZvb29jY2ONjY2hoaHHx8fKyspjY2NlZWVvb2+AgIBqampycnKAgIB9fX2GhoaZmZmnp6eioqKzs7PExMTOzs7R0dFoaGhra2tgYGB2dnaBgYF2dnZ0dHR/f3+KioqHh4ePj4+MjIxkZGSXl5eXl5d6enqpqamrq6uurq5jY2NlZWVmZmZhYWFoaGhnZ2f29vbk5OS1tbVubm7y8vLv7++pqamenp6SkpLz8/PW1tbT09O/v7+hoaGZmZmNjY2JiYmGhoZ9fX11dXXs7Ozg4ODIyMjExMTBwcGlpaWampp7e3ugMFDqAAAAMnRSTlMAo7CtIjfRy8i6s3FaFQ/VtKWamY2IfHBrTksxHgoDzsa7s5yYl4uFfnp0c2RXSUVEQ8XA7MQAAAErSURBVCjPdZHVcgMxDEUXwpy24TRl5ivZS2GGcv//X+pkOokftnqxR2fu6Ghk6FXKGeEVPdn7hxRFIhsesUBXoeQcJBJhIGexoHgmhNxKCCAZQgpMIBFv7DqR59p9+vqyWAATwUneVDOZl2jEMB7vCCC5mvd7k69u97u/dASpgcrlwCTI5aw/6fqf70PX9eYOJGIqpBCIQSoqfobtcbDOHDU3kyqmhGRiOe14M2LIfLL1J/FgSnJIjgcfAcCcP935NUyHF2+vUyJF6Exfphz47U5vFbBD4EOd7Psjr9N23YE38ntNnZjEQkDZQRBVNRAxmZgFmFmC9PvVN+tYdkrFCMcaqYA5ZdWN7EVKkZguAMdOb35PtsWxrCZgl7aqaRvRLWiVI/pxF7X18wu+ljFyckirrQAAAABJRU5ErkJggg==");
    }
    #vueShareContent .wx{
        width: 28px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAMAAADeQm2wAAAAclBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbn+Ue6AAAAJXRSTlMA9+ghwbOZhvHj2ruvrJR6bVArFg8I0Z+RdVhE3sa3pV5JMxs7NB0XiwAAAN9JREFUKM9lkFl2wyAMRZ8B43mMncR20rRJtf8ttqKFI8j90REXhCQ49GAUkcrHBSmLJU9WrLGbbySotXRaUUR1EtIQkSrO7twFg8DEpxNmDge+/zJPx+llGTlcl4FDHmTyY5Zv46h9y7Hrp7Z0V77eZLa35PngpmshP88iub2AKwW6jiR3QIuHXPl5cPcvnn4HirA4y1I/eaY1J6IGQOur3immxC/2f4yaElge5HiYxCmWPZl9eDS2SOSFJa+D0VksZ0jipwMi1lY4i5StDLvFO6etUVnV9GUFQXrJzsAPQTg3iNdzKmYAAAAASUVORK5CYII=");
    }
    #vueShareContent .codeImg{
        width: 80px;
        height: 80px;
        position: absolute;
    }
    #vueShareContent .clearfix{
        clear: both;
    }
</style>
