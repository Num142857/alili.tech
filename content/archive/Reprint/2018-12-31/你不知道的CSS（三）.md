---
title: '你不知道的CSS（三）' 
date: 2018-12-31 2:30:30
hidden: true
slug: 1oth49dw1x8
categories: [reprint]
---

{{< raw >}}

                    
<p>本文首发于<a href="https://smohan.net/blog/tr6bta" rel="nofollow noreferrer" target="_blank"><strong>我的博客</strong></a></p>
<p>在前面两篇文章《<a href="https://smohan.net/blog/6gr77h" rel="nofollow noreferrer" target="_blank">你不知道的CSS（一）</a>》和《<a href="https://smohan.net/blog/farjdx" rel="nofollow noreferrer" target="_blank">你不知道的CSS（二）</a>》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于<code>:hover</code>, <code>:active</code>, <code>:focus</code>之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加<code>.hover</code>类来变化背景色的同学?）。而伪元素如<code>:before</code>, <code>:after</code>相信大家也用的烂熟了。 当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些<strong>生僻的但是又非常实用的</strong>伪类(元素)。</p>
<p>CSS的世界已经变天了，抛开过去，拥抱变化吧~</p>
<h3 id="articleHeader0">伪类和伪元素的区别</h3>
<p>伪类和伪元素是一个比较容易混淆的概念，这不仅仅是从名称上，而且在写法上也是相似的（目前因为兼容性的问题，它们的写法是一致的）。这就更容易混淆了?。但还是希望大家在书写的过程中养成习惯，至于兼容性交给<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">postcss</a>等转换工具去实现。</p>
<h4>规范</h4>
<blockquote><p>css3 明确规定了伪类用一个冒号<code>:</code>来表示，而伪元素则用两个冒号<code>::</code>来表示。</p></blockquote>
<h4>区别</h4>
<ul>
<li>伪类更多的定义的是状态，如<code>:hover</code>，或者说是一个可以使用CSS进行修饰的特定的特殊元素，如<code>:first-child</code>
</li>
<li>伪类使用一个冒号<code>:</code>
</li>
<li>
<p>常见伪类：</p>
<ul>
<li><code>:hover</code></li>
<li><code>:active</code></li>
<li><code>:focus</code></li>
<li><code>:visited</code></li>
<li><code>:link</code></li>
<li><code>:lang</code></li>
<li><code>:first-child</code></li>
<li><code>:last-child</code></li>
<li><code>:not</code></li>
</ul>
</li>
<li>伪元素简单来说就是不存在于DOM文档树中的虚拟的元素，它们和HTML元素一样，但是你又无法使用JavaScript去获取，如<code>:before</code>
</li>
<li>伪元素使用两个冒号<code>::</code>
</li>
<li>
<p>常见伪元素：</p>
<ul>
<li><code>::before</code></li>
<li><code>::after</code></li>
<li><code>::first-letter</code></li>
<li><code>::first-line</code></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">用<code>:valid</code>和<code>:invalid</code>来做表单即时校验</h3>
<p>html5丰富了表单元素，提供了类似<code>required</code>,<code>email</code>,<code>tel</code>等表单元素属性。同样的，我们可以利用<code>:valid</code>和<code>:invalid</code>来做针对html5表单属性的校验。</p>
<ul>
<li>
<code>:required</code> 伪类指定具有required 属性的表单元素</li>
<li>
<code>:valid</code> 伪类指定一个通过匹配正确的所要求的表单元素</li>
<li>
<code>:invalid</code> 伪类指定一个不匹配指定要求的表单元素<br><span class="img-wrap"><img data-src="/img/bVU8qM?w=385&amp;h=417" src="https://static.alili.tech/img/bVU8qM?w=385&amp;h=417" alt="css实现表单校验" title="css实现表单校验" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
<p>有没有最开始学<code>angular</code>的感觉?，快点<a href="https://codepen.io/smohan/live/zEGLvL" rel="nofollow noreferrer" target="_blank">直戳demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/live/zEGLvL" data-typeid="3">点击预览</button>感受下吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".valid {
  border-color: #429032;
  box-shadow: inset 5px 0 0 #429032;
}
.invalid {
  border-color: #D61D1D;
  box-shadow: inset 5px 0 0 #D61D1D;
}
.required {
  border-color: #056B9B;
  box-shadow: inset 5px 0 0 #056B9B;
}
input,
textarea {
  &amp;:valid {
    @extend .valid;
  }
  &amp;:invalid {
    @extend .invalid;
  } 
  &amp;:required {
    @extend .required;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.valid</span> {
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#429032</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#429032</span>;
}
<span class="hljs-selector-class">.invalid</span> {
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#D61D1D</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#D61D1D</span>;
}
<span class="hljs-selector-class">.required</span> {
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#056B9B</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">5px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#056B9B</span>;
}
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">textarea</span> {
  &amp;:valid {
    @<span class="hljs-keyword">extend</span> .valid;
  }
  &amp;:invalid {
    @<span class="hljs-keyword">extend</span> .invalid;
  } 
  &amp;:required {
    @<span class="hljs-keyword">extend</span> .required;
  }
}</code></pre>
<h3 id="articleHeader2">用<code>:target</code>来实现折叠面板</h3>
<blockquote><p><code>:target</code>是文档的内部链接，即 <code>URL</code> 后面跟有锚名称 #，指向文档内某个具体的元素。</p></blockquote>
<p>利用 <code>:target</code> 的特性可以实现以前只能使用JavaScript实现的显示隐藏或者<code>Collapse</code> 折叠面板。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".collapse {
  >.collapse-body {
    display: none;
    &amp;:target {
      display: block;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.collapse</span> {
  &gt;<span class="hljs-selector-class">.collapse-body</span> {
    <span class="hljs-attribute">display</span>: none;
    &amp;:target {
      display: block;
    }
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVU8qQ?w=1016&amp;h=349" src="https://static.alili.tech/img/bVU8qQ?w=1016&amp;h=349" alt="target实现折叠面板" title="target实现折叠面板" style="cursor: pointer; display: inline;"></span><br><a href="https://codepen.io/smohan/live/gGbymz" rel="nofollow noreferrer" target="_blank">预览CSS实现Collapse折叠面板demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="smohan/live/gGbymz" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader3">用<code>:not</code>来排除其他选择器</h3>
<p><code>:not</code>表示的是一个<code>非/不是</code>的概念。我在项目<a href="https://github.com/S-mohan/mo-css" rel="nofollow noreferrer" target="_blank">mo-css</a>上用到过很多次，尤其是在表单类中，我用它来设置表单元素在<code>readonly</code> 和 <code>disabled</code>状态之外的<code>hover</code>等状态，以便于当元素在<code>readonly</code> 和 <code>disabled</code>时，元素不具有<code>hover</code>状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin buttonStyle ($border, $background, $color, $hoverBorder, $hoverBackground, $hoverColor) {
    color: $color;
    border-color: $border;
    background-color: $background;
    &amp;:not(.readonly):not([readonly]):not(.disabled):not([disabled]) {
        &amp;:hover,
        &amp;:active {
            color: $hoverColor;
            border-color: $hoverBorder;
            background-color: $hoverBackground;
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">@<span class="hljs-keyword">mixin</span> buttonStyle (<span class="hljs-variable">$border</span>, <span class="hljs-variable">$background</span>, <span class="hljs-variable">$color</span>, <span class="hljs-variable">$hoverBorder</span>, <span class="hljs-variable">$hoverBackground</span>, <span class="hljs-variable">$hoverColor</span>) {
    <span class="hljs-attribute">color</span>: <span class="hljs-variable">$color</span>;
    <span class="hljs-attribute">border-color</span>: <span class="hljs-variable">$border</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$background</span>;
    &amp;:not(<span class="hljs-selector-class">.readonly</span>):not(<span class="hljs-selector-attr">[readonly]</span>):not(<span class="hljs-selector-class">.disabled</span>):not(<span class="hljs-selector-attr">[disabled]</span>) {
        &amp;:hover,
        &amp;:active {
            <span class="hljs-attribute">color</span>: <span class="hljs-variable">$hoverColor</span>;
            <span class="hljs-attribute">border-color</span>: <span class="hljs-variable">$hoverBorder</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$hoverBackground</span>;
        }
    }
}
</code></pre>
<h3 id="articleHeader4">用<code>:nth-child(even/odd)</code>来实现隔行变色</h3>
<p><code>:nth-child</code>等伪类的参数大多是一个数值或者数学表达式<code>2n+1</code>，而<code>even</code>作为参数用来表示<code>偶数</code>，<code>odd</code>作为参数用来表示<code>奇数</code>的类似于别骂的特性往往被忽略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
  &amp;.odd {
    >li:nth-child(odd) {
      background: red;
    }
  }
  &amp;.even {
    >li:nth-child(even) {
      background: green;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-tag">ul</span> {
  &amp;<span class="hljs-selector-class">.odd</span> {
    &gt;<span class="hljs-selector-tag">li</span>:nth-child(odd) {
      <span class="hljs-attribute">background</span>: red;
    }
  }
  &amp;<span class="hljs-selector-class">.even</span> {
    &gt;<span class="hljs-selector-tag">li</span>:nth-child(even) {
      <span class="hljs-attribute">background</span>: green;
    }
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVU8qX?w=399&amp;h=226" src="https://static.alili.tech/img/bVU8qX?w=399&amp;h=226" alt="odd/even在隔行变色中的应用" title="odd/even在隔行变色中的应用" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">用<code>::selection</code>来美化选中文本</h3>
<p>就像你用鼠标选中这段话看到的那样，<code>::selection</code>用来设置选中文本的样式，从而改变浏览器一成不变的文本选中色（蓝色）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::selection{
 color: #fff;
 background-color: #6bc30d;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">::selection{
 <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
 <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#6bc30d</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVU8q1?w=937&amp;h=106" src="https://static.alili.tech/img/bVU8q1?w=937&amp;h=106" alt="selection设置选中文本样式" title="selection设置选中文本样式" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">用<code>::placeholder</code>来美化占位符</h3>
<p><code>::placeholder</code>用来修饰<code>input/textarea</code>等表单元素<code>placeholder</code>属性的样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; placeholder=&quot;我是自定义的placeholder&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"我是自定义的placeholder"</span> /&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVU8q2?w=406&amp;h=71" src="https://static.alili.tech/img/bVU8q2?w=406&amp;h=71" alt="自定义placeholder" title="自定义placeholder" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin placeholder {
  &amp;::-webkit-input-placeholder {
    @content
  }
  &amp;::-moz-placeholder {
    @content
  }
  &amp;:-ms-input-placeholder {
    @content
  }
}
input, textarea {
   @include placeholder {
      color: #f00;
   }
}
//css
input::-webkit-input-placeholder{
    color: #f00;
}
input::-moz-placeholder{
     color: #f00;
}
input:-ms-input-placeholder{
     color: #f00;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">@<span class="hljs-keyword">mixin</span> placeholder {
  &amp;::-webkit-input-placeholder {
    @content
  }
  &amp;::-moz-placeholder {
    @content
  }
  &amp;:-ms-input-placeholder {
    @content
  }
}
input, textarea {
   @include placeholder {
      color: <span class="hljs-number">#f00</span>;
   }
}
<span class="hljs-comment">//css</span>
<span class="hljs-selector-tag">input</span>::-webkit-input-placeholder{
    color: <span class="hljs-number">#f00</span>;
}
<span class="hljs-selector-tag">input</span>::-moz-placeholder{
     color: <span class="hljs-number">#f00</span>;
}
<span class="hljs-selector-tag">input</span>:-ms-input-placeholder{
     color: <span class="hljs-number">#f00</span>;
}</code></pre>
<h3 id="articleHeader7">用<code>::first-letter</code>来实现段落首字下沉</h3>
<blockquote><p>首字下沉 ： 设置段落的第一行第一字字体变大，并且向下一定的距离，与后面的段落对齐，段落的其它部分保持原样</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVU8q9?w=405&amp;h=311" src="https://static.alili.tech/img/bVU8q9?w=405&amp;h=311" alt="首字下沉效果" title="首字下沉效果" style="cursor: pointer; display: inline;"></span></p>
<p>就像图中展示的那样，之前实现类似效果，我们需要多加一个标签，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>
   <b>前</b>
    ...
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>前<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>然而，现在只需要一个CSS伪元素就可以实现。</p>
<blockquote><p><code>first-letter</code> 伪元素用于向文本的首字母设置特殊样式</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p::first-letter{
  font-size: 6em;
  line-height: 1;
  float: left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-letter</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">6em</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">float</span>: left;
}</code></pre>
<h3 id="articleHeader8">用<code>::first-line</code>来特殊标记段落第一行</h3>
<p>就如它的名字一样，这个伪元素代表了段落的第一行，你可以使用<em>任意</em>样式来控制它。<br><span class="img-wrap"><img data-src="/img/bVU8rd?w=839&amp;h=200" src="https://static.alili.tech/img/bVU8rd?w=839&amp;h=200" alt="first-line标记段落第一行" title="first-line标记段落第一行" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p::first-line{
  color: red
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::first-line</span>{
  <span class="hljs-attribute">color</span>: red
}</code></pre>
<h3 id="articleHeader9">小结</h3>
<p>CSS的伪类和伪元素还有很多，因为或兼容性或其他原因，文章中介绍的几种伪类/元素用的比较少，这不得不说是一种遗憾。但，为了保证项目的健康和可持续化，一定要注意伪类和伪元素的区别，尽可能的在写伪类的时候使用一个冒号<code>:</code>，而在写伪元素的时候用两个冒号<code>::</code>，就像使用<code>autoprefixer</code>来生成浏览器前缀一样，将<code>:</code>和<code>::</code>的转换交给<code>postcss</code>等工具去做。</p>
<h3 id="articleHeader10">系列文章</h3>
<ul>
<li><a href="https://smohan.net/blog/6gr77h" rel="nofollow noreferrer" target="_blank">你不知道的CSS（一）</a></li>
<li><a href="https://smohan.net/blog/farjdx" rel="nofollow noreferrer" target="_blank">你不知道的CSS（二）</a></li>
</ul>
<p>本文首发于<a href="https://smohan.net/blog/tr6bta" rel="nofollow noreferrer" target="_blank"><strong>我的博客</strong></a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的CSS（三）

## 原文链接
[https://segmentfault.com/a/1190000011194809](https://segmentfault.com/a/1190000011194809)

