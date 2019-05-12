---
title: '【小程序可用】CSS3 animation 实现的跑马灯' 
date: 2019-01-13 2:30:11
hidden: true
slug: 9rifz9nh76v
categories: [reprint]
---

{{< raw >}}

                    
<p>最近有个项目里面用到跑马灯，网上搜了下，虽然有人贴出来过一些实现，但是实际上都存在一些个问题。</p>
<p>哎，再造个轮子吧。</p>
<p>先放个效果：<span class="img-wrap"><img data-src="/img/remote/1460000009571889?w=536&amp;h=69" src="https://static.alili.tech/img/remote/1460000009571889?w=536&amp;h=69" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>p.s. 如果能访问jsfiddle最好：<a href="https://jsfiddle.net/650spwen/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/650spwen/</a><button class="btn btn-xs btn-default ml10 preview" data-url="650spwen/" data-typeid="0">点击预览</button></p>
<h1 id="articleHeader0">主要原理</h1>
<p>微信小程序现在实际上还是用的webview，里面搞动画效率最高的莫过于使用CSS3的animation了。</p>
<p>跑马灯无非就是一直滚动，这很容易想到使用无限循环的animation.</p>
<p>而一直往左滚动的效果，通过css有很多种方式，比如通过改变<code>left</code>, <code>margin-left</code>, <code>tranform: translateX()</code>都可以实现。但是 <code>left</code> 和 <code>margin-left</code> 一般会导致布局的重新计算。使用<code>transform: translateX()</code>性能会更好一些。</p>
<h1 id="articleHeader1">主要实现代码</h1>
<p>首先，视图模板wxml中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view>css3 + animation跑马灯</view>

<view class=&quot;marquee&quot;>
    <view class=&quot;content&quot;>
        <text>"{{"text"}}"</text> <text style=&quot;display: inline-block; width: 5em;&quot;></text>
        <text>"{{"text"}}"</text> <text style=&quot;display: inline-block; width: 5em;&quot;></text>
        <text>"{{"text"}}"</text> <text style=&quot;display: inline-block; width: 5em;&quot;></text>
    </view>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>css3 + animation跑马灯<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: inline-block; width: 5em;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: inline-block; width: 5em;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: inline-block; width: 5em;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<p>这里为了连续无限滚动，特意复制了2份跑马灯的内容（<code>.content</code>)。</p>
<p>然后，样式wxss中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@keyframes kf-marque-animation{ 0% { transform: translateX(0); } 100% { transform: translateX(-33.3%); } }
.marquee{
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #fff;
    border: none;
    display: block;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    position: relative;
    font-size: 28rpx;
}
.marquee .content{
    display: inline-block;
    position: relative;
    padding-right: 0px;
    animation: kf-marque-animation 11.3s linear infinite;
    white-space: nowrap;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">
@<span class="hljs-keyword">keyframes</span> kf-marque-animation{ 0% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); } 100% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-33.3%); } }
<span class="hljs-selector-class">.marquee</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">text-overflow</span>: clip;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28</span>rpx;
}
<span class="hljs-selector-class">.marquee</span> <span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">animation</span>: kf-marque-animation <span class="hljs-number">11.3s</span> linear infinite;
    <span class="hljs-attribute">white-space</span>: nowrap;
}</code></pre>
<p>最后，js里面随便给 <code>page.data.text</code> 赋值一段文本即可。具体js略。</p>
<p>如果要调整滚动速度，可以设置 <code>.content</code> 的元素的动画时间（ <code>animation-duration</code> 样式）。由于微信小程序中无法获取到对应元素的宽度，这个时间只能写死或者根据<code>text</code>的长度估算出一个值。</p>
<p>完整的示例在jsfiddle上有个html版本的：<a href="https://jsfiddle.net/650spwen/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/650spwen/</a><button class="btn btn-xs btn-default ml10 preview" data-url="650spwen/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【小程序可用】CSS3 animation 实现的跑马灯

## 原文链接
[https://segmentfault.com/a/1190000009571886](https://segmentfault.com/a/1190000009571886)

