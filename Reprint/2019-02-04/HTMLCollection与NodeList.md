---
title: 'HTMLCollection与NodeList' 
date: 2019-02-04 2:30:58
hidden: true
slug: 313empnil4e
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">NodeList v.s. HTMLCollection</h1>
<p>主要有两个方面不一样<br><strong>1.包含节点的类型</strong><br><strong>2.使用方法</strong></p>
<p>1.包含节点的类型不同(重要)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)NodeList
一个节点的集合，既可以包含元素和其他节点(注释节点、文本节点等)。
(2)HTMLCollection
元素集合, 只有Element
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">1</span>)NodeList
一个节点的集合，既可以包含元素和其他节点(注释节点、文本节点等)。
(<span class="hljs-number">2</span>)HTMLCollection
元素集合, 只有Element
</code></pre>
<p>2.使用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="相同点：
1）    它们都有length属性
2）    都有元素的getter，叫做item，可以传入索引值取得元素。
3）    都是类数组
不同点：
HTMLCollection还有一个nameItem()方法，可以返回集合中name属性和id属性值的元素。（部分浏览器也支持NodeList的nameItem()方法）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>相同点：
<span class="hljs-number">1</span>）    它们都有<span class="hljs-built_in">length</span>属性
<span class="hljs-number">2</span>）    都有元素的getter，叫做<span class="hljs-built_in">item</span>，可以传入索引值取得元素。
<span class="hljs-number">3</span>）    都是类数组
不同点：
HTMLCollection还有一个nameItem()方法，可以返回集合中<span class="hljs-built_in">name</span>属性和<span class="hljs-built_in">id</span>属性值的元素。（部分浏览器也支持NodeList的nameItem()方法）
</code></pre>
<h2 id="articleHeader1">详细讲解</h2>
<p><strong>涉及获取元素的主要API</strong><br>DOM最初设计是为了解析XML而设计的，之后沿用到HTML上。我们可以把DOM分为两部分 core 和 html,Core 部分提供最基础的 XML 解析API说明，HTML 部分专为 HTML 中的 DOM 解析添加其特有的 API。NodeList接口是在core中体现的，HTMLCollection则是在html部分，不同浏览器也会实现它们的不同接口。但是现在的dom标准已经不分core和html了，反映的是浏览器的实现（）。唯一要注意的是 querySelectorAll 返回的虽然是 NodeList ，但是实际上是元素集合，并且是静态的（其他接口返回的HTMLCollection和NodeList都是live的）。<br><strong>DOM中的NodeList NamedNodeMap 及 HTMLCollection</strong><br>  把这三个放在一起说，是因为三者都是DOM中的array-like对象，即类数组对象（因而也都具有length属性）。<br>  （1）先说NamedNodeMap这个对象，这个比较简单，虽然翻译过来是 命名的节点映射，但它只不过是 Attr这个对象的一个集合，Attr对象是DOM元素节点的属性的对象表达。通过元素节点（element node）的attributes属性返回的就是NamedNodeMap这个对象。与NodeList相同的是它也是一个动态的集合（live collection），与NodeList不同的是，NamedNodeMap中保存的是一组无序的属性节点的集合。<br>  （2）NodeList对象是由childNodes属性，querySelectorAll方法返回的一组节点的集合，它保存着一组有序的节点。注意区别的是，由childNodes属性返回的NodeList对象是一个动态的集合（live collection）， 而由querySelectorAll方法返回的则是一个静态的集合（static collection）。因而在MDN中将他定义为 ”A sometimes-live collection“，live collection 指的是对对DOM的操作引起的的变化会实时的反映在这个集合里。<br>  （3）接下来就是HTMLCollection,它在本质是一个动态的NodeList对象。getElementsByTagName等方法返回的是包含零或多个元素的NodeList，在HTML文档中，返回的则是HTMLCollection对象。因此说它在本质上一个NodeList对象，包含一组有序（in document order基于文档结构顺序）的动态集合。</p>
<p>在获取原生DOM元素的时候，主要涉及这几个DOM API（链接为Living Standard）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="•    Node及对应集合NodeList
•    Element（继承Node）及对应集合HTMLCollection
•    Document(继承Node)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>•    <span class="hljs-keyword">Node</span><span class="hljs-title">及对应集合NodeList</span>
•    Element（继承<span class="hljs-keyword">Node</span><span class="hljs-title">）及对应集合HTMLCollection</span>
•    Document(继承<span class="hljs-keyword">Node</span><span class="hljs-title">)
</span></code></pre>
<p>注：计划取代NodeList和HTMLCollection的Elements目前并无广泛实现</p>
<p><strong>基础知识 -- NodeList v.s. HTMLCollection</strong><br>使用Node Interface的方法，如childNodes，得到的通常是NodeList，而使用其他Interface的方法，又有可能得到HTMLCollection。所以有必要了解一下这两者的区别。<br>关于这两个类型的差异，在Stackoverflow上有一个不错的问答。<br>其实，只要先看看Living Standard中这两个类型的IDL，便能猜出大概了。NodeList的IDL如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface NodeList {
  getter Node? item(unsigned long index);
  readonly attribute unsigned long length;
  iterable<Node>;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code>interface NodeList {
  <span class="hljs-keyword">getter</span> Node? item(<span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">long</span> index);
  <span class="hljs-keyword">readonly</span> attribute <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">long</span> length;
  iterable&lt;Node&gt;;
};</code></pre>
<p>而HTMLCollection的IDL如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface HTMLCollection {
  readonly attribute unsigned long length;
  getter Element? item(unsigned long index);
  getter Element? namedItem(DOMString name);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code>interface HTMLCollection {
  <span class="hljs-keyword">readonly</span> attribute <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">long</span> length;
  <span class="hljs-keyword">getter</span> Element? item(<span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">long</span> index);
  <span class="hljs-keyword">getter</span> Element? namedItem(DOMString name);
};
</code></pre>
<p>相同点：<br>4）    都是类数组对象<br>5）    它们都有length属性<br>6）都有元素的getter，叫做item<br>不同点：<br>1.NodeList的元素是Node,HTMLCollection的元素是Element。</p>
<p>Element继承自Node，是Node的一种，在HTML中，它一般是HTML元素（比如&lt;p&gt;之类的标签创建出来的对象）。而Node作为父类，除了Element还有一些其他子类，比如HTML元素内的文本对应的Text，文档对应的Document，注释对应的Comment。HTMLCollection里，只有Element，而NodeList里可以有Element、Text、Comment等多种元素。按说如果获取元素返回的列表里只有Element，那这两种类没多大区别，但事实上很多时候浏览器会将解析HTML文本时得到的Text和Comment一并放进列表里放回。比如说下面这一段代码</p>
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
<p>若将这个div的子元素放在列表里返回，那么如果是作为NodeList返回，浏览器最多可以给这个列表5个元素（不同浏览器可能不同）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    一个<div>和注释间的断行和空格（或tab）作为text node（没错，标签之间的空白符号也可以被解析为text node）
2.    注释作为comment node
3.    注释和<p>之间的断行和空格（或tab）作为text node
4.    p作为element
5.    </p>和</div>之间的断行和空格（或tab）作为text node
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-number">1</span>.    一个<span class="hljs-tag">&lt;div&gt;</span>和注释间的断行和空格（或tab）作为text <span class="hljs-keyword">node</span><span class="hljs-title">（没错，标签之间的空白符号也可以被解析为text</span> <span class="hljs-keyword">node</span><span class="hljs-title">）
2</span>.    注释作为comment <span class="hljs-keyword">node</span>
<span class="hljs-title">3</span>.    注释和<span class="hljs-tag">&lt;p&gt;</span>之间的断行和空格（或tab）作为text <span class="hljs-keyword">node</span>
<span class="hljs-title">4</span>.    p作为element
<span class="hljs-number">5</span>.    <span class="hljs-tag">&lt;/p&gt;</span>和<span class="hljs-tag">&lt;/div&gt;</span>之间的断行和空格（或tab）作为text <span class="hljs-keyword">node</span>
</code><span class="hljs-title"></span></pre>
<p>因此NodeList里可能会有很多一般DOM操作不需要的text node和comment node需要处理。而HTMLCollection则简单多了，只有&lt;p&gt;这一个元素，这也是比较符合大多数人直觉的结果。<br>2.HTMLCollection还有一个namedItem方法，可以快速获取其中元素。假设有这样一段HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
 <!-- Comment -->
<p>This is Some Text</p>
<img name=&quot;test&quot; src=&quot;test.jpg&quot;>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-comment">&lt;!-- Comment --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is Some Text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>那么假设得到了这个div的子元素构成的HTMLCollection，叫做list，那么使用list.namedItem("test")就可以直接得到里面的img元素。<br>查找顺序参考Living Standard，但是在现实中不是所有浏览器都遵循标准。比如标准规定如果有多个拥有相同id或者name的元素，只要返回第一个，但chrome和opera会将它们放在一个HTMLCollection或者NodeList里一并返回，参见MDN。<br>从IDL看不出来的还有如下几点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    这两个类都是“live”的。对其中元素进行操作，会实时反映到DOM中（也因此如果一次性直接在这类列表上进行多个DOM操作的话，带来的开销会很大）。
2.    item和namedItem都可以通过[]的缩写进行调用，有的浏览器还支持用()的缩写进行调用（也就是可以list[index]，list[key]或者list(index)，list(key)），以及直接用dot notation调用namedItem（比如list.key）。
3.    部分浏览器支持对NodeList调用namedItem或间接通过[]、()、dot notation来调用namedItem，但由于各浏览器支持不同，最好不对NodeList做这种操作。
4.    IE8及以下版本浏览器中，注释属于HTMLCommentElement,算作Element,因此会出现在HTMLCollection里。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>    这两个类都是“live”的。对其中元素进行操作，会实时反映到DOM中（也因此如果一次性直接在这类列表上进行多个DOM操作的话，带来的开销会很大）。
<span class="hljs-number">2.</span>    item和namedItem都可以通过[]的缩写进行调用，有的浏览器还支持用()的缩写进行调用（也就是可以<span class="hljs-type">list</span>[index]，<span class="hljs-type">list</span>[<span class="hljs-type">key</span>]或者<span class="hljs-type">list</span>(index)，<span class="hljs-type">list</span>(<span class="hljs-type">key</span>)），以及直接用dot notation调用namedItem（比如<span class="hljs-type">list</span>.<span class="hljs-type">key</span>）。
<span class="hljs-number">3.</span>    部分浏览器支持对NodeList调用namedItem或间接通过[]、()、dot notation来调用namedItem，但由于各浏览器支持不同，最好不对NodeList做这种操作。
<span class="hljs-number">4.</span>    IE8及以下版本浏览器中，注释属于HTMLCommentElement,算作Element,因此会出现在HTMLCollection里。
</code></pre>
<p><strong>NodeList</strong><br>　　NodeList是一个节点的集合(既可以包含元素和其他节点)，在DOM中，节点的类型总共有12种，通过判断节点的nodeType来判断节点的类型。<br>　　我们可以通过Node.childNodes和document.querySelectAll() (返回NodeList的接口有很多，这里不一一列举，下同)来获取到一个NodeList对象。<br>　　NodeList对象有个length属性和item()方法，length表示所获得的NodeList对象的节点个数，这里还是要强调的是节点，而item()可以传入一个索引来访问Nodelist中相应索引的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 <body>
 2     <div id=&quot;node&quot;>
 3         文本节点
 4         <!-- 注释节点 -->
 5         <span>node1</span>
 6         <span>node2</span>
 7         <span>node3</span>
 8     </div>
 9 </body>
10 <script>
11     var node = document.getElementById('node'),
12         nodeLists = node.childNodes
13     console.log(nodeLists.length) //     输出为9
14 </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 2     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"node"</span>&gt;</span>
 3         文本节点
 4         <span class="hljs-comment">&lt;!-- 注释节点 --&gt;</span>
 5         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 6         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 7         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 8     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 9 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
10 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-number">11</span>     <span class="hljs-keyword">var</span> node = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'node'</span>),
<span class="hljs-number">12</span>         nodeLists = node.childNodes
<span class="hljs-number">13</span>     <span class="hljs-built_in">console</span>.log(nodeLists.length) <span class="hljs-comment">//     输出为9</span>
<span class="hljs-number">14</span> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>　　上面的HTML代码中，“文本节点”和父节点子节点的空格（连着的文本）算做一个文本节点，然后是一个注释节点和注释节点和元素节点之间的空格（换行会产生空格，空格算做文本节点）的文本节点，紧接着的是一个元素节点和元素节点之间的换行的文本节点，三个元素节点和元素节点间的两个文本节点，最后是最后得元素节点和父元素之间的空格产生的文本节点，总共是9个节点。<br>　　NodeList对象的一大特点是它返回的内容是动态的（live）,也就是说我们上面代码获取nodeLists是类似于“指针”的东西，所以在下面代码中我们在获取了nodeLists之后再向node中插入一个创建的span标签后，发现获取到了nodeLists.length变为10了，但是querySelectorAll这个接口返回的nodeList对象比较特殊，它是个静态（static）的对象。而且是元素的集合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 <body>
 2     <div id=&quot;node&quot;>
 3         文本节点
 4         <!-- 注释节点 -->
 5         <span>node1</span>
 6         <span>node2</span>
 7         <span>node3</span>
 8     </div>
 9 </body>
10 <script>
11     var node = document.getElementById('node')
12     var nodeLists = node.childNodes
13     var queryNodes = node.querySelectorAll('span')
14     node.appendChild(document.createElement('span'))
15     console.log(nodeLists.length)  // 输出为10
16     console.log(queryNodes.length)  //输出为3
17 </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 2     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"node"</span>&gt;</span>
 3         文本节点
 4         <span class="hljs-comment">&lt;!-- 注释节点 --&gt;</span>
 5         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 6         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 7         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>node3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 8     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 9 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
10 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-number">11</span>     <span class="hljs-keyword">var</span> node = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'node'</span>)
<span class="hljs-number">12</span>     <span class="hljs-keyword">var</span> nodeLists = node.childNodes
<span class="hljs-number">13</span>     <span class="hljs-keyword">var</span> queryNodes = node.querySelectorAll(<span class="hljs-string">'span'</span>)
<span class="hljs-number">14</span>     node.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>))
<span class="hljs-number">15</span>     <span class="hljs-built_in">console</span>.log(nodeLists.length)  <span class="hljs-comment">// 输出为10</span>
<span class="hljs-number">16</span>     <span class="hljs-built_in">console</span>.log(queryNodes.length)  <span class="hljs-comment">//输出为3</span>
<span class="hljs-number">17</span> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>　　<strong>HTMLCollection</strong><br>　　HTMLCollection是元素集合，它和NodeList很像，有length属性来表示HTMLCollection对象的长度，也可以通过elements.item()传入元素索引来访问。当时它还有一个nameItem()方法，可以返回集合中name属性和id属性值得元素。HTMLDocument 接口的许多属性都是 HTMLCollection 对象，它提供了访问诸如表单、图像和链接等文档元素的便捷方式，比如document.images和document.forms的属性都是HTMLCollection对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1 <body>
 2     <img src=&quot;test.png&quot; id=&quot;image1&quot;>
 3     <img src=&quot;test.png&quot; id=&quot;image2&quot;>
 4     <img src=&quot;test.png&quot; id=&quot;image3&quot;>
 5     <img src=&quot;test.png&quot; id=&quot;image4&quot;>
 6     <img src=&quot;test.png&quot; id=&quot;image5&quot;>
 7     <img src=&quot;test.png&quot; id=&quot;image6&quot;>
 8 </body>
 9 <script>
10     console.log(document.images.namedItem('image1')) //<img src=&quot;test.png&quot; id=&quot;image1&quot;>
11 </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> <span class="hljs-number">1</span> &lt;body&gt;
 <span class="hljs-number">2</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image1"</span>&gt;
 <span class="hljs-number">3</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image2"</span>&gt;
 <span class="hljs-number">4</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image3"</span>&gt;
 <span class="hljs-number">5</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image4"</span>&gt;
 <span class="hljs-number">6</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image5"</span>&gt;
 <span class="hljs-number">7</span>     &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"test.png"</span> id=<span class="hljs-string">"image6"</span>&gt;
 <span class="hljs-number">8</span> &lt;/body&gt;
 <span class="hljs-number">9</span> &lt;script&gt;
<span class="hljs-number">10</span>     console.log(document<span class="hljs-selector-class">.images</span><span class="hljs-selector-class">.namedItem</span>(<span class="hljs-string">'image1'</span>)) <span class="hljs-comment">//&lt;img src="test.png" id="image1"&gt;</span>
<span class="hljs-number">11</span> &lt;/script&gt;
</code></pre>
<p>　　HTMLCollection的集合和NodeList对象一样也是动态的，他们获取的都是节点或元素集合的一个引用。<br>　　HTMLCollection和NodeList的实时性非常有用，但是，我们有时要迭代一个NodeList或HTMLCollection对象的时候，我们通常会选择生成当前对象的一个快照或静态副本：<br>转换为数组类型：<br> var staticLists = Array.prototype.slice.call(nodeListorHtmlCollection, 0)<br> 　这样的话，我们就可以放心的对当前的DOM集合做一些删减和插入操作，这个在DOM密集操作的时候很有用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTMLCollection与NodeList

## 原文链接
[https://segmentfault.com/a/1190000006782004](https://segmentfault.com/a/1190000006782004)

