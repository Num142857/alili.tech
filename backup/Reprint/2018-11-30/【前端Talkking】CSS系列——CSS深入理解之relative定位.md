---
title: '【前端Talkking】CSS系列——CSS深入理解之relative定位' 
date: 2018-11-30 2:30:12
hidden: true
slug: gvj6x9oerih
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>在前面的两篇文章：<a href="https://segmentfault.com/a/1190000014554601">CSS深入理解之float浮动</a>和<a href="https://segmentfault.com/a/1190000014736711" target="_blank">CSS深入理解之absolute定位</a>中，介绍了<code>float</code>和<code>absolute</code>的特性和使用方法，如果大家仔细阅读完了这两篇文章，相信你的CSS打怪技能又提高的一大截，那么趁着自己最近状态不错，就多给大家分享点自己平时所学的技能。一方面对自己的技能能够有一个总结，看自己到底理解透了没有，另一方面，以文章的形式分享出来，悦己同时悦他人。好了，开始进入今天的主题，今天轮到另一个定位属性登场了——relative，大家鼓掌欢迎👏👏👏。</p>
<h2 id="articleHeader1">2.relative的特性</h2>
<p><code>relative</code>，顾名思义，<strong>相对</strong>。在CSS中，我们都这样使用：<code>position: relative</code>，翻译成中文就是<strong>相对定位</strong>。不知道大家在使用的过程中，有没有想过这样的一个问题：它到底是相对谁定位呢？在揭开答案之前，我们还是以例子来说明问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--HTML代码-->
<div class=&quot;box&quot;>
    <div class=&quot;td&quot;>
        <div class=&quot;element1&quot;></div>
        <h3>使用margin</h3>
    </div>
    <div class=&quot;td&quot;>
        <div class=&quot;element2&quot;></div>
        <h3>使用relative</h3>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"element1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>使用margin<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"td"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"element2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>使用relative<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>可以直接看核心CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*CSS代码*/
.element1{
    margin-top: -30px;
}
.element2{
    position: relative;
    top: -30px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*CSS代码*/</span>
<span class="hljs-selector-class">.element1</span>{
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.element2</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">30px</span>
}</code></pre>
<p>在浏览器中的效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014877055?w=332&amp;h=252" src="https://static.alili.tech/img/remote/1460000014877055?w=332&amp;h=252" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在本例中，使用<code>.element1</code>和<code>.element2</code>两个CSS类达到的效果不一样，使用margin负值改变元素的位置后，后面元素的位置跟着变化，而使用<code>position: relative</code>和<code>top</code>负值改变元素的位置，后面元素的位置并没有发生改变。其实，这个例子说明了<code>relative</code>定位的两大特性：</p>
<p><strong>1）相对自身</strong>。使用relative定位的元素，其相对的是自身进行偏移。</p>
<p><strong>2）无侵入性</strong>。使用relative定位的元素，可以理解为产生了"幻影"，其真身依然在原来的位置上，所以并不会影响页面中其他的元素的布局。本例中，<code>使用relative</code>这几个字依然在原来的位置上，而<code>使用margin</code>这几个字则偏移了原来的位置。</p>
<h2 id="articleHeader2">3.relative的限制作用</h2>
<h3 id="articleHeader3">3.1 relative对absolute的限制作用</h3>
<p>我们知道，absolute定位的是其第一个祖先元素定位属性不为static属性，如果没有relative或者fixed定位的情况下，给absolute添加top/left、right/bottom等属性可以发生偏移，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position: absolute;
top: 10px;
left: 10px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">position</span>: <span class="hljs-selector-tag">absolute</span>;
<span class="hljs-selector-tag">top</span>: 10<span class="hljs-selector-tag">px</span>;
<span class="hljs-selector-tag">left</span>: 10<span class="hljs-selector-tag">px</span>;</code></pre>
<p>此时，absolute元素就会迅速定位到局里浏览器左侧10像素，顶部10像素的地方。但是如果给父元素添加<code>position: relative</code>之后，则absolute的偏移能力被父元素限制住了，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014877056?w=377&amp;h=406" src="https://static.alili.tech/img/remote/1460000014877056?w=377&amp;h=406" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">3.2 relative对overflow的限制作用</h3>
<p>直接看下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--HTML代码-->
<div class=&quot;box&quot;>
    <div class=&quot;son&quot;></div>
</div>
<div class=&quot;box&quot; style=&quot;position: relative&quot;>
    <div class=&quot;son&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    overflow: hidden;
    width: 50px;
    height: 50px;
    background-color: #dddddd;
}
.son{
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #cd0000;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="Css"><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#dddddd</span>;
}
<span class="hljs-selector-class">.son</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#cd0000</span>;
}</code></pre>
<p>在这个例子中，<code>.box</code>的宽和高都是50px，而<code>.son</code>元素的宽和高都是100px，虽然<code>.box</code>元素设置了<code>overflow:hidden</code>，但依然限制不了<code>.son</code>元素的大小，其宽和高都是100px，而当<code>.box</code>设置了定位属性relative后，<code>.son</code>元素的宽和高乖乖的变成了<code>50px</code>。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014877057?w=215&amp;h=395" src="https://static.alili.tech/img/remote/1460000014877057?w=215&amp;h=395" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">3.3 relative对层级z-index的限制作用</h3>
<p>设置了定位元素的z-index值为数值可以创建"层叠上下文"（在后面的文章中会讲到）。在下面的第一幅图中，设置了margin负值，虽然同时设置了<code>z-index</code>为数值，但是后面的元素依然覆盖了前面的元素，而当增加了定位属性<code>position: relative</code>后，创建了层叠上下文，前面元素的层叠顺序高，虽然同时设置了margin负值，但是后面的元素依然覆盖不了前面的元素。如下图所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--HTML代码-->
<div class=&quot;son&quot; style=&quot;z-index: 3&quot;></div>
<div class=&quot;son&quot; style=&quot;z-index: 2;margin-top: -20px;background-color: tan;&quot;></div>
<!--分割线-->
<div class=&quot;son&quot; style=&quot;position: relative;z-index: 3&quot;></div>
<div class=&quot;son&quot; style=&quot;z-index: 2;margin-top: -20px;background-color: tan;&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--HTML代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"z-index: 3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"z-index: 2;margin-top: -20px;background-color: tan;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--分割线--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative;z-index: 3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"z-index: 2;margin-top: -20px;background-color: tan;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014877058?w=114&amp;h=282" src="https://static.alili.tech/img/remote/1460000014877058?w=114&amp;h=282" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>下面抛出一个问题，如果设置了对立属性<code>top/bottom</code>、<code>left/right</code>的相对定位元素和绝对定位元素，它们是如何表现的？</strong></p>
<p>在<a href="https://segmentfault.com/a/1190000014736711">CSS深入理解之absolute定位</a>这篇文章中，我们知道绝对定位元素表现的是拉伸特性，从而可以保持流体特性，但是相对定位却是"你死我活"的状态，也就是说，只有一个方向的属性会生效，当<code>top/bottom</code>元素同时使用的时候，<code>top</code>生效，当<code>left/bottom</code>同时使用的时候，<code>left</code>生效。请看下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot; style=&quot;position: relative; top: 10px;bottom: 500px&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative; top: 10px;bottom: 500px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>虽然同时设置了<code>top/bottom</code>对立属性，但是生效的却是<code>top</code>，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014877059?w=201&amp;h=123" src="https://static.alili.tech/img/remote/1460000014877059?w=201&amp;h=123" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>因此，下面有些代码没有必要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo{
    position: relative;
    top: 10px;
    right: 10px;/*无效*/
    bottom: 10px;/*无效*/
    left: 10px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.demo</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>;<span class="hljs-comment">/*无效*/</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;<span class="hljs-comment">/*无效*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>
}</code></pre>
<h2 id="articleHeader6">4.相对定位relative的使用原则-最小化</h2>
<p>虽然relative定位很好用，并且使用的频率很高，但是根据张鑫旭大神总结的布局实践原则，最好基于以下原则为好：</p>
<ol>
<li>尽量避免使用relative，如果要定位某些元素，看能否使用"无依赖的绝对定位"实现；</li>
<li>如果使用场景受限，一定要使用relative，则务必使relative最小化。</li>
</ol>
<p>比如，我们想在某个模块的右上角定位一个图标，如果让你去布局实现的话，你该如何布局呢？十有八九会如下面的方式实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;position: relative&quot;>
    <img src=&quot;icon.png&quot; style=&quot;position: absolute;top:0;right:0&quot;>
    <p>内容1</p>
    <p>内容2</p>
    <p>内容3</p>
    ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"icon.png"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: absolute;top:0;right:0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>但是，我们可以采用"relative的最小化使用原则"的方式实现，其代码如下面的方式实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div style=&quot;position: relative&quot;><img src=&quot;icon.png&quot; style=&quot;position: absolute;top:0;right:0&quot;> </div>
    <p>内容1</p>
    <p>内容2</p>
    <p>内容3</p>
    ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: relative"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"icon.png"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: absolute;top:0;right:0"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>内容3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>那么，基于"relative的最小化使用原则"的房还是实现有什么好处呢？原因及好处如下：</p>
<p>relative定位元素的层叠水平提高了（敬请期待后续的文章），如果其子元素越多，则影响的范围越广，从项目和可维护性的角度来看，如果后期不需要这个小图标了，我们可以大胆地干调relative单元的元素即可，其他的元素则不需要任何的修改，然后放心的去陪妹子了。但是，如果relative在最外层的容器上，你敢删除吗？你敢放心的去陪妹子吗？难道你不怕影响其他的元素吗？所以你应该只会删除小图标，而不会删除的relative属性的。然后你的项目代码越来越臃肿，很多无用代码，看起来非常糟糕😰。这么一分析，你可知道"<strong>relative最小化使用原则</strong>"的好处了吧~</p>
<h2 id="articleHeader7">5.最后</h2>
<p>relative定位相对与<code>absolute</code>和<code>float</code>的知识点要少很多，也比较好理解，相信大家已经搞明白了相对定位属性的功能。后面最新文章都会第一时间更新在我的公众号&lt;<strong>前端Talkking</strong>&gt;里面，欢迎关注。</p>
<p>以上就是本文的全部内容，感谢阅读，如果有表述不正确的地方，欢迎留言指正！😊</p>
<h2 id="articleHeader8">6.参考</h2>
<ul><li>张鑫旭《CSS世界》</li></ul>
<hr>
<p>遇见了，不妨关注下我的微信公众号「前端Talkking」<br><span class="img-wrap"><img data-src="/img/bV9did?w=591&amp;h=367" src="https://static.alili.tech/img/bV9did?w=591&amp;h=367" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端Talkking】CSS系列——CSS深入理解之relative定位

## 原文链接
[https://segmentfault.com/a/1190000014877050](https://segmentfault.com/a/1190000014877050)

