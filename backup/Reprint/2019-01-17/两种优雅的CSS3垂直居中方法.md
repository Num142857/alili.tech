---
title: '两种优雅的CSS3垂直居中方法' 
date: 2019-01-17 2:30:25
hidden: true
slug: 3ozv27u7xi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">摘要</h2>
<p>面向现代浏览器，CSS3已经提供了很好的方法实现垂直居中，本文介绍了其中两种常用的方法，无需借助额外的html结构或js代码，纯CSS3实现垂直居中，并且在国内90%的设备上都可以兼容。</p>
<h2 id="articleHeader1">方法一：transform</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;center&quot;>本元素相对于父元素垂直居中</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"container"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"center"</span>&gt;本元素相对于父元素垂直居中&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    position: relative;
}
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.center</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p><a href="https://codepen.io/LuXuanqing/pen/LWgZzZ" rel="nofollow noreferrer" target="_blank">点我查看demo-1</a><button class="btn btn-xs btn-default ml10 preview" data-url="LuXuanqing/pen/LWgZzZ" data-typeid="3">点击预览</button></p>
<p>看起来相当容易理解，就是先把元素下移父元素高度的50%，然后再上移自身高度的50%。<br>严谨地来讲，这方法还同时实现了水平居中，不需要的话把<code>left: 50%</code>去掉，并改成<code>transform: translateY(-50%)</code></p>
<h3 id="articleHeader2">transform浏览器兼容性</h3>
<p><span class="img-wrap"><img data-src="/img/bVLnbM?w=1272&amp;h=589" src="https://static.alili.tech/img/bVLnbM?w=1272&amp;h=589" alt="transform浏览器兼容性" title="transform浏览器兼容性" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可见，国内大约90%的设备都可以支持。</p>
<h2 id="articleHeader3">方法二：flex布局</h2>
<p>对需要垂直居中的元素的父元素增加一个class，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    display: flex;
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p><a href="https://codepen.io/LuXuanqing/pen/GWYqGy" rel="nofollow noreferrer" target="_blank">点我查看demo-2</a><button class="btn btn-xs btn-default ml10 preview" data-url="LuXuanqing/pen/GWYqGy" data-typeid="3">点击预览</button></p>
<p>flex布局可做的太多了，单纯做垂直居中真的大材小用。</p>
<h3 id="articleHeader4">flex布局浏览器兼容性</h3>
<p><span class="img-wrap"><img data-src="/img/bVLnbw?w=1272&amp;h=616" src="https://static.alili.tech/img/bVLnbw?w=1272&amp;h=616" alt="flex布局浏览器兼容性" title="flex布局浏览器兼容性" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可见，国内大约90%的设备都可以支持。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
两种优雅的CSS3垂直居中方法

## 原文链接
[https://segmentfault.com/a/1190000008868351](https://segmentfault.com/a/1190000008868351)

