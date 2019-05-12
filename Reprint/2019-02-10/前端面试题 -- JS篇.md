---
title: '前端面试题 -- JS篇' 
date: 2019-02-10 2:30:42
hidden: true
slug: bcp202dklyu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">类型</h2>
<p><strong>1.js中有哪些数据类型，并解释清楚原始数据类型和引用数据类型</strong></p>
<p>js中共有<code>null</code>,<code>undefined</code>, <code>string</code>,<code>number</code>,<code>boolean</code>,<code>object</code>六种数据类型。</p>
<p>原始数据类型: <code>null</code>,<code>undefined</code>, <code>string</code>,<code>number</code>,<code>boolean</code></p>
<p>引用数据类型:<code>object</code></p>
<p><strong>两者的区别</strong>：<br><strong>1）值存储方式不同：</strong></p>
<p>原始数据类型：将变量名和值都存储在栈内存中</p>
<p>引用数据类型：将变量名存储在栈内存中，将值存储在堆内存中，并在栈内存中存储值的地址，该地址指向堆内存中的值。<br><span class="img-wrap"><img data-src="/img/bVvDSx" src="https://static.alili.tech/img/bVvDSx" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2）赋值方式不同：</strong></p>
<p><strong>当给b赋予另一个a的值</strong><br>若a值为原始数据类型，直接在栈内存中生成b值，两个变量以后进行值改变不会相互影响</p>
<p>若a值为引用数据类型，赋予b变量的是值地址，通过这个地址，两者指向的其实是堆内存中的同一个值，所以以后a,b任一变量对值进行改变，会直接影响另一个变量的值<br><span class="img-wrap"><img data-src="/img/bVvDSp" src="https://static.alili.tech/img/bVvDSp" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>2. 解释清楚 null 和 undefined</strong></p>
<p><code>null</code>表示一个标识被赋值了，且该标识赋值为“空值”,从逻辑角度来看，null值表示空对象指针；</p>
<p><code>undefined</code>表示声明了标识，但没有给标识赋值。</p>
<p><strong>3. 如何复制一个对象的值？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      function cloneObject(object){
         var newObject = new Object();
         for(var i in object){
             newObject[i] = object[i];
         }
         return newObject;
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneObject</span></span>(object){
         <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Object</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Object</span>();
         <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> object){
             <span class="hljs-keyword">new</span><span class="hljs-type">Object</span>[i] = object[i];
         }
         <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Object</span>;
      }</code></pre>
<p><strong>4. js在什么时候会进行隐式类型转换，转换的结果？</strong></p>
<ul>
<li><p>数值运算</p></li>
<li><p>if</p></li>
<li><p><code>.</code>调用方法或属性</p></li>
<li><p>!和!!</p></li>
</ul>
<p><strong>5. 类型识别的方法？</strong></p>
<p><code>typeof a</code></p>
<ul>
<li><p>可以判别标准类型，除了null之外<br><code>typeof 1</code> 返回结果："number"    <code>typeof {}</code> 返回结果:"object"</p></li>
<li><p>不能判别具体的对象类型，除了function之外<br><code>typeof [1]</code> 返回结果:"object"  <code>typeof function(){}</code> 返回结果:"function"</p></li>
</ul>
<p><code>a instanceof b</code></p>
<ul>
<li><p>可以判别内置对象类型<br><code>[] instanceof Array</code> 返回结果：true <code>new String() instanceof String</code>  返回结果：true</p></li>
<li><p>不能判别原始类型值<br><code>'a' instanceof String</code>   返回结果：false</p></li>
<li>
<p>可以判别自定义对象类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Point(x,y){
         this.x = x;
         this.y = y
     }

 var c = new Point(1,2)
 c instanceof Point" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span><span class="hljs-params">(x,y)</span></span>{
         <span class="hljs-keyword">this</span>.x = x;
         <span class="hljs-keyword">this</span>.y = y
     }

 <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)
 c <span class="hljs-keyword">instanceof</span> Point</code></pre>
<p>返回结果：true</p>
</li>
</ul>
<p><code>a.constructor</code></p>
<ul>
<li><p>可以判别标准数据类型（undefined和null除外）<br><code>'123'.constructor == String</code> 返回结果：true</p></li>
<li><p>可以判别具体的内置对象类型<br><code>[1,2].constructor == Array</code>  返回结果：true</p></li>
<li>
<p>可以判别自定义对象类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Point(x,y){
     this.x = x;
     this.y = y
 }

 var c = new Point(1,2)
 c.constructor == Point" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span><span class="hljs-params">(x,y)</span></span>{
     <span class="hljs-keyword">this</span>.x = x;
     <span class="hljs-keyword">this</span>.y = y
 }

 <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)
 c.constructor == Point</code></pre>
<p>返回结果：true</p>
</li>
</ul>
<p><code>Object.prototype.toString.call(a)</code></p>
<ul>
<li><p>可以判别标准数据类型<br><code>Object.prototype.toString.call(1)</code>返回结果:"[object Number]" <code>Object.prototype.toString.call(undefined)</code> 返回结果:"[object Undefined]"</p></li>
<li><p>可以判别内置对象类型 <br><code>Object.prototype.toString.call([a])</code> 返回结果:"[object Array]"</p></li>
<li><p>不能判别自定义对象类型</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function Point(x,y){
      this.x = x;
      this.y = y
  }
  var c = new Point(1,2)
  Object.prototype.toString.call(c)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Point</span>(<span class="hljs-params">x,y</span>)</span>{
      <span class="hljs-keyword">this</span>.x = x;
      <span class="hljs-keyword">this</span>.y = y
  }
  <span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)
  <span class="hljs-built_in">Object</span>.prototype.toString.call(c)</code></pre>
<p>返回结果:"[object Object]"</p>
<p>工作中可以写一个函数方便判定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      function type(obj){
          return Object.prototype.toString.call(obj).slice(8,-1)
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>      <span class="hljs-keyword">function</span> <span class="hljs-title">type</span>(obj){
          <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.toString.call(obj).slice(8,-1)</span>
      }</code></pre>
<p><code>type('a')</code> 返回结果: "String"   <code>type([a])</code>  返回结果: "Array"</p>
<h2 id="articleHeader1">函数</h2>
<p><strong>1. 函数里的this什么含义，什么情况下，怎么用?</strong><br>谁调用的方法或者属性，this就指向谁<br>如果没有被谁调用，this指向window</p>
<p><strong>2. bind,call,apply方法的使用，什么区别？什么时候用?</strong></p>
<p><strong>3. 函数curry化 </strong><br>函数curry化是什么意思？<br>把接受多个参数的函数转换为接受单一参数的函数，且函数可以持续接收参数<br>将一个复杂的问题片段化，使之进行简化</p>
<p><strong>3. 数组和对象有哪些原生方法，列举一下，分别是什么含义，比如链接两个数组用哪个方法，删除数组的指定项。</strong></p>
<h2 id="articleHeader2">原型</h2>
<p><strong>1. 讲一下 prototype 是什么东西，原型链的理解，什么时候用 prototype?</strong></p>
<p><em>proto</em></p>
<p>构造函数</p>
<h2 id="articleHeader3">闭包</h2>
<p><strong>1.什么是闭包？</strong><br><strong>2.闭包的作用和使用场景</strong><br>闭包的作用一：隐藏、封装<br>闭包的作用二：记忆函数</p>
<h2 id="articleHeader4">变量作用域</h2>
<h2 id="articleHeader5">ajax</h2>
<p><strong>1.讲解原生Js实现ajax的原理。</strong></p>
<p>　　Ajax 的全称是Asynchronous JavaScript and XML，其中，Asynchronous 是异步的意思，它有别于传统web开发中采用的同步的方式。</p>
<p>　　Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。</p>
<p>　　XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。</p>
<p>　　XMLHttpRequest这个对象的属性有：</p>
<p>onreadystatechange    每次状态改变所触发事件的事件处理程序。<br> responseText    从服务器进程返回数据的字符串形式。<br> responseXML    从服务器进程返回的DOM兼容的文档数据对象。<br> status    从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）<br> status Text    伴随状态码的字符串信息<br> readyState    对象状态值<br> 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）<br> 1 (初始化) 对象已建立，尚未调用send方法</p>
<p>2 (发送数据) send方法已调用，但是当前的状态及http头未知</p>
<p>3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，</p>
<p>4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据</p>
<h2 id="articleHeader6">正则表达式</h2>
<h2 id="articleHeader7">Coding Questions</h2>
<ol><li><p>Question: How would you make this work?</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="add(2, 5); // 7
add(2)(5); // 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>add(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>); <span class="hljs-comment">// 7</span>
add(<span class="hljs-number">2</span>)(<span class="hljs-number">5</span>); <span class="hljs-comment">// 7</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addto(){
    var length = arguments.length;
    var sum = 0;
    for(var i = 0;i<length;i++){
        sum += arguments[i]
    }
    return sum;
}

function add(){
    var value = addto.apply(add,arguments);
    var helper = function(next){
        typeof next == &quot;number&quot; ? value+=next:value;
        return helper
    }
    helper.valueOf = function(){
        return value;
    }
    return helper;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addto</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;length;i++){
        sum += <span class="hljs-built_in">arguments</span>[i]
    }
    <span class="hljs-keyword">return</span> sum;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = addto.apply(add,<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">var</span> helper = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">next</span>)</span>{
        <span class="hljs-keyword">typeof</span> next == <span class="hljs-string">"number"</span> ? value+=next:value;
        <span class="hljs-keyword">return</span> helper
    }
    helper.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> value;
    }
    <span class="hljs-keyword">return</span> helper;
}</code></pre>
<ol><li><p>Make this work: <code>duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]</code></p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function duplicate(arr){
         var length = arr.length;
         for(var i=0;i<length;i++)
         arr.push(arr[i])
         return arr;
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">duplicate</span><span class="hljs-params">(arr)</span>{</span>
         var <span class="hljs-built_in">length</span> = arr.<span class="hljs-built_in">length</span>;
         <span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>;<span class="hljs-built_in">i</span>&lt;<span class="hljs-built_in">length</span>;<span class="hljs-built_in">i</span>++)
         arr.push(arr[i])
         <span class="hljs-keyword">return</span> arr;
     }</code></pre>
<p>3.如何获取一个大于等于0且小于等于9的随机整数？.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function randomNum(){
         return Math.floor(Math.random()*10)
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomNum</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>)
     }</code></pre>
<p>4.想要去除一个字符串的第一个字符，有哪些方法可以实现.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     str.slice(1)
     str.substr(1)
     str.substring(1)
     str.replace(/./,'')
     str.replace(str.charAt(0),'')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>     <span class="hljs-keyword">str</span>.slice(<span class="hljs-number">1</span>)
     <span class="hljs-keyword">str</span>.substr(<span class="hljs-number">1</span>)
     <span class="hljs-keyword">str</span>.substring(<span class="hljs-number">1</span>)
     <span class="hljs-keyword">str</span>.replace(/./,<span class="hljs-string">''</span>)
     <span class="hljs-keyword">str</span>.replace(<span class="hljs-keyword">str</span>.charAt(<span class="hljs-number">0</span>),<span class="hljs-string">''</span>)</code></pre>
<p>5.对一个数组（每项都是数值）求和，有哪些方法？<br><a href="http://www.thatjsdude.com/interview/js2.html#nullVsUndefined" rel="nofollow noreferrer" target="_blank">6.If you have var y = 1, x = y = typeof x; What is the value of x?</a><br>Answer: "undefined"</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题 -- JS篇

## 原文链接
[https://segmentfault.com/a/1190000005119083](https://segmentfault.com/a/1190000005119083)

