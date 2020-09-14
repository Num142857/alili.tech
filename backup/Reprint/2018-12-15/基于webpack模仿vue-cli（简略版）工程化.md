---
title: '基于webpack模仿vue-cli（简略版）工程化' 
date: 2018-12-15 2:30:11
hidden: true
slug: 3fnvum00wb2
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">从零搭建vue-cli</h2>
<p><em>原创不易，如需转载请联系作者并注明出处</em></p>
<p>vue-cli的出现为vue工程化前端开发工作流提供了开箱即用的构建配置，减轻了烦人的webpack配置流程。但高度封装的cli带来方便的同时，很多人却很少去关注轮子的内部结构，以至于当使用vue-cli需要手动配置一些东西（如编译less,scss,实现代码压缩，移动端适配等配置）的时候往往无从下手。废话不多说，下面我们来看看如何基于webpack模仿vue-cli实现vue项目工程化。</p>
<blockquote>如果本demo对你学习和理解vue-cli有帮助，请给我个star~~谢谢<br>本demo github地址: <a></a><a href="https://github.com/hedonghui/vue-cli-demo" rel="nofollow noreferrer" target="_blank">https://github.com/hedonghui/...</a>
</blockquote>
<h2 id="articleHeader1">目录</h2>
<p>1.webpack初始化及webpack周边相关配置<br>2.静态资源加载及css与处理器<br>3.webpack-dev-server及开发模式相关配置<br>4.配置vue的jsx写法及postcss相关<br>5.css单独分离打包<br>6.代码分离及生产环境浏览器缓存相关</p>
<h2 id="articleHeader2">通过webpack搭建vue工程</h2>
<p>首先我们来看看本文章demo完成后的整体packgage.json的包依赖结构：</p>
<p><span class="img-wrap"><img data-src="/img/bV27UJ?w=1108&amp;h=848" src="https://static.alili.tech/img/bV27UJ?w=1108&amp;h=848" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面我们来对这里面的所有包作用进行大体分析：<br>(本demo将不同环境webpack相关配置写在同一个config.js，packgage.js里基本不区分dependencies devDependencies，有异与 vue-cli官方将不同环境配置分开不同文件的方式，,读者可以根据webpack官<br>方文档推荐的<a>webpack-merge工具</a>并参考vue-cli源码进行相关配置。<strong>对于学习无伤大雅</strong>)</p>
<h3 id="articleHeader3">vue相关初始化</h3>
<p>首先新建一个文件夹，打开命令行窗口进行 npm init 初始化</p>
<p><span class="img-wrap"><img data-src="/img/bV271E?w=554&amp;h=52" src="https://static.alili.tech/img/bV271E?w=554&amp;h=52" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>先来看看安装的这几个包：</p>
<blockquote>1.webpack---------此处省略200字<br>2.vue-----------Vue包<br>3.css-loader--------------处理打包css文件<br>4.vue-loader---------------处理打包.vue文件(依赖于css-loader, vue-template-compiler)<br>5.vue-template-compiler ----------------处理vue模板&lt;template&gt;</blockquote>
<h3 id="articleHeader4">webpack.config.js相关配置</h3>
<p><span class="img-wrap"><img data-src="/img/bV276S?w=1447&amp;h=802" src="https://static.alili.tech/img/bV276S?w=1447&amp;h=802" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>目前我们装了vue相关的几个包，并在webpack.config.js里面配置了打包入口和出口相关的内容，接着我们去配置以下package.json下script脚本以启动我们的webpack打包</p>
<p><span class="img-wrap"><img data-src="/img/bV2779?w=1234&amp;h=415" src="https://static.alili.tech/img/bV2779?w=1234&amp;h=415" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>细心的朋友应该已经发现了我们配置了build和dev两个选项来区分生产环境和开发环境。其实在vue-cli或者其他的webpack相关搭建的工程中，单纯的将html,css,js代码打包到一起远远不能满足我们的需求，因此，webpack为我们提供了丰富的插件和相关配置来实现<strong>代码分割</strong>、<strong>类库代码与业务代码分开打包</strong>、<strong>模块热替换</strong>、<strong>babel转码</strong>、<strong>webpack-dev-server</strong>、<strong>css预处理</strong>等相关功能。</p>
<p>**</p>
<h2 id="articleHeader5">下面我们逐一来看这这个东西的配置与实现</h2>
<p>**</p>
<h2 id="articleHeader6">cross-env</h2>
<p>由于我们的webpack.config都写在同一个配置文件里面，在实现生产环境和开发环境中针对不同操作系统开发平台的不同，我们引入cross-env来实现同意管理，通过在webpack.config.js中判断是否为开发模式进行不同的配置</p>
<p><span class="img-wrap"><img data-src="/img/bV28ch?w=948&amp;h=262" src="https://static.alili.tech/img/bV28ch?w=948&amp;h=262" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28bp?w=795&amp;h=351" src="https://static.alili.tech/img/bV28bp?w=795&amp;h=351" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">webpack-dev-server 与热更新 (一个微服务)</h2>
<p><span class="img-wrap"><img data-src="/img/bV28cZ?w=762&amp;h=654" src="https://static.alili.tech/img/bV28cZ?w=762&amp;h=654" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">babel以及postcss相关配置</h2>
<p>babel是一个能将jsx以及es6等转码成javascript代码的转码工具，vue2后支持jsx写法，我们在webpack中也引入babel babel-loader等相关，使其能将vue中的jsx转码。babel相关配置在babelrc文件中，如下</p>
<p><span class="img-wrap"><img data-src="/img/bV28gd?w=939&amp;h=628" src="https://static.alili.tech/img/bV28gd?w=939&amp;h=628" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个demo的babel配置中，我们只配置了两个基本项，可以对比下vue-cli中更多的相关配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
//这里是指明了转码规则env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转
//码，并且设置amd,commonjs这样的模块化文件，不进行转码
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;modules&quot;: false,
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;> 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie <= 8&quot;]
      }
    }],
    &quot;stage-2&quot;
  ],
// 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
//transform-vue-jsx 顾名思义是 transform vue-jsx  to javascript
//至于下面test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认
//就是development,  instanbul是一个用来测试转码后代码的工具
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-runtime&quot;],
  &quot;env&quot;: {
    &quot;test&quot;: {
      &quot;presets&quot;: [&quot;env&quot;, &quot;stage-2&quot;],
      &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-es2015-modules-commonjs&quot;, &quot;dynamic-import-node&quot;]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
//这里是指明了转码规则env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转
//码，并且设置amd,commonjs这样的模块化文件，不进行转码
  <span class="hljs-string">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"targets"</span>: {
        <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"&gt; 1%"</span>, <span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"not ie &lt;= 8"</span>]
      }
    }],
    <span class="hljs-string">"stage-2"</span>
  ],
// 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
//transform-vue-jsx 顾名思义是 transform vue-jsx  to javascript
//至于下面test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认
//就是development,  instanbul是一个用来测试转码后代码的工具
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>, <span class="hljs-string">"transform-runtime"</span>],
  <span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"test"</span>: {
      <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"env"</span>, <span class="hljs-string">"stage-2"</span>],
      <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>, <span class="hljs-string">"transform-es2015-modules-commonjs"</span>, <span class="hljs-string">"dynamic-import-node"</span>]
    }
  }
}</code></pre>
<p><em>看晕了没？单单一个babelrc配置文件就有那么多配置</em></p>
<p><strong>不虚！</strong>本demo只是配置了基本重要项能实现大部分功能(其实关键在于让你大体理解vue-cli这个轮子是怎么构建起来的)</p>
<blockquote>我们继续往下看</blockquote>
<h2 id="articleHeader9">postcss.config.js</h2>
<ul>
<li>postcss.config.js主要用来配置css相关的内容</li>
<li>在vue-cli里面默认有三个插件postcss-import postcss-url autoprefixer（我这里只弄了一个）</li>
<li>在这个文件里我们还可以配置移动端适配相关的东西，通过引入一些插件可以自动化为我们处理屏幕适配</li>
<li>问题，具体内容我就不在这里展开</li>
<li>相关文章可以看看这篇：<a href="https://www.w3cplus.com/mobile/vw-layout-in-vue.html" rel="nofollow noreferrer" target="_blank">https://www.w3cplus.com/mobil...</a>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV28mT?w=1153&amp;h=641" src="https://static.alili.tech/img/bV28mT?w=1153&amp;h=641" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">代码分离以及做浏览器缓存</h2>
<p>webpack是一个一切以js为中心的打包工具，但是在生产模式中将所有东西都打包到bundlejs里面不利于做浏览器<br>缓存,类库文件都是大牛们造给广大码农的轮子，其稳定性高、可靠，所以在生产环境中可以进行浏览器缓存，不必跟随着业务代码经常更新，减少网络请求资料的消耗，webpack官方为我们提供一个叫extract-text-webpack-plugin插件来分离css样式，同时vue-cli里面还对类库代码（如vue.js），webpack相关代码与我们的业务代码进行分离，这里起作用的是这两个东东：<strong>new webpack.optimize.CommonsChunkPlugin()</strong> &nbsp; &nbsp; <strong>new webpack.optimize.CommonsChunkPlugin()</strong></p>
<p>我们来看一看本demo中production相关的配置:</p>
<p><span class="img-wrap"><img data-src="/img/bV28sP?w=1249&amp;h=895" src="https://static.alili.tech/img/bV28sP?w=1249&amp;h=895" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV28ti?w=1034&amp;h=457" src="https://static.alili.tech/img/bV28ti?w=1034&amp;h=457" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><h2 id="articleHeader11">最后来总结一下</h2></blockquote>
<p>其实vue-cli总体上来说是为我们配置了</p>
<ul>
<li>开发环境下的 webpack-dev-server及热更新babel、懒加载、样式打包等</li>
<li>生产环境下的分离打包，单独打包，根据chunkhash处理浏览器缓存,代码压缩等</li>
<li>当然在vue-cli中还有关于eslint相关的代码规范配置在本文中没有讲到(其实是不太会)</li>
</ul>
<p>最后本demo还有关于懒加载以及代码压缩部分需要去完善，其实简单的代码压缩也就几行代码<br>下面附上webpack官方文档的小示例：</p>
<p><span class="img-wrap"><img data-src="/img/bV28yc?w=728&amp;h=655" src="https://static.alili.tech/img/bV28yc?w=728&amp;h=655" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>至于...懒加载..我再琢磨琢磨（逃</p>
<p>本demo源码在这里[  [1]: <a href="https://github.com/hedonghui/vue-cli-demo" rel="nofollow noreferrer" target="_blank">https://github.com/hedonghui/...</a>][1]</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于webpack模仿vue-cli（简略版）工程化

## 原文链接
[https://segmentfault.com/a/1190000013102021](https://segmentfault.com/a/1190000013102021)

