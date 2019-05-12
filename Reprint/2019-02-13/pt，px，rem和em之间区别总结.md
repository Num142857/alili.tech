---
title: 'pt，px，rem和em之间区别总结' 
date: 2019-02-13 2:31:22
hidden: true
slug: st3axdvatjp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">pt与px</h3>
<p>在html设计字体的css样式中，有些字体设置成14pt，而不是14px，那pt是什么，和px又有什么关系呢？</p>
<p>pt(point)是印刷行业常用的单位，等于1/72英寸，表示绝对长度。px(pixel)指的是像素，是屏幕上显示数据的最基本的点，表示相对大小。不同分辨率下相同长度的px元素显示会不一样，比如同样是14px大小的字，在1366*768显示屏下会显示的小，在1024*768尺寸的显示器下会相对大点。</p>
<p>px和pt转换规则很简单，默认的显示设置中把文字定义为96DPI，由公式px=pt*DPI/72，可得pt=px*3/4。</p>
<h3 id="articleHeader1">em和rem</h3>
<p>em是相对长度单位，相对于当前对象内文本的字体尺寸，即em的计算是基于父级元素font-size的。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style=&quot;font-size:14px&quot;>
    <p style=&quot;font-size:2em&quot;>我这里的字体显示大小是28px(14px*2)</p>  
    <div style=&quot;font-size:18px&quot;>
        <p style=&quot;font-size:2em&quot;>我这里显示字体大小是36px(18px*2),而不是上面计算的28px</p>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:14px"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:2em"</span>&gt;</span>我这里的字体显示大小是28px(14px*2)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:18px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:2em"</span>&gt;</span>我这里显示字体大小是36px(18px*2),而不是上面计算的28px<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>rem是css3新增的一个相对单位，与em的区别在于，它是相对于html根元素的(在body标签里面设置字体大小不起作用)。还是上面那个例子，如果换做rem，结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <body style=&quot;font-size:14px&quot;>
     <p style=&quot;font-size:2rem&quot;>我这里的字体显示大小是32px(16px*2),因为我是根据html根元素的font-size大小进行计算的</p>  
     <div style=&quot;font-size:18px&quot;>
         <p style=&quot;font-size:2rem&quot;>我这里显示字体大小是32px(16px*2),因为我是根据html根元素的font-size大小进行计算的</p>
     </div>
 </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">body</span> style=<span class="hljs-string">"font-size:14px"</span>&gt;
     &lt;<span class="hljs-selector-tag">p</span> style=<span class="hljs-string">"font-size:2rem"</span>&gt;我这里的字体显示大小是<span class="hljs-number">32px</span>(<span class="hljs-number">16px</span>*<span class="hljs-number">2</span>),因为我是根据html根元素的<span class="hljs-attribute">font-size</span>大小进行计算的&lt;/p&gt;  
     &lt;<span class="hljs-selector-tag">div</span> style=<span class="hljs-string">"font-size:18px"</span>&gt;
         &lt;<span class="hljs-selector-tag">p</span> style=<span class="hljs-string">"font-size:2rem"</span>&gt;我这里显示字体大小是<span class="hljs-number">32px</span>(<span class="hljs-number">16px</span>*<span class="hljs-number">2</span>),因为我是根据html根元素的<span class="hljs-attribute">font-size</span>大小进行计算的&lt;/p&gt;
     &lt;/div&gt;
 &lt;/body&gt;</code></pre>
<p>*补充默认font-size大小是16px(如果html中没有设置的话)。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
pt，px，rem和em之间区别总结

## 原文链接
[https://segmentfault.com/a/1190000004605022](https://segmentfault.com/a/1190000004605022)

