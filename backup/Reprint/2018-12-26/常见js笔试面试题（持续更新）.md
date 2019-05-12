---
title: '常见js笔试面试题（持续更新）' 
date: 2018-12-26 2:30:14
hidden: true
slug: ukjzk74300f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">js基础知识</h1>
<h2 id="articleHeader1">1. javascript typeof返会的数据类型有哪些</h2>
<p>object,string,undefined,number,function,boolean</p>
<blockquote><p>基本数据类型：<br>string,number,boolean,undefined,null</p></blockquote>
<h2 id="articleHeader2">2. 列举三种强制类型转换和两种隐式类型转换</h2>
<p>parseInt(),parseFloat(),Number()<br>==,!!</p>
<h2 id="articleHeader3">3. 数组相关集合</h2>
<h3 id="articleHeader4">3.1. 创建数组方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var array = new Array()
var array = []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var<span class="hljs-built_in"> array </span>=<span class="hljs-built_in"> new </span>Array()
var<span class="hljs-built_in"> array </span>= []</code></pre>
<p>Array.of(1,2)  //[1,2]<br>这是es6新增的一个Array方法，创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。<br>（感谢 haru 的宝贵建议）</p>
<h2 id="articleHeader5">4. 判断是否为数组的方法</h2>
<ul>
<li><p>console.log(arr instanceof Array)</p></li>
<li><p>console.log(arr.construct === Array)</p></li>
<li><p>console.log(Array.isArray(arr))</p></li>
</ul>
<h2 id="articleHeader6">5. pop(),push(),unshift(),shift()</h2>
<ul>
<li><p>pop()尾部删除</p></li>
<li><p>push()尾部插入</p></li>
<li><p>unshift()头部插入</p></li>
<li><p>shift()头部删除</p></li>
</ul>
<h2 id="articleHeader7">6. DOM0 DOM2</h2>
<p>dom0级</p>
<ul>
<li><p>不支持添加多个事件，后面的会覆盖前面的</p></li>
<li><p>无法取消</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById(&quot;button&quot;);
btn.onclick = function(){
    alert(1);
}
btn.onclick = function(){
    alert(2);
}       //只弹出2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"button"</span>);
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-number">1</span>);
}
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-number">2</span>);
}       <span class="hljs-comment">//只弹出2</span></code></pre>
<p>dom2</p>
<ul>
<li><p>可以添加多个事件</p></li>
<li><p>不兼容低版本IE</p></li>
<li><p>支持事件冒泡，事件捕获</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById(&quot;button&quot;);
btn.addEventListener(&quot;click&quot;,function(){
    alert(&quot;1&quot;);
})
btn.addEventListener(&quot;click&quot;,function(){
    alert(&quot;2&quot;);
})              //先弹出1，再弹出2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"button"</span>);
btn.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"1"</span>);
})
btn.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"2"</span>);
})              <span class="hljs-comment">//先弹出1，再弹出2</span></code></pre>
<h2 id="articleHeader8">7. IE和DOM事件流的区别</h2>
<ul>
<li><p>执行顺序不一样</p></li>
<li><p>参数不一样 低版本ie没有回调函数，只能进行冒泡</p></li>
<li><p>第一个参数是否加"on",低版本IE不支持addEventListener(),支持attachEvent,第一个参数需要加"on"</p></li>
<li><p>this指向问题，IE指向windows,不指向触发的函数</p></li>
</ul>
<h2 id="articleHeader9">8. IE标准下有哪些兼容性写法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ev = ev||window.event

document.documentElement.clientWidth||document.body.clientWidth

var target = ev.srcElement||ev.target" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">ev</span> = <span class="hljs-built_in">ev</span>||window.event

document.documentElement.clientWidth||document.body.clientWidth

<span class="hljs-built_in">var</span> target = <span class="hljs-built_in">ev</span>.srcElement||<span class="hljs-built_in">ev</span>.target</code></pre>
<h2 id="articleHeader10">9. call apply  bind</h2>
<p>改变this的指向，<br>其中call的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a,b)  
{  
    alert(a+b);  
}  
function sub(a,b)  
{  
    alert(a-b);  
}  
  
add.call(sub,3,1);   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>function add(a,b)  
{  
    alert(a+b);  
}  
function <span class="hljs-function"><span class="hljs-keyword">sub</span>(<span class="hljs-title">a</span>,<span class="hljs-title">b</span>)  
</span>{  
    alert(a-b);  
}  
  
add.call(<span class="hljs-function"><span class="hljs-keyword">sub</span>,3,1)</span>;   </code></pre>
<p>这个例子中的意思就是用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4); // 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。<br>apply写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a,b)  
{  
    alert(a+b);  
}  
function sub(a,b)  
{  
    alert(a-b);  
}  
add.apply(sub,[4,2]);　" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>function add(a,b)  
{  
    alert(a+b);  
}  
function <span class="hljs-function"><span class="hljs-keyword">sub</span>(<span class="hljs-title">a</span>,<span class="hljs-title">b</span>)  
</span>{  
    alert(a-b);  
}  
add.apply(<span class="hljs-function"><span class="hljs-keyword">sub</span>,[4,2])</span>;　</code></pre>
<p>不同就在于第二个参数，apply写成数组</p>
<p>bind写法<br>function add(a,b)  <br>{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a+b);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">alert<span class="hljs-comment">(a+b)</span>;  </code></pre>
<p>}  <br>function sub(a,b)  <br>{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a-b);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">alert<span class="hljs-comment">(a-b)</span>;  </code></pre>
<p>}  <br>add.bind(sub,[4,2])();　</p>
<p>bind是返回了一个改变上下文的一个函数，可以稍后调用，而apply，call是立即执行函数</p>
<h2 id="articleHeader11">10. b继承a的方法（js面向对象复习）</h2>
<ul>
<li><p>原型链继承</p></li>
<li><p>构造函数继承</p></li>
<li><p>实例继承</p></li>
<li><p>组合继承</p></li>
<li><p>拷贝继承</p></li>
<li><p>寄生组合继承</p></li>
</ul>
<h2 id="articleHeader12">11. 如何阻止事件冒泡和默认事件</h2>
<ul>
<li><p>cancelBubble(IE),</p></li>
<li><p>return false,</p></li>
<li><p>event.preventDefault,</p></li>
<li><p>event.stopPropagation()</p></li>
</ul>
<h2 id="articleHeader13">12. 添加 删除 替换 插入到某个接点的方法</h2>
<ul>
<li><p>obj.appendChild()</p></li>
<li><p>obj.insertBefore()</p></li>
<li><p>obj.replace()</p></li>
<li><p>obj.remove()</p></li>
</ul>
<h2 id="articleHeader14">13. window.onload和$(document).ready的区别</h2>
<ul>
<li><p>window.onload只能出现一次，$(document).ready能出现多次</p></li>
<li><p>window.onload需要等所有文件都加载完才开始加载，$(document).ready只需等文档结构加载完了就开始加载</p></li>
</ul>
<h2 id="articleHeader15">14. == 和 === 区别</h2>
<p>前者会自动转换类型<br>后者不会</p>
<h2 id="articleHeader16">15. javascript的同源策略（跨域问题）</h2>
<p>跨域是什么：实际上就是一个网站不能执行其他网站上的网址，是由浏览器同源策略造成的，是浏览器对js施加的安全限制<br>所谓同源，实际上是指域名，协议，端口都相同<br>也就是说当，域名或者协议，或者端口不同的时候，就是跨域，</p>
<h3 id="articleHeader17">15.1. 解决方法：</h3>
<blockquote><p>jsonp</p></blockquote>
<p>json with padding,是一种json的一种使用模式<br>产生的原因，ajax不支持跨域，由于浏览器的同源策略，但是script的src支持跨域<br>主要的原理是动态创建一个script标签的，通过src调用服务器提供的js脚本，该脚本的内容是一个函数调用，该函数在本地js文件中进行定义，其中的参数就是，本地函数请求的数据，也就是服务器所将返回的数据</p>
<p>与ajax的不同，ajax是通过xhr获取非本页面的数据内容，而jsonp获取的是服务器提供js脚本</p>
<blockquote><p>代理</p></blockquote>
<ul>
<li><p>例如www.123.com/index.html需要调用</p></li>
<li><p>www.456.com/server.php，可以写一个接口</p></li>
<li><p>www.123.com/server.php，由这个接口在后端去调用</p></li>
<li><p>www.456.com/server.php并拿到返回值，然后再返回给 index.html，这就是一个代理的模式。相当于绕过了浏览器端，自然就不存在跨域问题。</p></li>
</ul>
<blockquote><p>PHP端修改header（XHR2方式）<br>在php接口脚本中加入以下两句即可：<br>header('Access-Control-Allow-Origin:*');//允许所有来源访问<br>header('Access-Control-Allow-Method:POST,GET');//允许访问的方式</p></blockquote>
<h2 id="articleHeader18">16. javascript是一种什么样的语言</h2>
<ul>
<li><p>解释性脚本语言，代码不进行预编译</p></li>
<li><p>主要用来向HTML页面添加交互行为</p></li>
<li><p>可以直接嵌入HTML页面，但单独写成js文件有利于结构和行为的分离</p></li>
<li><p>跨平台性，在绝大多数浏览器支持下，可以在多种平台下运行，linux,windows</p></li>
</ul>
<h2 id="articleHeader19">17. javascript基本数据类型和引用数据类型</h2>
<blockquote><p>基本类型 undefind null number string boolean</p></blockquote>
<ul>
<li><p>基本类型的值是不能改变的</p></li>
<li><p>基本类型不能添加属性和方法</p></li>
<li><p>基本类型的比较是值的比较</p></li>
<li><p>基本类型变量存放在栈区（栈内存）</p></li>
<li><p>也就是说基本类型在赋值操作后，两个变量是相互不受影响的。</p></li>
</ul>
<blockquote><p>引用类型 object Function Array</p></blockquote>
<ul>
<li><p>引用类型可以添加属性和方法，属性方法内又可以添加基本类型</p></li>
<li><p>引用类型的值是可变的</p></li>
<li><p>引用类型的值时同时保存在栈内存和堆内存里的对象，准确地说，引用类型的存储需要内存的栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，</p></li>
<li><p>引用类型的比较是引用的比较  引用类型时按引用访问的，换句话说就是比较两个对象的堆内存中的地址是否相同，那很明显，person1和person2在堆内存中地址是不同的</p></li>
<li><p>引用类型的赋值其实是对象保存在栈区地址指针的赋值，因此两个变量指向同一个对象，任何的操作都会相互影响</p></li>
</ul>
<h2 id="articleHeader20">18. js原生不要与jq搞混</h2>
<ul><li><p>document.getELementById("ID").value</p></li></ul>
<p>获取值的时候原生不是方法，不带括号</p>
<ul><li><p>获取所有checkbox</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var boxs =document.getELementsByTagName(&quot;input&quot;);
var boxArray = [];
var len = boxs.length;
while(len--){
    if(boxs[len].type == 'checkbox'){
        boxArray.push(boxs[len]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> boxs =document.getELementsByTagName(<span class="hljs-string">"input"</span>);
<span class="hljs-keyword">var</span> boxArray = [];
<span class="hljs-keyword">var</span> <span class="hljs-built_in">len</span> = boxs.length;
while(<span class="hljs-built_in">len</span>--){
    <span class="hljs-keyword">if</span>(boxs[<span class="hljs-built_in">len</span>].<span class="hljs-keyword">type</span> == <span class="hljs-string">'checkbox'</span>){
        boxArray.push(boxs[<span class="hljs-built_in">len</span>]);
    }
}</code></pre>
<ul><li><p>设置div html内容以及设置样式</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dom = document.getElementById(&quot;ID&quot;);
dom.innerHTML = &quot;xxxx&quot;
dom.style.color=&quot;#000&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> dom = document.getElementById(<span class="hljs-string">"ID"</span>);
dom.innerHTML = <span class="hljs-string">"xxxx"</span>
dom.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">color</span>=<span class="hljs-string">"#000"</span></code></pre>
<h2 id="articleHeader21">19. DOM,BOM</h2>
<p>javascript由ECMAScript,DOM,BOM三部分组成，</p>
<ul>
<li><p>ECMAScript也是一种语言，也就是对规定的语法，操作，关键字，语句等的一个描述，javascript实现了ECMAScript</p></li>
<li><p>DOM是文档对象模型，包括了获取元素，修改样式，操作元素三方面内容，也是我们进行最多的操作，有很多兼容性写法</p></li>
<li><p>BOM是浏览器对象模型，包括浏览器的一些操作，window.onload,window.open等还有浏览器事件，监听窗口的改变onresize,监听滚动事件onscroll等</p></li>
</ul>
<h2 id="articleHeader22">20. null和undefind的区别</h2>
<ul>
<li><p>null是表示一个空的对象，转为数值为0，undefind表示一个空的原始值，转为数值为NAN</p></li>
<li><p>undefind指本该有一个值，但却并有定义，null表示没有对象，不应该有值</p></li>
</ul>
<h2 id="articleHeader23">21. XML和JSON的区别</h2>
<ul>
<li><p>JSON相对于XML来讲传递速度更快，因为光看代码量就能看出</p></li>
<li><p>JSON与js的交互更容易，解析更方便</p></li>
</ul>
<h2 id="articleHeader24">22. 实现多个标签之间的通信</h2>
<p>调用localStorage,cookies等本地存储进行存储相关信息<br>三者的共同点：都保存在浏览器。<br>三者的区别：</p>
<blockquote><p>与服务器的交互</p></blockquote>
<ul>
<li><p>cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。</p></li>
<li><p>而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。</p></li>
</ul>
<blockquote><p>存储大小限制也不同，</p></blockquote>
<ul>
<li><p>cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。</p></li>
<li><p>sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。</p></li>
</ul>
<blockquote><p>数据有效期不同，</p></blockquote>
<ul>
<li><p>sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；</p></li>
<li><p>localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；</p></li>
<li><p>cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。</p></li>
</ul>
<blockquote><p>作用域不同，</p></blockquote>
<ul>
<li><p>sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；</p></li>
<li><p>localStorage 在所有同源窗口中都是共享的；</p></li>
<li><p>cookie也是在所有同源窗口中都是共享的。</p></li>
</ul>
<h2 id="articleHeader25">23. 哪些操作会造成内存泄露</h2>
<blockquote><p>内存泄露指任何对象在不再拥有或不再需要它之后依然存在</p></blockquote>
<ul>
<li><p>setTimeout第一个参数是字符串而不是函数的时候就会造成内存泄露</p></li>
<li><p>闭包</p></li>
<li><p>控制台日志</p></li>
<li><p>循环（两个对象彼此引用且彼此保留）</p></li>
</ul>
<h2 id="articleHeader26">24. js垃圾回收方式</h2>
<ul>
<li><p>标记清除：这是js最常用的垃圾回收方法，当一个变量进入执行环境时，例如函数中声明一个变量，将其标记为进入环境，当变量离开环境时，（函数执行结束），标记为离开环境</p></li>
<li><p>引用计数: 跟踪记录每个值被引用的次数，声明一个变量，并将引用 类型赋值给这个变量，则这个值的引用次数+1，当变量的值变成了另一个，则这个值的引用次数-1，当值的引用次数为0的时候，就回收</p></li>
</ul>
<h2 id="articleHeader27">25. 闭包</h2>
<ul>
<li><p>函数嵌套函数</p></li>
<li><p>子级函数调用父级函数的参数或变量</p></li>
</ul>
<p><strong>经典闭包</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function outer(){
    var a = 1;
    function inner(){
        alert(a);
    }
    return inner
}
var inn = outer();
inn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outer</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span><span class="hljs-params">()</span></span>{
        alert(a);
    }
    <span class="hljs-keyword">return</span> inner
}
<span class="hljs-keyword">var</span> inn = outer();
inn();</code></pre>
<p><strong>点击li返回li下标</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;test&quot;>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>

<script>
    var oUL = document.getElementById(&quot;test&quot;);
    var oLi = oUl.getElementByTagName(&quot;li&quot;);
    for(var i=0;i<oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = function(){
            alert(this.index);
        }
    }

</script>

<!-- 闭包 -->
<script>
    var oUL = document.getElementById(&quot;test&quot;);
    var oLi = oUl.getElementByTagName(&quot;li&quot;);
    for(var i=0;i<oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = (function(a){
            return function(){
                alert a;
            }
        })(i)
    }

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oUL = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"test"</span>);
    <span class="hljs-keyword">var</span> oLi = oUl.getElementByTagName(<span class="hljs-string">"li"</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            alert(<span class="hljs-keyword">this</span>.index);
        }
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 闭包 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oUL = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"test"</span>);
    <span class="hljs-keyword">var</span> oLi = oUl.getElementByTagName(<span class="hljs-string">"li"</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                alert a;
            }
        })(i)
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader28">26. this指向问题</h2>
<blockquote><p>普通函数调用，指向windows</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.value=1;
function getValue(){
 console.log(this.value);
}
getValue();//输出1，此时的this指向window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.value=<span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}
getValue();<span class="hljs-comment">//输出1，此时的this指向window</span></code></pre>
<blockquote><p>对象的方法调用，指向对象</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Obj={
  value:2,
  getValue:function(){
       console.log(this.value);//输出2,this指向Obj
  }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Obj={
  <span class="hljs-attr">value</span>:<span class="hljs-number">2</span>,
  <span class="hljs-attr">getValue</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);<span class="hljs-comment">//输出2,this指向Obj</span>
  }   
}</code></pre>
<blockquote><p>构造器方法调用，指向构造函数实例出来的对象</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function main(val){
  this.value=val;
}
main.prototype.getValue=function(){
  console.log(this.value);
}

var fun=new main(3);
fun.getValue();
fun.value;//输出3，this指向main的实例对象fun" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function main(<span class="hljs-keyword">val</span>){
  <span class="hljs-keyword">this</span>.value=<span class="hljs-keyword">val</span>;
}
main.prototype.getValue=function(){
  console.log(<span class="hljs-keyword">this</span>.value);
}

<span class="hljs-keyword">var</span> <span class="hljs-function"><span class="hljs-keyword">fun</span>=new <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-number">3</span>)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">fun</span>.<span class="hljs-title">getValue</span><span class="hljs-params">()</span></span>;
<span class="hljs-function"><span class="hljs-keyword">fun</span>.value;//输出3，this指向main的实例对象<span class="hljs-keyword">fun</span></span></code></pre>
<blockquote><p>call,apply,bind可以自定义this指向第一个参数</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showValue(){
  console.log(this.value);
}
var obj={
  value:4
}
showValue.call(obj)//输出4，this指向了obj对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showValue</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}
<span class="hljs-keyword">var</span> obj={
  <span class="hljs-attr">value</span>:<span class="hljs-number">4</span>
}
showValue.call(obj)<span class="hljs-comment">//输出4，this指向了obj对象</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showValue(){
  console.log(this.value);
}
var obj={
  value:4
}
var showValue2=showValue.bind(obj);
showValue2()//输出4，this指向了obj对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showValue</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
}
<span class="hljs-keyword">var</span> obj={
  <span class="hljs-attr">value</span>:<span class="hljs-number">4</span>
}
<span class="hljs-keyword">var</span> showValue2=showValue.bind(obj);
showValue2()<span class="hljs-comment">//输出4，this指向了obj对象</span></code></pre>
<h2 id="articleHeader29">27. 高阶函数</h2>
<ul>
<li><p>函数作为参数传递，</p></li>
<li><p>函数作为返回值输出</p></li>
</ul>
<h2 id="articleHeader30">28. new操作符到底干了什么</h2>
<ul>
<li><p>创建一个新对象</p></li>
<li><p>将构造函数的作用域赋值给新对象（所以this指向了这个新对象）</p></li>
<li><p>执行构造函数的代码（为这个新对象添加属性）</p></li>
<li><p>返会新对象</p></li>
</ul>
<h2 id="articleHeader31">29. js严格模式</h2>
<p>"use  strict"<br>消除js一些不合理的用法<br>消除代码运行的一些不安全之处<br>增加运行速度<br>为未来新版本js做铺垫</p>
<ul>
<li><p>变量必须声明</p></li>
<li><p>对象不能出现重复属性名</p></li>
<li><p>arguments改变，不会影响函数参数</p></li>
<li><p>eval，arguments变为关键字，不能作为变量名</p></li>
<li><p>不允许使用with</p></li>
<li><p>不用call，apply，bind改变this指向，一般函数调用指向null</p></li>
</ul>
<h2 id="articleHeader32">30. 事件代理事件委托</h2>
<ul><li><p>原理是使用dom的冒泡，将事件绑定到父元素上，让父元素进行监听，提高性能</p></li></ul>
<h2 id="articleHeader33">31.什么是版本控制，</h2>
<p>版本控制是一种记录一个或若干文件内容变化，以便将来查阅修改以及更新。</p>
<h2 id="articleHeader34">32.ajax请求</h2>
<p>ajax请求四步</p>
<ul>
<li><p>创建一个xhr对象 var xhr = new XmlHttpRequest()</p></li>
<li><p>判断就绪状态为4时执行代码</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        console.log(responseText);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span>){
        console.<span class="hljs-built_in">log</span>(responseText);
    }
}</code></pre>
<ul>
<li><p>创建请求 xhr.open('get','url',true)</p></li>
<li><p>发送请求 xhr.send(null)</p></li>
</ul>
<h2 id="articleHeader35">33.在浏览器中输入URL到整个页面显示在用户面前时这个过程中到底发生了什么</h2>
<ul>
<li><p>DNS解析</p></li>
<li><p>TCP连接</p></li>
<li><p>发送HTTP请求</p></li>
<li><p>服务器处理请求并返回HTTP报文</p></li>
<li><p>浏览器解析渲染页面</p></li>
<li><p>连接结束</p></li>
</ul>
<h3 id="articleHeader36">详细：</h3>
<p>首先根据url中的域名，在远程服务器中查询对应</p>
<h2 id="articleHeader37">34.ajax和json</h2>
<blockquote><p>ajax用于web页面中实现异步数据交互，实现页面局部内容刷新</p></blockquote>
<ul>
<li><p>优点：能够进行内容局部加载刷新，减少带宽，避免用户不断刷新以及页面跳转，提高用户体验</p></li>
<li><p>缺点：对搜索引擎不友好；浏览器不支持ajax的后退；</p></li>
</ul>
<blockquote><p>json是一种请求轻量级的数据交互格式</p></blockquote>
<ul><li><p>优点：轻量级，编译人的阅读理解，便于机器解析</p></li></ul>
<h2 id="articleHeader38">35.http考点</h2>
<h3 id="articleHeader39">常用的HTTP方法有哪些</h3>
<p>GET:<br>POST:<br>PUT:<br>DELETE:</p>
<h3 id="articleHeader40">GET与POST方法的区别</h3>
<ul>
<li><p>get主要是从服务器获取资源，post主要是像服务器发送数据</p></li>
<li><p>get传输数据通过url请求，利用k=v的形式放在url后面，用?连接，多个用&amp;连接而post是存放在，ajax中的data中的，get传输的过程使用户可见 的，而post是对用户不可见的。</p></li>
<li><p>get传输的数据量小，以为受url的长度限制，但是效率高，post能上传的数据量大</p></li>
<li><p>post较get更安全一些</p></li>
<li><p>get方式传递的中文字符可能会乱码，post支持标准字符集，可以正确传递中文字符</p></li>
</ul>
<h3 id="articleHeader41">http请求报文与响应报文格式</h3>
<p>请求报文包含三部分：</p>
<ul>
<li><p>请求行：包含请求方法、URI、http版本信息</p></li>
<li><p>请求首部字段</p></li>
<li><p>请求内容实体</p></li>
</ul>
<p>响应报文包含三部分：</p>
<ul>
<li><p>状态行：包含HTTP版本、状态码、状态码的原因短语</p></li>
<li><p>响应首部字段</p></li>
<li><p>响应内容实体</p></li>
</ul>
<h3 id="articleHeader42">http状态码</h3>
<ul>
<li><p>100-199：成功接收请求，但需要进行下一步请求</p></li>
<li><p>200-299：成功接收请求，并完成整个处理过程</p></li>
<li><p>300-399：为完成全部请求，客户需近一步细化需求</p></li>
<li><p>400-499：客户端请求有错误，包括语法错误或不能正常执行</p></li>
<li><p>500-599：服务器端出现错误</p></li>
</ul>
<h3 id="articleHeader43">http缺点与https</h3>
<ul>
<li><p>通信使用明文不加密，内容可能被窃听</p></li>
<li><p>不验证通信方身份，可能遭到伪装</p></li>
<li><p>无法验证报文完整性，可能被篡改</p></li>
</ul>
<p>https就是加上加密处理（一般是SSL安全通信线路）+认证+完整性保护</p>
<p>常用：</p>
<ul>
<li><p>200 正常，表示一切正常，返会的是正常请求结果</p></li>
<li><p>302/307 临时重定向，表示请求的文档，已被临时移动到别处</p></li>
<li><p>304 未修改，调用缓存的数据</p></li>
<li><p>403 服务器拒绝客户请求</p></li>
<li><p>404 服务器不存在客户想要找的资源</p></li>
<li><p>500 服务器内部错误</p></li>
</ul>
<h2 id="articleHeader44">36.数组去重的一种相对好理解的方法</h2>
<p>利用indexOf方法的去重</p>
<p>indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,1,2,3,4,2,6,4,5,7];
var nArr = [];
function removeItem(arr){
    for(var i=0;i<arr.length;i++){
        if(nArr.indexOf(arr[i])==-1){
            nArr.push(arr[i]);
        }
    }
    return nArr;
}
console.log(removeItem(arr));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var arr = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">6</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>];
var nArr = [];
function removeItem(arr){
    for(var i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
        if(nArr.indexOf(arr[i])==<span class="hljs-number">-1</span>){
            nArr.push(arr[i]);
        }
    }
    return nArr;
}
console.log(removeItem(arr));</code></pre>
<h1 id="articleHeader45">es6</h1>
<blockquote><p>let const</p></blockquote>
<ul>
<li><p>let相当于给js新增了块级作用域，声明的变量只在let命令所在的代码块内有效</p></li>
<li><p>const也是声明变量，它声明的变量，不能改变，可以用来声明第三方库变量的应用</p></li>
</ul>
<blockquote><p>class extends super</p></blockquote>
<ul>
<li><p>class定义一个类，其中有一个construct方法，construct方法中的this代表实例对象，construct以外还有其他的方法，construct内定义的方法属性是实例对象自己的，construct外的方法属性是所有实例对象共享的</p></li>
<li><p>class之间可以通过extends实现继承</p></li>
<li><p>super指代父类的实例，子类construct中必须先调用super()方法，因为子类没有自己的this对象，是继承父类的this对象</p></li>
</ul>
<blockquote><p>arrow function(箭头函数)</p></blockquote>
<p>除了书写简洁了很多，最大的优点是this指向，使用箭头函数，函数内部的this就是定义时所在的对象。箭头函数根本没有自己的this，this是继承外面的，它内部的this就是外层代码块的this</p>
<blockquote><p>template string(模板字符串)</p></blockquote>
<p>ajax调用数据库，需要向文档中插入大段html的时候，传统的字符串拼接太麻烦，引入模板工具库会稍微好点，不过还是没有es6的template string简单，可以直接用反单引号包括代码块``,用${}来引用变量，所有的空格缩进都会保留到输出中</p>
<blockquote><p>destructuring(解构赋值)</p></blockquote>
<p>es6按照一定模式，从数组和对象中提取值，对变量进行赋值，这就成为解构，也就是说，运用es5的方法，数组和对象中的变量需要，一个个进行赋值，而es6可以一步到位</p>
<blockquote><p>default,rest(默认值，扩展语法)</p></blockquote>
<p>当函数忘记传参的时候，给它一个默认值，传统方法是在函数中运用||，es6可以直接在参数中写上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-keyword">function</span> animal(<span class="hljs-class"><span class="hljs-keyword">type</span>){</span>
    <span class="hljs-class"><span class="hljs-keyword">type</span> </span>= <span class="hljs-class"><span class="hljs-keyword">type</span> || '<span class="hljs-title">cat</span>'  </span>
    console.log(<span class="hljs-class"><span class="hljs-keyword">type</span>)</span>
}
animal()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animal(type = 'cat'){
    console.log(type)
}
animal()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animal</span><span class="hljs-params">(<span class="hljs-keyword">type</span> = <span class="hljs-string">'cat'</span>)</span><span class="hljs-comment">{
    console.log(type)
}</span>
<span class="hljs-title">animal</span><span class="hljs-params">()</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //[&quot;cat&quot;, &quot;dog&quot;, &quot;fish&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animals</span><span class="hljs-params">(<span class="hljs-rest_arg">...types</span>)</span></span>{
    console.log(types)
}
animals(<span class="hljs-string">'cat'</span>, <span class="hljs-string">'dog'</span>, <span class="hljs-string">'fish'</span>) <span class="hljs-comment">//["cat", "dog", "fish"]</span></code></pre>
<h1 id="articleHeader46">gulp</h1>
<p>gulp是一种自动化构建工具，前端工程化开发的一种工具，增强开发流程<br>使用方便，npm安装，新建gulpfile.js,导入gulp模块，let gulp = require('gulp')<br>通过default任务去定义工作流<br>最后在终端执行gulp来进行自动化操作</p>
<blockquote><p>api很简单只有四种</p></blockquote>
<ul>
<li><p>gulp.task 创建任务 ：参数任务名称，前置任务数组，回调函数</p></li>
<li><p>gulp.src  寻找文件：通过路径找到一个或多个文件</p></li>
<li><p>gulp.dest 输出到指定目录：如果没有就新建一个</p></li>
<li><p>gulp.watch 监听文件变化，执行任务</p></li>
<li><p>pipe具体不清楚，总之，除了gulp.src之外，其他执行条件都要放在.pipe()中</p></li>
</ul>
<h1 id="articleHeader47">Bootstrap</h1>
<h2 id="articleHeader48">Bootstrap和Foundation的比较</h2>
<blockquote><p>UI元素的不同</p></blockquote>
<ul>
<li><p>Bootstrap给出了能想到的一切元素，也就是试图提供所有定义好的UI，比如一个导航，给予一个默认导航的样式</p></li>
<li><p>Foundation只给定了限定的几种元素，可以自己自定义，更适合创造</p></li>
</ul>
<blockquote><p>尺寸单位不一样，</p></blockquote>
<ul>
<li><p>Bootstrap是px</p></li>
<li><p>Foundation是rem</p></li>
</ul>
<blockquote><p>网格布局有所不同</p></blockquote>
<ul>
<li><p>Foundation 的网格可以自动适配当前浏览器的宽度，Foundation 则会灵活适配当前的浏览器宽度, 这是一种新的技术手段, 自动适配的同时, 可以表现的与 Transformer 一样的效果.</p></li>
<li><p>Boostrap 则是预定义了几种网格尺寸来适配主流的设备和屏幕.Bootstrap 会在你改变浏览器宽度的时候突然改变它的网格.</p></li>
</ul>
<blockquote><p>移动设备</p></blockquote>
<ul>
<li><p>Foundation移动设备优先</p></li>
<li><p>Bootstrap也支持移动设备</p></li>
</ul>
<blockquote><p>社区</p></blockquote>
<ul>
<li><p>Bootstrap有一个完备的社区,有什么问题几乎都可以迅速解决</p></li>
<li><p>Foundation则没有，需要自力更生</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见js笔试面试题（持续更新）

## 原文链接
[https://segmentfault.com/a/1190000011875256](https://segmentfault.com/a/1190000011875256)

