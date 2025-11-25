---
title: '尝试造了个工具类库，名为 Diana' 
date: 2018-12-20 2:30:10
hidden: true
slug: nzzkcrluqmd
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012564211?w=640&amp;h=280" src="https://static.alili.tech/img/remote/1460000012564211?w=640&amp;h=280" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>项目地址: <a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">diana</a><p>文档地址: <a href="http://muyunyun.cn/diana/" rel="nofollow noreferrer" target="_blank">http://muyunyun.cn/diana/</a></p>
</blockquote>
<h3 id="articleHeader0">造轮子的意义</h3>
<p>为啥已经有如此多的前端工具类库还要自己造轮子呢？个人认为有以下几个观点吧：</p>
<ul>
<li>定制性强，能根据自己的需求为主导延伸开发。万一一不小心还能帮到别人（比如 React 库）；</li>
<li>纸上得来终觉浅，很多流行的库，只是照着它们的 API 进行使用，其实这些库里蕴含着大量的知识、技巧，最好的办法就是仿照它们来写些小 demo，从而体会这些库的精髓；</li>
<li>造轮子的过程中能让自己体会到与平常业务开发不一样的乐趣；比如和日常业务开发中很大的一个区别是会对测试用例具有比较严格的要求；而且写文档能力提升了。</li>
<li>就先瞎编到这里了。。。</li>
</ul>
<p>抛开内部方法(写相应的专题效果可能会更好，所以这里先略过)，下面分享一些开发 <a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">diana 库</a> 时的一些心得：</p>
<h3 id="articleHeader1">项目目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── LICENSE                  开源协议
├── README-zh_en.md          英文说明文档
├── README.md                中文说明文档
├── coverage                 代码覆盖率文件
├── docs                     文档目录
│&nbsp;&nbsp; └── static-parts
│&nbsp;&nbsp;     ├── index-end.html   静态文档目录结尾文件
│&nbsp;&nbsp;     └── index-start.html 静态文档目录开头文件
├── karma.conf.js            karma 配置文件
├── lib
│&nbsp;&nbsp; ├── diana.back.js        服务端引用入口
│&nbsp;&nbsp; └── diana.js             浏览器引用入口
├── package.json
├── script
│&nbsp;&nbsp; ├── build.js             构建文件
│&nbsp;&nbsp; ├── check.js             结合 pre-commit 进行 eslint 校验
│&nbsp;&nbsp; ├── tag-script.js        自动生成文档的标签
│&nbsp;&nbsp; ├── web-script.js        自动生成文档
│&nbsp;&nbsp; ├── webpack.browser.js   浏览器端 webpack 配置文件
│&nbsp;&nbsp; └── webpack.node.js      服务器端 webpack 配置文件
├── snippets
├── src
│&nbsp;&nbsp; ├── browser              浏览器端方法
│&nbsp;&nbsp; ├── common               共用方法
│&nbsp;&nbsp; ├── node                 node 端方法
│&nbsp;&nbsp; └── util.js              库内通用方法
├── tag_database             文档标签
└── test                     测试文件
    ├── browserTest
    ├── commonTest
    ├── index.js
    └── nodeTest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>├── <span class="hljs-selector-tag">LICENSE</span>                  开源协议
├── <span class="hljs-selector-tag">README-zh_en</span><span class="hljs-selector-class">.md</span>          英文说明文档
├── <span class="hljs-selector-tag">README</span><span class="hljs-selector-class">.md</span>                中文说明文档
├── <span class="hljs-selector-tag">coverage</span>                 代码覆盖率文件
├── <span class="hljs-selector-tag">docs</span>                     文档目录
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">static-parts</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">index-end</span><span class="hljs-selector-class">.html</span>   静态文档目录结尾文件
│&nbsp;&nbsp;     └── <span class="hljs-selector-tag">index-start</span><span class="hljs-selector-class">.html</span> 静态文档目录开头文件
├── <span class="hljs-selector-tag">karma</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            <span class="hljs-selector-tag">karma</span> 配置文件
├── <span class="hljs-selector-tag">lib</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">diana</span><span class="hljs-selector-class">.back</span><span class="hljs-selector-class">.js</span>        服务端引用入口
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">diana</span><span class="hljs-selector-class">.js</span>             浏览器引用入口
├── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">script</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">build</span><span class="hljs-selector-class">.js</span>             构建文件
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">check</span><span class="hljs-selector-class">.js</span>             结合 <span class="hljs-selector-tag">pre-commit</span> 进行 <span class="hljs-selector-tag">eslint</span> 校验
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">tag-script</span><span class="hljs-selector-class">.js</span>        自动生成文档的标签
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">web-script</span><span class="hljs-selector-class">.js</span>        自动生成文档
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.browser</span><span class="hljs-selector-class">.js</span>   浏览器端 <span class="hljs-selector-tag">webpack</span> 配置文件
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.node</span><span class="hljs-selector-class">.js</span>      服务器端 <span class="hljs-selector-tag">webpack</span> 配置文件
├── <span class="hljs-selector-tag">snippets</span>
├── <span class="hljs-selector-tag">src</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">browser</span>              浏览器端方法
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">common</span>               共用方法
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">node</span>                 <span class="hljs-selector-tag">node</span> 端方法
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">util</span><span class="hljs-selector-class">.js</span>              库内通用方法
├── <span class="hljs-selector-tag">tag_database</span>             文档标签
└── <span class="hljs-selector-tag">test</span>                     测试文件
    ├── <span class="hljs-selector-tag">browserTest</span>
    ├── <span class="hljs-selector-tag">commonTest</span>
    ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
    └── <span class="hljs-selector-tag">nodeTest</span></code></pre>
<p>目录结构也随着方法的增多在不停迭代当中，建议直接到<a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">库中</a>查看最新的目录结构。</p>
<p>相应地，具体的方法会随着时间迭代，所以首先推荐查看<a href="http://muyunyun.cn/diana/" rel="nofollow noreferrer" target="_blank">文档</a>，点击如下图的 Ⓢ 就能查看源码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012564212?w=651&amp;h=300" src="https://static.alili.tech/img/remote/1460000012564212?w=651&amp;h=300" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">让模块同时在 Node.js 与浏览器中运行</h3>
<p>我们可以通过如下方法来判断模块当前是运行在 Node.js 还是浏览器中，然后使用不同的方式实现我们的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Only Node.JS has a process variable that is of [[Class]] process
const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Only Node.JS has a process variable that is of [[Class]] process</span>
<span class="hljs-keyword">const</span> isNode = <span class="hljs-built_in">Object</span>.prototype.toString.call(<span class="hljs-keyword">typeof</span> process !== <span class="hljs-string">'undefined'</span> ? process : <span class="hljs-number">0</span>) === <span class="hljs-string">'[object process]'</span></code></pre>
<p>但如果用户使用了模块打包工具，这样做会导致 Node.js 与浏览器的实现方式都会被包含在最终的输出文件中。针对这个问题，开源社区提出了在 package.json 中添加 browser 字段的<a href="https://github.com/defunctzombie/package-browser-field-spec" rel="nofollow noreferrer" target="_blank">提议</a>，目前 webpack 和 rollup 都已经支持这个字段了。</p>
<p>给 browser 字段提供一个文件路径作为在浏览器端使用时的模块入口，但需要注意的是，打包工具会优先使用 browser 字段指定的文件路径作为模块入口，所以你的 main 字段 和 module 字段会被忽略，但是这会导致打包工具不会优化你的代码。详细信息请参考<a href="http://link.zhihu.com/?target=https%3A//github.com/webpack/webpack/issues/4674" rel="nofollow noreferrer" target="_blank">这个问题</a>。</p>
<p>在 <a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">diana 库</a> 为了在不同环境中使用适当的文件，在 package.json 中进行了如下声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;browser&quot;: &quot;lib/diana.js&quot;,
  &quot;main&quot;: &quot;lib/diana.back.js&quot;, // 或者 &quot;module&quot;: &quot;lib/diana.back.js&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-string">"browser"</span>: <span class="hljs-string">"lib/diana.js"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"lib/diana.back.js"</span>, <span class="hljs-comment">// 或者 "module": "lib/diana.back.js",</span></code></pre>
<p>这样一来，在 node 环境中，引用的是 <code>lib/diana.back.js</code> 文件，在浏览器环境中，引用的是 <code>lib/diana.js</code> 文件。然后就能愉快地在浏览器端和 node 端愉快地使用自己特有的 api 了。</p>
<h3 id="articleHeader3">常见模块规范比较</h3>
<p>另外为了使 <a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">diana 库</a> 的打包文件兼容 node 端、以及浏览器端的引用，选择了 UMD 规范进行打包，那么为什么要选择 UMD 规范呢？让我们看下以下几种规范之间的异同：</p>
<h4>CommonJS</h4>
<ul>
<li>CommonJs 是服务器端模块的规范，<code>Node.js 采用了这个规范</code>。这些规范涵盖了模块、二进制、Buffer、字符集编码、I/O流、进程环境、文件系统、套接字、单元测试、服务器网关接口、包管理等。</li>
<li>根据 CommonJS 规范，一个单独的文件就是一个模块。加载模块使用 <code>require</code> 方法，该方法读取一个文件并执行，最后返回文件内部的 <code>exports</code> 对象。</li>
<li>CommonJS 加载模块是同步的。像 Node.js 主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以 CommonJS 规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD、CMD 解决方案。</li>
</ul>
<h4>AMD、CMD</h4>
<ul><li>AMD 是 RequireJS 在推广过程中对模块定义的规范化产物。AMD 推崇提前执行。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // AMD 默认推荐的是
define(['./a', './b'], function(a, b) {
  a.doSomething()
  b.doSomething()
  ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">// AMD 默认推荐的是</span>
define([<span class="hljs-string">'./a'</span>, <span class="hljs-string">'./b'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
  a.doSomething()
  b.doSomething()
  ...
})</code></pre>
<ul><li>CMD 是 SeaJS 在推广过程中对模块定义的规范化产物。CMD 推崇依赖就近。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b')
  b.doSomething()
  ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// CMD</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require, exports, module</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>)
  a.doSomething()
  <span class="hljs-keyword">var</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>)
  b.doSomething()
  ...
})</code></pre>
<h4>UMD</h4>
<p>UMD 是 AMD 和 CommonJS 的结合。因为 AMD 是以浏览器为出发点的异步加载模块，CommonJS 是以服务器为出发点的同步加载模块，所以人们想出了另一个更通用的模式 UMD，来解决跨平台的问题。</p>
<p><a href="https://github.com/MuYunyun/diana/blob/master/lib/diana.js#L1" rel="nofollow noreferrer" target="_blank">diana 库</a> 选择了以 umd 方式进行输出，来看下 UMD 做了啥：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (root, factory) {
  if (typeof exports === 'object' &amp;&amp; typeof module === 'object') { // UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 CommonJS 模式
    module.exports = factory()
  } else if (typeof define === 'function' &amp;&amp; define.amd) { // 接着判断是否支持 AMD（define是否存在），存在则使用 AMD 方式加载模块。
    define([], factory)
  } else if (typeof exports === 'object') { // CommonJS 的另一种形式
    exports['diana'] = factory()
  } else
    root['diana'] = factory() // Window
})(this, function() {
  return module
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, factory</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">'object'</span>) { <span class="hljs-comment">// UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 CommonJS 模式</span>
    <span class="hljs-built_in">module</span>.exports = factory()
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd) { <span class="hljs-comment">// 接着判断是否支持 AMD（define是否存在），存在则使用 AMD 方式加载模块。</span>
    define([], factory)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span>) { <span class="hljs-comment">// CommonJS 的另一种形式</span>
    exports[<span class="hljs-string">'diana'</span>] = factory()
  } <span class="hljs-keyword">else</span>
    root[<span class="hljs-string">'diana'</span>] = factory() <span class="hljs-comment">// Window</span>
})(<span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>
})</code></pre>
<h3 id="articleHeader4">测试踩坑之路</h3>
<h4>代码覆盖率</h4>
<p>单元测试的代码覆盖率统计，是衡量测试用例好坏的一个的方法。但凡是线上用的库，基本上都少不了高质量的代码覆盖率的检测。如下图为 diana 库的测试覆盖率展示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012564213?w=820&amp;h=400" src="https://static.alili.tech/img/remote/1460000012564213?w=820&amp;h=400" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到覆盖率分为以下 4 种类型，</p>
<ul>
<li>行覆盖率（line coverage）：是否每一行都执行了？</li>
<li>函数覆盖率（function coverage）：是否每个函数都调用了？</li>
<li>分支覆盖率（branch coverage）：是否每个if代码块都执行了？</li>
<li>语句覆盖率（statement coverage）：是否每个语句都执行了？</li>
</ul>
<p>番外：github 上显示的覆盖率是根据行覆盖率来展示的。<br><a href="https://codecov.io/gh/MuYunyun/diana" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012564214" src="https://static.alili.tech/img/remote/1460000012564214" alt="codecov" title="codecov" style="cursor: pointer;"></span></a></p>
<h4>mocha + istanbul</h4>
<p><a href="https://github.com/MuYunyun/diana/blob/d81991f588046b428e2ac959fb6b87e6edb4938e/package.json#L23" rel="nofollow noreferrer" target="_blank">最初的版本</a>, 仅仅用到 mocha 进行测试 *.test.js 文件，然后在 <a href="https://codecov.io/gh/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">codecov</a> 得到测试覆盖率。</p>
<h4>引人 karma</h4>
<p>如果仅仅测试 es5、es6 的语法，其实用 mocha 就已经够用了，但是涉及到测试 Dom 操作的语法等就必须建立一个浏览器，在上面进行测试。karma 的作用其实就是自动帮我们建立一个测试用的浏览器环境。</p>
<p>为了让浏览器支持 Common.js 规范，中间用了 karma + browserify，尽管测试用例都跑通了，但是最后的代码覆盖率的文件里只有各个方法的引用路径。最后只能又回到 karma + webpack 来，这里又踩到一个坑，<a href="https://segmentfault.com/a/1190000004283830">打包编译JS代码覆盖率问题</a>，踩了一些坑后，终于实现了可以查看编译前代码的覆盖率。图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012564215" src="https://static.alili.tech/img/remote/1460000012564215" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过这幅图我们能清晰地看到源代码中测试用例跑过各行代码的次数(左侧的数字)，以及测试用例没有覆盖到的代码(图中红色所示)。然后我们就能改善相应的测试用例从而提高测试覆盖率。</p>
<p><a href="https://github.com/MuYunyun/diana/blob/master/karma.conf.js" rel="nofollow noreferrer" target="_blank">配置文件</a>，核心部分如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(config) {
  config.set({
    files: ['test/index.js'], // 需载入浏览器的文件
    preprocessors: { // 预处理
      'test/index.js': ['webpack', 'coverage']
    },
    webpack: {
      module: {
        rules: [{
          test: /\.js$/,
          use: { loader: 'sourcemap-istanbul-instrumenter-loader' }, // 这里用 istanbul-instrumenter-loader 插件的 0.0.2 版本，其它版本有坑~
          exclude: [/node_modules/, /\.spec.js$/],
        }],
      }
    },
    coverageReporter: {
      type: 'lcov', // 貌似只能支持这种类型的读取
      dir: 'coverage/'
    },
    remapIstanbulReporter: { // 生成 coverage 文件
      reports: {
        'text-summary': null,
        json: 'coverage/coverage.json',
        lcovonly: 'coverage/lcov.info',
        html: 'coverage/html/',
      }
    },
    reporters: ['progress', 'karma-remap-istanbul'], // remap-isbanbul 也报了一个未找到 sourcemap 的 error，直接注释了 remap-istanbul 包的 CoverageTransformer.js 文件的 169 行，以后有机会再捣鼓吧。（心累）
    ...
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
  config.set({
    <span class="hljs-attr">files</span>: [<span class="hljs-string">'test/index.js'</span>], <span class="hljs-comment">// 需载入浏览器的文件</span>
    preprocessors: { <span class="hljs-comment">// 预处理</span>
      <span class="hljs-string">'test/index.js'</span>: [<span class="hljs-string">'webpack'</span>, <span class="hljs-string">'coverage'</span>]
    },
    <span class="hljs-attr">webpack</span>: {
      <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [{
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
          <span class="hljs-attr">use</span>: { <span class="hljs-attr">loader</span>: <span class="hljs-string">'sourcemap-istanbul-instrumenter-loader'</span> }, <span class="hljs-comment">// 这里用 istanbul-instrumenter-loader 插件的 0.0.2 版本，其它版本有坑~</span>
          exclude: [<span class="hljs-regexp">/node_modules/</span>, /\.spec.js$/],
        }],
      }
    },
    <span class="hljs-attr">coverageReporter</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'lcov'</span>, <span class="hljs-comment">// 貌似只能支持这种类型的读取</span>
      dir: <span class="hljs-string">'coverage/'</span>
    },
    <span class="hljs-attr">remapIstanbulReporter</span>: { <span class="hljs-comment">// 生成 coverage 文件</span>
      reports: {
        <span class="hljs-string">'text-summary'</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">json</span>: <span class="hljs-string">'coverage/coverage.json'</span>,
        <span class="hljs-attr">lcovonly</span>: <span class="hljs-string">'coverage/lcov.info'</span>,
        <span class="hljs-attr">html</span>: <span class="hljs-string">'coverage/html/'</span>,
      }
    },
    <span class="hljs-attr">reporters</span>: [<span class="hljs-string">'progress'</span>, <span class="hljs-string">'karma-remap-istanbul'</span>], <span class="hljs-comment">// remap-isbanbul 也报了一个未找到 sourcemap 的 error，直接注释了 remap-istanbul 包的 CoverageTransformer.js 文件的 169 行，以后有机会再捣鼓吧。（心累）</span>
    ...
  })
}</code></pre>
<h3 id="articleHeader5">总结</h3>
<p>本文围绕 <a href="https://github.com/MuYunyun/diana" rel="nofollow noreferrer" target="_blank">diana 库</a> 对造轮子的意义，模块兼容性，测试用例进行了思考总结。后续会对该库流程自动化以及性能上做些分享。<br>该库参考学习了很多优秀的库，感谢 <a href="https://github.com/jashkenas/underscore" rel="nofollow noreferrer" target="_blank">underscore</a>、<a href="https://github.com/proYang/outils" rel="nofollow noreferrer" target="_blank">outils</a>、<a href="https://github.com/chenhuiYj/ec-do" rel="nofollow noreferrer" target="_blank">ec-do</a>、<a href="https://github.com/Chalarangelo/30-seconds-of-code" rel="nofollow noreferrer" target="_blank">30-seconds-of-code</a> 等库对我的帮助。</p>
<p>最后欢迎各位大佬在 <a href="https://github.com/MuYunyun/diana/issues" rel="nofollow noreferrer" target="_blank">issues</a> 尽情吐槽。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
尝试造了个工具类库，名为 Diana

## 原文链接
[https://segmentfault.com/a/1190000012564206](https://segmentfault.com/a/1190000012564206)

