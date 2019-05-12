---
title: '完美解决safari、微信浏览器下拉回弹效果。' 
date: 2019-02-01 2:30:10
hidden: true
slug: 0nl0kewaj6s
categories: [reprint]
---

{{< raw >}}

                    
<p>完美解决safari、微信浏览器下拉回弹效果，只保留局部回弹效果。</p>
<p>CSS代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">overflow</span>: auto;
  <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
}</code></pre>
<p>HTML代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body class=&quot;box&quot;>

    <div class=&quot;scroll&quot; style=&quot;height:1500px&quot;>
        
    </div>
    
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;body <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"box"</span>&gt;

    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"scroll"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:1500px"</span>&gt;</span>
        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    
&lt;<span class="hljs-regexp">/body&gt;</span></code></pre>
<p>JS代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop
        ,totalScroll = el.scrollHeight
        ,currentScroll = top + el.offsetHeight;
        if(top === 0) {
            el.scrollTop = 1;
        }else if(currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });

    el.addEventListener('touchmove', function(evt) {
    if(el.offsetHeight < el.scrollHeight)
        evt._isScroller = true;
    });
}
        
overscroll(document.querySelector('.scroll'));
document.body.addEventListener('touchmove', function(evt) {
    if(!evt._isScroller) {
        evt.preventDefault();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> overscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>) </span>{
    el.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> top = el.scrollTop
        ,totalScroll = el.scrollHeight
        ,currentScroll = top + el.offsetHeight;
        <span class="hljs-keyword">if</span>(top === <span class="hljs-number">0</span>) {
            el.scrollTop = <span class="hljs-number">1</span>;
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(currentScroll === totalScroll) {
            el.scrollTop = top - <span class="hljs-number">1</span>;
        }
    });

    el.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">if</span>(el.offsetHeight &lt; el.scrollHeight)
        evt._isScroller = <span class="hljs-literal">true</span>;
    });
}
        
overscroll(<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.scroll'</span>));
<span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">if</span>(!evt._isScroller) {
        evt.preventDefault();
    }
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
完美解决safari、微信浏览器下拉回弹效果。

## 原文链接
[https://segmentfault.com/a/1190000007301527](https://segmentfault.com/a/1190000007301527)

