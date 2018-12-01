---
title: '【基础】CSS实现多重边框的5种方式' 
date: 2018-12-02 2:30:15
hidden: true
slug: j2c6n6zopa9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>目前最优雅地实现多重边框的方案是利用<code>CSS3</code> 的 <code>box-shadow</code>属性，但如果要兼容老的浏览器，则需要选择其它的方案。本文简要地列举了几种多重边框的实现方案，大家可以根据项目实际及兼容性要求等情况，选择最适合的实现方案。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732933?w=690&amp;h=203" src="https://static.alili.tech/img/remote/1460000014732933?w=690&amp;h=203" alt="CSS多重边框" title="CSS多重边框" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">1 利用描边(<code>outline</code>)属性</h2>
<p>方案1利用描边(<code>outline</code>)属性结合<code>border</code>属性实现双重边框。此方案实现简单，兼容性好，能兼容除<code>IE6,7</code>以外的浏览器。</p>
<h3 id="articleHeader2">1.1 核心代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".borders {
  border: solid 6px #fff;
  outline: solid 6px #888;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.borders</span> {
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">6px</span> <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">outline</span>: solid <span class="hljs-number">6px</span> <span class="hljs-number">#888</span>;  
}</code></pre>
<h3 id="articleHeader3">1.2 演示程序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732934" src="https://static.alili.tech/img/remote/1460000014732934" alt="利用outline实现双重边框" title="利用outline实现双重边框" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/175" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader4">1.3 说明</h3>
<ul>
<li>只能实现双重边框</li>
<li>边框样式灵活，可以实现虚线等样式的边框</li>
<li>描边在盒模型之外，会与外部元素发生重叠</li>
</ul>
<h2 id="articleHeader5">2 利用额外的DIV</h2>
<p>方案2利用额外的DIV嵌套的方式实现多重边框。这也是唯一不存在兼容性问题的方案。</p>
<h3 id="articleHeader6">2.1 核心代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    border: solid 6px #888;
    background: #fff;
}
.inner {
    background: #222;
    margin: 6px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">6px</span> <span class="hljs-number">#888</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#222</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">6px</span>;
}</code></pre>
<h3 id="articleHeader7">2.2 演示程序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732935?w=677&amp;h=195" src="https://static.alili.tech/img/remote/1460000014732935?w=677&amp;h=195" alt="利用额外的DIV嵌套实现双重边框" title="利用额外的DIV嵌套实现双重边框" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/176" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader8">2.3 说明</h3>
<ul>
<li>兼容性好</li>
<li>可以实现多重边框，虚线边框等样式</li>
<li>需要额外的DIV元素，增加了代码复杂性</li>
</ul>
<h2 id="articleHeader9">3 利用伪元素</h2>
<p>方案3利用伪元素（<code>:before</code>）的方式实现双重边框。实现代码略复杂，属于hack的实现方式，不推荐。</p>
<h3 id="articleHeader10">3.1 核心代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".borders {
    border: solid 6px #fff;
    position: relative;
}
.borders:before {
    content: &quot;&quot;;
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    border: solid 6px #888;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.borders</span> {
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">6px</span> <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.borders</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">left</span>: -<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">12px</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">6px</span> <span class="hljs-number">#888</span>;
}</code></pre>
<h3 id="articleHeader11">3.2 演示程序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732936" src="https://static.alili.tech/img/remote/1460000014732936" alt="利用伪元素实现双重边框" title="利用伪元素实现双重边框" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/177" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader12">3.3 说明</h3>
<ul>
<li>
<code>IE6,7,8</code>不兼容</li>
<li>用<code>:after</code>也可以</li>
<li>同时应用<code>:before</code>和<code>:after</code>可以实现三重边框</li>
</ul>
<h2 id="articleHeader13">4 利用<code>border-image</code>属性</h2>
<p>方案4利用<code>CSS3</code>的<code>border-image</code>属性实现多重边框。实现方法简单，但需要制做一个额外的边框图片，兼容性较差。</p>
<h3 id="articleHeader14">4.1 核心代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".borders {
    border: solid 12px transparent;
    border-image: url('borders.jpg') 12 12 12 12 repeat;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.borders</span> {
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">12px</span> transparent;
    <span class="hljs-attribute">border-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'borders.jpg'</span>) <span class="hljs-number">12</span> <span class="hljs-number">12</span> <span class="hljs-number">12</span> <span class="hljs-number">12</span> repeat;
}</code></pre>
<h3 id="articleHeader15">4.2 演示程序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732937" src="https://static.alili.tech/img/remote/1460000014732937" alt="利用border-image属性实现双重边框" title="利用border-image属性实现双重边框" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/178" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader16">4.3 说明</h3>
<p>本例中，利用<code>border-image-slice</code>将边框图片分成如下图所示的9个区域：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732938" src="https://static.alili.tech/img/remote/1460000014732938" alt="border-image-slice示例图片" title="border-image-slice示例图片" style="cursor: pointer; display: inline;"></span></p>
<p>其中包括四个角（1，2，3，4），四条边（5，6，7，8）以及中间区域（9）。<br><code>repeat</code>表示四条边都在相应的边框上重复的平铺。</p>
<h2 id="articleHeader17">5 利用<code>box-shadow</code>属性</h2>
<p>方案5利用<code>box-shadow</code>属性实现多重边框。方案5是最简单，最直接的实现多重边框的方式。只有一行代码就可以实现多重边框效果。利用了阴影（<code>box-shadow</code>）实现边框多少有一些hack的味道。</p>
<h3 id="articleHeader18">5.1 核心代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".borders {
    box-shadow: 0 0 0 6px #fff, 0 0 0 12px #888;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.borders</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-number">#fff</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">12px</span> <span class="hljs-number">#888</span>;
}</code></pre>
<h3 id="articleHeader19">5.2 演示程序</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014732939?w=676&amp;h=193" src="https://static.alili.tech/img/remote/1460000014732939?w=676&amp;h=193" alt="利用box-shadow属性实现多重边框" title="利用box-shadow属性实现多重边框" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/179" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader20">5.3 说明</h3>
<p>为了用阴影模拟边框，本例中使用了两个阴影效果，设置偏移值和模糊值为<code>0</code>，并适当地设置阴影的尺寸，从而实现了双重边框的效果。因为一个阴影重叠在另一个阴影之上，第二个阴影的尺寸要设置成第一个阴影尺寸的两倍。关键部分是将模糊值设成0，从而产生像边框一样的纯色阴影，看起来和边框一样。</p>
<p>和描边（<code>outline</code>）属性一样，<code>box-shadow</code>属性可能会和周边元素发生重叠，因此要适当地设置元素的外边距。<code>box-shadow</code>兼容性一般。</p>
<h2 id="articleHeader21">6 参考</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image" rel="nofollow noreferrer" target="_blank">MDN border-image</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer" target="_blank">MDN box-shadow</a></p>
<p><a href="https://www.impressivewebs.com/multiple-borders-css/" rel="nofollow noreferrer" target="_blank">Multiple Borders with CSS</a></p>
<p><a href="https://css-tricks.com/snippets/css/multiple-borders/" rel="nofollow noreferrer" target="_blank">CSS-tricks Multiple Borders</a></p>
<h2 id="articleHeader22">7 结语</h2>
<p>本文简述了5种多重边框的实现方式，各有优缺点，大家要根据实际情况进行取舍。</p>
<p>文中所述部分文字及代码汇编于网络。因时间不足，能力有限等原因，存在文字阐述不准及代码测试不足等诸多问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【基础】CSS实现多重边框的5种方式

## 原文链接
[https://segmentfault.com/a/1190000014732928](https://segmentfault.com/a/1190000014732928)

