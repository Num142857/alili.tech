---
title: 'CSS魔法堂：重新认识Box Model、IFC、BFC和Collapsing margins' 
date: 2019-02-12 2:30:12
hidden: true
slug: 6s8fs8q1gmf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>盒子模型作为CSS基础中的基础，曾一度以为掌握了IE和W3C标准下的块级盒子模型即可，但近日在学习行级盒子模型时发现原来当初是如此幼稚可笑。本文尝试全面叙述块级、行级盒子模型的特性。作为近日学习的记录。</p>
<h2 id="articleHeader1">何为盒子模型?</h2>
<p>盒子模型到底何方神圣居然可以作为CSS的基础？闻名不如见面，上图了喂!<br><span class="img-wrap"><img data-src="/img/bVnaoa" src="https://static.alili.tech/img/bVnaoa" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>再来张切面图吧!<br><span class="img-wrap"><img data-src="/img/bVtyKs" src="https://static.alili.tech/img/bVtyKs" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>下面我们以<code>&lt;div&gt;&lt;/div&gt;</code>为栗子。<code>&lt;div&gt;&lt;/div&gt;</code>标签被浏览器解析后会生成div元素并添加到document tree中，但CSS作用的对象并不是document tree，而是根据document tree生成的render tree，而盒子模型就是render tree的节点。</p>
<ul>
<li><p>注意:</p></li>
<li><ol><li><p>CSS作用的是盒子(Box), 而不是元素(Element);</p></li></ol></li>
<li><ol><li><p>JS无法直接操作盒子。</p></li></ol></li>
</ul>
<h3 id="articleHeader2">盒子模型的结构</h3>
<p>由于块级盒子在验证效果时干扰信息更少，便于理解盒子模型，因此下面将以块级盒子模型来讲解。<br><strong> 注意： 行级盒子模型与块级盒子模型结构一致，只是行级盒子在此基础上有自身特性而已。</strong><br>从上面两幅图说明盒子模型其实就是由以下4个盒子组成：</p>
<ol>
<li><p>content box：必备，由content area和4条content/inner edge组成；</p></li>
<li><p>padding box：可选，由padding和4条padding edge组成。若padding宽度设置为0，则padding edge与content edage重叠；</p></li>
<li><p>border box：可选，由border和4条border edge组成。若border宽度设置为0，则border edge与padding edage重叠；</p></li>
<li><p>margin box：可选，由margin和4条margin/outer edge组成。若margin宽度设置为0，则margin edge与border edage重叠。</p></li>
</ol>
<p>对于刚接触CSS的同学，经常会将"通过width/height属性设置div元素的宽/高"挂在口边，其实这句话是有误的。</p>
<ol>
<li><p>首先css属性width和height作用于div元素所产生的盒子，而不是元素本身;</p></li>
<li><p>另外盒子模型由4个盒子组成，那width和height到底是作用于哪些盒子呢？<br>这里就分为IE盒子模型和标准盒子模型了。</p></li>
</ol>
<h4>IE box model</h4>
<p>IE5.5(怪异模式)采用IE盒子模型，其它将使用W3C标准盒子模型。<br><span class="img-wrap"><img data-src="/img/bVtyKz" src="https://static.alili.tech/img/bVtyKz" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width = content-width + padding-width + border-width
height = content-height + padding-height + border-height" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">width</span> = <span class="hljs-built_in">content</span>-<span class="hljs-built_in">width</span> + padding-<span class="hljs-built_in">width</span> + <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>
<span class="hljs-built_in">height</span> = <span class="hljs-built_in">content</span>-<span class="hljs-built_in">height</span> + padding-<span class="hljs-built_in">height</span> + <span class="hljs-built_in">border</span>-<span class="hljs-built_in">height</span></code></pre>
<h4>Standard box model</h4>
<p><span class="img-wrap"><img data-src="/img/bVtyKC" src="https://static.alili.tech/img/bVtyKC" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width = content-width
height = content-height" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">width</span> = <span class="hljs-built_in">content</span>-<span class="hljs-built_in">width</span>
<span class="hljs-built_in">height</span> = <span class="hljs-built_in">content</span>-<span class="hljs-built_in">height</span></code></pre>
<h4>游走于IE box model 和 Standard box model间的通道——box-sizing属性</h4>
<p>我们看到存在两种width/height的划分方式，到底哪种才对呢？其实两种都对，具体看如何使用而已。另外IE8开始支持CSS3属性box-sizing，让我们可以自由选择采用哪种盒子:)</p>
<blockquote><p>box-sizing:content-box/border-box/inherit<br>content-box——默认值，采用Standard box model<br>border-box——采用IE box model<br>inherit——继承父元素属性值</p></blockquote>
<p>sample:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Element{
  -moz-box-sizing: border-box; // FireFox3.5+
  -o-box-sizing: border-box; // Opera9.6(Presto内核)
  -webkit-box-sizing: border-box; // Safari3.2+
  -ms-box-sizing: border-box; // IE8
  box-sizing: border-box; // IE9+,Chrome10.0+,Safari5.1+,Opera10.6
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>Element{
  -moz-<span class="hljs-built_in">box</span>-sizing: border-<span class="hljs-built_in">box</span>; <span class="hljs-comment">// FireFox3.5+</span>
  -o-<span class="hljs-built_in">box</span>-sizing: border-<span class="hljs-built_in">box</span>; <span class="hljs-comment">// Opera9.6(Presto内核)</span>
  -webkit-<span class="hljs-built_in">box</span>-sizing: border-<span class="hljs-built_in">box</span>; <span class="hljs-comment">// Safari3.2+</span>
  -ms-<span class="hljs-built_in">box</span>-sizing: border-<span class="hljs-built_in">box</span>; <span class="hljs-comment">// IE8</span>
  <span class="hljs-built_in">box</span>-sizing: border-<span class="hljs-built_in">box</span>; <span class="hljs-comment">// IE9+,Chrome10.0+,Safari5.1+,Opera10.6</span>
}</code></pre>
<h2 id="articleHeader3">行级盒子——怀疑人生de起点:)</h2>
<p>之前我理解的盒子模型如上所述，当我看到行级盒子的种种现象时，便开始怀疑人生了:(</p>
<h3 id="articleHeader4">width/height不起作用。。。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".defined-wh{
  width: 100px;
  height: 50px;

  border: solid 1px red;
  background: yellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.defined-wh</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;

  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
  <span class="hljs-attribute">background</span>: yellow;
}</code></pre>
<p>对于block-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;defined-wh&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"defined-wh"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyKE" src="https://static.alili.tech/img/bVtyKE" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>对于inline-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;defined-wh&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"defined-wh"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyKK" src="https://static.alili.tech/img/bVtyKK" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>行级盒子的宽度怎么会是0呢？高度是有的但不是50px啊，到底什么回事啊？<br>原因很简单，那就是行级盒子的content box的高/宽根本就不是通过height/width来设置的。<br><strong> content box/area的高由font-size决定的；</strong><br><strong> content box/area的宽等于其子行级盒子的外宽度(margin+border+padding+content width)之和。</strong></p>
<h3 id="articleHeader5">行级盒子被挤断了。。。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".broken{
  border: solid 1px red;
  background: yellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.broken</span>{
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
  <span class="hljs-attribute">background</span>: yellow;
}</code></pre>
<p>对于block-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;broken&quot;>一段文字一段文字一段文字一段文字一段文字一段文字</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"broken"</span>&gt;一段文字一段文字一段文字一段文字一段文字一段文字&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyK7" src="https://static.alili.tech/img/bVtyK7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>对于inline-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;broken&quot;>一段文字一段文字一段文字一段文字一段文字一段文字</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"broken"</span>&gt;</span>一段文字一段文字一段文字一段文字一段文字一段文字<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyK8" src="https://static.alili.tech/img/bVtyK8" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>行级盒子被五马分尸了，可怜兮兮的。更可怜的是我理解不了。。。<br>其实W3C Recommendation有说明的哦！</p>
<blockquote>
<p>The box model for inline elements in bidirectional context<br>When the element's 'direction' property is 'ltr', the left-most generated box of the first line box in which the element appears has the left margin, left border and left padding, and the right-most generated box of the last line box in which the element appears has the right padding, right border and right margin.</p>
<p>When the element's 'direction' property is 'rtl', the right-most generated box of the first line box in which the element appears has the right padding, right border and right margin, and the left-most generated box of the last line box in which the element appears has the left margin, left border and left padding.</p>
</blockquote>
<p>就是说当inline-level box宽度大于父容器宽度时会被拆分成多个inline-level box，<br>当属性direction为ltr时，margin/border/padding-left将作用于第一个的inline-level box，margin/border/padding-right将作用于最后一个的inline-level box;若属性direction为rtl时，margin/border/padding-right将作用于第一个的inline-level box，margin/border/padding-left将作用于最后一个的inline-level box。<br>看到了没？行级盒子真的会被分尸的，好残忍哦:|</p>
<h3 id="articleHeader6">行级盒子怎么不占空间了？怎么刷存在感啊。。。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".existed{
  margin: 20px;
  padding: 20px;
  border: solid 1px red;
  background: yellow;
  background-clip: content-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.existed</span>{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
  <span class="hljs-attribute">background</span>: yellow;
  <span class="hljs-attribute">background-clip</span>: content-box;
}</code></pre>
<p>对于block-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>before bababababababa</div>
<div class=&quot;existed&quot;>babababababababababa</div>
<div>after bababababababa</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-keyword">before</span> bababababababa&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"existed"</span>&gt;babababababababababa&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-keyword">after</span> bababababababa&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyK9" src="https://static.alili.tech/img/bVtyK9" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>对于inline-level box</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>before bababababababa</div>
<span class=&quot;existed&quot;>babababababababababa</span>
<div>after bababababababa</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-keyword">before</span> bababababababa&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"existed"</span>&gt;babababababababababa&lt;/span&gt;
&lt;<span class="hljs-keyword">div</span>&gt;<span class="hljs-keyword">after</span> bababababababa&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyLa" src="https://static.alili.tech/img/bVtyLa" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>看，行级盒子的margin/border/padding-top/bottom怎么均不占空间的？难道行级盒子仅有content box占空间吗？<br>这里已经涉及到水平和垂直方向排版的范畴了，仅以盒子模型已无法解析理解上述的问题。<br>(要结合<a href="https://www.w3.org/TR/CSS2/box.html" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS2/box.html</a>和<a href="https://www.w3.org/TR/CSS21/visuren.html" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS21/visuren.html</a>、<a href="https://www.w3.org/TR/CSS21/visudet.html" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS21/visudet.html</a>来理解了！)</p>
<p>在深入解释inline-level box的上述现象前，我们需要补充一下：</p>
<ol>
<li><p>一个元素会对应0~N个box;(当设置<code>display:none;</code>时，则对应0个box)</p></li>
<li><p>根据<code>display</code>属性值，元素会对应不同类型的controlling box(inline/block-level box均是controlling box的子类). 就CSS2而言<code>display:inline|inline-block|inline-table|table-cell|table-column-group</code>的元素对应inline-level box,而<code>display:block|list-item|table|table-caption|table-header-group|table-row|table-row-group|table-footer-group</code>的元素则对应block-level box;</p></li>
<li><p>box布局/排版时涉及到定位问题，而CSS中通过positioning scheme来定义，其包含normal flow、floats和absolute positioning三种定位方式.而normal flow包含block formatting、inline formatting和relative positioning，其中BFC为block formatting的上下文，IFC为inline formatting的上下文。</p></li>
</ol>
<p>因此大家请注意，前方高能，前方高能！！！</p>
<h3 id="articleHeader7">和IFC一起看inline-level box</h3>
<p><a href="https://www.w3.org/TR/CSS2/visuren.html#inline-formatting" rel="nofollow noreferrer" target="_blank">IFC(Inline Formatting Context)</a>,直译为“行内格式化上下文”，这是什么鬼的翻译啊？反正我对于名词一向采用拿来主义，理解名词背后的含义才是硬道理。<br> 我们简单理解为每个盒子都有一个FC特性，不同的FC值代表一组盒子不同的排列方式。有的FC值表示盒子从上到下垂直排列，有的FC值表示盒子从左到右水平排列等等。而IFC则是表示盒子从左到右的水平排列方式，仅此而已(注意：一个盒子仅且仅有一个FC值)。而inline-level box的FC特性值固定为IFC。<br> 另外仅处于in-flow的盒子才具有FC特性，也就是positioning scheme必须为Normal flow的盒子才具有FC特性。<br> 除了IFC外，对于inline-level box排版而言还有另一个重要的对象，那就是line box。line box是一个看不见摸不着的边框，但每一行所占的垂直高度其实是指line box的高度，而不是inline-level box的高度。<br> line box的特点：</p>
<ol>
<li><p>同一行inline-level box均属于同一个line box；</p></li>
<li><p>line box高度的计算方式(<a href="https://www.w3.org/TR/CSS21/visudet.html#line-height)" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS21/visudet.html#line-height)</a></p></li>
</ol>
<blockquote><p>The height of each inline-level box in the line box is calculated. For replaced elements, inline-block elements, and inline-table elements, this is the height of their margin box; for inline boxes, this is their 'line-height'. <br>The inline-level boxes are aligned vertically according to their 'vertical-align' property. In case they are aligned 'top' or 'bottom', they must be aligned so as to minimize the line box height. If such boxes are tall enough, there are multiple solutions and CSS 2.1 does not define the position of the line box's baseline.<br>The line box height is the distance between the uppermost box top and the lowermost box bottom.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
  line-height: 1;
  font-size: 14px;
  
  border: solid 1px yellow;
}
.child{
  font-size: 30px;
  vertical-align: middle;
  
  border: solid 1px blue;
}
.inline-block{
  display: inline-block;
  overflow: hidden;
  
  border: solid 1px red;
}
.other{
  border: solid 1px green;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span>{
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> yellow;
}
<span class="hljs-selector-class">.child</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
  
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> blue;
}
<span class="hljs-selector-class">.inline-block</span>{
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">overflow</span>: hidden;
  
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
}
<span class="hljs-selector-class">.other</span>{
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> green;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;parent&quot;>
  <span class=&quot;child&quot;>
    <span class=&quot;inline-block&quot;>display:inline-block元素</span>
    xp子元素的文字
  </span>
  xp父元素的文字
</span>
<div class=&quot;other&quot;>其他元素</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"parent"</span>&gt;
  &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"child"</span>&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"inline-block"</span>&gt;<span class="hljs-attribute">display</span>:inline-block元素&lt;/span&gt;
    xp子元素的文字
  &lt;/span&gt;
  xp父元素的文字
&lt;/span&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"other"</span>&gt;其他元素&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyO1" src="https://static.alili.tech/img/bVtyO1" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol>
<li><p>根据规则，span.parent所在行的line box的高度受span.parent、span.child、span.inline-block元素对应的inline-level box"高度"的影响。其中span.parent的"高度"为其line-height实际值，span.child的"高度"为其line-height实际值，而span.inline-block的"高度"为其margin box的高度。由于设置line-height:1，因此span.parent和span.child的content box高度等于line-height实际值;</p></li>
<li><p>根据vertical-align属性垂直对齐，造成各“高度”间并不以上边界或下边界对齐;</p></li>
<li><p>span.inline-block红色的上边框(border top)到span.child蓝色的下边框(border bottom)的距离再减去1px即为line box的高度。(line box的下界其实是span.child的content box的下限的，你看"其他元素"的上边框不是和span.child的下边框重叠了吗？如果那是line box的下界，那怎会出现重叠呢)</p></li>
</ol>
<p>这里又涉及到另一个属性vertical-align了，由于它十分复杂，还是另开文章来叙述吧！</p>
<h2 id="articleHeader8">行级盒子小结</h2>
<p><strong>就盒子模型而言</strong></p>
<ol>
<li><p>inline-level box与block-level box结构一致;</p></li>
<li><p>content box的高度仅能通过属性font-size来设置，content box的宽度则自适应其内容而无法通过属性width设置;</p></li>
<li><p>当inline-level box的宽度大于containing block，且达到内容换行条件时，会将inline-level拆散为多个inline-level box并分布到多行中，然后当属性direction为ltr时，margin/border/padding-left将作用于第一个的inline-level box，margin/border/padding-right将作用于最后一个的inline-level box;若属性direction为rtl时，margin/border/padding-right将作用于第一个的inline-level box，margin/border/padding-left将作用于最后一个的inline-level box。</p></li>
</ol>
<p><strong>垂直排版特性</strong><br>  inline-level box排版单位不是其本身，而是line box。重点在于line box高度的计算。</p>
<ol>
<li><p>位于该行上的所有in-flow的inline-level box均参与该行line box高度的计算;(注意：是所有inline-level box，而不仅仅是子元素所生成的inline-level box)</p></li>
<li><p>replaced elements, inline-block elements, and inline-table elements将以其对应的opaque inline-level box的margin box高度参与line box高度的计算。而其他inline-level box则以line-height的实际值参与line box高度的计算;</p></li>
<li><p>各inline-level box根据vertical-align属性值相对各自的父容器作垂直方向对齐;</p></li>
<li><p>最上方的box的上边界到最下方的下边界则是line box的高度。（表述不够清晰，请参考实例理解）</p></li>
</ol>
<h2 id="articleHeader9"><a href="https://www.w3.org/TR/CSS2/box.html#collapsing-margins" rel="nofollow noreferrer" target="_blank">Collapsing margins</a></h2>
<p>大家必定听过或遇过collapsing margins吧，它是in-flow的block-level box排版时的一类现象。说到排版那必须引入另一个FC特性值——<a href="https://www.w3.org/TR/CSS2/visuren.html#block-formatting" rel="nofollow noreferrer" target="_blank">BFC(Block Formatting Context)</a>的。<br>  BFC则是表示盒子从上到下的垂直排列方式，仅此而已(注意：一个盒子仅且仅有一个FC值)。而block-level box的FC特性值固定为BFC。<br>  collapsing margins规则</p>
<ol><li><p>元素自身margin-top/bottom collapsing</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="anonymous block-level box
<div class=&quot;margins&quot;></div>
anonymous block-level box
<div class=&quot;margins border&quot;></div>
anonymous block-level box" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>anonymous block-level box
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"margins"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
anonymous block-level box
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"margins border"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
anonymous block-level box</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".margins{margin: 50px 0 70px;}
.border{border: solid 1px red;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.margins</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">70px</span>;}
<span class="hljs-selector-class">.border</span>{<span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyO4" src="https://static.alili.tech/img/bVtyO4" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>当block-level box高度为0，垂直方向的border和padding为0，并且没有in-flow的子元素。那么它垂直方向的margin将会发生重叠。</p>
<ol><li><p>父子元素margin-top/top 或 margin-bottom/bottom collapsing</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="anonymous block-level box
<div class=&quot;parent-margins&quot;>
  <div class=&quot;margins border&quot;></div>
  anonymous block-level box
  <div class=&quot;margins border&quot;></div>
</div>
anonymous block-level box
<div class=&quot;parent-margins border&quot;>
  <div class=&quot;margins border&quot;></div>
  anonymous block-level box
  <div class=&quot;margins border&quot;></div>
</div>
anonymous block-level box" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>anonymous block-level box
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent-margins"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  anonymous block-level box
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
anonymous block-level box
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent-margins border"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  anonymous block-level box
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
anonymous block-level box</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent-margins{margin: 25px 0;}
.margins{margin: 50px 0 25px;}
.border{border: solid 1px red;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent-margins</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">25px</span> <span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.margins</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">25px</span>;}
<span class="hljs-selector-class">.border</span>{<span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyO6" src="https://static.alili.tech/img/bVtyO6" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>当父子元素margin-top间或margin-bottom间没有padding、border阻隔时，则会margin会发生重叠。<br>注意空白字符会造成目标父子元素间的存在anonymous block-level box，导致margin不重叠。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="anonymous block-level box
<div class=&quot;parent-margins&quot;>&amp;nbsp;
  <div class=&quot;margins border&quot;></div>
  anonymous block-level box
  <div class=&quot;margins border&quot;></div>
</div>
anonymous block-level box" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>anonymous block-level box
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent-margins"</span>&gt;&amp;nbsp;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  anonymous block-level box
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
anonymous block-level box</code></pre>
<ol><li><p>兄弟元素margin-bottom/top collapsing</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;margins&quot;>former</div>
<div class=&quot;margins&quot;>latter</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins"</span>&gt;former&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins"</span>&gt;latter&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".margins{margin: 50px 0 25px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.margins</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">25px</span>;}</code></pre>
<p>两个相邻的in-flow block-level box的上下margin将发生重叠。</p>
<p><strong>上述为默认情况下block-level box(即display:block，其它为默认值时)的margin重叠规则</strong><br>  那非默认情况下呢？相比非默认情况下的margin重叠规则，我们更关心是什么时候不会产生重叠。这时又引入了另一个概念——生成新BFC。也就是block-level box A与block-level box B的FC特性值BFC可能是不同的。<br>  当两个相邻box的FC值不为同一个BFC时，它们的margin绝对不会重叠。<br>  那么剩下的问题就是，到底何时会产生新的BFC？哪些block-level box会采用新的BFC？默认BFC又是谁生成的呢？<br>  其实根元素(html)会生成默认BFC供其子孙block-level box使用。<br>  采用floats或absolute positioning作为positioning scheme时，或display:inline-block/table-cell/table-caption或overflow属性值不为visible时，则会产生新的BFC；而新的BFC将作为子孙block-level box的FC属性值。<br>  注意：</p>
<ol>
<li><p>产生新BFC的盒子不会与子盒子发生margin重叠；</p></li>
<li><p>display:inline-block的盒子不与兄弟盒子发生margin重叠，是因为display:inline-block的盒子的FC特性值为IFC，还记得line box吗？没有margin重叠是自然不过的事了；</p></li>
<li><p>positioning scheme为floats的盒子不与floated的兄弟盒子发生margin重叠，也不会与前一个in-flow的兄弟盒子发生margin重叠。（注意：与父盒子也不会发生margin重叠）</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;margins border&quot;>sibling</div>
<div class=&quot;margins border float&quot;>floats1</div>
<div class=&quot;margins border float&quot;>floats2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border"</span>&gt;sibling&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border float"</span>&gt;floats1&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"margins border float"</span>&gt;floats2&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".margins{margin: 50px 0 50px;}
.border{border: solid 1px red;}
.float{float:left;width:200px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.margins</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span>;}
<span class="hljs-selector-class">.border</span>{<span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;}
<span class="hljs-selector-class">.float</span>{<span class="hljs-attribute">float</span>:left;<span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtyPe" src="https://static.alili.tech/img/bVtyPe" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">归纳FC、BFC和IFC</h2>
<p>由于上述主要阐述inline/block-level box，因此通过“仅此而已”来简化BFC和IFC的内涵。下面我们稍微全面一点去理解BFC和IFC如何影响inline/block-level box。</p>
<p><strong>FC(Formatting Context)，用于初始化时设置盒子自身尺寸和排版规则。</strong>注意“初始化”，暗指positioning scheme采用的是normal flow，要知道floats和absolute positioning均不是默认/初始化值。也就是说我们在讨论FC及BFC和IFC时，均针对in-flow box而言的。</p>
<h3 id="articleHeader11">BFC</h3>
<p><strong>对于不产生新BFC的盒子</strong><br>1.block-level boxes垂直排列，盒子的left outer edge与所在的containing block的左边相接触，默认情况下(width为auto时)right outer edge则与所在的containing block的右边相接触。即使存在floated的兄弟盒子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot; style=&quot;border:solid 2px red;&quot;>
  <div id=&quot;left&quot; style=&quot;float:left;width:300px;height:30px;background:yellow;opacity:0.2;&quot;></div>
  <div id=&quot;right&quot; style=&quot;height:30px;background:#999;&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:solid 2px red;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:left;width:300px;height:30px;background:yellow;opacity:0.2;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:30px;background:#999;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtDkv" src="https://static.alili.tech/img/bVtDkv" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>虽然<code>div#left</code>浮点了，但<code>div#right</code>的left outer edge还是与<code>div#container</code>的left content edge相接触。<code>div#right</code>所在的containing block就是<code>div#container</code>的content box.</p>
<p>2.<a href="https://www.w3.org/TR/CSS21/visudet.html#normal-block" rel="nofollow noreferrer" target="_blank">block-level box高度的计算</a></p>
<blockquote>
<p>The element's height is the distance from its top content edge to the first applicable of the following:</p>
<ol>
<li><p>the bottom edge of the last line box, if the box establishes a inline formatting context with one or more lines</p></li>
<li><p>the bottom edge of the bottom (possibly collapsed) margin of its last in-flow child, if the child's bottom margin does not collapse with the element's bottom margin</p></li>
<li><p>the bottom border edge of the last in-flow child whose top margin doesn't collapse with the element's bottom marginzero, otherwise only children in the normal flow are taken into account (i.e., floating boxes and absolutely positioned boxes are ignored, and relatively positioned boxes are considered without their offset).</p></li>
</ol>
</blockquote>
<p>也就out-flow box不影响block-level box高度的计算。也就是解释了为何div中仅含floated元素时，div盒子高度为0的现象了。</p>
<p><strong>对于产生新BFC的盒子</strong><br>  对于产生新BFC的盒子而言，除了不发生collapsing margins的情况外，还有两个与浮点相关的现象。<br>1.<a href="https://www.w3.org/TR/CSS21/visudet.html#root-height" rel="nofollow noreferrer" target="_blank">out-flow box纳入block-level box高度的计算</a></p>
<blockquote><p>In addition, if the element has any floating descendants whose bottom margin edge is below the element's bottom content edge, then the height is increased to include those edges. Only floats that participate in this block formatting context are taken into account, e.g., floats inside absolutely positioned descendants or other floats are not.</p></blockquote>
<p>也就positioning scheme为floats的box也会影响block-level box高度的计算。</p>
<p>2.誓死不与positioning scheme为floats的兄弟盒子重叠</p>
<blockquote><p>The border box of a table, a block-level replaced element, or an element in the normal flow that establishes a new block formatting context (such as an element with 'overflow' other than 'visible') must not overlap the margin box of any floats in the same block formatting context as the element itself. If necessary, implementations should clear the said element by placing it below any preceding floats, but may place it adjacent to such floats if there is sufficient space. They may even make the border box of said element narrower than defined by section 10.3.3. CSS2 does not define when a UA may put said element next to the float or by how much said element may become narrower.</p></blockquote>
<p>产生新BFC的block-level box不与floated-box重叠，而是floated-box的margin-box与block-level box的border-box相接触。<br>水平方向</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;float:left;width:100px;border: solid 1px red;margin-right:50px;&quot;>floated</div>
<div style=&quot;width:200px;border: solid 1px blue;margin-left:100px;overflow:hidden;&quot;>gen new BFC balabala</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"float:left;width:100px;border: solid 1px red;margin-right:50px;"</span>&gt;floated&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"width:200px;border: solid 1px blue;margin-left:100px;overflow:hidden;"</span>&gt;gen <span class="hljs-keyword">new</span> BFC balabala&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtDkI" src="https://static.alili.tech/img/bVtDkI" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>垂直方向</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;float:left;width:100px;border: solid 1px red;margin-bottom:50px;&quot;>floated</div>
<div style=&quot;width:200px;border: solid 1px blue;margin-top:100px;overflow:hidden;&quot;>gen new BFC balabala</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"float:left;width:100px;border: solid 1px red;margin-bottom:50px;"</span>&gt;floated&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"width:200px;border: solid 1px blue;margin-top:100px;overflow:hidden;"</span>&gt;gen <span class="hljs-keyword">new</span> BFC balabala&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVtDkJ" src="https://static.alili.tech/img/bVtDkJ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">IFC</h3>
<p>提起IFC那就不能不说line box，而line box高度的计算方式上面已经叙述了，那line box的宽度呢？<br>line box默认情况下左边框与containing block的左边框接触，右边框与containing block的右边框接触。若存在floated兄弟盒子，则line box的宽度为containing block的宽度减去floated-box的outer-box的宽度。<br><span class="img-wrap"><img data-src="/img/bVtDkM" src="https://static.alili.tech/img/bVtDkM" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>而inline-level box必须包含在line box中，若inline-level box的<code>white-space:nowrap或pre外的其他值</code>时，就会将inline-level box拆分为多个inline-level box并散落到多个line box中，从而实现文字环绕图片的效果了。<br><span class="img-wrap"><img data-src="/img/bVtDkN" src="https://static.alili.tech/img/bVtDkN" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>否则inline-level box会捅破line box(即line box宽度不变)</p>
<h4>行——换与不换</h4>
<p>先看看关于换行的CSS属性吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  white-space
    normal: 忽略/合并空白
    pre: 保留空白，如同<pre>的行为
    nowrap: 忽略/合并空白，文本不会换行，直到遇到<br/>
    pre-wrap: 保留空白，但是会正常地进行换行
     pre-line: 忽略/合并空白，但是会正常地进行换行
    inherit: 从父元素继承。
  word-wrap
    normal: 只在允许的断字点换行
    break-word: 在长单词或URL地址内部进行换行
  word-break
    normal:依照亚洲和非亚洲语言的文本规则，允许在单词内换行。
    keep-all:让亚洲语言文本如同非亚洲语言文本那样不允许在任意单词内换行。
    break-all:允许非亚洲语言文本行如同亚洲语言文本那样可以在任意单词内换行。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>  white-space
    norma<span class="hljs-variable">l:</span> 忽略/合并空白
    <span class="hljs-keyword">pre</span>: 保留空白，如同<span class="hljs-symbol">&lt;pre&gt;</span>的行为
    nowrap: 忽略/合并空白，文本不会换行，直到遇到&lt;<span class="hljs-keyword">br</span>/&gt;
    <span class="hljs-keyword">pre</span>-wrap: 保留空白，但是会正常地进行换行
     <span class="hljs-keyword">pre</span>-<span class="hljs-built_in">line</span>: 忽略/合并空白，但是会正常地进行换行
    inheri<span class="hljs-variable">t:</span> 从父元素继承。
  word-wrap
    norma<span class="hljs-variable">l:</span> 只在允许的断字点换行
    <span class="hljs-keyword">break</span>-word: 在长单词或URL地址内部进行换行
  word-<span class="hljs-keyword">break</span>
    norma<span class="hljs-variable">l:</span>依照亚洲和非亚洲语言的文本规则，允许在单词内换行。
    keep-<span class="hljs-keyword">al</span><span class="hljs-variable">l:</span>让亚洲语言文本如同非亚洲语言文本那样不允许在任意单词内换行。
    <span class="hljs-keyword">break</span>-<span class="hljs-keyword">al</span><span class="hljs-variable">l:</span>允许非亚洲语言文本行如同亚洲语言文本那样可以在任意单词内换行。</code></pre>
<p>具体示例请参考：<a href="http://www.jb51.net/css/42578.html" rel="nofollow noreferrer" target="_blank">css中强制换行word-break、word-wrap、white-space区别实例说明</a></p>
<p>在处理换行问题上，我们要处理的对象分为亚洲语言文本和非亚洲语言文本。对于亚洲语言文本是以字作为操作单元，而非亚洲语言文本是以单词作为操作单元。而换行是针对特定语言文本的操作单元来处理，所以默认情况下会看到一串没空格的“中文”自动换行，而一串没空格的“英文”却没有换行的现象。<br>对于我们（亚洲人）而言，一般采用<code>word-break:break-all;word-wrap:break-word;</code>来实现中英文自动换行效果，但英文单词本身是不能这样简单粗暴地换行的。</p>
<blockquote><p>英语单词移行有一定规则,归纳如下：<br>1．移行处要用连字符号“-”,只占一个印刷符号的位置并放在该行的最后.<br>2．移行时一般按照音节进行,故只可在两音节之间分开,不能把一个完整的音节分写在上下两行.例如：Octo-ber（正）,Octob-er（误）.<br>3．复合词要在构成该词的两部分之间移行.如：some-thing,bed-room等.<br>4．如果复合词原来就有连字符号,则就在原连字符号处分行.如：good-looking等.<br>5．两个不同的辅音字母在一起时,移行时前后各一个.如：cap-tain,ex-pose等.<br>6．当两个音节间只有一个辅音字母时,如果该辅音字母前的元音字母按重读开音节的规则发音,该辅音字母移至下一行.如：fa-ther等.但如果元音按重读闭音节的规则发音,则该辅音字母保留在上一行末尾.例如：man-age等.<br>7．当遇到双写辅音字母时,一般把它们分成前后各一个.例如：mat-ter等.<br>8．当重读音节在后面时,元音字母前的辅音字母通常移到下一行.如：po-lite等.<br>9．单音节词不可移行.如：length,long,dance等.<br>10．前缀或后缀要保持完整,不可分开写.如：unfit,disappear等.<br>11．阿拉伯数字不分开移行书写.<br>12．不论音节多少,专有名词不宜分写.例如：Nancy,Russia等.<br>13．缩写词、略写词或某些词的缩写形式不可移行书写.例如：U．N．（联合国）,P．R．C．（中华人民共和国）,isn't.<br>14．不能构成一个音节的词尾不分写.例如：stopped等.<br>15．字母组合或辅音连缀不可移行.例如：machine,meat等.</p></blockquote>
<p>CSS简化了上述的规则，若需要换行处恰好是一个复合词，就在原连字符号处分行；其它情况则整个单词移到下一行。因此使用<code>word-wrap:break-word;</code>就OK了。</p>
<p>另外我们还可以通过<code>word-break:keep-all;white-space:nowrap;</code>或<code>word-break:keep-all;white-space:pre;</code>来实现打死都不换行的效果</p>
<h2 id="articleHeader13">总结</h2>
<p>洋洋洒洒总算把Box Model、BFC和IFC描述了个大概。对于BFC折腾点就是在collapsing margins那，另外还有产生新BFC这个行为上（这个跟浮动等有交集，以后再理清吧）；而IFC重点在于理解line box，其实line box也像block-level box那样是垂直排列的，而inline-level box则是以line box作为容器实现水平排列罢了。到这里会发现理解IFC比BFC蛋疼多了，不过有了这篇作基础，后面理解text-align、line-height和vertical-align就轻松不少了。</p>
<p>本文纯个人理解，若有纰漏，望各位指正，谢谢！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="尊重原创，转载请注明来自：肥子John^_^
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>尊重原创，转载请注明来自：肥子John^<span class="hljs-keyword">_</span>^
</code></pre>
<h2 id="articleHeader14">感谢</h2>
<p><a href="https://www.w3.org/TR/CSS2/box.html" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/CSS2/box.html</a><br><a href="http://div.io/topic/834?page=1#3261(BFC)" rel="nofollow noreferrer" target="_blank">http://div.io/topic/834?page=1#3261(BFC)</a><br><a href="http://www.cnblogs.com/giggle/p/5236982.html(BFC)" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/giggle/p/5236982.html(BFC)</a><br><a href="https://segmentfault.com/a/1190000003043991">https://segmentfault.com/a/1190000003043991</a> (IFC)<br><a href="http://www.cnblogs.com/winter-cn/archive/2013/05/11/3072929.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/winter-cn/archive/2013/05/11/3072929.html</a>（BFC/IFC）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：重新认识Box Model、IFC、BFC和Collapsing margins

## 原文链接
[https://segmentfault.com/a/1190000004625635](https://segmentfault.com/a/1190000004625635)

