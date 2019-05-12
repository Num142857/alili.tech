---
title: '为什么要避免使用 "document.write()"' 
date: 2019-01-04 2:30:10
hidden: true
slug: h8z6pkbotok
categories: [reprint]
---

{{< raw >}}

                    
<p>本文是技术圈 <a href="https://segmentfault.com/g/1570000010620468">google 浏览器前端新特性播报</a>的推送，欢迎大家加入</p>
<h3 id="articleHeader0">为什么要避免使用 <code>document.write()</code>
</h3>
<p>最近我们发现如果我们在页面中使用了<code>document.wirte()</code>,那么在 chrome 的开发者控制台会出现下面的警告信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(index):34 A Parser-blocking, cross-origin script, 
https://paul.kinlan.me/ad-inject.js, is invoked via document.write(). 
This may be blocked by the browser if the device has poor network connectivity." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>(<span class="hljs-built_in">index</span>):<span class="hljs-number">34</span> A Parser-blocking, cross-origin script, 
http<span class="hljs-variable">s:</span>//paul.kinlan.<span class="hljs-keyword">me</span>/ad-inject.js, <span class="hljs-keyword">is</span> invoked via document.<span class="hljs-keyword">write</span>(). 
This may <span class="hljs-keyword">be</span> blocked by the browser <span class="hljs-keyword">if</span> the device <span class="hljs-built_in">has</span> poor network connectivity.</code></pre>
<p>为啥要做这个提示呢，对于在2G，3G 或者是慢 wifi 环境下面，使用<code>document.write()</code>动态加载资源会让页面的展现慢10秒以上，浏览器可以呈现页面之前，必须通过解析HTML标记来构建DOM树。每当解析器遇到脚本时，它必须停止并执行它，然后才能继续解析HTML。如果脚本动态地注入另一个脚本，解析器将被迫等待更长时间才能下载资源，这可能会导致一个或多个网络往返并延迟首次渲染页面的时间，导致页面无法加载或花费的时间长于用户放弃。根据Chrome中的设备，我们了解到，通过第三方脚本插入的<code>document.write()</code>页面的速度通常比2G的其他页面载入速度慢两倍。</p>
<h3 id="articleHeader1">去除<code>document.write</code>的效果</h3>
<p>chrome 开发者收集了28天chrome浏览器使用者的2G浏览数据,从中发现7.6%的2G加载页面中都包含了通过<code>document.write()</code>写入页面的跨网站，并且会中断浏览器解析的脚本。通过把这些加载脚本进行拦截加载，我们看到了以下的改进：</p>
<ul>
<li>页面加载到达<code>first contentful paint(视觉上让用户感觉正在加载的状态)t</code>的状态的数量增加10%，达到完全解析状态的页面数量增加25%，减少10%由于需要刷新页面带来的用户失望</li>
<li>到达<code>first contentful paint</code>的时间减少了21%(加快速度大于1秒)</li>
<li>解析页面所需的时间减少了38%，差不多加快了6秒，大大减少了向用户展示内容的时间</li>
</ul>
<h3 id="articleHeader2">chrome 浏览器对于<code>document.write</code>的策略</h3>
<p>针对以上的测试数据，chrome 从 55版本开始，chrome 浏览器对用户使用的<code>document.write()</code>进行干预，如果符合以下<strong>所有</strong>的情况，页面<code>&lt;script&gt;</code>标签中的<code>document.write()</code>将不会被执行:</p>
<ol>
<li>用户处于缓慢的连接状态，特别是用户在2G时。（将来可能会延伸到慢速连接的其他用户，例如慢速3G或慢速WiFi。）</li>
<li>
<code>document.write()</code>在一个顶级的文件中，不适用于iframe中的document.write脚本，因为它们不会阻止主页面的呈现。<br>3.<code>document.write()</code>中加载的脚本是会阻断解析的，如果脚本中有<code>async</code>或者是<code>defer</code>属性，那么它们还是会被解析执行</li>
</ol>
<p>4.<code>document.write()</code>中加载的脚本和页面地址不是同个主域的，换句话说，chrome 浏览器不会阻止<code>script</code>标签符合<code>eTLD+1</code>规则的加载（比如页面地址是<code>www.a.com</code>,<code>script</code>的地址是 <code>js.a.com</code>）<br>5.<code>document.write()</code>中加载的脚本尚未在浏览器HTTP缓存中。缓存中的脚本不会导致网络延迟，并且仍然会执行。</p>
<ol><li>页面的请求不是重新加载。如果用户触发重新加载并且正常执行该页面，Chrome将不会进行干预。</li></ol>
<h3 id="articleHeader3">如何检测你的<code>document.write</code>是否被执行限制了</h3>
<p>chrome 提供了多种方式来检测你的<code>document.write</code>请求是否被限制了</p>
<h4>了解下你的用户在2G下面的使用占比</h4>
<p>由于上面的规则现阶段只针对慢速情况2G,因此首先可以先分析出来，你的网站的2G 用户占比，通过<code>chrome</code>提供的网络信息 API，可以判断用户是不是在2G 环境下面，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(navigator.connection &amp;&amp;
   navigator.connection.type === 'cellular' &amp;&amp;
   navigator.connection.downlinkMax <= 0.115) {
   // Notify your service to indicate that you might be affected by this restriction.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">if</span>(navigator.connection &amp;&amp;
   navigator.connection.<span class="hljs-keyword">type</span> === <span class="hljs-string">'cellular'</span> &amp;&amp;
   navigator.connection.downlinkMax &lt;= <span class="hljs-number">0.115</span>) {
   <span class="hljs-comment">// Notify your service to indicate that you might be affected by this restriction.</span>
}</code></pre>
<h4>在 Chrome DevTools 中捕获警告</h4>
<p>在<code>chrome devtools</code>中，如果页面满足上面的2-5的规则，则会在<code>chrome devtools</code>中看到如下警告<br><span class="img-wrap"><img data-src="/img/bVSSL9?w=640&amp;h=196" src="https://static.alili.tech/img/bVSSL9?w=640&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>￼</p>
<h4>更加全面的告警</h4>
<p>上面两种方式结合之后可以对影响的用户量有一个初步的判断，如果要做精确的判断，可以检查 HTTP 头部：<br>当插入的脚本document.write被阻止时，Chrome会将以下标头发送到所请求的资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Intervention: <https://shorturl/relevant/spec>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">Intervention:</span> &lt;<span class="hljs-string">https:</span><span class="hljs-comment">//shorturl/relevant/spec&gt;;</span></code></pre>
<p>当document.write发现插入脚本时，可能会在不同情况下被阻止，Chrome可能会发送：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Intervention: <https://shorturl/relevant/spec>; level=&quot;warning&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">Intervention: &lt;https:<span class="hljs-regexp">//</span>shorturl<span class="hljs-regexp">/relevant/</span>spec&gt;; level=<span class="hljs-string">"warning"</span></code></pre>
<p>干预头将作为脚本的GET请求的一部分发送（在实际干预的情况下异步）。</p>
<h3 id="articleHeader4">替换方案</h3>
<p>由于<code>document.write</code>会减慢页面的加载，可以考虑使用<code>appendChild</code>等 api 将元素插入页面中，不过这两者有以下的区别</p>
<ul>
<li>
<code>document.write</code>的参数是一个 html 字符串，<code>appendChild</code>是一个<code>Node</code>对象</li>
<li>如果有多个<code>document.write</code>写入 script 标签，标签与标签之间的加载是同步的，也就是说，标签的加载顺序会和<code>document.write</code>的执行顺序相同;而使用<code>appendChild</code>插入多个<code>sciprt</code>标签时，标签加载的顺序是不确定的,先加载完成的先执行，因此通过<code>appendChild</code>插入<code>script</code>标签时，要注意是否需要对加载的顺序进行控制，可以通过<code>script.onload</code>进行顺序回调插入</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么要避免使用 "document.write()"

## 原文链接
[https://segmentfault.com/a/1190000010657951](https://segmentfault.com/a/1190000010657951)

