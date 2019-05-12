---
title: '记一次vue开发环境搭建' 
date: 2018-12-28 2:30:11
hidden: true
slug: 6i75j4xu08m
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011657386?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000011657386?w=200&amp;h=200" alt="vue logo" title="vue logo" style="cursor: pointer; display: inline;"></span></p>
<p>今天想了解一下vue开发相关的东西，就动手搭建了一些开发环境。<br>下面是我安装和配置的相关过程。（Mac系统）</p>
<h3 id="articleHeader0">下载安装<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">nodejs 6.11.4 (包含 npm 3.10.10)</a>
</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011657387?w=600&amp;h=218" src="https://static.alili.tech/img/remote/1460000011657387?w=600&amp;h=218" alt="Download installer" title="Download installer" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成后，命令行升级一下npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install npm@latest -g
$ npm -v
5.5.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> install <span class="hljs-built_in">npm</span>@latest -g
$ <span class="hljs-built_in">npm</span> -v
<span class="hljs-number">5.5</span><span class="hljs-number">.1</span></code></pre>
<p>权限设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm config get prefix
/usr/local
$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>$ npm config get prefix
/usr/local
$ sudo chown -R $(whoami) $(npm config get prefix)/{<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node_modules</span>,<span class="hljs-title">bin</span>,<span class="hljs-title">share</span>}</span></code></pre>
<p><code>npm config get prefix</code>是用来找到<code>npm</code>的目录<br><code>sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}</code>给当前用户读写<code>npm</code>相关目录的权限。</p>
<h3 id="articleHeader1">安装webpack和vue-cli</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack -g
$ npm install vue-cli -g

$ npm list -g --depth=0
/usr/local/lib
├── create-react-native-app@1.0.0
├── es-checker@1.4.1
├── npm@5.5.1
├── vue-cli@2.9.1
└── webpack@3.8.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>$ npm install webpack -g
$ npm install vue-cli -g

$ npm <span class="hljs-type">list</span> -g --depth=<span class="hljs-number">0</span>
/usr/local/lib
├── create-react-native-app@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
├── es-checker@<span class="hljs-number">1.4</span><span class="hljs-number">.1</span>
├── npm@<span class="hljs-number">5.5</span><span class="hljs-number">.1</span>
├── vue-cli@<span class="hljs-number">2.9</span><span class="hljs-number">.1</span>
└── webpack@<span class="hljs-number">3.8</span><span class="hljs-number">.1</span></code></pre>
<h3 id="articleHeader2">创建工程</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd your_workspace_folder
$ vue init webpack projectname" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd your_workspace_folder
<span class="hljs-variable">$ </span>vue init webpack projectname</code></pre>
<p>比如我的工程名为<code>vueStart</code>，输入的地方没有什么需求直接回车就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init webpack-simple vueStart

? Project name vuestart
? Project description A Vue.js project
? Author tomfriwel <xxx@xx.com>
? Use sass? No

   vue-cli · Generated &quot;vueStart&quot;.

   To get started:
   
     cd vueStart
     npm install
     npm run dev." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>$ vue init webpack-simple vueStart

? Project name vuestart
? Project description A Vue.js project
? Author tomfriwel &lt;xxx@xx.com&gt;
? <span class="hljs-keyword">Use</span> sass? <span class="hljs-keyword">No</span>

   vue-<span class="hljs-keyword">cli</span> · Generated <span class="hljs-string">"vueStart"</span>.

   To get started:
   
     <span class="hljs-keyword">cd</span> vueStart
     npm install
     npm <span class="hljs-keyword">run</span> dev.</code></pre>
<p>这里注意的是，如果用<code>vue init webpack-simple projectname</code>，之后<code>npm run dev</code>是运不起来的。所以这里用的<code>webpack</code>而不是<code>webpack-simple</code></p>
<p>这里的<code>vue init webpack</code>和<code>npm install webpack</code>不一样<br><code>vue init webpack</code>是安装<code>webpack</code>模板（也可以是以下列出的一些模板<code>webpack-simple/browserify...</code>）<br>具体信息可以查看<a href="https://github.com/vuejs-templates" rel="nofollow noreferrer" target="_blank">vuejs-templates</a>/<strong><a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a></strong></p>
<p>一些可用的模板</p>
<ul>
<li>
<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>&nbsp;- A full-featured Webpack + vue-loader setup with hot reload, linting, testing &amp; css extraction.</li>
<li>
<a href="https://github.com/vuejs-templates/webpack-simple" rel="nofollow noreferrer" target="_blank">webpack-simple</a>&nbsp;- A simple Webpack + vue-loader setup for quick prototyping.</li>
<li>
<a href="https://github.com/vuejs-templates/browserify" rel="nofollow noreferrer" target="_blank">browserify</a>&nbsp;- A full-featured Browserify + vueify setup with hot-reload, linting &amp; unit testing.</li>
<li>
<a href="https://github.com/vuejs-templates/browserify-simple" rel="nofollow noreferrer" target="_blank">browserify-simple</a>&nbsp;- A simple Browserify + vueify setup for quick prototyping.</li>
<li>
<a href="https://github.com/vuejs-templates/pwa" rel="nofollow noreferrer" target="_blank">pwa</a>&nbsp;- PWA template for vue-cli based on the webpack template</li>
<li>
<a href="https://github.com/vuejs-templates/simple" rel="nofollow noreferrer" target="_blank">simple</a>&nbsp;- The simplest possible Vue setup in a single HTML file</li>
</ul>
<h3 id="articleHeader3">配置工程</h3>
<p>进入创建的工程目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd vueStart/
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd vueStart/
<span class="hljs-variable">$ </span>npm install</code></pre>
<p><code>npm install</code>后就会安装一些乱七八糟的东西。</p>
<p>安装 vue 路由模块<code>vue-router</code>和网络请求模块<code>vue-resource</code>，这两个如果用不到也可以不用装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install vue-router vue-resource --save
+ vue-resource@1.3.4
+ vue-router@3.0.1
added 17 packages in 6.541s" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>$ npm install vue-router vue-resource --save
+ vue-resource@<span class="hljs-number">1.3</span><span class="hljs-number">.4</span>
+ vue-router@<span class="hljs-number">3.0</span><span class="hljs-number">.1</span>
added <span class="hljs-number">17</span> packages in <span class="hljs-number">6.541</span>s</code></pre>
<p><code>--save</code>的作用<br><span class="img-wrap"><img data-src="/img/remote/1460000011657388?w=624&amp;h=252" src="https://static.alili.tech/img/remote/1460000011657388?w=624&amp;h=252" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">运行和构建</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>没什么问题的话，打开页面是这样的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011657389?w=600&amp;h=603" src="https://static.alili.tech/img/remote/1460000011657389?w=600&amp;h=603" alt="Welcome" title="Welcome" style="cursor: pointer;"></span></p>
<p>对<code>.vue</code>更改后，页面也会自动更新，挺方便的。</p>
<h3 id="articleHeader5">开始编写</h3>
<p><code>src</code>文件夹目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
├── App.vue
├── assets
│&nbsp;&nbsp; └── logo.png
├── components
│&nbsp;&nbsp; └── HelloWorld.vue
└── main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src
├── App<span class="hljs-selector-class">.vue</span>
├── assets
│&nbsp;&nbsp; └── logo<span class="hljs-selector-class">.png</span>
├── components
│&nbsp;&nbsp; └── HelloWorld<span class="hljs-selector-class">.vue</span>
└── main.js</code></pre>
<p>这里<code>App.vue</code>引用了一个叫<code>HelloWorld</code>的组件。我们对<code>HelloWorld</code>组件进行更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'First modify.'
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'First modify.'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>保存后<br><span class="img-wrap"><img data-src="/img/remote/1460000011658152?w=600&amp;h=658" src="https://static.alili.tech/img/remote/1460000011658152?w=600&amp;h=658" alt="First modify." title="First modify." style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">发布</h3>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>完成后会生成一个<code>dist</code>文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist
├── index.html
└── static
    ├── css
    │   └── app.86d25fd679f2d9f5bee9162ae7804b46.css
    └── js
        ├── app.bcbf2665a80fe0bdc316.js
        ├── app.bcbf2665a80fe0bdc316.js.map
        ├── manifest.f9cc8df0a9bc12617260.js
        ├── manifest.f9cc8df0a9bc12617260.js.map
        ├── vendor.5edf78e409459ac3ccd1.js
        └── vendor.5edf78e409459ac3ccd1.js.map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>dist
├── index<span class="hljs-selector-class">.html</span>
└── static
    ├── css
    │   └── app.<span class="hljs-number">86</span>d25fd679f2d9f5bee9162ae7804b46<span class="hljs-selector-class">.css</span>
    └── js
        ├── app<span class="hljs-selector-class">.bcbf2665a80fe0bdc316</span><span class="hljs-selector-class">.js</span>
        ├── app<span class="hljs-selector-class">.bcbf2665a80fe0bdc316</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
        ├── manifest<span class="hljs-selector-class">.f9cc8df0a9bc12617260</span><span class="hljs-selector-class">.js</span>
        ├── manifest<span class="hljs-selector-class">.f9cc8df0a9bc12617260</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
        ├── vendor.<span class="hljs-number">5</span>edf78e409459ac3ccd1<span class="hljs-selector-class">.js</span>
        └── vendor.<span class="hljs-number">5</span>edf78e409459ac3ccd1<span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span></code></pre>
<p>如果是想本地运行而不是放到服务器上，需要对<code>config/index.js</code>进行一个小更改。将<code>build</code>中的<code>assetsPublicPath</code>改为<code>./</code>，不然会找不到资源，最后再次<code>npm run build</code>，就可以直接浏览器打开<code>dist</code>文件夹下的<code>index.html</code>了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011658436?w=600&amp;h=296" src="https://static.alili.tech/img/remote/1460000011658436?w=600&amp;h=296" alt="ERR" title="ERR" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>...

module.exports = {
  build: {
    <span class="hljs-keyword">en</span><span class="hljs-variable">v:</span> require(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-built_in">index</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    assetsRoo<span class="hljs-variable">t:</span> path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../dist'</span>),
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'./'</span>,
    productionSourceMap: true,

...</code></pre>
<h3 id="articleHeader7">Tips</h3>
<p><code>npm run build</code>和<code>npm run dev</code>其实是运行的<code>package.json</code>里<code>scripts</code>的对应的脚本。例如我的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...

 &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  },

  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  ...

 <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  },

  ...</code></pre>
<p>可以自己测试一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...

 &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;test&quot;: &quot;echo 123&quot;
  },

  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  ...

 <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo 123"</span>
  },

  ...</code></pre>
<p>然后运行<code>npm run test</code>看看结果。</p>
<h3 id="articleHeader8">相关参考</h3>
<p><a href="https://docs.npmjs.com/getting-started/installing-node" rel="nofollow noreferrer" target="_blank">Installing Node.js and updating npm</a><br><a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions" rel="nofollow noreferrer" target="_blank">Fixing npm permissions</a><br><a href="http://www.jianshu.com/p/5ba253651c3b" rel="nofollow noreferrer" target="_blank">Vue2.0 新手完全填坑攻略——从环境搭建到发布</a><br><a href="https://stackoverflow.com/a/35849725/6279975" rel="nofollow noreferrer" target="_blank">What is the --save option for npm install?</a><br><a href="http://www.cnblogs.com/wisewrong/p/6255817.html" rel="nofollow noreferrer" target="_blank">Vue 爬坑之路（一）—— 使用 vue-cli 搭建项目</a><br><a href="http://blog.csdn.net/lollipop94/article/details/78295315" rel="nofollow noreferrer" target="_blank">基于vue-cli快速构建</a><br><a href="http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html" rel="nofollow noreferrer" target="_blank">npm scripts 使用指南</a><br><a href="https://github.com/vuejs" rel="nofollow noreferrer" target="_blank">vuejs</a>/<strong><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次vue开发环境搭建

## 原文链接
[https://segmentfault.com/a/1190000011657381](https://segmentfault.com/a/1190000011657381)

