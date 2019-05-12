---
title: '使用现代CSS的响应式版面' 
date: 2019-01-24 2:30:11
hidden: true
slug: 4hp1w6wkb3
categories: [reprint]
---

{{< raw >}}

            <p>使用现代CSS的响应式版面</p>
<p>2017年12月30日</p>
<p>为一个网站选择类型尺寸是项艰巨的任务. 标题和段落的尺寸在网页布局和可读性方面处理起来很棘手. 谢天谢地, 我们有<em>模块化缩放</em>可以引导我们.</p>
<blockquote>
<p>模块化缩放是一个数字序列以某种方式关联另一个序列.
Tim Brown,<a href="http://alistapart.com/article/more-meaningful-typography">更多版面</a></p>
</blockquote>
<p>在版面中应用的模块化比例实现了视觉层次效果与和谐的比例。它们提供了一组数值作为字体尺寸和间距的方针。</p>
<p><img src="http://p0.qhimg.com/t0156da3cf434719eb0.png" alt="An example modular scale模块化缩放示例"></p>
<p>版面中的模块化缩放</p>
<p>在web内容中实施模块化比例需要在CSS代码的不同位置手动计算数值并对数值手动编码。<strong>为了在所有屏幕尺寸情况下都保持平衡比例，你要花费很多心思</strong></p>
<p>我们可以利用CSS新特性简化一个模块化缩放响应式网站的设计工作。我们首先使用传统属性和<code>calc()</code>基于视口大小来动态计算模块化比例的值。然后我们会基于视口尺寸改变比例，并使用媒体查询和<code>media()</code>函数。</p>
<h2>推荐：PostCSS和cssnext</h2>
<p>为了在使用CSS新语法时保证浏览器兼容性，我建议使用PostCSS和cssnext插件。</p>
<p><a href="http://postcss.org/">PostCSS</a>是一个使用JavaScript解析CSS的解析器，它驱动的一系列插件可以转换你的CSS代码。</p>
<p><a href="http://cssnext.io/">cssnext</a>是一个PostCSS插件，它可以通过转换语法和函数将CSS规格草案转为兼容性的CSS。</p>
<p>一个最小化的<code>postcss.config.js</code>看起来就是这样：</p>
<pre><code class="hljs java"><span class="hljs-comment">// postcss.config.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    require(<span class="hljs-string">'postcss-cssnext'</span>),
  ],
};

</code></pre><p>你可在<a href="https://github.com/postcss/postcss#usage">PostCSS 文档</a>中查阅如何使用喜欢的构建工具(webpack,gulp等)来整合PostCSS。</p>
<h2>尝试应用一个比例</h2>
<p>把定义你的字体和类型比例等<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*">传统属性</a>作为开始。使用<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc"><code>calc()</code></a>来计算你选择的比例的不同权重。我们会在下面的例子中使用1.414的比例(在音乐方面这个数字有其特殊含义)。</p>
<p>关于单位的一些准则</p>
<ul>
<li><p><strong>为基准字体大小使用百分比</strong>  百分比单元遵守浏览器关于文本大小的设定。更多相关信息请查看 <a href="https://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/">CSS Font-Size: em vs. px vs. pt vs. percent</a>。</p>
</li>
<li><p><strong>为标题和间距使用<code>em</code>单位</strong> <code>em</code>是一个活动单位，所以它会基于基础字体大小缩放。查看<a href="http://blog.typekit.com/2011/11/09/type-study-sizing-the-legible-letter/">Type Study: Sizing the Legible Letter</a>获得更多使用<code>em</code>单位的信息。</p>
</li>
</ul>
<p>我们只会为下面例子中的h1,h2,h3,p标签添加很少样式.假如你使用了全部的标题标签,你可能在应用某比例时要完成更多步骤.</p>
<pre><code class="hljs haml">:root {
<span class="hljs-comment">  /* Font faces */</span>
  -<span class="ruby">-<span class="hljs-symbol">headerFont:</span> <span class="hljs-string">'Helvetica Neue'</span>, sans-serif;
</span>  -<span class="ruby">-<span class="hljs-symbol">bodyFont:</span> <span class="hljs-string">'Georgia'</span>, serif;
</span>  -<span class="ruby">-<span class="hljs-symbol">fontColor:</span> hsla(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>%, <span class="hljs-number">0</span>%, <span class="hljs-number">0</span>.<span class="hljs-number">8</span>);
</span>  -<span class="ruby">-<span class="hljs-symbol">lineHeight:</span> <span class="hljs-number">1.5</span>;
</span>  -<span class="ruby">-<span class="hljs-symbol">baseFontSize:</span> <span class="hljs-number">112.5</span>%;  <span class="hljs-regexp">/* 18px */</span>
</span><span class="hljs-comment">  /* Type scale */</span>
  -<span class="ruby">-<span class="hljs-symbol">ratio:</span> <span class="hljs-number">1.414</span>;  <span class="hljs-regexp">/* Augmented fourth */</span>
</span><span class="hljs-comment">  /* Each step of the scale is a power</span>
     of --ratio
  */
  -<span class="ruby">-<span class="hljs-symbol">stepUp1:</span> calc(<span class="hljs-number">1</span>em * var(--ratio));
</span>  -<span class="ruby">-<span class="hljs-symbol">stepUp2:</span> calc(var(--stepUp1) *
</span>                  var(--ratio));
  -<span class="ruby">-<span class="hljs-symbol">stepUp3:</span> calc(var(--stepUp2) *
</span>                  var(--ratio));
  -<span class="ruby">-<span class="hljs-symbol">stepDown1:</span> calc(<span class="hljs-number">1</span>em /
</span>                    var(--ratio));
}

</code></pre><p>当你设置基础字体时可以引用这些变量.</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--baseFontSize);
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--fontColor);
  <span class="hljs-attribute">line-height</span>: <span class="hljs-built_in">var</span>(--lineHeight);
  <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--bodyFont);
}

<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-built_in">var</span>(--stepUp1) <span class="hljs-number">0</span> <span class="hljs-number">0.5em</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--headerFont);
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.2</span>;
}

<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp3);
}

<span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp2);
}

<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp1);
}

<span class="hljs-selector-tag">small</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepDown1);
}

</code></pre><p>我们得到如下结果:</p>
<p>请看 <a href="https://codepen.io/sloria/pen/KZNWWj/">Type Scaling using cssnext</a>,作者Steven Loria (<a href="https://codepen.io/sloria">@sloria</a>) 发布于<a href="https://codepen.io">CodePen</a>.</p>
<p>结果看起来不错,<strong>除非你正在手机上查看...</strong></p>
<h2>移动端存在的问题</h2>
<p>在大屏情况下缩放表现良好.然而,<strong>适合桌面屏幕或笔记本的比例不一定对小屏幕适用</strong>.</p>
<p>Jason Pamental解释了原因:</p>
<blockquote>
<p> 屏幕尺寸减小,可见的元素变得更少,元素的相对比例变得很夸张.
 Jason Pamental,<a href="https://typecast.com/blog/a-more-modern-scale-for-web-typography">缩放比例更现代的Web版面</a></p>
</blockquote>
<p>Consequently, we have disproportionately large
headings on small screen sizes.
所以,我们在屏幕尺寸更小的情况下设置了更大的标题.</p>
<p><img src="http://p0.qhimg.com/t01ba1ad5e77c9bff95.png" alt="Non-responsive scale"></p>
<p>一个为大尺寸屏幕设置的现代比例并不适用于微型设备.</p>
<h2>使其具备响应式特性</h2>
<p>当视口越小时,能引起视觉注意的元素就越少.因此,我们可以设置更小的基础字号,从而使标题间的对比显得不那么强烈.</p>
<p>在我们的实例中使用了以下的值:</p>
<ul>
<li><p>屏幕<strong>小于36em</strong>:基础字号100%,缩放比例为1.2</p>
</li>
<li><p>屏幕<strong>在36em至48em之间</strong>:基础字号112.5%,缩放比例为1.2</p>
</li>
<li><p>屏幕<strong>大于48em</strong>:基础字号112.5%,缩放比例1.414</p>
</li>
</ul>
<p><img src="http://p0.qhimg.com/t016c15920e06f7ce94.png" alt="基于不同设备的不同比例"></p>
<p>针对不同的视口使用不同的比例和基础字号.</p>
<p>我们会尝试用两种方式实现效果.首先我们会使用媒体查询.接着我们会使用<code>media()</code>函数让代码更简洁.</p>
<h2>使用媒体查询</h2>
<p>由于我们有两种缩放比例,我们会编写两套变量:一套对应小尺寸和中等尺寸屏幕,另一套对应大尺寸屏幕.我们同样会定义两套基础字号.</p>
<pre><code class="hljs clojure"><span class="hljs-symbol">:root</span> {
   /* Base sizes */
  --baseFontSizeSm: <span class="hljs-number">100</span>%<span class="hljs-comment">; /* 16px */</span>
  --baseFontSizeMd: <span class="hljs-number">112.5</span>%<span class="hljs-comment">; /* 18px */</span>
  /* Type scale on smaller screens */
  --ratioSm: <span class="hljs-number">1.2</span><span class="hljs-comment">;  /* Minor third */</span>
  --stepUp1Sm: calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioSm</span>))<span class="hljs-comment">;</span>
  --stepUp2Sm: calc(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span>(<span class="hljs-name">--stepUp1Sm</span>) *
                    var(<span class="hljs-name">--ratioSm</span>))<span class="hljs-comment">;</span>
  --stepUp3Sm: calc(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span>(<span class="hljs-name">--stepUp2Sm</span>) *
                    var(<span class="hljs-name">--ratioSm</span>))<span class="hljs-comment">;</span>
  --stepDown1Sm: calc(<span class="hljs-number">1</span>em /
                      var(<span class="hljs-name">--ratioSm</span>))<span class="hljs-comment">;</span>
  /* Type scale on larger screens */
  --ratioLg: <span class="hljs-number">1.414</span><span class="hljs-comment">;  /* Augmented fourth */</span>
  --stepUp1Lg: calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioLg</span>))<span class="hljs-comment">;</span>
  --stepUp2Lg: calc(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span>(<span class="hljs-name">--stepUp1Lg</span>) *
                    var(<span class="hljs-name">--ratioLg</span>))<span class="hljs-comment">;</span>
  --stepUp3Lg: calc(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span>(<span class="hljs-name">--stepUp2Lg</span>) *
                    var(<span class="hljs-name">--ratioLg</span>))<span class="hljs-comment">;</span>
  --stepDown1Lg: calc(<span class="hljs-number">1</span>em /
                      var(<span class="hljs-name">--ratioLg</span>))<span class="hljs-comment">;</span>
}

</code></pre><p>接下来,我们要编写媒体查询中用到的两个断点.</p>
<p><strong>媒体查询需使用<code>em</code>单位,因为在不同浏览器下表现一致</strong>.<a href="https://zellwk.com/blog/media-query-units/">媒体查询:px,em还是rem</a>对这几个单位进行了对比.</p>
<p>我们会把断点定义为 <a href="https://drafts.csswg.org/mediaqueries-5/#custom-mq">custom media</a>(另一个cssnext特性),这样我们就能通过名字来参考.</p>
<p>cssnext允许你使用"&gt;=":</p>
<pre><code class="hljs css">@<span class="hljs-keyword">custom</span>-<span class="hljs-keyword">media</span> --break-md (width &gt;= <span class="hljs-number">36em</span>);
@<span class="hljs-keyword">custom</span>-<span class="hljs-keyword">media</span> --break-lg (width &gt;= <span class="hljs-number">48em</span>);

</code></pre><p>基础字号在"medium"断点应该增加.</p>
<pre><code class="hljs scss"><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: var(--baseFontSizeSm);
  <span class="hljs-attribute">color</span>: var(--fontColor);
  <span class="hljs-attribute">line-height</span>: var(--lineHeight);
  <span class="hljs-attribute">font-family</span>: var(--bodyFont);

  @<span class="hljs-keyword">media</span> (--break-md) {
    <span class="hljs-attribute">font-size</span>: var(--baseFontSizeMd);
  }
}

</code></pre><p>"large"断点处比例应该增加,所以我们参考了媒体查询中的大比例.</p>
<pre><code class="hljs scss"><span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: var(--stepUp3Sm);
  @<span class="hljs-keyword">media</span> (--break-lg) {
    <span class="hljs-attribute">font-size</span>: var(--stepUp3Lg);
  }
}

<span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-size</span>: var(--stepUp2Sm);
  @<span class="hljs-keyword">media</span> (--break-lg) {
    <span class="hljs-attribute">font-size</span>: var(--stepUp2Lg);
  }
}

<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-size</span>: var(--stepUp1Sm);
  @<span class="hljs-keyword">media</span> (--break-lg) {
    <span class="hljs-attribute">font-size</span>: var(--stepUp1Lg);
  }
}

<span class="hljs-selector-tag">small</span> {
  <span class="hljs-attribute">font-size</span>: var(--stepDown1Sm);
  @<span class="hljs-keyword">media</span> (--break-lg) {
    <span class="hljs-attribute">font-size</span>: var(--stepDown1Lg);
  }
}

</code></pre><p>请看Steven Loria (<a href="https://codepen.io/sloria">@sloria</a>)发布于<a href="https://codepen.io">CodePen</a>的例子<a href="https://codepen.io/sloria/pen/GyNxbM/">Responsive modular scale using cssnext</a>.</p>
<p>字体大小随视口大小准确调整.这很棒!</p>
<p>这种方法比手动计算缩放比例更便利,但我们在缩放转折点仍然需要每次至少一个媒体查询.</p>
<p>在下一节我们可以用<code>media()</code>函数让代码更简洁.</p>
<h2>使用<code>media()</code>函数</h2>
<p>抛弃为每个模块化比例定义彼此分离的变量集,我们改用<code>media()</code>函数(<a href="https://jonathantneal.github.io/media-expressions-spec/">spec</a>)为缩放属性绑定响应式值.</p>
<p>该特性需要额外安装<a href="https://github.com/jonathantneal/postcss-media-fn">postcss-media-fn</a>插件，用npm或yarn安装并添加到你的<code>postcss.config.js</code>。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">npm</span> install postcss-media-<span class="hljs-meta">fn</span>

</code></pre><pre><code class="hljs javascript"><span class="hljs-comment">// postcss.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-cssnext'</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-media-fn'</span>),
  ],
};

</code></pre><p>当定义你的类型缩放变量时使用<code>media()</code>函数.每次缩放比的变化都包含了对每个断点的类型缩放计算.</p>
<p>缩放的一级看起来是这样:</p>
<pre><code class="hljs lua"><span class="hljs-comment">--stepUp1: media(</span>
  calc(<span class="hljs-number">1</span>em * var(<span class="hljs-comment">--ratioSm)),</span>
  (<span class="hljs-built_in">min</span>-width: <span class="hljs-number">48</span>em) calc(<span class="hljs-number">1</span>em * var(<span class="hljs-comment">--ratioLg))</span>
);

</code></pre><p>让我们打破这个规则看看.</p>
<ul>
<li><p>第一级缩放的默认字号是<code>1em</code> x 1.2(小比例情况下)</p>
</li>
<li><p>超过<code>48em</code>(我们的"large"断点),第一级是<code>1em</code> x 1.414(大比例情况)</p>
</li>
</ul>
<p>以下是使用<code>media()</code>的缩放代码:</p>
<pre><code class="hljs clojure"><span class="hljs-symbol">:root</span> {
  /* Break points */
  --minMd: <span class="hljs-number">36</span>em;
  --minLg: <span class="hljs-number">48</span>em;

  /* Ratio on smaller screens */
  --ratioSm: <span class="hljs-number">1.2</span><span class="hljs-comment">; /* Minor third */</span>

  /* Ratio on larger screens */
  --ratioLg: <span class="hljs-number">1.414</span><span class="hljs-comment">; /* Augmented fourth */</span>

  /* Type scale */
  --stepUp1: media(
    calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioSm</span>)),
    (<span class="hljs-name">min-width:</span> var(<span class="hljs-name">--minLg</span>)) calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioLg</span>))
  )<span class="hljs-comment">;</span>
  --stepUp2: media(
    calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioSm</span>) * var(<span class="hljs-name">--ratioSm</span>)),
    (<span class="hljs-name">min-width:</span> var(<span class="hljs-name">--minLg</span>)) calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioLg</span>) * var(<span class="hljs-name">--ratioLg</span>))
  )<span class="hljs-comment">;</span>
  --stepUp3: media(
    calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioSm</span>) * var(<span class="hljs-name">--ratioSm</span>) * var(<span class="hljs-name">--ratioSm</span>)),
    (<span class="hljs-name">min-width:</span> var(<span class="hljs-name">--minLg</span>)) calc(<span class="hljs-number">1</span>em * var(<span class="hljs-name">--ratioLg</span>) * var(<span class="hljs-name">--ratioLg</span>) * var(<span class="hljs-name">--ratioLg</span>))
  )<span class="hljs-comment">;</span>
  --stepDown1: media(
    calc(<span class="hljs-number">1</span>em / var(<span class="hljs-name">--ratioSm</span>)),
    (<span class="hljs-name">min-width:</span> var(<span class="hljs-name">--minLg</span>)) calc(<span class="hljs-number">1</span>em / var(<span class="hljs-name">--ratioLg</span>))
  )<span class="hljs-comment">;</span>
}

</code></pre><p>有了这个设置,<strong>我们不再需要缩放时编写媒体查询.</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp3);
}

<span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp2);
}

<span class="hljs-selector-tag">h3</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepUp1);
}

<span class="hljs-selector-tag">small</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--stepDown1);
}

</code></pre><p>这个方法需要进一步完善,但它在许多地方都能使你的代码更紧凑.</p>
<h2>总结</h2>
<p>当你设计基于web的模块化类型缩放时遵守下面这些建议;</p>
<ul>
<li><p>通过模块化缩放,使用传统属性和<code>calc()</code>来动态缩放你的字体大小</p>
</li>
<li><p>为字体大小使用百分比.给文本内容和媒体查询使用<code>em</code></p>
</li>
<li><p>针对不同视口尺寸使用不同缩放值.视口越小,缩放比例越小</p>
</li>
<li><p>使用媒体查询或者<code>media()</code>函数基于视口来改变比例和基础字号</p>
</li>
</ul>
<h2>相关链接</h2>
<ul>
<li><p><a href="http://spencermortensen.com/articles/typographic-scale/">Typographic Scale</a> - Primer on modular scales</p>
</li>
<li><p><a href="http://www.modularscale.com/">ModularScale.com</a> and <a href="http://type-scale.com/">Type-Scale.com</a> - Online tools for visualizing modular type scales</p>
</li>
<li><p><a href="https://zellwk.com/blog/responsive-modular-scale/">Responsive Modular Scale</a> - Different approaches for using modular scales on responsive web sites</p>
</li>
<li><p><a href="https://typecast.com/blog/a-more-modern-scale-for-web-typography">A More Modern Scale for Web Typography</a> - On using different proportions based on the viewport size</p>
</li>
</ul>
<p>请将你的评价发送到我的<a href="https://stevenloria.com/cdn-cgi/l/email-protection#b6c5dad9c4dfd787f6d1dbd7dfda98d5d9db">email</a>.欢迎你的回馈,建议和批评.</p>
<p><a href="http://twitter.com/sloria1">twitter</a> |
 <a href="http://github.com/sloria">github</a> |
<a href="http://www.linkedin.com/in/sloria/">linkedin</a>
<a href=""></a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用现代CSS的响应式版面

## 原文链接
[https://www.zcfy.cc/article/responsive-typography-using-modern-css-stevenloria-com](https://www.zcfy.cc/article/responsive-typography-using-modern-css-stevenloria-com)

