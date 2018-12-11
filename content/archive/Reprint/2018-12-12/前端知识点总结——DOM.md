---
title: '前端知识点总结——DOM' 
date: 2018-12-12 2:30:10
hidden: true
slug: uc4esg3n2i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——DOM</strong></h1>
<h2 id="articleHeader1">1.什么是DOM: Document Object Model</h2>
<p>什么是: 专门操作网页内容的API标准——w3c<br> 为什么: 统一不同浏览器操作网页内容的API标准<br>   优点: 几乎所有浏览器100%兼容</p>
<h2 id="articleHeader2">2.DOM Tree:</h2>
<p>什么是: 网页中所有内容在内存中都是保存在一棵树形结构中<br>  网页中每项内容(元素,文本,属性,注释...)，都是树上的一个节点对象。<br>  唯一的树根节点: document<br> 为什么: 树形结构是最好的保存上下级包含关系的结构</p>
<p>节点对象: Node<br>  网页中每项内容都是DOM树上的一个节点对象:<br>  所有节点都有的三个属性: <br>   nodeType: 节点类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="何时: 只要判断节点的类型时
包括: 
  document  9
  element    1
  attribute   2
  text       3
问题: 无法进一步区分元素的标签名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>何时: 只要判断节点的类型时
包括: 
  document  <span class="hljs-number">9</span>
  <span class="hljs-keyword">element</span>    <span class="hljs-number">1</span>
  attribute   <span class="hljs-number">2</span>
  <span class="hljs-keyword">text</span>       <span class="hljs-number">3</span>
问题: 无法进一步区分元素的标签名</code></pre>
<p>nodeName: 节点名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="何时: 只要进一步判断元素的标签名时
    ——可代替nodeType
包括:
 document   #document
 element     全大写标签名
 attribute     属性名——不常用!
 text        #text" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>何时: 只要进一步判断元素的标签名时
    ——可代替nodeType
包括:
 document   <span class="hljs-comment">#document</span>
 <span class="hljs-keyword">element</span>     全大写标签名
 attribute     属性名——不常用!
 <span class="hljs-keyword">text</span>        <span class="hljs-comment">#text</span></code></pre>
<p>nodeValue: 节点值 ——不常用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document  null
 element    null
 attribute   属性值
 text       文本内容
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> document  <span class="hljs-literal">null</span>
 <span class="hljs-keyword">element</span>    <span class="hljs-literal">null</span>
 attribute   属性值
 <span class="hljs-keyword">text</span>       文本内容
</code></pre>
<h2 id="articleHeader3">3.查找: 4种:</h2>
<p>1.不需要查找可直接获得节点:<br>  document.documentElement    html<br>  document.head               head<br>  document.body               body<br>  document.forms[id/i]          form</p>
<p>2.按节点间关系查找:<br>  何时: 如果已经获得一个节点了。想找周围节点时。<br>   包括: 2种树:</p>
<ol><li>节点树: 包含网页中所有内容的完整树结构<br> 2大类关系:<br> 1.父子: 4种:<br>  elem.parentNode  elem的父节点<br>  elem.childNodes   elem的直接子节点<br>  elem.firstChild     elem下的第一个直接子节点<br>  elem.lastChild     elem下的最后一个直接子节点<br> 2.兄弟: 2种:<br>  elem.previousSibling  elem的前一个兄弟元素<br>  elem.nextSibling      elem的后一个兄弟元素<br>  问题: 受看不见的空字符的干扰!</li></ol>
<p>2.元素树: 仅包含元素节点的树结构<br>   2大类关系:</p>
<ol><li>父子: 4种:<br> elem.parentElement  elem的父元素<br> elem.children       elem的直接子元素<br> elem.firstElementChild     elem下的第一个直接子元素<br> elem.lastElementChild     elem下的最后一个直接子元素</li></ol>
<p>2.兄弟: 2种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elem.previousElementSibling  elem的前一个兄弟元素
elem.nextElementSibling      elem的后一个兄弟元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">elem</span>.previousElementSibling  <span class="hljs-built_in">elem</span>的前一个兄弟元素
<span class="hljs-built_in">elem</span>.nextElementSibling      <span class="hljs-built_in">elem</span>的后一个兄弟元素</code></pre>
<p>今后只要用DOM操作网页内容，都用元素树<br> 说明: 元素树不是一棵新树，其实只是节点树的一个子集</p>
<p>childNodes和children: 动态集合(live collection)<br>  什么是: 不实际存储属性值，每次访问集合都重新查找DOM树<br>  优: 首次查找，效率高!  因为不用返回完整的属性。<br>  缺: 每次访问集合，都会重新查找DOM树，降低效率<br>  遍历: <br>   不好: for(var i=0;i&lt;children.length;i++){...}<br>   好: for(var i=0,len=children.length;i&lt;len;i++){...}</p>
<p>遍历指定父元素下的所有后代元素: 2种:<br>  1.递归: 2步:<br>   1.定义函数仅遍历指定父元素下的所有直接子元素<br>   2.对每个直接子节点调用和父节点完全相同的操作<br>   深度优先: 当一个节点同时拥有子节点和兄弟节点时，总是优先遍历子节点。<br>   所有子节点遍历完，才返回遍历兄弟节点。<br>  2.循环: 2步:<br>   1.定义迭代器:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 迭代器: 可以依次获得每个后代元素节点的 专门对象
 如何: 
  创建: var iterator=document.createNodeIterator(
    parent, NodeFilter.SHOW_ELEMENT, null, false
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> 迭代器: 可以依次获得每个后代元素节点的 专门对象
 如何: 
  创建: <span class="hljs-built_in">var</span> iterator=<span class="hljs-built_in">document</span>.createNodeIterator(
    <span class="hljs-built_in">parent</span>, NodeFilter.SHOW_ELEMENT, <span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>
  );</code></pre>
<p>2.循环调用迭代器，获得下一个节点对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var curr=iterator.nextNode()
 内置深度优先遍历的算法
 如果curr返回null，说明遍历结束
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">var</span> curr=iterator.nextNode()
 内置深度优先遍历的算法
 如果curr返回<span class="hljs-literal">null</span>，说明遍历结束
</code></pre>
<p>3.按HTML查找: 4种: <br>   1.按id查找:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elem=document.getElementById(&quot;id&quot;)
返回值: 一个元素
  如果找不到返回null!
强调: 1. 只能在document上调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> elem=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"id"</span>)
返回值: 一个元素
  如果找不到返回<span class="hljs-keyword">null</span>!
强调: <span class="hljs-number">1.</span> 只能在<span class="hljs-built_in">document</span>上调用</code></pre>
<p>2.按标签名查找:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems=parent.getElementsByTagName(&quot;标签名&quot;)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: 1. 可在任意父元素上调用
     2. 不但找直接子元素，且在所有后代中查找" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> elems=<span class="hljs-keyword">parent</span>.getElementsByTagName(<span class="hljs-string">"标签名"</span>)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: <span class="hljs-number">1.</span> 可在任意父元素上调用
     <span class="hljs-number">2.</span> 不但找直接子元素，且在所有后代中查找</code></pre>
<p>3.按name查找:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems=document.getElementsByName(&quot;name&quot;)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: 只能在document上调用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> elems=<span class="hljs-built_in">document</span>.getElementsByName(<span class="hljs-string">"name"</span>)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: 只能在<span class="hljs-built_in">document</span>上调用</code></pre>
<p>4.按class查找:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems=parent.getElementsByClassName(&quot;class&quot;)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: 1.可在任意父元素上调用
     2.不但找直接子元素，且在所有后代中查找
     3.只要元素的一个class名匹配，就能找到该元素
      强调: 返回的集合都是动态集合
      问题: 每次只能按一个条件查找
      当查找条件复杂时，步骤很繁琐
      解决: 用选择器查找:

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> elems=parent.getElementsByClassName(<span class="hljs-string">"class"</span>)
返回值: 多个元素的集合
  如果找不到返回空集合
强调: <span class="hljs-number">1.</span>可在任意父元素上调用
     <span class="hljs-number">2.</span>不但找直接子元素，且在所有后代中查找
     <span class="hljs-number">3.</span>只要元素的一个<span class="hljs-class"><span class="hljs-keyword">class</span>名匹配，就能找到该元素</span>
      强调: 返回的集合都是动态集合
      问题: 每次只能按一个条件查找
      当查找条件复杂时，步骤很繁琐
      解决: 用选择器查找:

</code></pre>
<h2 id="articleHeader4">4.用选择器查找:</h2>
<p>1.仅查找一个符合条件的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elem=parent.querySelector(&quot;选择器&quot;)
返回值: 一个元素
  如果找不到,返回null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> elem=parent.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">"选择器"</span>)
返回值: 一个元素
  如果找不到,返回<span class="hljs-keyword">null</span></code></pre>
<p>2.查找多个符合条件的元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems=parent.querySelectorAll(&quot;选择器&quot;)
返回值: 多个元素的集合
  如果找不到返回空集合
  返回非动态集合: 实际存储属性值，即使反复访问集合，
  也不会导致反复查找DOM树
强调: 1. 可在任何父元素上调用
     2. 选择器只要相对于当前父元素内部即可
     3. 选择器的兼容性，受制于当前浏览器的兼容性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> elems=parent.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">"选择器"</span>)
返回值: 多个元素的集合
  如果找不到返回空集合
  返回非动态集合: 实际存储属性值，即使反复访问集合，
  也不会导致反复查找DOM树
强调: <span class="hljs-number">1.</span> 可在任何父元素上调用
     <span class="hljs-number">2.</span> 选择器只要相对于当前父元素内部即可
     <span class="hljs-number">3.</span> 选择器的兼容性，受制于当前浏览器的兼容性</code></pre>
<p>鄙视: 按HTML查找和按选择器查找的差别:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.返回值: 按HTML查找返回动态集合
          按选择器查找返回非动态集合
2.效率: 首次查找: 按HTML查找效率高
                 按选择器查找效率低
3.易用性: 按HTML查找繁琐
          按选择器查找简单" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ldif"><code><span class="hljs-attribute">1.返回值</span>: 按HTML查找返回动态集合
          按选择器查找返回非动态集合
<span class="hljs-attribute">2.效率</span>: 首次查找: 按HTML查找效率高
                 按选择器查找效率低
<span class="hljs-attribute">3.易用性</span>: 按HTML查找繁琐
          按选择器查找简单</code></pre>
<p>总结: 今后，只要一个条件即可找到想要的元素，首选按HTML查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    只要查找条件复杂，都选按选择器查找" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">    只要查找条件复杂，都选按选择器查找</code></pre>
<p>jQuery中就是这么选择的</p>
<h2 id="articleHeader5">5.修改:</h2>
<p>内容: .innerHTML  .textContent  .value<br> 属性: 3种:<br>  1.HTML标准属性: 2种:<br>   1.核心DOM: 最初的DOM API，要求支持所有结构化文档</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  优: 几乎万能   缺: 繁琐
 获取属性节点: var attrNode=elem.attributes[i]
 获取属性值: attrNode.value
   其实可以一步: var value=elem.getAttribute(&quot;属性名&quot;)
 修改属性值: elem.setAttribute(&quot;属性名&quot;,&quot;值&quot;)
 移除属性: elem.removeAttribute(&quot;属性名&quot;)
 判断是否包含指定属性: elem.hasAttribute(&quot;属性名&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  优: 几乎万能   缺: 繁琐
 获取属性节点: <span class="hljs-selector-tag">var</span> attrNode=elem<span class="hljs-selector-class">.attributes</span>[i]
 获取属性值: attrNode<span class="hljs-selector-class">.value</span>
   其实可以一步: <span class="hljs-selector-tag">var</span> value=elem.getAttribute(<span class="hljs-string">"属性名"</span>)
 修改属性值: elem.setAttribute(<span class="hljs-string">"属性名"</span>,<span class="hljs-string">"值"</span>)
 移除属性: elem.removeAttribute(<span class="hljs-string">"属性名"</span>)
 判断是否包含指定属性: elem.hasAttribute(<span class="hljs-string">"属性名"</span>)</code></pre>
<p>2.HTML DOM: 专门操作HTML内容的API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            对核心DOM 常用API的简化
 优: 简单   缺: 不是万能
 简化: HTML DOM提前将所有标准属性，封装在了元素对象上，可用.直接访问.
  比如:
    获取属性值: elem.属性名
    修改属性值: elem.属性名=&quot;值&quot;
     移除属性: elem.属性名=&quot;&quot;
     判断是否包含指定属性: elem.属性名!==&quot;&quot;
 特例: class属性: 
   ES的对象中已经先入为主的包含了内部属性class，用来记录对象创建时的类型名。
   HTML的class属性就无法同时存在
 所以: DOM: html的class属性，更名为className" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>            对核心DOM 常用API的简化
 优: 简单   缺: 不是万能
 简化: HTML DOM提前将所有标准属性，封装在了元素对象上，可用.直接访问.
  比如:
    获取属性值: elem.属性名
    修改属性值: elem.属性名=<span class="hljs-string">"值"</span>
     移除属性: elem.属性名=<span class="hljs-string">""</span>
     判断是否包含指定属性: elem.属性名!==<span class="hljs-string">""</span>
 特例: <span class="hljs-class"><span class="hljs-keyword">class</span>属性: </span>
   ES的对象中已经先入为主的包含了内部属性<span class="hljs-class"><span class="hljs-keyword">class</span>，用来记录对象创建时的类型名。</span>
   HTML的<span class="hljs-class"><span class="hljs-keyword">class</span>属性就无法同时存在</span>
 所以: <span class="hljs-symbol">DOM:</span> html的<span class="hljs-class"><span class="hljs-keyword">class</span>属性，更名为<span class="hljs-title">className</span></span></code></pre>
<p>2.状态属性: disabled  selected  checked<br>   1.不能用核心DOM修改: 因为值是bool类型<br>   2.只能用HTML DOM,打.修改<br>  3.自定义扩展属性: <br>   何时: 2种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. 在元素上保存自定义数据
 2. 代替其他选择器，用来查找元素绑定事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> 在元素上保存自定义数据
 <span class="hljs-number">2.</span> 代替其他选择器，用来查找元素绑定事件</code></pre>
<p>如何: 2套:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 不能用HTML DOM访问, 因为不是标准属性，未被提前封装在DOM元素对象中
 1. 普通属性名+核心DOM
 2. HTML5: 
  定义属性时: data-属性名=&quot;值&quot;
  获取或修改属性值: elem.dataset.属性名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> 不能用HTML DOM访问, 因为不是标准属性，未被提前封装在DOM元素对象中
 <span class="hljs-number">1</span>. 普通属性名+核心DOM
 <span class="hljs-number">2</span>. HTML5: 
  定义属性时: data-属性名=<span class="hljs-string">"值"</span>
  获取或修改属性值: elem<span class="hljs-selector-class">.dataset</span>.属性名</code></pre>
<p>固定用法: 用自定义扩展属性代替其它选择器，为元素绑定事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 为什么: 
   id: 唯一
   class: 经常变化
   elem: 做一种效果，可能使用任何元素
 解决: 今后，只要给元素绑定事件时，都要先为元素添加自定义扩展属性，
 再用自定义扩展属性查找元素，绑定事件
  优: 没有个数限制, 不会受样式影响而变化，不受元素限制
 如何: 
  定义: data-属性名=&quot;值&quot;
  查找: 只能用属性选择器查找:[data-属性名=值]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> 为什么: 
   id: 唯一
   <span class="hljs-class"><span class="hljs-keyword">class</span>: <span class="hljs-type">经常变化</span></span>
   elem: 做一种效果，可能使用任何元素
 解决: 今后，只要给元素绑定事件时，都要先为元素添加自定义扩展属性，
 再用自定义扩展属性查找元素，绑定事件
  优: 没有个数限制, 不会受样式影响而变化，不受元素限制
 如何: 
  定义: <span class="hljs-keyword">data</span>-属性名=<span class="hljs-string">"值"</span>
  查找: 只能用属性选择器查找:[<span class="hljs-keyword">data</span>-属性名=值]
</code></pre>
<h2 id="articleHeader6">6.样式: 2种:</h2>
<p>1.内联样式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="修改: elem.style.css属性名
 强调: 1. css属性名都要去横线变驼峰
      2.长度数值必须加px单位
获取: 
 问题: 不能用elem.style.css属性名
 原因: elem.style仅包含内联样式! 无法获得内部或外部样式表中的样式
 解决: 获取计算后的样式!
  计算后的样式: 最终应用到元素上的所有样式的集合
                且将相对值换算为绝对值
  何时: 只要获取样式时，都要获取计算后的样式
  如何: 2步:
    1. 获得计算后的style对象:
      var style=getComputedStyle(elem);
    2. 从style中获得css属性值
      var value=style.css属性值
  强调: getComputedStyle获得样式都是只读！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>修改: <span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>.css属性名
 强调: <span class="hljs-number">1</span>. css属性名都要去横线变驼峰
      <span class="hljs-number">2</span>.长度数值必须加px单位
获取: 
 问题: 不能用<span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>.css属性名
 原因: <span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>仅包含内联样式! 无法获得内部或外部样式表中的样式
 解决: 获取计算后的样式!
  计算后的样式: 最终应用到元素上的所有样式的集合
                且将相对值换算为绝对值
  何时: 只要获取样式时，都要获取计算后的样式
  如何: <span class="hljs-number">2</span>步:
    <span class="hljs-number">1</span>. 获得计算后的<span class="hljs-built_in">style</span>对象:
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">style</span>=getComputedStyle(<span class="hljs-built_in">elem</span>);
    <span class="hljs-number">2</span>. 从<span class="hljs-built_in">style</span>中获得css属性值
      <span class="hljs-built_in">var</span> value=<span class="hljs-built_in">style</span>.css属性值
  强调: getComputedStyle获得样式都是只读！</code></pre>
<p>2.内部/外部: 3步:<br>   1.获得样式表对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var sheet=document.styleSheets[i];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">var</span> sheet=<span class="hljs-built_in">document</span>.styleSheets[i];</code></pre>
<p>2.获得样式表对象中的cssRule</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 什么是cssRule: 样式表中每个{}就是一个cssRule
 如何获得: var rule=sheet.cssRules[i]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> 什么是cssRule: 样式表中每个{}就是一个cssRule
 如何获得: <span class="hljs-selector-tag">var</span> rule=sheet<span class="hljs-selector-class">.cssRules</span>[i]</code></pre>
<p>3.获得cssRule中的style对象的css属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var value=rule.style.css属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">var</span> value=rule<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.css</span>属性</code></pre>
<p>问题: 用elem.style.css属性一句话只能修改一个css属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 如果同时修改多个属性，代码会很繁琐" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 如果同时修改多个属性，代码会很繁琐</code></pre>
<p>解决: 用class批量应用样式<br>  如何: 2步:</p>
<ol>
<li>在css中准备好各种class</li>
<li>用程序，在对应情况下，选择对应的class应用！</li>
</ol>
<h2 id="articleHeader7">7.添加:</h2>
<p>添加: 3步:</p>
<ol><li>创建空元素<br> var a=document.createElement("a");<br><a></a>
</li></ol>
<p>2.设置必要属性<br>   a.href="http://tmooc.cn";<br>   a.innerHTML="go to tmooc";<br>  3.将新元素添加到DOM树:3种api:<br>   parent.appendChild(a) 将a追加到指定父元素下末尾<br>   parent.insertBefore(a, child) 将a插入到指定父元素下的现有子元素之前<br>   parent.replaceChild(a, child) 用a替换指定父元素下的现有子元素</p>
<p>优化: 尽量减少操作DOM树的次数, 从而减少重排重绘<br> 为什么: <br>  HTML页面加载过程:<br>   html -&gt; DOM Tree</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       ↓
      Render Tree -> ***layout -> paint
       ↑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>       ↓
      R<span class="hljs-function"><span class="hljs-title">ender</span> Tree -&gt;</span> ***<span class="hljs-function"><span class="hljs-title">layout</span> -&gt;</span> paint
       ↑</code></pre>
<p>css -&gt; cssRules<br> 如何:</p>
<ol><li>如果同时添加父元素和子元素时，应先在内存中，将所有子元素添加到父元素中，<br>   再最后一次性将父元素添加到页面上</li></ol>
<h2 id="articleHeader8">8.删除:</h2>
<p>优化: 尽量减少操作DOM树的次数<br>  为什么: 减少重排重绘<br>  如何: 2种:<br>   1.如果同时添加父元素和子元素，则应该现在内存中，将子元素添加到父元素，再最后将父元素一次性整体添加到DOM Tree<br>   2.如果父元素已经在页面上了，要添加多个平级子元素，则应该使用文档片段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="什么是文档片段: 内存中临时存储多个子元素的虚拟父元素
何时: 只要向网页中同时添加多个平级子元素时，都可用文档片段
如何: 3步:
 1.创建文档片段
 2.将子元素添加到文档片段
 3.将文档片段整体添加到DOM 树
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>什么是文档片段: 内存中临时存储多个子元素的虚拟父元素
何时: 只要向网页中同时添加多个平级子元素时，都可用文档片段
如何: 3步:
 1.创建文档片段
 2.将子元素添加到文档片段
 3.将文档片段整体添加到DOM 树
</code></pre>
<p>删除: parent.removeChild(child)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="通常: child.parentNode.removeChild(child)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>通常: child<span class="hljs-selector-class">.parentNode</span><span class="hljs-selector-class">.removeChild</span>(child)
</code></pre>
<h2 id="articleHeader9">9.HTML DOM常用对象:</h2>
<p>Image: 创建: var img=new Image();</p>
<p>Select: 代表页面上一个select元素<br>  属性: <br>   .selectedIndex 获得当前select选中的option的下标位置<br>   .value 获得select中选中的option的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      如果选中的option没有value属性，则用innerHTML代替" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;">      如果选中的<span class="hljs-keyword">option</span>没有<span class="hljs-keyword">value</span>属性，则用innerHTML代替</code></pre>
<p>.options 获得当前select下所有option的集合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .options.length 获得select下所有option的个数
  .options.length=0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> <span class="hljs-selector-class">.options</span><span class="hljs-selector-class">.length</span> 获得select下所有option的个数
  <span class="hljs-selector-class">.options</span><span class="hljs-selector-class">.length</span>=<span class="hljs-number">0</span></code></pre>
<p>.length =&gt; .options.length</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 清空所有option  .length=0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rsl"><code style="word-break: break-word; white-space: initial;"> 清空所有<span class="hljs-built_in">option</span>  .<span class="hljs-built_in">length</span>=<span class="hljs-number">0</span></code></pre>
<p>方法: .add(option) 追加一个option</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    问题: .add不支持文档片段
  .remove(i) 移除i位置的option
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>    问题: .add不支持文档片段
  .<span class="hljs-keyword">remove</span>(i) 移除i位置的<span class="hljs-keyword">option</span>
</code></pre>
<p>Option: 代表select下一个option元素<br>  创建: var opt=new Option(text,value)<br>  属性: .text   .value  .index</p>
<p>Table: 代表一个table元素<br>  管着行分组:<br>   创建行分组: var thead=table.createTHead()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          var tbody=table.createTBody()
          var tfoot=table.createTFoot()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>          <span class="hljs-selector-tag">var</span> tbody=<span class="hljs-selector-tag">table</span>.createTBody()
          <span class="hljs-selector-tag">var</span> tfoot=<span class="hljs-selector-tag">table</span>.createTFoot()</code></pre>
<p>删除行分组: table.deleteTHead()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          table.deleteTFoot()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">          <span class="hljs-selector-tag">table</span>.deleteTFoot()</code></pre>
<p>获取行分组: table.tHead   table.tFoot   table.tBodies[i]<br> 行分组: 管着行:<br>   添加行: var tr=行分组.insertRow(i)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   在i位置插入一个新行
   固定套路: 1. 在末尾追加新行: .insertRow()
            2. 在开头插入新行: .insertRow(0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>   在i位置插入一个新行
   固定套路: 1. 在末尾追加新行: .insertRow()
            2. 在开头插入新行: .insertRow(0)</code></pre>
<p>删除行: 行分组.deleteRow(i) ——不常用!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    问题: i要求是在当前行分组内的相对下标位置
         无法自动获得
    应换为: table.deleteRow(tr.rowIndex)
     tr.rowIndex可自动获得当前行在整个table内的位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    问题: i要求是在当前行分组内的相对下标位置
         无法自动获得
    应换为: <span class="hljs-selector-tag">table</span>.deleteRow(<span class="hljs-selector-tag">tr</span>.rowIndex)
     <span class="hljs-selector-tag">tr</span>.rowIndex可自动获得当前行在整个table内的位置</code></pre>
<p>获取行: 行分组.rows[i]<br> 行: 管着格<br>  添加格: var td=tr.insertCell(i)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="固定用法: 行末尾追加一个格: tr.insertCell()
说明: 只能创建td，不能创建th" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>固定用法: 行末尾追加一个格: <span class="hljs-selector-tag">tr</span>.insertCell()
说明: 只能创建td，不能创建th</code></pre>
<p>删除格: tr.deleteCell(i)<br>  获取格: tr.cells[i]</p>
<p>Form: 代表一个form元素<br>  获取: var form=document.forms[i/id]<br>  属性: .elements 获得表单中所有表单元素的集合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     .elements.length  获得表单中，表单元素的个数
   .length => .elements.length" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>     <span class="hljs-selector-class">.elements</span><span class="hljs-selector-class">.length</span>  获得表单中，表单元素的个数
   <span class="hljs-selector-class">.length</span> =&gt; <span class="hljs-selector-class">.elements</span><span class="hljs-selector-class">.length</span></code></pre>
<p>方法: .submit() 代替submit按钮，在程序中实现手动提交表单</p>
<p>表单元素: <br>  获取: form.elements[i/id/name]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    更简化: form.name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">    更简化: <span class="hljs-keyword">form</span>.<span class="hljs-keyword">name</span></code></pre>
<p>方法: .focus 让当前表单元素获得焦点</p>
<p><strong>结语：觉得总结的还可以的话，点下赞咯，你们的鼓励是我前进的动力，谢谢各位老铁们！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——DOM

## 原文链接
[https://segmentfault.com/a/1190000013452603](https://segmentfault.com/a/1190000013452603)

