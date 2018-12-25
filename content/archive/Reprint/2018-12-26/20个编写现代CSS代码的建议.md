---
title: '20个编写现代CSS代码的建议' 
date: 2018-12-26 2:30:14
hidden: true
slug: l51ozjybts
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文翻译自<a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ftutorialzine.com%2F2016%2F08%2F20-protips-for-writing-modern-css%2F&amp;ref_src=twsrc%5Etfw&amp;text=20%20Protips%20For%20Writing%20Modern%20CSS&amp;tw_p=tweetbutton&amp;url=http%3A%2F%2Ftutorialzine.com%2F2016%2F08%2F20-protips-for-writing-modern-css%2F&amp;via=tutorialzine" rel="nofollow noreferrer" target="_blank">Danny Markov </a>的<a href="http://tutorialzine.com/2016/08/20-protips-for-writing-modern-css/" rel="nofollow noreferrer" target="_blank">20-Tips-For-Writing-Modern-CSS</a>一文。<br> 本文归纳于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>中<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices#bestpractices" rel="nofollow noreferrer" target="_blank">CSS入门与最佳实践</a>系列，其他的关于CSS样式指南的还有<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/css/advanced/bestpractices/codestyle/leveling-up-in-css.md" rel="nofollow noreferrer" target="_blank">提升你的CSS姿势</a>、<a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/css/advanced/bestpractices/codestyle/improving-css-quality-at-facebook-and-beyond.md" rel="nofollow noreferrer" target="_blank">Facebook里是怎样提升CSS代码质量的</a>。本文更偏向于样式使用技巧，前两篇偏向于代码风格与规范。</p></blockquote>
<h1 id="articleHeader0">明白何谓Margin Collapse</h1>
<p>不同于其他很多属性，盒模型中垂直方向上的Margin会在相遇时发生崩塌，也就是说当某个元素的底部Margin与另一个元素的顶部Margin相邻时，只有二者中的较大值会被保留下来，可以从下面这个简单的例子来学习:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".square {
    width: 80px;
    height: 80px;
}

.red {
    background-color: #F44336;
    margin-bottom: 40px;
}

.blue {
    background-color: #2196F3;
    margin-top: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.square</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
}

<span class="hljs-selector-class">.red</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F44336</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-class">.blue</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#2196F3</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<p>在上述例子中我们会发现，红色和蓝色方块的外边距并没有相加得到70px，而是只有红色的下外边距保留了下来。我们可以使用一些<a href="http://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing" rel="nofollow noreferrer" target="_blank">方法</a>来避免这种行为，不过建议来说还是尽量统一使用<code>margin-bottom</code>属性，这样就显得和谐多了。</p>
<h1 id="articleHeader1">使用Flexbox进行布局</h1>
<blockquote><p><a href="https://segmentfault.com/a/1190000004139009">CSS实战之Flex详解以及其在微信中的兼容实现</a></p></blockquote>
<p>在传统的布局中我们习惯使用Floats或者inline-blocks，不过它们更适合于格式化文档，而不是整个网站。而Flexbox则是专门的用于进行布局的工具。Flexbox模型允许开发者使用很多便捷可扩展的属性来进行布局，估计你一旦用上就舍不得了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    display: flex;
    /* Don't forget to add prefixes for Safari */display: -webkit-flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-comment">/* Don't forget to add prefixes for Safari */</span><span class="hljs-attribute">display</span>: -webkit-flex;
}</code></pre>
<p>我们已经在Tutorialzine上提供了很多的关于Flexbox的介绍与小技巧，譬如<a href="http://tutorialzine.com/2016/04/5-flexbox-techniques-you-need-to-know-about/" rel="nofollow noreferrer" target="_blank">5 Flexbox Techniques You Need to Know About</a>。</p>
<h1 id="articleHeader2">使用CSS Reset</h1>
<p>虽然这些年来随着浏览器的迅速发展与规范的统一，浏览器特性碎片化的情况有所改善，但是在不同的浏览器之间仍然存在着很多的行为差异。而解决这种问题的最好的办法就是使用某个CSS Reset来为所有的元素设置统一的样式，保证你能在相对统一干净的样式表的基础上开始工作。目前流行的Reset库有 <a href="http://necolas.github.io/normalize.css/" rel="nofollow noreferrer" target="_blank">normalize.css,</a> <a href="http://jgthms.com/minireset.css/" rel="nofollow noreferrer" target="_blank">minireset</a>以及 <a href="https://github.com/filipelinhares/ress" rel="nofollow noreferrer" target="_blank">ress</a> ，它们都可以修正很多已知的浏览器之间的差异性。而如果你不打算用某个外在的库，那么建议可以使用如下的基本规则:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>* {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>上面的规则看起来没啥用，不过如果不同的浏览器在默认情况下为你设置了不同的外边距/内边距的默认值，还是会挺麻烦的。</p>
<h1 id="articleHeader3">一切应为Border-box</h1>
<p>虽然很多初学者并不了解<code>box-sizing</code>这个属性，但是它确实相当的重要。而最好的理解它的方式就是看看它的两种取值:</p>
<ul>
<li><p>默认值为content-box，即当我们设置某个元素的heght/width属性时，仅仅会作用于其内容尺寸。而所有的内边距与边都是在其之上的累加，譬如某个<code>&lt;div&gt;</code>标签设置为宽100，内边距为10，那么最终元素会占用120(100 + 2*10)的像素。</p></li>
<li><p>border-box:内边距与边是包含在了width/height之内，譬如设置了<code>width:100px</code>的<code>&lt;div&gt;</code>无论其内边距或者边长设置为多少，其占有的大小都是100px。</p></li>
</ul>
<p>将元素设置为border-box会很方便你进行样式布局，这样的话你就可以在父元素设置高宽限制而不担心子元素的内边距或者边打破了这种限制。</p>
<h1 id="articleHeader4">以背景图方式使用Images</h1>
<p>如果需要在响应式的环境下展示图片，有个简单的小技巧就是使用该图片作为某个<code>&lt;div&gt;</code>的背景图而不是直接使用img标签。基于这种方式配合上<code>background-size</code>与<code>background-position</code>这两个属性，可以很方便地按比例缩放:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img {
    width: 300px;
    height: 200px;
}

div {
    width: 300px;
    height: 200px;
    background: url('http://cdn.tutorialzine.com/wp-content/uploads/2016/08/bicycle.jpg');
    background-position: center center;
    background-size: cover;
}

section{
    float: left;
    margin: 15px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
}

<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'http://cdn.tutorialzine.com/wp-content/uploads/2016/08/bicycle.jpg'</span>);
    <span class="hljs-attribute">background-position</span>: center center;
    <span class="hljs-attribute">background-size</span>: cover;
}

<span class="hljs-selector-tag">section</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">15px</span>;
}</code></pre>
<p>不过这种方式也是存在缺陷的，譬如你无法设置图片的懒加载、图片无法被搜索引擎或者其他类似的工具抓取到，有个不错的属性叫<a href="http://tutorialzine.com/2016/04/quick-tip-get-to-know-css-object-fit-position/" rel="nofollow noreferrer" target="_blank">object-fit</a>可以解决这个问题，不过该属性目前的浏览器支持并不是很完善。</p>
<h1 id="articleHeader5">Better Table Borders</h1>
<p>HTML中使用Tables进行布局一直是个很头疼的问题，它们使用起来很简单，但是无法进行响应式操作，并且也不方便进行全局样式设置。譬如，如果你打算为Table的边与单元的边添加样式，可能得到的结果如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="table {
    width: 600px;
    border: 1px solid #505050;
    margin-bottom: 15px;
    color:#505050;
}

td{
    border: 1px solid #505050;
    padding: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">table</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#505050</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#505050</span>;
}

<span class="hljs-selector-tag">td</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#505050</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/6BBCF480-65A4-4DA2-A956-0BEE74B471AF.png" src="https://static.alili.techhttps://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/6BBCF480-65A4-4DA2-A956-0BEE74B471AF.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里存在的问题是出现了很多的重复的边，会导致视觉上不协调的情况，那么我们可以通过设置<code>border-collapse:collapse</code>来进行处理:<br><span class="img-wrap"><img data-src="https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/721C04EE-5635-4090-A61A-8E156A85BF10.png" src="https://static.alili.techhttps://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/721C04EE-5635-4090-A61A-8E156A85BF10.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader6">注释格式优化</h1>
<p>CSS虽然谈不上一门编程语言但是其仍然需要添加注释以保障整体代码的可读性，只要添加些简单的注释不仅可以方便你更好地组织整个样式表还能够让你的同事或者未来的自己更好地理解。对于CSS中整块的注释或者使用在Media-Query中的注释，建议是使用如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*---------------
    #Header
---------------*/header { }header nav { }/*---------------
    #Slideshow
---------------*/.slideshow { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/*---------------
    #Header
---------------*/</span><span class="hljs-selector-tag">header</span> { }<span class="hljs-selector-tag">header</span> <span class="hljs-selector-tag">nav</span> { }<span class="hljs-comment">/*---------------
    #Slideshow
---------------*/</span><span class="hljs-selector-class">.slideshow</span> { }</code></pre>
<p>而设计的细节说明或者一些不重要的组件可以用如下单行注释的方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*   Footer Buttons   */
.footer button { }

.footer button:hover { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/*   Footer Buttons   */</span>
<span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">button</span> { }

<span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">button</span>:hover { }</code></pre>
<p>同时，不要忘了CSS中是没有<code>//</code>这种注释方式的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*  Do  */p {
    padding: 15px;
    /*border: 1px solid #222;*/
}/*  Don't  */p {
    padding: 15px;
    // border: 1px solid #222;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/*  Do  */</span><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-comment">/*border: 1px solid #222;*/</span>
}<span class="hljs-comment">/*  Don't  */</span><span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-comment">// border: 1px solid #222;  </span>
}</code></pre>
<h1 id="articleHeader7">使用Kebab-case命名变量</h1>
<p>对于样式类名或者ID名的命名都需要在多个单词之间添加<code>-</code>符号，CSS本身是大小写不敏感的因此你是用不了camelCase的，另一方面，很久之前也不支持下划线，所以现在的默认的命名方式就是使用<code>-</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*  Do     */
.footer-column-left { }

/*  Don't  */
.footerColumnLeft { }

.footer_column_left { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*  Do     */</span>
<span class="hljs-selector-class">.footer-column-left</span> { }

<span class="hljs-comment">/*  Don't  */</span>
<span class="hljs-selector-class">.footerColumnLeft</span> { }

<span class="hljs-selector-class">.footer_column_left</span> { }</code></pre>
<p>而涉及到具体的变量命名规范时，建议是使用<a href="https://en.bem.info/" rel="nofollow noreferrer" target="_blank">BEM</a>规范，只要遵循一些简单的原则即可以保证基于组件风格的命名一致性。你也可以参考<a href="https://css-tricks.com/bem-101/" rel="nofollow noreferrer" target="_blank">CSS Tricks</a>来获得更多的细节描述。</p>
<h1 id="articleHeader8">避免重复代码</h1>
<p>大部分元素的CSS属性都是从DOM树根部继承而来，这也是其命名为级联样式表的由来。我们以<code>font</code>属性为例，该属性往往是继承自父属性，因此我们并不需要再单独地为元素设置该属性。我们只需要在<code>html</code>或者<code>body</code>中添加该属性然后使其层次传递下去即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    font: normal 16px/1.4 sans-serif;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font</span>: normal <span class="hljs-number">16px</span>/<span class="hljs-number">1.4</span> sans-serif;
}</code></pre>
<h1 id="articleHeader9">使用transform添加CSS Animations</h1>
<p>不建议直接改变元素的<code>width</code>与<code>height</code>属性或者<code>left/top/bottom/right</code>这些属性来达到动画效果，而应该优先使用<code>transform()</code>属性来提供更平滑的变换效果，并且能使得代码的可读性会更好:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ball {
    left: 50px;
    transition: 0.4s ease-out;
}/* Not Cool*/.ball.slide-out {
    left: 500px;
}/* Cool*/.ball.slide-out {
    transform: translateX(450px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ball</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.4s</span> ease-out;
}<span class="hljs-comment">/* Not Cool*/</span><span class="hljs-selector-class">.ball</span><span class="hljs-selector-class">.slide-out</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">500px</span>;
}<span class="hljs-comment">/* Cool*/</span><span class="hljs-selector-class">.ball</span><span class="hljs-selector-class">.slide-out</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(450px);
}</code></pre>
<p>Transform的几个属性<code>translate</code>、<code>rotate</code>、<code>scale</code>都具有比较好的浏览器兼容性可以放心使用。</p>
<h1 id="articleHeader10">不要重复造轮子</h1>
<p>现在CSS社区已经非常庞大，并且不断地有新的各式各样的库开源出来。这些库可以帮助我们解决从小的代码片到用于构建完整的响应式应用的全框架。所以如果下次你再碰到什么CSS问题的时候，在打算撸起袖子自己上之前可以尝试在<a href="https://github.com/" rel="nofollow noreferrer" target="_blank">GitHUB</a>或者<a href="http://codepen.io/" rel="nofollow noreferrer" target="_blank">CodePen</a>上搜索可行方案。</p>
<h1 id="articleHeader11">尽可能使用低优先级的选择器</h1>
<p>并不是所有的CSS选择器的优先级都一样，很多初学者在使用CSS选择器的时候都是考虑以新的特性去复写全部的继承特性，不过这一点在某个元素多状态时就麻烦了，譬如下面这个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a{
    color: #fff;
    padding: 15px;
}

a#blue-btn {
    background-color: blue;
}

a.active {
    background-color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;
}

<span class="hljs-selector-tag">a</span><span class="hljs-selector-id">#blue-btn</span> {
    <span class="hljs-attribute">background-color</span>: blue;
}

<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.active</span> {
    <span class="hljs-attribute">background-color</span>: red;
}</code></pre>
<p>我们本来希望将<code>.active</code>类添加到按钮上然后使其显示为红色，不过在上面这个例子中很明显起不了作用，因为<code>button</code>已经以ID选择器设置过了背景色，也就是所谓的<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity" rel="nofollow noreferrer" target="_blank">Higher Selector Specificity</a>。一般来说，选择器的优先级顺序为：ID(#id) &gt; Class(.class) &gt; Type(header)</p>
<h1 id="articleHeader12">避免使用!important</h1>
<p>认真的说，千万要避免使用!important，这可能会导致你在未来的开发中无尽的属性重写，你应该选择更合适的CSS选择器。而唯一的可以使用<code>!important</code>属性的场景就是当你想去复写某些行内样式的时候，不过行内样式本身也是需要避免的。</p>
<h1 id="articleHeader13">使用text-transform属性设置文本大写</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;movie-poster&quot;>Star Wars: The Force Awakens</div>

.movie-poster {
    text-transform: uppercase;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"movie-poster"</span>&gt;Star Wars: The Force Awakens&lt;/div&gt;

<span class="hljs-selector-class">.movie-poster</span> {
    <span class="hljs-attribute">text-transform</span>: uppercase;
}</code></pre>
<h1 id="articleHeader14">Em, Rem, 以及 Pixel</h1>
<p>已经有很多关于人们应该如何使用em，rem，以及px作为元素尺寸与文本尺寸的讨论，而笔者认为，这三个尺寸单位都有其适用与不适用的地方。不同的开发与项目都有其特定的设置，因此并没有通用的规则来决定应该使用哪个单位，这里是我总结的几个考虑:</p>
<ul>
<li><p>em – 其基本单位即为当前元素的<code>font-size</code>值，经常适用于media-queries中，em是特别适用于响应式开发中。</p></li>
<li><p>rem – 其是相对于<code>html</code>属性的单位，可以保证文本段落真正的响应式尺寸特性。</p></li>
<li><p>px – Pixels 并没有任何的动态扩展性，它们往往用于描述绝对单位，并且可以在设置值与最终的显示效果之间保留一定的一致性。</p></li>
</ul>
<h1 id="articleHeader15">在大型项目中使用预处理器</h1>
<p>估计你肯定听说过 <a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">Sass</a>, <a href="http://lesscss.org/" rel="nofollow noreferrer" target="_blank">Less</a>, <a href="http://postcss.org/" rel="nofollow noreferrer" target="_blank">PostCSS</a>, <a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">Stylus</a>这些预处理器与对应的语法。Preprocessors可以允许我们将未来的CSS特性应用在当前的代码开发中，譬如变量支持、函数、嵌套式的选择器以及很多其他的特性，这里我们以Sass为例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$accent-color: #2196F3;

a {
    padding: 10px 15px;
    background-color: $accent-color;
}

a:hover {
    background-color: darken($accent-color,10%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-variable">$accent</span>-<span class="hljs-attribute">color</span>: <span class="hljs-number">#2196F3</span>;

<span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$accent</span>-color;
}

<span class="hljs-selector-tag">a</span>:hover {
    <span class="hljs-attribute">background-color</span>: darken(<span class="hljs-variable">$accent</span>-color,<span class="hljs-number">10%</span>);
}</code></pre>
<h1 id="articleHeader16">使用Autoprefixers来提升浏览器兼容性</h1>
<p>使用特定的浏览器前缀是CSS开发中常见的工作之一，不同的浏览器、不同的属性对于前缀的要求也不一样，这就使得我们无法在编码过程中记住所有的前缀规则。并且在写样式代码的时候还需要加上特定的浏览器前缀支持也是个麻烦活，幸亏现在也是有很多工具可以辅助我们进行这样的开发:</p>
<ul>
<li><p>Online tools: <a href="https://autoprefixer.github.io/" rel="nofollow noreferrer" target="_blank">Autoprefixer</a></p></li>
<li><p>Text editor plugins: <a href="https://github.com/sindresorhus/sublime-autoprefixer" rel="nofollow noreferrer" target="_blank">Sublime Text</a>, <a href="https://atom.io/packages/autoprefixer" rel="nofollow noreferrer" target="_blank">Atom</a></p></li>
<li><p>Libraries: <a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">Autoprefixer</a> (PostCSS)</p></li>
</ul>
<h1 id="articleHeader17">在生产环境下使用Minified代码</h1>
<p>为了提升页面的加载速度，在生产环境下我们应该默认使用压缩之后的资源代码。在压缩的过程中，会将所有的空白与重复剔除掉从而减少整个文件的体积大小。当然，经过压缩之后的代码毫无可读性，因此在开发阶段我们还是应该使用普通的版本。对于CSS的压缩有很多的现行工具:</p>
<ul>
<li><p>Online tools – <a href="https://cssminifier.com/" rel="nofollow noreferrer" target="_blank">CSS Minifier</a> (API included), <a href="http://csscompressor.com/" rel="nofollow noreferrer" target="_blank">CSS Compressor</a></p></li>
<li><p>Text editor plugins: <a href="https://packagecontrol.io/packages/Minify" rel="nofollow noreferrer" target="_blank">Sublime Text</a>, <a href="https://atom.io/packages/atom-minify" rel="nofollow noreferrer" target="_blank">Atom</a></p></li>
<li><p>Libraries: <a href="https://github.com/matthiasmullie/minify" rel="nofollow noreferrer" target="_blank">Minfiy</a> (PHP), <a href="https://github.com/css/csso" rel="nofollow noreferrer" target="_blank">CSSO</a> and <a href="http://cssnano.co/" rel="nofollow noreferrer" target="_blank">CSSNano</a> (PostCSS, Grunt, Gulp)</p></li>
</ul>
<p>选择哪个工具肯定是依赖于你自己的工作流啦~</p>
<h1 id="articleHeader18">多参阅Caniuse</h1>
<p>不同的浏览器在兼容性上差异很大，因此如果我们可以针对我们所需要适配的浏览器，在<a href="http://caniuse.com/" rel="nofollow noreferrer" target="_blank">caniuse</a>上我们可以查询某个特性的浏览器版本适配性，是否需要添加特定的前缀或者在某个平台上是否存在Bug等等。不过光光使用caniuse肯定是不够的，我们还需要使用些额外的服务来进行检测。</p>
<h1 id="articleHeader19">Validate:校验</h1>
<p>对于CSS的校验可能不如HTML校验或者JavaScript校验那么重要，不过在正式发布之前用Lint工具校验一波你的CSS代码还是很有意义的。它会告诉你代码中潜在的错误，提示你一些不符合最佳实践的代码以及给你一些提升代码性能的建议。就像Minifers与Autoprefixers，也有很多可用的工具:</p>
<ul>
<li><p>Online tools: <a href="https://jigsaw.w3.org/css-validator/" rel="nofollow noreferrer" target="_blank">W3 Validator</a>, <a href="http://csslint.net/" rel="nofollow noreferrer" target="_blank">CSS Lint</a></p></li>
<li><p>Text editor plugins: <a href="https://packagecontrol.io/packages/W3CValidators" rel="nofollow noreferrer" target="_blank">Sublime Text</a>, <a href="https://atom.io/packages/csslint" rel="nofollow noreferrer" target="_blank">Atom</a></p></li>
<li><p>Libraries: <a href="http://stylelint.io/" rel="nofollow noreferrer" target="_blank">stylelint</a> (Node.js, PostCSS), <a href="https://www.npmjs.com/package/css-validator" rel="nofollow noreferrer" target="_blank">css-validator</a> (Node.js)</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
20个编写现代CSS代码的建议

## 原文链接
[https://segmentfault.com/a/1190000006834519](https://segmentfault.com/a/1190000006834519)

