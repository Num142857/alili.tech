---
title: '实现SVG图标的渐变填充效果' 
date: 2019-01-19 2:30:10
hidden: true
slug: wqwm3twjm7
categories: [reprint]
---

{{< raw >}}

            <p>2016年我写过一篇文章<a href="https://fvsch.com/code/svg-icons/">如何使用SVG图标</a>，其“试验性部分”的结语是个警告 - “抱歉，渐变填充无法工作”。</p>
<p>我指的是像<code>fill: linear-gradient(red, blue)</code>一样的无效代码，因为<code>fill</code>属性出自SVG - 该元素内置了独有的渐变支持；而<code>linear-gradient</code>则源自CSS，常用于设置背景。二者的结合效果并不理想。</p>
<p>我可以使用SVG的<code>&lt;linearGradient/&gt;</code>元素，但之前并未尝试过。几个月后我做了试验，效果还算不错。下面请看分享。</p>
<h2>在HTML中添加渐变</h2>
<p>我发现最值得信赖的方式是在HTML页面中添加SVG元素(例如在<code>&lt;body&gt;</code>标签的开始或结束位置添加)。这里应该定义一个<code>&lt;linearGradient&gt;</code>。</p>
<pre><code class="hljs hsp">&lt;svg style=<span class="hljs-string">"width:0;height:0;position:absolute;"</span> aria-hidden=<span class="hljs-string">"true"</span> focusable=<span class="hljs-string">"false"</span>&gt;
  &lt;linearGradient id=<span class="hljs-string">"my-cool-gradient"</span> x2=<span class="hljs-string">"1"</span> y2=<span class="hljs-string">"1"</span>&gt;`
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"0%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"#447799"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"50%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"#224488"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"100%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"#112266"</span> /&gt;
  &lt;/linearGradient&gt;
&lt;/svg&gt;
</code></pre>
<p>这个元素不推荐用<code>display:none</code>实现隐藏效果，这样的话某些浏览器会忽略渐变效果。把元素高度设为0px来实现隐藏效果是可行的。</p>
<p>现在我们可以在SVG图标上使用渐变效果了:</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"url(#my-cool-gradient) #447799;"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">focusable</span>=<span class="hljs-string">"false"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#symbol-id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
</code></pre>
<p>或者在CSS里这样写:</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.icon</span> {
  <span class="hljs-comment">/* gradient and fallback color */</span>
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(#my-cool-gradient) <span class="hljs-number">#447799</span>;
}
</code></pre><p>下面这两个图标应该使用了松石绿-深蓝的渐变。示例：<a href="https://thenounproject.com/search/?q=leaf&amp;i=75382">Leaf by Gabriele Malaspina</a> , <a href="https://thenounproject.com/search/?q=carpet&amp;i=1023407">Carpet by Ben Davis</a></p>
<p>不过我们无法定制单个按钮的渐变。如果想这样做，需要在HTML中创建不同的SVG渐变定义。</p>
<h2>使用CSS变量控制渐变色</h2>
<p>如果我们想用CSS设置渐变色，可以通过CSS变量来实现。我们将使用CSS自定义属性来编写渐变定义(<code>var(--my-custom-property)</code>).</p>
<pre><code class="hljs hsp">&lt;svg aria-hidden=<span class="hljs-string">"true"</span> focusable=<span class="hljs-string">"false"</span> style=<span class="hljs-string">"width:0;height:0;position:absolute;"</span>&gt;
  &lt;linearGradient id=<span class="hljs-string">"gradient-horizontal"</span>&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"0%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-1)"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"50%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-2)"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"100%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-3)"</span> /&gt;
  &lt;/linearGradient&gt;
  &lt;linearGradient id=<span class="hljs-string">"gradient-vertical"</span> x2=<span class="hljs-string">"0"</span> y2=<span class="hljs-string">"1"</span>&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"0%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-1)"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"50%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-2)"</span> /&gt;
    &lt;<span class="hljs-keyword">stop</span> offset=<span class="hljs-string">"100%"</span> <span class="hljs-keyword">stop</span>-<span class="hljs-keyword">color</span>=<span class="hljs-string">"var(--color-stop-3)"</span> /&gt;
  &lt;/linearGradient&gt;
&lt;/svg&gt;
</code></pre>
<p>现在我们可以设置 - 如果需要的话 - 在CSS中还能改变这些颜色:</p>
<pre><code class="hljs hsp"><span class="hljs-meta">#gradient-horizontal {</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-1</span>: <span class="hljs-meta">#a770ef;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-2</span>: <span class="hljs-meta">#cf8bf3;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-3</span>: <span class="hljs-meta">#fdb99b;</span>
}
<span class="hljs-meta">#gradient-vertical {</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-1</span>: <span class="hljs-meta">#<span class="hljs-number">00</span>c3ff;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-2</span>: <span class="hljs-meta">#<span class="hljs-number">77</span>e190;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-3</span>: <span class="hljs-meta">#ffff1c;</span>
}
</code></pre>
<p>最后，用这些效果来填充图标:</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.icon-hgradient</span> {
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(#gradient-horizontal) gray;
  <span class="hljs-comment">/* We could use it as a stroke fill too:
  stroke: url(#gradient-horizontal) gray; */</span>
}
<span class="hljs-selector-class">.icon-vgradient</span> {
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(#gradient-vertical) gray;
}
</code></pre>
<p>下面是浏览器的支持度(<a href="https://caniuse.com/#feat=css-variables">浏览器对CSS自定义属性的支持程度</a>):</p>
<p>使用SVG渐变填充和CSS变量测试图标：</p>
<p>渐变填充会绘制图标的每条路径。为了避免颜色衔接不当(譬如叶子和茎的连接处)，把图标的源SVG所有路径或大部分路径合并可能有效果。</p>
<h2>在外部文件中使用渐变</h2>
<p>这个技巧在FireFox中被证实有效，也曾适用于Edge(Edge14,15确认可用，但Edge16和预览版又取消了支持)。请看下面的测试:</p>
<ol>
<li>两个图标都取自一个外部雪碧图: <a href="https://fvsch.com/sprite.svg">sprite.svg</a>.</li>
<li>第一个图标使用了HTML页面的渐变效果，第二个则使用了<code>sprite.svg</code>.</li>
</ol>
<pre><code class="hljs css"><span class="hljs-selector-class">.icon-sprite-gradient</span> {
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(sprite.svg#my-warm-gradient) red;
}
</code></pre>
<p>不支持此项操作的浏览器(Chrome,Safari,最新版Edge...)应该为第二个图标展示一个红色的替代填充效果。</p>
<h2>在CSS中使用数据URL作为渐变值</h2>
<p>如果我告诉你可以在SVG中定义渐变之后把SVG作为数据URL放在CSS中，你会怎么想? 好吧我承认是在犯傻，可它真的可以实现! 至少在Firefox中可以:P</p>
<pre><code class="hljs css"><span class="hljs-comment">/* Notice the  id="grad" in the SVG URL and how we’re using it at the end. Note that the # in hexadecimal colors must be escaped as %23. */</span>
<span class="hljs-selector-class">.icon-gradient-url</span> {
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg'&gt;&lt;linearGradient id='grad'&gt;&lt;stop offset='0%' stop-color='%23ff00cc'/&gt;&lt;stop offset='100%' stop-color='%23333399'/&gt;&lt;/linearGradient&gt;&lt;/svg&gt;#grad"</span>) purple;
}

<span class="hljs-comment">/* Same SVG, in base64 */</span>
<span class="hljs-selector-class">.icon-gradient-base64</span> {
  <span class="hljs-attribute">fill</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZ3JhZCc+PHN0b3Agb2Zmc2V0PScwJScgc3RvcC1jb2xvcj0nI2ZmMDBjYycvPjxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0nIzMzMzM5OScvPjwvbGluZWFyR3JhZGllbnQ+PC9zdmc+#grad"</span>) purple;
}
</code></pre>
<p>看到我们如何在URL的结尾用<code>#grad</code>引用渐变效果的<code>id</code>了吗？目前看来只有Firefox能理解这个语法。额，太遗憾了不是吗。</p>
<p>这个例子打算实现一个品红色-紫色渐变效果。不支持此操作的浏览器(Chrome,Safari,Edge...)应该会展示一个紫色的备用填充效果。</p>
<h2>概括</h2>
<ol>
<li>是的，我们可以使用渐变填充!</li>
<li>但首先需要在HTML中添加SVG渐变</li>
<li>可以在SVG渐变中直接设置颜色(当然是HTML中的SVG)，或者在CSS里设置(使用CSS变量)</li>
<li>所有使用给定渐变效果的图标会使用相同的颜色，但我们无法像下面一样覆盖某种特定颜色:</li>
</ol>
<pre><code class="hljs hsp">.icon-gradient-override {
  <span class="hljs-comment">/* 可行方法 */</span>
  fill: url(<span class="hljs-meta">#gradient-horizontal) gray;</span>
  <span class="hljs-comment">/* 以下方法法不可行... */</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-1</span>: white<span class="hljs-comment">;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-2</span>: gray<span class="hljs-comment">;</span>
  --<span class="hljs-keyword">color</span>-<span class="hljs-keyword">stop</span><span class="hljs-number">-3</span>: black<span class="hljs-comment">;</span>
}
</code></pre>
<p>假如你需要大量渐变效果，这个技巧可能不适合你。因为在HTML中创建10个或20个不同的SVG渐变并不实用。但对于简单需求而言，这个技巧在所有现代浏览器中均可使用(如果我们放弃CSS变量的话，IE11也在支持的浏览器之列)。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现SVG图标的渐变填充效果

## 原文链接
[https://www.zcfy.cc/article/gradient-fills-for-svg-icons](https://www.zcfy.cc/article/gradient-fills-for-svg-icons)

