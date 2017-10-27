import path 			 from 'path';
import webpack 			 from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const includePaths = '?includePaths[]='+path.resolve(__dirname,'./src/base/');

export default{
	// 入口文件
	entry:{
		login:'./src/views/login/login.jsx',
		home:'./src/views/home/home.jsx',
	},
	output:{
		// 编译文件输出位置,绝对路径。
		path:path.resolve(__dirname,'./assets/'),
		// 项目资源公共路径：被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
		// 以 / 开头和结尾
		publicPath:'/assets/abc',
		// 编译文件命名，这里的name变量，对应entry中的key.
		filename:'[name].js',
	},
	module:{
		// 正则表达式中的特殊字符含义：
		// ？（下文中红色的问号）：匹配前一项0次或者一次；
		// * （下文中红色的星号）：匹配前一项0次或者多次；
		// + （下文中红色的加号）：匹配前一项1次或者多次；
		// (?= ) :正向先行断言，必须匹配项
		// (?! ) :负向先行断言，不能匹配项

		// loader 里的特殊字符含义：
		// !  相当于连接符，使同一文件能够使用不同类型的loader，链式操作，从右到左执行
		// ?  添加 query 参数
		rules:[
			{
				test:/\.html$/,
				use:'html-loader'
			},
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					use:'css-loader',
				})
			},
			{   
				// 处理模块和模块的scss依赖
				test:/\.scss$/,
				// 正则匹配： views 文件夹下的所有文件
				exclude:/^(?=.*views)/, 
				// sass-loader  将 scss 语法 解析为普通 css 语法
				// css-loader   加载所有的css文件以及css自身的依赖（如，@import 其他css）
				// style-loader 添加一个style标签并将其内嵌到html文件里
				// 通过 scss-loader 的 query 参数 includePaths[]将base文件夹下的基础scss文件加载到每一个引用 helper 的文件中
				use:['style-loader','css-loader','autoprefixer-loader','sass-loader'+includePaths] 
			},
			{
				// 处理 views 文件夹里的主页面scss及其依赖
				test:/\.scss$/,
				include:/^(?=.*views)/, 
				// use:ExtractTextPlugin.extract('style-loader','css!autoprefixer!sass'+includePaths)
				use:ExtractTextPlugin.extract({
					use:['style-loader','css-loader','autoprefixer-loader','sass-loader'+includePaths]
				})
			},
			{
	            test: /\.less$/,
	            use:['style-loader','css-loader','autoprefixer-loader','less-loader']
	        },
			{
				test: /\.js$/,
            	exclude: /node_modules/,
            	use: 'babel-loader',
			},
			{
				test: /\.jsx$/,
            	exclude: /node_modules/,
            	use:'babel-loader',
			},
	        {
	        	test:/\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
	        	use:'url-loader?limit=3000'
	        }
		]
	},
	resolve:{
		//能够在用户引入模块不带扩展时自动解析扩展
		extensions:['.js','.jsx'],
		// 为模块设置别名，方便引用
		alias:{

			// lib
			'jquery': path.resolve(__dirname,'./src/lib/jquery/jquery.2.1.4.min.js'),

			// service
			'datas': path.resolve(__dirname,'./src/data/data.js'),
			'aes': path.resolve(__dirname,'./src/service/aes.js'),
			'api': path.resolve(__dirname,'./src/service/api.js'),
			'filter': path.resolve(__dirname,'./src/service/filter.js'),
			'sessionStorage': path.resolve(__dirname,'./src/service/sessionStorage.js'),
			'localStorage': path.resolve(__dirname,'./src/service/localStorage.js'),
			'message.center': path.resolve(__dirname,'./src/service/message.center.js'),
			'member': path.resolve(__dirname,'./src/service/member.js'),
			'reg': path.resolve(__dirname,'./src/service/reg.js'),

			// components
			    // 基础组件
			'popup': path.resolve(__dirname,'./src/components/common/popup/popup.jsx'),
			'nav': path.resolve(__dirname,'./src/components/common/nav/nav.jsx'),
			'footer': path.resolve(__dirname,'./src/components/common/footer/footer.jsx'),
			'sider': path.resolve(__dirname,'./src/components/common/sider/sider.jsx'),
			'breadcrumb': path.resolve(__dirname,'./src/components/common/breadcrumb/breadcrumb.jsx'),
			'welcome': path.resolve(__dirname,'./src/components/common/welcome/welcome.jsx'),
				// 其他组件
			'customerData': path.resolve(__dirname,'./src/components/customerData/customerData.jsx'),
			'customerAccount': path.resolve(__dirname,'./src/components/customerAccount/customerAccount.jsx'),

		}
	},
	plugins:[
		// 提取公共引用部分
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common.js',
			minChunks:2,
		}),
		// 为从 js 中分离的 css 文件命名
		new ExtractTextPlugin('[name].css'),
		// 全局暴露快捷名称
		new webpack.ProvidePlugin({
			jQuery:'jquery',
			$:'jquery',
		})
	],
	devtool:'cheap-source-map',
}