---
title: '【译】ECMAScript文档---序言及1-6章（上）' 
date: 2019-01-05 2:30:11
hidden: true
slug: 1e54x8f5mqqi
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>  本系列译文的初衷旨在希望更多人能够了解关于JS的一些基本概念，遇到原理性的问题时多去翻翻文档，而不是在社区无休止的重复提出某些在文档中能够非常方便快捷就能找到的东西。</p>
<p>  精力和水平有限，所以暂时只打算尝试翻译前面几章概括性的介绍，同时后面的章节大多都是步骤形式的伪代码或者实现流程，按照这些步骤一步一步推敲即可。比如，要查xxx和xxx进行<code>==</code>比较时到底是怎么样进行的，就可以直接看<a href="https://tc39.github.io/ecma262/#sec-abstract-equality-comparison" rel="nofollow noreferrer" target="_blank">规范7.2节</a>，个人认为，比看文章，记忆总结出来的图表，都更直观且有说服力。</p>
<p>  由于笔者水平有限，知识的深度和广度也不是很够，仅仅是出于上面提到的初衷才想去做这件事。翻译过程定会存在诸多疏漏与错误，还望批评指正～</p>
<p>由于单篇文章有长度限制（最后我才知道，因为之前在本地md编辑器里面写。。），所以分为两篇文章来发布。另外数学公式有些语法sf并不支持，比如行类公式，但是为了表达准确没有删除，大家尽量理解，抱歉抱歉。</p>
<p>下面开始正文。</p>
<h3 id="articleHeader1">简介</h3>
<p>  Ecma标准定义了ECMAScript 2018语言。它是ECMAScript语言规范的第9版。自从在1997年发布第1版以来，ECMAScript已经成长为世界上最为广泛使用的编程语言之一。因为被内嵌入web浏览器而被广泛熟知，但是同样也广泛地适用于服务端和嵌入式应用程序。</p>
<p>  ECMAScript基于几项原始的技术，其中最为熟知是Netscape的JavaScript和Microsoft的JScript。ECMAScript是<a href="https://en.wikipedia.org/wiki/Brendan_Eich" rel="nofollow noreferrer" target="_blank">Brendan Eich</a>在Netscape公司的时候被发明的，第一次出现则是在他们公司的Navigator 2.0浏览器上。随后，它出现在Netscape公司之后的浏览器，以及从微软从IE 3.0起发布的所有浏览器上。</p>
<p>  而ECMAScript语言规范的发展则要追溯到1996年的那个11月。Ecma标准的第1版在1997年7月的<a href="http://www.ecma-international.org/memento/GA.htm" rel="nofollow noreferrer" target="_blank">Ecma大会</a>上被表决接受。</p>
<p>  Ecma标准在"快速通道"的帮助下被提交给<a href="https://www.iso.org/isoiec-jtc-1.html" rel="nofollow noreferrer" target="_blank">ISO/IEC JTC 1</a>，并在1998年的4月底<a href="https://www.iso.org/standard/29696.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 16262</a>会议上投票通过作为国际标准。1998年6月的Ecma大会投票通过了ECMA-262的第2版，使之与ISO/IEC 16262保持一致。第1版与第2版的区别是社论性质的。</p>
<p>  标准的第3版介绍了强大的正则表达式，更好的字符串处理，新的控制语句，<code>try/catch</code>异常处理，更严格的错误定义，数字输出格式化，以及一些其他的随着语言的发展在未来可能出现的一些微小的变化。ECMAScript规范的第3版在1999年12月被Ecma委员会采用，并于2002年6月在<a href="https://www.iso.org/standard/33835.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 16262:2002</a>上发布。</p>
<p>  在发布了第3版之后，ECMAScript和万维网得到了巨大的认可和结合，本质上它已经成为了被所有浏览器支持的编程语言。同时，开发ECMAScript第4版的工作也已完成。然而，那些工作的成果是不完整的，也没有被作为ECMAScript的第4版发布。但是其中的一部分被合并进了第6版之中。</p>
<p>  ECMAScript的第5版（作为ECMA-262第5版发布）将那些在浏览器实现中已经很常见的语言规范作为事实性的解释写进了规范。并且增加了对那些自从第3版发布以来的新特性的支持。这样的新特性包括，访问器属性（即<code>get</code>,<code>set</code>,<code>enumerable</code>,<code>configurable</code>），reflective creation and inspection of objects，对数据属性的控制（即<code>value</code>,<code>writable</code>,<code>enumerable</code>,<code>configurable</code>），更多的可以操作数组的函数（<code>map</code>,<code>reduce</code>等），支持JSON对象编码格式，支持提供了加强了的错误检查和程序安全检查的严格模式等等。第5版被2009年12月的Ecma大会所采纳。</p>
<p>  第5版被提交给ISO/IEC JTC 1，并且在2011年的<a href="https://www.iso.org/standard/55755.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 16262:2011</a>上被作为国际标准被通过。ECMAScript标准的5.1版进行了一些小的修正，并与ISO/IEC 16262:2011保持一致。第5.1版在2011年6月底Ecma大会上被采纳。</p>
<p>  备受关注的第6版的开发于2009年开始，当时第5版正准备发布。然而，一些重大的实验和那些可以追溯到1999年第3版的发布时的语言增强方面的设计工作却使得第6版领先于第5版。</p>
<p>  从真正意义上来讲，第6版的完成将这15年来的努力推向了顶峰。增加这些东西的初衷和目标有很多，包括对大型应用提供更好的支持，库（library）的创建，还有将ECMAScript作为其他语言的编译结果的用法。同时，也包括一些重大的增强，如模块系统，类（class）声明，词法块级作用域，迭代器（iterator）和产生器（generator），为异步编程而生的promise，解构，以及适当的尾部调用。</p>
<p>  ECMAScript中内置的库得以扩充，目的是提供更多的数据抽象功能。如，map，set，数组二进制操作（TypedArray），字符串填充（`aa ${xx}`），<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Specifications" rel="nofollow noreferrer" target="_blank">正则表达式改进</a>。内置库同样也通过子类来扩充。第6版是增量式的语言和库增强，于2015年6月在大会上被采纳。</p>
<p>  ECMAScript规范是Ecam TC39的第一个发布版，新的发布策略将会每年发布一次新版本，并且公布进展过程。纯文本的源文档从ECMAScript 2015源文档开始时在<a href="https://github.com/tc39/ecma262/releases" rel="nofollow noreferrer" target="_blank">Github</a>上建立，目的是为更进一步的发展提供一个基础。</p>
<p>  在标准发展的这些年，提交了数以百计的pr和issue，它们为我们修复了很多bug，编辑错误以及其他方面的提升。除此之外，众多的软件工具被创造，帮助了我们。如Ecmarkup, Ecmarkdown, 以及Grammarkdown。规范同时也提供了对新的求幂运算符（<code>**</code>）的以及数组的<code>includes</code>方法的支持。</p>
<p>  代表不同组织的众多个人也为Ecma TC39现在及之前的发展做出来很多显著的贡献。除此之外，也出现了一个支持TC39并为ECMAScript努力的充满活力的社区。这个社区review了大量的草案，报告了大量的bug，并对实现进行了实验，贡献了测试相关的工具，使全世界的ECMAScript的开发者从中受益。原谅我们，无法对这些做出努力的贡献者们一一感谢。</p>
<p><a href="https://github.com/allenwb" rel="nofollow noreferrer" target="_blank">Allen Wirfs-Brock</a><br>ECMA-262第6版编辑</p>
<p><a href="https://github.com/bterlson" rel="nofollow noreferrer" target="_blank">Brian Terlson</a><br>ECMA-262第7版编辑</p>
<p>译注：除了上面提到的两个，其实tc39的成员真的个个都非常厉害，他们来讲微软，谷歌，mozilla，facebook等等等等，如果你经常watch的话，就会发现这些人真的值得学习，你可能在whatwg，css，各种规范/协议的地方都能找到他们的身影，他们有的人gh上并没有太多东西，但是却丝毫掩盖不了他们的智慧。所以，多找找差距，加油吧，不要再进行无意义的撕逼了～（最后一句其实是好几个月前写的。。）</p>
<h3 id="articleHeader2">1. 规范的范围</h3>
<p>  本规范定义了ECMAScript 2018通用程序语言。</p>
<h3 id="articleHeader3">2. 合法性</h3>
<p>  一个合法的ECMAScript标准的实现必须提供和支持所有的类型，值，对象，属性，函数以及本规范中描述的程序语法及语义。</p>
<p>  一个合法的ECMAScript标准的实现必须采用最新版本的Unicode标准和<a href="https://www.iso.org/standard/56921.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 10646</a>标准统一且一致的解释输入的源文本（代码）。</p>
<p>  一个提供了应用程序接口的合法的ECMAScript标准的实现，需要在这些接口中，支持不同自然语言和国家的人们的语言和文化传统。同时必须实现在<a href="https://www.ecma-international.org/ecma-402/3.0/index.html" rel="nofollow noreferrer" target="_blank">ECMA-402最新版</a>中定义的与本规范兼容的接口。</p>
<p>  一个合法的ECMAScript标准的实现也许会提供额外的类型，值，对象，属性以及那些超过当期规范的函数（译注：即未来版本）。特别要注意的是，这些实现也许会提供某些在规范中有描述的对象的<strong>未</strong>在规范中描述的属性以及这些属性对应的值。</p>
<p>  一个合法的ECMAScript标准的实现也许会支持一些没有在规范中提及的程序或者正则表达式语法。特别的来说，一个合法的ECMAScript标准的实现也许会支持一些利用<a href="https://tc39.github.io/ecma262/#sec-future-reserved-words" rel="nofollow noreferrer" target="_blank">未来的保留字</a>的语法。</p>
<p>  一个合法的ECMAScript标准的实现绝对不能实现任何在16.2节中<a href="https://tc39.github.io/ecma262/#sec-forbidden-extensions" rel="nofollow noreferrer" target="_blank">列出的禁止的扩展</a>。</p>
<h3 id="articleHeader4">3. 规范中的参考文献</h3>
<p>  下面的文档链接对于本规范的应用程序是必不可少的。对于标注了日期的引用，代表只适用于标注的那个版本。对于没有标注日期的引用，则适用于最新的版本（包括修正案）。</p>
<p>  <a href="https://www.iso.org/standard/39921.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 10646:2003</a>：信息技术 - 通用多八位（Multiple-Octet）编码字符集，以及<a href="https://www.iso.org/standard/40755.html" rel="nofollow noreferrer" target="_blank">2005修正案1</a>，<a href="https://www.iso.org/standard/41419.html" rel="nofollow noreferrer" target="_blank">2006修正案2</a>，<a href="https://www.iso.org/standard/44871.html" rel="nofollow noreferrer" target="_blank">2008修正案3</a>，<a href="https://www.iso.org/standard/46311.html" rel="nofollow noreferrer" target="_blank">2008修正案4</a>，以及额外的修正案，勘误，后续标准。</p>
<p>  <a href="http://www.ecma-international.org/publications/standards/Ecma-402.htm" rel="nofollow noreferrer" target="_blank">ECMA-402，ECMAScript 2015国际化API规范</a></p>
<p>  <a href="http://www.ecma-international.org/publications/standards/Ecma-404.htm" rel="nofollow noreferrer" target="_blank">ECMA-404，JSON数据交换格式</a></p>
<h3 id="articleHeader5">4. 概述</h3>
<p>  这一节对ECMAScript语言进行一个不太规范的概述。</p>
<p>  ECMAScript是一门面向对象的程序语言，目的是在宿主环境中计算和操作那些计算的东西。这里定义的ECMAScript的意图并不是自己给自己定下计算规则，事实上，规范中并没有规定输入的外部数据，以及该输出怎样的计算结果。</p>
<p>  事实上，我们期望ECMAScript的计算环境不仅能够提供对象和其他我们描述的事物，而且能够提供某些具体环境下的对象，关于这些对象的描述和行为已经超出了本规范的职责范围，除非它们能提供某些可以在ECMAScript语言中被访问的属性和函数（译注：如全局对象，不同浏览器特有的某些对象）。</p>
<p>  ECMAScript最初被设计用来作为一门脚本语言，但是现在已经被广泛地作为一门通用语言使用。脚本语言是一门被用作计算，定制以及自动化处理现有系统中的各个元素的程序语言。在这样的系统中，通过用户接口我们已经能获得很多有用的功能，脚本语言就是为了将这些功能暴露给程序去控制的一种机制。通过这样的方式，现有的系统能够为这些对象和元素提供一个宿主环境，脚本语言才能发挥自己的功能。一门脚本语言是为专业的和非专业的程序员使用的。</p>
<p>  ECMAScript最初是被设计为一种Web脚本语言，目的是提供一种让Web页面更加富有生机的机制，并且能够在基于Web的客户端-服务端架构（译注：即BS架构）下做一些原本要在服务端进行的计算。ECMAScript现在被用作在各种各样的宿主环境中提供核心脚本功能。因此，本文档描述的是除了任何特定的宿主环境外的语言核心本身。</p>
<p>  ECMAScript的用法已经远远超过了普通的脚本语言，现在它被用作许多不同环境下的编程任务的各个方面。随着ECMAScript用法的扩充，它也拥有越来越多的特性。现在，ECMAScript已经是一门功能完备的通用语言。</p>
<p>  一些ECMAScript的功能与其他我们使用的程序语言是相似的，特别是下面描述到的C，$JAVA^{TM}$，Self以及Scheme：</p>
<p>  <a href="https://www.iso.org/standard/17782.html" rel="nofollow noreferrer" target="_blank">ISO/IEC 9899:1996, Programming Languages – C</a></p>
<p>  <a>Gosling, James, Bill Joy and Guy Steele. The Java™ Language Specification. Addison Wesley Publishing Co., 1996.</a></p>
<p>  <a>Ungar, David, and Smith, Randall B. Self: The Power of Simplicity. OOPSLA '87 Conference Proceedings, pp. 227-241, Orlando, FL, October 1987.</a></p>
<p>  <a href="http://ieeexplore.ieee.org/document/159138/" rel="nofollow noreferrer" target="_blank">IEEE Standard for the Scheme Programming Language. IEEE Std 1178-1990.</a></p>
<h4>4.1 Web脚本</h4>
<p>  Web浏览器为客户端计算提供了一个ECMAScript宿主环境，这些计算包括很多，例如，代表窗口（windows），菜单，弹出框，对话框，文本域，锚点，frame，history，cookies以及输入输出的对象。</p>
<p>  进一步来说，宿主环境提供了一种方式，能够将脚本代码附加到诸如焦点改变，页面和图片加载、卸载、错误、中断，选择某个区域，表单提交，鼠标动作这样的事件上。脚本代码出现在HTML以及展示的页面里，是一种与那些用户接口元素，固定的或者计算后的文本，以及图片的结合。脚本代码对用户交互进行响应，对主程序是没有必要的。</p>
<p>  Web服务器则为服务端计算提供不同的宿主环境，例如，代表请求（requests），客户端（clients），文件的对象。以及锁住和共享数据的机制。通过浏览器端和服务端脚本的共同使用，我们能够对基于Web的应用程序提供自定义的用户接口，从而让在客户端和服务端上的计算达到一个平衡。</p>
<p>  每一个支持ECMAScript的Web浏览器和服务器提供了属于它们自己的宿主环境，从而完善ECMAScript执行环境。</p>
<h3 id="articleHeader6">4.2 ECMAScript概述</h3>
<p>  以下是一个ECMAScript的非正式的概述-并不会描述语言的所有部分。这个概述不是标准的一部分。</p>
<p>  ECMAScript是基于对象的：语言的基础和宿主功能都通过对象的方式提供，一个ECMAScript程序是一个互相有联系的对象的集群。在ECMAScript中，一个对象是一个集合，这个集合包含0到多个属性，每个属性定义了这个属性是用来做什么的。例如，当一个属性的Writable属性被设置为false的时候，任何尝试去给这个属性赋值为与之前不同值的ECMAScript代码都不会成功。属性是控制其它对象，原始值或者函数的容器。一个原始值是下列内置类型之一：Undefined, Null, Boolean, Number, String, 以及Symbol。一个对象（object）属于Object这种内置类型。一个函数（function）是一个可调用的对象。一个函数通过一个叫做method的属性与一个对象相关联。</p>
<p>  ECMAScript定义了一系列的内置对象，用于完成对ECMAScript实体的定义。这些内置对象包括全局对象，以及语言的运行时语义基本对象，它们包括<code>Object</code>, <code>Function</code>, <code>Boolean</code>, <code>Symbol</code>,不同的<code>Error</code>对象（译注：如<code>Error</code>，<code>SyntaxError</code>，<code>TypeError</code>等等），代表和操作数值的<code>Math</code>, <code>Number</code>，<code>Date</code>。处理文本的<code>String</code>，<code>RegExp</code>，建立索引来存储对象的集合的<code>Array</code>，9种不同类型的<code>Typed Arrays</code>（译注：<code>Int8Array()</code>，<code>Uint8Array()</code>，<code>Uint8ClampedArray()</code>，<code>Int16Array()</code>等等），有键值的集合<code>Map</code>和<code>Set</code>，支持结构化数据的<code>JSON</code>，<code>ArrayBuffer</code>, <code>SharedArrayBuffer</code>, <code>DataView</code>，支持控制抽象的<code>generator</code>函数，<code>Promise</code>，最后是反射对象<code>Proxy</code>，<code>Reflect</code>。</p>
<p>  同时ECMAScript也定义了一系列的内置操作符。ECMAScript操作符包括一元操作符，乘法操作符，加法操作符，位运算操作符（译注：即<code>&lt;&lt;</code>，<code>&gt;&gt;</code>，<code>&gt;&gt;&gt;</code>），关系操作符（译注：即<code>&gt;</code>，<code>&gt;=</code>，<code>&lt;</code>，<code>&lt;=</code>，<code>instanceof</code>，<code>in</code>），相等操作符，二进制位操作符（译注：即<code>^</code>，<code>&amp;</code>，<code>|</code>），二进制逻辑操作符(译注：即<code>&amp;&amp;</code>，<code>||</code>)，赋值操作符，逗号操作符。</p>
<p>  大型的ECMAScript程序需要模块的支持，它允许一个程序被划分为多个语句和声明的序列。每个模块显式地识别它用到的由其它模块提供的声明，同时它自己内部的声明也能被其他模块所用。（译注：这里的声明是指<code>import</code>，<code>export</code>这种，而不是变量声明）</p>
<p>  ECMAScript语法有意地模仿了Java语法（译注：这一句和后面的应该没有联系，是单独的两句话）。ECMAScript语法是宽松的，可以激活它作为一门易于使用的脚步语言。例如，一个变量不需要进行类型声明，它的属性也与类型不相关联（译注：应该是指一个可以先后将不同类型的值赋值给同一个变量），函数声明不必出现在函数调用之前。</p>
<h5>4.2.1 对象（Objects）</h5>
<p>  尽管ECMAScript包含了定义一个类的语法，但是ECMAScript对象从根本上来说并不是像C++，Smalltalk，Java那样基于类的。对象可以通过多种方式创建，如通过字面量或者构造函数创建，然后执行初始化所有或者部分属性的代码。构造函数是一个拥有"prototype"属性的函数，"prototype"被用作实现基于原型的继承以及共享属性。对象通过构造函数在<code>new</code>表达式中创建，<code>new Date(2009,11)</code>创建一个Date对象。不通过<code>new</code>的方式调用一个构造函数会产生一些后果，这些后果由那个构造函数决定。例如，直接调用<code>Date()</code>会产生一个表示当前日期的字符串，而不是一个对象。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010518813" src="https://static.alili.tech/img/remote/1460000010518813" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                           图1 Object/Prototype 关系
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>                           图<span class="hljs-number">1</span> <span class="hljs-built_in">Object</span>/Prototype 关系
</code></pre>
<p>  每个通过构造函数创建的对象都有一个隐式的引用（被叫做对象的原型）指向构造函数的"prototype"属性。除此之外，一个原型也许有一个非<code>null</code>的隐式引用指向它自己的原型，这样的层层传递，被称作原型链。当一个引用指向一个对象中的某个属性的时候，那个引用就指向在原型链中第一个含有这个引用名的对象。换句话说，首先会检查这个对象本身是否含有那个属性，如果有，那么这个引用就指向那个属性，如果没有，就去这个对象的原型中检查，然后重复这些步骤。</p>
<p>  通常，在一个基于类的面向对象语言中，状态被实例所持有，方法被类所持有，继承只是结构和行为。在ECMAScript中，状态和方法都被对象所持有，结构，行为，状态都被继承。</p>
<p>  所有非对象自身的属性，都通过对象的原型来共享属性以及属性的值，图1解释了这一切：</p>
<p>  <strong>CF</strong>是一个构造函数（同时也是一个对象）。这里通过<strong>new</strong>操作符已经创建了5个对象（译注：即<code>new CF()</code>）：<strong>cf1</strong>，<strong>cf2</strong>，<strong>cf3</strong>，<strong>cf4</strong>，以及<strong>cf5</strong>。这5个对象中的每一个都包含了<strong>q1</strong>和<strong>q2</strong>属性（译注：即执行了<code>cf1.q1=xxx,cf2.q1=xxx</code>）。虚线展示了隐式的原型关系。所以，例如，<strong>cf3</strong>的隐式原型是<strong>CFp</strong>（译注：即<code>cf3.__proto__或者Object.getPrototypeOf(cf3)都等于CFp</code>）。构造函数CF有两个它本身的属性<strong>P1</strong>和<strong>P2</strong>，对于<strong>CFp</strong>，<strong>cf1</strong>，<strong>cf2</strong>，<strong>cf3</strong>，<strong>cf4</strong>，以及<strong>cf5</strong>来说都是不可见的（译注：即无法通过<code>CFP.p1</code>,<code>cf1.p2</code>这样的方式访问，这里的P1和P2是指的<code>CF.P1=xxx</code>和<code>CF.P2=xxx</code>，即静态/<code>static</code>属性，不要理解成在CF这个构造函数里写<code>this.P1=xxx</code>和<code>this.P2=xxx</code>，那样叫做实例属性）。原型（即CFp）上的<strong>CFP1</strong>属性被<strong>cf1</strong>，<strong>cf2</strong>，<strong>cf3</strong>，<strong>cf4</strong>，以及<strong>cf5</strong>共享（但是不被<strong>CF</strong>共享，（译注：即无法通过<code>CF.CFP1</code>访问）），任何在<strong>CFp</strong>的隐式原型链中的属性也遵循这样的规则，注意在这里<strong>CF</strong>和<strong>CFp</strong>之间没有隐式的原型引用（译注：正因为如此，所以<code>CF.CFP1</code>才为<code>undefined</code>，CF的隐式原型是<code>Function.prototype</code>）。</p>
<p>  不同于大多数基于类的语言，ECMAScript通过给对象的某个属性赋值，可以动态的给对象添加属性。也就是说，构造函数并不是唯一的可以给构造出来的对象添加属性的方式。在上图中，我们可以通过给<strong>CFP</strong>添加一个新的属性，从而达到给<strong>cf1</strong>，<strong>cf2</strong>，<strong>cf3</strong>，<strong>cf4</strong>，以及<strong>cf5</strong>新增一个共享的属性。</p>
<p>  尽管ECMAScript对象本质上不是基于类的，我们还是可以基于一个常见的模式，即构造函数，原型对象以及类方法来很方便的定义"模拟类"（class-like，译注：即类似于类这种结构，与类数组概念相仿，这里的"模拟类"是笔者自己想的，如果有更好的表述，欢迎指正）抽象。那些ECMAScript内置对象也遵循这样的"模拟类"模式（译注：即也是通过构造函数，原型对象以及类方法来定义的）。从ECMAScript 2015开始，ECMAScript语言包含了类定义语法，允许程序员简洁的定义符合"模拟类"抽象模式的对象，内置对象也采取了这种方式来定义。</p>
<h4>4.2.2 ECMAScript严格变体（The Strict Variant of ECMAScript）</h4>
<p>  ECMAScript语言意识到也许有些ECMAScript语言的用户会希望能够在语言中约束某些特性的用法。他们这么做也许是出于安全考虑，避免让他们考虑那些容易出错的特性，从而加强错误检查，或者是由于其它原因它们想这么做。为了支持这样的选择，ECMAScript定义了一个语言的严格变体。这个语言的严格变体除去了某些常规的ECMAScript语言拥有的特定的语法和语义特性，并且修改了某些特性的具体语义。严格变体也指定了额外的错误条件，它们必须通过抛出错误异常来报告，在语言的非严格模式下是没有指定的这些错误的。</p>
<p>  ECMAScript的严格变体通常被称为语言的严格模式。严格模式的选择，以及严格模式语法和语义的使用，是以单个的ECMAScript源文本作为单位的。因为严格模式是在语法源文本单元这个层级上选择，严格模式只会给在这样的源文本单元内有局部影响的文本加上限制。严格模式并不限制或者修改任何ECMAScript语义方面的东西，语义必须在多个源文本之间都是一致的。一个完整的ECMAScript程序也许即存在严格模式又存在非严格模式的ECMAScript源文本单元。在这样的情况下，严格模式只适用于执行定义在严格模式内的源代码文本单元。（译注：如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
  function bar1(){
    'use strict'
     console.log(this);
  }
  bar1();
  
  function bar2() {
    console.log(this);
  }
  bar2();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar1</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-meta">    'use strict'</span>
     <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  }
  bar1();
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  }
  bar2();
}</code></pre>
<p>只有bar1才会输出<code>undefined</code>）。</p>
<p>  为了遵循这个规范，一个ECMAScript实现必须即实现完整的非严格模式的ECMAScript语言，同时也实现本规范定义的ECMAScript语言的严格变体。除此之外，一个实现必须支持非严格模式和严格模式的源代码文本单元的混合，把它们变成一个单一的复合程序。</p>
<h3 id="articleHeader7">4.3 术语及定义（Terms and Definitions）</h3>
<p>  出于本文档的需要，规定了以下术语和定义。</p>
<h4>4.3.1 类型（type）</h4>
<p>  指定义在本规范的条款6中的数据值的集合</p>
<h4>4.3.2 原始值（primitive value）</h4>
<p>  指定义在条款6中的Undefined, Null, Boolean, Number, Symbol,以及String的其中之一的成员</p>
<blockquote><p>注：一个原始值是直接代表本语言实现的最低层级的基准</p></blockquote>
<h4>4.3.3 对象（object）</h4>
<p>译注：从这里开始，会出现“注”，这是规范里本身所含有的，并不是笔者添加的注，笔者添加到注会写明“译注”二字，请注意区分。原文为NOTE，这里翻译为了“注”，</p>
<p>  指Object类型的成员</p>
<blockquote><p>注：一个对象是一个属性的集合，并且只有一个唯一原型对象。原型对象可能为<code>null</code>。</p></blockquote>
<h4>4.3.4 构造函数/构造器（constructor）</h4>
<p>  指创建和初始化对象的函数对象</p>
<blockquote><p>注：构造函数的<code>prototype</code>属性是一个被用来实现实现继承和共享属性的原型对象</p></blockquote>
<h4>4.3.5 原型（prototype）</h4>
<p>  指一个为其它对象提供共享属性的对象</p>
<blockquote><p>注：当一个构造函数创建一个对象时，出于解析属性引用的目的（译注：即让<code>obj.foo和obj['foo']能够工作</code>），那个对象将隐式的引用构造函数的<code>prototype</code>属性。构造函数的<code>prototype</code>属性能够通过表达式<code>constructor.prototype</code>被引用，并且添加到原型上的属性能够被共享，通过继承，所有对象共享原型。再者，通过使用使用内置的<code>Object.create</code>函数，一个对象可以被显式地指定某个原型来创建。</p></blockquote>
<h4>4.3.6 普通对象（ordinary object）</h4>
<p>  指拥有必须被所有对象支持的至关重要的内部方法的默认行为的对象。</p>
<h4>4.3.7 外来对象（exotic object）</h4>
<p>  指那些没有一个或多个至关重要的内部方法的默认行为的对象。</p>
<blockquote><p>注：任何对象不是普通对象就是外来对象</p></blockquote>
<h4>4.3.8 标准对象（standard object）</h4>
<p>  指那些语义是由本规范定义的对象。</p>
<h4>4.3.9 内置对象（built-in object）</h4>
<p>  指那些由ECMAScript的实现指定和提供的对象。</p>
<blockquote><p>注：标准的内置对象被定义在本规范中。一个ECMAScript实现也许会指定和提供额外的某些内置对象。一个内置构造函数是一个内置对象，同时也是一个构造函数。</p></blockquote>
<h4>4.3.10 undefined值（undefined value）</h4>
<p>  是一个原始值（primitive value），代表当一个变量还未被赋值。</p>
<h4>4.3.11 Undefined类型（Undefined type）</h4>
<p>  是一个类型，它的唯一值是<code>undefined</code>。</p>
<h4>4.3.12 null值（null value）</h4>
<p>  是一个原始值,代表任何对象值的有意缺省。</p>
<h4>4.3.13 Null类型（Null type）</h4>
<p>  是一个类型，它的唯一值是<code>null</code>。</p>
<h4>4.3.14 Boolean值（Boolean value）</h4>
<p>  指Boolean类型的成员之一</p>
<blockquote><p>注：Boolean类型只有两种值，<code>true</code>和<code>false</code>。</p></blockquote>
<h4>4.3.15 Boolean类型（Boolean type）</h4>
<p>  指包含原始值<code>true</code>和<code>false</code>的类型。</p>
<h4>4.3.16 Boolean对象（Boolean object）</h4>
<p>  是Object类型的成员之一，是标准的内置<code>Boolean</code>构造函数的实例。</p>
<blockquote><p>一个Boolean对象通过使用<code>Boolean</code>构造函数在<code>new</code>表达式中创建，接收一个Boolean值作为参数。返回的结果对象有一个内部的slot（slot在第六章会解释），它的值是一个Boolean值。一个Boolean对象能够被转换为一个Boolean值。（译注：即拆箱）</p></blockquote>
<h4>4.3.17 String值（String value）</h4>
<p>  是一个原始值，是一个由0至多个16bit的无符号数字值组成的有限的有序序列。（译注：即每个字符都由2个字节组成，当然，存在由4个字节组成的字符，这里说的只是js内部的字符串的表示）</p>
<blockquote><p>一个String值是一个String类型的成员。在上面提到的序列中的每个整数（0-65535）通常代表UTF-16文本中一个单一的16bit单元。</p></blockquote>
<h4>4.3.18 String类型（String type）</h4>
<p>  所有可能的String值的集合。</p>
<h4>4.3.19 String对象（String object）</h4>
<p>  是Object类型的成员之一，是标准的内置<code>String</code>构造函数的实例。</p>
<blockquote><p>一个String对象通过使用<code>String</code>构造函数在<code>new</code>表达式中创建，接收一个String值作为参数。返回的结果对象有一个内部的slot，它的值是一个String值。一个String对象能够通过调用<code>String</code>构造函数（<code>String(xxx)</code>而不是<code>new String(xxx)</code>）转换为一个String值。</p></blockquote>
<h4>4.3.20 Number值(Number value)</h4>
<p>  是一个原始值，与IEEE-754-2008规范的双精度64bit二进制格式相对应。</p>
<blockquote><p>一个Number值是一个Number类型的成员，是一个数字的直接表示。</p></blockquote>
<h4>4.3.21 Number类型（Number type）</h4>
<p>  是一个所有可能的Number值的集合，包括<code>NaN</code>，正的<code>Infinity</code>以及负的<code>Infinity</code>。</p>
<h4>4.3.22 Number对象（Number object）</h4>
<p>  是Object类型的成员之一，是标准的内置<code>Number</code>构造函数的实例。</p>
<blockquote><p>一个Number对象通过使用<code>Number</code>构造函数在<code>new</code>表达式中创建，接收一个Number值作为参数。返回的结果对象有一个内部的slot，它的值是一个Number值。一个Number对象能够通过调用<code>Number</code>构造函数（<code>Number(xxx)</code>而不是<code>new Number(xxx)</code>）转换为一个Number值。</p></blockquote>
<h4>4.3.23 Infinity</h4>
<p>  是一个Number值，指正的<code>Infinity</code>。</p>
<h4>4.3.24 NaN</h4>
<p>  是一个Number值，指IEEE 754-2008中的“Not-a-Number”值。</p>
<h4>4.3.25 Symbol值（Symbol value）</h4>
<p>  是一个原始值，代表一个唯一的，非字符串的对象的属性的键（key）。</p>
<h4>4.3.26 Symbol类型（Symbol type）</h4>
<p>  所有可能的Symbol值的集合</p>
<h4>4.3.27 Symbol对象（Symbol object）</h4>
<p>  是Object类型的成员之一，是标准的内置<code>Symbol</code>构造函数的实例。</p>
<h4>4.3.28 函数（function）</h4>
<p>  是Object类型的成员之一，也许会作为一个子例程被调用。</p>
<blockquote><p>除了它的属性外，一个函数包含可执行的代码和决定当被调用时的行为的状态。一个函数的代码可能会也可能不会是ECMAScript书写的。</p></blockquote>
<h4>4.3.29 内置函数（built-in function）</h4>
<p>  指那些是函数的内置对象。</p>
<blockquote><p>这样的例子包括<code>parseInt</code>，<code>Math.exp</code>。一个ECMAScript的实现也许会提供没有在本规范中描述的依赖于实现的内置函数。</p></blockquote>
<h4>4.3.30 属性（property）</h4>
<p>  是对象的一部分，关联键（要么是一个字符串，要么是一个Symbol值）和值</p>
<blockquote><p>取决于属性的格式，属性的值可能作为一个数据值（一个原始值，一个对象，或者一个函数是对象）直接被展示，或者间接地通过一对访问器函数展示。</p></blockquote>
<h4>4.3.31 方法（method）</h4>
<p>  是一个函数，指某个属性的值。（译注：即method是function的真子集）</p>
<blockquote><p>当一个函数被作为一个对象的方法调用时，这个对象将作为这个函数里的<code>this</code>值被传递到这个函数中。</p></blockquote>
<h4>4.3.32 内置方法（built-in method）</h4>
<p>  是一个内置函数的方法</p>
<blockquote><p>标准的内置方法被定义在本规范中，并且ECMAScript实现也许会指定和提供其它的额外的内置方法。</p></blockquote>
<h4>4.3.33 属性（attribute）</h4>
<p>  指定义某些属性（property）的特征的内部值</p>
<h4>4.3.34 自有属性（own property）</h4>
<p>  指被对象直接所有的属性（property）</p>
<h4>4.3.35 继承属性（inherited property）</h4>
<p>  指对象的属性但非自有属性，是对象的原型的属性（即原型上的自有属性或者继承属性）。</p>
<h3 id="articleHeader8">4.4 本规范的章节组织（Organization of This Specification）</h3>
<p>  本规范剩余部分的组织如下:</p>
<p>  第5章定义了在本规范中使用的一些符号或者语法的约定。</p>
<p>  第6-9章定义了ECMAScript程序操作包含的执行环境。</p>
<p>  第10-16章定义了实际的ECMAScript语言，包括它的语法编码以及语言特性的执行语义。</p>
<p>  第17-26章定义了ECMAScript标准库。它们包括所有当ECMAScript程序执行时可用的标准对象的定义。</p>
<h2 id="articleHeader9">5 符号约定（Notational Conventions）</h2>
<h3 id="articleHeader10">5.1 语法和词法的文法（Syntactic and Lexical Grammars）</h3>
<h4>5.1.1 上下文无关文法（Context-Free Grammars）</h4>
<p>  一个上下文无关文法由一系列的产生式（productions）组成。每个产生式包含一个称作非终结符的抽象的符号作为它的左值，以及一系列的0个或多个非终结符和终结符作为它的右值。对于每一个文法，终结符都来自一个具体的字符表（译注：即符号表）。</p>
<p>  一个文法链是一个只含有一个非终结符以及0个或多个终结符作为它的右值的文法。</p>
<p>  从一个包含一个单一的被称作目标符号的非终结符开始，给出一个指定语言的上下文无关文法。换句话说，所有可能的能由重复地用非终结符在左值的产生式的右值替换这个序列中的任意非终结符推导出的终结符序列。</p>
<h4>5.1.2 词法和正则文法（The Lexical and RegExp Grammars）</h4>
<p>  一个ECMAScript的词法文法在<a href="https://tc39.github.io/ecma262/#sec-ecmascript-language-lexical-grammar" rel="nofollow noreferrer" target="_blank">条款11</a>中给出。这个文法有它的符号定义在<a href="https://tc39.github.io/ecma262/#sec-source-text" rel="nofollow noreferrer" target="_blank">10.1</a>节中的<a href="https://tc39.github.io/ecma262/#prod-SourceCharacter" rel="nofollow noreferrer" target="_blank">SourceCharacter</a>规则的终结符的Unicode码点。它定义了一系列的终结符，从目标符号<a href="https://tc39.github.io/ecma262/#prod-InputElementDiv" rel="nofollow noreferrer" target="_blank">InputElementDiv</a>,<a href="https://tc39.github.io/ecma262/#prod-InputElementTemplateTail" rel="nofollow noreferrer" target="_blank">InputElementTemplateTail</a>,或者<a href="https://tc39.github.io/ecma262/#prod-InputElementRegExp" rel="nofollow noreferrer" target="_blank">InputElementRegExp</a>,<a href="https://tc39.github.io/ecma262/#prod-InputElementRegExpOrTemplateTail" rel="nofollow noreferrer" target="_blank">InputElementRegExpOrTemplateTail</a>,它们描述了像这样的码点的序列是如何被翻译成一系列的输入元素的。</p>
<p>  除了空白符和注释之外的输入元素构成了ECMAScript语法文法的终结符，它们被称作ECMAScript tokens。这些token是ECMAScript语言的保留字，标识符，字面量以及标点符号。此外，尽管行终结符不被当作是token，但是它也是输入元素流中的一部分，并且引导着<a href="https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion" rel="nofollow noreferrer" target="_blank">自动分号插入机制</a>。简单的空白符以及单行注释都被丢弃并且不会出现在语法文法的输入元素流中。一个多行注释（也就是说，形如/*…*/，不管占据一行还是多行）也同样地被丢弃，如果它没有包含行总结符的话。但是如果一个多行注释包含了一个或者多个行终结符，那么它就会被替换成一个单一的行终结符，从而成为语法文法输入元素流中的一部分。</p>
<p>  一个ECMAScript的正则文法在<a href="https://tc39.github.io/ecma262/#sec-patterns" rel="nofollow noreferrer" target="_blank">21.2.1</a>中给出。这个文法也包含它的定义在<a href="https://tc39.github.io/ecma262/#prod-SourceCharacter" rel="nofollow noreferrer" target="_blank">SourceCharacter</a>的码点的终结符。它定义了一系列的产生式，从目标符号的<a href="https://tc39.github.io/ecma262/#prod-Pattern" rel="nofollow noreferrer" target="_blank">Pattern</a>开始，描述了这样的码点的序列是如何被翻译成正则表达式的pattern的。</p>
<p>  词法和正则文法的产生式被用两个冒号作为分割符（即::）来区分。词法和正则文法共享一些产生式。</p>
<h4>5.1.3 数字字符串文法（The Numeric String Grammar）</h4>
<p>  这是另一个被用作翻译字符串为数字值的文法（译注：即将字符串转换为数字）。这个文法与词法文法中的一些部分是相似的，都需要与数字字面量相协作，并且有它的终结符<a href="https://tc39.github.io/ecma262/#prod-SourceCharacter" rel="nofollow noreferrer" target="_blank">SourceCharacter</a>。这个文法出现在<a href="https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type" rel="nofollow noreferrer" target="_blank">7.1.3.1</a>中。</p>
<h4>5.1.4 语法文法（Syntactic Grammar）</h4>
<p>  ECMAScript的语法词法在条款11，12，13，14以及15中给出。这个文法包含在词法文法中定义的ECMAScript tokens作为它的终结符。它定义了一系列的产生式，从两个可选的目标符号<a href="https://tc39.github.io/ecma262/#prod-Script" rel="nofollow noreferrer" target="_blank">Script</a>以及<a href="https://tc39.github.io/ecma262/#prod-Module" rel="nofollow noreferrer" target="_blank">Module</a>开始，描述了形成ECMAScript程序语法上正常的独立的组件的token是怎样的序列。</p>
<p>  当一个码点流将要被解析成一个ECMAScript的<a href="https://tc39.github.io/ecma262/#prod-Script" rel="nofollow noreferrer" target="_blank">Script</a>或者<a href="https://tc39.github.io/ecma262/#prod-Module" rel="nofollow noreferrer" target="_blank">Module</a>时，它首先通过重复的与词法文法有关的应用程序被转换成一个输入元素流。然后这个输入元素流被解析成一个单一的语法文法的应用程序。如果在这个输入元素流中的token不能被解析成一个单一的目标非终结符（<a href="https://tc39.github.io/ecma262/#prod-Script" rel="nofollow noreferrer" target="_blank">Script</a>或者<a href="https://tc39.github.io/ecma262/#prod-Module" rel="nofollow noreferrer" target="_blank">Module</a>）的话，这个输入流在语法上就是错误，将不会留下任何的token。</p>
<p>  当一个解析成功的时候，它会构造一颗解析树（parse tree），一颗有根的树的结构是它的每个节点（Node）都是一个Parse节点。每个Parse节点是一个文法中的符号的实例。它代表了一个对于那些能从这样的符号中派生出来的源代码文本的跨度。解析树的根节点代表着整个的源代码文本，是一个解析的目标符号的实例。当一个Parse节点是一个非终结符的实例的时候，它也是一个某些将这个非终结符作为左值的产生式的实例。此外，它有0个或多个children，产生式右值中的每个符号：每个child都是一个是相应符号的实例的Parse节点。</p>
<p>  语法文法的产生式被用一个冒号作为分割符（即:）来区分</p>
<p>  语法文法在条款12，13，14以及15中提出。但是对于哪些token序列是正确的被ECMAScript <a href="https://tc39.github.io/ecma262/#prod-Script" rel="nofollow noreferrer" target="_blank">Script</a>或者<a href="https://tc39.github.io/ecma262/#prod-Module" rel="nofollow noreferrer" target="_blank">Module</a>接受的解释得并不完整。一些额外的token序列也能被接受，换句话说，那些序列将会被文法描述，只要分号被加入到序列中的某些地方（比如在行终结符之前）。此外，某些通过文法描述的token序列不会被接受，如果一个行终结符出现在某些“尴尬”的地方。</p>
<p>  在某些案例中，为了避免歧义，语法文法使用广义的产生式，允许token序列不形成一个合法的ECMAScript  <a href="https://tc39.github.io/ecma262/#prod-Script" rel="nofollow noreferrer" target="_blank">Script</a>或者<a href="https://tc39.github.io/ecma262/#prod-Module" rel="nofollow noreferrer" target="_blank">Module</a>。例如，这项技术<br>被用作对象字面量和对象解构模式中。在这样的场景中，更多的限制性的补充的文法被提供，进一步限制了可接受的token序列。在某些上下文中，当显式地指定时，输入元素类似于一个用补充的语法的目标符号进行再次解析的产生式。如果被解析的输入元素流中的token通过一个覆盖的不能被作为一个单独的与之对应的补充的目标符号的实例去解析，输入流就是语法上错误的，将不再保留token。</p>
<h4>5.1.5 文法符号（Grammar Notation）</h4>
<p>  词法，正则以及数字字符串文法的终结符用固定宽度的字体展示，不管是在文法的产生式，还是在本规范中，无论何时，只要文本直接地指向了这样的终结符。这些都会出现在我们的写的脚本中。所有通过这种方式指定的终结符码点都被当作合适的Unicode码点理解，从基本的Latin范围，与之相对的是任意类似的Unicode范围的码点。</p>
<p>  非终结符用斜体展示。一个非终结符的定义（也叫做产生式）通过下面定义的一个或多个冒号的非终结符的名称的方式来介绍。（冒号的数量暗示了这个产生式属于哪种文法）。一个或者多个可选的非终结符的右值跟在succeeding线后面。例如，语法定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WhileStatement:
    while(Expression)Statement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>WhileStatement:
    <span class="hljs-keyword">while</span>(Expression)Statement</code></pre>
<p>  非终结符<a href="https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement" rel="nofollow noreferrer" target="_blank">WhileStatement</a>的状态表示了while这个token，随后是一个左括号token，然后是一个<a href="https://tc39.github.io/ecma262/#prod-Expression" rel="nofollow noreferrer" target="_blank">表达式</a>（Expression），然后是一个右括号token，然后是一个<a href="https://tc39.github.io/ecma262/#prod-Statement" rel="nofollow noreferrer" target="_blank">语句</a>（Statement）。这些表达式和语句的出现也是非终结符。另一个例子，语法定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ArgumentList:
    AssignmentExpression
    ArgumentList,AssignmentExpression" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">ArgumentList:</span>
    AssignmentExpression
    ArgumentList,AssignmentExpression</code></pre>
<p>  一个<a href="https://tc39.github.io/ecma262/#prod-grammar-notation-ArgumentList" rel="nofollow noreferrer" target="_blank">ArgumentList</a>也许代表了一个单一的<a href="https://tc39.github.io/ecma262/#prod-AssignmentExpression" rel="nofollow noreferrer" target="_blank">AssignmentExpression</a>或者一个<a href="https://tc39.github.io/ecma262/#prod-grammar-notation-ArgumentList" rel="nofollow noreferrer" target="_blank">ArgumentList</a>，然后是一个逗号，然后是一个<a href="https://tc39.github.io/ecma262/#prod-AssignmentExpression" rel="nofollow noreferrer" target="_blank">AssignmentExpression</a>。这个ArgumentList的定义是递归的，也就是说，它是根据它本身来定义的。这样的结果就是，一个ArgumentList也许会包含任意数量逗号分隔的arguments，其中的每个argument表达式是一个<a href="https://tc39.github.io/ecma262/#prod-AssignmentExpression" rel="nofollow noreferrer" target="_blank">AssignmentExpression</a>。这样的非终结符的递归定义是非常常见的。</p>
<p>  下面的下标后缀“opt”（译注：由于在代码块中无法使用<code>&lt;sub&gt;</code>标签，所以opt没有展示成下标的形式，但是实际上它是下标），也许会出现在一个终结符或者非终结符后，作为一个可选的标志。这个可供选择的包含一个可选符号的符号，实际上指定2个右值，一个省略了这个可选元素，一个包含了这个可选元素。这意外着：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration:
    BindingIdentifier Initializer opt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">VariableDeclaration</span>:
    <span class="hljs-keyword">BindingIdentifier </span>Initializer <span class="hljs-meta">opt</span></code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration:
    BindingIdentifier
    BindingIdentifier Initializer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">VariableDeclaration</span>:
    <span class="hljs-keyword">BindingIdentifier
</span>    <span class="hljs-keyword">BindingIdentifier </span>Initializer</code></pre>
<p>  还有比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IterationStatement:
    for(LexicalDeclaration Expression opt ; Expression opt)Statement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">IterationStatement:
</span>    for(LexicalDeclaration Expression <span class="hljs-meta">opt</span> <span class="hljs-comment">; Expression opt)Statement</span></code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IterationStatement:
    for(LexicalDeclaration ; Expression opt)Statement
    for(LexicalDeclaration Expression ; Expression opt)Statement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>IterationStatement:
    <span class="hljs-keyword">for</span>(LexicalDeclaration ; Expression opt)Statement
    <span class="hljs-keyword">for</span>(LexicalDeclaration Expression ; Expression opt)Statement</code></pre>
<p>  它们依次是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IterationStatement:
    for(LexicalDeclaration ;)Statement
    for(LexicalDeclaration ; Expression)Statement
    for(LexicalDeclaration Expression ;)Statement
    for(LexicalDeclaration Expression ; Expression)Statement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>IterationStatement:
    <span class="hljs-keyword">for</span>(LexicalDeclaration ;)Statement
    <span class="hljs-keyword">for</span>(LexicalDeclaration ; Expression)Statement
    <span class="hljs-keyword">for</span>(LexicalDeclaration Expression ;)Statement
    <span class="hljs-keyword">for</span>(LexicalDeclaration Expression ; Expression)Statement</code></pre>
<p>  所以，在这个例子中，非终结符<code>IterationStatement</code>实际上有4个可选的右值。</p>
<p>  一个产生式也许会通过形如“[parameters]”这样的下标注释被参数化，它们也许会作为后缀出现在产生式定义的非终结符中。“parameters”也许是单独的名称，或者一个逗号分隔的名称列表。一个被参数化的产生式是一系列定义参数名称的所有组合的产生式的缩写，以下划线开头，被追加到参数化的非终结符后面。这就意味着：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList[Return]: （注意这里的[Return]是下标）
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>StatementList<span class="hljs-string">[Return]</span>: （注意这里的<span class="hljs-string">[Return]</span>是下标）
    ReturnStatement
    ExpressionStatement</code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement
    
StatementList_Return:
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement
    
<span class="hljs-symbol">StatementList_Return:</span>
    ReturnStatement
    ExpressionStatement</code></pre>
<p>  再比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList[Return, In]:
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>StatementList[<span class="hljs-keyword">Return</span>, <span class="hljs-keyword">In</span>]:
    ReturnStatement
    ExpressionStatement</code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement
    
StatementList_Return:
    ReturnStatement
    ExpressionStatement

StatementList_In:
    ReturnStatement
    ExpressionStatement

StatementList_Return_In:
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement
    
<span class="hljs-symbol">StatementList_Return:</span>
    ReturnStatement
    ExpressionStatement

<span class="hljs-symbol">StatementList_In:</span>
    ReturnStatement
    ExpressionStatement

<span class="hljs-symbol">StatementList_Return_In:</span>
    ReturnStatement
    ExpressionStatement</code></pre>
<p>  多个参数产生一个组合后的产生式，但是在一个复杂的语法中，并不一定需要引用它们中的全部内容。</p>
<p>  在一个产生式的右值中引用非终结符也能被参数化，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement[+In]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement[+<span class="hljs-keyword">In</span>]</code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement_In" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement_In</code></pre>
<p>  再比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement[~In]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement[~<span class="hljs-keyword">In</span>]</code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement</code></pre>
<p>  一个非终结符引用也许既有一个参数列表，又有一个“opt”后缀，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration:
    BindingIdentifier Initializer[+In]opt  （注意[+In]和opt都是下标）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">VariableDeclaration</span>:
    <span class="hljs-keyword">BindingIdentifier </span>Initializer[+In]<span class="hljs-meta">opt</span>  （注意[+In]和<span class="hljs-meta">opt</span>都是下标）</code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration:
    BindingIdentifier
    BindingIdentifier Initializer_In" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">VariableDeclaration</span>:
    <span class="hljs-keyword">BindingIdentifier
</span>    <span class="hljs-keyword">BindingIdentifier </span>Initializer_In</code></pre>
<p>  给一个参数在右值的非终结符引用加上前缀“?”使得那个参数依赖于引用当前产生式左值符合的参数名，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration[In]:
    BindingIdentifier Initializer[?In]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>VariableDeclaration<span class="hljs-string">[In]</span>:
    BindingIdentifier Initializer<span class="hljs-string">[?In]</span></code></pre>
<p>  是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="VariableDeclaration:
    BindingIdentifier Initializer

VariableDeclaration_In:
    BindingIdentifier Initializer_In" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">VariableDeclaration</span>:
    <span class="hljs-keyword">BindingIdentifier </span>Initializer
<span class="hljs-symbol">
VariableDeclaration_In:</span>
    <span class="hljs-keyword">BindingIdentifier </span>Initializer_In</code></pre>
<p>  如果一个右值以“[+parameter]”作为前缀，那么那个可选的只有在命名的参数在引用产生式的非终结符时被使用时才可用。如果一个可选的右值以“[~parameter]”作为前缀，那么那个可选的只有在命名的参数在引用产生式的非终结符时没有被使用时才可用。（译注：即<code>+</code>表示上下的<code>[]</code>必须同时出现，<code>～</code>表示不能同时出现）这意味着：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList[Return]:
    [+Return]ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>StatementList<span class="hljs-string">[Return]</span>:
    <span class="hljs-string">[+Return]</span>ReturnStatement
    ExpressionStatement</code></pre>
<p>是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ExpressionStatement
    
StatementList_Return:
    ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ExpressionStatement
    
<span class="hljs-symbol">StatementList_Return:</span>
    ReturnStatement
    ExpressionStatement</code></pre>
<p>再比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList[Return]:
    [~Return]ReturnStatement
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>StatementList<span class="hljs-string">[Return]</span>:
    <span class="hljs-string">[~Return]</span>ReturnStatement
    ExpressionStatement</code></pre>
<p>是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StatementList:
    ReturnStatement
    ExpressionStatement
    
StatementList_Return:
    ExpressionStatement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">StatementList:</span>
    ReturnStatement
    ExpressionStatement
    
<span class="hljs-symbol">StatementList_Return:</span>
    ExpressionStatement</code></pre>
<p>  在一个文法定义中，当单词“one of”跟随在一个或多个分号后的时候，表示随后的一行或多行的终结符是一个可选的定义。例如，ECMAScript的词法文法包含下列的产生式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NonZeroDigit :: one of
    123456789" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>NonZeroDigit :: one <span class="hljs-keyword">of</span>
    <span class="hljs-number">123456789</span></code></pre>
<p>  它仅仅是下面的缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NonZeroDigit::
    1
    2
    3
    4
    5
    6
    7
    8
    9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>NonZeroDigit::
    <span class="hljs-number">1</span>
    <span class="hljs-number">2</span>
    <span class="hljs-number">3</span>
    <span class="hljs-number">4</span>
    <span class="hljs-number">5</span>
    <span class="hljs-number">6</span>
    <span class="hljs-number">7</span>
    <span class="hljs-number">8</span>
    <span class="hljs-number">9</span></code></pre>
<p>  如果短语“[empty]” 出现在一个产生式的右值，它暗示着这个产生式的右值不包含终结符或者非终结符。</p>
<p>  如果短语“[lookahead ∉ set]” 出现在一个产生式的右值，它暗示着如果随后立即的输入的token序列是给出的集合中的成员，那么这个产生式也许不会被使用。这个集合可以用一个逗号分割的由一到两个被花括号包裹的元素终结序列的列表表示。为了方便，这个集合也可以用非终结符表示，在这种情况下，它代表所有能由非终结符展开得到的终结符的集合。如果这个集合包含一个单独的终结符，那么短语“[lookahead ≠ terminal]” 也许会被使用。</p>
<p>  如果短语“[no LineTerminator here]” 出现在一个语义文法的产生式的右值中，意味着这个产生式是一个受限的/严格的（restricted）产生式：如果一个行终结符（LineTerminator）在输入流中出现在指定的位置，它也许不会被使用。例如，产生式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ThrowStatement:
    throw [no LineTerminator here] Expression;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ThrowStatement:
    <span class="hljs-keyword">throw</span> [<span class="hljs-literal">no</span> LineTerminator here] Expression;</code></pre>
<p>  如果一个行终结符出现在脚本的throw token和表达式（Expression）之间的时候，暗示着这个产生式也许不会被使用。（译注：通过测试，如果之间插入一个行终结符，会抛出<code>Illegal newline after throw</code>异常）</p>
<p>  除非通过一个受限的产生式禁止一个行终结符的出现，否则任意数量行终结符的出现也许会发生在输入元素流中任意两个连续的token之间，并且不影响脚本的语义可接受性。</p>
<p>  当一个词法文法或者数字字符串文法的产生式中可选部分出现多码点的token时，意味着码点序列将会组成一个token。</p>
<p>  一个产生式的右值也许会通过短语“but not”指定某些不被允许的扩展，然后暗示这个扩展将是被排除在外的。例如，产生式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Identifier ::
    IdentifierName but not ReservedWord" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Identifier ::
    IdentifierName <span class="hljs-keyword">but</span> <span class="hljs-keyword">not</span> ReservedWord</code></pre>
<p>  </p>
<p>  意味着非终结符Identifier也许会被任意的码点序列替换，这些码点能够替换提供的IdentifierName，但是相同序列的码点不能替换ReservedWord。（译注：即Identifier可以是除了ReservedWord（保留字）之外的其它任意的IdentifierName）</p>
<p>  最后，一些非终结符通过<a href="http://kb.cnblogs.com/page/192018/" rel="nofollow noreferrer" target="_blank">sans-serif字体</a>书写的描述性的短语来描述，在这样的案例中，列出所有的可选部分是不切实际的。（译注：例如下方的SourceCharacter是一个统称，实际来说指的太多了，所以不可能一一列出）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SourceCharacter :: （译注：这里的SourceCharacter就是sans-serif字体）
    any Unicode code point" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>SourceCharacter :: （译注：这里的SourceCharacter就是sans-serif字体）
    any Unicode <span class="hljs-keyword">code</span> point</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】ECMAScript文档---序言及1-6章（上）

## 原文链接
[https://segmentfault.com/a/1190000010518810](https://segmentfault.com/a/1190000010518810)

