---
title: 'Vue CLI 3.x 简单体验' 
date: 2018-12-15 2:30:11
hidden: true
slug: w7gqaskv96s
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">文档</h2>
<p><a href="https://github.com/toBeTheLight/vue-cli-3.x-doc-cn/blob/dev/README.md" rel="nofollow noreferrer" target="_blank">中文文档</a>  <em>补充于02月10日</em></p>
<p>vue脚手架的3.x版本已经在开发中，现在还处于alpha版本。<br>我们来看看有哪些变化。</p>
<h2 id="articleHeader1">使用</h2>
<p><code>npm install -g @vue/cli</code></p>
<p>命名方式已经改为npm推荐的新的包名规则，使用作用域。详情可查看<a href="http://zcfy.cc/article/the-npm-blog-new-package-moniker-rules" rel="nofollow noreferrer" target="_blank">此文章</a>。</p>
<h2 id="articleHeader2">命令变化</h2>
<p><code>vue -h</code>  <br>我们看到</p>
<ol>
<li>
<code>create [options] &lt;app-name&gt;</code> 创建一个由vue-cli-service支持的新项目</li>
<li>
<code>invoke &lt;plugin&gt;</code> 在已创建的项目中添加插件</li>
<li>
<code>serve [options] [entry]</code> 在开发者模式下以零配置运行一个js或vue文件</li>
<li>
<code>build [options] [entry]</code> 在生产模式下以零配置构建一个js或vue文件</li>
<li>
<code>init &lt;template&gt; &lt;app-name&gt;</code>   旧api 需要@vue/cli-init // 就是原来的<code>vue-cli init &lt;template&gt; &lt;app-name&gt;</code>
</li>
</ol>
<p><em>中文是我加的</em>  <br><em>说到零配置，可以看看这个<a href="http://www.itbaby.me/doc/parcel/" rel="nofollow noreferrer" target="_blank">Parcel</a>，生态还不完善，零配置的缺点就是不够自由。</em></p>
<p>那么vue-cli-service是什么？这个几个新的命令有是什么？<br>我们先试着创建一个项目。</p>
<h2 id="articleHeader3">初始化模板</h2>
<p><code>vue create my-project</code><br>这个时候会进入选项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="? Please pick a preset:
> default (babel, eslint)
> Manually select features //手动选择功能" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>? Please pick a preset:
&gt; <span class="hljs-keyword">default</span> (babel, eslint)
&gt; Manually <span class="hljs-keyword">select</span> features <span class="hljs-comment">//手动选择功能</span></code></pre>
<p>我们选择default走向</p>
<h4>default路线</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pick the package manager to use when installing dependencies: //用哪个下载依赖
> Use Yarn
  Use NPM" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>Pick the <span class="hljs-keyword">package</span> manager <span class="hljs-keyword">to</span> <span class="hljs-keyword">use</span> <span class="hljs-keyword">when</span> installing dependencies: //用哪个下载依赖
&gt; <span class="hljs-keyword">Use</span> Yarn
  <span class="hljs-keyword">Use</span> NPM</code></pre>
<p>// 现在的顺序是Yarn在第一位的<br>因为没有装Yarn，所以使用NPM</p>
<p>然后出现提示，进入安装过程</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue CLI v3.0.0-alpha.5
✨  Creating project in E:\git\note\my-project. // 创建项目
�  Initializing git repository... // 初始化git库
⚙  Installing CLI plugins. This might take a while... // 安装脚手架插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>Vue <span class="hljs-keyword">CLI</span> v3.0.0-<span class="hljs-keyword">alpha</span>.5
✨  Creating project <span class="hljs-keyword">in</span> <span class="hljs-keyword">E</span>:\git\<span class="hljs-keyword">note</span>\my-project. <span class="hljs-comment">// 创建项目</span>
�  Initializing git repository... <span class="hljs-comment">// 初始化git库</span>
⚙  Installing <span class="hljs-keyword">CLI</span> plugins. This might take a <span class="hljs-keyword">while</span>... <span class="hljs-comment">// 安装脚手架插件</span></code></pre>
<p><em>提示里多了些符号，气氛变得活泼起来。</em></p>
<p>其实这个过程中还会判断你对npm/yarn源的连接速度，询问你是否切换至淘宝镜像</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Your connection to the the default npm registry seems to be slow.
 Use https://registry.npm.taobao.org for faster installation? " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> Your connection <span class="hljs-built_in">to</span> <span class="hljs-keyword">the</span> <span class="hljs-keyword">the</span> default npm registry seems <span class="hljs-built_in">to</span> be slow.
 Use <span class="hljs-keyword">https</span>://registry.npm.taobao.org <span class="hljs-keyword">for</span> faster installation? </code></pre>
<p>完成之后我们可以看到除node_modules之外的目录结构变成了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  package-lock.json
│  package.json
├─public
│      favicon.ico
│      index.html
└─src
    │  App.vue
    │  main.js
    ├─assets
    │      logo.png
    └─components
            HelloWorld.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  package-lock<span class="hljs-selector-class">.json</span>
│  package<span class="hljs-selector-class">.json</span>
├─public
│      favicon<span class="hljs-selector-class">.ico</span>
│      index<span class="hljs-selector-class">.html</span>
└─src
    │  App<span class="hljs-selector-class">.vue</span>
    │  main<span class="hljs-selector-class">.js</span>
    ├─assets
    │      logo<span class="hljs-selector-class">.png</span>
    └─components
            HelloWorld.vue</code></pre>
<p>build哪里去了？config哪里去了？配置都消失了？</p>
<p>我们观察一下npm脚本命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;serve&quot;: &quot;vue-cli-service serve&quot;,
  &quot;build&quot;: &quot;vue-cli-service build&quot;,
  &quot;lint&quot;: &quot;vue-cli-service lint&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">"serve"</span>: <span class="hljs-string">"vue-cli-service serve"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"vue-cli-service build"</span>,
  <span class="hljs-string">"lint"</span>: <span class="hljs-string">"vue-cli-service lint"</span></code></pre>
<p>现在是依靠vue-cli-service来运行的。那么那些配置应该就在vue-cli-service当中（所谓零配置），所以vue-cli-service应该是起的一个服务。</p>
<h4>自定义路线</h4>
<p>我们选择<code>Manually select features</code>之后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 ( ) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>? <span class="hljs-selector-tag">Check</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">features</span> <span class="hljs-selector-tag">needed</span> <span class="hljs-selector-tag">for</span> <span class="hljs-selector-tag">your</span> <span class="hljs-selector-tag">project</span>: (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)
&gt;( ) <span class="hljs-selector-tag">TypeScript</span>
 ( ) <span class="hljs-selector-tag">Progressive</span> <span class="hljs-selector-tag">Web</span> <span class="hljs-selector-tag">App</span> (PWA) <span class="hljs-selector-tag">Support</span>
 ( ) <span class="hljs-selector-tag">Router</span>
 ( ) <span class="hljs-selector-tag">Vuex</span>
 ( ) <span class="hljs-selector-tag">CSS</span> <span class="hljs-selector-tag">Pre-processors</span>
 ( ) <span class="hljs-selector-tag">Linter</span> / <span class="hljs-selector-tag">Formatter</span>
 ( ) <span class="hljs-selector-tag">Unit</span> <span class="hljs-selector-tag">Testing</span>
 ( ) <span class="hljs-selector-tag">E2E</span> <span class="hljs-selector-tag">Testing</span></code></pre>
<p>看到可以自由组合现在所需的功能了。<br>创建的过程中会询问配置文件保存位置是config.js还是package.json，但是其中也是一些简单的配置。</p>
<h2 id="articleHeader4">vue-cli-service功能</h2>
<p>vue-cli-service应该还提供了一些没说明的用法<br>这部分会持续更新</p>
<h4>生成 web components 规范的组件代码</h4>
<p>配置npm 脚本<code>"build:components": "vue-cli-service build --target wc-async **/*.vue"</code></p>
<blockquote>可以直接把 Vue 的组件代码生成 web components 规范的组件代码，不过要记得 web components 的规范里组件名中是必须有横线的，所以使用 app 这样的组件名会导致构建失败<br><em>来自<a href="https://weibo.com/1712131295/G1D1L91Mb?type=comment#_rnd1518018187403" rel="nofollow noreferrer" target="_blank">勾三股四微博</a></em>
</blockquote>
<h2 id="articleHeader5">变化</h2>
<ol>
<li>可以看到以前繁琐的配置文件不见了，变成了一种约定大于配置的状态（查看issues，其实还是能配置的，需要创建vue.config.js文件），根据命令行描述和文档说明是可以在此基础上配置其他各种插件的，但是我没有深入研究。</li>
<li>文档中有提到<code>It automatically infers the entry file in the current directory</code>，所以我尝试着添加过个html文件看是否能达到直接变成多页面应用，没有成功，可能还有其他方法。</li>
<li>添加了对npm源的连接速度的判断</li>
</ol>
<h2 id="articleHeader6">后话</h2>
<p>vue-cli还在开发当中，文档还没完成，创建完项目根据配置不同还是存在一些问题的，大家可以去<a href="https://github.com/vuejs/vue-cli/issues/589" rel="nofollow noreferrer" target="_blank">讨论</a>并提出你的想法，参与pr，去拿contribution吧。</p>
<hr>
<p>更新于02月07日beta版要发版了，下周应该会有官方文档出来</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue CLI 3.x 简单体验

## 原文链接
[https://segmentfault.com/a/1190000013090943](https://segmentfault.com/a/1190000013090943)

