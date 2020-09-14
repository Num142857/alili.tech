---
title: 'JS总结篇--[总结]JS操作DOM常用API详解' 
date: 2019-01-13 2:30:11
hidden: true
slug: bq14ktw0zj9
categories: [reprint]
---

{{< raw >}}

                    
<p>文本整理了<code>javascript</code>操作<code>DOM</code>的一些常用的<code>api</code>，根据其作用整理成为创建，修改，查询等多种类型的<code>api</code>，主要用于复习基础知识，加深对原生<code>js</code>的认识。</p>
<h2 id="articleHeader0">基本概念</h2>
<p>在讲解操作DOM的api之前，首先我们来复习一下一些基本概念，这些概念是掌握api的关键，必须理解它们。</p>
<h3 id="articleHeader1">Node类型</h3>
<p>DOM1级定义了一个Node接口，该接口由DOM中所有节点类型实现。这个Node接口在JS中是作为Node类型实现的。在IE9以下版本无法访问到这个类型，JS中所有节点都继承自Node类型，都共享着相同的基本属性和方法。</p>
<p>每个节点都有一个nodeType属性，用于表明节点的类型。节点类型由在Node类型中定义的下列12个数值常量来表示，任何节点类型必居其一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Node.ELEMENT_NODE:1
Node.ATTRIBUTE_NODE:2
Node.TEXT_NODE:3
Node.CDATA_SECTION_NODE:4
Node.ENTITY_REFERENCE_NODE:5
Node.ENTITY_NODE:6
Node.PROCESSING_INSTRUCTION_NODE:7
Node.COMMENT_NODE:8
Node.DOCUMENT_NODE:9
Node.DOCUMENT_TYPE_NODE:10
Node.DOCUMENT_FRAGMENT_NODE:11
Node.NOTATION_NODE:12
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">Node</span>.ELEMENT_NODE:<span class="hljs-title">1</span>
<span class="hljs-keyword">Node</span>.ATTRIBUTE_NODE:<span class="hljs-title">2</span>
<span class="hljs-keyword">Node</span>.TEXT_NODE:<span class="hljs-title">3</span>
<span class="hljs-keyword">Node</span>.CDATA_SECTION_NODE:<span class="hljs-title">4</span>
<span class="hljs-keyword">Node</span>.ENTITY_REFERENCE_NODE:<span class="hljs-title">5</span>
<span class="hljs-keyword">Node</span>.ENTITY_NODE:<span class="hljs-title">6</span>
<span class="hljs-keyword">Node</span>.PROCESSING_INSTRUCTION_NODE:<span class="hljs-title">7</span>
<span class="hljs-keyword">Node</span>.COMMENT_NODE:<span class="hljs-title">8</span>
<span class="hljs-keyword">Node</span>.DOCUMENT_NODE:<span class="hljs-title">9</span>
<span class="hljs-keyword">Node</span>.DOCUMENT_TYPE_NODE:<span class="hljs-title">10</span>
<span class="hljs-keyword">Node</span>.DOCUMENT_FRAGMENT_NODE:<span class="hljs-title">11</span>
<span class="hljs-keyword">Node</span>.NOTATION_NODE:<span class="hljs-title">12</span>
</code></pre>
<p>假设我们要判断一个Node是不是元素，我们可以这样判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(someNode.nodeType == 1){
    console.log(&quot;Node is a element&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">if</span>(someNode.<span class="hljs-keyword">nodeType</span> == <span class="hljs-number">1</span>){
    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"Node is a element"</span>);
}</code></pre>
<p>开发人员最常用的就是元素和文本节点。</p>
<p>这些Node类型中，我们最常用的就是<code>element</code>，<code>text</code>，<code>attribute</code>，<code>comment</code>，<code>document</code>，<code>document_fragment</code>这几种类型。<br>我们简单来介绍一下这几种类型：</p>
<h3 id="articleHeader2">Element类型</h3>
<p>Element提供了对元素标签名，子节点和特性的访问，我们常用HTML元素比如div，span，a等标签就是element中的一种。Element有下面几条特性：<br>（1）nodeType为1<br>（2）nodeName为元素标签名，tagName也是返回标签名<br>（3）nodeValue为null<br>（4）parentNode可能是Document或Element<br>（5）子节点可能是Element，Text，Comment，Processing_Instruction，CDATASection或EntityReference</p>
<h3 id="articleHeader3">Text类型</h3>
<p>Text表示文本节点，它包含的是纯文本内容，不能包含html代码，但可以包含转义后的html代码。Text有下面的特性：<br>（1）nodeType为3<br>（2）nodeName为#text<br>（3）nodeValue为文本内容<br>（4）parentNode是一个Element<br>（5）没有子节点</p>
<h3 id="articleHeader4">Attr类型</h3>
<p>Attr类型表示元素的特性，相当于元素的attributes属性中的节点，它有下面的特性：<br>（1）nodeType值为2<br>（2）nodeName是特性的名称<br>（3）nodeValue是特性的值<br>（4）parentNode为null</p>
<h3 id="articleHeader5">Comment类型</h3>
<p>Comment表示HTML文档中的注释，它有下面的几种特征：<br>（1）nodeType为8<br>（2）nodeName为#comment<br>（3）nodeValue为注释的内容<br>（4）parentNode可能是Document或Element<br>（5）没有子节点</p>
<h3 id="articleHeader6">Document</h3>
<p>Document表示文档，在浏览器中，document对象是HTMLDocument的一个实例，表示整个页面，它同时也是window对象的一个属性。Document有下面的特性：<br>（1）nodeType为9<br>（2）nodeName为#document<br>（3）nodeValue为null<br>（4）parentNode为null<br>（5）子节点可能是一个DocumentType或Element</p>
<h3 id="articleHeader7">DocumentFragment类型</h3>
<p>DocumentFragment是所有节点中唯一一个没有对应标记的类型，它表示一种轻量级的文档，可能当作一个临时的仓库用来保存可能会添加到文档中的节点。DocumentFragment有下面的特性：<br>（1）nodeType为11<br>（2）nodeName为#document-fragment<br>（3）nodeValue为null<br>（4）parentNode为null</p>
<p>我们简单地介绍了几种常见的Node类型，要记住，HTML中的节点并不只是包括元素节点，它还包括文本节点，注释节点等等。在这里我们只是简单地说明了几种常见的节点，想要进一步学习的同学可以查找一下相关资料。</p>
<h2 id="articleHeader8">节点创建型api</h2>
<p>在这里，我将常用的DOM操作api进行分类，首先要介绍的是创建型的api。这一类型的api，简而言之就是用来创建节点的。</p>
<h3 id="articleHeader9">createElement</h3>
<p>createElement通过传入指定的一个标签名来创建一个元素，如果传入的标签名是一个未知的，则会创建一个自定义的标签，注意：IE8以下浏览器不支持自定义标签。<br>使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var div = document.createElement(&quot;div&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">div</span> = document.createElement(<span class="hljs-string">"div"</span>);</code></pre>
<p>使用createElement要注意：通过createElement创建的元素并不属于html文档，它只是创建出来，并未添加到html文档中，要调用appendChild或insertBefore等方法将其添加到HTML文档树中。</p>
<h3 id="articleHeader10">createTextNode</h3>
<p>createTextNode用来创建一个文本节点，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var textNode = document.createTextNode(&quot;一个TextNode&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">"一个TextNode"</span>);</code></pre>
<p>createTextNode接收一个参数，这个参数就是文本节点中的文本，和createElement一样，创建后的文本节点也只是独立的一个节点，同样需要appendChild将其添加到HTML文档树中。</p>
<h3 id="articleHeader11">cloneNode</h3>
<p><code>cloneNode</code>是用来返回调用方法的节点的一个副本，它接收一个<code>bool</code>参数，用来表示是否复制子元素，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = document.getElementById(&quot;parentElement&quot;); 
var parent2 = parent.cloneNode(true);// 传入true
parent2.id = &quot;parent2&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">parent</span> = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"parentElement"</span>); 
<span class="hljs-built_in">var</span> parent2 = <span class="hljs-built_in">parent</span>.cloneNode(<span class="hljs-literal">true</span>);<span class="hljs-comment">// 传入true</span>
parent2.id = <span class="hljs-string">"parent2"</span>;</code></pre>
<p>这段代码通过cloneNode复制了一份parent元素，其中cloneNode的参数为true，表示parent的子节点也被复制，如果传入false，则表示只复制了parent节点。</p>
<p>我们看看这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot;>
    我是父元素的文本
    <br/>
    <span>
        我是子元素
    </span>
</div>
<button id=&quot;btnCopy&quot;>复制</button>

var parent = document.getElementById(&quot;parent&quot;);
document.getElementById(&quot;btnCopy&quot;).onclick = function(){
    var parent2 = parent.cloneNode(true);
    parent2.id = &quot;parent2&quot;;
    document.body.appendChild(parent2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>&lt;div id=<span class="hljs-string">"parent"</span>&gt;
    我是父元素的文本
    &lt;br/&gt;
    &lt;span&gt;
        我是子元素
    &lt;/span&gt;
&lt;/div&gt;
&lt;button id=<span class="hljs-string">"btnCopy"</span>&gt;复制&lt;/button&gt;

<span class="hljs-keyword">var</span> <span class="hljs-keyword">parent</span> = document.getElementById(<span class="hljs-string">"parent"</span>);
document.getElementById(<span class="hljs-string">"btnCopy"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> parent2 = <span class="hljs-keyword">parent</span>.cloneNode(<span class="hljs-keyword">true</span>);
    parent2.id = <span class="hljs-string">"parent2"</span>;
    document.body.appendChild(parent2);
}</code></pre>
<p>这段代码很简单，主要是绑定button事件，事件内容是复制了一个parent，修改其id，然后添加到文档中。<br>这里有几点要注意：</p>
<p>（1）和<code>createElement</code>一样，<code>cloneNode</code>创建的节点只是游离有<code>html</code>文档外的节点，要调用<code>appendChild</code>方法才能添加到文档树中<br>（2）如果复制的元素有<code>id</code>，则其副本同样会包含该<code>id</code>，由于<code>id</code>具有唯一性，所以在复制节点后必须要修改其id<br>（3）调用接收的bool参数最好传入，如果不传入该参数，不同浏览器对其默认值的处理可能不同</p>
<p>除此之外，我们还有一个需要注意的点：<br>如果被复制的节点绑定了事件，则副本也会跟着绑定该事件吗？这里要分情况讨论：<br>（1）如果是通过<code>addEventListener</code>或者比如<code>onclick</code>进行绑定事件，则副本节点不会绑定该事件<br>（2）如果是内联方式绑定比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div onclick=&quot;showParent()&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> onclick=<span class="hljs-string">"showParent()"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>这样的话，副本节点同样会触发事件。</p>
<h3 id="articleHeader12">createDocumentFragment</h3>
<p>createDocumentFragment方法用来创建一个DocumentFragment。在前面我们说到DocumentFragment表示一种轻量级的文档，它的作用主要是存储临时的节点用来准备添加到文档中。<br>createDocumentFragment方法主要是用于添加大量节点到文档中时会使用到。假设要循环一组数据，然后创建多个节点添加到文档中，比如示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;list&quot;></ul>
<input type=&quot;button&quot; value=&quot;添加多项&quot; id=&quot;btnAdd&quot; />

document.getElementById(&quot;btnAdd&quot;).onclick = function(){
    var list = document.getElementById(&quot;list&quot;);
    for(var i = 0;i < 100; i++){
        var li = document.createElement(&quot;li&quot;);
        li.textContent = i;
        list.appendChild(li);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;ul id=<span class="hljs-string">"list"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"添加多项"</span> id=<span class="hljs-string">"btnAdd"</span> /&gt;

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btnAdd"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> list = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"list"</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">100</span>; i++){
        <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
        li.textContent = i;
        list.appendChild(li);
    }
}</code></pre>
<p>这段代码将按钮绑定了一个事件，这个事件创建了100个li节点，然后依次将其添加HTML文档中。这样做有一个缺点：每次一创建一个新的元素，然后添加到文档树中，这个过程会造成浏览器的回流。所谓回流简单说就是指元素大小和位置会被重新计算，如果添加的元素太多，会造成性能问题。这个时候，就是使用createDocumentFragment了。<br>DocumentFragment不是文档树的一部分，它是保存在内存中的，所以不会造成回流问题。我们修改上面的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;btnAdd&quot;).onclick = function(){
    var list = document.getElementById(&quot;list&quot;);    
    var fragment = document.createDocumentFragment();

    for(var i = 0;i < 100; i++){
      var li = document.createElement(&quot;li&quot;);
        li.textContent = i;
        fragment.appendChild(li);
    }

    list.appendChild(fragment);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btnAdd"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">list</span> = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"list"</span>);    
    <span class="hljs-built_in">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();

    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">100</span>; i++){
      <span class="hljs-built_in">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
        li.textContent = i;
        fragment.appendChild(li);
    }

    <span class="hljs-built_in">list</span>.appendChild(fragment);
}</code></pre>
<p>优化后的代码主要是创建了一个fragment，每次生成的li节点先添加到fragment，最后一次性添加到list。</p>
<h3 id="articleHeader13">创建型API总结</h3>
<p>创建型api主要包括createElement，createTextNode，cloneNode和createDocumentFragment四个方法，需要注意下面几点：<br>（1）它们创建的节点只是一个孤立的节点，要通过appendChild添加到文档中<br>（2）cloneNode要注意如果被复制的节点是否包含子节点以及事件绑定等问题<br>（3）使用createDocumentFragment来解决添加大量节点时的性能问题</p>
<h2 id="articleHeader14">页面修改型API</h2>
<p>前面我们提到创建型api，它们只是创建节点，并没有真正修改到页面内容，而是要调用appendChild来将其添加到文档树中。我在这里将这类会修改到页面内容归为一类。<br>修改页面内容的api主要包括：appendChild，insertBefore，removeChild，replaceChild。</p>
<h3 id="articleHeader15">appendChild</h3>
<p>appendChild我们在前面已经用到多次，就是将指定的节点添加到调用该方法的节点的子元素的末尾。调用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parent.appendChild(child);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">parent.appendChild(child)<span class="hljs-comment">;</span></code></pre>
<p>child节点将会作为parent节点的最后一个子节点。<br>appendChild这个方法很简单，但是还有有一点需要注意：如果被添加的节点是一个页面中存在的节点，则执行后这个节点将会添加到指定位置，其原本所在的位置将移除该节点，也就是说不会同时存在两个该节点在页面上，相当于把这个节点移动到另一个地方。我们来看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;child&quot;>
    要被添加的节点
</div>
<br/>
<br/>
<br/>
<div id=&quot;parent&quot;>
    要移动的位置
</div>        
<input id=&quot;btnMove&quot; type=&quot;button&quot; value=&quot;移动节点&quot; />

document.getElementById(&quot;btnMove&quot;).onclick = function(){
    var child = document.getElementById(&quot;child&quot;);
    document.getElementById(&quot;parent&quot;).appendChild(child);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"child"</span>&gt;
    要被添加的节点
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;br/&gt;
&lt;br/&gt;
&lt;br/&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"parent"</span>&gt;
    要移动的位置
&lt;/<span class="hljs-keyword">div</span>&gt;        
&lt;input <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnMove"</span> type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"移动节点"</span> /&gt;

document.getElementById(<span class="hljs-string">"btnMove"</span>).onclick = function(){
    var child = document.getElementById(<span class="hljs-string">"child"</span>);
    document.getElementById(<span class="hljs-string">"parent"</span>).appendChild(child);
}</code></pre>
<p>这段代码主要是获取页面上的child节点，然后添加到指定位置，可以看到原本的child节点被移动到parent中了。<br>这里还有一个要注意的点：如果child绑定了事件，被移动时，它依然绑定着该事件。</p>
<h3 id="articleHeader16">insertBefore</h3>
<p>insertBefore用来添加一个节点到一个参照节点之前，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parentNode.insertBefore(newNode,refNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">parentNode.insertBefore(<span class="hljs-keyword">new</span><span class="hljs-type">Node</span>,refNode);</code></pre>
<p>parentNode表示新节点被添加后的父节点<br>newNode表示要添加的节点<br>refNode表示参照节点，新节点会添加到这个节点之前<br>我们来看这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot;>
    父节点
    <div id=&quot;child&quot;>                
        子元素
    </div>
</div>
<input type=&quot;button&quot; id=&quot;insertNode&quot; value=&quot;插入节点&quot; />

var parent = document.getElementById(&quot;parent&quot;);
var child = document.getElementById(&quot;child&quot;);
document.getElementById(&quot;insertNode&quot;).onclick = function(){
    var newNode = document.createElement(&quot;div&quot;);
    newNode.textContent = &quot;新节点&quot;
    parent.insertBefore(newNode,child);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>&lt;div id=<span class="hljs-string">"parent"</span>&gt;
    父节点
    &lt;div id=<span class="hljs-string">"child"</span>&gt;                
        子元素
    &lt;/div&gt;
&lt;/div&gt;
&lt;input type=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"insertNode"</span> value=<span class="hljs-string">"插入节点"</span> /&gt;

<span class="hljs-keyword">var</span> parent = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"parent"</span>);
<span class="hljs-keyword">var</span> child = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"child"</span>);
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"insertNode"</span>).onclick = <span class="hljs-keyword">function</span>(){
    <span class="hljs-keyword">var</span> newNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
    newNode.textContent = <span class="hljs-string">"新节点"</span>
    parent.insertBefore(newNode,child);
}</code></pre>
<p>这段代码创建了一个新节点，然后添加到child节点之前。<br>和appendChild一样，如果插入的节点是页面上的节点，则会移动该节点到指定位置，并且保留其绑定的事件。</p>
<p>关于第二个参数参照节点还有几个注意的地方：</p>
<blockquote><p>（1）refNode是必传的，如果不传该参数会报错<br>（2）如果refNode是undefined或null，则insertBefore会将节点添加到子元素的末尾</p></blockquote>
<h3 id="articleHeader17">removeChild</h3>
<p>removeChild顾名思义，就是删除指定的子节点并返回，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deletedChild = parent.removeChild(node);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">var deletedChild = parent.removeChild(<span class="hljs-keyword">node</span><span class="hljs-title">);</span></code></pre>
<p>deletedChild指向被删除节点的引用，它等于node，被删除的节点仍然存在于内存中，可以对其进行下一步操作。<br>注意：如果被删除的节点不是其子节点，则程序将会报错。我们可以通过下面的方式来确保可以删除：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(node.parentNode){
    node.parentNode.removeChild(node);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>if(<span class="hljs-keyword">node</span>.<span class="hljs-title">parentNode</span>){
    <span class="hljs-keyword">node</span>.<span class="hljs-title">parentNode</span>.removeChild(<span class="hljs-keyword">node</span><span class="hljs-title">);
}</span></code></pre>
<p>通过节点自己获取节点的父节点，然后将自身删除。</p>
<h3 id="articleHeader18">replaceChild</h3>
<p>replaceChild用于使用一个节点替换另一个节点，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parent.replaceChild(newChild,oldChild);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">parent.replaceChild(<span class="hljs-keyword">new</span><span class="hljs-type">Child</span>,oldChild);</code></pre>
<p>newChild是替换的节点，可以是新的节点，也可以是页面上的节点，如果是页面上的节点，则其将被转移到新的位置<br>oldChild是被替换的节点</p>
<h3 id="articleHeader19">页面修改型API总结</h3>
<p>页面修改型api主要是这四个接口，要注意几个特点：<br>（1）不管是新增还是替换节点，如果新增或替换的节点是原本存在页面上的，则其原来位置的节点将被移除，也就是说同一个节点不能存在于页面的多个位置<br>（2）节点本身绑定的事件会不会消失，会一直保留着。</p>
<h2 id="articleHeader20">节点查询型API</h2>
<p>节点查询型API也是非常常用的api，下面我们分别说明一下每一个api的使用。</p>
<h3 id="articleHeader21">document.getElementById</h3>
<p>这个接口很简单，根据元素id返回元素，返回值是Element类型，如果不存在该元素，则返回null。<br>使用这个接口有几点要注意：<br>（1）元素的Id是大小写敏感的，一定要写对元素的id<br>（2）HTML文档中可能存在多个id相同的元素，则返回第一个元素<br>（3）只从文档中进行搜索元素，如果创建了一个元素并指定id，但并没有添加到文档中，则这个元素是不会被查找到的</p>
<h3 id="articleHeader22">document.getElementsByTagName</h3>
<p>这个接口根据元素标签名获取元素，返回一个即时的HTMLCollection类型，什么是即时的HTMLCollection类型呢？我们来看看这个示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>div1</div>
<div>div2</div>
        
<input type=&quot;button&quot; value=&quot;显示数量&quot; id=&quot;btnShowCount&quot;/>
<input type=&quot;button&quot; value=&quot;新增div&quot; id=&quot;btnAddDiv&quot;/>    

var divList = document.getElementsByTagName(&quot;div&quot;);
document.getElementById(&quot;btnAddDiv&quot;).onclick = function(){
    var div = document.createElement(&quot;div&quot;);
    div.textContent =&quot;div&quot; + (divList.length+1);
    document.body.appendChild(div);
}
    
document.getElementById(&quot;btnShowCount&quot;).onclick = function(){
        alert(divList.length);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;div1&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span>&gt;div2&lt;/<span class="hljs-keyword">div</span>&gt;
        
&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"显示数量"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnShowCount"</span>/&gt;
&lt;input type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"新增div"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnAddDiv"</span>/&gt;    

var divList = document.getElementsByTagName(<span class="hljs-string">"div"</span>);
document.getElementById(<span class="hljs-string">"btnAddDiv"</span>).onclick = function(){
    var <span class="hljs-keyword">div</span> = document.createElement(<span class="hljs-string">"div"</span>);
    <span class="hljs-keyword">div</span>.textContent =<span class="hljs-string">"div"</span> + (divList.<span class="hljs-built_in">length</span>+<span class="hljs-number">1</span>);
    document.body.appendChild(<span class="hljs-keyword">div</span>);
}
    
document.getElementById(<span class="hljs-string">"btnShowCount"</span>).onclick = function(){
        alert(divList.<span class="hljs-built_in">length</span>);
}</code></pre>
<p>这段代码中有两个按钮，一个按钮是显示HTMLCollection元素的个数，另一个按钮可以新增一个div标签到文档中。前面提到HTMLCollcetion元素是即时的表示该集合是随时变化的，也就是是文档中有几个div，它会随时进行变化，当我们新增一个div后，再访问HTMLCollection时，就会包含这个新增的div。</p>
<p>使用document.getElementsByTagName这个方法有几点要注意：</p>
<blockquote><p>（1）如果要对HTMLCollection集合进行循环操作，最好将其长度缓存起来，因为每次循环都会去计算长度，暂时缓存起来可以提高效率<br>（2）如果没有存在指定的标签，该接口返回的不是null，而是一个空的HTMLCollection<br>（3）“*”表示所有标签</p></blockquote>
<h3 id="articleHeader23">document.getElementsByName</h3>
<p>getElementsByName主要是通过指定的name属性来获取元素，它返回一个即时的NodeList对象。<br>使用这个接口主要要注意几点：</p>
<blockquote><p>（1）返回对象是一个即时的NodeList，它是随时变化的<br>（2）在HTML元素中，并不是所有元素都有name属性，比如div是没有name属性的，但是如果强制设置div的name属性，它也是可以被查找到的<br>（3）在IE中，如果id设置成某个值，然后传入getElementsByName的参数值和id值一样，则这个元素是会被找到的，所以最好不好设置同样的值给id和name</p></blockquote>
<h3 id="articleHeader24">document.getElementsByClassName</h3>
<p>这个API是根据元素的class返回一个即时的HTMLCollection，用法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = document.getElementsByClassName(names);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.getElementsByClassName(names);</code></pre>
<p>这个接口有下面几点要注意：</p>
<blockquote><p>（1）返回结果是一个即时的HTMLCollection，会随时根据文档结构变化<br>（2）IE9以下浏览器不支持<br>（3）如果要获取2个以上classname，可传入多个classname，每个用空格相隔，例如：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elements = document.getElementsByClassName(&quot;test1 test2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> elements = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"test1 test2"</span>);</code></pre>
<h3 id="articleHeader25">document.querySelector和document.querySelectorAll</h3>
<p>这两个api很相似，通过css选择器来查找元素，注意选择器要符合CSS选择器的规则。<br>首先来介绍一下document.querySelector。<br>document.querySelector返回第一个匹配的元素，如果没有匹配的元素，则返回null。<br>注意，由于返回的是第一个匹配的元素，这个api使用的深度优先搜索来获取元素。我们来看这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div>
        <span class=&quot;test&quot;>第三级的span</span>    
    </div>
</div>
<div class=&quot;test&quot;>            
    同级的第二个div
</div>
<input type=&quot;button&quot; id=&quot;btnGet&quot; value=&quot;获取test元素&quot; />

document.getElementById(&quot;btnGet&quot;).addEventListener(&quot;click&quot;,function(){
    var element = document.querySelector(&quot;.test&quot;);
    alert(element.textContent);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;
        &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"test"</span>&gt;第三级的span&lt;/span&gt;    
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"test"</span>&gt;            
    同级的第二个<span class="hljs-keyword">div</span>
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;input type=<span class="hljs-string">"button"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnGet"</span> value=<span class="hljs-string">"获取test元素"</span> /&gt;

document.getElementById(<span class="hljs-string">"btnGet"</span>).addEventListener(<span class="hljs-string">"click"</span>,function(){
    var element = document.querySelector(<span class="hljs-string">".test"</span>);
    alert(element.textContent);
})</code></pre>
<p>这个例子很简单，就是两个class都包含“test”的元素，一个在文档树的前面，但是它在第三级，另一个在文档树的后面，但它在第一级，通过querySelector获取元素时，它通过深度优先搜索，拿到文档树前面的第三级的元素。</p>
<p>document.querySelectorAll的不同之处在于它返回的是所有匹配的元素，而且可以匹配多个选择符，我们来看看下面这个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot;>
    class为test
</div>
<div id=&quot;test&quot;>
    id为test
</div>
<input id=&quot;btnShow&quot; type=&quot;button&quot; value=&quot;显示内容&quot; />

document.getElementById(&quot;btnShow&quot;).addEventListener(&quot;click&quot;,function(){
    var elements = document.querySelectorAll(&quot;#test,.test&quot;);    
    for(var i = 0,length = elements.length;i<length;i++){
        alert(elements[i].textContent);
    }    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"test"</span>&gt;
    <span class="hljs-built_in">class</span>为test
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"test"</span>&gt;
    <span class="hljs-built_in">id</span>为test
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;input <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnShow"</span> type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"显示内容"</span> /&gt;

document.getElementById(<span class="hljs-string">"btnShow"</span>).addEventListener(<span class="hljs-string">"click"</span>,function(){
    var elements = document.querySelectorAll(<span class="hljs-string">"#test,.test"</span>);    
    <span class="hljs-keyword">for</span>(var i = <span class="hljs-number">0</span>,<span class="hljs-built_in">length</span> = elements.<span class="hljs-built_in">length</span>;i&lt;<span class="hljs-built_in">length</span>;i++){
        alert(elements[i].textContent);
    }    
})</code></pre>
<p>这段代码通过querySelectorAll，使用id选择器和class选择器选择了两个元素，并依次输出其内容。要注意两点：</p>
<blockquote><p>（1）querySelectorAll也是通过深度优先搜索，搜索的元素顺序和选择器的顺序无关<br>（2）返回的是一个非即时的NodeList，也就是说结果不会随着文档树的变化而变化</p></blockquote>
<p>兼容性问题：querySelector和querySelectorAll在ie8以下的浏览器不支持。</p>
<h2 id="articleHeader26">节点关系型api</h2>
<p>在html文档中的每个节点之间的关系都可以看成是家谱关系，包含父子关系，兄弟关系等等，下面我们依次来看看每一种关系。</p>
<h3 id="articleHeader27">父关系型api</h3>
<p>parentNode：每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment。</p>
<p>parentElement：返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null</p>
<h3 id="articleHeader28">兄弟关系型api</h3>
<p>previousSibling：节点的前一个节点，如果该节点是第一个节点，则为null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。</p>
<p>previousElementSibling：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。</p>
<p>nextSibling：节点的后一个节点，如果该节点是最后一个节点，则为null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。</p>
<p>nextElementSibling：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。</p>
<h3 id="articleHeader29">子关系型api</h3>
<p>childNodes：返回一个即时的NodeList，表示元素的子节点列表，子节点可能会包含文本节点，注释节点等。<br>children：一个即时的HTMLCollection，子节点都是Element，IE9以下浏览器不支持。<br>firstChild：第一个子节点。<br>lastChild：最后一个子节点。<br>hasChildNodes方法：可以用来判断是否包含子节点。</p>
<h2 id="articleHeader30">元素属性型api</h2>
<h3 id="articleHeader31">setAttribute</h3>
<p>setAttribute：根据名称和值修改元素的特性，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.setAttribute(name, value);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">element.setAttribute(<span class="hljs-keyword">name</span>, <span class="hljs-keyword">value</span>);</code></pre>
<p>其中name是特性名，value是特性值。如果元素不包含该特性，则会创建该特性并赋值。<br>如果元素本身包含指定的特性名为属性，则可以世界访问属性进行赋值，比如下面两条代码是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element.setAttribute(&quot;id&quot;,&quot;test&quot;);

element.id = &quot;test&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>element.setAttribute(<span class="hljs-string">"id"</span>,<span class="hljs-string">"test"</span>)<span class="hljs-comment">;</span>

element.id = <span class="hljs-string">"test"</span><span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader32">getAttribute</h3>
<p>getAttribute返回指定的特性名相应的特性值，如果不存在，则返回null或空字符串。用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = element.getAttribute(&quot;id&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">value</span> = element.getAttribute(<span class="hljs-string">"id"</span>);</code></pre>
<h2 id="articleHeader33">元素样式型api</h2>
<h3 id="articleHeader34">直接修改元素的样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elem.style.color = 'red';
elem.style.setProperty('font-size', '16px');
elem.style.removeProperty('color');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">color</span> = 'red';
<span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>.setProperty('<span class="hljs-built_in">font</span>-size', '16px');
<span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>.removeProperty('<span class="hljs-built_in">color</span>');</code></pre>
<h3 id="articleHeader35">动态添加样式规则</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var style = document.createElement('style');
style.innerHTML = 'body{color:red} #top:hover{background-color: red;color: white;}';
document.head.appendChild(style);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">style</span> = document.createElement('<span class="hljs-built_in">style</span>');
<span class="hljs-built_in">style</span>.innerHTML = 'body{<span class="hljs-built_in">color</span>:red} #top:hover{<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: red;<span class="hljs-built_in">color</span>: white;}';
document.head.appendChild(<span class="hljs-built_in">style</span>);</code></pre>
<h3 id="articleHeader36">window.getComputedStyle</h3>
<p>通过element.sytle.xxx只能获取到内联样式，借助window.getComputedStyle可以获取应用到元素上的所有样式，IE8或更低版本不支持此方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var style = window.getComputedStyle(element[, pseudoElt]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> style = <span class="hljs-built_in">window</span>.getComputedStyle(element[, pseudoElt]);</code></pre>
<p>element是要获取的元素，pseudoElt指定一个伪元素进行匹配。<br>返回的style是一个CSSStyleDeclaration对象。<br>通过style可以访问到元素计算后的样式</p>
<h3 id="articleHeader37">getBoundingClientRect</h3>
<p>getBoundingClientRect用来返回元素的大小以及相对于浏览器可视窗口的位置，兼容性非常好(IE6+)，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clientRect = element.getBoundingClientRect();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var clientRect</span> = element.getBoundingClientRect();</code></pre>
<p>clientRect是一个DOMRect对象，包含left，top，right，bottom，它是相对于可视窗口的距离，滚动位置发生改变时，它们的值是会发生变化的。除了IE9以下浏览器，还包含元素的height和width等数据,具体可查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" rel="nofollow noreferrer" target="_blank">链接</a>。</p>
<h2 id="articleHeader38">参考</h2>
<p>转载地址：<a href="http://luopq.com/2015/11/30/javascript-dom/" rel="nofollow noreferrer" target="_blank">http://luopq.com/2015/11/30/j...</a><br>参考地址：<a href="http://blog.liuxianan.com/javascript-dom-api.html#fu-guan-xi-API" rel="nofollow noreferrer" target="_blank">http://blog.liuxianan.com/jav...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS总结篇--[总结]JS操作DOM常用API详解

## 原文链接
[https://segmentfault.com/a/1190000009588427](https://segmentfault.com/a/1190000009588427)

