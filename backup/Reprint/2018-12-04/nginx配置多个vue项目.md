---
title: 'nginx配置多个vue项目' 
date: 2018-12-04 2:30:05
hidden: true
slug: ffequqcmwmr
categories: [reprint]
---

{{< raw >}}

                    
<h1>nginx配置多个vue项目</h1>
<h2>需求</h2>
<p><code>nginx</code> 下配置多个 <code>vue</code> 项目,或者也可以说是非根目录下的配置。</p>
<blockquote>举例:</blockquote>
<ul>
<li>blog: <code>https://www.yoursite.com/blog</code>
</li>
<li>test: <code>https://www.yoursite.com/test</code>
</li>
</ul>
<h2>vue项目中配置</h2>
<blockquote>
<code>vue-router</code> 设置 <code>base</code> 路径</blockquote>
<pre><code class="js">base: '/blog/'</code></pre>
<blockquote>
<code>config/index.js</code> 修改 <code>assetsPublicPath</code>
</blockquote>
<pre><code class="js">assetsPublicPath: '/blog/'</code></pre>
<h2>nginx配置</h2>
<pre><code class="nginx">location /blog {
  try_files $uri $uri/ /blog/index.html;
}</code></pre>
<p><a href="https://github.com/chenyinkai/blog/issues/40" rel="nofollow noreferrer">原文地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nginx配置多个vue项目

## 原文链接
[https://segmentfault.com/a/1190000014464699](https://segmentfault.com/a/1190000014464699)

