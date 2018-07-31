var template = require('./switch.nine.html');
var css = require('./switch.nine.scss');

var SwitchNine = Vue.extend({
    template: template,
    replace: false,
    data: function () {
        return {
            animate:false,
            regName:true,
            regPhone:true,
            regMoney:true,
            fundId:'8',
            userName:'',
            cellPhone:'',
            fundMoney:'',
            msg:'',
            subAble:true
        };
    },
    methods:{
        //  动画的开始与结束
    	startAnimation: function() {
            // this.animate = true;
        },
        endAnimation: function(){
            this.animate = false;
        },
        // post 至PHP
        postSubmit:function(){
            this.subAble = true;
            var obj ={
                    'fund_id':'8',
                    'cell_phone':this.cellPhone,
                    'fund_money':this.fundMoney,
                    'user_name':this.userName,
                    'source':'2'
            }
            var _this = this;
            if(this.regName == true && this.regPhone == true && this.regPhone == true){
                $.post("http://www.redhorsefund.com/web/Appointment/register",obj,function(data){
                    var backMsg = JSON.parse(data)
                    if(backMsg.code == 1){
                        _this.animate = true;
                        _this.msg = backMsg.msg
                        setTimeout(_this.goFirst,3000)
                    }else if(backMsg.code == 0 ){
                        _this.animate = true;
                        if(backMsg.msg.length<8){
                            _this.msg = backMsg.msg
                            setTimeout(_this.goFirst,3000)
                        }else{
                            _this.msg = '请60秒后再试'
                            setTimeout(_this.goFirst,3000)
                        }
                    }    
                })
            }else{
                
            }
           
        },
        goFirst:function(){
            // window.location.reload()
            location.href = 'http://www.redhorsefund.com/web/Weixin/mobile'
        }
    },
    watch:{
        'userName':{
            handler:function(){
                var reg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/
                this.regName = reg.test(this.userName);
                if(this.regName && this.userName != '' && this.regPhone && this.cellPhone != '' && this.regMoney && this.fundMoney != ''){
                    this.subAble = false;
                }
            }
        },
        'cellPhone':{
            handler:function(){
                var reg = /^1[34578]\d{9}$/;
                this.regPhone = reg.test(this.cellPhone);
                if(this.regName && this.userName != '' && this.regPhone && this.cellPhone != '' && this.regMoney && this.fundMoney != ''){
                    this.subAble = false;
                }
            }
        },
        'fundMoney':{
            handler:function(){
                var reg = /^[1-9][0-9]{2,5}$/
                var regRes = reg.test(this.fundMoney)
                if(this.fundMoney<100 || !regRes){
                    this.regMoney = false; 
                }else{
                    this.regMoney = true;
                }
                if(this.regName && this.userName != '' && this.regPhone && this.cellPhone != '' && this.regMoney && this.fundMoney != ''){
                    this.subAble = false;
                }
            }
        }
    }
});

module.exports = SwitchNine;