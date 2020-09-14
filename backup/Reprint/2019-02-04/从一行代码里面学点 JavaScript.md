---
title: '从一行代码里面学点 JavaScript' 
date: 2019-02-04 2:30:58
hidden: true
slug: gk3jt7wb26h
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>摘要</strong>：从一行代码里面学点JavaScript，现如今，JavaScript无处不在，因此关于JavaScript的新知识也是层出不穷。JavaScript的特点在于，要学习它的语法入门简简单，但是要精通使用它的方式却是一件不容易的事。</p>
<p>现如今，JavaScript无处不在，因此关于JavaScript的新知识也是层出不穷。JavaScript的特点在于，要学习它的语法入门简简单，但是要精通使用它的方式却是一件不容易的事。</p>
<p>来看看下面的这段代码，它来自于谷歌“名猿”Addy Osmani在几天前贴出的一段代码，它的作用是用来调试你的CSS层。全部代码只有三行，但是你绝对可以把它放在一行里面完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].forEach.call($$(&quot;*&quot;),function(a){

  a.style.outline=&quot;1px solid #&quot;+(~~(Math.random()*(1<<24))).toString(16)

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>[]<span class="hljs-selector-class">.forEach</span><span class="hljs-selector-class">.call</span>($$(<span class="hljs-string">"*"</span>),function(a){

  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.outline</span>=<span class="hljs-string">"1px solid #"</span>+(~~(Math.random()*(<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>))).toString(<span class="hljs-number">16</span>)

})
</code></pre>
<p>现在，在你的Chrome浏览器的控制台中输入这段代码，你会发现不同HTML层都被使用不同的颜色添加了一个高亮的边框。是不是非常酷？但是，简单来说，这段代码只是首先获取了所有的页面元素，然后使用一个不同的颜色为它们添加了一个1ps的边框。想法很简单，但是真要实现起来却不是那么容易的一件事。在下面的内容中，我们将一起一步一步学习如何理解上面的这段代码。</p>
<h3 id="articleHeader0">选择页面中所有的元素</h3>
<p>我们需要做的第一件事情是获取页面中所有的元素，在上面的代码中，Addy使用了一个Chrome浏览器中特有的函数 <code>$$</code>。你可以在你的Chrome浏览器控制台中输入 <code>$$('a')</code>，然后你就能得到一个当前页面中所有锚元素的列表。</p>
<p><code>$$</code>函数是许多现代浏览器命令行API中的一个部分，它等价于 <code>document.querySelectorAll</code>，你可以将一个CSS选择器作为这个函数的参数，然后你就能够获得当前页面中所有匹配这个CSS选择器的元素列表。如果你在浏览器控制台以外的地方，你可以使用 <code>document.querySelectorAll('*')</code> 来代替 <code>$$('*')</code>。更多关于 <code>$$</code> 函数的详细内容可以查看Chrome开发者工具的文档。</p>
<p>当然，除了使用<code>$$</code>函数之外，我们还有一种更简单的方法，document.all，虽然这并不是一种很规范的使用方法，但是它几乎在每一个浏览器中都能运行成功。</p>
<h3 id="articleHeader1">迭代所有的元素</h3>
<p>经过第一步，我们已经获得了页面内所有的元素，现在我们想做的事情是遍历每一个元素，然后为它们添加一个彩色边边框。但是上面的代码究竟是怎么一回事呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[].forEach.call( $$('*'), function( element ) { /* 在这里修改颜色 */ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">[].forEach.call( $$(<span class="hljs-string">'*'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> element </span>) </span>{ <span class="hljs-comment">/* 在这里修改颜色 */</span> });</code></pre>
<p>首先，我们通过选择器获得的列表是一个NodeLists对象，它和JavaScript中的数组有点像，你可以使用方括号来获取其中的节点，你也可以检查它其中包含多少个元素，但是它并没有实现数组包含的所有方法，因此我们并不能使用<code>$$('*').forEach()</code>来进行迭代。在JavaScript中，有好几个类似于数组但是并不是数组的对象，除了前面的NodeLists，还有函数的参数集合arguments，在这里我们可以使用call或apply函数将函数的方法运用到这些对象上。例如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function say(name) {

 console.log( this + ' ' + name );

}

say.call( 'hola', 'Mike' ); // 打印 'hola Mike'

// 你也可以将这种方法有用在arguments对象上 function example( arg1, arg2, arg3 ) { return Array.prototype.slice.call(arguments, 1); // Returns [arg2, arg3] }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(name) {

 console.log( this + ' ' + name );

}

say.call( <span class="hljs-symbol">'hola</span>', <span class="hljs-symbol">'Mike</span>' ); // 打印 <span class="hljs-symbol">'hola</span> Mike'

// 你也可以将这种方法有用在arguments对象上 <span class="hljs-keyword">function</span> <span class="hljs-title">example</span>( arg1, arg2, arg3 ) { <span class="hljs-keyword">return</span> <span class="hljs-type">Array.prototype.slice.call(arguments,</span> <span class="hljs-number">1</span>); // Returns [arg2, arg3] }
</code></pre>
<p>在Addy的代码中，使用了[].forEach.call而不是Array.prototype.forEach.call，二者等价，但是前者可以节省几个字节。</p>
<h3 id="articleHeader2">为元素添加颜色</h3>
<p>为了让元素都有一个漂亮的边框，我们在上面的代码中使用了CSS属性outline。outline属性位于CSS盒模型之外，因此它并不影响元素的属性或者元素在布局中的位置，这对于我们来说非常有用。这个属性和修改border属性非常类似，因此下面的代码应该不会很难理解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.style.outline=&quot;1px solid #&quot; + color
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.outline</span>=<span class="hljs-string">"1px solid #"</span> + <span class="hljs-attribute">color</span>
</code></pre>
<p>真正有趣的地方在于定义颜色部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~~(Math.random()*(1<<24))).toString(16)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>~~(Math.random()*(<span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">24</span>))).toString(<span class="hljs-number">16</span>)
</code></pre>
<p>天呐，上面的代码是什么意思？在JavaScript中，比特操作符并不是经常被使用，因此这里可能会让很多程序员感到很疑惑。</p>
<p>我们想达到的目的是活的一个十六进制格式的颜色例如白色对应的是FFFFFF，蓝色对应的是0000FF，或者随便一个颜色37f9ac。虽然我们人类喜欢十进制，但是我们的代码常常会需要十六进制的东西。</p>
<p>我们首先要学会如何使用toString函数将一个十进制的数组转换为一个十六进制整数。这个函数可以接受一个参数，如果参数缺省，默认为十进制，但是你完全可以使用别的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(30).toString(); // &quot;30&quot;

(30).toString(10); // &quot;30&quot;

(30).toString(16); // &quot;1e&quot; 十六进制

(30).toString(2); // &quot;11110&quot; 二进制

(30).toString(36); // &quot;u&quot; 36是允许的最大参数值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">30</span>).toString(); <span class="hljs-comment">// "30"</span>

(<span class="hljs-number">30</span>).toString(<span class="hljs-number">10</span>); <span class="hljs-comment">// "30"</span>

(<span class="hljs-number">30</span>).toString(<span class="hljs-number">16</span>); <span class="hljs-comment">// "1e" 十六进制</span>

(<span class="hljs-number">30</span>).toString(<span class="hljs-number">2</span>); <span class="hljs-comment">// "11110" 二进制</span>

(<span class="hljs-number">30</span>).toString(<span class="hljs-number">36</span>); <span class="hljs-comment">// "u" 36是允许的最大参数值</span>
</code></pre>
<p>除此之外，你可以使用parseInt函数将十六进制数字转换为十进制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt(&quot;30&quot;); // &quot;30&quot;

parseInt(&quot;30&quot;, 10); // &quot;30&quot;

parseInt(&quot;1e&quot;, 16); // &quot;30&quot;

parseInt(&quot;11110&quot;, 2); // &quot;30&quot;

parseInt(&quot;u&quot;, 36); // &quot;30&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"30"</span>); <span class="hljs-comment">// "30"</span>

<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"30"</span>, <span class="hljs-number">10</span>); <span class="hljs-comment">// "30"</span>

<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"1e"</span>, <span class="hljs-number">16</span>); <span class="hljs-comment">// "30"</span>

<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"11110"</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// "30"</span>

<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"u"</span>, <span class="hljs-number">36</span>); <span class="hljs-comment">// "30"</span>
</code></pre>
<p>因此，我们现在只需要一个位于0和ffffff之间的十六进制数，由于:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt(&quot;ffffff&quot;, 16) == 16777215
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">parseInt</span><span class="hljs-params">(<span class="hljs-string">"ffffff"</span>, <span class="hljs-number">16</span>)</span></span> == <span class="hljs-number">16777215</span>
</code></pre>
<p>而这里的16777215实际上是2^24-1。</p>
<p>如果你对二进制数学熟悉的话，你可能会知道1&lt;&lt;24 == 16777216。</p>
<p>再进一步，你每在1后面添加一个0，你就相当于多做了一次2的乘方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 // 1 == 2^0

100 // 4 == 2^2

10000 // 16 == 2^4

1000000000000000000000000 // 16777216 == 2^24
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>// <span class="hljs-number">1</span> == <span class="hljs-number">2</span>^<span class="hljs-number">0</span>

<span class="hljs-symbol">100 </span>// <span class="hljs-number">4</span> == <span class="hljs-number">2</span>^<span class="hljs-number">2</span>

<span class="hljs-symbol">10000 </span>// <span class="hljs-number">16</span> == <span class="hljs-number">2</span>^<span class="hljs-number">4</span>

<span class="hljs-symbol">1000000000000000000000000 </span>// <span class="hljs-number">16777216</span> == <span class="hljs-number">2</span>^<span class="hljs-number">24</span>
</code></pre>
<p>因此，在这里我们可以知道Math.random()*(1&lt;&lt;24)表示一个位于0和16777216之间的数。</p>
<p>但是这里并没有结束，因为Math.random返回的是一个浮点数，但是我们只想要整数部分。我们的代码中使用波浪号操作符来完成这件事。波浪操作符在JavaScript中被用来对一个变量进行取反。</p>
<p>但是我们在这里并不关心取反，我们指向获取整数部分。因此我们还可以知道两次取反可以去掉一个浮点数的小数部分，因此~~的作用相当于parseInt：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 12.34, // ~~a = 12

    b = -1231.8754, // ~~b = -1231

    c = 3213.000001 // ~~c = 3213

;



~~a == parseInt(a, 10); // true

~~b == parseInt(b, 10); // true

~~c == parseInt(c, 10); // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var a = <span class="hljs-number">12.34</span>, <span class="hljs-comment">// ~~a = 12</span>

    b = <span class="hljs-number">-1231.8754</span>, <span class="hljs-comment">// ~~b = -1231</span>

    c = <span class="hljs-number">3213.000001</span> <span class="hljs-comment">// ~~c = 3213</span>

;



~~a == parseInt(a, <span class="hljs-number">10</span>); <span class="hljs-comment">// true</span>

~~b == parseInt(b, <span class="hljs-number">10</span>); <span class="hljs-comment">// true</span>

~~c == parseInt(c, <span class="hljs-number">10</span>); <span class="hljs-comment">// true</span>
</code></pre>
<p>当然，我们还有一种更加简洁的方法，使用OR操作符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~~a == 0|a == parseInt(a, 10)

~~b == 0|b == parseInt(b, 10)

~~c == 0|c == parseInt(c, 10)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>~~a == <span class="hljs-number">0</span>|a == parseInt(a, <span class="hljs-number">10</span>)

~~b == <span class="hljs-number">0</span>|b == parseInt(b, <span class="hljs-number">10</span>)

~~c == <span class="hljs-number">0</span>|c == parseInt(c, <span class="hljs-number">10</span>)
</code></pre>
<p>最终，我们获得了一个位于0和16777216之间的随机整数，也就是我们想要的随机颜色。此时我们只需要使用toString(16)将它转化为十六进制数即可。</p>
<h3 id="articleHeader3">总结</h3>
<p>现在，你已经完全理解了前面的这一行代码中的各个部分。作为一个程序员，我们应该在完成工作之后多问自己几遍为什么，还有没有更好更简洁的方法。当然，最应该做的事情当然是多阅读程序代码，也许你就能从某一行代码中学到很多新东西。</p>
<blockquote><p>作者：<a href="http://mp.weixin.qq.com/s?__biz=MzI0ODA2ODU2NQ==&amp;mid=2651128098&amp;idx=1&amp;sn=0bb490546b038a514377adcefd97e913&amp;scene=0#wechat_redirect" rel="nofollow noreferrer" target="_blank">野狗</a><br>原文链接：<a href="http://arqex.com/939/learning-much-javascript-one-line-code" rel="nofollow noreferrer" target="_blank">Learning much javascript from one line of code</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一行代码里面学点 JavaScript

## 原文链接
[https://segmentfault.com/a/1190000006860477](https://segmentfault.com/a/1190000006860477)

