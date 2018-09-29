var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin')
var copyWebpackPlugin = require('copy-webpack-plugin')
var optimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var config = require('./src/config.js');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:extractTextPlugin.extract({
                	use:[
	                    'vue-style-loader',
	                    'css-loader',
	                    'autoprefixer-loader'
	                ]
                }),
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                	use:[
	                    'vue-style-loader',
	                    'css-loader',
	                    'autoprefixer-loader',
	                    'sass-loader'
	                ]
                }),
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: 'url-loader',
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'jquery': 'jquery/dist/jquery.min.js',
            'api':path.resolve(__dirname,'./src/service/common/api.js'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
    	host:config.devServerHost,
    	port:config.devServerPort,
        historyApiFallback: true,	// 404 时跳转到 index.html
        proxy: {
		    '/dev/*': {
 				target: config.devServerProxy,
 				changeOrigin: true,
 				secure: false,
 				pathRewrite:{
 					'^/dev':'/'
 				}
 			}
		},
    },
};
if(process.env.NODE_ENV === 'development') {
    module.exports.devtool = '#eval-source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common.js',
			minChunks:2,
		}),
		new webpack.ProvidePlugin({
			Vue:'vue',
			jQuery:'jquery',
			$:'jquery',
		}),
    ]);
};
if(process.env.NODE_ENV === 'production') {
    module.exports.output = {
    	filename:'[name]-[chunkhash].js',
		path:path.resolve(__dirname,'../node-server/assets/'),
		publicPath:'/',
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProvidePlugin({
			Vue:'vue',
			jQuery:'jquery',
			$:'jquery',
		}),
        new webpack.optimize.UglifyJsPlugin({	   						// 压缩混淆 js
            compress: {	
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common-[chunkhash].js',
			minChunks:2,
		}),
		new extractTextPlugin({
      		filename: '[name]-[chunkhash].css',
      		allChunks: false,											// 向所有额外的 chunk 提取（默认只提取初始加载模块）
    	}),
		new htmlWebpackPlugin({
			template: path.resolve(__dirname,'./buildIndex.html'),   	// 源文件
	      	filename: '../views/index.html',  						 	// 输出文件（地址是相对于 output.path)
	      	inject: true,												// 所有JavaScript资源插入到body元素的底部
	      	showErrors:true,					
	      	minify: {													// 压缩 html 代码
		        removeComments: true,									// 刪除注释
		        collapseWhitespace: true,								// 折叠代码换行等
		        removeAttributeQuotes: true								// 删除冗余属性、空格、引号等
	      	},
	      	chunksSortMode: 'dependency',								// 按依赖的先后顺序插入
	    }),
    ]);
}
