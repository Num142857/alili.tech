---
title: 'webpack入坑之旅（一）不是开始的开始' 
date: 2019-02-12 2:30:12
hidden: true
slug: n2enbuskxca
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近学习框架，选择了vue，然后接触到了vue中的单文件组件，官方推荐使用 Webpack + vue-loader构建这些单文件 Vue 组件，于是就开始了webpack的入坑之旅。<br>因为原来没有用过任何的构建工具与模块化工具，所以本系列会十分的基础。并且可能有很多不正确的地方，希望大家谅解，并指出错误帮助改进。谢谢！<br>转自个人博客：<a href="http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">原地址</a></p></blockquote>
<p>这是一系列文章。此系列所有的练习都存在了我的github仓库中<a href="https://github.com/guowenfh/vue-webpack" rel="nofollow noreferrer" target="_blank">vue-webpack</a>，在本人有了新的理解与认识之后,会对文章有不定时的更正与更新。下面是目前完成的列表：</p>
<ul>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（一）不是开始的开始</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-02-deploy/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（二）loader入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-03-config/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（三）webpack.config入门</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/24/vue-webpack-04-custom/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（四）扬帆起航</a></p></li>
<li><p><a href="http://guowenfh.github.io/2016/03/25/vue-webpack-05-vue/" rel="nofollow noreferrer" target="_blank">webpack入坑之旅（五）加载vue单文件组件</a></p></li>
</ul>
<h2 id="articleHeader0">什么是webpack</h2>
<blockquote><p>其实不是特别想写这个东西，但貌似所有的教程都有这个。随便写两句吧。可以直接跳过。</p></blockquote>
<p>Webpack 是德国开发者 Tobias Koppers 开发的模块加载器兼打包工具，在webpack中，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。因此, Webpack 当中 js 可以引用 css, css 中可以嵌入图片 dataUrl。<br>对应各种不同文件类型的资源, Webpack 有对应的模块 loader比如vue用的是<code>vue-loader</code>当然这是后话，在后面我们再来说。</p>
<p>请看下图：<br><span class="img-wrap"><img data-src="http://guowenfh.github.io/images/vue-webpack/00-webpack-base.png" src="https://static.alili.techhttp://guowenfh.github.io/images/vue-webpack/00-webpack-base.png" alt="webpack" title="webpack" style="cursor: pointer;"></span></p>
<p>官网查看：<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/webpack</a></p>
<h2 id="articleHeader1">安装</h2>
<p>前提：因为webpack是一个基于node的项目，所以首先需要确保你的电脑里面已经安装了<code>node.js</code>，以及<code>npm</code>。在这里我使用的版本是：<code>node：v5.8.0  ，npm：3.7.3</code>,若是版本问题，请更新到最新版。<br>若是有出现npm安装过慢的情况，可以使用<a href="https://github.com/Pana/nrm" rel="nofollow noreferrer" target="_blank">nrm</a>这个项目来进行npm源地址的切换。</p>
<p>首先我们直接进行全局的安装，运行如下命令：<code>npm install webpack -g</code>，可能需要一点时间。</p>
<p>安装成功后，在命令行输入<code>webpack -h</code>即可查看当前安装的版本信息。以及可以使用的指令。   </p>
<p>当然，我们都应该将webapck安装到当前的项目依赖中，此时就可以使用项目的本这样就可以使用项目本地版本的 Webpack。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 确保已经进入项目目录
# 确定已经有 package.json，没有就通过
npm init 
# 创建，直接一路回车就好，后面再来详细说里面的内容。
# 安装 webpack 依赖

npm install webpack --save-dev
# 简单的写法：-_-,缩写形式 
npm i webpack -D
# –save：模块名将被添加到dependencies，可以简化为参数-S。
# –save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code class="sh"><span class="hljs-meta"># 确保已经进入项目目录</span>
<span class="hljs-meta"># 确定已经有 package.json，没有就通过</span>
npm init 
<span class="hljs-meta"># 创建，直接一路回车就好，后面再来详细说里面的内容。</span>
<span class="hljs-meta"># 安装 webpack 依赖</span>

npm install webpack --save-dev
<span class="hljs-meta"># 简单的写法：-_-,缩写形式 </span>
npm i webpack -D
<span class="hljs-meta"># –save：模块名将被添加到dependencies，可以简化为参数-S。</span>
<span class="hljs-meta"># –save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。</span>
</code></pre>
<p>安装好之后我们的<code>package.json</code>的目录应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;first-demo&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;this is my first-demo&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;guowenfh&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;dependencies&quot;: {},
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^1.12.14&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"first-demo"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"this is my first-demo"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"guowenfh"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"dependencies"</span>: {},
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.12.14"</span>
  }
}
</code></pre>
<p>既然环境都已经安装好了，那么我们就开始来用webpack进行我们的第一个打包运行程序吧！</p>
<p>首先创建一个静态页面 <code>index.html</code> 和一个 JS 入口文件 <code>entry.js</code>,（这里你想用什么名字都可以，只需要在打包的时候读取文件为该名字就好，不过，到时候就知道这个名字的含义啦！）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
</head>
<body>
    <h1 id=&quot;app&quot;></h1>
    <script src=&quot;bundle.js&quot;></script>
    <!-- 注意这里引入的不是我们创建的文件，而是用webpack生成的文件 -->
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 注意这里引入的不是我们创建的文件，而是用webpack生成的文件 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** entry.js ***/
document.getElementById('app').innerHTML=&quot;这是我第一个打包成功的程序&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*** entry.js ***/</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).innerHTML=<span class="hljs-string">"这是我第一个打包成功的程序"</span>;</code></pre>
<p>文件都已经创建成功了，那么就开始我们的打包吧！</p>
<p><code>webpack entry.js bundle.js</code></p>
<p>在浏览器中打开<code>index.html</code>，就能看到我们设置的文字啦！：<strong>这是我第一个打包成功的程序</strong></p>
<p>这么简单的功能直接在html中引入不就好了吗？确实是这样的，不过我们这才刚刚开始嘛，不要急。</p>
<p>下面我们再来增加一个文件，名为<code>first.js</code>内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var h2= document.createElement(&quot;h2&quot;)
h2.innerHTML=&quot;不是吧，那么快第二个打包程序啦！&quot;;
document.body.appendChild(h2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> h2= <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"h2"</span>)
h2.innerHTML=<span class="hljs-string">"不是吧，那么快第二个打包程序啦！"</span>;
<span class="hljs-built_in">document</span>.body.appendChild(h2);</code></pre>
<p>更改 <code>entry.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('app').innerHTML=&quot;这是我第一个打包成功的程序&quot;;
//添加
require(&quot;./first.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).innerHTML=<span class="hljs-string">"这是我第一个打包成功的程序"</span>;
<span class="hljs-comment">//添加</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./first.js"</span>);</code></pre>
<p>再来进行一次重复的工作，再打包一次。<code>webpack entry.js bundle.js</code>，如果成功，打包过程会显示日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hash: b1cfe7ff9d75ce235dc9
Version: webpack 1.12.14
Time: 54ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.82 kB       0  [emitted]  main
   [0] ./entry.js 208 bytes {0} [built]
   [1] ./first.js 145 bytes {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code class="sh">Hash: b1cfe7ff9d75ce235dc9
Version: webpack 1.12.14
<span class="hljs-keyword">Time:</span> 54ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.82 kB       0  [emitted]  main
   [0] ./entry.js 208 bytes {0} [built]
   [1] ./first.js 145 bytes {0} [built]</code></pre>
<p><code>Webpack</code> 会分析入口文件，<strong>解析包含依赖关系的各个文件</strong>。这些文件（模块）都打包到 <code>bundle.js</code> 。<code>Webpack</code> 会给每个模块分配一个唯一的 <code>id</code> 并通过这个 <code>id</code> 索引和访问模块。在页面启动时，会先执行 <code>entry.js</code> 中的代码，其它模块会在运行 <code>require</code> 的时候再执行。</p>
<p>刷新浏览器，可以发现我们的刚刚的代码已经生效，又有了新的文字出现。</p>
<p>好吧，我知道这么简单的你们不屑于看，等下我们升个级。</p>
<blockquote><p>下面是参考文档，也相当于一个汇总吧，有很多我还没实践到，还是可以多看看，好文章应该贴出来</p></blockquote>
<ul>
<li><p><a href="http://www.hubwiz.com/course/5670d0a77e7d40946afc5e65/" rel="nofollow noreferrer" target="_blank">webpack入门 - 汇智网</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002552008">Webpack 怎么用</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002551952" target="_blank">Webpack 入门指迷</a></p></li>
<li><p><a href="https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-1.md" rel="nofollow noreferrer" target="_blank">Webpack傻瓜式指南（一）</a></p></li>
<li><p><a href="https://github.com/vikingmute/webpack-for-fools/blob/master/entries/chapter-2.md" rel="nofollow noreferrer" target="_blank">Webpack傻瓜式指南（二）</a></p></li>
<li><p><a href="http://jiongks.name/blog/just-vue/" rel="nofollow noreferrer" target="_blank">Vue + webpack 项目实践</a></p></li>
<li><p><a href="http://www.w3ctech.com/topic/1557" rel="nofollow noreferrer" target="_blank">webpack 入门及实践</a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/#nodejs" rel="nofollow noreferrer" target="_blank">JavaScript 标准参考教程（alpha）--Node.js</a></p></li>
<li><p><a href="https://github.com/ruanyf/webpack-demos" rel="nofollow noreferrer" target="_blank">应该是最好懂的Webpack教程---阮一峰</a> 还没敲呢，应该全部敲一遍的。</p></li>
<li><p><a href="http://www.h-simon.com/42/" rel="nofollow noreferrer" target="_blank">webpack常用配置总结</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004505747">Express结合Webpack的全栈自动刷新</a></p></li>
<li><p><a href="http://cn.vuejs.org/guide/" rel="nofollow noreferrer" target="_blank">Vue.js官方教程</a></p></li>
<li><p><a href="http://vuejs.github.io/vue-router/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router文档</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack入坑之旅（一）不是开始的开始

## 原文链接
[https://segmentfault.com/a/1190000004690338](https://segmentfault.com/a/1190000004690338)

