---
title: 'Webpack + vue 搭建' 
date: 2019-01-14 2:30:07
hidden: true
slug: ulydl7k9008
categories: [reprint]
---

{{< raw >}}

                    
<p>快速到达：<a>初始化项目 </a>&nbsp;&nbsp;&nbsp;&nbsp;<a>入口文件 </a>&nbsp;&nbsp;&nbsp;&nbsp;<a>webpack配置</a>&nbsp;&nbsp;&nbsp;&nbsp;<a>配置路由</a>&nbsp;&nbsp;&nbsp;&nbsp;<a>配置Vuex </a>&nbsp;&nbsp;&nbsp;&nbsp;<a>eslint  </a>&nbsp;&nbsp;&nbsp;&nbsp;<a>webpack生产环境配置 </a>&nbsp;&nbsp;&nbsp;<a>常见错误总结 </a></p>
<h4>前言： 为何使用webpack？ 为何相对于gulp&amp;grunt更有优势</h4>
<blockquote>
<p>WebPack<a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">（前往官网）</a>可以看做是模块打包机：直接分析项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。Gulp/Grunt是一种能够优化前端的开发流程的工具。</p>
<p>&nbsp;&nbsp; Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行编译，组合，压缩等任务的具体步骤，运行之后自动逐步完成设定的任务。<span class="img-wrap"><img data-src="/img/remote/1460000007045084" src="https://static.alili.tech/img/remote/1460000007045084" alt="" title="" style="cursor: pointer; display: inline;"></span><br></p>
</blockquote>
<p>&nbsp;&nbsp; 而WebPack是一种模块化的方案，通过给定的主文件（如：index.js）使用不同的loaders处理项目的所有依赖文件，最后打包为一个浏览器可识别的JavaScript文件。<span class="img-wrap"><img data-src="/img/remote/1460000004839887" src="https://static.alili.tech/img/remote/1460000004839887" alt="" title="" style="cursor: pointer; display: inline;"></span><br></p>
<p><strong>&nbsp;&nbsp; 其实两者并不具备太多可比性，grunt／gulp 在配置上比较简单，环境搭建更容易实现;而webpack的处理速度更快更直接，能打包更多不同类型的文件。</strong></p>
<h3 id="articleHeader0">开始使用webpack</h3>
<p>相关的技术：webpack@2，vue@1，vue-router@0.7，vuex@1  </p>
<p>目录结构：<br><br>&lt;ul&gt;<br>&lt;li&gt;config全局变量<br>&lt;li&gt;dist编译后的项目代码&lt;/li&gt;<br>&lt;li&gt;src项目代码<br>&lt;ul&gt; &lt;li&gt;  apis api封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li>components Vue组件
<li>libs js工具类
<li>router 路由
<li>index.js 路由对象
<li>routes.js 路由配置
<li>store Vuex的store
<li>modules vuex模块
<li>types.js type管理
<li>styles css样式
<li>views 页面组件
<li>main.js vue入口文件</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;li&gt;</span>components Vue组件
<span class="hljs-symbol">&lt;li&gt;</span>libs js工具类
<span class="hljs-symbol">&lt;li&gt;</span>router 路由
<span class="hljs-symbol">&lt;li&gt;</span><span class="hljs-built_in">index</span>.js 路由对象
<span class="hljs-symbol">&lt;li&gt;</span>routes.js 路由配置
<span class="hljs-symbol">&lt;li&gt;</span>store Vuex的store
<span class="hljs-symbol">&lt;li&gt;</span>modules vuex模块
<span class="hljs-symbol">&lt;li&gt;</span>types.js <span class="hljs-built_in">type</span>管理
<span class="hljs-symbol">&lt;li&gt;</span>styles css样式
<span class="hljs-symbol">&lt;li&gt;</span>views 页面组件
<span class="hljs-symbol">&lt;li&gt;</span>main.js vue入口文件&lt;/ul&gt;</code></pre>
<p>&lt;li&gt;webpack.config Webpack各种环境的配置文件<br>&lt;li&gt;package.json<br>&lt;/ul&gt;</p>
<h3 id="articleHeader1">
<a>step1</a> &nbsp;&nbsp;初始化项目 ----    Webpack 使用npm安装</h3>
<p>1.创建项目文件夹,   <code>npm init -y</code> 创建 <code>package.json</code>  </p>
<p>2.项目根目录下建立<code>src</code>和<code>dist</code>文件夹，分别用来存放<code>项目源码</code>和<code>webpack编译后的代码</code></p>
<h3 id="articleHeader2">
<a>step2</a>&nbsp;&nbsp;  入口文件--- 简单跑一下</h3>
<p>1.在<code>根目录</code>下直接建立一个<code>index.html</code>，作为页面的入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
<meta charset=&quot;UTF-8&quot;>
<title>Demo</title>
</head>
<body>
  <div id=&quot;app&quot;>"{{"message"}}"</div>  <!-- Vue模板入口 -->
  <script src=&quot;dist/main.js&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  <span class="hljs-comment">&lt;!-- Vue模板入口 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<p>2.在<code>src</code>下建立一个<code>main.js</code>，作为Vue的入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// require的语法是Commonjs的，webpack自身可以实现直接使用
// es6的语法需要依赖babel哦
const Vue = require('vue')
new Vue({
el: '#app',
data: {
message: 'Hello Vue.js!'
      }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// require的语法是Commonjs的，webpack自身可以实现直接使用</span>
<span class="hljs-comment">// es6的语法需要依赖babel哦</span>
const Vue = require(<span class="hljs-string">'vue'</span>)
<span class="hljs-keyword">new</span> Vue({
<span class="hljs-string">el:</span> <span class="hljs-string">'#app'</span>,
<span class="hljs-string">data:</span> {
<span class="hljs-string">message:</span> <span class="hljs-string">'Hello Vue.js!'</span>
      }
})
</code></pre>
<p>3.安装模块： vue     <code>npm install vue@1 --save</code> ； webpack <code>npm install webpack --save-dev</code>(在本地安装)  </p>
<p><strong>本地安装的webpack 需要在package.json的 scripts 配置中添加运行脚本</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      
&quot;scripts&quot;: {
&quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
&quot;dev&quot;: &quot;webpack src/main.js dist/main.js&quot;  // <---自行添加,指定运行的文件 **webpack [入口文件] [出口文件]**
 }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>      
<span class="hljs-string">"scripts"</span>: {
<span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
<span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack src/main.js dist/main.js"</span>  <span class="hljs-comment">// &lt;---自行添加,指定运行的文件 **webpack [入口文件] [出口文件]**</span>
 },</code></pre>
<p>运行<code>npm run dev</code>，再用浏览器打开<code>index.html</code>就能看到效果了：</p>
<blockquote><p>Hello Vue.js!</p></blockquote>
<p><em>全局安装webpack  <code>npm install -g webpack</code>  则无需指定脚本～</em></p>
<h3 id="articleHeader3">
<a>step3</a>&nbsp;&nbsp;  编写webpack配置文件 !!</h3>
<p>在上一步中专门指定了webpack运行脚本去运行指定的文件，但实际开发中，对于不同环境的大型项目／系统开发显然是不满足的。因此创建一个文件专门存放webpack配置～    </p>
<p>1.在根目录下创建 <code>webpack.config</code> 文件夹来存放webpack的配置文件；    </p>
<p>2.在上面的目录下首先创建一个<code>base.js</code>文件来存在一些公共环境下的配置文件（例如loaders的配置）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const root = path.resolve(__dirname, '..') // 指向 根目录

module.exports = {
entry: path.join(root, 'src/main.js'),  // 项目入口文件
output: {
path: path.join(root, 'dist'),  // 出口目录
filename: 'main.js'  // 出口文件名
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>const <span class="hljs-built_in">path</span> = require(<span class="hljs-string">'path'</span>)
const root = <span class="hljs-built_in">path</span>.resolve(__dirname, <span class="hljs-string">'..'</span>) <span class="hljs-comment">// 指向 根目录</span>

module.exports = {
entry: <span class="hljs-built_in">path</span>.join(root, <span class="hljs-string">'src/main.js'</span>),  <span class="hljs-comment">// 项目入口文件</span>
output: {
<span class="hljs-built_in">path</span>: <span class="hljs-built_in">path</span>.join(root, <span class="hljs-string">'dist'</span>),  <span class="hljs-comment">// 出口目录</span>
filename: <span class="hljs-string">'main.js'</span>  <span class="hljs-comment">// 出口文件名</span>
    }
}
</code></pre>
<p>以上便实现了<code>“webpack src/main.js dist/main.js”</code>webpack指定 入口文件 -&gt; 出口文件 的功能了。    </p>
<p>此外还可以拓展一下，使得兼容更多的功能～  <a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">（webpack@2 resolving）</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const root = path.resolve(__dirname, '..') // 根目录

module.exports = {
entry: path.join(root, 'src/main.js'),  // 入口文件
output: {
path: path.join(root, 'dist'),  // 出口目录
filename: 'main.js'  // 出口文件名
},
resolve: {
   alias: { // 配置目录别名，来确保模块引入变得更简单
     // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
     components: path.join(root, 'src/components'),
     views: path.join(root, 'src/views'),
     styles: path.join(root, 'src/styles'),
     store: path.join(root, 'src/store')
   },
   extensions: ['.js', '.vue'], // 引用js和vue文件可以省略后缀名 (此处有坑坑坑＝＝。)!!webpack@2+已经不再要求强制转入一个空字符串
   resolveLoader: {
   module: { // 配置loader
   loaders: [
     {test: /\.vue$/, loader: 'vue'}, // 所有.vue结尾的文件，使用vue-loader
     {test: /\.js$/, loader: 'babel', exclude: /node_modules/} // .js文件使用babel-loader，切记排除node_modules目录
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const path = require(<span class="hljs-string">'path'</span>)
const root = path.resolve(__dirname, <span class="hljs-string">'..'</span>) <span class="hljs-comment">// 根目录</span>

module.exports = {
<span class="hljs-string">entry:</span> path.join(root, <span class="hljs-string">'src/main.js'</span>),  <span class="hljs-comment">// 入口文件</span>
<span class="hljs-string">output:</span> {
<span class="hljs-string">path:</span> path.join(root, <span class="hljs-string">'dist'</span>),  <span class="hljs-comment">// 出口目录</span>
<span class="hljs-string">filename:</span> <span class="hljs-string">'main.js'</span>  <span class="hljs-comment">// 出口文件名</span>
},
<span class="hljs-string">resolve:</span> {
<span class="hljs-symbol">   alias:</span> { <span class="hljs-comment">// 配置目录别名，来确保模块引入变得更简单</span>
     <span class="hljs-comment">// 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')</span>
<span class="hljs-symbol">     components:</span> path.join(root, <span class="hljs-string">'src/components'</span>),
<span class="hljs-symbol">     views:</span> path.join(root, <span class="hljs-string">'src/views'</span>),
<span class="hljs-symbol">     styles:</span> path.join(root, <span class="hljs-string">'src/styles'</span>),
<span class="hljs-symbol">     store:</span> path.join(root, <span class="hljs-string">'src/store'</span>)
   },
<span class="hljs-symbol">   extensions:</span> [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>], <span class="hljs-comment">// 引用js和vue文件可以省略后缀名 (此处有坑坑坑＝＝。)!!webpack@2+已经不再要求强制转入一个空字符串</span>
<span class="hljs-symbol">   resolveLoader:</span> {
<span class="hljs-symbol">   module:</span> { <span class="hljs-comment">// 配置loader</span>
<span class="hljs-symbol">   loaders:</span> [
     {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.vue$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'vue'</span>}, <span class="hljs-comment">// 所有.vue结尾的文件，使用vue-loader</span>
     {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'babel'</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>} <span class="hljs-comment">// .js文件使用babel-loader，切记排除node_modules目录</span>
    ]
  }
}
</code></pre>
<p>根目录下添加<code>.babelrc</code>用于配置 <code>babel</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
 &quot;presets&quot;: [&quot;es2015&quot;]
 }  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code> {
 <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>]
 }  
</code></pre>
<h5>关于 Babel 是什么 : 通常与webpack搭配一起使用，webpack可以看作是是打包工具，babel则视为编译工具，可把最新标准编写的js代码（例如 es6，react..）编译成当下随处可用的版本。是一种“源码到源码”的编译（转换编译）！</h5>
<p><br>而.babelrc就是让 Babel 做你要它做的事情的配置文件。</p>
<blockquote><p>babel-preset-es2015    &nbsp;&nbsp;   &nbsp;&nbsp;  &nbsp;&nbsp;  打包了es6的特性</p></blockquote>
<p><strong>使用了vue-loader和babel-loader需要安装包：</strong>  运行如下命令（可能有坑哦，若踩可见文末 bug修复篇＝＝。）  </p>
<p><code>npm install --save-dev vue-loader@8 babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 css-loader vue-style-loader vue-hot-reload-api@1 vue-html-loader</code>    </p>
<p>3.在  <code>webpack.json</code> 中创建 <code>dev.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   
  const path = require('path')
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const baseConfig = require('./base')
  const root = path.resolve(__dirname, '..')
      
  module.exports = merge(baseConfig, {})  \\首先 与base.js同样的配置  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>   
  <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
  <span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
  <span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
  <span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./base'</span>)
  <span class="hljs-keyword">const</span> root = path.resolve(__dirname, <span class="hljs-string">'..'</span>)
      
  <span class="hljs-built_in">module</span>.exports = merge(baseConfig, {})  <span class="hljs-string">\\首先</span> 与base.js同样的配置  
  </code></pre>
<p>其中 <code>webpack-merge</code> 用于合并两个配置文件，需要安装 =&gt; <code>npm install --save-dev webpack-merge</code>    </p>
<p>4.自行搭建一个小型服务器，以免手动调试 index.html 。定义使用  webpack dev server 。 <a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">（webpack@2 Proxy）</a> <br>因此需要继续配置dev.js如下：  还有其他一切配置，可查阅 <code>webpack-dev-server-cli</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = merge(baseConfig, {
devServer: {
historyApiFallback: true, // 404的页面会自动跳转到/页面
 inline: true, // 文件改变自动刷新页面
// progress: true, // 显示编译进度 !!有坑，待解决。下同～ 暂时不加这两个属性继续走下去吧～！
// colors: true, // 使用颜色输出
 port: 3800, // 服务器端口  ！！注意不要被占用了哦
},
 devtool: 'source-map' // 用于标记编译后的文件与编译前的文件对应位置，便于调试
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>
<span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">merge(baseConfig,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-number">404</span><span class="hljs-string">的页面会自动跳转到/页面</span>
<span class="hljs-attr"> inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">文件改变自动刷新页面</span>
<span class="hljs-string">//</span> <span class="hljs-attr">progress:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">显示编译进度</span> <span class="hljs-string">!!有坑，待解决。下同～</span> <span class="hljs-string">暂时不加这两个属性继续走下去吧～！</span>
<span class="hljs-string">//</span> <span class="hljs-attr">colors:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">使用颜色输出</span>
<span class="hljs-attr"> port:</span> <span class="hljs-number">3800</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">服务器端口</span>  <span class="hljs-string">！！注意不要被占用了哦</span>
<span class="hljs-string">},</span>
<span class="hljs-attr"> devtool:</span> <span class="hljs-string">'source-map'</span> <span class="hljs-string">//</span> <span class="hljs-string">用于标记编译后的文件与编译前的文件对应位置，便于调试</span>
<span class="hljs-string">})</span>
</code></pre>
<p>5.添加热替换配置 <code>HotModuleReplacementPlugin</code> ，每次改动文件不会再整个页面都刷新。该配置是webpack内部插件，不需要安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = merge(baseConfig, {
 entry: [
   'webpack/hot/dev-server', // 热替换处理入口文件
    path.join(root, 'src/index.js')
 ],
devServer: { /* 同上 */},
plugins: [
new webpack.HotModuleReplacementPlugin() // 添加热替换插件
  ]
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>module.exports = merge(baseConfig, {
<span class="hljs-symbol"> entry:</span> [
   <span class="hljs-string">'webpack/hot/dev-server'</span>, <span class="hljs-comment">// 热替换处理入口文件</span>
    path.join(root, <span class="hljs-string">'src/index.js'</span>)
 ],
<span class="hljs-string">devServer:</span> { <span class="hljs-comment">/* 同上 */</span>},
<span class="hljs-string">plugins:</span> [
<span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin() <span class="hljs-comment">// 添加热替换插件</span>
  ]
}  </code></pre>
<p>6.使用 <code>HtmlWebpackPlugin</code> ，实现js入口文件自动注入。<code>npm install --save-dev html-webpack-plugin</code>，且需要在头部引入 =&gt; <code>const HtmlWebpackPlugin = require('html-webpack-plugin')</code> (还在dev.js中哦)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = merge(baseConfig, {
entry: [ /* 同上 */ ],
devServer: { /* 同上 */ },
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(root, 'index.html'), // 模板文件
    inject: 'body' // js的script注入到body底部
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>
module.exports = merge(baseConfig, {
<span class="hljs-string">entry:</span> [ <span class="hljs-comment">/* 同上 */</span> ],
<span class="hljs-string">devServer:</span> { <span class="hljs-comment">/* 同上 */</span> },
<span class="hljs-string">plugins:</span> [
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
<span class="hljs-symbol">    template:</span> path.join(root, <span class="hljs-string">'index.html'</span>), <span class="hljs-comment">// 模板文件</span>
<span class="hljs-symbol">    inject:</span> <span class="hljs-string">'body'</span> <span class="hljs-comment">// js的script注入到body底部</span>
    })
  ]
}</code></pre>
<p>7.修改index.html（根目录i 啊）,去掉入口文件的引入：<del><code>&lt;script src="dist/main.js"&gt;&lt;/script&gt;</code></del>  <br>8.修改<code>package.json</code> 的运行脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 &quot;dev&quot;: &quot;webpack-dev-server --config webpack.config/dev.js&quot;//指向配置文件，而不是某一单一页面的js
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
 <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.config/dev.js"</span>//指向配置文件，而不是某一单一页面的js
}  </code></pre>
<p>再来跑一下，检测是否webpack配置都成功运作了。创建一个vue组件 <code>src/components/Hello.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>"{{"message"}}"</div>
</template>

<script>
  export default {
    data: () => ({message: 'Hello Vue.js!'})
   }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({<span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue.js!'</span>})
   }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>相应的main.js也做出修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import...from的语法是ES6的，由于已经安装了babel(可编译)，故可以直接使用
import Vue  from 'vue'  
import Hello from './components/Hello.vue'

new Vue({
  el: '#app',
  template: '<div><hello></hello></div>', 
  components: {Hello}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> <span class="hljs-keyword">import</span>...<span class="hljs-keyword">from</span>的语法是ES6的，由于已经安装了babel(可编译)，故可以直接使用
<span class="hljs-keyword">import</span> Vue  <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>  
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  template: <span class="hljs-string">'&lt;div&gt;&lt;hello&gt;&lt;/hello&gt;&lt;/div&gt;'</span>, 
  components: {Hello}
})</code></pre>
<p>运行<code>npm run dev</code>，浏览器打开 <code>localhost:3800</code> 查看结果 Hello Vue.js！ 并且改动页面会自动刷新，不需要再一遍遍command+r刷新啦。</p>
<h3 id="articleHeader4">
<a>step4</a>&nbsp;&nbsp; 配置路由</h3>
<p>1.安装 <code>vue-router</code>： <code>npm install --save vue-router@0.7</code> （当然了当下的<code>vue + axois</code> 会更搭哦）   </p>
<p>2.<code>src</code>下创建<code>views文件夹</code>，用于存放页面组件；另外再创建<code>router文件夹</code>，用于存放所有路由相关的配置    </p>
<p>3.添加路由页面 <code>src/views/Home.vue</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div><hello></hello></div>
</template>

<script>
  import Hello from 'components/Hello' //引入已写vue组件
  export default {
    components: {Hello}
   }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'components/Hello'</span> <span class="hljs-comment">//引入已写vue组件</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    components: {Hello}</span><span class="xml"><span class="undefined">
   }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>4.添加 <code>src/router/routes.js</code> 文件，用于配置项目路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Home from 'views/Home'

export default {
  '/': {
    name: 'home',
    component: Home
     }
 }   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'views/Home'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-string">'/'</span>: {
    name: <span class="hljs-string">'home'</span>,
    component: Home
     }
 }   </code></pre>
<p>5.添加路由入口文件 <code>src/router/index.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  hashbang: false,  // 关闭hash模式
  history: true,    // 开启html5history模式
  linkActiveClass: 'active' // v-link激活时添加的class，默认是`v-link-active`
})

router.map(routes)

router.beforeEach(({to, next}) => {
  console.log('---------> ' + to.name)  // 每次调整路由时打印，便于调试
  next()
})

export default router  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>

Vue.use(Router)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">hashbang</span>: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 关闭hash模式</span>
  history: <span class="hljs-literal">true</span>,    <span class="hljs-comment">// 开启html5history模式</span>
  linkActiveClass: <span class="hljs-string">'active'</span> <span class="hljs-comment">// v-link激活时添加的class，默认是`v-link-active`</span>
})

router.map(routes)

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">{to, next}</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'---------&gt; '</span> + to.name)  <span class="hljs-comment">// 每次调整路由时打印，便于调试</span>
  next()
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router  
  </code></pre>
<p>6.再次修改<code>main.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue  from 'vue'
import router from './router'  //直接导入路由配置    

const App = Vue.extend({})

router.start(App, '#app')        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue  <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>  <span class="hljs-comment">//直接导入路由配置    </span>

<span class="hljs-keyword">const</span> App = Vue.extend({})

router.start(App, <span class="hljs-string">'#app'</span>)        </code></pre>
<p>7.最后别忘了<code>index.html</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     <div id=&quot;app&quot;>"{{"message"}}"</div>  <!-- 读取Vue，替换成? -->   
     
      <router-view></router-view><!--路由替换位置-->    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  <span class="hljs-comment">&lt;!-- 读取Vue，替换成? --&gt;</span>   
     
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-comment">&lt;!--路由替换位置--&gt;</span>    </span></code></pre>
<p>可以再次执行 <code>npm run dev</code>:  浏览器直接访问 <code>localhost:3800</code>查看效果。</p>
<h3 id="articleHeader5">
<a>step5</a> &nbsp;&nbsp; 配置Vuex</h3>
<blockquote><p><a href="https://vuex.vuejs.org/en/" rel="nofollow noreferrer" target="_blank">（vuex）</a> <br>专门为vue.js开发而配套的 <strong>状态管理模式</strong> .通常用于存放和管理不同组件中的共用状态，例如不同路由页面之间的公共数据.</p></blockquote>
<p>其他 几个概念：  <br><strong>state：状态，即数据</strong> ;  <br><strong>store：数据的集合，一个vuex引用，仅有一个store，包含n个state</strong>  <br><strong>mutation：state不能直接赋值，通过mutation定义最基本的操作</strong>  <br><strong>action：在action中调用一个或多个mutation</strong>  <br><strong>getter：state不能直接取值，使用getter返回需要的state</strong>  <br><strong>module：store和state之间的一层，便于大型项目管理，store包含多个module，module包含state、mutation和action</strong>    </p>
<p>1.安装  ： <code>npm install --save vuex@1</code>  添加 <code>src/store</code> 文件夹，存放vuex相关文件，添加 <code>src/store/modules</code> 用于vuex分模块管理 ;   <br> 2.添加 <code>src/store/types.js</code>，vuex的所有mutation type（操作类型）建议放在一起，有效避免重名情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const INCREASE = 'INCREASE' // 累加
export const RESET = 'RESET' // 清零  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INCREASE = <span class="hljs-string">'INCREASE'</span> <span class="hljs-comment">// 累加</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> RESET = <span class="hljs-string">'RESET'</span> <span class="hljs-comment">// 清零  </span></code></pre>
<p>3.vuex模块，添加 <code>counter </code>模块目录 <code>store/modules/counter</code>添加 <code>store/modules/counter/actions.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {INCREASE, RESET} from 'store/types'

 export const increase = (({dispatch}) => {
 dispatch(INCREASE) // 调用type为INCREASE的mutation
})

export const reset = (({dispatch}) => {
 dispatch(RESET) // 调用type为RESET的mutation
})  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {INCREASE, RESET} <span class="hljs-keyword">from</span> <span class="hljs-string">'store/types'</span>

 <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> increase = <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params">{dispatch}</span>) =&gt; {
 dispatch(<span class="hljs-params">INCREASE</span>) <span class="hljs-comment">// 调用type为INCREASE的mutation</span>
}</span>)

<span class="hljs-params">export</span> <span class="hljs-params">const</span> <span class="hljs-params">reset</span> = (<span class="hljs-params">(<span class="hljs-params">{dispatch}</span>) =&gt; {
 dispatch(<span class="hljs-params">RESET</span>) <span class="hljs-comment">// 调用type为RESET的mutation</span>
}</span>)  
</span></code></pre>
<p>添加 <code>store/modules/counter/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import{INCREASE, RESET} from 'store/types.js'

 const state = {
    count: 0
  }

 const mutations = {
  [INCREASE] (state) { state.count++ },
  [RESET] (state) { state.count = 0 }
}

export default {state, mutations}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> import{INCREASE, RESET} <span class="hljs-keyword">from</span> 'store/types.js'

 const <span class="hljs-keyword">state</span> = {
    count: <span class="hljs-number">0</span>
  }

 const mutations = {
  [INCREASE] (<span class="hljs-keyword">state</span>) { <span class="hljs-keyword">state</span>.count++ },
  [RESET] (<span class="hljs-keyword">state</span>) { <span class="hljs-keyword">state</span>.count = <span class="hljs-number">0</span> }
}

export <span class="hljs-keyword">default</span> {<span class="hljs-keyword">state</span>, mutations}  </code></pre>
<p>4.vuex入口文件:  <code>store/index.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import counter  from 'store/modules/counter'

Vue.use(Vuex) // 确保在new Vuex.Store()之前

export default new Vuex.Store({
  modules: {counter}
 })  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> counter  <span class="hljs-keyword">from</span> <span class="hljs-string">'store/modules/counter'</span>

Vue.use(Vuex) <span class="hljs-regexp">//</span> 确保在<span class="hljs-keyword">new</span> Vuex.Store()之前

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  modules: {counter}
 })  </code></pre>
<p>5.修改<code>main.js</code>，将store引入并添加到App中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue  from 'vue'
import router from './router'
import store from 'store'

const App = Vue.extend({store})

router.start(App, '#app')  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue  <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'store'</span>

<span class="hljs-keyword">const</span> App = Vue.extend({store})

router.start(App, <span class="hljs-string">'#app'</span>)  </code></pre>
<p>6.改造一下 <code>src/components/Hello.vue</code>，把action用上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <div>
    <p>"{{"message"}}"</p>
    <p>click count: "{{"count"}}"</p>
    <button @click=&quot;increase&quot;>increase</button><!--可以直接调用引入的action-->
    <button @click=&quot;reset&quot;>reset</button>
  </div>
</template>

<script>
  import {increase, reset} from 'store/modules/counter/actions' // 引入action
  export default {
    data: () => ({message: 'Hello Vue.js!'}),
    vuex: {
    actions: {increase, reset},
    getters: {
        count: ({counter}) => counter.count
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>click count: </span><span class="hljs-template-variable">"{{"count"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"increase"</span>&gt;</span>increase<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-comment">&lt;!--可以直接调用引入的action--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"reset"</span>&gt;</span>reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> {increase, reset} <span class="hljs-keyword">from</span> <span class="hljs-string">'store/modules/counter/actions'</span> <span class="hljs-comment">// 引入action</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({<span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue.js!'</span>}),
    <span class="hljs-attr">vuex</span>: {
    <span class="hljs-attr">actions</span>: {increase, reset},
    <span class="hljs-attr">getters</span>: {
        <span class="hljs-attr">count</span>: <span class="hljs-function">(<span class="hljs-params">{counter}</span>) =&gt;</span> counter.count
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h3 id="articleHeader6">
<a>step6</a>&nbsp;&nbsp;  配置eslint  ---规范js编码</h3>
<blockquote><p>eslint定义的是编码风格，巧妙利用提供的rules，可以自定义配置 ，增减规则 ； 同时，在使用中检测不通过，不一定不能运行，只是违反了规则＝＝。监督自我。</p></blockquote>
<p>网上也已经有很多现有的配置了，建议<a href="https://github.com/feross/standard" rel="nofollow noreferrer" target="_blank">（standard）</a>   <br>1.配置<code>.eslintrc</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;parser&quot;: &quot;babel-eslint&quot;, // 支持babel
  &quot;extends&quot;: &quot;standard&quot;, // 使用eslint-config-standard的配置
  &quot;plugins&quot;: [
     &quot;html&quot; // 支持.vue文件的检测
  ],
  &quot;env&quot;: {
    &quot;browser&quot;: true, // 不会将window上的全局变量判断为未定义的变量
    &quot;es6&quot;: true // 支持es6的语法
  },
  &quot;rules&quot;: { // 自定义个别规则写在这，0忽略，1警告，2报错
  &quot;no-unused-vars&quot;: 1 // 将”未使用的变量“调整为警告级别，原为错误级别，更多规则请看官网
  }
}     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-string">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>, <span class="hljs-comment">// 支持babel</span>
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"standard"</span>, <span class="hljs-comment">// 使用eslint-config-standard的配置</span>
  <span class="hljs-string">"plugins"</span>: [
     <span class="hljs-string">"html"</span> <span class="hljs-comment">// 支持.vue文件的检测</span>
  ],
  <span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"browser"</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 不会将window上的全局变量判断为未定义的变量</span>
    <span class="hljs-string">"es6"</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 支持es6的语法</span>
  },
  <span class="hljs-string">"rules"</span>: { <span class="hljs-comment">// 自定义个别规则写在这，0忽略，1警告，2报错</span>
  <span class="hljs-string">"no-unused-vars"</span>: <span class="hljs-number">1</span> <span class="hljs-comment">// 将”未使用的变量“调整为警告级别，原为错误级别，更多规则请看官网</span>
  }
}     </code></pre>
<p>用了啥就安装啥：<code>npm install --save-dev eslint babel-esli nt eslint-config-standard eslint-plugin-standard eslint-plugin-html eslint-plugin-promis</code></p>
<h3 id="articleHeader7">
<a>step7</a>  webpack生产环境配置 ---对于编译出来的文件进行压缩，提取公共模块等操作</h3>
<p>1.添加<code>webpack.config/pro.js</code>文件，相比<code>dev.js</code>把生产环境用不到的删掉，比如webpack-dev-server、webpack-hot-replacement.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const path = require('path')
 const webpack = require('webpack')
 const merge = require('webpack-merge')
 const HtmlWebpackPlugin = require('html-webpack-plugin')
 const baseConfig = require('./base')
 const root = path.resolve(__dirname, '..')

 module.exports = merge(baseConfig, {
       plugins: [
        new HtmlWebpackPlugin({
        template: path.join(root, 'index.html'), // 模板文件
        inject: 'body' // js的script注入到body底部
     })
   ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
 <span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
 <span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
 <span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
 <span class="hljs-keyword">const</span> baseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./base'</span>)
 <span class="hljs-keyword">const</span> root = path.resolve(__dirname, <span class="hljs-string">'..'</span>)

 <span class="hljs-built_in">module</span>.exports = merge(baseConfig, {
       <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">template</span>: path.join(root, <span class="hljs-string">'index.html'</span>), <span class="hljs-comment">// 模板文件</span>
        inject: <span class="hljs-string">'body'</span> <span class="hljs-comment">// js的script注入到body底部</span>
     })
   ]
})
</code></pre>
<blockquote><p><a href="https://webpack.github.io/docs/list-of-plugins.html" rel="nofollow noreferrer" target="_blank">（常用插件）</a>  ：</p></blockquote>
<p>extract-text-webpack-plugin 提取css到单独的文件  <br>compression-webpack-plugin 压缩gzip  <br>webpack.optimize.UglifyJsPlugin 压缩js文件，内置插件  <br>.....    </p>
<p>2.在<code>package.json</code>中添加运行脚本：<code>"build": "webpack --config webpack.config/pro.js"</code>;  </p>
<p>3.运行<code>npm run build</code>，可以在<code>dist</code>文件夹中看到打包好的文件~~</p>
<h3 id="articleHeader8">webpack+vue的环境搭建到此算是初见雏形了，具体时实际运用还需要更多的实践</h3>
<h2 id="articleHeader9"><a>常见错误总结</a></h2>
<h4>安装一些npm包失败：  出现背景：执行npm install --save dev ....时</h4>
<p><span class="img-wrap"><img data-src="/img/bVNSJ1?w=865&amp;h=176" src="https://static.alili.tech/img/bVNSJ1?w=865&amp;h=176" alt="" title="" style="cursor: pointer;"></span></p>
<p>查问题<code>shasum check failed</code>：  </p>
<p><span class="img-wrap"><img data-src="/img/bVNSLl?w=865&amp;h=559" src="https://static.alili.tech/img/bVNSLl?w=865&amp;h=559" alt="" title="" style="cursor: pointer;"></span><br>人话：npm镜像源错误。</p>
<p>解决：<strong>1.通过config命令</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry http://registry.cnpmjs.org 
npm info underscore  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code>npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">registry</span> <span class="hljs-keyword">http</span>://<span class="hljs-keyword">registry</span>.cnpmjs.org 
npm <span class="hljs-keyword">info</span> underscore  
</code></pre>
<p><strong>2.命令行指定</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm --registry http://registry.cnpmjs.org info underscore " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;">npm --<span class="hljs-keyword">registry</span> <span class="hljs-keyword">http</span>://<span class="hljs-keyword">registry</span>.cnpmjs.org <span class="hljs-keyword">info</span> underscore </code></pre>
<p>以上两种都可以快速解决安装问题，但治标不治本，下次安装时仍会出现。因此推荐?，直接在配置中指定写死，一劳永逸～  </p>
<p><strong>3.编辑    <code>~/.npmrc </code>加入如下配置：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registry = http://registry.cnpmjs.org  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">registry</span> = <span class="hljs-keyword">http</span>://<span class="hljs-keyword">registry</span>.cnpmjs.org  </code></pre>
<h4>npm版本太低报错：</h4>
<p><span class="img-wrap"><img data-src="/img/bVNSLu?w=865&amp;h=372" src="https://static.alili.tech/img/bVNSLu?w=865&amp;h=372" alt="" title="" style="cursor: pointer;"></span><br> 解决：  <br><strong>1、首先安装n模块</strong> <code>npm install -g n</code>      </p>
<p><strong>2、升级node.js到最新稳定版</strong> <code>n&nbsp;stable </code>    <br> 若确定在最新版本中还是在报错的话，则需要检查是否时webpack.config中配置有错误，webpack@1.xx-&gt;webpack@2.xx 各中的<a href="https://segmentfault.com/a/1190000008181955">（升级特性）</a> 还是很重要的</p>
<h4>出现segmentation fault 11报错： 出现背景：在一次需要最新版本的node时，舍弃了$n stable稳定版（因为系统还是提示需要升级最新版）执行 <code>sudo n latest </code> 后升级过慢，中间不够稳定，直接强行被退出。之后再运行，关于npm 和node 的所有命令均在报segmentation fault 11这个错误。</h4>
<p><span class="img-wrap"><img data-src="/img/bVNSLX?w=864&amp;h=212" src="https://static.alili.tech/img/bVNSLX?w=864&amp;h=212" alt="" title="" style="cursor: pointer;"></span></p>
<p>以为os被玩坏了，系统错乱，吓死宝宝了＝＝。      </p>
<p>原因：执行n命令，显示当前没有选中任何版本。 解决：用n命令重新设置要使用的版本 <code>sudo n 版本号</code><br><span class="img-wrap"><img data-src="/img/bVNSL5?w=865&amp;h=281" src="https://static.alili.tech/img/bVNSL5?w=865&amp;h=281" alt="" title="" style="cursor: pointer;"></span></p>
<h4>版本太低的报错</h4>
<p><span class="img-wrap"><img data-src="/img/bVNSMf?w=865&amp;h=115" src="https://static.alili.tech/img/bVNSMf?w=865&amp;h=115" alt="" title="" style="cursor: pointer;"></span><br>解决：执行<code>npm install --save-dev  eslint-plugin-import@^2.0.0</code>  <br><code>npm install --save-dev eslint-plugin-node@4.2.2</code></p>
<blockquote><p>完。感谢阅读，不足之处欢迎指出～thx!</p></blockquote>
<blockquote><blockquote><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wendy.wenxia@foxmail.com    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   2017/05/18</p></blockquote></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack + vue 搭建

## 原文链接
[https://segmentfault.com/a/1190000009466326](https://segmentfault.com/a/1190000009466326)

