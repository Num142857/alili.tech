---
title: '使用Facebook的create-react-app快速构建React开发环境' 
date: 2019-02-06 2:30:09
hidden: true
slug: ro3ruo1hzvo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>笔者最近打算基于半年来的实践与React社区的发展重制下笔者的React系列教程，<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook#react" rel="nofollow noreferrer" target="_blank">前端实战文章——React系列</a>。本文从属于<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>。</p></blockquote>
<h2 id="articleHeader0">
<a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>:来自Facebook官方的零配置命令行工具</h2>
<p>create-react-app是来自于Facebook出品的零配置命令行工具，能够帮你自动创建基于Webpack+ES6的最简易的React项目模板，有助于初学者快速上手实践。安装create-react-app的方式也非常简单，可以直接使用<code>npm</code>命令进行全局安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>
<span class="hljs-string">npm </span><span class="hljs-string">install </span>-g <span class="hljs-built_in">create-react-app</span>

<span class="hljs-built_in">create-react-app</span> <span class="hljs-string">my-app
</span><span class="hljs-string">cd </span><span class="hljs-string">my-app/</span>
<span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre>
<p>执行完上述命令之后，你可以直接打开<code>http://localhost:3000</code>，即可以看到你React APP的运行效果。此时也是处于开发模式下，如果你要进行发布，则使用<code>npm run build</code>进行编译。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006769229?w=1071&amp;h=619" src="https://static.alili.tech/img/remote/1460000006769229?w=1071&amp;h=619" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>create-react-app</code>生成的目录格式如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
my-app/
  README.md
  index.html
  favicon.ico
  node_modules/
  package.json
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
my-app/
  README<span class="hljs-selector-class">.md</span>
  index<span class="hljs-selector-class">.html</span>
  favicon<span class="hljs-selector-class">.ico</span>
  node_modules/
  package<span class="hljs-selector-class">.json</span>
  src/
    App<span class="hljs-selector-class">.css</span>
    App<span class="hljs-selector-class">.js</span>
    index<span class="hljs-selector-class">.css</span>
    index<span class="hljs-selector-class">.js</span>
    logo.svg</code></pre>
<p>如果你是使用<code>npm start</code>来启动配置，那么自动会进入开发模式，此时热替换是处于自动激活状态，你也可以实时地在界面或者命令行中看到错误提示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006055976" src="https://static.alili.tech/img/remote/1460000006055976" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果你使用<code>npm run build</code>来编译得到生产环境，此时代码会被编译到<code>build</code>目录下，此时会自动将整个应用打包发布，它会自动使用Webpack控件进行优化与压缩。</p>
<h2 id="articleHeader1">Multiple Application Configuration:真实环境下单项目多应用配置</h2>
<p>上述所讲的<code>create-react-app</code>是来自于Facebook官方，不过笔者在自己的真实应用开发中还是习惯使用<a href="https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate" rel="nofollow noreferrer" target="_blank">Webpack-React-Redux-Boilerplate</a>，其允许在一个项目中配置多个应用入口，同时支持开发模式、构建模式与库构建模式。同时笔者习惯不将webpack配置文件分成单独的dev与prod文件，而是合并到一个文件中。如果需要使用该模板，直接使用如下命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
git clone -b boilerplate https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/ # 克隆模板文件夹
./install.sh # 安装运行所需要的依赖项" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>
git <span class="hljs-keyword">clone</span> <span class="hljs-title">-b</span> boilerplate https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/ <span class="hljs-comment"># 克隆模板文件夹</span>
./install.sh <span class="hljs-comment"># 安装运行所需要的依赖项</span></code></pre>
<p>得到的模本文件夹主要由以下构成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
├── README.md
├── README.zh.md
├── dev-config : 配置文件入口
│   ├── apps.config.js : 应用配置文件
│   ├── dev.html : 开发模式下使用的HTML文件
│   ├── devServer.js : 开发服务器
│   ├── eslint.js : ESLint配置文件
│   ├── template.html : 构建模式下推荐的HTML模板文件
│   └── webpack.config.js : webpack配置文件
├── install.sh 
├── package.json
└── src : 源代码目录
    ├── count : 某个应用
    │   ├── App.js
    │   ├── async_library.js
    │   ├── colors.js
    │   ├── count.html
    │   └── count.js
    ├── helloworld
    │   ├── App.css
    │   ├── App.js
    │   ├── helloworld.css
    │   ├── helloworld.html
    │   ├── helloworld.js
    │   └── logo.svg
    ├── library
    │   ├── foo.js
    │   ├── library.html
    │   └── library_portal.js
    └── vendors.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
├── README<span class="hljs-selector-class">.md</span>
├── README<span class="hljs-selector-class">.zh</span><span class="hljs-selector-class">.md</span>
├── dev-config : 配置文件入口
│   ├── apps<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span> : 应用配置文件
│   ├── dev<span class="hljs-selector-class">.html</span> : 开发模式下使用的HTML文件
│   ├── devServer<span class="hljs-selector-class">.js</span> : 开发服务器
│   ├── eslint<span class="hljs-selector-class">.js</span> : ESLint配置文件
│   ├── template<span class="hljs-selector-class">.html</span> : 构建模式下推荐的HTML模板文件
│   └── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span> : webpack配置文件
├── install<span class="hljs-selector-class">.sh</span> 
├── package<span class="hljs-selector-class">.json</span>
└── src : 源代码目录
    ├── count : 某个应用
    │   ├── App<span class="hljs-selector-class">.js</span>
    │   ├── async_library<span class="hljs-selector-class">.js</span>
    │   ├── colors<span class="hljs-selector-class">.js</span>
    │   ├── count<span class="hljs-selector-class">.html</span>
    │   └── count<span class="hljs-selector-class">.js</span>
    ├── helloworld
    │   ├── App<span class="hljs-selector-class">.css</span>
    │   ├── App<span class="hljs-selector-class">.js</span>
    │   ├── helloworld<span class="hljs-selector-class">.css</span>
    │   ├── helloworld<span class="hljs-selector-class">.html</span>
    │   ├── helloworld<span class="hljs-selector-class">.js</span>
    │   └── logo<span class="hljs-selector-class">.svg</span>
    ├── library
    │   ├── foo<span class="hljs-selector-class">.js</span>
    │   ├── library<span class="hljs-selector-class">.html</span>
    │   └── library_portal<span class="hljs-selector-class">.js</span>
    └── vendors.js</code></pre>
<p>其核心的关于应用的配置文件即<code>apps.config.js</code>，在模板项目中其配置为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**

 * Created by apple on 16/6/8.

 */

module.exports = {

    apps: [

        //HelloWorld

        {

            id: &quot;helloworld&quot;,

            title: &quot;HelloWorld&quot;,

            entry: {

                name: &quot;helloworld&quot;,

                src: &quot;./src/helloworld/helloworld.js&quot;

            },

            indexPage: &quot;./src/helloworld/helloworld.html&quot;,

            compiled: true

        },

        //Count

        {

            id: &quot;count&quot;,

            title: &quot;Count&quot;,

            entry: {

                name: &quot;count&quot;,

                src: &quot;./src/count/count.js&quot;

            },

            indexPage: &quot;./src/count/count.html&quot;,

            compiled: true

        }

    ],



    //开发服务器配置

    devServer: {

        appEntrySrc: &quot;./src/helloworld/helloworld.js&quot;, //当前待调试的APP的编号

        port: 3000 //监听的Server端口

    },



    //如果是生成的依赖库的配置项

    library: {

        name: &quot;library_portal&quot;,//依赖项入口名

        entry: &quot;./src/library/library_portal.js&quot;,//依赖库的入口,

        library: &quot;libraryName&quot;,//生成的挂载在全局依赖项下面的名称

        libraryTarget: &quot;var&quot;//挂载的全局变量名

    }

};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>
<span class="hljs-comment">/**

 * Created by apple on 16/6/8.

 */</span>

module.exports = {
<span class="hljs-symbol">
    apps:</span> [

        <span class="hljs-comment">//HelloWorld</span>

        {
<span class="hljs-symbol">
            id:</span> <span class="hljs-string">"helloworld"</span>,
<span class="hljs-symbol">
            title:</span> <span class="hljs-string">"HelloWorld"</span>,
<span class="hljs-symbol">
            entry:</span> {
<span class="hljs-symbol">
                name:</span> <span class="hljs-string">"helloworld"</span>,
<span class="hljs-symbol">
                src:</span> <span class="hljs-string">"./src/helloworld/helloworld.js"</span>

            },
<span class="hljs-symbol">
            indexPage:</span> <span class="hljs-string">"./src/helloworld/helloworld.html"</span>,
<span class="hljs-symbol">
            compiled:</span> true

        },

        <span class="hljs-comment">//Count</span>

        {
<span class="hljs-symbol">
            id:</span> <span class="hljs-string">"count"</span>,
<span class="hljs-symbol">
            title:</span> <span class="hljs-string">"Count"</span>,
<span class="hljs-symbol">
            entry:</span> {
<span class="hljs-symbol">
                name:</span> <span class="hljs-string">"count"</span>,
<span class="hljs-symbol">
                src:</span> <span class="hljs-string">"./src/count/count.js"</span>

            },
<span class="hljs-symbol">
            indexPage:</span> <span class="hljs-string">"./src/count/count.html"</span>,
<span class="hljs-symbol">
            compiled:</span> true

        }

    ],



    <span class="hljs-comment">//开发服务器配置</span>
<span class="hljs-symbol">
    devServer:</span> {
<span class="hljs-symbol">
        appEntrySrc:</span> <span class="hljs-string">"./src/helloworld/helloworld.js"</span>, <span class="hljs-comment">//当前待调试的APP的编号</span>
<span class="hljs-symbol">
        port:</span> <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>

    },



    <span class="hljs-comment">//如果是生成的依赖库的配置项</span>
<span class="hljs-symbol">
    library:</span> {
<span class="hljs-symbol">
        name:</span> <span class="hljs-string">"library_portal"</span>,<span class="hljs-comment">//依赖项入口名</span>
<span class="hljs-symbol">
        entry:</span> <span class="hljs-string">"./src/library/library_portal.js"</span>,<span class="hljs-comment">//依赖库的入口,</span>
<span class="hljs-symbol">
        library:</span> <span class="hljs-string">"libraryName"</span>,<span class="hljs-comment">//生成的挂载在全局依赖项下面的名称</span>
<span class="hljs-symbol">
        libraryTarget:</span> <span class="hljs-string">"var"</span><span class="hljs-comment">//挂载的全局变量名</span>

    }

};
</code></pre>
<h3 id="articleHeader2">开发模式</h3>
<p>开发模式下主要读取<code>apps.config.js</code>中的<code>devServer</code>配置，主要是可以配置调试的入口JS文件与开发服务器监听的端口号。开发模式下会自动使用<code>dev.html</code>作为默认的HTML文件传输到浏览器中展示，譬如在模板项目中是将helloworld项目作为当前正在开发的项目，切换到项目目录下使用<code>npm start</code>，即可开启开发模式，此时在浏览器内打开<code>http://localhost:3000</code>，即可以看到如下画面:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006055977" src="https://static.alili.tech/img/remote/1460000006055977" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>开发模式默认是支持热加载机制，另外，因为笔者经常需要进行移动端开发，因此需要在局域网内使用手机端进行访问，目前开发模式已经支持以LAN地址进行访问，你可以直接在其他端输入<code>http://192.168.1.1:3000</code>即可。</p>
<h3 id="articleHeader3">构建模式</h3>
<p>对于应用中存在的多应用入口，主要是在<code>apps.config.js</code>中的apps下进行配置的，一个典型的应用配置为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

            id: &quot;helloworld&quot;, //编号

            title: &quot;HelloWorld&quot;, //生成的HTML文件中的标题

            entry: {

                name: &quot;helloworld&quot;, //用于webpack的入口名

                src: &quot;./src/helloworld/helloworld.js&quot; //入口文件地址

            },

            indexPage: &quot;./src/helloworld/helloworld.html&quot;, //HTML模板文件地址

            compiled: true //是否进行编译
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="dts"><span class="hljs-symbol">            id:</span> <span class="hljs-string">"helloworld"</span>, <span class="hljs-comment">//编号</span>
<span class="hljs-symbol">
            title:</span> <span class="hljs-string">"HelloWorld"</span>, <span class="hljs-comment">//生成的HTML文件中的标题</span>
<span class="hljs-symbol">
            entry:</span> {
<span class="hljs-symbol">
                name:</span> <span class="hljs-string">"helloworld"</span>, <span class="hljs-comment">//用于webpack的入口名</span>
<span class="hljs-symbol">
                src:</span> <span class="hljs-string">"./src/helloworld/helloworld.js"</span> <span class="hljs-comment">//入口文件地址</span>

            },
<span class="hljs-symbol">
            indexPage:</span> <span class="hljs-string">"./src/helloworld/helloworld.html"</span>, <span class="hljs-comment">//HTML模板文件地址</span>
<span class="hljs-symbol">
            compiled:</span> true <span class="hljs-comment">//是否进行编译</span>
</span></code></pre>
<p>我们使用<code>npm run build</code>即可以自动进行打包，同样的，会自动进行代码压缩与优化，同时还会将CSS提取到一个单独的文件中，以在文件头部引入。对于图片等资源也会自动放置到dist目录下。如果你使用<code>npm run deploy</code>，则会自动地建立一个监听dist目录的HTTP Server，譬如在模板项目中使用<code>npm run deploy</code>，然后再访问<code>http://localhost:8080</code>，既可以得到如下界面:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006055979" src="https://static.alili.tech/img/remote/1460000006055979" alt="" title="" style="cursor: pointer;"></span></p>
<p>另外，构建模式下也默认设置了<code>vendors</code>这个公共的Chunk来进行公共代码提取，建议是将React等公共代码的引入放置到<code>src/vendors.js</code>文件中，这样多应用之间共享的公共代码就会被提取出来。</p>
<h3 id="articleHeader4">库构建模式</h3>
<p>有时候，我们希望使用Webpack编译好的函数能够直接在Global作用域下使用，或者能够通过AMD/CMD规范引入，最直观的用法就是能够直接挂载在script标签下使用。关于此部分的理论说明参考<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/builder/webpack/webpack-configuration.md#library" rel="nofollow noreferrer" target="_blank">Webpack Configuration</a>。在模板项目中，关于库构建的配置在:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    //如果是生成的依赖库的配置项

    library: {

        name: &quot;library_portal&quot;,//依赖项入口名

        entry: &quot;./src/library/library_portal.js&quot;,//依赖库的入口,

        library: &quot;libraryName&quot;,//生成的挂载在全局依赖项下面的名称

        libraryTarget: &quot;var&quot;//挂载的全局变量名

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>
    <span class="hljs-comment">//如果是生成的依赖库的配置项</span>
<span class="hljs-symbol">
    library:</span> {
<span class="hljs-symbol">
        name:</span> <span class="hljs-string">"library_portal"</span>,<span class="hljs-comment">//依赖项入口名</span>
<span class="hljs-symbol">
        entry:</span> <span class="hljs-string">"./src/library/library_portal.js"</span>,<span class="hljs-comment">//依赖库的入口,</span>
<span class="hljs-symbol">
        library:</span> <span class="hljs-string">"libraryName"</span>,<span class="hljs-comment">//生成的挂载在全局依赖项下面的名称</span>
<span class="hljs-symbol">
        libraryTarget:</span> <span class="hljs-string">"var"</span><span class="hljs-comment">//挂载的全局变量名</span>

}
</code></pre>
<p>我们首先构建一个基于ES6类的服务:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * Created by apple on 16/7/23.
 */

/**
 * @function 基于ES6的服务类
 */
export class FooService {

    static echo(){

        const fooService = new FooService();

        return fooService.getMessage();
    }

    /**
     * @function 默认构造函数
     */
    constructor() {
        this.message = &quot;This is Message From FooService!&quot;;
    }

    getMessage() {
        return this.message;
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">/**
 * Created by apple on 16/7/23.
 */</span>

<span class="hljs-comment">/**
 * @function 基于ES6的服务类
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FooService</span> </span>{

    <span class="hljs-keyword">static</span> echo(){

        <span class="hljs-keyword">const</span> fooService = <span class="hljs-keyword">new</span> FooService();

        <span class="hljs-keyword">return</span> fooService.getMessage();
    }

    <span class="hljs-comment">/**
     * @function 默认构造函数
     */</span>
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.message = <span class="hljs-string">"This is Message From FooService!"</span>;
    }

    getMessage() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.message;
    }

}</code></pre>
<p>然后设置一个模板的入口文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * Created by apple on 16/7/23.
 */
import {FooService} from &quot;./foo&quot;;

/**
 * @function 配置需要暴露的API
 * @type "{{"foo: {echo: FooService.echo"}}"}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>
/**
 * Created <span class="hljs-keyword">by</span> apple on <span class="hljs-number">16</span>/<span class="hljs-number">7</span>/<span class="hljs-number">23</span>.
 */
<span class="hljs-keyword">import</span> {FooService} from <span class="hljs-string">"./foo"</span>;

/**
 * @<span class="hljs-keyword">function</span> 配置需要暴露的API
 * @type "{{"foo: {echo: FooService.echo"}}"}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};</code></pre>
<p>注意，暴露出来的接口貌似只能是静态函数。最后我们使用<code>npm run build:library</code>进行库构建，构建完成后再HTML文件中可以如此使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
alert(window.libraryName.foo.echo());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-tag">alert</span>(<span class="hljs-selector-tag">window</span><span class="hljs-selector-class">.libraryName</span><span class="hljs-selector-class">.foo</span><span class="hljs-selector-class">.echo</span>());</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006058452" src="https://static.alili.tech/img/remote/1460000006058452" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Facebook的create-react-app快速构建React开发环境

## 原文链接
[https://segmentfault.com/a/1190000006055973](https://segmentfault.com/a/1190000006055973)

