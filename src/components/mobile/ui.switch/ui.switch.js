var template = require('./ui.switch.html');
var css = require('./ui.switch.scss');

/**
 * 滑动组件
 * @param  {[type]} {                 el: function ( [description]
 * @return {[type]}   [description]
 */
var Switch = Vue.extend({
    el: function () {
        return '#container';
    },
    template: template,
    replace: true,
    data: function () {
        return {
            startPos: {
                x: 0,
                y: 0
            },
            endPos: {
                x: 0,
                y: 0
            },
            currentPos: {
                x: 0,
                y: 0
            },
            current: undefined,
            switchList: [],
            maxMove: 0,
            moving: false,
            switchVms: [],
            timing: 300
        };
    },
    methods: {
        touchStart: function (e) {
            if(this.moving) {
                e.preventDefault();
                return false;
            };
            var touch = getTouch(e),
            startPos = this.startPos,
            currentPos = this.currentPos;


            if (touch) {
                startPos.x = touch.clientX;
                startPos.y = touch.clientY;
                // 在 touchStart 时就获取 currentPos 并为其赋值，这样单击时startPos == currentPos, moveY 就等于 0 ，就不会翻页
                // 如果在 touchStart 时不获取 currentPos 并为其赋值，那么currentPos 一直未初始值0，单击时startPos获得值，再计算
                // moveY是就会出现错误，可能导致翻页
                currentPos.x = touch.clientX;
                currentPos.y = touch.clientY;
            }
        },
        toucheMove: function (e) {
            if(this.moving) {
                e.preventDefault();
                return false;
            };
            var touch= getTouch(e),
                currentPos = this.currentPos,
                startPos = this.startPos,
                $el = this.$el,
                prev = $el.querySelectorAll('.prev')[0],
                next = $el.querySelectorAll('.next')[0];
            // 实时获取当前位置
            if (touch) {
                currentPos.x = touch.clientX;
                currentPos.y = touch.clientY;     
            }
            var moveObj = movePosY(startPos, currentPos);
            // console.log(moveObj);     
            // 分别移动上一个和下一个元素
            prev.style.top = moveObj+'px';
            next.style.top = moveObj+'px';
            e.preventDefault();
            return false;
        },
        touchEnd: function (e) {
            if(this.moving) {
                e.preventDefault();
                return false;
            };
            this.moving = true;
            var startPos = this.startPos,
                currentPos = this.currentPos,
                $el = this.$el,
                _this = this,
                // 上一个和下一个元素
                prev = $el.querySelectorAll('.prev')[0],
                next = $el.querySelectorAll('.next')[0],
                // 最大可偏移量
                maxMove = this.maxMove,
                // 位移量
                moveY = movePosY(startPos, currentPos),
                // 是否需要切换页面
                shouldMove = (Math.abs(moveY) / maxMove)>0.2, 
                switchList = _this.switchList,
                switchVms = _this.switchVms;
                //修改状态为运动中
            
                // 如果需要运动则便宜到指定位置
                if (shouldMove) {
                    // moveY 大于0 则为向下滑动 切换到上一页 反之切换到下一页
                    if (moveY>0) {
                        // 如果已经为第一页，则切换到末页 反之切换到上一页
                        if (_this.current === 0) {
                            this.beforeSwitch(switchVms[switchList.length-1]);
                        }
                        else {
                            this.beforeSwitch(switchVms[_this.current-1]);
                        }
                        window.setTimeout(function () {
                            prev.style.top = maxMove+'px';
                            next.style.top = maxMove+'px';
                        }, 0);
                        // console.log(moveY);
                    }
                    else {
                        // 如果已经为最后一页 ，则切换到首页， 反之切换到下一页
                        if (_this.current === switchList.length-1) {
                            this.beforeSwitch(switchVms[0]);
                        }
                        else {
                            this.beforeSwitch(switchVms[_this.current+1]);
                        }
                        window.setTimeout(function () {
                            prev.style.top = (-maxMove)+'px';
                            next.style.top = (-maxMove)+'px';
                        }, 0);
                    }
                        // console.log(moveY);
                }
                else {
                    window.setTimeout(function () {
                        prev.style.top = '0';
                        next.style.top = '0';
                    }, 0);
                }
          
            // 定时器修改0.3s后所有偏移还原为0状态
            window.setTimeout(function () {
                _this.moving = false;
                var prevclientNo = _this.current;
                if (shouldMove) {
                    // 根据偏移量判断上一页或是下一页
                    if (moveY>0) {
                        if(_this.current === 0) {
                            _this.current = _this.switchList.length-1;
                        }
                        else {
                            _this.current--;
                        }
                    }
                    else {
                        if(_this.current === _this.switchList.length-1) {
                            _this.current = 0;
                        }
                        else {
                            _this.current++;
                        }
                    }
                }
                window.setTimeout(function () {
                    prev.style.top = '0';
                    next.style.top = '0';
                    _this.afterSwitch(switchVms[_this.current], switchVms[prevclientNo]);
                }, 0);
            }, this.timing);
        },
        afterSwitch: function (current) {

        },
        beforeSwitch: function (data) {

        }
    },
    /**
     * 组件初始化操作
     */
    ready: function () {
        this.maxMove = this.$el.clientHeight;
        var switchList = this.switchList,
            switchVms = this.switchVms,
            _this = this,
            $el = this.$el;
        
        
        for (var i = 0; i < switchList.length; i++) {
            var item = switchList[i],
                component = item.component;

            if(component) {
                var vm = new component({
                    data: {
                        index: i,
                        parent: this
                    },
                    replace: false
                }).$mount('#switch-item-'+i);
                vm.clientNo = i;
                switchVms[i] = vm;
            }
            else {
                switchVms[i] = {
                    clientNo: i
                };
            }

        }
        window.setTimeout(function() {
            $el.className = $el.className.replace(' init', '');
            _this.current = 0;
        },0);
        window.setTimeout(function () {
            _this.afterSwitch(switchVms[_this.current], switchVms[switchList.length-1]);
        }, this.timing);

    }
});

/**
 * 获取触摸对象
 * @param  Event e 触摸事件对象
 * @return {object}   返回触摸对象
 */
function getTouch(e) {
    return e.touches ? e.touches[0] : null;
}

/**
 * 是否为向上滑动
 * @param  startPos   [description]
 * @param  currentPos [description]
 * @return number 0为未发生位移 大于0为向下滑动  小于0为向上滑动
 */
function movePosY(startPos, currentPos) {
    return currentPos.y - startPos.y;
}

/**
 * 暴露给外部的创建接口
 * @param  {[type]} settings [description]
 * @return {[type]}          [description]
 */
function createSwitch(settings) {

    return new Switch(settings);

}

module.exports = {
    createSwitch: createSwitch
};
