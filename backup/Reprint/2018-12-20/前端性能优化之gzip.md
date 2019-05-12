---
title: '前端性能优化之gzip' 
date: 2018-12-20 2:30:10
hidden: true
slug: 9zoi9cpn0ek
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">背景</h1>
<p>如果你是个前端开发人员，你肯定知道线上环境要把js，css，图片等压缩，尽量减少文件的大小，提升响应速度，特别是对移动端，这个非常重要。</p>
<h1 id="articleHeader1">压缩</h1>
<h2 id="articleHeader2">压缩方式</h2>
<p>前端压缩的方式很多，依赖java的有ant工具，前端自己打包压缩的有grunt，gulp，webpack，这些压缩也很重要，基本上能压缩50%以上，下面我们对压缩文件来个对比，如图所示，这是未压缩的</p>
<p><span class="img-wrap"><img data-src="/img/bV0TW1?w=650&amp;h=154" src="https://static.alili.tech/img/bV0TW1?w=650&amp;h=154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是压缩后的</p>
<p><span class="img-wrap"><img data-src="/img/bV0UlQ?w=587&amp;h=156" src="https://static.alili.tech/img/bV0UlQ?w=587&amp;h=156" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>高能预警！！！</strong>gzip能在压缩的基础上再进行压缩50%以上！！！</p>
<p><span class="img-wrap"><img data-src="/img/bV0TVA?w=636&amp;h=210" src="https://static.alili.tech/img/bV0TVA?w=636&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">gzip压缩原理</h2>
<p>但是不是每个浏览器都支持gzip的，如果知道客户端是否支持gzip呢，请求头中有个Accept-Encoding来标识对压缩的支持。客户端http请求头声明浏览器支持的压缩方式，服务端配置启用压缩，压缩的文件类型，压缩方式。当客户端请求到服务端的时候，服务器解析请求头，如果客户端支持gzip压缩，响应时对请求的资源进行压缩并返回给客户端，浏览器按照自己的方式解析，在http响应头，我们可以看到content-encoding:gzip，这是指服务端使用了gzip的压缩方式。</p>
<p><span class="img-wrap"><img data-src="/img/bV0Uyv?w=470&amp;h=166" src="https://static.alili.tech/img/bV0Uyv?w=470&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么怎么看有没有用gzip压缩的文件呢，打开f12，查看network，按照下面的方式过滤</p>
<p><span class="img-wrap"><img data-src="/img/bV0Uxr?w=1836&amp;h=515" src="https://static.alili.tech/img/bV0Uxr?w=1836&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>content-encoding是gzip的话就说明返回的是gzip</p>
<p>还有一点 gzip不压缩图片，因为压缩之后会更大- -，所以一般到是压缩css和js</p>
<h2 id="articleHeader4">如何启用gzip</h2>
<p>前面说过了，启用gzip需要客户端和服务端的支持，如果客户端支持gzip的解析，那么只要服务端能够返回gzip的文件就可以启用gzip了，现在来说一下几种不同的环境下的服务端如何配置</p>
<h3 id="articleHeader5">node端</h3>
<p>node端很简单，只要加上compress模块即可，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compression = require('compression')
var app = express();

//尽量在其他中间件前使用compression
app.use(compression());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> compression = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression'</span>)
<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">//尽量在其他中间件前使用compression</span>
app.use(compression());</code></pre>
<p>这是基本用法，如果还要对请求进行过滤的话，还要加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }

  return compression.filter(req, res)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.use(compression({<span class="hljs-attr">filter</span>: shouldCompress}))

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shouldCompress</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">if</span> (req.headers[<span class="hljs-string">'x-no-compression'</span>]) {
    <span class="hljs-comment">// 这里就过滤掉了请求头包含'x-no-compression'</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }

  <span class="hljs-keyword">return</span> compression.filter(req, res)
}</code></pre>
<p>更多用法请移步<a href="https://github.com/expressjs/compression" rel="nofollow noreferrer" target="_blank">compression文档</a><br>如果用的是koa，用法和上面的差不多</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compress = require('koa-compress');
const app = module.exports = new Koa();
app.use(compress());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> compress = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-compress'</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> Koa();
app.use(compress());</code></pre>
<p>因为node读取的是生成目录中的文件，所以要先用webpack等其他工具进行压缩成gzip，webpack的配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CompressionWebpackPlugin = require('compression-webpack-plugin');
plugins.push(
    new CompressionWebpackPlugin({
        asset: '[path].gz[query]',// 目标文件名
        algorithm: 'gzip',// 使用gzip压缩
        test: new RegExp(
            '\\.(js|css)$' // 压缩 js 与 css
        ),
        threshold: 10240,// 资源文件大于10240B=10kB时会被压缩
        minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    })
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>);
plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
        <span class="hljs-attr">asset</span>: <span class="hljs-string">'[path].gz[query]'</span>,<span class="hljs-comment">// 目标文件名</span>
        algorithm: <span class="hljs-string">'gzip'</span>,<span class="hljs-comment">// 使用gzip压缩</span>
        test: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
            <span class="hljs-string">'\\.(js|css)$'</span> <span class="hljs-comment">// 压缩 js 与 css</span>
        ),
        <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,<span class="hljs-comment">// 资源文件大于10240B=10kB时会被压缩</span>
        minRatio: <span class="hljs-number">0.8</span> <span class="hljs-comment">// 最小压缩比达到0.8时才会被压缩</span>
    })
);</code></pre>
<p>plugins是webpack的插件</p>
<h3 id="articleHeader6">tomcat</h3>
<p>tomcat的配置如下</p>
<p>找到tomcat的server.xml文件，找到其中Connector节点然后进行配置修改，具体配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Connectorport=&quot;80&quot;protocol=&quot;HTTP/1.1&quot; connectionTimeout=&quot;20000&quot; redirectPort=&quot;8443&quot; URIEncoding=&quot;UTF-8&quot; maxPostSize=&quot;0&quot; useBodyEncodingForURI=&quot;true&quot;compression=&quot;on&quot; compressionMinSize=&quot;2048&quot; noCompressionUserAgents=&quot;gozilla, traviata&quot;      compressableMimeType=&quot;text/html,text/xml,application/javascript,text/css,text/plain,image/jpeg,application/json&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Connectorport="80"protocol="HTTP</span>/<span class="hljs-attr">1.1</span>" <span class="hljs-attr">connectionTimeout</span>=<span class="hljs-string">"20000"</span> <span class="hljs-attr">redirectPort</span>=<span class="hljs-string">"8443"</span> <span class="hljs-attr">URIEncoding</span>=<span class="hljs-string">"UTF-8"</span> <span class="hljs-attr">maxPostSize</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">useBodyEncodingForURI</span>=<span class="hljs-string">"true"</span><span class="hljs-attr">compression</span>=<span class="hljs-string">"on"</span> <span class="hljs-attr">compressionMinSize</span>=<span class="hljs-string">"2048"</span> <span class="hljs-attr">noCompressionUserAgents</span>=<span class="hljs-string">"gozilla, traviata"</span>      <span class="hljs-attr">compressableMimeType</span>=<span class="hljs-string">"text/html,text/xml,application/javascript,text/css,text/plain,image/jpeg,application/json"</span>/&gt;</span></code></pre>
<p>参数说明：</p>
<ul>
<li>compression="on"  打开压缩功能</li>
<li>compressionMinSize="2048"  启用压缩的输出内容大小，当被压缩对象的大小&gt;=该值时才会被压缩，这里面默认为2KB</li>
<li>noCompressionUserAgents="gozilla, traviata"  对于以下的浏览器，不启用压缩</li>
<li>compressableMimeType="text/html,text/xml,text/javascript,text/css,text/plain"  压缩类型</li>
</ul>
<p><strong>注意：</strong>tomcat7以后，js文件的mimetype类型变为了application/javascript，而在tomcat7以下则为text/javascript;具体的tomcat7定义的类型可以在：conf/web.xml文件中找到。</p>
<p>可以在web.xml下搜索，如我搜索javascript会找到如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<mime-mapping>
    <extension>js</extension>
    <mime-type>application/javascript</mime-type>
</mime-mapping>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;mime-mapping&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">extension</span>&gt;</span>js<span class="hljs-tag">&lt;/<span class="hljs-name">extension</span>&gt;</span></span>
    &lt;mime-type&gt;application/javascript&lt;<span class="hljs-regexp">/mime-type&gt;
&lt;/mim</span>e-mapping&gt;</code></pre>
<p><strong>切记上面的类型不能配置错了，如果配置错了压缩是不会起作用的。</strong></p>
<h3 id="articleHeader7">nginx</h3>
<p>gzip使用环境:http,server,location,if(x),一般把它定义在nginx.conf的http{…..}之间</p>
<ul>
<li>
<strong>gzip on</strong><br>on为启用，off为关闭</li>
<li>
<strong>gzip_min_length 1k</strong><br>设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。默认值是0，不管页面多大都压缩。建议设置成大于1k的字节数，小于1k可能会越压越大。</li>
<li>
<strong>gzip_buffers 4 16k</strong><br>获取多少内存用于缓存压缩结果，‘4 16k’表示以16k*4为单位获得</li>
<li>
<strong>gzip_comp_level 5</strong><br>gzip压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值;</li>
<li>
<strong>gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php</strong><br>对特定的MIME类型生效,其中'text/html’被系统强制启用</li>
<li>
<strong>gzip_http_version 1.1</strong><br>识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码</li>
<li>
<strong>gzip_vary on</strong><br>启用应答头"Vary: Accept-Encoding"</li>
<li>
<strong>gzip_proxied off</strong><br>nginx做为反向代理时启用,off(关闭所有代理结果的数据的压缩),expired(启用压缩,如果header头中包括"Expires"头信息),no-cache(启用压缩,header头中包含"Cache-Control:no-cache"),no-store(启用压缩,header头中包含"Cache-Control:no-store"),private(启用压缩,header头中包含"Cache-Control:private"),no_last_modefied(启用压缩,header头中不包含"Last-Modified"),no_etag(启用压缩,如果header头中不包含"Etag"头信息),auth(启用压缩,如果header头中包含"Authorization"头信息)</li>
<li>
<strong>gzip_disable msie6</strong><br>(IE5.5和IE6 SP1使用msie6参数来禁止gzip压缩 )指定哪些不需要gzip压缩的浏览器(将和User-Agents进行匹配),依赖于PCRE库</li>
</ul>
<p>以上代码可以插入到 http {...}整个服务器的配置里，也可以插入到虚拟主机的 server {...}或者下面的location模块内</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端性能优化之gzip

## 原文链接
[https://segmentfault.com/a/1190000012571492](https://segmentfault.com/a/1190000012571492)

