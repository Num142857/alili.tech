---
title: 'JS 发布订阅模式' 
date: 2019-02-14 2:30:37
hidden: true
slug: wnwuu08k8v
categories: [reprint]
---

{{< raw >}}

                    
<p>首先声明，本文并非原创。原文请<a href="https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F.md" rel="nofollow noreferrer" target="_blank">点击这里</a>，本文是在原文的基础上加入一些自己的一些东西，方便以后自己理解与查看。</p>
<h2 id="articleHeader0">发布订阅模式</h2>
<p>事件发布/订阅模式 (PubSub) 在异步编程中帮助我们完成更松的解耦，甚至在 MVC、MVVC 的架构中以及设计模式中也少不了发布-订阅模式的参与。</p>
<p>优点：在异步编程中实现更深的解耦</p>
<p>缺点：如果过多的使用发布订阅模式，会增加维护的难度</p>
<h2 id="articleHeader1">实现发布订阅模式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Event = function() {
    this.obj = {}
}

Event.prototype.on = function(eventType,fn) {
    if(!this.obj[eventType]) {
        this.obj[eventType] = []
    }
    this.obj[eventType].push(fn)
}

Event.prototype.emit = function() {
    // 取第一个参数，作为eventType
    var eventType = Array.prototype.shift.call(arguments);
    //  获取事件数组
    var arr = this.obj[eventType];
    var len = arr.length;
    // 循环数组，一次执行其中的函数
    for(var i=0;i<len;i++) {
        // 直接调用arr[i]，其this指向为undefined（严格模式下）
        // 因此用apply将this指向arr[i]
        // 数组shift函数取出第一个参数，将剩下的参数传入函数中
        arr[i].apply(arr[i],arguments)
    }
}

var ev = new Event()
ev.on('click',function(a) {  // 订阅
    console.log(a)
})

ev.emit('click',1)   // 发布" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Event = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.obj = {}
}

Event.prototype.on = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventType,fn</span>) </span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.obj[eventType]) {
        <span class="hljs-keyword">this</span>.obj[eventType] = []
    }
    <span class="hljs-keyword">this</span>.obj[eventType].push(fn)
}

Event.prototype.emit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 取第一个参数，作为eventType</span>
    <span class="hljs-keyword">var</span> eventType = <span class="hljs-built_in">Array</span>.prototype.shift.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-comment">//  获取事件数组</span>
    <span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">this</span>.obj[eventType];
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-comment">// 循环数组，一次执行其中的函数</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;len;i++) {
        <span class="hljs-comment">// 直接调用arr[i]，其this指向为undefined（严格模式下）</span>
        <span class="hljs-comment">// 因此用apply将this指向arr[i]</span>
        <span class="hljs-comment">// 数组shift函数取出第一个参数，将剩下的参数传入函数中</span>
        arr[i].apply(arr[i],<span class="hljs-built_in">arguments</span>)
    }
}

<span class="hljs-keyword">var</span> ev = <span class="hljs-keyword">new</span> Event()
ev.on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{  <span class="hljs-comment">// 订阅</span>
    <span class="hljs-built_in">console</span>.log(a)
})

ev.emit(<span class="hljs-string">'click'</span>,<span class="hljs-number">1</span>)   <span class="hljs-comment">// 发布</span></code></pre>
<p>以上代码只能实现先订阅，再发布。直接发布就会报错。如何实现可以先发布，然后订阅？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Event = function() {
    this.obj = {}；
    this.cacheList = [];
}

Event.prototype.emit = function() {
    const args = arguments;  //函数参数
    const that = this;  //this指向,保持cache函数的this指向
    function cache() {
        var eventType = Array.prototype.shift.call(arg)
        var arr = that.obj[eventType]
        for (let i = 0; i < arr.length; i++) {
          arr[i].apply(arr[i], arg)
        }
    }
    this.cacheList.push(cache)  // 采用闭包，保持对emit函数中参数和that的引用
}

Event.prototype.on = function(eventType,fn) {
    if(!this.obj[eventType]) {
        this.obj[eventType] = []
    }
    this.obj[eventType].push(fn)
    // 在订阅函数中执行emit函数中缓存的函数
    for (let i = 0; i < this.cacheList.length; i++) {
        this.cacheList[i]()
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Event = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.obj = {}；
    <span class="hljs-keyword">this</span>.cacheList = [];
}

Event.prototype.emit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">arguments</span>;  <span class="hljs-comment">//函数参数</span>
    <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">//this指向,保持cache函数的this指向</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cache</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> eventType = <span class="hljs-built_in">Array</span>.prototype.shift.call(arg)
        <span class="hljs-keyword">var</span> arr = that.obj[eventType]
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
          arr[i].apply(arr[i], arg)
        }
    }
    <span class="hljs-keyword">this</span>.cacheList.push(cache)  <span class="hljs-comment">// 采用闭包，保持对emit函数中参数和that的引用</span>
}

Event.prototype.on = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventType,fn</span>) </span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.obj[eventType]) {
        <span class="hljs-keyword">this</span>.obj[eventType] = []
    }
    <span class="hljs-keyword">this</span>.obj[eventType].push(fn)
    <span class="hljs-comment">// 在订阅函数中执行emit函数中缓存的函数</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.cacheList.length; i++) {
        <span class="hljs-keyword">this</span>.cacheList[i]()
    }
}
</code></pre>
<p>改成这样后就实现了先发布函数，再订阅的过程。但是也只能先发布，然后再订阅，反过来就行不通。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 发布订阅模式

## 原文链接
[https://segmentfault.com/a/1190000016805757](https://segmentfault.com/a/1190000016805757)

