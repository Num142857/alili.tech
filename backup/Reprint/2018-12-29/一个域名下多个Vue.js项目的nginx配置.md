---
title: '一个域名下多个Vue.js项目的nginx配置' 
date: 2018-12-29 2:30:10
hidden: true
slug: 5kful0uyse
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这段时间又开发了一个<a href="https://github.com/XNAL/vue-github-rank" rel="nofollow noreferrer" target="_blank">Vue.js+Node.js爬虫开发一个Github排行榜</a>的项目，加上之前的<a href="https://github.com/XNAL/ReadMore" rel="nofollow noreferrer" target="_blank">基于Vue2开发的读书WebAPP</a>就有两个Vue.js的项目需要部署了。虽然我有两个域名，但是我还是只想在一个域名下配置多个项目，毕竟以后还会有更多的项目。对nginx不是很熟，花费了很长的时间才最终配置出想达到的效果。这里就记录一下如何配置。</p>
<h2 id="articleHeader1">实现效果</h2>
<blockquote>
<a href="http://www.tdon.site/read-more/#/" rel="nofollow noreferrer" target="_blank">http://www.tdon.site/read-more/#/</a>: 基于Vue.js开发的读书WebAPP<p><a href="http://www.tdon.site/vue-github-rank/#/" rel="nofollow noreferrer" target="_blank">http://www.tdon.site/vue-github-rank/#/</a>: Vue.js+Node.js爬虫开发一个Github排行榜</p>
</blockquote>
<h2 id="articleHeader2">vue.js配置</h2>
<ul><li>
<h4>1. config/index.js</h4>
<p>修改 assetsPublicPath: '/vue-github-rank/'</p>
</li></ul>
<p>￼<span class="img-wrap"><img data-src="/img/bVWCAI?w=860&amp;h=360" src="https://static.alili.tech/img/bVWCAI?w=860&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<h4>2. src/router/index.js文件修改</h4>
<p>添加 base: '/vue-github-rank/'</p>
</li></ul>
<p>￼<span class="img-wrap"><img data-src="/img/bVWCAL?w=641&amp;h=143" src="https://static.alili.tech/img/bVWCAL?w=641&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>￼</p>
<h2 id="articleHeader3">nginx配置</h2>
<p><span class="img-wrap"><img data-src="/img/bVWCA2?w=725&amp;h=350" src="https://static.alili.tech/img/bVWCA2?w=725&amp;h=350" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>￼</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个域名下多个Vue.js项目的nginx配置

## 原文链接
[https://segmentfault.com/a/1190000011549083](https://segmentfault.com/a/1190000011549083)

