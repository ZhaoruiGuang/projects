<!-- 
    组件功能：拖动验证码
    使用方式：从开始位置，拖动光标到最后，即验证通过（非拼图）
    注意事项：（1）使用时给组件一个宽高固定的父级盒子，因为组件是百分比自适应宽高的
              （2）默认支持 ES6 
              （3）默认支持 CSS3 
              （4）默认 vue 版本在 2.0 以上
              （5）接受一个回调函数：dragCallBack，参数有：success、fail、reset
              例：
                <div class="codeWin" style="width:300px;height:40px;">
                    <drag-verificate-code v-on:dragCallBack="cb"></drag-verificate-code>
                </div>
 -->
<template>
    <div id="drag_verificate_code_content">
        <p class="checkTip">向右拖动滑块完成验证</p>
        <div class="drag_active_content" v-bind:style="{'width': dragActiveContentWidth,'background-color':dragActiveContentBgc}">
            <p class="checkTip checkSuccessTip" v-if="showCheckSuccess">验证通过</p>
            <span class="point drag_point" v-if="showDragPoint" v-on:mousedown="dragPointDown($event)" v-bind:class="dragPointActive ? 'drag_point_active':'' "></span>
            <span class="point refresh_point" v-if="showRefreshPoint" v-on:click="refrePointClick"></span>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name:'drag-verificate-code',
        data() {
            return {
                isClick:false,
                initialX:0,               // 初始位置
                initialY:0,
                nowX:0,                   // 当前位置
                nowY:0,   
                gapX:0,                   // 移动距离
                gapY:0,
                maxMove:0,                // 最大可移动距离
                minMove:0,                // 验证成功需移动的最小距离
                showDragPoint:true,       // 是否显示拖动滑块
                dragPointActive:false,    // 是否正在拖动滑块          
                showRefreshPoint:false,   // 是否显示成功/刷新滑块
                showCheckSuccess:false,   // 是否显示 '验证通过' 提示

                dragActiveContentWidth:'auto',      // 滑道宽度
                dragActiveContentBgc:'#D0E9FC',     // 滑道背景色
            }
        },
        mounted(){
            this.$nextTick(()=>{
                let boxWidth = document.getElementById('drag_verificate_code_content').offsetWidth;
                this.maxMove = boxWidth - 40;
                this.minMove = boxWidth - 80;
                let _this = this;

                document.onmousemove = function(e){
                    if(_this.isClick){
                        _this.nowX = e.pageX;
                        _this.nowY = e.pageY;
                        _this.gapX = _this.nowX - _this.initialX;
                        _this.gapY = _this.nowY - _this.initialY;
                        if(Math.abs(_this.gapX) > _this.maxMove){
                            _this.gapX = _this.maxMove;
                            _this.isClick = false;
                        }
                        if(Math.abs(_this.gapY) > 60){
                            _this.isClick = false;
                        };
                        _this.dragActiveContentWidth = _this.gapX + 40 + 'px';
                        _this.dragActiveContentBgc = '#D0E9FC';
                    }
                };
                document.onmouseup = function(e){
                    _this.isClick = false;
                     if(Math.abs(_this.gapX) < _this.minMove){
                        _this.dragActiveContentWidth = '40px';
                        _this.dragActiveContentBgc = '#D0E9FC';
                        _this.$emit('dragCallBack','fail');

                    }else{
                        _this.dragActiveContentWidth = '100%';
                        _this.dragActiveContentBgc = '#D1F5EE';
                        _this.showRefreshPoint = true;
                        _this.showCheckSuccess = true;
                        // 防止验证成功后，点击操作反复触发'成功'事件
                        if(_this.showDragPoint){
                            _this.$emit('dragCallBack','success');
                        }
                        _this.showDragPoint = false;
                    };
                    _this.dragPointActive = false;
                };
            })
        },
        methods:{
            dragPointDown(e){
                this.initialX = e.pageX;
                this.initialY = e.pageY;
                this.isClick = true;
                this.dragPointActive = true;
            },
            refrePointClick(){
                this.showRefreshPoint = false;
                this.showDragPoint = true;
                this.dragActiveContentWidth = '40px';
                this.dragActiveContentBgc = '#D0E9FC';
                this.gapX = 0;
                this.gapY = 0;
                this.showCheckSuccess = false;
                this.$emit('dragCallBack','reset');
            },
        },
     }
</script>
<style type="text/css">
    #drag_verificate_code_content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -webkit-box-sizing:border-box;
        -o-box-sizing:border-box;
        -ms-box-sizing:border-box;
        -moz-box-sizing:border-box;
        border:1px solid #e4e7eb;
        border-radius: 2px;
        background-color: #f7f9fa;
        position: relative;
        z-index: 5;
    }
    .checkTip{
        display: block;
        width: 100%;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        z-index: 5;
        top:50%;
        left: 0;
        margin-top:-8px;
        -moz-user-select: none; 
        -webkit-user-select: none; 
        -ms-user-select: none;   
        -o-user-select: none;   
        user-select: none;
    }
    .checkSuccessTip{
        width: 40%;
        left: 30%;
        color:#0fb194;
    }
    .drag_active_content{
        display: inline-block;
        min-width: 40px;
        min-height: 30px;
        height: 100%;
        position: absolute;
        z-index: 6;
        top:0;
        left: 0;
    }
    .point{
        display: inline-block;
        width: 40px;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 0 3px rgba(0,0,0,.3);
        float: right;
        cursor: move;
        position: relative;
        transition: background-color .2s linear;
        -webkit-transition: background-color .2s linear;
        -o-transition: background-color .2s linear;
        -ms-transition: background-color .2s linear;
        -moz-transition: background-color .2s linear;
        background-repeat: no-repeat;
        background-position: center;
    }
    .drag_point{
        background-color: #fff;
        background-image: url(./icon/arrow1.png);
    }
    .drag_point:hover{
        background-color: #1593F3;
        background-image: url(./icon/arrow2.png);
    }
    .drag_point_active{
        background-color: #1593F3;
        background-image: url(./icon/arrow2.png);
    }
    .refresh_point{
        background-color: #56CEB9;
        background-image: url(./icon/ok.png);
    }
    .refresh_point:hover{
        background-image: url(./icon/refresh.png);
    }
</style>