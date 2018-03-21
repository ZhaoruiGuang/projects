import path 			 from 'path';
import webpack 			 from 'webpack';
import extractTextPlugin from 'extract-text-webpack-plugin';

export default {
	entry:{
		'index':path.resolve(__dirname,'../src/views/index/index.js')
	},
	devtool:'cheap-source-map',
	module:{
		rules:[
			{
				test:/\.html$/,
				use:'html-loader',
			},
			{
				test:/\.css$/,
				use:extractTextPlugin.extract({
					use:'css-loader',
				})
			},
			{
				test:/\.js$/,
				use:'babel-loader',
				exclude:/node_modules/,
			},
			{
				test:/\.vue$/,
				use:'vue-loader',
			},
			{
				test:/\.(png|jpe?g|git|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
				use:'url-loader?limit=3000',
			}
		]
	},
	resolve:{
		extensions:['.js','.vue'],
		alias:{
			// lib
			'vue':path.resolve(__dirname,'../src/lib/vue/vue.min.js'),
			'jquery':path.resolve(__dirname,'../src/lib/jquery/jquery-3.2.1.min.js'),

			'router':path.resolve(__dirname,'../src/services/router.js'),

			// components
			'uiHeader':path.resolve(__dirname,'../src/components/common/header.vue'),
			'uiFooter':path.resolve(__dirname,'../src/components/common/footer.vue'),
			'uiBanner':path.resolve(__dirname,'../src/components/common/banner.vue'),
			'aside':path.resolve(__dirname,'../src/components/common/aside.vue'),
			// templates
			'index':path.resolve(__dirname,'../src/templates/index/index.vue'),
		}
	},
}