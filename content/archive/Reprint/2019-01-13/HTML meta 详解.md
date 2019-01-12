---
title: 'HTML meta 详解' 
date: 2019-01-13 2:30:11
hidden: true
slug: 6izvcurss5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章同步于Github <a href="https://github.com/Pines-Cheng/blog/issues/13" rel="nofollow noreferrer" target="_blank">Pines-Cheng/blog</a></p></blockquote>
<h2 id="articleHeader0">简介</h2>
<p>meta标签是HTML语言HEAD区的一个辅助性标签。</p>
<p>meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。</p>
<p>mata 标签包含<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes" rel="nofollow noreferrer" target="_blank">全局属性</a></p>
<h2 id="articleHeader1">charset</h2>
<p>声明网页的字符编码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta charset=&quot;UTF-8&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span></code></pre>
<h2 id="articleHeader2">content</h2>
<p>content属性的内容是<code>htp-equiv</code>或<code>name</code>属性的值，具体取决于你用哪一个。</p>
<h2 id="articleHeader3">http-equiv</h2>
<p>该属性可以包含HTTP头的名称，属性的英文全称为<code>http-equivalent</code>。它定义了可以改变<code>server</code>和<code>user-agent</code>行为的指令。该指令的值在content属性内定义，可以是以下之一：</p>
<h3 id="articleHeader4">content-language（已过时）</h3>
<p>定义页面的默认语言。它可以被任何元素上的lang属性所覆盖。</p>
<h3 id="articleHeader5">Pragma</h3>
<p>禁止浏览器从本地计算机的缓存中访问页面内容。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="＜meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot;＞" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">＜meta http-equiv="<span class="hljs-keyword">Pragma</span><span class="hljs-string">" content="</span><span class="hljs-keyword">no</span>-<span class="hljs-keyword">cache</span><span class="hljs-string">"＞</span></code></pre>
<h3 id="articleHeader6">expires</h3>
<p>可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。</p>
<h3 id="articleHeader7">cache-control</h3>
<p>指定请求和响应遵循的缓存机制。共有以下几种用法：</p>
<ul>
<li><p><code>no-cache</code>: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。</p></li>
<li><p><code>no-store</code>: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）</p></li>
<li><p><code>public</code> : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果</p></li>
<li><p><code>private</code> : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）</p></li>
<li><p><code>max-age</code> : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。</p></li>
</ul>
<h3 id="articleHeader8">content-security-policy</h3>
<p>允许页面作者定义当前页面的内容策略。内容策略主要指定允许的服务器地址和脚本端点，这有助于防止<code>cross-site scripting</code> 攻击。</p>
<p>CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。</p>
<p>CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。<br>两种方法可以启用 CSP。一种是通过 HTTP 头信息的<code>Content-Security-Policy</code>的字段。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006952389?w=638&amp;h=479" src="https://static.alili.tech/img/remote/1460000006952389?w=638&amp;h=479" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs csp"><code><span class="hljs-attribute">Content-Security-Policy</span>: <span class="hljs-keyword">script-src</span> <span class="hljs-string">'self'</span>; <span class="hljs-keyword">object-src</span> <span class="hljs-string">'none'</span>;
<span class="hljs-keyword">style-src</span> cdn.example.org third-party.org; <span class="hljs-keyword">child-src</span> https:</code></pre>
<p>另一种是通过网页的&lt;meta&gt;标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs csp"><code style="word-break: break-word; white-space: initial;">&lt;meta http-equiv="Content-Security-Policy" content="<span class="hljs-keyword">script-src</span> <span class="hljs-string">'self'</span>; <span class="hljs-keyword">object-src</span> <span class="hljs-string">'none'</span>; <span class="hljs-keyword">style-src</span> cdn.example.org third-party.org; <span class="hljs-keyword">child-src</span> https:"&gt;</code></pre>
<p>上面代码中，CSP 做了如下配置:</p>
<ul>
<li><p>脚本：只信任当前域名</p></li>
<li><p>&lt;object&gt;标签：不信任任何URL，即不加载任何资源</p></li>
<li><p>样式表：只信任<code>cdn.example.org</code>和<code>third-party.org</code></p></li>
<li><p>框架（frame）：必须使用HTTPS协议加载</p></li>
<li><p>其他资源：没有限制</p></li>
</ul>
<p>启用后，不符合 CSP 的外部资源就会被阻止加载。</p>
<p>更多介绍可见：<a href="http://www.ruanyifeng.com/blog/2016/09/csp.html" rel="nofollow noreferrer" target="_blank">Content Security Policy 入门教程</a></p>
<h3 id="articleHeader9">content-type（已过时）</h3>
<p>定义文档的MIME类型，后跟其字符编码。</p>
<ul>
<li><p>不要使用这个值，因为它已经过时了。推荐使用&lt;meta&gt;元素上的charset属性。</p></li>
<li><p>由于&lt;meta&gt;无法在XHTML或HTML5的XHTML序列化中更改文档类型，因此不要使用&lt;meta&gt;将MIME类型设置为<code>XHTML MIME</code>类型。</p></li>
</ul>
<h3 id="articleHeader10">refresh</h3>
<p>该指令指定：</p>
<ul>
<li><p>如果content属性只包含一个正整数，则表示该页面重新加载的秒数。</p></li>
<li><p>如果content属性包含一个正整数，后跟字符串'; url ='，那么表示当前页面XX秒后重定向到另一个有效的URL。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;refresh&quot; content=&quot;2；URL=http://www.github.com/&quot;> //意思是2秒后跳转到github" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-keyword">http</span>-equiv=<span class="hljs-string">"refresh"</span> content=<span class="hljs-string">"2；URL=http://www.github.com/"</span>&gt;<span class="hljs-comment"> //意思是2秒后跳转到github</span></code></pre>
<h3 id="articleHeader11">set-cookie（已过时）</h3>
<p>定义页面的cookie，对应的content值必须遵循<a href="https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14" rel="nofollow noreferrer" target="_blank">IETF HTTP Cookie Specification</a></p>
<p>不要使用这条指令，使用HTTP头的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie" rel="nofollow noreferrer" target="_blank">Set-Cookie</a>替代</p>
<h3 id="articleHeader12">X-UA-Compatible</h3>
<p>用于告知浏览器以何种版本来渲染页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;/> //指定IE和Chrome使用最新版本渲染当前页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-keyword">http</span>-equiv=<span class="hljs-string">"X-UA-Compatible"</span> content=<span class="hljs-string">"IE=edge,chrome=1"</span>/&gt;<span class="hljs-comment"> //指定IE和Chrome使用最新版本渲染当前页面</span></code></pre>
<h2 id="articleHeader13">name</h2>
<p>name属性的定义是属于<code>document-level metadata</code>，不能和以下属性同时设置： itemprop, http-equiv 或 charset。</p>
<p>该元数据名称与content属性包含的值相关联。 name属性的可能值为：</p>
<h3 id="articleHeader14">application-name</h3>
<p>定义在网页中运行的应用程序的名称。</p>
<h3 id="articleHeader15">author</h3>
<p>用于标注网页作者。</p>
<h3 id="articleHeader16">description</h3>
<p>包括一个关于页面内容的缩略而精准的描述。一些浏览器，如Firefox和Opera，会使用这个当做网页书签的默认描述。</p>
<h3 id="articleHeader17">generator</h3>
<p>用于标明网页是什么软件做的。</p>
<h3 id="articleHeader18">keywords</h3>
<p>用于告诉搜索引擎，你网页的关键字</p>
<h3 id="articleHeader19">revisit-after</h3>
<p>如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;revisit-after&quot; content=&quot;7 days&quot; >" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"revisit-after"</span> content=<span class="hljs-string">"7 days"</span> &gt;</code></pre>
<h3 id="articleHeader20">renderer</h3>
<p>renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;renderer&quot; content=&quot;webkit&quot;> //默认webkit内核
<meta name=&quot;renderer&quot; content=&quot;ie-comp&quot;> //默认IE兼容模式
<meta name=&quot;renderer&quot; content=&quot;ie-stand&quot;> //默认IE标准模式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>&lt;<span class="hljs-built_in">meta</span> name=<span class="hljs-string">"renderer"</span> content=<span class="hljs-string">"webkit"</span>&gt; <span class="hljs-comment">//默认webkit内核</span>
&lt;<span class="hljs-built_in">meta</span> name=<span class="hljs-string">"renderer"</span> content=<span class="hljs-string">"ie-comp"</span>&gt; <span class="hljs-comment">//默认IE兼容模式</span>
&lt;<span class="hljs-built_in">meta</span> name=<span class="hljs-string">"renderer"</span> content=<span class="hljs-string">"ie-stand"</span>&gt; <span class="hljs-comment">//默认IE标准模式</span></code></pre>
<h3 id="articleHeader21">referrer</h3>
<p>referrer 控制document发起的Request请求中附加的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer" rel="nofollow noreferrer" target="_blank">Referer HTTP header</a>，相应的值在content中：</p>
<table>
<thead><tr>
<th>content</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>no-referrer</td>
<td>不发送HTTP Referer头</td>
</tr>
<tr>
<td>origin</td>
<td>发送document的origin</td>
</tr>
<tr>
<td>no-referrer-when-downgrade</td>
<td>将origin作为referer发送到和当前页面同等安全的URLs（https-&gt; https），但不会将origin发送到不安全的URLS（https-&gt; http）。这是默认行为。</td>
</tr>
<tr>
<td>origin-when-crossorigin</td>
<td>same-origin的请求，发送的完整URL（剥离参数），但在其他情况下只发送origin</td>
</tr>
<tr>
<td>unsafe-URL</td>
<td>same-origin 或 cross-origin的请求，将发送完整的URL（剥离参数）</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader22">robots</h3>
<p>robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。</p>
<table>
<thead><tr>
<th>值</th>
<th>描述</th>
<th>Used By</th>
</tr></thead>
<tbody>
<tr>
<td>index</td>
<td>允许robot索引本页面（默认）</td>
<td>All</td>
</tr>
<tr>
<td>noindex</td>
<td>不允许robot索引本页面</td>
<td>All</td>
</tr>
<tr>
<td>follow</td>
<td>允许搜索引擎继续通过此网页的链接索引搜索其它的网页（默认）</td>
<td>All</td>
</tr>
<tr>
<td>nofollow</td>
<td>搜索引擎不继续通过此网页的链接索引搜索其它的网页</td>
<td>All</td>
</tr>
<tr>
<td>none</td>
<td>相当于noindex，nofollow</td>
<td>Google</td>
</tr>
<tr>
<td>noodp</td>
<td>禁止使用Open Directory Project描述（如果有的话）作为搜索引擎结果中的页面描述。</td>
<td>Google, Yahoo, Bing</td>
</tr>
<tr>
<td>noarchive</td>
<td>要求搜索引擎不缓存页面内容</td>
<td>Google, Yahoo, Bing</td>
</tr>
<tr>
<td>nosnippet</td>
<td>禁止在搜索引擎结果中显示该页面的任何描述。</td>
<td>Google, Bing</td>
</tr>
<tr>
<td>noimageindex</td>
<td>要求此页面不作为引用页面的索引图像的显示。</td>
<td>Google</td>
</tr>
<tr>
<td>nocache</td>
<td>和noarchive同义</td>
<td>Bing</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader23">viewport</h3>
<p>提供了关于viewport初始大小的大小的提示。仅供移动设备使用。</p>
<table>
<thead><tr>
<th>值</th>
<th>content取值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>width</td>
<td>整数或device-width</td>
<td>定义viewport的像素宽度，或允许viewport适应设备的屏幕宽度。</td>
</tr>
<tr>
<td>height</td>
<td>整数或device-height</td>
<td>定义viewport的高度。没有任何浏览器使用（？？？）</td>
</tr>
<tr>
<td>initial-scale</td>
<td>0.0 - 10.0</td>
<td>定义设备宽度（纵向模式下的设备宽度或横向模式下的设备高度）与viewport大小之间的比例。</td>
</tr>
<tr>
<td>maximum-scale</td>
<td>0.0 - 10.0</td>
<td>定义最大的缩放级别。它必须大于或等于minimum-scale，否则视为未定义。浏览器设置可以忽略此规则，iOS10 +默认情况下忽略它。</td>
</tr>
<tr>
<td>minimum-scale</td>
<td>0.0 - 10.0</td>
<td>定义最小的缩放级别。它必须小于或等于maximum-scale，否则视为未定义。浏览器设置可以忽略此规则，iOS10 +默认情况下忽略它。</td>
</tr>
<tr>
<td>user-scalable</td>
<td>yes 或 no</td>
<td>如果设置为no，用户将无法放大网页。默认值为yes。浏览器设置可以忽略此规则，iOS10 +默认情况下忽略它。</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader24">常见用法</h2>
<h3 id="articleHeader25">禁止缩放：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=”viewport” content=”initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no”/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">”viewport”</span> <span class="hljs-attr">content</span>=<span class="hljs-string">”initial-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">minimum-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">maximum-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">user-scalable</span>=<span class="hljs-string">no”/</span>&gt;</span></code></pre>
<h3 id="articleHeader26">自动刷新网页</h3>
<p>你可以设置一段时间后对页面进行刷新操作。meta http-equiv=”refresh”可以指定浏览器延迟一段时间自动刷新页面。下面的meta-tag指定浏览器每5秒自动刷新一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=”refresh” content=”5″ />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">”refresh”</span> <span class="hljs-attr">content</span>=<span class="hljs-string">”5″</span> /&gt;</span></code></pre>
<h3 id="articleHeader27">自动重定向</h3>
<p>我们可以使用refresh meta标签对页面进行重定向。下面的例子将在5秒后访问www.25xt.com</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=”refresh” content=”5;url=’http://www.25xt.com’” />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">”refresh”</span> <span class="hljs-attr">content</span>=<span class="hljs-string">”5;url</span>=<span class="hljs-string">’http://www.25xt.com’”</span> /&gt;</span></code></pre>
<h3 id="articleHeader28">禁止浏览器缓存</h3>
<p>当我们在本地测试网页的时候，没有及时更新新内容，可能就是有浏览器缓存。这个时候，我们只要通过使用Meta标签禁用浏览器缓存，可以解决。通用代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;expires&quot; content=&quot;0&quot;>
<meta http-equiv=&quot;pragma&quot; content=&quot;no-cache&quot;>
<meta http-equiv=&quot;cache-control&quot; content=&quot;no-cache&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"cache-control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span></code></pre>
<h3 id="articleHeader29">禁止百度转码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-siteapp&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-siteapp"</span>/&gt;</span></code></pre>
<h3 id="articleHeader30">在移动开发当中，屏蔽数字当作电话号码的代码：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta content=”telephone=no” name=”format-detection” />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">”telephone</span>=<span class="hljs-string">no”</span> <span class="hljs-attr">name</span>=<span class="hljs-string">”format-detection”</span> /&gt;</span></code></pre>
<h2 id="articleHeader31">参考</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta" rel="nofollow noreferrer" target="_blank">MDN HTML &lt;meta&gt; element</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML meta 详解

## 原文链接
[https://segmentfault.com/a/1190000009705754](https://segmentfault.com/a/1190000009705754)

