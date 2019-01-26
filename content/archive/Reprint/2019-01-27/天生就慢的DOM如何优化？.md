---
title: '天生就慢的DOM如何优化？' 
date: 2019-01-27 2:30:59
hidden: true
slug: 54h2y49sjup
categories: [reprint]
---

{{< raw >}}

                    
<p>友情提醒：这篇我都觉得有点长...可能会占用你10+分钟，没有这么多时间的你可以直接去文末看小<del>姐</del>结。</p>
<blockquote>
<p>用脚本进行DOM操作的代价是很昂贵的，它是富web应用中最常见的性能瓶颈。主要有以下三种问题：</p>
<ol>
<li><p>访问和修改DOM元素</p></li>
<li><p>修改DOM元素的样式导致repaint和reflow</p></li>
<li><p>通过DOM事件处理与用户进行交互</p></li>
</ol>
</blockquote>
<h2 id="articleHeader0">浏览器中的DOM</h2>
<p><strong>DOM是（Document Object Model）一个与语言无关的、用来操作XML和HTML文档的应用程序接口（Application Program Interface）。</strong> 尽管DOM与语言无关，但是在浏览器中的接口却是用JavaScript来实现的。</p>
<h3 id="articleHeader1">一个前端小知识</h3>
<p>浏览器通常会把js和DOM分开来分别独立实现。  <br>举个<del>栗子</del>冷知识，在IE中，js的实现名为JScript，位于jscript.dll文件中；DOM的实现则存在另一个库中，名为mshtml.dll（Trident）。  <br>Chrome中的DOM实现为webkit中的webCore，但js引擎是Google自己研发的V8。  <br>Firefox中的js引擎是SpiderMonkey，渲染引擎（DOM）则是Gecko。</p>
<h3 id="articleHeader2">DOM，天生就慢</h3>
<p>前面的小知识中说过，浏览器把实现页面渲染的部分和解析js的部分<strong>分开来实现</strong>，既然是分开的，一旦两者需要产生连接，就要付出代价。  <br>两个例子：</p>
<ol>
<li><p>小明和小红是两个不同学校的学生，两个人家里经济条件都不太好，买不起手机（好尴尬的设定Orz...），所以只能通过写信来互相交流，这样的过程肯定比他俩面对面交谈时所需要花费的代价大（额外的事件、写信的成本等）。</p></li>
<li><p><strong>官方例子</strong>：把DOM和js（ECMAScript）各自想象为一座岛屿，它们之间用收费桥进行连接。ECMAScript每次访问DOM，都要途径这座桥，并交纳“过桥费”。访问DOM的次数越多，费用也就越高。</p></li>
</ol>
<p>因此，推荐的做法是：<strong>尽可能的减少过桥的次数，努力待在ECMAScript岛上</strong>。</p>
<h2 id="articleHeader3">DOM的访问与修改</h2>
<p>前面说到访问DOM需要交纳“过桥费”，而修改DOM元素则代价更为昂贵，因为它会导致浏览器重新计算页面的几何变化。<br>来看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function innerHTMLLoop(){  
    for (var count = 0; count < 15000; count++){  
        document.getElementById('text').innerHTML += 'dom';  
    }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerHTMLLoop</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; <span class="hljs-number">15000</span>; count++){  
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'text'</span>).innerHTML += <span class="hljs-string">'dom'</span>;  
    }  
}</code></pre>
<p>这段代码，每次循环会访问两次特定的元素：第一次读取这个元素的innerHTML属性，第二次重写它。  <br>看清楚了这一点，不难得到一个效率更高的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function innerHTMLLoop2(){  
    var content = '';  
    for (var count = 0; count < 15000; count++){  
        content += 'dom';  
    }  
    document.getElementById('text').innerHTML += content;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">innerHTMLLoop2</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> content = <span class="hljs-string">''</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; <span class="hljs-number">15000</span>; count++){  
        content += <span class="hljs-string">'dom'</span>;  
    }  
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'text'</span>).innerHTML += content;  
}</code></pre>
<p>用一个局部变量包层每次更新后的内容，等待循环结束后，一次性的写入页面（尽可能的把更多的工作交给js的部分来做）。  <br>根据统计，在所有的浏览器中，修改后的版本都运行的更快（优化幅度最明显的是IE8，使用后者比使用前者快273倍）。</p>
<h3 id="articleHeader4">HTML元素集合</h3>
<p>HTML元素集合是包含了DOM节点引用的<strong>类数组</strong>对象。  <br>可以用以下方法或属性得到一个HTML元素集合：</p>
<ul>
<li><p>document.getElementsByName()</p></li>
<li><p>document.getElementsByTagName()</p></li>
<li><p>document.getElementsByClassName()</p></li>
<li><p>document.images <em>页面中所有img元素</em></p></li>
<li><p>document.links <em>页面中所有a元素</em></p></li>
<li><p>document.forms <em>页面中所有表单元素</em></p></li>
<li><p>document.forms[0].elements <em>页面中第一个表单的所有字段</em></p></li>
</ul>
<p>HTML元素集合处于一种“实时的状态”，这意味着当底层文档对象更新时，它也会自动更新，也就是说，HTML元素集合与底层的文档对象之间保持的连接。正因如此，每当你想从HTML元素集合中获取一些信息时，都会产生一次查询操作，这正是低效之源。</p>
<h4>昂贵的集合</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这是一个死循环  
//不管你信不信，反正我是信了  
var alldivs = document.getElementsByTagName('div');  
for (var i = 0; i < alldivs.length; i++){  
    document.body.appendChild(document.createElement('div'));  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这是一个死循环  </span>
<span class="hljs-comment">//不管你信不信，反正我是信了  </span>
<span class="hljs-keyword">var</span> alldivs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>);  
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; alldivs.length; i++){  
    <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>));  
}</code></pre>
<p>乍一看，这段代码只是单纯的把页面中的div数量翻倍：遍历所有的div，每次创建一个新的div并创建到添加到body中。  <br>但事实上，这是一个死循环：因为循环的退出条件alldivs.length在每一次循环结束后都会增加，因为这个HTML元素集合反映的是底层文档元素的实时状态。  <br>接下来，我们通过这段代码，对一个HTML元素集合做一些处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toArray(coll){  
    for (var i = 0, a = [], len = coll.lengthl i < len; i++){  
        a[i] = coll[i];  
    }  
    return a;  
}  
  
//将一个HTML元素集合拷贝到一个数组中  
var coll = document.getElementsByTagName('div');  
var arr = toArray(coll);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toArray</span>(<span class="hljs-params">coll</span>)</span>{  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, a = [], len = coll.lengthl i &lt; len; i++){  
        a[i] = coll[i];  
    }  
    <span class="hljs-keyword">return</span> a;  
}  
  
<span class="hljs-comment">//将一个HTML元素集合拷贝到一个数组中  </span>
<span class="hljs-keyword">var</span> coll = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>);  
<span class="hljs-keyword">var</span> arr = toArray(coll);  </code></pre>
<p>现在比较以下两个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loopCollection(){  
    for (var count = 0; count < coll.length; count++){  
        //processing...  
    }  
}  
  
function loopCopiedArray(){  
    for (var count = 0; count < arr.length; count++){  
        //processing...  
    }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loopCollection</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; coll.length; count++){  
        <span class="hljs-comment">//processing...  </span>
    }  
}  
  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loopCopiedArray</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; arr.length; count++){  
        <span class="hljs-comment">//processing...  </span>
    }  
}</code></pre>
<p>在IE6中，后者比前者快114倍；IE7中119倍；IE8中79倍...  <br>所以，在相同的内容和数量下，遍历一个数组的速度明显快于遍历一个HTML元素集合。  <br>由于在每一次迭代循环中，读取元素集合的length属性会引发集合进行更新，这在所有的浏览器中都有明显的性能问题，所以你也可以这么干：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loopCacheLengthCollection(){  
    var coll = document.getElementsByTagName('div'),  
        len = coll.length;  
    for (var count = 0; count < len; count++){  
        //processing...  
    }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loopCacheLengthCollection</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> coll = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>),  
        len = coll.length;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; len; count++){  
        <span class="hljs-comment">//processing...  </span>
    }  
}</code></pre>
<p>这个函数和上面的loopCopiedArray()一样快。</p>
<h4>访问集合元素时使用局部变量</h4>
<p>一般来说，对于任何类型的DOM访问，当同一个DOM属性或者方法需要被多次访问时，最好使用一个局部变量缓存此成员。当遍历一个集合时，首要优化原则是把集合存储在局部变量中，并把length缓存在循环外部，然后使用局部变量访问这些需要多次访问的元素。  <br>一个栗子，在循环之中访问每个元素的三个属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function collectionGlobal(){  
    var coll = document.getElementsByTagName('div'),  
        len = coll.length,  
        name = '';  
    for (var count = 0; count < len; count++){  
        name = document.getElementsByTagName('div')[count].nodeName;  
        name = document.getElementsByTagName('div')[count].nodeType;  
        name = document.getElementsByTagName('div')[count].tagName;  
        //我的天不会有人真的这么写吧...  
    }  
    return name;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">collectionGlobal</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> coll = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>),  
        len = coll.length,  
        name = <span class="hljs-string">''</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; len; count++){  
        name = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>)[count].nodeName;  
        name = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>)[count].nodeType;  
        name = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>)[count].tagName;  
        <span class="hljs-comment">//我的天不会有人真的这么写吧...  </span>
    }  
    <span class="hljs-keyword">return</span> name;  
}</code></pre>
<p>上面这段代码，大家不要当真...正常人肯定是写不出来的...这里是为了对比一下，所以把这种最慢的情况写给大家看。  <br>接下来，是一个稍微优化了的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function collectionLocal(){  
    var coll = document.getElementsByTagName('div'),  
        len = coll.length,  
        name = '';  
    for (var count = 0; count < length; count++){  
        name = coll[count].nodeName;  
        name = coll[count].nodeType;  
        name = coll[count].tagName;  
    }  
    return name;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">collectionLocal</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> coll = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>),  
        len = coll.length,  
        name = <span class="hljs-string">''</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; length; count++){  
        name = coll[count].nodeName;  
        name = coll[count].nodeType;  
        name = coll[count].tagName;  
    }  
    <span class="hljs-keyword">return</span> name;  
}</code></pre>
<p>这次就看起来正常很多了，最后是这次优化之旅的最终版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function collectionNodesLocal(){  
    var coll = document.getElementsByTagName('div'),  
        len = coll.length,  
        name = '',  
        ele = null;  
    for (var count = 0; count < len; count++){  
        ele = coll[count];  
        name = ele.nodeName;  
        name = ele.nodeType;  
        name = ele.tagName;  
    }  
    return name;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">collectionNodesLocal</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> coll = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>),  
        len = coll.length,  
        name = <span class="hljs-string">''</span>,  
        ele = <span class="hljs-literal">null</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; len; count++){  
        ele = coll[count];  
        name = ele.nodeName;  
        name = ele.nodeType;  
        name = ele.tagName;  
    }  
    <span class="hljs-keyword">return</span> name;  
}</code></pre>
<h3 id="articleHeader5">遍历DOM</h3>
<h4>在DOM中爬行</h4>
<p>通常你需要从某一个DOM元素开始，操作周围的元素，或者递归查找所有的子节点。  <br>考虑下面两个等价的栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1  
function testNextSibling(){  
    var el = document.getElementById('mydiv'),  
        ch = el.firstChild,  
        name = '';  
    do {  
        name = ch.nodeName;  
    } while (ch = ch.nextSibling);  
    return name;  
}  
  
//2  
function testChildNodes(){  
    var el = document.getElementById('mydiv'),  
        ch = el.childNodes,  
        len = ch.length,  
        //childNodes是一个元素集合，因此在循环中主席缓存length属性以避免迭代更新  
        name = '';  
    for (var count = 0; count < len; count++){  
        name = ch[count].nodeName;  
    }  
    return name;  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//1  </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testNextSibling</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mydiv'</span>),  
        ch = el.firstChild,  
        name = <span class="hljs-string">''</span>;  
    <span class="hljs-keyword">do</span> {  
        name = ch.nodeName;  
    } <span class="hljs-keyword">while</span> (ch = ch.nextSibling);  
    <span class="hljs-keyword">return</span> name;  
}  
  
<span class="hljs-comment">//2  </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testChildNodes</span>(<span class="hljs-params"></span>)</span>{  
    <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mydiv'</span>),  
        ch = el.childNodes,  
        len = ch.length,  
        <span class="hljs-comment">//childNodes是一个元素集合，因此在循环中主席缓存length属性以避免迭代更新  </span>
        name = <span class="hljs-string">''</span>;  
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>; count &lt; len; count++){  
        name = ch[count].nodeName;  
    }  
    <span class="hljs-keyword">return</span> name;  
}</code></pre>
<p>在不同浏览器中，两种方法的运行时间几乎相等。但在老版本的IE浏览器中，nextSibling的性能比childNodes更好一些。</p>
<h4>元素节点</h4>
<p>我们知道，DOM节点有以下五种分类：</p>
<ul>
<li><p>整个文档是一个<strong>文档节点</strong></p></li>
<li><p>每个HTML元素是<strong>元素节点</strong></p></li>
<li><p>HTML元素内的文本是<strong>文本节点</strong></p></li>
<li><p>每个HTML属性是<strong>属性节点</strong></p></li>
<li><p>注释是<strong>注释节点</strong></p></li>
</ul>
<p>诸如childNodes、firstChild、nextSibling这些DOM属性是不区分元素节点和其他类型的节点的，但往往我们只需要访问元素节点，此时需要做一些过滤的工作。事实上，这些类型检查的过程都是不必要的DOM操作。  <br>许多现代浏览器提供的API只返回元素节点，如果可用的话推荐直接只用这些API，因为它们的执行效率比自己在js中过滤的效率要高。</p>
<ol>
<li><p>现代浏览器提供的API（被替换的API）</p></li>
<li><p>children(childNodes)</p></li>
<li><p>childElementCount (childNodes.length)</p></li>
<li><p>firstElementChild (firstChild)</p></li>
<li><p>lastElementChild (lastChild)</p></li>
<li><p>nextElementSibling (nextSibling)</p></li>
<li><p>previousElementSibling (previousSibling)</p></li>
</ol>
<p>使用这些新的API，可以直接获取到元素节点，也正是因此，其速度也更快。</p>
<h4>选择器API</h4>
<p>有时候为了得到需要的元素列表，开发人员不得不组合调用getElementById、getElementsByTagName，并遍历返回的节点，但这种繁密的过程效率低下。  <br>最新的浏览器提供了一个传递参数为CSS选择器的名为querySelectorAll()的原生DOM方法。这种方式自然比使用js和DOM来遍历查找元素要快的多。  <br>比如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = document.querySelectorAll('#menu a');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'#menu a'</span>);</code></pre>
<p>这一段代码，返回的是一个NodeList————包含着匹配节点的类数组对象。与之前不同的是，这个方法不会返回HTML元素集合，因此返回的节点不会对应实时的文档结构，也避免了之前由于HTML集合引起的性能（潜在逻辑）问题。  <br>如果不使用querySelectorAll()，我们需要这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = document.getElementById('menu').getElementsByTagName('a');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'menu'</span>).getElementsByTagName(<span class="hljs-string">'a'</span>);</code></pre>
<p>不仅写起来更麻烦了，更要注意的是，此时的elements是一个HTML元素集合，所以还需要把它copy到数组中，才能得到一个与前者相似的静态列表。  <br>还有一个querySelector()方法，用来获取第一个匹配的节点。</p>
<h2 id="articleHeader6">重绘与重排（Repaints &amp; Reflows）</h2>
<p>浏览器用来显示页面的所有“组件”，有：HTML标签、js、css、图片——之后会解析并生成两个内部的数据结构：</p>
<ul>
<li><p>DOM树（表示页面结构）</p></li>
<li><p>渲染树（表示DOM节点应该如何表示）</p></li>
</ul>
<p>DOM树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点。  <br>渲染树中的节点被称为“帧（frames）”或“盒（boxes）”，符合css盒模型的定义，理解页面元素为一个具有padding、margin、borders和position的盒子。  <br>一旦渲染树构建完成，浏览器就开始显示页面元素，这个过程称为<strong>绘制（paint）</strong>。  </p>
<p>当DOM的变化影响了元素的几何属性（宽、高）——比如改变改变了边框的宽度或者给一个段落增加一些文字导致其行数的增加——浏览器就需要重新计算元素的几何属性，同样，页面中其他元素的几何属性和位置也会因此受到影响。  <br>浏览器会使渲染树中收到影响的部分消失，重新构建渲染树，这个过程称为“<strong>重排(reflow)</strong>”。重排完成之后，浏览器会重新将受到影响的部分绘制到浏览器中，这个过程称之为“<strong>重绘(repaint)</strong>”。  </p>
<p>如果改变的不是元素的几何属性，如：改变元素的背景颜色，不会发生重排，只会发生一次重绘，因为元素的布局并没有改变。  <br>不管是重绘还是重排，都是代价昂贵的操作，它们会导致web应用程序的UI反应迟钝，应当尽可能的减少这类过程的发生。</p>
<h3 id="articleHeader7">重排何时发生？</h3>
<ul>
<li><p>添加或删除可见的DOM元素</p></li>
<li><p>元素位置的改变</p></li>
<li><p>元素尺寸的改变（padding、margin、border、height、width）</p></li>
<li><p>内容改变（文本改变或图片尺寸改变）</p></li>
<li><p>页面渲染器初始化</p></li>
<li><p>浏览器窗口尺寸改变</p></li>
<li><p>滚动条的出现（会触发整个页面的重排）</p></li>
</ul>
<h3 id="articleHeader8">最小化重绘和重排</h3>
<h4>改变样式</h4>
<p>一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var el = document.getElementById('mydiv');  
el.style.borderLeft = '1px';  
el.style.borderRight = '2px';  
el.style.padding = '5px';  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mydiv'</span>);  
el.style.borderLeft = <span class="hljs-string">'1px'</span>;  
el.style.borderRight = <span class="hljs-string">'2px'</span>;  
el.style.padding = <span class="hljs-string">'5px'</span>;  </code></pre>
<p>示例中，元素的三个样式被改变，而且每一个都会影响元素的几何结构。在最糟糕的情况下，这段代码会触发三次重排（大部分现代浏览器为此做了优化，只会触发一次重排）。从另一个角度看，这段代码四次访问DOM，可以被优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var el = document.getElementById('mydiv');  
//思路：合并所有改变然后一次性处理  
//method_1:使用cssText属性  
el.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px';  
  
//method_2:修改类名  
el.className = 'anotherClass';  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mydiv'</span>);  
<span class="hljs-comment">//思路：合并所有改变然后一次性处理  </span>
<span class="hljs-comment">//method_1:使用cssText属性  </span>
el.style.cssText = <span class="hljs-string">'border-left: 1px; border-right: 2px; padding: 5px'</span>;  
  
<span class="hljs-comment">//method_2:修改类名  </span>
el.className = <span class="hljs-string">'anotherClass'</span>;  </code></pre>
<h4>批量修改DOM</h4>
<p>当你需要对DOM元素进行一系列操作的时候，不妨按照如下步骤：</p>
<ol>
<li><p>使元素脱离文档流</p></li>
<li><p>对其应用多重改变</p></li>
<li><p>把元素带回文档中</p></li>
</ol>
<p>上面的这一套组合拳中，第一步和第三部分别会触发一次重排。<strong>但是如果你忽略了这两个步骤，那么在第二步所产生的任何修改都会触发一次重排</strong>。  </p>
<p>在此安利三种可以使DOM元素脱离文档流的方法：</p>
<ul>
<li><p>隐藏元素</p></li>
<li><p>使用文档片段（document fragment）在当前DOM之外构建一个子树，再把它拷贝回文档</p></li>
<li><p>将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素</p></li>
</ul>
<h4>让动画元素脱离文档流</h4>
<p>一般情况下，重排只影响渲染树中的一小部分，但也可能影响很大的一部分，甚至是整个渲染树。  <br>浏览器所需的重排次数越少，应用程序的响应速度也就越快。  <br>想象这样一种情况，页面的底部有一个动画，会推移页面整个余下的部分，这将是一次代价昂贵的大规模重排！用户也势必会感觉到页面一卡一卡的。  <br>因此，使用以下步骤可以避免页面中的大部分重排：</p>
<ol>
<li><p>使用<strong>绝对定位</strong>让页面上的动画元素脱离文档流</p></li>
<li><p>动画展示阶段</p></li>
<li><p>动画结束时，将元素恢复定位。</p></li>
</ol>
<h4>IE的:hover</h4>
<p>从IE7开始，IE允许在任何元素上使用:hover这个css选择器。  <br>然而，如果你有大量元素使用了:hover，你会发现，贼喇慢！</p>
<h2 id="articleHeader9">事件委托（Event Delegation）</h2>
<p>这一个优化手段也是在前端求职面试中的高频题目。  <br>当页面中有大量的元素，并且这些元素都需要绑定事件处理器。  <br>每绑定一个事件处理器都是有代价的，要么加重了页面负担，要么增加了运行期的执行时间。再者，事件绑定会占用处理时间，而且浏览器需要跟踪每个事件处理器，这也会占用更多的内存。还有一种情况就是，当这些工作结束时，这些事件处理器中的绝大多数都是不再需要的（并不是100%的按钮或链接都会被用户点击），因此有很多工作是没有必要的。  <br>事件委托的<strong>原理</strong>很简单——<strong>事件逐层冒泡并能被父级元素捕获</strong>。  <br>使用事件委托，只需要给外层元素绑定一个处理器，就可以处理在其子元素上触发的所有事件。  <br>有以下几点需要注意：</p>
<ul>
<li><p>访问事件对象，判断事件源</p></li>
<li><p>按需取消文档树中的冒泡</p></li>
<li><p>按需阻止默认动作</p></li>
</ul>
<h2 id="articleHeader10">小结</h2>
<p>访问和操作DOM需要穿越连接ECMAScript和DOM两个岛屿之间的桥梁，为了尽可能的减少“过桥费”，有以下几点需要注意：</p>
<ul>
<li><p>最小化DOM访问次数</p></li>
<li><p>对于需要多次访问的DOM节点，使用局部变量存储其引用</p></li>
<li><p>如果要操作一个HTML元素集合，建议把它拷贝到一个数组中</p></li>
<li><p>使用速度更快的API：比如querySelectorAll</p></li>
<li><p>留意重排和重绘的次数</p></li>
<li><p>事件委托</p></li>
</ul>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008222753?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000008222753?w=430&amp;h=430" alt="公众账号：刘凯里" title="公众账号：刘凯里" style="cursor: pointer;"></span></p>
<p><em>分享前端和一些有趣的东西</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
天生就慢的DOM如何优化？

## 原文链接
[https://segmentfault.com/a/1190000008267184](https://segmentfault.com/a/1190000008267184)

