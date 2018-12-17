---
title: '前端人人都应该理解的盒模型BFC渲染机制' 
date: 2018-12-16 2:30:10
hidden: true
slug: wr8swzu2rij
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前端人人都要懂的盒模型BFC渲染机制</h1>
<h2 id="articleHeader1">为什么我们说,前端工程师有必要需要了解BFC渲染机制?</h2>
<p>因为如果你一个前端压根没听说过BFC,那你是如何理解下面这几个css现象的呢?</p>
<blockquote>现象一:  垂直方向上元素margin的合并现象</blockquote>
<p>首先,有父子嵌套关系的2个元素,代码和示例如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV2E66?w=744&amp;h=428" src="https://static.alili.tech/img/bV2E66?w=744&amp;h=428" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .father {
            width: 200px;
            height: 200px;
            background: skyblue;
        }
        
        .son {
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
    

  ---- html部分--- 
  
    <body>
        <div class=&quot;father&quot;>
            <div class=&quot;son&quot;></div>
        </div>
    </body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.father</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
        }
        
        <span class="hljs-selector-class">.son</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    

  ---- html部分--- 
  
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>然后,我们给子元素添加一个margin-top: 50px时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      .son {
            width: 100px;
            height: 100px;
            background: red;
            margin-top: 50px;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>      <span class="hljs-selector-class">.son</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: red;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">50px</span>;
        }</code></pre>
<p>我们神奇的发现父子元素同时"掉下来了50px",如图所示</p>
<p><span class="img-wrap"><img data-src="/img/bV2E7c?w=782&amp;h=443" src="https://static.alili.tech/img/bV2E7c?w=782&amp;h=443" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>所以这里的问题是: 为什么2个div一起向下掉呢?</em></strong></p>
<blockquote>现象二: 垂直方向上元素margin的合并现象</blockquote>
<p>现在,我们有2个兄弟关系的元素,代码和示例如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV2E7k?w=787&amp;h=391" src="https://static.alili.tech/img/bV2E7k?w=787&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .bother1 {
            width: 100px;
            height: 100px;
            background: skyblue;
        }
        
        .bother2 {
            width: 100px;
            height: 100px;
            background: cadetblue;
        }
    </style>
    
     ---- html部分--- 
     
    <body>
        <div class=&quot;bother1&quot;></div>
        <div class=&quot;bother2&quot;></div>
    </body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.bother1</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
        }
        
        <span class="hljs-selector-class">.bother2</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: cadetblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    
     ---- html部分--- 
     
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bother1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bother2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>然后,我们给上边的元素添加 margin-bottom:50px , 下边的元素添加 margin-top : 50px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .bother1 {
            width: 100px;
            height: 100px;
            background: skyblue;
            margin-bottom: 60px;
        }
        .bother2 {
            width: 100px;
            height: 100px;
            background: cadetblue;
            margin-top: 40px;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-class">.bother1</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">60px</span>;
        }
        <span class="hljs-selector-class">.bother2</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: cadetblue;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">40px</span>;
        }
</code></pre>
<p>如图所示:</p>
<p><span class="img-wrap"><img data-src="/img/bV2E7l?w=789&amp;h=417" src="https://static.alili.tech/img/bV2E7l?w=789&amp;h=417" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果你眼力不错,或者亲自试试,会发现2个div之间设置了100px的距离,但是他们现在实际的间距却是50px。</p>
<p><strong><em>所以这里的问题是: 为什么2个div的间距是50px,而非100px呢?</em></strong></p>
<blockquote>现象三: overflow:hidden,可以清除浮动造成的副作用</blockquote>
<p>一对父子关系的div,父元素的高度是通过子元素的高度撑开的,如图</p>
<p><span class="img-wrap"><img data-src="/img/bV2E7v?w=785&amp;h=386" src="https://static.alili.tech/img/bV2E7v?w=785&amp;h=386" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .father {
            width: 150px;
            border: 2px solid red;
        }
        .son {
            width: 100px;
            height: 100px;
            background: skyblue;
        }
    </style>
    
     ---- html部分---
          
    <body>
        <div class=&quot;father&quot;>
            <div class=&quot;son&quot;></div>
        </div>
    </body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.father</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid red;
        }
        <span class="hljs-selector-class">.son</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    
     ---- html部分---
          
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>然后,我们给子元素float:left之后,子元素脱离的文档流,于是父元素的高度为0了,如图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     .son {
            width: 100px;
            height: 100px;
            background: skyblue;
            float : left;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>     <span class="hljs-selector-class">.son</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
            <span class="hljs-attribute">float </span>: left;
        }
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2E7C?w=785&amp;h=376" src="https://static.alili.tech/img/bV2E7C?w=785&amp;h=376" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个现象,我相信大家都知道如何解决,不就是需要"清除浮动"吗? </p>
<p>我这里想说的是,"清楚浮动"有2种原理,一类是clear: both,一类就是依靠BFC原理.</p>
<p><strong><em>所以这里的问题是: 为什么给父元素添加 overflow: hidden 就可以"清除浮动"呢?</em></strong></p>
<blockquote>现象四: overflow:hidden 配合浮动,可以实现2栏自适应布局</blockquote>
<p>如图所示,我们已经实现了左侧固定300px,右侧自适应的布局</p>
<p><strong><em>所以这里的问题是: 为什么添加 overflow: hidden 和 浮动就可以实现2栏自适应布局呢?</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV2E7N?w=1029&amp;h=318" src="https://static.alili.tech/img/bV2E7N?w=1029&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .wrapper, * {
            padding: 0;
            margin: 0;
        }

        .left {
            width: 300px;
            height: 100px;
            background: red;
            float: left;
        }

        .right {
            height: 100px;
            background: skyblue;
            overflow: hidden;
        }

    </style>
    
     ---- html部分---
    
    <div class=&quot;wrapper&quot;>
        <div class=&quot;left&quot;>left</div>
        <div class=&quot;right&quot;>right</div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.wrapper</span>, * {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.left</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: red;
            <span class="hljs-attribute">float</span>: left;
        }

        <span class="hljs-selector-class">.right</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: skyblue;
            <span class="hljs-attribute">overflow</span>: hidden;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    
     ---- html部分---
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>好了,以上四个看似毫无关系的"奇葩"现象,不知道是否理解出现这些现象的原因呢? </p>
<p>如果回答不上来,那就建议你好好看下这篇文章了。</p>
<p>当然如果你没有见过这些现象的,那你就赚到了,这么多"奇葩"问题,你看一篇文章就全解决了,省了你不少力气呢!</p>
<h2 id="articleHeader2">CSS盒模型</h2>
<ul>
<li>CSS盒模型的基本概念: 盒模型分为W3C盒模型和IE盒模型,他们的区别是计算width和height的方式不同,IE盒模型的width是从border开始计算的。</li>
<li>如何设置CSS盒模型的类型 : 通过CSS3的 box-sizing:border-box就可以设置为IE盒模型了,默认是W3C盒模型</li>
</ul>
<h2 id="articleHeader3">BFC渲染机制</h2>
<h3 id="articleHeader4">BFC基本慨念</h3>
<p>BFC是英文缩写,翻译为"块级格式化上下文"。</p>
<p>说白了BFC就是一种css盒模型的渲染规则。既然说了是渲染规则,那你自然需要去记住这些规则了,没法解释为什么。</p>
<h3 id="articleHeader5">BFC渲染规则</h3>
<p>BFC其实有很多渲染规则,我们这里说4条比较重要的规则,知道这些规则,你就可以回答上面的4个现象了。</p>
<ul>
<li>规则1: 创建了BFC的元素中,在垂直方向上的margin会发生重叠。根元素&lt;html&gt;就是一个BFC元素 (这个可以解释margin重叠)</li>
<li>规则2: BFC元素在页面上是一个独立的容器,外面的元素和里面的元素互不影响。</li>
<li>规则3: BFC元素不会和浮动的元素重叠。(这个可以解释两栏自适应)</li>
<li>规则4: 计算BFC元素的高度时,里面浮动元素的高度也会参与计算 (用来解释overflow:hidden可以清除浮动)</li>
</ul>
<h3 id="articleHeader6">普通元素如何创建BFC</h3>
<p>首先我们根元素html,就是最大的BFC容器。</p>
<p>创建BFC的方式很多,常见包括:</p>
<ul>
<li>float不为none的都可以</li>
<li>overflow: hidden  / auto</li>
<li>position: 不为static 、 relative都可以</li>
<li>display: table-cell ... 表格相关的</li>
</ul>
<p>不过我觉得用到最多的还是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow : hidden
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>overflow : <span class="hljs-type">hidden</span>
</code></pre>
<p>毕竟其他的position float display都是很容易影响页面布局的,我们一般也不想为了创建BFC区域就引发页面布局的变动吧。</p>
<h3 id="articleHeader7">补充</h3>
<p>不知道各位看了BFC的渲染规则和创建方式后,是否能够自行去解释前面的4个现象了呢?</p>
<p>补充2点:</p>
<ul>
<li>关于margin的重叠规则。在现象二中,他们的重叠规则是,margin-bottom和margin-top会重叠,重叠之后取较大的margin值</li>
<li>关于"清除浮动"的说法。实际上"清除浮动"的说法不太准确,因为清除浮动,你直接删掉float:left就行了。更准确的说是"闭合浮动",或者说清除浮动带来的副作用。</li>
</ul>
<p>最后，如果有什么疑问，欢迎留言讨论，<br>如果觉得真的对您对BFC的理解有帮助的话请点赞示意！谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端人人都应该理解的盒模型BFC渲染机制

## 原文链接
[https://segmentfault.com/a/1190000012988829](https://segmentfault.com/a/1190000012988829)

