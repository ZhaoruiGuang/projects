<!-- 
    vue2 自定义日历组件

    使用示例：
    <template>
        <calendar v-if="calendarState" 
                      v-on:calendarCommit="calendarCommit" 
                      v-on:calendarClose="calendarClose"
                      v-bind:calendarFormat="calendarFormat"
        ></calendar>
    </template>
    <script>
        import calendar from '@zhaoruiguang/vue2-calendar';
        export default{
            components:{
                calendar,
            },
            data(){
                return {
                    calendarState:false,
                    calendarFormat:"yy-mm-dd hh:mm:ss",
                }
            },
            methods:{
                calendarCommit(date){                   // 选中日期回调
                    console.log(date)
                },
                calendarClose(){                        // 关闭日历操作：清空、取消、点击日历以外任意区域
                    this.calendarState = false;
                }
            },
        }
    </script>
 -->

<template>
    <div class="Date-picker" id="Date-picker">    
        <div class="Date-box" id="Date-box" v-on:click="stopPro($event)">
            <div class="Date-top" id="Date-top">
                <ul class="Date-year Date-top-ul">
                    <li class="cursor Date-top-ul-li1" v-on:click.stop="reduceYear">&lt;</li>&nbsp;&nbsp;
                    <li class="Date-top-ul-li2"><span>{{year}}</span>&nbsp;年</li>&nbsp;&nbsp;
                    <li class="cursor Date-top-ul-li3" v-on:click.stop="addYear">&gt;</li>
                </ul>
                <ul class="Date-month Date-top-ul">
                    <li class="cursor Date-top-ul-li1" v-on:click.stop="reduceMonth">&lt;</li>&nbsp;&nbsp;
                    <li class="Date-top-ul-li2"><span>{{month}}</span>&nbsp;月</li>&nbsp;&nbsp;
                    <li class="cursor Date-top-ul-li3" v-on:click.stop="addMonth">&gt;</li>
                </ul>
            </div>
            <div class="Date-bottom" id="Date-bottom">
                <div class="week">
                    <ul>
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                </div>
                <table cellpadding="0" cellspacing="0">
                    <tr class="line1" v-if="1 <= lestLine">
                        <td v-for="days in dayList1">
                            <span :style="{color:(days>7 ? '#CECECE':''),cursor:(days>7 ? '':'pointer'),backgroundColor:(days>7 ? '#fff':'')}" :class="(days==day) ? 'today':'' " v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                    <tr class="line2" v-if="2 <= lestLine">
                        <td v-for="days in dayList2">
                            <span class="cursor" :class="(days==day) ? 'today':'' " v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                    <tr class="line3" v-if="3 <= lestLine">
                        <td v-for="days in dayList3">
                            <span  class="cursor" :class="(days==day) ? 'today':'' " v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                    <tr class="line4" v-if="4 <= lestLine">
                        <td v-for="days in dayList4">
                            <span class="cursor" :class="(days==day) ? 'today':'' " v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                    <tr class="line5" v-if="5 <= lestLine">
                        <td v-for="days in dayList5">
                            <span  :style="{color:(days<7 ? '#CECECE':''),cursor:(days<7 ? '':'pointer'),backgroundColor:(days<7 ? '#fff':'')}" :class="(days==day) ? 'today':''" v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                    <tr class="line6" v-if="6 <= lestLine">
                        <td v-for="days in dayList6">
                            <span :style="{color:(days<7 ? '#CECECE':''),cursor:(days<7 ? '':'pointer'),backgroundColor:(days<7 ? '#fff':'')}" :class="(days==day) ? 'today':''" v-on:click.stop="choise($event)">{{days}}</span>
                        </td>
                    </tr>
                </table>
                <div class="submit">
										<div class="hoursWin" v-if="calendarFormat == 'yy-mm-dd hh:mm:ss' ">
											<input class="timeText" type="text" v-model="hour"  maxlength="2">&nbsp;:
											<input class="timeText" type="text" v-model="minute" maxlength="2">&nbsp;:
											<input class="timeText" type="text" v-model="second" maxlength="2">
										</div>
                    <span class="button" v-on:click="submitDate(true)">确定</span>
                    <span class="button clean" v-on:click="submitDate(false)" v-if="isAbleClean">清空</span>
                    <span class="button cancle" v-on:click="dateCancle">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'calendar',
        data() {
            return {
                date:'',                 // 选定的日期
                year:null,               // 当前 年
                month:null,              // 当前 月
                day:null,                // 当前 日
                hour:'00',               // 时
                minute:'00',             // 分
                second:'00',             // 秒
                startWeek:null,          // 当月一号是星期几
                endWeek:null,            // 当月最后一天是星期几

                dayList1:[],             // 日期 第1行
                dayList2:[],             // 日期 第2行
                dayList3:[],             // 日期 第3行   
                dayList4:[],             // 日期 第4行
                dayList5:[],             // 日期 第5行
                dayList6:[],             // 日期 第6行
                dayLength:null,
                lestLine:null,

                numReg:/^[0-9]*$/,       // 数字校验
            }
        },
        props:{
            'calendarFormat':{
                type:String,
                default:'yy-mm-dd',     // yy-mm-dd hh:mm:ss
            },
						'isAbleClean':{
							type:Boolean,
							default:true,
						}
        },
        methods: {
            reduceYear(){
                this.year -= 1;
            },
            addYear(){
                this.year += 1;
            },
            reduceMonth(){
                if(this.month<=1){
                    this.month = 12;
										this.reduceYear();
                }else{
                    this.month -= 1;
                }
            },
            addMonth(){
                if(this.month<12){
                    this.month += 1;
                }else{
                    this.month = 1;
										this.addYear();
                }
            },
            choise(e){
                if(!e.target.style.color){
                    this.day = e.target.innerHTML; 
                }else{
                    this.day = this.day;
                }
            },
            submitDate(bl){
                if(bl){
                    this.date = this.year + '-' + (this.month>9 ? this.month : '0'+this.month) + '-' + (this.day>9 ? this.day : '0'+this.day); 
                    if(this.calendarFormat == 'yy-mm-dd hh:mm:ss'){
                        this.date += ' ' + (this.hour>9 ? this.hour : '0'+Number(this.hour)) + ':' + (this.minute>9 ? this.minute : '0'+Number(this.minute)) + ':' + (this.second>9 ? this.second : '0'+Number(this.second));
                    }
                }else{
                    this.date = '';
                }
                this.$emit('calendarCommit',this.date);
            },
            dateCancle(){
                this.$emit('calendarClose');
            },
            whatYear(year){     // 判断所选年份是否为闰年
                var yearType = null;
                var remainder1 = year % 100;
                var remainder2 = year % 400;
                var remainder3 = year % 4;
                if(remainder1 ==0){      //如果能被100整除
                    if(remainder2 == 0){ //如果能被100整除并且能被400整除
                        yearType = true; // 闰年
                    }else{               //如果能被100整除但是不能被400整除
                        yearType = false;// 平年
                    }
                }else{                   //如果不能被100整除
                    if(remainder3 == 0){ //如果不能被100整除但能被4整除
                        yearType = true;
                    }else{               //如果不能被100整除并且不能被4整除
                        yearType = false;
                    }
                }
                return yearType;
            },
            whatMonth(month){   // 判断月份是 31、30、29、28 天
                var type = this.whatYear(this.year);
                var bigM = [1,3,5,7,8,10,12];
                var smaM = [4,6,9,11];
                for(var i=0;i<bigM.length;i++){
                    if(bigM[i] == month){
                        this.dayLength = 31;
                    }else{
                        
                    }
                }
                for(var i=0;i<smaM.length;i++){
                    if(smaM[i] == month){
                        this.dayLength = 30;
                    }else{
                    }
                }
                if(type && month == 2){
                    this.dayLength = 29;
                }else if(!type && month == 2){
                    this.dayLength = 28;
                }   
            },
            getDayList(){       // 获取本月日期数组
                var dayList = [];
                if(this.dayLength==31){
                    for(var i=1;i<32;i++){
                        dayList.push(i);
                    }
                }else if(this.dayLength==30){
                    for(var i=1;i<31;i++){
                        dayList.push(i)
                    }
                }else if(this.dayLength==29){
                    for(var i=1;i<30;i++){
                        dayList.push(i)
                    }
                }else if(this.dayLength==28){
                    for(var i=1;i<29;i++){
                        dayList.push(i)
                    }
                }
                return dayList;
            },
            setDayList(){
                this.dayList1 = [];
                this.dayList2 = [];
                this.dayList3 = [];
                this.dayList4 = [];
                this.dayList5 = [];
                this.dayList6 = [];
                this.whatMonth(this.month-1);    
                var beforeList = this.getDayList();  // 获取前一个月的日期数组
                this.whatMonth(this.month);
                var dayList = this.getDayList();     // 获取本月日期数组
                var startWeek = this.startWeek;      // 本月一号是周几
                var endWeek = this.endWeek;          // 本月最后一天是周几
                // 补齐日历开头
                if(startWeek==0){
                   
                }else if(startWeek==1){
                    dayList = beforeList.slice(-1).concat(dayList);
                }else if(startWeek==2){
                    dayList = beforeList.slice(-2).concat(dayList);
                }
                else if(startWeek==3){
                    dayList = beforeList.slice(-3).concat(dayList);
                }
                else if(startWeek==4){
                    dayList = beforeList.slice(-4).concat(dayList);
                }
                else if(startWeek==5){
                    dayList = beforeList.slice(-5).concat(dayList);
                }
                else if(startWeek==6){
                    dayList = beforeList.slice(-6).concat(dayList);
                }
                // 补齐日历结尾
                var arr = [1,2,3,4,5,6,7];
                if(endWeek==0){
                    dayList = dayList.concat(arr.splice(0,6));
                }else if(endWeek==1){
                    dayList = dayList.concat(arr.splice(0,5));
                }else if(endWeek==2){
                    dayList = dayList.concat(arr.splice(0,4));
                }else if(endWeek==3){
                    dayList = dayList.concat(arr.splice(0,3));
                }else if(endWeek==4){
                    dayList = dayList.concat(arr.splice(0,2));
                }else if(endWeek==5){
                    dayList = dayList.concat(arr.splice(0,1));
                }else if(endWeek==6){
                };
                this.dayList  = dayList;
                this.lestLine = Math.ceil(this.dayList.length/7);
                this.dayList1 = this.dayList.splice(0,7);
                this.dayList2 = this.dayList.splice(0,7);
                this.dayList3 = this.dayList.splice(0,7);
                this.dayList4 = this.dayList.splice(0,7);
                this.dayList5 = this.dayList.splice(0,7);
                this.dayList6 = this.dayList.splice(0,7);
            },
            getWeek(year,month,day){   // 获取某年某月某日是星期几
                var m = new Date();             
                m.setFullYear(year); 
                m.setMonth(month); 
                m.setDate(day); 
                var week = m.getDay(); 
                return week;  
            },
            resetDays(year,month){   
                var startWeek = this.getWeek(year,month-1,1); 
                this.startWeek = startWeek;
                this.whatMonth(month);           // 判断该月份有多少天,设置 dayLength;
                this.endWeek = this.getWeek(year,month-1,this.dayLength);
                this.setDayList();
            },
            getToday(){
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                this.year = year;
                this.month = month;
                this.day = day;
            },
            stopPro(e){
                e.stopPropagation();
            },
            checkHMS(val,type,maxNum){
                if(!this.numReg.test(val)){
                    this[type] = '00';
                };
                if(Number(this[type])>maxNum){
                    this[type] = '00';
                };
            }
        },
        mounted(){
        // 设置日历默认 年月日
            this.getToday();
            this.resetDays(this.year,this.month-1); 
            let _this = this;
            document.onclick = function(e){
                event.stopPropagation();
                _this.$emit('calendarClose');
            }
        },
        watch:{
            'year':{
                handler: function (val, oldVal) {
                   this.resetDays(val,this.month);
                }
            },
            'month':{
                handler: function (val, oldVal) {
                    this.resetDays(this.year,val);
                }
            },
            'hour':{
                handler:function(val,oldVal){
                    this.checkHMS(val,'hour',23);
                }
            },
            'minute':{
                handler:function(val,oldVal){
                    this.checkHMS(val,'minute',60);
                }
            },
            'second':{
                handler:function(val,oldVal){
                    this.checkHMS(val,'second',60);
                }
            },
        }
    };
</script>
<style type="text/css" scoped>
    ul,li{
        list-style-type: none;
        margin:0;
        padding:0;
    }
    .cursor{
        cursor:pointer;
    }
    #Date-picker{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        font-size: 14px;
        position:relative;  
    }
    #Date-window{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        width:100px;
        height:32px;
        line-height:32px;
        padding-left:10px;
    }
    #Date-box{
        clear: both;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        width:300px;
        height:auto;
        background-color:#fff;
        position:absolute;
    }
    #Date-top{
        width: 100%;
        height:35px;
        background-color: #1fa67a;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        position:relative;
    }
    .Date-top-ul{
        height:35px;
        display: inline-block;
        float: left;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
    }
    .Date-year{
        width:120px;
        margin-left:40px;
    }
    .Date-month{
        width:120px;
        padding-left:6px;
    }
    .Date-top-ul li{
        display:inline-block;
        float:left;
        height:35px;
        line-height:35px;
        color:#fff;
        text-align:center;
    }
    .Date-top-ul .Date-top-ul-li1,.Date-top-ul .Date-top-ul-li3{
        width: 22px;
        height: 22px;
        font-size:18px;
    }
    #Date-bottom .week{
        width:100%;
        height:20px;
        border-bottom:1px solid #CECECE;
        margin-bottom:5px;
    }
    #Date-bottom ul{
        width:100%;
        height:20px;
        margin: 0 auto;
				padding:0 1%;
    }
    #Date-bottom ul li{
        float:left;
        width:14%;
        height:20px;
        line-height:20px;
        color:#1fa67a;
        text-align:center;
    }
    #Date-bottom table{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        width:100%;
        margin:0 auto;
        border-collapse:collapse;
    }
    #Date-bottom table tr{
        width:100%;
        height:30px;
    }
    #Date-bottom table tr td{
        width:14%;
        height:30px;
        border:none;
    }
    #Date-bottom table tr td span{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        display: block;
        width:90%;
        height:30px;
        line-height:30px;
        text-align:center;
        border:none;
        margin:0 auto;
        background-color:#fff;
        color:#1fa67a;
    }
    #Date-bottom table tr td .dark{
        color:#CECECE;
    }
    #Date-bottom table tr td .today{
        color:#fff;
        background-color:#1fa67a;
        border-radius:3px;
    }
    #Date-bottom .hoursWin{
				float: left;
				padding-left: 10px;
				margin-top: 6px;
    }
    #Date-bottom .hoursWin .timeText{
        display: inline-block;
				outline: none;
        width: 32px;
        height: 22px;
        text-align: center;
				border: 1px solid #e3e8ee;
				border-radius: 2px;
				box-sizing: border-box;
    }
    #Date-bottom .submit{
        width:100%;
        height:35px;
    }
    #Date-bottom .submit .button{
        display: inline-block;
        width:40px;
        height:22px;
        background-color:#1fa67a;
        font-size: 12px;
        line-height: 22px;
        color:#fff;
        border:none;
        float:right;
        margin-right:10px;
        border-radius:3px;
        cursor:pointer;
        margin-top:6px;
				text-align: center;
    }
    #Date-bottom .submit .clean{
        background-color: #ff6655;
    }
    #Date-bottom .submit .cancle{
        background-color: #ACABAB;
    }
</style>