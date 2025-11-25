---
title: '前端面试题总结——JS（持续更新中）' 
date: 2018-12-05 2:30:09
hidden: true
slug: f9x0r7qnuso
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端面试题总结——JS（持续更新中）</strong></h1>
<h2 id="articleHeader1">1.javascript的typeof返回哪些数据类型</h2>
<p>Object number function boolean underfind string</p>
<h2 id="articleHeader2">2.例举3种强制类型转换和2种隐式类型转换？</h2>
<p>强制（parseInt,parseFloat,number）<br>隐式（== - ===）</p>
<h2 id="articleHeader3">3.split() join() 的区别</h2>
<p>前者是切割成数组的形式，后者是将数组转换成字符串</p>
<h2 id="articleHeader4">4.数组方法pop() push() unshift() shift()</h2>
<p>Unshift()头部添加 shift()头部删除<br>Push()尾部添加 pop()尾部删除</p>
<h2 id="articleHeader5">5.IE和DOM事件流的区别</h2>
<p>1.执行顺序不一样、<br>2.参数不一样<br>3.事件加不加on<br>4.this指向问题</p>
<h2 id="articleHeader6">6.IE和标准下有哪些兼容性的写法</h2>
<p>Var ev = ev || window.event<br>document.documentElement.clientWidth || document.body.clientWidth<br>Var target = ev.srcElement||ev.target</p>
<h2 id="articleHeader7">7.ajax请求的时候get 和post方式的区别</h2>
<p>1.一个在url后面 一个放在虚拟载体里面<br>2.有大小限制<br>3.安全问题<br>4.应用不同 一个是论坛等只需要请求的，一个是类似修改密码的</p>
<h2 id="articleHeader8">8.call和apply的区别</h2>
<p>Object.call(this,obj1,obj2,obj3)<br>Object.apply(this,arguments)</p>
<h2 id="articleHeader9">9.ajax请求时，如何解析json数据</h2>
<p>使用eval parse 鉴于安全性考虑 使用parse更靠谱</p>
<h2 id="articleHeader10">10.写一个获取非行间样式的函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getStyle(obj, attr, value) {
if(!value) {
if(obj.currentStyle) {
return obj.currentStyle(attr)
}
else {
obj.getComputedStyle(attr, false)
}
}
else {
obj.style[attr]=value
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">function <span class="hljs-title">getStyle</span>(<span class="hljs-params">obj, attr, <span class="hljs-keyword">value</span></span>) </span>{
<span class="hljs-keyword">if</span>(!<span class="hljs-keyword">value</span>) {
<span class="hljs-keyword">if</span>(obj.currentStyle) {
<span class="hljs-keyword">return</span> obj.currentStyle(attr)
}
<span class="hljs-keyword">else</span> {
obj.getComputedStyle(attr, <span class="hljs-literal">false</span>)
}
}
<span class="hljs-keyword">else</span> {
obj.style[attr]=<span class="hljs-keyword">value</span>
}
}</code></pre>
<h2 id="articleHeader11">11.事件委托(代理)是什么</h2>
<p>让利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！</p>
<h2 id="articleHeader12">12.闭包是什么，有什么特性，对页面有什么影响</h2>
<p>闭包就是能够读取其他函数内部变量的函数。<br><a href="http://blog.csdn.net/gaoshanwudi/article/details/7355794" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/gaoshanw...</a> （问这个问题的不是一个公司）<br>也可以直接点击此处查看之前更的关于闭包的文章</p>
<h2 id="articleHeader13">13.如何阻止事件冒泡和默认事件</h2>
<p>stoppropagation / preventdefault</p>
<h2 id="articleHeader14">14.添加 插入 替换 删除到某个接点的方法</h2>
<p>obj.appendChidl()<br>obj.innersetBefore<br>obj.replaceChild<br>obj.removeChild</p>
<h2 id="articleHeader15">15.解释jsonp的原理，以及为什么不是真正的ajax</h2>
<p>动态创建script标签，回调函数<br>Ajax是页面无刷新请求数据操作</p>
<h2 id="articleHeader16">16.javascript的本地对象，内置对象和宿主对象</h2>
<p>本地对象为array obj regexp等可以new实例化<br>内置对象为gload Math 等不可以实例化的<br>宿主为浏览器自带的document,window 等</p>
<h2 id="articleHeader17">17.document load 和document ready的区别</h2>
<p>页面加载完成有两种事件：<br>一.是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。<br>二.是onload，指示页面包含图片等文件在内的所有元素都加载完成。</p>
<h2 id="articleHeader18">18.”==”和“===”的不同</h2>
<p>前者会自动转换类型<br>后者不会</p>
<h2 id="articleHeader19">19.javascript的同源策略</h2>
<p>同源策略是一个很重要的安全理念，它在保证数据的安全性方面有着重要的意义，<br>一段脚本只能读取来自于同一来源的窗口和文档的属性，这里的同一来源指的是协议、域名和端口号的组合</p>
<h2 id="articleHeader20">20.最快捷的数组求最大值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [ 1,5,1,7,5,9];
Math.max(...arr)  // 9 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [ <span class="hljs-number">1</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">7</span>,<span class="hljs-number">5</span>,<span class="hljs-number">9</span>];
Math.max(...arr)  <span class="hljs-comment">// 9 </span>
</code></pre>
<h2 id="articleHeader21">21.更短的数组去重写法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...new Set([2,&quot;12&quot;,2,12,1,2,1,6,12,13,6])]

// [2, &quot;12&quot;, 12, 1, 6, 13]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>[...new Set([<span class="hljs-number">2</span>,<span class="hljs-string">"12"</span>,<span class="hljs-number">2</span>,<span class="hljs-number">12</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">6</span>])]

<span class="hljs-comment">// [2, "12", 12, 1, 6, 13]</span>
</code></pre>
<h2 id="articleHeader22">22.排序算法</h2>
<p>升序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numberArray = [3,6,2,4,1,5];
numberArray.sort(function(a,b){  
   return a-b;
})
console.log(numberArray);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> numberArray = [<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">5</span>];
numberArray.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span><span class="hljs-comment">{  
   return a-b;
}</span>)
<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(numberArray)</span>;</span>
</code></pre>
<h2 id="articleHeader23">23.冒泡排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var examplearr=[8,94,15,88,55,76,21,39];
function sortarr(arr){
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}
sortarr(examplearr);
console.log(examplearr);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var examplearr=[<span class="hljs-number">8</span>,<span class="hljs-number">94</span>,<span class="hljs-number">15</span>,<span class="hljs-number">88</span>,<span class="hljs-number">55</span>,<span class="hljs-number">76</span>,<span class="hljs-number">21</span>,<span class="hljs-number">39</span>];
function sortarr(arr){
    for(i=<span class="hljs-number">0</span>;i&lt;arr.length<span class="hljs-number">-1</span>;i++){
        for(j=<span class="hljs-number">0</span>;j&lt;arr.length<span class="hljs-number">-1</span>-i;j++){
            if(arr[j]&gt;arr[j+<span class="hljs-number">1</span>]){
                var temp=arr[j];
                arr[j]=arr[j+<span class="hljs-number">1</span>];
                arr[j+<span class="hljs-number">1</span>]=temp;
            }
        }
    }
    return arr;
}
sortarr(examplearr);
console.log(examplearr);
</code></pre>
<h2 id="articleHeader24">24.null和undefined的区别：</h2>
<p>null：表示无值；undefined：表示一个未声明的变量，或已声明但没有赋值的变量，<br>或一个并不存在的对象属性。</p>
<h2 id="articleHeader25">25.使用闭包的注意点：</h2>
<p>1.由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。</p>
<p>2.闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。 <br>（关于闭包，详细了解请看JavaScript之作用域与闭包详解）</p>
<h2 id="articleHeader26">26.请解释JSONP的工作原理，以及它为什么不是真正的AJAX。</h2>
<p>JSONP (JSON with Padding)是一个简单高效的跨域方式，HTML中的script标签可以加载并执行其他域的javascript，于是我们可以通过script标记来动态加载其他域的资源。例如我要从域A的页面pageA加载域B的数据，那么在域B的页面pageB中我以JavaScript的形式声明pageA需要的数据，然后在 pageA中用script标签把pageB加载进来，那么pageB中的脚本就会得以执行。JSONP在此基础上加入了回调函数，pageB加载完之后会执行pageA中定义的函数，所需要的数据会以参数的形式传递给该函数。JSONP易于实现，但是也会存在一些安全隐患，如果第三方的脚本随意地执行，那么它就可以篡改页面内容，截获敏感数据。但是在受信任的双方传递数据，JSONP是非常合适的选择。</p>
<p>AJAX是不跨域的，而JSONP是一个是跨域的，还有就是二者接收参数形式不一样！</p>
<h2 id="articleHeader27">27.请解释变量声明提升。</h2>
<p>在函数执行时，把变量的声明提升到了函数顶部，而其值定义依然在原来位置。</p>
<h2 id="articleHeader28">28.如何从浏览器的URL中获取查询字符串参数。</h2>
<p>以下函数把获取一个key的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function parseQueryString ( name ){
      name = name.replace(/[\[]/,&quot;\\\[&quot;);
      var regexS = &quot;[\\?&amp;]&quot;+name+&quot;=([^&amp;#]*)&quot;;
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
 
      if(results == null) {
          return &quot;&quot;;
      } else {
     return results[1];
     }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseQueryString</span> (<span class="hljs-params"> name </span>)</span>{
      name = name.replace(<span class="hljs-regexp">/[\[]/</span>,<span class="hljs-string">"\\\["</span>);
      <span class="hljs-keyword">var</span> regexS = <span class="hljs-string">"[\\?&amp;]"</span>+name+<span class="hljs-string">"=([^&amp;#]*)"</span>;
      <span class="hljs-keyword">var</span> regex = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( regexS );
      <span class="hljs-keyword">var</span> results = regex.exec( <span class="hljs-built_in">window</span>.location.href );
 
      <span class="hljs-keyword">if</span>(results == <span class="hljs-literal">null</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-string">""</span>;
      } <span class="hljs-keyword">else</span> {
     <span class="hljs-keyword">return</span> results[<span class="hljs-number">1</span>];
     }
 }</code></pre>
<h2 id="articleHeader29">29.arguments是什么？</h2>
<p>arguments虽然有一些数组的性质，但其并非真正的数组，只是一个类数组对象。<br>其并没有数组的很多方法，不能像真正的数组那样调用.jion(),.concat(),.pop()等方法。</p>
<h2 id="articleHeader30">30.什么是”use strict”;?使用它的好处和坏处分别是什么？</h2>
<p>在代码中出现表达式-“use strict”; 意味着代码按照严格模式解析，这种模式使得Javascript在更严格的条件下运行。</p>
<p>好处：<br>1.消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;<br>2.消除代码运行的一些不安全之处，保证代码运行的安全；<br>3.提高编译器效率，增加运行速度；</p>
<p>坏处：<br>1.同样的代码，在”严格模式”中，可能会有不一样的运行结果；一些在”正常模式”下可以运行的语句，在”严格模式”下将不能运行。</p>
<h2 id="articleHeader31">31.什么是回调函数？</h2>
<p>1.就是一个函数的调用过程。那么就从理解这个调用过程开始吧。<br>函数a有一个参数，这个参数是个函数b，当函数a执行完以后执行函数b。那么这个过程就叫回调。</p>
<p>2.另外种解释：开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。 <br>通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。</p>
<h2 id="articleHeader32">32.使用 typeof bar === “object” 判断 bar 是不是一个对象有神马潜在的弊端？如何避免这种弊端？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {};
let arr = [];
 
console.log(typeof obj === 'object');  //true
console.log(typeof arr === 'object');  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> obj = {};
<span class="hljs-keyword">let</span> arr = [];
 
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">'object'</span>);  <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> arr === <span class="hljs-string">'object'</span>);  <span class="hljs-comment">//true</span></code></pre>
<p>从上面的输出结果可知，typeof bar === “object” 并不能准确判断 bar 就是一个 Object。可以通过 Object.prototype.toString.call(bar) === “[object Object]” 来避免这种弊端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {};
let arr = [];
 
console.log(Object.prototype.toString.call(obj));  //[object Object]
console.log(Object.prototype.toString.call(arr));  //[object Array]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> obj = {};
<span class="hljs-keyword">let</span> arr = [];
 
console.<span class="hljs-built_in">log</span>(Object.prototype.toString.<span class="hljs-keyword">call</span>(obj));  <span class="hljs-comment">//[object Object]</span>
console.<span class="hljs-built_in">log</span>(Object.prototype.toString.<span class="hljs-keyword">call</span>(arr));  <span class="hljs-comment">//[object Array]</span></code></pre>
<h2 id="articleHeader33">33.下面的代码会输出什么？为什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    console.log(1 +  &quot;2&quot; + &quot;2&quot;); //122
    console.log(1 +  +&quot;2&quot; + &quot;2&quot;); //32
    console.log(1 +  -&quot;1&quot; + &quot;2&quot;); //02
    console.log(+&quot;1&quot; +  &quot;1&quot; + &quot;2&quot;); //112
    console.log( &quot;A&quot; - &quot;B&quot; + &quot;2&quot;); //NaN2
    console.log( &quot;A&quot; - &quot;B&quot; + 2); //NaN
    console.log('3' + 2 + 1);//321
    console.log(typeof +'3');  //number
    console.log(typeof (''+3));  //string
    console.log('a' * 'sd');   //NaN
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> +  <span class="hljs-string">"2"</span> + <span class="hljs-string">"2"</span>); <span class="hljs-comment">//122</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> +  +<span class="hljs-string">"2"</span> + <span class="hljs-string">"2"</span>); <span class="hljs-comment">//32</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span> +  -<span class="hljs-string">"1"</span> + <span class="hljs-string">"2"</span>); <span class="hljs-comment">//02</span>
    <span class="hljs-built_in">console</span>.log(+<span class="hljs-string">"1"</span> +  <span class="hljs-string">"1"</span> + <span class="hljs-string">"2"</span>); <span class="hljs-comment">//112</span>
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"A"</span> - <span class="hljs-string">"B"</span> + <span class="hljs-string">"2"</span>); <span class="hljs-comment">//NaN2</span>
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"A"</span> - <span class="hljs-string">"B"</span> + <span class="hljs-number">2</span>); <span class="hljs-comment">//NaN</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span> + <span class="hljs-number">2</span> + <span class="hljs-number">1</span>);<span class="hljs-comment">//321</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> +<span class="hljs-string">'3'</span>);  <span class="hljs-comment">//number</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> (<span class="hljs-string">''</span>+<span class="hljs-number">3</span>));  <span class="hljs-comment">//string</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span> * <span class="hljs-string">'sd'</span>);   <span class="hljs-comment">//NaN</span>
</code></pre>
<h2 id="articleHeader34">34.逻辑运算</h2>
<p>或逻辑时：当0在前面时console.log((0|| 2));则输出为后面的数，为2；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     当除0以为的数在前面时console.log((2|| 0));则输出为2；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">     当除<span class="hljs-number">0</span>以为的数在前面时console.log((<span class="hljs-number">2</span>|| <span class="hljs-number">0</span>));则输出为<span class="hljs-number">2</span>；</code></pre>
<p>与逻辑时：当只要有0时console.log(0&amp;&amp;2 );则输出都为0；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     当不存在0时，console.log(1&amp;&amp;2 );则输出都为后面的一个，为2；
                 console.log(2&amp;&amp;1 );则输出为1；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>     当不存在<span class="hljs-number">0</span>时，console.log(<span class="hljs-number">1</span>&amp;&amp;<span class="hljs-number">2</span> );则输出都为后面的一个，为<span class="hljs-number">2</span>；
                 console.log(<span class="hljs-number">2</span>&amp;&amp;<span class="hljs-number">1</span> );则输出为<span class="hljs-number">1</span>；
</code></pre>
<h2 id="articleHeader35">35.在 JavaScript，常见的 false 值：</h2>
<p>0, '0', +0, -0, false, '',null,undefined,null,NaN</p>
<p>要注意空数组([])和空对象({}):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    console.log([] == false) //true
    console.log({} == false) //false
    console.log(Boolean([])) //true          
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-built_in">console</span>.log([] == <span class="hljs-literal">false</span>) <span class="hljs-comment">//true</span>
    <span class="hljs-built_in">console</span>.log({} == <span class="hljs-literal">false</span>) <span class="hljs-comment">//false</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Boolean</span>([])) <span class="hljs-comment">//true          </span>
</code></pre>
<h2 id="articleHeader36">36.解释下面代码的输出</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var a={},
        b={key:'b'},
        c={key:'c'};
     
    a[b]=123;
    a[c]=456;
     
    console.log(a[b]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code> var a={},
        <span class="hljs-keyword">b={key:'b'},
</span>        c={key:<span class="hljs-string">'c'</span>}<span class="hljs-comment">;</span>
     
    a[<span class="hljs-keyword">b]=123;
</span>    a[c]=<span class="hljs-number">456</span><span class="hljs-comment">;</span>
     
    console.log(a[<span class="hljs-keyword">b]);
</span></code></pre>
<p>因为在设置对象属性时，JS将隐式地stringify参数值。<br>在本例中，由于b和c都是对象，它们都将被转换为“[object object]”。<br>因此，a[b]和[c]都等价于[[object object]]，并且可以互换使用。<br>所以，设置或引用[c]与设置或引用a[b]完全相同。`</p>
<h2 id="articleHeader37">37.解释下面代码的输出</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">x</span>) {
    return (<span class="hljs-name">function</span>(<span class="hljs-name">y</span>) {
        console.log(<span class="hljs-name">x</span>)<span class="hljs-comment">;</span>
    })(<span class="hljs-number">2</span>)
})(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>输出1，闭包能够访问外部作用域的变量或参数。</p>
<h2 id="articleHeader38">38.请写出以下输出结果：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span><span class="hljs-params">()</span> </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ alert (<span class="hljs-number">1</span>); };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
Foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ alert (<span class="hljs-number">2</span>);};
Foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ alert (<span class="hljs-number">3</span>);};
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ alert (<span class="hljs-number">4</span>);};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span><span class="hljs-params">()</span> </span>{ alert (<span class="hljs-number">5</span>);}

Foo.getName(); <span class="hljs-comment">//2</span>
getName(); <span class="hljs-comment">//4</span>
Foo().getName(); <span class="hljs-comment">//1</span>
getName(); <span class="hljs-comment">//1</span>
<span class="hljs-keyword">new</span> Foo.getName(); <span class="hljs-comment">//2</span>
<span class="hljs-keyword">new</span> Foo().getName(); <span class="hljs-comment">//3</span>
<span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> Foo().getName(); <span class="hljs-comment">//3</span>
</code></pre>
<h2 id="articleHeader39">39.谈谈你对Ajax的理解？(概念、特点、作用)</h2>
<p>AJAX全称为“Asynchronous JavaScript And XML”（异步JavaScript和XML）是指一种创建交互式网页应用的开发技术、改善用户体验，实现无刷新效果。</p>
<p>优点</p>
<p>a、不需要插件支持 <br>b、优秀的用户体验 <br>c、提高Web程序的性能 <br>d、减轻服务器和带宽的负担</p>
<p>缺点</p>
<p>a、破坏浏览器“前进”、“后退”按钮的正常功能，可以通过简单的插件弥补 <br>b、对搜索引擎的支持不足</p>
<h2 id="articleHeader40">40.说说你对延迟对象deferred的理解?</h2>
<p>a、什么是deferred对象</p>
<p>在回调函数方面，jQuery的功能非常弱。为了改变这一点，jQuery开发团队就设计了deferred对象。 <br>简单说，deferred对象就是jQuery的回调函数解决方案。在英语中，defer的意思是”延迟”，所以deferred对象的含义就是”延迟”到未来某个点再执行。 <br>它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。</p>
<p>b、它的主要功能，可以归结为四点：</p>
<p>(1)、实现链式操作 <br>(2)、指定同一操作的多个回调函数 <br>(3)、为多个操作指定回调函数 <br>(4)、普通操作的回调函数接口</p>
<h2 id="articleHeader41">41.什么是跨域，如何实现跨域访问?</h2>
<p>跨域是指不同域名之间相互访问。 <br>JavaScript同源策略的限制，A域名下的JavaScript无法操作B或是C域名下的对象</p>
<p>实现：</p>
<p>(1)、JSONP跨域：利用script脚本允许引用不同域下的js实现的，将回调方法带入服务器，返回结果时回调。 <br> 1 通过jsonp跨域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.原生实现：



<script>
            var script = document.createElement('script');
            script.type = 'text/javascript';
        
            // 传参并指定回调执行函数为onBack
            script.src = 'http://www.....:8080/login?user=admin&amp;callback=onBack';
            document.head.appendChild(script);
        
            // 回调执行函数
            function onBack(res) {
                alert(JSON.stringify(res));
            }
         </script>


2.document.domain + iframe跨域  
    此方案仅限主域相同，子域不同的跨域应用场景。
    1.父窗口：(http://www.domain.com/a.html)

 



  <iframe id=&quot;iframe&quot; src=&quot;http://child.domain.com/b.html&quot;></iframe>
        <script>
            document.domain = 'domain.com';
            var user = 'admin';
        </script>
            2.子窗口：(http://child.domain.com/b.html)
            
      

  <script>
            document.domain = 'domain.com';
            // 获取父窗口中变量
            alert('get js data from parent ---> ' + window.parent.user);
        </script>
弊端：请看下面渲染加载优化

1、 nginx代理跨域
2、 nodejs中间件代理跨域
3、 后端在头部信息里面设置安全域名

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    1.原生实现：



<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
            script.type = <span class="hljs-string">'text/javascript'</span>;
        
            <span class="hljs-comment">// 传参并指定回调执行函数为onBack</span>
            script.src = <span class="hljs-string">'http://www.....:8080/login?user=admin&amp;callback=onBack'</span>;
            <span class="hljs-built_in">document</span>.head.appendChild(script);
        
            <span class="hljs-comment">// 回调执行函数</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onBack</span>(<span class="hljs-params">res</span>) </span>{
                alert(<span class="hljs-built_in">JSON</span>.stringify(res));
            }
         </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


2.document.domain + iframe跨域  
    此方案仅限主域相同，子域不同的跨域应用场景。
    1.父窗口：(http://www.domain.com/a.html)

 



  <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"iframe"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://child.domain.com/b.html"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-built_in">document</span>.domain = <span class="hljs-string">'domain.com'</span>;
            <span class="hljs-keyword">var</span> user = <span class="hljs-string">'admin'</span>;
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
            2.子窗口：(http://child.domain.com/b.html)
            
      

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-built_in">document</span>.domain = <span class="hljs-string">'domain.com'</span>;
            <span class="hljs-comment">// 获取父窗口中变量</span>
            alert(<span class="hljs-string">'get js data from parent ---&gt; '</span> + <span class="hljs-built_in">window</span>.parent.user);
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
弊端：请看下面渲染加载优化

1、 nginx代理跨域
2、 nodejs中间件代理跨域
3、 后端在头部信息里面设置安全域名

</code></pre>
<p>(3)、跨域资源共享（CORS） <br>跨域资源共享（CORS）是一种网络浏览器的技术规范，它为Web服务器定义了一种方式，允许网页从不同的域访问其资源。</p>
<p>CORS与JSONP相比:</p>
<p>a、JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。 <br>b、使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。 <br>c、JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS。<br>  更多跨域的具体内容请看  <a href="https://segmentfault.com/a/1190000011145364">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader42">42.为什么要使用模板引擎？</h2>
<p>a.模板引擎（这里特指用于Web开发的模板引擎）是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档。 <br>b.在一些示例中javascript有大量的html字符串，html中有一些像onclick样的javascript，这样javascript中有html，html中有javascript，代码的偶合度很高，不便于修改与维护，使用模板引擎可以解决问题。</p>
<h2 id="articleHeader43">43.根据你的理解,请简述JavaScript脚本的执行原理?</h2>
<p>JavaScript是一种动态、弱类型、基于原型的语言，通过浏览器可以直接执行。 <br>当浏览器遇到&lt;script&gt; 标记的时候，浏览器会执行之间的javascript代码。嵌入的js代码是顺序执行的，每个脚本定义的全局变量和函数，都可以被后面执行的脚本所调用。 变量的调用，必须是前面已经声明，否则获取的变量值是undefined。</p>
<h2 id="articleHeader44">44.JavaScript的数据类型有哪些？</h2>
<p>基本数据类型：字符串 String、数字 Number、布尔Boolean <br>复合数据类型：数组 Array、对象 Object <br>特殊数据类型：Null 空对象、Undefined 未定义</p>
<h2 id="articleHeader45">45.ionic和angularjs的区别?</h2>
<p>a、ionic是一个用来开发混合手机应用的，开源的，免费的代码库。可以优化html、css和js的性能，构建高效的应用程序，而且还可以用于构建Sass和AngularJS的优化。 <br>b、AngularJS通过新的属性和表达式扩展了HTML。AngularJS可以构建一个单一页面应用程序（SPAs：Single Page Applications）。 <br>c、Ionic是一个混合APP开发工具，它以AngularJS为中间脚本工具(称为库，似乎又不恰当)，所以，你如果要使用Ionic开发APP，就必须了解AngularJS。</p>
<h2 id="articleHeader46">46.谈谈你对闭包的理解?</h2>
<p>(1)、使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，<br>缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。 </p>
<p>(2)、闭包有三个特性： <br>a、函数嵌套函数 <br>b、函数内部可以引用外部的参数和变量 <br>c、参数和变量不会被垃圾回收机制回收</p>
<h2 id="articleHeader47">47.谈谈你This对象的理解?</h2>
<p>回答一：</p>
<p>(1)、js的this指向是不确定的，也就是说是可以动态改变的。call/apply 就是用于改变this指向的函数，这样设计可以让代码更加灵活，复用性更高 <br>(2)、this 一般情况下，都是指向函数的拥有者。 <br>(3)、在函数自执行里，this 指向的是 window 对象。 </p>
<p>扩展：关于this，还有一个地方比较让人模糊的是在dom事件里，通常有如下3种情况： <br>a、使用标签属性注册事件，此时this指向的是window对象。 <br>b、对与a，要让this指向input，可以将this作为参数传递。 <br>c、使用addEventListener等注册事件。此时this也是指向 input。</p>
<p>回答二：</p>
<p>(1)、处于全局作用域下的this：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this;/*window*/
var a = {name: this}/*window*/
var b = [this];/*window*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>;<span class="hljs-comment">/*window*/</span>
<span class="hljs-keyword">var</span> a = {name: <span class="hljs-keyword">this</span>}<span class="hljs-comment">/*window*/</span>
<span class="hljs-keyword">var</span> b = [<span class="hljs-keyword">this</span>];<span class="hljs-comment">/*window*/</span>
</code></pre>
<p>在全局作用域下，this默认指向window对象。 </p>
<p>(2)、处在函数中的this，又分为以下几种情况： <br>a、一般定义的函数，然后一般的执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = function(){
console.log(this);
}
a();/*window*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
a();<span class="hljs-comment">/*window*/</span>
</code></pre>
<p>this还是默认指向window。 </p>
<p>b、一般定义，用new调用执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = function(){
console.log(this);
}
new a();/*新建的空对象*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-keyword">new</span> a();<span class="hljs-comment">/*新建的空对象*/</span>
</code></pre>
<p>这时候让this指向新建的空对象，我们才可以给空对象初始化自有变量 <br>c、作为对象属性的函数，调用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
f:function(){
console.log(this)
}
}
a.f();/*a对象*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
<span class="hljs-attr">f</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
}
}
a.f();<span class="hljs-comment">/*a对象*/</span>
</code></pre>
<p>这时候this指向调用f函数的a对象。 <br>(3)、通过call()和apply()来改变this的默认引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var b = {id: 'b'};
var a = {
f:function(){
console.log(this)
　}
}
a.f.call(b);/*window*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> b = {<span class="hljs-attr">id</span>: <span class="hljs-string">'b'</span>};
<span class="hljs-keyword">var</span> a = {
<span class="hljs-attr">f</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
　}
}
a.f.call(b);<span class="hljs-comment">/*window*/</span>
</code></pre>
<p>所有函数对象都有的call方法和apply方法，它们的用法大体相似，f.call(b);的意思 是，执行f函数，并将f函数执行期活动对象里的this指向b对象，这样标示符解析时，this就会是b对象了。不过调用函数是要传参的。所以，f.call(b, x, y); f.apply(b, [x, y]);好吧，以上就是用call方法执行f函数，与用apply方法执行f函数时传参方式，它们之间的差异，大家一目了然：apply通过数组的方式传递参数，call通过一个个的形参传递参数。 <br>(4)、一些函数特殊执行情况this的指向问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a、setTimeout()和setInverval():

var a = function(){
console.log(this);
}
setTimeout(a,0);/*window*/
setInterval()类似。 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>a、setTimeout()和setInverval():

<span class="hljs-keyword">var</span> a = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
setTimeout(a,<span class="hljs-number">0</span>);<span class="hljs-comment">/*window*/</span>
setInterval()类似。 
</code></pre>
<p>b、dom模型中触发事件的回调方法执行中活动对象里的this指向该dom对象。</p>
<h2 id="articleHeader48">48.JavaScript对象的几种创建方式?</h2>
<p>(1) 工厂模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(){
var Child = new Object();
Child.name=&quot;欲泪成雪&quot;;
Child.age=&quot;20&quot;;
return Child;
};
var x = Parent();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">var</span> Child = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
Child.name=<span class="hljs-string">"欲泪成雪"</span>;
Child.age=<span class="hljs-string">"20"</span>;
<span class="hljs-keyword">return</span> Child;
};
<span class="hljs-keyword">var</span> x = Parent();
</code></pre>
<p>引用该对象的时候，这里使用的是 var x = Parent()而不是 var x = new Parent();因为后者会可能出现很多问题（前者也成为工厂经典方式,后者称之为混合工厂方式），不推荐使用new的方式使用该对象</p>
<p>(2)构造函数方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(){
　　this.name=&quot;欲泪成雪&quot;;
　　this.age=&quot;20&quot;;
};
var x =new Parent();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-keyword">this</span>.name=<span class="hljs-string">"欲泪成雪"</span>;
　　<span class="hljs-keyword">this</span>.age=<span class="hljs-string">"20"</span>;
};
<span class="hljs-keyword">var</span> x =<span class="hljs-keyword">new</span> Parent();
</code></pre>
<p>(3) 原型模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(){
};
Parent.prototype.name=&quot;欲泪成雪&quot;;
Parent.prototype.age=&quot;20&quot;;
var x =new Parent();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
};
<span class="hljs-keyword">Parent</span>.prototype.name=<span class="hljs-string">"欲泪成雪"</span>;
<span class="hljs-keyword">Parent</span>.prototype.age=<span class="hljs-string">"20"</span>;
<span class="hljs-keyword">var</span> x =<span class="hljs-keyword">new</span> <span class="hljs-keyword">Parent</span>();
</code></pre>
<p>(4)混合的构造函数，原型方式（推荐）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(){
　　this.name=&quot;欲泪成雪&quot;;
　　this.age=22;
};
Parent.prototype.lev=function(){
　　return this.name;
};
var x =new Parent();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-keyword">this</span>.name=<span class="hljs-string">"欲泪成雪"</span>;
　　<span class="hljs-keyword">this</span>.age=<span class="hljs-number">22</span>;
};
Parent.prototype.lev=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
};
<span class="hljs-keyword">var</span> x =<span class="hljs-keyword">new</span> Parent();
</code></pre>
<p>(5)动态原型方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(){
　　this.name=&quot;欲泪成雪&quot;;
　　this.age=22;
;
if(typeof Parent._lev==&quot;undefined&quot;){
Parent.prototype.lev=function(){
　　return this.name;
}
Parent._lev=true;
}
};
var x =new Parent();


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-keyword">this</span>.name=<span class="hljs-string">"欲泪成雪"</span>;
　　<span class="hljs-keyword">this</span>.age=<span class="hljs-number">22</span>;
;
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> Parent._lev==<span class="hljs-string">"undefined"</span>){
Parent.prototype.lev=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}
Parent._lev=<span class="hljs-literal">true</span>;
}
};
<span class="hljs-keyword">var</span> x =<span class="hljs-keyword">new</span> Parent();


</code></pre>
<h2 id="articleHeader49">49.请写出js内存泄漏的问题?</h2>
<p>回答一：</p>
<p>(1)、IE7/8 DOM循环引用导致内存泄漏 <br>a、多个对象循环引用 <br>b、循环引用自己 </p>
<p>(2)、基础的DOM泄漏 <br>当原有的DOM被移除时，子结点引用没有被移除则无法回收。 </p>
<p>(3)、timer定时器泄漏 <br>这个时候你无法回收buggyObject,解决办法，先停止timer然后再回收</p>
<p>回答二：</p>
<p>内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。 <br>垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。 </p>
<p>setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。 <br>闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）也会引发内存泄漏问题。</p>
<h2 id="articleHeader50">50.JS应该放在什么位置？</h2>
<p>(1)、放在底部，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。 <br>(2)、如果嵌入JS放在head中，请把嵌入JS放在CSS头部。 <br>(3)、使用defer（只支持IE） <br>(4)、不要在嵌入的JS中调用运行时间较长的函数，如果一定要用，可以用setTimeout来调用</p>
<h2 id="articleHeader51">51.请你解释一下事件冒泡机制</h2>
<p>a、在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。 </p>
<p>b、冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发 </p>
<p>c、js冒泡机制是指如果某元素定义了事件A，如click事件，如果触发了事件之后，没有阻止冒泡事件，那么事件将向父级元素传播，触发父类的click函数。</p>
<p>//阻止冒泡时间方法，兼容ie(e.cancleBubble)和ff(e.stopProgation)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stopBubble(e){
var evt = e||window.event;
evt.stopPropagation?evt.stopPropagation():(evt.cancelBubble=true);//阻止冒泡
evt.preventDefault

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopBubble</span>(<span class="hljs-params">e</span>)</span>{
<span class="hljs-keyword">var</span> evt = e||<span class="hljs-built_in">window</span>.event;
evt.stopPropagation?evt.stopPropagation():(evt.cancelBubble=<span class="hljs-literal">true</span>);<span class="hljs-comment">//阻止冒泡</span>
evt.preventDefault

</code></pre>
<h2 id="articleHeader52">51.说说你对Promise的理解?</h2>
<p>ES6 原生提供了 Promise 对象。 <br>所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。 </p>
<p>Promise 对象有以下两个特点：</p>
<p>(1)、对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。 </p>
<p>(2)、一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。</p>
<p>有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。</p>
<p>Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。</p>
<h2 id="articleHeader53">52.说说你对原型（prototype）理解?</h2>
<p>JavaScript是一种通过原型实现继承的语言与别的高级语言是有区别的，像java，C#是通过类型决定继承关系的，JavaScript是的动态的弱类型语言，总之可以认为JavaScript中所有都是对象，在JavaScript中，原型也是一个对象，通过原型可以实现对象的属性继承，JavaScript的对象中都包含了一个” prototype”内部属性，这个属性所对应的就是该对象的原型。</p>
<p>“prototype”作为对象的内部属性，是不能被直接访问的。所以为了方便查看一个对象的原型，Firefox和Chrome内核的JavaScript引擎中提供了”proto“这个非标准的访问器（ECMA新标准中引入了标准对象原型访问器”Object.getPrototype(object)”）。</p>
<p>原型的主要作用就是为了实现继承与扩展对象。</p>
<h2 id="articleHeader54">53.在 JavaScript 中,instanceof用于判断某个对象是否被另一个函数构造。</h2>
<p>使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。</p>
<h2 id="articleHeader55">54.纯数组排序</h2>
<p>常见有冒泡和选择,这里利用sort排序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" export const orderArr=(arr)=>{
        arr.sort((a,b)=>{
            return a-b //将arr升序排列,如果是倒序return -(a-b)
        })
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code> <span class="hljs-keyword">export</span> const orderArr=<span class="hljs-function"><span class="hljs-params">(arr)</span>=&gt;</span>{
        arr.sort(<span class="hljs-function"><span class="hljs-params">(a,b)</span>=&gt;</span>{
            <span class="hljs-keyword">return</span> a-b <span class="hljs-regexp">//</span>将arr升序排列,如果是倒序<span class="hljs-keyword">return</span> -(a-b)
        })
    }
</code></pre>
<h2 id="articleHeader56">55.数组对象排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const orderArr=(arr)=>{
        arr.sort((a,b)=>{
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;//sort方法接收一个函数作为参数，这里嵌套一层函数用
            //来接收对象属性名，其他部分代码与正常使用sort方法相同
        })
    }      
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> orderArr=<span class="hljs-function">(<span class="hljs-params">arr</span>)=&gt;</span>{
        arr.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>{
            <span class="hljs-keyword">let</span> value1 = a[property];
            <span class="hljs-keyword">let</span> value2 = b[property];
            <span class="hljs-keyword">return</span> value1 - value2;<span class="hljs-comment">//sort方法接收一个函数作为参数，这里嵌套一层函数用</span>
            <span class="hljs-comment">//来接收对象属性名，其他部分代码与正常使用sort方法相同</span>
        })
    }      
</code></pre>
<ol><li>对象遍历</li></ol>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const traverseObj=(obj)=>{
        for(let variable in obj){
        //For…in遍历对象包括所有继承的属性,所以如果
         //只是想使用对象本身的属性需要做一个判断
        if(obj.hasOwnProperty(variable)){
            console.log(variable,obj[variable])
        }
        }
    }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> traverseObj=<span class="hljs-function">(<span class="hljs-params">obj</span>)=&gt;</span>{
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> variable <span class="hljs-keyword">in</span> obj){
        <span class="hljs-comment">//For…in遍历对象包括所有继承的属性,所以如果</span>
         <span class="hljs-comment">//只是想使用对象本身的属性需要做一个判断</span>
        <span class="hljs-keyword">if</span>(obj.hasOwnProperty(variable)){
            <span class="hljs-built_in">console</span>.log(variable,obj[variable])
        }
        }
    }
    
</code></pre>
<h2 id="articleHeader57">57.promise</h2>
<p>promise是一种封装未来值的易于复用的异步任务管理机制,主要解决地狱回调和控制异步的顺序</p>
<p>1.应用方法一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const promiseDemo=()=>{
new Promise((resolve,reject)=>{
    resolve(()=>{
        let a=1;
        return ++a;
    }).then((data)=>{
        console.log(data)//data值为++a的值
    }).catch(()=>{//错误执行这个

    })
})
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">export</span> const promiseDemo=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
<span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(resolve,reject)</span>=&gt;</span>{
    resolve(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        let a=<span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> ++a;
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(data)<span class="hljs-regexp">//</span>data值为++a的值
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-regexp">//</span>错误执行这个

    })
})
}
</code></pre>
<p>2.应用方法二</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const promiseDemo=()=>{
Promise.resolve([1,2,3]).then((data)=>{//直接初始化一个Promise并执行resolve方法
    console.log(data)//data值为[1,2,3]
})
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> promiseDemo=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
<span class="hljs-built_in">Promise</span>.resolve([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]).then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{<span class="hljs-comment">//直接初始化一个Promise并执行resolve方法</span>
    <span class="hljs-built_in">console</span>.log(data)<span class="hljs-comment">//data值为[1,2,3]</span>
})
}
</code></pre>
<h2 id="articleHeader58">58.如何禁用网页菜单右键？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
function Click(){
window.event.returnValue=false;
}
document.oncontextmenu=Click;
</script>
恢复方法：javascript:alert(document.oncontextmenu='')



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Click</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">window</span>.event.returnValue=<span class="hljs-literal">false</span>;
}
<span class="hljs-built_in">document</span>.oncontextmenu=Click;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
恢复方法：javascript:alert(document.oncontextmenu='')



</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题总结——JS（持续更新中）

## 原文链接
[https://segmentfault.com/a/1190000014401170](https://segmentfault.com/a/1190000014401170)

