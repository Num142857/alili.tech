---
title: '网站性能优化——DNS预热与合并HTTP请求' 
date: 2018-12-21 2:30:11
hidden: true
slug: hk4lzbnkrc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">DNS预热</h2>
<blockquote>一次DNS解析耗时<code>20-120ms</code>, 当网页中使用的域名较多时，DNS预热节省的时间还是非常可观的</blockquote>
<h4>先看效果</h4>
<p><span class="img-wrap"><img data-src="/img/bV0A1g?w=982&amp;h=919" src="https://static.alili.tech/img/bV0A1g?w=982&amp;h=919" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>预热的目的：</h4>
<ol>
<li>减少请求次数</li>
<li>提前对DNS预获取</li>
</ol>
<h4>预热的方式</h4>
<ol>
<li>爬虫</li>
<li>APP</li>
<li>网页meta</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta http-equiv=&quot;x-dns-prefetch-control&quot; content=&quot;on&quot; />
    <link rel=&quot;dns-prefetch&quot; href=&quot;//webresource.english.c-ctrip.com&quot; />
    <link rel=&quot;dns-prefetch&quot; href=&quot;//webresource.c-ctrip.com&quot; />
    <link rel=&quot;dns-prefetch&quot; href=&quot;//s.c-ctrip.com&quot; />
    <link rel=&quot;dns-prefetch&quot; href=&quot;//pic.english.c-ctrip.com&quot; />
    <link rel=&quot;dns-prefetch&quot; href=&quot;//m.ctrip.com&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"x-dns-prefetch-control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"on"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//webresource.english.c-ctrip.com"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//webresource.c-ctrip.com"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//s.c-ctrip.com"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//pic.english.c-ctrip.com"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//m.ctrip.com"</span> /&gt;</span></code></pre>
<blockquote>另外，对于国际化站点尤其需要这么做，举个例子，在美国访问中国的网站，DNS解析会回源到中国，耗时通常在<code>400ms</code>至<code>800ms</code>，甚至更长，如果提前预热，那么可以节省这些时间。</blockquote>
<h2 id="articleHeader1">合并HTTP请求</h2>
<blockquote>这里的合并主要针对当前页面上访问的资源文件，比如css,js,图片等。</blockquote>
<h4>为甚么要合并请求？</h4>
<p>有人会很奇怪，现代浏览器都可以并发请求资源了，为什么还要这么做？我只能说你还too young too simple了。浏览器虽然可以并发，但是PC接入互联网的带宽是有限的，浏览器所能用的TCP链接更是有限的，我来看一个网页请求的实例：</p>
<p><span class="img-wrap"><img data-src="/img/bV0A1j?w=1604&amp;h=792" src="https://static.alili.tech/img/bV0A1j?w=1604&amp;h=792" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看到了吧，一个<code>2KB</code>的资源加载需要将近<code>0.5s</code>，而99%时间是等待, OMG! 所以还挣扎什么，老老实实的用webpack压在一起吧。</p>
<blockquote>注意chrome在http和https下相同域名可以并发的请求数不同：http = 6，https &gt; 13，这里并发是有相当的水分，从上图中可以看出，链接虽然建立了，但并没什么卵用，依然要等待之前的资源下载下来才开始生效，至于浏览器为啥要这般？（谁知道可以留言告知，万分感谢！）</blockquote>
<h4>更多参考</h4>
<ul><li><a href="https://github.com/tvrcgo/notes/issues/4" rel="nofollow noreferrer" target="_blank">浏览器请求静态资源的并发数</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
网站性能优化——DNS预热与合并HTTP请求

## 原文链接
[https://segmentfault.com/a/1190000012496298](https://segmentfault.com/a/1190000012496298)

