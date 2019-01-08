---
title: '【EASYDOM系列教程】之定位页面元素' 
date: 2019-01-08 2:30:11
hidden: true
slug: bzm3o0gceak
categories: [reprint]
---

{{< raw >}}

                    
<p>Document 对象提供了属性和方法实现定位页面元素功能，这也是 DOM 的标准规范中 Document 对象的主要应用之一。</p>
<h2 id="articleHeader0">定位页面元素方法</h2>
<p>目前 Document 对象提供实现定位页面元素的方法具有如下几种:</p>
<ul>
<li><p>getElementById()方法：通过页面元素的 id 属性值定位元素。</p></li>
<li><p>getElementsByName()方法：通过页面元素的 name 属性值定位元素。</p></li>
<li><p>getElementsByTagName()方法：通过页面元素的元素名定位元素。</p></li>
<li><p>getElementsByClassName()方法：通过页面元素的 class 属性值定位元素。</p></li>
<li><p>querySelector()方法：通过 CSS 选择器定位第一个匹配的元素。</p></li>
<li><p>querySelectorAll()方法：通过 CSS 选择器定位所有匹配的元素。</p></li>
</ul>
<p>接下来，我们就一一进行学习。</p>
<h3 id="articleHeader1">通过元素的 ID 属性值定位元素</h3>
<p>HTML 页面元素的 id 属性的特点是唯一、不可重复的，所以通过这种方式定位的 HTML 页面元素也是唯一的。</p>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element = document.getElementById(id);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">element = <span class="hljs-built_in">document</span>.getElementById(id);</code></pre>
<p>在上述语法中，id 是参数，表示所要定位元素的 id 属性值，是一个大小写敏感的字符串。element 是返回值，表示定位的元素，是一个 Element 对象。</p>
<blockquote><p><strong>值得注意的是:</strong> 如果 HTML 页面中不存在具有该 id 属性值的元素，则返回 null。</p></blockquote>
<p>下面是使用 getElementById() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('btn');
// 获取定位元素的 class 属性值
var className = btn.className;
// 添加 animate 动画样式
className += ' animate';
// 将新的 class 属性值设置
btn.className = className;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-comment">// 获取定位元素的 class 属性值</span>
<span class="hljs-keyword">var</span> className = btn.className;
<span class="hljs-comment">// 添加 animate 动画样式</span>
className += <span class="hljs-string">' animate'</span>;
<span class="hljs-comment">// 将新的 class 属性值设置</span>
btn.className = className;</code></pre>
<p>上述代码通过 getElementById() 方法定位 HTML 页面中 id 属性值为 btn 的元素，并为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209051?token=e6ef7c26d6d8e62d21fe2be8c0b778ab">getElementById()方法完整示例代码</a></p></blockquote>
<h3 id="articleHeader2">通过元素的 name 属性值定位元素</h3>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements = document.getElementsByName(name);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">elements = <span class="hljs-built_in">document</span>.getElementsByName(name);</code></pre>
<p>在上述语法中，name 是参数，表示所要定位元素的 name 属性值，是一个大小写敏感的字符串。elements 是返回值，表示定位元素的集合，是一个 NodeList 集合。</p>
<p>下面是使用 getElementsByName() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.getElementsByName('btn');
// 循环遍历所有元素
for (var i=0; i<elems.length; i++) {
    var elem = elems[i]; 
    var className = elem.className; 
    className += ' animate'; 
    elem.className = className;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByName(<span class="hljs-string">'btn'</span>);
<span class="hljs-comment">// 循环遍历所有元素</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;elems.length; i++) {
    <span class="hljs-keyword">var</span> elem = elems[i]; 
    <span class="hljs-keyword">var</span> className = elem.className; 
    className += <span class="hljs-string">' animate'</span>; 
    elem.className = className;
}</code></pre>
<p>上述代码通过 getElementsByName() 方法定位 HTML 页面中 name 属性值为 btn 的元素，并遍历所有得到的元素，为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209115?token=1831aa5cbab5a938ed470b8b2c1c6908" target="_blank">getElementsByName()方法完整示例代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000010209115" data-typeid="4">点击预览</button></p></blockquote>
<h3 id="articleHeader3">通过元素的元素名定位元素</h3>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements = document.getElementsByTagName(name);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">elements = <span class="hljs-built_in">document</span>.getElementsByTagName(name);</code></pre>
<p>在上述语法中，name 是参数，表示所要定位元素的元素名，符号”*”表示所有元素。elements 是返回值，表示定位元素的集合，是一个 NodeList 集合。</p>
<p>下面是使用 getElementsByTagName() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.getElementsByTagName('button');
// 循环遍历所有元素
for (var i=0; i<elems.length; i++) {
    var elem = elems[i]; 
    var className = elem.className; 
    className += ' animate'; 
    elem.className = className;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'button'</span>);
<span class="hljs-comment">// 循环遍历所有元素</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;elems.length; i++) {
    <span class="hljs-keyword">var</span> elem = elems[i]; 
    <span class="hljs-keyword">var</span> className = elem.className; 
    className += <span class="hljs-string">' animate'</span>; 
    elem.className = className;
}</code></pre>
<p>上述代码通过 getElementsByTagName() 方法定位 HTML 页面中元素名为 button 的元素，并遍历所有得到的元素，为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209126?token=255ac7c69be79f2c39e9cf2576b39501">getElementsByTagName()方法完整示例代码</a></p></blockquote>
<h3 id="articleHeader4">通过元素的 class 属性值定位元素</h3>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements = document.getElementsByClassName(names);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">elements = <span class="hljs-built_in">document</span>.getElementsByClassName(names);</code></pre>
<p>在上述语法中，names 是参数，表示所要定位元素的 class 属性值列表，class 名称通过空格分隔。</p>
<blockquote><p><strong>值得注意的是:</strong> names 参数可以是一个样式属性名称，也可以是多个样式属性名称。</p></blockquote>
<p>elements 是返回值，表示定位元素的集合，是一个 NodeList 集合。</p>
<p>下面是使用 getElementsByClassName() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.getElementsByClassName('btn');
// 循环遍历所有元素
for (var i=0; i<elems.length; i++) {
    var elem = elems[i]; 
    var className = elem.className; 
    className += ' animate'; 
    elem.className = className;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'btn'</span>);
<span class="hljs-comment">// 循环遍历所有元素</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;elems.length; i++) {
    <span class="hljs-keyword">var</span> elem = elems[i]; 
    <span class="hljs-keyword">var</span> className = elem.className; 
    className += <span class="hljs-string">' animate'</span>; 
    elem.className = className;
}</code></pre>
<p>上述代码通过 getElementsByClassName() 方法定位 HTML 页面中 class 属性值为 btn 的元素，并遍历所有得到的元素，为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209178?token=f9ddd8e75c0c7e605bf570e9010c2aff" target="_blank">getElementsByClassName()方法完整示例代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000010209178" data-typeid="4">点击预览</button></p></blockquote>
<h4>兼容 IE 8 及之前版本的浏览器</h4>
<p>getElementsByClassName() 方法只支持 IE 9 版本及之后版本的浏览器。也就是说，该方法并不支持 IE 8 及之前版本的浏览器。</p>
<p>下图是不同浏览器的不同版本对 getElementsByClassName() 方法的支持情况:</p>
<p><span class="img-wrap"><img data-src="/img/bVQZ96?w=1996&amp;h=733" src="https://static.alili.tech/img/bVQZ96?w=1996&amp;h=733" alt="getElementsByClassName()方法的兼容性" title="getElementsByClassName()方法的兼容性" style="cursor: pointer; display: inline;"></span></p>
<p>由于国内的生产环境中，依旧存在使用 IE 8 及之前版本浏览器的情况。所以，我们需要自定义 getElementsByClassName() 方法解决浏览器的兼容问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getElementsByClassName(element, names) {

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByClassName</span>(<span class="hljs-params">element, names</span>) </span>{

}</code></pre>
<p>上述自定义兼容方法接受两个参数，element 参数表示调用 getElementsByClassName() 方法的对象（目前为 Document 对象），names 参数表示所要定位元素的 class 属性值列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getElementsByClassName(element, names) {
    // 检测 getElementsByClassName() 是否可用
    if (element.getElementsByClassName) {
        // 优先使用 W3C 规范
        return element.getElementsByClassName(names);
    }else {
        // 人为解决 IE 8 之前版本不兼容问题

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByClassName</span>(<span class="hljs-params">element, names</span>) </span>{
    <span class="hljs-comment">// 检测 getElementsByClassName() 是否可用</span>
    <span class="hljs-keyword">if</span> (element.getElementsByClassName) {
        <span class="hljs-comment">// 优先使用 W3C 规范</span>
        <span class="hljs-keyword">return</span> element.getElementsByClassName(names);
    }<span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 人为解决 IE 8 之前版本不兼容问题</span>

    }
}</code></pre>
<p>这里我们要优先使用 W3C 规范的方法。所以，需要先判断当前浏览器环境是否存在 getElementsByClassName() 方法。</p>
<p>如果存在，就使用原本的 getElementsByClassName() 方法。如果不存在，就使用自定义代码来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getElementsByClassName(element, names) {
    // 检测 getElementsByClassName() 是否可用
    if (element.getElementsByClassName) {
        // 优先使用 W3C 规范
        return element.getElementsByClassName(names);
    }else {
        // 人为解决 IE 8 之前版本不兼容问题
        
        // 获取所有后代元素节点
        var elements = element.getElementsByTagName('*');
        // 定义空数组
        var result = [];
        var element, classNameStr, flag;
        // 将样式名称改为数组类型
        names = names.split(' ');
        // 循环遍历所有元素节点
        for (var i=0; element = elements[i]; i++) {
              // 获取每个元素节点的样式名称
            classNameStr = ' ' + element.className + ' ';
            // 开启开关
            flag = true; 
            // 循环遍历所有的样式名称
            for (var j=0, name; name = names[j]; j++) {
                // 判断当前元素节点的样式名称中是否包含指定的样式名称
                if (classNameStr.indexOf(' ' + name + ' ') == -1){
                    // 如果不包含，则关闭开关，并且结束循环
                    flag = false;
                    break;
                }
            } 
            // 判断当前元素节点是否包含指定样式名称
            if (flag) {
                // 如果包含，则将当前元素节点添加到数组中
                result.push(element);
            }
        } 
        // 返回数组(所有包含指定样式名称的元素节点)
        return result;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementsByClassName</span>(<span class="hljs-params">element, names</span>) </span>{
    <span class="hljs-comment">// 检测 getElementsByClassName() 是否可用</span>
    <span class="hljs-keyword">if</span> (element.getElementsByClassName) {
        <span class="hljs-comment">// 优先使用 W3C 规范</span>
        <span class="hljs-keyword">return</span> element.getElementsByClassName(names);
    }<span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 人为解决 IE 8 之前版本不兼容问题</span>
        
        <span class="hljs-comment">// 获取所有后代元素节点</span>
        <span class="hljs-keyword">var</span> elements = element.getElementsByTagName(<span class="hljs-string">'*'</span>);
        <span class="hljs-comment">// 定义空数组</span>
        <span class="hljs-keyword">var</span> result = [];
        <span class="hljs-keyword">var</span> element, classNameStr, flag;
        <span class="hljs-comment">// 将样式名称改为数组类型</span>
        names = names.split(<span class="hljs-string">' '</span>);
        <span class="hljs-comment">// 循环遍历所有元素节点</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; element = elements[i]; i++) {
              <span class="hljs-comment">// 获取每个元素节点的样式名称</span>
            classNameStr = <span class="hljs-string">' '</span> + element.className + <span class="hljs-string">' '</span>;
            <span class="hljs-comment">// 开启开关</span>
            flag = <span class="hljs-literal">true</span>; 
            <span class="hljs-comment">// 循环遍历所有的样式名称</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>, name; name = names[j]; j++) {
                <span class="hljs-comment">// 判断当前元素节点的样式名称中是否包含指定的样式名称</span>
                <span class="hljs-keyword">if</span> (classNameStr.indexOf(<span class="hljs-string">' '</span> + name + <span class="hljs-string">' '</span>) == <span class="hljs-number">-1</span>){
                    <span class="hljs-comment">// 如果不包含，则关闭开关，并且结束循环</span>
                    flag = <span class="hljs-literal">false</span>;
                    <span class="hljs-keyword">break</span>;
                }
            } 
            <span class="hljs-comment">// 判断当前元素节点是否包含指定样式名称</span>
            <span class="hljs-keyword">if</span> (flag) {
                <span class="hljs-comment">// 如果包含，则将当前元素节点添加到数组中</span>
                result.push(element);
            }
        } 
        <span class="hljs-comment">// 返回数组(所有包含指定样式名称的元素节点)</span>
        <span class="hljs-keyword">return</span> result;
    }
}</code></pre>
<h3 id="articleHeader5">通过 CSS 选择器定位元素</h3>
<p>CSS 中的选择器可以很便利地定位 HTML 页面元素，DOM 的标准规范中也提供类似的方法。</p>
<ul>
<li><p>querySelector(): 定位匹配选择器的第一个元素。</p></li>
<li><p>querySelectorAll(): 定位匹配选择器的所有元素。</p></li>
</ul>
<h4>querySelector() 方法</h4>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="element = document.querySelector(selectors);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">element = <span class="hljs-built_in">document</span>.querySelector(selectors);</code></pre>
<p>在上述语法中，selectors 是参数，表示选择器，可以包含一个或多个 CSS 选择器，多个则以逗号分隔。element 是返回值，表示定位元素的集合，匹配的第一个元素。</p>
<p>下面是使用 querySelector() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.querySelector(’#btn');
// 获取定位元素的 class 属性值
var className = btn.className;
// 添加 animate 动画样式
className += ' animate';
// 将新的 class 属性值设置
btn.className = className;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.querySelector(’#btn<span class="hljs-string">');
// 获取定位元素的 class 属性值
var className = btn.className;
// 添加 animate 动画样式
className += '</span> animate<span class="hljs-string">';
// 将新的 class 属性值设置
btn.className = className;</span></code></pre>
<p>上述代码通过 querySelector() 方法定位 HTML 页面中 id 属性值为 btn 的元素，并为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209480?token=3a491eb123a2eb0c9e5f55d580ad35b7">querySelector()方法完整示例代码</a></p></blockquote>
<h4>querySelectorAll() 方法</h4>
<p>其语法格式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elements = document.querySelectorAll(selectors);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">elements = <span class="hljs-built_in">document</span>.querySelectorAll(selectors);</code></pre>
<p>在上述语法中，selectors 是参数，表示选择器，可以包含一个或多个 CSS 选择器，多个则以逗号分隔。elements 是返回值，表示定位元素的集合，是一个 NodeList 集合。</p>
<p>下面是使用 querySelectorAll() 方法的示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.querySelectorAll('button');
// 循环遍历所有元素
for (var i=0; i<elems.length; i++) {
    var elem = elems[i]; 
    var className = elem.className; 
    className += ' animate'; 
    elem.className = className;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'button'</span>);
<span class="hljs-comment">// 循环遍历所有元素</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;elems.length; i++) {
    <span class="hljs-keyword">var</span> elem = elems[i]; 
    <span class="hljs-keyword">var</span> className = elem.className; 
    className += <span class="hljs-string">' animate'</span>; 
    elem.className = className;
}</code></pre>
<p>上述代码通过 querySelectorAll() 方法定位 HTML 页面中元素名为 button 的元素，并遍历所有得到的元素，为其元素的 class 属性添加 animate 样式。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209497?token=903ad7e37db4e57b4208b737c21985f8" target="_blank">querySelectorAll()方法完整示例代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000010209497" data-typeid="4">点击预览</button></p></blockquote>
<h2 id="articleHeader6">节点集合 NodeList</h2>
<p>NodeList 是一组元素节点的集合，每个节点具有相应的索引值（从 0 开始的数字，类似于数组）。</p>
<p>元素节点在 NodeList 集合中存储的顺序与它们在 HTML 页面中的顺序保持一致。</p>
<p>NodeList 的属性 length 表示 NodeList 对象中包含的节点个数。方法 item(index) 表示返回 NodeList 对象中指定索引的节点。如果索引值越界,则返回 null。</p>
<p>NodeList 集合分为两种: 动态 NodeList 和静态 NodeList。</p>
<h3 id="articleHeader7">动态的 NodeList 集合</h3>
<p>所谓动态的 NodeList 集合，就是如果文档中的节点树发生变化，则已经存在的 NodeList 对象也可能会变化。</p>
<p>以下几种定位 HTML 页面元素的方法返回的都是动态的 NodeList 集合。</p>
<ul>
<li><p>getElementsByName()方法：通过页面元素的 name 属性值定位元素。</p></li>
<li><p>getElementsByTagName()方法：通过页面元素的元素名定位元素。</p></li>
<li><p>getElementsByClassName()方法：通过页面元素的 class 属性值定位元素。</p></li>
</ul>
<p>我们可以通过以下示例代码，体验动态 NodeList 集合的特点:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.getElementsByTagName('button');
console.log(elems.length);// 输出 3

// 添加一个新的button按钮
var btn = document.createElement('button');
btn.setAttribute('class','button');
var text = document.createTextNode('New Button');
btn.appendChild(text);

var div = document.getElementsByClassName('button-group')[0];
div.appendChild(btn);

console.log(elems.length);// 输出 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'button'</span>);
<span class="hljs-built_in">console</span>.log(elems.length);<span class="hljs-comment">// 输出 3</span>

<span class="hljs-comment">// 添加一个新的button按钮</span>
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
btn.setAttribute(<span class="hljs-string">'class'</span>,<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">var</span> text = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'New Button'</span>);
btn.appendChild(text);

<span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'button-group'</span>)[<span class="hljs-number">0</span>];
div.appendChild(btn);

<span class="hljs-built_in">console</span>.log(elems.length);<span class="hljs-comment">// 输出 4</span></code></pre>
<p>上述代码通过 getElementsByTagName() 方法定位 HTML 页面中所有的 button 元素，测试打印 button 元素的个数是 3 个。</p>
<p>然后，我们创建一个新的 button 元素，并且将其添加到 HTML 页面中，再测试打印 button 元素的个数是 4 个。</p>
<blockquote>
<p><strong>值得注意的是:</strong> 我们在第二次测试打印 button 元素的个数时，并没有重新定位 HTML 页面中的 button 元素。</p>
<p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209572?token=64f562f26f2ae19e63c28bbea71956aa">动态 NodeList 集合完整示例代码</a></p>
</blockquote>
<h3 id="articleHeader8">静态 NodeList 集合</h3>
<p>所谓静态 NodeList 集合，就是对文档对象模型的任何改动都不会影响集合的内容。</p>
<p>querySelectorAll() 方法定位 HTML 页面元素所返回的 NodeList 集合就是静态 NodeList 集合。</p>
<p>我们可以通过以下示例代码，体验静态 NodeList 集合的特点:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elems = document.querySelectorAll('button');
console.log(elems.length);// 输出 3

// 添加一个新的button按钮
var btn = document.createElement('button');
btn.setAttribute('class','button');
var text = document.createTextNode('New Button');
btn.appendChild(text);

var div = document.getElementsByClassName('button-group')[0];
div.appendChild(btn);

console.log(elems.length);// 输出 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'button'</span>);
<span class="hljs-built_in">console</span>.log(elems.length);<span class="hljs-comment">// 输出 3</span>

<span class="hljs-comment">// 添加一个新的button按钮</span>
<span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
btn.setAttribute(<span class="hljs-string">'class'</span>,<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">var</span> text = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">'New Button'</span>);
btn.appendChild(text);

<span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'button-group'</span>)[<span class="hljs-number">0</span>];
div.appendChild(btn);

<span class="hljs-built_in">console</span>.log(elems.length);<span class="hljs-comment">// 输出 3</span></code></pre>
<p>上述代码通过 querySelectorAll() 方法定位 HTML 页面中所有的 button 元素，测试打印 button 元素的个数是 3 个。</p>
<p>然后，我们创建一个新的 button 元素，并且将其添加到 HTML 页面中，再测试打印 button 元素的个数依旧是 3 个。</p>
<blockquote><p><strong>完整示例代码请点击右边的链接:</strong> <a href="https://segmentfault.com/n/1330000010209605?token=bdf2bfe0b725882a8c89630f40d78676" target="_blank">静态 NodeList 集合完整示例代码</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000010209605" data-typeid="4">点击预览</button></p></blockquote>
<h2 id="articleHeader9">定位页面元素属性</h2>
<p>Document 对象也提供了一些属性，来定位 HTML 页面中一些比较特殊的元素。</p>
<ul>
<li><p>documentElement：获取 HTML 页面中的 <code>&lt;html&gt;</code> 元素。</p></li>
<li><p>head：获取 HTML 页面中的 <code>&lt;head&gt;</code> 元素。</p></li>
<li><p>title：获取 HTML 页面中的 <code>&lt;title&gt;</code> 元素。</p></li>
<li><p>body：获取 HTML 页面中的 <code>&lt;body&gt;</code> 元素。</p></li>
<li><p>links：获取 HTML 页面中的所有 <code>&lt;a&gt;</code> 元素。</p></li>
<li><p>images：获取 HTML 页面中的所有 <code>&lt;img&gt;</code> 元素。</p></li>
</ul>
<p>我们可以定义一个包含以上元素的 HTML 页面，然后通过以下示例代码进行测试:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.title);
console.log(document.links);
console.log(document.images);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.documentElement);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.head);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.body);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.title);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.links);
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.images);</code></pre>
<hr>
<p>本教程免费开源，任何人都可以免费学习、分享，甚至可以进行修改。但需要注明作者及来源，并且不能用于商业。</p>
<p>本教程采用<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。</p>
<p><span class="img-wrap"><img data-src="/img/bVSpaA?w=922&amp;h=302" src="https://static.alili.tech/img/bVSpaA?w=922&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【EASYDOM系列教程】之定位页面元素

## 原文链接
[https://segmentfault.com/a/1190000010209673](https://segmentfault.com/a/1190000010209673)

