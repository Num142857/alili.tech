---
title: 'CSS基础篇--使用position:sticky 实现粘性布局' 
date: 2018-12-15 2:30:11
hidden: true
slug: f2jrzm1xbl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>前面写了一篇文章讲解了position常用的几个属性：<a href="https://segmentfault.com/a/1190000003702416">《CSS基础篇-- position属性讲解》</a><br>一般都知道下面几个常用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
position: static;
position: relative;
position: absolute;
position: fixed;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
<span class="hljs-attribute">position</span>: static;
<span class="hljs-attribute">position</span>: relative;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">position</span>: fixed;
}</code></pre>
<p>在<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/position" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/CSS/position</a>还说了下面这三个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 全局值 */
position: inherit;
position: initial;
position: unset;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">/* 全局值 */</span>
<span class="hljs-attribute">position</span>: inherit;
<span class="hljs-attribute">position</span>: initial;
<span class="hljs-attribute">position</span>: unset;</code></pre>
<p>估计大部分都没有用过<code>position:sticky</code>吧。这个属性值还在试验阶段。怎样描述它呢？</p>
<p><code>sticky</code>：对象在常态时遵循常规流。它就像是<code>relative</code>和<code>fixed</code>的合体，当在屏幕中时按常规流排版，当卷动到屏幕外时则表现如fixed。该属性的表现是现实中你见到的吸附效果。</p>
<p><strong>常用场景</strong>：当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 <code>relative </code>定位表现，而当元素距离页面视口小于 0px 时，元素表现为 <code>fixed</code> 定位，也就会固定在顶部。</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">position</span>: -webkit-sticky;
    <span class="hljs-attribute">position</span>: sticky;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>如下图表现方式：<br>距离页面顶部<code>大于20px</code>，表现为 <code>position:relative</code>;<br><span class="img-wrap"><img data-src="/img/bV2XUT?w=450&amp;h=276" src="https://static.alili.tech/img/bV2XUT?w=450&amp;h=276" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>距离页面顶部<code>小于20p</code>x，表现为 <code>position:fixed</code>;<br><span class="img-wrap"><img data-src="/img/bV2XU9?w=450&amp;h=276" src="https://static.alili.tech/img/bV2XU9?w=450&amp;h=276" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">运用 <code>position:sticky</code> 实现头部导航栏固定</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;con&quot;>
    <div class=&quot;samecon&quot;>
        <h2>标题一</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
    <div class=&quot;samecon&quot;>
        <h2>标题二</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
    <div class=&quot;samecon&quot;>
        <h2>标题三</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
    <div class=&quot;samecon&quot;>
        <h2>标题四</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
    <div class=&quot;samecon&quot;>
        <h2>标题五</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
    <div class=&quot;samecon&quot;>
        <h2>标题五六</h2>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
        <p>这是一段文本</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"con"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题一<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题二<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题三<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题四<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题五<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"samecon"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>标题五六<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段文本<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".samecon h2{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background:#ccc;
    padding:10px 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.samecon</span> <span class="hljs-selector-tag">h2</span>{
    <span class="hljs-attribute">position</span>: -webkit-sticky;
    <span class="hljs-attribute">position</span>: sticky;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>同理，也可以实现侧边导航栏的超出固定。</p>
<h2 id="articleHeader2">生效规则</h2>
<ul>
<li>
<p>须指定 <code>top, right, bottom 或 left</code> 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。</p>
<ul><li>并且<code> top </code>和<code> bottom</code> 同时设置时，<code>top</code> 生效的优先级高，<code>left</code> 和<code> right</code> 同时设置时，<code>left </code>的优先级高。</li></ul>
</li>
<li>
<p>设定为 <code>position:sticky</code> 元素的任意父节点的<code> overflow</code> 属性必须是 <code>visible</code>，否则 <code>position:sticky 不会生效</code>。这里需要解释一下：</p>
<ul>
<li>如果 <code>position:sticky</code> 元素的任意父节点定位设置为<code> overflow:hidden</code>，则父容器无法进行滚动，所以 <code>position:sticky </code>元素也不会有滚动然后固定的情况。</li>
<li>如果 <code>position:sticky </code>元素的任意父节点定位设置为<code> position:relative | absolute | fixed</code>，则元素相对父元素进行定位，而不会相对<code> viewprot </code>定位。</li>
</ul>
</li>
<li>达到设定的阀值。这个还算好理解，也就是设定了<code> position:sticky</code> 的元素表现为 <code>relative</code> 还是<code> fixed</code> 是根据元素是否达到设定了的阈值决定的。</li>
</ul>
<h2 id="articleHeader3">兼容性</h2>
<p><span class="img-wrap"><img data-src="/img/bVSAA2?w=825&amp;h=431" src="https://static.alili.tech/img/bVSAA2?w=825&amp;h=431" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>这个属性的兼容性还不是很好，目前仍是一个试验性的属性，并不是W3C推荐的标准。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS基础篇--使用position:sticky 实现粘性布局

## 原文链接
[https://segmentfault.com/a/1190000013061082](https://segmentfault.com/a/1190000013061082)

