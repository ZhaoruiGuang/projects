import path 			 from 'path';
import webpack 			 from 'webpack';
import extractTextPlugin from 'extract-text-webpack-plugin';
import gulp 			 from 'gulp';

export default {
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'../assets/'),
		publicPath:'/assets/'
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common.js',
			minChunks:2,
		}),
		new extractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			Vue:'vue',
			jQuery:'jquery',
			$:'jquery'
		}),
	]
}