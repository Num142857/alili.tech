---
title: 'JavaScript 简史' 
date: 2019-01-03 2:30:11
hidden: true
slug: 3zzu27hsz2k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@bigshaw" rel="nofollow noreferrer" target="_blank">网络埋伏纪事</a><br>审校: <a href="http://www.zcfy.cc/@cncuckoo" rel="nofollow noreferrer" target="_blank">为之漫笔</a><br>链接：<a href="http://www.zcfy.cc/article/2389" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/2389</a><br>原文：<a href="https://auth0.com/blog/a-brief-history-of-javascript/" rel="nofollow noreferrer" target="_blank">https://auth0.com/blog/a-brief-history-of-javascript/</a></p></blockquote>
<p>JavaScript 毋庸置疑是当今最重要的语言之一。Web 的兴起已经把 JavaScript 带到一个前所未有的地步。下面我们来看看 JavaScript 在其短短历史中是如何演变的，以及它在走向何处。请继续读下去！</p>
<ul><li><ul><li>*</li></ul></li></ul>
<h2 id="articleHeader0">这一切都开始于九十年代</h2>
<p>一切都发生在 1995 年 5 月到 11 月这六个月内。网景通讯公司在早期的 Web 中拥有强大的地位。它的浏览器 Netscape Communicator，作为第一款流行 Web 浏览器 NCSA Mosaic 的竞争对手，正获得广泛认同。网景是由 90 年代早期参与 Mosaic 开发的同一伙人创立的，而现在，有了钱和自主性，他们就有了寻求进一步扩展 Web 的途径所需的自由。而这种自由催生了 JavaScript。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818894" src="https://static.alili.tech/img/remote/1460000010818894" alt="Netscape Logo" title="Netscape Logo" style="cursor: pointer; display: inline;"></span></p>
<p>网景通讯的创始人及前 Mosaic 团队的成员 Marc Andreessen 预见到 Web 需要某种方法变得更动态。动画、交互和其它形式的小动画应该是未来 Web 的一份子。所以 Web 需要一种能与 DOM 交互（不是跟你现在看到的这样一成不变）的小脚本语言。不过，这种脚本语言不应该面向大佬开发者，以及在软件工程方面有经验的人们——&lt;span style="font-size: 1rem;"&gt;在当时这是一种重要的战略呼声&lt;/span&gt;。当时 Java 也在兴起，并且 Java applets 很快就要成为现实。所以这个用于 Web 的脚本语言需要迎合另一群受众：设计师。实际上，那时 Web 是静态的。HTML 依然年轻，并且足够简单，非程序员也很容易学得会。所以，要让 Web 变得更动态，不管是浏览器的哪一部分，都应该让非程序员容易理解。这样 Mocha 的想法就诞生了。Mocha 要成为用于 Web 的一种脚本语言，它必须是简单、动态的，并且让非程序员容易理解。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818895" src="https://static.alili.tech/img/remote/1460000010818895" alt="Marc Andreessen" title="Marc Andreessen" style="cursor: pointer; display: inline;"></span></p>
<p>此时，JavaScript 之父 Brendan Eich走上了历史舞台。网景通讯公司雇佣 Eich，是让他开发一种 “用于浏览器的 Scheme&lt;span style="font-size: 1rem;"&gt;”&lt;/span&gt;。Scheme 是一种 Lisp 的方言，语法很简单，它动态而强大，并且本质上是函数式的。而 Web 需要类似这样的语言：语法容易掌握；动态的，以减少代码，加快开发；并且强大。Eich 看到有机会可以从事自己喜欢的事情，于是就入伙了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818896" src="https://static.alili.tech/img/remote/1460000010818896" alt="Brendan Eich" title="Brendan Eich" style="cursor: pointer;"></span></p>
<p>当时，迫于压力，必须尽快赶出一个工作原型。当时原名为 Oak 的 Java 语言正开始推动。Sun Microsystems 正大力推进 Java，网景通讯公司即将与他们达成一项协议，让 Java 可以用在浏览器上。那么为什么要开发 Mocha（JavaScript 早期的名字）呢？为什么已经有了 Java，却还要开发一个全新的语言呢？当时的想法是，Java 不适合 Mocha 的目标受众：测试脚本编写人员、业余爱好者、设计师。对于用在浏览器这个角色上来说，Java 确实太大太重了。所以当时他们的想法是让 Java 用于大型专业级组件开发；而 Mocha 将用于小型脚本任务。也就是说，Mocha 命中注定就是 Java 的脚本同伴，在某种程度上类似于 Windows 平台上 C/C++ 和 Visual Basic 之间的关系。</p>
<blockquote><p>与此同时，网景的工程师开始详细地研究 Java。他们甚至开始开发自己的 Java 虚拟机。不过，这个虚拟机很快被否决，因为它从来就没有实现与 Sun 的虚拟机的完美一致。</p></blockquote>
<p>此时有很多来自于内部的压力，要尽可能快地选择一门语言。Python、Tcl 以及 Scheme 本身都是可能的候选。所以，Eich 必须快&lt;span style="font-size: 1rem;"&gt;搞&lt;/span&gt;。不过，他比别人有两个优势：可以自由挑选适合的特性集、可以直达拍板的人。不幸的是，他也有一个大的劣势：没有时间。必须要做出很多重要的决定，而做出决定的可用时间又很短。JavaScript，即 Mocha，就是在这种背景下诞生的。几周之内，一个工作原型就推出了，然后就被集成到 Netscape Communicator 中。</p>
<p>于是，本应是用于浏览器的 Scheme，现在就大相径庭了。与 Sun 达成协议的压力，以及让 Mocha 变成 Java 的脚本同伴，束缚住了 Eich 的手脚。新语言需要采用类似 Java 的语法，对于很多常用语还采用了熟悉的语义。所以 Mocha 一点也不像 Scheme。它表面上看像是一种动态的 Java，实际上却是Scheme 和 Self 的早产私生子，但长的像 Java。</p>
<p>1995 年 5 月， Mocha 的原型被集成到 Netscape Communicator 中。很快，它被重命名为 LiveScript。当时，"live" 这个单词只是为了营销方便。1995 年 12 月，网景通讯公司和 Sun 达成协议：Mocha/LiveScript 将被重新命名为 JavaScript，它将会作为浏览器中小型客户端任务的一种脚本语言，同时 Java 将会被提升为一种更大的、开发富 Web 组件的专业工具。</p>
<p>第一版的 JavaScript 敲定了该语言中很多现在知名的特性，特别是其对象模型以及函数式特性在此版本中已经出现了。</p>
<blockquote><p>如果当时 Eich 未能按时赶出一个工作原型，很难说会发生什么。其他可选方案一点也不像 Java。Python、Tcl 和 Scheme 都与 Java 大不相同。对于 Sun 公司来说，很难接受一个与 Java 如此不同的同伴语言，或者在历史和开发上比 Java 本身早的语言。另一方面，Java 很长一段时间是 Web 的一个重要部分。如果 Sun 从没有过这样的地位，网景可能会在挑选这样一个语言上有更多的自由。这是肯定的。不过，如果就算网景自己内部能控制和开发，它会不会选择采用外部的解决方案呢？我们将永远不会知道。</p></blockquote>
<h3 id="articleHeader1">不同的实现</h3>
<p>当 Sun 和 Netscape 达成协议，将 Mocha/LiveScript 的名称改为 JavaScript 时，有个大问题被提出来了：其他实现会怎么办？实际上，尽管 Netscape 很快成为了当时首选的浏览器，不过微软也正在开发 Internet Explorer。从最开始，JavaScript 就带来了用户体验如此大的差异，竞争浏览器没办法，只能自己也整一套 JavaScript 的实现。此时（并且很长一段时间），Web 标准还不强大。所以微软实现了自己版本的 JavaScript，叫做 JScript。从名称中去掉 “Java”，是为了避免潜在的商标问题。不过，JScript 不仅仅是名称上的不同。它在实现上也略有不同，特别是与某些 DOM 函数有关的实现上有所不同，由此产生的影响一直波及到多年之后的未来。JavaScript 大战还发生除了名称和时间表之外的更多方面上，而它的怪癖正是这些大战打来的创伤。JScript 的第一个版本包含在 1996 年 8 月发布的 IE 3.0 中。</p>
<p>网景的 JavaScript 实现也采用了一个内部名称。和 Netscape Navigator 2.0 一起发布的版本被称为 Mocha。在 1996 年秋天，Eich 为了偿还匆忙推出它所欠下的技术债，将 Mocha 的大部分重写为一个更干净的实现。这个新版本的网景 JavaScript 引擎叫做 SpiderMonkey。SpiderMonkey 现在依然是 Netscape Navigator 的孙子 Firefox 中 JavaScript 引擎的名称。</p>
<p>有好几年，JScript 和 SpiderMonkey 是主要的 JavaScript 引擎。二者共同实现的功能（&lt;span style="font-size: 1rem;"&gt;并非总是兼容&lt;/span&gt;）会定义接下来几年中 Web 的样子。</p>
<h3 id="articleHeader2">主要设计特点</h3>
<p>尽管 JavaScript 是仓促之作，不过有几个强大的特性在一开始就具备了。这些特性将 JavaScript 定义为一门语言，尽管有各种怪癖，依然让它能独树一帜。</p>
<blockquote><p>是使用一门已有的语言，还是发明一门新的语言，这也不是我能决定的。来自高层工程管理人员的强制命令是这门语言必须“看起来像 Java ”。这实际上也就把 Perl、Python、 Tcl 以及 Scheme 这些已有的语言排除掉了。后来，在 1996 年，John Ousterhout 在给 Tk 做宣传时还感叹说，Tcl 错过了这样一个很好的机会。我并非骄傲，只不过是很高兴我选择 Scheme 式的一等函数以及 Self 式（尽管很怪异）的原型作为主干。至于 Java 的影响，主要是把数据分成基本类型和对象类型两种（比如字符串和 String 对象），以及引入了Y2K 日期问题，这真是不幸。 - <strong><a href="https://brendaneich.com/2008/04/popularity/" rel="nofollow noreferrer" target="_blank">Brendan Eich 的博客：关于流行</a></strong></p></blockquote>
<h4>类 JAVA 的语法</h4>
<p>尽管让 JavaScript 语法接近 Java 并非初衷，不过市场力量让它变成了这样。退一步想，即使采用与 Java 不同的语法可能会让实现某些特性更为方便，但是不可否认，采用熟悉的语法更有助于 JavaScript 的普及。</p>
<p>将如下的 Java 示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class Sample {
  public static void main(String[] args) {
    System.out.println(&quot;Hello world!&quot;);
    try {
      final MissileSilo silo = new MissileSilo(&quot;silo.weapons.mil&quot;);
      silo.launchMissile(args[0]);
    } catch(Exception e) {
      System.out.println(&quot;Unexpected exception: &quot; + e);
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Sample</span> {
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span>(<span class="hljs-params">String[] args</span>) </span>{
    System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">"Hello world!"</span>);
    <span class="hljs-keyword">try</span> {
      final MissileSilo silo = <span class="hljs-keyword">new</span> MissileSilo(<span class="hljs-string">"silo.weapons.mil"</span>);
      silo.launchMissile(args[<span class="hljs-number">0</span>]);
    } <span class="hljs-keyword">catch</span>(Exception e) {
      System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">"Unexpected exception: "</span> + e);
    }
  }
}
</code></pre>
<p>与如下（现代） JavaScript 示例做比较：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('Hello world');
try {
  const silo = new MissileSilo('silo.weapons.mil');
  silo.launchMissile(process.argv[0]);
} catch(e) {
  console.log('Unexpected exception' + e);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello world'</span>);
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> silo = <span class="hljs-keyword">new</span> MissileSilo(<span class="hljs-string">'silo.weapons.mil'</span>);
  silo.launchMissile(process.argv[<span class="hljs-number">0</span>]);
} <span class="hljs-keyword">catch</span>(e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Unexpected exception'</span> + e);
}
</code></pre>
<h4>函数作为一等对象</h4>
<p>在 JavaScript 中，函数只是又一个对象类型。它们可以像任何其它元素一样传递，可以被绑定到变量。在稍后版本的 JavaScript 中，函数甚至可以被抛出为异常。这个特性很有可能是在 JavaScript 开发时受到 Scheme 强烈影响的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myFunction = function() {
  console.log('hello');
}
otherFunction(myFunction);
myFunction.property = '1';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> myFunction = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{
  console.log('hello');
}</span>
<span class="hljs-title">otherFunction</span><span class="hljs-params">(myFunction)</span>;</span>
myFunction.<span class="hljs-keyword">property</span> = <span class="hljs-string">'1'</span>;
</code></pre>
<p>通过让函数变成一等对象，某些函数式编程模式才成为可能。例如，较新版本的 JavaScript 利用了某些函数式模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1, 2, 3];
a.forEach(function(e) {
  console.log(e);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
a.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(e);
});
</code></pre>
<p>这些模式已经被成功用于很多库，比如 <a href="http://underscorejs.org/" rel="nofollow noreferrer" target="_blank">underscore</a> 和 <a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a>。</p>
<h4>基于原型的对象模型</h4>
<p>尽管基于原型的对象模型是通过 JavaScript 得以流行的，不过它却是在 Self 语言中首次引入。Eich 对这种模型有种强烈的偏好，它足够强大，能够模仿像 Java 或 C++ 这种基于 Simula 的语言中的更传统的方式。实际上，JavaScript 之后的版本中实现的类，也只不过是在原型系统之上的语法糖。</p>
<p>JavaScript 的原型灵感来自于 Self，而 Self 的设计目标之一就是要避免 Simula 风格的对象的问题。特别是，在 Simula 的方式下，类和实例之间的对立被看到是很多固有问题的诱因。有人认为，因为类为对象实例提供某种原型，随着代码演变和逐渐变大，就越来越难让这些基类适应不可预料的新需求。通过将实例作为新对象构建的原型，这种限制就被克服了。因此，原型的概念是：一个通过提供自己的行为，填补新实例的空白的实例。如果一个原型被认为不适合于一个新对象，那么它只需要被克隆和修改，而不会影响所有其它子实例。这在基于类的方式中是挺难做到的（即，修改基类）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vehicle(maxSpeed) {
    this.maxSpeed = maxSpeed;
}

Vehicle.prototype.maxSpeed = function() {
    return this.maxSpeed;
}

function Car(maxSpeed) {
    Vehicle.call(this, maxSpeed);
}

Car.prototype = new Vehicle();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vehicle</span><span class="hljs-params">(maxSpeed)</span> </span>{
    <span class="hljs-keyword">this</span>.maxSpeed = maxSpeed;
}

Vehicle.prototype.maxSpeed = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.maxSpeed;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span><span class="hljs-params">(maxSpeed)</span> </span>{
    Vehicle.call(<span class="hljs-keyword">this</span>, maxSpeed);
}

Car.prototype = <span class="hljs-keyword">new</span> Vehicle();
</code></pre>
<p>原型的威力让 JavaScript 变得超级灵活，引发了很多带有自己对象模型的库的开发。一个流行的库 <a href="https://github.com/stampit-org/stampit" rel="nofollow noreferrer" target="_blank">Stampit</a> 就重度使用了原型系统，采用在基于类的传统方法下不可能的方式，来扩充和操作对象。</p>
<p>原型让 JavaScript 表面上看起来简单，但是给库的作者带来了自主权。</p>
<h4>大怪癖：基础类型与对象</h4>
<p>也许在匆忙开发的 JavaScript 中，最大的错误之一是某些行为类似的对象有不同的类型。例如，字符串字面量（<code>"Hello world"</code>）的类型与 <code>String</code>  对象（<code>new String('Hello world')</code>）的类型就是不相同的。这就让我们有时候不得不采用不必要的、容易混淆的类型检查。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> typeof &quot;hello world&quot;
< &quot;string&quot;

> typeof new String('hello world')
< &quot;object&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&gt; <span class="hljs-keyword">typeof</span> <span class="hljs-string">"hello world"</span>
&lt; <span class="hljs-string">"string"</span>

&gt; <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'hello world'</span>)
&lt; <span class="hljs-string">"object"</span>
</code></pre>
<p>然而，在 JavaScript 历史中，这只是个开始。它的仓促开发真真切切地导致了一些设计失误。不过，发明一种用于动态 Web 的语言的优势不能耽搁，其它的一切只有交给历史了。</p>
<blockquote><p>余下的是逆袭的、残酷的历史。JS 在客户端战胜了 Java，竞争的只有 Flash，而 Flash 支持 JS 的后代 ActionScript - <strong><a href="https://brendaneich.com/2008/04/popularity/" rel="nofollow noreferrer" target="_blank">Brendan Eich 的博客：流行</a></strong></p></blockquote>
<h3 id="articleHeader3">追忆往事：看看 Netscape Navigator 2.0 和 3.0</h3>
<p>JavaScript 的第一个公开发行版被集成到 1995 年发布的 Netscape Navigator 2.0 中。多亏了虚拟化的奇迹和过时软件网站，我们现在还可以重现那些时刻！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010818897" src="https://static.alili.tech/img/remote/1460000010818897" alt="Netscape Navigator 2.01 Gold" title="Netscape Navigator 2.01 Gold" style="cursor: pointer; display: inline;"></span></p>
<p>不幸的是，那时很多 JavaScript 的基础特性并不能用。匿名函数和原型链这两个最强大的特性就远远没有今天这么完善。不过，这些特性已经是该语言设计的一部分，会在后面几年中正确实现。需要指出的是，在这个发行版中的 JavaScript 解释器被认为是处于 alpha 状态。</p>
<p><a href="https://cdn.auth0.com/blog/js-history/netscape2.mp4" rel="nofollow noreferrer" target="_blank">Netscape Navigator 2</a></p>
<p>幸运的是，一年后，1996 年发布的 Netscape Navigator 3.0 已经有很大变化：</p>
<p><a href="https://cdn.auth0.com/blog/js-history/netscape3.mp4" rel="nofollow noreferrer" target="_blank">Netscape Navigator 3</a></p>
<p>注意视频中的错误是如何给我们发生什么事情的更多信息。这让我们推测解释器以一种特殊的方式对待 <code>prototype</code> 属性。于是我们尝试用基础的 <code>Object</code> 实例来替换对象，这样我们之后就可以修改该对象。嗯，好了，搞定了！至少在某种程度上。<code>test</code> 函数内的赋值貌似什么都没做。很显然，还有很多工作需要去做。尽管如此，这个状态的 JavaScript 对于很多任务是可用的，并且它已经开始流行了。</p>
<p>像正则表达式、JSON 和异常等特性此时依然不能用。在接下来的几年中，JavaScript 会迅猛发展。</p>
<h2 id="articleHeader4">ECMAScript: JavaScript 标准</h2>
<p>JavaScript 公开发布后的第一次重大改变是以 ECMA 标准化的形式出现。<a href="http://www.ecma-international.org/" rel="nofollow noreferrer" target="_blank">ECMA</a> 是 1961 年成立的一个行业协会，该协会只从事信息和通讯系统的标准化。</p>
<p>JavaScipt 的标准化工作始于 1996 年 11 月。标准号是 ECMA-262，负责的委员会是 TC-39。这时候，JavaScript 已经是很多页面的流行元素。这份<a href="https://web.archive.org/web/19981203070212/http://cgi.netscape.com/newsref/pr/newsrelease289.html" rel="nofollow noreferrer" target="_blank">1996 年的新闻稿</a> 说采用 JavaScript 的页面数量已达 300,000。</p>
<blockquote><p>JavaScript 和 Java 是开发 Internet 和  Intranet 应用程序的 Netscape ONE 平台的基础技术。自去年引入它们的很短一段时间内，新语言快速被开发者接受。根据 www.hotbot.com 统计，在当今互联网上有 175,000 个新 Java 小程序和超过 300,000 个使用 JavaScript 的页面。- <a href="https://web.archive.org/web/19981203070212/http://cgi.netscape.com/newsref/pr/newsrelease289.html" rel="nofollow noreferrer" target="_blank">Netscape 新闻稿</a></p></blockquote>
<p>对于这样一个年轻的语言来说，标准化是一个重要的步骤，不过依然是一个重大的号召。它将 JavaScript 开放给更广泛的受众，并且给其它潜在的实现者在语言进化上的发言权。它还充当了约束其它实现者的用途。那时候，人们担心微软或者其它人会偏离默认的实现太远，从而导致分裂。</p>
<p>由于商标的原因，ECMA 委员会不能用 JavaScript 做名字，而其它名称也有很多人不喜欢。所以经过几轮磋商后，决定这个用标准来描述的语言将被叫做 ECMAScript。现在，JavaScript 只是 ECMAScript 的商业名称。</p>
<h3 id="articleHeader5">ECMAScript 1 和 2：标准化之路</h3>
<p><a href="http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf" rel="nofollow noreferrer" target="_blank">第一个 ECMAScript 标准</a>是基于 Netscape Navigator 4 发布的 JavaScript 版本，它依然缺失重要的特性，比如正则表达式、JSON、异常，以及内置对象的重要方法。不过，在浏览器中它工作得不错。JavaScript 正开始变得越来越好。1997 年 6 月，版本 1 发布了。</p>
<p><a href="https://cdn.auth0.com/blog/js-history/netscape4.mp4" rel="nofollow noreferrer" target="_blank">Netscape Navigator 4</a></p>
<p>注意，视频中那个简单的原型和函数测试现在可以正常工作了。在 Netscape 4 中很多工作已经在幕后完成了，而 JavaScript 从受益良多。现在我们的示例基本上可以与任何当代浏览器运行的一样了。这对于 JavaScript 第一次发布成一个标准来说，是一个很好的局面。</p>
<p>标准的第二版 ECMAScript 2 的发布是用来纠正 ECMA 和 JavaScript ISO 标准（ISO/IEC 16262）之间的不一致性的，所以语言没有做任何改动。这个版本发布于 1998 年 6 月。</p>
<p>此版本的 JavaScript 的一个有趣的怪癖是，在编译时没有被捕获的错误（这通常是留作为未确定的）交给解释器任意决定如何处理。这是因为异常还不是该语言的一部分。</p>
<h3 id="articleHeader6">ECMAScript 3：第一次大变动</h3>
<p>ECMAScript 2 后工作在继续，对该语言的第一次大变更出现了。这个版本带来了：</p>
<ul>
<li>正则表达式</li>
<li>do-while 块</li>
<li>异常和 try/catch 块</li>
<li>更多有关字符串和数组的内置函数</li>
<li>格式化数字输出</li>
<li>
<code>in</code> 和 <code>instanceof</code> 运算符</li>
<li>更好的错误处理</li>
</ul>
<p><a href="http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf" rel="nofollow noreferrer" target="_blank">ECMAScript 3</a> 发布于 1999年 12 月。</p>
<p>这个版本的 ECMAScript 流传甚广。它被当时的所有主流浏览器所支持，而且多年后一直支持。即使到了今天，有些转译器依然可以在产生输出时，以这个版本的 ECMAScript 为目标。这让 ECMAScript 3 成为了很多库的基准目标，即使后来版本的标准发布了也是如此。</p>
<p>即使 JavaScript 越来越流行，它依然主要是一种客户端语言。不过，它很多新特性让它离打破这种牢笼更近。</p>
<p>2000年 11 月，Netscape Navigator 6 发布。这个版本是对过去版本的重大修订，支持 ECMAScript 3。大约在一年半后，Firefox 发布。它是一个基于 Netscape Navigator 代码库的精简版浏览器，也支持 ECMAScript 3。这些浏览器与 IE 一起，继续推动 JavaScript 的成长。</p>
<h4>AJAX 的诞生</h4>
<p>AJAX，即异步 JavaScript 和 XML，是一种在 ECMAScript 3 年代诞生的技术。虽然它并非标准的一部分，不过微软为其 IE5 浏览器实现了某些对 JavaScript 的扩展。其中之一就是 <code>XMLHttpRequest</code> 功能（以 XMLHTTP ActiveX 控件的形式）。该功能允许浏览器执行对服务器的异步 HTTP 请求，从而允许页面被即时动态更新。虽然术语 AJAX 直到几年后才被创造出来，但是这种技术早就到处在用了。</p>
<blockquote><p>术语 AJAX 是由 Adaptive Path 的联合创始人 Jesse James Garrett 在<a href="http://adaptivepath.org/ideas/ajax-new-approach-web-applications/" rel="nofollow noreferrer" target="_blank">这篇标志性博客</a>中创造出来的。</p></blockquote>
<p><code>XMLHttpRequest</code> 被证明是非常成功的，多年以后被集成到一个单独的标准中（作为 WHATWG 和 W3C 组织的一部分）。</p>
<p>由实现者给语言带来一些有趣的东西，并且在浏览器中实现，从而促进特性的发展，依然是 JavaScript 和相关的 Web 标准（比如 HTML 和 CSS）继续发展的方式。不过，那时不同派系之间沟通极少，导致拖延和分裂。平心而论，有了任何感兴趣的派系提出建议的程序，今天的 JavaScript 开发显得更有组织。</p>
<p><strong>玩玩 NETSCAPE NAVIGATOR 6</strong><br><a href="https://cdn.auth0.com/blog/js-history/netscape6.mp4" rel="nofollow noreferrer" target="_blank">Netscape Navigator 6</a></p>
<p>这个版本支持异常，之前版本在试图访问 Google 时候遇到的主要缺陷。不可思议的是，即使在今天，试图在这个版本中访问 Google，也会一个看得见的工作页面。相比之下，如果试图用 Netscape Navigator 访问 Google，就会被缺乏异常、不完整的渲染以及糟糕的布局弄的焦头烂额。Web 正在快速发展，即使在当时。</p>
<p><strong>玩玩 INTERNET EXPLORER 5</strong><br><a href="https://cdn.auth0.com/blog/js-history/ie5.mp4" rel="nofollow noreferrer" target="_blank">IE5</a></p>
<p>IE5 也能渲染当前版本的 Google。不过，众所周知，在实现某些特性上面，IE 和其它浏览器之间有很多<a href="http://wiki.ecmascript.org/lib/exe/fetch.php?id=resources%3Aresources&amp;cache=cache&amp;media=resources:jscriptdeviationsfromes3.pdf" rel="nofollow noreferrer" target="_blank">分歧</a>。这些分歧祸害了 Web 很多年，也是长期以来 Web 开发者受挫之源，因为他们经常不得不为 IE 用户实现特例。</p>
<p>实际上，要在 IE5 和 IE6 中访问 <code>XMLHttpRequest</code> 对象，必须要借助于 ActiveX。其它浏览器将其实现为原生对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">ActiveXObject</span>(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
</code></pre>
<p>毫无疑问，是 IE5 率先将 AJAX 理念变成现实。不过，直到 IE7，微软才开始遵循标准，并更贴近共识。有些老公司网站依然需要老版本的 IE 才能正确运行。</p>
<h3 id="articleHeader7">ECMAScript 3.1 和 4：斗争之年</h3>
<p>不幸的是，随后几年JavaScript 发展并不顺利。从 ECMAScript 4 的工作一开始，委员会中就开始出现了强烈的分歧。有一群人认为 JavaScript 需要一些特性来成为一种更强大的语言，这样就可以用于大型应用程序开发。这群人提出了很多特性，这些特性涉及面广，变化大。另一群人认为大型应用程序开发不是 JavaScript 适合的方向。由于缺乏一致意见，加上新提出的某些特性的复杂性，将 ECMAScript 4 的发布变得遥遥无期。</p>
<p>实际上针对 <a href="http://www.ecmascript.org/es4/spec/overview.pdf" rel="nofollow noreferrer" target="_blank">ECMAScript 4</a> 的工作在 1999 年 版本 3 刚出炉的时候，就已经开始了。网景公司内部讨论了很多有意义的特性。不过，实现这些特性的兴趣已经逐渐减弱，并且 2003 年刚过没多久，在新版本 ECMAScript 上的工作就停止了。一个临时报告发布了，有些实现者，比如 Adobe（ActionScript）和微软（JScript.NET），使用这个报告作为其引擎的基础。2005 年，在 AJAX 和 <code>XMLHttpRequest</code> 的影响之下，再度激发了新版本 JavaScript 的兴趣，TC-39 重启了工作。几年过去了，特性集变得越来越大。在 ECMAScript 4 开发的最高峰，有如下这些特性：</p>
<ul>
<li>类</li>
<li>接口</li>
<li>命名空间</li>
<li>包</li>
<li>可选的类型注解</li>
<li>可选的静态类型检查</li>
<li>结构类型</li>
<li>类型定义</li>
<li>多方法（Multimethods）</li>
<li>参数化类型</li>
<li>尾调用</li>
<li>迭代器（Iterator）</li>
<li>生成器（Generator）</li>
<li>内省</li>
<li>类型识别的异常处理器</li>
<li>常量绑定</li>
<li>块作用域</li>
<li>解构</li>
<li>函数表达式</li>
<li>数组推导式（Array comprehensions）</li>
</ul>
<p><a href="http://www.ecmascript.org/es4/spec/overview.pdf" rel="nofollow noreferrer" target="_blank">ECMAScript 4</a> 草案将这个新版本描述为<strong>编写大型应用程序</strong>而设计。如果你已熟悉 ECMAScript 6/2015，就会注意到很多来自 ECMAScript 4 的特性被重新引入了。</p>
<blockquote><p>虽然 ES3 灵活，并且在形式上很强大，但是在开发大型软件系统实践中，它的抽象能力经常是无法胜任的。由于在 Web 上采用 Ajax 编程，在应用程序中大量使用 ECMAScript 作为插件以及脚本语言，ECMAScript 程序正变得越来越大，越来越复杂。大型程序的开发可以从静态类型检查、名称隐藏、早绑定以及其它优化手段、直接支持面向对象编程等技术上大大受益，而这些都是 ES3 中所缺乏的。 - <a href="http://www.ecmascript.org/es4/spec/overview.pdf" rel="nofollow noreferrer" target="_blank">ECMAScript 4 草案</a></p></blockquote>
<p>一则有趣的历史片段是如下的 <a href="http://spreadsheets.google.com/pub?key=pFIHldY_CkszsFxMkQOReAQ&amp;gid=2" rel="nofollow noreferrer" target="_blank">Google Docs spreadsheet</a>，这个文件展示了几种 JavaScript 引擎的实现状态，以及涉及其中的派系的讨论。</p>
<p>开发 ECMAScript 4 的委员会由 Adobe、Mozilla、Opera（以非官方身份）和微软组成。Yahoo 在大部分标准和特性已经决定了后，进入了这个委员会。Doug Crockford，一个有影响力的 JavaScript 开发者，就是 Yahoo 为此送进委员会的那个人。他鼓吹他的担忧，强烈反对很多 ECMAScript 4 提议的修改。他从微软的代表那里获得了强烈的支持。Crockford 本人说到：</p>
<blockquote><p>但是结果微软的委员也有同样的担忧 - 他也认为这门语言正变得太大，失去了控制。在我加入委员会之前，他什么都没有说，因为他担心，如果微软试着阻拦这件事，就会被指责为反竞争行为。根据微软过去的表现，也许他们有一些不错的理由对此在意 - 并且很显然，这些担忧是有理有据的，因为已经发生过。但是我劝他说，微软应该做正确的事情，并且以他的声誉，他决定他应该，也能说服微软。所以微软就在 ES4 上改变了立场。 - <strong><a href="https://developer.yahoo.com/yui/theater/video.php?v=crockford-yuiconf2009-state" rel="nofollow noreferrer" target="_blank">Douglas Crockford — JavaScript 的现状和未来</a></strong></p></blockquote>
<p>开始是怀疑，后来就变成强势反对 JavaScript。微软拒绝接受 ECMAScript 4 的所有部分，并且准备采取各种必要的行动来阻止标准获得通过（甚至法律诉讼）。幸运的是，委员会中的人设法阻止了法律斗争。不过，缺乏共识有效地阻止了 ECMAScript 4 推进。</p>
<blockquote><p>微软的某些人想在这件事情上采取强硬手段，他们想开始建立书面凭据，开始走申诉程序，想做这些额外的法律程序。我可不想有这种事情。我是不同意 ES4，但是仅限于技术层面，并且我想只限于技术层面；我不想让它变得比以前更麻烦。我只是想搞清楚什么事情该做，所以我设法温和一点。但是微软依然采取了极端立场，说他们拒绝接受 ES4 的任何部分。所以事情就变成了两极分化，但是我认为两极分化是因为 ES4 团队拒绝考虑任何其它观点的结果。那时委员会没有达成共识，这是件糟糕的事情，因为标准小组必须要达成共识。一个标准不应该是有争议的。 - <strong><a href="https://developer.yahoo.com/yui/theater/video.php?v=crockford-yuiconf2009-state" rel="nofollow noreferrer" target="_blank">Douglas Crockford — JavaScript 的现状和未来</a></strong></p></blockquote>
<p>Crockford 想出一个点子来推进，就是重新弄一个标准，这个标准更简单，减少一些特性集，这样所有人都可以同意：没有新语法，只有来自使用该语言的经历中的实际提升。这个提案后来被称为 ECMAScript 3.1。</p>
<p>有一段时间，两种标准并存，并且设置了两个非正式的委员会。不过，ECMAScript 4 太复杂，没办法在面对冲突的情况完成。ECMAScript 3.1 更简单，并且尽管在 ECMA 中有斗争，它还是完成了。</p>
<p>ECMAScript 4 的结束出现在 2008 年，Eich 通过一封电子邮件，发送了一次奥斯陆会议的内容提要，详细描述了 ECMAScrpt 走向和版本 3.1 和 4 的未来。</p>
<p>这次会议的<a href="https://mail.mozilla.org/pipermail/es-discuss/2008-August/003400.html" rel="nofollow noreferrer" target="_blank">结论</a>是：</p>
<ol>
<li>与所有各方充分合作，集中精力完成 ES 3.1，到明年初确定两个执行标准。</li>
<li>下一步上的合作超出 ES3.1，会包含语法上的扩展，但是会在语义和语法创新上比 ES4 更谨慎。</li>
<li>有些 ES4 提案已经被认为对 Web 不合理，最好不予讨论：包、命名空间和早绑定。这个结论对于 Harmony 来说很关键。</li>
<li>ES4 的其它目标和理念正被改写，以保持在委员会中的一致；包括类的概念是基于已有的  ES3 概念结合提议的 ES3.1 扩展。</li>
</ol>
<p>总之，ECMAScript 4 花了近 8 年的时间开发，最后却被废弃了。这对涉及的所有人来说都是一个沉重的教训。</p>
<p>单词 "Harmony（和谐）" 出现在上面的结论中。这是将来对 JavaScript 扩展时项目的标准名称。Harmony 会是所有人都同意的方案。在 ECMAScript 3.1 发布后（以版本 5 的形式，下面我们会看到），所有 JavaScript 中要讨论的新主意都会出现在ECMAScript Harmony 中。</p>
<h4>ActionScript</h4>
<p>ActionScript 是一个基于 ECMAScript 4 早期草案的编程语言。Adobe 将其实现为 Flash 应用程序套件的一部分，也是它支持的唯一的脚本语言。这就让 Adobe 采用强硬的立场来支持 ECMAScript 4，甚至还将他们的引擎（<a href="https://en.wikipedia.org/wiki/Tamarin_%28software%29" rel="nofollow noreferrer" target="_blank">Tamarin</a>）开源发布了，以希望加快 ECMAScript 4 的采纳。Adobe 员工 Mike Chambers 爆光了一个在此事上的有趣看法:</p>
<blockquote><p>ActionScript 3 没有消失，我们基于最近的决定，没有从中删除任何东西..我们会继续跟踪 ECMAScript 规范，但是正如我们一直所做的那样，我们会创新，尽可能推动 Web 向前发展（正如我们在过去已做过的那样）- <strong><a href="http://www.mikechambers.com/blog/2008/08/14/actionscript-3-and-ecmascript-4/" rel="nofollow noreferrer" target="_blank">Mike Chamber 的博客</a></strong></p></blockquote>
<p>ActionScript 开发者期望 ActionScript 中的创新会驱动 ECMAScript 中的特性。不幸的是这事从来没有出现过，而且后来出现在 ECMAScript 2015 中的特性与 ActionScript 在很多方面不兼容。</p>
<p>有人看到这是微软尝试保持控制 ECMAScript 语言和实现的一种策略。此时，唯一可行的 ECMAScript 4 引擎是 Tamarin，所以此时占有 80% 浏览器市场份额的微软可以继续使用它自己的引擎（以及扩展），而不用承担<a href="http://blog.gskinner.com/archives/2008/08/javascript_stal.html" rel="nofollow noreferrer" target="_blank">切换到竞争对手的替代品的代价或者花时间内部实现一切</a>。 其他人只是说微软的异议仅仅是技术上的，跟来自 Yahoo 的人一样。Microsoft 的引擎 JScript 此时<a href="http://wiki.ecmascript.org/lib/exe/fetch.php?id=resources%3Aresources&amp;cache=cache&amp;media=resources:jscriptdeviationsfromes3.pdf" rel="nofollow noreferrer" target="_blank">与其它实现有很多差异</a>。有人已经看到这是保持秘密控制该语言的一种手段。</p>
<p>ActionScript 目前依然是 Flash 的开发语言，而 Flash 随着 HTML5 的到来，逐渐淡出了人们的视野。</p>
<p>如果 ECMAScript 4 已经被流行 JavaScript 引擎实现的话，ActionScript 依然与它最像：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package {
    import flash.display.Sprite;
    public class MyRectangle_v3 extends Sprite {
        private var _outlineWeight:Number;
        private var _color:uint;
        private var _xLocation:int;
        private var _yLocation:int;
        private var _rectangleWidth:int;
        private var _rectangleHeight:int;

        public function MyRectangle_v3(outlineWeight:Number, color:uint, 
                                       xLocation:int, yLocation:int, 
                                       rectangleWidth:int, rectangleHeight:int) {            
            _outlineWeight = outlineWeight;
            _color = color;
            _xLocation = xLocation;
            _yLocation = yLocation;
            _rectangleWidth = rectangleWidth;
            _rectangleHeight = rectangleHeight;
        }  

        public function draw():void{
            graphics.lineStyle(_outlineWeight);
            graphics.beginFill(_color);
            graphics.drawRect(_xLocation, _yLocation, _rectangleWidth, _rectangleHeight);
            graphics.endFill();
        }  
    }  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">package</span> {
    <span class="hljs-keyword">import</span> flash.display.Sprite;
    <span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyRectangle_v3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Sprite</span> {</span>
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_outlineWeight:</span>Number;
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_color:</span>uint;
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_xLocation:</span><span class="hljs-keyword">int</span>;
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_yLocation:</span><span class="hljs-keyword">int</span>;
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_rectangleWidth:</span><span class="hljs-keyword">int</span>;
        <span class="hljs-keyword">private</span> var <span class="hljs-string">_rectangleHeight:</span><span class="hljs-keyword">int</span>;

        <span class="hljs-keyword">public</span> function MyRectangle_v3(<span class="hljs-string">outlineWeight:</span>Number, <span class="hljs-string">color:</span>uint, 
<span class="hljs-symbol">                                       xLocation:</span><span class="hljs-keyword">int</span>, <span class="hljs-string">yLocation:</span><span class="hljs-keyword">int</span>, 
<span class="hljs-symbol">                                       rectangleWidth:</span><span class="hljs-keyword">int</span>, <span class="hljs-string">rectangleHeight:</span><span class="hljs-keyword">int</span>) {            
            _outlineWeight = outlineWeight;
            _color = color;
            _xLocation = xLocation;
            _yLocation = yLocation;
            _rectangleWidth = rectangleWidth;
            _rectangleHeight = rectangleHeight;
        }  

        <span class="hljs-keyword">public</span> function draw():<span class="hljs-keyword">void</span>{
            graphics.lineStyle(_outlineWeight);
            graphics.beginFill(_color);
            graphics.drawRect(_xLocation, _yLocation, _rectangleWidth, _rectangleHeight);
            graphics.endFill();
        }  
    }  
}
</code></pre>
<h4>E4X？什么是 E4X？</h4>
<p>E4X 是一个公认的 ECMAScript 扩展的名称。它在 ECMAScript 4 开发期间发布（2004年），所以就采用了绰号 E4X。其实际名称是 ECMAScript for XML，并被标准化为 ECMA-357。E4X 扩充了 ECMAScript，以支持对 XML 内容的原生处理和解析。在 E4X 中，XML 被当作是一种原生数据类型。它最初被主流 JavaScript 引擎（比如 SpiderMonkey）采纳，不过之后由于很少有人用而被拿掉。在 Firefox 版本 21 中被删除。</p>
<p>除了其名称中有数字 "4" 之外，E4X 与 ECMAScript 4 没多大关系。</p>
<p>如下是一个使用 E4X 的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sales = <sales vendor=&quot;John&quot;>
    <item type=&quot;peas&quot; price=&quot;4&quot; quantity=&quot;6&quot;/>
    <item type=&quot;carrot&quot; price=&quot;3&quot; quantity=&quot;10&quot;/>
    <item type=&quot;chips&quot; price=&quot;5&quot; quantity=&quot;3&quot;/>
  </sales>;

alert( sales.item.(@type == &quot;carrot&quot;).@quantity );
alert( sales.@vendor );
for each( var price in sales..@price ) {
  alert( price );
}
delete sales.item[0];
sales.item += <item type=&quot;oranges&quot; price=&quot;4&quot;/>;
sales.item.(@type == &quot;oranges&quot;).@quantity = 4;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> sales = &lt;sales vendor=<span class="hljs-string">"John"</span>&gt;
    &lt;item <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"peas"</span> price=<span class="hljs-string">"4"</span> quantity=<span class="hljs-string">"6"</span>/&gt;
    &lt;item <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"carrot"</span> price=<span class="hljs-string">"3"</span> quantity=<span class="hljs-string">"10"</span>/&gt;
    &lt;item <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"chips"</span> price=<span class="hljs-string">"5"</span> quantity=<span class="hljs-string">"3"</span>/&gt;
  &lt;/sales&gt;;

alert( sales.item.(<span class="hljs-meta">@type</span> == <span class="hljs-string">"carrot"</span>).<span class="hljs-meta">@quantity</span> );
alert( sales.<span class="hljs-meta">@vendor</span> );
<span class="hljs-keyword">for</span> each( <span class="hljs-keyword">var</span> price in sales..<span class="hljs-meta">@price</span> ) {
  alert( price );
}
delete sales.item[<span class="hljs-number">0</span>];
sales.item += &lt;item <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"oranges"</span> price=<span class="hljs-string">"4"</span>/&gt;;
sales.item.(<span class="hljs-meta">@type</span> == <span class="hljs-string">"oranges"</span>).<span class="hljs-meta">@quantity</span> = <span class="hljs-number">4</span>;
</code></pre>
<p>可以说，其它数据格式（比如 JSON）已经在 JavaScript 社区中获得了更广泛的认同，所以 E4X 出现和消失都没惹啥乱子。</p>
<h3 id="articleHeader8">ECMAScript 5：JavaScript 的重生</h3>
<p>在 ECMAScript 4 的漫长斗争之后，从 2008 年开始，社区就在注意力放在 ECMAScript 3.1 上。ECMAScript 4 被废弃。在 2009 年，ECMAScript 3.1 完成，并且涉及的各方都签字确认了。而 ECMAScript 4 即使还没有真正发布，也已经被公认为是 ECMAScript 的一个特定变种，所以委员会决定将 ECMAScript 3.1 重新命名为 ECMAScript 5，以避免混淆。</p>
<p>ECMAScript 5 成为了最受支持的 JavaScript 版本之一，也成为了很多转译器的编译目标。ECMAScript 5 被 Firefox 4 (2011)、Chrome 19 (2012)、Safari 6 (2012)、Opera 12.10 (2012) 和 Internet Explorer 10 (2012）完全支持。</p>
<p>ECMAScript 5 是对 ECMAScript 3 的一种相当谨慎的更新，它包括：</p>
<ul>
<li>Getter/setters</li>
<li>数组和对象字面量中的尾随逗号</li>
<li>保留关键字可以作为属性名</li>
<li>新的 <code>Object</code> 方法（<code>create</code>、<code>defineProperty</code>、<code>keys</code>、<code>seal</code>、<code>freeze</code>、<code>getOwnPropertyNames</code> 等等）</li>
<li>新的 <code>Array</code> 方法（<code>isArray</code>、<code>indexOf</code>、<code>every</code>、 <code>some</code>、<code>map</code>、<code>filter</code>、<code>reduce</code> 等等）</li>
<li>
<code>String.prototype.trim</code> 和属性访问</li>
<li>新的 <code>Date</code> 方法（<code>toISOString</code>、<code>now</code>、<code>toJSON</code>）</li>
<li>函数 <code>bind</code>
</li>
<li>JSON</li>
<li>不可变的全局对象（<code>undefined</code>、<code>NaN</code>、<code>Infinity</code>）</li>
<li>严格模式</li>
<li>其它次要的变更（<code>parseInt</code> 忽略前导零、抛出的函数有正确的 <code>this</code> 值，等等）</li>
</ul>
<p>所有更新都不需要语法上的修改。那时 getter 和 setter 已经被很多浏览器非正式地支持。新的 <code>Object</code> 方法通过给程序员更多工具来确保强制某些不变性，来改进“大型程序的编写”（<code>Object.seal</code>、<code>Object.freeze</code>、<code>Object.createProperty</code>）。严格模式通过阻止很多常见的错误源，在这一领域也成为一种强大的工具。额外的 <code>Array</code> 方法改进了某些函数式范式（<code>map</code>、<code>reduce</code>、<code>filter</code>、<code>every</code>、<code>some</code>）。另一个大变化是 JSON：一个受 JavaScript 启发的数据格式，现在通过 <code>JSON.stringify</code> 和 <code>JSON.parse</code> 原生支持了。其它变化基于实践经验在几个方面作出了小的改进。总而言之，ECMAScript 5 是适度的改进，帮助 JavaScrpt 成为一种对于小脚本和较大的项目来说都更可用的语言。依然有很多来自 ECMAScript 4 的好点子被废弃，并且你会看到这些好点子又通过 ECMAScript Harmony 提案回归。</p>
<p>2011 年，ECMAScript 5 以 ECMAScript 5.1 的形式又来了一次迭代。这个版本澄清了标准中一些容易引起歧义之处，但是没有提供任何新特性。所有的新特性定于在下一个 ECMAScript 的大发布中。</p>
<h3 id="articleHeader9">ECMAScript 6 (2015) 和 7 (2016): 一个通用的语言</h3>
<p>ECMAScript Harmony 提案成为将来对 JavaScript 的改进的中心。ECMAScript 4 的很多想法被永久封存了，但另外一些则又以新的面目被重新启用。ECMAScript 6，后来被重新命名为 ECMAScript 2015，被指定为带来大变化。几乎所有需要在语法上改变的更新都被放到这个版本中。不过，这次委员会达成了一致，ECMAScript 6 最终于 2015 年发布。很多浏览器厂家已经开始着手实现它的特性，但是大的变动需要点时间。直到今天，并非所有浏览器都完全覆盖 ECMAScript 2015（虽然它们已经很接近）。</p>
<p>ECMAScript 2015 的发布导致转译器的使用大幅度增加，比如 Babel 或 Traceur。甚至在它发布之前，因为这些转译器跟踪了技术委员会的进展，人们已经体验了很多 ECMAScript 2015 的好处。</p>
<p>一些 ECMAScript 4 的大特性在这个版本的 ECMAScript 中被实现。不过，实现的出发点不一样了。例如，ECMAScript 2015 中的类只不过是在原型之上的语法糖。这种思维模式减轻了新特性的过渡和开发。</p>
<p>在我们的<a href="https://auth0.com/blog/a-rundown-of-es6-features/" rel="nofollow noreferrer" target="_blank">JavaScript 2015 特性概述</a>一文中，我们对 ECMAScript 2015 的新特性做了一个全面的概述。你也可以看看 <a href="http://kangax.github.io/compat-table/es6/" rel="nofollow noreferrer" target="_blank">ECMAScript 兼容性表</a>，了解一下在实现方面我们现在的确切位置。</p>
<p>新特性小结如下：</p>
<ul>
<li>Let（词法上的）和 const（不可重新绑定的）绑定</li>
<li>箭头函数（匿名函数的简写）以及词法 this（包含作用域 this）</li>
<li>类（原型之上的语法糖）</li>
<li>对象字面量提升（计算键、短方法定义等等）</li>
<li>模板字符串</li>
<li>Promise</li>
<li>Generator、iterable、iterator 和 <code>for..of</code>
</li>
<li>函数的默认参数及剩余运算符</li>
<li>扩展语法</li>
<li>解构</li>
<li>模块语法</li>
<li>新集合（Set、Map、WeakSet、WeakMap）</li>
<li>代理和反射</li>
<li>Symbol 数据类型</li>
<li>类型化数组</li>
<li>内置支持子类化</li>
<li>有保证的尾调用优化</li>
<li>更简单的 Unicode 支持</li>
<li>二进制和八进制字面量</li>
</ul>
<p>类、let、const、promise、generator、iterators、模块，等等。这些特性都是为了把 JavaScript 带给更多受众，帮助开发大型应用程序。</p>
<p>你也许会惊讶，在 ECMAScript 4 失败之时，还有这么多特性能闯过标准化过程这一关。从这个层面上，必须得指出，ECMAScript 4 中很多最具侵入性的特性都没有被重新考虑，比如，命名空间、可选类型；同时，其它的特性被以可以通过之前的异议的方式重新考虑了，比如，让类成为原型之上的语法糖。ECMAScript 2015 依然是个苦差事，花了约 6 年完成（并且需要更长时间完全实现）。不过，这样艰巨的一个任务能被 ECMAScript 技术委员会完成，也可以看作是个好兆头。</p>
<p>2016 年，一个 ECMAScript 的小修订版发布了。这个小修订版是 TC-39 实施的新发布过程的结果。所有新提案必须经过四个阶段的过程。每个达到第四个阶段的提案有很大机会会被包含在下一个版本的 ECMAScript 中（不过委员会依然可以选择推迟将其列入议程）。这样，提案就几乎可以独立开发（不过与其它提案的交互必须在考虑之列）。提案不会中断 ECMAScript 的开发。如果一个提案已经准备列入，并且足够的提案已经达到第四阶段，那么就可以发布一个 ECMAScript 新版本。</p>
<p>2016 年发布的版本是一个相当小的版本。它包括：</p>
<ul>
<li>取幂运算符（<code>**</code>）</li>
<li><code>Array.prototype.includes</code></li>
<li>一些小的更正（generator 不能与 new 一起用等等）。</li>
</ul>
<p>不过，在 2016 年，某些有趣的提案已经达到第四阶段，所以 ECMAScript 的未来是什么呢？</p>
<h3 id="articleHeader10">未来与超越：ECMAScipt 2017 及以后</h3>
<p>也许目前进行中的最重要的第四阶段提案是 <code>async/await</code>。<code>Async/await</code> 是对 JavaScript 的一种语法扩展，可以让处理 promise 变得更爽。例如，对于如下 ECMAScript 2015 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function apiDoSomethingMoreComplex(withThis) {
    const urlA = '...';
    const urlB = '...';

    httpLib.request(urlA, withThis).then(result => {
        const parsed = parseResult(result);
        return new Promise((resolve, reject) => {
            database.update(updateStatement, parsed).then(() => {
                resolve(parsed);
            }, error => {
                reject(error);
            });
        });
    }).then(result => {
        return httpLib.request(urlB, result);
    }).then(result => {
        return worker.processData(result);
    }).then(result => {
        logger.info(`apiDoSomethingMoreComplex success (${result})`);
    }, error => {
        logger.error(error);
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apiDoSomethingMoreComplex</span>(<span class="hljs-params">withThis</span>) </span>{
    <span class="hljs-keyword">const</span> urlA = <span class="hljs-string">'...'</span>;
    <span class="hljs-keyword">const</span> urlB = <span class="hljs-string">'...'</span>;

    httpLib.request(urlA, withThis).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> parsed = parseResult(result);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            database.update(updateStatement, parsed).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                resolve(parsed);
            }, <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                reject(error);
            });
        });
    }).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> httpLib.request(urlB, result);
    }).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> worker.processData(result);
    }).then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        logger.info(<span class="hljs-string">`apiDoSomethingMoreComplex success (<span class="hljs-subst">${result}</span>)`</span>);
    }, <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        logger.error(error);
    });
}
</code></pre>
<p>把它与如下的 <code>async/await</code> 代码比较：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function apiDoSomethingMoreComplex(withThis) {
    const urlA = '...';
    const urlB = '...';

    try { 
        let result = await httpLib.request(urlA, withThis);
        const parsed = parseResult(result);
        await database.update(updateStatement, parsed);
        result = await httpLib.request(urlB, parsed);
        result = await worker.processData(result);
        logger.info(`apiDoSomethingMoreComplex success (${result})`);
    } catch(e) {
        logger.error(e);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apiDoSomethingMoreComplex</span>(<span class="hljs-params">withThis</span>) </span>{
    <span class="hljs-keyword">const</span> urlA = <span class="hljs-string">'...'</span>;
    <span class="hljs-keyword">const</span> urlB = <span class="hljs-string">'...'</span>;

    <span class="hljs-keyword">try</span> { 
        <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> httpLib.request(urlA, withThis);
        <span class="hljs-keyword">const</span> parsed = parseResult(result);
        <span class="hljs-keyword">await</span> database.update(updateStatement, parsed);
        result = <span class="hljs-keyword">await</span> httpLib.request(urlB, parsed);
        result = <span class="hljs-keyword">await</span> worker.processData(result);
        logger.info(<span class="hljs-string">`apiDoSomethingMoreComplex success (<span class="hljs-subst">${result}</span>)`</span>);
    } <span class="hljs-keyword">catch</span>(e) {
        logger.error(e);
    }
}
</code></pre>
<p>其它第四阶段的提案在范围上都是次要的：</p>
<ul>
<li>
<code>Object.values</code> 和 <code>Object.entries</code>
</li>
<li>字符串补白</li>
<li><code>Object.getOwnPropertyDescriptors</code></li>
<li>函数参数允许尾随逗号</li>
</ul>
<p>这些提案都是定于在 2017 年发布，不过委员会可能会选择自行决定推迟。不过，仅是有<code>async/await</code> 这一点就是一件让人激动的变动。</p>
<p>但是未来并非止步于此！我们可以看看<a href="https://github.com/tc39/proposals" rel="nofollow noreferrer" target="_blank">其它的一些提案</a>，了解一下更远的未来会出现什么。一些有趣的提案是：</p>
<ul>
<li>SIMD API</li>
<li>异步迭代（async/await + 迭代）</li>
<li>Generator 箭头函数</li>
<li>64 位 整型操作</li>
<li>Realm（状态分离/隔离）</li>
<li>共享内存和原子</li>
</ul>
<p>JavaScript 正越来越像一门通用的语言。不过，还有一件对 JavaScript 的未来会产生重大影响的大事情。</p>
<h4>WebAssembly</h4>
<p>如果你还没听说过 WebAssembly，就应该<a href="https://auth0.com/blog/7-things-you-should-know-about-web-assembly/" rel="nofollow noreferrer" target="_blank">读读这篇文章</a>。自 ECMAScript 5 发布以来，引发的库、框架和一般开发的激增，已经让 JavaScript 变成了对其它语言的一个有兴趣的目标。对于大的代码库，可互操作性是关键。比如说游戏。游戏开发的通用语言依然是 C++，并且它对很多架构来说都是可移植的。将一个 Windows 游戏或者电子游戏移植到浏览器上被看作是一件不可能实现的任务。不过，当前 JIT JavaScript 虚拟机不可思议的性能让这成为可能。于是，像 <a href="https://github.com/kripken/emscripten" rel="nofollow noreferrer" target="_blank">Emscripten</a> 这种 LLVM-to-JavaScript 编译器应运而生。</p>
<p>Mozilla 看到了这点，并开始着手研究让 JavaScript 变成编译器的合适目标。<a href="http://asmjs.org/spec/latest/" rel="nofollow noreferrer" target="_blank">Asm.js</a> 诞生了。Asm.js 是 JavaScript 的一个严格子集，用来作为编译器的目标。JavaScript 虚拟机可以被优化为识别这个子集，并且生成比目前可能在普通 JavaScript 代码中更好的代码。浏览器慢慢变成了一个编译应用的全新目标，而 JavaScript 在其中心。</p>
<p>不过，有些限制是 Asm.js 也不能解决了。毕竟这与 JavaScript 的用途无关，所以必须要对 JavaScript 作出改变。要让 web 成为其它语言的合适目标，就需要点不同的东西，而这正是 WebAssembly 所有的。WebAssembly 是用于 Web 的字节码。任何带有合适编译器的程序，都可以被编译为 WebAssembly，然后运行在合适的虚拟机上（JavaScript  虚拟机可以提供所需的语义）。实际上，首版 WebAssembly 就以与 Asm.js 规范一对一兼容为目标。WebAssembly 不仅带来了加载时间更快的承诺（解析字节码比解析文本更快），还带来了 Asm.js 中目前还不能用的可能优化。想像一下，JavaScript 和你已有的代码之间能完美互用的 Web。</p>
<p>乍一看，这好像是危及到 JavaScript 的发展，然而事实恰好相反。通过让其它语言和框架更容易与 JavaScript 互用，JavaScript 就可以继续发展为一门通用的语言。而WebAssembly 是为此必需的工具。</p>
<p>目前，Chrome、Firefox 和 Microsot Edge 的开发版支持 WebAsembly 规范草案，并且能够运行<a href="http://webassembly.org/demo/" rel="nofollow noreferrer" target="_blank">演示应用程序</a>。</p>
<h2 id="articleHeader11">总结</h2>
<p>JavaScript 的历史漫长而崎岖。它先被提议为用于 Web 的 Scheme，然后早早就被类 Java 的语法束缚住了。它的第一个原型在几周之内就被开发出来了。受市场之害，它在两年之内变了三个名字。然后被标准化了，同时得到一个听起来像<a href="http://www.infoworld.com/article/2653798/application-development/javascript-creator-ponders-past--future.html" rel="nofollow noreferrer" target="_blank">皮肤病</a>的名字。在三次成功的发布后，第四版陷入开发地狱约八年。开发方向一变再变，莫衷一是。然后，纯通过一个特性（AJAX）的成功，社区又重归行动一致，恢复了开发。第 4 版被废弃，一个次要版本，即人人皆知的 第 3.1 版本，被重命名为 第 5 版。第 6 版又在开发上花了很多年，不过这次委员会成功了，虽然又决定改名，但是这次是改为 2015。这个修订版很大，花了很多时间实现，但是最终，给 JavaScript 带来了新风。社区像以前一样活跃。Node.js、V8 和其它项目已经把 JavaScript 带到了一个前所未有的地步。Asm.js、WebAssembly 正进一步改进它。并且不同阶段活跃的提案都让 JavaScript 的未来像以前一样光明。这是一条漫长的路，充满崎岖，而 JavaScript 依然始终是最成功的语言之一。这本身就是一种证明。永远把赌注押在 JavaScript 上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 简史

## 原文链接
[https://segmentfault.com/a/1190000010818888](https://segmentfault.com/a/1190000010818888)

