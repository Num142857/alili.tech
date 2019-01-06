---
title: '如何更有效率和质量地开发Vue项目' 
date: 2019-01-07 2:30:11
hidden: true
slug: pbpnzzebxho
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>自总结完了上篇前端工程化的思想，并在vue全家桶的项目加以实践，趁热给大家总结一篇如何更有效率与质量地开发vue项目，以及其中踩过的一个个坑。。。</p>
<h3 id="articleHeader1">基于vue-cli的自定义模板（Custom Templates）</h3>
<p>小伙伴们的vue项目应该都是用vue-cli初始化出来的，但是vue-cli只是满足了基础配置和功能，如果你有额外的配置需求或者要迎合团队的业务配置，每新建个项目都得重新安装额外配置，比如说vuex，sass，封装axios，以及相关的文件夹。为了解决上述问题，vue-cli出了一个自定义模板功能，你fork<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">官方的模板</a>下来然后进行修改，然后用 vue-cli 来调用。具体调用的场景有以下两种</p>
<ul>
<li>
<p><strong>直接拉取git源：</strong><br>当你修改了模板并上传了repo上，可执行以下命令行来初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init username/repo my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">vue init username/repo <span class="hljs-keyword">my</span>-project</code></pre>
</li>
<li>
<p><strong>拉取本地的模板：</strong> <br>当你clone了官方模板在本地修改，可执行以下命令行来初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    vue init ~/fs/path/to-custom-template my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    vue init ~/fs/path/<span class="hljs-keyword">to</span>-custom-template <span class="hljs-keyword">my</span>-project</code></pre>
</li>
</ul>
<p>还可以编写meta.*（js,json）来选择安装哪些配置~</p>
<p>如果大家懒得去编写vuex，sass的配置，封装axios的话，可以来通过我配置完的脚手架来初始化完项目~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        vue init duosanglee/vuejs-custom-template" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">        vue init duosanglee/vuejs-custom-<span class="hljs-keyword">template</span></code></pre>
<p>这个模板在<a href="https://github.com/duosanglee/vuejs-custom-template" rel="nofollow noreferrer" target="_blank">repo</a>里<br>ps：我的这个模板的代码风格是基于standard的</p>
<h3 id="articleHeader2">引入sass全局变量，mixin，function等</h3>
<p>首先我们考虑下以下场景：当使用rem开发移动端的时候，你定义了一个方法pxToRem的方法来实现px对rem的转换，然后在工程里为每个.vue文件@import 'public.scss'，得import很多很多很多次，万一public.scss路径变了的话。。。哭都来不及。<br>这时候<strong><a href="https://docs.emmet.io/" rel="nofollow noreferrer" target="_blank">sass-resources-loader</a></strong>就来拯救我们了，他可以<strong>省去重复性的引入，还支持LESS，POSTCSS等</strong><br>具体用法如下：</p>
<ul>
<li><p><code>npm install -D sass-resources-loader</code></p></li>
<li>
<p>首先得找到项目里的build文件夹，找到util.js<br>添加一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolveResouce(name) {
    return path.resolve(__dirname, '../src/style/' + name);
}
function generateSassResourceLoader() {
    var loaders = [
 cssLoader, 
 // 'postcss-loader',
 'sass-loader',
 {
     loader: 'sass-resources-loader',
     options: {
       // it need a absolute path
       resources: [resolveResouce('common.scss')]
     }
 }
    ];
    if (options.extract) {
 return ExtractTextPlugin.extract({
   use: loaders,
   fallback: 'vue-style-loader'
 })
    } else {
 return ['vue-style-loader'].concat(loaders)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolveResouce</span><span class="hljs-params">(name)</span> </span>{
    <span class="hljs-keyword">return</span> path.resolve(__dirname, <span class="hljs-string">'../src/style/'</span> + name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateSassResourceLoader</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> loaders = [
 cssLoader, 
 <span class="hljs-comment">// 'postcss-loader',</span>
 <span class="hljs-string">'sass-loader'</span>,
 {
     loader: <span class="hljs-string">'sass-resources-loader'</span>,
     options: {
       <span class="hljs-comment">// it need a absolute path</span>
       resources: [resolveResouce(<span class="hljs-string">'common.scss'</span>)]
     }
 }
    ];
    <span class="hljs-keyword">if</span> (options.extract) {
 <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
   <span class="hljs-keyword">use</span>: loaders,
   fallback: <span class="hljs-string">'vue-style-loader'</span>
 })
    } <span class="hljs-keyword">else</span> {
 <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
}</code></pre>
</li>
<li>
<p>然后还是在当前文件里找到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less'),
  sass: generateLoaders('sass', { indentedSyntax: true }),
  scss: generateLoaders('sass'),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">return</span> {
  <span class="hljs-attribute">css</span>: <span class="hljs-built_in">generateLoaders</span>(),
  postcss: <span class="hljs-built_in">generateLoaders</span>(),
  less: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'less'</span>),
  sass: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'sass'</span>, { indentedSyntax: true }),
  scss: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'sass'</span>),
  stylus: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>),
  styl: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>)
}</code></pre>
<p>替换成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less'),
  sass: generateSassResourceLoader(),
  scss: generateSassResourceLoader(),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">return</span> {
  <span class="hljs-attribute">css</span>: <span class="hljs-built_in">generateLoaders</span>(),
  postcss: <span class="hljs-built_in">generateLoaders</span>(),
  less: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'less'</span>),
  sass: <span class="hljs-built_in">generateSassResourceLoader</span>(),
  scss: <span class="hljs-built_in">generateSassResourceLoader</span>(),
  stylus: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>),
  styl: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>)
}</code></pre>
</li>
</ul>
<p>这样就可以在项目里使用sass全局变量，mixin，function了~~</p>
<h3 id="articleHeader3">在线 Mock 平台 easy-mock</h3>
<p>现在讲都是前后端分离，前后端并行开发来提高开发效率，通过一个api文档来协作，所以一个好的mock工具对于提高效率也至关重要~<br>这里极力推荐easy-mock工具，支持团队协作编辑，生成模拟数据的在线 mock 服务，还支持导入swagger文档等功能,界面如下<br><span class="img-wrap"><img data-src="/img/bVRtJH?w=1921&amp;h=918" src="https://static.alili.tech/img/bVRtJH?w=1921&amp;h=918" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">定义全局变量</h3>
<p>在项目会有需要使用全局变量的需求，来处理一些频繁的操作，大家都应该会绑定到window对象上，但是这种方式不适合服务端渲染，因为服务端没有 window 对象, 是 undefined, 当试图去访问属性时会报错.我总结了两个靠谱的方法</p>
<ol>
<li>
<p><strong>代理到Vue的原型对象</strong><br>由于所有的组件都会从 Vue 的原型对象上继承它们的方法, 因此我们只要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(Vue.prototype, '$xxx', { value: xxx });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Object</span>.defineProperty(<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>, '$xxx', { value: xxx });
</code></pre>
<p>就可以在所有组件/实例中通过 this.$xxx: 的方式访问插件了~而不需要定义全局变量或者手动的引入了~<br>   至于为什么要用Object.defineProperty这个方法，是因为通过Object.defineProperty绑定的属性是只读的，以防一起开发项目的协(zhu)作(dui)者(you)去重写或者覆盖该方法的值。</p>
</li>
<li><p><strong>vuex大法</strong><br>   vuex的出现就是vue为了集中式存储管理应用的所有组件的状态，所以说全局变量和方法都可以放到vuex当中~具体用法就不加阐述了，大家可仔细阅读vuex文档</p></li>
</ol>
<h3 id="articleHeader5">组件设计</h3>
<p>大家都知道组件化的思想就是分治，几乎任意类型的应用程序界面，都可以抽象为一个组件树，那我们该按照什么规则把应用抽象成组件，来应对复杂多变的业务需求呢。<br>我们从通信、黑箱，继承这几个角度来看看</p>
<ul>
<li><p><strong>通信：</strong> vue的父子组件通信机制是props down，events up，尽量保持松耦合，一直保持单向数据流的特点，并加以强约束。需要注意的时候，尽可能减少跨组件通信，例如使用$parent，$root。</p></li>
<li><p><strong>继承：</strong> 当两个组件存在些许的共性，又存在足够的差异性的时候，就可以用到vue的继承---mixin，他允许你封装一块在应用的其他组件中都可以使用的函数。如果使用姿势正确，他们不会改变函数作用域外部的任何东西。而且mixin还有各种高阶用法，大家可自行查询（我也不会）。</p></li>
<li><p><strong>黑箱：</strong> 组件的黑箱状态既只暴露易变的接口和方法，渲染给入的数据，组件内部封装不变的逻辑。</p></li>
<li><p><strong>设计模式原则：</strong> 运用设计模式原则，比如单一职责原则，将组件拆分抽离成更细粒度，保证高内聚性；再如接口隔离原则，采用稳定的服务端接口，将变化模块分离，使得组件得以解耦；里氏替换原则、依赖倒置原则等等。。</p></li>
</ul>
<h3 id="articleHeader6">目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-- src
    -- assets                      # 私有资源
    -- common                      # 通用组件
    -- components                  # 业务组件
    -- api.js                      # 请求文件      
    -- config                      # 环境变量配置
        -- env.js                  # 环境变量文件
        -- http.js                 # 封装axios文件
    -- pages                       # 页面维度
        -- pageA                   # 页面A
            -- pageA.vue           # 页面A单文件
            -- pageA-components    # 页面A下的一个组件
            -- children            # 子页面
    -- router                      # 路由
        -- index.js                # 路由入口
        -- routes.js               # 路由配置信息
    -- store                       # vuex
        -- modules                 # vuex模块
        -- index.js                # vuex入口
    -- utils                       # js通用方法
    -- app.vue                     # 顶层单文件
    -- main.js                     # 入口" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">- src
</span>    -<span class="ruby">- assets                      <span class="hljs-comment"># 私有资源</span>
</span>    -<span class="ruby">- common                      <span class="hljs-comment"># 通用组件</span>
</span>    -<span class="ruby">- components                  <span class="hljs-comment"># 业务组件</span>
</span>    -<span class="ruby">- api.js                      <span class="hljs-comment"># 请求文件      </span>
</span>    -<span class="ruby">- config                      <span class="hljs-comment"># 环境变量配置</span>
</span>        -<span class="ruby">- env.js                  <span class="hljs-comment"># 环境变量文件</span>
</span>        -<span class="ruby">- http.js                 <span class="hljs-comment"># 封装axios文件</span>
</span>    -<span class="ruby">- pages                       <span class="hljs-comment"># 页面维度</span>
</span>        -<span class="ruby">- pageA                   <span class="hljs-comment"># 页面A</span>
</span>            -<span class="ruby">- pageA.vue           <span class="hljs-comment"># 页面A单文件</span>
</span>            -<span class="ruby">- pageA-components    <span class="hljs-comment"># 页面A下的一个组件</span>
</span>            -<span class="ruby">- children            <span class="hljs-comment"># 子页面</span>
</span>    -<span class="ruby">- router                      <span class="hljs-comment"># 路由</span>
</span>        -<span class="ruby">- index.js                <span class="hljs-comment"># 路由入口</span>
</span>        -<span class="ruby">- routes.js               <span class="hljs-comment"># 路由配置信息</span>
</span>    -<span class="ruby">- store                       <span class="hljs-comment"># vuex</span>
</span>        -<span class="ruby">- modules                 <span class="hljs-comment"># vuex模块</span>
</span>        -<span class="ruby">- index.js                <span class="hljs-comment"># vuex入口</span>
</span>    -<span class="ruby">- utils                       <span class="hljs-comment"># js通用方法</span>
</span>    -<span class="ruby">- app.vue                     <span class="hljs-comment"># 顶层单文件</span>
</span>    -<span class="ruby">- main.js                     <span class="hljs-comment"># 入口</span></span></code></pre>
<p>大家可以从目录结构中看出我整个项目分割的思维<br>首先我把组件分为<strong>通用组件</strong>和<strong>业务组件</strong>两大类。</p>
<ol>
<li><p>通用组件是与业务耦合低，是有简单状态或者无状态的，数据几乎全部依赖于输入，它只负责渲染给入的数据。比如按钮是一个组件，可能有一个参数决定了它的尺寸，一个参数决定了它是否可以点击，但是点击这个按钮之后会发生什么，就不是按钮这个组件需要知道的事情了。</p></li>
<li><p>业务组件是与业务耦合高，可以由多个通用组件和其他的业务组件组成，会拥有一些方法，用来修改持有的数据，对内来看，它自己持有一些数据和方法，用来决定内容的渲染，对外又是一个简单的props接受数据。可以理解为组件树的非叶子节点，通过自身数据变化，进而操纵子组件的内容。</p></li>
</ol>
<p>然后config文件夹放置了环境变量文件env.js和封装http库文件http.js</p>
<p>env.js<br><span class="img-wrap"><img data-src="/img/bVRsCw?w=3104&amp;h=1970" src="https://static.alili.tech/img/bVRsCw?w=3104&amp;h=1970" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>http.js<br><span class="img-wrap"><img data-src="/img/bVRsB2?w=3104&amp;h=1970" src="https://static.alili.tech/img/bVRsB2?w=3104&amp;h=1970" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后我把路由里的routes.js和api.js请求文件都单独抽离了出来。</p>
<h3 id="articleHeader7">自动生成雪碧图</h3>
<p>前端项目中自动生成雪碧图节省了我们很多的时间，我们只要把图片扔到文件夹里，<strong><a href="https://docs.emmet.io/" rel="nofollow noreferrer" target="_blank">webpack-spritesmith</a></strong>就能按照我们设定的规则自动合成css-sprite，安装配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SpritesmithPlugin = require('webpack-spritesmith');
...
module.exports = {
  ...
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: './src/assets/sp/',
        glob: '*.png'
      },
      target: {
        image: './src/assets/sprite/sprite.png',
        css: './src/assets/sprite/sprite.css'
      },
      apiOptions: {
        cssImageRef: './sprite.png'
      },
      spritesmithOptions: {
        algorithm: 'top-down',
        padding: 100
      }
    })
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var SpritesmithPlugin = require(<span class="hljs-string">'webpack-spritesmith'</span>);
...
module.exports = {
  ...
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: <span class="hljs-string">'./src/assets/sp/'</span>,
        glob: <span class="hljs-string">'*.png'</span>
      },
      target: {
        image: <span class="hljs-string">'./src/assets/sprite/sprite.png'</span>,
        css: <span class="hljs-string">'./src/assets/sprite/sprite.css'</span>
      },
      apiOptions: {
        cssImageRef: <span class="hljs-string">'./sprite.png'</span>
      },
      spritesmithOptions: {
        algorithm: <span class="hljs-string">'top-down'</span>,
        padding: <span class="hljs-number">100</span>
      }
    })
  ]
}
</code></pre>
<h3 id="articleHeader8">自动修复eslint格式错误</h3>
<p>这个功能的建立在小伙伴的开发工具是vscode情况下~<br>首先在vscode扩展里面安装vscode的eslint插件，然后settings.json里添加如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    &quot;javascriptreact&quot;,
    {
        &quot;language&quot;: &quot;html&quot;,
        &quot;autoFix&quot;: true
    },
    {
        &quot;language&quot;: &quot;vue&quot;,
        &quot;autoFix&quot;: true
    }
],
&quot;eslint.autoFixOnSave&quot;: true," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-string">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    <span class="hljs-string">"javascriptreact"</span>,
    {
        <span class="hljs-string">"language"</span>: <span class="hljs-string">"html"</span>,
        <span class="hljs-string">"autoFix"</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-string">"language"</span>: <span class="hljs-string">"vue"</span>,
        <span class="hljs-string">"autoFix"</span>: <span class="hljs-literal">true</span>
    }
],
<span class="hljs-string">"eslint.autoFixOnSave"</span>: <span class="hljs-literal">true</span>,</code></pre>
<p>然后会在save文件的时候eslint插件自动根据项目下的.eslintrc来设置代码格式~<br>sf不支持播放gif..具体效果大家只能自行查看</p>
<h3 id="articleHeader9">跨域</h3>
<p>在浏览vue-cli的官方文档时候发现了vue-cli自带了API proxy，解决了在项目中后端联调的时候的跨域问题。具体安装配置如下：<br>首先我们找到config文件下的index.js,再找到dev对象下的proxyTable属性，然后把以下代码添加进去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api': {
    target: '网站名',
    pathRewrite: {
      '^/api': ''
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'网站名'</span>,
    <span class="hljs-attribute">pathRewrite</span>: {
      <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
    }
  }
}</code></pre>
<p>然后重启本地服务器，这样你发送的/api/a就会代理发送到"网站名/a"了~</p>
<h3 id="articleHeader10">开发利器emmet</h3>
<p>之所以称emmet为前端开发利器是因为他可以根据我们所输入的缩写来得到相应的内容，大大节省我们的开发html和css的时间，例：</p>
<ul><li><p>输入ul&gt;li*2&gt;span 按下扩展键</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li><span></span></li>
    <li><span></span></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;ul&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;span&gt;</span><span class="hljs-section">&lt;/span&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
    <span class="hljs-section">&lt;li&gt;</span><span class="hljs-section">&lt;span&gt;</span><span class="hljs-section">&lt;/span&gt;</span><span class="hljs-section">&lt;/li&gt;</span>
<span class="hljs-section">&lt;/ul&gt;</span></code></pre>
<ul><li><p>输入m0-a-0-0+posa+bgc 按下扩展键</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin: 0 auto 0 0;
position: absolute;
background-color: #fff;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;</code></pre>
<p>更多方法请看官方文档<a href="https://docs.emmet.io/" rel="nofollow noreferrer" target="_blank">emmet</a></p>
<p>这篇文章到此就已经结束了~感谢大家能够关注此文章~如果这篇文章能帮助到大家的话，麻烦请帮我点个赞~~~</p>
<p>大家有啥想法可在下面评论，也可以加我QQ：757592499来讨论~</p>
<p>参考：</p>
<blockquote><p><a href="http://www.jianshu.com/p/0375d3e1ce41" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/0375...</a><br><a href="https://hopkinson.github.io/2017/06/30/Vue%E4%B8%ADSASS%E5%A6%82%E4%BD%95%E5%85%A8%E5%B1%80%E4%BD%BF%E7%94%A8%E5%8F%98%E9%87%8F%EF%BC%8Cmixin%EF%BC%8C%E6%88%96%E8%80%85function/" rel="nofollow noreferrer" target="_blank">https://hopkinson.github.io/2...</a><br><a href="https://github.com/dwqs/blog/issues/51" rel="nofollow noreferrer" target="_blank">https://github.com/dwqs/blog/...</a><br><a href="http://jeffjade.com/2017/03/11/120-how-to-write-vue-better/" rel="nofollow noreferrer" target="_blank">http://jeffjade.com/2017/03/1...</a><br><a href="http://www.jianshu.com/p/95b2caf7e0da" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/95b2...</a><br><a href="https://segmentfault.com/a/1190000007686042">https://segmentfault.com/a/11...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何更有效率和质量地开发Vue项目

## 原文链接
[https://segmentfault.com/a/1190000010324128](https://segmentfault.com/a/1190000010324128)

