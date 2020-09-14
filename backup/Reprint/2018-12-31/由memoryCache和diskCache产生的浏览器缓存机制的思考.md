---
title: '由memoryCache和diskCache产生的浏览器缓存机制的思考' 
date: 2018-12-31 2:30:29
hidden: true
slug: hvmed91s0a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>今天在做项目的优化的时候，使用chrome开发者工具的network发现了细节：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011286030" src="https://static.alili.tech/img/remote/1460000011286030" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>虽然这两个看起来都是从缓存中读取，但还是有一些不一样的！</p></blockquote>
<h2 id="articleHeader0">webkit资源的分类</h2>
<p>webkit的资源分类主要分为两大类：主资源和派生资源</p>
<h2 id="articleHeader1">http状态码</h2>
<h5>200 from memory cache</h5>
<p>不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。</p>
<p>但是这种方式只能缓存派生资源。</p>
<h5>200 from disk cache</h5>
<p>不访问服务器，直接读缓存，从磁盘中读取缓存，当kill进程时，数据还是存在。</p>
<p>这种方式也只能缓存派生资源</p>
<h5>304 Not Modified</h5>
<p>访问服务器，发现数据没有<br>更新，服务器返回此状态码。然后从缓存中读取数据。</p>
<blockquote><p>但是这里有困惑，怎么判断from memory cache还是304</p></blockquote>
<h2 id="articleHeader2">三级缓存原理</h2>
<ol>
<li>先去内存看，如果有，直接加载</li>
<li>如果内存没有，择取硬盘获取，如果有直接加载</li>
<li>如果硬盘也没有，那么就进行网络请求</li>
<li>加载到的资源缓存到硬盘和内存</li>
</ol>
<p>所以我们可以来解释这个现象</p>
<blockquote><p>图片为例：</p></blockquote>
<p>访问-&gt; 200 -&gt; 退出浏览器<br>再进来-&gt; 200(from disk cache) -&gt; 刷新 -&gt; 200(from memory cache)</p>
<h2 id="articleHeader3">http header</h2>
<h5>max-age</h5>
<p>web中的文件被用户访问(请求)后的存活时间,是个相对的值,相对Request_time(请求时间)</p>
<h5>Expires</h5>
<p>Expires指定的时间根据服务器配置可能有两种：</p>
<ol>
<li>文件最后访问时间</li>
<li>文件绝对修改时间</li>
</ol>
<p>如果max-age和Expires同时存在，则被Cache-Control的max-age覆盖</p>
<h5>last-modified</h5>
<p>WEB 服务器认为对象的最后修改时间，比如文件的最后修改时间，动态页面的最后产生时间</p>
<h5>ETag</h5>
<p>对象（比如URL）的标志值，就一个对象而言，文件被修改，Etag也会修改</p>
<h4>Cache-Control</h4>
<p>简单理解，强缓存</p>
<h2 id="articleHeader4">最后结论</h2>
<p>见图片（来源自网络）<br><span class="img-wrap"><img data-src="/img/remote/1460000011286031" src="https://static.alili.tech/img/remote/1460000011286031" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由memoryCache和diskCache产生的浏览器缓存机制的思考

## 原文链接
[https://segmentfault.com/a/1190000011286027](https://segmentfault.com/a/1190000011286027)

