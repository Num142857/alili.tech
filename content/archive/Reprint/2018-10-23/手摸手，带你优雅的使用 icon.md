---
title: 手摸手，带你优雅的使用 icon
reprint: true
categories: reprint
abbrlink: 1e5cc6f0
date: 2018-10-23 00:00:00
---

{{% raw %}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>本篇文章其实陆陆续续写了快半年，主体部分写好了很久了，但由于种种原因一直没有发布。<br>首先来说说写这篇文章的主要初衷是：在做前端后台项目的时候经常会用到很多 icon 图标，刚开始还好，但随着项目的不断迭代，每次修改添加图标会变得很麻烦，而且总觉得不够优雅，就开始琢磨着有啥简单方便的工作流呢？</blockquote>
<h2 id="articleHeader1">演进史</h2>
<p>首先我们来说一下前端 icon 的发展史。</p>
<p><strong>远古时代</strong><br>在我刚开始实习时，大部分图标都是用 img 来实现的。渐渐发现一个页面的请求资源中图片 img 占了大部分，所以为了优化有了<code>image sprite</code> 就是所谓的雪碧图，就是将多个图片合成一个图片，然后利用 css 的 background-position 定位显示不同的 icon 图标。但这个也有一个很大的痛点，维护困难。每新增一个图标，都需要改动原始图片，还可能不小心出错影响到前面定位好的图片，而且一修改雪碧图，图片缓存就失效了，久而久之你不知道该怎么维护了。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213281?w=528&amp;h=68" src="https://static.alili.tech/img/remote/1460000012213281?w=528&amp;h=68" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>font 库</strong><br>后来渐渐地一个项目里几乎不会使用任何本地的图片了，而使用一些 font 库来实现页面图标。常见的如 <a href="http://fontawesome.io/" rel="nofollow noreferrer" target="_blank">Font Awesome</a> ，使用起来也非常的方便，但它有一个致命的缺点就是找起来真的很不方便，每次找一个图标特别的费眼睛，还有就是它的定制性也非常的不友善，它的图标库一共有675个图标，说少也不少，但还是会常常出现找不到你所需要图标的情况。当然对于没有啥特别 ui 追求的初创公司来说还是能忍一忍的。但随着公司的壮大，来了越来越多对前端指手画脚的人，丧心病狂的设计师，他们会说不！这icon这么丑，这简直是在侮辱他们高级设计师的称号啊！不过好在这时候有了<a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a> 。</p>
<p><strong>iconfont</strong><br>一个阿里爸爸做的开源图库，人家还有专门的 <a href="https://github.com/thx/iconfont-plus/issues" rel="nofollow noreferrer" target="_blank">github issue</a>(虽然我的一个 issue 半年多了也没回应/(ㄒoㄒ)/~~)，但人家的图标数量还是很惊人的，不仅有几百个公司的开源图标库，还有各式各样的小图标，还支持自定义创建图标库，所以不管你是一家创业公司还是对设计很有要求的公司，它都能很好的帮助你解决管理图标的痛点。你想要的基本都有~</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213282?w=188&amp;h=158" src="https://static.alili.tech/img/remote/1460000012213282?w=188&amp;h=158" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">iconfont 三种使用姿势</h2>
<h3 id="articleHeader3">unicode</h3>
<p>最开始我们使用了<code>unicode</code>的格式，它主要的特点是<br><strong>优势</strong></p>
<ul>
<li>兼容性最好，支持ie6+</li>
<li>支持按字体的方式去动态调整图标大小，颜色等等</li>
</ul>
<p><strong>劣势</strong></p>
<ul>
<li>不支持多色图标</li>
<li>在不同的设备浏览器字体的渲染会略有差别，在不同的浏览器或系统中对文字的渲染不同，其显示的位置和大小可能会受到font-size、line-height、word-spacing等CSS属性的影响，而且这种影响调整起来较为困难</li>
</ul>
<p><strong>使用方法：</strong><br>第一步：引入自定义字体 `font-face</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @font-face {
   font-family: &quot;iconfont&quot;;
   src: url('iconfont.eot'); /* IE9*/
   src: url('iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
   url('iconfont.woff') format('woff'), /* chrome, firefox */
   url('iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
   url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> @<span class="hljs-keyword">font-face</span> {
   <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"iconfont"</span>;
   <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.eot'</span>); <span class="hljs-comment">/* IE9*/</span>
   <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.eot#iefix'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>), <span class="hljs-comment">/* IE6-IE8 */</span>
   <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.woff'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>), <span class="hljs-comment">/* chrome, firefox */</span>
   <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.ttf'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>), <span class="hljs-comment">/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/</span>
   <span class="hljs-built_in">url</span>(<span class="hljs-string">'iconfont.svg#iconfont'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>); <span class="hljs-comment">/* iOS 4.1- */</span>
 }</code></pre>
<p>第二步：定义使用iconfont的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".iconfont {
  font-family:&quot;iconfont&quot; !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.iconfont</span> {
  <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"iconfont"</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;
  <span class="hljs-attribute">font-style</span>:normal;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-webkit-text-stroke-width</span>: <span class="hljs-number">0.2px</span>;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}</code></pre>
<p>第三步：挑选相应图标并获取字体编码，应用于页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;iconfont&quot;>&amp;#xe604;</i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;i <span class="hljs-keyword">class</span>=<span class="hljs-string">"iconfont"</span>&gt;&amp;<span class="hljs-meta">#xe604;&lt;/i&gt;</span></code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213283?w=800&amp;h=154" src="https://static.alili.tech/img/remote/1460000012213283?w=800&amp;h=154" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其实它的原理也很简单，就是通过 <code>@font-face</code> 引入自定义字体(其实就是一个字体库)，它里面规定了<code>&amp;#xe604</code> 这个对应的形状就长这企鹅样。其实类似于 '花裤衩'，在不同字体设定下长得是不同的一样。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213284?w=175&amp;h=128" src="https://static.alili.tech/img/remote/1460000012213284?w=175&amp;h=128" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>不过它的缺点也显而易见，<code>unicode</code>的书写不直观，语意不明确。光看<code>&amp;#xe604;</code>这个<code>unicode</code>你完全不知道它代表的是什么意思。这时候就有了 <code>font-class</code>。</p>
<h3 id="articleHeader4">font-class</h3>
<p>与unicode使用方式相比，具有如下特点：</p>
<ul>
<li>兼容性良好，支持ie8+</li>
<li>相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。</li>
</ul>
<p><strong>使用方法：</strong><br>第一步：拷贝项目下面生成的fontclass代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="../font_8d5l8fzk5b87iudi.css" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">../font_8d5l8fzk5b87iudi.css</code></pre>
<p>第二步：挑选相应图标并获取类名，应用于页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;iconfont icon-xxx&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"iconfont icon-xxx"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span></code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213285?w=800&amp;h=146" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="image.png" title="image.png" style="cursor: pointer;"></span></p>
<p>它的主要原理其实是和 <code>unicode</code> 一样的，它只是多做了一步，将原先<code>&amp;#xe604</code>这种写法换成了<code>.icon-QQ</code>，它在每个 class 的 before 属性中写了<code>unicode</code>,省去了人为写的麻烦。如 <code>.icon-QQ:before { content: "\e604"; }</code></p>
<p>相对于<code>unicode</code> 它的修改更加的方便与直观。但也有一个大坑，之前楼主一个项目中用到了两组<code>font-class</code> 由于没有做好命名空间，所有的class都是放在<code>.iconfont</code> 命名空间下的，一上线引发了各种雪崩问题，修改了半天，所以使用<code>font-class</code>一定要注意命名空间的问题。</p>
<h3 id="articleHeader5">symbol</h3>
<p>随着万恶的某某浏览器逐渐淡出历史舞台，svg-icon 使用形式慢慢成为主流和推荐的方法。相关文章可以参考张鑫旭大大的文章<a href="http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/?spm=a313x.7781069.1998910419.50" rel="nofollow noreferrer" target="_blank">未来必热：SVG Sprite技术介绍</a></p>
<ul>
<li>支持多色图标了，不再受单色限制。</li>
<li>支持像字体那样通过font-size,color来调整样式。</li>
<li>支持 ie9+</li>
<li>可利用CSS实现动画。</li>
<li>减少HTTP请求。</li>
<li>矢量，缩放不失真</li>
<li>可以很精细的控制SVG图标的每一部分</li>
</ul>
<p><strong>使用方法：</strong><br>第一步：拷贝项目下面生成的symbol代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="引入  ./iconfont.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">引入  ./iconfont.js</code></pre>
<p>第二步：加入通用css代码（引入一次就行）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">type</span>="<span class="hljs-selector-tag">text</span>/<span class="hljs-selector-tag">css</span>"&gt;
    <span class="hljs-selector-class">.icon</span> {
       <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
       <span class="hljs-attribute">vertical-align</span>: -<span class="hljs-number">0.15em</span>;
       <span class="hljs-attribute">fill</span>: currentColor;
       <span class="hljs-attribute">overflow</span>: hidden;
    }
&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<p>第三步：挑选相应图标并获取类名，应用于页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;>
    <use xlink:href=&quot;#icon-xxx&quot;></use>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#icon-xxx"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>使用svg-icon的好处是我再也不用发送<code>woff|eot|ttf|</code> 这些很多个字体库请求了，我所有的svg都可以内联在html内。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213286?w=760&amp;h=412" src="https://static.alili.tech/img/remote/1460000012213286?w=760&amp;h=412" alt="" title="" style="cursor: pointer; display: inline;"></span><br>还有一个就是 svg 是一个真正的矢量，不管你再怎么的放缩它都不会失真模糊，而且svg可以控制的属性也更加的丰富，也能做出更加生动和复杂的图标。现在ui设计师平时都喜欢使用 sketch 来工作，只要轻松一键就能导出 svg 了，所以 svg 也更受设计师的青睐。<a href="https://css-tricks.com/icon-fonts-vs-svg/" rel="nofollow noreferrer" target="_blank">Inline SVG vs Icon Fonts </a> 这篇文章详细的比较了 <code>svg</code> 和 <code>icon-font</code>的优劣，大家可以去看看。PS：这里其实还用到了 <code>SVG Sprite</code> 技术。简单的理解就是类 svg 的似雪碧图，它在一个 svg 之中运用 symbol 标示了一个一个的 svg 图标，这样一个页面中我们遇到同样的 svg 就不用重复再画一个了，直接使用<code>&lt;use xlink:href="#icon-QQ" x="50" y="50" /&gt;</code> 就能使用了，具体的细节可以看这篇文章开头的文章 <a href="http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/" rel="nofollow noreferrer" target="_blank">未来必热：SVG Sprite技术介绍</a>，在之后的文章中也会手摸手叫你自己如何制作 <code>SVG Sprite</code>。</p>
<h2 id="articleHeader6">创建 icon-component 组件</h2>
<p>我们有了图标，接下来就是如何在自己的项目中优雅的使用它了。<br>之后的代码都是基于 vue 的实例(ps: react 也很简单，原理都是类似的)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//components/Icon-svg
<template>
  <svg class=&quot;svg-icon&quot; aria-hidden=&quot;true&quot;>
    <use :xlink:href=&quot;iconName&quot;></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//components/Icon-svg
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"svg-icon"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">:xlink:href</span>=<span class="hljs-string">"iconName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'icon-svg'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">iconClass</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    iconName() {
      <span class="hljs-keyword">return</span> <span class="hljs-string">`#icon-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.iconClass}</span>`</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.svg-icon</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">vertical-align</span>: -<span class="hljs-number">0.15em</span>;
  <span class="hljs-attribute">fill</span>: currentColor;
  <span class="hljs-attribute">overflow</span>: hidden;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入svg组件
import IconSvg from '@/components/IconSvg'

//全局注册icon-svg
Vue.component('icon-svg', IconSvg)

//在代码中使用
<icon-svg icon-class=&quot;password&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//引入svg组件</span>
<span class="hljs-keyword">import</span> IconSvg <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/IconSvg'</span>

<span class="hljs-comment">//全局注册icon-svg</span>
Vue.component(<span class="hljs-string">'icon-svg'</span>, IconSvg)

<span class="hljs-comment">//在代码中使用</span>
&lt;icon-svg icon-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"password"</span> /&gt;</code></pre>
<p>就这样简单封装了一个 <code>Icon-svg</code> 组件 ，我们就可以简单优雅的在自己的vue项目之中使用图标了。</p>
<h2 id="articleHeader7">进一步改造</h2>
<p>但作为一个有逼格的前端开发，怎能就此满足呢!目前还是有一个致命的缺点的，就是现在所有的 <code>svg-sprite</code> 都是通过 iconfont 的 <code>iconfont.js</code> 生成的。</p>
<ul><li>首先它是一段用js来生成svg的代码，所有图标 icon 都很<strong>不直观</strong>。</li></ul>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213287?w=1470&amp;h=404" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="如图所示" title="如图所示" style="cursor: pointer;"></span><br>你完全不知道哪个图标名对应什么图标，一脸尼克扬问号??? 每次增删改图标只能整体js文件一起替换。</p>
<ul>
<li>其次它也做不到<strong>按需加载</strong>，不能根据我们使用了那些 svg 动态的生成 <code>svg-sprite</code>。</li>
<li>
<strong>自定义性差</strong>，通常导出的svg包含大量的无用信息，例如编辑器源信息、注释等。通常包含其它一些不会影响渲染结果或可以移除的内容。</li>
<li>
<strong>添加不友善</strong>，如果我有一些自定义的svg图标，该如何和原有的 <code>iconfont</code> 整合到一起呢？目前只能将其也上传到 <code>iconfont</code> 和原有的图标放在一个项目库中，之后再重新下载，很繁琐。</li>
</ul>
<h3 id="articleHeader8">使用 svg-sprite</h3>
<p>接下来我们就要自己来制作 <code>svg-sprite</code> 了。这里要使用到 <a href="https://github.com/kisenka/svg-sprite-loader" rel="nofollow noreferrer" target="_blank">svg-sprite-loader</a> 这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 <code>svg-sprite</code> 。</p>
<p>我们来介绍如何在 <code>vue-cli</code> 的基础上进行改造，加入 <code>svg-sprite-loader</code>。</p>
<p>我们发现<code>vue-cli</code>默认情况下会使用 <code>url-loader</code> 对svg进行处理，会将它放在<code>/img</code> 目录下，所以这时候我们引入<code>svg-sprite-loader</code> 会引发一些冲突。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//默认`vue-cli` 对svg做的处理，正则匹配后缀名为.svg的文件，匹配成功之后使用 url-loader 进行处理。
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//默认`vue-cli` 对svg做的处理，正则匹配后缀名为.svg的文件，匹配成功之后使用 url-loader 进行处理。</span>
 {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
      <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
    }
}</code></pre>
<p>解决方案有两种，最简单的就是你可以将 test 的 svg 去掉，这样就不会对svg做处理了，当然这样做是很不友善的。</p>
<ul>
<li>你不能保证你所有的 svg 都是用来当做 icon的，有些真的可能只是用来当做图片资源的。</li>
<li>不能确保你使用的一些第三方类库会使用到 svg。</li>
</ul>
<p>所以最安全合理的做法是使用 webpack 的 <a href="https://webpack.js.org/configuration/module/#rule-exclude" rel="nofollow noreferrer" target="_blank">exclude</a> 和 <a href="https://webpack.js.org/configuration/module/#rule-include" rel="nofollow noreferrer" target="_blank">include</a> ，让<code>svg-sprite-loader</code>只处理你指定文件夹下面的 svg，<code>url-loaer</code>只处理除此文件夹之外的所以 svg，这样就完美解决了之前冲突的问题。<br>代码如下</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213288?w=490&amp;h=308" src="https://static.alili.tech/img/remote/1460000012213288?w=490&amp;h=308" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这样配置好了，只要引入svg之后填写类名就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import '@/src/icons/qq.svg; //引入图标

<svg><use xlink:href=&quot;#qq&quot; /></svg>  //使用图标
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> <span class="hljs-string">'@/src/icons/qq.svg; //引入图标

&lt;svg&gt;&lt;use xlink:href="#qq" /&gt;&lt;/svg&gt;  //使用图标
</span></code></pre>
<p>单这样还是非常的不优雅，如果我项目中有一百个 icon，难不成我要手动一个个引入么！ <strong>偷懒是程序员的第一生产力！！！</strong></p>
<h2 id="articleHeader9">自动导入</h2>
<p>首先我们创建一个专门放置图标 icon 的文件夹如：<code>@/src/icons</code>，将所有 icon 放在这个文件夹下。<br>之后我们就要使用到 webpack 的 <a href="https://webpack.js.org/guides/dependency-management/#require-context" rel="nofollow noreferrer" target="_blank">require.context</a>。很多人对于 <code>require.context</code>可能比较陌生，直白的解释就是</p>
<blockquote>require.context("./test", false, /.test.js$/);<br>这行代码就会去 test 文件夹（不包含子目录）下面的找所有文件名以 <code>.test.js</code> 结尾的文件能被 require 的文件。<br>更直白的说就是 我们可以通过正则匹配引入相应的文件模块。</blockquote>
<p>require.context有三个参数：</p>
<ul>
<li>directory：说明需要检索的目录</li>
<li>useSubdirectories：是否检索子目录</li>
<li>regExp: 匹配文件的正则表达式</li>
</ul>
<p>了解这些之后，我们就可以这样写来自动引入 <code>@/src/icons</code> 下面所有的图标了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> requireAll = <span class="hljs-function"><span class="hljs-params">requireContext</span> =&gt;</span> requireContext.keys().map(requireContext)
<span class="hljs-keyword">const</span> req = <span class="hljs-built_in">require</span>.context(<span class="hljs-string">'./svg'</span>, <span class="hljs-literal">false</span>, /\.svg$/)
requireAll(req)</code></pre>
<p>之后我们增删改图标直接直接文件夹下对应的图标就好了，什么都不用管，就会自动生成 <code>svg symbol</code>了。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213289?w=1156&amp;h=138" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">更进一步优化自己的svg</h2>
<p>首先我们来看一下 从 <code>阿里iconfont</code> 网站上导出的 svg 长什么样？</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213290?w=1482&amp;h=362" src="https://static.alili.tech/img/remote/1460000012213290?w=1482&amp;h=362" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>没错虽然 iconfont 网站导出的 svg 内容已经算蛮精简的了，但你会发现其实还是与很多无用的信息，造成了不必要的冗余。就连 iconfont 网站导出的 svg 都这样，更不用说那些更在意 ui漂不漂亮不懂技术的设计师了(可能)导出的svg了。好在 <code>svg-sprite-loader</code>也考虑到了这点，它目前只会获取 svg 中 path 的内容，而其它的信息一概不会获取。生成 svg 如下图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213291?w=1146&amp;h=105" src="https://static.alili.tech/img/remote/1460000012213291?w=1146&amp;h=105" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>但任何你在 path 中产生的冗余信息它就不会做处理了。如注释什么的</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000012213292?w=1512&amp;h=296" src="https://static.alili.tech/img/remote/1460000012213292?w=1512&amp;h=296" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这时候我们就要使用另一个很好用的东西了-- <a href="https://github.com/svg/svgo" rel="nofollow noreferrer" target="_blank">svgo</a></p>
<blockquote>SVG files, especially exported from various editors, usually contain a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.</blockquote>
<p>它支持几十种优化项，非常的强大，8k+的star 也足以说明了问题。</p>
<p>详细的操作可以参照 <a href="https://github.com/svg/svgo" rel="nofollow noreferrer" target="_blank">官方文档</a> <a href="http://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/" rel="nofollow noreferrer" target="_blank">张鑫旭大大的文章</a>（没错又是这位大大的文章，或许这就是大佬吧！）本文就不展开了。</p>
<h2 id="articleHeader11">写在最后</h2>
<p>上面大概阐述了一下前端项目中 icon 使用的演进史。<br>总的来说还是那句话，<strong>适合的才是最好的</strong>。就拿之前争论的选择 vue react 还是 angular，个人觉得每个框架都有自己的特点和适用的业务场景，所以所有不结合业务场景的推荐和讨论都是瞎bb。。。如上文其实大概讲了五种前端icon的使用场景，第一种<code>Font Awesome</code>不用它并不是因为它不好，而是业务场景不适合，如果你团队没有专门的设计师或者对 icon 的自定义度不高完全可以使用它，<a href="https://github.com/FortAwesome/Font-Awesome" rel="nofollow noreferrer" target="_blank">Font Awesome</a> github有五万多 star，足见社区对它的认可。还比如说，你们项目对低端浏览器有较高的适配要求，你还强行要用 svg 作为图标 icon，那你真的是存心和自己过不去了。所以所有方案都没有绝对的优与劣之分，适合自己业务场景，解决自己实际痛点，提高自己开发效率的方案就是好的方案。</p>
<h2 id="articleHeader12">占坑</h2>
<p>本文所涉及的技术在 <a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a> 中可以找到完整的实例。<br><code>vue-element-admin</code>也发布了新版本和配套的<a href="https://panjiachen.github.io/vue-element-admin-site/#/" rel="nofollow noreferrer" target="_blank">中文文档</a>(文档真的写的我要吐血了)不管使不使用本项目都推荐一看，应该能对你写vue的项目有所帮助。欢迎使用和提出不足。<br>楼主个人免费<a href="https://jianshiapp.com/circles/1209" rel="nofollow noreferrer" target="_blank">圈子</a>。</p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000012213278](https://segmentfault.com/a/1190000012213278)

## 原文标题
手摸手，带你优雅的使用 icon
