---
title: '原生 JS 获取元素的尺寸和位置' 
date: 2019-01-30 2:30:23
hidden: true
slug: vnfjnyhpi3l
categories: [reprint]
---

{{< raw >}}

                    
<p>关于元素的尺寸和位置，这原本是 CSS 干的事，但更多的时候需要用 JavaScript 来获取这些参数，比如一个很好的例子 js 实现的图片瀑布流。</p>
<p><span class="img-wrap"><img data-src="/img/bVGp85?w=680&amp;h=451" src="https://static.alili.tech/img/bVGp85?w=680&amp;h=451" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在介绍 JS 中的例子之前，先来说明一下 css 中的元素尺寸。</p>
<h2 id="articleHeader0">CSS 中的 width 和 height</h2>
<p>先开个头吧，一个元素所占据的物理尺寸包括以下几个部分，由内到外分别是内容，padding，border，margin，这些值加到一起才算是一个元素真实尺寸。这里面并没有把滚动条的宽度算上，因为滚动条时占用 padding 的宽度的，如果 padding 宽度小于滚动条，那么滚动条多出来的部分将占用内容的宽度。<a href="http://blog.csdn.net/huzhigenlaohu/article/details/49636041" rel="nofollow noreferrer" target="_blank">padding与滚动条关系</a>。</p>
<p>比如下面的这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<div class=&quot;test&quot;></div>

// css style
.test{
    width:100px;
    height: 100px;
    padding:10px;
    border:2px solid black;
    margin: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// html</span>
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"test"</span>&gt;&lt;/div&gt;

<span class="hljs-comment">// css style</span>
.test{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid black;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGp8P?w=221&amp;h=170" src="https://static.alili.tech/img/bVGp8P?w=221&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图是 chrome 调试下的 styles，所以 <code>.test</code> 的实际宽度应该是 100px + 20px + 4px + 10px = 134px，这里把 margin 也算进去，高度的计算同理。知道这一点很重要，当我们需要精确设定元素宽度的时候，就不会因为尺寸过大而把元素挤到下一行。</p>
<p>不过，这是入门级的 CSS。除此之外，还需要知道一个非常重要的 CSS 样式，即 <code>box-sizing</code>，可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing" rel="nofollow noreferrer" target="_blank">MDN</a> 上的介绍。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 关键字值 */
box-sizing: content-box;
box-sizing: border-box;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-comment">/* 关键字值 */</span>
<span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>;
<span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>;</code></pre>
<p><code>box-sizing</code> 有两个关键字（据说还有一个 padding-box，反正我在 chrome 上测试不成功），content-box 是默认值，此时 width 只表示内容 content，border-box 表示元素的 width 等于 content + padding + border 三者之和。border-box 非常有用，尤其当我们在使用 100% 来规定宽高的时候，如果元素存在 border 或 padding，将直接导致元素的实际大小大于 100%，估计还有人记得 <code>calc</code> 带来的痛苦。</p>
<p>修改上面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test{
  width:100px;
  height: 100px;
  padding:10px;
  border:2px solid black;
  margin: 5px;
  box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.test</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid black;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGp8V?w=220&amp;h=175" src="https://static.alili.tech/img/bVGp8V?w=220&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>76 + 20 + 4 = 100px</code>，此时的 width 表示三者之和，而内容的宽度只有 76px 了。</p>
<h2 id="articleHeader1">JS 获取元素尺寸</h2>
<p>千万不要尝试用 element.style.width 或 element.style.height 来获得元素的高度和宽度，它们的默认值都是 0，除非你在 html 元素里面设置，否则 <strong>js 是无法获得 css 的样式的</strong>，必须要用其他的方法。比如下面这段代码 <code>element.style.width</code> 的值才是 100px：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot; style=&quot;width:100px&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"test"</span> style=<span class="hljs-string">"width:100px"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>JS 中 element 对象提供 <code>offsetHeight</code>, <code>scrollHeight</code>, <code>clientHeight</code>(每个都对应 width)，其中：</p>
<p><strong>offsetHeight 可以用来计算元素的物理空间</strong>，此空间包括内容，padding 和 border（还包括滚动条的宽度，但大多时候滚动条的宽度是计算到 padding 和内容中的）。</p>
<p><span class="img-wrap"><img data-src="/img/bVGp8X?w=219&amp;h=176" src="https://static.alili.tech/img/bVGp8X?w=219&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = document.getElementsByClassName('test')[0];
test.offsetHeight // 100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = document.getElementsByClassName('<span class="hljs-keyword">test</span>')[0];
<span class="hljs-keyword">test</span>.offsetHeight <span class="hljs-comment">// 100</span></code></pre>
<p><strong>scrollHeight 用来计算可滚动容器的大小，包括不可见的部分</strong>，比如一个 300*300 的容器放入一个 600*600 的图片，此时 scrollHeight 为 600，当然，scrollHeight 的值需要加上 padding 的值。</p>
<p><strong>clientHeight 表示可视区域，包括内容和 padding ，如果有滚动条，还需要减去滚动条的宽度</strong>。</p>
<p>举个例子，还是之前那个 test，加入 test2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot;>
    <div class=&quot;test2&quot;></div>
</div>

//css
.test{
  overflow: auto; //新增
}
.test2{
    width: 150px;
    height: 150px;
    background-color: gray;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"test"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"test2"</span>&gt;&lt;/div&gt;
&lt;/div&gt;

<span class="hljs-comment">//css</span>
.test{
  <span class="hljs-attribute">overflow</span>: auto; <span class="hljs-comment">//新增</span>
}
.test2{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">background-color</span>: gray;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGp8Y?w=162&amp;h=119" src="https://static.alili.tech/img/bVGp8Y?w=162&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>来看一看 test 的输出值是多少：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = document.getElementsByClassName('test')[0];
test.offsetHeight // 100
test.scrollHeight // 170
test.clientHeight // 79" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span> = document.getElementsByClassName('<span class="hljs-keyword">test</span>')[0];
<span class="hljs-keyword">test</span>.offsetHeight <span class="hljs-comment">// 100</span>
<span class="hljs-keyword">test</span>.scrollHeight <span class="hljs-comment">// 170</span>
<span class="hljs-keyword">test</span>.clientHeight <span class="hljs-comment">// 79</span></code></pre>
<p>此时滚动条的宽度是 17px，根据前面的介绍，滚动条时占用 padding 和 content 宽度的，而 17px 大于 padding 的 10px，故还有 7px 会占据 content。</p>
<p>分析一下，offsetHeight 的值是 100，padding 10px，滚动条虽然存在，但是占了 padding 和内容的空间，offsetHeight 的值是 4+20+76 = 100px。scrollHeight 的值是可滚动的范围加上padding 值，同样不包括滚动条，即 150+20 = 170px。clientHeight 的值是可见区域，但是不包括滚动条的值（滚动条。。。），所以20+76-17 = 79px。</p>
<p>其实也不是非常复杂。这个时候可以得出滚动条宽度的计算：offsetHeight 减去 border 和 clientHeight 的和就是滚动条宽度。</p>
<h2 id="articleHeader2">获取元素内容的尺寸</h2>
<p>刚说了半天，还是无法获得元素内容的尺寸，最接近内容宽度的是 clientHeight，在没有滚动条的情况下，减去 padding 值就是内容的尺寸。</p>
<p><strong>如何获取元素的真实尺寸呢？</strong></p>
<p>通过 getComputedStyle （IE 下 currentStyle），<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle" rel="nofollow noreferrer" target="_blank">MDN</a> 介绍。</p>
<p>getComputedStyle 这个函数主要提供给我们元素 border 和 padding 宽度在内的一系列值（仍然不要妄想通过 element.style.border-width 获得），加上原先的 offsetHeight，就可以减去 border 和 padding 的值获得元素的真实尺寸。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 考虑 IE 的兼容性
function getStyle(el) { 
  if(window.getComputedStyle) { 
    return window.getComputedStyle(el, null); 
  }else{ 
    return el.currentStyle; 
  } 
} 
function getWH(el, name) { 
  var val = name === &quot;width&quot; ? el.offsetWidth : el.offsetHeight, 
  which = name === &quot;width&quot; ? ['Left', 'Right'] : ['Top', 'Bottom']; 
  // display is none 
  if(val === 0) { 
    return 0; 
  } 
  var style = getStyle(el);
  // 左右或上下两边的都减去
  for(var i = 0, a; a = which[i++];) { 
    val -= parseFloat( style[&quot;border&quot; + a + &quot;Width&quot;]) || 0; 
    val -= parseFloat( style[&quot;padding&quot; + a ] ) || 0; 
  } 
  return val; 
}
// 测试，正确
getWH(test, 'width'); // 76" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 考虑 IE 的兼容性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">el</span>) </span>{ 
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.getComputedStyle) { 
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(el, <span class="hljs-literal">null</span>); 
  }<span class="hljs-keyword">else</span>{ 
    <span class="hljs-keyword">return</span> el.currentStyle; 
  } 
} 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWH</span>(<span class="hljs-params">el, name</span>) </span>{ 
  <span class="hljs-keyword">var</span> val = name === <span class="hljs-string">"width"</span> ? el.offsetWidth : el.offsetHeight, 
  which = name === <span class="hljs-string">"width"</span> ? [<span class="hljs-string">'Left'</span>, <span class="hljs-string">'Right'</span>] : [<span class="hljs-string">'Top'</span>, <span class="hljs-string">'Bottom'</span>]; 
  <span class="hljs-comment">// display is none </span>
  <span class="hljs-keyword">if</span>(val === <span class="hljs-number">0</span>) { 
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>; 
  } 
  <span class="hljs-keyword">var</span> style = getStyle(el);
  <span class="hljs-comment">// 左右或上下两边的都减去</span>
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, a; a = which[i++];) { 
    val -= <span class="hljs-built_in">parseFloat</span>( style[<span class="hljs-string">"border"</span> + a + <span class="hljs-string">"Width"</span>]) || <span class="hljs-number">0</span>; 
    val -= <span class="hljs-built_in">parseFloat</span>( style[<span class="hljs-string">"padding"</span> + a ] ) || <span class="hljs-number">0</span>; 
  } 
  <span class="hljs-keyword">return</span> val; 
}
<span class="hljs-comment">// 测试，正确</span>
getWH(test, <span class="hljs-string">'width'</span>); <span class="hljs-comment">// 76</span></code></pre>
<h2 id="articleHeader3">获取元素的位置</h2>
<p>在这里先隆重推出一个重量级嘉宾函数，即 <code>getBoundingClientRect</code>，贴上 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" rel="nofollow noreferrer" target="_blank">MDN</a> 链接。</p>
<p><code>element.getBoundingClientRect()</code> 会返回一个数组，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test.getBoundingClientRect();
  bottom:108
  height:100
  left:13
  right:113
  top:8
  width:100" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.getBoundingClientRect</span>();
  <span class="hljs-selector-tag">bottom</span><span class="hljs-selector-pseudo">:108</span>
  <span class="hljs-selector-tag">height</span><span class="hljs-selector-pseudo">:100</span>
  <span class="hljs-selector-tag">left</span><span class="hljs-selector-pseudo">:13</span>
  <span class="hljs-selector-tag">right</span><span class="hljs-selector-pseudo">:113</span>
  <span class="hljs-selector-tag">top</span><span class="hljs-selector-pseudo">:8</span>
  <span class="hljs-selector-tag">width</span><span class="hljs-selector-pseudo">:100</span></code></pre>
<p>其中，width 和 height 跟 element.offset 的值是一致的，left bottom 等值则表示距离浏览器窗口的距离，如果要获得元素的位置，只需要得到 left 和 top 的值即可，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var X= test.getBoundingClientRect().left;
var Y =test.getBoundingClientRect().top;
//再加上滚动距离，就可以得到绝对位置
var X= test.getBoundingClientRect().left+document.body.scrollLeft;
var Y =test.getBoundingClientRect().top+document.body.scrollTop;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> X= <span class="hljs-keyword">test</span>.getBoundingClientRect().left;
<span class="hljs-keyword">var</span> Y =<span class="hljs-keyword">test</span>.getBoundingClientRect().top;
<span class="hljs-comment">//再加上滚动距离，就可以得到绝对位置</span>
<span class="hljs-keyword">var</span> X= <span class="hljs-keyword">test</span>.getBoundingClientRect().left+document.body.scrollLeft;
<span class="hljs-keyword">var</span> Y =<span class="hljs-keyword">test</span>.getBoundingClientRect().top+document.body.scrollTop;</code></pre>
<p>此方法之外，还有其他方法。比如每个元素都有 offsetTop 和 offsetLeft 属性，表示距离父容器左、上角的边距，offsetParent 表示父容器，先得到距离父容器的距离，依次累加，得到绝对位置。</p>
<p><span class="img-wrap"><img data-src="/img/bVGp8Z?w=473&amp;h=340" src="https://static.alili.tech/img/bVGp8Z?w=473&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPosition(element, name){
  name = name.toLowerCase().replace(&quot;left&quot;, &quot;Left&quot;).replace(&quot;top&quot;, &quot;Top&quot;);
  var offset = 'offset' + name;
  var actualLeft = element[offset];
  var current = element.offsetParent;
  while (current !== null){
    actualLeft += current[offset];
    current = current.offsetParent;
  }
  return actualLeft;
}
getPosition(test,'left') // 13
getPosition(test,'top') // 8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPosition</span>(<span class="hljs-params">element, name</span>)</span>{
  name = name.toLowerCase().replace(<span class="hljs-string">"left"</span>, <span class="hljs-string">"Left"</span>).replace(<span class="hljs-string">"top"</span>, <span class="hljs-string">"Top"</span>);
  <span class="hljs-keyword">var</span> offset = <span class="hljs-string">'offset'</span> + name;
  <span class="hljs-keyword">var</span> actualLeft = element[offset];
  <span class="hljs-keyword">var</span> current = element.offsetParent;
  <span class="hljs-keyword">while</span> (current !== <span class="hljs-literal">null</span>){
    actualLeft += current[offset];
    current = current.offsetParent;
  }
  <span class="hljs-keyword">return</span> actualLeft;
}
getPosition(test,<span class="hljs-string">'left'</span>) <span class="hljs-comment">// 13</span>
getPosition(test,<span class="hljs-string">'top'</span>) <span class="hljs-comment">// 8</span></code></pre>
<p>结果和 getBoundingClientRect() 值一样，有时候需要考虑是相对于屏幕的位置还是绝对位置，然后再做进一步的计算。</p>
<h2 id="articleHeader4">总结</h2>
<p>感觉最近的文章越来越水，主要是因为最近都在抓基础，学习 nodejs 和 ES6 的基本语法，没时间去看一下比较流行的框架。白天又特别忙，学校里又一大堆事情，各种烦躁。共勉！</p>
<h2 id="articleHeader5">参考</h2>
<blockquote><p><a href="http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html" rel="nofollow noreferrer" target="_blank">用Javascript获取页面元素的位置</a><br><a href="http://m.jb51.net/article/28278.htm" rel="nofollow noreferrer" target="_blank">关于元素的尺寸(dimensions) 说明</a><br><a href="http://www.cnblogs.com/yuteng/articles/1894578.html" rel="nofollow noreferrer" target="_blank">height、clientHeight、scrollHeight、offsetHeight区别</a></p></blockquote>
<p>欢迎来我<a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">博客</a>交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生 JS 获取元素的尺寸和位置

## 原文链接
[https://segmentfault.com/a/1190000007687940](https://segmentfault.com/a/1190000007687940)

