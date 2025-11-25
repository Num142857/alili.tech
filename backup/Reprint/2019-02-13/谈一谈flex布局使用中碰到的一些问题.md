---
title: '谈一谈flex布局使用中碰到的一些问题' 
date: 2019-02-13 2:31:23
hidden: true
slug: gknqo3vc5n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">起因</h2>
<p>工作以后由于大量使用到了flex布局而碰到了一些尚不清楚的问题，以及一些有意思的特性，在此写篇博客记录一下。</p>
<h2 id="articleHeader1">flex三个值的含义</h2>
<p>众所周知，flex布局所有的属性有两种：一种作用在弹性容器（Flex container）上，一种作用在弹性项目（Flex item）上，而flex就是作用在弹性项目上的属性。</p>
<p><code>flex</code> 是 <code>flex-grow</code>、<code>flex-shrink</code>、<code>flex-basis</code> 三个值的简写，这个值规定了弹性项目如何伸长或压缩以适应弹性容器中的可用空间。</p>
<p><code>flex-grow</code> 定义弹性项目的放大比列，可以接受数字（小数也可以），不接受负值，<strong>默认值是 0</strong> 。这个值如果为 0 就意味着即使容器内还存在剩余空间，弹性项目也不会放大。</p>
<p><code>flex-shrink</code> 定义弹性项目的收缩比例，同样接受数字（小数也可以），不接受负值，<strong>默认值是 1</strong> 。如果一个弹性项目的 <code>flex-shrink</code> 设为 0 而其他弹性项目的 <code>flex-shrink</code> 值为 1  ，则当弹性容器空间不足时，该弹性项目不会被压缩，而其他的弹性项目会被等比例压缩。</p>
<p><code>flex-basis</code> 定义在分配容器内空间之前，弹性项目占据的主轴空间（不一定是宽度，因为主轴方向可以是纵向的），<strong>默认值是 auto</strong> 。如果对弹性项目同时设置 <code>flex-basis</code> 和 <code>width</code> ， <code>width</code> 会被忽略。还要注意当主轴是横向的时候，如果设定了 <code>max-width</code> 或 <code>min-width</code> 会限制弹性项目的宽度。</p>
<p>这里讲一下 <code>flex-basis</code> 取值的情况：</p>
<ul>
<li>指定的数值，比如以px、em为单位的数值。</li>
<li>百分数，取百分数的话就是相对其父弹性容器的宽或高（取决于主轴方向）来计算，如果包含块的尺寸未指定（也就是说父元素的尺寸取决于子元素），那么这时候结果和 <code>auto</code> 一样。</li>
<li>
<code>auto</code> 值的意思是基于弹性项目的 <code>width</code> 或 <code>height</code> 调整大小（根据主轴的横向或者纵向），如果没有设置 <code>width</code> 或 <code>height</code> 则根据内容自适应。</li>
</ul>
<h2 id="articleHeader2">设置flex之后的弹性项目如何计算宽度</h2>
<p>这里给一个代码的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;content&quot;>
  <div class=&quot;box1&quot; style=&quot;background-color:red;&quot;>A</div>
  <div class=&quot;box2&quot; style=&quot;background-color:lightblue;&quot;>B</div>
  <div class=&quot;box3&quot; style=&quot;background-color:yellow;&quot;>C</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color:red;"</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color:lightblue;"</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box3"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color:yellow;"</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#content {
  display: flex;
  width: 360px;
}

.box1 {
  width: 100px;
  flex: 1 1 0;
}

.box2 {
  width: 100px;
  flex: 1 1 0;
}

.box3 {
  width: 100px;
  flex: 1 1 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#content</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
}

<span class="hljs-selector-class">.box1</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.box2</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.box3</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>由于flex-basis的值为 0 ，所以此时弹性容器的剩余空间为 <code>360px - 0 * 3 = 360px</code> ，由于3个元素都设置了 <code>flex-grow: 1</code> ，所以剩余空间3个元素所占比例为 <code>1:1:1</code> ，每个元素的宽度就是 <code> 360px / 3 = 120px </code> 。</p>
<p>如果把代码改一下呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#content {
  display: flex;
  width: 360px;
}

.box1 {
  width: 100px;
  flex: 1 1 0;
}

.box2 {
  width: 100px;
  flex: 1 1 auto;
}

.box3 {
  flex: 1 1 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#content</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>;
}

<span class="hljs-selector-class">.box1</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.box2</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> auto;
}

<span class="hljs-selector-class">.box3</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">200px</span>;
}</code></pre>
<p>此时，弹性容器内剩余宽度为：<code>360px - 0 - 100px - 200px = 60px</code>，3个元素所占剩余空间比例同样是 <code> 1:1:1</code> 。那么宽度分别就是：<code>0 + 20px = 20px</code> ，<code>100px + 20px = 120px</code> ，<code>200px + 20px = 220px</code> 。 </p>
<p>对应复杂情况的计算，这里有一个回答写得不错：</p>
<p><a href="https://segmentfault.com/q/1010000004080910">flex设置成1和auto有什么区别</a></p>
<h2 id="articleHeader3">flex单值、双值、三值的赋值规则是怎么样的</h2>
<p>单值情况下：</p>
<ul>
<li>
<strong>一个无单位的数字</strong>：它会被当作  <code>flex-grow</code> 的值，<code>flex-shrink</code> 为 1 ，<code>flex-basis</code> 为 0%。</li>
<li>
<strong>一个有效的宽度值</strong>：它会被当作 <code>flex-basis</code> 的值，<code>flex-shrink</code> 和 <code>flex-grow</code> 都是 1 。</li>
<li>
<strong>关键字</strong>：比如 <code>auto</code>，<code>none</code> 这两个下文会讲。</li>
</ul>
<p>双值情况下：</p>
<p>第一个值必须是无单位的数字，它会作为 <code>flex-grow</code> 的值；第二个值可以是：</p>
<ul>
<li>
<strong>一个无单位的数字</strong>：它会被当作 <code>flex-shrink</code> 的值，而<code>flex-basis</code> 的值就是 0% 。</li>
<li>一个有效的宽度值：它会被当作 <code>flex-basis</code> 的值，<code>flex-shrink</code> 的取值就是 1 。</li>
</ul>
<p>三值情况下：</p>
<p>第一个和第二个值必须是无单位的数，分别作为 <code>flex-grow</code>，<code>flex-shrink</code>，<code>flex-basis</code> 的值；第三个值可以是有效的宽度值，也可以是 <code>auto</code> 。</p>
<h2 id="articleHeader4">flex: 0，flex: 1，flex: auto，flex: none，flex: 0%的区别是什么？</h2>
<p>讲完了上面的三种赋值方式之后，那么简写就变得很容易理解了：</p>
<ul>
<li>
<code>flex: 0</code> 是 <code>flex: 0 1 0% </code> 的简写</li>
<li>
<code>flex: none</code> 是 <code>flex: 0 0 auto</code> 的简写</li>
<li>
<code>flex: 1</code> 是 <code>flex: 1 1 0%</code> 的简写</li>
<li>
<code>flex: auto</code> 是 <code>flex: 1 1 auto</code> 的简写</li>
<li>
<code>flex: 0%</code> 是 <code>flex: 1 1 0%</code> 的简写</li>
</ul>
<p>小结一下：以上就是对 <code>flex</code> 这个属性取值的梳理，最近一年没有写过博客，最近还是要填一下坑的，前端之路且歌且行～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈一谈flex布局使用中碰到的一些问题

## 原文链接
[https://segmentfault.com/a/1190000016899455](https://segmentfault.com/a/1190000016899455)

