---
title: '小而合理的前端理论：rscss和rsjs' 
date: 2019-01-28 2:30:09
hidden: true
slug: fl8qqhqdnmi
categories: [reprint]
---

{{< raw >}}

                    
<p>在前端开发中，我们会尝试去定一些规则和约定，来让项目质量更高，更易于维护。而对于这些规则和约定，我们也会希望它内容简单，容易理解。</p>
<p><strong><a href="http://rscss.io/" rel="nofollow noreferrer" target="_blank">rscss</a></strong>和<strong><a href="http://ricostacruz.com/rsjs/" rel="nofollow noreferrer" target="_blank">rsjs</a></strong>是一套比较新，也比较小巧的前端开发规则和约定，其中<code>rs</code>代表<code>Reasonable System</code>，所以可以理解为，追求“合理”的css和js。本文除了介绍它们，还会有一点补充以及我自己的看法，也推荐你点击链接阅读原作者给出的完整内容。</p>
<h2 id="articleHeader0">从css的疑问开始</h2>
<p>rscss希望有效地改善写css中的这样几个常见问题（<del>css哲学三问</del>）：</p>
<ul>
<li><p>这个class到底什么意思？</p></li>
<li><p>这个class还有地方用到吗？</p></li>
<li><p>我新写的这个class，会有冲突吗？</p></li>
</ul>
<h2 id="articleHeader1">组件原则</h2>
<p>rscss首先推崇的是以<strong>组件</strong>（<strong>Components</strong>）为基础的思考方式。在各类前端框架中，几乎都可以看到组件，如<a href="https://v4-alpha.getbootstrap.com/" rel="nofollow noreferrer" target="_blank">Bootstrap</a>和<a href="http://materializecss.com/" rel="nofollow noreferrer" target="_blank">Materialize</a>：</p>
<p><span class="img-wrap"><img data-src="/img/bVIi2f?w=500&amp;h=293" src="https://static.alili.tech/img/bVIi2f?w=500&amp;h=293" alt="前端框架里的组件" title="前端框架里的组件" style="cursor: pointer; display: inline;"></span></p>
<p>一个组件是这样的感觉：</p>
<p><span class="img-wrap"><img data-src="/img/bVIi2g?w=570&amp;h=120" src="https://static.alili.tech/img/bVIi2g?w=570&amp;h=120" alt="组件" title="组件" style="cursor: pointer;"></span></p>
<p>小到一个按钮，大到整个web应用，可见的视觉元素都可以这样当做一个组件。</p>
<h3 id="articleHeader2">组件的命名</h3>
<p>rscss推荐组件<strong>至少使用两个单词</strong>的命名，中间用短横线（<code>-</code>）连接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".search-form { /* ... */ }
.article-card { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.search-form</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.article-card</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<h2 id="articleHeader3">组件的元素</h2>
<p>组件内部的更细小的部分，当做组件的<strong>元素</strong>（<strong>Elements</strong>）。</p>
<p><span class="img-wrap"><img data-src="/img/bVIi24?w=418&amp;h=129" src="https://static.alili.tech/img/bVIi24?w=418&amp;h=129" alt="组件的元素" title="组件的元素" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">元素的命名</h3>
<p>为了和前面的组件区分开来，元素的命名<strong>只使用一个单词</strong>。</p>
<p>显然，只有一个单词是很容易冲突的，因此rscss建议以关系选择符把元素和组件关联起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".search-form > .field { /* ... */ }
.search-form > .action { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.search-form</span> &gt; <span class="hljs-selector-class">.field</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.search-form</span> &gt; <span class="hljs-selector-class">.action</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>推荐子选择符 <code>&gt; </code> 而不是包含选择符 <code>(空格)</code>，以更好地避免冲突：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".article-card .title { /* okay */ }
.article-card > .author { /* ✓ better */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.article-card</span> <span class="hljs-selector-class">.title</span> { <span class="hljs-comment">/* okay */</span> }
<span class="hljs-selector-class">.article-card</span> &gt; <span class="hljs-selector-class">.author</span> { <span class="hljs-comment">/* ✓ better */</span> }</code></pre>
<p>如果确实需要用到多个单词，直接连接它们（不使用短横线等分隔符），以体现区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".profile-box > .firstname { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.profile-box</span> &gt; <span class="hljs-selector-class">.firstname</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>为每一个组件的元素使用class名，不要使用标签选择符。有名字的元素会更有语义。</p>
<h2 id="articleHeader5">多种属性或状态</h2>
<p>无论是组件还是元素，都可以有多种<strong>属性或状态</strong>（<strong>Variants</strong>，也可以叫变体）：</p>
<p><span class="img-wrap"><img data-src="/img/bVIi3f?w=570&amp;h=169" src="https://static.alili.tech/img/bVIi3f?w=570&amp;h=169" alt="可变的属性或状态" title="可变的属性或状态" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">属性或状态的命名</h3>
<p><strong>使用短横线（<code>-</code>）开头</strong>来命名表示属性或状态的class。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* component variants */
.like-button.-wide { /* ... */ }
.like-button.-disabled { /* ... */ }

/* element variants */
.shopping-card > .title.-small { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* component variants */</span>
<span class="hljs-selector-class">.like-button</span><span class="hljs-selector-class">.-wide</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.like-button</span><span class="hljs-selector-class">.-disabled</span> { <span class="hljs-comment">/* ... */</span> }

<span class="hljs-comment">/* element variants */</span>
<span class="hljs-selector-class">.shopping-card</span> &gt; <span class="hljs-selector-class">.title</span><span class="hljs-selector-class">.-small</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<h3 id="articleHeader7">对命名方式的解释</h3>
<p>rscss推荐的短横线作为前缀的class名可能会让你有一点惊讶，可以这样写的吗？答案是的确可以，而且搭配得还相当巧妙。为什么这么说呢？请看<a href="https://www.w3.org/TR/CSS22/syndata.html#characters" rel="nofollow noreferrer" target="_blank">w3c对css标识符的解释</a>：</p>
<blockquote><p>In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+0080 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit.</p></blockquote>
<p>其中ISO 10646等同于Unicode。可以看到，w3c特意在css标识符一般使用的英文字母、数字以及一部分Unicode字符（U+0080以上）之外，提到了短横线（<code>-</code>）和下划线（<code>_</code>）也是可用的。</p>
<p>以短横线作为前缀的class名相当于有了一个特殊的标记，一眼就可以提醒你这是一个表示属性或状态的class。</p>
<h2 id="articleHeader8">组件嵌套</h2>
<p>组件是可以嵌套的。</p>
<p><span class="img-wrap"><img data-src="/img/bVIi3g?w=567&amp;h=120" src="https://static.alili.tech/img/bVIi3g?w=567&amp;h=120" alt="嵌套组件" title="嵌套组件" style="cursor: pointer;"></span></p>
<p>对应html类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;article-link&quot;>
  <div class=&quot;vote-box&quot;>
    ...
  </div>
  <h3 class=&quot;title&quot;>...</h3>
  <p class=&quot;meta&quot;>...</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article-link"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vote-box"</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"meta"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader9">嵌套中的属性或状态</h3>
<p>当一个组件位于另一个组件内部的时候，可能会想要这个组件表现得特别一点。这个时候，建议不要使用关系选择符把它们耦合在一起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".article-header > .vote-box > .up { /* ✗ avoid this */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.article-header</span> &gt; <span class="hljs-selector-class">.vote-box</span> &gt; <span class="hljs-selector-class">.up</span> { <span class="hljs-comment">/* ✗ avoid this */</span> }</code></pre>
<p>建议的做法是为组件增加一个属性或状态class：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;article-header&quot;>
  <div class=&quot;vote-box -highlight&quot;>
    ...
  </div>
  ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article-header"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vote-box -highlight"</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后以这个class为基础来定义特别的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vote-box.-highlight > .up { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.vote-box</span><span class="hljs-selector-class">.-highlight</span> &gt; <span class="hljs-selector-class">.up</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>这样做的目的是让一个组件的样式不依赖其所处的位置。OOCSS的原则之一，Separate container and content，也是这样的理念。</p>
<h2 id="articleHeader10">布局思想</h2>
<p>rscss推荐除一些具有固定宽高的特定元素（如头像，logo）外，<br>组件本身不定义任何影响布局位置的属性：</p>
<ul>
<li><p>定位（<code>position</code>、<code>top</code>、<code>left</code>、<code>right</code>、<code>bottom</code>）</p></li>
<li><p>浮动（<code>float</code>、<code>clear</code>）</p></li>
<li><p>外边距（<code>margin</code>）</p></li>
<li><p>尺寸（<code>width</code>、<code>height</code>）</p></li>
</ul>
<p>这样做的意思是说，如果把组件看做一个整体，它应该是自适应的。</p>
<h3 id="articleHeader11">需要定义布局位置属性的情况</h3>
<p>如果要定义组件的影响布局位置的属性，建议使用关系选择符把组件和它所处的环境关联起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".article-list > .article-card {
    width: 33.3%;
    float: left;
}

.article-card { /* ... */ }
.article-card > .image { /* ... */ }
.article-card > .title { /* ... */ }
.article-card > .category { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.article-list</span> &gt; <span class="hljs-selector-class">.article-card</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">33.3%</span>;
    <span class="hljs-attribute">float</span>: left;
}

<span class="hljs-selector-class">.article-card</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.article-card</span> &gt; <span class="hljs-selector-class">.image</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.article-card</span> &gt; <span class="hljs-selector-class">.title</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.article-card</span> &gt; <span class="hljs-selector-class">.category</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>在上面这段代码可以注意到，“组件本身的外观”与“组件在某一环境中的位置”被明确地分离了。</p>
<h2 id="articleHeader12">辅助类</h2>
<p>rscss推荐<strong>辅助类</strong>（<strong>Helpers</strong>）单独存放一个文件，且class名<strong>以下划线（<code>_</code>）开头</strong>。辅助类也常会用到<code>!important</code>，对应的，应尽可能少使用辅助类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="._pull-left { float: left !important; }
._pull-right { float: right !important; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">._pull-left</span> { <span class="hljs-attribute">float</span>: left <span class="hljs-meta">!important</span>; }
<span class="hljs-selector-class">._pull-right</span> { <span class="hljs-attribute">float</span>: right <span class="hljs-meta">!important</span>; }</code></pre>
<p>下划线（<code>_</code>）作为前缀的class名，如前文已经解释过的那样，也是作为一个特殊的标记提醒你这是一个辅助类，请谨慎使用它。</p>
<p>辅助类在前端框架中也很常见。</p>
<h2 id="articleHeader13">rscss与其他css理论的比较</h2>
<p>rscss的组件（Component），元素（Element）等概念，在BEM、SMACSS这些css理论中也有类似的存在。它们比较起来是这样的：</p>
<table>
<thead><tr>
<th>RSCSS</th>
<th>BEM</th>
<th>SMACSS</th>
</tr></thead>
<tbody>
<tr>
<td>Component</td>
<td>Block</td>
<td>Module</td>
</tr>
<tr>
<td>Element</td>
<td>Element</td>
<td>Sub-Component</td>
</tr>
<tr>
<td>Layout</td>
<td>?</td>
<td>Layout</td>
</tr>
<tr>
<td>Variant</td>
<td>Modifier</td>
<td>Sub-Module &amp; State</td>
</tr>
</tbody>
</table>
<p>关于BEM、SMACSS以及前文出现过的OOCSS的介绍，可以参考以前的<a href="http://acgtofe.com/posts/2014/09/valuable-theories-of-css" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</p>
<p>以上就是rscss的主要内容了，下面来看看rsjs。</p>
<h2 id="articleHeader14">关注传统web应用的rsjs</h2>
<p>rsjs关注的是非单页应用（non-SPA web application），也就是我们通常理解的有很多页，主要使用jQuery，而且每个页都可以有自己的<code>.js</code>文件的传统网站。</p>
<p>现在已经有了可遵循的JavaScript代码本身的<a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">风格指南</a>，因此，rsjs只对一些其他的要点提出建议，如命名空间，文件组织方式。</p>
<h2 id="articleHeader15">行为原则</h2>
<p>rsjs推荐把由JavaScript实现的交互功能当做一次只影响一个组件（Component）的行为（Behavior）。下面是一个参考示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Component -->
<div class=&quot;main-navbar&quot; data-js-collapsible-nav>
  <button class=&quot;expand&quot; data-js-expand>Expand</button>

  <a href=&quot;/&quot;>Home</a>
  <ul>...</ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-navbar"</span> <span class="hljs-attr">data-js-collapsible-nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"expand"</span> <span class="hljs-attr">data-js-expand</span>&gt;</span>Expand<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Behavior - behaviors/collapsible-nav.js */

$(function () {
  var $nav = $(&quot;[data-js-collapsible-nav]&quot;);
  if (!$nav.length) return;

  $nav
    .on(&quot;click&quot;, &quot;[data-js-expand]&quot;, function () {
      $nav.addClass(&quot;-expanded&quot;);
    })
    .on(&quot;mouseout&quot;, function () {
      $nav.removeClass(&quot;-expanded&quot;);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* Behavior - behaviors/collapsible-nav.js */</span>

$(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> $nav = $(<span class="hljs-string">"[data-js-collapsible-nav]"</span>);
  <span class="hljs-keyword">if</span> (!$nav.length) <span class="hljs-keyword">return</span>;

  $nav
    .on(<span class="hljs-string">"click"</span>, <span class="hljs-string">"[data-js-expand]"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      $nav.addClass(<span class="hljs-string">"-expanded"</span>);
    })
    .on(<span class="hljs-string">"mouseout"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      $nav.removeClass(<span class="hljs-string">"-expanded"</span>);
    });
});</code></pre>
<p>这其中包含了多项建议。</p>
<h3 id="articleHeader16">使用data属性</h3>
<p>建议使用html5的data自定义属性<code>data-js-___</code>来标记和一个行为有关的DOM元素。</p>
<p>相比用ID和class来选取元素，这种data属性的形式一方面更具有明确的意义，提醒你这是一个和交互行为有关的元素，另一方面更易于复用，在任何DOM结构里添加这样的data属性即可获得对应的行为。</p>
<h3 id="articleHeader17">为每个行为单独建立文件</h3>
<p>建议每一个行为对应的JavaScript代码都分离到单独的文件里，并以文件名明示。文件名可以参照<code>data-js-___</code>这个属性名里的对应名称，这样，根据属性名就很容易找到对应的JavaScript代码。</p>
<p>一个可能的文件目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└── javascripts/
    └── behaviors/
            ├── collapsible-nav.js
            ├── avatar-hover.js
            ├── popup-dialog.js
            └── notification.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>└── javascripts/
    └── behaviors/
            ├── collapsible-<span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.js</span>
            ├── avatar-hover<span class="hljs-selector-class">.js</span>
            ├── popup-dialog<span class="hljs-selector-class">.js</span>
            └── notification.js</code></pre>
<h3 id="articleHeader18">不使用行内JavaScript</h3>
<p>在html中不要以<code>&lt;script&gt;...&lt;/script&gt;</code>或<code>onclick=""</code>等形式添加行内JavaScript代码。通过保持行为的逻辑代码独立于html，可以使代码更易于维护。</p>
<p>从rsjs的内容来看，在已有React、Vue等库的今天，“行为独立于内容”的约定仍然对传统的以jQuery为主的Web应用有一定意义。</p>
<h3 id="articleHeader19">初始数据的获取方式</h3>
<p>传统Web站点的一个常见的场景是，后端语言在页面中预先输出某些数据，然后JavaScript会取用它们。你可能见到过下面这样<code>&lt;script&gt;</code>标签的实现方式，但显然，根据上一条建议，这是应避免的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ✗ Avoid -->
<script>
window.UserData = { email: &quot;john@gmail.com&quot;, id: 9283 }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- ✗ Avoid --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">window</span>.UserData = { <span class="hljs-attr">email</span>: <span class="hljs-string">"john@gmail.com"</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">9283</span> }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>rsjs建议的方案是，如果这些数据只需要一个组件使用，可以利用之前提到的data属性（保存为值），由行为的JavaScript代码来自行取出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ✓ Used by the user-info behavior -->
<div class=&quot;user-info&quot; data-js-user-info='{&quot;email&quot;:&quot;john@gmail.com&quot;,&quot;id&quot;:9283}'>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!-- ✓ Used by the user-info behavior --&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-info"</span> <span class="hljs-attr">data-js-user-info</span>=<span class="hljs-string">'{"email":"john@gmail.com","id":9283}'</span>&gt;</span></span></code></pre>
<p>如果是多个组件使用的数据，可以使用<code>&lt;head&gt;</code>里的meta标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  ...
  <!-- option 1 -->
  <meta property=&quot;app:user_data&quot; content='{&quot;email&quot;:&quot;john@gmail.com&quot;,&quot;id&quot;:9283}'>

  <!-- option 2 -->
  <meta property=&quot;app:user_data:email&quot; content=&quot;john@gmail.com&quot;>
  <meta property=&quot;app:user_data:id&quot; content=&quot;9283&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  ...
  <span class="hljs-comment">&lt;!-- option 1 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"app:user_data"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">'{"email":"john@gmail.com","id":9283}'</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- option 2 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"app:user_data:email"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"john@gmail.com"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"app:user_data:id"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"9283"</span>&gt;</span></code></pre>
<h2 id="articleHeader20">命名空间</h2>
<p>rsjs建议使用尽可能少的全局变量。共用的类，函数，放到单个Object里，比如叫<code>App</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!window.App) window.App = {};

App.Editor = function() {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.App) <span class="hljs-built_in">window</span>.App = {};

App.Editor = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<p>在多个行为之间可复用的帮助方法，可以单独建立Object，并将它们分文件保存在<code>helpers/</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* helpers/format_error.js */
if (!window.Helpers) window.Helpers = {};

Helpers.formatError = function (err) {
  return &quot;&quot; + err.project_id + &quot; error: &quot; + err.message;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* helpers/format_error.js */</span>
<span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.Helpers) <span class="hljs-built_in">window</span>.Helpers = {};

Helpers.formatError = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">""</span> + err.project_id + <span class="hljs-string">" error: "</span> + err.message;
};</code></pre>
<h2 id="articleHeader21">第三方库的处理</h2>
<p>rsjs建议如果引入第三方库，也做成组件行为的形式。比如，<a href="https://github.com/select2/select2" rel="nofollow noreferrer" target="_blank">Select2</a>的功能，可以只影响带有属性<code>data-js-select2</code>的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// select2.js -- affects `[data-js-select2]`
$(function () {
  $(&quot;[data-js-select2]&quot;).select2();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// select2.js -- affects `[data-js-select2]`</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">"[data-js-select2]"</span>).select2();
});</code></pre>
<p>所有第三方库的代码可以集中到一个类似<code>vendor.js</code>的文件，并和站点本身的代码各自独立。这样，当站点更新代码的时候，用户可以直接利用缓存，而并不需要再次获取这些第三方库代码。</p>
<h3 id="articleHeader22">rsjs对自己的归纳</h3>
<p>rsjs认为自身的内容更偏向于对开发者友好，也就是更易于维护，而在性能上（对用户友好）可能没有做到最好。以上提到的各项建议，也是有利有弊，rsjs只是在权衡了利弊的基础上得到的更利于长期维护的结论。</p>
<p>rsjs不是万金油，它不适用于单页应用（SPA）等前端功能很复杂的情况。它关注的是的那种多个网页，每个网页一点JavaScript交互的传统网站。</p>
<h2 id="articleHeader23">结语</h2>
<p>rscss和rsjs所用的“合理”是一个很取巧的表述，不是完美，不是最好，也不是出色，它只是在说希望代码能“合乎道理”。rscss和rsjs大概就是这样，以简约的风格，不长的篇幅，追求着“小而合理”。</p>
<p>目前rsjs还在更新中（work-in-progress），rscss则已经比较成熟。很推荐试试其中你也认为合理的建议！</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2017/01/reasonable-system-for-css-and-js" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2017...</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小而合理的前端理论：rscss和rsjs

## 原文链接
[https://segmentfault.com/a/1190000008137332](https://segmentfault.com/a/1190000008137332)

