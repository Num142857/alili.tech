---
title: '《javascript高级程序设计》笔记：值类型与引用类型' 
date: 2019-01-04 2:30:10
hidden: true
slug: xnvzd7o0bvi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>基本数据类型是按值访问的，因为可以操作保存在变量中的实际的值；<br>引用类型的值是保存在内存中的对象，在操作对象时，实际上是在操作对象的引用而不是实际的对象；</p></blockquote>
<h2 id="articleHeader0">值类型</h2>
<p>如果一个变量存储的是值的本身那么就是一个值类型number / string / Boolean / Null / Undefined —值类型的变量本身就是含有赋予给它的数值的，它的变量本身及保存的数据都存储在栈的内存块当中，当声明一个值类型时，必须对它初始化（给变量赋值）才能使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = 123,
    num2 = num1;
num1 = 456;
console.log(num2);// 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> num1 = <span class="hljs-number">123</span>,
    num2 = num1;
num1 = <span class="hljs-number">456</span>;
<span class="hljs-built_in">console</span>.log(num2);<span class="hljs-comment">// 123</span></code></pre>
<p>将值类型复制给另外一个值时(num2=num1)，也就是num2重新再栈上开辟了一块空间，然后将num1中的内容复制一份放在num2中，当改变其中一个变量的值时，不会影响另外一个变量的值</p>
<p><span class="img-wrap"><img data-src="/img/bVYwRA?w=1382&amp;h=492" src="https://static.alili.tech/img/bVYwRA?w=1382&amp;h=492" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">引用类型</h2>
<p>如果一个变量存储的是引用（地址），那么就是一个引用类型object—引用类型的值的存储与值类型不同，它分别存储在内存的堆和栈中，<strong>栈中存放的是指向堆中内容的地址，堆中存放的引用类型的地址(键值对)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {name: &quot;xyc&quot;};
var obj2 = obj1;
obj1.name = &quot;lxy&quot;;
console.log(obj2.name); // &quot;lxy&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">name</span>: <span class="hljs-string">"xyc"</span>};
<span class="hljs-keyword">var</span> obj2 = obj1;
obj1.name = <span class="hljs-string">"lxy"</span>;
<span class="hljs-built_in">console</span>.log(obj2.name); <span class="hljs-comment">// "lxy"</span></code></pre>
<p>obj2=obj1表示的是将栈上的地址复制一份给另一个对象，他们同时指向堆中的内容，当修改内容时，两个对象中的值都会发生改变</p>
<p><span class="img-wrap"><img data-src="/img/bVYwRG?w=1048&amp;h=488" src="https://static.alili.tech/img/bVYwRG?w=1048&amp;h=488" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">一个面试题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = new Object();
function foo(obj) {
  obj.name = &quot;xyc&quot;;
  obj = new Object();
    obj.name = &quot;lxy&quot;;
}
foo(o);
console.log(o.name); // ???" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">obj</span>) </span>{
  obj.name = <span class="hljs-string">"xyc"</span>;
  obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    obj.name = <span class="hljs-string">"lxy"</span>;
}
foo(o);
<span class="hljs-built_in">console</span>.log(o.name); <span class="hljs-comment">// ???</span></code></pre>
<p>图解：<br>（1）新建对象<code>var o = new Object();</code></p>
<p><span class="img-wrap"><img data-src="/img/bVYwRK?w=1064&amp;h=494" src="https://static.alili.tech/img/bVYwRK?w=1064&amp;h=494" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（2）在foo的环境下执行<code>obj.name = "xyc"</code><br>由于是参数传递，在局部作用域内相当于执行了<code>obj = o</code></p>
<p><span class="img-wrap"><img data-src="/img/bVYwRS?w=1024&amp;h=468" src="https://static.alili.tech/img/bVYwRS?w=1024&amp;h=468" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（3）在局部作用域内新建对象，并赋值相同的属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj = new Object();
obj.name = &quot;lxy&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
obj.name = <span class="hljs-string">"lxy"</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYwR1?w=1026&amp;h=476" src="https://static.alili.tech/img/bVYwR1?w=1026&amp;h=476" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>（4）foo()执行完毕，局部作用域出栈，obj声明周期结束<br>此时，新建的对象依然存在，等待下一次内存自动回收机制将堆中的无引用对象销毁</p>
<p><span class="img-wrap"><img data-src="/img/bVYwR9?w=1038&amp;h=470" src="https://static.alili.tech/img/bVYwR9?w=1038&amp;h=470" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">4. 变量的深浅拷贝（重点）</h2>
<p>什么是深浅拷贝？在mac电脑中我们可以对某个文件夹创建替身或者复制粘贴某个文件/文件夹，这两种方式都实现了对某个文件/文件夹的拷贝，但是，前者在文件中修改文件内容时，源文件也会修改，而后者的操作在修改文件内容时不会对源文件有影响</p>
<p>上面的例子，“创建替身” ==&gt; 浅拷贝，“复制粘贴” ==&gt; 深拷贝</p>
<p>从内存角度说明：<strong>浅拷贝只会在栈内存中开辟空间存放指向源文件的变量，而深拷贝会在堆内存也拷贝文件</strong></p>
<p><strong>深浅拷贝仅是针对于数组和对象而言，不严谨的说法，基本类型的拷贝都属于深拷贝</strong></p>
<p>（1）浅拷贝（最为常见）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {name: &quot;xyc&quot;};
var obj2 = obj1;
obj1.name = &quot;lxy&quot;;
console.log(obj2.name); // &quot;lxy&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {<span class="hljs-attr">name</span>: <span class="hljs-string">"xyc"</span>};
<span class="hljs-keyword">var</span> obj2 = obj1;
obj1.name = <span class="hljs-string">"lxy"</span>;
<span class="hljs-built_in">console</span>.log(obj2.name); <span class="hljs-comment">// "lxy"</span></code></pre>
<p>仅将栈内存复制，堆内存中的指向依然相同，obj2对象改变后，会影响obj1对象</p>
<p>（2）拷贝对象及对象下一层的属性和方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shallowCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// 只拷贝对象</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 根据obj的类型判断是新建一个数组还是对象</span>
  <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
  <span class="hljs-comment">// 遍历obj，并且判断是obj的属性才拷贝</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  <span class="hljs-keyword">return</span> newObj;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
  name: &quot;xyc&quot;,
  features: {
    say: &quot;hello&quot;,
    eat: &quot;something&quot;
  }
}
var obj2 = shallowCopy(obj1);
obj2.features.eat = &quot;anything&quot;;
console.log(obj1.features.eat); // &quot;anything&quot;

console.log(obj1 === obj2); // false
console.log(obj1.features === obj2.features); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"xyc"</span>,
  <span class="hljs-attr">features</span>: {
    <span class="hljs-attr">say</span>: <span class="hljs-string">"hello"</span>,
    <span class="hljs-attr">eat</span>: <span class="hljs-string">"something"</span>
  }
}
<span class="hljs-keyword">var</span> obj2 = shallowCopy(obj1);
obj2.features.eat = <span class="hljs-string">"anything"</span>;
<span class="hljs-built_in">console</span>.log(obj1.features.eat); <span class="hljs-comment">// "anything"</span>

<span class="hljs-built_in">console</span>.log(obj1 === obj2); <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(obj1.features === obj2.features); <span class="hljs-comment">// true</span></code></pre>
<p>上面这个例子可以看出上述方式的复制在对象内嵌套对象是不能够实现“类深拷贝”的，下面有一个进阶型的</p>
<p>（3）递归调用对象中嵌套的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 当obj中嵌套对象时，再次调用该方法
      newObj[key] = typeof obj[key] !== 'object' ? obj[key] : deepCopy(obj[key]);
    }
  }
  return newObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-comment">// 只拷贝对象</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 根据obj的类型判断是新建一个数组还是对象</span>
  <span class="hljs-keyword">var</span> newObj = obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ? [] : {};
  <span class="hljs-comment">// 遍历obj，并且判断是obj的属性才拷贝</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
      <span class="hljs-comment">// 当obj中嵌套对象时，再次调用该方法</span>
      newObj[key] = <span class="hljs-keyword">typeof</span> obj[key] !== <span class="hljs-string">'object'</span> ? obj[key] : deepCopy(obj[key]);
    }
  }
  <span class="hljs-keyword">return</span> newObj;
}</code></pre>
<p>（4）一维数组技巧性的拷贝</p>
<p><strong>通过<code>slice()</code>和<code>concat()</code>来实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();
// var new_arr = arr.slice();

new_arr[0] = 'new';

console.log(arr) // [&quot;old&quot;, 1, true, null, undefined]
console.log(new_arr) // [&quot;new&quot;, 1, true, null, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'old'</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">undefined</span>];

<span class="hljs-keyword">var</span> new_arr = arr.concat();
<span class="hljs-comment">// var new_arr = arr.slice();</span>

new_arr[<span class="hljs-number">0</span>] = <span class="hljs-string">'new'</span>;

<span class="hljs-built_in">console</span>.log(arr) <span class="hljs-comment">// ["old", 1, true, null, undefined]</span>
<span class="hljs-built_in">console</span>.log(new_arr) <span class="hljs-comment">// ["new", 1, true, null, undefined]</span></code></pre>
<p>一如上面的对象嵌套，多维数组使用上面的方式拷贝不彻底</p>
<p>（5）粗暴的拷贝方式</p>
<p><strong>通过<code>JSON.parse( JSON.stringify() )</code>实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

var new_arr = JSON.parse( JSON.stringify(arr) );

console.log(new_arr === arr);// false
console.log(new_arr[3] === arr[3]);// false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'old'</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">true</span>, [<span class="hljs-string">'old1'</span>, <span class="hljs-string">'old2'</span>], {<span class="hljs-attr">old</span>: <span class="hljs-number">1</span>}]

<span class="hljs-keyword">var</span> new_arr = <span class="hljs-built_in">JSON</span>.parse( <span class="hljs-built_in">JSON</span>.stringify(arr) );

<span class="hljs-built_in">console</span>.log(new_arr === arr);<span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(new_arr[<span class="hljs-number">3</span>] === arr[<span class="hljs-number">3</span>]);<span class="hljs-comment">// false</span></code></pre>
<p><strong>但是这种方式无法实现函数的拷贝</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}]

var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);// [null, object]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(a)
}, {
    <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(b)
    }
}]

<span class="hljs-keyword">var</span> new_arr = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(arr));

<span class="hljs-built_in">console</span>.log(new_arr);<span class="hljs-comment">// [null, object]</span></code></pre>
<p>函数通过这个方式会被转换成null</p>
<p>（6）补全深拷贝</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepCopy = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> deepCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">var</span> str, newobj = obj.constructor === <span class="hljs-built_in">Array</span> ? [] : {};
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">'object'</span>){
        <span class="hljs-keyword">return</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.JSON){
        str = <span class="hljs-built_in">JSON</span>.stringify(obj), <span class="hljs-comment">//系列化对象</span>
        newobj = <span class="hljs-built_in">JSON</span>.parse(str); <span class="hljs-comment">//还原</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj){
            newobj[i] = <span class="hljs-keyword">typeof</span> obj[i] === <span class="hljs-string">'object'</span> ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    <span class="hljs-keyword">return</span> newobj;
};</code></pre>
<p>彻底的深拷贝理论上是将对象的整个原型链拷贝（无论原型属性是否为enumerable均应拷贝），遍历的次数越多，性能消耗越大。因此，出于性能的考虑，在拷贝的方式选择上，应该结合具体的业务环境来进行选择</p>
<p>参考：<br><a href="https://segmentfault.com/a/1190000010150234">JavaScript专题之深浅拷贝</a><br><a href="http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/" rel="nofollow noreferrer" target="_blank">深入剖析 JavaScript 的深复制</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《javascript高级程序设计》笔记：值类型与引用类型

## 原文链接
[https://segmentfault.com/a/1190000010641791](https://segmentfault.com/a/1190000010641791)

