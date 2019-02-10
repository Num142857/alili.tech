---
title: 'CSS魔法堂："那不是bug，是你不懂我!" by inline-block' 
date: 2019-02-11 2:30:49
hidden: true
slug: vviikxjijt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>每当来个需要既要水平排版又要设置固定高宽时，我就会想起<code>display:inline-block</code>，还有为了支持IE5.5/6/7的hack<code>*display:inline;*zoom:1;</code>。然后发现盒子间无端端多了个不可选的空白符，于是想尽办法修复这个bug。</p>
<p>直到一天拜读了@一丝姐、@HAX等高人的秘笈后才顿悟，原来我错了。那不是bug，是我不懂而已。</p>
<h2 id="articleHeader1">先行者——IE5.5中的inline-block</h2>
<p>当我们为支持IE5.5/6/7而添加这段hack时<code>*display:inline;*zoom:1</code>，总以为从IE8开始才支持<code>display:inline-block</code>属性值。其实从IE5.5开始已经支持了，只是<strong>IE5.5/6/7支持的是IE的自定义标准，而从IE8开始则是支持CSS2.1标准</strong>而已。</p>
<p><a href="https://msdn.microsoft.com/library/ms530751%28v=vs.85%29.aspx" rel="nofollow noreferrer" target="_blank">https://msdn.microsoft.com/library/ms530751%28v=vs.85%29.aspx</a></p>
<blockquote><p>The inline-block value is supported starting with Internet Explorer 5.5. You can use this value to give an object a layout without specifying the object’s height or width.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.bk1{
  background: #06F;
}
.bk2{
  background: #F60;
}
.item{
  width: 100px;
  height: 100px;
  display:inline-block;
}
</style>
<div class=&quot;bk1 item&quot;></div>
<div class=&quot;bk2 item&quot;></div>
<span class=&quot;bk1 item&quot;></span>
<span class=&quot;bk2 item&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.bk1</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#06F</span>;
}
<span class="hljs-selector-class">.bk2</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#F60</span>;
}
<span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">display</span>:inline-block;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006778893" src="https://static.alili.tech/img/remote/1460000006778893" alt="" title="" style="cursor: pointer;"></span></p>
<p>经过CSS2.1洗礼的我们对上述内容不禁会发出两个疑问：</p>
<ol>
<li><p>为啥block-level element设置了<code>display:inline-block</code>后还是垂直方向排列呢？</p></li>
<li><p>为啥inline-level element设置了<code>display:inline-block</code>后之间没有诡异的间隙呢？</p></li>
</ol>
<p>还记得杨过是如何变成神雕大侠的吗？不就是被断右臂后发现左手才是真爱吗:)</p>
<p>好了，其实我的意思是抛弃过去对<code>display:inline-block</code>的认知，重新来理解IE5.5/6/7下的它才是硬道理啦。</p>
<p>对于问题1，首先上面的引用很直白地告诉我们——<code>display:inline-block</code>能触发hasLayout，然后就没了。所以block-level element依然是block-level element，不会一夜成了inline-level element的。<strong>结论：<code>display:inline-block</code>仅会触发hasLayout，而元素本该怎么排版还是怎么排版</strong>。关于hasLayout的内容可参考<a href="http://www.cnblogs.com/fsjohnhuang/p/5291166.html" rel="nofollow noreferrer" target="_blank">《CSS魔法堂：hasLayout原来是这样!》</a></p>
<p>对于问题2，我们先看看是否真的没有间隙吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.bk1{
  background: #06F;
}
.bk2{
  background: #F60;
}
.item{
  width: 100px;
  height: 100px;
  display:inline-block;
}
</style>
<span class=&quot;bk1 item&quot;></span>
<span class=&quot;bk2 item&quot;></span>
<br/><br/>
<span class=&quot;bk1 item&quot;>bk1</span>
<span class=&quot;bk2 item&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.bk1</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#06F</span>;
}
<span class="hljs-selector-class">.bk2</span>{
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#F60</span>;
}
<span class="hljs-selector-class">.item</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">display</span>:inline-block;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span>bk1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964368" src="https://static.alili.tech/img/remote/1460000004964368" alt="" title="" style="cursor: pointer;"></span></p>
<p>见鬼了，在前一个盒子内添加些文本就出现间隙了？其实这真的和<code>display:inline-block</code>无关的，大家就放过他吧！来上呈堂证供！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
.bk1{
  background: #06F;
}
.bk2{
  background: #F60;
}
<span class=&quot;bk1&quot;>no line break</span>
&amp;#x20;&amp;#x20;
&amp;#x20;&amp;#x20;
<span class=&quot;bk2&quot;>
has line break
</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;style type=<span class="hljs-string">"text/css"</span>&gt;
.bk1{
  background: <span class="hljs-meta">#06F;</span>
}
.bk2{
  background: <span class="hljs-meta">#F60;</span>
}
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">"bk1"</span>&gt;no line <span class="hljs-keyword">break</span>&lt;/span&gt;
&amp;<span class="hljs-meta">#x20;&amp;#x20;</span>
&amp;<span class="hljs-meta">#x20;&amp;#x20;</span>
&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">"bk2"</span>&gt;
has line <span class="hljs-keyword">break</span>
&lt;/span&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964370" src="https://static.alili.tech/img/remote/1460000004964370" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到蓝色块k和红色块h间存在一个空格，而红色块k后也存在一个空格。可是代码中我们看到蓝红色块间有4个<code>&amp;#x20</code>HTML实体，为啥只有一个空格呢？而红色块中仅仅换了行而已，怎么就有个空格呢？</p>
<p><strong>先抛结论：上面两端代码均是white space、white space collasping再作祟。</strong></p>
<h3 id="articleHeader2">White space不仅是空格符那么简单</h3>
<p>初看之下以为就是空格键，其实white space是一组空白字符和换行符组成。查看unicode字符集我们会发现有一大堆空白字符(如NO-BREAK SPACE等)，但HTML只把<code>ASCII space(&amp;#x0020;)</code>、<code>ASCII tab(&amp;#x0009;)</code>、<code>ASCII form feed(&amp;#x000C)</code>和<code>Zero-width space(&amp;#x200B;)</code>纳入white space囊中，另外还将line break(换行符)<code>carriage return(&amp;#x000D;)</code>、<code>line feed(&amp;#x000A;)</code>和它俩的组合纳入white space中。</p>
<h3 id="articleHeader3">inter-word space——White space的用途之一</h3>
<p>西文是以空格来分隔单词的，而汉字间则无需空格分隔，但为了统一西文、东亚和CJK的排版，于是抽象出一个名为inter-word space的概念用于分隔词义单元，white space则作为inter-word space的值域，而定义域就是语言信息。如西文以ASCII SPACE作为inter-word space，而泰文则以Zero-width space作为inter-word space，汉语则没有inter-word space，所以<code>word-spacing</code>属性不影响汉字间的距离，本来无一物何处惹尘埃呢。<a href="http://www.cnblogs.com/fsjohnhuang/p/5316591.html#%E5%AD%97%E5%BD%A2%E5%8D%95%E8%AF%8D%E9%97%B4%E7%9A%84%E6%B0%B4%E5%B9%B3%E8%B7%9D%E7%A6%BB" rel="nofollow noreferrer" target="_blank">字形、单词间的水平距离</a></p>
<h3 id="articleHeader4">White space collapsing的玩法</h3>
<p>兼容性问题又来了，因为各浏览器的实现均不尽相同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
  span{background:#F60;}
</style>
<div><span>&amp;#x0020;&amp;#x000D;&amp;#x000A;&amp;#x000D;&amp;#x000A;before</span></div>
<div><span>&amp;#x000D;&amp;#x0020;&amp;#x000A;&amp;#x000D;&amp;#x0020;&amp;#x000A;before</span></div>
<div><span>after&amp;#x000A;&amp;#x000D;&amp;#x000A;</span></div>
<div><span>after&amp;#x000A;&amp;#x000D;</span></div>
<div><span>after&amp;#x000A;&amp;#x0020;</span></div>
<div><span>one&amp;#x000A;&amp;#x0020;two</span></div>
<div><span>one&amp;#x000A;&amp;#x0020;&amp;#x000D;&amp;#x000A;&amp;#x0020;two</span></div>
<div><span>&amp;#x0009;&amp;#x0020;&amp;#x000C;&amp;#x000D;&amp;#x000A;</span></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">span</span>{<span class="hljs-attribute">background</span>:<span class="hljs-number">#F60</span>;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;#x0020;&amp;#x000D;&amp;#x000A;&amp;#x000D;&amp;#x000A;before<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;#x000D;&amp;#x0020;&amp;#x000A;&amp;#x000D;&amp;#x0020;&amp;#x000A;before<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>after&amp;#x000A;&amp;#x000D;&amp;#x000A;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>after&amp;#x000A;&amp;#x000D;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>after&amp;#x000A;&amp;#x0020;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one&amp;#x000A;&amp;#x0020;two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one&amp;#x000A;&amp;#x0020;&amp;#x000D;&amp;#x000A;&amp;#x0020;two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;#x0009;&amp;#x0020;&amp;#x000C;&amp;#x000D;&amp;#x000A;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong> chrome43 </strong></p>
<ol>
<li><p>对于起始标签与第一个non-white-space字符间的white-space字符串，以<code>carriage return(&amp;#x000D;)</code>作为white-space合并单元的起始符，最后保留各合并单元的合并结果。</p></li>
<li><p>结束标签与最后一个non-white-space字符间的white-space字符串，以<code>carriage return(&amp;#x000D;)</code>作为white-space合并单元的结束符，最后保留各合并单元的合并结果。</p></li>
<li><p>词义单元间的white-space字符串，以<code>carriage return(&amp;#x000D;)</code>作为white-space合并单元的分界符，最后保留各合并单元的合并结果。</p></li>
<li><p>标签内仅包含white-space字符串，那么这些white-space字符串将被忽略。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964372" src="https://static.alili.tech/img/remote/1460000004964372" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong> FF5.0  </strong></p>
<ol>
<li><p>对于起始标签与第一个non-white-space字符间和结束标签与最后一个non-white-space字符间的white-space字符串将被忽略。</p></li>
<li><p>词义单元间的white-space字符串，以<code>carriage return(&amp;#x000D;)</code>作为white-space合并单元的分界符，最后保留各合并单元的合并结果。</p></li>
<li><p>标签内仅包含white-space字符串，那么这些white-space字符串将被忽略。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964374" src="https://static.alili.tech/img/remote/1460000004964374" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong> IE8+ </strong></p>
<ol>
<li><p>对于起始标签与第一个non-white-space字符间和结束标签与最后一个non-white-space字符间的white-space字符串将被忽略。</p></li>
<li><p>词义单元间的white-space字符串，合并为1个(ASCII space)字符。</p></li>
<li><p>标签内仅包含white-space字符串，那么这些white-space字符串将被忽略。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964376" src="https://static.alili.tech/img/remote/1460000004964376" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong> IE5.5/6/7 </strong></p>
<ol>
<li><p>对于起始标签与第一个non-white-space字符间的white-space字符串将被忽略。</p></li>
<li><p>结束标签与最后一个non-white-space字符间的white-space字符串，合并为1个(ASCII space)字符。</p></li>
<li><p>词义单元间的white-space字符串，合并为1个(ASCII space)字符。</p></li>
<li><p>标签内仅包含white-space字符串，那么这些white-space字符串将被忽略。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004964378" src="https://static.alili.tech/img/remote/1460000004964378" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>合并单元：合并单元包含0到N个white-space字符串，最终合并为0到1个white-space字符</strong></p>
<p>SGML描述<a href="https://www.w3.org/TR/html401/appendix/notes.html#notes-line-breaks" rel="nofollow noreferrer" target="_blank">B.3.1 Line breaks</a></p>
<blockquote><p>specifies that a line break immediately following a start tag must be ignored, as must a line break immediately before an end tag. This applies to all HTML elements without exception.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<A>My favorite Website</A>
<A>
My favorite Website
</A>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span>My favorite Website<span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span>
My favorite Website
<span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span></code></pre>
<p>望文生义翻译法：标签与正文间的line breaks要被忽略掉！也就是上下两种HTML格式的渲染效果应该一致。实际上除了IE5.5/6/7外其他浏览器均遵守之一规定的。也许你会说上面的实验不是已经证明chrome43不遵守这个法则吗？其实</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<A>
My favorite Website
</A>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;A&gt;</span>
<span class="hljs-attribute">My</span> favorite Website
<span class="hljs-section">&lt;/A&gt;</span></code></pre>
<p>HTML格式等价于<code>&lt;A&gt;#x000A;My favorite Website#x000A;&lt;/A&gt;</code>而不是<code>&lt;A&gt;#x000D;#x000A;My favorite Website#x000D;#x000A;&lt;/A&gt;</code>。现在大家都清楚了吧:)</p>
<p>绕到这里我想大家都有点晕了，到底这个跟问题2有啥关系呢？先不要着急嘛，我们先记住两点：</p>
<ol>
<li><p>IE5.5/6/7中"结束标签与最后一个non-white-space字符间的white-space字符串，合并为1个(ASCII space)字符";</p></li>
<li><p>IE5.5/6/7中仅字符(串)可以作为词义单元，而IE8+中inline-level element也作为词义单元。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;bk1 item&quot;></span>
<span class=&quot;bk2 item&quot;></span>
<br/><br/>
<span class=&quot;bk1 item&quot;>bk1</span>
<span class=&quot;bk2 item&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk1 item"</span>&gt;</span>bk1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bk2 item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>IE5.5/6/7下等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>&amp;#x000A;</span>
<br/><br/>
<span>bk1&amp;#x000A;</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;#x000A;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>bk1&amp;#x000A;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>对比一下上面的规则，空隙自然就有了。</p>
<p>IE8+下等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>&amp;nbsp;&amp;#x000A;&amp;nbsp;</span>
<br/><br/>
<span>&amp;nbsp;&amp;#x000A;&amp;nbsp;</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;span&gt;</span><span class="hljs-variable">&amp;nbsp</span>;&amp;<span class="hljs-meta">#x000A;&amp;nbsp;&lt;/span&gt;</span>
<span class="hljs-params">&lt;br/&gt;</span><span class="hljs-params">&lt;br/&gt;</span>
<span class="hljs-params">&lt;span&gt;</span><span class="hljs-variable">&amp;nbsp</span>;&amp;<span class="hljs-meta">#x000A;&amp;nbsp;&lt;/span&gt;</span></code></pre>
<p>inline-level element整体作为词义单元，从外部看根本不用管里面具体字符串是什么。</p>
<h2 id="articleHeader5">后来者居上——CSS2.1描述中的inline-block</h2>
<p>相对IE自定义的inline-block，CSS2.1引入的inline-block就好理解多了，它做了两件事：</p>
<ol>
<li><p>将元素变性为inline-level element；</p></li>
<li><p>让元素产生新的BFC。</p></li>
</ol>
<h2 id="articleHeader6">消灭尾行者</h2>
<p>现在我们终于明白通过<code>display:inline-block</code>进行元素的水平排版时，为啥会有个讨人厌的跟屁虫了，那剩下的工作当然是去而快之啦。首先这个跟屁虫实质上就是white-space字符串，而我们一般会输入的就是<code>ASCII space(&amp;#x0020;)</code>、<code>ASCII tab(&amp;#x0009;)</code>和让HTML Markup更可读的line breaks<code>carriage return(&amp;#x000D;)</code>、<code>line feed(&amp;#x000A;)</code>。</p>
<p>那么消灭尾行者的方式就只有两个方向：1. 从根本上消除white-space字符串；2. 视觉效果上消除white-space字符串的影响。</p>
<h3 id="articleHeader7">牺牲HTML Markup可读性</h3>
<p>牺牲前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>one</span>
<span>two</span>
<span>three</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>牺牲后1：一行搞定(一大坨代码，会斗鸡眼的。。。)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>one</span><span>two</span><span>three</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>牺牲后2：注释衔接(通过JS获取子元素数会有问题)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>one</span><!--
--><span>two</span><!--
--><span>three</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-comment">&lt;!--
--&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>牺牲后3</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>one</span
><span>two</span
><span>three</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>
&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>
&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>然后@一丝姐说为展现效果牺牲结构是耍流氓，@HAX说这是"削足适履"。虽说这方法从根本上清除了white-space字符串，但那种丑不是一般人能接受的。</p>
<h3 id="articleHeader8">
<code>font-size:0</code>大法</h3>
<p>这种方式存在兼容性的问题，而且子元素需要重新设置<code>font-size</code>以保证后续采用em设置属性值正确有效这个就是一个巨蛋疼的事了。</p>
<h3 id="articleHeader9">负margin-right法</h3>
<p>原理是通过负margin-right将white-space字符收入盒子后方，而margin-right的属性值需要根据font-size来决定，必须恰恰等于字形宽度的负数，否则会出现元素重叠的问题。(IE5.5/6/7不兼容这玩法)</p>
<h3 id="articleHeader10">引入HTML预编译</h3>
<p>引入如Jade等HTML模板引擎，开发和维护时采用可读性可维护性更高的语言，而浏览器运行时则采用效率更佳但可读性差甚至非人类友好的编码，然后通过如sourcemap来做映射。</p>
<p>但若仅仅为解决本文的问题而引入HTML模板引擎，是不是小题大造了呢？</p>
<h3 id="articleHeader11">用float啦！</h3>
<p>既然上述方式皆不爽，而你又熟知float的使用和注意事项，那直接换成float就好了。float的内容可参考<a href="http://www.cnblogs.com/fsjohnhuang/p/5375753.html" rel="nofollow noreferrer" target="_blank">《CSS魔法堂：说说Float那个被埋没的志向》</a></p>
<h2 id="articleHeader12">总结</h2>
<p>原来<code>display:inline-block</code>受委屈的这么多年，现在总算沉冤得雪了！都怪CSS2没有专门的布局模块，逼得我们东拼西凑地拼页面。所幸的是CSS3专设了Flexbox/Grid/Multi-columns Layout Modules，我们可以寄望更美好的将来了！</p>
<p>尊重原创，转载请注明来自：<a href="http://www.cnblogs.com/fsjohnhuang/p/5396037.html%5E_%5E" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fsjohnhuang/p/5396037.html^_^</a>肥仔John</p>
<h2 id="articleHeader13">感谢</h2>
<p><a href="http://ued.taobao.org/blog/2012/08/inline-block/" rel="nofollow noreferrer" target="_blank">inline-block 前世今生</a><br><a href="http://www.iyunlu.com/view/css-xhtml/79.html" rel="nofollow noreferrer" target="_blank">inline-block 未来</a><br><a href="http://www.w3cplus.com/css/inline-blocks.html" rel="nofollow noreferrer" target="_blank">应不应该使用inline-block代替float</a><br><a href="http://demo.doyoe.com/css/inline-block-space/" rel="nofollow noreferrer" target="_blank">inline-block元素间间隙产生及去除详解</a><br><a href="https://www.zhihu.com/question/21468450" rel="nofollow noreferrer" target="_blank">有哪些好方法能处理 display: inline-block 元素之间出现的空格？</a><br><a href="https://css-tricks.com/fighting-the-space-between-inline-block-elements/" rel="nofollow noreferrer" target="_blank">Fighting the Space Between Inline Block Elements</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/11/%E6%8B%9C%E6%8B%9C%E4%BA%86%E6%B5%AE%E5%8A%A8%E5%B8%83%E5%B1%80-%E5%9F%BA%E4%BA%8Edisplayinline-block%E7%9A%84%E5%88%97%E8%A1%A8%E5%B8%83%E5%B1%80/" rel="nofollow noreferrer" target="_blank">拜拜了,浮动布局-基于display:inline-block的列表布局</a><br><a href="https://www.w3.org/TR/html401/struct/text.html#h-9.1" rel="nofollow noreferrer" target="_blank">9.1 White space</a><br><a href="https://www.w3.org/TR/html401/struct/text.html#h-9.3.2" rel="nofollow noreferrer" target="_blank">9.3.2 Controlling line breaks</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂："那不是bug，是你不懂我!" by inline-block

## 原文链接
[https://segmentfault.com/a/1190000004964365](https://segmentfault.com/a/1190000004964365)

