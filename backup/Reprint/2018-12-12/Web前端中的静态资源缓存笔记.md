---
title: 'Web前端中的静态资源缓存笔记' 
date: 2018-12-12 2:30:10
hidden: true
slug: vh5e7au2wsg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">根据webkit资源的分类</h2>
<p>webkit的资源分类主要分为两大类：主资源和派生资源。</p>
<ul>
<li>主资源：比如HTML页面，或者下载项，对应代码中的类是<code>MainResourceLoader</code>。</li>
<li>派生资源：比如HTML页面中内嵌的图片或者脚本链接，对应代码中的类是<code>SubresourceLoader</code>。</li>
</ul>
<hr>
<h2 id="articleHeader1">根据http状态码分类</h2>
<ol>
<li><code>200 (from memory cache)</code></li>
<li><code>200 (from disk cache)</code></li>
<li><code>304 (Not Modified)</code></li>
</ol>
<h3 id="articleHeader2">200 (from memory cache)</h3>
<p>不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。</p>
<blockquote>虽然Webkit支持<code>memoryCache</code>，但是也只是针对<strong>派生资源</strong>，它对应的类为<code>CachedResource</code>，用于保存原始数据（比如<code>CSS</code>，<code>JS</code>等），以及解码过的图片数据。</blockquote>
<h3 id="articleHeader3">200 (from disk cache)</h3>
<p>不访问服务器，直接从磁盘中读取缓存，当kill进程时，数据还是存在。</p>
<p>它的直接操作对象为<code>CurlCacheManager</code>。</p>
<blockquote>这种方式也只能缓存<strong>派生资源</strong>。<p>它的存储形式为一个<code>index.dat</code>文件，记录存储数据的<code>url</code>，然后再分别存储该<code>url</code>的<strong>response信息</strong>和<strong>content内容</strong>。Response信息最大作用就是用于判断服务器上该url的content内容是否被修改。具体详见： <br><a href="http://baike.baidu.com/link?url=n5nx7f8fGB_-B3OieAvMvJIGeBNvipb9qGQhYO0YwwBLg6oxqv_05Up3JUJk4jZyAd-KiCM1Hmg4nR23B5BhSq" rel="nofollow noreferrer" target="_blank">Last-Modified</a></p>
</blockquote>
<h3 id="articleHeader4">304 (Not Modified)</h3>
<p>访问服务器，发现数据没有</p>
<p>更新，服务器返回此状态码。然后从缓存中读取数据。</p>
<blockquote>至于何时使用本地缓存，何时会访问服务器304，这就和服务器在请求返回中的Header字段有关了。附上<a href="https://segmentfault.com/a/1190000011658603">我的HTTP学习笔记</a>。</blockquote>
<h3 id="articleHeader5">http header</h3>
<h4>max-age</h4>
<p>web中的文件被用户访问(请求)后的存活时间,是个相对的值,相对Request_time(请求时间)</p>
<h4>Expires</h4>
<p>Expires指定的时间根据服务器配置可能有两种：</p>
<ol>
<li>文件最后访问时间</li>
<li>文件绝对修改时间</li>
</ol>
<p>如果max-age和Expires同时存在，则被Cache-Control的max-age覆盖</p>
<h4>Last-modified</h4>
<p>WEB 服务器认为对象的最后修改时间，比如文件的最后修改时间，动态页面的最后产生时间</p>
<h4>ETag</h4>
<p>对象（比如URL）的标志值，就一个对象而言，文件被修改，Etag也会修改</p>
<h4>Cache-Control</h4>
<p>简单理解，强缓存</p>
<h3 id="articleHeader6">三级缓存原理</h3>
<ol>
<li>先去内存看，如果有，直接加载</li>
<li>如果内存没有，择取硬盘获取，如果有直接加载</li>
<li>如果硬盘也没有，那么就进行网络请求</li>
<li>加载到的资源缓存到硬盘和内存</li>
</ol>
<h3 id="articleHeader7">结论</h3>
<p>引用网上图片<br><span class="img-wrap"><img data-src="/img/remote/1460000013464976?w=720&amp;h=846" src="https://static.alili.tech/img/remote/1460000013464976?w=720&amp;h=846" alt="https://pic2.zhimg.com/80/v2-78461056b1ab65ea3ad247309d492d2b_hd.jpg" title="https://pic2.zhimg.com/80/v2-78461056b1ab65ea3ad247309d492d2b_hd.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web前端中的静态资源缓存笔记

## 原文链接
[https://segmentfault.com/a/1190000013464971](https://segmentfault.com/a/1190000013464971)

