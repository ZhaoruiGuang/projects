# 前端开发环境

## 相关目录及文件说明

```
- /src  ------------------------  源代码目录
  |- /base  ------------------  基础结构定义
  |- |- 相关基础css变量，基础js定义
  |- |- /helpers
  |- |- |- ****通用样式
  |- /components  ------------------   组件目录
  |  |- /ui.nav  ------------   导航组件
  |  |  |- imgs  -------------   组件相关图片
  |  |- nav.scss  ------------ 导航组件样式
  |  |- nav.js  -------------- 导航组件js
  |  |- nav.html  ------------- 导航组件模板
  |  |-.....
  |  |-.....
  |  |-.....
  |- lib  ---------------    基础公共js库，jquery vue avalong等
  |-**********
  |- /services  ---------------- 服务层封装
  |- |- api.js   ---------------   异步接口调用封装
  |  |-.....
  |  |-.....
  |  |-.....
  |  |- modules  -------------   页面模块目录
  |  |  |- cart  --------------- 购物车模块
  |  |  |- ****  --------------- 相关模块
- /views  -----------------------  各个页面入口目录
  |- /index --------------------- 首页入口目录 与组件目录类似，最终会被打包合并到assets中
  |  |  |- imgs  -------------   组件相关图片
  |  |- index.scss  ------------ 导航组件样式
  |  |- index.js  -------------- 导航组件js
  |  |- index.html  ------------- 导航组件模板
- /node_modules  -----------  node模块目录
- gulpfile.js  -------------  gulp配置文件
- package.json  ----------------  项目配置文件
- README.md  -------------------  开发文档
```

## package.json 配置说明

```
{
  "devDependencies": {}, ----- 依赖版本
  "buildSettings": {   ------- 打包配置
    "removeCombined": false,   ----require配置
    "baseUrl": "./src/scripts/",
    "dir": "./assets/.tmp/scripts",
    "optimize": "none",
    "modules": [   -----页面模块入口列表，后期改为动态生成(即node扫描所有目录，找出入口文件生成数组)
      {
        "name": "product"
      },
      {
        "name": "index"
      }
    ]
  },
  "scripts": {
      "start": "npm install" --启动项目执行命令
  }
}
```

## 开发说明

    若有条件，请翻墙后再进行以下操作，否则可能无法保证操作成功。

###  预装环境

- [node.js] (or [io.js])
- [ruby]：windows 系统请访问 [ruby 的 windows 版下载链接] 下载 *1.0* 以上，*2.0* 以下的最新版本

当环境安装好之后，请执行如下两个命令安装相关程序：

    $ sudo npm install -g gulp
    $ sudo npm install

<small>_注意：在 windows 下，请将每个命令前面的 sudo 去掉。_</small>

之后，请进入项目根目录，并在该目录下执行 `npm start` 命令以初始化项目（构建临时目录，安装项目内依赖，加载应用插件等）。

[node.js]: https://nodejs.org/ "node.js 官方网站"
[io.js]: https://iojs.org/zh/index.html "io.js 官方网站"
[ruby]: https://www.ruby-lang.org/zh_cn/ "ruby 官方网站"
[ruby 的 windows 版下载链接]: http://rubyinstaller.org/downloads/ "rubyInstaller 下载页面"

### gulp构建任务参数说明

- `gulp dev` 启动项目开发环。
- `gulp release` 打包发布命令。

## 开发流程示例


    js 模块化规范 以webpack指定的cmd为模块打包规范，模块需在配置清单中声明，只可引入已声明模块。

    组件定义请放在`components`目录中，新增视图页面请放在`views`目录中
    scss 规范
    变量声明请放在 */src/base/helpers/_variables.scss* 文件中

### 新增页面

- 新增一个页面
  打开 */src/webpack.conf.dev.js*，在entry中增加入口文件声明
  entry: {
      index: './src/views/index/index.js',
      base: './src/base/base.js',
      newPage: './src/views/newPage.js'
  }
  打开 */src/views*，在views目录中增加文件夹`/newPage`
                    在`新增目录`中增加入口文件 `{newPage.html}`
                    在`新增目录`中增加入口文件 `{newPage.js}`
                    在`新增目录`中增加入口文件 `{newPage.scss}`

 然后重新执行  `gulp dev` 启动开发环境
完成上述步骤后新增的视图就可以正常访问了。
