---
title: '一道有价值的JS继承面试题' 
date: 2019-01-17 2:30:25
hidden: true
slug: iuxhsic958e
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>题目</strong></p>
<p>原题目来源于一个网友的问答</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var A = function() {
    this.name = 'apple';
}
A.prototype.getName = function() {
    return this.name;
}

// 补充代码

var B = A.extend({
    initialize: function() {
        this.superclass.initialize.call(this);
        this.total = 3;
    },
    say: function() {
        return '我有' + this.total + '个' + this.getName()
    }
});
var b = new B();
console.log(b.say()); //我有3个apple" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> A = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'apple'</span>;
}
A.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}

<span class="hljs-comment">// 补充代码</span>

<span class="hljs-keyword">var</span> B = A.extend({
    <span class="hljs-attr">initialize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.superclass.initialize.call(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.total = <span class="hljs-number">3</span>;
    },
    <span class="hljs-attr">say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'我有'</span> + <span class="hljs-keyword">this</span>.total + <span class="hljs-string">'个'</span> + <span class="hljs-keyword">this</span>.getName()
    }
});
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> B();
<span class="hljs-built_in">console</span>.log(b.say()); <span class="hljs-comment">//我有3个apple</span></code></pre>
<p><strong>分析</strong></p>
<ol>
<li><p>题目希望生成一个新的构造函数，B继承于A。（尽量不要更改A）</p></li>
<li><p>题目表达出希望有initialize方法实现构造函数继承，又需要原型继承。不难想到我们要用组合继承、寄生组合继承或者ES6继承。</p></li>
<li><p>如果所有的函数都可以使用extend方法生成一个新的构造函数，那方法的通用性会更强。</p></li>
<li><p>initialize的this指向显然要改成指向子类构造函数中的this。</p></li>
</ol>
<p><strong>解答</strong><br>一. 要实现分析的第三点，不难想到使用函数的原型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.extend= Function.prototype.extend || function(obj) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>.extend= <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span></span>.extend || <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span></span> {}</code></pre>
<p>二. initialize方法实现构造函数继承</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.extend= Function.prototype.extend || function(obj) {
    var self = this; //这里的this指向函数调用者，也可以是A

    function SubClass() {
        this.superclass = { initialize: self };
        if (obj.initialize) {
            obj.initialize.call(this); //处理this指向问题
        }
    }
    
    return SubClass;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.extend= <span class="hljs-built_in">Function</span>.prototype.extend || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>; <span class="hljs-comment">//这里的this指向函数调用者，也可以是A</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubClass</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.superclass = { <span class="hljs-attr">initialize</span>: self };
        <span class="hljs-keyword">if</span> (obj.initialize) {
            obj.initialize.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//处理this指向问题</span>
        }
    }
    
    <span class="hljs-keyword">return</span> SubClass;
}</code></pre>
<p>三. 原型继承并且添加新的原型方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.extend= Function.prototype.extend || function(obj) {
    var self = this; //这里的this指向函数调用者，也可以是A

    function SubClass() {
        this.superclass = { initialize: self };
        if (obj.initialize) {
            obj.initialize.call(this); //处理this指向问题
        }
    }
    
    SubClass.prototype = new self();
    SubClass.prototype.constructor = SubClass;

    for(var key in obj){
        if(key !== 'initialize'){
            SubClass.prototype[key] = obj[key]
        }
    }
    
    return SubClass;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.extend= <span class="hljs-built_in">Function</span>.prototype.extend || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>; <span class="hljs-comment">//这里的this指向函数调用者，也可以是A</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubClass</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.superclass = { <span class="hljs-attr">initialize</span>: self };
        <span class="hljs-keyword">if</span> (obj.initialize) {
            obj.initialize.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//处理this指向问题</span>
        }
    }
    
    SubClass.prototype = <span class="hljs-keyword">new</span> self();
    SubClass.prototype.constructor = SubClass;

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj){
        <span class="hljs-keyword">if</span>(key !== <span class="hljs-string">'initialize'</span>){
            SubClass.prototype[key] = obj[key]
        }
    }
    
    <span class="hljs-keyword">return</span> SubClass;
}</code></pre>
<p><strong>问题</strong></p>
<ol>
<li><p>添加较为严谨的类型判断</p></li>
<li><p>组合继承是存在一定问题的（见javascript高级教程第六章），如果能用ES6继承会更好。</p></li>
</ol>
<p><strong>改进</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inherits(subClass, superClass) { // ES6继承
    if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) {
        throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass);
    }
    subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
        constructor: { 
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

Function.prototype.extend= Function.prototype.extend || function(obj) {
    var self = this; //这里的this指向函数调用者，也可以是A

    function SubClass() {
        this.superclass = { initialize: self };
        if (getType(obj) === 'object' &amp;&amp; getType(obj.initialize) === 'function') {
            obj.initialize.call(this); //处理this指向问题
        }
    }
    
    inherits(SubClass, self);

    for (var key in obj) {
        if (key !== 'initialize') {
            SubClass.prototype[key] = obj[key]
        }
    }
    
    return SubClass;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ <span class="hljs-comment">// ES6继承</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">"function"</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Super expression must either be null or a function, not "</span> + <span class="hljs-keyword">typeof</span> superClass);
    }
    subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
        <span class="hljs-attr">constructor</span>: { 
            <span class="hljs-attr">value</span>: subClass,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
        }
    });
    <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getType</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(obj).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>).toLowerCase();
}

<span class="hljs-built_in">Function</span>.prototype.extend= <span class="hljs-built_in">Function</span>.prototype.extend || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>; <span class="hljs-comment">//这里的this指向函数调用者，也可以是A</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SubClass</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.superclass = { <span class="hljs-attr">initialize</span>: self };
        <span class="hljs-keyword">if</span> (getType(obj) === <span class="hljs-string">'object'</span> &amp;&amp; getType(obj.initialize) === <span class="hljs-string">'function'</span>) {
            obj.initialize.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//处理this指向问题</span>
        }
    }
    
    inherits(SubClass, self);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (key !== <span class="hljs-string">'initialize'</span>) {
            SubClass.prototype[key] = obj[key]
        }
    }
    
    <span class="hljs-keyword">return</span> SubClass;
}</code></pre>
<p>总结：</p>
<ol>
<li><p>该题目考查了几个重要的知识点：原型，继承，闭包，this指向。是一道比较值得去好好思考的题目。</p></li>
<li><p>希望有更好的解决方案出现。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道有价值的JS继承面试题

## 原文链接
[https://segmentfault.com/a/1190000008888142](https://segmentfault.com/a/1190000008888142)

