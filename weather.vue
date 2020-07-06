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
				<span :class="weatherData.degreeStatus.class" v-if="weatherData.degreeStatus.name">{{ weatherData.degreeStatus.name }}</span>
			</div>
			<div class="parameters">
				<template v-if="!loading">
					<span class="weather" :class="weatherData.weatherType">{{ weatherData.weatherName }}</span>
					<template v-if="mode != 'tag' ">
						<span class="wind">{{ weatherData.windDir }}&nbsp;{{ weatherData.windLevel }} 级</span>
						<span class="humidity">湿度{{ weatherData.humidity }}%</span>
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
			default:'card',		// 两种模式：tag 标签模式；card 卡片模式；默认标签模式
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

				city: '正在定位', // 位置
				temperature: '--', // 温度
				qualityStatus: {
					// 空气质量
					number: 0, // 污染值
					class: 'qualityType_0',
					name: '优'
				},
				degreeStatus: {
					// 温度状态
					class: 'degreeType_0',
					name: ''
				},
				windDir: '', // 风向
				windLevel: '', // 风级别
				humidity: '' // 湿度
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
			this.$jsonp('https://elephant.browser.360.cn/?t=sapp-newtab&m=moji', params, 3000)
				.then(res => {
					this.loading = false;
					if (res && res.errno === '20000') {
						this.noData = false;
						const { aqi, city, condition, alert } = res.data;
						Object.assign(this.weatherData, {
							weatherType: this.setWeatherType(condition.conditionId),
							city: city.name,
							temperature: condition.temp,
							weatherName: condition.condition,
							degreeStatus: (alert && this.setDegreeType(alert[0].name)) || {},
							qualityStatus: this.setQualityType(aqi.value),
							windDir: condition.windDir,
							windLevel: condition.windLevel,
							humidity: condition.humidity
						});
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
		setWeatherType(id) {
			switch (id) {
				case '1': //晴 少云 大部晴朗
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '12':
					return 'weatherType_1';
				case '8': //多云 阴
				case '9':
				case '10':
				case '11':
				case '13':
				case '14':
				case '80':
				case '81':
				case '82':
				case '85':
					return 'weatherType_2';
				case '37': //雷阵雨 雷阵雨伴有冰雹
				case '38':
				case '39':
				case '40':
				case '41':
				case '44':
				case '45':
				case '87':
				case '88':
				case '89':
				case '90':
					return 'weatherType_3';
				case '26': //雾 霾
				case '27':
				case '34':
				case '35':
				case '79':
				case '83':
				case '84':
					return 'weatherType_4';
				case '15': //阵雨 局部阵雨 小阵雨 中雨 小到中雨 中到大雨
				case '16':
				case '17':
				case '18':
				case '19':
				case '20':
				case '21':
				case '22':
				case '51':
				case '52':
				case '53':
				case '66':
				case '67':
				case '78':
				case '91':
				case '92':
					return 'weatherType_5';
				case '23': //大雨 特大暴雨 大到暴雨 强阵雨
				case '54':
				case '55':
				case '56':
				case '68':
				case '69':
				case '70':
				case '93':
					return 'weatherType_6';
				case '24': //小雪 雨夹雪 中雪 大雪 暴雪
				case '25':
				case '49':
				case '50':
				case '58':
				case '59':
				case '60':
				case '61':
				case '62':
				case '63':
				case '71':
				case '72':
				case '73':
				case '74':
				case '75':
				case '76':
				case '77':
				case '94':
					return 'weatherType_7';
				case '29': //强沙尘暴 浮沉 尘卷风 扬沙
				case '30':
				case '31':
				case '32':
				case '33':
					return 'weatherType_8';
				case '28': //冻雾
					return 'weatherType_9';
				case '46': //冰雹 冻雨
				case '47':
				case '48':
				case '64':
				case '65':
					return 'weatherType_10';
				default:
					return {
						class: 'weatherType_0'
					};
			}
		},
		// 设置空气质量状态
		setQualityType(value) {
			value = Number(value);
			var valueType = {};
			if (0 <= value && value <= 50) {
				valueType = {
					class: 'qualityType_0',
					name: '优'
				};
			} else if (51 <= value && value <= 100) {
				valueType = {
					class: 'qualityType_1',
					name: '良'
				};
			} else if (101 <= value && value <= 150) {
				valueType = {
					class: 'qualityType_2',
					name: '轻度污染'
				};
			} else if (151 <= value && value <= 200) {
				valueType = {
					class: 'qualityType_3',
					name: '中度污染'
				};
			} else if (201 <= value && value <= 300) {
				valueType = {
					class: 'qualityType_4',
					name: '重度污染'
				};
			} else if (301 <= value && value <= 500) {
				valueType = {
					class: 'qualityType_5',
					name: '严重污染'
				};
			} else if (501 <= value && value <= 100000) {
				valueType = {
					class: 'qualityType_6',
					name: '爆表'
				};
			} else {
				valueType = {
					class: 'qualityType_7',
					name: '其他'
				};
			}
			valueType.number = value;
			return valueType;
		},
		// 设置温度状态
		setDegreeType(value) {
			switch (value) {
				case '道路冰雪':
				case '持续低温':
				case '雷雨大风':
				case '暴雪':
				case '台风':
				case '冰雹':
				case '霜冻':
				case '降温':
				case '大风':
				case '寒潮':
				case '雷电':
				case '暴雨':
				case '大雾':
					return {
						class: 'degreeType_1',
						name: value
					};
				default:
					return {
						class: 'degreeType_0',
						name: value
					};
			}
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
#C_Weather .quality . {
	background: rgba(44, 31, 59, 1);
}
#C_Weather .quality .degreeType_0 {
	background: rgba(255, 119, 25, 1);
}
#C_Weather .quality .degreeType_1 {
	background: rgba(50, 94, 255, 1);
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
