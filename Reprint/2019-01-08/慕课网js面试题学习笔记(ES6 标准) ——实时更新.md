---
title: '慕课网js面试题学习笔记(ES6 标准) ——实时更新' 
date: 2019-01-08 2:30:10
hidden: true
slug: 80qvntjyjgm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">最近在在看前端面试教程，这篇文章里大部分是看视频的过程中自己遇到的不清楚的知识点，内容很简单，只是起到一个梳理作用。有些地方也根据自己的理解在作者的基础上加了点东西，如有错误，欢迎交流。</h2>
<h2 id="articleHeader1">1、typeof有几种结果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined、、boolean、object、string、number、function、symbol（ES6新增）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-literal">undefined</span>、、<span class="hljs-built_in">boolean</span>、object、<span class="hljs-built_in">string</span>、<span class="hljs-built_in">number</span>、<span class="hljs-function"><span class="hljs-keyword">function</span>、<span class="hljs-title">symbol</span>（<span class="hljs-title">ES6</span>新增）
</span></code></pre>
<h2 id="articleHeader2">2、何时使用 ===,何时使用 ==</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(obj.a == null) {
    //相当于obj.a === null || obj.a === undefined
    //除了这种情况用 == 之外，全部用 === 
    //这是jquery的推荐写法
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-keyword">if</span><span class="hljs-comment">(obj.a == null)</span> {
    <span class="hljs-comment">//相当于obj.a === null || obj.a === undefined</span>
    <span class="hljs-comment">//除了这种情况用 == 之外，全部用 === </span>
    <span class="hljs-comment">//这是jquery的推荐写法</span>
}</code></pre>
<h2 id="articleHeader3">3、js中的内置函数有哪些？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object()、Array()、Boolean()、Number()、String()、Function()、Date()、RegExp()、Error()

//注意：构造函数的函数名一般都以大写字母开头，自己定义的构造函数也尽量这样写" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>()、<span class="hljs-built_in">Array</span>()、<span class="hljs-built_in">Boolean</span>()、<span class="hljs-built_in">Number</span>()、<span class="hljs-built_in">String</span>()、<span class="hljs-built_in">Function</span>()、<span class="hljs-built_in">Date</span>()、<span class="hljs-built_in">RegExp</span>()、<span class="hljs-built_in">Error</span>()

<span class="hljs-comment">//注意：构造函数的函数名一般都以大写字母开头，自己定义的构造函数也尽量这样写</span></code></pre>
<h2 id="articleHeader4">4、window.onload和DOMContentLoaded的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

当DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>当onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

当DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
</code></pre>
<h2 id="articleHeader5">5、如何理解JSON</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON首先是一种数据格式，也是js的一种内置对象，它有两个方法：stringify()（序列化）、parse()（反序列化）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">JSON</span>首先是一种数据格式，也是<span class="hljs-selector-tag">js</span>的一种内置对象，它有两个方法：<span class="hljs-selector-tag">stringify</span>()（序列化）、<span class="hljs-selector-tag">parse</span>()（反序列化）
</code></pre>
<h2 id="articleHeader6">5、变量类型和引用类型的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="js中变量分为两种类型，值类型：boolean、undefined、number、string和引用类型（object）。值类型的变量定义体和具体的值都存在栈内存中，所以var a = 123; var b = a; b = 456; 以后b等于456，a还是等于123；
而引用类型的变量定义体存在栈内存中，而具体的值存在堆内存中，每次复制一个引用类型，相当于只是复制了一份引用。所以复制体改变，被复制体也会跟着同时改变。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>js中变量分为两种类型，值类型：<span class="hljs-built_in">boolean</span>、<span class="hljs-literal">undefined</span>、<span class="hljs-built_in">number</span>、<span class="hljs-built_in">string</span>和引用类型（object）。值类型的变量定义体和具体的值都存在栈内存中，所以<span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>; <span class="hljs-keyword">var</span> b = a; b = <span class="hljs-number">456</span>; 以后b等于<span class="hljs-number">456</span>，a还是等于<span class="hljs-number">123</span>；
而引用类型的变量定义体存在栈内存中，而具体的值存在堆内存中，每次复制一个引用类型，相当于只是复制了一份引用。所以复制体改变，被复制体也会跟着同时改变。</code></pre>
<h2 id="articleHeader7">6、如何准确判断一个变量是数组类型</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="两种办法：
1、 a instanceof Array;
2、 Object.prototype.toString.call(a)
//a为要检测的变量，实际上第二种方法可以准确判断js中几乎所有的类型。
//而第一种方法只能判断引用类型，不能判断值类型，因为值类型没有对应的构造函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>两种办法：
<span class="hljs-number">1</span>、 a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>;
<span class="hljs-number">2</span>、 <span class="hljs-built_in">Object</span>.prototype.toString.call(a)
<span class="hljs-comment">//a为要检测的变量，实际上第二种方法可以准确判断js中几乎所有的类型。</span>
<span class="hljs-comment">//而第一种方法只能判断引用类型，不能判断值类型，因为值类型没有对应的构造函数</span></code></pre>
<h2 id="articleHeader8">7、描述new一个对象的过程</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、生成一个新的空对象；
2、this指向这个新对象；
3、执行构造函数中的代码，即对this赋值；
4、将新对象的__prototype__属性指向构造函数的prototype属性；
5、返回this，即得到新对象。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-number">1</span>、生成一个新的空对象；
<span class="hljs-number">2</span>、<span class="hljs-keyword">this</span>指向这个新对象；
<span class="hljs-number">3</span>、执行构造函数中的代码，即对<span class="hljs-keyword">this</span>赋值；
<span class="hljs-number">4</span>、将新对象的__prototype__属性指向构造函数的prototype属性；
<span class="hljs-number">5</span>、返回<span class="hljs-keyword">this</span>，即得到新对象。</code></pre>
<h2 id="articleHeader9">8、说明this的几种不同的使用场景</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、作为构造函数执行
2、作为对象属性执行
3、作为普通函数执行
4、call bind apply
5、DOM事件中使用
6、js非strict模式下，this默认指向window对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、作为构造函数执行
<span class="hljs-number">2</span>、作为对象属性执行
<span class="hljs-number">3</span>、作为普通函数执行
<span class="hljs-number">4</span>、call bind apply
<span class="hljs-number">5</span>、DOM事件中使用
<span class="hljs-number">6</span>、js非strict模式下，this默认指向window对象</code></pre>
<h2 id="articleHeader10">9、创建10个a标签，点击的时候弹出对应的序号（0-9）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//考察js作用域和闭包的运用
    <script>
        for(i = 0; i < 10; i++) {
            (function(i){
                var a = document.createElement(&quot;a&quot;);
                a.innerHTML = i + &quot;<br/>&quot;;
                a.addEventListener(&quot;click&quot;, function(){
                    alert(i);
                });
                document.body.appendChild(a);
            })(i);
        }
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//考察js作用域和闭包的运用
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
            (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>)</span>{
                <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
                a.innerHTML = i + <span class="hljs-string">"&lt;br/&gt;"</span>;
                a.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    alert(i);
                });
                <span class="hljs-built_in">document</span>.body.appendChild(a);
            })(i);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader11">10、如何理解作用域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、自由变量
2、作用域链、即自由变量的查找
3、闭包的两个场景

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、自由变量
<span class="hljs-number">2</span>、作用域链、即自由变量的查找
<span class="hljs-number">3</span>、闭包的两个场景

</code></pre>
<h2 id="articleHeader12">11、开发实际过程中闭包的应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="封装变量，收敛权限" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">封装变量，收敛权限</code></pre>
<h2 id="articleHeader13">12、如何理解常说的JS</h2>
<p>常说的JS一般来说包含两部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、JS基础知识（ECMA262标准），也就是语法标准，让js拥有基础编程语言的能力。
2、JS-Web-API（W3C标准），让js拥有操作dom和bom的能力。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code><span class="hljs-number">1</span>、<span class="hljs-keyword">JS</span>基础知识（ECMA262标准），也就是语法标准，让<span class="hljs-keyword">js</span>拥有基础编程语言的能力。
<span class="hljs-number">2</span>、<span class="hljs-keyword">JS</span>-Web-API（W3C标准），让<span class="hljs-keyword">js</span>拥有操作dom和bom的能力。
</code></pre>
<h2 id="articleHeader14">13、querySelectorAll 方法相比 getElementsBy 系列方法有什么区别</h2>
<p>1、querySelectorAll属于W3C的Selector API规范，而getElementsBy属于W3C的DOM规范。<br>2、方法接受的参数不一样，前者接受的是css选择符，而后者只能是单一的ClassName、Id、或者TagName.<br>3、querySelectorAll返回的是static node List，而getElementsBy返回的是live node List,获取以后在添加元素，前者数量不变，后者数量会跟着增加。会导致一些死循环，参考:<a href="https://www.bbsmax.com/A/GBJrYb6Gz0/" rel="nofollow noreferrer" target="_blank">https://www.bbsmax.com/A/GBJr...</a> <br><a href="http://www.imooc.com/article/13027;" rel="nofollow noreferrer" target="_blank">http://www.imooc.com/article/...</a></p>
<h2 id="articleHeader15">14、Dom操作常用API</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementsBy系列、docuemnt.querySelectorAll、document.querySelector、
getAttribute(attrName)、setAttribute(attrName,val)、
appendChild(node) - 在最后插入新的子节点（元素）、
insertBefore(node) - 在前面插入新的子结点
removeChild(node) - 删除子节点（元素）、
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>document.getElementsBy系列、docuemnt.querySelectorAll、document.querySelector、
<span class="hljs-function"><span class="hljs-title">getAttribute</span><span class="hljs-params">(attrName)</span></span>、setAttribute(attrName,val)、
<span class="hljs-function"><span class="hljs-title">appendChild</span><span class="hljs-params">(node)</span></span> - 在最后插入新的子节点（元素）、
<span class="hljs-function"><span class="hljs-title">insertBefore</span><span class="hljs-params">(node)</span></span> - 在前面插入新的子结点
<span class="hljs-function"><span class="hljs-title">removeChild</span><span class="hljs-params">(node)</span></span> - 删除子节点（元素）、
</code></pre>
<h2 id="articleHeader16">15、Dom节点的Attribute和property有什么区别</h2>
<p>Attribute是HTML标签的属性，property是JS对象的属性</p>
<h2 id="articleHeader17">16、常见的BOM操作API</h2>
<p>检测客户端</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.userAgent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.userAgent</span></code></pre>
<p>检测屏幕</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="screen.width、screen.height" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">screen.<span class="hljs-built_in">width</span>、screen.<span class="hljs-built_in">height</span></code></pre>
<p>url操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location.href  .protocol .pathname .search .hash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">location<span class="hljs-selector-class">.href</span>  <span class="hljs-selector-class">.protocol</span> <span class="hljs-selector-class">.pathname</span> <span class="hljs-selector-class">.search</span> .hash</code></pre>
<h2 id="articleHeader18">17、常见浏览器的内核</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Trident内核：主要代表为IE浏览器 // -ms-
Gecko内核：主要代表为Firefox    //-moz-
Presto内核：主要代表为Opera     //-o-
Webkit内核：产要代表为Chrome和Safari //-webkit-
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>Trident内核：主要代表为IE浏览器 <span class="hljs-comment">// -ms-</span>
Gecko内核：主要代表为Firefox    <span class="hljs-comment">//-moz-</span>
Presto内核：主要代表为Opera     <span class="hljs-comment">//-o-</span>
Webkit内核：产要代表为Chrome和Safari <span class="hljs-comment">//-webkit-</span>
</code></pre>
<h2 id="articleHeader19">18、描述浏览器访问一个网站的过程</h2>
<p><strong>一、域名到ip地址解析过程</strong></p>
<p>1、查找浏览器缓存<br>2、查找系统缓存（一般是hosts文件）<br>3、查找路由器缓存<br>4、查找ISP DNS 缓存<br>5、ISP发起一个迭代的DNS请求<br>(1)本地 DNS服务器即将该请求转发到互联网上的根域（即一个完整域名最后面的那个点，通常省略不写）<br>(2)根域将所要查询域名中的顶级域（假设要查询ke.qq.com，顶级域就是com）的服务器IP地址返回到本地DNS<br>(3) 本地DNS根据返回的IP地址，再向顶级域（就是com域）发送请求。<br>(4) com域服务器再将域名中的二级域（即ke.qq.com中的qq）的IP地址返回给本地DNS<br>(5) 本地DNS再向二级域发送请求进行查询<br>(6) 之后不断重复这样的过程，直到本地DNS服务器得到最终的查询结果，并返回到主机。这时候主机才能通过域名访问该网站。<br>域名解析的过程到此完成，至此浏览器拿到了域名对应的IP地址</p>
<p><strong>二、建立TCP/IP连接，通过TCP协议的三次握手，连接建立以后，浏览器就向服务器发起http请求，一般通过get或者post方法。</strong><br><strong>三、服务器端接受到这个请求，根据请求参数，通过相关的处理把结果，一个html代码，返回给服务器</strong><br><strong>四、浏览器拿到html代码，开始解析页面，里面的css、js、图片等静态资源，同样要经过上述步骤才能到达浏览器。</strong><br><strong>五、浏览器根据拿到的资源对页面进行渲染，最后将渲染完成的页面呈现给用户。</strong></p>
<h2 id="articleHeader20">19、http请求常见的状态码有哪些</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="200     //请求完成，成功返回数据
301     //所请求的页面已经转移至新的url
400     //客户端请求的语法错误，服务器无法解析
401     //请求要求用户的身份认证
403     //服务器理解请求客户端的请求，但是拒绝执行此请求，可能还是没有权限
404     //客户端请求的资源不存在，最常见的一种状态码
500     //服务器错误
503     //由于超载或系统维护，服务器暂时的无法处理客户端的请求" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">200 </span>    //请求完成，成功返回数据
<span class="hljs-symbol">301 </span>    //所请求的页面已经转移至新的url
<span class="hljs-symbol">400 </span>    //客户端请求的语法错误，服务器无法解析
<span class="hljs-symbol">401 </span>    //请求要求用户的身份认证
<span class="hljs-symbol">403 </span>    //服务器理解请求客户端的请求，但是拒绝执行此请求，可能还是没有权限
<span class="hljs-symbol">404 </span>    //客户端请求的资源不存在，最常见的一种状态码
<span class="hljs-symbol">500 </span>    //服务器错误
<span class="hljs-symbol">503 </span>    //由于超载或系统维护，服务器暂时的无法处理客户端的请求</code></pre>
<h2 id="articleHeader21">20、简述cookies、 sessionStorage、localStorage的区别</h2>
<p>cookies容量大约只有4KB、所有的http请求都带着它，会影响获取资源的效率,API太简单只有documet.cookies，使用的时候一般要通过字符串处理函数经过封装。<br>sessionStorage和localStorage容量有5M，API简单易用，它们两个唯一区别就是sessionStorage关闭浏览器会自动清除</p>
<h2 id="articleHeader22">21、常见的几种性能优化策略</h2>
<p>一、加载资源优化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、静态资源的合并压缩（利用webpack、gulp等，压缩合并js、css文件）
2、静态资源缓存（同一网站下静态资源的名字不变，浏览器不会重新请求）
3、使用CDN让资源加载更快（大公司都有自己的CDN）
4、使用SSR（server side render）后端渲染，数据直接输出到HTML中，是vue、react中提出的概念，但是其实在早期的php、asp、jsp中都是这种渲染形式。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、静态资源的合并压缩（利用webpack、gulp等，压缩合并js、css文件）
<span class="hljs-number">2</span>、静态资源缓存（同一网站下静态资源的名字不变，浏览器不会重新请求）
<span class="hljs-number">3</span>、使用CDN让资源加载更快（大公司都有自己的CDN）
<span class="hljs-number">4</span>、使用SSR（server side render）后端渲染，数据直接输出到HTML中，是vue、react中提出的概念，但是其实在早期的php、asp、jsp中都是这种渲染形式。</code></pre>
<p>二、渲染优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、CSS放前面，JS放后面
2、懒加载（图片懒加载，下拉加载更多，而不是一次性全部加载）
3、减少DOM查询，对DOM查询做缓存
4、减少DOM操作，多个操作尽量合并在一起执行（利用createDocumentFragment，先将要插入的dom元素按次序放在Fragment中，再一次性将Fragment插入到已有的dom中）
5、事件节流
6、尽早操作，在DOMContentLoaded的时候就进行操作，而不是window.onload以后再进行，zepto和jquery都是用前者" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、CSS放前面，JS放后面
<span class="hljs-number">2</span>、懒加载（图片懒加载，下拉加载更多，而不是一次性全部加载）
<span class="hljs-number">3</span>、减少DOM查询，对DOM查询做缓存
<span class="hljs-number">4</span>、减少DOM操作，多个操作尽量合并在一起执行（利用createDocumentFragment，先将要插入的dom元素按次序放在Fragment中，再一次性将Fragment插入到已有的dom中）
<span class="hljs-number">5</span>、事件节流
<span class="hljs-number">6</span>、尽早操作，在DOMContentLoaded的时候就进行操作，而不是window.onload以后再进行，zepto和jquery都是用前者</code></pre>
<h2 id="articleHeader23">22、常见的web攻击类型</h2>
<p>1、XSS（Cross-site Scripting）跨站请求攻击<br>例如：攻击者在文章里面写入一段&lt;script&gt;获取cookies的一些操作，发送到自己的服务器&lt;/script&gt;，别人点开文章，就相当于执行了这个脚本，攻击者就可以获得别人的隐私信息<br>解决方法：前端替换关键字，例如替换 &lt; 为&amp;lt, &gt; 为&amp;gt 。 由于前端性能有限，一般这些工作交给后端处理 <br>2、XSRF（Cross-site request forgery）跨站请求伪造<br>攻击者伪造成被攻击者向服务器发送请求，造成财产损失<br>解决方法：增加验证流程，密码，短信验证码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
慕课网js面试题学习笔记(ES6 标准) ——实时更新

## 原文链接
[https://segmentfault.com/a/1190000010264187](https://segmentfault.com/a/1190000010264187)

