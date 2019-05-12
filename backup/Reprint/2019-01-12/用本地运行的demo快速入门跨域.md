---
title: '用本地运行的demo快速入门跨域' 
date: 2019-01-12 2:30:24
hidden: true
slug: b1ver4iyr95
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>因为学习跨域需要配置本地服务器，可能会比较麻烦，所以自己根据网上的博客写了大多数跨域的简单demo，可以自己在<code>本地运行</code>，而且<code>不用配置服务器</code>。自己对于跨域的理解刚开始也仅仅在于网上的博客文章，通过写这些可以本地运行的demo让我对跨域有了更直面的理解，希望这些demo对你们有帮助，有错误的话欢迎指正，欢迎PR。</p>
<blockquote><p>github地址: <a href="https://github.com/FatDong1/cross-domain" rel="nofollow noreferrer" target="_blank">https://github.com/FatDong1/c...</a></p></blockquote>
<h3 id="articleHeader1">多种跨域demo</h3>
<ul>
<li><p>CROS跨域</p></li>
<li><p>JSONP跨域</p></li>
<li><p>postMessage跨域，html5新API</p></li>
<li><p>window.name跨域</p></li>
<li><p>location.hash跨域</p></li>
<li><p>document.domain跨域</p></li>
<li>
<p>后端proxy代理跨域</p>
<ul>
<li><p>demo1，通过使用<code>http-proxy-middleware插件</code>设置后端的代理</p></li>
<li><p>demo2，不使用插件去配置代理，更加原生地解释了proxy跨域的原理</p></li>
</ul>
</li>
<li><p>websocket跨域</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVPlhw?w=979&amp;h=407" src="https://static.alili.tech/img/bVPlhw?w=979&amp;h=407" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">优点</h3>
<ul>
<li><p>通过本地运行demo，可以快速理解多种跨域。</p></li>
<li><p>demo简单易懂，内附许多注释。</p></li>
<li><p>学习门槛低。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVPlht?w=856&amp;h=320" src="https://static.alili.tech/img/bVPlht?w=856&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">原理</h3>
<p>通过nodeJS的express框架在3000端口和3001端口分别生成服务器，在3000端口和3001端口进行跨域访问。</p>
<h3 id="articleHeader4">项目运行环境</h3>
<p>全局安装</p>
<ul>
<li><p>nodeJS</p></li>
<li><p>npm</p></li>
<li><p>git</p></li>
</ul>
<h3 id="articleHeader5">学习这些demo需要的基础</h3>
<ul>
<li><p>git clone项目到本地</p></li>
<li><p>一点点nodeJS知识，注释里面大部分有讲解node知识，如果不会nodeJS也是可以去学习这些demo的。</p></li>
</ul>
<h3 id="articleHeader6">学习建议</h3>
<p>在学习其中一种跨域方法的时候，建议边运行项目里的demo，边在网上搜索博客文章学习这种跨域方法，这样有助于快速并且深入理解跨域。鉴于网上有很多文章详细讲述跨域知识，只是少了可以本地运行的demo，所以这里就不再赘述跨域知识。</p>
<h3 id="articleHeader7">最后</h3>
<p>如果demo里面有什么错误，欢迎拍砖，如果有什么地方解释不清楚，可以在segmentfault私信我或者在gihtub提issue。</p>
<p>本文已同步到我的博客-- <a href="https://www.xuhaodong.cn/articles/53" rel="nofollow noreferrer" target="_blank">https://www.xuhaodong.cn/arti...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用本地运行的demo快速入门跨域

## 原文链接
[https://segmentfault.com/a/1190000009814558](https://segmentfault.com/a/1190000009814558)

