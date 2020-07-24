<template>
	<div id="C_Weather" class="C_Weather" :class="[weatherData.weatherType + ' C_Weather_' + mode,{'C_Weather_noBg' : !showBgImg}]">
		<template v-if="!noData">
			<div class="city">
				{{ weatherData.city }}
				<img class="localIcon" v-if="mode != 'tag' " src="./images/moji_located.png" alt="" />
			</div>
			<div class="temperature">{{ weatherData.temperature }}<template v-if="mode == 'tag'">°C</template> </div>
			<div class="quality">
				<span :class="weatherData.qualityStatus.class">{{ weatherData.qualityStatus.number }}&nbsp;{{ weatherData.qualityStatus.name }}</span>
				<span :class="weatherData.alarmStatus.class" v-if="weatherData.alarmStatus.type">{{ weatherData.alarmStatus.name }}</span>
			</div>
			<div class="parameters">
				<template v-if="!loading">
					<span class="weather" :class="weatherData.weatherType">{{ weatherData.weatherName }}</span>
					<template v-if="mode != 'tag' ">
						<span class="wind">{{ weatherData.windDir }}&nbsp;{{ weatherData.windLevel }}</span>
						<span class="humidity">湿度{{ weatherData.humidity }}</span>
					</template>
				</template>
				<template  v-else>
					<span>天气加载中…</span>
				</template>
			</div>
		</template>
		<template v-else>
			<div class="noDataTip">天气信息获取失败…</div>
		</template>
	</div>
</template>

<script>
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

export default {
	props:{
		mode:{
			type:String,
			default:'card',		// 两种模式：tag 标签模式；card 卡片模式；默认卡片模式
		},
		showBgImg:{				// 是否显示背景图（主要是 标签模式 下可能不需要显示背景图）
			type:Boolean,
			default:true,
		}
	},
	data() {
		return {
			weatherData: {
				weatherName: '',
				weatherType: 'weatherType_0', // 天气状态（设置不同大背景图）

				city: '正在定位', 		// 位置
				temperature: '--', 		// 温度
				qualityStatus: {		// 空气质量
					number: 0, 
					class: 'qualityType_0',
					name: '优'
				},
				alarmStatus: {			// 天气预警
					type:'',
					class: '',
					name: ''
				},
				windDir: '', 			// 风向
				windLevel: '', 			// 风级别
				humidity: ''		 	// 湿度
			},
			loading: true,
			noData: false
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			let params = {
				callbackQuery: 'callback',
				callbackName: 'weather_cb'
			};
			// https://www.tianqiapi.com/index/doc?version=v61  天气 api 文档
			this.$jsonp('https://yiketianqi.com/api?version=v61&appid=93861958&appsecret=5z9XA6lO', params, 3000)
				.then(res => {
					console.log(res)
					this.loading = false;
					if (res&&res.cityid) {
						const { aqi, city,tem, wea,wea_img,win,win_speed,humidity,alarm } = res;
						Object.assign(this.weatherData, {
							weatherType: this.setWeatherType(wea_img),
							city: city,
							temperature: tem,
							weatherName: wea,
							alarmStatus: this.setAlarmType(alarm),	// 预警
							qualityStatus: this.setQualityType(aqi),
							windDir: win,
							windLevel: win_speed,
							humidity: humidity
						});
						this.noData = false;
						this.$emit('weatherSuccess');
					} else {
						this.noData = true;
						this.$emit('weatherError');
					}
				})
				.catch(err => {
					this.loading = false;
					this.noData = true;
					this.$emit('weatherError');
				});
		},
		// 设置天气状态
		setWeatherType(type) {
			switch (type) {
				case 'qing': //晴 少云 大部晴朗
					return 'weatherType_1';
				case 'yin': //多云 阴
				case 'yun':
					return 'weatherType_2';
				case 'lei': //雷 雷阵雨 
					return 'weatherType_3';
				case 'wu': //雾 霾
					return 'weatherType_4';
				// case 'yu': //雨
				// 	return 'weatherType_5';
				case 'yu': //大雨 特大暴雨 大到暴雨 强阵雨
					return 'weatherType_6';
				case 'xue': //小雪 雨夹雪 中雪 大雪 暴雪
					return 'weatherType_7';
				case 'shachen': //强沙尘暴 浮沉 尘卷风 扬沙
					return 'weatherType_8';
				// case '28': //冻雾
				// 	return 'weatherType_9';
				case 'bingbao': //冰雹 冻雨
					return 'weatherType_10';
				default:
					return {
						class: 'weatherType_0'
					};
			}
		},
		// 设置空气质量状态
		setQualityType(aqi) {
			let airClass = null;
			switch (aqi.air_level) {
				case '优': 
					airClass = 'qualityType_0';
					break;
				case '良': 
					airClass = 'qualityType_1';
					break;
				case '轻度污染':
					airClass = 'qualityType_2';
					break;
				case '中度污染':
					airClass = 'qualityType_3';
					break;
				case '重度污染':
					airClass = 'qualityType_4';
					break;
				case '严重污染':
					airClass = 'qualityType_5';
					break;
				default:
					return {
						class: 'weatherType_0'
					};
			};
			return {
				number:aqi.air,
				class:airClass,
				name:aqi.air_level,
			}
		},
		// 设置天气预警
		setAlarmType(alarm){
			let alarmValue = {};
			if(alarm.alarm_level){
				let alarmClass = null;
				switch(alarm.alarm_level){
					case '红色':
						alarmClass = 'alarmType_1';
						break;
					case '橙色':
						alarmClass = 'alarmType_2';
						break;
					case '黄色':
						alarmClass = 'alarmType_3';
						break;
					case '蓝色':
						alarmClass = 'alarmType_4';
						break;
					default:
						alarmClass = 'alarmType_4';
				};
				alarmValue = {
					type:alarm.alarm_type,
					class:alarmClass,
					name:alarm.alarm_type + alarm.alarm_level + '预警',
				}
			};
			return alarmValue;
		}
	}
};
</script>

<style>
#C_Weather {
	width: 260px;
	height: 230px;
	background-color: rgba(0, 0, 0, 0.2);
	background-blend-mode: overlay;
	border-radius: 4px;
	background-size: 100%;
	overflow: hidden;
	color: #fff;
	text-align: center;
	font-size: 12px;
	line-height: 16px;
	text-shadow: 0px 1px 6px rgba(0, 0, 0, 0.3);
}
#C_Weather.weatherType_0,
#C_Weather.weatherType_1 {
	background-image: url(images/cloudless.png);
}
#C_Weather.weatherType_2 {
	background-image: url(images/cloudy.png);
}
#C_Weather.weatherType_3 {
	background-image: url(images/thunder.png);
}
#C_Weather.weatherType_4 {
	background-image: url(images/fog.png);
}
#C_Weather.weatherType_5 {
	background-image: url(images/rain.png);
}
#C_Weather.weatherType_6 {
	background-image: url(images/heavyrain.png);
}
#C_Weather.weatherType_7 {
	background-image: url(images/snow.png);
}
#C_Weather.weatherType_8 {
	background-image: url(images/storm.png);
}
#C_Weather.weatherType_9 {
	background-image: url(images/frost.png);
}
#C_Weather.weatherType_10 {
	background-image: url(images/hail.png);
}
#C_Weather.C_Weather_noBg{
	background-image: none;
	background-color: transparent;
}
#C_Weather .city {
	margin: 32px auto 0;
	font-size: 14px;
	font-weight: bold;
	line-height: 19px;
}
#C_Weather .city .localIcon {
	width: 16px;
	position: relative;
	top: 3px;
}

#C_Weather .temperature {
	margin: 6px auto 5px;
	font-size: 80px;
	line-height: 84px;
	position: relative;
	left: 0;
	top: 0;
}
#C_Weather .temperature::after {
	content: '°';
	position: absolute;
	top: 12px;
	font-size: 36px;
	line-height: 36px;
}
#C_Weather .quality span {
	display: inline-block;
	line-height: 20px;
	padding: 0 4px;
	border-radius: 2px;
	box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.3);
}
#C_Weather .quality .qualityType_0,
#C_Weather .quality .qualityType_1 {
	background: rgba(6, 192, 105, 1);
}
#C_Weather .quality .qualityType_2 {
	background: rgba(12, 193, 170, 1);
}
#C_Weather .quality .qualityType_3 {
	background: rgba(242, 145, 0, 1);
}
#C_Weather .quality .qualityType_4 {
	background: rgba(238, 89, 44, 1);
}
#C_Weather .quality .qualityType_5 {
	background: rgba(176, 56, 81, 1);
}
#C_Weather .quality .qualityType_6 {
	background: rgba(70, 52, 94, 1);
}
#C_Weather .quality .qualityType_7 {
	background: rgba(44, 31, 59, 1);
}

#C_Weather .quality .alarmType_1 {
	background: #d32e25;
}
#C_Weather .quality .alarmType_2 {
	background: rgba(255, 119, 25, 1);
}
#C_Weather .quality .alarmType_3 {
	background: #ecea2d;
}
#C_Weather .quality .alarmType_4 {
	background: #3965ef;
}

#C_Weather .parameters{
	display: flex;
	justify-content: center;
	align-items: center;
}
#C_Weather .parameters span{
	padding: 0 8px;
	margin-top: 7px;
}
#C_Weather .parameters .weather::before {
	display: inline-block;
	content: '';
	width: 16px;
	height: 16px;
	float: left;
	margin-right: 2px;
	background-image: url(images/ic_10.png);
	background-size: 16px auto;
}
#C_Weather .parameters .weatherType_0::before,
#C_Weather .parameters .weatherType_1::before {
	background-position-y: 0;
}
#C_Weather .parameters .weatherType_2::before {
	background-position-y: -16px;
}
#C_Weather .parameters .weatherType_3::before {
	background-position-y: -32px;
}
#C_Weather .parameters .weatherType_4::before {
	background-position-y: -48px;
}
#C_Weather .parameters .weatherType_5::before {
	background-position-y: -64px;
}
#C_Weather .parameters .weatherType_6::before {
	background-position-y: -80px;
}
#C_Weather .parameters .weatherType_7::before {
	background-position-y: -96px;
}
#C_Weather .parameters .weatherType_8::before {
	background-position-y: -112px;
}
#C_Weather .parameters .weatherType_9::before {
	background-position-y: -128px;
}
#C_Weather .parameters .weatherType_10::before {
	background-position-y: -144px;
}
#C_Weather .parameters .wind{
	padding: 0;
}
#C_Weather .parameters .wind::before,
#C_Weather .parameters .wind::after{
	display: inline-block;
	content: "";
	width: 1px;
	height: 8px;
	background-color: rgba(255,255,255,0.2);
}
#C_Weather .parameters .wind::before{
	margin-right: 8px;
}
#C_Weather .parameters .wind::after{
	margin-left: 8px;
}
#C_Weather .noDataTip{
	position: relative;
	top: 50%;
	margin-top: -10px;
}

/* tag 模式 */
#C_Weather.C_Weather_tag{
	display: inline-block;
	padding-right: 10px;
	width: auto;
	height: 30px;
}
#C_Weather.C_Weather_tag div{
	display: inline-block;
	width: auto;
	float: left;
	margin: 0;
	margin-left: 10px;
	font-size: 14px;
	line-height: 30px !important;
}
#C_Weather.C_Weather_tag .temperature:after{
	display: none;
}
#C_Weather.C_Weather_tag .parameters span{
	margin: 0;
	padding: 0;
}
#C_Weather.C_Weather_tag .parameters .weather:before{
	position: relative;
	top: 6px;
}
#C_Weather.C_Weather_tag .noDataTip{
	top: 0;
}
</style>