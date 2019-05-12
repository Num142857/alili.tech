---
title: '[译]HTML&CSS Lesson4: 盒子模型' 
date: 2019-01-05 2:30:11
hidden: true
slug: zzk4vywv66h
categories: [reprint]
---

{{< raw >}}

                    
<p>现在我们已经熟悉了HTML和CSS。了解了它的基础。现在我们来更深入的了解元素在页面中的呈现和大小。</p>
<p>在这节课中，我们将会讨论什么是盒子模型，它的工作模式是怎样的。我们也会在课程中学习一些新的CSS属性，并且将介绍三种长度单位。</p>
<h1 id="articleHeader0">元素是如何显示的</h1>
<p>在了解盒子模型之前，我们先来了解一下元素是如何显示的。在第二节课中，我们学习了块状元素和内联元素的差异。快速回顾一下，块状元素会另起一行，并占据所有可用的宽度，不管内容有没有。而内联元素会并排显示，宽度紧随内容变化而变化。块状元素通常用在大块的内容上，例如标题，结构元素。内联元素用在小块的内容上，比如将几句话加粗或斜体显示。</p>
<h2 id="articleHeader1">display属性</h2>
<p>元素如何显示——例如块状元素，内联元素和其他元素——都由显示属性<code>display</code>决定。每个元素都有一个默认的<code>display</code>属性值。和其他属性值一样，这个属性值是可以被覆盖的。<code>display</code>值有很多，其中最常用的是<code>block</code>，<code>inline</code>，<code>line-block</code>和<code>none</code>。</p>
<p>我们可以通过CSS选中元素并改变和重新声明元素的<code>display</code>属性值。 若值为<code>block</code>可以使元素成为块状元素显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  display: block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">display</span>: block;
}</code></pre>
<p>将值设置为<code>inline</code>，可以将元素转化为内联元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  display: inline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">display</span>: inline;
}</code></pre>
<p><code>inline-block</code>比较有意思，它可以使元素的所有块状元素的属性生效。但元素又按照内联元素显示，不会另起一行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<hr>
<p><em><a>两个内嵌块元素间的空隙</a></em></p>
<p><code>inline-block</code>内嵌块元素有个重要的点，就是它们并非是首尾相接的。两个内嵌块元素之间存在小空隙。这个空隙虽然很恼人，但这是正常现象。我们会讨论为什么这个空隙存在，以及怎么消除。</p>
<hr>
<p>最后是<code>none</code>属性值，会完全隐藏元素，页面渲染的时候会当它不存在。任何被包裹在这个属性值元素内的元素都会被隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<p>了解元素如何显示，以及怎么修改<code>display</code>属性非常重要，因为它会影响盒子模型的呈现效果。讨论盒子模型的时候，我们会知道他们之间的差别，意义和影响。</p>
<h1 id="articleHeader2">什么是盒子模型？</h1>
<p>根据盒子模型的概念，每个在页面上的元素都是一个拥有宽，高，内边距，边框和外边距的长方形盒子。</p>
<p>页面上每个元素都符合盒子模型的定义，所以它非常重要。我们使用一些新的CSS属性来来熟悉它。</p>
<h1 id="articleHeader3">使用盒子模型</h1>
<p>每个元素都是一个长方形盒子，有几个属性能确定这个盒子的大小。盒子的核心属性是元素的宽高，这两个值可能是由元素的<code>display</code>属性、元素的内容或具体的<code>width</code>，<code>height</code>属性值生成的。内边距<code>padding</code>和边框<code>border</code>拓展了元素的高宽。最后是我们定义的在边框外的外边距<code>margin</code>。</p>
<p>盒子模型对应的CSS属性为:<code>width</code>，<code>height</code>，<code>padding</code>，<code>border</code>，<code>margin</code>。</p>
<p>我们来看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border: 6px solid #949599;
  height: 100px;
  margin: 20px;
  padding: 20px;
  width: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">6px</span> solid <span class="hljs-number">#949599</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<p>根据盒子模型，元素的总宽度计算如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin-right + border-right + padding-right + width + padding-left + border-left + margin-left" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">margin-right</span> + <span class="hljs-attribute">border-right</span> + <span class="hljs-attribute">padding-right</span> + <span class="hljs-attribute">width</span> + <span class="hljs-attribute">padding-left</span> + <span class="hljs-attribute">border-left</span> + <span class="hljs-attribute">margin-left</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRWwH?w=1384&amp;h=568" src="https://static.alili.tech/img/bVRWwH?w=1384&amp;h=568" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>使用上述公式，就能算出示例中的高宽值</p>
<ul>
<li>
<strong>Width</strong>：492px = 20px + 6px + 20px + 400px + 20px + 6px + 20px</li>
<li>
<strong>Height</strong>：192px = 20px + 6px + 20px + 100px + 20px + 6px + 20px</li>
</ul>
<p>毫无疑问盒子模型是HTML和CSS很容易混淆的部分之一。<br>我们将<code>width</code>的值设置为<code>400</code>像素，但元素的实际宽度为<code>492</code>像素。默认情况下，盒子模型是加法。因此想要确定盒子的实际大小，我们需要考虑将四面的内边距，边框，外边距都考虑进去。宽度不仅仅是<code>width</code>属性的值，也要加上左右两侧的内边距，边框和外边距。</p>
<p>到目前为止，上述属性看着没什么实际意义。因为这只是为了澄清所有形成盒子模型的属性：<code>width</code>，<code>height</code>，<code>padding</code>，<code>border</code>和 <code>margin</code>。</p>
<h2 id="articleHeader4">宽度和高度</h2>
<p>每个元素都有默认的高度和宽度。虽然宽度和高度都有可能是<code>0</code>像素，但默认情况下，浏览器会渲染每个元素的大小。元素的默认宽度和高度依赖于元素是怎么显示的。如果元素是页面布局的关键元素。那么它就需要设置具体的<code>width</code>和<code>height</code>属性值。这种情况下，只能指定非内联元素的属性值。</p>
<p><strong>宽度</strong></p>
<p>元素的默认宽度依赖于它<code>display</code>属性的值。块状元素的默认宽度为<code>100%</code>，占据整行空间。内联元素和内嵌块元素的宽度都随着元素的内容变化而变化。内联元素不具备固定的大小，所以<code>width</code>和<code>height</code>属性只有在非内联元素上才能生效。如下是为非内联元素设置宽度的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  width: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<p><strong>高度</strong></p>
<p>元素的默认高度取决于它的内容。元素根据内容需要进行垂直扩展或收缩。我们可以使用<code>height</code>属性为非内联元素设置高度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  height: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<hr>
<p><em><a>调整内联元素</a></em><br>请记住内联元素不支持<code>width</code>和<code>height</code>属性和与其相关的值。块状元素和内嵌块元素支持<code>width</code>和<code>height</code>属性和与其对应的值。</p>
<hr>
<h2 id="articleHeader5">外边距和内边距</h2>
<p>浏览器会根据元素设置其默认的外边距和内边距，使其更清晰易读。我们使用基于文本的元素来看一下这个现象。不同浏览器和不同元素之间的默认外边距和内边距可能存在差异。我们在第一课中有讨论过<a href="https://segmentfault.com/a/1190000010338180#articleHeader18">CSS重置</a>,将这些差别调低，或使其为零。这样我们就可以从头开始定义我们需要的样式。</p>
<p><strong>外边距</strong></p>
<p><code>margin</code>属性设置一个元素的周围空间大小。外边距在元素边框外并且是完全透明的。外边距可以帮助我们将元素定位在页面的特定位置，并且可以与其他元素保持距离。 示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  margin: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p><code>margin</code>有一个特殊的现象，就是在内联元素中垂直外边距<code>margin-top</code>和<code>margin-bottom</code>不生效，在块状元素和内嵌块元素中有效。</p>
<p><strong>内边距</strong></p>
<p><code>padding</code>属性和<code>margin</code>属性相似，只不过它在边框内部，<code>padding</code>是为元素提供内部空间。示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  padding: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p><code>padding</code>属性和<code>margin</code>属性不一致的地方是垂直内边距在内联元素中同样有效；虽然垂直内边距显示在元素基准线之上或之下，但是它确实是存在的。</p>
<hr>
<p><em><a>内联元素的外边距和内边距</a></em><br>内联元素对内边距和外边距的实现和块状元素与内嵌块元素不同。外边距只有横向<code>margin-left</code>和<code>margin-right</code>有效。内边距在内联元素中完全生效，但是垂直内边距<code>padding-top</code>和<code>padding-bottom</code>在元素基准线上面或下面显示(译者注：内联元素加上垂直内边距之后，元素内部的内容部分在视觉上没有产生偏移)。</p>
<p>块状元素和内嵌块元素的外边距和内边距的显示是正常的。</p>
<hr>
<p><strong>外边距和内边距的声明方式</strong></p>
<p>在CSS中，很多属性都有多种声明方法。普通的写法，就是一个属性一个值，一个个地列出来。但我们也可以使用简写，一个属性包含多个值。不是所有的属性都有简写，所以我们必须确保写出的属性和值的结构是正确的。</p>
<p><code>margin</code>和<code>padding</code>有普通和简写两种书写方式。当元素四面设置相同的外边距时，可以使用<code>margin</code>属性，并只指定一个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  margin: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>如果上下外边距的值一致，左右外边距的值一致，我们可以输入两个值。 设置上下外边距的值在前面。以下例子将上下外边距设置为<code>10</code>像素，将左右外边距设置为<code>20</code>像素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  margin: 10px 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">20px</span>;
}</code></pre>
<p>如果四个值都不一致，那么我们按照 <em>上右下左</em> 的顺序输入值。例如，我们为<code>div</code>设置<code>10</code>像素的顶部外边距，<code>20</code>像素的右侧外边距，<code>0</code>像素的底部外边距，以及<code>15</code>像素的左侧外边距：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  margin: 10px 20px 0 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">15px</span>;
}</code></pre>
<p>若我们要设置多个值，优先考虑用<code>margin</code>和<code>padding</code>。但我们也可以用普通写法，输入一一对应的属性和值。每个属性名（该例子中是外边距和内边距）后跟随一个破折号<code>-</code>以及要设置值的盒子的方向：<code>top</code>，<code>bottom</code>，<code>right</code>和<code>left</code>。<br>例如，<code>padding-left</code>属性只接受一个值，设置元素的左侧内边距；<code>margin-top</code>只接受一个值，设置元素的顶部外边距。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  margin-top: 10px;
  padding-left: 6px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">6px</span>;
}</code></pre>
<p>当我们只想设置单边的<code>margin</code>和<code>padding</code>值时，这种普通写法是最好的选择。保持代码的精确性可以防止出现混淆。例如，我们是否只想将元素的上右左三侧的外边距设为<code>0</code>，是否只想将底部外边距设为<code>10</code>像素？<br>普通写法输入属性和值可以让目标更明确。当处理三个或以上的值时，缩写更有帮助。</p>
<hr>
<p><em><a>外边距和内边距的颜色</a></em><br><code>margin</code>和<code>padding</code>属性是完全透明的，不可以设置颜色。但因为是透明的，所以透出了相关元素的背景色。元素外边距部分看到的颜色为它父级元素的背景色。元素内边距部分看到的颜色为该元素的背景色。</p>
<hr>
<h2 id="articleHeader6">边框</h2>
<p>边框在内边距和外边距之间，画出了元素轮廓。<code>border</code>属性要求三个值：宽度，样式，颜色。边框属性简写时值的顺序为：宽度，样式，颜色。普通书写方式下，边框的三个属性名为：<code>border-width</code>，<code>border-style</code>和<code>border-color </code>。普通书写方式因为是单个值，更容易修改和复写。</p>
<p>边框的宽度和颜色能分别使用第三节课中讨论过的长度单位和色值。</p>
<p>边框有很多<a href="https://www.quackit.com/html/codes/html_borders.cfm" rel="nofollow noreferrer" target="_blank">不同样式</a>。最常用的样式值为<code>solid</code>，<code>dashed</code>，<code>dotted</code>和<code>none</code>，但你可以在列表中看到很多其他的样式。</p>
<p>以下是边框设置示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border: 6px solid #949599;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">6px</span> solid <span class="hljs-number">#949599</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVR0a9?w=622&amp;h=152" src="https://static.alili.tech/img/bVR0a9?w=622&amp;h=152" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>单侧边框</strong></p>
<p>和<code>margin</code>，<code>padding</code>属性一样，也可以一次只设置元素一个方向的边框。使用属性名：<code>border-top</code>， <code>border-right</code>，<code>border-bottom</code>和<code>border-left</code>。它们的属性值和<code>border</code>的属性值一样有三个：宽度，样式和颜色。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border-bottom: 6px solid #949599;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">6px</span> solid <span class="hljs-number">#949599</span>;
}</code></pre>
<p>另外，单侧边框的样式也可以被细分，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border-bottom-width: 12px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border-bottom-width</span>: <span class="hljs-number">12px</span>;
}</code></pre>
<p>这些高度细分的边框属性名都由连字符分隔，由border单词开头，随后是边框的方向：<code>top</code>，<code>right</code>，<code>bottom</code>，<code>left</code>，最后是要设置的样式：<code>width</code>，<code>style</code>，<code>color</code>。</p>
<p><strong>border-radius</strong></p>
<p><code>border-radius</code>可以使元素的边角变圆。</p>
<p><code>border-radius</code>接受多种长度单位，如百分比，像素，确定元素边角变圆的半径。单个值表示四个角的弧度一直，两个值按分别表示<code>top-left</code>/<code>bottom-right</code>和<code>top-right</code>/<code>bottom-left</code>，输入四个值按顺序分别表示：<code>top-left</code>，<code>top-right</code>，<code>bottom-right</code>和<code>bottom-left</code>。</p>
<p>思考<code>border-radius</code>多个值的顺序时(包括<code>margin</code>和<code>padding</code>)，记住它们是从左上角开始（<code>margin</code>和<code>padding</code>从上侧开始）按顺时针方向排序的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border-radius: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVR0Hm?w=489&amp;h=134" src="https://static.alili.tech/img/bVR0Hm?w=489&amp;h=134" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><code>border-radius</code>属性也允许我们使用普通方法书写单个属性值。这些普通的属性以<code>border</code>单词开通，跟着是边角的垂直位置(<code>top</code>或<code>bottom</code>),再是边角的横向位置(<code>left</code>或<code>right</code>)，最后是半径<code>radius</code>。例如，要设置<code>&lt;div&gt;</code>右上角的边角半径，可以使用<code>border-top-right-radius</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  border-top-right-radius: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<h2 id="articleHeader7">box-sizing</h2>
<p>现在，在盒子模型中有一个附加属性。如果你设置了元素的<code>width</code>为<code>400</code>像素，并将<code>padding</code>设置为<code>20</code>像素，将<code>border</code>设置为<code>10</code>像素，那么实际的盒子宽度为<code>460</code>像素。记住，盒子的宽度是<code>width</code>,<code>padding</code>和<code>border</code>相加获得的。</p>
<p>但是在CSS3中，盒子模型有了一个不一样的计算方式。CSS3推出了<code>box-sizing</code>属性，完全改变了盒子模型的运作模式和元素大小的计算方式。这个属性有三个主要值——<code>content-box</code>，<code>padding-box</code>和 <code>border-box</code>——每个值对盒子模型大小的计算稍微有些不一样。</p>
<p><strong>content-box</strong></p>
<p><code>content-box</code>这个属性值是默认值。这个默认值和元素不加<code>box-sizing</code>属性时的效果是一致的。元素从<code>width</code>和<code>height</code>属性的值开始计算，加上<code>padding</code>，<code>border</code>和<code>margin</code>属性值获得盒子的实际尺寸。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">-webkit-box-sizing</span>: content-box;
     <span class="hljs-attribute">-moz-box-sizing</span>: content-box;
          <span class="hljs-attribute">box-sizing</span>: content-box;
}</code></pre>
<hr>
<p><em><a>特定浏览器的属性和值</a></em></p>
<p>上例中<code>box-sizing</code>属性前的连字符和字母是什么？</p>
<p>CSS3的推出后，浏览器逐步开始以加前缀的方式支持新属性和值，包括<code>box-sizing</code>属性。随着部分CSS规范被浏览器广泛支持以及浏览器版本的更新，前缀的作用也越来越小，随着时间的发展将不再是一个问题。但在老版本浏览器中还是不可或缺的。</p>
<p>属性名和属性值都可以添加前缀。例如，上例中的<code>box-sizing</code>属性名加了前缀。浏览器可以选择什么时候加前缀什么时候不加前缀，因此有些属性需要带有某浏览器的前缀，有些属性不需要。</p>
<p>接下来的课程中，若某个属性或值需要前缀，只会在介绍那个属性时添加使用（这有利于保持代码的简洁）。不过你们在实际写代码的时候不要忘记添加前缀。</p>
<p>最常见的几个浏览器前缀概括如下：</p>
<ul>
<li>Mozilla的火狐浏览器： <code>-moz-</code>
</li>
<li>微软的IE浏览器：<code>-ms-</code>
</li>
<li>Webkit（谷歌的Chrome浏览器和苹果的Safari浏览器）：<code>-webkit-</code>
</li>
</ul>
<hr>
<p><strong>padding-box</strong></p>
<p>属性值<code>padding-box</code>时，元素将<code>padding</code>属性值计算入<code>width</code>和<code>height</code>属性值内，改变了盒子模型计算模式。例如，元素的<code>width</code>设置为<code>400</code>像素，<code>padding</code>值设为<code>20</code>像素，最终元素实际的宽度还是<code>400</code>像素。随着内边距的扩大，元素的内容区域会随着缩小，但是盒子实际大小并未发生改变。</p>
<p>如果我们增加<code>border</code>或<code>margin</code>，那么盒子的大小就是这些属性值加上<code>width</code>和<code>height</code>的值。例如，我们将元素的的<code>width</code>设置为<code>400</code>像素，每个方向的<code>border</code>都设置为<code>10</code>像素，<code>padding</code>设置为<code>20</code>像素，那么元素的实际宽度就为<code>420</code>像素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  box-sizing: padding-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">box-sizing</span>: padding-box;
}</code></pre>
<hr>
<p><em><a>值 padding-box 已被弃用</a></em></p>
<p>随着CSS规范的更新，<code>box-sizing</code>的值<code>padding-box</code>已被弃用，我们不应再使用它。</p>
<hr>
<p><strong>Border Box</strong></p>
<p>最后一个属性值是<code>border-box</code>，它将<code>border</code>和<code>padding</code>都算在元素的<code>width</code>和<code>height</code>属性值内。例如，一个元素的<code>width</code>为<code>400</code>像素，每边的<code>padding</code>为<code>20</code>像素，<code>border</code>为<code>10</code>像素，最终元素的实际宽度仍然为<code>400</code>像素。<br>若我们还增加了<code>margin</code>属性，在获取盒子总大小时它的值需要做加法计算。不管<code>box-sizing</code>的属性值是什么， 计算盒子总大小时任何<code>margin</code>的值都需要做加法计入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
  box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVR5a0?w=1408&amp;h=592" src="https://static.alili.tech/img/bVR5a0?w=1408&amp;h=592" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>使用box-sizing属性</strong></p>
<p>通常来说，<code>box-sizing</code>最佳属性值为<code>border-box</code>,这个属性值更易计算。如果我们将一个元素的<code>width</code>为<code>400</code>像素，那么不管你增加了边框还是内边距，它的大小都还是<code>400</code>像素。</p>
<p>另外，我们也可以轻松的相对值。如果我们设置一个元素的宽度为<code>40%</code>，元素每边的<code>padding</code>值为<code>20</code>像素，<code>border</code>值为<code>10</code>像素。那么尽管有地方设置了像素值，元素盒子的实际大小仍然为<code>40%</code>。</p>
<p>唯一遗憾的是<code>box-sizing</code>是CSS3的属性，并不是所有浏览器都支持，尤其是老版本浏览器。所幸随着浏览器版本更新，影响会越来越小。我们使用<code>box-sizing</code>的时候，需要留意哪些浏览器会出现兼容问题。</p>
<h1 id="articleHeader8">开发者工具</h1>
<p>大多数浏览器都有<em>开发者工具</em>。我们可以使用这些工具查看页面上的元素、这些元素的HTML结构<br>和CSS属性及它们值。它们大部分都有盒子模型图解。</p>
<p>在Chrome浏览器中打开菜单栏，找到“更多工具”选项中的“开发者工具”选项并点击它，浏览器窗口的底部会显示出一个视窗，其中提供了一些代码检查工具。</p>
<p>悬停或点击视窗中的元素节点，可以查看这个元素的信息。</p>
<p>选中一个元素后，在视窗右侧选中“Computed”选项，我们就可以看到我们选中的元素的盒子模型。</p>
<p>Chrome， Firefox，Safari以及其他浏览器中都有开发者工具。查看源代码可以学到很多东西。我在编写HTML和CSS的时候通常都会打开开发者工具，也常常用它查看分析其他网站的源代码。</p>
<p><span class="img-wrap"><img data-src="/img/bVR5NY?w=1952&amp;h=671" src="https://static.alili.tech/img/bVR5NY?w=1952&amp;h=671" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader9">练习</h1>
<p>现在我们回到之前做的“样式讨论会”网站，并未它添加更多的内容。</p>
<ul><li>首先，在<code>main.css</code>文件中添加一个<code>box-sizing</code>属性，值设置为<code>border-box</code>，这样可以使我们的元素更容易控制。在文件的页面重置样式下，添加一条注释，有助于网站布局。把它放在样式重置代码之下，是使其放在正确的层叠关系上。<br>在这里，我们可以使用通配符选择器<code>*</code>，后面跟随带伪元素的选择器<code>*:before</code>和<code>*:after</code>,这样就可以选中页面中所有的元素，将其<code>box-sizing</code>值设置为<code>border-box</code>。请记住，<code>box-sizing</code>是有前缀的，因为它是一个较新的属性。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  ========================================
  Grid
  ========================================
*/

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*
  ========================================
  Grid
  ========================================
*/</span>

*,
*<span class="hljs-selector-pseudo">:before</span>,
*<span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
     <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
          <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<ul><li>接下来我们要创建一个可以作为我们元素容器的class属性。用它在不同的元素上设置共同的<code>width</code>，<code>padding</code>属性，并将元素居中。 在我们通配符选择器下，创建一个新的class选择器名为<code>container</code>。在选择器中将<code>width</code>设置为<code>960</code>像素，<code>padding-left</code>和<code>padding-right</code>设置为<code>30</code>像素，上下外边距设置为<code>0</code>，左右外边距设为<code>auto</code>。<br><code>container</code>告诉浏览器所有使用了这选择器的元素的宽度。左右外边距值设为<code>auto</code>，再加之设好的宽度值，可以让浏览器自动计算出左右相等的外边距，元素就相对于页面居中了。最后设置左右内边距，使内容不紧贴元于素的边缘，为内容提供一点喘息的空间。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 960px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">960px</span>;
}</code></pre>
<ul><li>现在<code>container</code>已经可以使用，我们把它添加到所有页面的<code>&lt;header&gt;</code>和<code>&lt;footer&gt;</code>元素上，所有页面包括<code>index.html</code>，<code>speakers.html</code>，<code>schedule.html</code>，<code>venue.html</code>以及<code>register.html</code>页面。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header class=&quot;container&quot;>...</header>

<footer class=&quot;container&quot;>...</footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<ul><li>接下来，我们将<code>container</code>添加到介绍会议的<code>&lt;session&gt;</code>元素和包含<code>&lt;section&gt;</code>作为子元素的`&lt;section&gt;元素上。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;container&quot;>...</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<ul><li>另外，也将<code>container</code>添加到其他页面中包含有<code>&lt;h1&gt;</code>元素的<code>&lt;section&gt;</code>元素上。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;container&quot;>
  <h1>...</h1>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;section <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/section&gt;</span></code></pre>
<ul>
<li>稍后我们还会再回来调整这些元素和class属性。现在我们先做另一件事。</li>
<li>现在我们的内容已经居中显示，接下来为元素创建纵向的间隔。我们先把标题和段落的底部外边距设置为<code>22</code>像素。我们将这个排版样式以及它的注释放在之前的容器样式之下。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  ========================================
  Typography
  ========================================
*/

h1, h3, h4, h5, p {
  margin-bottom: 22px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*
  ========================================
  Typography
  ========================================
*/</span>

<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">22px</span>;
}</code></pre>
<ul>
<li>我们在此跳过了<code>&lt;h2&gt;</code>和<code>&lt;h6&gt;</code>元素，因为设计中<code>&lt;h2&gt;</code>不需要外边距，<code>&lt;h6&gt;</code>这次我们不会用到。</li>
<li>现在我们在页面第一个<code>&lt;section&gt;</code>的底部放置一个按钮，并为其设置边框和圆角。<br>  我们先添加一个<code>&lt;a&gt;</code>元素，并将其的class属性值设为<code>btn</code>和<code>btn-alt</code>.</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a class=&quot;btn btn-alt&quot;>...</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-alt"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<ul>
<li>接下来我们在排版样式之下为这两个属性值添加样式。</li>
<li>首先创建一个能被所有按钮共享的样式的class选择器<code>btn</code>。我们希望所有的按钮的<code>border-radius</code>为<code>5</code>像素，<code>display</code>为<code>inline-block</code>，并移除所有外边距。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  ========================================
  Buttons
  ========================================
*/

.btn {
  border-radius: 5px;
  display: inline-block;
  margin: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*
  ========================================
  Buttons
  ========================================
*/</span>

<span class="hljs-selector-class">.btn</span> {
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}</code></pre>
<ul><li>我们使用<code>btn-alt</code>为当前按钮设置特殊的样式。我们增加1像素的灰色边框，并且设置上下内边距为<code>10</code>像素，左右内边距为<code>30</code>像素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn-alt {
  border: 1px solid #dfe2e5;
  padding: 10px 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn-alt</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#dfe2e5</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">30px</span>;
}</code></pre>
<ul>
<li>我们在同一<code>&lt;a&gt;</code>元素中使用了<code>btn</code>和<code>btn-alt</code>，那么相应的样式都会渲染上去。</li>
<li>在主页上，我们为包含上述<code>&lt;a&gt;</code>元素的<code>&lt;section&gt;</code>元素设置<code>padding</code>样式。我们通过在其上添加一个class属性值<code>hero</code>来实现。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;hero container&quot;>
  ...
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hero container"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<ul><li>最后，我们在CSS文件分隔出一块专门设置主页的样式，然后<code>hero</code>添加<code>padding</code>属性。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  ========================================
  Home
  ========================================
*/

.hero {
  padding: 22px 80px 66px 80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*
  ========================================
  Home
  ========================================
*/</span>

<span class="hljs-selector-class">.hero</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">22px</span> <span class="hljs-number">80px</span> <span class="hljs-number">66px</span> <span class="hljs-number">80px</span>;
}</code></pre>
<p>现在我们的网站更加完整了，尤其是主页。</p>
<p><span class="img-wrap"><img data-src="/img/bVR6Ay?w=1200&amp;h=853" src="https://static.alili.tech/img/bVR6Ay?w=1200&amp;h=853" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p><em><a>通配符选择器</a></em></p>
<p>在此练习的第一步，我们提到了通配符选择器<code>*</code>，它会选中所有的元素。相比于一一列出所有能想到的单个元素，不如使用它来选中所有的元素。</p>
<p>我们也在第一步中提到了伪元素<code>:before</code>和<code>:before</code>，它们可以在CSS中动态生成元素。我们不会当前项目中使用它。不过在通配符选择器中使用伪元素是很常用的做法。</p>
<hr>
<h2 id="articleHeader10">演示源代码</h2>
<p>这是练习的源代码。<a href="http://learn.shayhowe.com/practice/opening-the-box-model.zip" rel="nofollow noreferrer" target="_blank">点击下载</a></p>
<h1 id="articleHeader11">总结</h1>
<p>休息一下我们再继续。</p>
<p>将盒子模型所有内容学完并不容易。这些概念虽然只是简单介绍，却花了很多时间来掌握它。</p>
<p>这节课所学内容概括如下：</p>
<ul>
<li>元素是如何显示的</li>
<li>什么是盒子模型，它为什么很重要</li>
<li>怎么修改元素的大小，包括宽度和高度</li>
<li>怎么添加元素的外边距，内边距和边框</li>
<li>怎么修改元素box-sizing及其对盒子模型的影响</li>
</ul>
<p>现在我们对如何显示元素和设置尺寸有了更好的了解，接下来我们深入了解一下元素的定位。</p>
<h1 id="articleHeader12">文章来源</h1>
<p><a href="http://learn.shayhowe.com/html-css/opening-the-box-model/" rel="nofollow noreferrer" target="_blank">http://learn.shayhowe.com/htm...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]HTML&CSS Lesson4: 盒子模型

## 原文链接
[https://segmentfault.com/a/1190000010472976](https://segmentfault.com/a/1190000010472976)

