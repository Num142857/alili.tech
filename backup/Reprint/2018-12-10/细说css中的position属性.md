---
title: '细说css中的position属性' 
date: 2018-12-10 2:30:08
hidden: true
slug: o1gl5zh0ng
categories: [reprint]
---

{{< raw >}}

                    
<p>有过<code>css</code>开发经验的同学，对于<code>position</code>这个属性一定不会陌生，然而这个熟悉的属性确是面试题中的常客，也就说明了该属性在<code>css</code>的世界是有一定的江湖地位的，那么我们就来详细的说说<code>position</code>这个属性。  <br>在<a href="http://www.w3school.com.cn/cssref/pr_class_position.asp" rel="nofollow noreferrer" target="_blank">w3school</a>中是这样解释<code>position</code>属性的</p>
<blockquote>
<h4>定义和用法</h4>
<p>position 属性规定元素的定位类型。</p>
<h4>说明</h4>
<p>这个属性定义建立元素布局所用的定位机制。任何元素都可以定位，不过绝对或固定元素会生成一个块级框，而不论该元素本身是什么类型。相对定位元素会相对于它在正常流中的默认位置偏移。</p>
</blockquote>
<p>CSS 定位机制</p>
<blockquote>CSS 有三种基本的定位机制：普通流、浮动和绝对定位。  <br>除非专门指定，否则所有框都在普通流中定位。也就是说，普通流中的元素的位置由元素在 (X)HTML 中的位置决定。  <br>块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。  <br>行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框（Line Box），行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。</blockquote>
<p><code>position</code>属性对应的值有</p>
<ol>
<li><code>position: static;</code></li>
<li><code>position: inherit;</code></li>
<li><code>position: relative;</code></li>
<li><code>position: absolute;</code></li>
<li><code>position: fixed;</code></li>
<li>
<code>position: sticky;</code>（新的属性值）</li>
</ol>
<h2 id="articleHeader0">1、position: static</h2>
<p>默认值。没有定位，元素出现在正常的流中（忽略 <code>top, bottom, left, right</code> 或者 <code>z-index</code> 声明）。元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。</p>
<h2 id="articleHeader1">2、position: inherit</h2>
<p><code>inherit</code>值如同其他<code>css</code>属性的 <code>inherit</code> 值，即继承父元素的<code>position</code>值。</p>
<h2 id="articleHeader2">3、position: relative</h2>
<p>相对定位，相对于自己的初始位置，不脱离文档流。也就是说元素框偏移某个距离，元素仍保持其未定位前的形状，它原本所占的空间仍保留。  <br>举个例子，<code>html</code>结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;div1&quot;>div1</div>
<div class=&quot;div2&quot;>div2</div>
<div class=&quot;div3&quot;>div3</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"div1"</span>&gt;div1&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"div2"</span>&gt;div2&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"div3"</span>&gt;div3&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><code>css</code>样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    width: 100px;
    height: 100px;
}

.div1 {
    background: #ffff00;
}

.div2 {
    background: #00ff00;
    position: relative;
    top: 40px;
    left: 40px;
}

.div3 {
    background: #0000ff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.div1</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffff00</span>;
}

<span class="hljs-selector-class">.div2</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#00ff00</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.div3</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#0000ff</span>;
}</code></pre>
<p>结果  <br><span class="img-wrap"><img data-src="https://github.com/xiecheng328/md-img/blob/master/p1.png?raw=true" src="https://static.alili.techhttps://github.com/xiecheng328/md-img/blob/master/p1.png?raw=true" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>其中红色框为<code>div2</code>的初始位置，由于<code>div2</code>设置了<code>position:relative;top: 40px;left: 40px;</code>，所以该元素相对于自己的初始位置的上面<code>40px</code>、左边<code>40px</code>。同时，其他元素的位置未被改变。</p>
<h2 id="articleHeader3">4、position: absolute</h2>
<p>绝对定位的元素的位置相对于<strong>最近的已定位祖先元素</strong>，如果元素没有已定位的祖先元素，那么它的位置相对于<strong>最初的包含块</strong>。  <br>例子中我们把<code>div2</code>的样式稍作改动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".div2 {
    background: #00ff00;
    position: absolute;
    top: 40px;
    left: 40px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.div2</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#00ff00</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">40px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://github.com/xiecheng328/md-img/blob/master/p2.png?raw=true" src="https://static.alili.techhttps://github.com/xiecheng328/md-img/blob/master/p2.png?raw=true" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>由于<code>div2</code>的祖先元素都没有定位，所以相对于最初的包含块也就是<code>body</code>，同时由于<strong>绝对定位脱离文档流</strong>，所以<code>div3</code>占了<code>div2</code>原来的位置。</p>
<h2 id="articleHeader4">5、position: fixed</h2>
<p><code>fixed</code>元素脱离正常的文档流，所以它与<code>absolute</code>元素很相似，同样会被周围元素忽略，支持<code>top,bottom,left,right</code>属性，但<code>fixed</code> 元素正如它的名字一样，它是固定在屏幕的某个位置，它不会随着浏览器滚动条的滚动而一起滚动。比如我们常见的<code>回到顶部</code>的功能，按钮一直在浏览器的左下方，不管滚动条如何滚动，该按钮都会在左下方的固定的位置，这个需求就可以使用<code>position: fixed</code>来完成。  <br>但需要注意的是，<code>position: fixed</code>是有兼容性问题的，不支持<code>IE6、IE7、IE8</code>。可以通过给该元素设置<code>position: absolute</code>并获取滚动条距离顶部高度加上某个固定高度来实现。</p>
<h2 id="articleHeader5">6、position: sticky</h2>
<p>很多同学会对该属性比较陌生，这是一个相对来讲比较新的属性值。<br>sticky 的本意是粘贴，可以称之为粘性定位，但在 css 中的表现更像是吸附。这是一个结合了 <code>position:relative</code> 和 <code>position:fixed</code> 两种定位功能于一体的特殊定位。常见的吸顶、吸底（网站的头部返回栏，底部切换栏之类）的效果用这个属性非常适合。例如下面淘宝这个效果</p>
<p><span class="img-wrap"><img data-src="https://github.com/xiecheng328/md-img/blob/master/p3.png?raw=true" src="https://static.alili.techhttps://github.com/xiecheng328/md-img/blob/master/p3.png?raw=true" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 relative 定位表现，而当元素距离页面视口小于 0px 时，元素表现为 fixed 定位，也就会固定在顶部。</p>
<h4>注意</h4>
<ul><li>须指定 <code>top、right、bottom、left</code> 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。</li></ul>
<p>并且 <code>top</code> 和 <code>bottom</code> 同时设置时，<code>top</code> 生效的优先级高，<code>left</code> 和 <code>right</code> 同时设置时，<code>left</code> 的优先级高。</p>
<ul>
<li>设定为 <code>position:sticky</code> 元素的任意父节点的 <code>overflow</code> 属性必须是 <code>visible</code>，否则 <code>position:sticky</code> 不会生效。如果 <code>position:sticky</code> 元素的任意父节点定位设置为 <code>overflow:hidden</code>，则父容器无法进行滚动，所以 <code>position:sticky</code> 元素也不会有滚动然后固定的情况。如果 <code>position:sticky</code> 元素的任意父节点定位设置为 <code>position:relative | absolute | fixed</code>，则元素相对父元素进行定位，而不会相对 <code>viewport</code> 定位。</li>
<li>达到设定的阀值，也就是设定了 <code>position:sticky</code> 的元素表现为 <code>relative</code> 还是 <code>fixed</code>是根据元素是否达到设定了的阈值决定的。</li>
</ul>
<h4>兼容性 <a href="https://caniuse.com/#search=sticky" rel="nofollow noreferrer" target="_blank">caniuse</a>
</h4>
<p><span class="img-wrap"><img data-src="https://github.com/xiecheng328/md-img/blob/master/p4.png?raw=true" src="https://static.alili.techhttps://github.com/xiecheng328/md-img/blob/master/p4.png?raw=true" alt="image" title="image" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细说css中的position属性

## 原文链接
[https://segmentfault.com/a/1190000013683068](https://segmentfault.com/a/1190000013683068)

