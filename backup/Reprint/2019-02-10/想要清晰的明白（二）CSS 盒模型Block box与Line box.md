---
title: '想要清晰的明白（二）CSS 盒模型Block box与Line box' 
date: 2019-02-10 2:30:42
hidden: true
slug: a6i5po1hhus
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在上一篇<a href="https://segmentfault.com/a/1190000005116275">想要清晰的明白（一）： CSS视觉格式化模型|盒模型|定位方案|BFC</a>比较宏观的了解了盒子模型的作用，接下来就详细的介绍两种盒子的具体细节</p></blockquote>
<h1 id="articleHeader0">Block Box</h1>
<p><span class="img-wrap"><img data-src="/img/bVvH4u" src="https://static.alili.tech/img/bVvH4u" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>(图自《css权威指南》)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display ： block 、 list-item 以及 table 会让一个元素成为块级元素。
 在Block Box中，会被水平格式化，垂直格式化，那我们就分垂直和水平来讲讲
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">display </span>： <span class="hljs-string">block </span>、 <span class="hljs-built_in">list-item</span> 以及 <span class="hljs-string">table </span>会让一个元素成为块级元素。
 在<span class="hljs-string">Block </span><span class="hljs-string">Box中</span>，会被水平格式化，垂直格式化，那我们就分垂直和水平来讲讲
</code></pre>
<h2 id="articleHeader1">水平格式化</h2>
<h3 id="articleHeader2">如何计算其宽度</h3>
<p>正常流中，块级元素框的水平部分 = <code>其父元素的width</code> = margin-left+margin-right + padding-left+padding-right+ border-left+border-right+自身width</p>
<blockquote><p>这个理解非常重要！是等于其父元素的width！</p></blockquote>
<h3 id="articleHeader3">width &amp; margin &amp; auto</h3>
<p><span class="img-wrap"><img data-src="/img/bVvIie" src="https://static.alili.tech/img/bVvIie" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVvIhV" src="https://static.alili.tech/img/bVvIhV" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>为什么.a中设置padding为auto，均invalid？<br> 在padding-left/right,margin-left/right,border-left/right,width（我们简称下水平7大属性）中只有margin和width的值可能为auto</p></li>
<li><p>设置margin-left为10px,显示正确，为什么margin-right是剩余的所有宽度?<br>因为当margin-left/right，width三个值均设置有固定宽度的时候，margin-right会根据包含块的width自动补齐</p></li>
<li><p>利用margin：0 auto 居中<br>所以，利用这种方式居中的时候，必须是要设置居中元素的宽度，这样左右margin的值便会相等，从而引起的居中，这个和text-align：center只能块级元素的内联内容设置居中是不一样的。</p></li>
</ol>
<h2 id="articleHeader4">垂直格式化</h2>
<p>height与width一样，height定义了内容区的高度，而不是元素框的高度。元素框上下的内边距，边距，都会增加到height值里。</p>
<p>只有三个属性可以设置auto，height，和margin-top/bottom。注意！这里如果margin-top和margin-bottom同时设置为auto，也不会垂直居中，而是<strong>默认为零</strong>。</p>
<p>垂直格式化，有一个很重要的方面是会造成垂直相邻外边距合并，解决这个的方式见<a href="https://segmentfault.com/a/1190000005116275" target="_blank">想要清晰的明白（一）</a>中的BFC部分。</p>
<h2 id="articleHeader5">负margin</h2>
<h3 id="articleHeader6">水平方向</h3>
<p>问： 水平7大属性相加要等于父元素的width，那margin负值会造成什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="若width不是固定值，那么width的值则会增大
因为要满足条件等于父元素width，负margin相当于负值，width auto自动增大
若width为固定值，那么margin-right则会auto增大来满足这个条件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>若<span class="hljs-attribute">width</span>不是固定值，那么<span class="hljs-attribute">width</span>的值则会增大
因为要满足条件等于父元素<span class="hljs-attribute">width</span>，负<span class="hljs-attribute">margin</span>相当于负值，<span class="hljs-attribute">width</span> <span class="hljs-attribute">auto</span>自动增大
若<span class="hljs-attribute">width</span>为固定值，那么<span class="hljs-attribute">margin-right</span>则会<span class="hljs-attribute">auto</span>增大来满足这个条件
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvJai" src="https://static.alili.tech/img/bVvJai" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>灰色部分是body内的一个盒子，图二，没有定框使用负margin后，发生偏移，并且宽度增加，图三，定宽，发生偏移但是，宽度不增加，我们常常会发现出现莫名的水平滚动条，这里很有可能就是margin这小子在作祟</p>
<h3 id="articleHeader7">垂直方向</h3>
<p><span class="img-wrap"><img data-src="/img/bVvJev" src="https://static.alili.tech/img/bVvJev" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>黑色是接在灰色div后的一个div,可以看到，margin-bottom为负值，不会造成元素本身的移动，而是造成兄弟元素往上移动，就像我不动，拉了下面的人一把，而margin-top为负值，就像我们排成一队，然后像兔子跳一样一起往前面跳了一步。</p>
<p>从图二也可以看出来，黑色盒子对灰色盒子发生了覆盖，因为浏览器总是按从前到后的顺序显示元素，所以文档中后出现的正常流元素可能会覆盖较早出现的元素。</p>
<p>可以发现，灰色盒子的高度依旧保持着并且渲染出来了，但是CSS读取的高度已经减小，下面的元素自然往上移动了</p>
<h3 id="articleHeader8">负margin与float应用 ——双飞翼</h3>
<hr>
<p>不知道为啥每次看到这名字，就....莫名的想笑，雅蠛蝶</p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVvJG2" src="https://static.alili.tech/img/bVvJG2" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;main&quot;>
      <div class=&quot;main-container&quot;>身子</div>
    </div>
    <div class=&quot;left&quot;>左边小翅膀</div>
    <div class=&quot;right&quot;>右边小翅膀</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main-container"</span>&gt;身子&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;左边小翅膀&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;右边小翅膀&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h3 id="articleHeader9">分析</h3>
<p>margin负值导致两个翅膀是覆盖在div.main上,我们看到的蓝色部分是.main-container,margin-left:-100%,相当于是把第二排的第一个，从后面拉动一个100%距离，也就是到了第一排和第一排第一个一起站着，第二排第一个走了，第二排第二个（也就是div.right）自动补到他的位置上，这时候又来了个margin-left：-200px利用到第二排第二个上，往前拉动200px的距离，于是就到了现在div.right的位置</p>
<p>总而言之，水平上的七个元素的宽度和一定会等于父元素的宽度</p>
<h1 id="articleHeader10">Line Box</h1>
<p>每一行称为一条Line Box，它又是由这一行的许多inline-box组成，它的高度可以直接由line-height决定，line boxes的高度垂直堆叠形成了containing box的高度，就是我们见到的div或是p标签之类的高度了。</p>
<h2 id="articleHeader11">基础概念</h2>
<h3 id="articleHeader12">匿名文本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>当你只有一把锤子<span>一切看起来</span>都像是颗钉子</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>当你只有一把锤子<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>一切看起来<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>都像是颗钉子<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="未包含在行内元素的字符串（当你只有一把锤子，都像颗钉子）就叫匿名文本
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>未包含在行内元素的字符串（当你只有一把锤子，都像颗钉子）就叫匿名文本
</code></pre>
<h3 id="articleHeader13">内容区 行内框 间距</h3>
<p><span class="img-wrap"><img data-src="/img/bVvMvz" src="https://static.alili.tech/img/bVvMvz" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>内容区</strong><br>css假设每个元素都会生成一个或者多个Box，称为元素框，元素框中心有内容区，内容区外周围包括了padding，border，margin，但是，替换元素是包括外边距，内边距，边框的。<br><strong>行间距</strong><br>行间距是font-size与line-height的差值，被分成两半在内容区的上下<br><strong>行内框</strong><br>非替换元素，行内框高度=line-height<br>替换元素，行内框高度=内容区宽度（行间距不应用到替换元素）<br><strong>行高</strong><br>两行文字基线的距离<br><strong>行框</strong><br>一行有很多行内框，行框是包含这一行行内框最高点和最低点的<br><strong>基线</strong><br>不同元素的基线位置不同，整个行框会有一个基线，行内元素的位置是基于两者基线对齐</p>
<h3 id="articleHeader14">vertical-align(垂直对齐)</h3>
<blockquote><p>该属性 定义 行内元素的基线相对于该元素所在行的基线的垂直对齐的方式。<br>只有一个元素属于inline或是inline-block（table-cell也可以理解为inline-block水平）水平，其身上的vertical-align属性才会起作用.<br>同时也可以知道，改变其，会影响到行内框的位置，从而会影响到一整行行内元素的位置</p></blockquote>
<p>需要注意vertical-align为数值时，会让文字上下移动，当其为百分比时是针对font-size的百分比</p>
<h3 id="articleHeader15">line-height（行高）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;width:100px;height:10px&quot;></div>
//这个div调整line-height不会发生变化，因为里面没有文字
<span style=&quot;line-height:10px;border：1px solid green&quot;></span> 
//span的高度会随着line-height的变化而变化
//说明行内元素的高度是由line-height的支撑决定，行内框的高度也等于line-height" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div style=<span class="hljs-string">"width:100px;height:10px"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
<span class="hljs-comment">//这个div调整line-height不会发生变化，因为里面没有文字</span>
&lt;span style=<span class="hljs-string">"line-height:10px;border：1px solid green"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span> 
<span class="hljs-comment">//span的高度会随着line-height的变化而变化</span>
<span class="hljs-comment">//说明行内元素的高度是由line-height的支撑决定，行内框的高度也等于line-height</span></code></pre>
<h3 id="articleHeader16">管理line-height</h3>
<p>因为line-height是根据自己font-size设置，而不是父元素，所以将line-height设置为1em,该元素的line-height则会与相同（em单位是一般是相对与父元素进行设置大小）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;font-size:12px;line-height:12px&quot;>
    <span style=&quot;font-size:15px;line-height:1em&quot;>
        嘿嘿嘿，这里的line-height值为15px
    </span>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> style=<span class="hljs-string">"font-size:12px;line-height:12px"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> style=<span class="hljs-string">"font-size:15px;line-height:1em"</span>&gt;
        嘿嘿嘿，这里的<span class="hljs-attribute">line-height</span>值为<span class="hljs-number">15px</span>
    &lt;/span&gt;
&lt;/div&gt;
</code></pre>
<h3 id="articleHeader17">margin padding border对行高的影响</h3>
<ul><li><p>行内元素其padding、margin、border-top、border-bottom 不会增加行高。<br>padding会覆盖；margin将重置为0；border-top和border-bottom同样会覆盖。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVvMHG" src="https://static.alili.tech/img/bVvMHG" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>css2.1规定margin-top和margin-bottom可以运用到不是行内非替换元素的所有其他元素</p></li>
<li><p>行内替换元素（如：img）元素会影响行高</p></li>
</ul>
<h3 id="articleHeader18">inline-block</h3>
<blockquote><p>将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。</p></blockquote>
<h1 id="articleHeader19">参考资料</h1>
<p><a href="http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html" rel="nofollow noreferrer" target="_blank">《CSS 权威指南 第三版》</a><br><a href="http://www.w3cplus.com/css/the-definitive-guide-to-using-negative-margins.html" rel="nofollow noreferrer" target="_blank">《The Definitive Guide to Using Negative Margins》</a><br><a href="http://www.jianshu.com/p/549aaa5fabaa#" rel="nofollow noreferrer" target="_blank"> margin为负值产生的影响和常见布局应用</a><br><a href="http://www.cnblogs.com/imwtr/p/4441741.html" rel="nofollow noreferrer" target="_blank">CSS布局 -- 圣杯布局 &amp; 双飞翼布局</a><br><a href="http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/" rel="nofollow noreferrer" target="_blank">CSS深入理解vertical-align和line-height的基友关系</a><br><a href="http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html" rel="nofollow noreferrer" target="_blank">深入理解CSS中的行高</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
想要清晰的明白（二）CSS 盒模型Block box与Line box

## 原文链接
[https://segmentfault.com/a/1190000005155084](https://segmentfault.com/a/1190000005155084)

