---
title: '理解Javascript中的事件绑定与事件委托' 
date: 2019-02-05 2:30:09
hidden: true
slug: 786d6bfemu
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在深入实践js中，遇到了一些问题，比如我需要为动态创建的DOM元素绑定事件，那么普通的事件绑定就不行了，于是通过上网查资料了解到事件委托，因此想总结一下js中的事件绑定与事件委托。</p>
<h2 id="articleHeader0">事件绑定</h2>
<h3 id="articleHeader1">最直接的事件绑定：HTML事件处理程序</h3>
<p>如下示例代码，通过节点属性显式声明，直接在HTML中，显式地为按钮绑定了click事件，当该按钮有用户点击行为时，便会触发myClickFunc方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html */
<button id=&quot;btn&quot; onclick=&quot;myClickFunc()&quot;>
    ClickMe
</button>

/* js */
// 事件处理程序
var myClickFunc = function(evt){
    // TODO..
};

// 移除事件处理程序
myClickFunc = function(){};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* html */</span>
&lt;button id=<span class="hljs-string">"btn"</span> onclick=<span class="hljs-string">"myClickFunc()"</span>&gt;
    ClickMe
&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
/</span><span class="hljs-regexp">/ 事件处理程序
var myClickFunc = function(evt){
    /</span><span class="hljs-regexp">/ TODO..
};

/</span><span class="hljs-regexp">/ 移除事件处理程序
myClickFunc = function(){};</span></code></pre>
<p>显而易见，这种绑定方式非常不友好，HTML代码和JS代码严重耦合在一起，比如当要修改一个函数名时候，就要修改两次，</p>
<h3 id="articleHeader2">DOM 0 级事件处理程序</h3>
<p>通过DOM操作动态绑定事件，是一种比较传统的方式，把一个函数赋值给事件处理程序。这种方式也是应用较多的方式，比较简单。看下面例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html */
<button id=&quot;btn&quot;>ClickMe</button>

/* js */
// 事件处理程序
var myClickFunc = function(evt){
    // TODO ...
};

// 直接给DOM节点的 onclick 方法赋值，注意这里接收的是一个function
document.getElementById('btn').onclick = myClickFunc;

// 移除事件处理程序
document.getElementById('btn').onclick = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* html */</span>
&lt;button id=<span class="hljs-string">"btn"</span>&gt;ClickMe&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
/</span><span class="hljs-regexp">/ 事件处理程序
var myClickFunc = function(evt){
    /</span><span class="hljs-regexp">/ TODO ...
};

/</span><span class="hljs-regexp">/ 直接给DOM节点的 onclick 方法赋值，注意这里接收的是一个function
document.getElementById('btn').onclick = myClickFunc;

/</span><span class="hljs-regexp">/ 移除事件处理程序
document.getElementById('btn').onclick = null;</span></code></pre>
<h3 id="articleHeader3">DOM 2 级事件处理程序</h3>
<p>通过事件监听的方式绑定事件，DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// event: 事件名称
// function: 事件函数
// boolean: false | true, true 为事件捕获, false 为事件冒泡(默认);
Ele.addEventListener(event,function[,boolean]); // 添加句柄
ELe.removeEventListener(event,function[,boolean]); // 移除句柄" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// event: 事件名称</span>
<span class="hljs-comment">// function: 事件函数</span>
<span class="hljs-comment">// boolean: false | true, true 为事件捕获, false 为事件冒泡(默认);</span>
Ele.addEventListener(event,<span class="hljs-function"><span class="hljs-keyword">function</span>[,<span class="hljs-title">boolean</span>]); // 添加句柄
<span class="hljs-title">ELe</span>.<span class="hljs-title">removeEventListener</span>(<span class="hljs-params">event,function[,boolean]</span>); // 移除句柄</span></code></pre>
<p>看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html */
<button id=&quot;btn&quot;>ClickMe</button>

/* js */
// 通过DOM操作进行动态绑定：
// 获取btnHello节点
var oBtn = document.getElementById('btn');
 
// 增加第一个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    // TODO sth 1...
});
 
// 增加第二个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    // TODO sth 2...
});

// ps：通过这种形式，可以给btn按钮绑定任意多个click监听；注意，执行顺序与添加顺序相关。

// 移除事件处理程序
oBtn.removeEventListener('click',function(evt){..});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* html */</span>
&lt;button id=<span class="hljs-string">"btn"</span>&gt;ClickMe&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
/</span><span class="hljs-regexp">/ 通过DOM操作进行动态绑定：
/</span><span class="hljs-regexp">/ 获取btnHello节点
var oBtn = document.getElementById('btn');
 
/</span><span class="hljs-regexp">/ 增加第一个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    /</span><span class="hljs-regexp">/ TODO sth 1...
});
 
/</span><span class="hljs-regexp">/ 增加第二个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    /</span><span class="hljs-regexp">/ TODO sth 2...
});

/</span><span class="hljs-regexp">/ ps：通过这种形式，可以给btn按钮绑定任意多个click监听；注意，执行顺序与添加顺序相关。

/</span><span class="hljs-regexp">/ 移除事件处理程序
oBtn.removeEventListener('click',function(evt){..});</span></code></pre>
<h3 id="articleHeader4">IE事件处理程序</h3>
<p>DOM 2级事件处理程序在IE是行不通的，IE有自己的事件处理程序方法：<code>attachEvent()</code>和<code>detachEvent()</code>。这两个方法的用法与<code>addEventListener()</code>是一样的，但是只接收两个参数，一个是事件名称，另一个是事件处理程序的函数。为什么不使用第三个参数的原因呢？因为IE8以及更早的浏览器版本只支持事件冒泡。看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html */
<button id=&quot;btn&quot;>ClickMe</button>

/* js */
var oBtn = document.getElementById('btn');
// 事件处理函数
function evtFn(){ 
    console.log(this);
}
// 添加句柄
oBtn.attachEvent('onclick',evtFn);

// 移除句柄
oBtn.detachEvent('onclick',evtFn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* html */</span>
&lt;button id=<span class="hljs-string">"btn"</span>&gt;ClickMe&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
var oBtn = document.getElementById('btn');
/</span><span class="hljs-regexp">/ 事件处理函数
function evtFn(){ 
    console.log(this);
}
/</span><span class="hljs-regexp">/ 添加句柄
oBtn.attachEvent('onclick',evtFn);

/</span><span class="hljs-regexp">/ 移除句柄
oBtn.detachEvent('onclick',evtFn);</span></code></pre>
<h3 id="articleHeader5">简易的跨浏览器解决方法</h3>
<p>如果我们既要支持IE的事件处理方法，又要支持 DOM 2级事件，那么就要封装一个跨浏览器的事件处理函数，如果支持 DOM 2级事件，就用<code>addEventListener</code>，否则就用<code>attachEvent</code>。例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//跨浏览器事件处理程序
var eventUtil = {
    // 添加句柄
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent('on' + type, handler);
        }else{
            element['on' + type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type, handler);
        }else{
            element['on' + type] = null;
        }
    }
};

var oBtn = document.getElementById('btn');
function evtFn(){
    alert('hello world');
}
eventUtil.addHandler(oBtn, 'click', evtFn);
eventUtil.removeHandler(oBtn, 'click', evtFn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//跨浏览器事件处理程序</span>
<span class="hljs-keyword">var</span> eventUtil = {
    <span class="hljs-comment">// 添加句柄</span>
    addHandler: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>)</span>{
        <span class="hljs-keyword">if</span>(element.addEventListener){
            element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(element.attachEvent){
            element.attachEvent(<span class="hljs-string">'on'</span> + type, handler);
        }<span class="hljs-keyword">else</span>{
            element[<span class="hljs-string">'on'</span> + type] = handler;
        }
    },
    <span class="hljs-comment">// 删除句柄</span>
    removeHandler: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>)</span>{
        <span class="hljs-keyword">if</span>(element.removeEventListener){
            element.removeEventListener(type, handler, <span class="hljs-literal">false</span>);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(element.detachEvent){
            element.detachEvent(<span class="hljs-string">'on'</span> + type, handler);
        }<span class="hljs-keyword">else</span>{
            element[<span class="hljs-string">'on'</span> + type] = <span class="hljs-literal">null</span>;
        }
    }
};

<span class="hljs-keyword">var</span> oBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evtFn</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'hello world'</span>);
}
eventUtil.addHandler(oBtn, <span class="hljs-string">'click'</span>, evtFn);
eventUtil.removeHandler(oBtn, <span class="hljs-string">'click'</span>, evtFn);</code></pre>
<h2 id="articleHeader6">事件冒泡和事件捕获</h2>
<p>在了解事件委托之前，要先了解下事件冒泡和事件捕获。</p>
<p>早期的web开发，浏览器厂商很难回答一个哲学上的问题：当你在页面上的一个区域点击时，你真正感兴趣的是哪个元素。这个问题带来了交互的定义。在一个元素的界限内点击，显得有点含糊。毕竟，在一个元素上的点击同时也发生在另一个元素的界限内。例如单击一个按钮。你实际上点击了按钮区域、body元素的区域以及html元素的区域。</p>
<p>伴随着这个问题，两种主流的浏览器Netscape和IE有不同的解决方案。Netscape定义了一种叫做事件捕获的处理方法，事件首先发生在DOM树的最高层对象(document)然后往最深层的元素传播。在图例中，事件捕获首先发生在document上，然后是html元素，body元素，最后是button元素。</p>
<p>IE的处理方法正好相反。他们定义了一种叫事件冒泡的方法。事件冒泡认为事件促发的最深层元素首先接收事件。然后是它的父元素，依次向上，知道document对象最终接收到事件。尽管相对于html元素来说，document没有独立的视觉表现，他仍然是html元素的父元素并且事件能冒泡到document元素。所以图例中噢噢那个button元素先接收事件，然后是body、html最后是document。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760658" src="https://static.alili.tech/img/remote/1460000006760658" alt="事件.png" title="事件.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">事件冒泡</h3>
<p>简单点说，事件冒泡就是事件触发时，会从目标DOM元素向上传播，直到文档根节点，一般情况下，会是如下形式传播：</p>
<p>targetDOM → parentNode → ... → body → document → window</p>
<p>如果希望一次事件触发能在整个DOM树上都得到响应，那么就需要用到事件冒泡的机制。看下面示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html */
<button id=&quot;btn&quot;>ClickMe</button>

/* js */
// 给按钮增加click监听
document.getElementById('btn').addEventListener('click',function(evt){
    alert('button clicked');
},false);
 
// 给body增加click监听
document.body.addEventListener('click',function(evt){
    alert('body clicked');
},false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* html */</span>
&lt;button id=<span class="hljs-string">"btn"</span>&gt;ClickMe&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
/</span><span class="hljs-regexp">/ 给按钮增加click监听
document.getElementById('btn').addEventListener('click',function(evt){
    alert('button clicked');
},false);
 
/</span><span class="hljs-regexp">/ 给body增加click监听
document.body.addEventListener('click',function(evt){
    alert('body clicked');
},false);</span></code></pre>
<p>在这种情况下，点击按钮“ClickMe”后，其自身的click事件会被触发，同时，该事件将会继续向上传播， 所有的祖先节点都将得到事件的触发命令，并立即触发自己的click事件；所以如上代码，将会连续弹出两个alert.</p>
<p>在有些时候，我们想让事件独立触发，所以我们必须阻止冒泡，用<code>event</code>的<code>stopPropagation()</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>ClickMe</button>

/* js */
// 给按钮增加click监听
document.getElementById('btn').addEventListener('click',function(evt){
    alert('button clicked');
    evt.stopPropagation(); //阻止事件冒泡
},false);
 
// 给body增加click监听
document.body.addEventListener('click',function(evt){
    alert('body clicked');
},false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;button id=<span class="hljs-string">"btn"</span>&gt;ClickMe&lt;<span class="hljs-regexp">/button&gt;

/</span>* js *<span class="hljs-regexp">/
/</span><span class="hljs-regexp">/ 给按钮增加click监听
document.getElementById('btn').addEventListener('click',function(evt){
    alert('button clicked');
    evt.stopPropagation(); /</span><span class="hljs-regexp">/阻止事件冒泡
},false);
 
/</span><span class="hljs-regexp">/ 给body增加click监听
document.body.addEventListener('click',function(evt){
    alert('body clicked');
},false);</span></code></pre>
<p>此时，点击按钮后，只会触发按钮本身的click事件，得到一个alert效果；该按钮的点击事件，不会向上传播，body节点就接收不到此次事件命令。</p>
<p>需要注意的是：</p>
<ol>
<li><p>不是所有的事件都能冒泡，如：blur、focus、load、unload都不能</p></li>
<li><p>不同的浏览器，阻止冒泡的方式也不一样，在w3c标准中，通过<code>event.stopPropagation()</code>完成， 在IE中则是通过自身的<code>event.cancelBubble=true</code>来完成。</p></li>
</ol>
<h2 id="articleHeader8">事件委托</h2>
<p>事件委托看起来挺难理解，但是举个生活的例子。比如，有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。举个例子</p>
<p>HTML结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;ul-item&quot;>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ul-item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>如果我们要点击li标签，弹出里面的内容，我们就需要为每个li标签绑定事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var oUlItem = document.getElementById('ul-item');
    var oLi = oUlItem.getElementsByTagName('li');
    for(var i=0, l = oLi.length; i < l; i++){
        oLi[i].addEventListener('click',show);
    };
    function show(e){
        e = e || window.event;
        alert(e.target.innerHTML);
    };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> oUlItem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ul-item'</span>);
    <span class="hljs-keyword">var</span> oLi = oUlItem.getElementsByTagName(<span class="hljs-string">'li'</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>, l = oLi.length; i &lt; l; i++){
        oLi[i].addEventListener(<span class="hljs-string">'click'</span>,show);
    };
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">e</span>)</span>{
        e = e || <span class="hljs-built_in">window</span>.event;
        alert(e.target.innerHTML);
    };
})();</code></pre>
<p>虽然这样子能够实现我们想要的功能，但是如果这个UL中的LI子元素频繁的添加或删除，我们就需要在每次添加LI的时候为它绑定事件。这就添加了复杂度，并且造成内存开销较大。</p>
<p>更简单的方法是利用事件委托，当事件被掏到更上层的父节点的时候，通过检查事件的目标对象（target）来判断并获取事件源LI。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var oUlItem = document.getElementById('ul-item');
    oUlItem.addEventListener('click',show);
    function show(e){
        e = e || window.event;
        var src = e.target;
        if(src &amp;&amp; src.nodeName.toLowerCase() === 'li'){
            alert(src.innerHTML);
        }
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> oUlItem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ul-item'</span>);
    oUlItem.addEventListener(<span class="hljs-string">'click'</span>,show);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">e</span>)</span>{
        e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">var</span> src = e.target;
        <span class="hljs-keyword">if</span>(src &amp;&amp; src.nodeName.toLowerCase() === <span class="hljs-string">'li'</span>){
            alert(src.innerHTML);
        }
    }
})();</code></pre>
<p>这里我们为父节点UL添加了点击事件，当点击子节点LI标签的时候，点击事件会冒泡到父节点。父节点捕获到事件之后，通过判断<code>e.target.nodeName</code>来判断是否为我们需要处理的节点，并且通过<code>e.target</code>拿到了被点击的Li节点。从而可以获取到相应的信息，并做处理。</p>
<p><em>优点：</em></p>
<p>通过上面的介绍，大家应该能够体会到使用事件委托对于web应用程序带来的几个优点：</p>
<ol>
<li><p>管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。</p></li>
<li><p>可以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。</p></li>
<li><p>JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。</p></li>
</ol>
<h2 id="articleHeader9">参考资料</h2>
<p><a href="http://www.diguage.com/archives/71.html" rel="nofollow noreferrer" target="_blank">http://www.diguage.com/archives/71.html</a></p>
<p><a href="http://owenchen.net/?p=15" rel="nofollow noreferrer" target="_blank">http://owenchen.net/?p=15</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解Javascript中的事件绑定与事件委托

## 原文链接
[https://segmentfault.com/a/1190000006667581](https://segmentfault.com/a/1190000006667581)

