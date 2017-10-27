'use strict';

import   gulp 				from   'gulp';
import   gutil 				from   'gulp-util';
import   webpack 			from   'webpack';
import   webpackServer 		from   'webpack-dev-server';
import   devConfig 			from   './webpack.conf.js';
import   runSequence 	 	from   'run-sequence';
import   plumber 		 	from   'gulp-plumber';
import   htmlToServerFile 	from   './plugins/html-to-jsp';
import   revReplace 		from   'gulp-rev-replace';
import   del 				from   'del';

const path = {
	pages        : ['./src/views/*/*.html'],    					// 需要编译为服务器文件模板的文件
	jspFiles     : ['./assets/**/*.jsp'],							// 初始编译后的 jsp 文件
	manifest     : ['./webpack-assets.json'], 						// 开发与生产环境下的css、js 引用路径对照表
	assetsBuild  : ['./assets/**/*.*','!./assets/**/*.jsp'], 		// 初始 assets 文件
	assetsProduct: './assets/',  									// 生产 assets 文件的发布地址
	deploy       : './dist/', 										// 生产 jsp 文件的发布地址
};

function errorHandler(src,e){
	gutil.beep();
	if(src){
		throw new gutil.PluginError(src,e);
	}else{
		gutil.log(src,e);
	}
};

var devCompiler = webpack(devConfig);
// 此时 devCompiler 是一个 webpack Compiler 实例，提供两个方法：
// (1) .run(callback(err,stats))
// (2) .watch(watchOptions, handler) 检测到文件变更，就会重新执行编译
// 文档链接：http://www.css88.com/doc/webpack2/api/node/#-error-handling

gulp.task('default', function () {
	gutil.log('default');
});

// 快速执行方法
gulp.task('webpack', function(done){
	devCompiler.run(function(err, stats) {
        if (err) {
            errorHandler('webpack-build-dev', err);
        }
        done();
    });
});
// 启动开发服务器
gulp.task('server', function(done){
	var host = 'localhost';
	var port = 8008;
	new webpackServer(devCompiler,{
		publicPath:devConfig.output.publicPath,
		stats:{
			colors:true,
		},
		hot:true,
		disableHostCheck:true,
	}).listen(port,host,function(err){
		if(err){
			errorHandler('webpack-dev-server',err);
		}
		gutil.log('[webpack-dev-server]',`http://${host}:${port}`);
		done();
	})
});

// 监听页面 css 和 js 的变动
gulp.task('webpack-watch',function(done){
	devCompiler.watch({
		// 当文件发生变动时，延时500毫秒重新构建，500毫秒内的其他变动也都聚合到一次构建中
		aggregateTimeout:500,
	},function(err,stats){
		if(err){
			errorHandler('webpack-watch',err);
		};
		gutil.log('[webpack-build-watch]',stats.toString({
            colors: true,
            chunks: false
        }));

        done();
	});
});

// 清理之前生成的构建文件
gulp.task('clean',function(done){
	return del(path.assetsBuild.concat(path.manifest),done);
});

// 修改生产环境下的 webpack 配置：文件名加哈希、改写 webpack-assets.json 文件
gulp.task('webpack-build-production',function(done){
	var productionConfig = Object.create(devConfig);
	var ExtractTextPlugin = require('extract-text-webpack-plugin');
	var path = require('path');

	var assetsPath = productionConfig.output.publicPath;
	var publicPath = productionConfig.output.publicPath;
	var compiler   = null;

	// 在生成的文件名中混入 模块哈希
	productionConfig.output.filename = '[name]-[chunkhash].js';

	// 获取文件后缀名
	function getFileExtension(filename){
		var arr = filename.split('\.');
		return arr[arr.length-1];
	};

	// 修改 webpack 插件配置
	productionConfig.plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'common-[chunkhash].js',
			minChunks:2,
		}),
		new ExtractTextPlugin('[name]-[chunkhash].css'),
		new webpack.ProvidePlugin({
			$:'jquery',
		})
	];

	var compiler = webpack(productionConfig);

	compiler.run(function(err,stats){
		if(err){
			errorHandler('webpack-build','err');
		}
		var manifest = {};
		var assets = stats.toJson().assetsByChunkName;
		for(var key in assets){
			var value = assets[key];
			if(value instanceof Array){
				for(var i in value){
					var item = value[i];
					manifest[assetsPath + key + '.' + getFileExtension(item)] = publicPath + item;
				}
			}else{
				manifest[assetsPath + key + '.' + getFileExtension(value)] = publicPath + value;
			};
		};
		// fs.writeFileSync(filename, data, [options])
		require('fs').writeFileSync(
			path.join(__dirname,'webpack-assets.json'),
			JSON.stringify(manifest)
		);

		// 打印报错日志
        // 执行 gulp release -w 会执行以下打印错误日志的代码，直接gulp release 不会打印；
        // yargs.argv 是一个对象，存储了当前所执行的gulp命令及其参数，以release为例，其形式为：{_:['release'],命令参数:true/false};
        // 命令行中执行的命令为 gulp release 或 gulp release -参数（一个横岗后面只能接受一个字母的参数，多个参数可以继续空
		var argv = require('yargs').argv;
		if(argv.w){
			gutil.log('webpack-build',stats.toString({
        		colors:true,
        	}))
		}

        done();
	})
});

// 编译生产版本资源文件
gulp.task('build-production',['clean'],function(done){
	runSequence('webpack-build-production',done);
});

// 根据 views 目录中的页面自动生成 jsp 模板
gulp.task('html-to-serverFile',function(done){
	gulp.src(path.pages)
		.pipe(plumber())    // 捕获处理任务中的错误,防止整个任务中断
		.pipe(htmlToServerFile())
		.pipe(gulp.dest('./assets/'))
		.on('end',done);
});

// 将编译后的文件从开发环境地址发布到生产环境地址
gulp.task('release-webpack-assets',function(done){
	return gulp.src(path.assetsBuild)
			   .pipe(gulp.dest(path.assetsProduct));
});

// 发布 jsp 模板
gulp.task('release-jsp',function(done){
	return  gulp.src(path.jspFiles)
			    .pipe(revReplace({
					manifest:gulp.src(path.manifest),
					replaceInExtensions:['.js','.css', '.jsp']
			    }))
			    .pipe(gulp.dest(path.deploy));
});

// 本地开发启动项目
gulp.task('dev',function(){
	runSequence('webpack-watch','webpack','server');
});

// 编译
gulp.task('release',['build-production','html-to-serverFile'],function(done){
	runSequence(['release-webpack-assets','release-jsp'],done);
});