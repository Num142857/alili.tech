---
title: '前端内网穿透，localtunnel你值得拥有！' 
date: 2018-12-01 2:30:12
hidden: true
slug: 7q0nxx89k5m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>一个前端在调试本地页面时，总会有些稀奇古怪的需求，比如产品立刻要看你的页面效果，而此时有没有上线环境折腾给他看，那此时通过内网穿透的方式，实时把你的项目生成一个在线链接丢给他，让他去找那一像素的bug！</blockquote>
<h2 id="articleHeader0">什么是内网穿透</h2>
<p>我的理解是：将您的本地主机公开到世界各地，便于测试和共享，无需混淆DNS或部署只是为了让其他人测试您的更改。</p>
<h2 id="articleHeader1"><a href="https://github.com/localtunnel/localtunnel" rel="nofollow noreferrer" target="_blank">localtunnel</a></h2>
<p>通过<a href="https://github.com/localtunnel/localtunnel" rel="nofollow noreferrer" target="_blank">localtunnel</a>就能把你的本地地址映射到一个公共地址，让其他用户也能访问，比如我本地地址localhost:8888,通过<a href="https://github.com/localtunnel/localtunnel" rel="nofollow noreferrer" target="_blank">localtunnel</a>生成一个指定前缀的<a href="https://huqi.localtunnel.me%E5%9C%B0%E5%9D%80" rel="nofollow noreferrer" target="_blank">https://huqi.localtunnel.me地址</a>，让测试人员无需通过局域网等就能访问。</p>
<h2 id="articleHeader2">安装及使用</h2>
<p>默认你安装了node的环境</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install -g localtunnel  
    lt --subdomain <个性前缀> --port <要映射的端口>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    npm install -g localtunnel  
    lt --subdomain <span class="hljs-tag">&lt;<span class="hljs-name">个性前缀</span>&gt;</span> --port <span class="hljs-tag">&lt;<span class="hljs-name">要映射的端口</span>&gt;</span>
</code></pre>
<p>比如我本地开启了一个8888的服务</p>
<p><span class="img-wrap"><img data-src="/img/bVbaifj?w=778&amp;h=148" src="https://static.alili.tech/img/bVbaifj?w=778&amp;h=148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接着我就开启localtunnel  </p>
<p><span class="img-wrap"><img data-src="/img/bVbaifq?w=885&amp;h=74" src="https://static.alili.tech/img/bVbaifq?w=885&amp;h=74" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器输入地址即可访问</p>
<p><span class="img-wrap"><img data-src="/img/bVbaifF?w=598&amp;h=1002" src="https://static.alili.tech/img/bVbaifF?w=598&amp;h=1002" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">遇到的坑</h2>
<p>显示无效的主机：<a href="https://github.com/localtunnel/localtunnel/issues/244" rel="nofollow noreferrer" target="_blank">Invalid Host header</a>，<br>经查是因为wepack配置的问题</p>
<ul>
<li>问题<br><span class="img-wrap"><img data-src="/img/bVbaioG?w=565&amp;h=121" src="https://static.alili.tech/img/bVbaioG?w=565&amp;h=121" alt="39851094-ab28aeb6-5447-11e8-8a1d-1ce52ddc455e.png" title="39851094-ab28aeb6-5447-11e8-8a1d-1ce52ddc455e.png" style="cursor: pointer; display: inline;"></span>
</li>
<li>解决：webpack配置文件devServer添加：disableHostCheck: true</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbaipj?w=1361&amp;h=440" src="https://static.alili.tech/img/bVbaipj?w=1361&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">其他有趣的现象</h2>
<p>当已经有了一个自定义的域名，另外一个人又开启一个同样的域名会怎样？<br>很大几率会出现如下情况(当然不是防火墙的问题)：</p>
<ul><li>Error: connection refused: localtunnel.me:38571 (check your firewall settings)<br><span class="img-wrap"><img data-src="/img/bVbairm?w=1218&amp;h=322" src="https://static.alili.tech/img/bVbairm?w=1218&amp;h=322" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端内网穿透，localtunnel你值得拥有！

## 原文链接
[https://segmentfault.com/a/1190000014807448](https://segmentfault.com/a/1190000014807448)

