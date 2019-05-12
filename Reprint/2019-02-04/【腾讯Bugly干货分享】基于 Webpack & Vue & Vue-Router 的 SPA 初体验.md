---
title: '【腾讯Bugly干货分享】基于 Webpack & Vue & Vue-Router 的 SPA 初体验' 
date: 2019-02-04 2:30:57
hidden: true
slug: 2yauwz5gabi
categories: [reprint]
---

{{< raw >}}

                    
<p>本文来自于<a href="https://bugly.qq.com/" rel="nofollow noreferrer" target="_blank">腾讯bugly开发者社区</a>，非经作者同意，请勿转载，原文地址：<a href="http://dev.qq.com/topic/57d13a57132ff21c38110186" rel="nofollow noreferrer" target="_blank">http://dev.qq.com/topic/57d13...</a></p>
<h2 id="articleHeader0">导语</h2>
<p>最近这几年的前端圈子，由于戏台一般精彩纷呈，从 MVC 到 MVVM，你刚唱罢我登场。 backbone，angularjs 已成昨日黄花，reactjs 如日中天，同时另一更轻量的 vue 发展势头更猛，尤其是即将 release 的2.0版本，号称兼具了 angularjs 和 reactjs 的两者优点。不过现在的官方版本还是1.0 ，下面就是基于1.0版本的初体验。</p>
<h2 id="articleHeader1">1. 为什么要 SPA？</h2>
<p><strong>SPA：</strong> 就是俗称的单页应用（Single Page Web Application）。</p>
<p>在移动端，特别是 hybrid 方式的H5应用中，性能问题一直是痛点。 使用 SPA，没有页面切换，就没有白屏阻塞，可以大大提高 H5 的性能，达到接近原生的流畅体验。</p>
<h2 id="articleHeader2">2. 为什么选择 vue？</h2>
<p>在选择 vue 之前，使用 reactjs 也做过一个小 Demo，虽然两者都是面向组件的开发思路，但是 reactjs 的全家桶方式，实在太过强势，而自己定义的 JSX 规范，揉和在 JS 的组件框架里，导致如果后期发生页面改版工作，工作量将会巨大。</p>
<p>vue 相对来说，就轻量的多，他的view层，还是原来的 dom 结构，除了一些自定义的 vue 指令作为自定义标签以外，只要学会写组件就可以了，学习成本也比较低。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883376?w=598&amp;h=315" src="https://static.alili.tech/img/remote/1460000006883376?w=598&amp;h=315" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">3. 环境配置</h2>
<p>初始化工程，需要 node 环境使用 npm 安装相应的依赖包。</p>
<p>先创建一个测试目录，在里面依次输入以下命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//初始化package.json
npm init

//安装vue的依赖
npm install vue --save
npm install vue-router --save

//安装webpack的开发依赖
npm install webpack --save-dev

//安装babel的ES6 Loader 的开发依赖
npm install babel --save-dev
npm install babel-core --save-dev
npm install babel-loader --save-dev
npm install babel-preset-es2015 --save-dev

//安装html loacer 的开发依赖
npm install html-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-comment">//初始化package.json</span>
npm init

<span class="hljs-comment">//安装vue的依赖</span>
npm install vue --<span class="hljs-built_in">save</span>
npm install vue-router --<span class="hljs-built_in">save</span>

<span class="hljs-comment">//安装webpack的开发依赖</span>
npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>

<span class="hljs-comment">//安装babel的ES6 Loader 的开发依赖</span>
npm install babel --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm install babel-core --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm install babel-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm install babel-preset-es2015 --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>

<span class="hljs-comment">//安装html loacer 的开发依赖</span>
npm install html-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h2 id="articleHeader4">4. 目录结构</h2>
<p>src 为开发目录，其中 components 为组件子目录，templates 为模板子目录。</p>
<p>dist 为构建出的文件目录。</p>
<p>index.html 为入口文件。</p>
<p>package.json 为项目描述文件，是刚才 npm init 所建立。 </p>
<p>webpack.config.js 是 webpack 的构建配置文件</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883377?w=223&amp;h=420" src="https://static.alili.tech/img/remote/1460000006883377?w=223&amp;h=420" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">5. Webpack 配置</h2>
<p>下面是 webpack 的配置文件，如何使用 webpack，请移步 webpack 的官网。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack= require(&quot;webpack&quot;);

module.exports={
    entry:{
        bundle:[ &quot;./src/app.js&quot;]
    },
    output:{
        path:__dirname,
        publicPath:&quot;/&quot;,
        filename:&quot;dist/[name].js&quot;
    },
    module:{
        loaders:[
            {test: /\.html$/, loaders: ['html']},
            {test: /(\.js)$/, loader:[&quot;babel&quot;] ,exclude:/node_modules/, 
             query:{
                     presets:[&quot;es2015&quot;]
             }
            }
        ]
    },
    resolve:{
    },
    plugins:[
         /* 
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
               */
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">webpack=</span> <span class="hljs-string">require("webpack");</span>

<span class="hljs-string">module.exports={</span>
<span class="hljs-attr">    entry:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        bundle:</span><span class="hljs-string">[</span> <span class="hljs-string">"./src/app.js"</span><span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    output:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span><span class="hljs-string">__dirname,</span>
<span class="hljs-attr">        publicPath:</span><span class="hljs-string">"/"</span><span class="hljs-string">,</span>
<span class="hljs-attr">        filename:</span><span class="hljs-string">"dist/[name].js"</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    module:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        loaders:</span><span class="hljs-string">[</span>
            <span class="hljs-string">{test:</span> <span class="hljs-string">/\.html$/,</span> <span class="hljs-attr">loaders:</span> <span class="hljs-string">['html']},</span>
            <span class="hljs-string">{test:</span> <span class="hljs-string">/(\.js)$/,</span> <span class="hljs-attr">loader:["babel"]</span> <span class="hljs-string">,exclude:/node_modules/,</span> 
<span class="hljs-attr">             query:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                     presets:</span><span class="hljs-string">["es2015"]</span>
             <span class="hljs-string">}</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    resolve:</span><span class="hljs-string">{</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    plugins:</span><span class="hljs-string">[</span>
         <span class="hljs-string">/*</span> 
         <span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">            compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                warnings:</span> <span class="hljs-literal">false</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">})</span>
               <span class="hljs-string">*/</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">}</span></code></pre>
<h2 id="articleHeader6">6. 入口文件</h2>
<p><strong>index.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Vue Router Demo</title>
</head>
<body>
   <div id=&quot;app&quot;>
      <router-view></router-view>
    </div>
    <script src=&quot;dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue Router Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>其中 id 为 app 的 div 是页面容器，其中的 router-view 会由 vue-router 去渲染组件，讲结果挂载到这个 div 上。 </p>
<p><strong>app.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
Vue.config.debug = true;
Vue.config.delimiters = ['${', '}']; // 把默认的"{{" "}}" 改成ES6的模板字符串 ${ }
Vue.config.devtools = true;

var App = Vue.extend({});
var router = new VueRouter({});

router.map(require('./routes'));
router.start(App, '#app');
router.go({&quot;path&quot;:&quot;/&quot;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> Vue = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-router'</span>);

Vue.<span class="hljs-keyword">use</span>(VueRouter);
Vue.config.debug = <span class="hljs-keyword">true</span>;
Vue.config.delimiters = [<span class="hljs-string">'${'</span>, <span class="hljs-string">'}'</span>]; <span class="hljs-comment">// 把默认的"{{" "}}" 改成ES6的模板字符串 ${ }</span>
Vue.config.devtools = <span class="hljs-keyword">true</span>;

<span class="hljs-keyword">var</span> App = Vue.extend({});
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({});

router.map(<span class="hljs-keyword">require</span>(<span class="hljs-string">'./routes'</span>));
router.start(App, <span class="hljs-string">'#app'</span>);
router.go({<span class="hljs-string">"path"</span>:<span class="hljs-string">"/"</span>});</code></pre>
<p>这是 vue 路由的配置。 其中由于习惯问题，我把 vue 默认的"{{" "}}" 改成了的 ${ }  ,总感觉这样看模板，才顺眼一些。 </p>
<p><strong>routes.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  '/': {
    component: require('./components/index')
  },
   '/list': {
    component: require('./components/list')
  },
  '*': {
    component: require('./components/notFound')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">'/'</span>: {
    component: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/index'</span>)
  },
   <span class="hljs-string">'/list'</span>: {
    component: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/list'</span>)
  },
  <span class="hljs-string">'*'</span>: {
    component: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/notFound'</span>)
  }
}</code></pre>
<h2 id="articleHeader7">7. 第一个组件</h2>
<p><strong>components/index.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: require('../templates/index.html'),

  ready: function () {
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/index.html'</span>),

  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  }
};</code></pre>
<p><strong>templates/index.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>Index</h1>
<hr/>
<p>Hello World Index!</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello World Index!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p><strong>执行 webpack 构建命令</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883378?w=428&amp;h=127" src="https://static.alili.tech/img/remote/1460000006883378?w=428&amp;h=127" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>浏览器中访问：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883379?w=419&amp;h=160" src="https://static.alili.tech/img/remote/1460000006883379?w=419&amp;h=160" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>查看 bundle 源码：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883380?w=821&amp;h=340" src="https://static.alili.tech/img/remote/1460000006883380?w=821&amp;h=340" alt="" title="" style="cursor: pointer;"></span></p>
<p>发现 template 模板文件，已经被 webpack 打成字符串了。这其中，其实是 webpack 的 html-loader 起的作用</p>
<h2 id="articleHeader8">8. 组件之间跳转</h2>
<p>修改刚才的 index 组件，增加一个跳转链接，不用 href 了，要用 vue 的指令 v-link。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>Index</h1>
<hr/>
<p>Hello World Index!</p>
<p><a v-link=&quot;{path:'/list'}&quot; >List Page</a></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello World Index!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{path:'/list'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> &gt;</span>List Page<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>添加 list 组件</p>
<p><strong>components/list.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: require('../templates/list.html'),

  data:function(){
      return {items:[{&quot;id&quot;:1,&quot;name&quot;:&quot;hello11&quot;},{&quot;id&quot;:2,&quot;name&quot;:&quot;hello22&quot;}]};
  },
  ready: function () {
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/list.html'</span>),

  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">items</span>:[{<span class="hljs-string">"id"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello11"</span>},{<span class="hljs-string">"id"</span>:<span class="hljs-number">2</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello22"</span>}]};
  },
  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  }
};</code></pre>
<p><strong>templates/list.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>List</h1>
<hr/>

<p>Hello List Page!</p>
<ul>
    <li v-for=&quot;(index,item) in items&quot;>
         ${item.id} : ${item.name}
    </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>List<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello List Page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(index,item) in items"</span>&gt;</span>
         $</span><span class="hljs-template-variable">{item.id}</span><span class="xml"> : $</span><span class="hljs-template-variable">{item.name}</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>v-for 也是 vue 的默认指令，是用来循环数据列表的。</p>
<p>现在开始执行 webpack --watch 命令进行监听，这样就不用每次敲 webpack 命令了。只要开发者每次修改 js 点了保存，webpack 都会自动构建最新的 bundle 文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883381?w=401&amp;h=114" src="https://static.alili.tech/img/remote/1460000006883381?w=401&amp;h=114" alt="" title="" style="cursor: pointer;"></span></p>
<p>浏览器里试试看：</p>
<p><strong>index 页</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883382?w=374&amp;h=183" src="https://static.alili.tech/img/remote/1460000006883382?w=374&amp;h=183" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>点击 List Page 跳转到 list 页</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883383?w=372&amp;h=203" src="https://static.alili.tech/img/remote/1460000006883383?w=372&amp;h=203" alt="" title="" style="cursor: pointer;"></span></p>
<p>Bingo！ 单页面两个组件之间跳转切换成功！</p>
<h2 id="articleHeader9">9. 组件生命周期</h2>
<p>修改 <strong>componets/list.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: require('../templates/list.html'),

  data:function(){
      return {items:[{&quot;id&quot;:1,&quot;name&quot;:&quot;hello11&quot;},{&quot;id&quot;:2,&quot;name&quot;:&quot;hello22&quot;}]};
  },
  
  //在实例开始初始化时同步调用。此时数据观测、事件和 watcher 都尚未初始化
  init:function(){
      console.log(&quot;init..&quot;);
  },

  //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。
  created:function(){
      console.log(&quot;created..&quot;);
  },

  //在编译开始前调用。
  beforeCompile:function(){
       console.log(&quot;beforeCompile..&quot;);
  },

  //在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。
  compiled:function(){
       console.log(&quot;compiled..&quot;);
  },

   //在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
  ready: function () {
    console.log(&quot;ready..&quot;);

  },

  //在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。
  attached:function(){
       console.log(&quot;attached..&quot;);
  },

  //在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。
  detached:function(){
       console.log(&quot;detached..&quot;);
  },

  //在开始销毁实例时调用。此时实例仍然有功能。
  beforeDestroy:function(){
       console.log(&quot;beforeDestroy..&quot;);
  },

  //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，所有的子实例也已经被销毁。如果有离开过渡，destroyed 钩子在过渡完成之后调用。
  destroyed:function(){
       console.log(&quot;destroyed..&quot;);
  }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/list.html'</span>),

  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">items</span>:[{<span class="hljs-string">"id"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello11"</span>},{<span class="hljs-string">"id"</span>:<span class="hljs-number">2</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello22"</span>}]};
  },
  
  <span class="hljs-comment">//在实例开始初始化时同步调用。此时数据观测、事件和 watcher 都尚未初始化</span>
  init:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"init.."</span>);
  },

  <span class="hljs-comment">//在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。</span>
  created:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"created.."</span>);
  },

  <span class="hljs-comment">//在编译开始前调用。</span>
  beforeCompile:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"beforeCompile.."</span>);
  },

  <span class="hljs-comment">//在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。</span>
  compiled:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"compiled.."</span>);
  },

   <span class="hljs-comment">//在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。</span>
  ready: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ready.."</span>);

  },

  <span class="hljs-comment">//在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。</span>
  attached:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"attached.."</span>);
  },

  <span class="hljs-comment">//在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。</span>
  detached:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"detached.."</span>);
  },

  <span class="hljs-comment">//在开始销毁实例时调用。此时实例仍然有功能。</span>
  beforeDestroy:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"beforeDestroy.."</span>);
  },

  <span class="hljs-comment">//在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，所有的子实例也已经被销毁。如果有离开过渡，destroyed 钩子在过渡完成之后调用。</span>
  destroyed:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"destroyed.."</span>);
  }

};</code></pre>
<p>在浏览器里执行了看看：</p>
<p><strong>首次进入 List 页面的执行顺序如下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883384?w=723&amp;h=252" src="https://static.alili.tech/img/remote/1460000006883384?w=723&amp;h=252" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>此时点一下浏览器的后退，List Component 会被销毁，执行顺序如下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883385?w=766&amp;h=278" src="https://static.alili.tech/img/remote/1460000006883385?w=766&amp;h=278" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>这是官方的生命周期的图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883386?w=1200&amp;h=2800" src="https://static.alili.tech/img/remote/1460000006883386?w=1200&amp;h=2800" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">10. 父组件与子组件</h2>
<p>在很多情况下，组件是有父子关系的，比如 list 列表组件有个子组件 item</p>
<p><strong>components/item.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: require('../templates/item.html'),

  props:[&quot;id&quot;,&quot;name&quot;],
  
  ready: function () {
    
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/item.html'</span>),

  <span class="hljs-attr">props</span>:[<span class="hljs-string">"id"</span>,<span class="hljs-string">"name"</span>],
  
  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    
  }
};</code></pre>
<p><strong>templates/item.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>我是subitem： ${id} - ${name}</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是subitem： $</span><span class="hljs-template-variable">{id}</span><span class="xml"> - $</span><span class="hljs-template-variable">{name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></code></pre>
<p>修改 list 组件，添加 item 的引用</p>
<p><strong>components/list.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引用item组件
import item from &quot;./item&quot;;

module.exports = {
  template: require('../templates/list.html'),

  data:function(){
      return {items:[{&quot;id&quot;:1,&quot;name&quot;:&quot;hello11&quot;},{&quot;id&quot;:2,&quot;name&quot;:&quot;hello22&quot;}]};
  },
  
 //定义item组件为子组件
  components:{
     &quot;item&quot;:item
  },

  ready: function () {
  }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//引用item组件</span>
<span class="hljs-keyword">import</span> item <span class="hljs-keyword">from</span> <span class="hljs-string">"./item"</span>;

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/list.html'</span>),

  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">items</span>:[{<span class="hljs-string">"id"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello11"</span>},{<span class="hljs-string">"id"</span>:<span class="hljs-number">2</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello22"</span>}]};
  },
  
 <span class="hljs-comment">//定义item组件为子组件</span>
  components:{
     <span class="hljs-string">"item"</span>:item
  },

  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  }

};</code></pre>
<p><strong>templates/list.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>List</h1>
<hr/>
<p>Hello List Page!</p>
<ul>
    <li v-for=&quot;(index,item) in items&quot;>
        <!--使用item子组件，同时把id,name使用props传值给item子组件-->
        <item v-bind:id=&quot;item.id&quot; v-bind:name=&quot;item.name&quot;></item>
    </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>List<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello List Page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(index,item) in items"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--使用item子组件，同时把id,name使用props传值给item子组件--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">item</span> <span class="hljs-attr">v-bind:id</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">v-bind:name</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p><strong>浏览器里试试看：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883387?w=487&amp;h=189" src="https://static.alili.tech/img/remote/1460000006883387?w=487&amp;h=189" alt="" title="" style="cursor: pointer;"></span></p>
<p>子组件成功被调用了</p>
<h2 id="articleHeader11">11. 组件跳转传参</h2>
<p>组件之间的跳转传参，也是一种非常常见的情况。下面为列表页，增加跳转到详情页的跳转，并传参 id 给详情页</p>
<p><strong>修改路由 routes.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

  '/': {
    component: require('./components/index')
  },
   '/list': {
    component: require('./components/list')
  },

  //增加详情页的跳转路由，并在路径上加上id传参，具名为name：show
   '/show/:id': {
      name:&quot;show&quot;,
      component: require('./components/show')
    },
  '*': {
    component: require('./components/notFound')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {

  <span class="hljs-string">'/'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/index'</span>)
  },
   <span class="hljs-string">'/list'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/list'</span>)
  },

  <span class="hljs-comment">//增加详情页的跳转路由，并在路径上加上id传参，具名为name：show</span>
   <span class="hljs-string">'/show/:id'</span>: {
      <span class="hljs-attr">name</span>:<span class="hljs-string">"show"</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/show'</span>)
    },
  <span class="hljs-string">'*'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/notFound'</span>)
  }
}</code></pre>
<p>添加组件 show</p>
<p><strong>components/show.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: require('../templates/show.html'),

  data:function(){
      return {};
  },

  created:function(){
       //获取params的参数ID
       var id=this.$route.params.id;

       //根据获取的参数ID，返回不同的data对象（真实业务中，这里应该是Ajax获取数据）
       if (id==1){
            this.$data={&quot;id&quot;:id,&quot;name&quot;:&quot;hello111&quot;,&quot;age&quot;:24};
       }else{
        this.$data={&quot;id&quot;:id,&quot;name&quot;:&quot;hello222&quot;,&quot;age&quot;:28};
       }
  },
        
  ready: function () {
      console.log(this.$data);
  }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/show.html'</span>),

  <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> {};
  },

  <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-comment">//获取params的参数ID</span>
       <span class="hljs-keyword">var</span> id=<span class="hljs-keyword">this</span>.$route.params.id;

       <span class="hljs-comment">//根据获取的参数ID，返回不同的data对象（真实业务中，这里应该是Ajax获取数据）</span>
       <span class="hljs-keyword">if</span> (id==<span class="hljs-number">1</span>){
            <span class="hljs-keyword">this</span>.$data={<span class="hljs-string">"id"</span>:id,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello111"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-number">24</span>};
       }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.$data={<span class="hljs-string">"id"</span>:id,<span class="hljs-string">"name"</span>:<span class="hljs-string">"hello222"</span>,<span class="hljs-string">"age"</span>:<span class="hljs-number">28</span>};
       }
  },
        
  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$data);
  }

};</code></pre>
<p><strong>templates/show.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>Show</h1>
<hr/>

<p>Hello show page!</p>

<p>id:${id}</p>
<p>name:${name}</p>
<p>age:${age}</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Show<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello show page!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>id:$</span><span class="hljs-template-variable">{id}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>name:$</span><span class="hljs-template-variable">{name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>age:$</span><span class="hljs-template-variable">{age}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p><strong>修改 templates/item.html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>我是subitem： <a v-link=&quot;{name:'show',params: { 'id': id } }&quot;> ${id} : ${name}</a> </p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是subitem： <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'show',params: { 'id': id }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string"> }"</span>&gt;</span> $</span><span class="hljs-template-variable">{id}</span><span class="xml"> : $</span><span class="hljs-template-variable">{name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</span></code></pre>
<p>这里 name:'show' 表示具名路由路径，params 就是传参。</p>
<p><strong>继续浏览器里点到详情页试试：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883388?w=441&amp;h=271" src="https://static.alili.tech/img/remote/1460000006883388?w=441&amp;h=271" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>点击“hello11”，跳转到详情页：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883389?w=439&amp;h=272" src="https://static.alili.tech/img/remote/1460000006883389?w=439&amp;h=272" alt="" title="" style="cursor: pointer;"></span></p>
<p>传参逻辑成功。</p>
<h2 id="articleHeader12">12. 嵌套路由</h2>
<p>仅有路由跳转是远远不够的，很多情况下，我们还有同一个页面上，多标签页的切换，在 vue 中，用嵌套路由，也可以非常方便的实现。</p>
<p>添加两个小组件</p>
<p><strong>components/tab1.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: &quot;<p>Tab1 content</p>&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">module</span>.exports = {
  <span class="hljs-keyword">template</span>: <span class="hljs-string">"&lt;p&gt;Tab1 content&lt;/p&gt;"</span>
};</code></pre>
<p><strong>components/tab2.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  template: &quot;<p>Tab2 content</p>&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">module</span>.exports = {
  <span class="hljs-keyword">template</span>: <span class="hljs-string">"&lt;p&gt;Tab2 content&lt;/p&gt;"</span>
};</code></pre>
<p><strong>修改 components/index.js 组件，挂载这两个子组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import tab1 from &quot;./tab1&quot;;
import tab2 from &quot;./tab2&quot;;

module.exports = {
  template: require('../templates/index.html'),

  components:{
     &quot;tab1&quot;:tab1,
     &quot;tab2&quot;:tab2
  },

  ready: function () {
    
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> tab1 <span class="hljs-keyword">from</span> <span class="hljs-string">"./tab1"</span>;
<span class="hljs-keyword">import</span> tab2 <span class="hljs-keyword">from</span> <span class="hljs-string">"./tab2"</span>;

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../templates/index.html'</span>),

  <span class="hljs-attr">components</span>:{
     <span class="hljs-string">"tab1"</span>:tab1,
     <span class="hljs-string">"tab2"</span>:tab2
  },

  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    
  }
};</code></pre>
<p><strong>在路由里加上子路由</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

  '/': {
    component: require('./components/index'),

    //子路由
    subRoutes:{
      &quot;/tab1&quot;:{
          component:require('./components/tab1')
      },
      &quot;/tab2&quot;:{
          component:require('./components/tab2')
      }
    }
  },

   '/list': {
    component: require('./components/list')
  },

   '/show/:id': {
      name:&quot;show&quot;,
      component: require('./components/show')
    },

  '*': {
    component: require('./components/notFound')
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {

  <span class="hljs-string">'/'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/index'</span>),

    <span class="hljs-comment">//子路由</span>
    subRoutes:{
      <span class="hljs-string">"/tab1"</span>:{
          <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/tab1'</span>)
      },
      <span class="hljs-string">"/tab2"</span>:{
          <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/tab2'</span>)
      }
    }
  },

   <span class="hljs-string">'/list'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/list'</span>)
  },

   <span class="hljs-string">'/show/:id'</span>: {
      <span class="hljs-attr">name</span>:<span class="hljs-string">"show"</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/show'</span>)
    },

  <span class="hljs-string">'*'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/notFound'</span>)
  }

}</code></pre>
<p>好了，在浏览器里试一下：</p>
<p><strong>初始状态：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883390?w=288&amp;h=209" src="https://static.alili.tech/img/remote/1460000006883390?w=288&amp;h=209" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>点了 tab1，tab2：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883391?w=665&amp;h=205" src="https://static.alili.tech/img/remote/1460000006883391?w=665&amp;h=205" alt="" title="" style="cursor: pointer;"></span></p>
<p>Tab 切换没问题，可是，初始状态显示是空的，能不能默认显示 Tab1 Content 呢？很简单，调整下路由就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

  '/': {
    component: require('./components/index'),

    //子路由
    subRoutes:{
     //默认显示Tab1
      &quot;/&quot;:{
          component:require('./components/tab1')
      },
      &quot;/tab1&quot;:{
          component:require('./components/tab1')
      },
      &quot;/tab2&quot;:{
          component:require('./components/tab2')
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {

  <span class="hljs-string">'/'</span>: {
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/index'</span>),

    <span class="hljs-comment">//子路由</span>
    subRoutes:{
     <span class="hljs-comment">//默认显示Tab1</span>
      <span class="hljs-string">"/"</span>:{
          <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/tab1'</span>)
      },
      <span class="hljs-string">"/tab1"</span>:{
          <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/tab1'</span>)
      },
      <span class="hljs-string">"/tab2"</span>:{
          <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/tab2'</span>)
      }
    }
  }
}</code></pre>
<h2 id="articleHeader13">13. 业界 vue 使用案例</h2>
<p>小米移动官网：<a href="http://m.mi.com/1/#/index" rel="nofollow noreferrer" target="_blank">http://m.mi.com/1/#/index</a> </p>
<p>饿了吗招聘：<a href="https://jobs-mobile.ele.me/#" rel="nofollow noreferrer" target="_blank">https://jobs-mobile.ele.me/#</a>!/</p>
<hr>
<p>更多精彩内容欢迎关注<a href="https://bugly.qq.com/" rel="nofollow noreferrer" target="_blank">bugly</a>的微信公众账号： </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760367?w=180&amp;h=180" src="https://static.alili.tech/img/remote/1460000006760367?w=180&amp;h=180" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="https://bugly.qq.com/" rel="nofollow noreferrer" target="_blank">腾讯 Bugly</a>是一款专为移动开发者打造的质量监控工具，帮助开发者快速，便捷的定位线上应用崩溃的情况以及解决方案。智能合并功能帮助开发同学把每天上报的数千条 <a href="https://bugly.qq.com/" rel="nofollow noreferrer" target="_blank">Crash</a> 根据根因合并分类，每日日报会列出影响用户数最多的崩溃，精准定位功能帮助开发同学定位到出问题的代码行，实时上报可以在发布后快速的了解应用的质量情况，适配最新的 iOS, Android 官方操作系统，鹅厂的工程师都在使用，快来加入我们吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【腾讯Bugly干货分享】基于 Webpack & Vue & Vue-Router 的 SPA 初体验

## 原文链接
[https://segmentfault.com/a/1190000006883373](https://segmentfault.com/a/1190000006883373)

