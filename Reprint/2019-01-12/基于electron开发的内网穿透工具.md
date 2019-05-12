---
title: '基于electron开发的内网穿透工具' 
date: 2019-01-12 2:30:24
hidden: true
slug: h8mmqc892l6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">proxy</h1>
<p><strong>基于electron开发的内网穿透工具.</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009851497?w=485&amp;h=592" src="https://static.alili.tech/img/remote/1460000009851497?w=485&amp;h=592" alt="try-to" title="try-to" style="cursor: pointer; display: inline;"></span></p>
<p>第一次写，估计有点不好排版，原谅俺是小白~</p>
<h2 id="articleHeader1">简介</h2>
<ol>
<li><p>性能强悍，反应速度更快</p></li>
<li><p>支持本地任意端口 可以用于开发本地网站，不需要服务器</p></li>
<li><p>暂不支持自定义域名，只能用系统默认的两个域名，但能支持任意子域名</p></li>
</ol>
<h2 id="articleHeader2">使用说明</h2>
<p>按以下步骤：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/try-to/electron-proxy
cd electron-proxy
npm install
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> https://github.com/try-to/electron-proxy
<span class="hljs-built_in">cd</span> electron-proxy
npm install
npm start</code></pre>
<h2 id="articleHeader3">软件打包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install grunt-electron-installer --save-dev
npm install grunt --save-dev
grunt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install grunt-electron-installer --save-dev
npm install grunt --save-dev
grunt</code></pre>
<p>速度可能会很慢，是因为网络原因，建议使用<a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">淘宝 NPM 镜像</a>.</p>
<h2 id="articleHeader4">也可以直接下载使用</h2>
<ul>
<li><p><a href="http://downloads.tryto.cn/proxy/1.0.1/win64.zip" rel="nofollow noreferrer" target="_blank">proxy-win-x64</a> - Windows x64</p></li>
<li><p><a href="http://downloads.tryto.cn/proxy/1.0.1/win32.zip" rel="nofollow noreferrer" target="_blank">proxy-win-x32</a> - Windows x32</p></li>
</ul>
<p>最后附上源码 <a href="https://github.com/try-to/electron-proxy/" rel="nofollow noreferrer" target="_blank">点我点我</a>，喜欢的话给个 star 呗~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于electron开发的内网穿透工具

## 原文链接
[https://segmentfault.com/a/1190000009851492](https://segmentfault.com/a/1190000009851492)

