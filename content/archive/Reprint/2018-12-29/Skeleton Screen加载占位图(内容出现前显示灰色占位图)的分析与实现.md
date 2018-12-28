---
title: 'Skeleton Screen加载占位图(内容出现前显示灰色占位图)的分析与实现' 
date: 2018-12-29 2:30:10
hidden: true
slug: fd61pe98zat
categories: [reprint]
---

{{< raw >}}

                    
<p>今天有几个好友问了这个叫<strong>加载占位图</strong>的实现方法,我还在<a href="https://segmentfault.com/q/1010000011075242/a-1020000011435235/">此问题下做了个回答</a>.<br>由于国内对这个的名词是各有各的叫法,所以这里直接用加载占位图来解释.<br>相信很多人都看到过图中这样的加载方式:<br><span class="img-wrap"><img data-src="/img/bVV8Zi?w=476&amp;h=461" src="https://static.alili.tech/img/bVV8Zi?w=476&amp;h=461" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个图是一个国内知名站点的,相比以往的loading圈圈,看起来是不是美观了许多.<br>据说这个Idea是一个谷歌工程师在2013年时想到的.我不喜欢去讨论概念之类.直接用知名站点来通俗易懂的解释:</p>
<p>以往:发起ajax-loading.gif/svg-ajax结果.<br>现在:发起ajax-具有css3动感(比如闪烁)的灰色布局div-ajax结果</p>
<p>不用ajax也没关系,css3的':before'也是没问题的,总之目的是要代替loading动图.</p>
<p>这里有一段下文这个图获得ajax响应前的结果,它在获得回调前用了这段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div class=&quot;split-line&quot;>
    </div>
    <div class=&quot;top-title&quot;>
        <span>热门专题</span>
    </div>
    <div class=&quot;recommend-collection&quot;>
<span class=&quot;collection-loading&quot; style=&quot;width: 72px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 66px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 63px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 53px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 61px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 48px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 71px;&quot;></span>
<span class=&quot;collection-loading&quot; style=&quot;width: 59px;&quot;></span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"split-line"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top-title"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>热门专题<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"recommend-collection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 72px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 66px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 63px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 53px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 61px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 48px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 71px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-loading"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 59px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVV80R?w=944&amp;h=464" src="https://static.alili.tech/img/bVV80R?w=944&amp;h=464" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>那么,这么聪明的你应该学会了如何实现它了吧?<br>看起来很炫的东西,往往都是很简单的.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Skeleton Screen加载占位图(内容出现前显示灰色占位图)的分析与实现

## 原文链接
[https://segmentfault.com/a/1190000011435324](https://segmentfault.com/a/1190000011435324)

