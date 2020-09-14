---
title: '自己动手实现一个 Flex 布局框架' 
date: 2019-02-02 2:30:11
hidden: true
slug: vyflybrv9h
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVEeOl?w=1200&amp;h=500" src="https://static.alili.tech/img/bVEeOl?w=1200&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>本文作为 Flex 布局进阶，不对基础做详细介绍，关于 Flex 基础知识请到阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">Flex 布局教程：语法篇</a></p>
<p>看过基础，或者已经使用 Flex 布局的朋友可以根据本文试着动手写一写，先不急着开工，看看其它大型框架怎么实现的。</p>
<h2 id="articleHeader0">Bootstrap 框架</h2>
<p>相信大家都用过 Bootstrap 框架，目前最受欢迎的响应式布局框架，在 Github 上 10w＋ 的 star</p>
<p>而其中的栅格系统深入人心，针对不同尺寸的屏幕提供一套完整布局方案，不了解栅格系统的可以看<a href="http://v3.bootcss.com/css/#grid" rel="nofollow noreferrer" target="_blank">中文官方文档栅格系统</a></p>
<p>对于新人概念有点多，跳跃性挺强，不过跟着跳转链接一步一步摸索很快就能入门，这里给的都是中文链接。</p>
<p>给出一段栅格系统的代码片段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;row&quot;>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
  <div class=&quot;col-md-1&quot;>.col-md-1</div>
</div>
<div class=&quot;row&quot;>
  <div class=&quot;col-md-8&quot;>.col-md-8</div>
  <div class=&quot;col-md-4&quot;>.col-md-4</div>
</div>
<div class=&quot;row&quot;>
  <div class=&quot;col-md-4&quot;>.col-md-4</div>
  <div class=&quot;col-md-4&quot;>.col-md-4</div>
  <div class=&quot;col-md-4&quot;>.col-md-4</div>
</div>
<div class=&quot;row&quot;>
  <div class=&quot;col-md-6&quot;>.col-md-6</div>
  <div class=&quot;col-md-6&quot;>.col-md-6</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-1"</span>&gt;</span>.col-md-1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-8"</span>&gt;</span>.col-md-8<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4"</span>&gt;</span>.col-md-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4"</span>&gt;</span>.col-md-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4"</span>&gt;</span>.col-md-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4"</span>&gt;</span>.col-md-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-6"</span>&gt;</span>.col-md-6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-6"</span>&gt;</span>.col-md-6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOc?w=3656&amp;h=1008" src="https://static.alili.tech/img/bVEeOc?w=3656&amp;h=1008" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里栅格系统将屏幕水平均分成 12 份。通过加对应的 class 调整布局。语法也通俗易懂不过多解释。</p>
<p>再来看另一个列偏移的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;row&quot;>
  <div class=&quot;col-md-4&quot;>.col-md-4</div>
  <div class=&quot;col-md-4 col-md-offset-4&quot;>.col-md-4 .col-md-offset-4</div>
</div>
<div class=&quot;row&quot;>
  <div class=&quot;col-md-3 col-md-offset-3&quot;>.col-md-3 .col-md-offset-3</div>
  <div class=&quot;col-md-3 col-md-offset-3&quot;>.col-md-3 .col-md-offset-3</div>
</div>
<div class=&quot;row&quot;>
  <div class=&quot;col-md-6 col-md-offset-3&quot;>.col-md-6 .col-md-offset-3</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4"</span>&gt;</span>.col-md-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-4 col-md-offset-4"</span>&gt;</span>.col-md-4 .col-md-offset-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-3 col-md-offset-3"</span>&gt;</span>.col-md-3 .col-md-offset-3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-3 col-md-offset-3"</span>&gt;</span>.col-md-3 .col-md-offset-3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-6 col-md-offset-3"</span>&gt;</span>.col-md-6 .col-md-offset-3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOb?w=3592&amp;h=712" src="https://static.alili.tech/img/bVEeOb?w=3592&amp;h=712" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>使用 <code>.col-md-offset-*</code> 类可以将列向右侧偏移。这些类实际是通过使用 <code>*</code> 选择器为当前元素增加了左侧的边距（margin）。例如，<code>.col-md-offset-4</code> 类将 <code>.col-md-4</code> 元素向右侧偏移了4个列（column）的宽度。</p>
<p>看到这里大家感觉这个方案很完美，既有相应布局又有布局的偏移，但我的项目需求是这样的</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOo?w=826&amp;h=1334" src="https://static.alili.tech/img/bVEeOo?w=826&amp;h=1334" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里单选按钮和票的名称居左，而票价居右，左右给相同的 <code>padding</code> 后，单选按钮和票价分别在左右处于临界状态，我并不知道右侧的票价占几个栅格，也不知道左侧的偏移到底给多少合适（因为票价是变量，可能 10 位数，当然可能性为 0）</p>
<p>了解 flex 基础的一眼识破，不是有 <code>space-between</code> 嘛，对就是它，不了解的朋友继续转到文章开头的链接温习一下。</p>
<p>下文我们去找设计灵感</p>
<h2 id="articleHeader1">Angular Material 框架</h2>
<p>What is Angular Material?</p>
<blockquote>For developers using AngularJS, Angular Material is both a UI Component framework and a reference implementation of Google's Material Design Specification. This project provides a set of reusable, well-tested, and accessible UI components based on Material Design.</blockquote>
<p>用过 AngularJS 的人应该多少有所耳闻，没听说的也没关系。我们学习的是设计思想而不是研讨一门框架。</p>
<p>这里的案例来源于：<a href="https://material.angularjs.org/1.0.8/layout/alignment" rel="nofollow noreferrer" target="_blank">https://material.angularjs.or...</a></p>
<p>上面链接是 Angular Material 框架布局部分的 API 文档，文档下方有单选按钮组合来呈现不同的布局实现。</p>
<p>先给出基本代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div layout=&quot;row&quot; layout-align=&quot;center center&quot;>
  <div>one</div>
  <div>two</div>
  <div>three</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">layout-align</span>=<span class="hljs-string">"center center"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOa?w=3264&amp;h=708" src="https://static.alili.tech/img/bVEeOa?w=3264&amp;h=708" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其它属性如下，</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOp?w=3260&amp;h=1088" src="https://static.alili.tech/img/bVEeOp?w=3260&amp;h=1088" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>进入上方链接可以在线感受一下，所有布局效果，这里不一一截图</p>
<p>同样也支持栅格系统不过这里更精密一些，是 100 份的均分，官网例子给的特别全面，链接： <a href="https://material.angularjs.org/1.0.8/layout/children" rel="nofollow noreferrer" target="_blank">https://material.angularjs.or...</a></p>
<p>这里给大家选出一个比较通用的例子，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div layout=&quot;row&quot; layout-wrap>
  <div flex=&quot;30&quot;>
    [flex=&quot;30&quot;]
  </div>
  <div flex=&quot;45&quot;>
    [flex=&quot;45&quot;]
  </div>
  <div flex=&quot;25&quot;>
    [flex=&quot;25&quot;]
  </div>
  <div flex=&quot;33&quot;>
    [flex=&quot;33&quot;]
  </div>
  <div flex=&quot;66&quot;>
    [flex=&quot;66&quot;]
  </div>
  <div flex=&quot;50&quot;>
    [flex=&quot;50&quot;]
  </div>
  <div flex>
    [flex]
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">layout-wrap</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"30"</span>&gt;</span>
    [flex="30"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"45"</span>&gt;</span>
    [flex="45"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"25"</span>&gt;</span>
    [flex="25"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"33"</span>&gt;</span>
    [flex="33"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"66"</span>&gt;</span>
    [flex="66"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>=<span class="hljs-string">"50"</span>&gt;</span>
    [flex="50"]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>&gt;</span>
    [flex]
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOn?w=3264&amp;h=508" src="https://static.alili.tech/img/bVEeOn?w=3264&amp;h=508" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>代码简洁易懂，<code>layout="row"</code>表示在水平方向分布，最后的 <code>flex</code> 不带参数表明自动填充，将不带 <code>flex</code> 属性的元素之前的空间填满。</p>
<p>下面我们回到需求，针对需求给出 html 结构的设想</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div layout=&quot;row&quot;>
  <div flex>单选按钮和票的名称</div>
  <div>票价</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"row"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">flex</span>&gt;</span>单选按钮和票的名称<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>票价<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>或者干脆</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div layout=&quot;row&quot; layout-align=&quot;space-between center&quot;>
  <div>单选按钮和票的名称</div>
  <div>票价</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">layout</span>=<span class="hljs-string">"row"</span> <span class="hljs-attr">layout-align</span>=<span class="hljs-string">"space-between center"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>单选按钮和票的名称<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>票价<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>好，有的朋友说使用 <code>float</code> 或者 <code>text-align</code> 也可以满足需求的啊，干嘛写这么长篇幅的文章解释这个案例？</p>
<p>问的好，首先 flex 布局优势特别明显，弹性布局，不存在兼容问题，也不用清除浮动。</p>
<p>设想一下项目复杂度再大一点呢，守旧的方案还能不能保持清晰的 html 文档结构？css 又该从哪里下手？</p>
<p>既然我们出发点是对的，接下来选择一下设计模式。</p>
<p>简单说两种模式</p>
<ul>
<li>class 属性为代表的 Bootstrap 框架</li>
<li>自定义属性为代表的 Angular Material 框架</li>
</ul>
<p>我个人认为 class 过多导致布局和样式混在一起不好分辨，后期维护较困难，决定采用 Angular Material 框架的设计模式。</p>
<p>首先大家要了解 <a href="http://www.w3school.com.cn/css/css_selector_attribute.asp" rel="nofollow noreferrer" target="_blank">css 属性选择器</a>，常用的有 class选择器，id选择器，tag选择器，属性选择器还是比较少用的。</p>
<p>下面给 w3school 的截图，子串匹配属性选择器的语法</p>
<p><span class="img-wrap"><img data-src="/img/bVEeOm?w=2440&amp;h=420" src="https://static.alili.tech/img/bVEeOm?w=2440&amp;h=420" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>简单易懂，下面直接上写好的代码 <code>layout.scss</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[layout] {
  display: flex;
}

[flex] {
  flex: 1;
}

[layout-wrap] {
  flex-wrap: wrap;
}

[layout=&quot;row&quot;] {
  flex-direction: row;
}

[layout-wrap] {
  flex-wrap: wrap;
}

[layout=&quot;column&quot;] {
  flex-direction: column;
}

[layout-align=&quot;start start&quot;],
[layout-align=&quot;start center&quot;],
[layout-align=&quot;start end&quot;] {
  justify-content: flex-start;
}

[layout-align=&quot;center start&quot;],
[layout-align=&quot;center center&quot;],
[layout-align=&quot;center end&quot;] {
  justify-content: center;
}

[layout-align=&quot;end start&quot;],
[layout-align=&quot;end center&quot;],
[layout-align=&quot;end end&quot;] {
  justify-content: flex-end;
}

[layout-align=&quot;space-between start&quot;],
[layout-align=&quot;space-between center&quot;],
[layout-align=&quot;space-between end&quot;] {
  justify-content: space-between;
}

[layout-align=&quot;space-arround start&quot;],
[layout-align=&quot;space-arround center&quot;],
[layout-align=&quot;space-arround end&quot;] {
  justify-content: space-arround;
}

[layout-align=&quot;start start&quot;],
[layout-align=&quot;center start&quot;],
[layout-align=&quot;end start&quot;],
[layout-align=&quot;space-between start&quot;],
[layout-align=&quot;space-arround start&quot;] {
  align-items: flex-start;
}

[layout-align=&quot;start center&quot;],
[layout-align=&quot;center center&quot;],
[layout-align=&quot;end center&quot;],
[layout-align=&quot;space-between center&quot;],
[layout-align=&quot;space-arround center&quot;] {
  align-items: center;
}

[layout-align=&quot;start end&quot;],
[layout-align=&quot;center end&quot;],
[layout-align=&quot;end end&quot;],
[layout-align=&quot;space-between end&quot;],
[layout-align=&quot;space-arround end&quot;] {
  align-items: flex-end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-attr">[layout]</span> {
  <span class="hljs-attribute">display</span>: flex;
}

<span class="hljs-selector-attr">[flex]</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-attr">[layout-wrap]</span> {
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}

<span class="hljs-selector-attr">[layout="row"]</span> {
  <span class="hljs-attribute">flex-direction</span>: row;
}

<span class="hljs-selector-attr">[layout-wrap]</span> {
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}

<span class="hljs-selector-attr">[layout="column"]</span> {
  <span class="hljs-attribute">flex-direction</span>: column;
}

<span class="hljs-selector-attr">[layout-align="start start"]</span>,
<span class="hljs-selector-attr">[layout-align="start center"]</span>,
<span class="hljs-selector-attr">[layout-align="start end"]</span> {
  <span class="hljs-attribute">justify-content</span>: flex-start;
}

<span class="hljs-selector-attr">[layout-align="center start"]</span>,
<span class="hljs-selector-attr">[layout-align="center center"]</span>,
<span class="hljs-selector-attr">[layout-align="center end"]</span> {
  <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-attr">[layout-align="end start"]</span>,
<span class="hljs-selector-attr">[layout-align="end center"]</span>,
<span class="hljs-selector-attr">[layout-align="end end"]</span> {
  <span class="hljs-attribute">justify-content</span>: flex-end;
}

<span class="hljs-selector-attr">[layout-align="space-between start"]</span>,
<span class="hljs-selector-attr">[layout-align="space-between center"]</span>,
<span class="hljs-selector-attr">[layout-align="space-between end"]</span> {
  <span class="hljs-attribute">justify-content</span>: space-between;
}

<span class="hljs-selector-attr">[layout-align="space-arround start"]</span>,
<span class="hljs-selector-attr">[layout-align="space-arround center"]</span>,
<span class="hljs-selector-attr">[layout-align="space-arround end"]</span> {
  <span class="hljs-attribute">justify-content</span>: space-arround;
}

<span class="hljs-selector-attr">[layout-align="start start"]</span>,
<span class="hljs-selector-attr">[layout-align="center start"]</span>,
<span class="hljs-selector-attr">[layout-align="end start"]</span>,
<span class="hljs-selector-attr">[layout-align="space-between start"]</span>,
<span class="hljs-selector-attr">[layout-align="space-arround start"]</span> {
  <span class="hljs-attribute">align-items</span>: flex-start;
}

<span class="hljs-selector-attr">[layout-align="start center"]</span>,
<span class="hljs-selector-attr">[layout-align="center center"]</span>,
<span class="hljs-selector-attr">[layout-align="end center"]</span>,
<span class="hljs-selector-attr">[layout-align="space-between center"]</span>,
<span class="hljs-selector-attr">[layout-align="space-arround center"]</span> {
  <span class="hljs-attribute">align-items</span>: center;
}

<span class="hljs-selector-attr">[layout-align="start end"]</span>,
<span class="hljs-selector-attr">[layout-align="center end"]</span>,
<span class="hljs-selector-attr">[layout-align="end end"]</span>,
<span class="hljs-selector-attr">[layout-align="space-between end"]</span>,
<span class="hljs-selector-attr">[layout-align="space-arround end"]</span> {
  <span class="hljs-attribute">align-items</span>: flex-end;
}</code></pre>
<p>好，到这为止我们的 flex 框架已经实现了，效果语法和 Angular Material 框架是一样的。大家自行尝试。</p>
<p>细心的朋友发现这里 orange 并没有实现栅格系统，因为现实需求中栅格系统布局的实用价值不是很大（各元素宽度根据内容变化，手机端在元素宽度不变的情况可以通过相同的 rem 值针对不同屏幕适配，而 n 等分可以通过 <code>space-arround</code> 属性实现），而且本文把开发的重点放在了 flex 的封装上。</p>
<h2 id="articleHeader2">总结</h2>
<p>在现代复杂 css 样式的开发中，尽量避免重复书写相同的布局代码，除非特殊需求（真对相应的 class 给样式），这样既满足模块化思想又保证了代码复用，项目中只需引入 <code>layout.scss</code> 即可。如果你针对 css 代码模块化有不同的想法欢迎留言交流。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自己动手实现一个 Flex 布局框架

## 原文链接
[https://segmentfault.com/a/1190000007167682](https://segmentfault.com/a/1190000007167682)

