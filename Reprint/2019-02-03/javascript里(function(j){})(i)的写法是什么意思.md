---
title: 'javascript里(function(j){})(i)的写法是什么意思' 
date: 2019-02-03 2:30:39
hidden: true
slug: y82grdxivyk
categories: [reprint]
---

{{< raw >}}

                    
<p>微信小程序火热发布测试，第一时间下了微信开发者工具和Demo玩一把。<br>在Demo的wx-action-sheet.js中看到一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < items.length; ++i) {
  (function(itemName) {
    pageObject['bind' + itemName] = function(e) {
      console.log('click' + itemName, e)
    }
  })(items[i])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; items.length; ++i) {</span>
  (<span class="hljs-name">function</span>(<span class="hljs-name">itemName</span>) {
    pageObject['bind' + itemName] = function(<span class="hljs-name">e</span>) {
      console.log('click' + itemName, e)
    }
  })(<span class="hljs-name">items</span>[i])
}</code></pre>
<p>看上去<code>(function(j){})(i)</code>比较神奇，其实很简单，第一个括号定义了一个匿名函数，后一个括号是指调用了这个函数，并传入参数<code>i</code>。当然这个匿名函数接受一个参数，命名为<code>j</code>。<br>就是这么简单。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript里(function(j){})(i)的写法是什么意思

## 原文链接
[https://segmentfault.com/a/1190000007000832](https://segmentfault.com/a/1190000007000832)

