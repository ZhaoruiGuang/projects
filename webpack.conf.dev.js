var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var includePaths = '?includePaths[]=' + path.resolve(__dirname, "./src/base/");

module.exports = {
	//入口文件配置
	entry: {
        mobile: './src/views/mobile/mobile.js'
	},
	//入口文件输出配置
	output: {
		path: './assets-wx/',
		// This is used to generate URLs e.g. images from CDN.
		// It will be modified by gulp for release, so that do not put the full path here!
		publicPath: '/assets-wx/',
		// Template based on keys in entry above
		filename: '[name].js'
	},
	module: {
		//加载器配置
		loaders: [
			{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
                test: /\.scss$/,
                exclude: /^(?=.*views)(?!.*views.*base)/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 20 version", "Firefox 15"]}!sass-loader' + includePaths
            },
            {
                test: /\.scss$/,
                include: /^(?=.*views)(?!.*views.*base)/,
                loader: ExtractTextPlugin.extract("style-loader", 'css-loader!autoprefixer-loader?{browsers:["last 200 version"]}!sass-loader' + includePaths)
            },
			{
				test: /\.json$/,
				loader: 'json'
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|mp3)(\?.*)?$/,
				loader: 'url-loader?limit=3000'
			}
		]
	},

	resolve: {
		alias: {
			//全局lib文件
			'vue': path.resolve(__dirname, 'src/lib/vue/vue.js'),
			'vue.min': path.resolve(__dirname, 'src/lib/vue/vue.min.js'),
            'vue.validator': path.resolve(__dirname, 'src/lib/vue.validator/vue.validator.js'),
            'zepto': path.resolve(__dirname, 'node_modules/webpack-zepto'),
            'fontsizeset': path.resolve(__dirname, 'src/lib/fontsizeset/fontsizeset.js'),  
            'jssdk': path.resolve(__dirname, 'src/lib/weixin/jweixin-1.0.0.js'),    
			// //ui封装
			'ui.blow': path.resolve(__dirname, 'src/components/mobile/blow/blow.js'),
  
            //组件
            'ui.switch': path.resolve(__dirname, 'src/components/mobile/ui.switch/ui.switch.js'),
            'switch.zero': path.resolve(__dirname, 'src/components/mobile/switch.zero/switch.zero.js'),
            'switch.one': path.resolve(__dirname, 'src/components/mobile/switch.one/switch.one.js'),
            'switch.two': path.resolve(__dirname, 'src/components/mobile/switch.two/switch.two.js'),
            'switch.twoplus': path.resolve(__dirname, 'src/components/mobile/switch.two/switch.twoplus.js'),
            'switch.three': path.resolve(__dirname, 'src/components/mobile/switch.three/switch.three.js'),
            'switch.four': path.resolve(__dirname, 'src/components/mobile/switch.four/switch.four.js'),
            'switch.five': path.resolve(__dirname, 'src/components/mobile/switch.five/switch.five.js'),
            'switch.six': path.resolve(__dirname, 'src/components/mobile/switch.six/switch.six.js'),
            'switch.seven': path.resolve(__dirname, 'src/components/mobile/switch.seven/switch.seven.js'),
            'switch.sevenplus': path.resolve(__dirname, 'src/components/mobile/switch.seven/switch.sevenplus.js'),
            'switch.eight': path.resolve(__dirname, 'src/components/mobile/switch.eight/switch.eight.js'),
            'switch.nine': path.resolve(__dirname, 'src/components/mobile/switch.nine/switch.nine.js'),

			//test
			// 'test': path.resolve(__dirname, 'src/components/test/test.js')
		}
	},
	//插件项
	plugins: [
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			Vue: 'vue',
			zepto: 'zepto',
			$: 'zepto'
		})
	]
};
