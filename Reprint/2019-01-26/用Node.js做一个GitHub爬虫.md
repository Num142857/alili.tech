---
title: '用Node.js做一个GitHub爬虫' 
date: 2019-01-26 2:30:18
hidden: true
slug: 7blv107lnf8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>用Node.js写了一个爬虫,可以获取GitHub各种编程语言star数前十的库</p></blockquote>
<p>在线地址: <a href="http://www.flypie.cn:9999/" rel="nofollow noreferrer" target="_blank">http://www.flypie.cn:9999/</a></p>
<p>GitHub地址：</p>
<ul>
<li><p>前端 <a href="https://github.com/flypie2/githubfetch-client" rel="nofollow noreferrer" target="_blank">https://github.com/flypie2/gi...</a></p></li>
<li><p>后台 <a href="https://github.com/flypie2/githubfetch" rel="nofollow noreferrer" target="_blank">https://github.com/flypie2/gi...</a></p></li>
</ul>
<h2 id="articleHeader0">技术栈</h2>
<ul>
<li><p>后端框架 koa</p></li>
<li><p>数据获取 axios获取数据 cheerio抓取数据</p></li>
<li><p>数据存储可选本地json存储或redis存储</p></li>
<li><p>node-schedule 开启定时任务抓取数据并更新本地存储</p></li>
<li><p>前端用vue2.0和MintUI进行数据展示和操作</p></li>
</ul>
<h2 id="articleHeader1">功能</h2>
<p>我闲的没事的时候经常逛GitHub，看看现在star排行榜上靠前的库，<br>于是干脆做了一个小爬虫来定时抓取GitHub上star数前十的库，<br>然后根据编程语言进行选择浏览，功能很简单，大概做了一天时间。</p>
<p>主要时间都花在调试，因为GitHub防爬虫做的很好,<br>如果发送请求过多过快会被封或返回429错误(429表示请求过于频繁)。</p>
<p>最后放个项目截图:</p>
<p><span class="img-wrap"><img data-src="/img/bVJkPh?w=608&amp;h=1076" src="https://static.alili.tech/img/bVJkPh?w=608&amp;h=1076" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Node.js做一个GitHub爬虫

## 原文链接
[https://segmentfault.com/a/1190000008382540](https://segmentfault.com/a/1190000008382540)

