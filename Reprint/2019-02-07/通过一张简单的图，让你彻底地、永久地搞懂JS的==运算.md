---
title: '通过一张简单的图，让你彻底地、永久地搞懂JS的==运算' 
date: 2019-02-07 2:30:15
hidden: true
slug: 0cmme76hvn4m
categories: [reprint]
---

{{< raw >}}

                    
<p>大家知道，==是JavaScript中比较复杂的一个运算符。它的运算规则奇怪，容易让人犯错，从而成为JavaScript中“最糟糕的特性”之一。</p>
<p>在仔细阅读了ECMAScript规范的基础上，我画了一张图，我想通过它你会彻底地搞清楚关于==的一切。同时，我也试图通过此文向大家证明==并不是那么糟糕的东西，它很容易掌握，甚至看起来很合理。</p>
<p>先上图：</p>
<p><span class="img-wrap"><img data-src="/img/bVziDK" src="https://static.alili.tech/img/bVziDK" alt="==运算符的运算规则" title="==运算符的运算规则" style="cursor: pointer; display: inline;"></span><br><strong>图1</strong> ==运算规则的图形化表示</p>
<p><code>==</code>运算规则的精确描述在此：<a href="http://es5.github.io/#x11.9.3" rel="nofollow noreferrer" target="_blank">The Abstract Equality Comparison Algorithm</a>。但是，这么复杂的描述，你确定看完后脑子不晕？确定立马就能拿它指导实践？</p>
<p>肯定不行，规范毕竟是给JavaScript运行环境的开发人员看的(比如V8引擎的开发人员们)，而不是给语言的使用者看的。而上图正是将规范中复杂的描述翻译成了更容易看懂的形式。</p>
<p>在详细介绍图1中的每个部分前，我们来复习一下JS中关于类型的知识：</p>
<ol>
<li><p>JS中的值有两种类型：原始类型(Primitive)、对象类型(Object)。</p></li>
<li><p>基本类型包括：Undefined、Null、Boolean、Number和String等五种。</p></li>
<li><p>Undefined类型和Null类型的都只有一个值，即<code>undefined</code>和<code>null</code>；Boolean类型有两个值：<code>true</code>和<code>false</code>；Number类型的值有很多很多；String类型的值理论上有无数个。</p></li>
<li><p>所有对象都有<code>valueOf()</code>和<code>toString()</code>方法，它们继承自<code>Object</code>，当然也可能被子类重写。</p></li>
</ol>
<p>现在考虑表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x == y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">x == y</code></pre>
<p>其中<code>x</code>和<code>y</code>是上述六种类型中某一种类型的值。</p>
<p>当<code>x</code>和<code>y</code>的类型相同时，<code>x == y</code>可以转化为<code>x === y</code>，而后者是很简单的(唯一需要注意的可能是<code>NaN</code>)，所以下面我们只考虑<code>x</code>和<code>y</code>的类型不同的情况。</p>
<h2 id="articleHeader0">一. 有和无</h2>
<p>在图1中，JavaScript值的六种类型用蓝底色的矩形表示。它们首先被分成了两组：</p>
<ul>
<li><p>String、Number、Boolean和Object (对应左侧的大矩形框)</p></li>
<li><p>Undefined和Null (对应右侧的矩形框)</p></li>
</ul>
<p>分组的依据是什么？我们来看一下，右侧的Undefined和Null是用来表示<strong>不确定</strong>、<strong>无</strong>或者<strong>空</strong>的，而右侧的四种类型都是<strong>确定的</strong>、<strong>有</strong>和<strong>非空</strong>。我们可以这样说：</p>
<blockquote><p>左侧是一个<strong>存在</strong>的世界，右侧是一个<strong>空</strong>的世界。</p></blockquote>
<p>所以，左右两个世界中的任意值做==比较的结果都是<code>false</code>是很合理的。(见图1中连接两个矩形的水平线上标的false)</p>
<h2 id="articleHeader1">二. 空和空</h2>
<p>JavaScript中的<code>undefined</code>和<code>null</code>是另一个经常让我们崩溃的地方。通常它被认为是一个设计缺陷，这一点我们不去深究。不过我曾听说，JavaScript的作者最初是这样想的：</p>
<blockquote><p>假如你打算把一个变量赋予对象类型的值，但是现在还没有赋值，那么你可以用<code>null</code>表示此时的状态(证据之一就是<code>typeof null </code>的结果是<code>'object'</code>)；相反，假如你打算把一个变量赋予原始类型的值，但是现在还没有赋值，那么你可以用<code>undefined</code>表示此时的状态。</p></blockquote>
<p>不管这个传闻是否可信，它们两者做==比较的结果是<code>true</code>是很合理的。(见图1中右侧垂直线上标的true)</p>
<p>在进行下一步之前，我们先来说一下图1中的两个符号：大写字母N和P。这两个符号并不是PN结中正和负的意思。而是：</p>
<ul>
<li><p>N表示ToNumber操作，即将操作数转为数字。它是规范中的抽象操作，但我们可以用JS中的<code>Number()</code>函数来等价替代。</p></li>
<li><p>P表示ToPrimitive操作，即将操作数转为原始类型的值。它也是规范中的抽象操作，同样也可以翻译成等价的JS代码。不过稍微复杂一些，简单说来，对于一个对象<code>obj</code>：</p></li>
</ul>
<blockquote><p>ToPrimitive(obj)等价于：先计算<code>obj.valueOf()</code>，如果结果为原始值，则返回此结果；否则，计算<code>obj.toString()</code>，如果结果是原始值，则返回此结果；否则，抛出异常。</p></blockquote>
<p>注：此处有个例外，即<code>Date</code>类型的对象，它会先调用<code>toString()</code>方法，后调用<code>valueOf()</code>方法。</p>
<p>在图1中，标有N或P的线表示：当它连接的两种类型的数据做==运算时，标有N或P的那一边的操作数要先执行ToNumber或ToPrimitive变换。</p>
<h2 id="articleHeader2">三. 真与假</h2>
<p>从图1可以看出，当布尔值与其他类型的值作比较时，布尔值会转化为数字，具体来说</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="true -> 1
false -> 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-keyword">true</span> -&gt; <span class="hljs-number">1</span>
<span class="hljs-keyword">false</span> -&gt; <span class="hljs-number">0</span></code></pre>
<p>这一点也不需浪费过多口舌。想一下在C语言中，根本没有布尔类型，通常用来表示逻辑真假的正是整数1和0。</p>
<h2 id="articleHeader3">四. 字符的序列</h2>
<p>在图1中，我们把String和Number类型分成了一组。为什么呢？在六种类型中，String和Number都是<strong>字符的序列</strong>(至少在字面上如此)。字符串是所有合法的字符的序列，而数字可以看成是符合特定条件的字符的序列。所以，数字可以看成字符串的一个子集。</p>
<p>根据图1，在字符串和数字做==运算时，需要使用ToNumber操作，把字符串转化为数字。假设x是字符串，y是数字，那么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x == y -> Number(x) == y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">x</span> == y -&gt; Number(x) == y</code></pre>
<p>那么字符串转化为数字的规则是怎样的呢？规范中描述得很复杂，但是大致说来，就是把字符串两边的空白字符去掉，然后把两边的引号去掉，看它能否组成一个合法的数字。如果是，转化结果就是这个数字；否则，结果是<code>NaN</code>。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number('123') // 结果123
Number('1.2e3') // 结果1200
Number('123abc') // 结果NaN
Number('\r\n\t123\v\f') // 结果123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Number</span>(<span class="hljs-string">'123'</span>) <span class="hljs-comment">// 结果123</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">'1.2e3'</span>) <span class="hljs-comment">// 结果1200</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">'123abc'</span>) <span class="hljs-comment">// 结果NaN</span>
<span class="hljs-built_in">Number</span>(<span class="hljs-string">'\r\n\t123\v\f'</span>) <span class="hljs-comment">// 结果123</span></code></pre>
<p>当然也有例外，比如空白字符串转化为数字的结果是<code>0</code>。即</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number('') // 结果0
Number('\r\n\t \v\f') // 结果0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">''</span>)</span></span> <span class="hljs-comment">// 结果0</span>
<span class="hljs-function"><span class="hljs-title">Number</span><span class="hljs-params">(<span class="hljs-string">'\r\n\t \v\f'</span>)</span></span> <span class="hljs-comment">// 结果0</span></code></pre>
<h2 id="articleHeader4">五. 单纯与复杂</h2>
<p>原始类型是一种单纯的类型，它们直接了当、容易理解。然而缺点是表达能力有限，难以扩展，所以就有了对象。对象是属性的集合，而属性本身又可以是对象。所以对象可以被构造得任意复杂，足以表示各种各样的事物。</p>
<p>但是，有时候事情复杂了也不是好事。比如一篇冗长的论文，并不是每个人都有时间、有耐心或有必要从头到尾读一遍，通常只了解其中心思想就够了。于是论文就有了关键字、概述。JavaScript中的对象也一样，我们需要有一种手段了解它的主要特征，于是对象就有了<code>toString()</code>和<code>valueOf()</code>方法。</p>
<blockquote><p><code>toString()</code>方法用来得到对象的一段文字描述；而<code>valueOf()</code>方法用来得到对象的特征值。</p></blockquote>
<p>当然，这只是我自己的理解。顾名思义，<code>toString()</code>方法倾向于返回一个字符串。那么<code>valueOf()</code>方法呢？根据<a href="http://es5.github.io/#x9.1" rel="nofollow noreferrer" target="_blank">规范中的描述</a>，它倾向于返回一个数字——尽管内置类型中，<code>valueOf()</code>方法返回数字的只有<code>Number</code>和<code>Date</code>。</p>
<p>根据图1，当一个对象与一个非对象比较时，需要将对象转化为原始类型(虽然与布尔类型比较时，需要先将布尔类型变成数字类型，但是接下来还是要将对象类型变成原始类型)。这也是合理的，毕竟==是不严格的相等比较，我们只需要取出对象的主要特征来参与运算，次要特征放在一边就行了。</p>
<h2 id="articleHeader5">六. 万物皆数</h2>
<p>我们回过头来看一下图1。里面标有N或P的那几条连线是没有方向的。假如我们在这些线上标上箭头，使得连线从标有N或P的那一端指向另一端，那么会得到(不考虑undefined和null)：</p>
<p><span class="img-wrap"><img data-src="/img/bVzoju" src="https://static.alili.tech/img/bVzoju" alt="==运算符的运算规则" title="==运算符的运算规则" style="cursor: pointer; display: inline;"></span><br><strong>图2</strong> ==运算过程中类型转化的趋势</p>
<p>发现什么了吗？对，在运算过程中，所有类型的值都有一种向数字类型转化的趋势。毕竟曾经有名人说过：</p>
<blockquote><p>万物皆数。</p></blockquote>
<h2 id="articleHeader6">七. 举个栗子</h2>
<p>前面废话太多了，这里还是举个例子，来证明图1确实是方便有效可以指导实践的。</p>
<p>例，计算下面表达式的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[''] == false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">''</span>] == <span class="hljs-literal">false</span></code></pre>
<p>首先，两个操作数分别是对象类型、布尔类型。根据图1，需要将布尔类型转为数字类型，而<code>false</code>转为数字的结果是0，所以表达式变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[''] == 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">''</span>] == <span class="hljs-number">0</span></code></pre>
<p>两个操作数变成了对象类型、数字类型。根据图1，需要将对象类型转为原始类型：</p>
<ul>
<li><p>首先调用<code>[].valueOf()</code>，由于数组的<code>valueOf()</code>方法返回自身，所以结果不是原始类型，继续调用<code>[].toString()</code>。</p></li>
<li><p>对于数组来说，<code>toString()</code>方法的算法，是将每个元素都转为字符串类型，然后用逗号','依次连接起来，所以最终结果是空字符串''，它是一个原始类型的值。</p></li>
</ul>
<p>此时，表达式变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'' == 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">''</span> == <span class="hljs-number">0</span></code></pre>
<p>两个操作数变成了字符串类型、数字类型。根据图1，需要将字符串类型转为数字类型，前面说了空字符串变成数字是0。于是表达式变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 == 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">0 </span>== <span class="hljs-number">0</span></code></pre>
<p>到此为止，两个操作数的类型终于相同了，结果明显是<code>true</code>。</p>
<p>从这个例子可以看出，要想掌握==运算的规则，除了牢记图1外，还需要记住那些内置对象的<code>toString()</code>和<code>valueOf()</code>方法的规则。包括Object、Array、Date、Number、String、Boolean等，幸好这没有什么难度。</p>
<h2 id="articleHeader7">八. 再次变形</h2>
<p>其实，图一还不够完美。为什么呢？因为对象与字符串/数字比较时都由对象来转型，但是与同样是原始类型的布尔类型比较时却需要布尔类型转型。实际上，只要稍稍分析一下，全部让对象来转为原始类型也是等价的。所以我们得到了最终的更加完美的图形：</p>
<p><span class="img-wrap"><img data-src="/img/bVzrtW" src="https://static.alili.tech/img/bVzrtW" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><strong>图3</strong> 更完美的==运算规则的图形化表示</p>
<p>有一个地方可能让你疑惑：为什么Boolean与String之间标了两个N？虽然按照规则应该是由Boolean转为数字，但是下一步String就要转为数字了，所以干脆不如两边同时转成数字。</p>
<h2 id="articleHeader8">九. 总结一下</h2>
<p>前面说得很乱，根据我们得到的最终的图3，我们总结一下==运算的规则：</p>
<ul>
<li><p><strong>undefined == null</strong>，结果是<code>true</code>。且它俩与所有其他值比较的结果都是<code>false</code>。</p></li>
<li><p><strong>String == Boolean</strong>，需要两个操作数同时转为Number。</p></li>
<li><p><strong>String/Boolean == Number</strong>，需要String/Boolean转为Number。</p></li>
<li><p><strong>Object == Primitive</strong>，需要Object转为Primitive(具体通过valueOf和toString方法)。</p></li>
</ul>
<p>瞧见没有，一共只有4条规则！是不是很清晰、很简单。</p>
<p>PS：最后，把图改了一下，仅供娱乐 : )</p>
<p><span class="img-wrap"><img data-src="/img/bVzrBr" src="https://static.alili.tech/img/bVzrBr" alt="" title="" style="cursor: pointer;"></span></p>
<p>OK，结束了。如果你觉得这篇文章对你有用，请<strong>点赞</strong>，让更多的人看到。<br>另外，文章中的谬误，请不吝指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过一张简单的图，让你彻底地、永久地搞懂JS的==运算

## 原文链接
[https://segmentfault.com/a/1190000006012804](https://segmentfault.com/a/1190000006012804)

