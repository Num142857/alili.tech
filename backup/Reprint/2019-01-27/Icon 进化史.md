---
title: 'Icon 进化史' 
date: 2019-01-27 2:31:00
hidden: true
slug: adal5cm5rlr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">“南方古猿”之 png sprite</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008199114?w=822&amp;h=288" src="https://static.alili.tech/img/remote/1460000008199114?w=822&amp;h=288" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看到上面这张图，相信好多资深前端会感到很亲切。</p>
<p>早期为了减少资源的请求，人们想到了将小的 png 图片合并到一张图上，然后根据 <code>background-position</code>   来显示不同的图片。</p>
<p>早期还有靠人肉来测量坐标，随着构建工具的发展，我们可以用一些插件，如 <a href="https://github.com/Ensighten/grunt-spritesmith" rel="nofollow noreferrer" target="_blank">grunt-spritesmith</a>、<a href="https://github.com/twolfson/gulp.spritesmith" rel="nofollow noreferrer" target="_blank">gulp.spritesmith</a> 等。它可以帮助我们自动合成，并生成好 css， 位置都计算好的。</p>
<p>那么使用 png 图片这种方式它的优点就是兼容性好。但是一旦开发多了，它的不便变体现出来了，换颜色、改大小、透明度、多倍屏等等。</p>
<p>所以对于这种方式我们只能缅怀。</p>
<h2 id="articleHeader1">“能人”之 Iconfont</h2>
<p>于是人们又想出了用字体文件取代图片文件：Iconfont。</p>
<p>虽然早期制作或寻找合适字体比较麻烦，但随着各种字体库的网站出现，如： <a href="http://www.iconfont.cn" rel="nofollow noreferrer" target="_blank">http://www.iconfont.cn</a> ，那都不是事了。再加上 css 的自定义字体的兼容性非常好，Iconfont 迅速开始流行起来。以这个站为例，大概看下使用方法：</p>
<ol>
<li><p>在 Iconfont 中创建自己的项目，将需要使用的图标添加到自己的项目中。</p></li>
<li><p>复制出 Unicode 或 Font class</p></li>
<li><p>全部代码如下</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@font-face {
  font-family: 'iconfont';  /* project id 38792 */
  src: url('//at.alicdn.com/t/font_1444792316_9706304.eot');
  src: url('//at.alicdn.com/t/font_1444792316_9706304.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1444792316_9706304.woff') format('woff'),
  url('//at.alicdn.com/t/font_1444792316_9706304.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1444792316_9706304.svg#iconfont') format('svg');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">font-face</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'iconfont'</span>;  <span class="hljs-comment">/* project id 38792 */</span>
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'//at.alicdn.com/t/font_1444792316_9706304.eot'</span>);
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'//at.alicdn.com/t/font_1444792316_9706304.eot?#iefix'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'embedded-opentype'</span>),
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'//at.alicdn.com/t/font_1444792316_9706304.woff'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>),
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'//at.alicdn.com/t/font_1444792316_9706304.ttf'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>),
  <span class="hljs-built_in">url</span>(<span class="hljs-string">'//at.alicdn.com/t/font_1444792316_9706304.svg#iconfont'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'svg'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".iconfont {
  font-family:&quot;iconfont&quot; !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-tishi:before { content: &quot;\e600&quot;; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.iconfont</span> {
  <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"iconfont"</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;
  <span class="hljs-attribute">font-style</span>:normal;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}

<span class="hljs-selector-class">.icon-tishi</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e600"</span>; }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;iconfont icon-tishi&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-tishi"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/maming/pen/YNpMwd" rel="nofollow noreferrer" target="_blank">这里有demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="maming/pen/YNpMwd" data-typeid="3">点击预览</button></p>
<p>在实际开发中，我们会把常用的一些图标封装成<a href="http://uxcore.coding.me/css/iconfont/" rel="nofollow noreferrer" target="_blank">组件</a>，直接使用。像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;kuma-icon kuma-icon-success&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"kuma-icon kuma-icon-success"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></code></pre>
<p>Iconfont 用起来挺方便的，而且兼容性也十分的好，大小、颜色可随意改变。</p>
<p>但它仍有缺陷：</p>
<ol>
<li><p>字体需要加载资源</p></li>
<li><p>有时候可能会出现锯齿</p></li>
<li><p>只能被渲染成单色或者css3的渐变色</p></li>
</ol>
<p>所以我们要继续进化。</p>
<h2 id="articleHeader2">“直立人”之 svg symbol</h2>
<p>使用 svg ，这里所谓的进化并不是 svg 本身的进化，因为 svg 并不晚于 Iconfont。只是环境（兼容性）的原因导致它无用武之地。就像最近火的一塌糊涂的 AI, 其实最早在 1956 年就提出了。随着外界因素的进化，IE6/7/8 的淘汰， android 4.x 的开始，svg 的机会变到来了。先看下兼容性：<br><span class="img-wrap"><img data-src="/img/remote/1460000008199115?w=2492&amp;h=724" src="https://static.alili.tech/img/remote/1460000008199115?w=2492&amp;h=724" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG" rel="nofollow noreferrer" target="_blank">svg</a> 的使用方式：</h3>
<ul>
<li>
<p>保存成文件</p>
<ul><li><p>需要请求加载资源</p></li></ul>
</li>
<li>
<p>inline 方式</p>
<ul><li><p>在 html 一坨坨，很麻烦</p></li></ul>
</li>
<li>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol" rel="nofollow noreferrer" target="_blank">symbol</a></p>
<ul><li><p>适合我们做组件</p></li></ul>
</li>
</ul>
<blockquote><p>The <code>&lt;symbol&gt;</code> element is used to define graphical template objects which can be instantiated by a <code>&lt;use&gt;</code> element.</p></blockquote>
<p>通过 &lt;symbol&gt; 定义的 svg 模板，我们可以使用 &lt;use&gt; 来加载它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;120&quot; height=&quot;140&quot;>
<!-- symbol definition  NEVER draw -->
<symbol id=&quot;sym01&quot; viewBox=&quot;0 0 150 110&quot;>
  <circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;40&quot; stroke-width=&quot;8&quot;
      stroke=&quot;red&quot; fill=&quot;red&quot;/>
  <circle cx=&quot;90&quot; cy=&quot;60&quot; r=&quot;40&quot; stroke-width=&quot;8&quot;
      stroke=&quot;green&quot; fill=&quot;white&quot;/>
</symbol>

<!-- actual drawing by &quot;use&quot; element -->
<use xlink:href=&quot;#sym01&quot;
     x=&quot;0&quot; y=&quot;0&quot; width=&quot;100&quot; height=&quot;50&quot;/>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"140"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- symbol definition  NEVER draw --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sym01"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 150 110"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"40"</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"8"</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">"red"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"red"</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"90"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"60"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"40"</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"8"</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">"green"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"white"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>

<span class="hljs-comment">&lt;!-- actual drawing by "use" element --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#sym01"</span>
     <span class="hljs-attr">x</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"50"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>那么 &lt;symbol&gt; 是怎么来的呢？</p>
<p>同样，在这个构建工具十分发达的时刻。<br>最开始我们使用了 <a href="https://github.com/Hiswe/gulp-svg-symbols" rel="nofollow noreferrer" target="_blank">gulp-svg-symbols</a>，它可以将指定目录中的 svg 自动合并到一个 svg 文件中，文件里包括了所有 icon 的 symbol 模板，然后再将这个模板将其隐藏放到 index.html 中。</p>
<p>但是这个库有个坑点是它依赖了一个 Unicode 的包，这个包在国内安装炒鸡慢，于是我们弃用了它，使用了<a href="https://github.com/w0rm/gulp-svgstore" rel="nofollow noreferrer" target="_blank">gulp-svgstore</a></p>
<p>按照这种方式我们成功的开发一 <a href="https://github.com/saltjs/salt-ui/blob/master/demo/src/pages/icon/PageIcon.js" rel="nofollow noreferrer" target="_blank">salt-icon</a> 这个组件，里面包括了一些常用的 icon。使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <Icon name=&quot;success&quot; className=&quot;icon-success&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;Icon name=<span class="hljs-string">"success"</span> className=<span class="hljs-string">"icon-success"</span>/&gt;</code></pre>
<p>这样我们在 mobile 端用 svg 替代了 Iconfont，解决了上述 Iconfont 提到的问题。</p>
<p>但是很快我们就发现，在 index.html 中引入那一坨 symbol 模板是极其恶心的。</p>
<p>随着 <a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack</a> 打包的成熟，各种 loader，我们将那一坨 symbol 模板直接打包成一个 salt-icon-source.js 文件，在这个文件中将其 append 到 body 上。</p>
<p>同时发现了上述提到的 <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont 网站</a>也支持直接导出 symbol 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import IconSource from './svg/salt-icon-symbols.svg';


const WRAPPER_ID = '__SaltIconSymbols__';
const doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);
if (!wrapper) {
  wrapper = doc.createElement('div');
  wrapper.id = WRAPPER_ID;
  wrapper.style.display = 'none';
  doc.body.appendChild(wrapper);
  ReactDOM.render(<IconSource />, wrapper);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> IconSource <span class="hljs-keyword">from</span> <span class="hljs-string">'./svg/salt-icon-symbols.svg'</span>;


<span class="hljs-keyword">const</span> WRAPPER_ID = <span class="hljs-string">'__SaltIconSymbols__'</span>;
<span class="hljs-keyword">const</span> doc = <span class="hljs-built_in">document</span>;
<span class="hljs-keyword">let</span> wrapper = doc.getElementById(WRAPPER_ID);
<span class="hljs-keyword">if</span> (!wrapper) {
  wrapper = doc.createElement(<span class="hljs-string">'div'</span>);
  wrapper.id = WRAPPER_ID;
  wrapper.style.display = <span class="hljs-string">'none'</span>;
  doc.body.appendChild(wrapper);
  ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconSource</span> /&gt;</span>, wrapper);
}</span></code></pre>
<p>这样虽然解决了引入模板的那个问题，但是后面又发现的 symbol 在安卓 4.3.x 下无法显示，也就是说 symbol 的兼容性并没有直接使用 svg 好。</p>
<p>然后我们通过使用一个叫 <a href="https://github.com/jonathantneal/svg4everybody" rel="nofollow noreferrer" target="_blank">svg4everybody</a> 的库，解决了上述兼容性问题。（它的原理是如果发现不支持 symbol 的，它会通过 xlink:href 拿到 svg 的资源，然后动态创建一个 svg,插入到当前位置）</p>
<p>虽然解决了兼容性的问题，但是我们深深的感觉到了这种方式的不优雅。</p>
<p>讲的这里，可能会有人会有疑问，既然已经有 <a href="https://github.com/jhamlet/svg-react-loader" rel="nofollow noreferrer" target="_blank">svg-react-loader</a> 了，为什么不直接 import svg 文件？</p>
<p>业务中使用的图片当然可以直接 import 加载，但一些通过的图标我们希望是能统一起来，做出组件，更方便的使用。</p>
<p>而且我们组件中还会对 svg 处理了它事件不能冒泡的问题，也就是在某些低版本的安卓机上，svg 图标是无法点击的。解决方案有两种：</p>
<ul>
<li><p>贴膜，不过这样会导致多一层结构嵌套</p></li>
<li><p>去掉事件</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="svg {
  pointer-events: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">svg</span> {
  <span class="hljs-attribute">pointer-events</span>: none;
}</code></pre>
<p>不过，这个问题可以给我带来启示，‘既然已经有 <a href="https://github.com/jhamlet/svg-react-loader" rel="nofollow noreferrer" target="_blank">svg-react-loader</a> 了’，那么 svg-loader 里做了什么呢？symbol 的方式或许真的可以淘汰了。</p>
<h2 id="articleHeader4">“智人”之 svg</h2>
<p>看下 <a href="https://github.com/jhamlet/svg-react-loader" rel="nofollow noreferrer" target="_blank">svg-react-loader</a> 的实现<br>首先有一个模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  render () {
    const props = this.props;
      return (
        <svg {...props}>
          <%= innerXml %>
        </svg>
      );
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  render () {
    <span class="hljs-keyword">const</span> props = <span class="hljs-keyword">this</span>.props;
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> {<span class="hljs-attr">...props</span>}&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">innerXml</span> %&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></span>
      );
    }</code></pre>
<p>然后有一个 sanitize.js ，会对 svg 做一些处理，加上标准的 xml namespace, 把 React 特有的属性 class / for 转化为 className / htmlFor, 把属性名转化为驼峰。</p>
<p>最后根据模板生成这样一段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require('react');

module.exports = React.createClass({

    displayName: &quot;Test&quot;,

    getDefaultProps () {
        return {&quot;width&quot;:&quot;1024&quot;,&quot;height&quot;:&quot;1024&quot;,&quot;viewBox&quot;:&quot;0 0 1024 1024&quot;,&quot;version&quot;:&quot;1.1&quot;,&quot;xmlns&quot;:&quot;http://www.w3.org/2000/svg&quot;};
    },

    render () {
        var props = this.props;

        return <svg {...props}>
          <path d=&quot;M512.002047... fill=&quot;#272636&quot;/>
        </svg>;
    }
});&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);

<span class="hljs-built_in">module</span>.exports = React.createClass({

    <span class="hljs-attr">displayName</span>: <span class="hljs-string">"Test"</span>,

    getDefaultProps () {
        <span class="hljs-keyword">return</span> {<span class="hljs-string">"width"</span>:<span class="hljs-string">"1024"</span>,<span class="hljs-string">"height"</span>:<span class="hljs-string">"1024"</span>,<span class="hljs-string">"viewBox"</span>:<span class="hljs-string">"0 0 1024 1024"</span>,<span class="hljs-string">"version"</span>:<span class="hljs-string">"1.1"</span>,<span class="hljs-string">"xmlns"</span>:<span class="hljs-string">"http://www.w3.org/2000/svg"</span>};
    },

    render () {
        <span class="hljs-keyword">var</span> props = <span class="hljs-keyword">this</span>.props;

        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> {<span class="hljs-attr">...props</span>}&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M512.002047... fill="</span>#<span class="hljs-attr">272636</span>"/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>;
    }
});"</span></code></pre>
<p>这样的代码我们就可以直接在 react 中直接使用了。</p>
<p>所以我们的组件借助这样的思想，完全弃用了 symbol 模式。</p>
<p>我们先扫描对应的 svg 文件，将其按上面的思路生成一个个单独的 js 文件。<br>在组件层面可以再封装一层，统一引入，提供一个通用的调用方式，和上面一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <Icon name=&quot;success&quot; className=&quot;icon-success&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    &lt;Icon name=<span class="hljs-string">"success"</span> className=<span class="hljs-string">"icon-success"</span>/&gt;</code></pre>
<p>更好的是你也可以单独引用每一个文件，减小使用体积。</p>
<p>最后我们憧憬一下，随着 react 15.x 的发布，react 对 svg 的支持越来越好了，随着 IE 8 也即将被遗弃，我们的 PC 端也有望从 Iconfont 转换到 svg 了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Icon 进化史

## 原文链接
[https://segmentfault.com/a/1190000008199111](https://segmentfault.com/a/1190000008199111)

