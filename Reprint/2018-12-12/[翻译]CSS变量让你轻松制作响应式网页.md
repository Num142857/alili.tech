---
title: '[翻译]CSS变量让你轻松制作响应式网页' 
date: 2018-12-12 2:30:10
hidden: true
slug: rsgz3c79ybm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文地址：<a href="https://medium.freecodecamp.org/how-to-make-responsiveness-super-simple-with-css-variables-8c90ebf80d7f" rel="nofollow noreferrer" target="_blank">https://medium.freecodecamp.org/how-to-make-responsiveness-super-simple-with-css-variables-8c90ebf80d7f</a>  <br>作者：<a href="https://medium.freecodecamp.org/@perborgen?source=post_header_lockup" rel="nofollow noreferrer" target="_blank">Per Harald Borgen</a>  <br>摘要：这是一篇2018年制作响应性网页的快速教程。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013512728?w=800&amp;h=329" src="https://static.alili.tech/img/remote/1460000013512728?w=800&amp;h=329" alt="响应式布局" title="响应式布局" style="cursor: pointer; display: inline;"></span><br>如果你之前没有听说过CSS变量，那么现在我将告诉你：它是CSS的新特性，让你能够在样式表中使用变量的能力，并且无需任何配置。</p>
<p>实际上，CSS变量能够让你改变以往设置样式的老方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1{
    font-size:30px;
}
navbar > a {
    font-size:30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;
}
<span class="hljs-selector-tag">navbar</span> &gt; <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;
}</code></pre>
<p>而使用了CSS变量之后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
  --base-font-size: 30px;
}
h1 {
  font-size: var(--base-font-size);
}
navbar > a {
  font-size: var(--base-font-size);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);
}
<span class="hljs-selector-tag">navbar</span> &gt; <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);
}</code></pre>
<p>这样的词法有点奇怪，但它确实能够让你通过仅改变<code>--base-font-size</code>的值来改变app中所有原生的字体大小。</p>
<p>如果你想要学习CSS变量的知识，可以登录Scrimba看<a href="https://scrimba.com/g/gcssvariables" rel="nofollow noreferrer" target="_blank">我的视频课程</a>，或是阅读我在Medium上写的文章：<a href="https://medium.freecodecamp.org/want-to-learn-css-variables-heres-my-free-8-part-course-f2ff452e5140" rel="nofollow noreferrer" target="_blank">如何学习CSS变量</a>。  </p>
<p>好了，现在让我们看看如何使用这个新知识来更加简单地制作响应式站点吧。</p>
<h1 id="articleHeader0">初始配置</h1>
<p>让我们来把下面这个页面变成响应式的吧：<br><span class="img-wrap"><img data-src="/img/remote/1460000013512729?w=1000&amp;h=649" src="https://static.alili.tech/img/remote/1460000013512729?w=1000&amp;h=649" alt="页面" title="页面" style="cursor: pointer; display: inline;"></span></p>
<p>这个页面在PC端看上去很不错，不过你可以看到它在移动端的表现并不好。就像下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000013512730?w=558&amp;h=904" src="https://static.alili.tech/img/remote/1460000013512730?w=558&amp;h=904" alt="问题1" title="问题1" style="cursor: pointer; display: inline;"></span></p>
<p>在下面这张图中，我们在样式上做了一些改进，让它看起来更好一点：</p>
<ol>
<li>重新排列整个网格布局，使用垂直排列取代固定两列布局。</li>
<li>将框架整体上移了一点。</li>
<li>对字体进行了缩放。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013512731" src="https://static.alili.tech/img/remote/1460000013512731" alt="问题2" title="问题2" style="cursor: pointer; display: inline;"></span></p>
<p>目光转到CSS代码中，下面是我们要修改的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 {
  font-size: 30px;
}
#navbar {
  margin: 30px 0;
}
#navbar a {
  font-size: 30px;
}
.grid {
  margin: 30px 0;
  grid-template-columns: 200px 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-id">#navbar</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#navbar</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">200px</span>;
}</code></pre>
<p>更具体地说，我们需要在一个媒体查询中做出以下调整：</p>
<ul>
<li>将h1的字体调整为20px；</li>
<li>减少#navbar的上外边距为15px；</li>
<li>将#navbar的字体大小减少到20px；</li>
<li>减少.grid的外边距为15px；</li>
<li>将.grid从两列布局变为单列布局。</li>
</ul>
<blockquote>注意：样式表里不仅仅是这些CSS声明，但是在这篇教程中我跳过它们，因为媒体查询并不影响它们的设置。你可以在<a href="https://scrimba.com/c/cwJmLhn" rel="nofollow noreferrer" target="_blank">这里</a>获取完整的代码。</blockquote>
<h1 id="articleHeader1">旧方法</h1>
<p>不使用CSS变量确实可以做到同样的效果，但这样会增加许多不必要的代码，因为上面大部分修改都需要将声明在媒体查询中重写一遍。就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media all and (max-width: 450px) {
  
  navbar {
    margin: 15px 0;
  }
  
  navbar a {
    font-size: 20px;
  }

  h1 {
    font-size: 20px;
  }
  
  .grid {
    margin: 15px 0;
    grid-template-columns: 200px;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">450px</span>) {
  
  <span class="hljs-selector-tag">navbar</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;
  }
  
  <span class="hljs-selector-tag">navbar</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  }

  <span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  }
  
  <span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">200px</span>;
  }
}</code></pre>
<h1 id="articleHeader2">新的方法</h1>
<p>现在让我们看看使用CSS变量是如何起作用的。首先，我们要声明需要更改或复用的变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
  --base-font-size: 30px;
  --columns: 200px 200px;
  --base-margin: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">--columns</span>: <span class="hljs-number">200px</span> <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">--base-margin</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>然后，我们只需要在app中使用它们就可以了。非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#navbar {
  margin: var(--base-margin) 0;
}
#navbar a {
  font-size: var(--base-font-size);
}
h1 {
  font-size: var(--base-font-size);
}
.grid {
  margin: var(--base-margin) 0;
  grid-template-columns: var(--columns);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#navbar</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-built_in">var</span>(--base-margin) <span class="hljs-number">0</span>;
}
<span class="hljs-selector-id">#navbar</span> <span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);
}
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--base-font-size);
}
<span class="hljs-selector-class">.grid</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-built_in">var</span>(--base-margin) <span class="hljs-number">0</span>;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">var</span>(--columns);
}</code></pre>
<p>之后，我们可以在媒体查询中修改这些变量值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media all and (max-width: 450px) {
  :root {
    --columns: 200px;
    --base-margin: 15px;
    --base-font-size: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> all and (max-width: <span class="hljs-number">450px</span>) {
  <span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--columns</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">--base-margin</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">--base-font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>这样的代码是不是比之前要简洁多了？我们只需要专注于<code>:root</code>选择器就可以了。</p>
<p>我们将媒体查询中的4个声明减少到了1个，代码也从13行减少到了4行。</p>
<p>当然，这只是一个简单的例子。想象一下，在一个大中型网站中，有一个<code>--base-margin</code>变量控制着所有的外边距。当你想要在媒体查询时修改属性，并不需要用复杂的声明填充整个媒体查询，只是简简单单地修改这个变量值就可以了。</p>
<p>总之，CSS变量可以定义为未来的响应式。如果你想要学习更多的知识，我推荐你看<a href="https://scrimba.com/g/gcssvariables" rel="nofollow noreferrer" target="_blank">我的免费教程</a>。用不了多久你就能成为一个CSS变量大师。</p>
<blockquote>查看更多我翻译的Medium文章请访问：  <br>项目地址：<a href="https://github.com/WhiteYin/translation/tree/master" rel="nofollow noreferrer" target="_blank">https://github.com/WhiteYin/translation</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[翻译]CSS变量让你轻松制作响应式网页

## 原文链接
[https://segmentfault.com/a/1190000013512723](https://segmentfault.com/a/1190000013512723)

