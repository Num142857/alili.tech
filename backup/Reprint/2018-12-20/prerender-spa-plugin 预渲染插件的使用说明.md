---
title: 'prerender-spa-plugin 预渲染插件的使用说明' 
date: 2018-12-20 2:30:10
hidden: true
slug: wqrz1f0gshl
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知单页面应用不利于SEO，为了解决这个问题网上所给出的2个解决方案<br>**1、SSH服务器端渲染<br>2、预渲染**<br>由于页面较少，且预渲染相对于SSH比较简单，于是选择预渲染页面，预渲染可以极大的提高网页访问速度。而且配合一些meat插件，基本可以满足SEO需求<br>下面就来简单介绍一下<br>在webpack.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var PrerenderSpaPlugin = require('prerender-spa-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    //这段代码意思是拷贝static文件至根目录使得渲染的文件可以找到js、css
    new CopyWebpackPlugin([{
      from: 'static'
    }]),
    
    
    new PrerenderSpaPlugin(
    //将渲染的文件放到dist目录下
      path.join(__dirname, '../dist'),   
      //需要预渲染的路由信息
      [ '/','/introduct','/culture','/Chairman','/president','/fund','/news','/honor' ],
      {
      //在一定时间后再捕获页面信息，使得页面数据信息加载完成
        captureAfterTime: 50000,
        //忽略打包错误
        ignoreJSErrors: true,
        phantomOptions: '--web-security=false',
        maxAttempts: 10,
      }
    ),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> PrerenderSpaPlugin = require(<span class="hljs-string">'prerender-spa-plugin'</span>)

<span class="hljs-keyword">var</span> webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    <span class="hljs-comment">//这段代码意思是拷贝static文件至根目录使得渲染的文件可以找到js、css</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
      <span class="hljs-keyword">from</span>: <span class="hljs-string">'static'</span>
    }]),
    
    
    <span class="hljs-keyword">new</span> PrerenderSpaPlugin(
    <span class="hljs-comment">//将渲染的文件放到dist目录下</span>
      path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'../dist'</span>),   
      <span class="hljs-comment">//需要预渲染的路由信息</span>
      [ <span class="hljs-string">'/'</span>,<span class="hljs-string">'/introduct'</span>,<span class="hljs-string">'/culture'</span>,<span class="hljs-string">'/Chairman'</span>,<span class="hljs-string">'/president'</span>,<span class="hljs-string">'/fund'</span>,<span class="hljs-string">'/news'</span>,<span class="hljs-string">'/honor'</span> ],
      {
      <span class="hljs-comment">//在一定时间后再捕获页面信息，使得页面数据信息加载完成</span>
        captureAfterTime: <span class="hljs-number">50000</span>,
        <span class="hljs-comment">//忽略打包错误</span>
        ignoreJSErrors: <span class="hljs-literal">true</span>,
        phantomOptions: <span class="hljs-string">'--web-security=false'</span>,
        maxAttempts: <span class="hljs-number">10</span>,
      }
    ),
</code></pre>
<p>如果是一般不用跨域的网站到此已经完成，然而api需要跨域的时候请求的数据全部都请求不到，所有的页面都只有一个骨架，顺便贴一下跨域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://192.26.26.xx/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-comment">// proxy all requests starting with /api to jsonplaceholder</span>
      <span class="hljs-string">'/api'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://192.26.26.xx/api'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
      }
      }</code></pre>
<p>在打包之后跨域是不生效的，需要在nginx服务器做一个反向代理，<br>预渲染的时候请求全都是<code>localhost:8080</code>所以没有数据信息<br>在网上查了半天也没发现怎么解决<br>查看prerender-spa-plugin的代码发现他是用的Hapi，找到插件下面的compile-to-html.js 文件发现下面这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Server.start(function (error) {
          // If port is already bound, try again with another port
          if (error) return serveAndPrerenderRoute()

          var maxAttempts = options.maxAttempts || 5
          var attemptsSoFar = 0

          var phantomArguments = [
            Path.join(__dirname, 'phantom-page-render.js'),
            'http://localhost:' + port + route,
            JSON.stringify(options)
          ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> Server.start(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
          <span class="hljs-comment">// If port is already bound, try again with another port</span>
          <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> serveAndPrerenderRoute()

          <span class="hljs-keyword">var</span> maxAttempts = options.maxAttempts || <span class="hljs-number">5</span>
          <span class="hljs-keyword">var</span> attemptsSoFar = <span class="hljs-number">0</span>

          <span class="hljs-keyword">var</span> phantomArguments = [
            Path.join(__dirname, <span class="hljs-string">'phantom-page-render.js'</span>),
            <span class="hljs-string">'http://localhost:'</span> + port + route,
            <span class="hljs-built_in">JSON</span>.stringify(options)
          ]</code></pre>
<p>于是我突发奇想 将打包好的没有数据的文件放到nginx服务器上，由于服务器是做过反向代理的所以可以请求到数据，于是我将 <strong>'<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:' + port + route</strong>，直接改成了我服务器上的地址 <strong>'<a href="http://192.164.xx.xx" rel="nofollow noreferrer" target="_blank">http://192.164.xx.xx</a>' + route,</strong>，于是预渲染成功了有了数据信息，我这也算是另辟蹊径了，不知道有没有大神知道到底该怎么配置，我查边文档也没有找到。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
prerender-spa-plugin 预渲染插件的使用说明

## 原文链接
[https://segmentfault.com/a/1190000012605930](https://segmentfault.com/a/1190000012605930)

