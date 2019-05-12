---
title: '-webkit-flex 被移除了' 
date: 2019-02-07 2:30:16
hidden: true
slug: 0wgxsvfyn6qe
categories: [reprint]
---

{{< raw >}}

                    
<p>背景：<br>用的是webpack + autoprefixer + css-loader。 <br>开发的时候好好的，上线之后的代码发现-webkit-flex 被移除了，真的被移除了。</p>
<p>这里有两个问题:</p>
<p>1 autoprefixer新版本会默认不提供-webkit-flex. 可以去这里试试 <a href="https://autoprefixer.github.io/" rel="nofollow noreferrer" target="_blank">https://autoprefixer.github.io/</a> ，并没有生成 -webkit-flex</p>
<p><span class="img-wrap"><img data-src="/img/bVyRBY" src="https://static.alili.tech/img/bVyRBY" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>需要给autoprefixer配置参数。比如说要兼容iOS &gt;= 8就在最下面的input框输入 iOS &gt;= 8 ，apply即可。<br>具体到webpack的是<code>postcss: [autoprefixer({browsers: ['iOS &gt;= 8', 'Android &gt;= 4.1']}), precss]</code></p>
<p>2 第一步做好之后有-webkit-flex了。 但是你会发现发布的代码-webkit-flex被过滤了，被过滤了，被过滤了。wtf。 <br>原因是css-loader认为已经 <code>deprecated</code>， 就过滤了。 <a href="https://github.com/webpack/css-loader#minification" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/css-loader#minification</a><br>具体按照刚刚的链接配置就好，具体到webpack是<code>loader: 'style!css?-autoprefixer!postcss!less'</code></p>
<p>the end</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
-webkit-flex 被移除了

## 原文链接
[https://segmentfault.com/a/1190000005886991](https://segmentfault.com/a/1190000005886991)

