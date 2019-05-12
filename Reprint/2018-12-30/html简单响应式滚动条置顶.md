---
title: 'html简单响应式滚动条置顶' 
date: 2018-12-30 2:30:10
hidden: true
slug: sre23jbi7l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简单响应式滚动条置顶</h2>
<h3 id="articleHeader1">一般的，让页面出现滚动条的常见方法有：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow:auto||overflow:scroll
或者overflow-x水平滚动条和overflow-y垂直滚动条
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">overflow</span>:<span class="hljs-keyword">auto</span>||<span class="hljs-built_in">overflow</span>:scroll
或者<span class="hljs-built_in">overflow</span>-x水平滚动条和<span class="hljs-built_in">overflow</span>-y垂直滚动条
</code></pre>
<h3 id="articleHeader2">那么现在要实现这样的一个效果：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="直接在body中给一个header，后面一个Group盒子，并且header为常驻顶部的，实现滚动条顶部位置不滚动到header中（包含在header中会影响美观） " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;">直接在body中给一个<span class="hljs-keyword">header</span>，后面一个<span class="hljs-keyword">Group</span>盒子，并且<span class="hljs-keyword">header</span>为常驻顶部的，实现滚动条顶部位置不滚动到<span class="hljs-keyword">header</span>中（包含在<span class="hljs-keyword">header</span>中会影响美观） </code></pre>
<hr>
<p><strong>首先看例子：</strong>  <br><span class="img-wrap"><img data-src="/img/remote/1460000011336976" src="https://static.alili.tech/img/remote/1460000011336976" alt="sfNote_0924_0182b3f.png" title="sfNote_0924_0182b3f.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3"><strong>分析：</strong></h2>
<blockquote>
<p>每当滚动条移动到header的高度的位置时，这时盒子中的前排内容是并没有显示出来的，但是滚动条到此处就得停止。那么盒子首先就需要设置一个<code>margin-top：header的高 ,</code>和定位<code>top</code>的值  ,在js中也要控制scrollTop值，通过判断滚动条移动到容器顶部时固定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="header{position: fixed;top: 0;left: 0;right: 0;z-index: 999;}  
  #con{margin-top: 150px;position: absolute;top:50px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">header</span>{<span class="hljs-attribute">position</span>: fixed;<span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">z-index</span>: <span class="hljs-number">999</span>;}  
  <span class="hljs-selector-id">#con</span>{<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">150px</span>;<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">top</span>:<span class="hljs-number">50px</span>;}</code></pre>
<p><a href="https://miao.su/image/MBeFb" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011336977" src="https://static.alili.tech/img/remote/1460000011336977" alt="sfNote_0924_038b8df.png" title="sfNote_0924_038b8df.png" style="cursor: pointer; display: inline;"></span></a></p>
</blockquote>
<h3 id="articleHeader4">最终效果：</h3>
<p><a href="https://miao.su/image/MB3mR" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011336978" src="https://static.alili.tech/img/remote/1460000011336978" alt="sfNote_0924_04d47fa.png" title="sfNote_0924_04d47fa.png" style="cursor: pointer; display: inline;"></span></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="js获取屏幕滚动条：document.documentElement.scrollTop || document.body.scrollTop
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>js获取屏幕滚动条：<span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html简单响应式滚动条置顶

## 原文链接
[https://segmentfault.com/a/1190000011336971](https://segmentfault.com/a/1190000011336971)

