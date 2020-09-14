---
title: 'css设置垂直居中' 
date: 2019-01-02 2:30:08
hidden: true
slug: 43fpgepgp8i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">css设置垂直居中</h2>
<p>元素的垂直居中也是我们日常网页布局中经常会遇到的问题,所以我在此提供一些解决方法,希望可以给予有需要的人一些借鉴和参考.</p>
<p><strong>html代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
<div class=&quot;child&quot;>Text here</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child"</span>&gt;Text here&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<hr>
<p>既然设置子元素的垂直居中,那就要知道父元素的高度,才能知道这所谓的中在哪,对吧?就像你想在一段距离的中间位置站住,那你首先需要知道这段距离有多长,你才能知道中间位置在哪.<br>注意,我所有的百分比高宽,都是建立在<code>html,body {width: 100%;height: 100%;}</code>这样的设置的基础之上的,如果你没有这样设置,.parent这个div的父元素又是body,body你又没有设置宽高,你就可能看不到效果,.parent这个div的高宽比是相对于它的父元素的,所以你在使用的时候需要确定.parent这个div的父元素设置了宽度和高度的.</p>
<hr>
<p><strong>(1) 行内文本垂直居中</strong></p>
<p><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    height: 100px;
    border: 1px solid #ccc; /*设置border是为了方便查看效果*/
}
.child {
    line-height: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>; <span class="hljs-comment">/*设置border是为了方便查看效果*/</span>
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p><strong>(2) 行内非文本垂直居中(以img为例)</strong></p>
<p><strong>html代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
    <img src=&quot;image.png&quot; alt=&quot;&quot; />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><strong>css代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    height: 100px;
    border: 1px solid #ccc; /*设置border是为了方便查看效果*/
}
.parent img {
    //注意此时应该保证图片自身的高度或者你设置的高度小于父元素的200px的行高,不然你看不出来居中的效果.
    line-height: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>; <span class="hljs-comment">/*设置border是为了方便查看效果*/</span>
}
<span class="hljs-selector-class">.parent</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-comment">//注意此时应该保证图片自身的高度或者你设置的高度小于父元素的200px的行高,不然你看不出来居中的效果.</span>
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p><strong>(3) 未知高度的块级元素垂直居中</strong><br><strong>html代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>
    <!--.child的高度未知,父元素要有高度-->
    sddvsds dfvsdvds
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--.child的高度未知,父元素要有高度--&gt;</span>
    sddvsds dfvsdvds
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p><strong>第一种方法(不需要加padding):</strong><br><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width: 100%;
  height: 100%;
  position: relative;
  /*display: table;*/
}
.child {
  width: 500px;
  border: 1px solid #ccc; /*设置border是为了方便查看效果*/
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-comment">/*display: table;*/</span>
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>; <span class="hljs-comment">/*设置border是为了方便查看效果*/</span>
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p><strong>第二种方法(不使用transform):</strong><br><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position: relative;
    width: 100%;
    height: 100%;
}
.child {
  width: 500px;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">margin</span>: auto;
}</code></pre>
<p><strong>第三种方法(需要加padding):</strong><br><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#parent {
  padding: 5% 0;
}
#child {
  padding: 10% 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#parent</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">5%</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#child</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10%</span> <span class="hljs-number">0</span>;
}</code></pre>
<p><strong>第四种方法:</strong><br><strong>(使用display: table,此种方法也适用于行内文本元素的居中):</strong><br><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  width: 100%;
  height: 100%;
  display: table;
}
.child {
  display: table-cell;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: table;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p><strong>第五种方法(flex布局,这里需要考虑兼容性奥!)</strong><br><strong>css 代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    width: 100%;
    height: 100%; /*这里一定要写高度奥!*/
    display: flex;
    align-items: center;
    justify-content: center;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; <span class="hljs-comment">/*这里一定要写高度奥!*/</span>
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
  }</code></pre>
<p><strong>(4) 已知高度的块级元素垂直居中</strong><br><strong>html代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>
    <!--.child的高度已知,父元素高度已知-->
    sddvsds dfvsdvds
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--.child的高度已知,父元素高度已知--&gt;</span>
    sddvsds dfvsdvds
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p><strong>css代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#parent {
  height: 300px;
}
#child {
  height: 40px;
  margin-top: 130px; /*这个只为父元素的高度减去这个元素的高度除以二计算得到的*/
  border: 1px solid #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#parent</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
}
<span class="hljs-selector-id">#child</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">130px</span>; <span class="hljs-comment">/*这个只为父元素的高度减去这个元素的高度除以二计算得到的*/</span>
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre>
<p>以上就是我目前发现并亲自测试可行的一些方法,应该还有其他的方法,如果你们有更好用的方法,欢迎私信或者留言给我,我们的目的都是一样的,帮助有需要的人,共同进步!如有错误,欢迎批评指正!<br>如果觉得这篇文章对你有用,欢迎点赞和收藏奥!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css设置垂直居中

## 原文链接
[https://segmentfault.com/a/1190000010987658](https://segmentfault.com/a/1190000010987658)

