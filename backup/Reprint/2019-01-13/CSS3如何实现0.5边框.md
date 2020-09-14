---
title: 'CSS3如何实现0.5边框' 
date: 2019-01-13 2:30:11
hidden: true
slug: 5wi37wrafax
categories: [reprint]
---

{{< raw >}}

                    
<p>在移动端有时1px的边框会显得很粗不美观，淘宝、京东的触屏均是采用浅细的线条来显示在移动设备上。具体实现方法如下：</p>
<p>普通的1px黑色实线边框：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid #000;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
</code></pre>
<p>半像素边框当然不是简单地把<code>1px</code>改为<code>0.5px</code>（会被解析成<code>1px</code>），<code>border-width</code>的值只能是自然数</p>
<p>类似的，<code>outline</code>, <code>box-shadow</code>等等也没有办法画出0.5px的细线</p>
<p>常规思路是不可行的，我们可以用伪元素 + 缩放巧妙地实现，具体步骤如下：</p>
<p>设置目标元素作为定位参照</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".thinner-border {
    position: relative; /* 只要不是默认值static即可 */
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.thinner-border</span> {
    <span class="hljs-attribute">position</span>: relative; <span class="hljs-comment">/* 只要不是默认值static即可 */</span>
}
</code></pre>
<p>给目标元素添加一个伪元素before或者after，并设置绝对定位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".thinner-border:before {
    content: '';
    position: absolute;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.thinner-border</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
}
</code></pre>
<p>给伪元素添上1px的边框</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid red;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">border: </span><span class="hljs-number">1</span>px solid red<span class="hljs-comment">;</span>
</code></pre>
<p>设置伪元素的宽高为目标元素的2倍</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width: 200%;
height: 200%;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">width</span>: <span class="hljs-number">200%</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">200%</span>;
</code></pre>
<p>缩小0.5倍（变回目标元素的大小）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform-origin: 0 0;
transform: scale(0.5, 0.5);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">transform</span>-<span class="hljs-built_in">origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
<span class="hljs-built_in">transform</span>: <span class="hljs-built_in">scale</span>(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
</code></pre>
<p>把border包进来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-sizing: border-box;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>;
</code></pre>
<p>简言之就是先放大再缩回来，border-box是关键，否则边框不会一起缩放</p>
<p>二.具体实现</p>
<p>上面已经分步骤写得很清楚了，拼在一起就是完整实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".thinner-border {
    position: relative;
}

.thinner-border:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    border: 1px solid #000;
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scale(0.5, 0.5);
    -ms-transform: scale(0.5, 0.5);
    -o-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.thinner-border</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.thinner-border</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">-webkit-transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">-moz-transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">-ms-transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">-o-transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(0.5, 0.5);
    <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">scale</span>(0.5, 0.5);
    <span class="hljs-attribute">-o-transform</span>: <span class="hljs-built_in">scale</span>(0.5, 0.5);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.5, 0.5);
    <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
    <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
</code></pre>
<p>功能是给<code>class</code>值指定了<code>thinner-border</code>的<code>block</code>和<code>inline-block</code>元素添上半像素的边框，因为<code>inline</code>元素的<code>width</code>和<code>heigh</code>t有一些限制，伪元素获取到的<code>200%</code>要比实际值小，边框的宽高也会比期望的小。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3如何实现0.5边框

## 原文链接
[https://segmentfault.com/a/1190000009662278](https://segmentfault.com/a/1190000009662278)

