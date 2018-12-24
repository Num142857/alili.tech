---
title: '[Webpack并不难]使用教程（四）--- devServer' 
date: 2018-12-22 2:30:11
hidden: true
slug: s1zbjoxzhn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><a href="https://segmentfault.com/a/1190000012334562">使用教程（一）--- entry，devtool，output，resolve</a><br><a href="https://segmentfault.com/a/1190000012351195" target="_blank">使用教程（二）--- module.loaders</a><br><a href="https://segmentfault.com/a/1190000012367082">使用教程（三）--- plugins</a></p>
<h5><strong>我的 <em>Webpack</em> 版本是 <em>3.10.0</em></strong></h5>
</blockquote>
<h2 id="articleHeader0">DevServer （<a href="https://webpack.js.org/configuration/dev-server/#devserver-hot" rel="nofollow noreferrer" target="_blank">官方的文档</a>）</h2>
<ul>
<li>在开发模式下，<strong><em>DevServer</em></strong> 提供虚拟服务器，让我们进行开发和调试。</li>
<li>而且提供实时重新加载。简直美滋滋。大大减少开发时间。</li>
<li>它不是 <em>webpack</em> 内置插件哦，要安装！！！</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装
npm install webpack-dev-server --save-dev

// 在 package.json 配置下，方便使用。
&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server&quot; // 运行命令会自动在node_modules文件夹找 webapck-dev-server模块。
 }

// webpack.config.js 配置一下 devServer
devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8080
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">//</span> <span class="hljs-string">安装</span>
<span class="hljs-string">npm</span> <span class="hljs-string">install</span> <span class="hljs-string">webpack-dev-server</span> <span class="hljs-bullet">--save-dev</span>

<span class="hljs-string">//</span> <span class="hljs-string">在</span> <span class="hljs-string">package.json</span> <span class="hljs-string">配置下，方便使用。</span>
<span class="hljs-attr">"scripts":</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    "dev":</span> <span class="hljs-string">"webpack-dev-server"</span> <span class="hljs-string">//</span> <span class="hljs-string">运行命令会自动在node_modules文件夹找</span> <span class="hljs-string">webapck-dev-server模块。</span>
 <span class="hljs-string">}</span>

<span class="hljs-string">//</span> <span class="hljs-string">webpack.config.js</span> <span class="hljs-string">配置一下</span> <span class="hljs-string">devServer</span>
<span class="hljs-attr">devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    clientLogLevel:</span> <span class="hljs-string">'warning'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    hot:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    compress:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    host:</span> <span class="hljs-string">'localhost'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8080</span>
  <span class="hljs-string">}</span></code></pre>
<ol>
<li>如果没在 <em>package.json</em> 配置且还是局部安装，你就要在命令行输入 <code>node_modules/.bin/webpack-dev-server</code>。若你 <em>package.json</em> 配置好了，在命令行输入<code>npm run dev</code>。</li>
<li>下面说说 <em>devServer</em> 配置中每一项有什么用。</li>
</ol>
<h3 id="articleHeader1">Hot （<a href="https://webpack.js.org/configuration/dev-server/#devserver-hot" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul>
<li>热模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效果。</li>
<li>这不是和 <em>webpack.HotModuleReplacementPlugin （HMR）</em> 这个插件不是一样功能吗？是的，不过请注意了，<code><strong><em>HMR</em> 这个插件是真正实现热模块更新的</strong></code>。而 <em>devServer</em> 里配置了 <em>hot: true</em> , <em>webpack</em>会自动添加 <em>HMR</em> 插件。所以模块热更新最终还是 <em>HMR</em> 这个插件起的作用。</li>
</ul>
<h3 id="articleHeader2">host （<a href="https://webpack.js.org/configuration/dev-server/#devserver-host" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul><li>写主机名的。默认 <em>localhost</em>
</li></ul>
<h3 id="articleHeader3">prot （<a href="https://webpack.js.org/configuration/dev-server/#devserver-port" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul><li>端口号。默认 <em>8080</em>
</li></ul>
<h3 id="articleHeader4">historyApiFallback （<a href="https://github.com/bripkens/connect-history-api-fallback" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul>
<li>如果为 <strong><em>true</em></strong> ，页面出错不会弹出 <em>404</em> 页面。</li>
<li>
<p>如果为 <em>{...}</em> , 看看一般里面有什么。</p>
<ul><li><strong>rewrites</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rewrites: [
    { from: /^\/subpage/, to: '/views/subpage.html' },
    {
      from: /^\/helloWorld\/.*$/,
      to: function() {
          return '/views/hello_world.html;
      }
    }
]
// 从代码可以看出 url 匹配正则，匹配成功就到某个页面。
// 并不建议将路由写在这，一般 historyApiFallback: true 就行了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>rewrites: [
    { from: /^\/subpage/, <span class="hljs-keyword">to</span>: '/views/subpage.html' },
    {
      from: /^\/helloWorld\/.*$/,
      <span class="hljs-keyword">to</span>: <span class="hljs-keyword">function</span>() {
          <span class="hljs-keyword">return</span> '/views/hello_world.html;
      }
    }
]
<span class="hljs-comment">// 从代码可以看出 url 匹配正则，匹配成功就到某个页面。</span>
<span class="hljs-comment">// 并不建议将路由写在这，一般 historyApiFallback: true 就行了。</span></code></pre>
<ul>
<li>
<strong>verbose</strong>：如果 <em>true</em> ，则激活日志记录。</li>
<li>
<strong>disableDotRule</strong>： 禁止 <em>url</em> 带小数点 <code>.</code> 。</li>
</ul>
</li>
</ul>
<h3 id="articleHeader5">compress (<a href="https://webpack.js.org/configuration/dev-server/#devserver-compress" rel="nofollow noreferrer" target="_blank">文档</a>)</h3>
<ul><li>如果为 <em>true</em> ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。</li></ul>
<h3 id="articleHeader6">contentBase （<a href="https://webpack.js.org/configuration/dev-server/#devserver-contentbase" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul>
<li>
<p>你要提供哪里的内容给虚拟服务器用。这里最好填 <strong>绝对路径</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 单目录
contentBase: path.join(__dirname, &quot;public&quot;)

// 多目录
contentBase: [path.join(__dirname, &quot;public&quot;), path.join(__dirname, &quot;assets&quot;)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 单目录</span>
contentBase: path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">"public"</span>)

<span class="hljs-comment">// 多目录</span>
contentBase: [path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">"public"</span>), path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">"assets"</span>)]</code></pre>
</li>
<li>默认情况下，它将使用您当前的工作目录来提供内容。</li>
</ul>
<h3 id="articleHeader7">Open （<a href="https://webpack.js.org/configuration/dev-server/#devserver-open" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul><li>
<em>true</em>，则自动打开浏览器。</li></ul>
<h3 id="articleHeader8">overlay (<a href="https://webpack.js.org/configuration/dev-server/#devserver-overlay" rel="nofollow noreferrer" target="_blank">文档</a>)</h3>
<ul>
<li>如果为 <em>true</em> ，在浏览器上全屏显示编译的errors或warnings。默认 <em>false</em> （关闭）</li>
<li>如果你只想看 <em>error</em> ，不想看 <em>warning</em>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overlay：{
    errors：true，
    warnings：false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>overlay：{
    <span class="hljs-built_in">errors</span>：<span class="hljs-literal">true</span>，
    <span class="hljs-built_in">warnings</span>：<span class="hljs-literal">false</span>
}</code></pre>
<h3 id="articleHeader9">quiet （<a href="https://webpack.js.org/configuration/dev-server/#devserver-quiet-" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul><li>
<em>true</em>，则终端输出的只有初始启动信息。 <em>webpack</em> 的警告和错误是不输出到终端的。</li></ul>
<h3 id="articleHeader10">publicPath （<a href="https://webpack.js.org/configuration/dev-server/#devserver-publicpath-" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul>
<li>配置了 <em>publicPath</em>后， <code><em>url</em> = '主机名' + '<em>publicPath</em>配置的' +<br>'原来的<em>url.path</em>'</code>。这个其实与 <em>output.publicPath</em> 用法大同小异。</li>
<li>
<em>output.publicPath</em> 是作用于 <em>js, css, img</em> 。而 <em>devServer.publicPath</em> 则作用于请求路径上的。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// devServer.publicPath
publicPath: &quot;/assets/&quot;

// 原本路径 --> 变换后的路径
http://localhost:8080/app.js --> http://localhost:8080/assets/app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> devServer.publicPath
publicPath: <span class="hljs-string">"/assets/"</span>

<span class="hljs-regexp">//</span> 原本路径 --&gt; 变换后的路径
http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">8080</span><span class="hljs-regexp">/app.js --&gt; http:/</span><span class="hljs-regexp">/localhost:8080/</span>assets<span class="hljs-regexp">/app.js</span></code></pre>
<h3 id="articleHeader11">proxy (<a href="https://webpack.js.org/configuration/dev-server/#devserver-proxy" rel="nofollow noreferrer" target="_blank">文档</a>)</h3>
<ul><li>当您有一个单独的API后端开发服务器，并且想要在同一个域上发送API请求时，则代理这些 <em>url</em> 。看例子好理解。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  proxy: {
    '/proxy': {
        target: 'http://your_api_server.com',
        changeOrigin: true,
        pathRewrite: {
            '^/proxy': ''
        }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">proxy</span>: {
    <span class="hljs-string">'/proxy'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://your_api_server.com'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
            <span class="hljs-string">'^/proxy'</span>: <span class="hljs-string">''</span>
        }
  }</code></pre>
<ol>
<li>假设你主机名为 <em>localhost:8080</em> , 请求 <em>API</em> 的 <em>url</em> 是 <em>http：//your_api_server.com/user/list</em>
</li>
<li>
<strong><em>'/proxy'</em></strong>：如果点击某个按钮，触发请求 <em>API</em> 事件，这时请求 <em>url</em> 是<code>http：//localhost:8080<strong>/proxy</strong>/user/list</code> 。</li>
<li>
<strong><em>changeOrigin</em></strong>：如果 <em>true</em> ，那么 <code>http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list</code> 。但还不是我们要的 <em>url</em> 。</li>
<li>
<strong><em>pathRewrite</em></strong>：重写路径。匹配 <em>/proxy</em> ，然后变为<code>''</code> ，那么 <em>url</em> 最终为 <code>http：//your_api_server.com/user/list</code> 。</li>
</ol>
<h3 id="articleHeader12">watchOptions （<a href="https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-" rel="nofollow noreferrer" target="_blank">文档</a>）</h3>
<ul><li>一组自定义的监听模式，用来监听文件是否被改动过。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchOptions: {
  aggregateTimeout: 300,
  poll: 1000，
  ignored: /node_modules/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">watchOptions</span>: {
  <span class="hljs-attribute">aggregateTimeout</span>: <span class="hljs-number">300</span>,
  poll: <span class="hljs-number">1000</span>，
  ignored: /node_modules/
}</code></pre>
<ol>
<li>
<strong>aggregateTimeout</strong>：一旦第一个文件改变，在重建之前添加一个延迟。填以毫秒为单位的数字。</li>
<li>
<strong>ignored</strong>：观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹。</li>
<li>
<strong>poll</strong>：填以毫秒为单位的数字。每隔（你设定的）多少时间查一下有没有文件改动过。不想启用也可以填<code>false</code>。</li>
</ol>
<hr>
<h2 id="articleHeader13">
<del>完结，希望大家喜欢！</del> 并未完结，敬请期待！</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[Webpack并不难]使用教程（四）--- devServer

## 原文链接
[https://segmentfault.com/a/1190000012383015](https://segmentfault.com/a/1190000012383015)

