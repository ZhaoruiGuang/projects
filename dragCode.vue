<template>
    <div id="drag_verificate_code_content">
        <p class="checkTip dragTip">向右拖动滑块完成验证</p>
        <div class="drag_active_content" v-bind:style="{'width': dragActiveContentWidth,'background-color':dragActiveContentBgc}">
            <p class="checkTip checkSuccessTip" v-if="showCheckSuccess" v-bind:style="{'margin-left': - (62 + Math.ceil(dragPointSize / 2)) + 'px'}">验证通过</p>
            <span class="point drag_point" v-if="showDragPoint" v-on:mousedown="dragPointDown($event)" v-bind:class="dragPointActive ? 'drag_point_active':'' "></span>
            <span class="point refresh_point" v-if="showRefreshPoint" v-on:click="refrePointClick"></span>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name:'dragCode',
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
				
				dragPointSize:0,		// 滑块大小
            }
        },
        mounted(){
            this.$nextTick(()=>{
                let boxWidth = document.getElementById('drag_verificate_code_content').offsetWidth;
                let boxHeight = document.getElementById('drag_verificate_code_content').offsetHeight - 2;
                this.maxMove = boxWidth - boxHeight;
                this.minMove = boxWidth - boxHeight * 2;
				this.dragPointSize = boxHeight;
                let _this = this;
				
				document.getElementsByClassName('dragTip')[0].style.marginLeft = - (62 - Math.ceil(boxHeight / 2)) + 'px';
				
				let dragContentStyle = document.getElementsByClassName('drag_active_content')[0].style;
				let dragPointStyle = document.getElementsByClassName('drag_point')[0].style;
				dragContentStyle.height = dragContentStyle.width = dragPointStyle.height = dragPointStyle.width = boxHeight + 'px';
				

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
                        _this.dragActiveContentWidth = _this.gapX + _this.dragPointSize + 'px';
                        _this.dragActiveContentBgc = '#D0E9FC';
                    }
                };
                document.onmouseup = function(e){
                    _this.isClick = false;
                     if(Math.abs(_this.gapX) < _this.minMove){
                        _this.dragActiveContentWidth = _this.dragPointSize + 'px';
                        _this.dragActiveContentBgc = '#D0E9FC';
                        if(_this.dragPointActive && _this.gapX > 0){
                            _this.$emit('dragCallBack','fail');
                        }
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
                this.dragActiveContentWidth = this.dragPointSize + 'px';
                this.dragActiveContentBgc = '#D0E9FC';
                this.gapX = 0;
                this.gapY = 0;
                this.showCheckSuccess = false;
                this.$emit('dragCallBack','reset');
            },
        },
     }
</script>
<style type="text/css" scoped>
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
		overflow: hidden;
    }
    .checkTip{
        display: inline-block;
        width: 124px;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        z-index: 5;
        top:50%;
        left: 50%;
		margin-top: -8px;
		margin-left: -62px;
        -moz-user-select: none; 
        -webkit-user-select: none; 
        -ms-user-select: none;   
        -o-user-select: none;   
        user-select: none;
    }
    .checkSuccessTip{
        color:#0fb194;
    }
    .drag_active_content{
        display: inline-block;
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
		background-size: 50%;
    }
    .drag_point{
        background-color: #fff;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKAQMAAAC+F/2EAAAABlBMVEUAAABnbXPxoFEGAAAAAXRSTlMAQObYZgAAAB9JREFUCNdjYDjAwPCAgaGAgcGC4f8fIAIywNwHQCkAfbMIh46ohbIAAAAASUVORK5CYII=");
    }
    .drag_point:hover{
        background-color: #1593F3;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKAQMAAAC+F/2EAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAB9JREFUCNdjYDjAwPCAgaGAgcGC4f8fIAIywNwHQCkAfbMIh46ohbIAAAAASUVORK5CYII=");
    }
    .drag_point_active{
        background-color: #1593F3;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKAQMAAAC+F/2EAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAB9JREFUCNdjYDjAwPCAgaGAgcGC4f8fIAIywNwHQCkAfbMIh46ohbIAAAAASUVORK5CYII=");
    }
    .refresh_point{
        background-color: #56CEB9;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMAQMAAAC+68T8AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAADJJREFUCNdjYGBmYGBgb2Bg4AdieQaGBDsGhg81DAw/fjAw1H5gYLB/ABQ+AJFmZ2AAAMoHCTS20uGgAAAAAElFTkSuQmCC");
		cursor: pointer;
    }
    .refresh_point:hover{
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAKlBMVEUAAAD3+PXy8/Du7+z09fLq6+nU1dLm5uTi4+DY2dbp6efk5eLS09DHx8Wf7SgdAAAAAXRSTlMAQObYZgAAAHdJREFUCNdjAAIuRaEFDGDAJAgECgzGDAwcgpoMDIcFJwgyMDQKgKRYJIFMQYgyQUEGFgEI86IgA6MCmGUIFA1MgDKFGRQZ4EAQGxOhwB2kDQKEYYYxMAnArWB0QFjMAHMOozSQYBdUY2BIEixAcjoYsCoKBQApAHufC2Vgk8jaAAAAAElFTkSuQmCC");
    }
</style>