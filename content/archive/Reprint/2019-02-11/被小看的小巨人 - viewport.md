---
title: '被小看的小巨人 - viewport' 
date: 2019-02-11 2:30:49
hidden: true
slug: 5mzv2vudpxs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">viewport浅入</h2>
<p>相信所有的 web 开发者都见过亦或用过这个神奇的 meta 标签头，亦或在不明白或者半明半蒙的情况下就用上了。</p>
<p>先来解个疑惑 ，上图</p>
<p><span class="img-wrap"><img data-src="/img/bVvkjc" src="https://static.alili.tech/img/bVvkjc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>chrome 的手持设备模拟器相信大家再熟悉不过了，那么左上角的320*480是神马 ？应该很多人已经在心里有了个答案。<br> 在解开这个疑惑之前 需要引入一个概念：</p>
<blockquote><p>A pixel is not a pixel is not a pixel</p></blockquote>
<p>引用 <a href="http://www.w3cplus.com/css/A-pixel-is-not-a-pixel-is-not-a-pixel.html" rel="nofollow noreferrer" target="_blank">W3cplus 此像素非彼像素</a>中的一句话</p>
<p><span class="img-wrap"><img data-src="/img/bVvkka" src="https://static.alili.tech/img/bVvkka" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>是的，想说明的就是这里的320*480指的是你的设备的 dpx 而非 CSS 中的 px</p>
<p>至于有什么区别呢？<br>当然有区别！：</p>
<blockquote><p>设备的 px 是指度量设备大小尺寸的一种单位，而我们常在web 应用中使用的 px 是针对Web 应用开发用来度量应用程序中元素的相对尺寸，是一种抽象的概念和前面的设备像素是不搭噶的两种存在。</p></blockquote>
<p>那么为什么当我们使用的 css 中的 px 来设计页面的时候 使用与设备上的的宽度一致时能够得到良好的视觉效应呢，且听我慢慢道来。</p>
<hr>
<p>我们先看下</p>
<h2 id="articleHeader1">关于 viewport 的 相关声明语法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;name=value,name=value&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"name=value,name=value"</span>&gt;</code></pre>
<p>首先引用下 <a href="http://www.quirksmode.org/mobile/metaviewport/#t01" rel="nofollow noreferrer" target="_blank">ppk</a> 文章中的英文解释(网络上大部分的出处出自此)：</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Directives
Every name/value pair is a directive. (The word is my own invention.) 
There are six of them in total:

width     
    Sets the width of the layout viewport.
initial-scale       
    Sets the initial zoom of the page AND the width of the layout viewport.
minimum-scale
    Sets the minimum zoom level (i.e. how much the user can zoom out).
maximum-scale
    Sets the maximum zoom level (i.e. how much the user can zoom in).
height
    Is supposed to set the height of the layout viewport. It is not supported anywhere.
user-scalable
    When set to no prevents the user from zooming. This is an abomination that MUST NOT be used.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>Directives
Every name/<span class="hljs-built_in">value</span> pair is <span class="hljs-keyword">a</span> directive. (The <span class="hljs-built_in">word</span> is my own invention.) 
There are <span class="hljs-literal">six</span> <span class="hljs-keyword">of</span> them <span class="hljs-keyword">in</span> total:

width     
    Sets <span class="hljs-keyword">the</span> width <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> layout viewport.
initial-scale       
    Sets <span class="hljs-keyword">the</span> initial zoom <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> page AND <span class="hljs-keyword">the</span> width <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> layout viewport.
minimum-scale
    Sets <span class="hljs-keyword">the</span> minimum zoom level (i.e. how much <span class="hljs-keyword">the</span> user can zoom out).
maximum-scale
    Sets <span class="hljs-keyword">the</span> maximum zoom level (i.e. how much <span class="hljs-keyword">the</span> user can zoom <span class="hljs-keyword">in</span>).
height
    Is supposed <span class="hljs-built_in">to</span> <span class="hljs-built_in">set</span> <span class="hljs-keyword">the</span> height <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> layout viewport. It is <span class="hljs-keyword">not</span> supported anywhere.
user-scalable
    When <span class="hljs-built_in">set</span> <span class="hljs-built_in">to</span> no prevents <span class="hljs-keyword">the</span> user <span class="hljs-built_in">from</span> zooming. This is <span class="hljs-keyword">an</span> abomination that MUST NOT be used.
</code></pre>
<p>看不明白？好吧我找来翻译一把（翻译的有点强硬别见怪）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="指令
每对键值对都是一个指令，（ppk 大神的叫法）以下总计共有6对：
width
    设置layout viewport的宽度（css px）
initial-scale 
    设置页面的初始缩放比例同时可以设置layout viewport的宽度
minimum-scale
    设置最小缩放比例（指用户能够缩小到多小）
maximum-scale
    设置最大缩放比例（指用户能够放大到多大）
height
    设置layout viewport的高度，但暂时不怎么被支持
user-scalable
    设置是否允许用户放大缩小。ppk 指出这个属性很邪恶，最好别用（偷笑）
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>指令
每对键值对都是一个指令，（ppk 大神的叫法）以下总计共有<span class="hljs-number">6</span>对：
width
    设置<span class="hljs-keyword">layout</span> viewport的宽度（css px）
initial-<span class="hljs-keyword">scale</span> 
    设置页面的初始缩放比例同时可以设置<span class="hljs-keyword">layout</span> viewport的宽度
minimum-<span class="hljs-keyword">scale</span>
    设置最小缩放比例（指用户能够缩小到多小）
maximum-<span class="hljs-keyword">scale</span>
    设置最大缩放比例（指用户能够放大到多大）
height
    设置<span class="hljs-keyword">layout</span> viewport的高度，但暂时不怎么被支持
user-scalable
    设置是否允许用户放大缩小。ppk 指出这个属性很邪恶，最好别用（偷笑）
    
</code></pre>
<p>看到这里或许又蒙了一半 layout viewport是什么鬼？</p>
<p>ppk 大神的意思是想象下在我们设置 viewport 后，浏览器能够生成3种 viewport 分别对应 <strong>visual viewport</strong> 、 <strong>layout viewport</strong> 和 <strong>ideal viewport</strong>。</p>
<p>这里我不打算掺杂过多的这些理论，只想要简单明了的方式解释（忽悠）出 使用viewport 会发生什么事，如果对 ppk 大神的这些理论感兴趣可以 go here</p>
<p>1.<a href="http://www.quirksmode.org/mobile/viewports.html" rel="nofollow noreferrer" target="_blank">A tale of two viewports — part one</a> <br> 2.<a href="http://www.quirksmode.org/mobile/viewports2.html" rel="nofollow noreferrer" target="_blank">A tale of two viewports — part two</a><br> 3.<a href="http://www.quirksmode.org/mobile/metaviewport/#t01" rel="nofollow noreferrer" target="_blank">Meta viewport</a></p>
<hr>
<p>大概的了解到 viewport 的语法后接下来就是案例讲解</p>
<h2 id="articleHeader2">当不使用 viewport 时我们为 pc 设计的网站在手持设备上是怎么样的</h2>
<p>这里拿百度的 pc 版做例子（因为 pc 版没有 viewport）首先在非模拟器状态下打开百度然后切换到模拟器状态下</p>
<p><span class="img-wrap"><img data-src="/img/bVvknH" src="https://static.alili.tech/img/bVvknH" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到的是整个 pc 版的页面被压缩到宽度仅有320px（非 css 单位）的设备中 ，正常人都没办法使用吧？<br>那么，这个时候这个页面的宽度是多少呢（css px）？</p>
<p><span class="img-wrap"><img data-src="/img/bVvlb3" src="https://static.alili.tech/img/bVvlb3" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们选中 html 元素，查看右下角的盒子样式 可以明确的看到当前的页面宽度是980px（css px）</p>
<p>也就是说浏览器在只有320dpx 的情况下展示了980px 的页面（明显可以看出这里的 dpx 与 px 并不是1：1的关系）</p>
<p>但是我们从左下角的样式表内并没有看到 html 的 width，那么这个 html 的980 px宽是哪来的呢</p>
<p>答案是来自 viewport的！ 别忘记了上面的 viewport 语法，也就是说 viewport设置了宽度为980px，但是前面不是说了这个例子使用的是百度的 pc 端的页面没有 viewport 吗？</p>
<p>那由哪来的 viewport 设置宽度呢 ，看到这里相信已经有人有答案了，没错当你没有设置 viewport 的时候浏览器会自动为你采用默认值 那么默认值是多少？</p>
<p>这里找来 ppk 的测试<br><span class="img-wrap"><img data-src="/img/bVvkow" src="https://static.alili.tech/img/bVvkow" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>什么意思呢 其实意思就是在默认的情况下（针对手持端）如果你没有设置过 viewport 那么我浏览器就会根据我自个设备决定采用viewport宽度是多少。</p>
<p>知道了这些还不够 ，那么为什么我有了 viewport 设置宽度之后 html 就会采用其宽度呢 ：</p>
<blockquote><p>可以这么理解，viewport是一种超越 html 元素的存在，当没有为 html 设置宽度的时候，html 的宽度继承于 viewport设置的宽度</p></blockquote>
<p>就拿w3cplus举个例子：</p>
<p><span class="img-wrap"><img data-src="/img/bVvlcd" src="https://static.alili.tech/img/bVvlcd" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>和上面的一样拿 pc 版测试，默认没有 viewport 查看 html 宽度果然为980px</p>
<p>接下来为 html 元素设置宽度为50% 可以看到效果 其宽度值为490px</p>
<p><span class="img-wrap"><img data-src="/img/bVvlch" src="https://static.alili.tech/img/bVvlch" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>到这里我们可以得出一个总结：</p>
<blockquote><p>viewport 其实就是设置在当前设备的宽度下展示多少CSS px的网页内容</p></blockquote>
<p>上一个例子我们已经看到当 html 文档的宽度小于 viewport 的宽度是会有什么样的效果，那么反过来如果设置 html 的宽度大于 viewport 又会是什么效果呢</p>
<p><span class="img-wrap"><img data-src="/img/bVvlck" src="https://static.alili.tech/img/bVvlck" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里设置 html的宽度为2000px 可以看出页面出现了滚动效果。</p>
<p>这里又得出一个总结：</p>
<blockquote><p>当 html 文档的宽度小于 viewport 的宽度时以文档的实际宽度为准，文档少于 viewport 宽度的部分不显示内容，当 html文档的宽度大于 viewport 的时候，你能看到的区域依然是 viewport 的大小区域，不过你可以通过滑动或滚动页面来查看大于viewport 区域的内容</p></blockquote>
<p>至此我们已经知道了设备宽度与 viewport 的宽度以及实际文档的宽度之间的关系。</p>
<p>通过上述的例子我们知道基本上 viewport 的默认宽度是980px，且浏览器会将者 viewport 大小的 html 文档塞进有限的设备宽度内（浏览器会动态计算文档的布局及内容），所以我们看到的东西都很小。<br>那么我们想要清除的看清文档内的内容怎么办 ，没错，缩小 viewport 的大小，什么原理？<br>当我们缩小 viewport 的宽度的时候文档的宽度也对应的被缩小，即一样的设备宽度，我显示的东西少了（这时候浏览器重新计算文档布局及内容）可以看到的结果是字体被放大了，内容都被放大了！</p>
<p>这里还是拿W3CPlus的网站做例子：一样的拿 pc 版的无 viewport 的文档放入手持设备内，没办法看清内容</p>
<p><span class="img-wrap"><img data-src="/img/bVvlcw" src="https://static.alili.tech/img/bVvlcw" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这时候我在控制台输入这么一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.head.insertAdjacentHTML('afterbegin','<meta name=&quot;viewport&quot; content=&quot;width=320&quot;>');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>document.head.insertAdjacentHTML(<span class="hljs-symbol">'afterbegin</span><span class="hljs-string">','</span>&lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=320"</span>&gt;');
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvlcx" src="https://static.alili.tech/img/bVvlcx" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这时候是不是清晰很多呢~。</p>
<p>知道了这个原理，那我们要把 viewport 的大小缩小到多小比较合适呢 ？答案是和你的设备宽度一样宽。但是并不是每个手持设备都是320dpx宽啊，这时候我们可以这样写 viewport 头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width"</span>&gt;
</code></pre>
<p>这样就会自动计算你的设备宽度了，此处应该有掌声~</p>
<p>但是这个时候并未结束，是的 ，当你把你原先的980宽的页面重置成了320宽 那页面布局当然就发生变化了，惨的，无法入目，这时候就得考验大家的 css 功底了，如何避免不在此文章讨论范围内。</p>
<hr>
<h2 id="articleHeader3">扩展思考</h2>
<p>1.当我们在手持设备上放大缩小页面的时候，发生了什么？<br>2.设备的宽度与分辨率的关系？为什么我们在做 iphone 图的时候640但到了页面只能为320？</p>
<p>解释：<br>1.<br>当我们在手持设备上放大的时候，设备的大小不变（废话），viewport 的大小不变， html 的大小不变，那变的是什么？<br>我们知道当我们设置了 <code>&lt;meta name="viewport" content="width=device-width"&gt;</code>页面的宽度是与设备的宽度一致的达到1：1的关系<br>其实变得是你的可视区域 也就是 ppk 大神说的visual viewport，抛开他的理论，简单的理解就是你当你触发放大的是个动作时，页面的每一 css px宽度对应了多个设备的像素宽度（这里暂时不谈分辨率），所以你能看到元素被放大了，但是由于设备的宽度有限，所以你看到的内容也就少了，而viewport在我们一旦设置好后没有手动修改的话是不会发生变化的包括这里。<br>故 缩小引发的原理一样。</p>
<p>2.<br>设备的宽度的 px 和分辨率的关系？<br>在没有视网膜屏幕出现前 除了些高清屏幕外，大部分的手持设备的宽度与分辨率像素是一对一的关系，直到视网膜屏幕的出现打破了这个格局 出现一个设备宽度对应2个或很多的分辨率像素，引发什么结果？当然是更清晰了，因为用了更多的像素去表达相同的一个设备宽度像素的内容。更多细节探讨可以自行 <a>度娘</a> 更多。</p>
<p>了解了设备宽度与分辨率的关系之后 解释下图片与分辨率的关系，通常图片的像素是与分辨率对应的，故设计师在 ps 上用640分辨率设计图片的时候起始也是对应我们的设备宽度320（前面解释到视网膜屏幕一个设备像素会对应2个到多个分辨率像素），设计出来的图片同理。当然你把设计出来的640分辨率像素的图片放在一样是320宽度像素下的视网膜设备和非视网膜设备下的效果看起来差不多其实仔细看还是有差别的即是否更高清的差别（可以拿安卓和 ios对比）。</p>
<hr>
<p>弄清楚了viewport 这个小巨人后我们还得知道如何通过 js 代码来获取设备的宽度、viewport 的宽度以及 html 文档的宽度</p>
<p>总结如下（不包括 IE 及其他特殊情况）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
*1.获取包含滚动条尺寸的浏览器完整内部尺寸
*2.获取用户实际的看到的视口大小（即发送缩放后的可视区域大小|visual viewport 大小）默认等于viewport大小
*/
window.innerHeight
window.innerWidth 

/*
*1.设置的viewport大小
*/
document.documentElement.clientHeight
document.documentElement.clientWidth

/*
*1.HTML 文档大小
*/
document.documentElement.offsetHeight
document.documentElement.offsetWidth

/*
*1.设备大小
*/
screen.Height
screen.width

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/*
*1.获取包含滚动条尺寸的浏览器完整内部尺寸
*2.获取用户实际的看到的视口大小（即发送缩放后的可视区域大小|visual viewport 大小）默认等于viewport大小
*/</span>
window<span class="hljs-selector-class">.innerHeight</span>
window<span class="hljs-selector-class">.innerWidth</span> 

<span class="hljs-comment">/*
*1.设置的viewport大小
*/</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientHeight</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.clientWidth</span>

<span class="hljs-comment">/*
*1.HTML 文档大小
*/</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.offsetHeight</span>
document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.offsetWidth</span>

<span class="hljs-comment">/*
*1.设备大小
*/</span>
screen<span class="hljs-selector-class">.Height</span>
screen<span class="hljs-selector-class">.width</span>

</code></pre>
<p>网上有大量的关于 viewport 的讨论，不乏各种大神的讲解，各有千秋。<br>以上只为个人多日查阅实践及总结，仅作参考！<br>多谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
被小看的小巨人 - viewport

## 原文链接
[https://segmentfault.com/a/1190000005047320](https://segmentfault.com/a/1190000005047320)

