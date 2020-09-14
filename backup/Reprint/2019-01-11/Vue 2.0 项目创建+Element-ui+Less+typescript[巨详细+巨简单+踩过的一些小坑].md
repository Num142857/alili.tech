---
title: 'Vue 2.0 项目创建+Element-ui+Less+typescript[巨详细+巨简单+踩过的一些小坑]' 
date: 2019-01-11 2:30:08
hidden: true
slug: zalo7to2cdm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>先说点什么</strong></h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="刚从坑里爬出来,来和大家分享一下,也许我写的东西大部分文章都有,但是也有些新的东西,小白仔细看哦,大牛来了也请指点一二,也帮助我进步!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code style="word-break: break-word; white-space: initial;">刚从坑里爬出来,来和大家分享一下,也许我写的东西大部分文章都有,但是也有些新的东西,小白仔细看哦,大牛来了也请指点一二,也帮助我进步!</code></pre>
<h1 id="articleHeader1"><strong>进入正题</strong></h1>
<h2 id="articleHeader2">Vue 2.0 项目的基本创建</h2>
<h3 id="articleHeader3">一.Vue 2.0 的环境搭建</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.node.js安装
    安装原因:Node.js 是一个服务器端 JavaScript 解释器,既是开发平台, 也是运行环境
    坑:node.js 8.1.0版本创建项目的时候不能输入,注意绕过
    npm:是随同NodeJS一起安装的包管理工具,在官网下载安装node.js后，就已经自带npm
    安装:从node.js官网下载并安装node，安装过程很简单，一路“下一步”就可以了（傻瓜式安装）。安装完成之后，打开命令行工具(win+r，然后输入cmd)，输入 node -v和npm -v，如下图，如果出现相应的版本号，则说明安装成功。
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-number">1</span>.node.js安装
    安装原因:<span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> 是一个服务器端 JavaScript 解释器,既是开发平台, 也是运行环境
    坑:<span class="hljs-keyword">node</span>.<span class="hljs-title">js</span> <span class="hljs-number">8.1</span>.<span class="hljs-number">0</span>版本创建项目的时候不能输入,注意绕过
    npm:是随同NodeJS一起安装的包管理工具,在官网下载安装<span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>后，就已经自带npm
    安装:从<span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>官网下载并安装<span class="hljs-keyword">node</span><span class="hljs-title">，安装过程很简单，一路“下一步”就可以了（傻瓜式安装）。安装完成之后，打开命令行工具(win</span>+r，然后输入cmd)，输入 <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>和npm -v，如下图，如果出现相应的版本号，则说明安装成功。
   </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPDj4?w=374&amp;h=228" src="https://static.alili.tech/img/bVPDj4?w=374&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 淘宝镜像安装
    安装原因:我们用的npm的服务器是外国，有的时候我们安装“依赖”的时候很很慢很慢超级慢，所以就用这个cnpm来安装我们说需要的“依赖”。
    安装:打开命令行工具(cmd),输入npm install -g cnpm --registry= https://registry.npm.taobao.org

   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-number">2.</span> 淘宝镜像安装
    安装原因:我们用的<span class="hljs-built_in">npm</span>的服务器是外国，有的时候我们安装“依赖”的时候很很慢很慢超级慢，所以就用这个cnpm来安装我们说需要的“依赖”。
    安装:打开命令行工具(cmd),输入<span class="hljs-built_in">npm</span> install -g cnpm --registry= https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org

   
</code></pre>
<blockquote>安装的时候指令输入npm是从官方下载,速度可能慢一点,但是比较全,cnpm是从国内下载,可能不全.<br>最好使用npm</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVPDpl?w=949&amp;h=280" src="https://static.alili.tech/img/bVPDpl?w=949&amp;h=280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.webpack安装
    安装原因:WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用.
    安装:打开命令行工具(cmd),输入npm install webpack -g，安装完成之后输入 webpack -v，如下图，如果出现相应的版本号，则说明安装成功。
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">3</span>.webpack安装
    安装原因:WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用.
    安装:打开命令行工具(<span class="hljs-keyword">cmd</span><span class="bash">),输入npm install webpack -g，安装完成之后输入 webpack -v，如下图，如果出现相应的版本号，则说明安装成功。
</span>    </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPDri?w=395&amp;h=88" src="https://static.alili.tech/img/bVPDri?w=395&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4.安装vue-cli脚手架构建工具
    安装原因:vue-cli是Vue框架的搭建工具,就像是盖房子时房子的整体架构图,其作用是--构建目录结构、本地调试、代码部署、热加载、单元测试
    安装:打开命令行工具(cmd),输入npm install vue-cli -g，安装完成之后输入 vue -V（注意这里是大写的“V”），如下图，如果出现相应的版本号，则说明安装成功。
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-number">4.</span>安装vue-<span class="hljs-keyword">cli</span>脚手架构建工具
    安装原因:vue-<span class="hljs-keyword">cli</span>是Vue框架的搭建工具,就像是盖房子时房子的整体架构图,其作用是--构建目录结构、本地调试、代码部署、热加载、单元测试
    安装:打开命令行工具(cmd),输入npm install vue-<span class="hljs-keyword">cli</span> -g，安装完成之后输入 vue -V（注意这里是大写的“V”），如下图，如果出现相应的版本号，则说明安装成功。
    </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPDyt?w=408&amp;h=331" src="https://static.alili.tech/img/bVPDyt?w=408&amp;h=331" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>不同的输入和不同的结果,自己看</p>
<h3 id="articleHeader4">二. Vue 2.0 项目创建开始</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.选择安装目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1.</span>选择安装目录</code></pre>
<p>这是在桌面上创建(cd desktop)<br><span class="img-wrap"><img data-src="/img/bVPDAB?w=282&amp;h=81" src="https://static.alili.tech/img/bVPDAB?w=282&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这是返回上一级(cd..)<br><span class="img-wrap"><img data-src="/img/bVPDAZ?w=295&amp;h=74" src="https://static.alili.tech/img/bVPDAZ?w=295&amp;h=74" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是进入D盘<br><span class="img-wrap"><img data-src="/img/bVPDBD?w=212&amp;h=71" src="https://static.alili.tech/img/bVPDBD?w=212&amp;h=71" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.安装
打开命令行工具(cmd),进入安装目录,例如在桌面 输入vue init webpack new,(new是项目名字,随便点,但是不要写汉字,有些也不支持字母大写)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-number">2.</span>安装
打开命令行工具(cmd),进入安装目录,例如在桌面 输入vue init webpack <span class="hljs-keyword">new</span><span class="hljs-type"></span>,(<span class="hljs-keyword">new</span><span class="hljs-type"></span>是项目名字,随便点,但是不要写汉字,有些也不支持字母大写)
</code></pre>
<p>下图有个错误,说明一下:是ESLint代码规范不是es6规范<br><span class="img-wrap"><img data-src="/img/bVPEky?w=608&amp;h=608" src="https://static.alili.tech/img/bVPEky?w=608&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>创建好了,这样<br><span class="img-wrap"><img data-src="/img/bVPEmm?w=730&amp;h=310" src="https://static.alili.tech/img/bVPEmm?w=730&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.进入创建好的项目目录
    在原来的基础上再输入cd new,如下图" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-number">3.</span>进入创建好的项目目录
    在原来的基础上再输入cd <span class="hljs-keyword">new</span><span class="hljs-type"></span>,如下图</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPEmU?w=320&amp;h=72" src="https://static.alili.tech/img/bVPEmU?w=320&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4.安装项目依赖
    打开命令行工具(cmd),输入npm install,最好别用cnpm install,上面说过" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code><span class="hljs-number">4</span>.安装项目依赖
    打开命令行工具(cmd),输入npm <span class="hljs-keyword">install</span>,最好别用cnpm <span class="hljs-keyword">install</span>,上面说过</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPEoM?w=667&amp;h=218" src="https://static.alili.tech/img/bVPEoM?w=667&amp;h=218" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>安装完了依赖这样<br><span class="img-wrap"><img data-src="/img/bVPEqJ?w=805&amp;h=374" src="https://static.alili.tech/img/bVPEqJ?w=805&amp;h=374" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5.安装 路由模块 vue-router 和网络请求模块 vue-resource/axios
    介绍:说白点,路由是vue用来跳转页面的,网络请求是vue的ajax
    安装:npm install vue-router--save, vue-resource --save(npm install axios)
    特别:vue1.0用的是vue-resource,2.0之后用axios,因为resource的作者不更新了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>5.安装 路由模块 vue-router 和网络请求模块 vue-resource/axios
    介绍:说白点,路由是vue用来跳转页面的,网络请求是vue的ajax
    安装:npm <span class="hljs-keyword">install</span> vue-router<span class="hljs-comment">--save, vue-resource --save(npm install axios)</span>
    特别:vue1<span class="hljs-number">.0</span>用的是vue-<span class="hljs-keyword">resource</span>,<span class="hljs-number">2.0</span>之后用axios,因为<span class="hljs-keyword">resource</span>的作者不更新了</code></pre>
<p>说一下各个目录是干嘛的<br><span class="img-wrap"><img data-src="/img/bVPEwe?w=440&amp;h=510" src="https://static.alili.tech/img/bVPEwe?w=440&amp;h=510" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6.启动项目
    在项目目录里输入 npm run dev,默认端口是8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">6</span>.启动项目
    在项目目录里输入 npm <span class="hljs-keyword">run</span><span class="bash"> dev,默认端口是8080</span></code></pre>
<p>这就是创建好的项目<br><span class="img-wrap"><img data-src="/img/bVPEvu?w=603&amp;h=366" src="https://static.alili.tech/img/bVPEvu?w=603&amp;h=366" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">Vue添加其他插件</h2>
<h3 id="articleHeader6">一. Element-ui</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.介绍:Element-ui是一套采用 Vue 2.0 作为基础框架实现的组件库,非常方便
2.安装:在项目目录里输入npm i element-ui -S
3.然后在 main.js 引入并注册
    import Element from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    Vue.use(Element)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-number">1.</span>介绍:<span class="hljs-built_in">Element</span>-ui是一套采用 Vue <span class="hljs-number">2.0</span> 作为基础框架实现的组件库,非常方便
<span class="hljs-number">2.</span>安装:在项目目录里输入npm i element-ui -S
<span class="hljs-number">3.</span>然后在 main.js 引入并注册
    <span class="hljs-keyword">import</span> <span class="hljs-built_in">Element</span> from <span class="hljs-string">'element-ui'</span>
    <span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
    Vue.use(<span class="hljs-built_in">Element</span>)
</code></pre>
<p>这时候可能会出错,报错是由于我们引入了 index.css 这个 CSS 文件，但是 webpack 打包的时候无法识别并转换成 js，所以就需要配置才能读取 css 和字体文件，运行命令安装下面三个东西(如果之前安装过就不需要了)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install style-loader --save-D
npm install css-loader --save-D
npm install file-loader --save-D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader <span class="hljs-comment">--save-D</span>
npm <span class="hljs-keyword">install</span> css-loader <span class="hljs-comment">--save-D</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader <span class="hljs-comment">--save-D</span></code></pre>
<blockquote>坑:一定要用-D,否则容易报错</blockquote>
<p>在 webpack.config.js 中的 module下的rules 数组加入以下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\\.css$/,
    loader: &quot;style!css&quot;
},
{
    test: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
    loader: &quot;file&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\\.css$/,
    loader: <span class="hljs-string">"style!css"</span>
},
{
    <span class="hljs-attribute">test</span>: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
    loader: <span class="hljs-string">"file"</span>
}</code></pre>
<blockquote>坑:查看build/utils.js中的return里各种loader引入(如下图),如果有相关的引入,webpack.config.js里就不用加了,也就是上面一步省略</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVPEF4?w=702&amp;h=278" src="https://static.alili.tech/img/bVPEF4?w=702&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">二. Less</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.介绍:Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。
2.安装:在项目目录里npm install less less-loader --save(npm install -g less在全局中安装)
    修改webpack.config.js文件，配置loader加载依赖，让其支持外部的less,在原来的代码上添加
    {
        test: /\.less$/,
        loader: &quot;style-loader!css-loader!less-loader&quot;,
    },
    同上,省略这一步,因为build/utils.js中的return里的loader引入里有less
3.使用:在组件里创建<style lang=”less”></style>(style标签里加上 scoped 为只在此作用域 有效)
    这样就可以在里边写less了,或者引入less文件    @import './index.less'; //引入全局less文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>1.介绍:Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。
2.安装:在项目目录里npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save(npm install -g less在全局中安装)</span>
    修改webpack.config.js文件，配置loader加载依赖，让其支持外部的<span class="hljs-keyword">less</span>,在原来的代码上添加
    {
        <span class="hljs-keyword">test</span>: /\.less$/,
        loader: <span class="hljs-string">"style-loader!css-loader!less-loader"</span>,
    },
    同上,省略这一步,因为<span class="hljs-keyword">build</span>/utils.js中的<span class="hljs-keyword">return</span>里的loader引入里有<span class="hljs-keyword">less</span>
<span class="hljs-number">3.</span>使用:在组件里创建&lt;<span class="hljs-keyword">style</span> lang=”<span class="hljs-keyword">less</span>”&gt;&lt;/<span class="hljs-keyword">style</span>&gt;(<span class="hljs-keyword">style</span>标签里加上 scoped 为只在此作用域 有效)
    这样就可以在里边写<span class="hljs-keyword">less</span>了,或者引入<span class="hljs-keyword">less</span>文件    @<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.less'</span>; //引入全局less文件</code></pre>
<p>4.webstorm里自动生成less文件:网上有很多,自己百度.</p>
<h3 id="articleHeader8">三.TypeScript</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="略..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">略...</code></pre>
<h2 id="articleHeader9">本文总结</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.全局安装需要加 -g
2.main.js文件里面的样式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.全局安装需要加 -g
<span class="hljs-number">2</span><span class="hljs-selector-class">.main</span><span class="hljs-selector-class">.js</span>文件里面的样式</code></pre>
<p>这是main.js里文件的引入<br><span class="img-wrap"><img data-src="/img/bVPE7f?w=994&amp;h=654" src="https://static.alili.tech/img/bVPE7f?w=994&amp;h=654" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这是main.js里的路由配置<br><span class="img-wrap"><img data-src="/img/bVPE8J?w=759&amp;h=437" src="https://static.alili.tech/img/bVPE8J?w=759&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.Element引入可以是Element也可以是是ElementUI
4.组件的引入在main.js里,而less、js等文件的引入可以在main.js里,也可以在响应的标签里
5.通过在项目里安装的依赖都在这里(package.json),文件太多显示不全,知道在哪,什么样就可以了,想知道自己安装的依赖有没有,也可以看这里
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>3<span class="hljs-selector-class">.Element</span>引入可以是<span class="hljs-selector-tag">Element</span>也可以是是<span class="hljs-selector-tag">ElementUI</span>
4.组件的引入在<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>里,而<span class="hljs-selector-tag">less</span>、<span class="hljs-selector-tag">js</span>等文件的引入可以在<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>里,也可以在响应的标签里
5.通过在项目里安装的依赖都在这里(<span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>),文件太多显示不全,知道在哪,什么样就可以了,想知道自己安装的依赖有没有,也可以看这里
</code></pre>
<p>package.json里的所有依赖<br><span class="img-wrap"><img data-src="/img/bVPE9y?w=641&amp;h=740" src="https://static.alili.tech/img/bVPE9y?w=641&amp;h=740" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6.接着上面一点说一下,安装的时候 
    npm install --save-dev 则添加到 package.json 文件 devDependencies 下(开发的时候用),
    npm install --save 会把依赖包名称添加到 package.json 文件 dependencies 下(发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了).
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-number">6</span>.接着上面一点说一下,安装的时候 
    npm <span class="hljs-keyword">install </span>--save-dev 则添加到 package.<span class="hljs-keyword">json </span>文件 devDependencies 下(开发的时候用),
    npm <span class="hljs-keyword">install </span>--save 会把依赖包名称添加到 package.<span class="hljs-keyword">json </span>文件 dependencies 下(发布后还需要依赖的模块，譬如像<span class="hljs-keyword">jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了).
</span></code></pre>
<h1 id="articleHeader10"><strong>最后再说点什么</strong></h1>
<p>希望本文可以给你提供一些帮助,这是我最高兴的,觉得我有写的不对或者有问题的地方也请帮我指正出来,大家互相帮助互相进步,以后有新的的发现还会添加到里边.</p>
<blockquote>TypeScript暂时还没有加进去,目测vue里+ts挺麻烦的,后面研究差不多了再加进来,有懂的大神可以留一下地址,3Q! <br><strong>差点忘了,对你有帮助或者觉得写的还可以的话麻烦点个收藏和推荐,3Q!</strong>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 项目创建+Element-ui+Less+typescript[巨详细+巨简单+踩过的一些小坑]

## 原文链接
[https://segmentfault.com/a/1190000009890826](https://segmentfault.com/a/1190000009890826)

