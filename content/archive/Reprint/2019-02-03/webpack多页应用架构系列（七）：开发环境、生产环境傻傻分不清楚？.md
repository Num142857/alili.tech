---
title: 'webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？' 
date: 2019-02-03 2:30:40
hidden: true
slug: uy878gdjlsb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006952432"><code>https://segmentfault.com/a/1190000006952432</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>开发环境与生产环境分离的原因如下：</p>
<ul>
<li>在开发时，不可避免会产生大量debug又或是测试的代码，这些代码不应出现在生产环境中（也即不应提供给用户）。</li>
<li>在把页面部署到服务器时，为了追求极致的技术指标，我们会对代码进行各种各样的优化，比如说混淆、压缩，这些手段往往会彻底破坏代码本身的可读性，不利于我们进行debug等工作。</li>
<li>数据源的差异化，比如说在本地开发时，读取的往往是本地mock出来的数据，而正式上线后读取的自然是API提供的数据了。</li>
</ul>
<p>如果硬是要在开发环境和生产环境用完全一样的代码，那么必然会付出沉重的代价，这点想必也不用多说了。</p>
<p>下面主要针对两点来介绍如何分离开发环境和生产环境：一是如何以不同的方式进行编译，也即如何分别形成开发环境及生产环境的webpack配置文件；二是在业务代码中如何根据环境的不同而做出不同的处理。</p>
<h2 id="articleHeader1">如何分离开发环境和生产环境的webpack配置文件</h2>
<p>如果同时把一份完整的开发环境配置文件和一份完整的生产环境配置文件列在一起进行比较，那么会出现以下三种情况：</p>
<ul>
<li>开发环境有的配置，生产环境不一定有，比如说开发时需要生成sourcemap来帮助debug，又或是热更新时使用到的<code>HotModuleReplacementPlugin</code>。</li>
<li>生产环境有的配置，开发环境不一定有，比如说用来混淆压缩js用的<code>UglifyJsPlugin</code>。</li>
<li>开发环境和生产环境都拥有的配置，但在细节上有所不同，比如说<code>output.publicPath</code>，又比如说<code>css-loader</code>中的<code>minimize</code>和<code>autoprefixer</code>参数。</li>
</ul>
<p>更重要的是，实际上开发环境和生产环境的配置文件的绝大部分都是一致的，对于这一致的部分来说，我们坚决要消除冗余，否则后续维护起来不仅麻烦，而且还容易出错。</p>
<h3 id="articleHeader2">怎么做呢？</h3>
<p>答案很简单：分拆webpack配置文件成N个小module。原先我们是一个完整的配置文件，有好几百行，从头看到尾都头大了，更别说分离不分离的了。下面来看看我分离的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─webpack.dev.config.js # 开发环境的webpack配置文件（无实质内容，仅为组织整理）
├─webpack.config.js # 生产环境的webpack配置文件（无实质内容，仅为组织整理）
├─webpack-config # 存放分拆后的webpack配置文件
  ├─entry.config.js # webpack配置中的各个大项，这一级目录里的文件都是
  ├─module.config.js
  ├─output.config.js
  ├─plugins.dev.config.js # 俩环境配置中不一致的部分，此文件由开发环境配置文件webpack.dev.config.js来加载
  ├─plugins.product.config.js # 俩环境配置中不一致的部分，此文件由生产环境配置文件webpack.config.js来加载
  ├─resolve.config.js
  │  
  ├─base # 主要是存放一些变量
  │   ├─dir-vars.config.js
  │   ├─page-entries.config.js
  │      
  ├─inherit # 存放生产环境和开发环境相同的部分，以供继承
  │   ├─plugins.config.js
  │      
  └─vendor # 存放webpack兼容第三方库所需的配置文件
      ├─eslint.config.js
      ├─postcss.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├─webpack.dev.config.js <span class="hljs-comment"># 开发环境的webpack配置文件（无实质内容，仅为组织整理）</span>
├─webpack.config.js <span class="hljs-comment"># 生产环境的webpack配置文件（无实质内容，仅为组织整理）</span>
├─webpack-config <span class="hljs-comment"># 存放分拆后的webpack配置文件</span>
  ├─entry.config.js <span class="hljs-comment"># webpack配置中的各个大项，这一级目录里的文件都是</span>
  ├─module.config.js
  ├─output.config.js
  ├─plugins.dev.config.js <span class="hljs-comment"># 俩环境配置中不一致的部分，此文件由开发环境配置文件webpack.dev.config.js来加载</span>
  ├─plugins.product.config.js <span class="hljs-comment"># 俩环境配置中不一致的部分，此文件由生产环境配置文件webpack.config.js来加载</span>
  ├─resolve.config.js
  │  
  ├─base <span class="hljs-comment"># 主要是存放一些变量</span>
  │   ├─dir-vars.config.js
  │   ├─page-entries.config.js
  │      
  ├─inherit <span class="hljs-comment"># 存放生产环境和开发环境相同的部分，以供继承</span>
  │   ├─plugins.config.js
  │      
  └─vendor <span class="hljs-comment"># 存放webpack兼容第三方库所需的配置文件</span>
      ├─eslint.config.js
      ├─postcss.config.js</code></pre>
<p>文件目录结构看过了，接下来看一下我是如何组织整理最后的配置文件的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 开发环境webpack配置文件webpack.dev.config.js */
module.exports = {
  entry: require('./webpack-config/entry.config.js'),

  output: require('./webpack-config/output.config.js'),

  module: require('./webpack-config/module.config.js'),

  resolve: require('./webpack-config/resolve.config.js'),

  plugins: require('./webpack-config/plugins.dev.config.js'),

  eslint: require('./webpack-config/vendor/eslint.config.js'),

  postcss: require('./webpack-config/vendor/postcss.config.js'),
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 开发环境webpack配置文件webpack.dev.config.js */</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/entry.config.js'</span>),

  <span class="hljs-attr">output</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/output.config.js'</span>),

  <span class="hljs-attr">module</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/module.config.js'</span>),

  <span class="hljs-attr">resolve</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/resolve.config.js'</span>),

  <span class="hljs-attr">plugins</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/plugins.dev.config.js'</span>),

  <span class="hljs-attr">eslint</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/vendor/eslint.config.js'</span>),

  <span class="hljs-attr">postcss</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack-config/vendor/postcss.config.js'</span>),
};</code></pre>
<p>这样，你就可以很轻松地处理开发/生产环境配置文件中相同与不同的部分了。</p>
<h3 id="articleHeader3">如何分别调用开发/生产环境的配置文件呢？</h3>
<p>还记得我在《<a href="https://segmentfault.com/a/1190000006863968#articleHeader0">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？</a>》里讲过，我们在控制台调用webpack命令来启动打包时，可以添加上<code>--config</code>参数来指定webpack配置文件的路径吗？我们可以配合上<code>npm scripts</code>来使用，在package.json里定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;node build-script.js &amp;&amp; webpack --progress --colors&quot;,
    &quot;dev&quot;: &quot;node build-script.js &amp;&amp; webpack --progress --colors --config ./webpack.dev.config.js&quot;,
    &quot;watch&quot;: &quot;webpack --progress --colors --watch --config ./webpack.dev.config.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"node build-script.js &amp;&amp; webpack --progress --colors"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"node build-script.js &amp;&amp; webpack --progress --colors --config ./webpack.dev.config.js"</span>,
    <span class="hljs-attr">"watch"</span>: <span class="hljs-string">"webpack --progress --colors --watch --config ./webpack.dev.config.js"</span>
  },</code></pre>
<p>这样一来，当我们开发的时候就可以使用<code>npm run dev</code>或<code>npm run watch</code>，而到要上线打包的时候就运行<code>npm run build</code>。</p>
<h2 id="articleHeader4">业务代码如何判断生产/开发环境</h2>
<p>在业务代码里要判断生产/开发环境其实很简单，只需一个变量即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (IS_PRODUCTION) {
    // 做生产环境该做的事情
} else {
    // 做开发环境该做的事情
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (IS_PRODUCTION) {
    <span class="hljs-comment">// 做生产环境该做的事情</span>
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 做开发环境该做的事情</span>
}</code></pre>
<p>这么一来，关键就在于这变量<code>IS_PRODUCTION</code>是怎么来的了。</p>
<p>在我还没分离开发和生产环境时，我用的办法是，开发时在业务代码所使用的配置文件中把这变量设为<code>false</code>，而在最后打包上线时就手动改为<code>true</code>。这种方法我用过一段时间，非常繁琐，而且经常上线后发现，我嘞个去怎么ajax读的是我本地的mock服务器。</p>
<h3 id="articleHeader5">怎么做呢？</h3>
<p>我参考了许多文章，先粗略讲讲我没有采用的方法：</p>
<ul>
<li>用<code>EnvironmentPlugin</code>引入process.env，这样就可以在业务代码中靠<code>process.env.NODE_ENV</code>来判断了。</li>
<li>用<code>ProvidePlugin</code>来控制在不同环境里加载不同的配置文件（业务代码用的）。</li>
</ul>
<p>那我用的是什么方法呢？我最后选用的是<a href="http://webpack.github.io/docs/list-of-plugins.html#defineplugin" rel="nofollow noreferrer" target="_blank"><code>DefinePlugin</code></a>。</p>
<p>举个官方例子，其大概用法是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify(&quot;5fa3b9&quot;),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: &quot;1+1&quot;,
    &quot;typeof window&quot;: JSON.stringify(&quot;object&quot;)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-attr">PRODUCTION</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-literal">true</span>),
    <span class="hljs-attr">VERSION</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">"5fa3b9"</span>),
    <span class="hljs-attr">BROWSER_SUPPORTS_HTML5</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">TWO</span>: <span class="hljs-string">"1+1"</span>,
    <span class="hljs-string">"typeof window"</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">"object"</span>)
})</code></pre>
<p><code>DefinePlugin</code>可能会被误认为其作用是在webpack配置文件中为编译后的代码上下文环境设置全局变量，但其实不然。它真正的机制是：<code>DefinePlugin</code>的参数是一个object，那么其中会有一些<code>key-value</code>对。在webpack编译的时候，会把业务代码中没有定义（使用var/const/let来预定义的）而变量名又与<code>key</code>相同的变量（直接读代码的话的确像是全局变量）替换成<code>value</code>。例如上面的官方例子，<code>PRODUCTION</code>就会被替换为<code>true</code>；<code>VERSION</code>就会被替换为<code>'5fa3b9'</code>（注意单引号）；<code>BROWSER_SUPPORTS_HTML5</code>也是会被替换为<code>true</code>；<code>TWO</code>会被替换为<code>1+1</code>（相当于是一个数学表达式）；<code>typeof window</code>就被替换为<code>'object'</code>了。</p>
<p>再举个例子，比如你在代码里是这么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!PRODUCTION)
    console.log('Debug info')
if (PRODUCTION)
    console.log('Production log')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!PRODUCTION)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Debug info'</span>)
<span class="hljs-keyword">if</span> (PRODUCTION)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Production log'</span>)</code></pre>
<p>那么在编译生成的代码里就会是这样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!true)
    console.log('Debug info')
if (true)
    console.log('Production log')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-literal">true</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Debug info'</span>)
<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Production log'</span>)</code></pre>
<p>而如果你用了<code>UglifyJsPlugin</code>，则会变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('Production log')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Production log'</span>)</code></pre>
<p>如此一来，只要在俩环境的配置文件里用<code>DefinePlugin</code>分别定义好<code>IS_PRODUCTION</code>的值，我们就可以在业务代码里进行判断了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /* global IS_PRODUCTION:true */
  if (!IS_PRODUCTION) {
    console.log('如果你看到这个Log，那么这个版本实际上是开发用的版本');
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">/* global IS_PRODUCTION:true */</span>
  <span class="hljs-keyword">if</span> (!IS_PRODUCTION) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'如果你看到这个Log，那么这个版本实际上是开发用的版本'</span>);
  }</code></pre>
<p>需要注意的是，如果你在webpack里整合了ESLint，那么，由于ESLint会检测没有定义的变量（ESLint要求使用全局变量时要用<code>window.xxxxx</code>的写法），因此需要一个<code>global</code>注释声明（<code>/* global IS_PRODUCTION:true */</code>）IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning。</p>
<h2 id="articleHeader6">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
<h2 id="articleHeader7">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006952432"><code>https://segmentfault.com/a/1190000006952432</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？

## 原文链接
[https://segmentfault.com/a/1190000006952432](https://segmentfault.com/a/1190000006952432)

