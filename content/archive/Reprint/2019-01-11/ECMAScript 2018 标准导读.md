---
title: 'ECMAScript 2018 标准导读' 
date: 2019-01-11 2:30:08
hidden: true
slug: dk6bw496hkf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文是对<a href="https://tc39.github.io/ecma262" rel="nofollow noreferrer" target="_blank">《ECMAScript 2018 Language Specification》</a>的解读。<br>本文是对标准的概述性导读，不是对 ES2018特性的详细描述，也不会针对某个技术点进行详细展开，但是会附上相关文章外链。</p>
<h2 id="articleHeader1">规格介绍</h2>
<p>整个文档有引言+27个章节+7篇附录，大概五六百页的样子。</p>
<p>引言和前面3章部分，都是在讲规格本身，跟JS语言本身无关。内容很少，可以快速过一遍。</p>
<ul>
<li>
<a href="https://tc39.github.io/ecma262/#sec-intro" rel="nofollow noreferrer" target="_blank">Introduction 部分</a> 介绍了语言历史和标准化历程;</li>
<li>前3章 <a href="https://tc39.github.io/ecma262/#sec-scope" rel="nofollow noreferrer" target="_blank">Scope</a>、<a href="https://tc39.github.io/ecma262/#sec-conformance" rel="nofollow noreferrer" target="_blank">Conformance</a>、<a href="https://tc39.github.io/ecma262/#sec-normative-references" rel="nofollow noreferrer" target="_blank">Normative References</a> 主要介绍了文档的范围、一致性和参考文献。所谓一致性，实际上是标准实现的一致性，任何实现ECMAScript 标准的语言，都必须完全实现文档中描述的语法和语义，并且可以有规格之外的自定义程序语法。</li>
</ul>
<h2 id="articleHeader2">语言概述</h2>
<p>第4章 <a href="https://tc39.github.io/ecma262/#sec-overview" rel="nofollow noreferrer" target="_blank">Overview</a> 是对语言的整体介绍。涵盖了Web脚本语言环境、ES基本概念和专业术语，以及<a href="https://tc39.github.io/ecma262/#sec-strict-variant-of-ecmascript" rel="nofollow noreferrer" target="_blank">严格模式</a>的简单介绍。这里跟大家分享几个有意思的点。</p>
<h4>奇葩的面向对象机制</h4>
<blockquote>ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment. <br>ES是一门面向对象的语言，这是官方描述！(<code>这有什么奇怪的啊，大家都知道啊</code>)但是ES的面向对象设计机制却是与众不同，大有学问(<code>这有什么啊，不就原型链嘛</code>)。我们多少都了解一些，但要完全讲清楚，恐怕专门开一篇博客也不够。</blockquote>
<p>但我还是尝试专门写了一篇：<a href="https://zhuanlan.zhihu.com/p/27537508" rel="nofollow noreferrer" target="_blank">《如何优雅的解读JS的面向对象机制》</a>。</p>
<h4>脚本语言的逆袭</h4>
<blockquote>ECMAScript was originally designed to be used as a scripting language, but has become widely used as a general-purpose programming language.</blockquote>
<p>这个就有点屌了，ES最初是被拿来当Web脚本语言用的，但现在已经成了时下最流行的通用编程语言之一。此中缘由大家应该也很清楚，不多说，只是抒发一下感慨：<code>Always bet on JS</code>可不是乱说的。</p>
<h4>有关对象的描述</h4>
<p>本章还列举出了JS中的专业名词及解释，比如类型、原始值、对象、构造器、原型......等概念。有意思的是标准中关于对象的描述在ES5里面有三种：</p>
<ul>
<li>native object（原生对象），指语义完全由规范定义并且不掺杂任何宿主环境定义的的对象；</li>
<li>build-in object（内置对象），由ECMA实现提供，程序执行时就存在的对象。所有内置对象都是原生对象。</li>
<li>host object（宿主对象），由执行环境提供，比如浏览器的window对象和history对象。JS里的对象不是原生对象就是宿主对象。</li>
</ul>
<p>但是在ES6之后就改成了四种：</p>
<ul>
<li>ordinary object：普通对象，只要具备了对象的所有基本内置方法就可以了。</li>
<li>exotic object：外来对象，如果不具备标准对象所有的基本内置方法，就是外来对象。JS里的对象不是普通对象就是外来对象。</li>
<li>standard object：标准对象，语义由本规范定义的对象。</li>
<li>built-in object：内置对象，跟ES5中描述一样。</li>
</ul>
<p>对比来看，前者是以宿主环境为划分条件，后者则是以对象的基本内置方法。ES6之后其实划分的更细了。</p>
<h2 id="articleHeader3">记法约定</h2>
<p>第5章 <a href="https://tc39.github.io/ecma262/#sec-notational-conventions" rel="nofollow noreferrer" target="_blank">Notational Conventions</a> 详细介绍了规范描述中用到的一些句法、词法以及算法约定等内容，如果要看懂后面的有关语法行为，函数实现的详细描述，就得看懂这章，看完之后你甚至可以照着标准实现一遍。</p>
<p>这章涉及大量编译基本知识，还是强烈建议花些时间看下，不然后面可能没法继续。你需要知道以下概念：</p>
<h4>上下文无关文法</h4>
<p>作为ECMAScript规格文档，自然需要用一种专业的方式来描述这门语言，这种专业的描述语言的方法，就是所谓的文法（文法由若干产生式组成）。而上下文无关的意思，就是所有产生式的左边只有一个非终结符，因为只有这样，产生式右边的串才能规约到左边的非终结符，否则就是上下文相关。大部分编程语言都是上下文无关文法，ECMAScript也不例外。</p>
<h4>词法、正则文法、数字字符串文法和句法约定</h4>
<p>一个冒号“:”作为分隔符分割句法的产生式。两个冒号“::”作为分隔符分割词法和正则的文法产生式。词法和正则的文法共享某些产生式。三个冒号“:::”作为分隔符分割数字字符串文法的产生式。然后列举了各种句法，文法标记，总之很多概念，此处不展开。</p>
<h2 id="articleHeader4">内部机制</h2>
<p>第6到8章详细描述了语言运行的内部机制，从宏观上对ES进行描述，包括数据类型和值，语言内部的抽象操作，以及代码执行的上下文相关知识。</p>
<h4>类型</h4>
<p>ES中的类型可细分为ES语言类型和规范类型，语言类型对应的是程序中直接被操作的值的类型，包括Undefined,Null,Boolean,Number,String,Object,Symbol。理解类型，是理解这门语言的基础。</p>
<p>首先是Undefind和Null，二者区别可参考 <a href="http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html" rel="nofollow noreferrer" target="_blank">undefined与null的区别 - 阮一峰</a>。在一门编程语言中对于“空”的描述用到了两种基本类型，估计只有JavaScript了。其实一开始只有null，后来为了解决类型转换和错误处理问题引入了undefined。</p>
<p><strong>undefined</strong> 表示此处应该有个值，但是这个值还没给出来，其实就是占了个坑，这个坑是语言内部实现帮你做的，你不用管。<strong>null</strong> 才是真正意义上的空值，表示对象世界中的“无”。正所谓道生一，一生二，二生三，三生万物。JS中万物皆对象，所有对象的原型链都可以上溯到唯一的Object，而Object的原型，正是万物之始源，混沌之道null。所以JS中null的意义远超其他编程语言，这正是让JS的面向对象思想与道家哲学完美契合的重要一笔。</p>
<p>所以个人理解，Undefined虽然作为基本类型，解决的却是语言内部处理问题，所以永远不要在代码中主动出现，要在语义上处理空就用null。所有因为undefined带来的问题，基本上是占着茅坑不拉屎的行为导致。所以google在Dart中就只有null，而没有undefined，因为undefined解决的问题完全可以在语言内部解决，没必要暴露给用户。</p>
<p>Boolean和Symbol没啥好说的，数值的设计也是从简，只有一个Number类型。有意思的是String，官方对于<a href="https://tc39.github.io/ecma262/#sec-ecmascript-language-types-string-type" rel="nofollow noreferrer" target="_blank">String类型</a>的描述:</p>
<blockquote>The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2e53 - 1 elements. <br>翻译过来就是指所有有限的零个或多个16位无符号整数值的有序序列(共计2e53 - 1个元素)。这个2e53 - 1是怎么来的呢，按照16位无符号整数值计算的话?</blockquote>
<p>更有意思的是,String中的每一个字符都被视为独立的UTF-16代码单元，即占2个字节，作用在字符串上的所有操作都视它们为无差别的16位无符号整数（这里的UTF-16，其实是指内部实现，计算机内存中都是基于unicode编码的，只是在存储或读取时会进行UTF-8或者其他编码类型转换）。但是UTF-16却有两种长度的字符，U+0000到U+FFFF之间的字符占2个字节，U+10000到U+10FFFF之间的字符占4字节。对于4字节的字符ES是无法准确处理的，需要自己去根据编码值情况判断,这也是一大坑爹之处。</p>
<p>对此，我也专门写了一篇：<a href="#">《深入理解JavaScript中的String类型-未发布》</a>。</p>
<p>除了以上语言类型，整个规范中还有用于描述这门语言的规范类型，规范类型的值是规范自己造的，有的还是ES表达式计算的中间结果，所以没必要对应到特定的语言类型上。若非特别说明，ES中的类型通常指语言类型。</p>
<h4>操作摘要</h4>
<p>类型之间会涉及到各种运算，这就会涉及到各种操作运算。比如类型转换涉及到的内部机制和算法流程，<a href="https://tc39.github.io/ecma262/#sec-type-conversion" rel="nofollow noreferrer" target="_blank">7.1 Type Conversion</a> 都有详细说明。<a href="https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations" rel="nofollow noreferrer" target="_blank">7.2 Testing and Comparison Operations</a> 讲了测试和比较操作，比如测试一个对象是否是数组，是否数字，是否构造函数，以及 <code>==</code> 和 <code>===</code> 的定义等等。以数组测试操作isArray(argument)为例，标准中的描述如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. If Type(argument) is not Object, return false.
2. If argument is an Array exotic object, return true.
3. If argument is a Proxy exotic object, then
    a. If argument.[[ProxyHandler]] is null, throw a TypeError exception.
    b. Let target be argument.[[ProxyTarget]].
    c. Return ? IsArray(target).
4. Return false." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code><span class="hljs-number">1.</span> <span class="hljs-keyword">If</span> Type(argument) <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-built_in">Object</span>, <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>.
<span class="hljs-number">2.</span> <span class="hljs-keyword">If</span> argument <span class="hljs-keyword">is</span> an Array exotic <span class="hljs-built_in">object</span>, <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>.
<span class="hljs-number">3.</span> <span class="hljs-keyword">If</span> argument <span class="hljs-keyword">is</span> a Proxy exotic <span class="hljs-built_in">object</span>, <span class="hljs-keyword">then</span>
    a. <span class="hljs-keyword">If</span> argument.[[ProxyHandler]] <span class="hljs-keyword">is</span> null, <span class="hljs-keyword">throw</span> a TypeError exception.
    b. <span class="hljs-keyword">Let</span> target be argument.[[ProxyTarget]].
    c. <span class="hljs-keyword">Return</span> ? IsArray(target).
<span class="hljs-number">4.</span> <span class="hljs-keyword">Return</span> <span class="hljs-literal">false</span>.</code></pre>
<p>相对于ES5来说，规范中增加了对Proxy的处理。我们再看 <a href="http://underscorejs.org/docs/underscore.html#section-139" rel="nofollow noreferrer" target="_blank">underscope v1.8.3</a> 源码中对isArray的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_.isArray = <span class="hljs-built_in">Array</span>.isArray || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> toString.call(obj) === <span class="hljs-string">'[object Array]'</span>;
}</code></pre>
<p>相对于ES5来说，规范中增加了对Proxy的处理，目前来看这是引擎内部处理的，对现在很多检测数组的方法并不影响。</p>
<h2 id="articleHeader5">语言实现细节</h2>
<p>这是个大坑，还是附上ES2018正式版规范地址吧：</p>
<p><a href="https://www.ecma-international.org/publications/standards/Ecma-262.htm" rel="nofollow noreferrer" target="_blank">https://www.ecma-internationa...</a></p>
<p>如果想快速了解一下新特性，可以看这里：</p>
<p><a href="https://medium.com/front-end-hacking/javascript-whats-new-in-ecmascript-2018-es2018-17ede97f36d5" rel="nofollow noreferrer" target="_blank">https://medium.com/front-end-...</a></p>
<p>具体有哪些 finished proposals 可以参考 <a href="https://github.com/tc39/proposals/blob/master/finished-proposals.md" rel="nofollow noreferrer" target="_blank">tc39 的 GitHub</a>。</p>
<h2 id="articleHeader6">如何优雅的阅读ECMA标准</h2>
<p>由于目前使用最为广泛的还是ECMA 5.1版本，所以在阅读ES2018之前，建议先把5.1的标准看一遍，方便对比。好在W3C中文站有5.1的100%翻译版本：</p>
<blockquote>ES5中文版: <a href="https://www.w3.org/html/ig/zh/wiki/ES5" rel="nofollow noreferrer" target="_blank">https://www.w3.org/html/ig/zh...</a>
</blockquote>
<p>然后可以再看ES6也就是ES2015的标准，虽然没有中文版，不过可以参考阮老师的ES6入门，顺便也可以瞄一眼ES2016的标准：</p>
<blockquote>ES 2015: <a href="http://www.ecma-international.org/ecma-262/6.0/" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a><br>ECMAScript 6入门教程: <a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/</a><br>ES 2016: <a href="http://www.ecma-international.org/ecma-262/7.0/" rel="nofollow noreferrer" target="_blank">http://www.ecma-international...</a>
</blockquote>
<p>期间有任何疑惑可以参考MDN上的JS参考文档，非常全面，涵盖了从入门到精通。</p>
<blockquote><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></blockquote>
<p>看完这些再看ES2018就会非常轻松了：</p>
<blockquote><a href="https://tc39.github.io/ecma262/" rel="nofollow noreferrer" target="_blank">https://tc39.github.io/ecma262/</a></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ECMAScript 2018 标准导读

## 原文链接
[https://segmentfault.com/a/1190000009914740](https://segmentfault.com/a/1190000009914740)

