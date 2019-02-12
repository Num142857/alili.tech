---
title: '前端入门-day2（常见css问题及解答）' 
date: 2019-02-13 2:31:23
hidden: true
slug: i65eow0f0h
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762552" src="https://static.alili.tech/img/remote/1460000016762552" alt="css" title="css" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">写在前面</h2>
<p>今天是入门前端的day2, 小伙伴们应该已经看了一些HTML的基础和CSS的基础了，是不是遇到了很多关于CSS的问题呢。因为HTML很少有太复杂的问题，所以直接写一篇关于CSS的常见问题及解答啦~</p>
<h2 id="articleHeader1">display: none;和visibility:hidden;的区别</h2>
<p>简单来说：</p>
<ul>
<li>
<code>display: none;</code>不会再占据空间，就跟不存在一样。</li>
<li>
<code>visibility:hidden;</code>则只是将透明度变成0，仍然占据其空间。</li>
</ul>
<h2 id="articleHeader2">inline、inline-block、block的区别</h2>
<p>首先要明确，每一个标签都有其默认的display的属性值。例如：</p>
<ul>
<li>
<code>&lt;div&gt;</code>标签默认为display: block;</li>
<li>
<code>&lt;span&gt;</code>标签默认为display: inline;</li>
</ul>
<p>但是，默认值可以被重写。即你可以对<code>&lt;div&gt;</code>标签设置display: inline;，对<code>&lt;span&gt;</code>标签设置display: block;</p>
<p>接下来讲区别：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762553?w=696&amp;h=197" src="https://static.alili.tech/img/remote/1460000016762553?w=696&amp;h=197" alt="display的三个值" title="display的三个值" style="cursor: pointer; display: inline;"></span></p>
<p>对于display: block;</p>
<ul>
<li>它独占一行，即不允许有其他元素在其左右。</li>
<li>可设置宽度和高度。</li>
<li>在未设置宽度时，其宽度会撑满。</li>
<li>上下左右的padding和margin都会起作用（这里的起作用是指可以拉开和其他元素的距离）。</li>
</ul>
<p>对于display: inline;</p>
<ul>
<li>它不会独占一行，可以允许其他元素在其左右。</li>
<li>宽度和高度由内容撑开，设置width和height是无效的。</li>
<li>左右的margin和padding可以拉开距离，但是上下的margin和padding不能拉开距离。</li>
<li>
<a href="https://hacks.mozilla.org/2015/03/understanding-inline-box-model/" rel="nofollow noreferrer" target="_blank">更多需要注意的点看这里</a>。</li>
</ul>
<p>对于display: inline-block;</p>
<ul>
<li>它像inline和block的合体。</li>
<li>允许其他元素在其左右。</li>
<li>可设置宽度和高度。</li>
</ul>
<p>重点解释一下inline的padding-top或者padding-bottom。当给inline的元素设置这两个值时，实际上是加上了padding的，在设置背景色的时候可以清楚的看到背景色作用在了padding上，但是却没有拉开和下方元素的距离。<br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;block1&quot;>block1</span>
<span class=&quot;block2&quot;>block2</span>
<div class=&quot;block3&quot;>block3</div>

.block1 {
  background-color: lightblue;
  width: 100px; // 无效
  height: 500px; //无效
  margin-right: 20px;
  margin-bottom: 20px; // 无法拉开距离
  padding-left: 10px;
  padding-bottom: 10px; // 无法拉开距离
}

.block2 {
  display: inline-block;
  width: 300px; // 可以起作用
  background-color: lightgray;
}
.block3 {
  background-color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"block1"</span>&gt;block1&lt;/span&gt;
&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"block2"</span>&gt;block2&lt;/span&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"block3"</span>&gt;block3&lt;/div&gt;

<span class="hljs-selector-class">.block1</span> {
  <span class="hljs-attribute">background-color</span>: lightblue;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-comment">// 无效</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>; <span class="hljs-comment">//无效</span>
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>; <span class="hljs-comment">// 无法拉开距离</span>
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">10px</span>; <span class="hljs-comment">// 无法拉开距离</span>
}

<span class="hljs-selector-class">.block2</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>; <span class="hljs-comment">// 可以起作用</span>
  <span class="hljs-attribute">background-color</span>: lightgray;
}
<span class="hljs-selector-class">.block3</span> {
  <span class="hljs-attribute">background-color</span>: red;
}</code></pre>
<p>图片如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762554?w=856&amp;h=74" src="https://static.alili.tech/img/remote/1460000016762554?w=856&amp;h=74" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">border-radius: 999px;和border-radius: 50%;的正确理解。</h2>
<p>先看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;block1&quot;>block1</div>
<div class=&quot;block2&quot;>block2</div>

.block1 {
  width: 200px;
  height: 100px;
  background-color: lightblue;
  border-radius: 999px;
}

.block2 {
  width: 200px;
  height: 100px;
  background-color: lightgray;
  border-radius: 50%;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>&lt;<span class="hljs-keyword">div </span>class=<span class="hljs-string">"block1"</span>&gt;<span class="hljs-keyword">block1&lt;/div&gt;
</span>&lt;<span class="hljs-keyword">div </span>class=<span class="hljs-string">"block2"</span>&gt;<span class="hljs-keyword">block2&lt;/div&gt;
</span>
.<span class="hljs-keyword">block1 </span>{
<span class="hljs-symbol">  width:</span> <span class="hljs-number">200</span>px<span class="hljs-comment">;</span>
<span class="hljs-symbol">  height:</span> <span class="hljs-number">100</span>px<span class="hljs-comment">;</span>
  <span class="hljs-keyword">background-color: </span>lightblue<span class="hljs-comment">;</span>
  <span class="hljs-keyword">border-radius: </span><span class="hljs-number">999</span>px<span class="hljs-comment">;</span>
}

.<span class="hljs-keyword">block2 </span>{
<span class="hljs-symbol">  width:</span> <span class="hljs-number">200</span>px<span class="hljs-comment">;</span>
<span class="hljs-symbol">  height:</span> <span class="hljs-number">100</span>px<span class="hljs-comment">;</span>
  <span class="hljs-keyword">background-color: </span>lightgray<span class="hljs-comment">;</span>
  <span class="hljs-keyword">border-radius: </span><span class="hljs-number">50</span>%<span class="hljs-comment">;</span>
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762555" src="https://static.alili.tech/img/remote/1460000016762555" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>首先要注意，设置border: 999px;只是表示设置一个很大的值，事实上不用设置999px，只要理解了原理，就能找到那个临界值。</p>
<p>其次，设置border-radius: 999px;其实是设置了x和Y方向上的两个值，等价于border-radius: 999px/999px;</p>
<hr>
<p>当我们设置border-raidus: 999px;时，你可以先想象在一个矩形内部画了两个巨大无比的圆，这两个圆因为太大了，所以产生了交叠的部分，于是根据<a href="https://www.w3.org/TR/css-backgrounds-3/#corner-overlap" rel="nofollow noreferrer" target="_blank">文档里的这一段</a>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762556" src="https://static.alili.tech/img/remote/1460000016762556" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>意思是：<br>L是边长，S是border-radius设置的两个方向的值的和，如果 f = min(L / s) 小于1，则border-radius都要乘以f来缩小。拿上面的代码来说，因为最小边是100px，s为999px + 999px，所以 f = 100 / (999 + 999)是小于1的，所以，border-radius都要乘以f，得出来border-radius：999px;等价于border-radius: 50px;因此变成了block1中的跑道形状。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762557?w=597&amp;h=304" src="https://static.alili.tech/img/remote/1460000016762557?w=597&amp;h=304" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>当我们设置border-raidus: 50%;的时候，下面这张图就足够解释了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762558?w=544&amp;h=293" src="https://static.alili.tech/img/remote/1460000016762558?w=544&amp;h=293" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>总结：</p>
<ul>
<li>border-radius: 50px;等价于border-radius: 50px/50px;<code>有两个方向。</code>
</li>
<li>通常，50%的radius用的比较多，常用来设置圆形的头像，对一个正方形元素设置border-radius: 50%;即可实现。</li>
<li>当border-radius非常大时，会产生交叠，导致要一起缩小，缩小至<code>最短边的一半。</code>
</li>
</ul>
<h2 id="articleHeader4">margin和padding的区别，何时用哪个？</h2>
<p>区别：</p>
<ul><li>首先，以border为界，margin在border之外，padding在border里。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762559?w=412&amp;h=230" src="https://static.alili.tech/img/remote/1460000016762559?w=412&amp;h=230" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li>其次，背景色会作用在padding上，不会作用到margin上。</li>
<li>margin在垂直方向上可能会出现合并的问题（具体可搜索margin坍塌或者外边距合并）</li>
</ul>
<hr>
<p>我的用法：<br>通常情况下，我会这样用：</p>
<ul>
<li>在需要拉开内部元素与父元素的距离时，在父元素上加padding</li>
<li>在需要拉开元素和元素之间的距离时，用margin</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <div class=&quot;son1&quot;>son1</div>
  <div class=&quot;son2&quot;>son2</div>
</div>

.container {
  background-color: lightblue;
  padding: 10px;
}
.son1 {
  margin-bottom: 10px;
  background-color: orange;
}
.son2 {
  background-color: lightgray;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container"</span>&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son1"</span>&gt;son1&lt;/div&gt;
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"son2"</span>&gt;son2&lt;/div&gt;
&lt;/div&gt;

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">background-color</span>: lightblue;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.son1</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">background-color</span>: orange;
}
<span class="hljs-selector-class">.son2</span> {
  <span class="hljs-attribute">background-color</span>: lightgray;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016762560" src="https://static.alili.tech/img/remote/1460000016762560" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">最后</h2>
<p>这一篇先到此为止，太长了不适合阅读，因此会拆到下一篇里边。下一篇仍然是讲一些CSS的问题~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端入门-day2（常见css问题及解答）

## 原文链接
[https://segmentfault.com/a/1190000016762549](https://segmentfault.com/a/1190000016762549)

