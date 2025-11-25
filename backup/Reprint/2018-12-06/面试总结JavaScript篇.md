---
title: '面试总结JavaScript篇' 
date: 2018-12-06 2:30:09
hidden: true
slug: dmgt1axbdpm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>此文主旨是记录面试中遇到的面试题，包括js中常见，易错，重要知识点</blockquote>
<h2 id="articleHeader0">window.onload和$(document).ready()的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload是在页面中包含图片在内的所有元素全部加载完成再执行；
$(document).ready()是DOM树加载完成之后执行，不包含图片，其他媒体文件；
因此$(document).ready()快于window.onload执行；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload是在页面中包含图片在内的所有元素全部加载完成再执行；
$(<span class="hljs-built_in">document</span>).ready()是DOM树加载完成之后执行，不包含图片，其他媒体文件；
因此$(<span class="hljs-built_in">document</span>).ready()快于<span class="hljs-built_in">window</span>.onload执行；
</code></pre>
<h2 id="articleHeader1">数组去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = ['a','bb','22','a','yuci','haha','22']; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const arr</span> = [<span class="hljs-string">'a'</span>,<span class="hljs-string">'bb'</span>,<span class="hljs-string">'22'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'yuci'</span>,<span class="hljs-string">'haha'</span>,<span class="hljs-string">'22'</span>]; </code></pre>
<p>1.es6数据结构Set</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let unique = new Set(arr);  
console.log(Array.from(unique)); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">unique</span> = <span class="hljs-keyword">new</span> Set(arr);  
console.<span class="hljs-built_in">log</span>(Array.from(<span class="hljs-built_in">unique</span>)); </code></pre>
<p>2.使用push()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr2 = [];  
for(let i = 0; i < arr.length; i++) {  
    if(arr2.indexOf(arr[i]) == -1) { //不包含某个值则返回-1  
        arr2.push(arr[i]);  
    }  
}  
console.log(arr2); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arr2 = [];  
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {  
    <span class="hljs-keyword">if</span>(arr2.indexOf(arr[i]) == <span class="hljs-number">-1</span>) { <span class="hljs-comment">//不包含某个值则返回-1  </span>
        arr2.<span class="hljs-keyword">push</span>(arr[i]);  
    }  
}  
console.<span class="hljs-built_in">log</span>(arr2); </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组  
let arr3 = [arr[0]];  
for(let i = 1; i < arr.length; i++) {  
    if(arr.indexOf(arr[i]) == i) {  
        arr3.push(arr[i]);  
    }  
}  
console.log(arr3);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组  </span>
<span class="hljs-keyword">let</span> arr3 = [arr[<span class="hljs-number">0</span>]];  
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {  
    <span class="hljs-keyword">if</span>(arr.indexOf(arr[i]) == i) {  
        arr3.<span class="hljs-keyword">push</span>(arr[i]);  
    }  
}  
console.<span class="hljs-built_in">log</span>(arr3);  </code></pre>
<p>3.排序去除相邻重复元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arrSort = arr.sort();  
let arr4 = [];  
for(let i = 0; i< arrSort.length; i++) {  
    if(arrSort[i] != arrSort[i+1]) {  
        arr4.push(arrSort[i]);  
    }  
}  
console.log(arr4);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> arrSort = arr.<span class="hljs-built_in">sort</span>();  
<span class="hljs-built_in">let</span> arr4 = [];  
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">let</span> i = <span class="hljs-number">0</span>; i&lt; arrSort.<span class="hljs-built_in">length</span>; i++) {  
    <span class="hljs-keyword">if</span>(arrSort[i] != arrSort[i+<span class="hljs-number">1</span>]) {  
        arr4.<span class="hljs-built_in">push</span>(arrSort[i]);  
    }  
}  
console.<span class="hljs-built_in">log</span>(arr4);  </code></pre>
<p>4.使用splice()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let len = arr.length;  
for(let i = 0; i < len; i++) {  
    for(let j = i + 1; j < len; j++) {  
        if(arr[i] === arr[j]) {  
            arr.splice(i,1);  
            len--;  
            j--;  
        }  
    }  
}  
console.log(arr); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">len</span> = arr.length;  
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>; i++) {  
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j = i + <span class="hljs-number">1</span>; j &lt; <span class="hljs-built_in">len</span>; j++) {  
        <span class="hljs-keyword">if</span>(arr[i] === arr[j]) {  
            arr.splice(i,<span class="hljs-number">1</span>);  
            <span class="hljs-built_in">len</span>--;  
            j--;  
        }  
    }  
}  
console.<span class="hljs-built_in">log</span>(arr); </code></pre>
<h2 id="articleHeader2">事件委托</h2>
<p>得益于事件冒泡，当多个元素有相同的事件，将事件绑定在父元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oUl = document.getElementById('oul');  
oUl.addEventListener('click', function(e) {  
    var e = e||window.event;  
    var tar = e.target;  
    if(tar.nodeName === 'LI') {  
        alert(tar.innerHTML);  
    }  
}) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oUl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'oul'</span>);  
oUl.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{  
    <span class="hljs-keyword">var</span> e = e||<span class="hljs-built_in">window</span>.event;  
    <span class="hljs-keyword">var</span> tar = e.target;  
    <span class="hljs-keyword">if</span>(tar.nodeName === <span class="hljs-string">'LI'</span>) {  
        alert(tar.innerHTML);  
    }  
}) </code></pre>
<p><strong>更详细请看：<a href="http://www.codeceo.com/javascript-event-commission.html" rel="nofollow noreferrer" target="_blank">事件委托</a></strong></p>
<h2 id="articleHeader3">判断变量类型</h2>
<ul>
<li>typeof()用于判断简单数据；</li>
<li>判断一个变量是对象还是数组使用instanceof，constructor或Object.prototype.toString.call()；</li>
</ul>
<p>更详细请看：<a href="https://blog.csdn.net/yucihent/article/details/79652913" rel="nofollow noreferrer" target="_blank">判断数据类型</a></p>
<h2 id="articleHeader4">同步和异步（简要阐述）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="同步：由于js单线程，同步任务都在主线程上排队执行，前面任务没执行完成，后面的任务会一直等待；

异步：不进入主线程，进入任务队列，等待主线程任务执行完成，开始执行。最基础的异步操作setTimeout和setInterval，等待主线程任务执行完，在开始执行里面的函数；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>同步：由于js单线程，同步任务都在主线程上排队执行，前面任务没执行完成，后面的任务会一直等待；

异步：不进入主线程，进入任务队列，等待主线程任务执行完成，开始执行。最基础的异步操作<span class="hljs-built_in">set</span>Timeout和<span class="hljs-built_in">set</span>Interval，等待主线程任务执行完，在开始执行里面的函数；</code></pre>
<p><strong>更详细请看：<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">js运行机制</a></strong></p>
<h2 id="articleHeader5">返回false的几种情况</h2>
<p>false，null，0，“”，undefined，NaN</p>
<h2 id="articleHeader6">js类型值的区别</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="存储地：

简单数据类型：存储在栈中；

引用数据类型：存储在堆中，在栈中存储了指针，指向存储在堆中的地址，解释器会先检索在栈中的地址，从堆中获得实体；

大小：

简单数据类型：大小固定，占用空间小，频繁使用，所以存储在栈中；

引用数据类型：大小不固定，占用空间大；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>存储地：

简单数据类型：存储在栈中；

引用数据类型：存储在堆中，在栈中存储了指针，指向存储在堆中的地址，解释器会先检索在栈中的地址，从堆中获得实体；

大小：

简单数据类型：大小固定，占用空间小，频繁使用，所以存储在栈中；

引用数据类型：大小不固定，占用空间大；
</code></pre>
<h2 id="articleHeader7">闭包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="何为闭包：有权访问另一个作用域中变量的函数

闭包特性：可实现函数外访问函数内变量，外层变量可以不被垃圾回收机制回收

为什么？怎么解决？

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>何为闭包：有权访问另一个作用域中变量的函数

闭包特性：可实现函数外访问函数内变量，外层变量可以不被垃圾回收机制回收

为什么？怎么解决？

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {  
    setTimeout(function() {  
        console.log(i);    
    }, 1000);  
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {  
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-built_in">console</span>.log(i);    
    }, <span class="hljs-number">1000</span>);  
}  </code></pre>
<p>输出结果都为10，因为for()循环过程中每次传值，匿名函数并没有执行，相当于执行10次function(){console.log(i);}，循环结束i变为10，所以输出全部为10；</p>
<p>使用闭包，自执行匿名函数包裹:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0; i < 10; i++) {  
    (function(j) {  
        setTimeout(function() {  
            console.log(j);    
        }, 1000);  
    })(i);  
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 10; i++) {  </span>
    (<span class="hljs-name">function</span>(<span class="hljs-name">j</span>) {  
        setTimeout(<span class="hljs-name">function</span>() {  
            console.log(<span class="hljs-name">j</span>)<span class="hljs-comment">;    </span>
        }, <span class="hljs-number">1000</span>)<span class="hljs-comment">;  </span>
    })(<span class="hljs-name">i</span>)<span class="hljs-comment">;  </span>
} </code></pre>
<p>外部匿名函数立即执行，把 i 作为参数，赋值给 j ，因为是立即执行，所以每次循环输出不同值。</p>
<p>引用外层变量不被回收，会相比其他函数占用更高内存，使用不当容易造成内存泄漏。</p>
<h2 id="articleHeader8">this的指向</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="全局范围：指向window（严格模式下不存在全局变量，指向undefined）;

普通函数调用：指向window;

对象方法调用：指向最后调用它的对象；

构造函数调用：指向new出来的对象；

显示设置this：call，apply方法显示将this指向第一个参数指明的对象
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>全局范围：指向<span class="hljs-built_in">window</span>（严格模式下不存在全局变量，指向<span class="hljs-literal">undefined</span>）;

普通函数调用：指向<span class="hljs-built_in">window</span>;

对象方法调用：指向最后调用它的对象；

构造函数调用：指向<span class="hljs-keyword">new</span>出来的对象；

显示设置<span class="hljs-keyword">this</span>：call，apply方法显示将<span class="hljs-keyword">this</span>指向第一个参数指明的对象
</code></pre>
<h2 id="articleHeader9">new具体做了些什么</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="创建一个新对象foo；

并将它的__proto__指向其构造函数的prototype，foo.__proto__ = Foo.prototype;

动态将this指向新对象，Foo.apply(foo，arguments);

执行函数体中的代码；

放回新对象foo;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>创建一个新对象foo；

并将它的__proto__指向其构造函数的prototype，foo.__proto__ = Foo.prototype<span class="hljs-comment">;</span>

动态将this指向新对象，Foo.apply(foo，arguments)<span class="hljs-comment">;</span>

执行函数体中的代码；

放回新对象foo<span class="hljs-comment">;</span>
</code></pre>
<h2 id="articleHeader10">原型和原型链</h2>
<p>创建一个函数就会为其创建一个prototype属性，指向这个函数的原型对象，原型对象会自动获得constructor属性，指向prototype属性所在函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.a = &quot;a&quot;;    
Object.prototype.b = &quot;b&quot;;    
function Person(){}    
console.log(Person);    //function Person()    
let p = new Person();    
console.log(p);         //Person {} 对象    
console.log(p.a);       //undefined    
console.log(p.b);       //b " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.a = <span class="hljs-string">"a"</span>;    
<span class="hljs-built_in">Object</span>.prototype.b = <span class="hljs-string">"b"</span>;    
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{}    
<span class="hljs-built_in">console</span>.log(Person);    <span class="hljs-comment">//function Person()    </span>
<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> Person();    
<span class="hljs-built_in">console</span>.log(p);         <span class="hljs-comment">//Person {} 对象    </span>
<span class="hljs-built_in">console</span>.log(p.a);       <span class="hljs-comment">//undefined    </span>
<span class="hljs-built_in">console</span>.log(p.b);       <span class="hljs-comment">//b </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.__proto__ === Person.prototype；Person.prototype.constructor === Person" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code style="word-break: break-word; white-space: initial;">p.__proto__ === <span class="hljs-keyword">Person</span>.prototype；<span class="hljs-keyword">Person</span>.prototype.constructor === <span class="hljs-keyword">Person</span></code></pre>
<p>当调用某种方法或查找某种属性时，首先会在自身调用和查找，如果自身并没有该属性或方法，则会去它的__proto__属性中调用查找，也就是它构造函数的prototype中调用查找，如果构造函数中也没有该属性方法，则会去构造函数的隐式原型中查找，一直到null，就这样形成原型链。</p>
<p><strong>更多有关原型请看：<a href="https://github.com/hezizi/Blog/issues/1" rel="nofollow noreferrer" target="_blank">原型和原型链</a></strong></p>
<h2 id="articleHeader11">继承方式</h2>
<p><strong>原型链继承：</strong></p>
<p>Child()的原型作为Parent()的实例来继承Parent()的方法属性</p>
<p>因为所有实例都继承原型方法属性，其中一个实例对原型属性值更改后，所有实例调用该属性的值全部更改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {}  
Parent.prototype.parentSay = function() {  
    return 'i am parent';  
}  
function Child() {}  
Child.prototype.childSay = function() {  
    return 'i am child';  
}  
Child.prototype = new Parent();  
var par = new Parent();  
var kid = new Child();  
  
console.log(kid.parentSay());           //i am parent " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">()</span> </span>{}  
<span class="hljs-keyword">Parent</span>.prototype.parentSay = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{  
    <span class="hljs-keyword">return</span> <span class="hljs-string">'i am parent'</span>;  
}  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span><span class="hljs-params">()</span> </span>{}  
Child.prototype.childSay = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{  
    <span class="hljs-keyword">return</span> <span class="hljs-string">'i am child'</span>;  
}  
Child.prototype = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Parent</span>();  
<span class="hljs-keyword">var</span> par = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Parent</span>();  
<span class="hljs-keyword">var</span> kid = <span class="hljs-keyword">new</span> Child();  
  
console.log(kid.parentSay());           <span class="hljs-comment">//i am parent </span></code></pre>
<p><strong>构造函数继承：</strong></p>
<p>在子类的构造函数内部通过call或apply来调用父类构造函数</p>
<p>无法实现函数的复用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function People() {  
    this.name = ['zhangsan','lisi','wangwu'];  
}  
function Person() {  
    People.call(this);  
}  
var per1 = new Person();  
per1.name.push('zhanliu');  
console.log(per1.name);     //[&quot;zhangsan&quot;, &quot;lisi&quot;, &quot;wangwu&quot;, &quot;zhanliu&quot;]  
  
var per2 = new Person();  
console.log(per2.name);     //[&quot;zhangsan&quot;, &quot;lisi&quot;, &quot;wangwu&quot;]  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">People</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-keyword">this</span>.name = [<span class="hljs-string">'zhangsan'</span>,<span class="hljs-string">'lisi'</span>,<span class="hljs-string">'wangwu'</span>];  
}  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>) </span>{  
    People.call(<span class="hljs-keyword">this</span>);  
}  
<span class="hljs-keyword">var</span> per1 = <span class="hljs-keyword">new</span> Person();  
per1.name.push(<span class="hljs-string">'zhanliu'</span>);  
<span class="hljs-built_in">console</span>.log(per1.name);     <span class="hljs-comment">//["zhangsan", "lisi", "wangwu", "zhanliu"]  </span>
  
<span class="hljs-keyword">var</span> per2 = <span class="hljs-keyword">new</span> Person();  
<span class="hljs-built_in">console</span>.log(per2.name);     <span class="hljs-comment">//["zhangsan", "lisi", "wangwu"]  </span></code></pre>
<p><strong>组合继承：</strong></p>
<p>将原型链继承和构造函数继承结合，最常用的继承模式</p>
<p>原型链继承共享的属性和方法，构造函数继承实例属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function People(num) {  
    this.num = num;  
    this.name = ['zhangsan','lisi','wangwu'];  
}  
People.prototype.numCount = function() {  
    console.log(this.num);  
}  
function Person(num) {  
    People.call(this, num);  
}  
//继承方式  
Person.prototype = new People();  
Person.prototype.constructor = Person;  
  
var per1 = new Person(10);  
per1.name.push('zhaoliu');  
console.log(per1.name);     //[&quot;zhangsan&quot;, &quot;lisi&quot;, &quot;wangwu&quot;, &quot;zhanliu&quot;]  
per1.numCount();            //10  
  
var per2 = new Person(20);  
console.log(per2.name);     //[&quot;zhangsan&quot;, &quot;lisi&quot;, &quot;wangwu&quot;]  
per2.numCount();            //20  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">People</span>(<span class="hljs-params">num</span>) </span>{  
    <span class="hljs-keyword">this</span>.num = num;  
    <span class="hljs-keyword">this</span>.name = [<span class="hljs-string">'zhangsan'</span>,<span class="hljs-string">'lisi'</span>,<span class="hljs-string">'wangwu'</span>];  
}  
People.prototype.numCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.num);  
}  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">num</span>) </span>{  
    People.call(<span class="hljs-keyword">this</span>, num);  
}  
<span class="hljs-comment">//继承方式  </span>
Person.prototype = <span class="hljs-keyword">new</span> People();  
Person.prototype.constructor = Person;  
  
<span class="hljs-keyword">var</span> per1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-number">10</span>);  
per1.name.push(<span class="hljs-string">'zhaoliu'</span>);  
<span class="hljs-built_in">console</span>.log(per1.name);     <span class="hljs-comment">//["zhangsan", "lisi", "wangwu", "zhanliu"]  </span>
per1.numCount();            <span class="hljs-comment">//10  </span>
  
<span class="hljs-keyword">var</span> per2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-number">20</span>);  
<span class="hljs-built_in">console</span>.log(per2.name);     <span class="hljs-comment">//["zhangsan", "lisi", "wangwu"]  </span>
per2.numCount();            <span class="hljs-comment">//20  </span></code></pre>
<p><strong>更多继承方式请看：<a href="https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance" rel="nofollow noreferrer" target="_blank">继承方式</a></strong></p>
<h2 id="articleHeader12">数组常用方法</h2>
<p><strong>改变原数组：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="尾部删除pop()，尾部添加push()，头部删除shift()，头部添加unshift()，排序sort()，颠倒数组元素reverse()，删除或插入元素splice();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>尾部删除<span class="hljs-selector-tag">pop</span>()，尾部添加<span class="hljs-selector-tag">push</span>()，头部删除<span class="hljs-selector-tag">shift</span>()，头部添加<span class="hljs-selector-tag">unshift</span>()，排序<span class="hljs-selector-tag">sort</span>()，颠倒数组元素<span class="hljs-selector-tag">reverse</span>()，删除或插入元素<span class="hljs-selector-tag">splice</span>();
</code></pre>
<p><strong>不会改变元素组：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="合并数组concat()，拼接数组元素join()，截取元素slice()，indexOf()，lastIndexOf()，toString()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>合并数组<span class="hljs-selector-tag">concat</span>()，拼接数组元素<span class="hljs-selector-tag">join</span>()，截取元素<span class="hljs-selector-tag">slice</span>()，<span class="hljs-selector-tag">indexOf</span>()，<span class="hljs-selector-tag">lastIndexOf</span>()，<span class="hljs-selector-tag">toString</span>()
</code></pre>
<p><strong>更详细数组方法总结请看：<a href="https://blog.csdn.net/yucihent/article/details/79685148" rel="nofollow noreferrer" target="_blank">Array数组方法总结</a></strong></p>
<h2 id="articleHeader13">数据存储</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cookie：用于客户端与服务端通信，也具有本地存储的功能

localStorage，sessionStorage：专门用于存储

区别：

大小：Cookie容量为4K，因为用于客户端与服务端通信，所有http都携带，如果太大会降低效率； localStorage，sessionStorage大小为5M。

失效时间：Cookie会在浏览器关闭时删除，除非主动设置删除时间；localStorage一直都在直到用户主动删除或清除浏览器缓存；sessionStorage在浏览器关闭时删除。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>Cookie：用于客户端与服务端通信，也具有本地存储的功能

<span class="hljs-built_in">local</span>Storage，sessionStorage：专门用于存储

区别：

大小：Cookie容量为4K，因为用于客户端与服务端通信，所有http都携带，如果太大会降低效率； <span class="hljs-built_in">local</span>Storage，sessionStorage大小为5M。

失效时间：Cookie会在浏览器关闭时删除，除非主动设置删除时间；<span class="hljs-built_in">local</span>Storage一直都在直到用户主动删除或清除浏览器缓存；sessionStorage在浏览器关闭时删除。

</code></pre>
<h3 id="articleHeader14">结束语：</h3>
<p>如有错误，欢迎指正</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试总结JavaScript篇

## 原文链接
[https://segmentfault.com/a/1190000014321635](https://segmentfault.com/a/1190000014321635)

