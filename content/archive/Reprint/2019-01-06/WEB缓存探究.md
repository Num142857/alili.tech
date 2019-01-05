---
title: 'WEB缓存探究' 
date: 2019-01-06 2:30:10
hidden: true
slug: 05huib7ptdlp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>由于项目越来越大，即使了使用代码压缩工具减少文件大小，js文件还是不可避免的越变越大。<br>而对于用户来说每次重新下载都有可能会消耗大量时间，让我们的首屏展示有较长时间的空白。<br>为了提升网站性能，有效利用缓存能够提升用户体验，提高访问效率。</p>
<h2 id="articleHeader1">浏览器缓存</h2>
<h3 id="articleHeader2">HTML中的Meta标签</h3>
<p>http-equiv属性，相当于http的文件头中的参数，而content的内容则是对应参数的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 告诉浏览器不缓存当前页面 -->
<meta http-equiv=&quot;pragma&quot; content=&quot;no-cache&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 告诉浏览器不缓存当前页面 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span></code></pre>
<p>然而设置<code>pragma: no-cache</code>并不能应用于HTTP1.1及以上规范，<br>而且因为这个方法太老了，如果你不需要估计那些史前客户的感受，完全可以不加?</p>
<p>当然可以不用太方，还有其他的参数可以选择使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-cache&quot; /> <!-- HTTP1.1 在1.1中优先于expires-->
<meta http-equiv=&quot;pragma&quot; content=&quot;no-cache&quot; /> <!-- HTTP1.0 -->
<meta http-equiv=&quot;Expires&quot; content=&quot;0&quot; /> <!-- 示意到期时间 HTTP1.0 &amp; 1.1 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- HTTP1.1 在1.1中优先于expires--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- HTTP1.0 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span> /&gt;</span> <span class="hljs-comment">&lt;!-- 示意到期时间 HTTP1.0 &amp; 1.1 --&gt;</span></code></pre>
<p>但是使用meta标签设置的参数优先级低于http请求中声明的，如果你同时设置了http头，那么就没有必要加上meta标签了。</p>
<p><strong>当然，最后还有一个重要的一点，就是根据叉烧包的实验，meta制定这些内容可以说基本没有什么卵用:)</strong><br><strong>悲伤的故事……当然可能你的浏览器还可以用哦</strong></p>
<h3 id="articleHeader3">Header参数</h3>
<p>最保险的显然是配置Header参数来保证资源的缓存</p>
<ol>
<li>
<p><strong>Cache-Control</strong><br>Cache-Control 标头是在 HTTP/1.1 规范中定义的，取代了之前用来定义响应缓存策略的标头例如 Expires。<br>所有现代浏览器都支持 Cache-Control。</p>
<ul>
<li><p><strong>max-age</strong>     指从请求的时间开始，允许缓存有效的最长时间(单位是s)</p></li>
<li><p><strong>public</strong>      可被任何对象缓存。它不是必须的，因为明确的缓存信息已表示响应是可以缓存的</p></li>
<li><p><strong>private</strong>     通常只为单个用户缓存，不允许任何中间缓存对其进行缓存</p></li>
<li><p><strong>no-cache</strong>    表示必须先与服务器确认返回的响应是否发生了变化</p></li>
<li><p><strong>no-store</strong>    禁止浏览器以及所有中间缓存存储任何版本的返回响应，每次请求必须重新下载</p></li>
</ul>
<p>借用谷歌爸爸的一张图来展示一下Cache-Control的选择策略<br><span class="img-wrap"><img data-src="/img/bVuuoZ" src="https://static.alili.tech/img/bVuuoZ" alt="最佳Cache-Control策略树" title="最佳Cache-Control策略树" style="cursor: pointer; display: inline;"></span></p>
</li>
<li><p><strong>Expires</strong><br>   它代表一个缓存过期的绝对时间，在HTTP/1.0中实现，在HTTP/1.1中优先级低于Cache-Control。</p></li>
</ol>
<p>它的缺点就是如果服务器与客户端误差较大，那么它的误差也会变大</p>
<ol>
<li><p><strong>Last-Modified</strong><br>   标记的是资源的最后修改时间，需要配合Cache-Control使用。只能精确到秒级，如果某些文件在1秒内修改多次，则无法及时更新</p></li>
<li><p><strong>ETag</strong><br>   相当于验证令牌。通过它可以可实现高效的资源更新检查：资源未发生变化时不会传送任何数据。</p></li>
</ol>
<p>ETag通常是服务器生成的文件内容的哈希值或某个其他指纹。如果请求时指纹仍然相同，则表示资源未发生变化，则可跳过下载。</p>
<h4>参数弃用小指南</h4>
<ul><li><p>如果你不考虑ie6和<code>HTTP 1.0</code>客户端，那么你可以无视<code>Pragma</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache-Control: no-store, must-revalidate
Expires: 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http"><span class="hljs-attribute">Cache-Control</span>: no-store, must-revalidate
<span class="hljs-attribute">Expires</span>: 0</code></pre>
<ul><li><p>如果你也不打算管<code>HTTP 1.0</code>代理，那么你可以无视<code>Expires</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache-Control: no-store, must-revalidate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">Cache-Control</span>: no-store, must-revalidate</code></pre>
<ul><li><p>如果服务器自动包含有效的<code>Date</code>标头，则理论上也可以省略<code>Cache-Control</code>，并仅依赖于<code>Expires</code>。不过如果客户端和服务端时间有差别，就可能会失败哦</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Date: Wed, 24 Aug 2016 18:32:02 GMT
Expires: 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http"><span class="hljs-attribute">Date</span>: Wed, 24 Aug 2016 18:32:02 GMT
<span class="hljs-attribute">Expires</span>: 0</code></pre>
<ul><li><p>总的来说还是使用<code>Cache-Control</code>最妥妥的(如果不打算考虑<code>HTTP 1.0</code>)</p></li></ul>
<h2 id="articleHeader4">项目实践</h2>
<h3 id="articleHeader5">更新文件&amp;弃用缓存</h3>
<p>在项目中，当我们使用本地缓存后又会遇到另一个问题——如何更新文件、弃用缓存。<br>通常，我们通过对文件名加入指纹来实现。</p>
<p>以webpack为例，<br>写配置文件时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    output: {
        filename: &quot;bundle.[hash].js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.[hash].js"</span>
    }
}</code></pre>
<p>为打包后的文件名加上hash，使文件更新之后会生成新的hash，以达到弃用原来缓存的效果。</p>
<h3 id="articleHeader6">定制缓存策略</h3>
<p>可以为不同类型的文件定义不同的缓存策略，以达到最高效的结果</p>
<ol>
<li><p>将HTML被标记为“no-cache”，使浏览器在每次请求时都始终会重新验证文档，并在内容变化时能够及时获取最新版本，即使下载新资源。</p></li>
<li><p>允许浏览器和中间缓存（如CDN）缓存CSS，并将CSS设置为1年后到期，超长的缓存时间可以让用户避免每次都从服务端获取响应。同时不要忘记给文件名加上指纹，以便及时更新改动</p></li>
<li><p>JavaScript同样设置为1年后到期，但标记为private，因为它可能会包含某些用户私人数据，这是CDN不应缓存的。</p></li>
<li><p>图像缓存时不包含版本或唯一指纹，并设置为1天后到期。</p></li>
</ol>
<h3 id="articleHeader7">其他技巧</h3>
<ol><li><p>减少对Cookie的依赖，因为每次HTTP请求都会带上Cookie，这回增大传输流量（当然将静态资源挂载在其他域名下，也可以达到cookie free的效果）</p></li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB缓存探究

## 原文链接
[https://segmentfault.com/a/1190000010367680](https://segmentfault.com/a/1190000010367680)

