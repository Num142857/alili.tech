---
title: '小聊BFC' 
date: 2018-12-24 2:30:06
hidden: true
slug: novhac91wy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">“不起眼”的BFC</h2>
<p><strong>BFC</strong>这个词可能之前没怎么听过，可是稍微接触过前端的人都知道css中有点<strong>小坑</strong>啊<em>!!!!</em><br>今天想要跟大家分享一下个人对于<strong>BFC</strong>的一个理解。如有不足或理解错误的地方，还望各位大佬指出，哈哈，感激感激。要是喜欢的话，也不妨点个赞啊。</p>
<hr>
<p>*1.BFC 的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* **BFC** （**Block fomatting context**）：是一个独立的渲染区域，只有块级元素参与，规定了内部的块级元素如何布局，并与区域外部的毫不相干。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">* </span>*<span class="hljs-strong">*BFC*</span>* （*<span class="hljs-strong">*Block fomatting context*</span><span class="hljs-strong">*）：是一个独立的渲染区域，只有块级元素参与，规定了内部的块级元素如何布局，并与区域外部的毫不相干。
</span></code></pre>
<hr>
<p>*2.BFC 的创建：</p>
<ul>
<li><p><em>overflow</em>   的值不为visible</p></li>
<li><p><em>float</em>   的值不为none</p></li>
<li>
<em>position</em>  的值不为static</li>
<li>
<em>display</em>  的值为inline-block、table-cell、table-caption（因为table会默认生成一个匿名的table-cell,而table-cell又会生成BFC）</li>
</ul>
<hr>
<p>*3.BFC应用</p>
<ul>
<li>
<p>元素垂直方向上下重叠(margin大的值会覆盖小的值，而不是两值之和)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box p {
  margin: 10px 0;
  background-color: yellow;
}
.box p:nth-child(1) {
  margin-bottom: 25px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: yellow;
}
<span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">25px</span>;
}</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZySW?w=191&amp;h=84" src="https://static.alili.tech/img/bVZySW?w=191&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>解决方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot; id=&quot;box&quot;>
    <p>Lorem ipsum dolor sit.</p>
    <div style=&quot;overflow:hidden;&quot;>
        <p>Lorem ipsum dolor sit.</p>
    </div>
    <p>Lorem ipsum dolor sit.</p>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"overflow:hidden;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Lorem ipsum dolor sit.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVZyS0?w=172&amp;h=104" src="https://static.alili.tech/img/bVZyS0?w=172&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>
<p>解决侵占浮动元素的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .one {
  width: 100px;
  height: 100px;
  background-color: pink;
}
.two {
  height: 100px;
  background-color: red;
  width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-class">.one</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: pink;
}
<span class="hljs-selector-class">.two</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: red;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVZyUW?w=107&amp;h=209" src="https://static.alili.tech/img/bVZyUW?w=107&amp;h=209" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>解决方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".one {
  float: left;
  width: 100px;
  height: 100px;
  background-color: pink;
}
.two {
  height: 100px;
  background-color: red;
  float: left;
  width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.one</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: pink;
}
<span class="hljs-selector-class">.two</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: red;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVZyVa?w=202&amp;h=113" src="https://static.alili.tech/img/bVZyVa?w=202&amp;h=113" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
</ul>
<hr>
<p>总而言之，BFC就是利用一个块级元素，让里面的元素不受外部元素的影响。</p>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小聊BFC

## 原文链接
[https://segmentfault.com/a/1190000012250079](https://segmentfault.com/a/1190000012250079)

