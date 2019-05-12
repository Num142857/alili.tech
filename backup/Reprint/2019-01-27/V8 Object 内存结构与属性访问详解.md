---
title: 'V8 Object 内存结构与属性访问详解' 
date: 2019-01-27 2:31:00
hidden: true
slug: ktc291v9lq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/24982678" rel="nofollow noreferrer" target="_blank">V8 Object 内存结构与属性访问详解</a>从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与工程实践</a>，推荐阅读<a href="https://zhuanlan.zhihu.com/p/24575395" rel="nofollow noreferrer" target="_blank">2016-我的前端之路:工具化与工程化</a>。更多关于 JavaScript 引擎文章参考<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Engineering-Practices/blob/master/Syntax/JavaScript/Advanced/Engine/JavaScript-Engine-Reference.md" rel="nofollow noreferrer" target="_blank">这里</a>。</p></blockquote>
<h1 id="articleHeader0">V8 Object 内存结构与属性访问</h1>
<p>上世纪九十年代，随着网景浏览器的发行，JavaScript 首次进入人们的视线。之后随着 AJAX 的大规模应用与富客户端、单页应用时代的到来，JavaScript 在 Web 开发中占据了越来越重要的地位。在早期的 JavaScript 引擎中，性能越发成为了开发网页应用的瓶颈。而 V8 引擎设计的目标就是为了保证大型 JavaScript 应用的执行效率，在<a href="https://developers.google.com/v8/benchmarks" rel="nofollow noreferrer" target="_blank">很多测试</a>中可以明显发现 V8 的性能优于 JScript (Internet Explorer), SpiderMonkey (Firefox), 以及 JavaScriptCore(Safari). 根据 V8 的官方文档介绍，其主要是从属性访问、动态机器码生成以及高效的垃圾回收这三个方面着手性能优化。Obejct 当属 JavaScript 最重要的数据类型之一，本文我们对其内部结构进行详细阐述。其继承关系图如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008188651?w=835&amp;h=924" src="https://static.alili.tech/img/remote/1460000008188651?w=835&amp;h=924" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在 V8 中新分配的 JavaScript 对象结构如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ class / map ] -> ... ; 指向内部类
[ properties  ] -> [empty array]
[ elements    ] -> [empty array] ; 数值类型名称的属性
[ reserved #1 ] -\
[ reserved #2 ]  |
[ reserved #3 ]  }- in object properties,即预分配的内存空间
...............  |
[ reserved #N ] -/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>[ <span class="hljs-keyword">class</span> / map ] -&gt; ... ; 指向内部类
[ properties  ] -&gt; [empty array]
[ elements    ] -&gt; [empty array] ; 数值类型名称的属性
[ reserved #<span class="hljs-number">1</span> ] -\
[ reserved #<span class="hljs-number">2</span> ]  |
[ reserved #<span class="hljs-number">3</span> ]  }- <span class="hljs-keyword">in</span> object properties,即预分配的内存空间
...............  |
[ reserved #N ] -/</code></pre>
<p>在创建新的对象时，V8 会创建某个预分配的内存区域来存放所谓的 in-object 属性，预分配区域的大小由构造函数中的参数数目决定（<code>this.field = expr</code>）。当你打算向对象中添加某个新属性时，V8 首先会尝试放入所谓的 in-order 槽位中，当 in-object 槽位过载之后，V8 会尝试将新的属性添加到 out-of-object 属性列表。而属性名与属性下标的映射关系即存放在所谓隐藏类中，譬如<code>{ a: 1, b: 2, c: 3, d: 4}</code>对象的存储方式可能如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ class       ] -> [a: in obj #1, b: in obj #2, c: out obj #1, d: out obj #2]
[ properties  ] -> [  3  ][  4  ] ; this is linear array
[ elements    ]    
[ 1           ]
[ 2           ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>[ class       ] -&gt; [a: in obj #1, b: in obj #2, c: out obj #1, d: out obj #2]
[<span class="hljs-string"> properties  </span>] -&gt; [<span class="hljs-string">  3  </span>][<span class="hljs-symbol">  4  </span>] ; this is linear array
[ elements    ]    
[ 1           ]
[ 2           ]</code></pre>
<p>随着属性数目的增加，V8 会转回到传统的字典模式/哈希表模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ class       ] -> [ OBJECT IS IN DICTIONARY MODE ]
[ properties  ] -> [a: 1, b: 2, c: 3, d: 4, e: 5] ; this is classical hash table
[ elements    ]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code><span class="hljs-comment">[ class       ]</span> -&gt; <span class="hljs-comment">[ OBJECT IS IN DICTIONARY MODE ]</span>
<span class="hljs-comment">[ properties  ]</span> -&gt; <span class="hljs-comment">[a: 1, b: 2, c: 3, d: 4, e: 5]</span> ; this <span class="hljs-keyword">is</span> classical hash table
<span class="hljs-comment">[ elements    ]</span>  </code></pre>
<h2 id="articleHeader1">Reference</h2>
<ul>
<li><p><a href="https://github.com/v8/v8/wiki/Design%20Elements" rel="nofollow noreferrer" target="_blank">V8 Design Elements</a></p></li>
<li><p><a href="http://www.jayconrod.com/posts/52/a-tour-of-v8-object-representation" rel="nofollow noreferrer" target="_blank">A tour of V8: object representation</a></p></li>
<li><p><a href="http://thlorenz.com/talks/demystifying-v8/talk.pdf" rel="nofollow noreferrer" target="_blank">Demystifying v8 and JavaScript Performance</a></p></li>
<li><p><a href="https://v8docs.nodesource.com/node-7.2/db/d85/classv8_1_1_object.html" rel="nofollow noreferrer" target="_blank">V8 Docs:Object Class Reference</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/7413168/how-does-v8-manage-the-memory-of-object-instances" rel="nofollow noreferrer" target="_blank">How does V8 manage the memory of object instances?</a></p></li>
</ul>
<h1 id="articleHeader2">Property Name:属性名</h1>
<p>作为动态语言，JavaScript 允许我们以非常灵活的方式来定义对象，譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.prop
obj[&quot;prop&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>obj<span class="hljs-selector-class">.prop</span>
obj[<span class="hljs-string">"prop"</span>]</code></pre>
<p>参照 JavaScript 定义规范中的描述，属性名恒为字符串，即使你使用了某个非字符串的名字，也会隐式地转化为字符串类型。譬如你创建的是个数组，以数值下标进行访问，然而 V8 还是将其转化为了字符串再进行索引，因此以下的方式就会获得相同的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj[1];    //
obj[&quot;1&quot;];  // names for the same property
obj[1.0];  //

var o = { toString: function () { return &quot;-1.5&quot;; } };

obj[-1.5];  // also equivalent
obj[o];     // since o is converted to string" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>obj[<span class="hljs-number">1</span>];    <span class="hljs-comment">//</span>
obj[<span class="hljs-string">"1"</span>];  <span class="hljs-comment">// names for the same property</span>
obj[<span class="hljs-number">1.0</span>];  <span class="hljs-comment">//</span>

<span class="hljs-keyword">var</span> o = { toString: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">"-1.5"</span>; } };

obj[<span class="hljs-number">-1.5</span>];  <span class="hljs-comment">// also equivalent</span>
obj[o];     <span class="hljs-comment">// since o is converted to string</span></code></pre>
<p>而 JavaScript 中的 Array 只是包含了额外的<code>length</code>属性的对象而已，<code>length</code>会返回当前最大下标加一的结果（此时字符串下标会被转化为数值类型计算）:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Array();
a[100] = &quot;foo&quot;;
a.length;  //101
a[undefined] = 'a';
a.length; //0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
a[<span class="hljs-number">100</span>] = <span class="hljs-string">"foo"</span>;
a.length;  <span class="hljs-comment">//101</span>
a[<span class="hljs-literal">undefined</span>] = <span class="hljs-string">'a'</span>;
a.length; <span class="hljs-comment">//0</span></code></pre>
<p><code>Function</code>本质上也是对象，只不过<code>length</code>属性会返回参数的长度而已：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> a = ()=>{}
[Function: a]
> a.length
0
> a = (b)=>{}
[Function: a]
> a.length
1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&gt; <span class="hljs-selector-tag">a</span> = ()=&gt;{}
[Function: a]
&gt; <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.length</span>
<span class="hljs-number">0</span>
&gt; <span class="hljs-selector-tag">a</span> = (b)=&gt;{}
[Function: a]
&gt; <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.length</span>
<span class="hljs-number">1</span></code></pre>
<h1 id="articleHeader3">In-Object Properties &amp; Fast Property Access:对象内属性与访问优化</h1>
<p>作为动态类型语言，JavaScript 中的对象属性可以在运行时动态地增删，意味着整个对象的结构会频繁地改变。大部分 JavaScript 引擎倾向于使用字典类型的数据结构来存放对象属性（ Object Properties），每次进行属性访问的时候引擎都需要在内层中先动态定位属性对应的下标地址然后读取值。这种方式实现上比较容易，但是会导致较差的性能表现。其他的类似于 Java 与 Smalltalk 这样的静态语言中，成员变量在编译阶段即确定了其在内存中的固定偏移地址，进行属性访问的时候只需要单指令从内存中加载即可。而 V8 则利用动态创建隐藏内部类的方式动态地将属性的内存地址记录在对象内，从而提升整体的属性访问速度。总结而言，每当为某个对象添加新的属性时，V8 会自动修正其隐藏内部类。我们先通过某个<a href="https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate/blob/master/playground/v8/hidden_classes.js" rel="nofollow noreferrer" target="_blank">实验</a>来感受下隐藏类的存在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var PROPERTIES = 10000000;
var o = {};

var start = +new Date;

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date - start);

function O(size) {
  for (var i = 0; i < size; i++) {
    this[i] = null;
  }
}

var o = new O(PROPERTIES);

var start = +new Date;

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date - start);

class OClass {

    constructor(size){
        for (var i = 0; i < size; i++) {
            this[i] = null;
        }
    }

}

var o = new OClass(PROPERTIES);

var start = +new Date;

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date - start);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> PROPERTIES = <span class="hljs-number">10000000</span>;
<span class="hljs-keyword">var</span> o = {};

<span class="hljs-keyword">var</span> start = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; PROPERTIES; i++) {
  o[i] = i;
}

<span class="hljs-built_in">console</span>.log(+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - start);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">O</span>(<span class="hljs-params">size</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; size; i++) {
    <span class="hljs-keyword">this</span>[i] = <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> O(PROPERTIES);

<span class="hljs-keyword">var</span> start = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; PROPERTIES; i++) {
  o[i] = i;
}

<span class="hljs-built_in">console</span>.log(+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - start);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OClass</span> </span>{

    <span class="hljs-keyword">constructor</span>(size){
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; size; i++) {
            <span class="hljs-keyword">this</span>[i] = <span class="hljs-literal">null</span>;
        }
    }

}

<span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> OClass(PROPERTIES);

<span class="hljs-keyword">var</span> start = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; PROPERTIES; i++) {
  o[i] = i;
}

<span class="hljs-built_in">console</span>.log(+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - start);</code></pre>
<p>该程序的执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Babel 下结果
385
37
49
// Chrome 下结果
416
32
31" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// Babel 下结果</span>
<span class="hljs-number">385</span>
<span class="hljs-number">37</span>
<span class="hljs-number">49</span>
<span class="hljs-comment">// Chrome 下结果</span>
<span class="hljs-number">416</span>
<span class="hljs-number">32</span>
<span class="hljs-number">31</span></code></pre>
<p>第一种实现中，每次为对象<code>o</code>设置新的属性时，V8 都会创建新的隐藏内部类（内部称为 Map）来存储新的内存地址以优化属性查找速度。而第二种实现时，我们在创建新的对象时即初始化了内部类，这样在赋值属性时 V8 以及能够高性能地定位这些属性。第三种实现则是用的 ES6 Class，在纯正的 V8 下性能最好。接下来我们具体阐述下隐藏类的工作原理，假设我们定义了描述点的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y) {
  this.x = x;
  this.y = y;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span><span class="hljs-params">(x, y)</span> </span>{
  <span class="hljs-keyword">this</span>.x = x;
  <span class="hljs-keyword">this</span>.y = y;
}</code></pre>
<p>当我们执行<code>new Point(x,y)</code>语句时，V8 会创建某个新的<code>Point</code>对象。创建的过程中，V8 首先会创建某个所谓<code>C0</code>的隐藏内部类，因为尚未为对象添加任何属性，此时隐藏类还是空的：<br><span class="img-wrap"><img data-src="/img/remote/1460000008188652?w=474&amp;h=117" src="https://static.alili.tech/img/remote/1460000008188652?w=474&amp;h=117" alt="" title="" style="cursor: pointer; display: inline;"></span><br>接下来调用首个赋值语句<code>this.x = x;</code>为当前<code>Point</code>对象创建了新的属性<code>x</code>，此时 V8 会基于<code>C0</code>创建另一个隐藏类<code>C1</code>来替换<code>C0</code>，然后在<code>C1</code>中存放对象属性<code>x</code>的内存位置信息：<br><span class="img-wrap"><img data-src="/img/remote/1460000008188653?w=474&amp;h=198" src="https://static.alili.tech/img/remote/1460000008188653?w=474&amp;h=198" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里从<code>C0</code>到<code>C1</code>的变化称为转换（Transitions），当我们为同一个类型的对象添加新的属性时，并不是每次都会创建新的隐藏类，而是多个对象会共用某个符合转换条件的隐藏类。接下来继续执行<code>this.y = y</code> 这一条语句，会为<code>Point</code>对象创建新的属性。此时 V8 会进行以下步骤：</p>
<ul>
<li><p>基于<code>C1</code>创建另一个隐藏类<code>C1</code>，并且将关于属性<code>y</code>的位置信息写入到<code>C2</code>中。</p></li>
<li><p>更新<code>C1</code>为其添加转换信息，即当为<code>Point</code>对象添加属性 <code>y</code> 时，应该转换到隐藏类 <code>C2</code>。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008188654?w=474&amp;h=237" src="https://static.alili.tech/img/remote/1460000008188654?w=474&amp;h=237" alt="" title="" style="cursor: pointer;"></span><br>整个过程的伪代码描述如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Point object is allocated>

  Class C0
    &quot;x&quot;: TRANSITION to C1 at offset 0

this.x = x;

  Class C1
    &quot;x&quot;: FIELD at offset 0
    &quot;y&quot;: TRANSITION to C2 at offset 1

this.y = y;

  Map C2
    &quot;x&quot;: FIELD at offset 0
    &quot;y&quot;: FIELD at offset 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;Point object <span class="hljs-keyword">is</span> allocated&gt;

  Class C0
    <span class="hljs-string">"x"</span>: TRANSITION <span class="hljs-keyword">to</span> C1 <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>

this.x = x;

  Class C1
    <span class="hljs-string">"x"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>
    <span class="hljs-string">"y"</span>: TRANSITION <span class="hljs-keyword">to</span> C2 <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">1</span>

this.y = y;

  Map C2
    <span class="hljs-string">"x"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>
    <span class="hljs-string">"y"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">1</span></code></pre>
<h2 id="articleHeader4">Reused Hidden Class:重复使用的隐藏类</h2>
<p>我们在上文中提及，如果每次添加新的属性时都创建新的隐藏类无疑是极大的性能浪费，实际上当我们再次创建新的<code>Point</code>对象时，V8 并不会创建新的隐藏类而是使用已有的，过程描述如下：</p>
<ul>
<li><p>初始化新的<code>Point</code>对象，并将隐藏类指向<code>C0</code>。</p></li>
<li><p>添加<code>x</code>属性时，遵循隐藏类的转换原则指向到<code>C1</code> , 并且根据<code>C1</code>指定的偏移地址写入<code>x</code>。</p></li>
<li><p>添加<code>y</code>属性时，遵循隐藏类的转换原则指向到<code>C2</code>，并且根据<code>C2</code>指定的偏移地址写入<code>y</code>。</p></li>
</ul>
<p>另外我们在上文以链表的方式描述转换，实际上真实场景中 V8 会以树的结构来描述转换及其之间的关系，这样就能够用于类似于下面的属性一致而赋值顺序颠倒的场景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y, reverse) {
  if (reverse) {
    this.x = x;
    this.y = y;
  } else {
    this.y = x;
    this.x = y;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function Point(x, y, reverse) {
  <span class="hljs-keyword">if</span> (reverse) {
    <span class="hljs-keyword">this</span>.x = x;
    <span class="hljs-keyword">this</span>.y = y;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.y = x;
    <span class="hljs-keyword">this</span>.x = y;
  }
}</code></pre>
<h2 id="articleHeader5">Methods &amp; Prototypes:方法与原型</h2>
<p>JavaScript 中并没有类的概念（语法糖除外），因此对于方法的调用处理会难于 C++ 或者 Java。下面这个例子中，<code>distance</code>方法可以被看做<code>Point</code>的普通属性之一，不过其并非原始类型的数据，而是指向了另一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y) {
  this.x = x;
  this.y = y;
  this.distance = PointDistance;
}

function PointDistance(p) {
  var dx = this.x - p.x;
  var dy = this.y - p.y;
  return Math.sqrt(dx*dx + dy*dy);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">this</span>.x = x;
  <span class="hljs-keyword">this</span>.y = y;
  <span class="hljs-keyword">this</span>.distance = PointDistance;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PointDistance</span>(<span class="hljs-params">p</span>) </span>{
  <span class="hljs-keyword">var</span> dx = <span class="hljs-keyword">this</span>.x - p.x;
  <span class="hljs-keyword">var</span> dy = <span class="hljs-keyword">this</span>.y - p.y;
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.sqrt(dx*dx + dy*dy);
}</code></pre>
<p>如果我们像上文介绍的普通的 in-object 域一样来处理<code>distance</code>属性，那么无疑会带来较大的内存浪费，毕竟每个对象都要存放一段外部函数引用（Reference 的内存占用往往大于原始类型）。C++ 中则是以指向多个虚函数的虚函数表（V-Tables）解决这个问题。每个包含虚函数的类的实例都会指向这个虚函数表，当调用某个虚函数时，程序会自动从虚函数表中加载该函数的地址信息然后转向到该地址调用。V8 中我们已经使用了隐藏类这一共享数据结构，因此可以很方便地改造下就可以。我们引入了所谓 Constant Functions 的概念，某个 Constant Function 即代表了对象中仅包含某个名字，而具体的属性值存放在描述符本身的概念：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Point object is allocated>

  Class C0
    &quot;x&quot;: TRANSITION to C1 at offset 0

this.x = x;

  Class C1
    &quot;x&quot;: FIELD at offset 0
    &quot;y&quot;: TRANSITION to C2 at offset 1

this.y = y;

  Class C2
    &quot;x&quot;: FIELD at offset 0
    &quot;y&quot;: FIELD at offset 1
    &quot;distance&quot;: TRANSITION to C3 <PointDistance>

this.distance = PointDistance;

  Class C3
    &quot;x&quot;: FIELD at offset 0
    &quot;y&quot;: FIELD at offset 1
    &quot;distance&quot;: CONSTANT_FUNCTION <PointDistance>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;Point object <span class="hljs-keyword">is</span> allocated&gt;

  Class C0
    <span class="hljs-string">"x"</span>: TRANSITION <span class="hljs-keyword">to</span> C1 <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>

this.x = x;

  Class C1
    <span class="hljs-string">"x"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>
    <span class="hljs-string">"y"</span>: TRANSITION <span class="hljs-keyword">to</span> C2 <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">1</span>

this.y = y;

  Class C2
    <span class="hljs-string">"x"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>
    <span class="hljs-string">"y"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">1</span>
    <span class="hljs-string">"distance"</span>: TRANSITION <span class="hljs-keyword">to</span> C3 &lt;PointDistance&gt;

this.distance = PointDistance;

  Class C3
    <span class="hljs-string">"x"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">0</span>
    <span class="hljs-string">"y"</span>: FIELD <span class="hljs-keyword">at</span> <span class="hljs-built_in">offset</span> <span class="hljs-number">1</span>
    <span class="hljs-string">"distance"</span>: CONSTANT_FUNCTION &lt;PointDistance&gt;</code></pre>
<p>注意，在这里如果我们将<code>PointDistance </code>重定义指向了其他函数，那么这个转换也会自动失效，V8 会创建新的隐藏类。另一种解决这个问题的方法就是使用原型，每个构造函数都会有所谓的<code>Prototype</code>属性，该属性会自动成为对象的原型链上的一环，上面的例子可以改写为以下方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.distance = function(p) {
  var dx = this.x - p.x;
  var dy = this.y - p.y;
  return Math.sqrt(dx*dx + dy*dy);
}

...
var u = new Point(1, 2);
var v = new Point(3, 4);
var d = u.distance(v);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">this</span>.x = x;
  <span class="hljs-keyword">this</span>.y = y;
}

Point.prototype.distance = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">p</span>) </span>{
  <span class="hljs-built_in">var</span> dx = <span class="hljs-keyword">this</span>.x - p.x;
  <span class="hljs-built_in">var</span> dy = <span class="hljs-keyword">this</span>.y - p.y;
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.sqrt(dx*dx + dy*dy);
}

...
<span class="hljs-built_in">var</span> u = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
<span class="hljs-built_in">var</span> v = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>);
<span class="hljs-built_in">var</span> d = u.distance(v);</code></pre>
<p>V8 同样会把原型链上的方法在隐藏类中映射为 Constant Function 描述符，而调用原型方法往往会比调用自身方法慢一点，毕竟引擎不仅要去扫描自身的隐藏类，还要去扫描原型链上对象的隐藏类才能得知真正的函数调用地址。不过这个不会对于代码的性能造成明显的影响，因此写代码的时候也不必小心翼翼的避免这个。</p>
<h1 id="articleHeader6">Dictionary Mode</h1>
<p>对于复杂属性的对象，V8 会使用所谓的字典模式（Dictionary Mode）来存储对象，也就是使用哈希表来存放键值信息，这种方式存储开销会小于上文提到的包含了隐藏类的方式，不过查询速度会远小于前者。初始状态下，哈希表中的所有的键与值都被设置为了<code>undefined</code>，当插入新的数据时，计算得出的键名的哈希值的低位会被当做初始的存储索引地址。如果此地址已经被占用了，V8 会尝试向下一个地址进行插入，直到插入成功，伪代码表述如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 插入
insert(table, key, value):
  table = ensureCapacity(table, length(table) + 1)
  code = hash(key)
  n = capacity(table)
  index = code (mod n)
  while getKey(table, index) is not undefined:
    index += 1 (mod n)
  set(table, index, key, value)

//查找
lookup(table, key):
  code = hash(key)
  n = capacity(table)
  index = code (mod n)
  k = getKey(table, index)
  while k is not null or undefined
        and k != key: 
    index += 1 (mod n)
    k = getKey(table, index)
  if k == key:
    return getValue(table, index)
  else:
    return undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// 插入
<span class="hljs-keyword">insert</span>(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">key</span>, <span class="hljs-keyword">value</span>):
  <span class="hljs-keyword">table</span> = ensureCapacity(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">length</span>(<span class="hljs-keyword">table</span>) + <span class="hljs-number">1</span>)
  code = <span class="hljs-keyword">hash</span>(<span class="hljs-keyword">key</span>)
  n = <span class="hljs-keyword">capacity</span>(<span class="hljs-keyword">table</span>)
  <span class="hljs-keyword">index</span> = code (<span class="hljs-keyword">mod</span> n)
  <span class="hljs-keyword">while</span> getKey(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">index</span>) <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> undefined:
    <span class="hljs-keyword">index</span> += <span class="hljs-number">1</span> (<span class="hljs-keyword">mod</span> n)
  <span class="hljs-keyword">set</span>(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">index</span>, <span class="hljs-keyword">key</span>, <span class="hljs-keyword">value</span>)

//查找
lookup(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">key</span>):
  code = <span class="hljs-keyword">hash</span>(<span class="hljs-keyword">key</span>)
  n = <span class="hljs-keyword">capacity</span>(<span class="hljs-keyword">table</span>)
  <span class="hljs-keyword">index</span> = code (<span class="hljs-keyword">mod</span> n)
  k = getKey(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">index</span>)
  <span class="hljs-keyword">while</span> k <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">null</span> <span class="hljs-keyword">or</span> undefined
        <span class="hljs-keyword">and</span> k != <span class="hljs-keyword">key</span>: 
    <span class="hljs-keyword">index</span> += <span class="hljs-number">1</span> (<span class="hljs-keyword">mod</span> n)
    k = getKey(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">index</span>)
  <span class="hljs-keyword">if</span> k == <span class="hljs-keyword">key</span>:
    <span class="hljs-keyword">return</span> getValue(<span class="hljs-keyword">table</span>, <span class="hljs-keyword">index</span>)
  <span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">return</span> undefined</code></pre>
<p>尽管计算键名哈希值与比较的速度会比较快，但是每次读写属性的时候都进行这么多步骤无疑会大大拉低速度，因此 V8 尽可能地会避免使用这种存储方式。</p>
<h1 id="articleHeader7">Fast Elements:数值下标的属性</h1>
<p>V8 中将属性名为非负整数（0、1、2……）的属性称为Element，每个对象都有一个指向Element数组的指针，其存放和其他属性是分开的。注意，隐藏类中并不包含 Element 的描述符，但可能包含其它有着不同 Element 类型的同一种隐藏类的转换描述符。大多数情况下，对象都会有 Fast Element，也就是说这些 Element 以连续数组的形式存放。有三种不同的 Fast Element：</p>
<ul>
<li><p>Fast small integers</p></li>
<li><p>Fast doubles</p></li>
<li><p>Fast values</p></li>
</ul>
<p>根据标准，JavaScript 中的所有数字都理应以64位浮点数形式出现。因此 V8 尽可能以31位带符号整数来表达数字（最低位总是0，这有助于垃圾回收器区分数字和指针）。因此含有Fast small integers类型的对象，其 Element 类型只会包含这样的数字。如果需要存储小数、大整数或其他特殊值，如-0，则需要将数组提升为 Fast doubles。于是这引入了潜在的昂贵的复制-转换操作，但通常不会频繁发生。Fast doubles 仍然是很快的，因为所有的数字都是无封箱存储的。但如果我们要存储的是其他类型，比如字符串或者对象，则必须将其提升为普通的 Fast Element 数组。</p>
<p>JavaScript 不提供任何确定存储元素多少的办法。你可能会说像这样的办法，<code>new Array(100)</code>，但实际上这仅仅针对<code>Array</code>构造函数有用。如果你将值存在一个不存在的下标上，V8会重新开辟更大的内存，将原有元素复制到新内存。V8 可以处理带空洞的数组，也就是只有某些下标是存有元素，而期间的下标都是空的。其内部会安插特殊的哨兵值，因此试图访问未赋值的下标，会得到<code>undefined</code>。当然，Fast Element 也有其限制。如果你在远远超过当前数组大小的下标赋值，V8 会将数组转换为字典模式，将值以哈希表的形式存储。这对于稀疏数组来说很有用，但性能上肯定打了折扣，无论是从转换这一过程来说，还是从之后的访问来说。如果你需要复制整个数组，不要逆向复制（索引从高到低），因为这几乎必然触发字典模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 这会大大降低大数组的性能
    function copy(a) {
        var b = new Array();
        for (var i = a.length - 1; i >= 0; i--)
            b[i] = a[i];
        return b;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 这会大大降低大数组的性能</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copy</span>(<span class="hljs-params">a</span>) </span>{
        <span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = a.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--)
            b[i] = a[i];
        <span class="hljs-keyword">return</span> b;
    }</code></pre>
<p>由于普通的属性和数字式属性分开存放，即使数组退化为字典模式，也不会影响到其他属性的访问速度（反之亦然）。</p>
<h1 id="articleHeader8">Object 代码声明</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// https://v8docs.nodesource.com/node-7.2/d4/da0/v8_8h_source.html#l02660
class V8_EXPORT Object : public Value {
  public:
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;,
                     bool Set(Local<Value> key, Local<Value> value));
   V8_WARN_UNUSED_RESULT Maybe<bool> Set(Local<Context> context,
                                         Local<Value> key, Local<Value> value);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;,
                     bool Set(uint32_t index, Local<Value> value));
   V8_WARN_UNUSED_RESULT Maybe<bool> Set(Local<Context> context, uint32_t index,
                                         Local<Value> value);
 
   // Implements CreateDataProperty (ECMA-262, 7.3.4).
   //
   // Defines a configurable, writable, enumerable property with the given value
   // on the object unless the property already exists and is not configurable
   // or the object is not extensible.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe<bool> CreateDataProperty(Local<Context> context,
                                                        Local<Name> key,
                                                        Local<Value> value);
   V8_WARN_UNUSED_RESULT Maybe<bool> CreateDataProperty(Local<Context> context,
                                                        uint32_t index,
                                                        Local<Value> value);
 
   // Implements DefineOwnProperty.
   //
   // In general, CreateDataProperty will be faster, however, does not allow
   // for specifying attributes.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe<bool> DefineOwnProperty(
       Local<Context> context, Local<Name> key, Local<Value> value,
       PropertyAttribute attributes = None);
 
   // Sets an own property on this object bypassing interceptors and
   // overriding accessors or read-only properties.
   //
   // Note that if the object has an interceptor the property will be set
   // locally, but since the interceptor takes precedence the local property
   // will only be returned if the interceptor doesn't return a value.
   //
   // Note also that this only works for named properties.
   V8_DEPRECATED(&quot;Use CreateDataProperty / DefineOwnProperty&quot;,
                 bool ForceSet(Local<Value> key, Local<Value> value,
                               PropertyAttribute attribs = None));
   V8_DEPRECATE_SOON(&quot;Use CreateDataProperty / DefineOwnProperty&quot;,
                     Maybe<bool> ForceSet(Local<Context> context,
                                          Local<Value> key, Local<Value> value,
                                          PropertyAttribute attribs = None));
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, Local<Value> Get(Local<Value> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> Get(Local<Context> context,
                                               Local<Value> key);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, Local<Value> Get(uint32_t index));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> Get(Local<Context> context,
                                               uint32_t index);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 PropertyAttribute GetPropertyAttributes(Local<Value> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute> GetPropertyAttributes(
       Local<Context> context, Local<Value> key);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 Local<Value> GetOwnPropertyDescriptor(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetOwnPropertyDescriptor(
       Local<Context> context, Local<String> key);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, bool Has(Local<Value> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> Has(Local<Context> context,
                                         Local<Value> key);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, bool Delete(Local<Value> key));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> Delete(Local<Context> context, Local<Value> key);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;, bool Has(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe<bool> Has(Local<Context> context, uint32_t index);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;, bool Delete(uint32_t index));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> Delete(Local<Context> context, uint32_t index);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 bool SetAccessor(Local<String> name,
                                  AccessorGetterCallback getter,
                                  AccessorSetterCallback setter = 0,
                                  Local<Value> data = Local<Value>(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 bool SetAccessor(Local<Name> name,
                                  AccessorNameGetterCallback getter,
                                  AccessorNameSetterCallback setter = 0,
                                  Local<Value> data = Local<Value>(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> SetAccessor(Local<Context> context, Local<Name> name,
                           AccessorNameGetterCallback getter,
                           AccessorNameSetterCallback setter = 0,
                           MaybeLocal<Value> data = MaybeLocal<Value>(),
                           AccessControl settings = DEFAULT,
                           PropertyAttribute attribute = None);
 
   void SetAccessorProperty(Local<Name> name, Local<Function> getter,
                            Local<Function> setter = Local<Function>(),
                            PropertyAttribute attribute = None,
                            AccessControl settings = DEFAULT);
 
   Maybe<bool> HasPrivate(Local<Context> context, Local<Private> key);
   Maybe<bool> SetPrivate(Local<Context> context, Local<Private> key,
                          Local<Value> value);
   Maybe<bool> DeletePrivate(Local<Context> context, Local<Private> key);
   MaybeLocal<Value> GetPrivate(Local<Context> context, Local<Private> key);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, Local<Array> GetPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetPropertyNames(
       Local<Context> context);
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetPropertyNames(
       Local<Context> context, KeyCollectionMode mode,
       PropertyFilter property_filter, IndexFilter index_filter);
 
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;, Local<Array> GetOwnPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetOwnPropertyNames(
       Local<Context> context);
 
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetOwnPropertyNames(
       Local<Context> context, PropertyFilter filter);
 
   Local<Value> GetPrototype();
 
   V8_DEPRECATED(&quot;Use maybe version&quot;, bool SetPrototype(Local<Value> prototype));
   V8_WARN_UNUSED_RESULT Maybe<bool> SetPrototype(Local<Context> context,
                                                  Local<Value> prototype);
 
   Local<Object> FindInstanceInPrototypeChain(Local<FunctionTemplate> tmpl);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;, Local<String> ObjectProtoToString());
   V8_WARN_UNUSED_RESULT MaybeLocal<String> ObjectProtoToString(
       Local<Context> context);
 
   Local<String> GetConstructorName();
 
   Maybe<bool> SetIntegrityLevel(Local<Context> context, IntegrityLevel level);
 
   int InternalFieldCount();
 
   V8_INLINE static int InternalFieldCount(
       const PersistentBase<Object>&amp; object) {
     return object.val_->InternalFieldCount();
   }
 
   V8_INLINE Local<Value> GetInternalField(int index);
 
   void SetInternalField(int index, Local<Value> value);
 
   V8_INLINE void* GetAlignedPointerFromInternalField(int index);
 
   V8_INLINE static void* GetAlignedPointerFromInternalField(
       const PersistentBase<Object>&amp; object, int index) {
     return object.val_->GetAlignedPointerFromInternalField(index);
   }
 
   void SetAlignedPointerInInternalField(int index, void* value);
   void SetAlignedPointerInInternalFields(int argc, int indices[],
                                          void* values[]);
 
   // Testers for local properties.
   V8_DEPRECATED(&quot;Use maybe version&quot;, bool HasOwnProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasOwnProperty(Local<Context> context,
                                                    Local<Name> key);
   V8_WARN_UNUSED_RESULT Maybe<bool> HasOwnProperty(Local<Context> context,
                                                    uint32_t index);
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;,
                     bool HasRealNamedProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealNamedProperty(Local<Context> context,
                                                          Local<Name> key);
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;,
                     bool HasRealIndexedProperty(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealIndexedProperty(
       Local<Context> context, uint32_t index);
   V8_DEPRECATE_SOON(&quot;Use maybe version&quot;,
                     bool HasRealNamedCallbackProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealNamedCallbackProperty(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED(
       &quot;Use maybe version&quot;,
       Local<Value> GetRealNamedPropertyInPrototypeChain(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetRealNamedPropertyInPrototypeChain(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED(
       &quot;Use maybe version&quot;,
       Maybe<PropertyAttribute> GetRealNamedPropertyAttributesInPrototypeChain(
           Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute>
   GetRealNamedPropertyAttributesInPrototypeChain(Local<Context> context,
                                                  Local<Name> key);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 Local<Value> GetRealNamedProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetRealNamedProperty(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 Maybe<PropertyAttribute> GetRealNamedPropertyAttributes(
                     Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute> GetRealNamedPropertyAttributes(
       Local<Context> context, Local<Name> key);
 
   bool HasNamedLookupInterceptor();
 
   bool HasIndexedLookupInterceptor();
 
   int GetIdentityHash();
 
   // TODO(dcarney): take an isolate and optionally bail out?
   Local<Object> Clone();
 
   Local<Context> CreationContext();
 
   bool IsCallable();
 
   bool IsConstructor();
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 Local<Value> CallAsFunction(Local<Value> recv, int argc,
                                             Local<Value> argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> CallAsFunction(Local<Context> context,
                                                          Local<Value> recv,
                                                          int argc,
                                                          Local<Value> argv[]);
 
   V8_DEPRECATED(&quot;Use maybe version&quot;,
                 Local<Value> CallAsConstructor(int argc, Local<Value> argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> CallAsConstructor(
       Local<Context> context, int argc, Local<Value> argv[]);
 
   V8_DEPRECATE_SOON(&quot;Keep track of isolate correctly&quot;, Isolate* GetIsolate());
 
   static Local<Object> New(Isolate* isolate);
 
   V8_INLINE static Object* Cast(Value* obj);
 
  private:
   Object();
   static void CheckCast(Value* obj);
   Local<Value> SlowGetInternalField(int index);
   void* SlowGetAlignedPointerFromInternalField(int index);
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>// https://v8docs.nodesource.com/node-7.2/d4/da0/v8_8h_source.html#l02660
class V8_EXPORT Object : public Value {
  public:
   V8_DEPRECATE_SOON("Use maybe version",
                     bool Set(Local&lt;Value&gt; key, Local&lt;Value&gt; value));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; Set(Local&lt;Context&gt; context,
                                         Local&lt;Value&gt; key, Local&lt;Value&gt; value);
 
   V8_DEPRECATE_SOON("Use maybe version",
                     bool Set(uint32_t index, Local&lt;Value&gt; value));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; Set(Local&lt;Context&gt; context, uint32_t index,
                                         Local&lt;Value&gt; value);
 
   // Implements CreateDataProperty (ECMA-262, 7.3.4).
   //
   // Defines a configurable, writable, enumerable property with the given value
   // on the object unless the property already exists and is not configurable
   // or the object is not extensible.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; CreateDataProperty(Local&lt;Context&gt; context,
                                                        Local&lt;Name&gt; key,
                                                        Local&lt;Value&gt; value);
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; CreateDataProperty(Local&lt;Context&gt; context,
                                                        uint32_t index,
                                                        Local&lt;Value&gt; value);
 
   // Implements DefineOwnProperty.
   //
   // In general, CreateDataProperty will be faster, however, does not allow
   // for specifying attributes.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; DefineOwnProperty(
       Local&lt;Context&gt; context, Local&lt;Name&gt; key, Local&lt;Value&gt; value,
       PropertyAttribute attributes = None);
 
   // Sets an own property on this object bypassing interceptors and
   // overriding accessors or read-only properties.
   //
   // Note that if the object has an interceptor the property will be set
   // locally, but since the interceptor takes precedence the local property
   // will only be returned if the interceptor doesn't return a value.
   //
   // Note also that this only works for named properties.
   V8_DEPRECATED("Use CreateDataProperty / DefineOwnProperty",
                 bool ForceSet(Local&lt;Value&gt; key, Local&lt;Value&gt; value,
                               PropertyAttribute attribs = None));
   V8_DEPRECATE_SOON("Use CreateDataProperty / DefineOwnProperty",
                     Maybe&lt;bool&gt; ForceSet(Local&lt;Context&gt; context,
                                          Local&lt;Value&gt; key, Local&lt;Value&gt; value,
                                          PropertyAttribute attribs = None));
 
   V8_DEPRECATE_SOON("Use maybe version", Local&lt;Value&gt; Get(Local&lt;Value&gt; key));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; Get(Local&lt;Context&gt; context,
                                               Local&lt;Value&gt; key);
 
   V8_DEPRECATE_SOON("Use maybe version", Local&lt;Value&gt; Get(uint32_t index));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; Get(Local&lt;Context&gt; context,
                                               uint32_t index);
 
   V8_DEPRECATED("Use maybe version",
                 PropertyAttribute GetPropertyAttributes(Local&lt;Value&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;PropertyAttribute&gt; GetPropertyAttributes(
       Local&lt;Context&gt; context, Local&lt;Value&gt; key);
 
   V8_DEPRECATED("Use maybe version",
                 Local&lt;Value&gt; GetOwnPropertyDescriptor(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; GetOwnPropertyDescriptor(
       Local&lt;Context&gt; context, Local&lt;String&gt; key);
 
   V8_DEPRECATE_SOON("Use maybe version", bool Has(Local&lt;Value&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; Has(Local&lt;Context&gt; context,
                                         Local&lt;Value&gt; key);
 
   V8_DEPRECATE_SOON("Use maybe version", bool Delete(Local&lt;Value&gt; key));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe&lt;bool&gt; Delete(Local&lt;Context&gt; context, Local&lt;Value&gt; key);
 
   V8_DEPRECATED("Use maybe version", bool Has(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; Has(Local&lt;Context&gt; context, uint32_t index);
 
   V8_DEPRECATED("Use maybe version", bool Delete(uint32_t index));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe&lt;bool&gt; Delete(Local&lt;Context&gt; context, uint32_t index);
 
   V8_DEPRECATED("Use maybe version",
                 bool SetAccessor(Local&lt;String&gt; name,
                                  AccessorGetterCallback getter,
                                  AccessorSetterCallback setter = 0,
                                  Local&lt;Value&gt; data = Local&lt;Value&gt;(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   V8_DEPRECATED("Use maybe version",
                 bool SetAccessor(Local&lt;Name&gt; name,
                                  AccessorNameGetterCallback getter,
                                  AccessorNameSetterCallback setter = 0,
                                  Local&lt;Value&gt; data = Local&lt;Value&gt;(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe&lt;bool&gt; SetAccessor(Local&lt;Context&gt; context, Local&lt;Name&gt; name,
                           AccessorNameGetterCallback getter,
                           AccessorNameSetterCallback setter = 0,
                           MaybeLocal&lt;Value&gt; data = MaybeLocal&lt;Value&gt;(),
                           AccessControl settings = DEFAULT,
                           PropertyAttribute attribute = None);
 
   void SetAccessorProperty(Local&lt;Name&gt; name, Local&lt;Function&gt; getter,
                            Local&lt;Function&gt; setter = Local&lt;Function&gt;(),
                            PropertyAttribute attribute = None,
                            AccessControl settings = DEFAULT);
 
   Maybe&lt;bool&gt; HasPrivate(Local&lt;Context&gt; context, Local&lt;Private&gt; key);
   Maybe&lt;bool&gt; SetPrivate(Local&lt;Context&gt; context, Local&lt;Private&gt; key,
                          Local&lt;Value&gt; value);
   Maybe&lt;bool&gt; DeletePrivate(Local&lt;Context&gt; context, Local&lt;Private&gt; key);
   MaybeLocal&lt;Value&gt; GetPrivate(Local&lt;Context&gt; context, Local&lt;Private&gt; key);
 
   V8_DEPRECATE_SOON("Use maybe version", Local&lt;Array&gt; GetPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Array&gt; GetPropertyNames(
       Local&lt;Context&gt; context);
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Array&gt; GetPropertyNames(
       Local&lt;Context&gt; context, KeyCollectionMode mode,
       PropertyFilter property_filter, IndexFilter index_filter);
 
   V8_DEPRECATE_SOON("Use maybe version", Local&lt;Array&gt; GetOwnPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Array&gt; GetOwnPropertyNames(
       Local&lt;Context&gt; context);
 
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Array&gt; GetOwnPropertyNames(
       Local&lt;Context&gt; context, PropertyFilter filter);
 
   Local&lt;Value&gt; GetPrototype();
 
   V8_DEPRECATED("Use maybe version", bool SetPrototype(Local&lt;Value&gt; prototype));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; SetPrototype(Local&lt;Context&gt; context,
                                                  Local&lt;Value&gt; prototype);
 
   Local&lt;Object&gt; FindInstanceInPrototypeChain(Local&lt;FunctionTemplate&gt; tmpl);
 
   V8_DEPRECATED("Use maybe version", Local&lt;String&gt; ObjectProtoToString());
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;String&gt; ObjectProtoToString(
       Local&lt;Context&gt; context);
 
   Local&lt;String&gt; GetConstructorName();
 
   Maybe&lt;bool&gt; SetIntegrityLevel(Local&lt;Context&gt; context, IntegrityLevel level);
 
   int InternalFieldCount();
 
   V8_INLINE static int InternalFieldCount(
       const PersistentBase&lt;Object&gt;&amp; object) {
     return object.val_-&gt;InternalFieldCount();
   }
 
   V8_INLINE Local&lt;Value&gt; GetInternalField(int index);
 
   void SetInternalField(int index, Local&lt;Value&gt; value);
 
   V8_INLINE void* GetAlignedPointerFromInternalField(int index);
 
   V8_INLINE static void* GetAlignedPointerFromInternalField(
       const PersistentBase&lt;Object&gt;&amp; object, int index) {
     return object.val_-&gt;GetAlignedPointerFromInternalField(index);
   }
 
   void SetAlignedPointerInInternalField(int index, void* value);
   void SetAlignedPointerInInternalFields(int argc, int indices[],
                                          void* values[]);
 
   // Testers for local properties.
   V8_DEPRECATED("Use maybe version", bool HasOwnProperty(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; HasOwnProperty(Local&lt;Context&gt; context,
                                                    Local&lt;Name&gt; key);
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; HasOwnProperty(Local&lt;Context&gt; context,
                                                    uint32_t index);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealNamedProperty(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; HasRealNamedProperty(Local&lt;Context&gt; context,
                                                          Local&lt;Name&gt; key);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealIndexedProperty(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; HasRealIndexedProperty(
       Local&lt;Context&gt; context, uint32_t index);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealNamedCallbackProperty(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;bool&gt; HasRealNamedCallbackProperty(
       Local&lt;Context&gt; context, Local&lt;Name&gt; key);
 
   V8_DEPRECATED(
       "Use maybe version",
       Local&lt;Value&gt; GetRealNamedPropertyInPrototypeChain(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; GetRealNamedPropertyInPrototypeChain(
       Local&lt;Context&gt; context, Local&lt;Name&gt; key);
 
   V8_DEPRECATED(
       "Use maybe version",
       Maybe&lt;PropertyAttribute&gt; GetRealNamedPropertyAttributesInPrototypeChain(
           Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;PropertyAttribute&gt;
   GetRealNamedPropertyAttributesInPrototypeChain(Local&lt;Context&gt; context,
                                                  Local&lt;Name&gt; key);
 
   V8_DEPRECATED("Use maybe version",
                 Local&lt;Value&gt; GetRealNamedProperty(Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; GetRealNamedProperty(
       Local&lt;Context&gt; context, Local&lt;Name&gt; key);
 
   V8_DEPRECATED("Use maybe version",
                 Maybe&lt;PropertyAttribute&gt; GetRealNamedPropertyAttributes(
                     Local&lt;String&gt; key));
   V8_WARN_UNUSED_RESULT Maybe&lt;PropertyAttribute&gt; GetRealNamedPropertyAttributes(
       Local&lt;Context&gt; context, Local&lt;Name&gt; key);
 
   bool HasNamedLookupInterceptor();
 
   bool HasIndexedLookupInterceptor();
 
   int GetIdentityHash();
 
   // TODO(dcarney): take an isolate and optionally bail out?
   Local&lt;Object&gt; Clone();
 
   Local&lt;Context&gt; CreationContext();
 
   bool IsCallable();
 
   bool IsConstructor();
 
   V8_DEPRECATED("Use maybe version",
                 Local&lt;Value&gt; CallAsFunction(Local&lt;Value&gt; recv, int argc,
                                             Local&lt;Value&gt; argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; CallAsFunction(Local&lt;Context&gt; context,
                                                          Local&lt;Value&gt; recv,
                                                          int argc,
                                                          Local&lt;Value&gt; argv[]);
 
   V8_DEPRECATED("Use maybe version",
                 Local&lt;Value&gt; CallAsConstructor(int argc, Local&lt;Value&gt; argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal&lt;Value&gt; CallAsConstructor(
       Local&lt;Context&gt; context, int argc, Local&lt;Value&gt; argv[]);
 
   V8_DEPRECATE_SOON("Keep track of isolate correctly", Isolate* GetIsolate());
 
   static Local&lt;Object&gt; New(Isolate* isolate);
 
   V8_INLINE static Object* Cast(Value* obj);
 
  private:
   Object();
   static void CheckCast(Value* obj);
   Local&lt;Value&gt; SlowGetInternalField(int index);
   void* SlowGetAlignedPointerFromInternalField(int index);
 };</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
V8 Object 内存结构与属性访问详解

## 原文链接
[https://segmentfault.com/a/1190000008188648](https://segmentfault.com/a/1190000008188648)

