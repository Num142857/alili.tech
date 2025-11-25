---
title: '从重绘重排角度讲解transform的动画性能' 
date: 2019-01-19 2:30:09
hidden: true
slug: smaveyss8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">render树的构建</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006908155?w=630&amp;h=292" src="https://static.alili.tech/img/remote/1460000006908155?w=630&amp;h=292" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器取回代码后，首先会构造DOM树，根据HTML标签，构造DOM树。</p>
<p>之后会解析CSS样式，解析的顺序是<code>浏览器的样式</code> -&gt; <code>用户自定义的样式</code> -&gt; <code>页面的link标签等引进来的样式</code> -&gt; <code>写在style标签里面的内联样式</code></p>
<p>最后根据DOM树以及解析的CSS样式，构造RENDER树，在RENDER树中，会把DOM树中没有的元素给去除，比如head标签以及里面的内容，以及<code>display:none</code>的元素也会被去除。</p>
<p>一旦RENDER树构建完成，浏览器会把树里面的内容绘制在屏幕上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <title>Beautiful page</title>
</head>
<body>
    
  <p>
    Once upon a time there was 
    a looong paragraph...
  </p>
  
  <div style=&quot;display: none&quot;>
    Secret message
  </div>
  
  <div><img src=&quot;...&quot; /></div>
  ...
 
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Beautiful page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Once upon a time there was 
    a looong paragraph...
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span>&gt;</span>
    Secret message
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"..."</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ...
 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>构造的DOM树如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="documentElement (html)
    head
        title
    body
        p
            [text node]
        
        div 
            [text node]
        
        div
            img
        
        ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>documentElement (html)
    head
        title
    <span class="hljs-selector-tag">body</span>
        <span class="hljs-selector-tag">p</span>
            [text node]
        
        <span class="hljs-selector-tag">div</span> 
            [text node]
        
        <span class="hljs-selector-tag">div</span>
            <span class="hljs-selector-tag">img</span>
        
        ...
</code></pre>
<p>RENDER树如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root (RenderView)
    body
        p
            line 1
        line 2
        line 3
        ...
        
    div
        img
        
    ...
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>root (RenderView)
    <span class="hljs-selector-tag">body</span>
        <span class="hljs-selector-tag">p</span>
            line <span class="hljs-number">1</span>
        line <span class="hljs-number">2</span>
        line <span class="hljs-number">3</span>
        ...
        
    <span class="hljs-selector-tag">div</span>
        <span class="hljs-selector-tag">img</span>
        
    ...
    </code></pre>
<h3 id="articleHeader1">重绘(repaint)和重排(reflow)</h3>
<p>当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为重排。完成重排后，浏览器会重新绘制受影响的部分到屏幕，该过程称为重绘。并不是所有的DOM变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘。</p>
<p>重排必然导致重绘，所以重排更加恶心。其实我们一直研究的应该是怎么避免触发多次重排。</p>
<h4>重排何时发生</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="添加或者删除可见的DOM元素
元素位置改变
元素尺寸改变
元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
页面渲染初始化（这个无法避免）
浏览器窗口尺寸改变
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>添加或者删除可见的DOM元素
元素位置改变
元素尺寸改变
元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
页面渲染初始化（这个无法避免）
浏览器窗口尺寸改变
</code></pre>
<h4>浏览器的自动优化</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> ele = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myDiv'</span>);
ele.style.borderLeft = <span class="hljs-string">'1px'</span>;
ele.style.borderRight = <span class="hljs-string">'2px'</span>;
ele.style.padding = <span class="hljs-string">'5px'</span>;
</code></pre>
<p>乍一想，元素的样式改变了三次，每次改变都会引起重排和重绘，所以总共有三次重排重绘过程，但是浏览器并不会这么笨，它会把三次修改“保存”起来（大多数浏览器通过队列化修改并批量执行来优化重排过程），一次完成！但是，有些时候你可能会（经常是不知不觉）强制刷新队列并要求计划任务立即执行。获取布局信息的操作会导致队列刷新，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="offsetTop, offsetLeft, offsetWidth, offsetHeight
scrollTop, scrollLeft, scrollWidth, scrollHeight
clientTop, clientLeft, clientWidth, clientHeight
getComputedStyle() (currentStyle in IE)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>offsetTop, offsetLeft, offsetWidth, offsetHeight
<span class="hljs-keyword">scrollTop, </span><span class="hljs-keyword">scrollLeft, </span><span class="hljs-keyword">scrollWidth, </span><span class="hljs-keyword">scrollHeight
</span>clientTop, clientLeft, clientWidth, clientHeight
getComputedStyle() (currentStyle in IE)
</code></pre>
<p>因此，尽量不要在修改样式或者布局信息时查询样式，因为查询的时候会强制重排，导致浏览器无法优化多次重排。</p>
<hr>
<p>使用绝对位置定位页面上的动画元素，将其脱离文档流，可以有效的防止重排。比如有时候做动画特效时，我们通过设置<code>position:absolute</code>可以有效的减少重排。这让我想到，以前做动画的时候通过修改<code>margin-left</code>属性而不是<code>left</code>属性绝对是一个很不好的做法。</p>
<h3 id="articleHeader2">transform是否可以避免重排重绘问题</h3>
<p>那么使用CSS3的<code>transform</code>来实现动画是否可以避免重排问题？或者说浏览器针对这一部分做了其他优化？</p>
<p>经过一番查找，答案如下：</p>
<p>CSS的最终表现分为以下四步：<code>Recalculate Style</code> -&gt; <code>Layout</code> -&gt; <code>Paint Setup and Paint</code> -&gt; <code>Composite Layers</code></p>
<p>按照中文的意思大致是 查找并计算样式 -&gt; 排布 -&gt; 绘制 -&gt; 组合层</p>
<p>这上面的几个步骤有点类似于上文说到的重排必定导致重绘，而查询属性会强制发生重排。所以上文提到的重排重绘内容可以结合这里进行理解。</p>
<p>由于<code>transform</code>是位于<code>Composite Layers</code>层，而<code>width</code>、<code>left</code>、<code>margin</code>等则是位于<code>Layout</code>层，在<code>Layout</code>层发生的改变必定导致<code>Paint Setup and Paint</code> -&gt; <code>Composite Layers</code>，所以相对而言使用<code>transform</code>实现的动画效果肯定比<code>left</code>这些更加流畅。</p>
<p>而且就算抛开这一角度，在另一方面浏览器也会针对<code>transform</code>等开启GPU加速。</p>
<p>参考文章</p>
<blockquote><blockquote>
<p><a href="https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/" rel="nofollow noreferrer" target="_blank">https://www.html5rocks.com/en...</a></p>
<p><a href="http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/" rel="nofollow noreferrer" target="_blank">http://www.phpied.com/renderi...</a></p>
<p><a href="http://www.cnblogs.com/zichi/p/4720000.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/zichi/...</a></p>
</blockquote></blockquote>
<p>写完文章后又重新查了一下关于CSS3动画性能方面的文章，发现大漠老师写的这篇很不错，而且跟自己理解的观点有部分相似，先放上来，之后再认真看。</p>
<blockquote><blockquote><p><a href="https://www.w3cplus.com/animation/animation-performance.html" rel="nofollow noreferrer" target="_blank">https://www.w3cplus.com/anima...</a></p></blockquote></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从重绘重排角度讲解transform的动画性能

## 原文链接
[https://segmentfault.com/a/1190000008650975](https://segmentfault.com/a/1190000008650975)

