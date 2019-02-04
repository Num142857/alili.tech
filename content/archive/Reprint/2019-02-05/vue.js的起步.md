---
title: 'vue.js的起步' 
date: 2019-02-05 2:30:09
hidden: true
slug: uyhjeq85p1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">介绍</h1>
<p>vue.js 是一个客户端js库，可以用来开发单页应用。为了一个项目的选型，我前前后后的看了angular、react、vuejs ，对前两者是佩服，对后者是爱。因为它简洁干净利索，并且还有高大上的web components实现。即使文档不多，我也愿意选择它。接下来，我们首先建立一个开始的项目，并且撸一遍开发过程中涉及到的概念和组件。</p>
<h1 id="articleHeader1">vue.js</h1>
<p>稍微像样一点的vuejs的开发过程几乎总是搭配webpack、babel一起的，喜欢从头hack的人，我告诉你配置是极为繁琐的，幸好vue.js 提供了一个工具，叫做vue-cli 。可用于快速搭建单页应用起步代码。只需一分钟即可启动常用的开发特性：</p>
<ol>
<li><p>可用的脚手架代码。</p></li>
<li><p>热重载。组件代码更新后自动重新加载</p></li>
<li><p>静态代码检查。</p></li>
<li><p>ES6语言特性</p></li>
</ol>
<h1 id="articleHeader2">工具准备</h1>
<p>我们需要使用vue-cli来创建一个脚手架项目。</p>
<h2 id="articleHeader3">安装 vue-cli</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>$ npm install -g vue-<span class="hljs-keyword">cli</span>
</code></pre>
<h2 id="articleHeader4">确认node版本</h2>
<p>我的版本是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node -v
v5.0.0
$ npm -v
3.10.6
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v5.<span class="hljs-number">0.0</span>
$ npm -v
<span class="hljs-number">3.10</span>.<span class="hljs-number">6</span>
</code></pre>
<p>很多问题如果出现，可能和版本有关，建议和我一致 。</p>
<h1 id="articleHeader5">创建新项目</h1>
<p>执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   $ vue init webpack my-project
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>   $ vue init webpack <span class="hljs-keyword">my</span>-project
</code></pre>
<p>第二个参数webpack，指明创建一个基于 "webpack" 模板的vuejs项目。此模板会创建一个webpack的脚手架代码。</p>
<p>然而，webpack是啥？它本身是一个打包工具，可以把js、css、image打包成一个或者多个js文件，并且可以支持各种loader作为插件对不同类型的文件做转换处理。实际上webpack就是通过插件vue-loader在加载vue类型的文件时做格式转换，把vue类型文件翻译为浏览器可以识别的js文件。</p>
<p>中国用户注意：vue init命令使用了npm， npm的仓库经常缓慢或者被阻断，可以使用国内镜像，只要编辑 ~/.npmrc 加入下面内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registry = https://registry.npm.taobao.org
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>registry = <span class="hljs-string">https:</span><span class="hljs-comment">//registry.npm.taobao.org</span>
</code></pre>
<p>这个的做法可以快得多。</p>
<p>当前可以使用的模板有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack - 通过webpack和vue-loader插件，可以调用babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
webpack-simple - 最简单的webpack和vue-loader插件。
browserify - 通过Browserify + vueify 的组合，可以调用babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
browserify-simple - 最简单的Browserify + vueify 插件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">webpack</span> - 通过webpack和vue-loader插件，可以调用<span class="hljs-keyword">babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
</span><span class="hljs-symbol">webpack</span>-simple - 最简单的webpack和vue-loader插件。
<span class="hljs-keyword">browserify </span>- 通过<span class="hljs-keyword">Browserify </span>+ vueify 的组合，可以调用<span class="hljs-keyword">babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
</span><span class="hljs-keyword">browserify-simple </span>- 最简单的<span class="hljs-keyword">Browserify </span>+ vueify 插件。
</code></pre>
<p>理论上webpack和browserify的功能类似，都可以做打包工具。但是webpack就是那个文档特少，但是大家都争着使用的热门工具。所以，我们就不管那么多，先使用webpack啦。</p>
<h1 id="articleHeader6">安装依赖，走你</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd my-project
$ npm install
$ npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>$ cd my-project
$ npm install
$ npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>到<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>查看效果。</p>
<h1 id="articleHeader7">查看vue文件</h1>
<p>vue文件是三位一体的。就是说css、html、js都在一个文件内，使用标签做出分割。为了更好的查看结构，建议首先安装对应编辑器的高光插件。</p>
<h2 id="articleHeader8">安装语法高光</h2>
<p>我习惯使用的编辑器是sublime text，安装插件就可以识别所有扩展名为.vue的vuejs组件代码，给予高光显示，便于代码的阅读和编写。这个插件叫做 vue-syntax-highlight，是vuejs官方提供的。它位于github.com。只要把它克隆到你的Sublime包目录内。在我的电脑上，Sublime包目录是/Users/lcj/Library/Application Support/Sublime Text 3/Packages ，所以安装的过程就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /Users/lcj/Library/Application\ Support/Sublime\ Text\ 3/Packages 
git clone https://github.com/vuejs/vue-syntax-highlight
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>cd <span class="hljs-regexp">/Users/</span>lcj<span class="hljs-regexp">/Library/</span>Application\ Support<span class="hljs-regexp">/Sublime\ Text\ 3/</span>Packages 
git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/vuejs/</span>vue-syntax-highlight
</code></pre>
<p>然后重新启动即可。之后阅读代码，所有的扩展名为.vue文件都会有相应的高光显示。</p>
<h2 id="articleHeader9">查看vue</h2>
<p>起步代码中有一个组件代码，在src/hello.vue内。查看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
    <div class=&quot;hello&quot;>
      <h1>"{{" msg "}}"</h1>
    </div>
  </template>


  <script>
  export default {
    data () {
      return {
        msg: 'Hello World!'
      }
    }
  }
  </script>


  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>


  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello World!'</span>
      }
    }
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#42b983</span>;
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>文件内分为三个部分， &lt;template&gt;标签包围内的是html代码；  &lt;script&gt;内包围的是js代码，并且可以使用ES6的语法。  &lt;style&gt;内的则是css代码。使用这个组件的代码在app.vue内。只要首先在脚本内声明标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Hello from './components/Hello'
export default {
  components: {
    Hello
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  components: {
    Hello
  }
}
</code></pre>
<p>随后在html内使用标签即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello></hello>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;hello&gt;</span><span class="hljs-section">&lt;/hello&gt;</span>
</code></pre>
<p>非常大的一个亮点！一个vue文件，内部js、css、html就都齐了，可以作为一个完整的、自包含的组件了。非常有趣的、我个人极为欣赏的web components就在此处了。</p>
<p>vue文件内的语法，当然不是浏览器所可以支持的，浏览器不认识它！魔术在于webpack+vue-loader+babel 。webpack加载vue文件首先调用vue-loader，vue-loader会调用babel转换ES6代码为ES5代码，把css和html作为模块也转换为客户端js代码。这些js代码浏览器就可以识别了。</p>
<p>另外，我们看看热加载。把hello组件的msg值改改。然后保存。浏览器会自动刷新的。这就是热加载了。对于频繁修改调试的程序员，有了热加载，得轻松不少。</p>
<h2 id="articleHeader10">安装chrome开发工具</h2>
<p>我习惯使用的浏览器是chrome，可以安装vue的开发工具到chrome插件内。在chrome市场内查询vue-developertools 。有了它，可以在chrome console内看到更加友好的vue错误提示。</p>
<h1 id="articleHeader11">回归日常</h1>
<p>我们所有的编辑修改一旦完成需要更新网站时，最终需要把所有的vue，ES6代码等编译出来到ES5的js文件。现在可以构建这些webpack代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span></code></pre>
<p>此命令会把我们已经有的开发成果，编译到dist目录下，就是说编译成前端可以直接使用的html、js、css。</p>
<p>有了它们，我就可以使用一个http 静态服务器，在dist目录内执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd dist 
npm install http-server -g
http-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>cd dist 
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span> -g
<span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span>
</code></pre>
<p>然后，到<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>查看效果。和运行<code>npm run dev</code>看到的一模一样。</p>
<h1 id="articleHeader12">更多</h1>
<p>vue还有两个插件，对开发者很有价值</p>
<h2 id="articleHeader13">加强版 ，访问服务器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-resource --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">resource</span> <span class="hljs-comment">--save</span></code></pre>
<h2 id="articleHeader14">安装路由</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> vue-router <span class="hljs-comment">--save</span>
</code></pre>
<h2 id="articleHeader15">细节展开</h2>
<p>我们走马观花的看了webpack、vue-loader、babel 、vue组件，未来需要一些篇幅去详细说明它们。</p>
<h2 id="articleHeader16">关于</h2>
<p>作者：刘传君</p>
<p>创建过产品，创过业。不好动，读书机器。<br>可以通过 1000copy#gmail.com 联系到我</p>
<h2 id="articleHeader17">出品</h2>
<p>http小书 <a href="http://www.ituring.com.cn/book/1791" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Git小书  <a href="http://www.ituring.com.cn/book/1870" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js的起步

## 原文链接
[https://segmentfault.com/a/1190000006584560](https://segmentfault.com/a/1190000006584560)

