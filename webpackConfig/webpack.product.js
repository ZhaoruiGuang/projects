import path 			 from 'path';
import webpack 			 from 'webpack';
import extractTextPlugin from 'extract-text-webpack-plugin';
import gulp 			 from 'gulp';

export default {
	output:{
		filename:'[name]-[chunkhash].js',
		path:path.resolve(__dirname,'../assets/'),
		publicPath:'/assets/'
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common-[chunkhash].js',
			minChunks:2,
		}),
		new extractTextPlugin('[name]-[chunkhash].css'),
		new webpack.ProvidePlugin({
			Vue:'vue',
			jQuery:'jquery',
			$:'jquery'
		}),
		new webpack.DefinePlugin({
      		'process.env.NODE_ENV': JSON.stringify('production')
    	})
	]
}