---
title: 'rem : web app适配的秘密武器' 
date: 2019-02-10 2:30:42
hidden: true
slug: pboomcy145b
categories: [reprint]
---

{{< raw >}}

                    
<p>最近看到这样一个提问：<a href="https://segmentfault.com/q/1010000005148519?_ea=802799">我有一个750 x 1500尺寸的设计稿，设计稿上有一个150 x 50的按钮，那么在写页面布局的时候，应该如何确定按钮的尺寸呢？</a>。大多数同学在回答的时候提到了rem。但我发现很多同学对于rem的实际应用还存在一点小小的疑问和误解。</p>
<p>于是问题来了，rem到底是什么？rem是为了解决什么问题而存在的？rem能够给我们带来什么样的便利？带着这样的问题，我们一起来总结一下rem的实践。刚好工作中有一个移动端页面的需求要做，就尝试使用rem完成了一个小小的页面适配。大家可以点击这里，查看<a href="https://www.itiger.com/activity/forapp/invitation/" rel="nofollow noreferrer" target="_blank">rem适配demo</a>，</p>
<blockquote><p>建议大家在chrome的device module下打开，通过切换不同手机的模拟器来查看不同尺寸下的区别。</p></blockquote>
<h5>rem是什么？</h5>
<p>rem是一个相对于根元素字体大小的css单位。与px一样，他可以用来设置字体大小，也可以用来设置长度单位。相对于根元素字体大小是什么意思？</p>
<p>举个栗子。在页面中，html元素是根元素，因此我们首先给html设置一个字体大小</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html { font-size: 100px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">html</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>; }</code></pre>
<p>于是，在整个页面中，就有这样的换算公式 ： <code>1rem = 100px</code></p>
<p>所以如果一个按钮，有如下的css样式，就等同于他的宽为100px，高50px.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn { width: 1rem; height: 0.5rem; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">btn</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">1rem</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">0.5rem</span>; }</code></pre>
<p>这就是rem这个知识点的所有真相了。</p>
<p>！！！什么？这就完了？这和px有什么区别？</p>
<p>对啊，这和px本来就没有特别的区别，就是一个尺寸单位嘛！</p>
<p>所以提问的那个同学拿着750x1500设计图来问，当我们设置为html的字体大小为100px时，<br>150x50的按钮应该在页面里面写什么尺寸？，用px就应该写 75x25，用rem就是 0.75 x 0.25.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="真实宽度375px / 设计图宽度750px = 按钮真实宽度 / 设计图按钮宽度150px
==> 按钮真实宽度 = 75px

又 1rem = 100px;   ==> 75px = 0.75rem" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">真实宽度<span class="hljs-number">375</span>px / 设计图宽度<span class="hljs-number">750</span>px = 按钮真实宽度 / 设计图按钮宽度<span class="hljs-number">150</span>px
==&gt; 按钮真实宽度 = <span class="hljs-number">75</span>px

又 <span class="hljs-number">1</span>rem = <span class="hljs-number">100</span>px;   ==&gt; <span class="hljs-number">75</span>px = <span class="hljs-number">0.75</span>rem</code></pre>
<p>有的时候我们希望在设计图直接量出来的尺寸不用除2直接得到rem的值，也就是说量出来是150px，那么用rem表示就是1.5rem。这个时候我们只需要修改html的字体大小为50px即可。那么计算思路就有一点不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="真实宽度375px / 设计图宽度750px = 按钮真实宽度 / 设计图按钮宽度150px
==> 按钮真实宽度 = 75px

又 1rem = 50px;   ==> 75px = 1.5rem" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">真实宽度<span class="hljs-number">375</span>px / 设计图宽度<span class="hljs-number">750</span>px = 按钮真实宽度 / 设计图按钮宽度<span class="hljs-number">150</span>px
==&gt; 按钮真实宽度 = <span class="hljs-number">75</span>px

又 <span class="hljs-number">1</span>rem = <span class="hljs-number">50</span>px;   ==&gt; <span class="hljs-number">75</span>px = <span class="hljs-number">1.5</span>rem</code></pre>
<p>因此当设计图的尺寸发生改变时，我们需要根据上述思路，动态的调整html的字体大小，以达到我们想要的rem换算。</p>
<h5>rem是为了解决什么问题而存在的？</h5>
<p>以iphone各种手机的尺寸来说，iPhone4,5 宽度320px，iPhone6 375px，iPhone6 plus 414px. 如果一个按钮，固定一个75x25的尺寸，那么就必然会导致在不同尺寸下的相对大小不一样。这带来的问题就在于会直接影响到设计的美观，可能在iPhone6下，一个完美的设计图，到了iPhone5,就变得low很多。 因为，为了让页面元素的尺寸能够在设备宽度变化的时候也跟着变化，rem就出现了。</p>
<p>我们已经知道，rem的相对大小跟html元素的字体大小有关系。使用rem适配的原理就是我们只需要在设备宽度大小变化的时候，调整html的字体大小，那么页面上所有使用rem单位的元素都会相应的变化。 这也是rem与px最大的区别。</p>
<p>有css与js两种方式来调整html元素大小的值。  </p>
<p>css方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html { font-size: calc(100vw / 3.75) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">html</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(100vw / 3.75) }</code></pre>
<p>100vw表示设备宽度，除以3.75这里是以iphone6 的宽度375px为标准，为了保证html的字体大小为100px。这样我们在换算的时候，1px 就是0.01rem，就很容易计算。</p>
<blockquote><p>因为chrome下最小字体大小为12px，所以不能把html的font-size设置成1px或者10px，100px是我们最好的选择。</p></blockquote>
<p>js方式， 原理与css一样，不过为了避免在一些老旧一点的手机浏览器上不支持calc，vm这些属性，在实际应用中使用js是最好的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!function () {
   function a() {
       var _width;
       var clientWidth = document.documentElement.clientWidth;
       if (clientWidth > 568) {
           _width = 568;
       } else if (clientWidth < 320) {
           _width = 320;
       } else {
               _width = clientWidth;
       }
       // var pageWid = (window.innerWidth > document.querySelector('body').offsetHeight) ? 1136 : 640;
       document.documentElement.style.fontSize = _width / 375 * 100 + &quot;px&quot;;
   }
   var b = null;
   document.addEventListener(&quot;DOMContentLoaded&quot;, function () {
       window.addEventListener(&quot;resize&quot;, function () {
           clearTimeout(b);
           b = setTimeout(a, 300)
       }, !1);
       a()
   }, false);
}(window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">!<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">var</span> _width;
       <span class="hljs-keyword">var</span> clientWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth;
       <span class="hljs-keyword">if</span> (clientWidth &gt; <span class="hljs-number">568</span>) {
           _width = <span class="hljs-number">568</span>;
       } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (clientWidth &lt; <span class="hljs-number">320</span>) {
           _width = <span class="hljs-number">320</span>;
       } <span class="hljs-keyword">else</span> {
               _width = clientWidth;
       }
       <span class="hljs-comment">// var pageWid = (window.innerWidth &gt; document.querySelector('body').offsetHeight) ? 1136 : 640;</span>
       <span class="hljs-built_in">document</span>.documentElement.style.fontSize = _width / <span class="hljs-number">375</span> * <span class="hljs-number">100</span> + <span class="hljs-string">"px"</span>;
   }
   <span class="hljs-keyword">var</span> b = <span class="hljs-literal">null</span>;
   <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"resize"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
           clearTimeout(b);
           b = setTimeout(a, <span class="hljs-number">300</span>)
       }, !<span class="hljs-number">1</span>);
       a()
   }, <span class="hljs-literal">false</span>);
}(<span class="hljs-built_in">window</span>);</code></pre>
<p>在实践中还有一个关键的问题需要处理。就是无论如何js的加载会比css慢，因此如果我们就这样的话，页面的元素会有一个很明显的闪烁过程，因为再js加载进来之前，html的字体大小还没有达到我们想要的效果。因此通常我们需要在css中，给html的字体大小设置一个默认值，以弱化这个闪烁的过程。默认值的具体大小需要我们自行根据设计图的尺寸，以及你想要的结果，通过上面我们介绍的计算思路去得出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
  font-size: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<h5>需要注意的地方</h5>
<p>一、rem的适用性很有局限，仅仅只能够用于只在移动端展示的页面。如果你的页面还需要适配到pc端，那么就老老实实的使用px吧。在上面的实现中，我通过判断设定了html字体大小的范围来避免pc上显示过于夸张。</p>
<p>二、有的同学可能对web的适配有点误解。web中做适配并不需要考虑什么物理像素啊，dpi等等概念。这些应该仅仅只是Android或者ios原生app才会考虑的问题。这些误会导致许多搞设计的同学在给web app做设计的时候，也丢一张1080 x 1920 的设计稿过来，真是愁死人了。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
rem : web app适配的秘密武器

## 原文链接
[https://segmentfault.com/a/1190000005162403](https://segmentfault.com/a/1190000005162403)

