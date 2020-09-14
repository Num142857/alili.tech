---
title: '温故js系列（6）-DOM' 
date: 2019-02-05 2:30:09
hidden: true
slug: hkv9pxlbu4h
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/7" rel="nofollow noreferrer" target="_blank">DOM</a></p>
<h2 id="articleHeader0">JavaScript-DOM</h2>
<h3 id="articleHeader1">DOM简介</h3>
<p>DOM（Document Object Model）即文档对象模型，针对HTML 和XML 文档的API（应用程序接口）。DOM 描绘了一个层次化的节点树，运行开发人员添加、移除和修改页面的某一部分。通过 DOM，可以访问所有的 HTML 元素，连同它们所包含的文本和属性。可以对其中的内容进行修改和删除，同时也可以创建新的元素。document对象是文档的根节点，window.document属性就指向这个对象。</p>
<h3 id="articleHeader2">DOM节点</h3>
<p>分为元素节点、属性节点和文本节点。<br>而这些节点又有三个非常有用的属性，分别为：nodeName、nodeType 和nodeValue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="节点类型       nodeName     nodeType     nodeValue
  元素          元素名称       1           null
  属性          属性名称       2          属性值
  文本           #text        3     文本内容(不包含html)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>节点类型       nodeName     nodeType     nodeValue
  元素          元素名称       <span class="hljs-number">1</span>           null
  属性          属性名称       <span class="hljs-number">2</span>          属性值
  文本           #text        <span class="hljs-number">3</span>     文本内容(不包含html)</code></pre>
<p>F12打开console，即可操作当前网页节点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('mainLike').nodeName  //&quot;BUTTON&quot;
document.getElementById('mainLike').nodeType  //1
document.getElementById('mainLike').nodeValue //null
document.getElementById('mainLike').getAttributeNode(&quot;class&quot;).nodeName //&quot;class&quot;
document.getElementById('mainLike').getAttributeNode(&quot;class&quot;).nodeType //2
document.getElementById('mainLike').getAttributeNode(&quot;class&quot;).nodeValue //&quot;btn btn-success btn-lg mr10&quot;
document.getElementById('mainLike').firstChild.nodeName  //&quot;#text&quot; 对于所有文本节点nodeName都是&quot;#text&quot;
document.getElementById('mainLike').firstChild.nodeType  //3
document.getElementById('mainLike').firstChild.nodeValue  //&quot;0 推荐&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.nodeName</span>  <span class="hljs-comment">//"BUTTON"</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.nodeType</span>  <span class="hljs-comment">//1</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.nodeValue</span> <span class="hljs-comment">//null</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>).getAttributeNode(<span class="hljs-string">"class"</span>)<span class="hljs-selector-class">.nodeName</span> <span class="hljs-comment">//"class"</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>).getAttributeNode(<span class="hljs-string">"class"</span>)<span class="hljs-selector-class">.nodeType</span> <span class="hljs-comment">//2</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>).getAttributeNode(<span class="hljs-string">"class"</span>)<span class="hljs-selector-class">.nodeValue</span> <span class="hljs-comment">//"btn btn-success btn-lg mr10"</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.firstChild</span><span class="hljs-selector-class">.nodeName</span>  <span class="hljs-comment">//"#text" 对于所有文本节点nodeName都是"#text"</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.firstChild</span><span class="hljs-selector-class">.nodeType</span>  <span class="hljs-comment">//3</span>
document.getElementById(<span class="hljs-string">'mainLike'</span>)<span class="hljs-selector-class">.firstChild</span><span class="hljs-selector-class">.nodeValue</span>  <span class="hljs-comment">//"0 推荐"</span>
</code></pre>
<h3 id="articleHeader3">DOM元素选择</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      方法                      说明                  备注
getElementById()          获取特定ID元素的节点       获取单个节点对象
getElementsByClassName()  获取指定class类的节点列表  返回值为节点数组
getElementsByTagName()    获取相同元素的节点列表     返回值为节点数组
getElementsByName()       获取相同名称的节点列表     返回值为节点数组
querySelector             获取class第一个或id的节点  返回值为一个节点对象
querySelectorAll          获取class或id的节点列表    返回值为节点数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>      方法                      说明                  备注
<span class="hljs-function"><span class="hljs-title">getElementById</span><span class="hljs-params">()</span></span>          获取特定ID元素的节点       获取单个节点对象
<span class="hljs-function"><span class="hljs-title">getElementsByClassName</span><span class="hljs-params">()</span></span>  获取指定class类的节点列表  返回值为节点数组
<span class="hljs-function"><span class="hljs-title">getElementsByTagName</span><span class="hljs-params">()</span></span>    获取相同元素的节点列表     返回值为节点数组
<span class="hljs-function"><span class="hljs-title">getElementsByName</span><span class="hljs-params">()</span></span>       获取相同名称的节点列表     返回值为节点数组
querySelector             获取class第一个或id的节点  返回值为一个节点对象
querySelectorAll          获取class或id的节点列表    返回值为节点数组</code></pre>
<p>jQuery在选择器上做的非常好，使用的选择器引擎Sizzle占了jQuery很大一部分。延伸：<a href="https://segmentfault.com/a/1190000006667079">jQuery选择器浅析</a></p>
<p>querySelectorAll 和getElementsBy获取节点数组系列方法有一个很重要的区别：<br><code>querySelectorAll</code> 返回的是一个 <code>Static Node List</code><br><code>getElementsBy</code>系列的返回的是一个 <code>Live Node List</code></p>
<p>具体可参见<a href="https://www.zhihu.com/question/24702250" rel="nofollow noreferrer" target="_blank">知乎提问，答案很详细</a></p>
<h3 id="articleHeader4">获取HTML元素属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性         说明
id        元素节点的id 名称
title     元素节点的title 属性值
style     CSS 内联样式属性值
className CSS 元素的类

document.getElementById('xzavier').id; //获取id
document.getElementById('xzavier').id = 'man'; //设置id
document.getElementById('xzavier').title; //获取title
document.getElementById('xzavier').title = '标题' //设置title
document.getElementById('xzavier').style; //获取CSSStyleDeclaration对象
document.getElementById('xzavier').style.color; //获取style对象中color的值
document.getElementById('xzavier').style.color = 'red'; //设置style对象中color的值
document.getElementById('xzavier').className; //获取class
document.getElementById('xzavier').className = 'xzavier'; //设置class" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>属性         说明
id        元素节点的id 名称
title     元素节点的title 属性值
style     CSS 内联样式属性值
className CSS 元素的类

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).id; <span class="hljs-comment">//获取id</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).id = <span class="hljs-string">'man'</span>; <span class="hljs-comment">//设置id</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).title; <span class="hljs-comment">//获取title</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).title = <span class="hljs-string">'标题'</span> <span class="hljs-comment">//设置title</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).style; <span class="hljs-comment">//获取CSSStyleDeclaration对象</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).style.color; <span class="hljs-comment">//获取style对象中color的值</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).style.color = <span class="hljs-string">'red'</span>; <span class="hljs-comment">//设置style对象中color的值</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).className; <span class="hljs-comment">//获取class</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).className = <span class="hljs-string">'xzavier'</span>; <span class="hljs-comment">//设置class</span></code></pre>
<h3 id="articleHeader5">属性方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getAttribute()            获取特定元素节点属性的值
setAttribute()            设置特定元素节点属性的值
removeAttribute()         移除特定元素节点属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">getAttribute</span><span class="hljs-params">()</span></span>            获取特定元素节点属性的值
<span class="hljs-function"><span class="hljs-title">setAttribute</span><span class="hljs-params">()</span></span>            设置特定元素节点属性的值
<span class="hljs-function"><span class="hljs-title">removeAttribute</span><span class="hljs-params">()</span></span>         移除特定元素节点属性</code></pre>
<h4>getAttribute()方法</h4>
<p>getAttribute()方法将获取元素中某个属性的值。它和直接使用.属性获取属性值的方法有<br>一定区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').getAttribute('id');//获取元素的id 值
document.getElementById('xzavier').id; //获取元素的id 值
document.getElementById('xzavier').getAttribute('mydiv');//获取元素的自定义属性值
document.getElementById('xzavier').mydiv //获取元素的自定义属性值，非IE 不支持
document.getElementById('xzavier').getAttribute('class');//获取元素的class 值，IE 不支持
document.getElementById('xzavier').getAttribute('className');//非IE 不支持
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.getAttribute</span>(<span class="hljs-string">'id'</span>);<span class="hljs-comment">//获取元素的id 值</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.id</span>; <span class="hljs-comment">//获取元素的id 值</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.getAttribute</span>(<span class="hljs-string">'mydiv'</span>);<span class="hljs-comment">//获取元素的自定义属性值</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.mydiv</span> <span class="hljs-comment">//获取元素的自定义属性值，非IE 不支持</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.getAttribute</span>(<span class="hljs-string">'class'</span>);<span class="hljs-comment">//获取元素的class 值，IE 不支持</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.getAttribute</span>(<span class="hljs-string">'className'</span>);<span class="hljs-comment">//非IE 不支持</span>
</code></pre>
<p>这里说一下attribute和property的区别，基本可以总结为attribute节点都是在HTML代码中可见的，而property只是一个普通的名值对属性。</p>
<p>Property：属性，所有的HTML元素都由HTMLElement类型表示，HTMLElement类型直接继承自Element并添加了一些属性，添加的这些属性分别对应于每个HTML元素都有下面的这5个标准特性: id,title,lang,dir,className。DOM节点是一个对象，因此，他可以和其他JavaScript对象一样添加自定义的属性以及方法。property的值可以是任何的数据类型，对大小写敏感，自定义的property不会出现在html代码中，只存在js中。</p>
<p>Attribute：特性，区别于property，attribute只能是字符串，大小写不敏感，出现在innerHTML中，通过类数组attributes可以罗列所有的attribute。</p>
<p>相同之处<br>标准的 DOM properties 与 attributes 是同步的。公认的（非自定义的）特性会被以属性的形式添加到DOM对象中。如，id，align，style等，这时候操作property或者使用操作特性的DOM方法如getAttribute()都可以操作属性。不过传递给getAttribute()的特性名与实际的特性名相同。因此对于class的特性值获取的时候要传入“class”。</p>
<p>不同之处<br>1).对于有些标准的特性的操作，getAttribute与点号(.)获取的值存在差异性。如href，src，value，style，onclick等事件处理程序。<br>2).href：getAttribute获取的是href的实际值，而点号获取的是完整的url，存在浏览器差异。</p>
<h4>setAttribute()方法</h4>
<p>setAttribute()方法将设置元素中某个属性和值。它需要接受两个参数：属性名和值。如<br>果属性本身已存在，那么就会被覆盖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').setAttribute('align','center');//设置属性和值
document.getElementById('xzavier').setAttribute('xzavier','123456');//设置自定义的属性和值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.setAttribute</span>(<span class="hljs-string">'align'</span>,<span class="hljs-string">'center'</span>);<span class="hljs-comment">//设置属性和值</span>
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.setAttribute</span>(<span class="hljs-string">'xzavier'</span>,<span class="hljs-string">'123456'</span>);<span class="hljs-comment">//设置自定义的属性和值</span>
</code></pre>
<h4>removeAttribute()方法</h4>
<p>removeAttribute()可以移除HTML 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').removeAttribute('style');//移除属性
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xzavier'</span>)<span class="hljs-selector-class">.removeAttribute</span>(<span class="hljs-string">'style'</span>);<span class="hljs-comment">//移除属性</span>
</code></pre>
<p>PS：IE6 及更低版本不支持removeAttribute()方法。</p>
<h3 id="articleHeader6">层次节点属性</h3>
<p>节点的层次结构可以划分为：父节点与子节点、兄弟节点这两种。当我们获取其中一个元素节点的时候，就可以使用层次节点属性来获取它相关层次的节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   属性                说明
childNodes      获取当前元素节点的所有子节点
firstChild      获取当前元素节点的第一个子节点
lastChild       获取当前元素节点的最后一个子节点
ownerDocument   获取该节点的文档根节点，相当与document
parentNode      获取当前节点的父节点
previousSibling 获取当前节点的前一个同级节点
nextSibling     获取当前节点的后一个同级节点
attributes      获取当前元素节点的所有属性节点集合" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   属性                说明
childNodes      获取当前元素节点的所有子节点
firstChild      获取当前元素节点的第一个子节点
lastChild       获取当前元素节点的最后一个子节点
ownerDocument   获取该节点的文档根节点，相当与<span class="hljs-built_in">document</span>
parentNode      获取当前节点的父节点
previousSibling 获取当前节点的前一个同级节点
nextSibling     获取当前节点的后一个同级节点
attributes      获取当前元素节点的所有属性节点集合</code></pre>
<h3 id="articleHeader7">节点操作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      方法                说明
write()           把任意字符串插入到文档中
createElement()   创建一个元素节点
appendChild()     将新节点追加到子节点列表的末尾
createTextNode()  创建一个文件节点
insertBefore()    将新节点插入在前面
repalceChild()    将新节点替换旧节点
cloneNode()       复制节点
removeChild()     移除节点

document.write('<p>这是一个段落！</p>')';  //把任意字符串插入到文档中去
var xzavier = document.getElementById('xzavier'); //获取某一个元素节点
var p = document.createElement('p'); //创建一个新元素节点<p>
xzavier.appendChild(p); //把新元素节点<p>添加子节点末尾
var text = document.createTextNode('段落'); //创建一个文本节点
p.appendChild(text); //将文本节点添加到子节点末尾
xzavier.parentNode.insertBefore(p, xzavier); //把<div>之前创建一个节点
xzavier.parentNode.replaceChild(p,xzavier); //把<div>换成了<p>
var clone = xzavier.firstChild.cloneNode(true); //获取第一个子节点，true 表示复制内容
xzavier.appendChild(clone); //添加到子节点列表末尾
xzavier.parentNode.removeChild(xzavier); //删除指定节点
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>      方法                说明
write()           把任意字符串插入到文档中
createElement()   创建一个元素节点
appendChild()     将新节点追加到子节点列表的末尾
createTextNode()  创建一个文件节点
insertBefore()    将新节点插入在前面
repalceChild()    将新节点替换旧节点
cloneNode()       复制节点
removeChild()     移除节点

document.write('&lt;p&gt;这是一个段落！&lt;/p&gt;')';  <span class="hljs-comment">//把任意字符串插入到文档中去</span>
<span class="hljs-keyword">var</span> xzavier = document.getElementById(<span class="hljs-symbol">'xzavie</span>r'); <span class="hljs-comment">//获取某一个元素节点</span>
<span class="hljs-keyword">var</span> p = document.createElement('p'); <span class="hljs-comment">//创建一个新元素节点&lt;p&gt;</span>
xzavier.appendChild(p); <span class="hljs-comment">//把新元素节点&lt;p&gt;添加子节点末尾</span>
<span class="hljs-keyword">var</span> text = document.createTextNode('段落'); <span class="hljs-comment">//创建一个文本节点</span>
p.appendChild(text); <span class="hljs-comment">//将文本节点添加到子节点末尾</span>
xzavier.parentNode.insertBefore(p, xzavier); <span class="hljs-comment">//把&lt;div&gt;之前创建一个节点</span>
xzavier.parentNode.replaceChild(p,xzavier); <span class="hljs-comment">//把&lt;div&gt;换成了&lt;p&gt;</span>
<span class="hljs-keyword">var</span> clone = xzavier.firstChild.cloneNode(<span class="hljs-literal">true</span>); <span class="hljs-comment">//获取第一个子节点，true 表示复制内容</span>
xzavier.appendChild(clone); <span class="hljs-comment">//添加到子节点列表末尾</span>
xzavier.parentNode.removeChild(xzavier); <span class="hljs-comment">//删除指定节点</span>
</code></pre>
<h3 id="articleHeader8">DOM操作内容</h3>
<h4>innerText</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').innerText; //获取文本内容(如有html 直接过滤掉)
document.getElementById('xzavier').innerText = 'xzavier'; //设置文本(如有html 转义)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).innerText; <span class="hljs-comment">//获取文本内容(如有html 直接过滤掉)</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).innerText = <span class="hljs-string">'xzavier'</span>; <span class="hljs-comment">//设置文本(如有html 转义)</span>
</code></pre>
<p>除了Firefox 之外，其他浏览器均支持这个方法。但Firefox 的DOM3级提供了另外一个类似的属性：textContent，做上兼容即可通用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').textContent; //Firefox 支持" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).textContent; <span class="hljs-comment">//Firefox 支持</span></code></pre>
<p>兼容一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getInnerText(element) {
    return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
function setInnerText(element, text) {
    if (typeof element.textContent == 'string') {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getInnerText</span><span class="hljs-params">(element)</span> </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">typeof</span> element.textContent == <span class="hljs-string">'string'</span>) ? element.textContent : element.innerText;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setInnerText</span><span class="hljs-params">(element, text)</span> </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> element.textContent == <span class="hljs-string">'string'</span>) {
        element.textContent = text;
    } <span class="hljs-keyword">else</span> {
        element.innerText = text;
    }
}</code></pre>
<h4>innerHTML</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('xzavier').innerHTML; //获取文本(不过滤HTML)
document.getElementById('xzavier').innerHTML = '<b>xzavier</b>'; //可解析HTML
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).innerHTML; <span class="hljs-comment">//获取文本(不过滤HTML)</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xzavier'</span>).innerHTML = <span class="hljs-string">'&lt;b&gt;xzavier&lt;/b&gt;'</span>; <span class="hljs-comment">//可解析HTML</span>
</code></pre>
<p>虽然innerHTML 可以插入HTML，但本身还是有一定的限制，也就是所谓的作用域元素，离开这个作用域就无效了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.innerHTML = &quot;<script>alert('xzavier);</script>&quot;; //<script>元素不能被执行
xzavier.innerHTML = &quot;<style>background:red;</style>&quot;; //<style>元素不能被执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>xzavier.innerHTML = "<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">alert('xzavier);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>"; //<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">元素不能被执行
xzavier.innerHTML = "<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-tag">background</span><span class="hljs-selector-pseudo">:red</span>;</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>"; //<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">元素不能被执行</span></span></span></code></pre>
<p>还有两个方法outerText，outerHTML基本不怎么用。最常用的innerHTML 属性和节点操作方法的比较，在插入大量HTML 标记时使用innerHTML 的效率明显要高很多。因为在设置innerHTML 时，会创建一个HTML 解析器。这个解析器是浏览器级别的(C++编写)，因此执行JavaScript 会快的多。但，创建和销毁HTML 解析器也会带来性能损失。最好控制在最合理的范围内。</p>
<h3 id="articleHeader9">获取元素大小</h3>
<h4>clientWidth 和clientHeight</h4>
<p>这组属性可以获取元素可视区的大小，可以得到元素内容及内边距所占据的空间大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.clientWidth; //400
xzavier.clientHeight //400
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.clientWidth; <span class="hljs-comment">//400</span>
xzavier.clientHeight <span class="hljs-comment">//400</span>
</code></pre>
<p>返回了元素大小，但没有单位，默认单位是px<br>1.增加边框，无变化<br>2.增加外边距，无变化<br>3.增加滚动条，最终值等于原本大小减去滚动条的大小<br>4.增加内边距，最终值等于原本大小加上内边距的大小</p>
<h4>scrollWidth 和scrollHeight</h4>
<p>这组属性可以获取滚动内容的元素大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.scrollWidth; //400
xzavier.scrollWidth; //400
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.scrollWidth; <span class="hljs-comment">//400</span>
xzavier.scrollWidth; <span class="hljs-comment">//400</span>
</code></pre>
<p>1.增加内边距，最终值会等于原本大小加上内边距大小<br>2.增加滚动条，最终值会等于原本大小减去滚动条大小</p>
<h4>offsetWidth 和offsetHeight</h4>
<p>这组属性可以返回元素实际大小，包含边框、内边距和滚动条。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.offsetWidth;  //400
xzavier.offsetHeight; //400
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.offsetWidth;  <span class="hljs-comment">//400</span>
xzavier.offsetHeight; <span class="hljs-comment">//400</span>
</code></pre>
<p>返回了元素大小，默认单位是px。如果没有设置任何CSS 的宽和高度，他会得到计算后的宽度和高度。<br>1.增加边框，最终值会等于原本大小加上边框大小<br>2.增加内边距，最终值会等于原本大小加上内边距大小<br>3.增加外边据，无变化<br>4.增加滚动条，无变化，不会减小</p>
<h4>clientLeft 和clientTop</h4>
<p>这组属性可以获取元素设置了左边框和上边框的大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.clientLeft; //获取左边框的长度
xzavier.clientTop; //获取上边框的长度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.clientLeft; <span class="hljs-comment">//获取左边框的长度</span>
xzavier.clientTop; <span class="hljs-comment">//获取上边框的长度</span></code></pre>
<h4>offsetLeft 和offsetTop</h4>
<p>这组属性可以获取当前元素相对于父元素的位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.offsetLeft; //20
xzavier.offsetTop;  //20
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.offsetLeft; <span class="hljs-comment">//20</span>
xzavier.offsetTop;  <span class="hljs-comment">//20</span>
</code></pre>
<p>获取元素当前相对于父元素的位置，最好将它设置为定位position:absolute；否则不同的浏览器会有不同的解释。加上边框和内边距不会影响它的位置，但加上外边据会累加。</p>
<h4>scrollTop 和scrollLeft</h4>
<p>这组属性可以获取滚动条被隐藏的区域大小，也可设置定位到该区域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xzavier.scrollTop;  //获取滚动内容上方的位置
xzavier.scrollLeft; //获取滚动内容左方的位置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>xzavier.scrollTop;  <span class="hljs-comment">//获取滚动内容上方的位置</span>
xzavier.scrollLeft; <span class="hljs-comment">//获取滚动内容左方的位置</span>
</code></pre>
<p>滚动条回顶部</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function scrollStart(element) {
    if (element.scrollTop != 0) element.scrollTop = 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scrollStart</span><span class="hljs-params">(element)</span> </span>{
    <span class="hljs-keyword">if</span> (element.scrollTop != <span class="hljs-number">0</span>) element.scrollTop = <span class="hljs-number">0</span>;
}</code></pre>
<h3 id="articleHeader10">document对象属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     属性                      说明
document.title             设置文档标题
document.linkColor         未点击过的链接颜色
document.alinkColor        激活链接的颜色
document.vlinkColor        已点击过的链接颜色
document.URL               设置URL属性
document.fileSize          文件大小，只读属性
document.cookie            设置和读取cookie
document.charset           设置字符集 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>     属性                      说明
document<span class="hljs-selector-class">.title</span>             设置文档标题
document<span class="hljs-selector-class">.linkColor</span>         未点击过的链接颜色
document<span class="hljs-selector-class">.alinkColor</span>        激活链接的颜色
document<span class="hljs-selector-class">.vlinkColor</span>        已点击过的链接颜色
document<span class="hljs-selector-class">.URL</span>               设置URL属性
document<span class="hljs-selector-class">.fileSize</span>          文件大小，只读属性
document<span class="hljs-selector-class">.cookie</span>            设置和读取cookie
document<span class="hljs-selector-class">.charset</span>           设置字符集 
</code></pre>
<p>一般来说用的多的也就title，URL，cookie，charset等，其他的就不列了。</p>
<p>先写这么些，打篮球去了。代码，篮球，生活...DOM有太多内容了，多多学习，多多总结</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（6）-DOM

## 原文链接
[https://segmentfault.com/a/1190000006623511](https://segmentfault.com/a/1190000006623511)

