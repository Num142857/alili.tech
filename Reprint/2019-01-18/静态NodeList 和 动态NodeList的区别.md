---
title: '静态NodeList 和 动态NodeList的区别' 
date: 2019-01-18 2:30:34
hidden: true
slug: ers7zehlnzu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ps：了解这个知识点的原因</h2>
<p>前两天我在重温js dom编程的时候，看到了获取dom元素这一章，然后看到了getElementsByTagName()和getElementsByClassName()，之后又了解到了现代浏览器新出的一个DOM API--querySelectorAll().以我的性格，看到这些方法之后我肯定是想了解一下它们的不同点啦，所以我就翻阅资料，就看到了stackoverflow上面的一个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var temp = document.querySelectorAll(&quot;.class&quot;);
for (var i=0, max=temp.length; i<max; i++) { 
     temp[i].className = &quot;new_class&quot;;
}

var temp = document.getElementsByClassName(&quot;class&quot;);
for (var i=0, max=temp.length; i<max; i++) { 
     temp[i].className = &quot;new_class&quot;;
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> temp = document.querySelectorAll(<span class="hljs-string">".class"</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>, <span class="hljs-built_in">max</span>=temp.<span class="hljs-built_in">length</span>; i&lt;<span class="hljs-built_in">max</span>; i++) { 
     temp[i].className = <span class="hljs-string">"new_class"</span>;
}

<span class="hljs-built_in">var</span> temp = document.getElementsByClassName(<span class="hljs-string">"class"</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>, <span class="hljs-built_in">max</span>=temp.<span class="hljs-built_in">length</span>; i&lt;<span class="hljs-built_in">max</span>; i++) { 
     temp[i].className = <span class="hljs-string">"new_class"</span>;
} </code></pre>
<p>运行上述这两段代码，假如获取到的temp的长度都为3，那么第一段代码能将三个元素的className全部更改为new_class"，而第二段代码只能讲第一个元素和第三个元素的className更改为"new_class".这里面的原因就是动态nodelist和静态nodelist的区别。<br>然后我又翻阅资料查找什么是动态nodelist，什么是静态nodelist。于是乎，就有了下面的长篇大论。</p>
<h2 id="articleHeader1">说说NodeList,HTMLCollection以及NamedNodeMap</h2>
<p>在不同版本的浏览器中，如果调用获取多元素的DOM方法（getElement...()），有的会得到NodeList（多为旧浏览器），有的会得到HTMLCollection（多为新浏览器）。使用Node Interface的方法，如childNodes，得到的通常是NodeList，而使用其他Interface的方法，又有可能得到HTMLCollection。而NamedNodeMap又和前面两者返回的东西类型也不相同，所以有必要了解一下这三者的区别。</p>
<p><strong>1. 三者的相同点</strong></p>
<blockquote>
<p>1.1 三者都具有length属性</p>
<p>1.2 三者都有item()方法</p>
<p>1.3 三个集合都是"动态的"，如果对NodeList和HTMLCollection中的元素进行操作都会直接反映到DOM中，因此如果一次性直接在集合中进行DOM操作的话，开销非常大。(这会在讲解动态的时候详细解释)</p>
</blockquote>
<p><strong>2. 三者的不同点</strong></p>
<blockquote>
<p>2.1 nodeList里面包含了所有的节点类型，比如元素节点，文本节点等</p>
<p>2.2 HTMLCollection里面只包含元素节点</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <!-- Comment -->
    <p>This is Some Text</p>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Comment --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is Some Text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>上面这段代码，如果作为NodeList返回，那么浏览器最多会给这个列表5个元素</strong></p>
<blockquote>
<p>1.一个<code>&lt;div&gt;</code>和注释间的断行和空格（或tab）作为text node（没错，标签之间的空白符号也可以被解析为text node</p>
<p>2.注释作为comment node</p>
<p>3.注释和<code>&lt;p&gt;</code>之间的断行和空格（或tab）作为text node,p作为element</p>
<p>4.<code>&lt;/p&gt;</code>和<code>&lt;/div&gt;</code>之间的断行和空格（或tab）作为text node</p>
</blockquote>
<p><strong>但是如果是作为HTMLCollection返回的话，那么就一个<code>&lt;p&gt;</code>元素这么简单</strong></p>
<blockquote>
<p>2.3 NamedNodeMap里面包含了"Attribute"的集合，例如id，title，name等，集合中的每一个元素都是attr类型。</p>
<p>2.4 三个集合所提供的方法也不相同，例如HTMLCollection中提供了namedItem(),而其它两个集合就没有提供这个方法</p>
</blockquote>
<p>扩展点：</p>
<ol>
<li><p>item和namedItem都可以通过[]的缩写进行调用，有的浏览器还支持用()的缩写进行调用（也就是可以list[index]，list[key]或者list(index)，list(key)），以及直接用dot notation调用namedItem（比如list.key）</p></li>
<li><p>IE8及以下版本浏览器中，注释属于HTMLCommentElement,算作Element,因此会出现在HTMLCollection里</p></li>
<li><p>我们可以用alert/console.log(document.getElement...)打印出来看下返回的是什么类型的集合，下面这个链接中讲的也算详细，可以参考下：<a href="http://www.jb51.net/article/25747.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/2...</a></p></li>
</ol>
<p>ps:以上知识点参考链接：</p>
<p><a href="http://www.cnblogs.com/joyeecheung/p/4067927.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/joyeec...</a>,<br><a href="http://stackoverflow.com/questions/15763358/difference-between-htmlcollection-nodelists-and-arrays-of-objects" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/ques...</a>,<br><a href="http://stackoverflow.com/questions/26047844/getelementsbyclassname-vs-queryselectorall" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/ques...</a></p>
<h2 id="articleHeader2">说了这么多，那么到底什么是动态NodeList?什么是静态NodeList呢？它们之间有什么区别？</h2>
<h3 id="articleHeader3">动态NodeList</h3>
<p>上面我们说到NodeList,HTMLCollection以及NamedNodeMap都是动态的。也就是说，对底层文档结构的修改会动态地反映到相关的结合NodeList,HTMLCollection以及NamedNodeMap中。例如：如果先获取了某个元素的子元素的动态集合NodeList对象，然后又在其他地方对这个元素进行操作(添加，修改，删除子元素等操作)，这些更改将自动反射到NodeList中，不需要手动进行操作。</p>
<p>因为getElementsByTagName(所有getElement...方法都会返回动态NodeList)方法返回的是一个动态集合，所以只要document发生变化，就会自动更新对应的元素。因此，下面的代码是一个死循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divs = document.getElementsByTagName(&quot;div&quot;);
var i=0;
while(i < divs.length){
  document.body.appendChild(document.createElement(&quot;div&quot;));
  i++;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> divs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span>(i &lt; divs.length){
  <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>));
  i++;
}</code></pre>
<p>死循环的原因是每次循环都会重新计算divs.length.每次迭代都会添加一个新的<code>&lt;div&gt;</code>,所以每次i++，对应的divs.length也在增加，所以i永远比divs.length小，循环终止条件也就永远不会触发。</p>
<p>解决上述代码死循环的办法可以是用一个变量存储divs.length或者改用querySelectorAll()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divs = document.getElementsByTagName(&quot;div&quot;);
var i=0,len = divs.length;
while(i < len){
    document.body.appendChild(document.createElement(&quot;div&quot;));
    i++;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> divs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"div"</span>);
<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len = divs.length;
<span class="hljs-keyword">while</span>(i &lt; len){
    <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>));
    i++;
}</code></pre>
<p>你可能会觉得这种动态集合是个坏主意, 但通过动态集合可以保证某些使用非常普遍的对象在各种情况下都是同一个,而且动态NodeList比静态NodeList快很多很多(下面解释原因)</p>
<h3 id="articleHeader4">静态NodeList</h3>
<p>querySelectorAll()和querySelector()方法返回的是一个静态的NodeList,所谓静态NodeList就是对底层document的更改不会影响到返回的这个NodeList对象.此时返回的NodeList只是querySelectorAll()方法被调用时的文档状态的快照。所以下面的代码不会是死循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var divs = document.querySelectorAll(&quot;div&quot;);
var i=0;
while(i < divs.length){
    document.body.appendChild(document.createElement(&quot;div&quot;));
    i++;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> divs = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">"div"</span>);
<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span>(i &lt; divs.length){
    <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>));
    i++;
}</code></pre>
<p>在这种情况下没有死循环, divs.length的值永远不会改变, 所以只要不满足循环条件, 就退出循环。</p>
<h2 id="articleHeader5">为什么动态NodeList更快呢？</h2>
<p>我在某篇文章中看到有人测试了一下getElementsByTagName()比querySelectorAll()快好多倍。</p>
<p>原因是：动态NodeList对象在浏览器中可以更快地被创建并返回，因为他们不需要预先获取所有的信息，而静态NodeList对象从一开始就需要取得并封装所有相关的数据。两种对象类型的创建方式是完全不同的。</p>
<p>DynamicNodeList(动态NodeList)对象通过在cache缓存中注册它的存在并创建。从本质上讲，创建一个新的DynamicNodeList是非常轻量级的，因为不需要做任何的前期工作。每次访问 DynamicNodeList 时, 必须查询 document 的变化, length 属性 以及 item() 方法证明了这一点</p>
<p>相比之下，StaticNodeList对象实例由另外一个文件创建，然后循环填充所有的数据。在document中执行静态查询的前期成本相比DynamicNodeList要显著提高很多倍。</p>
<p>如果真正的查看WebKit的源码,你会发现他为 querySelectorAll() 明确地 创建一个返回对象 ,在其中又使用一个循环来获取每一个结果,并创建最终返回的一个 NodeList.</p>
<h2 id="articleHeader6">结论</h2>
<p>getElementsTagName()方法速度比querySelectorAll()方法快的根本原因在于动态NodeList和静态NodeList对象不同。在获取NodeList时不需要执行很多前期处理操作的动态列表总比获取返回之前完成各种处理的静态NodeList要快很多。哪个方法更好用还是看你的需求。如果不需要获取快照，就使用getElement...方法；如果需要静态快照结果，或者需要使用更复杂的css查询，则可以考虑querySelectAll()方法</p>
<h2 id="articleHeader7">对开头题目讲解</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**通过querySelectorAll()获取到的元素集合temp是静态的快照，所以temp长度不会变化，max始终为3，所以通过for循环3个对应元素的class名字都被改成&quot;new_class&quot;**/
var temp = document.querySelectorAll(&quot;.class&quot;);
for (var i=0, max=temp.length; i<max; i++) { 
     temp[i].className = &quot;new_class&quot;;
}
/**通过getElementsByClassName()获取到的元素集合temp是动态的，所以我们对元素任何的更改都会直接反映到对应的NodeList中；
刚开始temp长度为3，也就是max为3，这里i=0的时候，更改了temp[0]的className为&quot;new_class&quot;，所以temp的长度马上发生变化，max变为2；
继续循环，i=1的时候，temp[1]实际上是没变化前的temp[2]。此时又更改了temp[1]的className为&quot;new_class&quot;，所以temp的长度又发生变化，max变为1；
继续循环，i=2的时候，不满足条件，循环结束；
所以temp[0],temp[2]的className都变为&quot;new_class&quot;，而temp[1]没改变**/
var temp = document.getElementsByClassName(&quot;class&quot;);
for (var i=0, max=temp.length; i<max; i++) { 
     temp[i].className = &quot;new_class&quot;;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>/**通过querySelectorAll()获取到的元素集合temp是静态的快照，所以temp长度不会变化，<span class="hljs-built_in">max</span>始终为<span class="hljs-number">3</span>，所以通过for循环<span class="hljs-number">3</span>个对应元素的class名字都被改成<span class="hljs-string">"new_class"</span>**/
<span class="hljs-built_in">var</span> temp = document.querySelectorAll(<span class="hljs-string">".class"</span>);
for (<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>, <span class="hljs-built_in">max</span>=temp.length; i&lt;<span class="hljs-built_in">max</span>; i++) { 
     temp[i].className = <span class="hljs-string">"new_class"</span>;
}
/**通过getElementsByClassName()获取到的元素集合temp是动态的，所以我们对元素任何的更改都会直接反映到对应的NodeList中；
刚开始temp长度为<span class="hljs-number">3</span>，也就是<span class="hljs-built_in">max</span>为<span class="hljs-number">3</span>，这里i=<span class="hljs-number">0</span>的时候，更改了temp[<span class="hljs-number">0</span>]的className为<span class="hljs-string">"new_class"</span>，所以temp的长度马上发生变化，<span class="hljs-built_in">max</span>变为<span class="hljs-number">2</span>；
继续循环，i=<span class="hljs-number">1</span>的时候，temp[<span class="hljs-number">1</span>]实际上是没变化前的temp[<span class="hljs-number">2</span>]。此时又更改了temp[<span class="hljs-number">1</span>]的className为<span class="hljs-string">"new_class"</span>，所以temp的长度又发生变化，<span class="hljs-built_in">max</span>变为<span class="hljs-number">1</span>；
继续循环，i=<span class="hljs-number">2</span>的时候，不满足条件，循环结束；
所以temp[<span class="hljs-number">0</span>],temp[<span class="hljs-number">2</span>]的className都变为<span class="hljs-string">"new_class"</span>，而temp[<span class="hljs-number">1</span>]没改变**/
<span class="hljs-built_in">var</span> temp = document.getElementsByClassName(<span class="hljs-string">"class"</span>);
for (<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>, <span class="hljs-built_in">max</span>=temp.length; i&lt;<span class="hljs-built_in">max</span>; i++) { 
     temp[i].className = <span class="hljs-string">"new_class"</span>;
} 
</code></pre>
<p>参考资料链接：</p>
<p><a href="https://github.com/cncounter/translation/blob/master/tiemao_2014/NodeList/NodeList.md" rel="nofollow noreferrer" target="_blank">https://github.com/cncounter/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
静态NodeList 和 动态NodeList的区别

## 原文链接
[https://segmentfault.com/a/1190000008829267](https://segmentfault.com/a/1190000008829267)

