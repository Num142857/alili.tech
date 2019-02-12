---
title: '‘纯css实现Material Design中的水滴动画按钮’的js体验优化' 
date: 2019-02-13 2:31:23
hidden: true
slug: sxmbe7kwm8f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在<a href="https://segmentfault.com/a/1190000016740058">上一篇</a>，我们已经实现了用纯<code>css</code>实现水滴扩散动画，但是有一些瑕疵，文章结尾处也提到过，一是页面加载进来就会看到按钮上的水滴动画运动一次，二是点击的时候不能根据鼠标的位置来扩散，今天我们来解决这个问题。</p>
<p><strong>以下所有基础代码均来自上一篇</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016740061?w=318&amp;h=190" src="https://static.alili.tech/img/remote/1460000016740061?w=318&amp;h=190" alt="button" title="button" style="cursor: pointer; display: inline;"></span></p>
<p><em>css中只能做到固定的点扩散</em></p>
<h2 id="articleHeader1">无法避免的js</h2>
<p>虽然我很想通过<code>css</code>来实现想要的效果，毕竟属于UI交互方面，尽量别扯上<code>js</code>，无奈后劲不足，很多功能确实无法实现，比如获取鼠标位置，这个<code>css</code>就真没辙了。</p>
<p>思考了很久，还是只能通过<code>js</code>来获取位置坐标了，但是我们可以减少<code>js</code>的逻辑，我们只需要知道坐标即可，剩下的给<code>css</code>来做就好了。</p>
<h2 id="articleHeader2">实现思路</h2>
<h3 id="articleHeader3">css新特性</h3>
<p>其实用的<code>css</code>很多新特性的话，很多以前只能通过<code>js</code>来实现的<code>css</code>也可以代替了。</p>
<p><code>css</code>原生变量<code>var</code>，大家平时应该都接触过了吧。可能平时由于兼容性的问题，用起来缩手缩脚，干脆为了兼容性就不用了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758779?w=1155&amp;h=452" src="https://static.alili.tech/img/remote/1460000016758779?w=1155&amp;h=452" alt="var" title="var" style="cursor: pointer; display: inline;"></span></p>
<p>其实只要不考虑<code>IE</code>的话兼容性还是可以的，就算要兼顾<code>IE</code>，可以保证按钮是完好的，只是没有动画效果不就可以了吗，这也是所谓的<strong>优雅降级</strong>吧</p>
<p><code>var</code>的用法很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
    --main-bg-color: red;
}
.container {
    width: 20px;
    height: 20px;
    background-color: var(--main-bg-color);/**background-color:red**/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attribute">--main-bg-color</span>: red;
}
<span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--main-bg-color);<span class="hljs-comment">/**background-color:red**/</span>
}</code></pre>
<p>有关<code>var</code>的详细用法，大家可以自行百度</p>
<h3 id="articleHeader4">全能js</h3>
<p>我们用<code>js</code>只有一个目的，就是获取鼠标点击的位置</p>
<p>很简单，事件对象<code>event</code>中有个<code>offsetX</code>和<code>offsetY</code>就是用来描述鼠标位置相对于父元素的位置</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758780?w=297&amp;h=296" src="https://static.alili.tech/img/remote/1460000016758780?w=297&amp;h=296" alt="offsetX" title="offsetX" style="cursor: pointer;"></span></p>
<p>其实这个属性早些年是<code>IE</code>私有的，谷歌和火狐看着好用，不知道从上面版本也都支持了，所以兼容性没太大问题~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758781?w=838&amp;h=708" src="https://static.alili.tech/img/remote/1460000016758781?w=838&amp;h=708" alt="event" title="event" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = event.offsetX;
var y = event.offsetY;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = event.offsetX;
<span class="hljs-keyword">var</span> y = event.offsetY;</code></pre>
<h2 id="articleHeader5">具体实现</h2>
<p>我们需要在点击的时候获取到左边，然后存在<code>css</code>变量中</p>
<p><em>示例代码</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ripple(ev){
  var x = ev.offsetX;
  var y = ev.offsetY;
  this.style.setProperty('--x',x+'px');
  this.style.setProperty('--y',y+'px');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ripple</span>(<span class="hljs-params">ev</span>)</span>{
  <span class="hljs-keyword">var</span> x = ev.offsetX;
  <span class="hljs-keyword">var</span> y = ev.offsetY;
  <span class="hljs-keyword">this</span>.style.setProperty(<span class="hljs-string">'--x'</span>,x+<span class="hljs-string">'px'</span>);
  <span class="hljs-keyword">this</span>.style.setProperty(<span class="hljs-string">'--y'</span>,y+<span class="hljs-string">'px'</span>);
}</code></pre>
<p>没错，就这么一丁点<code>js</code></p>
<p>相应的<code>css</code>部分我们要拿到我们保存的变量，来改变中心点的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn>span:after{ 
  content: ''; 
  position: absolute; 
  background: transparent; 
  border-radius:50%; 
  width: 100%; 
  padding-top: 100%; 
  margin-left: -50%; 
  margin-top: -50%; 
  left: var(--x,-100%); 
  top: var(--y,-100%); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>&gt;<span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:after</span>{ 
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; 
  <span class="hljs-attribute">position</span>: absolute; 
  <span class="hljs-attribute">background</span>: transparent; 
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>; 
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50%</span>; 
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50%</span>; 
  <span class="hljs-attribute">left</span>: <span class="hljs-built_in">var</span>(--x,-100%); 
  <span class="hljs-attribute">top</span>: <span class="hljs-built_in">var</span>(--y,-100%); 
}</code></pre>
<p>这里我们解决了两个问题，</p>
<ul><li>
<strong>首次进来会触发一次</strong>：这里我们把<code>left</code>给了一个默认值<code>-100%</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="left: var(--x,-100%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">left</span>: <span class="hljs-selector-tag">var</span>(<span class="hljs-selector-tag">--x</span>,<span class="hljs-selector-tag">-100</span>%);</code></pre>
<p>也就是说，当前面的<code>--x</code>没有值或者非法的时候就会取后面一个值，<code>-100%</code>会让水滴动画的过程在视线之外触发，页面上根本看不见。</p>
<ul><li>
<strong>跟随鼠标点击的位置扩散</strong>：现在已经获取到了鼠标的位置，所以就很容易实现了鼠标在哪点击就从哪里扩散的问题</li></ul>
<p><strong>完整demo</strong></p>
<p><a href="https://codepen.io/xboxyan/pen/LgmQwb/" rel="nofollow noreferrer" target="_blank">https://codepen.io/xboxyan/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="xboxyan/pen/LgmQwb/" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader6">小节</h2>
<p>其实<code>js</code>实现是很简单的，<code>css</code>才是难点，<code>css</code>远比<code>js</code>灵活的多。比方说积木，积木的各种小零件是固定的，种类也有限，但是你可以组合出各种不同的玩具出来，可以称之为头脑创意吧，然而你组合出来一辆小汽车，却没法自动行驶，那么你就需要用上电机模组了，这是功能驱动。实际上在研发积木的过程中才是最耗费心思的地方，那些动力系统才是一层不变的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758782?w=710&amp;h=300" src="https://static.alili.tech/img/remote/1460000016758782?w=710&amp;h=300" alt="Chiron" title="Chiron" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
‘纯css实现Material Design中的水滴动画按钮’的js体验优化

## 原文链接
[https://segmentfault.com/a/1190000016758776](https://segmentfault.com/a/1190000016758776)

