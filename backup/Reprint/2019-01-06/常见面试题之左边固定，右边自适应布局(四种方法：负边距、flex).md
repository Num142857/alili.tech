---
title: '常见面试题之左边固定，右边自适应布局(四种方法：负边距、flex)' 
date: 2019-01-06 2:30:10
hidden: true
slug: 7ge9fgnjfsu
categories: [reprint]
---

{{< raw >}}

                    
<p>这个布局是最简单的布局之一，但是网络上大多是copy，而没有认真解释以及用新的特性实现。下面就做一个新的概括.</p>
<blockquote><p>要求： 左边固定100px, 右边自适应</p></blockquote>
<h3 id="articleHeader0">左position:absolute, 右margin-left  <strong><em>入门写法</em></strong>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;l-child&quot;>左边固定1  左边固定2 左边固定3</div>
  <div class=&quot;r-child&quot;>右边自适应1 右边自适应2 右边自适应3</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l-child"</span>&gt;</span>左边固定1  左边固定2 左边固定3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r-child"</span>&gt;</span>右边自适应1 右边自适应2 右边自适应3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父元素相对定位，作为子元素绝对定位的参考
.parent{display:relative; background:#ddd }
.l-child{position:absolute; width:100px;background:#bbb }
.r-child{margin-left:100px;background:#999 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//父元素相对定位，作为子元素绝对定位的参考
<span class="hljs-selector-class">.parent</span>{<span class="hljs-attribute">display</span>:relative; <span class="hljs-attribute">background</span>:<span class="hljs-number">#ddd</span> }
<span class="hljs-selector-class">.l-child</span>{<span class="hljs-attribute">position</span>:absolute; <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#bbb</span> }
<span class="hljs-selector-class">.r-child</span>{<span class="hljs-attribute">margin-left</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#999</span> }</code></pre>
<p><a href="http://jsbin.com/levewix/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo展示</a></p>
<h3 id="articleHeader1">左边float，触发父元素宽度计算 <strong><em>入门写法</em></strong>
</h3>
<p>html结构同上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{background:#ddd;overflow:hidden; }
.l-child{float:left;width:100px;background:#bbb;z-index:10000; }
.r-child{margin-left:100px;background:#999;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#ddd</span>;<span class="hljs-attribute">overflow</span>:hidden; }
<span class="hljs-selector-class">.l-child</span>{<span class="hljs-attribute">float</span>:left;<span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#bbb</span>;<span class="hljs-attribute">z-index</span>:<span class="hljs-number">10000</span>; }
<span class="hljs-selector-class">.r-child</span>{<span class="hljs-attribute">margin-left</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#999</span>;}</code></pre>
<p><a href="http://jsbin.com/levewix/2/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo展示</a></p>
<h3 id="articleHeader2">左右float，右边使用负边距 <strong><em>奇伎淫巧</em></strong>
</h3>
<p>这个技能要这样get：</p>
<ol>
<li><p>父元素清除浮动</p></li>
<li><p>A元素宽100%不变，margin-left:-100px后，外部的文档流认为以边框为界，A减少了100px，而A是右浮动，也就是左边开始有100px空白可填充的文档流空间；</p></li>
<li><p>子元素A1是认为父元素大小没有变化，margin-left:100px后，正好等于父元素在外部空出来的文档流空间。</p></li>
<li><p>B元素左浮动，且是后面的dom节点，正好占据并且覆盖A空出来的空间</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;r-box&quot;>
    <div class=&quot;r-content&quot;>
      右边自适应1 右边自适应2 右边自适应3
    </div>
  </div>
  <div class=&quot;l-box&quot;>
    左边固定1  左边固定2 左边固定3
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"r-content"</span>&gt;</span>
      右边自适应1 右边自适应2 右边自适应3
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l-box"</span>&gt;</span>
    左边固定1  左边固定2 左边固定3
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{background:#ddd;overflow:hidden; }
.l-box{float:left;width:100px;background:#bbb;}
.r-box{float:right;width:100%;margin-left:-100px;background:#999;}
.r-content{margin-left:100px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#ddd</span>;<span class="hljs-attribute">overflow</span>:hidden; }
<span class="hljs-selector-class">.l-box</span>{<span class="hljs-attribute">float</span>:left;<span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#bbb</span>;}
<span class="hljs-selector-class">.r-box</span>{<span class="hljs-attribute">float</span>:right;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#999</span>;}
<span class="hljs-selector-class">.r-content</span>{<span class="hljs-attribute">margin-left</span>:<span class="hljs-number">100px</span>;}</code></pre>
<p><a href="http://jsbin.com/xoxoluh/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo展示</a></p>
<h3 id="articleHeader3">flex布局 <strong><em>高大尚</em></strong>
</h3>
<p>父元素flex布局后，子元素默认就是弹性布局，除非你确定子元素的弹性方式<br>ps：这个方法完美之处还在于，垂直方向也自动填充，轻松实现了等高布局！！<br>html同第一个demo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{display:flex; background:#ddd }
.l-child{flex:0 0 100px; background:#bbb }
.r-child{background:#999}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{<span class="hljs-attribute">display</span>:flex; <span class="hljs-attribute">background</span>:<span class="hljs-number">#ddd</span> }
<span class="hljs-selector-class">.l-child</span>{<span class="hljs-attribute">flex</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>; <span class="hljs-attribute">background</span>:<span class="hljs-number">#bbb</span> }
<span class="hljs-selector-class">.r-child</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#999</span>}</code></pre>
<p><a href="http://jsbin.com/beticiz/edit?html,css,output" rel="nofollow noreferrer" target="_blank">demo展示</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见面试题之左边固定，右边自适应布局(四种方法：负边距、flex)

## 原文链接
[https://segmentfault.com/a/1190000010415257](https://segmentfault.com/a/1190000010415257)

