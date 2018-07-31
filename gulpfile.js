var gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	webpackServer = require('webpack-dev-server'),
	devConfig = require('./webpack.conf.dev'),
	runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    htmlToPhp = require('./plugins/html-to-php'),
    revReplace = require('gulp-rev-replace'),
    del = require('del');

var   path = {
    pages       : ['./src/views/*/*.html', '!./src/views/base/*.html'],
    phpFiles    : ['./assets-wx/**/*.php'],
    manifest    : ['./webpack-assets.json', './other-assets.json'],
    build       : ['./assets-wx/**/*.*', '!./assets-wx/**/*.php'],
    deploy      : '../views/web/'
};

// 错误处理函数
function errorHandler(src, e) {
    // 控制台发生，错误时beep一下
    gutil.beep(); //发出滴声提示
    if (src) {
        throw new gutil.PluginError(src, e); //抛出异常
    } else {
        gutil.log(src, e);
    }
}

var devCompiler = webpack(devConfig);

// gulp.task的参数：(1)命令的名称(2)该命令执行的操作
gulp.task('default', function () {
	gutil.log('default');
});

gulp.task('dev', function () {
	runSequence('webpack-watch', 'webpack', 'server');
});

/**
 * @private
 */
function mapFiles(list, extname) {
  return list.map(function (app) {return './src/' + app + '.' + extname;});
}

gulp.task('webpack', function (done) {
	var appList = ['main'];

	devCompiler.run(function(err, stats) {
        if (err) {
            errorHandler('webpack-build-dev', err);
        }
        console.log('run');
        // gutil.log('[webpack-build-dev]', stats.toString({
        //     colors: true
        // }));
        done();
    });
});

gulp.task('webpack-build-production', function(done) {
    // run webpack -p
    var productionConfig = Object.create(devConfig);
    // var saveAssets = require('assets-webpack-plugin');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var path = require('path');

    var assetsPath = productionConfig.output.publicPath,
        publicPath = productionConfig.output.publicPath = assetsPath;
    // add revision to file names
    productionConfig.output.filename = '[name]-[chunkhash].js';

    function getFileExtension (fileName) {
        var array = fileName.split('\.');
        return array[array.length - 1];
    }

    productionConfig.plugins = [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common",
        //     filename: "common-[chunkhash].js",
        //     minChunks: 5,
        // }),
        new ExtractTextPlugin('[name]-[chunkhash].css'),
        new webpack.ProvidePlugin({
            zepto: 'zepto',
            $: 'zepto',
            Vue: 'vue.min'
        }),
        function() {
            this.plugin("done", function(stats) {
                var manifest = {},
                    assets = stats.toJson().assetsByChunkName;
                for (var key in assets) {
                    var value = assets[key];
                    if (value instanceof Array) {
                        for (var i in value) {
                            var item = value[i];
                            manifest[assetsPath + key + '.' + getFileExtension(item)] = publicPath + item;
                        }
                    } else {
                        manifest[assetsPath + key + '.' + getFileExtension(value)] = publicPath + value;
                    }
                }
                require("fs").writeFileSync(
                    path.join(__dirname, "webpack-assets.json"),
                    JSON.stringify(manifest));
            });
        },
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    webpack(productionConfig, function(err, stats) {
        if (err) {
            errorHandler('webpack-build', err);
        }
        // gutil.log('webpack-build', stats.toString({
        //     colors: true
        // }));
        done();
    });
});


// 启动开发服务器
gulp.task('server', function() {
    var server = require('gulp-server-livereload');
    var host = '192.168.11.53';
    var serverConfig = {
        livereload: {
            enable: true,
            filter: function(fileName, callback) {
                callback(!/\.svn/.test(fileName) && !/\.map$/.test(fileName) &&
                    (/\\assets-wx\\/.test(fileName) || /\.html$/.test(fileName)));
            },
            port:  37777
        },
        directoryListing: true,
        open: false,
        port: 8088,
        host:  host
    };
    if (/^darwin/.test(process.platform)) {
        serverConfig.host = host;
        serverConfig.livereload.port = 37777;
    }
    gulp.src('./')
        .pipe(server(serverConfig));

});

gulp.task('webpack-watch', function(done) {
    var finished = false;
    // run webpack --watch
    devCompiler.watch({
        aggregateTimeout: 300
    }, function(err, stats) {
        if(err) {
            errorHandler('webpack-watch', err);
        }
        gutil.log('[webpack-build-watch]',stats.toString({
            colors: true,
            chunks: false
        }));

        if (!finished) {
            done();
            finished = true;
        }
    });
});

// 根据 views 目录中的页面自动生成 php 模板
gulp.task('html-to-php', function(done) {
    gulp.src(path.pages)
        .pipe(plumber())
        .pipe(htmlToPhp())
        .pipe(gulp.dest('./assets-wx/'))
        .on('end', done);
});

// 发布 php 模板
gulp.task('release-php', function (done) {

    return gulp.src(path.phpFiles)
        .pipe(revReplace({
            manifest: gulp.src(path.manifest),
            replaceInExtensions: ['.js', '.css', '.html', '.php']
        }))
        .pipe(gulp.dest(path.deploy));
});

gulp.task('release-webpack-assets', function (done) {
    return gulp.src(path.build)
            .pipe(gulp.dest('../../assets-wx/'));
});

// 编译生产版本资源文件
gulp.task('build-production', ['clean'], function (done) {
    runSequence(['webpack-build-production'], done);
});

// 清理之前生成的构建文件
gulp.task('clean', function(done) {
    return  del(path.build.concat(path.manifest), done);
});

gulp.task('release', ['build-production', 'html-to-php'], function(done) {
    runSequence(['release-webpack-assets', 'release-php'], done);
});
