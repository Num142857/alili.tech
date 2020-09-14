---
title: '从koa-static中间件学习搭建静态文件服务器' 
date: 2018-12-22 2:30:11
hidden: true
slug: 1lt4pr18iyg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从koa-static中间件学习搭建静态文件服务器</h1>
<h2 id="articleHeader1"><a href="https://github.com/zyl1314/blog/issues/4" rel="nofollow noreferrer" target="_blank">原文地址</a></h2>
<h2 id="articleHeader2">koa-send</h2>
<blockquote>Static file serving middleware</blockquote>
<p>koa-static中有说明它只是koa-send的一个包装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const send = require('koa-send');

app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: __dirname + '/public' });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> send = require(<span class="hljs-string">'koa-send'</span>);

app.use(<span class="hljs-keyword">async</span> (ctx) =&gt; {
  <span class="hljs-keyword">await</span> send(ctx, ctx.path, { root: __dirname + <span class="hljs-string">'/public'</span> });
})</code></pre>
<p>查看koa-send的源码可以发现，它做的工作是根据传入的path查找文件是否存在，如果存在就创建一个流，不存在就抛出错误。  </p>
<p>send函数可以传入第三个参数</p>
<ul>
<li>
<code>maxage</code> Browser cache max-age in milliseconds. (defaults to <code>0</code>)</li>
<li>
<code>immutable</code> Tell the browser the resource is immutable and can be cached indefinitely. (defaults to <code>false</code>)</li>
<li>
<code>hidden</code> Allow transfer of hidden files. (defaults to <code>false</code>)</li>
<li>
<a href="#root-path"><code>root</code></a> Root directory to restrict file access.</li>
<li>
<code>index</code> Name of the index file to serve automatically when visiting the root location. (defaults to none)</li>
<li>
<code>gzip</code> Try to serve the gzipped version of a file automatically when <code>gzip</code> is supported by a client and if the requested file with <code>.gz</code> extension exists. (defaults to <code>true</code>).</li>
<li>
<code>brotli</code> Try to serve the brotli version of a file automatically when <code>brotli</code> is supported by a client and if the requested file with <code>.br</code> extension exists. (defaults to <code>true</code>).</li>
<li>
<code>format</code> If not <code>false</code> (defaults to <code>true</code>), format the path to serve static file servers and not require a trailing slash for directories, so that you can do both <code>/directory</code> and <code>/directory/</code>.</li>
<li>
<a href="#setheaders"><code>setHeaders</code></a> Function to set custom headers on response.</li>
<li>
<code>extensions</code> Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to <code>false</code>)</li>
</ul>
<p>可以看一下index的作用，事实上当我们在地址栏输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.aaa.com/
或者
http://www.aaa.com/index.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">http:</span><span class="hljs-comment">//www.aaa.com/</span>
或者
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.aaa.com/index.html</span>
</code></pre>
<p>可以发现效果是一样的，原因就是配置了index选项，服务端首先检查你的path是否以 '/' 结尾，假如你配置了index选项且以 '/' 结尾，那么服务端会自动将你的path和index选项拼接，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const trailingSlash = path[path.length - 1] === '/'

...

if (index &amp;&amp; trailingSlash) path += index
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> trailingSlash = path[path.length - <span class="hljs-number">1</span>] === <span class="hljs-string">'/'</span>

...

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">index</span> &amp;&amp; trailingSlash) path += <span class="hljs-keyword">index</span>
</code></pre>
<p>再看一下format的作用，其实我们经常在地址栏输入的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.aaa.com
而不是
http://www.aaa.com/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">http:</span><span class="hljs-comment">//www.aaa.com</span>
而不是
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.aaa.com/</span></code></pre>
<p>但他们的效果也是一样的，原因就是配置了format，经过resolve之后的path返回的是一个绝对路径，它是其中一种状态（文件或者文件夹），如果是文件夹，且设置了format（默认为true）和index,那么就自动添加index</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    stats = await fs.stat(path)

    // Format the path to serve static file servers
    // and not require a trailing slash for directories,
    // so that you can do both `/directory` and `/directory/`
    if (stats.isDirectory()) {
      if (format &amp;&amp; index) {
        path += '/' + index
        stats = await fs.stat(path)
      } else {
        return
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>    stats = await fs.stat(path)

    // Format the path to serve static file servers
    // <span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">require</span> a trailing slash <span class="hljs-keyword">for</span> directories,
    <span class="hljs-regexp">//</span> so that you can <span class="hljs-keyword">do</span> both <span class="hljs-string">`/directory`</span> <span class="hljs-keyword">and</span> <span class="hljs-string">`/directory/`</span>
    <span class="hljs-keyword">if</span> (stats.isDirectory()) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">format</span> &amp;&amp; <span class="hljs-keyword">index</span>) {
        path += <span class="hljs-string">'/'</span> + <span class="hljs-keyword">index</span>
        stats = await fs.stat(path)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span>
      }
    }</code></pre>
<p>extensions的作用好像不多见，比如你的a文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="| - a
    | - demo.txt
    | - demo.json
    | - demo.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">| - a</span>
    <span class="hljs-string">| - demo.txt</span>
    <span class="hljs-string">| - demo.json</span>
    <span class="hljs-string">| - demo.html</span></code></pre>
<p>假如你设置了extensions(假设为['json', 'txt'])，那么你在地址栏输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
http://www.aaa.com/a/demo

事实上等同于
http://www.aaa.com/a/demo.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">
http:</span><span class="hljs-comment">//www.aaa.com/a/demo</span>

事实上等同于
<span class="hljs-symbol">http:</span><span class="hljs-comment">//www.aaa.com/a/demo.json</span></code></pre>
<p>服务端会首先判断你是否设置了extensions且path不以 '.**' 结尾</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (extensions &amp;&amp; !/\..*$/.exec(path)) {
    const list = [].concat(extensions)
    for (let i = 0; i < list.length; i++) {
      let ext = list[i]
      if (typeof ext !== 'string') {
        throw new TypeError('option extensions must be array of strings or false')
      }
      // ['.js'] 或者 ['js'] 均可以
      if (!/^\./.exec(ext)) ext = '.' + ext
      if (await fs.exists(path + ext)) {
        path = path + ext
        break
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>  <span class="hljs-keyword">if</span> (extensions &amp;&amp; !<span class="hljs-regexp">/\..*$/</span>.exec(path)) {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span> = [].concat(extensions)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">list</span>.length; i++) {
      <span class="hljs-keyword">let</span> ext = <span class="hljs-built_in">list</span>[i]
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> ext !== <span class="hljs-string">'string'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'option extensions must be array of strings or false'</span>)
      }
      <span class="hljs-comment">// ['.js'] 或者 ['js'] 均可以</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/^\./</span>.exec(ext)) ext = <span class="hljs-string">'.'</span> + ext
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">await</span> fs.exists(path + ext)) {
        path = path + ext
        <span class="hljs-keyword">break</span>
      }
    }
  }</code></pre>
<p>然后按照extensions的顺序依次查找拼接的path是否存在，存在即停止查找</p>
<h2 id="articleHeader3">koa-static</h2>
<p>koa-static的只是给koa-send包了一层，koa-send的第二个参数path是ctx.path  </p>
<p>koa-static有个defer选项</p>
<ul><li>
<code>defer</code> If true, serves after return next(), allowing any downstream middleware to respond first.</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (!opts.defer) {
    return async function serve (ctx, next) {
      let done = false

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        try {
          // koa-send 输入的path不存在时抛错（404或者500）
          done = await send(ctx, ctx.path, opts)
        } catch (err) {
          // 如果错误码是404说明请求的不是静态文件
          if (err.status !== 404) {
            throw err
          }
        }
      }

      //  请求不是静态文件  继续执行下面的逻辑
      if (!done) {
        await next()
      }
    }
  }

  return async function serve (ctx, next) {
    await next()

    // 假如请求方法不是get  必然不是访问静态资源
    if (ctx.method !== 'HEAD' &amp;&amp; ctx.method !== 'GET') return
    // 说明对请求已经做了响应
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line

    try {
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">if</span> (!opts.defer) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">serve</span> (<span class="hljs-params">ctx, next</span>) </span>{
      <span class="hljs-keyword">let</span> done = <span class="hljs-literal">false</span>

      <span class="hljs-keyword">if</span> (ctx.method === <span class="hljs-string">'HEAD'</span> || ctx.method === <span class="hljs-string">'GET'</span>) {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-comment">// koa-send 输入的path不存在时抛错（404或者500）</span>
          done = <span class="hljs-keyword">await</span> send(ctx, ctx.path, opts)
        } <span class="hljs-keyword">catch</span> (err) {
          <span class="hljs-comment">// 如果错误码是404说明请求的不是静态文件</span>
          <span class="hljs-keyword">if</span> (err.status !== <span class="hljs-number">404</span>) {
            <span class="hljs-keyword">throw</span> err
          }
        }
      }

      <span class="hljs-comment">//  请求不是静态文件  继续执行下面的逻辑</span>
      <span class="hljs-keyword">if</span> (!done) {
        <span class="hljs-keyword">await</span> next()
      }
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">serve</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">await</span> next()

    <span class="hljs-comment">// 假如请求方法不是get  必然不是访问静态资源</span>
    <span class="hljs-keyword">if</span> (ctx.method !== <span class="hljs-string">'HEAD'</span> &amp;&amp; ctx.method !== <span class="hljs-string">'GET'</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-comment">// 说明对请求已经做了响应</span>
    <span class="hljs-keyword">if</span> (ctx.body != <span class="hljs-literal">null</span> || ctx.status !== <span class="hljs-number">404</span>) <span class="hljs-keyword">return</span> <span class="hljs-comment">// eslint-disable-line</span>

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> send(ctx, ctx.path, opts)
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-keyword">if</span> (err.status !== <span class="hljs-number">404</span>) {
        <span class="hljs-keyword">throw</span> err
      }
    }
  }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从koa-static中间件学习搭建静态文件服务器

## 原文链接
[https://segmentfault.com/a/1190000012412400](https://segmentfault.com/a/1190000012412400)

