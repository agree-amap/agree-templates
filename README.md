# @agreejs/cli安装及使用
## 安装
最新版本3.2.32

### CLI 工具安装

首先，你需要使用 npm 或者 yarn 全局安装 @agreejs/cli，或者直接使用 npx:

#### 使用 npm 安装 CLI
$ npm install -g @agreejs/cli

#### OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli

#### OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @agreejs/cli



## 运行：

生成好了项目，可以运行。

1、首先看config中index.js中的配置，rn的appName为RNProject，可以使用原生提供的0.64.1的基座运行。

2、使用命令yarn run dev:h5 ，
yarn run dev:rn，如果要清除bundle的缓存使用yarn dev:rn  --reset-cache，如果运行再小程序上的话，运行yarn run dev:weapp，把dist文件夹导入微信开发工具中。

3、导航路径配置在app.config.js中，现在默认的路径首页是组件模板的首页，后续如果要开发，可以根据需求在配置文件中进行修改。



## 组件的扩展

如果现有组件不够用，需要组件的扩展的话，可以放在/src/components中，/components下放组件，index.js中导出组件。
由于再config文件夹index.js中设置了别名 "@components": path.resolve(__dirname, "..", "src/components”)，

在页面中使用组件的地方只需要直接import 组件 from ‘@components’即可
