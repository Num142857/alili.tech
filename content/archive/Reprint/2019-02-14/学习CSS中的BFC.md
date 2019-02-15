---
title: '学习CSS中的BFC' 
date: 2019-02-14 2:30:37
hidden: true
slug: ncdpto75yo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">定义</h2>
<p>BFC全称为block formatting context，意为块级格式化上下文，是Web页面中盒模型布局的css渲染模式。</p>
<p>可能上面的解释看了有点懵逼，通俗的说BFC指的的是一块区域的布局， 这个区域的布局有一个显著特点：这个区域内的子元素无论使用何种布局、何种样式都不会影响外部的元素。BFC比较常见的用法就是用来清除浮动的影响，正常不清楚浮动影响的情况下，父元素的高度是会坍塌的</p>
<p>那么什么时候会触发BFC呢？满足一下条件中任何一个：</p>
<ul>
<li>float的值不为none</li>
<li>position的值不为static或者relate</li>
<li>display的值为table-cell、table-caption、inline-block、flex或者inline-flex中的任意一个</li>
<li>overflow的值不为visible</li>
</ul>
<h2 id="articleHeader1">作用</h2>
<h3 id="articleHeader2">清除浮动</h3>
<p>我们经常会遇到这样的情况：当一个容器内包含的子元素包含浮动元素时，会导致容器没有高度，人们常用一个伪类，然后在伪类中用clear属性清除浮动，其实可以通过定义一个BFC来达到同样的目的，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div></div>
    <div></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  width: 600px;
  background-color: black;
}
.container div {
  float: left;
  width: 200px;
  height: 200px;
  margin-left: 10px;
  background-color: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">background-color</span>: black;
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">background-color</span>: green;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiCZq?w=704&amp;h=242" src="https://static.alili.tech/img/bVbiCZq?w=704&amp;h=242" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当子元素存在float属性时，父容器没有设置高度，父容器的高度就会塌陷，我们可以通过在父容器中加overflow:hidden创建一个BFC来解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  width: 600px;
  background-color: black;
  overflow: hidden;  
}
.container div {
  float: left;
  width: 200px;
  height: 200px;
  margin-left: 10px;
  background-color: green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">background-color</span>: black;
  <span class="hljs-attribute">overflow</span>: hidden;  
}
<span class="hljs-selector-class">.container</span> <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">background-color</span>: green;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiCZW?w=702&amp;h=230" src="https://static.alili.tech/img/bVbiCZW?w=702&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">防止文字环绕</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <img src=&quot;../public/image/test.jpeg&quot;>
    <p>test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test </p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../public/image/test.jpeg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img {
  float: left;
  width: 40px;
  height: 40px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiC17?w=746&amp;h=396" src="https://static.alili.tech/img/bVbiC17?w=746&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上面例子所示，正常情况下我们期待的结果是左边显示图片，右边显示文字描述，而不是上面展示的文字环绕在图片周围，此时我们同样可以通过创建一个BFC来解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
p {
  overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<h3 id="articleHeader4">防止外边距折叠</h3>
<p>常规文档流中，子元素都是沿着父元素顶部开始一个接着一个垂直摆放的，相邻兄弟间的垂直间距由他们中间距最大的一个元素决定，而不是叠加在一起，这就是边距折叠，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <p class=&quot;one&quot;>one</p>
    <p class=&quot;two&quot;>two</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  width: 200px;
  background-color: black;
}
p {
  width: 150px;
  background-color: green;
}
.one {
  margin: 10px 0;
}
.two {
  margin: 20px 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background-color</span>: black;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">background-color</span>: green;
}
<span class="hljs-selector-class">.one</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.two</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiC4T?w=406&amp;h=130" src="https://static.alili.tech/img/bVbiC4T?w=406&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这种情况，我们可以通过创建一个新的BFC来解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <p class=&quot;one&quot;>one</p>
  <div class=&quot;new&quot;>
    <p class=&quot;two&quot;>two</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"new"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  width: 200px;
  background-color: black;
}
p {
  width: 150px;
  background-color: green;
}
.one {
  margin: 10px 0;
}
.two {
  margin: 20px 0;
}
.new {
  overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background-color</span>: black;
}
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">background-color</span>: green;
}
<span class="hljs-selector-class">.one</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.two</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.new</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiC5H?w=402&amp;h=192" src="https://static.alili.tech/img/bVbiC5H?w=402&amp;h=192" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>这篇文章简单的介绍了BFC特点和举例了BFC的常用方法，如果有错误或不严谨的地方，欢迎批评指正，如果喜欢，欢迎点赞收藏<br>最后，打个小广告：阿里云双十一云服务新用户一折优惠<a href="https://m.aliyun.com/act/team1111/#/share?params=N.EN2hxhpNQG.filo4mgn" rel="nofollow noreferrer" target="_blank">车票</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习CSS中的BFC

## 原文链接
[https://segmentfault.com/a/1190000016794187](https://segmentfault.com/a/1190000016794187)

