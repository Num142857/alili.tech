---
title: '看完这篇就看懂了很多webpack脚手架' 
date: 2019-01-28 2:30:10
hidden: true
slug: ejfzkrv1rgo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>2018.3.1更：</blockquote>
<p>有赞·微商城(base杭州)部门招前端啦，最近的前端hc有十多个，跪求大佬扔简历，我直接进行内推实时反馈进度，有兴趣的邮件 lvdada#youzan.com，或直接微信勾搭我 wsldd225 了解跟多</p>
<p>有赞开源组件库·<a href="https://www.youzanyun.com/zanui" rel="nofollow noreferrer" target="_blank">zanUI</a></p>
<hr>
<h2 id="articleHeader0">分割webpack配置文件的多种方法</h2>
<h3 id="articleHeader1">（一）</h3>
<p>将你的配置信息写到多个分散的文件中去，然后在执行webpack的时候利用<code>--config</code>参数指定要加载的配置文件，配置文件利用module<code>imports</code>导出。你可以在<a href="https://github.com/webpack/react-starter" rel="nofollow noreferrer" target="_blank">webpack/react-starter</a> 看到是使用这种发方法的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack 配置文件

|-- webpack-dev-server.config.js
|-- webpack-hot-dev-server.config.js
|-- webpack-production.config.js
|-- webpack.config.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// webpack 配置文件</span>

<span class="hljs-string">|-- webpack-dev-server.config.js</span>
<span class="hljs-string">|-- webpack-hot-dev-server.config.js</span>
<span class="hljs-string">|-- webpack-production.config.js</span>
<span class="hljs-string">|-- webpack.config.js</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm 命令

&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;dev-server&quot;: &quot;webpack-dev-server --config webpack-dev-server.config.js --progress --colors --port 2992 --inline&quot;,
    &quot;hot-dev-server&quot;: &quot;webpack-dev-server --config webpack-hot-dev-server.config.js --hot --progress --colors --port 2992 --inline&quot;,
    &quot;build&quot;: &quot;webpack --config webpack-production.config.js --progress --profile --colors&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">//</span> <span class="hljs-comment">npm</span> <span class="hljs-comment">命令</span>

<span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
    <span class="hljs-comment">"test":</span> <span class="hljs-comment">"echo</span> <span class="hljs-comment">\"Error:</span> <span class="hljs-comment">no</span> <span class="hljs-comment">test</span> <span class="hljs-comment">specified\"</span> <span class="hljs-comment">&amp;&amp;</span> <span class="hljs-comment">exit</span> <span class="hljs-comment">1"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server":</span> <span class="hljs-comment">"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">port</span> <span class="hljs-comment">2992</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"hot</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server":</span> <span class="hljs-comment">"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">port</span> <span class="hljs-comment">2992</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"build":</span> <span class="hljs-comment">"webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">production</span><span class="hljs-string">.</span><span class="hljs-comment">config</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span>
  <span class="hljs-comment">}</span><span class="hljs-string">,</span></code></pre>
<h3 id="articleHeader2">（二）</h3>
<p>调用第三方的webpack工具，使用其集成的api，方便进行webpack配置。<a href="https://github.com/HenrikJoreteg/hjs-webpack" rel="nofollow noreferrer" target="_blank">HenrikJoreteg/hjs-webpack</a> 这个repo就是这么做的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getConfig = require('hjs-webpack')


module.exports = getConfig({
  // entry point for the app
  in: 'src/app.js',

  // Name or full path of output directory
  // commonly named `www` or `public`. This
  // is where your fully static site should
  // end up for simple deployment.
  out: 'public',

  // This will destroy and re-create your
  // `out` folder before building so you always
  // get a fresh folder. Usually you want this
  // but since it's destructive we make it
  // false by default
  clearBeforeBuild: true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hjs-webpack'</span>)


<span class="hljs-built_in">module</span>.exports = getConfig({
  <span class="hljs-comment">// entry point for the app</span>
  <span class="hljs-keyword">in</span>: <span class="hljs-string">'src/app.js'</span>,

  <span class="hljs-comment">// Name or full path of output directory</span>
  <span class="hljs-comment">// commonly named `www` or `public`. This</span>
  <span class="hljs-comment">// is where your fully static site should</span>
  <span class="hljs-comment">// end up for simple deployment.</span>
  out: <span class="hljs-string">'public'</span>,

  <span class="hljs-comment">// This will destroy and re-create your</span>
  <span class="hljs-comment">// `out` folder before building so you always</span>
  <span class="hljs-comment">// get a fresh folder. Usually you want this</span>
  <span class="hljs-comment">// but since it's destructive we make it</span>
  <span class="hljs-comment">// false by default</span>
  clearBeforeBuild: <span class="hljs-literal">true</span>
})</code></pre>
<h3 id="articleHeader3">（三） Scalable webpack configurations</h3>
<blockquote>ones that can be reused and combined with other partial configurations</blockquote>
<p>在单个配置文件中维护配置，但是区分好条件分支。调用不同的npm命令时候设置不同的环境变量，然后在分支中匹配，返回我们需要的配置文件。</p>
<p>这样做的好处可以在一个文件中管理不同npm操作的逻辑，并且可以共用相同的配置。<a href="https://www.npmjs.org/package/webpack-merge" rel="nofollow noreferrer" target="_blank">webpack-merge</a>这个模块可以起到合并配置的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const parts = require('./webpack-config/parts');

switch(process.env.npm_lifecycle_event) {
  case 'build': 
    config = merge(common, 
      parts.clean(PATHS.build),
      parts.setupSourceMapForBuild(),
      parts.setupCSS(PATHS.app),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react', 'vue', 'vuex']
      }),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.minify()
      );
    break;
  default: 
    config = merge(common, 
      parts.setupSourceMapForDev(),
      parts.devServer(), 
      parts.setupCSS(PATHS.app));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>
const parts = require('./webpack-config/parts');

switch(process.env.npm_lifecycle_event) {
  <span class="hljs-attribute">case 'build'</span>: 
    config = merge(common, 
      parts<span class="hljs-variable">.clean</span>(PATHS<span class="hljs-variable">.build</span>),
      parts<span class="hljs-variable">.setupSourceMapForBuild</span>(),
      parts<span class="hljs-variable">.setupCSS</span>(PATHS<span class="hljs-variable">.app</span>),
      parts<span class="hljs-variable">.extractBundle</span>({
        name: 'vendor',
        entries: ['react', 'vue', 'vuex']
      }),
      parts<span class="hljs-variable">.setFreeVariable</span>('process<span class="hljs-variable">.env</span><span class="hljs-variable">.NODE_ENV</span>', 'production'),
      parts<span class="hljs-variable">.minify</span>()
      );
    <span class="hljs-attribute">break;
  default</span>: 
    config = merge(common, 
      parts<span class="hljs-variable">.setupSourceMapForDev</span>(),
      parts<span class="hljs-variable">.devServer</span>(), 
      parts<span class="hljs-variable">.setupCSS</span>(PATHS<span class="hljs-variable">.app</span>));
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// minify example
exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        },
        comments: false,
        beautify: false
      })
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">minify</span> <span class="hljs-string">example</span>
<span class="hljs-string">exports.minify</span> <span class="hljs-string">=</span> <span class="hljs-string">function</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
  <span class="hljs-string">return</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    plugins:</span> <span class="hljs-string">[</span>
      <span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">        compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          warnings:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">          drop_console:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        comments:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        beautify:</span> <span class="hljs-literal">false</span>
      <span class="hljs-string">})</span>
    <span class="hljs-string">]</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<h2 id="articleHeader4">开发环境下的自动刷新</h2>
<h3 id="articleHeader5">webpack-dev-server</h3>
<p><code>webpack-dev-server</code>在webpack的<code>watch</code>基础上开启服务器。</p>
<p><code>webpack-dev-server</code>是运行在内存中的开发服务器，支持高级webpack特性<code>hot module replacement</code>。这对于react vue这种组件化开发是很方便的。</p>
<p>使用webpack-dev-server命令开启服务器，配合HMR及可以实现代码更改浏览器局部刷新的能力。</p>
<h3 id="articleHeader6">hot module replacement</h3>
<blockquote>Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running without a page reload. <br>当应用在运行期间hmr机制能够修改、添加、或者移除相应的模块，而不使整个页面刷新。</blockquote>
<p>hmr机制适用于单页应用。</p>
<p>要实现hmr机制，需要配合<code>webpack-dev-server</code>服务器，这个服务器本身就实现了监察<code>watch</code>文件改动的能力，再开启HMR选项，就添加了watch模块变化的能力。这是HMR机制能生效的基础。</p>
<h4>从webpack编译器角度</h4>
<p>每次修改一个模块的时候，webpack会生成两部分，一个是<code>manifest.json</code>，另一部分是关于这次模块更新编译完成的chunks。manifest.json中存着的是chunk更改前后的hash值。</p>
<p>从编译器webpack的角度来讲提供了hmr的原材料。供后续使用。</p>
<h4>从模块的角度</h4>
<p>模块发生变化时，webpack会生成之前讲过的两部分基础文件，但是何时将变化后的模块应用到app中去？这里就需要在应用代码中编写handler去接受到模块变化信息。但是不能在所有模块中编写handler吧？这里就用到了消息冒泡机制。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972136?w=1560&amp;h=660" src="https://static.alili.tech/img/remote/1460000007972136?w=1560&amp;h=660" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如图A.js、C.js没有相关hmr代码，B.js有相关hmr代码，如果c模块发生了变化，c模块没有hmr，那么就会冒泡到a、b模块。b模块捕捉到了消息，hmr运行时会相应的执行一些操作，而a.js捕捉不到信息，会冒泡到entry.js，而一旦有消息冒泡的入口块，这就代表本次hmr失败了，hmr会降级进行整个页面的reload。</p>
<h4>从HMR运行时的角度</h4>
<p>HMR运行时是一些相关的操作api，运行时支持两个方法： <code>check</code>、<code>apply</code>。</p>
<p><code>check</code>发起 HTTP 请求去获取更新的 manifest，以及一些更新过后的chunk。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972137?w=1366&amp;h=86" src="https://static.alili.tech/img/remote/1460000007972137?w=1366&amp;h=86" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">环境变量的设置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var env = {
    'process.env.NODE_ENV': '&quot;production&quot;'
}
new webpack.DefinePlugin(env)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> env = {
    <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"production"'</span>
}
<span class="hljs-keyword">new</span> webpack.DefinePlugin(env)</code></pre>
<p>注意这里单引号间多了个双引号 why？</p>
<p>以及webpack.DefinePlugin插件的原理？</p>
<p>开发的时候会想写很多只在开发环境出现的代码，比如接口mock等，在build命令后这些代码不会存在。</p>
<p>这对框架或者插件、组件的开发是很有帮助的。vue，react等都会这么做。可以在这些框架的dev模式提供很多有用的提示信息。</p>
<h2 id="articleHeader8">打包文件分割</h2>
<h3 id="articleHeader9">为何要进行打包文件分割？</h3>
<p>对于一个单页应用项目来说，有分为业务代码和第三方代码，业务代码会频繁改动，而第三方代码一般来讲变动的次数较少，如果每次修改业务代码都需要用户将整个js文件都重新下载一遍，对于加载性能来讲是不可取的，所以一般而言我们会将代码分为业务代码和第三方代码分别进行打包，虽然多了一个请求的文件，增加了一些网络开销，但是相比于浏览器能将文件进行缓存而言，这些开销是微不足道的。</p>
<p>我们在entry中定义了<code>app</code>入口，相应的业务逻辑都封装在这个入口文件里，如果我们想要第三方代码独立出来，就要再增加一个入口，我们习惯使用<code>vendor</code>这个命名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

require('vue');
require('vuex');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app.js</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'vuex'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js


entry: {
    app: 'app/app.js',
    vendor: ['vue', 'vuex'],
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack.config.js</span>


<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">app</span>: <span class="hljs-string">'app/app.js'</span>,
    <span class="hljs-attribute">vendor</span>: [<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vuex'</span>],
  },</code></pre>
<p>vendor入口的传参是以一个数组的形式传递的，这是一种非常方便的注入多个依赖的方式，并且能把多个依赖一起打包到一个chunk中。而且不用手动的创建真实存在的入口文件。</p>
<p>这相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vendor.js

require('vue');
require('vuex');

// app.js

require('vue');
require('vuex');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// vendor.js</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'vuex'</span>);

<span class="hljs-comment">// app.js</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'vuex'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js


entry: {
    app: 'app/app.js',
    vendor: 'app/vendor.js',
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack.config.js</span>


<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">app</span>: <span class="hljs-string">'app/app.js'</span>,
    <span class="hljs-attribute">vendor</span>: <span class="hljs-string">'app/vendor.js'</span>,
  },</code></pre>
<p>但是这样做只是声明了一个<code>vendor</code>入口而已，对于app这个入口来说，打包完成的文件还是会有vue和vuex依赖，而新增的入口<code>vendor</code>打包完成的文件也有了vue和vuex两个依赖。模块依赖关系如下图所示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972138?w=1170&amp;h=470" src="https://static.alili.tech/img/remote/1460000007972138?w=1170&amp;h=470" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里的A可以代表<code>vue</code>依赖，最后生成的打包文件是两个平行关系的文件，且都包含vue的依赖。</p>
<p>此时需要引入<code>CommonsChunkPlugin</code>插件</p>
<blockquote>This is a pretty complex plugin. It fundamentally allows us to extract all the common modules from different bundles and add them to the common bundle. If a common bundle does not exist, then it creates a new one.</blockquote>
<p>这是个相当复杂的插件，他的基础功能是允许我们从不同的打包文件中抽离出相同的模块，然后将这些模块加到公共打包文件中。如果公共打包文件不存在，则新增一个。<strong>同时这个插件也会将运行时（runtime）转移到公共chunk打包文件中。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972139?w=1192&amp;h=584" src="https://static.alili.tech/img/remote/1460000007972139?w=1192&amp;h=584" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>plugins: [
  new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
    names: [<span class="hljs-string">'vendor'</span>, <span class="hljs-string">'manifest'</span>]
  })
]</code></pre>
<p>这里的name可以选择已经存在的块，这里就选择了vendor块，因为我们本来就是将vendor块当做管理第三方代码的入口的。</p>
<p>而names传入一个数组，数组里包含两个trunk name，表示<code>CommonsChunkPlugin</code>插件会执行两次这个方法，第一次将公共的第三方代码抽离移到vendor的块中，这个过程之前也讲过会将运行时runtime也转移到vendor块中，第二次执行则是将运行时runtime抽离出来转移到manifest块中。这步操作解决了缓存问题。</p>
<p>这样处理，最后会生成3个打包文件chunk，app.js是业务代码，vendor则是公共的第三方代码，manifest.js则是运行时。</p>
<h2 id="articleHeader10">chunk type 块的类型大揭秘</h2>
<p>webpack1.0官网介绍中的chunk类型读起来及其拗口<a href="http://webpack.github.io/docs/code-splitting.html#chunk-types" rel="nofollow noreferrer" target="_blank">chunk type</a>， 所以我这里解读一下。</p>
<p><code>chunk</code>是webpack中最基本的概念之一，且<code>chunk</code>常常会和<code>entry</code>弄混淆。在「打包文件分割部分」我们定义了两个入口entry point -- app和vendor，而通过一些配置，webpack会生成最后的一些打包文件，在这个例子中最后生成的文件有<code>app.js 、 vendor.js 、 manifest.js</code>。这些文件便被称为块<code>chunk</code>。</p>
<p><strong>entry &amp; chunk 可以简单的理解为一个入口、一个出口</strong></p>
<p>在官方1.0文档中webpack的chunk类型分为三种：</p>
<ol>
<li>entry chunk 入口块</li>
<li>normal chunk 普通块</li>
<li>initial chunk 初始块</li>
</ol>
<h3 id="articleHeader11">entry chunk 入口块</h3>
<p><code>entry chunk 入口块</code>不能由字面意思理解为由入口文件编译得到的文件，由官网介绍</p>
<blockquote>An entry chunk contains the runtime plus a bunch of modules</blockquote>
<p>可以理解为包含runtime运行时的块可以称为entry chunk，一旦原本存在运行时（runtime）的<code>entry chunk</code>失去了运行时，这个块就会转而变成<code>initial chunk</code>。</p>
<h3 id="articleHeader12">normal chunk 普通块</h3>
<blockquote>A normal chunk contains no runtime. It only contains a bunch of modules.</blockquote>
<p>普通块不包含运行时runtime，只包含一系列模块。但是在应用运行时，普通块可以动态的进行加载。通常会以jsonp的包装方式进行加载。而<code>code splitting</code>主要使用的就是普通块。</p>
<h3 id="articleHeader13">initial chunk 初始块</h3>
<blockquote>An initial chunk is a normal chunk.</blockquote>
<p>官方对initial chunk的定义非常简单，初始块就是普通块，跟普通块相同的是同样不包含运行时runtime，不同的是初始块是计算在初始加载过程时间内的。在介绍入口块entry chunk的时候也介绍过，一旦入口块失去了运行时，就会变成初始块。这个转变经常由<code>CommonsChunkPlugin </code>插件实现。</p>
<h3 id="articleHeader14">例子解释</h3>
<p>还是拿「打包文件分割」的代码做例子，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

require('vue');
require('vuex');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app.js</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'vuex'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js


entry: {
    app: 'app/app.js',
    vendor: ['vue', 'vuex'],
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack.config.js</span>


<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">app</span>: <span class="hljs-string">'app/app.js'</span>,
    <span class="hljs-attribute">vendor</span>: [<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vuex'</span>],
  },</code></pre>
<p>没有使用<code>CommonsChunkPlugin</code>插件之前，两个entry分别被打包成两个chunk，而这两个chunk每个都包含了运行时，此时被称为<code>entry chunk</code>入口块。</p>
<p>而一旦使用了<code>CommonsChunkPlugin</code>插件，运行时runtime最终被转移到了<code>manifest.js</code>文件，此时最终打包生成的三个chunk<code>app.js 、 vendor.js 、 manifest.js</code>，app.js、vendor.js失去了runtime就由入口块变成初始块。</p>
<h2 id="articleHeader15">code splitting</h2>
<p>前文有讲到将依赖分割开来有助于浏览器缓存，提高用户加载速度，但是当业务复杂度增加，代码量大始终是一个问题。这时候就需要<code>normal chunk</code>普通块的动态加载能力了。</p>
<blockquote>It allows you to split your code into various bundles which you can then load on demand — like when a user navigates to a matching route, or on an event from the user. <br>code splitting 允许我们将代码分割到可以按需加载的不同的打包文件中，当用户导航到对应的路由上时，或者是用户触发一个事件时，异步加载相应的代码。</blockquote>
<p>我们需要在业务逻辑中手动添加一些分割点，标明此处事件逻辑之后进行代码块的异步加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// test
window.addEventListener('click', function () {
  require.ensure(['vue', 'vuex'], function (require) {

  })  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// test</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vuex'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{

  })  
})</code></pre>
<p>这段代码表明当用户点击时，异步请求一个js文件，这个文件中包含该有<code>vue vuex</code>的依赖。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972140?w=1044&amp;h=168" src="https://static.alili.tech/img/remote/1460000007972140?w=1044&amp;h=168" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>打包后会根据手动分割点的信息生成一个打包文件，就是图中第一行<code>0</code>开头的文件。这个文件也就是异步加载的文件。</p>
<p>下面是之前的一个vue项目，采用<code>code splitting</code>将几个路由抽离出来异步加载之后，文件由212kb减少到了137kb，同样样式文件也由58kb减少到了7kb。对于首屏渲染来说，性能是会增加不少的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972141?w=1048&amp;h=208" src="https://static.alili.tech/img/remote/1460000007972141?w=1048&amp;h=208" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007972142?w=1056&amp;h=236" src="https://static.alili.tech/img/remote/1460000007972142?w=1056&amp;h=236" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>有需要交流的可以联系我微博<a href="http://weibo.com/u/2115840795" rel="nofollow noreferrer" target="_blank">达达的暹罗猫</a></p>
<p>参考：</p>
<ul>
<li><a href="http://itsclem.com/?p=1036" rel="nofollow noreferrer" target="_blank">http://itsclem.com/?p=1036</a></li>
<li><a href="https://webpack.js.org/concepts/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/concepts/</a></li>
<li><a href="https://blog.oyyd.net/post/how_does_react_hot_loader_works" rel="nofollow noreferrer" target="_blank">https://blog.oyyd.net/post/ho...</a></li>
<li><a href="http://webpack.github.io/docs/hot-module-replacement-with-webpack.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a></li>
<li><a href="http://survivejs.com/webpack/introduction/" rel="nofollow noreferrer" target="_blank">http://survivejs.com/webpack/...</a></li>
<li><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
看完这篇就看懂了很多webpack脚手架

## 原文链接
[https://segmentfault.com/a/1190000007972133](https://segmentfault.com/a/1190000007972133)

